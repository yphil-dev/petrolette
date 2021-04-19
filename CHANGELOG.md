# Changelog

## 1.2.8 (WIP)

- New option / dialog to merge the imported / open feeds with existing ones
- Feed name || URL in tooltip
- UTC Timestamps
- Better Item layout (Media/comment icons) and wrapping

### Bugfixes

- In "photo" mode, vertical images wrapped around the text, fixed.
- Console size adjusted
- Better "on error" favicon image handling
- Fixed a long, outstanding & known bug where the "new tab" button was not appended after an import, because of the weird gymnastics we have to do to make sure said button is always the last one, think about that

## 1.2.7

- The feed's favicon file name / path is now saved along, so as to avoid re-requesting it, then re-computing the (hash) name, then re-rend it back from the server, so everybody wins #1e5f4c20
- The Logging strategy has been slightly adjusted: We now log the access to /feed and no long to /favicon #1e5f4c20
- External (ie froml the feeds) asset (typically imgs but not only) calls are now forcefully https #d4782908
- Re-enabled server compression #941dac8a

### Bugfixes

- Update feed's checkbox/select icon after drag & drop #7d7db00f
- Mobile: Removed transparency on hover #98d979c7
- New dialog options #7895970c

## 1.2.6

- Removed all sync calls on the server #71e24de1
- Error feeds keep their title #4e00f880

### Bugfixes

- Sensible defaults for NV imported feeds (status:off, height:220) #4412c6b9
- CSS rules update / cleanup #4412c6b9
- XML is not an object when nbGroups / nbFeeds < 2 (#93)

## 1.2.5

- Feed name is now saved along #037426a8
- Completely revamped the favicon (client) display system from a bg-img to a plain img with a fallback #47923bfb to #13f63af5
- HTTPS #84f8bead
- Google Drive & Dropbox sync #4e0d7aa4 to #b3cfb656
- Search within the feeds #5fb26376 to #cc29e23f
- KB navigation #27411c35
- MediaRSS metadata preloading new preference option #50ef2ebb
- Site (fav)icon in "folded" feeds #bbc6ab5e

## 1.2.1

- MediaRSS audio & video (plain HTML5) player #3800c2a0 to #ffcfcfb6
- Infinite scrolling within the feeds #0f760e9b to #b2cf0f86
- OPML (NVibes) import #9066a3d2 to #a0cc0013
- Beggar dialog "because we're no good, lowdown money grabbers" ;) #89ada899

### Bugfixes

- Relative imageUrl #8a63acaf
- Global sanitization of new inputs #a0cc0013

## 1.2.0

- Complete revamp of the image loading strategy #5bdd9341
