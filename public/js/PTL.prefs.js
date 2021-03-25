// @license magnet:?xt=urn:btih:1f739d935676111cfff4b4693e3816e664797050&dn=gpl-3.0.txt GPL-v3-or-Later

PTL.prefs = (function() {

  var newList = [
    {
      "name": "demo",
      "columns": [
        [
          {
            "url": "http://faif.us/feeds/cast-ogg/",
            "name": "Free as in Freedom",
            "type": "text",
            "limit": 252,
            "status": "off"
          },
          {
            "url": "https://exode.me/feeds/videos.xml?videoChannelId=484",
            "name": "yPhil Videos",
            "type": "mixed",
            "limit": 195,
            "status": "on"
          },
          {
            "url": "https://news.google.com/news/rss/rss",
            "name": "Top stories - Google News",
            "type": "mixed",
            "limit": 279,
            "status": "on"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCtNdVINwfYFTQEEZgMiQ8FA",
            "name": "Bailey Sarian",
            "type": "mixed",
            "limit": 236,
            "status": "on"
          },
          {
            "url": "http://feeds.arstechnica.com/arstechnica/index",
            "name": "Ars Technica",
            "type": "text",
            "limit": 203,
            "status": "on"
          }
        ],
        [
          {
            "url": "https://retropie.org.uk/feed/",
            "name": "RetroPie",
            "type": "mixed",
            "limit": 346,
            "status": "on"
          },
          {
            "url": "https://sputniknews.com/export/rss2/archive/index.xml",
            "name": "Sputnik News - World News, Breaking News & Top Stories",
            "type": "mixed",
            "limit": 190,
            "status": "on"
          },
          {
            "url": "http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss",
            "name": "NASA Image of the Day",
            "type": "photo",
            "limit": 286,
            "status": "on"
          },
          {
            "url": "http://www.thefiscaltimes.com/feeds/articles/all/rss.xml",
            "name": "The Fiscal Times",
            "type": "mixed",
            "limit": 221,
            "status": "on"
          }
        ],
        [
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCHugE6eRhqB9_AZQh4DDbIw",
            "name": "Jupiter Broadcasting",
            "type": "text",
            "limit": 216,
            "status": "on"
          },
          {
            "url": "http://www.newsbusters.org/blog/feed",
            "name": "Newsbusters - Welcome to NewsBusters, a project of the Media Research Center (MRC), America’s leading media watchdog in documenting, exposing",
            "type": "mixed",
            "limit": 189,
            "status": "on"
          },
          {
            "url": "https://www.nationalreview.com/corner/feed/",
            "name": "The Corner | National Review",
            "type": "mixed",
            "limit": 400,
            "status": "on"
          }
        ],
        [
          {
            "url": "https://www.npr.org/rss/rss.php?id=1001",
            "name": "News : NPR",
            "type": "mixed",
            "limit": 195,
            "status": "on"
          },
          {
            "url": "http://thehill.com/rss/syndicator/19109",
            "name": "TheHill - The Hill News",
            "type": "mixed",
            "limit": 204,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/thechangelog",
            "name": "Changelog",
            "type": "text",
            "limit": 292,
            "status": "on"
          },
          {
            "url": "http://feeds.feedburner.com/hackaday/LgoM/",
            "name": "Hackaday",
            "type": "mixed",
            "limit": 239,
            "status": "on"
          }
        ]
      ]
    },
    {
      "name": "news",
      "columns": [
        [
          {
            "url": "http://www.mirror.co.uk/news/world-news/rss.xml",
            "name": "Mirror - World news",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://sputniknews.com/export/rss2/world/index.xml",
            "name": "Sputnik News - World News, Breaking News & Top Stories",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.rt.com/rss/news/",
            "name": "RT World News",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.cnbc.com/id/100727362/device/rss/rss.html",
            "name": "cnbc - International",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://worldnewssuperfast.blogspot.com/feeds/posts/default?alt=rss",
            "name": "WORLD NEWS SUPERFAST - LATEST BREAKING NEWS",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://yahoo.com/news/rss/world",
            "name": "Yahoo News - Latest News & Headlines",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.aljazeera.com/xml/rss/all.xml",
            "name": "Al Jazeera – Breaking News, World News and Video from Al Jazeera",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/rss.xml",
            "name": "BBC News - Home",
            "type": "mixed",
            "limit": 352,
            "status": "off"
          },
          {
            "url": "http://rss.nytimes.com/services/xml/rss/nyt/World.xml",
            "name": "NYT > World News",
            "type": "mixed",
            "limit": 400,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.buzzfeed.com/world.xml",
            "name": "BuzzFeed News",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.globalissues.org/news/feed",
            "name": "Global Issues News Headlines",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.bbci.co.uk/news/world/rss.xml",
            "name": "BBC News - World",
            "type": "mixed",
            "limit": 231,
            "status": "off"
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
            "status": "off"
          },
          {
            "url": "https://www.cbsnews.com/latest/rss/world",
            "name": "World - CBSNews.com",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.thesun.co.uk/news/worldnews/feed/",
            "name": "World News - breaking international headlines and exclusives | The Sun",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.independent.co.uk/news/world/rss",
            "name": "The Independent",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://feeds.feedburner.com/ndtvnews-world-news",
            "name": "NDTV News - World-news",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/time/world",
            "name": "World – TIME",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://hotair.com/feed",
            "name": "Hotair",
            "type": "mixed",
            "limit": 400,
            "status": "off"
          },
          {
            "url": "http://rss.cnn.com/rss/edition_world.rss",
            "name": "CNN.com - RSS Channel - World",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.theguardian.com/world/rss",
            "name": "World news | The Guardian",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.cbc.ca/cmlink/rss-world",
            "name": "CBC | World News",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.latimes.com/world/rss2.0.xml",
            "name": "LA. Times World & Nation",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.vox.com/rss/world/index.xml",
            "name": "Vox -  World",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "tek",
      "columns": [
        [
          {
            "url": "https://www.vox.com/rss/recode/index.xml",
            "name": "Vox -  Recode",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/venturebeat/SZYF",
            "name": "VentureBeat",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://readwrite.com/feed/?x=1",
            "name": "ReadWrite",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://www.reddit.com/r/specializedtools/.rss",
            "name": "Specialized Tools",
            "type": "mixed",
            "limit": 270,
            "status": "off"
          },
          {
            "url": "http://feeds2.feedburner.com/webupd8",
            "name": "Web Upd8 - Ubuntu / Linux blog",
            "type": "text",
            "limit": 400,
            "status": "off"
          },
          {
            "url": "https://linuxfr.org/news.atom",
            "name": "LinuxFr.org : les dépêches",
            "type": "mixed",
            "limit": 157,
            "status": "off"
          },
          {
            "url": "https://linuxfr.org/liens.atom",
            "name": "LinuxFr.org : les liens",
            "type": "mixed",
            "limit": 160,
            "status": "off"
          },
          {
            "url": "https://linuxfr.org/journaux.atom",
            "name": "LinuxFr.org : les journaux",
            "type": "mixed",
            "limit": 136,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://blog.slaks.net/feeds/posts/default.xml",
            "name": "SLaks.Blog",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://circuits-diy.com/feed/",
            "name": "Circuits DIY",
            "type": "mixed",
            "limit": 126,
            "status": "off"
          },
          {
            "url": "http://techrights.org/feed/",
            "name": "Techrights",
            "type": "text",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://www.pcinpact.com/rss/news.xml",
            "name": "Next INpact",
            "type": "text",
            "limit": 185,
            "status": "off"
          },
          {
            "url": "https://www.theregister.co.uk/software/headlines.atom",
            "name": "The Register - Software",
            "type": "mixed",
            "limit": 300,
            "status": "off"
          },
          {
            "url": "http://www.theverge.com/rss/index.xml",
            "name": "The Verge -  All Posts",
            "type": "mixed",
            "limit": 304,
            "status": "off"
          },
          {
            "url": "https://feeds.feedburner.com/LosTechies",
            "name": "Los Techies",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.techrepublic.com/rssfeeds/articles/",
            "name": "Articles on TechRepublic",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://simpleflying.com/feed/",
            "name": "Simple Flying",
            "type": "mixed",
            "limit": 237,
            "status": "off"
          },
          {
            "url": "https://hushkit.net/rss",
            "name": "Hush-Kit",
            "type": "text",
            "limit": 190,
            "status": "off"
          },
          {
            "url": "https://solar.lowtechmagazine.com/feeds/all.rss.xml",
            "name": "LOW←TECH MAGAZINE",
            "type": "text",
            "limit": 66,
            "status": "off"
          },
          {
            "url": "https://www.phoronix.com/rss.php",
            "name": "Phoronix",
            "type": "mixed",
            "limit": 181,
            "status": "off"
          },
          {
            "url": "https://hackernoon.com/feed",
            "name": "Hacker Noon",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://journalduhacker.net/comments.rss",
            "name": "Journal du hacker: Derniers commentaires",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "sec",
      "columns": [
        [
          {
            "url": "http://defence-blog.com/feed",
            "name": "Defence Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.thecipherbrief.com/feed",
            "name": "The Cipher Brief",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/TheHackersNews?format=xml",
            "name": "The Hacker News",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.darkreading.com/rss/all.xml",
            "name": "Dark Reading:",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/eset/blog",
            "name": "WeLiveSecurity",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.mcafee.com/blogs/feed/",
            "name": "McAfee Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://threatpost.com/feed/",
            "name": "Threatpost",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://spectrum.ieee.org/rss",
            "name": "IEEE Spectrum Recent Content",
            "type": "mixed",
            "limit": 277,
            "status": "off"
          },
          {
            "url": "http://www.techrepublic.com/rssfeeds/topic/security/?feedType=rssfeeds",
            "name": "Security on TechRepublic",
            "type": "mixed",
            "limit": 181,
            "status": "off"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCm9K6rby98W8JigLoZOh6FQ",
            "name": "LockPickingLawyer",
            "type": "mixed",
            "limit": 200,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://nakedsecurity.sophos.com/feed/",
            "name": "Naked Security",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/GoogleOnlineSecurityBlog",
            "name": "Google Online Security Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://krebsonsecurity.com/feed/atom/",
            "name": "Krebs on Security",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://blogs.cisco.com/security/feed",
            "name": "Security – Cisco Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "fr",
      "columns": [
        [
          {
            "url": "https://www.monde-diplomatique.fr/rss",
            "name": "Le Monde diplomatique",
            "type": "mixed",
            "limit": 225,
            "status": "off"
          },
          {
            "url": "https://www.euronews.com/rss?level=theme&name=news",
            "name": "News | Euronews RSS",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.lemonde.fr/afrique/rss_full.xml",
            "name": "Afrique : Toute l’actualité sur Le Monde.fr.",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.francetvinfo.fr/monde/afrique.rss",
            "name": "Franceinfo - Afrique",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.lefigaro.fr/rss/figaro_flash-actu.xml",
            "name": "Le Figaro - Le Flash Actu",
            "type": "mixed",
            "limit": 238,
            "status": "off"
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
            "status": "off"
          },
          {
            "url": "https://www.leprogres.fr/rss",
            "name": "Le Progrès : info et actu nationale et régionale - Rhône, Loire, Ain, Haute-Loire et Jura | Le Progrès",
            "type": "mixed",
            "limit": 242,
            "status": "off"
          },
          {
            "url": "https://www.atlantico.fr/rss.xml",
            "name": "Atlantico, êtes-vous prêt à changer d'avis ?",
            "type": "mixed",
            "limit": 272,
            "status": "off"
          },
          {
            "url": "https://www.theguardian.com/world/france/rss",
            "name": "France | The Guardian",
            "type": "mixed",
            "limit": 339,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://www.francesoir.fr/rss.xml",
            "name": "FranceSoir - Articles de la rédaction",
            "type": "mixed",
            "limit": 200,
            "status": "off"
          },
          {
            "url": "https://www.francetvinfo.fr/titres.rss",
            "name": "Franceinfo - Les Titres",
            "type": "mixed",
            "limit": 209,
            "status": "off"
          },
          {
            "url": "https://ledauphine.com/rss",
            "name": "Le Dauphiné Libéré : info et actu nationale et régionale - Isère, Haute-Savoie, Savoie, Drôme, Ardèche, Hautes-Alpes et Vaucluse | Le Dauphiné Libéré",
            "type": "mixed",
            "limit": 118,
            "status": "off"
          },
          {
            "url": "https://www.capital.fr/rss",
            "name": "capital.fr",
            "type": "mixed",
            "limit": 191,
            "status": "off"
          },
          {
            "url": "https://www.latribune.fr/feed.xml",
            "name": "La Tribune",
            "type": "mixed",
            "limit": 334,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "img",
      "columns": [
        [
          {
            "url": "http://www.divephotoguide.com/rss/news",
            "name": "Dive photo guide",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://cabinporn.com/rss/",
            "name": "Cabin Porn",
            "type": "photo",
            "limit": 600,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.reddit.com/r/NatureIsFuckingLit.rss",
            "name": "🔥 Nature Is Fucking Lit",
            "type": "photo",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://www.blendernation.com/feed/",
            "name": "BlenderNation",
            "type": "mixed",
            "limit": 215,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://blog.360cities.net/feed/",
            "name": "360Cities – Panoramic Photography Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.reddit.com/r/EarthPorn.rss",
            "name": "EarthPorn: Amazing images of light and landscape",
            "type": "photo",
            "limit": 600,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "music",
      "columns": [
        [
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCAYKj_peyESIMDp5LtHlH2A",
            "name": "unfa",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://edm.com/.rss/full/",
            "name": "EDM.com - The Latest Electronic Dance Music News, Reviews & Artists",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://feeds.feedburner.com/metalinjection",
            "name": "Metal Injection",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.youredm.com/feed/",
            "name": "Your EDM",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://feeds.feedburner.com/dangerousminds/dot/net",
            "name": "Dangerous Minds",
            "type": "mixed",
            "limit": 315,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://pitchfork.com/rss/news/",
            "name": "Pitchfork: News",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://consequenceofsound.net/feed/",
            "name": "Consequence of Sound",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://feeds.npr.org/15709577/rss.xml",
            "name": "All Songs Considered : NPR",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.nme.com/feed",
            "name": "NME",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.rollingstone.com/music/rss",
            "name": "Music – Rolling Stone",
            "type": "mixed",
            "limit": 307,
            "status": "off"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC3I2GFN_F8WudD_2jUZbojA",
            "name": "KEXP",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "audio",
      "columns": [
        [
          {
            "url": "https://www.resolutionmag.com/feed/",
            "name": "Resolution Magazine",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://www.blackghostaudio.com/blog/rss.xml",
            "name": "Black Ghost Audio",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://www.musictech.net/feed/",
            "name": "MusicTech",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://theproaudiofiles.com/feed/",
            "name": "Pro Audio Files",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://linuxmusicians.com/feed.php",
            "name": "LinuxMusicians",
            "type": "text",
            "limit": 316,
            "status": "off"
          },
          {
            "url": "https://musical-artifacts.com/artifacts.atom",
            "name": "Musical Artifacts | Libre resources for music making",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://createdigitalmusic.com/feed/",
            "name": "CDM Create Digital Music",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://planet.linuxaudio.org/rss20.xml",
            "name": "planet.linuxaudio.org",
            "type": "mixed",
            "limit": 216,
            "status": "off"
          },
          {
            "url": "https://exode.me/feeds/videos.atom?accountId=808",
            "name": "yPhil",
            "type": "photo",
            "limit": 338,
            "status": "off"
          },
          {
            "url": "https://www.attackmagazine.com/feed",
            "name": "Attack Magazine",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://audioxpress.com/rss",
            "name": "audioXpress | audioXpress Magazine",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://audiohertz.com/feed/",
            "name": "Audio Hertz",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.waves.com/blog?rss=magazine",
            "name": "Waves  Blog",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "http://www.premierguitar.com/rss/1",
            "name": "Everything",
            "type": "mixed",
            "limit": 268,
            "status": "off"
          },
          {
            "url": "http://www.kr-homestudio.fr/feed/",
            "name": "KR home-studio",
            "type": "mixed",
            "limit": 267,
            "status": "off"
          },
          {
            "url": "http://www.avidblogs.com/feed/",
            "name": "Avid Blogs",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.audiotechnology.com/feed",
            "name": "AudioTechnology",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "sci",
      "columns": [
        [
          {
            "url": "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml?edition=uk",
            "name": "BBC News - Science & Environment",
            "type": "mixed",
            "limit": 221,
            "status": "off"
          },
          {
            "url": "https://lejournal.cnrs.fr/rss",
            "name": "CNRS Le journal",
            "type": "mixed",
            "limit": 243,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk",
            "name": "BBC News - Technology",
            "type": "mixed",
            "limit": 241,
            "status": "off"
          },
          {
            "url": "https://ask-open-science.org/feed/qa.rss",
            "name": "Ask Open Science - Recent questions and answers",
            "type": "mixed",
            "limit": 378,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://www.futura-sciences.com/rss/actualites.xml",
            "name": "Les dernières actualités de Futura",
            "type": "text",
            "limit": 243,
            "status": "off"
          },
          {
            "url": "https://news.cnrs.fr/rss",
            "name": "CNRS News",
            "type": "mixed",
            "limit": 243,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "comics",
      "columns": [
        [
          {
            "url": "http://comicfeeds.chrisbenard.net/view/dilbert/default",
            "name": "Dilbert Daily Strip",
            "type": "photo",
            "limit": 382,
            "status": "off"
          },
          {
            "url": "https://moonbeard.com/feed/atom/",
            "name": "Moonbeard",
            "type": "photo",
            "limit": 600,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://xkcd.com/rss.xml",
            "name": "xkcd.com",
            "type": "photo",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://explainxkcd.com/rss.xml",
            "name": "Explain xkcd",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "http://what-if.xkcd.com/feed.atom",
            "name": "What If?",
            "type": "photo",
            "limit": 180,
            "status": "off"
          }
        ],
        [
          {
            "url": "http://webcomicname.com/rss",
            "name": "webcomic name",
            "type": "photo",
            "limit": 400,
            "status": "off"
          },
          {
            "url": "http://thisisindexed.com/feed",
            "name": "Indexed",
            "type": "photo",
            "limit": 180,
            "status": "off"
          },
          {
            "url": "https://blog.xkcd.com/rss",
            "name": "xkcd Blog",
            "type": "mixed",
            "limit": 180,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "hardware",
      "columns": [
        [
          {
            "url": "http://www.dpreview.com/feeds/news.xml",
            "name": "Digital Photography Review (dpreview.com)",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCD0y51PJfvkZNe3y3FR5riw",
            "name": "Chyrosran22",
            "type": "mixed",
            "limit": 248,
            "status": "off"
          },
          {
            "url": "https://wireframe.raspberrypi.org/feed",
            "name": "Wireframe",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://custompc.raspberrypi.org/feed",
            "name": "Custom PC",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://magpi.raspberrypi.org/feed",
            "name": "The MagPi",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC5I2hjZYiW9gZPVkvzM8_Cw",
            "name": "Techmoan",
            "type": "mixed",
            "limit": 191,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://hackspace.raspberrypi.org/feed",
            "name": "HackSpace magazine",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          },
          {
            "url": "https://www.raspberrypi.org/blog/feed",
            "name": "Raspberry Pi Blog – Raspberry Pi",
            "type": "mixed",
            "limit": 600,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "src",
      "columns": [
        [
          {
            "url": "https://github.com/node-fetch/node-fetch/commits/master.atom",
            "name": "Recent Commits to node-fetch:master",
            "type": "text",
            "limit": 243,
            "status": "off"
          },
          {
            "url": "https://framagit.org/yphil/petrolette/-/issues.atom?feed_token=YWcFEkVxV7CWsy9qsCUg&state=opened",
            "name": "Pétrolette issues",
            "type": "text",
            "limit": 192,
            "status": "off"
          },
          {
            "type": "mixed",
            "limit": 260
          },
          {
            "url": "https://github.com/Chocobozzz/PeerTube/commits/develop.atom",
            "name": "Recent Commits to PeerTube:develop",
            "type": "text",
            "limit": 308,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://lwn.net/headlines/rss",
            "name": "LWN.net",
            "type": "text",
            "limit": 263,
            "status": "off"
          },
          {
            "url": "https://framagit.org/yphil.atom?rss_token=YWcFEkVxV7CWsy9qsCUg",
            "name": "yPhil activity",
            "type": "text",
            "limit": 327,
            "status": "off"
          }
        ]
      ]
    },
    {
      "name": "podcasts",
      "columns": [
        [
          {
            "url": "http://feeds.soundcloud.com/users/soundcloud:users:19672772/sounds.rss",
            "name": "PIFFFcast - Le podcast du cinéma de genre",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://s3.amazonaws.com/feed.podbean.com/cestpaspourlesdoux/feed.xml",
            "name": "C'est pas pour les doux",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://lincolnproject.libsyn.com/rss",
            "name": "The Lincoln Project",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://audioboom.com/channels/4997220.rss",
            "name": "Morbid: A True Crime Podcast",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://feeds.megaphone.fm/ADL9840290619",
            "name": "Crime Junkie",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.wnyc.org/experiment_podcast",
            "name": "The Experiment",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://feeds.soundcloud.com/users/soundcloud:users:52492923/sounds.rss",
            "name": "The Broken Meeple",
            "type": "text",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://rss.art19.com/the-daily",
            "name": "NYT - The Daily",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://top100podcast.libsyn.com/rss",
            "name": "The Top 100 Games Podcast",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.blubrry.com/feeds/the_world_and_everything_in_it.xml",
            "name": "The World and Everything In It",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://boardgamersanonymous.libsyn.com/rss",
            "name": "Board Gamers Anonymous",
            "type": "mixed",
            "limit": 220,
            "status": "off"
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
    'feeds': JSON.stringify(newList),
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
