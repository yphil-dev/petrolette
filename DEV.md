# Dev notes

> #### Preamble
> - Please read [the Pétrolette licence file](./LICENCE).
> - The Pétrolette development team have *no* Code Of Conduct, just act responsibly, as in every aspect of adult life.
> - If you use Pétrolette, both on your own server or on the test instance, please consider [a donation](https://liberapay.com/yPhil/) for its development.

## Log

### Library / dependancies upgrade conlicts - read before editing package.json

- As of #v1.5.5 all dependancies are now installed with NPM ;
- The `node-fetch` 3.n branch requires that the whole Pétrolette project be ported to ESM ; **help wanted please** ;
- The `helmet` 5.n branch apparently breaks CORS for images, investigating.

## Conventions & style guide

- Pétrolette JS objects (funtions, var, ect.) and HTML / CSS elements names are in `camelCase` ;
- JQuery is aliased to `$`, and *all* JQuery vars & constants are sigil-prefixed with `$` ;
- Single quotes in JS, double quotes in HTML ;
- Indents: 2 *spaces*.

## VC workflow

All work is done on `dev` or its child branches, then merged into `server` and pushed for testing, then merged into `master` at each release or critical bugfix. Pull Requests on `dev`, please.

## Installation notes & caveats

- Remember to start Pétrolette with `npm run dev` for any local development, to avoid SSL error
- To investigate any problem, start by running `npm run errors` on the server ; it logs any error from both dev & production instances

## Under the hood

On the front side, Pétrolette is a web app that serves HTML using plain Javascript ES8 and JQueryUI for the user interface.

Pétrolette is its own server, a standard [express](https://github.com/expressjs/express) app, "process-managed" by [pm2](https://pm2.keymetrics.io) ; Here is the basic operational sequence :

- `npm start` launches `pm2` as per [package.json](package.json)
- `pm2` launches [http/server.js](http/server.js) as per [pm2.config.json](pm2.config.json)
- [http/server.js](http/server.js) launches [petrolette.js](petrolette.js)
- [petrolette.js](petrolette.js) uses [routes/router.js](routes/router.js) to define 4 routes: `/` for the actual Pétrolette page, `/discover` for the RSS searching (see [Feedrat](https://framagit.org/yphil/feedrat)), `/favicon` for the site icon searching (see [Favrat](https://framagit.org/yphil/favrat)) and `static` for serving the static (CSS, icons, fonts, etc.) files.
- As of 1.5 a route is defined for each `node_dependancies` lib also
- The client send the (RSS / favicon / discover / static) request to the server
- The server returns the formatted feed to the client

At the first startup, Pétrolette generates its main page using a default tabs and feeds list, then copies this structured list the the client's [local storage persistent cache](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). The user can (should) also use a third party cloud storage to write / read his / her tabs and feeds, in order to have the same contents on all machines : Desktop, laptop, phone, etc.

If `instanceType` is `monoUser` as per the config file (see [README.md "Install"](./README.md#install)) then the feeds are saved in a single `petrolette.feeds` file in the root dir.

## Why is there a server in the first place ?

**why can't the client do all the RSS requests?** Because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), that's why and it's actually the *only* reason, if you exclude my desire to learn server-side JS :)

Pm2 automatically restarts both Pétrolette when its files are edited (excluding cache and module/lib directories, of course, see [pm2.config.json](pm2.config.json)) and itself if the host machine restarts.

### Server configuration

The ports are set up in [the config file](./package.json). To redirect on a vanilla Linux box :

`iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8000`
`iptables -t nat -I PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 8001`

### SSL certificate renewal

- Un-comment line 60 in petrolette.js
- Run `certbot certonly --manual` (as root)
- The auth file lives in `./public/.well-known/acme-challenge/`
- Comment out line 60 in petrolette.js

### Logging

Pétrolette outputs a standard [Apache CLF](http://httpd.apache.org/docs/2.4/logs.html) formated log to `~/.pm2/logs/petrolette-out.log` and `~/.pm2/logs/petrolette-error.log`.

### Time stamps

Those logs are outputted by pm2 without a time stamp, as per the directive `"time" : false,` in the [pm2.config.json](pm2.config.json) file. For pm2 to take this var into account, should you want to change it, a simple restart is not enough, you have to kill `pm2 kill` it and restart `npm restart` it.

Those logs are also rotated by pm2, using the [pm2-logrotate](https://github.com/keymetrics/pm2-logrotate) module with the default values. NOTE this module is installed *by pm2* at the first `npm start` ; Do **not** try to install it with npm.

### Fonts

The [glyph font](public/font/fontello) is a custom one, containing only the dozen of glyphs used throughout the app, made with [Fontello](https://fontello.com/) and Pétrolette's own logo / glyph. To edit this font, juste load (or just D&Drop) [fontello-config.json](public/font/fontello-config.json) into [Fontello](https://fontello.com/), make the changes, then DLoad the archive into petrolette/tmp/fontello.zip, then

`cd petrolette/tmp`

Extract and copy the relevant files:

`rm -rfv fontello-* ; unzip fontello.zip && cp -fv fontello-*/config.json ../public/font/fontello-config.json && cp -fv fontello-*/css/fontello.css ../public/css/ && cp -fv fontello-*/font/* ../public/font/ && cp -fv fontello-*/font/fontello.ttf ~/.fonts/ && fc-cache -f -v`

For any question, please [use the repo](https://framagit.org/yphil/petrolette/-/issues/new?issue%5Bmilestone_id%5D=) itself.

Thank you **very much** for [any love you give](https://liberapay.com/yPhil/) to this project.
