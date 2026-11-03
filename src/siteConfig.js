import { useEffect, useState } from 'react';
import builtConfig from '../public/site-config.json';

// Site switches that can be changed without a new build: edit site-config.json in the
// published site's root folder and the page picks it up on the next load.
// The build bakes in the values from public/site-config.json, so the prerendered page
// matches them; the live file is read after the page loads and wins if it differs.

const CONFIG_URL = `${import.meta.env?.BASE_URL ?? '/'}site-config.json`;

let live; // shared by every component, fetched at most once per page load

function loadLiveConfig() {
  if (!live) {
    live = fetch(CONFIG_URL, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}));
  }
  return live;
}

export function useSiteConfig() {
  const [config, setConfig] = useState(builtConfig);
  useEffect(() => {
    let active = true;
    loadLiveConfig().then((fresh) => {
      if (active) setConfig((c) => ({ ...c, ...fresh }));
    });
    return () => {
      active = false;
    };
  }, []);
  return config;
}

/** Test helper: forget the fetched file so the next render fetches again. */
export function resetSiteConfig() {
  live = undefined;
}
