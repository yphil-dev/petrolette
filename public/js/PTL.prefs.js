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
            "url": "http://feeds.feedburner.com/thechangelog",
            "name": "Changelog",
            "type": "text",
            "limit": 292,
            "status": "on"
          },
          {
            "url": "http://feeds.arstechnica.com/arstechnica/index",
            "name": "Ars Technica",
            "type": "text",
            "limit": 333,
            "status": "on"
          }
        ],
        [
          {
            "url": "http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss",
            "name": "NASA Image of the Day",
            "type": "photo",
            "limit": 424,
            "status": "on"
          },
          {
            "url": "http://faif.us/feeds/cast-ogg/",
            "name": "Free as in Freedom",
            "type": "text",
            "limit": 394,
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
            "url": "http://feeds.feedburner.com/hackaday/LgoM/",
            "name": "Hackaday",
            "type": "mixed",
            "limit": 286,
            "status": "on"
          },
          {
            "url": "https://retropie.org.uk/feed/",
            "name": "RetroPie",
            "type": "mixed",
            "limit": 220,
            "status": "on"
          }
        ],
        [
          {
            "url": "https://exode.me/feeds/videos.xml?videoChannelId=484",
            "name": "yPhil Videos",
            "type": "mixed",
            "limit": 203,
            "status": "on"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?playlist_id=PLB4brr7vf-P6cR6GriSFvWdcIsfLlEMsW",
            "name": "DEVIL SOLD HIS SOUL - New Album 'LOSS' - Out April 9th",
            "type": "mixed",
            "limit": 220,
            "status": "on"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?playlist_id=PLgaTxfu341FVfUuZIobRbFB1Z_bXQC2Ju",
            "name": "Mix music",
            "type": "mixed",
            "limit": 220,
            "status": "on"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCtNdVINwfYFTQEEZgMiQ8FA",
            "name": "Bailey Sarian",
            "type": "mixed",
            "limit": 236,
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
            "url": "http://www.thefiscaltimes.com/feeds/articles/all/rss.xml",
            "name": "The Fiscal Times",
            "type": "mixed",
            "limit": 221,
            "status": "off"
          },
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
          },
          {
            "url": "https://www.latimes.com/world/rss2.0.xml",
            "name": "LA. Times World & Nation",
            "type": "mixed",
            "limit": 350,
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
            "url": "https://www.npr.org/rss/rss.php?id=1001",
            "name": "News : NPR",
            "type": "mixed",
            "limit": 195,
            "status": "off"
          },
          {
            "url": "http://www.independent.co.uk/news/world/rss",
            "name": "The Independent",
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
            "url": "https://www.euronews.com/rss?level=theme&name=news",
            "name": "News | Euronews RSS",
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
            "url": "http://www.newsbusters.org/blog/feed",
            "name": "Newsbusters - Welcome to NewsBusters, a project of the Media Research Center (MRC), America’s leading media watchdog in documenting, exposing",
            "type": "mixed",
            "limit": 189,
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
            "url": "https://www.vox.com/rss/world/index.xml",
            "name": "Vox -  World",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
          {
            "url": "https://trends.gab.com/trend-feed/rss",
            "name": "GabTrends.com Feed",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://www.nationalreview.com/corner/feed/",
            "name": "The Corner | National Review",
            "type": "mixed",
            "limit": 301,
            "status": "off"
          },
          {
            "url": "http://thehill.com/rss/syndicator/19109",
            "name": "TheHill - The Hill News",
            "type": "mixed",
            "limit": 204,
            "status": "off"
          },
          {
            "url": "https://sputniknews.com/export/rss2/archive/index.xml",
            "name": "Sputnik News - World News, Breaking News & Top Stories",
            "type": "mixed",
            "limit": 190,
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
            "url": "https://www.computerweekly.com/rss/All-Computer-Weekly-content.xml",
            "name": "ComputerWeekly.com",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://eab.abime.net/external.php?type=rss2",
            "name": "abime.net - news",
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
            "url": "http://feeds2.feedburner.com/webupd8",
            "name": "Web Upd8 - Ubuntu / Linux blog",
            "type": "text",
            "limit": 400,
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
            "url": "https://hackernoon.com/feed",
            "name": "Hacker Noon",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://feeds.feedburner.com/LosTechies",
            "name": "Los Techies",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://nitter.fdn.fr/mainframed767/rss",
            "name": "Soldier of FORTRAN / @mainframed767",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://blog.slaks.net/feeds/posts/default.xml",
            "name": "SLaks.Blog",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "http://techrights.org/feed/",
            "name": "Techrights",
            "type": "text",
            "limit": 220,
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
            "url": "https://www.vox.com/rss/recode/index.xml",
            "name": "Vox -  Recode",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://nitter.fdn.fr/scala_love/rss",
            "name": "Scala Love ❤️ / @scala_love",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.phoronix.com/rss.php",
            "name": "Phoronix",
            "type": "mixed",
            "limit": 181,
            "status": "off"
          },
          {
            "url": "https://www.techrepublic.com/rssfeeds/articles/",
            "name": "Articles on TechRepublic",
            "type": "mixed",
            "limit": 220,
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
            "url": "https://linuxfr.org/news.atom",
            "name": "LinuxFr.org : les dépêches",
            "type": "mixed",
            "limit": 157,
            "status": "off"
          },
          {
            "url": "https://linuxfr.org/journaux.atom",
            "name": "LinuxFr.org : les journaux",
            "type": "mixed",
            "limit": 136,
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
            "url": "http://journalduhacker.net/comments.rss",
            "name": "Journal du hacker: Derniers commentaires",
            "type": "mixed",
            "limit": 220,
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
            "url": "https://lejournal.cnrs.fr/rss",
            "name": "CNRS Le journal",
            "type": "mixed",
            "limit": 243,
            "status": "off"
          },
          {
            "url": "http://www.futura-sciences.com/rss/actualites.xml",
            "name": "Les dernières actualités de Futura",
            "type": "text",
            "limit": 243,
            "status": "off"
          },
          {
            "url": "https://www.monde-diplomatique.fr/rss",
            "name": "Le Monde diplomatique",
            "type": "mixed",
            "limit": 225,
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
          }
        ],
        [
          {
            "url": "http://rss.liberation.fr/rss/latest/",
            "name": "Libération",
            "type": "mixed",
            "limit": 433,
            "status": "off"
          },
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
          },
          {
            "url": "http://www.juanasensio.com/index.rss",
            "name": "STALKER - Dissection du cadavre de la littérature",
            "type": "mixed",
            "limit": 220,
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
            "limit": 220,
            "status": "off"
          }
        ],
        [
          {
            "url": "https://www.reddit.com/r/NatureIsFuckingLit.rss",
            "name": "🔥 Nature Is Fucking Lit",
            "type": "photo",
            "limit": 220,
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
            "limit": 220,
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
            "url": "https://musewire.com/feed/",
            "name": "MuseWire",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://nitter.fdn.fr/vurnt22/rss",
            "name": "",
            "type": "mixed",
            "limit": 220,
            "status": "off"
          },
          {
            "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCAYKj_peyESIMDp5LtHlH2A",
            "name": "unfa",
            "type": "mixed",
            "limit": 220,
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
          }
        ],
        [
          {
            "url": "https://www.youredm.com/feed/",
            "name": "Your EDM",
            "type": "mixed",
            "limit": 350,
            "status": "off"
          },
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
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.feedburner.com/dangerousminds/dot/net",
          "name": "Dangerous Minds",
          "type": "mixed",
          "limit": 315,
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
          "name": "yPhil - Videos on Peertube",
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
          "limit": 125,
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
          "url": "https://www.independentsciencenews.org/feed/",
          "name": "Independent Science News | Food, Health and Agriculture Bioscience News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.labbulletin.com/feed.rdf",
          "name": "Laboratory News from Lab Bulletin",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.scidev.net/global/global_rss.xml",
          "name": "SciDev - Global",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.advancedsciencenews.com/feed/",
          "name": "Advanced Science News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://phys.org/rss-feed",
          "name": "Phys.org - latest science and technology news stories",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        }
      ],
      [
        {
          "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
          "name": "NASA Breaking News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://eos.org/feed",
          "name": "Eos",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.astronomy.com/rss/news",
          "name": "Astro News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://spaceflightnow.com/feed/",
          "name": "Spaceflight Now",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://astronomynow.com/feed/",
          "name": "Astronomy Now",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://spaceq.ca/feed/",
          "name": "SpaceQ",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.universetoday.com/feed",
          "name": "Universe Today",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.esa.int/rssfeed/TopNews",
          "name": "ESA Top News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://earthsky.org/feed",
          "name": "EarthSky",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.nasaspaceflight.com/feed",
          "name": "NASASpaceFlight.com",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.spaceflightinsider.com/feed/",
          "name": "SpaceFlight Insider",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://spacenews.com/feed/",
          "name": "SpaceNews",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://feeds.feedburner.com/spaceref/jext",
          "name": "SpaceRef",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        }
      ],
      [
        {
          "url": "http://feeds.feedburner.com/BreakingScienceNews?format=xml",
          "name": "Breaking Science News | Sci-News.com",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.eurekalert.org/rss.xml",
          "name": "EurekAlert! - Breaking News",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.sciencemag.org/rss/current.xml",
          "name": "Science current issue",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://news.cnrs.fr/rss",
          "name": "CNRS News",
          "type": "mixed",
          "limit": 183,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "http://feeds.feedburner.com/scitechdaily",
          "name": "SciTechDaily",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.livescience.com/home/feed/site.xml",
          "name": "Livescience.com",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://ask-open-science.org/feed/qa.rss",
          "name": "Ask Open Science - Recent questions and answers",
          "type": "mixed",
          "limit": 378,
          "status": "off"
        },
        {
          "url": "http://feeds.bbci.co.uk/news/technology/rss.xml?edition=uk",
          "name": "BBC News - Technology",
          "type": "mixed",
          "limit": 241,
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
          "url": "https://www.comicsrss.com/rss/jimsjournal.rss",
          "name": "Jim's Journal",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/jimmorin.rss",
          "name": "Jim Morin",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/jim-benton-cartoons.rss",
          "name": "Jim Benton Cartoons",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/humorcartoon.rss",
          "name": "Jerry King Cartoons",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/jeffdanziger.rss",
          "name": "Jeff Danziger",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/janesworld.rss",
          "name": "Jane's World",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/jake-likes-onions.rss",
          "name": "Jake Likes Onions",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/itsallaboutyou.rss",
          "name": "It's All About You",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/invisible-bread.rss",
          "name": "Invisible Bread",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/inspector-dangers-crime-quiz.rss",
          "name": "Inspector Danger's Crime Quiz",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/inkpen.rss",
          "name": "Ink Pen",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/inthesticks.rss",
          "name": "In the Sticks",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/inthebleachers.rss",
          "name": "In the Bleachers",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/in-security.rss",
          "name": "In Security",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/imaginethis.rss",
          "name": "Imagine This",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/ice-cream-sandwich-comics.rss",
          "name": "Ice Cream Sandwich Comics",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/hubris.rss",
          "name": "HUBRIS!",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/heartofthecity.rss",
          "name": "Heart of the City",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/harley.rss",
          "name": "Harley",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/green-humour.rss",
          "name": "Green Humour",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/compu-toon.rss",
          "name": "Compu-toon",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/committed.rss",
          "name": "Committed",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/crumb.rss",
          "name": "Crumb",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/dilbert-classics.rss",
          "name": "Dilbert Classics",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/dilbert.rss",
          "name": "Dilbert",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/american-chop-suey.rss",
          "name": "American Chop Suey",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/amanda-the-great.rss",
          "name": "Amanda the Great",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/adamathome.rss",
          "name": "Adam@Home",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/tavicat.rss",
          "name": "@Tavicat",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/9to5.rss",
          "name": "9 to 5",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/ninechickweedlane.rss",
          "name": "9 Chickweed Lane",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/2cowsandachicken.rss",
          "name": "2 Cows and a Chicken",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/1-and-done.rss",
          "name": "1 and Done",
          "type": "photo",
          "limit": 220,
          "status": "off"
        }
      ],
      [
        {
          "url": "https://www.comicsrss.com/rss/mannequin-on-the-moon.rss",
          "name": "Mannequin on the Moon",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/mallardfillmore.rss",
          "name": "Mallard Fillmore",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/making-it.rss",
          "name": "Making It",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/maintaining.rss",
          "name": "Maintaining",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/magnificatz.rss",
          "name": "Magnificatz",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/magicinaminute.rss",
          "name": "Magic in a Minute",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/macanudo.rss",
          "name": "Macanudo",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lunarbaboon.rss",
          "name": "Lunarbaboon",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/liz-climo-cartoons.rss",
          "name": "Liz Climo Cartoons",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/marias-day.rss",
          "name": "Maria's Day",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/little-fried-chicken-and-sushi.rss",
          "name": "Little Fried Chicken and Sushi",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lisabenson.rss",
          "name": "Lisa Benson",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lio.rss",
          "name": "Lio",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/life-on-earth.rss",
          "name": "Life on Earth",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/libertymeadows.rss",
          "name": "Liberty Meadows",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lil-abner.rss",
          "name": "Li'l Abner",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/learn-to-speak-cat.rss",
          "name": "Learn to Speak Cat",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kid-shay-comics.rss",
          "name": "Kid Shay Comics",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kid-beowulf.rss",
          "name": "Kid Beowulf",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/little-nemo.rss",
          "name": "Little Nemo",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kal.rss",
          "name": "Kevin Kallaugher",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kencatalino.rss",
          "name": "Ken Catalino",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/junk-drawer.rss",
          "name": "Junk Drawer",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/jumpstart.rss",
          "name": "JumpStart",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/johndeering.rss",
          "name": "John Deering",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/joey-alison-sayers-comics.rss",
          "name": "Joey Alison Sayers Comics",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/joevanilla.rss",
          "name": "Joe Vanilla",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/joe-heller.rss",
          "name": "Joe Heller",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kevin-necessary-editorial-cartoons.rss",
          "name": "Kevin Necessary Editorial Cartoons",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/adult-children.rss",
          "name": "Adult Children",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/fowl-language.rss",
          "name": "Fowl Language",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/foolish-mortals.rss",
          "name": "Foolish Mortals",
          "type": "photo",
          "limit": 220,
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
          "url": "https://moonbeard.com/feed/atom/",
          "name": "Moonbeard",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://comicfeeds.chrisbenard.net/view/dilbert/default",
          "name": "Dilbert Daily Strip",
          "type": "photo",
          "limit": 382,
          "status": "off"
        },
        {
          "url": "http://xkcd.com/rss.xml",
          "name": "xkcd.com",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://explainxkcd.com/rss.xml",
          "name": "Explain xkcd",
          "type": "mixed",
          "limit": 161,
          "status": "off"
        },
        {
          "url": "https://blog.xkcd.com/rss",
          "name": "xkcd Blog",
          "type": "mixed",
          "limit": 180,
          "status": "off"
        },
        {
          "url": "http://what-if.xkcd.com/feed.atom",
          "name": "What If?",
          "type": "photo",
          "limit": 79,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lug-nuts.rss",
          "name": "Lug Nuts",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/luckycow.rss",
          "name": "Lucky Cow",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/luann.rss",
          "name": "Luann",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lostsideofsuburbia.rss",
          "name": "Lost Side of Suburbia",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lostsheep.rss",
          "name": "Lost Sheep",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/looseparts.rss",
          "name": "Loose Parts",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/looks-good-on-paper.rss",
          "name": "Looks Good on Paper",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/long-story-short.rss",
          "name": "Long Story Short",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lola.rss",
          "name": "Lola",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lukey-mcgarrys-tldr.rss",
          "name": "Lukey McGarry’s TLDR",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/laughing-redhead-comics.rss",
          "name": "Laughing Redhead Comics",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lastkiss.rss",
          "name": "Last Kiss",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lards-world-peace-tips.rss",
          "name": "Lard&#39;s World Peace Tips",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/laloalcaraz.rss",
          "name": "Lalo Alcaraz",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lacucaracha.rss",
          "name": "La Cucaracha",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/klibans-cats.rss",
          "name": "Kliban's Cats",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kliban.rss",
          "name": "Kliban",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kitchen-capers.rss",
          "name": "Kitchen Capers",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/kitncarlyle.rss",
          "name": "Kit 'N' Carlyle",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/lay-lines.rss",
          "name": "Lay Lines",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/alis-house.rss",
          "name": "Ali&#39;s House",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/algoodwyn.rss",
          "name": "Al Goodwyn Editorial Cartoons",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/aj-and-magnus.rss",
          "name": "AJ and Magnus",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/agnes.rss",
          "name": "Agnes",
          "type": "photo",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.comicsrss.com/rss/alley-oop.rss",
          "name": "Alley Oop",
          "type": "photo",
          "limit": 220,
          "status": "off"
        }
      ]
    ]
  },
  {
    "name": "HW",
    "columns": [
      [
        {
          "url": "https://circuits-diy.com/feed/",
          "name": "Circuits DIY",
          "type": "mixed",
          "limit": 126,
          "status": "off"
        },
        {
          "url": "https://www.ny-engineers.com/blog/rss.xml",
          "name": "New York Engineers Blog",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.cnczone.com/forums/external.php?type=RSS2",
          "name": "CNCzone.com- Largest Forums for CNC Professional and Hobbyist alike!",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.engineeringclicks.com/forum/forums/-/index.rss",
          "name": "Mechanical Design Forum",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.mechanicalpost.site/feeds/posts/default",
          "name": "The Mechanical Post",
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
          "url": "http://www.premierguitar.com/rss/1",
          "name": "Premier Guitar",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.dpreview.com/feeds/news.xml",
          "name": "Digital Photography Review (dpreview.com)",
          "type": "mixed",
          "limit": 350,
          "status": "off"
        }
      ],
      [
        {
          "url": "https://www.tomshardware.com/feeds/all",
          "name": "Tom's Hardware",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.feedburner.com/intelnewsroom",
          "name": "Intel Newsroom",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.ibm.com/blogs/research/category/quantcomp/rss",
          "name": "Quantum Computing – IBM Research Blog",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://newsroom.intel.com/tag/quantum-computing/rss",
          "name": "Quantum Computing – Intel Newsroom",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.raspberrypi.org/blog/feed",
          "name": "Raspberry Pi Blog – Raspberry Pi",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://custompc.raspberrypi.org/feed",
          "name": "Custom PC",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://magpi.raspberrypi.org/feed",
          "name": "The MagPi",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UCD0y51PJfvkZNe3y3FR5riw",
          "name": "Chyrosran22",
          "type": "mixed",
          "limit": 248,
          "status": "off"
        }
      ],
      [
        {
          "url": "http://www.bikeexif.com/feed",
          "name": "Bike EXIF",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.cycleworld.com/arcio/rss/",
          "name": "Cycle World | RSS",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.motorcyclistonline.com/rss.xml?loc=footer&lnk=rss",
          "name": "Motorcyclist | RSS",
          "type": "mixed",
          "limit": 220,
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
          "url": "https://simpleflying.com/feed/",
          "name": "Simple Flying",
          "type": "mixed",
          "limit": 237,
          "status": "off"
        },
        {
          "url": "http://www.autoblog.com/rss.xml",
          "name": "Autoblog",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://feeds.feedburner.com/MotorAuthority2",
          "name": "Motor Authority",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://blogs.nvidia.com/blog/category/auto/feed/",
          "name": "Driving – The Official NVIDIA Blog",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        }
      ],
      [
        {
          "url": "https://www.gearnews.com/zone/synth/feed/",
          "name": "Synths – gearnews.com",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.forgottenweapons.com/rss",
          "name": "Forgotten Weapons",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://hackspace.raspberrypi.org/feed",
          "name": "HackSpace magazine",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.kr-homestudio.fr/feed/",
          "name": "KR home-studio",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.youtube.com/feeds/videos.xml?channel_id=UC5I2hjZYiW9gZPVkvzM8_Cw",
          "name": "Techmoan",
          "type": "mixed",
          "limit": 191,
          "status": "off"
        },
        {
          "url": "http://greatsynthesizers.com/en/feed/",
          "name": "GreatSynthesizers",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "http://www.matrixsynth.com/feeds/posts/default",
          "name": "MATRIXSYNTH",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.synthanatomy.com/feed/atom",
          "name": "SYNTH ANATOMY",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.pro-tools-expert.com/synth-expert/news-blog?format=RSS",
          "name": "Synth Expert",
          "type": "mixed",
          "limit": 220,
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
          "limit": 220,
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
    "name": "src",
    "columns": [
      [
        {
          "url": "https://github.com/sveltejs/svelte/commits/master.atom",
          "name": "Recent Commits to svelte:master",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://tracker.ardour.org/issues_rss.php",
          "name": "Ardour Bug Tracker - Issues",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://www.rncbc.org/drupal/rss.xml",
          "name": "rncbc.org",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://lkml.org/rss.php",
          "name": "lkml.org",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://github.com/systemd/systemd/commits/main.atom",
          "name": "Recent Commits to systemd:main",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://lwn.net/headlines/rss",
          "name": "LWN.net",
          "type": "text",
          "limit": 263,
          "status": "off"
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
          "url": "https://framagit.org/yphil/petrolette/-/issues.atom?feed_token=YWcFEkVxV7CWsy9qsCUg&state=opened",
          "name": "Pétrolette issues",
          "type": "text",
          "limit": 192,
          "status": "off"
        },
        {
          "url": "https://framagit.org/yphil.atom?rss_token=YWcFEkVxV7CWsy9qsCUg",
          "name": "yPhil activity",
          "type": "text",
          "limit": 327,
          "status": "off"
        },
        {
          "url": "https://github.com/node-fetch/node-fetch/commits/master.atom",
          "name": "Recent Commits to node-fetch:master",
          "type": "text",
          "limit": 243,
          "status": "off"
        },
        {
          "url": "https://github.com/danmactough/node-feedparser/commits/master.atom",
          "name": "Recent Commits to node-feedparser:master",
          "type": "text",
          "limit": 220,
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
          "url": "https://feeds.publicradio.org/public_feeds/marketplace-pm/rss/rss",
          "name": "Marketplace",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "https://ww2.kqed.org/news/programs/the-leap/feed/podcast",
          "name": "The Leap",
          "type": "text",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "https://philosophybites.com/rss.xml",
          "name": "philosophy bites",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.megaphone.fm/switchedonpop",
          "name": "Switched on Pop",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://soundopinions.org/podcast/feed",
          "name": "Sound Opinions",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.megaphone.fm/solvable",
          "name": "Solvable",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        }
      ],
      [
        {
          "url": "https://rss.art19.com/sean-carrolls-mindscape",
          "name": "Sean Carroll's Mindscape: Science, Society, Philosophy, Culture, Arts, and Ideas",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://rss.art19.com/the-dollop",
          "name": "The Dollop with Dave Anthony and Gareth Reynolds",
          "type": "text",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.megaphone.fm/ADL9840290619",
          "name": "Crime Junkie",
          "type": "mixed",
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
          "status": "off"
        },
        {
          "url": "https://feeds.megaphone.fm/slatelexiconvalley",
          "name": "Lexicon Valley",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://rss.wbur.org/lastseen/podcast",
          "name": "Last Seen",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "https://feeds.blubrry.com/feeds/the_world_and_everything_in_it.xml",
          "name": "The World and Everything In It",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "https://feeds.feedburner.com/wnycheresthething",
          "name": "Here's The Thing with Alec Baldwin",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "http://prettymuchpop.com/feed/podcast/",
          "name": "Pretty Much Pop: A Culture Podcast",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://feeds.podtrac.com/0HsQUhE5lGnQ",
          "name": "HumaNature",
          "type": "mixed",
          "limit": 220,
          "status": "off"
        },
        {
          "url": "https://audioboom.com/channels/4997220.rss",
          "name": "Morbid: A True Crime Podcast",
          "type": "mixed",
          "limit": 220,
          "status": "off"
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
          "status": "off"
        },
        {
          "url": "https://feeds.megaphone.fm/PPY8359579005",
          "name": "Flash Forward",
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
