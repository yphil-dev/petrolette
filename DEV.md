# Dev notes

## Fonts

The font is a custom one, containing only the dozen of glyphs used throughout the app, made with Fontello. To edit this font, juste load (or just D&Drop) [fontello-config.json](public/font/fontello-config.json) into [Fontello](https://fontello.com/), make the changes, then DLoad the archive into petrolette/tmp, and copy the relevant files:

`cd petrolette/tmp`

`rm -rfv fontello-* ; unzip fontello.zip && cp -fv fontello-*/config.json ../public/font/fontello-config.json && cp -fv fontello-*/css/fontello.css ../public/css/ && cp -fv fontello-*/font/* ../public/font/ && cp -fv fontello-*/font/fontello.ttf ~/.fonts/`
