# Pétrolette

*RSS/Atom morning news reader ; Works at night too.*

---

[![pipeline status](https://framagit.org/yphil/petrolette/badges/master/pipeline.svg)](https://framagit.org/yphil/petrolette/-/pipelines)
[![License GPLv3](https://img.shields.io/badge/license-GPL_v3-green.svg)](http://www.gnu.org/licenses/gpl-3.0.html)
[![Liberapay](https://img.shields.io/badge/donate-Liberapay-yellow.svg)](https://liberapay.com/yPhil/donate)
[![PayPal Donate](https://img.shields.io/badge/donate-PayPal.me-ff69b4.svg)](https://www.paypal.me/yphil)

<!-- [![coverage](https://framagit.org/yphil/petrolette/badges/master/coverage.svg)](https://framagit.org/yphil/petrolette/-/pipelines) -->

## Welcome to the Internet

[Pétrolette](http://petrolette.space) is a news reading home page, [free](https://framagit.org/yphil/petrolette/-/blob/master/LICENSE). It is immediately usable **without registration** with the same URL on the desktop or a mobile device.

News feeds are organized into tabs, which can contain an infinite number of columns; everything is configurable, and saved directly in the browser cache.

To view the same feeds on your phone, either export / import the `petrolette.conf` file, or (recommended) use the user's personal cloud synchronization feature.

![Petrolette](https://framagit.org/yphil/assets/-/raw/main/img/petrolette.png)

## Features

- Reads modern feeds (Atom, Media-RSS, etc.)
- Searches for feeds in a page / website
- Direct link to the article's resources (image, video, sound) for opening in an external reader
- Advanced image management
- Import / Export of the feeds file
- Online synchronization (Cloud)
- Construction of web search feeds
- Mobile / responsive interface
- Bookmarklet for adding the feed of a site to Pétrolette on the fly
- Compatible with FLOSS browsers (uncompressed executable files, licenses available directly and in standard format)

## New

### Client-side

- [The "folded" flows remain so, considerably speeding up the start-up](https://framagit.org/yphil/petrolette/-/blob/master/public/js/PTL.feed.js#L201)
- [Configurable search feed engine](https://framagit.org/yphil/petrolette/-/blob/master/public/js/PTL.prefs.js#L105)
- [Scrollable menu, collapsible elements](https://framagit.org/yphil/petrolette/-/blob/master/public/js/PTL.main.js#L52)
- [New themes](https://framagit.org/yphil/petrolette/-/blob/master/public/css/themes/night.css)

### Server-side

- [Compression](http://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression)
- [Process management](https://pm2.keymetrics.io/)
- [CI / CD unit tests](https://framagit.org/yphil/petrolette/-/pipelines)
- Reinforced security on the test instance ([Sanitize](https://github.com/pocketly/node-sanitize), [Helmet](https://expressjs.com/en/advanced/best-practice-security .html # use-helmet), etc.)

### Companion libs

- Rewrite of [Feedrat](https://framagit.org/yphil/feedrat) and [Favrat](https://framagit.org/yphil/favrat) in async / Await
- [Installation directly from the repository (C-to-D no longer with npm)](https://framagit.org/yphil/petrolette/-/blob/master/package.json#L27)
- CI / CD unit tests ([Feedrat](https://framagit.org/yphil/feedrat/-/pipelines) / [Favrat](https://framagit.org/yphil/favrat/-/pipelines))

## In the pipe

- [SSL / HTTPS](https://framagit.org/yphil/petrolette/-/issues/59)
- [HTTP2](https://http2.github.io/faq/)
- [Import Netvibes](https://framagit.org/yphil/petrolette/-/issues/65)
- [Redesign of the flow configuration system](https://framagit.org/yphil/petrolette/-/issues/74)
- [Recurrent search by keywords](https://framagit.org/yphil/petrolette/-/issues/70)
- [Infinite / asynchronous scrolling in flows](https://framagit.org/yphil/petrolette/-/issues/63)
- [User themes](https://framagit.org/yphil/petrolette/-/issues/75)
- [Dedicated feeds for participating users](https://framagit.org/yphil/petrolette/-/issues/72)


### Installation

```sh
git clone https://framagit.org/yphil/petrolette
cd petrolette
npm install
npm start
xdg-open http://localhost:8000

```
#### Testing

```javascript
npm test
```

### LICENSE

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*Icon by yPhil*

---
