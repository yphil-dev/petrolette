const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(from, to) {
  ensureDir(path.dirname(to));
  fs.copyFileSync(from, to);
}

function copyDir(from, to) {
  ensureDir(path.dirname(to));
  fs.cpSync(from, to, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function renderIndexHtml() {
  const packageJson = readJson(path.join(rootDir, 'package.json'));
  const favratPackageJson = readJson(path.join(rootDir, 'node_modules', 'favrat', 'package.json'));
  const feedratPackageJson = readJson(path.join(rootDir, 'node_modules', 'feedrat', 'package.json'));

  let html = fs.readFileSync(path.join(rootDir, 'views', 'index.html'), 'utf8');

  html = html
    .replace(/<%= version %>/g, packageJson.version)
    .replace(/<%= favratversion %>/g, favratPackageJson.version)
    .replace(/<%= feedratversion %>/g, feedratPackageJson.version)
    .replace(
      "        PTL.queryString = DOMPurify.sanitize('<%= queryString %>');;\n        PTL.instanceType = '<%= instanceType %>';",
      "        const addParam = new URLSearchParams(window.location.search).get('add');\n        PTL.queryString = addParam ? DOMPurify.sanitize(addParam) : '';\n        PTL.instanceType = 'multiUser';"
    );

  writeFile(path.join(distDir, 'index.html'), html);
}

function renderJavascriptInfoHtml() {
  const html = fs.readFileSync(path.join(rootDir, 'views', 'javascript.html'), 'utf8');
  writeFile(path.join(distDir, 'about', 'javascript', 'index.html'), html);
}

function copyBrowserAssets() {
  copyDir(path.join(rootDir, 'public'), path.join(distDir, 'static'));
  copyDir(path.join(rootDir, 'favicons-cache'), path.join(distDir, 'favicons'));

  const filesToCopy = {
    'node_modules/jquery/dist/jquery.js': 'jquery/jquery.js',
    'node_modules/jquery/dist/jquery.min.js': 'jquery/jquery.min.js',
    'node_modules/jquery-ui-dist/jquery-ui.js': 'jquery-ui/jquery-ui.js',
    'node_modules/jquery-ui-dist/jquery-ui.min.js': 'jquery-ui/jquery-ui.min.js',
    'node_modules/jquery-ui-dist/jquery-ui.css': 'jquery-ui/jquery-ui.css',
    'node_modules/jquery-ui-dist/jquery-ui.min.css': 'jquery-ui/jquery-ui.min.css',
    'node_modules/intro.js/intro.js': 'introjs/intro.js',
    'node_modules/intro.js/minified/intro.min.js': 'introjs/minified/intro.min.js',
    'node_modules/intro.js/minified/introjs.min.css': 'introjs/minified/introjs.min.css',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js': 'fancybox/jquery.fancybox.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js': 'fancybox/jquery.fancybox.min.js',
    'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css': 'fancybox/jquery.fancybox.min.css',
    'node_modules/remotestoragejs/release/remotestorage.js': 'rs/remotestorage.js',
    'node_modules/remotestorage-widget/build/widget.js': 'rs-widget/widget.js',
    'node_modules/dompurify/dist/purify.js': 'dompurify/purify.js',
    'node_modules/dompurify/dist/purify.min.js': 'dompurify/purify.min.js',
    'node_modules/mousetrap/mousetrap.js': 'mousetrap/mousetrap.js',
    'node_modules/mousetrap/mousetrap.min.js': 'mousetrap/mousetrap.min.js',
    'node_modules/responsively-lazy/responsivelyLazy.js': 'responsively-lazy/responsivelyLazy.js',
    'node_modules/responsively-lazy/responsivelyLazy.min.js': 'responsively-lazy/responsivelyLazy.min.js',
    'node_modules/responsively-lazy/responsivelyLazy.min.css': 'responsively-lazy/responsivelyLazy.min.css'
  };

  for (const [from, to] of Object.entries(filesToCopy)) {
    copyFile(path.join(rootDir, from), path.join(distDir, to));
  }

  copyDir(path.join(rootDir, 'node_modules', 'jquery-ui-dist', 'images'), path.join(distDir, 'jquery-ui', 'images'));
}

function main() {
  fs.rmSync(distDir, { recursive: true, force: true });
  ensureDir(distDir);

  copyBrowserAssets();
  renderIndexHtml();
  renderJavascriptInfoHtml();

  console.log('Cloudflare Pages build output written to dist/');
}

main();
