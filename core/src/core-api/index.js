import { config } from './config';
import { auth } from './auth';
import { elements } from './dom-elements';
import { navigation } from './navigation';
import { i18n } from './i18n';
import { customMessages } from './custom-messages';
import { ux } from './ux';
import { globalSearch } from './globalsearch';
import { theming } from './theming';
import { featureToggles } from './featuretoggles';
import { routing } from './routing';

export const AppLaunchpadConfig = config;
export const AppLaunchpadAuth = auth;
export const AppLaunchpadElements = elements;
export const AppLaunchpadNavigation = navigation;
export const AppLaunchpadI18N = i18n;
export const AppLaunchpadCustomMessages = customMessages;
export const AppLaunchpadUX = ux;
export const AppLaunchpadGlobalSearch = globalSearch;
export const AppLaunchpadTheming = theming;
export const AppLaunchpadFeatureToggles = featureToggles;
export const AppLaunchpadRouting = routing;

// Expose it window for user app to call AppLaunchpad.setConfig()
window.AppLaunchpad = config;
window.AppLaunchpad.auth = () => auth;
window.AppLaunchpad.elements = () => elements;
window.AppLaunchpad.navigation = () => navigation;
window.AppLaunchpad.i18n = () => i18n;
window.AppLaunchpad.customMessages = () => customMessages;
window.AppLaunchpad.ux = () => ux;
window.AppLaunchpad.globalSearch = () => globalSearch;
window.AppLaunchpad.theming = () => theming;
window.AppLaunchpad.featureToggles = () => featureToggles;
window.AppLaunchpad.routing = () => routing;
