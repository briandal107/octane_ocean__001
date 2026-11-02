// Keep each full-song link separate, including songs mixed with acapellas.
const tracks = [
  [
    {
      "label": "virtual self - god rays",
      "url": "https://soundcloud.com/pawter-rawrbeanson/virtual-self-god-rays-full-version-remake"
    }
  ],
  [
    {
      "label": "olivia rodrigo - stupid song",
      "url": "https://open.spotify.com/track/4LfCY65LvojKjWEnU7fNN4"
    }
  ],
  [
    {
      "label": "kaskade, bunt. - comes back around",
      "url": "https://open.spotify.com/track/23axNcNwz5HwYauDa6Njy7"
    }
  ],
  [
    {
      "label": "jigitz, charlotte plank - car crash",
      "url": "https://open.spotify.com/track/47z8JPQCgjtRcFqt1kUyoA"
    }
  ],
  [
    {
      "label": "walker & royce, vnssa - rave grave",
      "url": "https://open.spotify.com/track/2M72ge9OrR7muKhcBi509v"
    }
  ],
  [
    {
      "label": "yeah yeah yeahs, a-trak - heads will roll a-trak remix",
      "url": "https://open.spotify.com/track/2idmlkd8oUaQvYEtINpLBX"
    }
  ],
  [
    {
      "label": "chris lake, cloonee - nightmares",
      "url": "https://open.spotify.com/track/5xARo31Sdr6Kmk2g9j4t3x"
    }
  ],
  [
    {
      "label": "tove lo, chris lake - disco tits chris lake remix",
      "url": "https://open.spotify.com/track/1Kz2tOIBBoWpbeg3Fwf2lB"
    }
  ],
  [
    {
      "label": "tinashe - melatonin",
      "url": "https://open.spotify.com/track/0Fscl5Gt6r9UfJR6OWG1wI"
    }
  ],
  [
    {
      "label": "addison rae, sam gellaitry - in the rain sam gellaitry remix",
      "url": "https://www.youtube.com/watch?v=Vm1F97xFGac"
    }
  ],
  [
    {
      "label": "beyoncé - cuff it",
      "url": "https://open.spotify.com/track/1xzi1Jcr7mEi9K2RfzLOqS"
    }
  ],
  [
    {
      "label": "megan thee stallion - thot shit",
      "url": "https://open.spotify.com/track/7FdmHr87G79PDRGy9SPBkZ"
    }
  ],
  [
    {
      "label": "justin timberlake, timbaland - sexyback",
      "url": "https://open.spotify.com/track/0O45fw2L5vsWpdsOdXwNAR"
    }
  ],
  [
    {
      "label": "drake - nokia",
      "url": "https://open.spotify.com/track/14QD03EDD6abanZ655Jx0H"
    }
  ],
  [
    {
      "label": "charli xcx - von dutch",
      "url": "https://open.spotify.com/track/3Y1EvIgEVw51XtgNEgpz5c"
    }
  ],
  [
    {
      "label": "the dare - bloodwork",
      "url": "https://open.spotify.com/track/7bMRSmzhoFnhqKW3uVnMF9"
    }
  ],
  [
    {
      "label": "aaron hibell, felsmann + tiley - levitation (icelandic mix)",
      "url": "https://open.spotify.com/track/4J7wpgfDHmHilv7cgQ8t9s"
    },
    {
      "label": "rihanna - diamonds",
      "url": "https://open.spotify.com/track/1z9kQ14XBSN0r2v6fx4IdG"
    }
  ],
  [
    {
      "label": "rose gray - party people",
      "url": "https://open.spotify.com/track/0KN08YO4zGw8NCkCiaRkS9"
    }
  ],
  [
    {
      "label": "kettama - it gets better (forever mix)",
      "url": "https://open.spotify.com/track/5fEg39wxUxNG9Ig5cFpWlc"
    },
    {
      "label": "charli xcx - ss26",
      "url": "https://open.spotify.com/track/0g8FizeHVo2cG7qxBfmckf"
    }
  ],
  [
    {
      "label": "calvin harris, mph - i’m not alone mph remix",
      "url": "https://open.spotify.com/track/1z6pTKnrEpokcfwked9cNx"
    }
  ],
  [
    {
      "label": "travis scott, swae lee, chief keef - nightcrawler",
      "url": "https://open.spotify.com/track/3xby7fOyqmeON8jsnom0AT"
    }
  ],
  [
    {
      "label": "waka flocka flame, roscoe dash, wale - no hands",
      "url": "https://open.spotify.com/track/03tqyYWC9Um2ZqU0ZN849H"
    }
  ],
  [
    {
      "label": "kodak black, travis scott, offset - zeze",
      "url": "https://open.spotify.com/track/0FZ4Dmg8jJJAPJnvBIzD9z"
    }
  ],
  [
    {
      "label": "rae sremmurd - come get her",
      "url": "https://open.spotify.com/track/1Ser4X0TKttOvo8bgdytTP"
    }
  ],
  [
    {
      "label": "missy elliott - work it",
      "url": "https://open.spotify.com/track/3jagJCUbdqhDSPuxP8cAqF"
    }
  ],
  [
    {
      "label": "too short - blow the whistle",
      "url": "https://open.spotify.com/track/2lMg3lCMOGistaWBNGjuT3"
    }
  ],
  [
    {
      "label": "kendrick lamar, lefty gunplay - tv off",
      "url": "https://open.spotify.com/track/0aB0v4027ukVziUGwVGYpG"
    }
  ],
  [
    {
      "label": "doja cat - paint the town red",
      "url": "https://open.spotify.com/track/7DlZH8EiVDgQXNoj3dnyZC"
    }
  ],
  [
    {
      "label": "sexyy red, bruno mars - fat juicy & wet",
      "url": "https://open.spotify.com/track/5M2lX0ZAYSAzCs1xPPi9BX"
    }
  ],
  [
    {
      "label": "kanye west, dwele - flashing lights",
      "url": "https://open.spotify.com/track/5TRPicyLGbAF2LGBFbHGvO"
    }
  ],
  [
    {
      "label": "playboi carti - evil j0rdan",
      "url": "https://open.spotify.com/track/6iycYUk3oB0NPMdaDUrN1w"
    }
  ],
  [
    {
      "label": "esdeekid, fimiguerrero - tartan",
      "url": "https://open.spotify.com/track/1r7dV486KA1fMo2w1voblx"
    }
  ],
  [
    {
      "label": "isoxo, syzy, kuru - ssky",
      "url": "https://open.spotify.com/track/4x8Mj0CTwq2sdvPetn5P24"
    }
  ],
  [
    {
      "label": "edward maya - stereo love (original)",
      "url": "https://open.spotify.com/track/1aklRy3btsbucImSXvR2SY"
    }
  ],
  [
    {
      "label": "vincent, knownasnat - stereo love",
      "url": "https://open.spotify.com/track/3wXtTIAUYGjjII6Yo1ZDtC"
    }
  ],
  [
    {
      "label": "jigitz - say you’ll never leave",
      "url": "https://open.spotify.com/track/6WWzRhOgZdQmo8wD9JYRg0"
    }
  ],
  [
    {
      "label": "notion, redlight - get out my head",
      "url": "https://open.spotify.com/track/4Yv3uFcvb6QEQaEzb5GqtK"
    }
  ],
  [
    {
      "label": "daniel allan, lyrah - run out",
      "url": "https://open.spotify.com/track/06UoAGlzgaH9ZBXFtG6f2R"
    }
  ],
  [
    {
      "label": "jigitz - bodies",
      "url": "https://open.spotify.com/track/2BmzoYMC2dOyYJzsJpdfm3"
    }
  ],
  [
    {
      "label": "daft punk - superheroes",
      "url": "https://open.spotify.com/track/186hvCTyrni4KT9nwIQ7zS"
    }
  ],
  [
    {
      "label": "jigitz, killen., rebecca & fiona - you're my nature",
      "url": "https://open.spotify.com/track/1UPI8IZpnPpEYZVMf6NgNR"
    }
  ],
  [
    {
      "label": "aaron hibell, clams casino - i’m god hibell remix",
      "url": "https://drive.google.com/file/d/1ljdvBADQjnuxsGh83G6NOwTNnnNj-J3K/view?usp=sharing"
    },
    {
      "label": "chrystal, notion - the days",
      "url": "https://open.spotify.com/track/2OQr262OEu2qWhaDjUydgO"
    }
  ],
  [
    {
      "label": "ciara, dj heartstring - 1 2 step dj heartstring remix",
      "url": "https://open.spotify.com/track/4IhCpufYdnbCIjwWw7tqty"
    }
  ],
  [
    {
      "label": "rose gray - club to your arms",
      "url": "https://open.spotify.com/track/2LZx0kkWq9wnxpFYBzhaIZ"
    }
  ],
  [
    {
      "label": "memphis lk - skyflower",
      "url": "https://open.spotify.com/track/0ODhn6rZk99TXPljMV7nDJ"
    },
    {
      "label": "charli xcx - dying for you",
      "url": "https://open.spotify.com/track/0T3sHoiR3t9HtwbIOgTI7J"
    }
  ],
  [
    {
      "label": "charli xcx - anthems",
      "url": "https://open.spotify.com/track/2ljvO8ZpKFMT3HXwCjW4Yw"
    }
  ],
  [
    {
      "label": "zara larsson - blue moon",
      "url": "https://open.spotify.com/track/20R5YwjmKubeva79prlvJq"
    }
  ],
  [
    {
      "label": "jigitz - you’ll come back",
      "url": "https://open.spotify.com/track/5o2tqRIy3mcH2hJftqvkkJ"
    }
  ],
  [
    {
      "label": "lana del rey, sim0ne, melo nada - say yes to heaven remix",
      "url": "https://open.spotify.com/track/2A7n6aoRd0pxfwasvN4Fh9"
    }
  ],
  [
    {
      "label": "bicep, rialians, acor - glue hard techno rework",
      "url": "https://soundcloud.com/kerbela/premiere-bicep-glue-acor-ht-rework-morc014"
    }
  ],
  [
    {
      "label": "sara landry - interesting",
      "url": "https://open.spotify.com/track/01WgSIiUUA26qptyfLPx3f"
    }
  ],
  [
    {
      "label": "turnstile, four tet - look out for me (four tet remix)",
      "url": "https://open.spotify.com/track/4VBtp8x78yDKANaTLm2cRl"
    }
  ]
];
