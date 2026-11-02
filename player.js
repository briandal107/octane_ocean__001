/* Provider URLs are validated before they are placed in an iframe. */
function embedFor(link) {
  const url = new URL(link);
  const host = url.hostname;
  if (host === 'open.spotify.com') {
    const match = url.pathname.match(/^\/(?:intl-[a-z]+\/)?track\/([A-Za-z0-9]{22})\/?$/);
    if (match) return { provider: 'spotify', src: `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator` };
  }
  if (host === 'www.youtube.com' || host === 'youtube.com' || host === 'youtu.be') {
    const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
    if (/^[\w-]{11}$/.test(id || '')) return { provider: 'youtube', src: `https://www.youtube.com/embed/${id}` };
  }
  if (host === 'soundcloud.com' && /^\/[^/]+\/[^/]+\/?$/.test(url.pathname)) {
    return { provider: 'soundcloud', src: `https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23242422&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false` };
  }
  if (host === 'drive.google.com') {
    const match = url.pathname.match(/^\/file\/d\/([\w-]+)\//);
    if (match) return { provider: 'drive', src: `https://drive.google.com/file/d/${match[1]}/preview` };
  }
  return null;
}

const list = document.getElementById('tracks');
const player = document.getElementById('player');
let currentLink;
function selectSong(anchor, song) {
  if (anchor === currentLink) return;
  const embed = embedFor(song.url);
  if (!embed) return;
  currentLink?.removeAttribute('aria-current');
  anchor.setAttribute('aria-current', 'true');
  currentLink = anchor;
  const frame = document.createElement('iframe');
  frame.src = embed.src;
  frame.title = song.label;
  frame.className = `player-${embed.provider}`;
  frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  player.replaceChildren(frame); // Removing the old player also stops its audio.
}
for (const songs of tracks) {
  const row = document.createElement('li');
  songs.forEach((song, index) => {
    if (index) {
      const separator = document.createElement('span');
      separator.className = 'mix';
      separator.textContent = 'w/';
      row.append(separator);
    }
    const element = document.createElement(song.url ? 'a' : 'span');
    element.textContent = song.label;
    if (song.url) {
      element.href = song.url;
      element.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (!embedFor(song.url)) return;
        event.preventDefault();
        selectSong(element, song);
      });
    } else {
      element.className = 'unavailable';
    }
    row.append(element);
  });
  list.append(row);
}
const first = tracks.flat().find(song => song.url);
if (first) selectSong(list.querySelector('a'), first);
