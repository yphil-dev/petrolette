// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var defaultFeeds = [
    {
      "name": "rename me",
      "columns": [
        [
          {
            "url": "https://www.yahoo.com/news/rss",
            "name": "Yahoo News - Latest News & Headlines",
            "type": "mixed",
            "limit": 220,
            "status": "on",
            "iconhash": "805bf265497f35a7c4881223239f190b"
          },
          {
            "url": "https://news.google.com/news/rss/rss",
            "name": "Top stories - Google News",
            "type": "mixed",
            "limit": 279,
            "status": "on",
            "iconhash": "8bc287c07a81c603df02cdb780d46681"
          },
          {
            "url": "http://feeds.feedburner.com/thechangelog",
            "name": "Changelog",
            "type": "text",
            "limit": 292,
            "status": "on",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          }
        ],
        [
          {
            "url": "http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss",
            "name": "NASA Image of the Day",
            "type": "photo",
            "limit": 424,
            "status": "on",
            "iconhash": "dbd80c59a81513959e4872fc84e0cd95"
          },
          {
            "url": "http://feeds.arstechnica.com/arstechnica/index",
            "name": "Ars Technica",
            "type": "text",
            "limit": 452,
            "status": "on",
            "iconhash": "909ebf2b292548840863bf882fe33f5b"
          }
        ],
        [
          {
            "url": "http://xkcd.com/rss.xml",
            "name": "xkcd.com",
            "type": "photo",
            "limit": 377,
            "status": "on",
            "iconhash": "bb1151aff493e09dab34fb9ff5286b32"
          },
          {
            "url": "http://explainxkcd.com/rss.xml",
            "name": "Explain xkcd",
            "type": "mixed",
            "limit": 161,
            "status": "off",
            "iconhash": "b6db26e4487295042aaf5d0dc06801d9"
          },
          {
            "url": "http://comicfeeds.chrisbenard.net/view/dilbert/default",
            "name": "Dilbert Daily Strip",
            "type": "photo",
            "limit": 107,
            "status": "on",
            "iconhash": "0973ea8ce7121c320f68413e2a2f23ab"
          },
          {
            "url": "http://feeds.feedburner.com/hackaday/LgoM/",
            "name": "Hackaday",
            "type": "mixed",
            "limit": 286,
            "status": "on",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          }
        ],
        [
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCE7gceSq79z8uW7cTe86UaA",
            "name": "Future House Radio",
            "type": "mixed",
            "limit": 220,
            "status": "on",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCdI8MAC5HoPJSJ4zrgDDI-Q",
            "name": "Tame Impala",
            "type": "mixed",
            "limit": 390,
            "status": "on",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCtNdVINwfYFTQEEZgMiQ8FA",
            "name": "Bailey Sarian",
            "type": "mixed",
            "limit": 236,
            "status": "on",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          }
        ]
      ]
    },
    {
      "name": "news",
      "columns": [
        [
          {
            "url": "http://www.thefiscaltimes.com/feeds/articles/all/rss.xml",
            "name": "The Fiscal Times",
            "type": "mixed",
            "limit": 221,
            "status": "off",
            "iconhash": "39cf19effa1182df6fd34a617728c821"
          },
          {
            "url": "http://www.mirror.co.uk/news/world-news/rss.xml",
            "name": "Mirror - World news",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "e2eee727b03e1eaf7e728413129dadbb"
          },
          {
            "url": "https://sputniknews.com/export/rss2/world/index.xml",
            "name": "Sputnik News - World News, Breaking News & Top Stories",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "4eb6767d410d4a9e5c74b32e887d2be3"
          },
          {
            "url": "https://www.rt.com/rss/news/",
            "name": "RT World News",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "0decfab7eba32f75a2a5a31bca7a66b8"
          },
          {
            "url": "https://www.cnbc.com/id/100727362/device/rss/rss.html",
            "name": "cnbc - International",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "182bc4d2924eb5bdbc00678941fbbe44"
          },
          {
            "url": "https://worldnewssuperfast.blogspot.com/feeds/posts/default?alt=rss",
            "name": "WORLD NEWS SUPERFAST - LATEST BREAKING NEWS",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "a3a91add9fc8dd7f90a8abb09783bfa1"
          },
          {
            "url": "http://yahoo.com/news/rss/world",
            "name": "Yahoo News - Latest News & Headlines",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "2b98ebea708d5e8d85ac4efbcf0974ff"
          },
          {
            "url": "http://www.aljazeera.com/xml/rss/all.xml",
            "name": "Al Jazeera – Breaking News, World News and Video from Al Jazeera",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "2734cb8b694e6598580e6ea598f787cd"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/rss.xml",
            "name": "BBC News - Home",
            "type": "mixed",
            "limit": 352,
            "status": "off",
            "iconhash": "3984613864650f6fcec33e77e436c4c2"
          },
          {
            "url": "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
            "name": "NYT > World News",
            "type": "mixed",
            "limit": 400,
            "status": "off",
            "iconhash": "d8e16228c3d26cdfd402442479bd020f"
          },
          {
            "url": "https://www.latimes.com/world/rss2.0.xml",
            "name": "LA. Times World & Nation",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "736fa288fadad36571864939aa5d2b6d"
          }
        ],
        [
          {
            "url": "https://www.buzzfeed.com/world.xml",
            "name": "BuzzFeed News",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "cd94bf8fa4fcdac9b1014afc2473988c"
          },
          {
            "url": "https://www.globalissues.org/news/feed",
            "name": "Global Issues News Headlines",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "11140a8864aff897f9575e45fdd41fbd"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/world/rss.xml",
            "name": "BBC News - World",
            "type": "mixed",
            "limit": 231,
            "status": "off",
            "iconhash": "3984613864650f6fcec33e77e436c4c2"
          },
          {
            "url": "http://feeds.washingtonpost.com/rss/world",
            "name": "WaPo - World",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://abcnews.go.com/abcnews/internationalheadlines",
            "name": "ABC News: International",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "c62bda9e88c11a7a3c67348b70c43e98"
          },
          {
            "url": "https://www.cbsnews.com/latest/rss/world",
            "name": "World - CBSNews.com",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "ca6dac61e177ad445f09480e0a141ad1"
          },
          {
            "url": "https://www.thesun.co.uk/news/worldnews/feed/",
            "name": "World News - breaking international headlines and exclusives | The Sun",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "e29714d4e8c14678d341b27e645a9637"
          },
          {
            "url": "https://www.npr.org/rss/rss.php?id=1001",
            "name": "News : NPR",
            "type": "mixed",
            "limit": 195,
            "status": "off",
            "iconhash": "6dbbd8d243632421c4d76b0d14c42a07"
          },
          {
            "url": "http://www.independent.co.uk/news/world/rss",
            "name": "The Independent",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "81b5662f2667162704a85e11a856a667"
          },
          {
            "url": "https://www.theguardian.com/world/rss",
            "name": "World news | The Guardian",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "9aa8c839f619e2bdaf062d625a5d92f2"
          },
          {
            "url": "https://www.euronews.com/rss?level=theme&name=news",
            "name": "News | Euronews RSS",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "5cbc226bc3aaa4c8c8bc549815bbc8c7"
          }
        ],
        [
          {
            "url": "http://feeds.feedburner.com/ndtvnews-world-news",
            "name": "NDTV News - World-news",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://feeds.feedburner.com/time/world",
            "name": "World – TIME",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://hotair.com/feed",
            "name": "Hotair",
            "type": "mixed",
            "limit": 400,
            "status": "off",
            "iconhash": "b35a108c0db76b646dd2c7559144b517"
          },
          {
            "url": "http://rss.cnn.com/rss/edition_world.rss",
            "name": "CNN.com - RSS Channel - World",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.newsbusters.org/blog/feed",
            "name": "Newsbusters - Welcome to NewsBusters, a project of the Media Research Center (MRC), America’s leading media watchdog in documenting, exposing",
            "type": "mixed",
            "limit": 189,
            "status": "off",
            "iconhash": "8c0a262a6fb2aa18a715bfc571987c86"
          },
          {
            "url": "http://www.cbc.ca/cmlink/rss-world",
            "name": "CBC | World News",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "fc03b20b60a5cc151bf8118d8a790d2b"
          },
          {
            "url": "https://www.vox.com/rss/world/index.xml",
            "name": "Vox -  World",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "5af80f898b33f7fde8a07bff2475213b"
          },
          {
            "url": "https://trends.gab.com/trend-feed/rss",
            "name": "GabTrends.com Feed",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "440f4effe9bb0b1aaf1251b9205ebade"
          },
          {
            "url": "https://www.nationalreview.com/corner/feed/",
            "name": "The Corner | National Review",
            "type": "mixed",
            "limit": 301,
            "status": "off",
            "iconhash": "80dce944c0410a50d08a77b08a767cee"
          },
          {
            "url": "http://thehill.com/rss/syndicator/19109",
            "name": "TheHill - The Hill News",
            "type": "mixed",
            "limit": 204,
            "status": "off",
            "iconhash": "ac3a4aec5ef119d54acbb370fa2d5f24"
          },
          {
            "url": "https://sputniknews.com/export/rss2/archive/index.xml",
            "name": "Sputnik News - World News, Breaking News & Top Stories",
            "type": "mixed",
            "limit": 190,
            "status": "off",
            "iconhash": "4eb6767d410d4a9e5c74b32e887d2be3"
          }
        ]
      ]
    },
    {
      "name": "tek",
      "columns": [
        [
          {
            "url": "https://kerneltalks.com/feed",
            "name": "Kernel Talks",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "a5c93cf9680359ca06d1cfc3967777c7"
          },
          {
            "url": "https://www.gamingonlinux.com/article_rss.php",
            "name": "GamingOnLinux Latest Articles",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "334221f783688b439dac85a514814695"
          },
          {
            "url": "https://www.unixmen.com/feed/",
            "name": "Unixmen",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "cc9b0a267ec8d9b5d02c302ceb9c5b70"
          },
          {
            "url": "https://linuxhint.com/feed/",
            "name": "Linux Hint",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "d8070b203ec7b1c3ca4e52d57caf1c34"
          },
          {
            "url": "https://itsfoss.com/feed/",
            "name": "It's FOSS",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "02af2de1deedc370482adc1752be6baa"
          },
          {
            "url": "http://rss.slashdot.org/Slashdot/slashdotLinux",
            "name": "Slashdot: Linux",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": ""
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCHugE6eRhqB9_AZQh4DDbIw",
            "name": "Linux Action Show",
            "type": "text",
            "limit": 216,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.linux-magazine.com/rss/feed/lmi_full",
            "name": "Linux Magazine Full Feed",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "a96f0eb898c97779e2c43d103fa283f0"
          },
          {
            "url": "http://feeds.feedburner.com/venturebeat/SZYF",
            "name": "VentureBeat",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://feeds2.feedburner.com/webupd8",
            "name": "Web Upd8 - Ubuntu / Linux blog",
            "type": "text",
            "limit": 400,
            "status": "off",
            "iconhash": "a43dfbc96d65f44561f3b64ac92ce1cf"
          }
        ],
        [
          {
            "url": "https://www.phoronix.com/rss.php",
            "name": "Phoronix",
            "type": "mixed",
            "limit": 181,
            "status": "off",
            "iconhash": "d4b20fa2512849e52770b4d73c06ddf1"
          },
          {
            "url": "https://nitter.fdn.fr/mainframed767/rss",
            "name": "Soldier of FORTRAN / @mainframed767",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "617705fadb8f6bb4f71f5963c0df8b27"
          },
          {
            "url": "https://nitter.fdn.fr/scala_love/rss",
            "name": "Scala Love ❤️ / @scala_love",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "617705fadb8f6bb4f71f5963c0df8b27"
          },
          {
            "url": "https://blog.slaks.net/feeds/posts/default.xml",
            "name": "SLaks.Blog",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "099e413606d8eb97eb3a7ac89f3b730f"
          },
          {
            "url": "http://www.theverge.com/rss/index.xml",
            "name": "The Verge -  All Posts",
            "type": "mixed",
            "limit": 304,
            "status": "off",
            "iconhash": "0f30a5ed9348f474c3bb68fa03a698aa"
          },
          {
            "url": "https://www.vox.com/rss/recode/index.xml",
            "name": "Vox -  Recode",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "5af80f898b33f7fde8a07bff2475213b"
          },
          {
            "url": "https://www.techrepublic.com/rssfeeds/articles/",
            "name": "Articles on TechRepublic",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "8395b0c2bcdb50bda2a827a8e79a447a"
          },
          {
            "url": "http://eab.abime.net/external.php?type=rss2",
            "name": "abime.net - news",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "5b27ef4a9a4f565c044949f3aeed571f"
          },
          {
            "url": "https://www.computerweekly.com/rss/All-Computer-Weekly-content.xml",
            "name": "ComputerWeekly.com",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "8bd69a1c59a63dab5d9f3e319ea46b6a"
          },
          {
            "url": "https://readwrite.com/feed/?x=1",
            "name": "ReadWrite",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "05742e67028f39b919d36dafec737781"
          }
        ],
        [
          {
            "url": "http://techrights.org/feed/",
            "name": "Techrights",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "1dc66c439367ad2c25e59869572f559c"
          },
          {
            "url": "https://www.theregister.co.uk/software/headlines.atom",
            "name": "The Register - Software",
            "type": "mixed",
            "limit": 300,
            "status": "off",
            "iconhash": "1c3cc73550b003b4054bb90b90e1b938"
          },
          {
            "url": "https://solar.lowtechmagazine.com/feeds/all.rss.xml",
            "name": "LOW←TECH MAGAZINE",
            "type": "text",
            "limit": 66,
            "status": "off",
            "iconhash": "574594e818b6b562140a5222a88b5c96"
          },
          {
            "url": "https://hackernoon.com/feed",
            "name": "Hacker Noon",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "fac40ba54b0bd774e7ace66ff07dd1d6"
          },
          {
            "url": "https://feeds.feedburner.com/LosTechies",
            "name": "Los Techies",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "eacbcccdf02702a585315aba206c3710"
          }
        ]
      ]
    },
    {
      "name": "img",
      "columns": [
        [
          {
            "url": "http://astrobin.com/iotd/rss/iotd",
            "name": "AstroBin's Image of the Day feed",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "9cdbd47dd6a3f0d21c7bf98c148c5275"
          },
          {
            "url": "https://www.outdoorphotographer.com/feed",
            "name": "Outdoor Photographer",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "69bf437ea6a712b4b0b8b6c67798d5df"
          },
          {
            "url": "https://visualwilderness.com/feed",
            "name": "Visual Wilderness",
            "type": "photo",
            "limit": 455,
            "status": "off",
            "iconhash": "6b2d98a1c04afdba90994d9a736278c1"
          },
          {
            "url": "http://cabinporn.com/rss/",
            "name": "Cabin Porn",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "b8febf27b2114f8ae9a55df887a1862d"
          }
        ],
        [
          {
            "url": "https://www.reddit.com/r/NatureIsFuckingLit.rss",
            "name": "🔥 Nature Is Fucking Lit",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "2acdf6d2b77e2c409b991f356391450d"
          },
          {
            "url": "https://www.reddit.com/r/EarthPorn.rss",
            "name": "EarthPorn: Amazing images of light and landscape",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "2acdf6d2b77e2c409b991f356391450d"
          },
          {
            "url": "http://www.nanpa.org/feed/",
            "name": "NANPA®",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "cf81164e01b2c5d0f7e0a2e164c2552b"
          },
          {
            "url": "https://loadedlandscapes.com/feed",
            "name": "Loaded Landscapes",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "e29bb7abee6ccca717d71a1e2884028b"
          }
        ],
        [
          {
            "url": "http://www.blendernation.com/feed/",
            "name": "BlenderNation",
            "type": "photo",
            "limit": 536,
            "status": "off",
            "iconhash": "449d47861f91070ae0d9a894440c3f61"
          },
          {
            "url": "https://motionographer.com/feed/",
            "name": "Motionographer",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "1f9112eb4ecde859ff7c29237119c472"
          },
          {
            "url": "https://www.awn.com/news/rss.xml",
            "name": "AWN Headline News",
            "type": "photo",
            "limit": 600,
            "status": "off",
            "iconhash": "4a05b0e6cfa661ec66c48c25014a4b68"
          }
        ]
      ]
    },
    {
      "name": "snd",
      "columns": [
        [
          {
            "url": "https://exode.me/feeds/videos.xml?videoChannelId=484",
            "name": "yPhil Videos",
            "type": "mixed",
            "limit": 203,
            "status": "off",
            "iconhash": "15937407a41d9336563ed66c6cf8b5e8"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3I2GFN_F8WudD_2jUZbojA",
            "name": "KEXP",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "http://feeds.feedburner.com/metalinjection",
            "name": "Metal Injection",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://edm.com/.rss/full/",
            "name": "EDM.com - The Latest Electronic Dance Music News, Reviews & Artists",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "0bb6f8d4b288622337962cfcabe9e56e"
          },
          {
            "url": "https://www.rollingstone.com/music/rss",
            "name": "Music – Rolling Stone",
            "type": "mixed",
            "limit": 307,
            "status": "off",
            "iconhash": "64f71236d91829d1d391bd68d3d841a6"
          },
          {
            "url": "https://feeds.feedburner.com/dangerousminds/dot/net",
            "name": "Dangerous Minds",
            "type": "mixed",
            "limit": 315,
            "status": "off",
            "iconhash": "eacbcccdf02702a585315aba206c3710"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCt7fwAhXDy3oNFTAzF2o8Pw",
            "name": "theneedledrop",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "http://pitchfork.com/rss/news/",
            "name": "Pitchfork: News",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "0b90b068a517e864ee45b44ceeb21f8d"
          },
          {
            "url": "https://consequenceofsound.net/feed/",
            "name": "Consequence of Sound",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "a71a3fd2acefc7f46d339669dd136af9"
          },
          {
            "url": "https://feeds.npr.org/15709577/rss.xml",
            "name": "All Songs Considered : NPR",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "7c866278088a8ccad0a092e7a19507e1"
          },
          {
            "url": "https://www.youredm.com/feed/",
            "name": "Your EDM",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "c4e98b94c10dad6feaea886253a36952"
          },
          {
            "url": "https://musewire.com/feed/",
            "name": "MuseWire",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://createdigitalmusic.com/feed/",
            "name": "CDM Create Digital Music",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "c2af35cc0a15334601c03d10d6715b95"
          },
          {
            "url": "http://planet.linuxaudio.org/rss20.xml",
            "name": "planet.linuxaudio.org",
            "type": "mixed",
            "limit": 216,
            "status": "off",
            "iconhash": "4b9ec1ec47f35d561771125ea6142180"
          },
          {
            "url": "https://www.attackmagazine.com/feed",
            "name": "Attack Magazine",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "5b3194816c9b7f4857e27a33a471ddac"
          },
          {
            "url": "https://audiohertz.com/feed/",
            "name": "Audio Hertz",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "75722701c44aea77258d2b29475a18c2"
          },
          {
            "url": "https://www.waves.com/blog?rss=magazine",
            "name": "Waves  Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "86dfb689257e6bbde2aa4c37f45c4d90"
          },
          {
            "url": "https://musical-artifacts.com/artifacts.atom",
            "name": "Musical Artifacts | Libre resources for music making",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "298fe062c61b0a1fc9b342a64555242f"
          }
        ],
        [
          {
            "url": "https://www.resolutionmag.com/feed/",
            "name": "Resolution Magazine",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "c5b0a7789e507eb7f1fbf06492ed9136"
          },
          {
            "url": "https://www.blackghostaudio.com/blog/rss.xml",
            "name": "Black Ghost Audio",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "cf1155349daf1ff6b27db8d4e0e2b61f"
          },
          {
            "url": "https://www.musictech.net/feed/",
            "name": "MusicTech",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "aef3ce84bdbf9601de892506729bc031"
          },
          {
            "url": "https://www.nme.com/feed",
            "name": "NME",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "87a08bc84ab0f9f6490764ec4d05adea"
          },
          {
            "url": "https://theproaudiofiles.com/feed/",
            "name": "Pro Audio Files",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "5941e19388873d12df2c5cc0dc733c95"
          },
          {
            "url": "https://linuxmusicians.com/feed.php",
            "name": "LinuxMusicians",
            "type": "text",
            "limit": 316,
            "status": "off",
            "iconhash": "2a414302b35e9a6799210f27dfeae948"
          },
          {
            "url": "http://www.kr-homestudio.fr/feed/",
            "name": "KR home-studio",
            "type": "mixed",
            "limit": 267,
            "status": "off",
            "iconhash": "6a974310504e39b1058c7fee5b5c478d"
          },
          {
            "url": "http://www.avidblogs.com/feed/",
            "name": "Avid Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "e747cc8d50802e44144ba4204c9b4006"
          },
          {
            "url": "https://www.audiotechnology.com/feed",
            "name": "AudioTechnology",
            "type": "mixed",
            "limit": 125,
            "status": "off",
            "iconhash": "f0066cf2fc080e5984b0772264bd5af8"
          },
          {
            "url": "https://audioxpress.com/rss",
            "name": "audioXpress | audioXpress Magazine",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "fc94e0c9213fd36e0afe2eb380f29b89"
          }
        ]
      ]
    },
    {
      "name": "sci",
      "columns": [
        [
          {
            "url": "https://blog.explore.org/feed/",
            "name": "Explore",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "05ccf53f9251313e74ec54b7314832eb"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCwmZiChSryoWQCZMIQezgTg",
            "name": "BBC Earth",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.independentsciencenews.org/feed/",
            "name": "Independent Science News | Food, Health and Agriculture Bioscience News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "2c2b08abcafa55000734c579715b97a5"
          },
          {
            "url": "https://www.labbulletin.com/feed.rdf",
            "name": "Laboratory News from Lab Bulletin",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "0a26a4aebedb4e2c636fa7f3b56d7ae2"
          },
          {
            "url": "https://www.scidev.net/global/global_rss.xml",
            "name": "SciDev - Global",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "63a9ba52f7e6b0fdd5a14620e09d6a93"
          },
          {
            "url": "https://www.advancedsciencenews.com/feed/",
            "name": "Advanced Science News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "606d9a3561aca2d559b3861543472ff6"
          },
          {
            "url": "https://phys.org/rss-feed",
            "name": "Phys.org - latest science and technology news stories",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "4672663d2bb3f9372a7fb2cd084d81f3"
          },
          {
            "url": "http://feeds.nature.com/nature/rss/current",
            "name": "Nature - Issue - nature.com science feeds",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk",
            "name": "BBC News - Science & Environment",
            "type": "mixed",
            "limit": 221,
            "status": "off",
            "iconhash": "3984613864650f6fcec33e77e436c4c2"
          }
        ],
        [
          {
            "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
            "name": "NASA Breaking News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "07ac623ab555ca14939e45f03c27868f"
          },
          {
            "url": "https://eos.org/feed",
            "name": "Eos",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "8f7611b5f152a93cedeabce3f1888d86"
          },
          {
            "url": "http://www.astronomy.com/rss/news",
            "name": "Astro News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "7276a7dc0222e3fbc9c3b3fb53b34efa"
          },
          {
            "url": "https://spaceflightnow.com/feed/",
            "name": "Spaceflight Now",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "82aa8f896f1601e3532095792f663e8b"
          },
          {
            "url": "https://astronomynow.com/feed/",
            "name": "Astronomy Now",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f170ff92341e5c42730d547696deb521"
          },
          {
            "url": "http://spaceq.ca/feed/",
            "name": "SpaceQ",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e505c2d5fe634e6077b6ed64fc6388eb"
          },
          {
            "url": "https://www.universetoday.com/feed",
            "name": "Universe Today",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "5eb0b71b0abd31489626456e6a1fb468"
          },
          {
            "url": "http://www.esa.int/rssfeed/TopNews",
            "name": "ESA Top News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "2bd10d345ace8c0813cedd27dc8ec80a"
          },
          {
            "url": "http://earthsky.org/feed",
            "name": "EarthSky",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e0619acfda41de5daa8baf4ac1d9d46e"
          },
          {
            "url": "https://www.nasaspaceflight.com/feed",
            "name": "NASASpaceFlight.com",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "04cdefa71d907def4e6cbfb8231c7baa"
          },
          {
            "url": "https://www.spaceflightinsider.com/feed/",
            "name": "SpaceFlight Insider",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e9978290d0bd393b9423bea5f18b8108"
          },
          {
            "url": "https://spacenews.com/feed/",
            "name": "SpaceNews",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "036abb42e9d1f533fa2f2a42db5724af"
          },
          {
            "url": "http://feeds.feedburner.com/spaceref/jext",
            "name": "SpaceRef",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          }
        ],
        [
          {
            "url": "http://feeds.feedburner.com/BreakingScienceNews?format=xml",
            "name": "Breaking Science News | Sci-News.com",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://www.eurekalert.org/rss.xml",
            "name": "EurekAlert! - Breaking News",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "6d88b9b93f770e6e1a9e4c31e8673b57"
          },
          {
            "url": "http://www.sciencemag.org/rss/current.xml",
            "name": "Science current issue",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "ca07ef510f700221ae7145f7d17cbad8"
          },
          {
            "url": "https://news.cnrs.fr/rss",
            "name": "CNRS News",
            "type": "mixed",
            "limit": 183,
            "status": "off",
            "iconhash": "5b15a4215ad6fd6a0c641a5d1c26dced"
          },
          {
            "url": "http://rss.sciam.com/ScientificAmerican-Global",
            "name": "Scientific American Content: Global",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://undark.org/feed/",
            "name": "Undark Magazine",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "8c1132745e4bd009fc825dbe594b7318"
          },
          {
            "url": "http://feeds.feedburner.com/scitechdaily",
            "name": "SciTechDaily",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://www.livescience.com/home/feed/site.xml",
            "name": "Livescience.com",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "5c38aa97a2a7a8d9f177527922accb62"
          },
          {
            "url": "https://ask-open-science.org/feed/qa.rss",
            "name": "Ask Open Science - Recent questions and answers",
            "type": "mixed",
            "limit": 378,
            "status": "off",
            "iconhash": "c935e81cc049a9de394d2eefd14dd1d8"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk",
            "name": "BBC News - Technology",
            "type": "mixed",
            "limit": 241,
            "status": "off",
            "iconhash": "3984613864650f6fcec33e77e436c4c2"
          }
        ]
      ]
    },
    {
      "name": "comics",
      "columns": [
        [
          {
            "url": "https://www.comicsrss.com/rss/jimsjournal.rss",
            "name": "Jim's Journal",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/jimmorin.rss",
            "name": "Jim Morin",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/jim-benton-cartoons.rss",
            "name": "Jim Benton Cartoons",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/humorcartoon.rss",
            "name": "Jerry King Cartoons",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/jeffdanziger.rss",
            "name": "Jeff Danziger",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/janesworld.rss",
            "name": "Jane's World",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/jake-likes-onions.rss",
            "name": "Jake Likes Onions",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/itsallaboutyou.rss",
            "name": "It's All About You",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/invisible-bread.rss",
            "name": "Invisible Bread",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/inspector-dangers-crime-quiz.rss",
            "name": "Inspector Danger's Crime Quiz",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/inkpen.rss",
            "name": "Ink Pen",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/inthesticks.rss",
            "name": "In the Sticks",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/inthebleachers.rss",
            "name": "In the Bleachers",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/in-security.rss",
            "name": "In Security",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/imaginethis.rss",
            "name": "Imagine This",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/ice-cream-sandwich-comics.rss",
            "name": "Ice Cream Sandwich Comics",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/hubris.rss",
            "name": "HUBRIS!",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/heartofthecity.rss",
            "name": "Heart of the City",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/harley.rss",
            "name": "Harley",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/green-humour.rss",
            "name": "Green Humour",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/compu-toon.rss",
            "name": "Compu-toon",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/committed.rss",
            "name": "Committed",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/crumb.rss",
            "name": "Crumb",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/dilbert-classics.rss",
            "name": "Dilbert Classics",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/dilbert.rss",
            "name": "Dilbert",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/american-chop-suey.rss",
            "name": "American Chop Suey",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/amanda-the-great.rss",
            "name": "Amanda the Great",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/adamathome.rss",
            "name": "Adam@Home",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/tavicat.rss",
            "name": "@Tavicat",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/9to5.rss",
            "name": "9 to 5",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/ninechickweedlane.rss",
            "name": "9 Chickweed Lane",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/2cowsandachicken.rss",
            "name": "2 Cows and a Chicken",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          }
        ],
        [
          {
            "url": "https://www.comicsrss.com/rss/mannequin-on-the-moon.rss",
            "name": "Mannequin on the Moon",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/mallardfillmore.rss",
            "name": "Mallard Fillmore",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/making-it.rss",
            "name": "Making It",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/maintaining.rss",
            "name": "Maintaining",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/magnificatz.rss",
            "name": "Magnificatz",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/magicinaminute.rss",
            "name": "Magic in a Minute",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/macanudo.rss",
            "name": "Macanudo",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lunarbaboon.rss",
            "name": "Lunarbaboon",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/liz-climo-cartoons.rss",
            "name": "Liz Climo Cartoons",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/marias-day.rss",
            "name": "Maria's Day",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/little-fried-chicken-and-sushi.rss",
            "name": "Little Fried Chicken and Sushi",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lisabenson.rss",
            "name": "Lisa Benson",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lio.rss",
            "name": "Lio",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/life-on-earth.rss",
            "name": "Life on Earth",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/libertymeadows.rss",
            "name": "Liberty Meadows",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lil-abner.rss",
            "name": "Li'l Abner",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/learn-to-speak-cat.rss",
            "name": "Learn to Speak Cat",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kid-shay-comics.rss",
            "name": "Kid Shay Comics",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kid-beowulf.rss",
            "name": "Kid Beowulf",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/little-nemo.rss",
            "name": "Little Nemo",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kal.rss",
            "name": "Kevin Kallaugher",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kencatalino.rss",
            "name": "Ken Catalino",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/junk-drawer.rss",
            "name": "Junk Drawer",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/jumpstart.rss",
            "name": "JumpStart",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/johndeering.rss",
            "name": "John Deering",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/joey-alison-sayers-comics.rss",
            "name": "Joey Alison Sayers Comics",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/joevanilla.rss",
            "name": "Joe Vanilla",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/joe-heller.rss",
            "name": "Joe Heller",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kevin-necessary-editorial-cartoons.rss",
            "name": "Kevin Necessary Editorial Cartoons",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/adult-children.rss",
            "name": "Adult Children",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/fowl-language.rss",
            "name": "Fowl Language",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/foolish-mortals.rss",
            "name": "Foolish Mortals",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          }
        ],
        [
          {
            "url": "http://webcomicname.com/rss",
            "name": "webcomic name",
            "type": "photo",
            "limit": 400,
            "status": "off",
            "iconhash": "f07c7b1127c304f2e52b8b750b06e1ba"
          },
          {
            "url": "http://thisisindexed.com/feed",
            "name": "Indexed",
            "type": "photo",
            "limit": 180,
            "status": "off",
            "iconhash": "2e9c275b77cf862b8724d2e307951f17"
          },
          {
            "url": "https://moonbeard.com/feed/atom/",
            "name": "Moonbeard",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "c681f29a0aa8c04a09c1dbc092bf7b64"
          },
          {
            "url": "https://blog.xkcd.com/rss",
            "name": "xkcd Blog",
            "type": "mixed",
            "limit": 180,
            "status": "off",
            "iconhash": "a6c93efb2be26321a0ebd8077ed7edd3"
          },
          {
            "url": "http://what-if.xkcd.com/feed.atom",
            "name": "What If?",
            "type": "photo",
            "limit": 79,
            "status": "off",
            "iconhash": "6cc238e2c7843e436a60f50ea22b9599"
          },
          {
            "url": "https://www.comicsrss.com/rss/lug-nuts.rss",
            "name": "Lug Nuts",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/luckycow.rss",
            "name": "Lucky Cow",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/luann.rss",
            "name": "Luann",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lostsideofsuburbia.rss",
            "name": "Lost Side of Suburbia",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lostsheep.rss",
            "name": "Lost Sheep",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/looseparts.rss",
            "name": "Loose Parts",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/looks-good-on-paper.rss",
            "name": "Looks Good on Paper",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/long-story-short.rss",
            "name": "Long Story Short",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lola.rss",
            "name": "Lola",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lukey-mcgarrys-tldr.rss",
            "name": "Lukey McGarry’s TLDR",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/laughing-redhead-comics.rss",
            "name": "Laughing Redhead Comics",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lastkiss.rss",
            "name": "Last Kiss",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lards-world-peace-tips.rss",
            "name": "Lard&#39;s World Peace Tips",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/laloalcaraz.rss",
            "name": "Lalo Alcaraz",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lacucaracha.rss",
            "name": "La Cucaracha",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/klibans-cats.rss",
            "name": "Kliban's Cats",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kliban.rss",
            "name": "Kliban",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kitchen-capers.rss",
            "name": "Kitchen Capers",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/kitncarlyle.rss",
            "name": "Kit 'N' Carlyle",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/lay-lines.rss",
            "name": "Lay Lines",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/alis-house.rss",
            "name": "Ali&#39;s House",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/algoodwyn.rss",
            "name": "Al Goodwyn Editorial Cartoons",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/aj-and-magnus.rss",
            "name": "AJ and Magnus",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/agnes.rss",
            "name": "Agnes",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/alley-oop.rss",
            "name": "Alley Oop",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          },
          {
            "url": "https://www.comicsrss.com/rss/1-and-done.rss",
            "name": "1 and Done",
            "type": "photo",
            "limit": 220,
            "status": "off",
            "iconhash": "3dade44dfa3646b9ea19d3b037e9cfa3"
          }
        ]
      ]
    },
    {
      "name": "HW",
      "columns": [
        [
          {
            "url": "https://www.reddit.com/r/specializedtools/.rss",
            "name": "Specialized Tools",
            "type": "mixed",
            "limit": 270,
            "status": "off",
            "iconhash": "2acdf6d2b77e2c409b991f356391450d"
          },
          {
            "url": "https://circuits-diy.com/feed/",
            "name": "Circuits DIY",
            "type": "mixed",
            "limit": 126,
            "status": "off",
            "iconhash": "7bb5c7a9ec63305768940b7bf9ddb3e6"
          },
          {
            "url": "https://gearjunkie.com/feed",
            "name": "GearJunkie",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e855f154bb52d1c28c95eab7080b4729"
          },
          {
            "url": "https://www.ny-engineers.com/blog/rss.xml",
            "name": "New York Engineers Blog",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "d67f2c623a0f0c950e2df4575a42ce7d"
          },
          {
            "url": "https://www.cnczone.com/forums/external.php?type=RSS2",
            "name": "CNCzone.com- Largest Forums for CNC Professional and Hobbyist alike!",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "fb586885bbe3c6c737221b742f068c6b"
          },
          {
            "url": "https://www.mechanicalpost.site/feeds/posts/default",
            "name": "The Mechanical Post",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "eb6bf7e82f5cf486e464faca77f04952"
          },
          {
            "url": "http://www.dpreview.com/feeds/news.xml",
            "name": "DP Review",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "65116e8eef0ccc384bf825f2db45eb43"
          },
          {
            "url": "http://www.divephotoguide.com/rss/news",
            "name": "Dive photo guide",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "b1f5f0106e7f931b884f699d34522dc2"
          },
          {
            "url": "https://www.forgottenweapons.com/rss",
            "name": "Forgotten Weapons",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "4f03e1845e3610d42d99a4fdacb227a1"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCgigsJ3nP2jRoI8Ci-N6Lmw",
            "name": "Troy and Jerry Think Dank",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC5I2hjZYiW9gZPVkvzM8_Cw",
            "name": "Techmoan",
            "type": "mixed",
            "limit": 191,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCU9SoQxJewrWb_3GxeteQPA",
            "name": "Mr Carlson's Lab",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://hackspace.raspberrypi.org/feed",
            "name": "HackSpace magazine",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "2b348dfb87e71bf655ba667856a121dd"
          }
        ],
        [
          {
            "url": "https://www.tomshardware.com/feeds/all",
            "name": "Tom's Hardware",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "afa3cda4bd95df21faa1e36dee19c585"
          },
          {
            "url": "https://feeds.feedburner.com/intelnewsroom",
            "name": "Intel Newsroom",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "eacbcccdf02702a585315aba206c3710"
          },
          {
            "url": "https://www.ibm.com/blogs/research/category/quantcomp/rss",
            "name": "Quantum Computing – IBM Research Blog",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "3ff47a2213cf1e92faa9529162e93865"
          },
          {
            "url": "https://newsroom.intel.com/tag/quantum-computing/rss",
            "name": "Quantum Computing – Intel Newsroom",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "52496fa35ab0da343626ae017b3710c5"
          },
          {
            "url": "https://custompc.raspberrypi.org/feed",
            "name": "Custom PC",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e4b0068421a1b12603260ec38ce287bb"
          },
          {
            "url": "https://www.raspberrypi.org/blog/feed",
            "name": "Raspberry Pi Blog – Raspberry Pi",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "8254d6b1a9273cbed133ec212105b2c6"
          },
          {
            "url": "https://magpi.raspberrypi.org/feed",
            "name": "The MagPi",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "2f583f16e4b5465342c0dd8d9f1d3dd4"
          },
          {
            "url": "https://retropie.org.uk/feed/",
            "name": "RetroPie",
            "type": "mixed",
            "limit": 296,
            "status": "off",
            "iconhash": "b340b40bf981950469285d4a3089e424"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCD0y51PJfvkZNe3y3FR5riw",
            "name": "Chyrosran22",
            "type": "mixed",
            "limit": 248,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCrwObTfqv8u1KO7Fgk-FXHQ",
            "name": "Actually Hardcore Overclocking",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCTzLRZUgelatKZ4nyIKcAbg",
            "name": "Hardware Canucks",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          }
        ],
        [
          {
            "url": "https://simpleflying.com/feed/",
            "name": "Simple Flying",
            "type": "mixed",
            "limit": 237,
            "status": "off",
            "iconhash": "ebea9c323127f7cf8f19b37b703b3590"
          },
          {
            "url": "https://hushkit.net/rss",
            "name": "Hush-Kit",
            "type": "text",
            "limit": 190,
            "status": "off",
            "iconhash": "dd88725ae1b48210d4a90dba7ca80748"
          },
          {
            "url": "https://www.icebike.org/feed/",
            "name": "Icebike.org",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "bab9afb3a026addd3ded4e289fb536d0"
          },
          {
            "url": "https://bikesnobnyc.com/feed/",
            "name": "Bike Snob NYC",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "91d6c32a5225179076583d12bbee2044"
          },
          {
            "url": "https://bikingbro.com/feed",
            "name": "BikingBro",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "ae03f28e53c311d2f6b5f4312b49be01"
          },
          {
            "url": "http://feeds.feedburner.com/cyclingtipsblog/TJog?x=1",
            "name": "CyclingTips",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://www.bikeexif.com/feed",
            "name": "Bike EXIF",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "c09ae8c3c84705eb8d0a7631f7edee87"
          },
          {
            "url": "https://www.cycleworld.com/arcio/rss/",
            "name": "Cycle World | RSS",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "908ea18555b346843909fb4155099814"
          },
          {
            "url": "https://www.motorcyclistonline.com/rss.xml?loc=footer&lnk=rss",
            "name": "Motorcyclist | RSS",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "5cbd46163d258bcc7e73acb7c29b8c46"
          },
          {
            "url": "http://www.autoblog.com/rss.xml",
            "name": "Autoblog",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "e1bfbaceab6752d9d04b352b8ccca5a1"
          },
          {
            "url": "http://feeds.feedburner.com/MotorAuthority2",
            "name": "Motor Authority",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://blogs.nvidia.com/blog/category/auto/feed/",
            "name": "Driving – The Official NVIDIA Blog",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "03ba81b3b0157d550745f5fdf80c8249"
          }
        ],
        [
          {
            "url": "http://www.premierguitar.com/rss/1",
            "name": "Premier Guitar",
            "type": "mixed",
            "limit": 268,
            "status": "off",
            "iconhash": "107b81d8ca0840ca24e464a47d4216be"
          },
          {
            "url": "http://www.kr-homestudio.fr/feed/",
            "name": "KR home-studio",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "6a974310504e39b1058c7fee5b5c478d"
          },
          {
            "url": "https://www.gearnews.com/zone/synth/feed/",
            "name": "Synths – gearnews.com",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "bfbfab94a9fe826faab581bc1e6d0b71"
          },
          {
            "url": "http://greatsynthesizers.com/en/feed/",
            "name": "GreatSynthesizers",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "d5324e89855485d992b5f0537e3c8e03"
          },
          {
            "url": "http://www.matrixsynth.com/feeds/posts/default",
            "name": "MATRIXSYNTH",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "6059a00afb68a9957e0d726c68d8d17a"
          },
          {
            "url": "https://www.synthanatomy.com/feed/atom",
            "name": "SYNTH ANATOMY",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "7c0842783c5cadf8a56489b20bc88b24"
          },
          {
            "url": "https://www.pro-tools-expert.com/synth-expert/news-blog?format=RSS",
            "name": "Synth Expert",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "1da635761df79d92edfbe3936ca78ba1"
          },
          {
            "url": "https://www.synthtopia.com/feed/",
            "name": "Synthtopia",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "ee0efcde1c060ca91ff32a191c9e84e2"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCW64y2tidRL5njv0JrQdvbA",
            "name": "sonicstate",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCFTK8Oiiny_vt4tzZkM4X0A",
            "name": "BoBeats",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          }
        ]
      ]
    },
    {
      "name": "sec",
      "columns": [
        [
          {
            "url": "https://csdl-api.computer.org/api/rss/periodicals/mags/sp/rss.xml",
            "name": "IEEE Security & Privacy",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://defence-blog.com/feed",
            "name": "Defence Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "0404bdd4411d60c048f516f6e3f3b453"
          },
          {
            "url": "https://www.thecipherbrief.com/feed",
            "name": "The Cipher Brief",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "2d9990d66258f5f918e6e90286682326"
          },
          {
            "url": "http://feeds.feedburner.com/TheHackersNews?format=xml",
            "name": "The Hacker News",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://www.darkreading.com/rss/all.xml",
            "name": "Dark Reading:",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "c89ffae36f0bab03a4b59c4f61920e71"
          }
        ],
        [
          {
            "url": "https://www.mcafee.com/blogs/feed/",
            "name": "McAfee Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "0638b715c674d62fcce333ace44356de"
          },
          {
            "url": "https://threatpost.com/feed/",
            "name": "Threatpost",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "6460b1d7a3e06e685fdc9eca602b7f6d"
          },
          {
            "url": "https://spectrum.ieee.org/rss",
            "name": "IEEE Spectrum Recent Content",
            "type": "mixed",
            "limit": 277,
            "status": "off",
            "iconhash": "d6893d3dfd1314b04b720fb84437bec5"
          },
          {
            "url": "http://www.techrepublic.com/rssfeeds/topic/security/?feedType=rssfeeds",
            "name": "Security on TechRepublic",
            "type": "mixed",
            "limit": 181,
            "status": "off",
            "iconhash": "7dd1f8efbfe35f05c488731a73e752c4"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCm9K6rby98W8JigLoZOh6FQ",
            "name": "LockPickingLawyer",
            "type": "mixed",
            "limit": 200,
            "status": "off",
            "iconhash": "338d4b3529898bf7fe2712d19c19e81f"
          }
        ],
        [
          {
            "url": "http://feeds.feedburner.com/eset/blog",
            "name": "WeLiveSecurity",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "http://nakedsecurity.sophos.com/feed/",
            "name": "Naked Security",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "b530ea17fd57074186c63c3d92bb840c"
          },
          {
            "url": "http://feeds.feedburner.com/GoogleOnlineSecurityBlog",
            "name": "Google Online Security Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://krebsonsecurity.com/feed/atom/",
            "name": "Krebs on Security",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "3ff0967d6c59365ef7e74b6cd9c77b2f"
          },
          {
            "url": "https://blogs.cisco.com/security/feed",
            "name": "Security – Cisco Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "ebd739e72b126fb07d5b52e22c303452"
          }
        ]
      ]
    },
    {
      "name": "src",
      "columns": [
        [
          {
            "url": "https://github.com/sveltejs/svelte/commits/master.atom",
            "name": "Recent Commits to svelte:master",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "9f5ae8cb5ff501f564e4927884aa83ff"
          },
          {
            "url": "https://tracker.ardour.org/issues_rss.php",
            "name": "Ardour Bug Tracker - Issues",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "b76de31e2f3f839e441c8992e76d974f"
          },
          {
            "url": "https://www.rncbc.org/drupal/rss.xml",
            "name": "rncbc.org",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "ee391021c37580074aa23e9ef36bf0bf"
          },
          {
            "url": "https://lkml.org/rss.php",
            "name": "lkml.org",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "889c675f68dfcf24a4e1bf7b7a11f672"
          },
          {
            "url": "https://github.com/systemd/systemd/commits/main.atom",
            "name": "Recent Commits to systemd:main",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "9f5ae8cb5ff501f564e4927884aa83ff"
          },
          {
            "url": "https://lwn.net/headlines/rss",
            "name": "LWN.net",
            "type": "text",
            "limit": 263,
            "status": "off",
            "iconhash": "9f3d98b47272a52c4c45e65b69bdadf0"
          },
          {
            "url": "https://github.com/Chocobozzz/PeerTube/commits/develop.atom",
            "name": "Recent Commits to PeerTube:develop",
            "type": "text",
            "limit": 308,
            "status": "off",
            "iconhash": "9f5ae8cb5ff501f564e4927884aa83ff"
          }
        ],
        [
          {
            "url": "https://framagit.org/yphil/petrolette/-/issues.atom?feed_token=YWcFEkVxV7CWsy9qsCUg&state=opened",
            "name": "Pétrolette issues",
            "type": "text",
            "limit": 192,
            "status": "off",
            "iconhash": "8bfcbfd18cc6cbed4d0ae4569e36e490"
          },
          {
            "url": "https://framagit.org/yphil.atom?rss_token=YWcFEkVxV7CWsy9qsCUg",
            "name": "yPhil activity",
            "type": "text",
            "limit": 327,
            "status": "off",
            "iconhash": "8bfcbfd18cc6cbed4d0ae4569e36e490"
          },
          {
            "url": "https://github.com/node-fetch/node-fetch/commits/master.atom",
            "name": "Recent Commits to node-fetch:master",
            "type": "text",
            "limit": 243,
            "status": "off",
            "iconhash": "9f5ae8cb5ff501f564e4927884aa83ff"
          },
          {
            "url": "https://github.com/danmactough/node-feedparser/commits/master.atom",
            "name": "Recent Commits to node-feedparser:master",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "9f5ae8cb5ff501f564e4927884aa83ff"
          }
        ]
      ]
    },
    {
      "name": "fr",
      "columns": [
        [
          {
            "url": "https://www.acrimed.org/spip.php?page=backend",
            "name": "Acrimed | Action Critique Médias",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "03ad8559e5ef0e58af14052bb11b6afb"
          },
          {
            "url": "https://lejournal.cnrs.fr/rss",
            "name": "CNRS Le journal",
            "type": "mixed",
            "limit": 243,
            "status": "off",
            "iconhash": "413e75af24ecc3f53b191bfb88e46a62"
          },
          {
            "url": "https://www.monde-diplomatique.fr/rss",
            "name": "Le Monde diplomatique",
            "type": "mixed",
            "limit": 225,
            "status": "off",
            "iconhash": "ec823f74fa651ab254b97fa5a4587fef"
          },
          {
            "url": "http://www.lemonde.fr/afrique/rss_full.xml",
            "name": "Afrique : Toute l’actualité sur Le Monde.fr.",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "29044b33046a1da99618f127b5e3fd27"
          },
          {
            "url": "https://www.francetvinfo.fr/monde/afrique.rss",
            "name": "Franceinfo - Afrique",
            "type": "mixed",
            "limit": 350,
            "status": "off",
            "iconhash": "3be21baa6e5e8ac02f6e94ea1338ba5e"
          },
          {
            "url": "http://rss.liberation.fr/rss/latest/",
            "name": "Libération",
            "type": "mixed",
            "limit": 433,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://www.lemonde.fr/rss/une.xml",
            "name": "Le Monde.fr - Actualités et Infos en France et dans le monde",
            "type": "mixed",
            "limit": 274,
            "status": "off",
            "iconhash": "29044b33046a1da99618f127b5e3fd27"
          },
          {
            "url": "https://www.leprogres.fr/rss",
            "name": "Le Progrès : info et actu nationale et régionale - Rhône, Loire, Ain, Haute-Loire et Jura | Le Progrès",
            "type": "mixed",
            "limit": 242,
            "status": "off",
            "iconhash": "756e721475a0e929b98090b051247079"
          },
          {
            "url": "https://www.atlantico.fr/rss.xml",
            "name": "Atlantico, êtes-vous prêt à changer d'avis ?",
            "type": "mixed",
            "limit": 272,
            "status": "off",
            "iconhash": "ee674d2eb5cf0868abe9e32f015f42bb"
          },
          {
            "url": "https://www.theguardian.com/world/france/rss",
            "name": "France | The Guardian",
            "type": "mixed",
            "limit": 339,
            "status": "off",
            "iconhash": "9aa8c839f619e2bdaf062d625a5d92f2"
          },
          {
            "url": "http://www.juanasensio.com/index.rss",
            "name": "STALKER - Dissection du cadavre de la littérature",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "eeb3618898dd7c7a68d954fabb76ba81"
          }
        ],
        [
          {
            "url": "http://www.lefigaro.fr/rss/figaro_flash-actu.xml",
            "name": "Le Figaro - Le Flash Actu",
            "type": "mixed",
            "limit": 238,
            "status": "off",
            "iconhash": "ce9d4e9ad2f1e0fc15ba5c505cdd9092"
          },
          {
            "url": "http://www.francesoir.fr/rss.xml",
            "name": "FranceSoir - Articles de la rédaction",
            "type": "mixed",
            "limit": 200,
            "status": "off",
            "iconhash": "ffe7fca1e536bf3c62df188ea2a1c767"
          },
          {
            "url": "https://www.francetvinfo.fr/titres.rss",
            "name": "Franceinfo - Les Titres",
            "type": "mixed",
            "limit": 209,
            "status": "off",
            "iconhash": "3be21baa6e5e8ac02f6e94ea1338ba5e"
          },
          {
            "url": "https://ledauphine.com/rss",
            "name": "Le Dauphiné Libéré : info et actu nationale et régionale - Isère, Haute-Savoie, Savoie, Drôme, Ardèche, Hautes-Alpes et Vaucluse | Le Dauphiné Libéré",
            "type": "mixed",
            "limit": 118,
            "status": "off",
            "iconhash": "b245177278fd27088c99400c94ebf77c"
          },
          {
            "url": "https://www.capital.fr/rss",
            "name": "capital.fr",
            "type": "mixed",
            "limit": 191,
            "status": "off",
            "iconhash": "e4add4409d22d441138cb118ba03e02b"
          },
          {
            "url": "https://www.latribune.fr/feed.xml",
            "name": "La Tribune",
            "type": "mixed",
            "limit": 334,
            "status": "off",
            "iconhash": "f84e456c602536b4be09bf34b3421b2f"
          }
        ],
        [
          {
            "url": "https://linuxfr.org/news.atom",
            "name": "LinuxFr.org : les dépêches",
            "type": "mixed",
            "limit": 157,
            "status": "off",
            "iconhash": "8f8fbe56d4a75ac3adf1008880745be2"
          },
          {
            "url": "https://linuxfr.org/journaux.atom",
            "name": "LinuxFr.org : les journaux",
            "type": "mixed",
            "limit": 136,
            "status": "off",
            "iconhash": "8f8fbe56d4a75ac3adf1008880745be2"
          },
          {
            "url": "https://linuxfr.org/liens.atom",
            "name": "LinuxFr.org : les liens",
            "type": "mixed",
            "limit": 160,
            "status": "off",
            "iconhash": "8f8fbe56d4a75ac3adf1008880745be2"
          },
          {
            "url": "http://journalduhacker.net/comments.rss",
            "name": "Journal du hacker: Derniers commentaires",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "4d06800288774b9439d08bce6c93117c"
          },
          {
            "url": "http://www.pcinpact.com/rss/news.xml",
            "name": "Next INpact",
            "type": "text",
            "limit": 185,
            "status": "off",
            "iconhash": "10c34346584cba5a5d7351bc5520791d"
          },
          {
            "url": "http://www.futura-sciences.com/rss/actualites.xml",
            "name": "Les dernières actualités de Futura",
            "type": "text",
            "limit": 243,
            "status": "off",
            "iconhash": "84eafb447c0a9ae3bb5085ac6697697e"
          }
        ]
      ]
    },
    {
      "name": "podcasts",
      "columns": [
        [
          {
            "url": "http://faif.us/feeds/cast-ogg/",
            "name": "Free as in Freedom",
            "type": "text",
            "limit": 394,
            "status": "off",
            "iconhash": "f46ef8d5a60f1f6cc5fb8c1462a3aeea"
          },
          {
            "url": "https://feeds.publicradio.org/public_feeds/marketplace-pm/rss/rss",
            "name": "Marketplace",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "c74ad1327f66b24b0406d1f86ef1c15a"
          },
          {
            "url": "http://feeds.harvardbusiness.org/harvardbusiness/ideacast",
            "name": "HBR IdeaCast",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.themoth.org/themothpodcast",
            "name": "The Moth",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/thememorypalace",
            "name": "the memory palace",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "f6c0c5d40146d55235ed068672e6cbe1"
          },
          {
            "url": "https://ww2.kqed.org/news/programs/the-leap/feed/podcast",
            "name": "The Leap",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "69cbda6ff43b7d33071fb305c48cb3c8"
          },
          {
            "url": "http://podcast.outsideonline.com/OutsidePodcast",
            "name": "Outside Podcast",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.megaphone.fm/heavyweight",
            "name": "Heavyweight",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://philosophybites.com/rss.xml",
            "name": "philosophy bites",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "a33147b556d5018434ea6c945b4dec5b"
          },
          {
            "url": "https://feeds.megaphone.fm/switchedonpop",
            "name": "Switched on Pop",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://soundopinions.org/podcast/feed",
            "name": "Sound Opinions",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "3d75f35e7a79cfc81b9c87328e996d1e"
          },
          {
            "url": "https://feeds.megaphone.fm/solvable",
            "name": "Solvable",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          }
        ],
        [
          {
            "url": "https://rss.art19.com/sean-carrolls-mindscape",
            "name": "Sean Carroll's Mindscape: Science, Society, Philosophy, Culture, Arts, and Ideas",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "b4bbe316f0c19cb5fd0aa37ba9042dea"
          },
          {
            "url": "https://rss.art19.com/the-dollop",
            "name": "The Dollop with Dave Anthony and Gareth Reynolds",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "b4bbe316f0c19cb5fd0aa37ba9042dea"
          },
          {
            "url": "https://feeds.megaphone.fm/ADL9840290619",
            "name": "Crime Junkie",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "http://feeds.soundcloud.com/users/soundcloud:users:52492923/sounds.rss",
            "name": "The Broken Meeple",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.thisiscriminal.com/thisislovepodcast",
            "name": "This is Love",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.megaphone.fm/against-the-rules",
            "name": "Against the Rules with Michael Lewis",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://feeds.megaphone.fm/slatelexiconvalley",
            "name": "Lexicon Valley",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://rss.wbur.org/lastseen/podcast",
            "name": "Last Seen",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "16f858f0a8f2c22040b923d490beae8d"
          },
          {
            "url": "https://feeds.99percentinvisible.org/99percentinvisible",
            "name": "99% Invisible",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://unstructuredpod.com/feed/",
            "name": "Unstructured - E. Hunley",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "fdb1be0af62ea29272eb4acf7dd6bcac"
          },
          {
            "url": "https://feeds.blubrry.com/feeds/the_world_and_everything_in_it.xml",
            "name": "The World and Everything In It",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "69d3aca59b50a6d94eaced6aa65afdda"
          }
        ],
        [
          {
            "url": "http://feeds.soundcloud.com/users/soundcloud:users:19672772/sounds.rss",
            "name": "PIFFFcast - Le podcast du cinéma de genre",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.megaphone.fm/revisionisthistory",
            "name": "Revisionist History",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://feeds.feedburner.com/wnycheresthething",
            "name": "Here's The Thing with Alec Baldwin",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "eacbcccdf02702a585315aba206c3710"
          },
          {
            "url": "http://feeds.wnyc.org/radiolab",
            "name": "Radiolab",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://rss.acast.com/thehistoryofbyzantium",
            "name": "The History of Byzantium",
            "type": "text",
            "limit": 220,
            "status": "off",
            "iconhash": "a107680ef4f544cb1c896f7b30e36977"
          },
          {
            "url": "http://prettymuchpop.com/feed/podcast/",
            "name": "Pretty Much Pop: A Culture Podcast",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "54e56660197e16795353a465ecdd29b8"
          },
          {
            "url": "https://feeds.podtrac.com/0HsQUhE5lGnQ",
            "name": "HumaNature",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "4285a2a6995fda1e7ff8d17cb8e64d47"
          },
          {
            "url": "https://audioboom.com/channels/4997220.rss",
            "name": "Morbid: A True Crime Podcast",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "13907af49d0fbf02c95d889a29353283"
          },
          {
            "url": "http://feeds.thisiscriminal.com/CriminalShow",
            "name": "Criminal",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.megaphone.fm/crimetown",
            "name": "Crimetown",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          },
          {
            "url": "https://feeds.megaphone.fm/PPY8359579005",
            "name": "Flash Forward",
            "type": "mixed",
            "limit": 220,
            "status": "off",
            "iconhash": "26f895f61dc3c9d1903806d710c9e2ce"
          }
        ]
      ]
    }
  ];

  var defaults = {
    'gallerySlideTransition': 'fade',
    'gallerySlideshowSpeed': 3000,
    'lang': 'en',
    'searchPrefix': 'https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=',
    'searchPrefixDefault': 'https://search.modalogi.com/searx/search?categories=news&language=en-US&format=rss&q=',
    'feeds': JSON.stringify(defaultFeeds),
    'tabDropActivate': true,
    'brokenImages': 'hide',
    'mediaPreload': 'none',
    'theme': 'night',
    'nextNag': 0,
    'writeTime': Date.now()
  };

  return {
    readConfig:function(key) {

      if(typeof localStorage.getItem(key) === 'undefined' || !localStorage.getItem(key)) {
        return defaults[key];
      } else {
        return localStorage.getItem(key);
      }

    },
    writeConfig:function(key, val) {

      $('div#logo-title i').addClass('writing');

      if (key === 'feeds') {
        localStorage.setItem('writeTime', Date.now());
      }

      localStorage.setItem(key, val);

      setTimeout(function () {
        $('div#logo-title i').delay('slow').removeClass('writing');
      }, 300);

    },
    exportConfig:function(data, fileName) {

      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      var json = JSON.stringify(data, null, 2),
          blob = new Blob([json], {type: "application/json"}),
          url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);

    }
  };
}());
