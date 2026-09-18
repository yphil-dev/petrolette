# Dev notes

> #### Preamble
> - Please read [the Pétrolette licence file](https://gitlab.com/yphil/petrolette/-/blob/master/LICENSE).
> - The Pétrolette development team have *no* Code Of Conduct, just act responsibly, as in every aspect of adult life.
> - If you use Pétrolette, both on your own server or on the test instance, please consider [a donation](https://liberapay.com/yPhil/) for its development.

## Log

## Pétrolette is now an Edge app

Pétrolette no longer runs as a traditional, always-on Node/Express application. It runs as a [Cloudflare Worker](https://developers.cloudflare.com/workers/): a small program that is invoked when an HTTP request arrives and can run at Cloudflare locations close to users.

This is what that means in practice:

- There is no application server, persistent Node process, PM2 process, or server port to maintain.
- The Worker receives browser requests and returns responses for the application, feed retrieval, feed discovery, favicon discovery, and `robots.txt`.
- CORS-sensitive feed requests are handled by the Worker instead of directly by the browser.
- Static frontend files are served through Cloudflare's `env.ASSETS` binding.
- Feed configuration is stored by RemoteStorage and its browser cache; it is not stored in a server filesystem.
- Cloudflare manages request routing, process availability, and horizontal scaling.

The Worker entrypoint is `edge/index.js`. Feed fetching, feed discovery, and favicon discovery are implemented in the modules under `edge/`. The frontend source remains in `public/`, and `edge/build-assets.js` assembles the deployment assets.

### Local development and deployment

The local and online runtimes use the same `edge/` Worker code:

- `npm start` or `npm run dev:edge` starts Wrangler's local Worker runtime.
- `npm test` builds the assets and validates the Wrangler deployment bundle.
- `npm run deploy:edge` builds and publishes the Worker.

At first startup, Pétrolette generates the main page using the default tabs and feeds list. Feed changes are synchronized through RemoteStorage and its browser cache, allowing the same contents on desktop, laptop, and phone.

### Deployment platform

The current online deployment is Cloudflare-specific. It depends on `edge/wrangler.jsonc`, Wrangler, and Cloudflare's `env.ASSETS` static-assets binding.

The request handlers otherwise use standard Web APIs such as `Request`, `Response`, and `fetch`. They could run on another Edge platform after adding that platform's entrypoint, asset binding, and deployment configuration.

Official documentation:

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Workers runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)

## Conventions & style guide

- Pétrolette JS objects (funtions, var, ect.) and HTML / CSS elements names are in `camelCase` ;
- JQuery is aliased to `$`, and *all* JQuery vars & constants are sigil-prefixed with `$` ;
- Single quotes in JS, double quotes in HTML ;
- Indents: 2 *spaces*.

## VC workflow

All work is done on a feature branch, then reviewed and merged into the main branch. Pull Requests are welcome.

## Installation notes & caveats

- Run `npm run dev:edge` for local development.
- Run `npm test` to build and validate the Worker bundle.
- Run `npm run deploy:edge` to publish the Worker.

### Fonts

The [glyph font](public/font/fontello) is a custom one, containing only the dozen of glyphs used throughout the app, made with [Fontello](https://fontello.com/) and Pétrolette's own logo / glyph. To edit this font, just load (or D&Drop directly in the web page) [fontello-config.json](public/font/fontello-config.json) into [Fontello](https://fontello.com/), make the changes, then DLoad the archive into petrolette/tmp/fontello.zip and

`cd petrolette/tmp`

Extract and copy the relevant files:

`rm -rfv fontello-* ; unzip fontello.zip && cp -fv fontello-*/config.json ../public/font/fontello-config.json && cp -fv fontello-*/css/fontello.css ../public/css/ && cp -fv fontello-*/font/* ../public/font/ && cp -fv fontello-*/font/fontello.ttf ~/.fonts/ && fc-cache -f -v`

For any question, please [use the repo](https://gitlab.com/yphil/petrolette/-/issues/new?issue%5Bmilestone_id%5D=) itself.

Pétrolette whishes to thank you **very much** for [any help you give](https://liberapay.com/yPhil/) to her mission.
