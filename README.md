# Pétrolette

[![pipeline status](https://framagit.org/yphil/petrolette/badges/master/pipeline.svg)](https://framagit.org/yphil/petrolette/-/pipelines)
[![website](https://img.shields.io/website?down_message=down&up_color=brightgreen&up_message=up&url=https%3A%2F%2Fpetrolette.space)](http://petrolette.space)
[![Liberapay](https://img.shields.io/liberapay/receives/yPhil)](https://liberapay.com/yPhil/donate)
[![Liberapay](https://img.shields.io/liberapay/goal/yPhil)](https://liberapay.com/yPhil/donate)

---

<!-- [![coverage](https://framagit.org/yphil/petrolette/badges/master/coverage.svg)](https://framagit.org/yphil/petrolette/-/pipelines) -->

## Good morning ☕

[Pétrolette](http://petrolette.space) is a news reading home page, [free](https://framagit.org/yphil/petrolette/-/blob/master/LICENSE). It is immediately usable **without registration** with the same URL on the desktop or a mobile device.

Go ahead, it's yours : Create, delete, move feeds and tabs, close / quit your browser, come back tomorrow, everything is how you left it.

News feeds are organized into tabs, which can contain an infinite number of columns; everything is configurable, and saved directly in the browser [permanent cache](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). To view the same feeds on your phone, either export / import your `petrolette.conf` file, or (recommended) use the synchronization feature with your personal (Google Drive, Dropbox, [5apps](https://5apps.com/storage), etc.) cloud.

![Petrolette](https://framagit.org/yphil/assets/-/raw/master/img/petrolette.png)

## Features

- Displays all modern feeds (Atom, Media-RSS, etc.)
- Search within the feeds
- Discovery of the feed in a page / website
- Direct link to the article / item's resources (image, video, sound) for opening in an external reader
- Advanced image management (Download, Gallery, etc.)
- Import / Export of the feeds file (Replace / Merge)
- Online synchronization ([5apps](https://5apps.com/storage), Google Drive, Dropbox)
- *Search* feeds [example](https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=zombie,attack) using a configurable search engine
- Mobile / phone / tablet / responsive interface
- Bookmarklet for adding the feed of a site to Pétrolette on the fly
- Compatible with [FLOSS browsers](https://www.gnu.org/software/librejs/) (uncompressed executable files, licenses available directly and in standard format)

## What's new?

Read [the changelog](https://framagit.org/yphil/petrolette/-/blob/master/CHANGELOG.md).


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
