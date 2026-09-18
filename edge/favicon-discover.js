import * as cheerio from 'cheerio';

// Worker-compatible adaptation of favrat 0.4.8.
export default function discoverFavicon(url, callback) {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    callback('Not a valid URL');
    return;
  }

  const protocol = parsedUrl.protocol || 'http:';
  const tld = protocol + '//' + parsedUrl.host;
  const types = [
    'image/ico',
    'image/x-icon',
    'image/vnd.microsoft.icon',
    'image/png',
    'image/gif',
    'image/jpg',
    'image/jpeg',
    'image/svg',
    'image/webp'
  ];
  const usualSuspects = ['/favicon.ico'];
  let icon = url.replace(/\/$/, '');

  async function isFavicon(candidate) {
    try {
      const response = await fetch(candidate);
      const contentType = response.headers.get('content-type') || '';
      return response.ok && types.some((type) => contentType.includes(type));
    } catch {
      return false;
    }
  }

  async function checkSuspects(baseUrl) {
    for (const suspect of usualSuspects) {
      if (await isFavicon(baseUrl + suspect)) return baseUrl + suspect;
    }
    return '';
  }

  async function checkTheDom(candidate) {
    const response = await fetch(candidate);
    const $ = cheerio.load(await response.text());
    let foundIcon = '';

    $('link').each(function () {
      const relation = ($(this).attr('rel') || '').toLowerCase();
      const href = $(this).attr('href');

      if (href && relation === 'icon') {
        foundIcon = new URL(href, candidate).toString();
      }
    });

    if (foundIcon) icon = foundIcon;
    return foundIcon;
  }

  (async () => {
    try {
      if (await isFavicon(icon)) {
        callback(null, icon);
        return;
      }

      let result = await checkTheDom(icon);
      if (result && await isFavicon(result)) {
        callback(null, result);
        return;
      }

      result = await checkTheDom(tld);
      if (result && await isFavicon(result)) {
        callback(null, result);
        return;
      }

      result = await checkSuspects(tld);
      callback(result ? null : 'No icon found', result || undefined);
    } catch (error) {
      callback(error);
    }
  })();
}
