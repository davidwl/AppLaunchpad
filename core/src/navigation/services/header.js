import { StateHelpers, GenericHelpers } from '../../utilities/helpers';
import { AppLaunchpadConfig, AppLaunchpadI18N, AppLaunchpadUX } from './../../core-api';

export const processHeaderSettings = component => {
  StateHelpers.doOnStoreChange(
    component.store,
    () => {
      const appSwitcher = AppLaunchpadConfig.getConfigValue('navigation.appSwitcher');
      if (appSwitcher) {
        component.set({ appSwitcherItems: appSwitcher.items });
        component.set({ showMainAppEntry: appSwitcher.showMainAppEntry });
        component.set({ itemRenderer: appSwitcher.itemRenderer });
      }
      component.set({
        hasApps:
          component.get().showMainAppEntry ||
          (component.get().appSwitcherItems && component.get().appSwitcherItems.length > 0)
      });
      return AppLaunchpadConfig.getConfigValueAsync('settings.header').then(header => {
        if (header) {
          component.set({ defaultTitle: header.title || '' });
          component.set({ defaultSubTitle: header.subTitle || '' });
        }
        updateTitle(component);

        if (!header) {
          return;
        }

        const hasLogo = Boolean(header.logo);
        component.set({ hasLogo });
        setTimeout(() => {
          if (hasLogo && component.get().logo) {
            component.get().logo.src = header.logo;

            if (header.altText) {
              component.get().logo.alt = header.altText;
            }
          }
        });

        // Set Favicon
        if (header.favicon) {
          const isInvalidFaviconFormat =
            !header.favicon.split('?')[0].endsWith('.ico') && !header.favicon.startsWith('data:image');
          if (isInvalidFaviconFormat) {
            console.warn('Favicon is not an .ico filetype and might get displayed wrong.');
          }
          const link = Object.assign(document.createElement('link'), {
            type: 'image/x-icon',
            rel: 'shortcut icon',
            href: header.favicon
          });
          const head = document.getElementsByTagName('head')[0];

          for (const child of head.childNodes) {
            if (child.rel === 'shortcut icon') {
              child.remove();
            }
          }
          head.appendChild(link);
        }
      });
    },
    ['settings.header']
  );
};

const segmentMatches = (linkSegment, pathSegment, pathParams) => {
  if (linkSegment === pathSegment) {
    return true;
  }
  if (pathSegment.startsWith(':') && pathParams && pathParams[pathSegment.substr(1)] === linkSegment) {
    return true;
  }
  return false;
};

export const updateTitle = component => {
  const appSwitcherItems = component.get().appSwitcherItems;
  const pathData = component.get().pathData;
  const pathParams = component.get().pathParams;
  let selectedItem;
  if (appSwitcherItems && pathData) {
    [...appSwitcherItems]
      .sort((el1, el2) => (el2.link || '').localeCompare(el1.link || ''))
      .some(item => {
        let match = true;
        GenericHelpers.trimTrailingSlash(GenericHelpers.trimLeadingSlash(item.link))
          .split('/')
          .forEach((pathSegment, index) => {
            if (match) {
              if (index + 1 >= pathData.length) {
                match = false;
              } else if (
                !pathData[index + 1].pathSegment ||
                !segmentMatches(pathSegment, pathData[index + 1].pathSegment, pathParams)
              ) {
                match = false;
              }
            }
          });
        if (match) {
          selectedItem = item;
        }
        return match;
      });
  }
  component.set({ selectedItem });
  const title = selectedItem && selectedItem.title ? selectedItem.title : component.get().defaultTitle;
  const documentTitle = AppLaunchpadUX.getDocumentTitle() || title;
  component.set({ title });
  document.title = AppLaunchpadI18N.getTranslation(documentTitle);
  const subTitle = selectedItem ? selectedItem.subTitle || '' : component.get().defaultSubTitle;
  component.set({ subTitle });
};
