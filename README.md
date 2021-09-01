# Pétrolette

[![pipeline status](https://framagit.org/yphil/petrolette/badges/master/pipeline.svg)](https://framagit.org/yphil/petrolette/-/pipelines)
[![coverage](https://framagit.org/yphil/petrolette/badges/master/coverage.svg)](https://framagit.org/yphil/petrolette/-/pipelines)
[![website](https://img.shields.io/website?down_message=down&up_color=brightgreen&up_message=up&url=https%3A%2F%2Fpetrolette.space)](https://petrolette.space)
[![Liberapay](https://img.shields.io/liberapay/receives/yPhil?logo=liberapay)](https://liberapay.com/yPhil/donate)
[![Liberapay](https://img.shields.io/liberapay/goal/yPhil?logo=liberapay)](https://liberapay.com/yPhil/donate)
[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?label=buy+me+a&style=flat&logo=ko-fi&logoColor=white)](https://ko-fi.com/yphil/tiers)

---

<!-- [![coverage](https://framagit.org/yphil/petrolette/badges/master/coverage.svg)](https://framagit.org/yphil/petrolette/-/pipelines) -->

## Good morning! ☕ 📰

[Pétrolette](https://petrolette.space) is a news home page, [Free, Libre, and Open-Source Software](https://framagit.org/yphil/petrolette/-/blob/master/LICENSE). She is immediately usable **without registration** with the **same URL** on the desktop or a mobile device.

Go ahead, it's yours : Create, delete, move feeds and tabs, close / quit your browser, come back tomorrow, everything is how you left it.

News feeds are organized into tabs, which can contain an infinite number of columns; everything is configurable, and saved directly in the browser [permanent cache](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). To view the same feeds on your phone, either export / import your `petrolette.conf` file, or (recommended) use the synchronization feature with your personal ([Google Drive](https://www.google.com/drive/), [Dropbox](https://www.dropbox.com/), [5apps](https://5apps.com/storage) (much better) etc.) cloud.

## Escape from GAFAM central

Pétrolette is fully self-contained, makes **no external call** whatsoever, and embarks a total of **zero tracker or "analysis" tool**. Needless to say she is also **completely ad-free** 😎

![Petrolette](https://framagit.org/yphil/assets/-/raw/master/img/petrolette.png)

## Features

- No ads, no trackers, **just the news**
- Displays all modern feeds (Atom, RSS 1/2, **MediaRSS**, etc.)
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

## What's new?

Read [the changelog](https://framagit.org/yphil/petrolette/-/blob/master/CHANGELOG.md).


### Install

```sh
git clone https://framagit.org/yphil/petrolette
cd petrolette
npm install
npm start
xdg-open http://localhost:8000
```
#### Update

```sh
cd petrolette
git pull
npm update
```
#### Test

```javascript
npm test
```

### Contributing

- Read the [development guidelines](https://framagit.org/yphil/petrolette/-/blob/master/DEV.md)
- Pétrolette is free software. However the development requires [a lot of time](https://www.youtube.com/watch?v=JlbMEx9H6FE) and [a lot of work](https://framagit.org/yphil/petrolette/-/commits/master). In order to keep developing it with new features I need your help ; Please consider to [support the Pétrolette project](https://liberapay.com/yPhil/donate) by sending a donation. Even the smallest amount will help a lot.

*Icon by yPhil*

Brought to you ♫ by [yPhil](http://yphil.bitbucket.io/) Please consider ♥ [helping](https://liberapay.com/yPhil/donate) icon by yPhil
