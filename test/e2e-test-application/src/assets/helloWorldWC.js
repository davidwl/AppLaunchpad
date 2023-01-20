export default class extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<section><p>Hello World!</p></section>`;

    const templateBtn = document.createElement('template');
    templateBtn.innerHTML = '<button>Click me!</button>';

    const empty = document.createElement('template');
    empty.innerHTML = `<section><p>Test!</p><br/><br/></section>`;

    this._shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: false
    });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this._shadowRoot.appendChild(templateBtn.content.cloneNode(true));

    for (let index = 0; index < 20; index++) {
      this._shadowRoot.appendChild(empty.content.cloneNode(true));
    }

    this.$paragraph = this._shadowRoot.querySelector('p');
    this.$button = this._shadowRoot.querySelector('button');
    this.$button.addEventListener('click', () => {
      if (this.AppLaunchpadClient) {
        this.AppLaunchpadClient.uxManager().showAlert({
          text: 'Hello from uxManager in Web Component, Language:' + this.AppLaunchpadClient.getCurrentLocale(),
          type: 'info'
        });

        window.AppLaunchpad.featureToggles().setFeatureToggle('ft1');

        this.AppLaunchpadClient.uxManager().showAlert({
          text: 'Active feature toggles list: ' + this.AppLaunchpadClient.getActiveFeatureToggleList(),
          type: 'info'
        });

        this.AppLaunchpadClient.uxManager().showAlert({
          text: 'Active feature toggles: ' + this.AppLaunchpadClient.getActiveFeatureToggles(),
          type: 'info'
        });
      }
    });
  }

  set context(ctx) {
    this.$paragraph.innerHTML = ctx.title;
  }
}
