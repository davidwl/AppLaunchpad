import App from './App.svelte';
import '@applaunchpad-project/core';

const app = new App({
  target: document.body,
  props: {
    name: 'AppLaunchpad Fiddle'
  }
});

window.app = app;

export default app;
