# Dev notes

> #### Preamble
> - Please read [the Pétrolette licence file](LICENCE).
> - The Pétrolette development team have *no* Code Of Conduct, just act responsibly, as in every aspect of life.
> - If you use Pétrolette, both on your own server or on the test instance, please consider [a donation](https://liberapay.com/yPhil/) for its development.

## Conventions

- Pétrolette functions / methods, JQuery objects / vars and HTML/CSS elements names are in `camelCase`.
JQuery is aliased to `$`, and *all* JQuery objects are prefixed with `$`.
- Single quotes in JS code, double quotes in HTML code.

## Installation notes & caveats

The two libs [Feedrat](https://framagit.org/yphil/feedrat) (to discover a RSS/Atom feed at a given URL) and [Favrat](https://framagit.org/yphil/favrat) (to discover a favicon at a given URL) are no longer hosted on npm, but installed directly from the repo ; however their dependancies have to be installed manually by running `npm install` in their respective directories.

## Under the hood

On the front side, Pétrolette is a web app that serves HTML using plain Javascript ES8 and JQuery-UI for the user interface.

Pétrolette is its own server, a standard [express](https://github.com/expressjs/express) app ; it is "process-managed" by [pm2](https://pm2.keymetrics.io) ; Here is the basic operational rundown:

- `npm start` launches `pm2` as per [package.json](package.json)
- `pm2` launches [www](bin/www) as per [pm2.config.json](pm2.config.json)
- [www](bin/www) launches [app](app.js)
- [app](app.js) uses [index.js](routes/index.js) to define 3 routes: `/` for the actual Pétrolette page, `/discover` for the RSS searching (see Feedrat) and `/favicon` for the site icon searching (see Favrat).
- The client send the RSS request to the server
- The server returns the RSS content to the client

At the first startup, Pétrolette generates its page using a default tabs and feeds list, then copies this structured list the the client's local storage persistent cache. The user can (should) also use a third party cloud storage to write / read his / her tabs and feeds, in order to have the same contents on all machines : Desktop, laptop, phone, etc.

Why is there a server in the first place, why can't the client do all the work ? Because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), that's actually the only reason, if you exclude my desire to learn server-side JS :)

pm2 automatically restarts both Pétrolette when its files are edited (excluding cache and module/lib directories, of course, see [pm2.config.json](pm2.config.json)) and itself if the host machine restarts.

### Server configuration

`iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8000`

### Logging

Pétrolette outputs a standard [Apache CLF](http://httpd.apache.org/docs/2.4/logs.html) formated log to `~/.pm2/logs/petrolette-out.log` and `~/.pm2/logs/petrolette-error.log`.

### Time stamps

Those logs are outputted by pm2 without a time stamp, as per the directive `"time" : false,` in the [pm2.config.json](pm2.config.json) file. For pm2 to take this var into account, should you want to change it, a simple restart is not enough, you have to kill `pm2 kill` it and restart `npm restart` it.

Those logs are also rotated by pm2, using the [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) module with the default values. NOTE this module is installed *by pm2* at the first `npm start` ; Do **not** try to install it with npm.

### Fonts

The [glyph font](public/font/fontello) is a custom one, containing only the dozen of glyphs used throughout the app, made with [Fontello](https://fontello.com/). To edit this font, juste load (or just D&Drop) [fontello-config.json](public/font/fontello-config.json) into [Fontello](https://fontello.com/), make the changes, then DLoad the archive into petrolette/tmp/fontello.zip, then

`cd petrolette/tmp`

Extract and copy the relevant files:

`rm -rfv fontello-* ; unzip fontello.zip && cp -fv fontello-*/config.json ../public/font/fontello-config.json && cp -fv fontello-*/css/fontello.css ../public/css/ && cp -fv fontello-*/font/* ../public/font/ && cp -fv fontello-*/font/fontello.ttf ~/.fonts/ && fc-cache -f -v`
