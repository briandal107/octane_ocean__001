/* Only these providers can be embedded. No credentials or Spotify login are stored here. */
function embedFor(link, autoplay = false) {
  let url;
  try { url = new URL(link); } catch { return null; }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname;
  if (host === 'open.spotify.com') {
    const match = url.pathname.match(/^\/(?:intl-[a-z]+\/)?track\/([A-Za-z0-9]{22})\/?$/);
    if (match) return {
      provider: 'spotify',
      uri: `spotify:track:${match[1]}`,
      src: `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator`
    };
  }
  if (host === 'www.youtube.com' || host === 'youtube.com' || host === 'youtu.be') {
    const id = host === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
    if (/^[\w-]{11}$/.test(id || '')) {
      const params = new URLSearchParams({ enablejsapi: '1', playsinline: '1', autoplay: autoplay ? '1' : '0' });
      if (location.protocol === 'http:' || location.protocol === 'https:') params.set('origin', location.origin);
      return { provider: 'youtube', src: `https://www.youtube.com/embed/${id}?${params}` };
    }
  }
  if (host === 'soundcloud.com' && /^\/[^/]+\/[^/]+\/?$/.test(url.pathname)) {
    const params = new URLSearchParams({
      url: link, color: '#242422', auto_play: String(autoplay), hide_related: 'true',
      show_comments: 'false', show_user: 'true', show_reposts: 'false', show_teaser: 'false'
    });
    return { provider: 'soundcloud', src: `https://w.soundcloud.com/player/?${params}` };
  }
  if (host === 'drive.google.com') {
    const match = url.pathname.match(/^\/file\/d\/([\w-]+)\//);
    if (match) return { provider: 'drive', src: `https://drive.google.com/file/d/${match[1]}/preview` };
  }
  return null;
}

const list = document.getElementById('tracks');
const player = document.getElementById('player');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const queue = [];
const apis = {};
const apiLoads = {};
let active = null;

/* A failed or blocked SDK leaves a regular, usable embed and the Next button. */
function loadAPI(provider) {
  if (apis[provider]) return Promise.resolve(apis[provider]);
  if (apiLoads[provider]) return apiLoads[provider];
  const sources = {
    spotify: ['https://open.spotify.com/embed/iframe-api/v1', 'onSpotifyIframeApiReady'],
    youtube: ['https://www.youtube.com/iframe_api', 'onYouTubeIframeAPIReady'],
    soundcloud: ['https://w.soundcloud.com/player/api.js', null]
  };
  apiLoads[provider] = new Promise(resolve => {
    let settled = false;
    const finish = api => {
      if (api) apis[provider] = api;
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      resolve(api);
    };
    const timeout = setTimeout(() => finish(null), 8000);
    const [src, callback] = sources[provider];
    if (callback) window[callback] = api => finish(provider === 'youtube' ? window.YT : api);
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      if (provider === 'soundcloud') finish(window.SC?.Widget ? window.SC : null);
      if (provider === 'youtube' && window.YT?.Player) finish(window.YT);
    };
    script.onerror = () => finish(null);
    document.head.append(script);
  });
  return apiLoads[provider];
}

/* Providers and browsers can reject play requests; their native play button stays available. */
function attempt(action) {
  try { Promise.resolve(action()).catch(() => {}); } catch { /* Keep manual controls usable. */ }
}

function advance(session) {
  if (session !== active || session.finished || session.index === queue.length - 1) return;
  session.finished = true; // Ignore duplicate end events from a departing player.
  selectSong(session.index + 1, true);
}

function makeFrame(session, embed) {
  const frame = document.createElement('iframe');
  frame.src = embed.src;
  frame.title = session.song.label;
  frame.className = `player-${embed.provider}`;
  frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  frame.allowFullscreen = true;
  player.replaceChildren(frame); // Removing the previous frame also stops its audio.
  return frame;
}

async function connectSoundCloud(session, frame) {
  const api = await loadAPI('soundcloud');
  if (session !== active || !api) return;
  try {
    const widget = api.Widget(frame);
    const events = api.Widget.Events;
    session.cleanup = () => {
      [events.READY, events.PLAY, events.FINISH].forEach(event => widget.unbind(event));
    };
    widget.bind(events.PLAY, () => { if (session === active) session.started = true; });
    widget.bind(events.FINISH, () => { if (session.started) advance(session); });
    widget.bind(events.READY, () => {
      if (session === active && session.autoplay) attempt(() => widget.play());
    });
  } catch { /* Native embed and Next still work without SDK control. */ }
}

