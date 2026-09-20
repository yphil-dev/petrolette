# Pétrolette

[![pipeline status](https://gitlab.com/yphil/petrolette/badges/master/pipeline.svg)](https://gitlab.com/yphil/petrolette/-/pipelines)
[![website](https://img.shields.io/website?down_message=down&up_color=brightgreen&up_message=up&url=https%3A%2F%2Fpetrolette.xaccrocheur.workers.dev)](https://petrolette.xaccrocheur.workers.dev)
[![License GPLv3](https://img.shields.io/badge/license-GPL_v3-green.svg)](https://www.gnu.org/licenses/gpl-3.0.html)
[![Liberapay](https://img.shields.io/liberapay/receives/yPhil?logo=liberapay)](https://liberapay.com/yphil/donate)
[![Liberapay goal](https://img.shields.io/liberapay/goal/yPhil?logo=liberapay)](https://liberapay.com/yphil/donate)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?label=buy+me+a&style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/yphil/tiers)

---

## Good morning, what's up? ☕ 📰

[Pétrolette](https://petrolette.xaccrocheur.workers.dev) is a configurable news dashboard for feeds, podcasts, video channels, blogs, social media, weather, issue trackers, and anything else that speaks RSS or Atom.

It works without registration. Tabs and feeds are synchronized through RemoteStorage and its browser cache, so the same setup can be used across devices after connecting a storage provider. Local interface preferences remain in the browser.

Add, delete, and move feeds and tabs, close the browser, and come back later. To discover a feed, enter a website URL or [use the bookmarklet](https://exode.me/w/tafJ9bmAYDFRV7aBLRjvot).

## Escape from surveillance capitalism

Pétrolette has no advertising or analytics trackers. It does make the external requests required to retrieve feeds and, when enabled, synchronize data through RemoteStorage. Feed requests are handled by the Cloudflare Worker so browsers do not have to fight CORS directly.

![Pétrolette](https://yphil.bitbucket.io/images/petrolette.png)

## Features

- No ads or analytics trackers
- RSS, Atom, MediaRSS, and social feeds
- Tabs, columns, unread indicators, search, and responsive layouts
- Direct audio and video playback
- Feed and favicon discovery
- Image galleries, slideshows, and configurable media loading
- Import and export of tab/feed configuration
- RemoteStorage synchronization across devices
- Search-term feeds using a configurable search engine
- Bookmarklet for adding feeds from any website
- FLOSS-friendly links to uncompressed executable files and licenses

### What's new?

Read the [changelog](https://framagit.org/yphil/petrolette/-/blob/master/CHANGELOG.md).

## Development

Pétrolette is a Cloudflare Worker application. The Worker source is in `edge/`, frontend source is in `public/`, and `edge/build-assets.js` creates the static deployment bundle.

The local runtime and deployed runtime use the same Worker code. [Wrangler](https://developers.cloudflare.com/workers/wrangler/) runs the Worker locally; it does not connect local requests to Cloudflare's online network.

### Install

```sh
git clone https://framagit.org/yphil/petrolette.git
cd petrolette
npm install
```

### Run locally

```sh
npm start
```

This runs `npm run dev:edge` through Wrangler. Open:

<http://localhost:8788>

The local Worker can still make internet requests to external feeds and RemoteStorage.

### Test

Validate the generated Edge bundle and Wrangler deployment configuration:

```sh
npm test
```

Test the external URLs listed in the default feed configuration separately:

```sh
npm run test:feeds
```

### Deploy

Authenticate Wrangler once:

```sh
npx wrangler login
```

Build and deploy:

```sh
npm run deploy:edge
```

The current Worker endpoint is:

<https://petrolette.xaccrocheur.workers.dev>

The former custom-domain instance at `petrolette.space` may not be restored.

### Update

```sh
git pull
npm install
```

## Documentation

- [Development notes](https://framagit.org/yphil/petrolette/-/blob/master/DEV.md)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

Pétrolette is [Free, Libre, and Open-Source Software](https://framagit.org/yphil/petrolette/-/blob/master/LICENSE). Contributions, feedback, and bug reports are welcome.

*Icon by yPhil*

Brought to you by [yPhil](https://yphil.gitlab.io/blog).