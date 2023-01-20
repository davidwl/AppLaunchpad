import { useEffect } from 'react';
import Head from 'next/head';

export default function Sample2() {
  useEffect(() => {
    const AppLaunchpadClient = require('@applaunchpad-project/client');

    AppLaunchpadClient.addInitListener(function(context) {
      console.log('AppLaunchpad Client initialised in Sample2');
    });
  }, []);

  return (
    <>
      <Head></Head>
      <div>
        <h1>Sample 2</h1>
      </div>
      <div>
        AppLaunchpad ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua.
      </div>
    </>
  );
}