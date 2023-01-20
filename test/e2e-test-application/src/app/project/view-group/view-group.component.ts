import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.css']
})
export class ViewGroupComponent implements OnInit {
  vg: string;
  id: string;
  code: string;
  config: string;
  time: string;
  window: Window;

  constructor(private route: ActivatedRoute, @Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngOnInit() {
    let iframes = Array.from(this.window.parent.document.querySelectorAll('iframe'));
    if (!iframes || !iframes[0] || !iframes[0]['applaunchpad']) {
      return;
    }

    console.log('this.window.parent.AppLaunchpad --> ', this.window.parent['AppLaunchpad'].config);

    this.config = JSON.stringify(
      {
        viewGroupSettings: this.window.parent['AppLaunchpad'].config.navigation.viewGroupSettings,
        preloadViewGroups: this.window.parent['AppLaunchpad'].config.navigation.preloadViewGroups
      },
      null,
      3
    );

    this.route.paramMap.subscribe(queryParams => {
      this.vg = queryParams.get('vg');
      this.time = new Date().toJSON();

      let iframes = Array.from(this.window.parent.document.querySelectorAll('iframe')).map(this.transformIframes);

      this.code = JSON.stringify(iframes, null, 3);
      let currentIFrame = iframes.find(
        iframe => !!iframe.currentNode && !!iframe.currentNode.pathSegment && iframe.currentNode.pathSegment === this.vg
      );

      if (!!currentIFrame) {
        this.id = currentIFrame['id'];
      }
    });
  }

  transformIframes(iframe) {
    let applaunchpadMf = iframe['applaunchpad'];
    const clonedAppLaunchpadMf = Object.assign({}, applaunchpadMf);
    clonedAppLaunchpadMf.currentNode = Object.assign({}, applaunchpadMf.currentNode);
    delete clonedAppLaunchpadMf.currentNode.parent;
    clonedAppLaunchpadMf.currentNode.children = ['...children removed'];
    return clonedAppLaunchpadMf;
  }
}
