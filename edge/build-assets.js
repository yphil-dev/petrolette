'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const pkg = require(path.join(root, 'package.json'));

async function copy(source, target) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.cp(source, target, { recursive: true });
}

async function copyIfPresent(source, target) {
  try {
    await copy(source, target);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

async function readPackageVersion(name) {
  const packagePath = require.resolve(`${name}/package.json`, { paths: [root] });
  const packageData = JSON.parse(await fs.readFile(packagePath, 'utf8'));
  return packageData.version;
}

async function renderIndex() {
  let html = await fs.readFile(path.join(root, 'views', 'index.html'), 'utf8');
  const favratVersion = await readPackageVersion('favrat');
  const feedratVersion = await readPackageVersion('feedrat');

  html = html
    .replaceAll('<%= version %>', pkg.version)
    .replaceAll('<%= favratversion %>', favratVersion)
    .replaceAll('<%= feedratversion %>', feedratVersion)
    .replace(
      "        PTL.queryString = DOMPurify.sanitize('<%= queryString %>');;",
      "        const addParam = new URLSearchParams(window.location.search).get('add');\n        PTL.queryString = addParam ? DOMPurify.sanitize(addParam) : '';"
    )
    .replace("        PTL.instanceType = '<%= instanceType %>';", "        PTL.instanceType = 'multiUser';");

  await fs.writeFile(path.join(dist, 'index.html'), html);
}

async function main() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });

  await copy(path.join(root, 'public'), path.join(dist, 'static'));
  await copy(path.join(root, 'views', 'javascript.html'), path.join(dist, 'about', 'javascript', 'index.html'));
  await renderIndex();

  const vendorFiles = [
    ['node_modules/intro.js/intro.js', 'introjs/intro.js'],
    ['node_modules/intro.js/minified', 'introjs/minified'],
    ['node_modules/jquery/dist/jquery.js', 'jquery/jquery.js'],
    ['node_modules/jquery/dist/jquery.min.js', 'jquery/jquery.min.js'],
    ['node_modules/jquery-ui-dist/images', 'jquery-ui/images'],
    ['node_modules/jquery-ui-dist/jquery-ui.css', 'jquery-ui/jquery-ui.css'],
    ['node_modules/jquery-ui-dist/jquery-ui.js', 'jquery-ui/jquery-ui.js'],
    ['node_modules/jquery-ui-dist/jquery-ui.min.css', 'jquery-ui/jquery-ui.min.css'],
    ['node_modules/jquery-ui-dist/jquery-ui.min.js', 'jquery-ui/jquery-ui.min.js'],
    ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js', 'fancybox/jquery.fancybox.js'],
    ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css', 'fancybox/jquery.fancybox.min.css'],
    ['node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js', 'fancybox/jquery.fancybox.min.js'],
    ['node_modules/responsively-lazy/responsivelyLazy.js', 'responsively-lazy/responsivelyLazy.js'],
    ['node_modules/responsively-lazy/responsivelyLazy.min.css', 'responsively-lazy/responsivelyLazy.min.css'],
    ['node_modules/responsively-lazy/responsivelyLazy.min.js', 'responsively-lazy/responsivelyLazy.min.js'],
    ['node_modules/remotestoragejs/release/remotestorage.js', 'rs/remotestorage.js'],
    ['node_modules/remotestorage-widget/build/widget.js', 'rs-widget/widget.js'],
    ['node_modules/dompurify/dist/purify.js', 'dompurify/purify.js'],
    ['node_modules/dompurify/dist/purify.min.js', 'dompurify/purify.min.js'],
    ['node_modules/mousetrap/mousetrap.js', 'mousetrap/mousetrap.js'],
    ['node_modules/mousetrap/mousetrap.min.js', 'mousetrap/mousetrap.min.js']
  ];

  for (const [source, target] of vendorFiles) {
    await copy(path.join(root, source), path.join(dist, target));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
