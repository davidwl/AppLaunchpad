import React, { Component, useState, useEffect } from 'react';
import {
  addInitListener,
  addContextUpdateListener,
  removeContextUpdateListener,
  removeInitListener
} from '@applaunchpad-project/client';

const Home = () => {
  const [message, setMessage] = useState(
    ''
  );
  const [initListener, setInitListener] = useState(
    null
  );
  const [contextUpdateListener, setContextUpdateListener] = useState(
    null
  );

  useEffect(() => {
    setInitListener(addInitListener(initialContext => {
      setMessage('AppLaunchpad Client initialized.')
    }));

    setContextUpdateListener(addContextUpdateListener(updatedContext => {
      setMessage('AppLaunchpad Client updated.');
    }));

    return function cleanup() {
      removeContextUpdateListener(contextUpdateListener);
      removeInitListener(initListener);
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>{message}</div>
    </div>
  );
}

export default Home;