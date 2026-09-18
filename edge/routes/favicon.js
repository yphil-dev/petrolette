import { createHash } from 'node:crypto';
import favrat from 'favrat';

function errorResponse(error) {
  return Response.json(error, { status: 500 });
}

function findIcon(url) {
  return new Promise((resolve, reject) => {
    favrat(url, (error, iconUrl) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(iconUrl);
    });
  });
}

function cacheKey(request, hash) {
  const url = new URL(request.url);
  url.pathname = `/favicons/${hash}.favicon`;
  url.search = '';
  return new Request(url.toString());
}

export async function handleFavicon(url) {
  const pageUrl = url.searchParams.get('url');

  if (!pageUrl) {
    return Response.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const iconUrl = await findIcon(pageUrl);
    const hash = createHash('md5').update(iconUrl).digest('hex');
    const key = cacheKey(new Request(url.toString()), hash);
    const cache = caches.default;
    const cached = await cache.match(key);

    if (cached) return Response.json(hash);

    const iconResponse = await fetch(iconUrl, { redirect: 'follow' });
    if (!iconResponse.ok) {
      return errorResponse({ error: `Favicon request failed: ${iconResponse.status}` });
    }

    const cachedResponse = new Response(iconResponse.body, {
      status: iconResponse.status,
      headers: {
        'content-type': iconResponse.headers.get('content-type') || 'application/octet-stream',
        'cache-control': 'public, max-age=31536000, immutable'
      }
    });

    await cache.put(key, cachedResponse.clone());
    return Response.json(hash);
  } catch (error) {
    return errorResponse(error);
  }
}

export async function handleCachedFavicon(request, env) {
  const cache = caches.default;
  const cached = await cache.match(request);

  if (cached) return cached;

  if (env.ASSETS) {
    const asset = await env.ASSETS.fetch(request);
    if (asset.ok) {
      await cache.put(request, asset.clone());
    }
    return asset;
  }

  return new Response('Favicon not found', { status: 404 });
}
