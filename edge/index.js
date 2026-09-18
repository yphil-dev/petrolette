import { handleFeed } from './routes/feed.js';
import { handleDiscover } from './routes/discover.js';
import { handleFavicon } from './routes/favicon.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/__health') {
      return new Response('ok', {
        headers: { 'content-type': 'text/plain; charset=UTF-8' }
      });
    }

    if (url.pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /feed\nDisallow: /discover\nDisallow: /favicon', {
        headers: { 'content-type': 'text/plain; charset=UTF-8' }
      });
    }

    if ((url.pathname === '/feed' || url.pathname === '/feed/') && request.method === 'GET') {
      return handleFeed(url);
    }

    if ((url.pathname === '/discover' || url.pathname === '/discover/') && request.method === 'GET') {
      return handleDiscover(url);
    }

    if ((url.pathname === '/favicon' || url.pathname === '/favicon/') && request.method === 'GET') {
      return handleFavicon(url);
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request);
    }

    return new Response('Edge assets are not configured.', { status: 503 });
  }
};
