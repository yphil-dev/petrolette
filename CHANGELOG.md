# Changelog

## v1.7.0
- Pétrolette now gets the specific icon from the feed, not just the one of the main website ; This is particularly useful for social media feeds, where the icon is different for each feed / user. If you use such "main site and not specific user's icon" feeds, read on.
- New "Reset icon" button to request (and thus cache) a newer icon than the one referenced in the cache
- Links in the feed item are now clickable (and abbreviated)
- Small script to test each feed URL for any errors (like the feed simply doesn't exist anymore) in one command

### Bugfixes
- Don't remember, so probably not a lot
- Removed some debug symbols

## v1.6.0
- New `NODE_ENV` launch argument defining two environements: `production` and `development` #71d4a9e
- Pétrolette is now installable in "mono-user" mode, where feeds are saved in one unique file on the server #546af06 (#122)
- New config system (See README.md) un-versioned, so as to ease updates #546af06
- HTTP server now (in `production` mode) redirects to HTTPS #0844b6b (#132)
- All paths relative, Pétrolette is now installable in a sub-dir #7afad58 (#50)
- New (mouse / Kb) focus management system #ee66308
- Publication date (if applicable) in item's tooltip #2720e25 (#135)
- Translation improvement (in dates, notably) #3271ad6
- Console messages unified, both on server and client #f9aee65
- Direct link to media (audio & video) now also in feedType == text #9bb5d93f & #5388f5d0

### Bugfixes
- Image captions (if applicable) are now managed separately from item's description #0457d6c
- Transparency / z-index problem of the menu's sync widget (#142)
- Help tour direct access to specific help item was broken (#143)
- Better mediaRss (both audio & video) players ergonomics, specifically when `feedType` is 'mixed' #975201fd
- Better formatting of the item's `title` (displayed in the item's *tooltip*) added author and sorted HTML prettyfying problems (no space, db space, etc.) #d23061f7
- Code cleanup #66f76986

## v1.5.0
- New feature:  Find/discover all the feeds in the URI #3ba52686
- New feature:  Feeds suggestions #86213901
- Hardened security #1e3a51a
- Errors (in both the feeds and the discovery) are now much better handled, with a direct link to the error type docs #a4e7d83c
- More data (img, video & audio) types managed #1325ab5
- The search input text field is now un-focused on pressing escape #e36feb4c
- All dependancies are now installed & managed with NPM #efdebe2e => #e22524d2
- New "Insecure items in this feed were not loaded" notification #1e3a51a
- Default feeds update #4da8bdf
- New tests (static files, error codes, etc.) #e32f2d07

### Bugfixes
- Complex URLs containing query strings were not properly handled #1325ab5
- The custom name of the feed was sometimes overriden with the default one #38f99386
- The feed was sometimes deleted when closing the feedPrefs dialog by clicking on the overlay #38f9938/#ee1fe05
- The return key misbehaved in the feedPrefs dialog #f6e7f06
- Feed timestamp: `substr()` is now deprecated (?) so heck, full timestamp for now #83a22f6

## v1.4.0
- New "New feed" dialog, streamlined w/ only the feed URL #b57887be
    - Auto / transparent search / build / add of the feed at the URL
    - Override function to force-add errored feed anyway
- Feed bulk delete: All selected feeds are now deleted #6a47cde0
- New "media" paradigm in the feed preferences #a633d06d
    - Text only mode now really shows only text
- New help tour : Menu entries #5884a8b
- Column buttons now appear on hover #cf906bb / #c1308ed4
- Video embeds (locale'd, well at least En & Fr) in help tour popups #7f39f938
- Graceful handling (on-screen text) of various disabled features : JS, DOM storage #f856ba9e
- Faster animations (feed show & hide) #82c5c2d2
- New feeds now appear only *after* creation, not before as a placeholder #82c5c2d2
- Few messages in the console (`isSilent` bool param added to PTL.tab.saveTabs()) #c1308ed4

### Bugfixes
- Feed number of items was off - 1 #7f7366c6
- In the feedPrefs dialog both height & nBItems slider handle texts were not refreshed when their value was changed using the spinner buttons #4ee945db
- Proper URL construction when building the bookmarklet to avoid catching anything but protocol + domain #8f3a0e69
- Removed `isQueryString` bool, added `isNewFeed` bool #4a6d6ec8
- Refresh icon tooltip text items (both feed URL / name and timeStamp) were `undefined` after a (long) while #a633d06d
- The help tour functions are now in PTL.dialog #dd1df3bb

## v1.3.3
- Default search engine update (because of various instances searx RSS restrictions) #8870f07e

### Bugfixes
- A legacy db call was left in dialog's killFeed
- Removed lingering (sync) debug symbols

## v1.3.2
- One big squashed commit #b92f6cb6
    - New favicon error handling
    - New favicon saving routine
    - Support for protocol-relative urls in (Atom feeds) images
    - New feeds saved on first submit
    - Libs version update
    - Default feeds update

## v1.3.0
- New feed items indicator / badge #96
- New help system #104
- Number of items hard limit #81
- New theming engine / logic #75
    - Full "Light / Dark" UI 
    - New icon set
- Rendering (CSS, transitions, JQ, etc.) optimizations
- Dialog KB control

### Bugfixes
- Better (faster) server (fetch) error handling
- Sister libs Licence change
- Finalized name refactoring
- Explicit CSS vars names

## v1.2.8
- New function / dialog to merge the imported / open feeds with existing ones #e38691d5
- Server ports now set in [the config file](https://framagit.org/yphil/petrolette/-/blob/master/package.json) #c46149d8
- Separate [default feeds file](https://framagit.org/yphil/petrolette/-/blob/master/public/js/default-feeds.json) #dae9e932
    - It's a pretty big deal : instead of being included and loaded at **each visit of the frigging page**, the ever-growing (nearly 100K as of tonight) default list of feeds is now requested on-demand via a `GET` on the server, only one unique time.
- General UI makeover & optimization (dialogs, wording, misc options, speed) #dae9e932

### Bugfixes
- Deselected selected feeds on delete / edit / reload #5f3b8f1a
    - Before I can find the time to code the "bulk" logic to delete / edit / reload all selected feeds in batch, we unselect on drop to ensure UX consistency
- Better item layout (Media/comment icons) and wrapping #c8158af2
    - In "photo" mode, vertical images wrapped around the text, fixed #2027005b
- BIG dialog makeover : Extended defaults, shorter templates, removed a lot of boilerplate code, etc. #9e3c8c2d to #e38691d5
    - Some dialogs were not fully translated #e38691d5
    - New colors
    - Feed type buttons: Removed the "grow / last" class / hack #c46149d8
- Autoselect in all the text inputs #c46149d8
- Feed name || URL in tooltip #b02b049c
- UTC Timestamps #a5ccb4ae
- Console size adjusted for mobile #c46149d8
- Fixed a long, outstanding & known bug where the "new tab" button was not appended after an import, because of the weird gymnastics we have to do to make sure said button is always the last one, think about that when reviewing the (quite convoluted) code #b02b049c
- Lib update: NPM 7.10.0
- Removed CORS on the server #ba22b22e
    - I'm not sure we even need it at all to renew certificates
- The Pétrolette logo is no longer a `a href="#"` but a plain DIV to avoid location re-write onclick (A click on it puts focus on the 1st tab, very handy when you read Pétrolette from the couch with a lousy touchpad) #5f3b8f1a
- Refactoring #dae9e932
    - Enforce [own coding conventions](https://framagit.org/yphil/petrolette/-/blob/master/DEV.md) :|
    - PTL.prefs.js is now a 1st class module
    - s/var/const on all objects
    - Even **More** CSS streamlining
- Big translation review
    - Removed a lot of unused phrases in the i18 file (faster *everyday* loading time here too)
    - Changed dialog wording policy : Laconic and modular in the titles, explicit and literal in the content text
- [Valid HTML](https://validator.w3.org/nu/?doc=https%3A%2F%2Fpetrolette.space%2F) #c6c5bfc2 to #140685b4

## v1.2.7
- The feed's favicon file name / path is now saved along, so as to avoid re-requesting it, then re-computing the (hash) name, and only *then* re-rend it back from the server favicon cache, so everybody wins #1e5f4c20
- The Logging strategy has been slightly adjusted: We now log the access to /feed and not to /favicon #1e5f4c20
- External (ie froml the feeds) asset (typically imgs but not only) calls are now forcefully https #d4782908
- Re-enabled server compression #941dac8a

### Bugfixes
- Update feed's checkbox/select icon after drag & drop #7d7db00f
- Mobile: Removed transparency on hover #98d979c7
- New dialog options #7895970c

## v1.2.6
- Removed all sync calls on the server #71e24de1
- Error feeds keep their title #4e00f880

### Bugfixes
- Sensible defaults for NV imported feeds (status:off, height:220) #4412c6b9
- CSS rules update / cleanup #4412c6b9
- XML is not an object when nbGroups / nbFeeds < 2 (#93)

## v1.2.5
- Feed name is now saved along #037426a8
- Completely revamped the favicon (client) display system from a bg-img to a plain img with a fallback #47923bfb to #13f63af5
- HTTPS #84f8bead
- Google Drive & Dropbox sync #4e0d7aa4 to #b3cfb656
- Search within the feeds #5fb26376 to #cc29e23f
- KB navigation #27411c35
- MediaRSS metadata preloading new preference option #50ef2ebb
- Site (fav)icon in "folded" feeds #bbc6ab5e

## v1.2.1
- MediaRSS audio & video (plain HTML5) player #3800c2a0 to #ffcfcfb6
- Infinite scrolling within the feeds #0f760e9b to #b2cf0f86
- OPML (NVibes) import #9066a3d2 to #a0cc0013
- Beggar dialog "because we're no good, lowdown money grabbers" ;) #89ada899

### Bugfixes
- Relative imageUrl #8a63acaf
- Global sanitization of new inputs #a0cc0013

## v1.2.0
- Complete revamp of the image loading strategy #5bdd9341

## v1.0.0
- Nodejs version, before that Pétrolette was a server-side only PHP app, see commits for history
