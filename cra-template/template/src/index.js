import React, { Component } from 'react';
import { createRoot } from 'react-dom/client.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './views/home.js';
import Sample1 from './views/sample1.js';
import Sample2 from './views/sample2.js';
import { addInitListener } from '@applaunchpad-project/client';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    addInitListener(() => {
      console.log('AppLaunchpad Client initialized.');
    });
  }
  render() {
    return (
      <BrowserRouter basename={`sampleapp.html#`}>
        <Route path="/home" component={Home} />
        <Route path="/sample1" component={Sample1} />
        <Route path="/sample2" component={Sample2} />
      </BrowserRouter>
    );
  }
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
