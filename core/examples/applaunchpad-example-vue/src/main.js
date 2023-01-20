import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import AppLaunchpadClient from '@applaunchpad-project/client';

Vue.mixin({
  created() {
    this.applaunchpadClient = AppLaunchpadClient;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
