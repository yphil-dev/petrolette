import * as cheerio from 'cheerio';

// Worker-compatible adaptation of feedrat 0.4.12.
export default function discoverFeeds(url, callback) {
  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    callback('Not a valid URL');
    return;
  }

  const protocol = parsedUrl.protocol || 'http:';
  const tld = protocol + '//' + parsedUrl.host;
  const types = ['application/rss+xml', 'application/atom+xml'];
  const usualSuspects = ['/feed.xml', '/rss.xml', '/feed', '/rss', '/atom.xml', '.rss'];
  let feed = url.replace(/\/$/, '');
  const feeds = [];

  async function isRss(candidate) {
    try {
      const response = await fetch(candidate);
      const contentType = response.headers.get('content-type') || '';
      return response.ok && contentType.includes('xml');
    } catch {
      return false;
    }
  }

  async function checkSuspects(baseUrl) {
    for (const suspect of usualSuspects) {
      if (await isRss(baseUrl + suspect)) {
        feeds.push(baseUrl + suspect);
        return feeds;
      }
    }
    return '';
  }

  async function checkTheDom(candidate) {
    const response = await fetch(candidate);
    const $ = cheerio.load(await response.text());

    $('link').each(function () {
      const type = $(this).attr('type') || '';
      const href = $(this).attr('href');

      if (!href || !types.some((value) => type.includes(value))) return;

      feed = new URL(href, candidate).toString();
      feeds.push(feed);
    });

    return feeds;
  }

  (async () => {
    try {
      if (await isRss(feed)) {
        feeds.push(feed);
        callback(null, feeds);
        return;
      }

      let result = await checkTheDom(feed);
      if (result.length) {
        callback(null, result);
        return;
      }

      result = await checkSuspects(feed);
      if (result.length) {
        callback(null, result);
        return;
      }

      result = await checkTheDom(tld);
      if (result.length) {
        callback(null, result);
        return;
      }

      result = await checkSuspects(tld);
      callback(result.length ? null : 'No feed found', result.length ? result : undefined);
    } catch (error) {
      callback(error);
    }
  })();
}
