<template>
  <div>
    <section class="fd-section">
      <div class="fd-section__header">
        <h1 class="fd-section__title">Home</h1>
      </div>
      <div class="fd-panel">
        {{ message }}
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "home",
    data: () => ({
      message: ''
    }),
    components: {},
    methods: {},
    created () {
      this.applaunchpadClient.addInitListener(initialContext => {
        this.message = 'AppLaunchpad Client initialized.'
      });
      this.applaunchpadClient.addContextUpdateListener(updatedContext => {
        this.message = 'AppLaunchpad Client updated.'
      });
    }
  }
</script>

<style scoped lang="scss">
</style>
