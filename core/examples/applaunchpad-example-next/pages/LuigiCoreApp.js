import { useEffect } from 'react';

export default function AppLaunchpadApp() {
  useEffect(() => {
    require('@applaunchpad-project/core/applaunchpad.js');
    require('../public/applaunchpad-config.js');
  }, []);

  return null;
}
