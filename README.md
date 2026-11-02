# Tracklist

A static, dependency-free tracklist. Open `index.html` in a browser, or serve this directory:

```sh
python3 -m http.server 8000
```

`tracks.js` holds the ordered songs and their full-song URLs. Each song in a `w/` pairing has its own URL. A null URL renders as unlinked text. The player supports Spotify tracks, YouTube videos, SoundCloud tracks, and Google Drive file previews; selecting another song removes the previous player to stop its audio. Modified clicks open the source URL normally.

## Link status

All 56 songs across 52 tracklist entries have source links: 52 Spotify tracks, two SoundCloud tracks, one YouTube video, and one Google Drive audio file. Both songs on each of the four `w/` lines are independently clickable. Supplied links are preserved, with Spotify sharing parameters removed.

Browser checks verified every song selects its matching embedded player, revised credits and the insertion of “come get her” after “zeze,” one active iframe at a time, keyboard activation, and the mobile layout. External player requests were mocked during these checks; provider availability, playback, and the public Google Drive audio preview still need live verification. No link lookup access is needed to use the supplied URLs; the visitor’s browser loads each provider directly.
