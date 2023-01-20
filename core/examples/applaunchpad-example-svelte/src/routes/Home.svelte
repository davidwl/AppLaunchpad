<section class="fd-section">
  <div class="fd-section__header">
    <h1 class="fd-section__title">Home</h1>
  </div>
  <div class="fd-panel">
    { message }
  </div>
</section>
<script>
  import AppLaunchpadClient from '@applaunchpad-project/client';
  import { onMount } from 'svelte';

  let message = 'The app loaded without AppLaunchpad';

  onMount(() => {
    AppLaunchpadClient.addInitListener(() => {
      message = 'AppLaunchpad Client initialized.'
    });
    AppLaunchpadClient.addContextUpdateListener(() => {
      message = 'AppLaunchpad Client updated.'
    });
  });
</script>
