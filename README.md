# Tracklist

A static, dependency-free tracklist. Open `index.html` in a browser, or serve this directory:

```sh
python3 -m http.server 8000
```

`tracks.js` holds the ordered songs and their full-song URLs. Each song in a `w/` pairing has its own URL. A null URL renders as unlinked text. The player supports Spotify tracks, YouTube videos, SoundCloud tracks, and Google Drive file previews; selecting another song removes the previous player to stop its audio. Modified clicks open the source URL normally.

## Playback order

Start the first song in its widget. The page then requests playback of the next linked song when the current provider reports completion. Both songs on a `w/` line are separate queue entries, in the displayed order. The small **← Previous** and **Next →** buttons move through the queue manually. Previous is disabled at the first song, and Next is disabled at the last song. The queue does not wrap.

- SoundCloud and YouTube use their official widget APIs and completion events.
- Spotify uses its iFrame API and advances only after playback has started and a playback update reports reaching the track's duration. A paused track, buffering, or a preview stopping short of the reported duration does not advance the queue. Some Spotify embeds may never report a usable completion update; use Next in that case. This does not unlock full-song playback or bypass Spotify account restrictions.
- Google Drive's preview does not expose a supported completion event. Use Next after the WAV finishes.

Automatic playback is best effort: browsers can reject play requests, and external provider scripts may fail to load. Native widgets and Next remain available in those cases. The page does not guess song endings from elapsed time. It starts silently on initial page load.

While a provider reports playback, the song turns cerulean, its row indents slightly, and a play icon replaces the row number. Pausing, buffering, finishing, or changing songs clears this styling. On mixed lines only the playing song and its acapella annotation turn blue. Drive previews and embeds with unavailable playback APIs retain the selected-song underline because their playing/paused state is unavailable.

## Link status

All 56 songs across 52 tracklist entries have source links: 52 Spotify tracks, two SoundCloud tracks, one YouTube video, and one Google Drive audio file. Both songs on each of the four `w/` lines are independently clickable. Supplied links are preserved, with Spotify sharing parameters removed.

Browser checks verified progression through all 56 songs, provider completion handlers, duplicate and stale event handling, playing/paused styling, pause/buffer/preview safeguards, rejected autoplay, blocked or delayed APIs, keyboard controls, the final queue entry, and fixed header/player layout at six viewport widths. Provider SDKs and media were mocked: this cloud environment blocks live provider access, so real playback and the public Google Drive audio preview remain unverified. The visitor's browser loads each provider directly.

When changing the CSS or player script, update its `?v=` value in `index.html` so returning visitors fetch the matching assets.
