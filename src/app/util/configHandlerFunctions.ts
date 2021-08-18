import {NavBarItem} from '../models/NavBarItem';
import {RegisterOptionItem} from '../models/registerOptionItem';

export function configDiffer(oldConfig: NavBarItem[], newConfig: NavBarItem[]) {
  if (oldConfig) {
    for (const oldConfigItem of oldConfig ) {
      if ( newConfig.find( x => x.id.toString() === oldConfigItem.id.toString()) ) {
        const newConfigNavBarItem = newConfig.find( x => x.id.toString() === oldConfigItem.id.toString());
        updateRegisterOptionItemWithNewConfig(oldConfigItem, newConfigNavBarItem);
        updateNabBarItem(oldConfigItem, newConfigNavBarItem);
        addMissingNavBarItems(oldConfig, newConfig);
      } else {
        const index = oldConfig.findIndex( x => x.id.toString() === oldConfigItem.id.toString());
        if (index !== null) {
          oldConfig.splice(index, 1);
        }
      }
    }
  }
}

function addMissingNavBarItems(oldConfig, newConfig) {
  for (const newConfigItem of newConfig) {
    if (!(oldConfig.find( x => x.id.toString() === newConfigItem.id.toString()))) {
      oldConfig.push(newConfigItem);
    }
  }
}

export function updateRegisterOptionItemWithNewConfig(oldConfigItem, newConfigNavBarItem) {
  for (const registerOptionItem of oldConfigItem.getOptions()) {
    if (newConfigNavBarItem.getOptions().find( x => x.id.toString() === registerOptionItem.id.toString())) {
      const newRegisterOptionItem = newConfigNavBarItem.getOptions().find( x => x.id.toString() === registerOptionItem.id.toString());
      updateRegisterOptionItem(registerOptionItem, newRegisterOptionItem);
    } else {
      const index = oldConfigItem.getOptions().findIndex( x => x.id.toString() === registerOptionItem.id.toString());
      if (index !== null) {
        oldConfigItem.getOptions().splice(index, 1);
      }
    }
    for (const newRegisterOptionItem of newConfigNavBarItem.getOptions()) {
      if (!(oldConfigItem.getOptions().find(x => x.id.toString() === newRegisterOptionItem.id.toString()))) {
        oldConfigItem.addOption(newRegisterOptionItem);
      }
    }
  }
}

function updateNabBarItem(oldConfigItem, newConfigNavBarItem) {
  if (oldConfigItem.name !== newConfigNavBarItem.name)
  { oldConfigItem.name = newConfigNavBarItem.name; }
  if (oldConfigItem.activeForIntranet !== newConfigNavBarItem.activeForIntranet)
  { oldConfigItem.activeForIntranet = newConfigNavBarItem.activeForIntranet; }
  if (oldConfigItem.usedComponent !== newConfigNavBarItem.usedComponent)
  { oldConfigItem.usedComponent = newConfigNavBarItem.usedComponent; }
}

function updateRegisterOptionItem(registerOptionItem, newRegisterOptionItem) {
  if (registerOptionItem.name !== newRegisterOptionItem.name) { registerOptionItem.name = newRegisterOptionItem.name; }
  if (registerOptionItem.usedComponent !== newRegisterOptionItem.usedComponent)
  { registerOptionItem.usedComponent = newRegisterOptionItem.usedComponent; }
  if (registerOptionItem.data !== newRegisterOptionItem.data) { registerOptionItem.data = newRegisterOptionItem.data; }
  if (registerOptionItem.activeForIntranet !== newRegisterOptionItem.activeForIntranet)
  { registerOptionItem.activeForIntranet = newRegisterOptionItem.activeForIntranet; }
  if (registerOptionItem.activeForBeamerPresentation !== newRegisterOptionItem.activeForBeamerPresentation)
  { registerOptionItem.activeForBeamerPresentation = newRegisterOptionItem.activeForBeamerPresentation; }
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
