import React, { Component } from 'react';
import 'fundamental-styles';
import {
  addInitListener,
  addContextUpdateListener,
  removeContextUpdateListener,
  removeInitListener
} from '@applaunchpad-project/client';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.initListener = null;
    this.contextUpdateListener = null;
  }

  componentDidMount() {
    this.initListener = addInitListener(initialContext => {
      this.setState({
        message: 'AppLaunchpad Client initialized.'
      });
    });
    this.contextUpdateListener = addContextUpdateListener(updatedContext => {
      this.setState({
        message: 'AppLaunchpad Client updated.'
      });
    });
  }

  componentWillUnmount() {
    removeContextUpdateListener(this.contextUpdateListener);
    removeInitListener(this.initListener);
  }

  render() {
    return (
      <div>
        <section className="fd-section">
          <div className="fd-section__header">
            <h1 className="fd-section__title">Home</h1>
          </div>
          <div className="fd-panel">{this.state.message}</div>
        </section>
      </div>
    );
  }
}
