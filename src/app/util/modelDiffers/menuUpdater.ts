import {Menu} from '../../models/Menu';
import {MenuItem} from '../../models/MenuItem';


export function menuDiffer(oldMenu: Menu, newMenu: Menu) {
  if (oldMenu.name !== newMenu.name) {oldMenu.name = newMenu.name; }
  if (oldMenu.startTime !== newMenu.startTime) {oldMenu.startTime = newMenu.startTime; }
  if (oldMenu.endTime !== newMenu.endTime) {oldMenu.endTime = newMenu.endTime; }
  if (oldMenu.lanpartyId !== newMenu.lanpartyId) {oldMenu.lanpartyId = newMenu.lanpartyId; }
  if (oldMenu.infos !== newMenu.infos) {oldMenu.infos = newMenu.infos; }
}

export function menuItemDiffer(x: MenuItem, y: MenuItem) {
  // Noting to do here
}

