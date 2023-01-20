import AppLaunchpadClient from '@applaunchpad-project/client';

export class ScrollAnchorsHandler {
  init() {
    // scroll if navigate param found
    AppLaunchpadClient.addInitListener(ctx => {
      if (this.initDone) {
        return;
      }
      this.initDone = true;
      if (AppLaunchpadClient.getNodeParams().section) {
        this.scrollAnchor(null, AppLaunchpadClient.getNodeParams().section);
      }
      window.scrollAnchor = this.scrollAnchor;
    });

    AppLaunchpadClient.addContextUpdateListener(ctx => {
      if (AppLaunchpadClient.getNodeParams().section) {
        setTimeout(() => {
          this.scrollAnchor(null, AppLaunchpadClient.getNodeParams().section);
        });
      }
    });
  }

  // Vanilla JavaScript Scroll to Anchor
  // @ https://perishablepress.com/vanilla-javascript-scroll-anchor/
  // modified so respond could be also just a string with the #hash
  scrollAnchor(e, respond = null) {
    let targetID;
    if (e) {
      e.preventDefault();
      targetID = respond ? respond.getAttribute('href') : this.getAttribute('href');
      targetID = `#${targetID.split('#').pop()}`;
    } else {
      targetID = '#' + respond;
    }

    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    targetAnchor.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
