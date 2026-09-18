import { Readable } from 'node:stream';
import FeedParser from 'feedparser';

function formatError(error) {
  return {
    type: error?.type || 'Network',
    status: Number.isInteger(error?.status) ? error.status : 0,
    message: error?.message || 'A network error has occurred'
  };
}

function parseFeed(xml, feedUrl, lastItem) {
  return new Promise((resolve) => {
    const parser = new FeedParser();
    const feedItems = [];
    let settled = false;

    const finish = (value) => {
      if (!settled) {
        settled = true;
        resolve(value);
      }
    };

    parser.on('error', (error) => finish({ error: formatError(error) }));

    parser.on('readable', function () {
      try {
        let item;
        while ((item = this.read()) !== null) {
          feedItems.push(item);
        }
      } catch (error) {
        finish({ error: formatError(error) });
      }
    });

    parser.on('end', function () {
      if (settled) return;

      if (feedItems.length === 0) {
        finish({
          error: formatError({
            type: 'Syntax',
            message: 'Feed OK, but empty'
          })
        });
        return;
      }

      let newLastItem;
      let totalNewItems = feedItems.length;

      feedItems.forEach((item, index) => {
        if (newLastItem === undefined) newLastItem = item.link;
        if (item.link === lastItem) totalNewItems = index;
      });

      const meta = this.meta || {};
      finish({
        feedItems,
        feedLink: meta.link || feedUrl,
        feedTitle: meta.title || feedUrl,
        lastItem: newLastItem,
        totalNewItems,
        feedIcon: meta.image?.url || null
      });
    });

    Readable.from([xml]).pipe(parser);
  });
}

export async function handleFeed(url) {
  const feedUrl = url.searchParams.get('url');
  const lastItem = url.searchParams.get('lastItem');

  if (!feedUrl) {
    return Response.json({ error: formatError({ message: 'Missing feed URL' }) }, { status: 400 });
  }

  try {
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      return Response.json({
        error: formatError({
          type: response.type,
          status: response.status,
          message: response.statusText
        })
      });
    }

    const result = await parseFeed(await response.text(), feedUrl, lastItem);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: formatError(error) });
  }
}
