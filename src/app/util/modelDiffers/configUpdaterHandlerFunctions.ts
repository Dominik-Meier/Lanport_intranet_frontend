import {NavBarItem} from '../../models/NavBarItem';
import {RegisterOptionItem} from '../../models/registerOptionItem';

export function configDiffer(oldConfig: NavBarItem[], newConfig: NavBarItem[]) {
  if (oldConfig) {
    for (const oldConfigItem of oldConfig ) {
      const newConfigNavBarItem = newConfig.find( x => x.id.toString() === oldConfigItem.id.toString());
      if (newConfigNavBarItem) {
        configDiffer(oldConfigItem.appComponents, newConfigNavBarItem.appComponents);
        updateNavBarItem(oldConfigItem, newConfigNavBarItem);
      } else {
        removeNavbarItems(oldConfig, oldConfigItem);
      }
    }
    addMissingNavBarItems(oldConfig, newConfig);
  } else {
    oldConfig = newConfig;
  }
  configSorter(oldConfig);
}

export function configSorter(config: NavBarItem[]) {
  config.sort( (x, y) => x.order - y.order);
  config.forEach(navItem => {
    if (navItem.appComponents && navItem.appComponents.length > 0) {
      configSorter(navItem.appComponents);
    }
  });
}

function removeNavbarItems(oldConfig: NavBarItem[], oldConfigItem: NavBarItem) {
  const index = oldConfig.findIndex( x => x.id.toString() === oldConfigItem.id.toString());
  if (index !== null) {
    oldConfig.splice(index, 1);
  }
}

function addMissingNavBarItems(oldConfig, newConfig) {
  for (const newConfigItem of newConfig) {
    if (!(oldConfig.find( x => x.id.toString() === newConfigItem.id.toString()))) {
      oldConfig.push(newConfigItem);
    }
  }
}

function updateNavBarItem(oldNavBarItem: NavBarItem, newNabBarItem: NavBarItem) {
  if (oldNavBarItem.id !== newNabBarItem.id) { oldNavBarItem.id = newNabBarItem.id; }
  if (oldNavBarItem.name !== newNabBarItem.name) { oldNavBarItem.name = newNabBarItem.name; }
  if (oldNavBarItem.usedComponent !== newNabBarItem.usedComponent)
  { oldNavBarItem.usedComponent = newNabBarItem.usedComponent; }
  if (oldNavBarItem.data !== newNabBarItem.data) { oldNavBarItem.data = newNabBarItem.data; }
  if (oldNavBarItem.activeForIntranet !== newNabBarItem.activeForIntranet)
  { oldNavBarItem.activeForIntranet = newNabBarItem.activeForIntranet; }
  if (oldNavBarItem.activeForBeamerPresentation !== newNabBarItem.activeForBeamerPresentation)
  { oldNavBarItem.activeForBeamerPresentation = newNabBarItem.activeForBeamerPresentation; }
  if (oldNavBarItem.icon !== newNabBarItem.icon) { oldNavBarItem.icon = newNabBarItem.icon; }
  if (oldNavBarItem.beamerTimer !== newNabBarItem.beamerTimer) { oldNavBarItem.beamerTimer = newNabBarItem.beamerTimer; }
  if (oldNavBarItem.order !== newNabBarItem.order) { oldNavBarItem.order = newNabBarItem.order; }
}

export function resolveNewHtmlDisplayerValue(oldData: RegisterOptionItem, newConfig: NavBarItem[]) {
  for (const navItem of newConfig) {
    const registerOptionItem = navItem.getOptions().find( x => x.id.toString() === oldData.id.toString());
    if (registerOptionItem) {
      if (oldData.name !== registerOptionItem.name) { oldData.name = registerOptionItem.name; }
      if (oldData.data !== registerOptionItem.data) { oldData.data = registerOptionItem.data; }
      if (oldData.activeForIntranet !== registerOptionItem.activeForIntranet)
      { oldData.activeForIntranet = registerOptionItem.activeForIntranet; }
      if (oldData.activeForBeamerPresentation !== registerOptionItem.activeForBeamerPresentation)
      { oldData.activeForBeamerPresentation = registerOptionItem.activeForBeamerPresentation; }
    }
  }
}