async function connectYouTube(session, frame) {
  const api = await loadAPI('youtube');
  if (session !== active || !api) return;
  try {
    const widget = new api.Player(frame, {
      events: {
        onReady: event => {
          if (session === active && session.autoplay) attempt(() => event.target.playVideo());
        },
        onStateChange: event => {
          if (session !== active) return;
          if (event.data === api.PlayerState.PLAYING) session.started = true;
          if (event.data === api.PlayerState.ENDED && session.started) advance(session);
        }
      }
    });
    session.cleanup = () => widget.destroy();
  } catch { /* Native embed and Next still work without SDK control. */ }
}

async function connectSpotify(session, embed) {
  const host = document.createElement('div');
  host.className = 'player-spotify';
  const mount = document.createElement('div');
  mount.style.height = '100%';
  const loading = document.createElement('span');
  loading.className = 'player-loading';
  loading.textContent = 'loading…';
  mount.append(loading);
  host.append(mount);
  player.replaceChildren(host);

  const api = await loadAPI('spotify');
  if (session !== active) return;
  if (!api) { makeFrame(session, embed); return; }
  let pending = true;
  let controller;
  const fallback = () => {
    if (session !== active || !pending) return;
    pending = false;
    clearTimeout(timeout);
    if (controller) attempt(() => controller.destroy());
    session.cleanup = () => {};
    makeFrame(session, embed);
  };
  const timeout = setTimeout(fallback, 8000);
  session.cleanup = () => {
    pending = false;
    clearTimeout(timeout);
    if (controller) controller.destroy();
  };
  const configureFrame = () => {
    const frame = host.querySelector('iframe');
    if (!frame) return;
    frame.title = session.song.label;
    frame.style.height = '100%';
    frame.style.width = '100%';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  };
  try {
    api.createController(mount, { uri: embed.uri, width: '100%', height: 352 }, widget => {
      if (session !== active || !pending) { attempt(() => widget.destroy()); return; }
      controller = widget;
      try {
        configureFrame();
        controller.addListener('ready', () => {
          if (session !== active || !pending) return;
          clearTimeout(timeout);
          configureFrame();
          if (session.autoplay) attempt(() => controller.play());
        });
        controller.addListener('playback_update', event => {
          if (session !== active || !pending) return;
          const { position, duration, isPaused, isBuffering } = event.data || {};
          if (isBuffering) return;
          if (isPaused === false) {
            session.started = true;
            clearTimeout(timeout);
          }
          // Spotify has no documented "ended" event. Only advance on a reported end;
          // never use a guessed timer (which would skip paused/buffering tracks).
          if (session.started && Number.isFinite(position) && Number.isFinite(duration) &&
              duration > 0 && position >= duration) advance(session);
        });
      } catch { fallback(); }
    });
  } catch { fallback(); }
}

function selectSong(index, autoplay = false) {
  const entry = queue[index];
  if (!entry || active?.index === index) return;
  if (active) {
    const previous = active;
    active = null; // Cleanup can emit events synchronously; they belong to the old song.
    previous.link.removeAttribute('aria-current');
    attempt(previous.cleanup);
  }
  const session = { ...entry, index, autoplay, started: false, finished: false, cleanup: () => {} };
  active = session;
  session.link.setAttribute('aria-current', 'true');
  session.link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  previousButton.disabled = index === 0;
  previousButton.title = previousButton.disabled ? 'Start of tracklist' : queue[index - 1].song.label;
  previousButton.setAttribute('aria-label', previousButton.disabled ? 'Previous song — start of tracklist' : `Previous song: ${queue[index - 1].song.label}`);
  nextButton.disabled = index === queue.length - 1;
  nextButton.title = nextButton.disabled ? 'End of tracklist' : queue[index + 1].song.label;
  nextButton.setAttribute('aria-label', nextButton.disabled ? 'Next song — end of tracklist' : `Next song: ${queue[index + 1].song.label}`);
  const embed = embedFor(session.song.url, autoplay);
  if (embed.provider === 'spotify') {
    connectSpotify(session, embed);
  } else {
    const frame = makeFrame(session, embed);
    if (embed.provider === 'soundcloud') connectSoundCloud(session, frame);
    if (embed.provider === 'youtube') connectYouTube(session, frame);
    // Google Drive's preview has no supported playback API; Next remains available.
  }
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
    const playable = song.url && embedFor(song.url);
    const element = document.createElement(playable ? 'a' : 'span');
    element.textContent = song.label;
    if (playable) {
      element.href = song.url;
      const queueIndex = queue.length;
      queue.push({ song, link: element });
      element.addEventListener('click', event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        selectSong(queueIndex, true);
      });
    } else {
      element.className = 'unavailable';
    }
    row.append(element);
  });
  list.append(row);
}

previousButton.addEventListener('click', () => { if (active && active.index > 0) selectSong(active.index - 1, true); });
nextButton.addEventListener('click', () => { if (active) advance(active); });
if (queue.length) selectSong(0);
// Prepare Spotify while the opening SoundCloud track plays, without starting audio.
if (queue.some(entry => embedFor(entry.song.url).provider === 'spotify')) loadAPI('spotify');
