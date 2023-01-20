import React, { Component } from 'react';
import 'fundamental-styles';

export default class Sample1 extends Component {
  render() {
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">Sample 1</h1>
          </div>
          <div className="fd-panel">
            AppLaunchpad ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore et dolore magna aliquyam erat, sed diam voluptua.
          </div>
        </section>
      </div>
    );
  }
}
