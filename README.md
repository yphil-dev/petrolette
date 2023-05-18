# Pétrolette

[![pipeline status](https://framagit.org/yphil/petrolette/badges/master/pipeline.svg)](https://framagit.org/yphil/petrolette/-/pipelines)
[![website](https://img.shields.io/website?down_message=down&up_color=brightgreen&up_message=up&url=https%3A%2F%2Fpetrolette.space)](https://petrolette.space)
[![License GPLv3](https://img.shields.io/badge/license-GPL_v3-green.svg)](http://www.gnu.org/licenses/gpl-3.0.html)
[![Liberapay](https://img.shields.io/liberapay/receives/yPhil?logo=liberapay)](https://liberapay.com/yPhil/donate)
[![Liberapay](https://img.shields.io/liberapay/goal/yPhil?logo=liberapay)](https://liberapay.com/yPhil/donate)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?label=buy+me+a&style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/yphil/tiers)

---

## Good morning, what's up? ☕ 📰

[Pétrolette](https://petrolette.space) is a news home page, immediately usable **without registration** with the **same URL** on any computer, TV or mobile device.

Add, delete, move feeds and tabs, close your browser, come back tomorrow, everything is how you left it.

*Feeds* - there are [feeds](https://en.wikipedia.org/wiki/Web_feed) for everything: News sites, but also podcasts, video channels, blogs, social media, weather, phases of the moon, issue trackers, etc. - are organized into *tabs*, which can contain an infinite number of *columns*; everything is configurable, and saved directly in the browser [permanent cache](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). To view the same feeds on your phone, either export / import your `petrolette.conf` file, or (recommended) use the synchronization feature with your personal ([Google Drive](https://www.google.com/drive/), [Dropbox](https://www.dropbox.com/), [5apps](https://5apps.com/storage) (much better) etc.) cloud.
You don't have to know the specifics of a given feed ; Just enter a website's URL / Adress (or [use the bookmark](https://exode.me/w/tafJ9bmAYDFRV7aBLRjvot)) and Pétrolette will find it.

## Escape from GAFAM central

Pétrolette is fully self-contained, makes **no external call** whatsoever, and embarks a total of **zero tracker or "analysis" tool**. Needless to say she is also **completely ad-free**.

![Petrolette](https://yphil.bitbucket.io/images/petrolette.png)

## Features

- No ads, no trackers, **just the news**
- Displays all modern feeds (Atom, RSS 1/2, **MediaRSS**, Social networks, etc.)
- New items indicator / badge
- **Video / Audio playing** directly in Pétrolette
- **Discovery of the feed** in a page / website
- Mobile / **phone** / tablet / responsive interface
- Direct link to all the article / item's resources (image, video, sound)
- **Search** within all the feeds
- Advanced image management (download, gallery, slideshow, etc.)
- Import / export of the tabs & feeds file (replace / merge)
- Online **synchronization** ([5apps](https://5apps.com/storage), [Google Drive](https://www.google.com/drive/), [Dropbox](https://www.dropbox.com/)) on all your devices
- Building of **Search terms feeds** [example](https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=zombie,attack) using a configurable search engine
- Bookmarklet to **add the feed of any website to Pétrolette** on the fly
- Compatible with [FLOSS browsers](https://www.gnu.org/software/librejs/) (links to all uncompressed executable files, licenses available directly and in standard format)
- Installable in mono-user, fully contained mode

### What's new?

Read [the changelog](https://framagit.org/yphil/petrolette/-/blob/master/CHANGELOG.md).

## Usage

### Configuration

#### Server type ("dev" mode)
Pétrolette can be use both locally on an http, or a https server. To spawn the HTTP server and avoid SSL errors, start Pétrolette using `npm run dev`.

#### Instance type
Pétrolette can be started in mono-user mode, where a single feeds file is read & written directly on the server. To do this place a file named `petrolette.config.json` in the root dir, containing exactly this :

``` javascript
{
  "instanceType" : "monoUser"
}
```

### Install

```sh
git clone https://framagit.org/yphil/petrolette
cd petrolette
npm install
```

### Server start

#### Production (default) mode

`npm start`

#### Dev / local mode

`npm run dev`

### Ok, what now? Where are the news?

Direct your favorite browser to the local URL:

`xdg-open http://localhost:8000` (in `dev` mode) or `xdg-open https://localhost:8001` (in `production` default mode)

### Update

```sh
git checkout server
git pull
npm install
```
### Test

```javascript
npm test
```

## Help

- Read the [development guidelines](https://framagit.org/yphil/petrolette/-/blob/master/DEV.md)
- Pétrolette is [Free, Libre, and Open-Source Software](https://framagit.org/yphil/petrolette/-/blob/master/LICENSE). However the development requires [a lot of time](https://www.youtube.com/watch?v=JlbMEx9H6FE) and [a lot of work](https://framagit.org/yphil/petrolette/-/commits/master). In order to keep developing it with new features I need your help ; Please consider to [support the Pétrolette project](https://liberapay.com/yPhil/donate) or by [sending a donation](https://ko-fi.com/yphil/) ; Even the smallest amount will help *a lot*.

*Icon by yPhil*

Brought to you by [yPhil](https://yphil.gitlab.io) Please consider ♥ [helping](https://liberapay.com/yPhil/donate) icon by yPhil ♫
