# NWS

NWS est un lecteur de flux RSS/Atom en ligne, ou local. Auto-hébergé, if you will.

Description [ici](http://linuxfr.org/users/philippemc/journaux/avec-quoi-tu-lis-tes-rss-le-matin).

## NWS is a personal track-free online RSS news reader

NWS is a simple but powerful web app to view and manage various XML (RSS, aTom, etc) news feeds and present them in a nice, ergonomic fashion. I made it to replace the online news services (NetVibes, Google news, etc.) that I use up until around 2007, when they became bloated and **crippled with spyware**. It's a fast, simple and light system, and I've been using it for ~~weeks~~ years now ; It does what I want from a no-nonsense, every-morning-every-day news reader.

![NWS screenshot](https://bitbucket.org/yassinphilip/nws/raw/master/screenshot.png)

### Features

-   AJAX (asynchronous) loading of the feeds (ie reload one single feed w/o reloading the whole page)
-   Handles any charset encoding/langage
-   Grabs the most out of the description text and displays it as standard tooltip on mouse hover
-   Built-in image gallery (to view all the images in a feed, or in a category)
-   Does its best to parse any given feed and identify it w/o questions
-   Plays nice with different resolutions & ergonomics, ie phones, tablets, etc
-   Directly links to any included image (and sound file)
-   If any, displays item image, wrapped around text (displays it full width if it's the only item's element, or if it comes from a photoblog) 
-   Lightweight and standard (valid HTML5 code)

### Installation

-   Copy the files in a directory within a webserver root, or just a directory on your local machine
-   Point your browser to that directory. That's it.
-   Oh, if you want to use the favicon caching feature (those favicons can take a loong time to get) make sure that the web server has the right to write to our directory:
    -   On the average web server (Debian / Apache) it's generally just a matter of, in the `nws` folder: `sudo chown .www-data .`
-   Recommended in installed online : Protect (restrict access to) the back-office / feeds file:
    -   Use [a trusted online htpassword generator](https://duckduckgo.com/?q%3Dhtpassword%2Bgenerator) (You can also create user/password pair(s) directly on the server with the command `htpasswd -b .access username password`)
    -   Paste this user/password pair in a file, and point to it from the [.htaccess](http://bitbucket.org/yassinphilip/nws/src/master/.htaccess) file

### Usage

-   Navigate the tabs with < left and > right arrow keys (and `r` & `t`)
-   Click the big "►" to view all the tab/category images in a gallery
-   Click the small, feed item's "►" to view all feed's images in a gallery
    -   Navigate the gallery's images with < left and > right arrow keys
    -   Exit the gallery by clicking outside it, or pressing the ESC key
-   Use the "Manage feeds" link to access the "back office"
    -   Use the "add a new feed" text entry field at the bottom to enter a new feed
    -   Use the "new tab" text entry field to create a new category
    -   Use the "change this feed's tab" menu to re-categorize the feed
    -   Use the "promote this feed" (^) link to bump up a feed as 1st of its tab
    -   Use the "delete this feed" (x) link to delete a feed
-   Or directly edit [feeds.xml](http://bitbucket.org/yassinphilip/nws/raw/master/feeds.xml) (way faster).

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
