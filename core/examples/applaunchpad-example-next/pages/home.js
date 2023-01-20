import { useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  useEffect(() => {
    const AppLaunchpadClient = require('@applaunchpad-project/client');

    AppLaunchpadClient.addInitListener(function(context) {
      console.log('AppLaunchpad Client initialised in Home');
    });
  }, []);

  return (
    <>
      <Head />
      <div>
        <h1>Welcome to AppLaunchpad with Next.js</h1>
      </div>
    </>
  );
}
