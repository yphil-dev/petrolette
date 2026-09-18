# Dev notes

> #### Preamble
> - Please read [the Pétrolette licence file](https://gitlab.com/yphil/petrolette/-/blob/master/LICENSE).
> - The Pétrolette development team have *no* Code Of Conduct, just act responsibly, as in every aspect of adult life.
> - If you use Pétrolette, both on your own server or on the test instance, please consider [a donation](https://liberapay.com/yPhil/) for its development.

## Log

### Edge dependency policy

Dependencies used by the Worker or the browser bundle are declared in `package.json`. Node/Express server dependencies are not retained.

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

## Under the hood

Pétrolette is a serverless Edge application. The Worker entrypoint is `edge/index.js`; the same code runs locally with `npm run dev:edge` and online with `npm run deploy:edge`.

The frontend source remains in `public/`. `edge/build-assets.js` assembles the static deployment bundle from that source and the frontend dependencies. Feed fetching, feed discovery, and favicon discovery are handled by Edge modules under `edge/`.

At the first startup, Pétrolette generates its main page using the default tabs and feeds list. Feed changes are stored by RemoteStorage and its browser cache, allowing the same contents on desktop, laptop, and phone.

## Edge runtime

“Serverless Edge application” is an architectural description, not a separate product name. Pétrolette runs as a [Cloudflare Worker](https://developers.cloudflare.com/workers/), with no application server to manage. The Worker handles CORS-sensitive feed requests at the edge.

Official documentation:

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Workers runtime APIs](https://developers.cloudflare.com/workers/runtime-apis/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)

Wrangler provides local development, deployment, and runtime logs; no process manager or server configuration is required.

### Deployment platform

As currently configured, the online application runs on Cloudflare. The deployment depends on `edge/wrangler.jsonc`, Wrangler, and Cloudflare's `env.ASSETS` static-assets binding.

The request handlers otherwise use standard Web APIs such as `Request`, `Response`, and `fetch`. They could run on another Edge platform after adding that platform's entrypoint, asset binding, and deployment configuration.

### Fonts

The [glyph font](public/font/fontello) is a custom one, containing only the dozen of glyphs used throughout the app, made with [Fontello](https://fontello.com/) and Pétrolette's own logo / glyph. To edit this font, just load (or D&Drop directly in the web page) [fontello-config.json](public/font/fontello-config.json) into [Fontello](https://fontello.com/), make the changes, then DLoad the archive into petrolette/tmp/fontello.zip and

`cd petrolette/tmp`

Extract and copy the relevant files:

`rm -rfv fontello-* ; unzip fontello.zip && cp -fv fontello-*/config.json ../public/font/fontello-config.json && cp -fv fontello-*/css/fontello.css ../public/css/ && cp -fv fontello-*/font/* ../public/font/ && cp -fv fontello-*/font/fontello.ttf ~/.fonts/ && fc-cache -f -v`

For any question, please [use the repo](https://gitlab.com/yphil/petrolette/-/issues/new?issue%5Bmilestone_id%5D=) itself.

Pétrolette whishes to thank you **very much** for [any help you give](https://liberapay.com/yPhil/) to her mission.
