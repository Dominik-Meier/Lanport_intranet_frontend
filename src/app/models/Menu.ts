import {MenuItem} from './MenuItem';

export class Menu {
  public id: number;
  public name: string;
  public startTime: Date;
  public endTime: Date;
  public lanpartyId: number;
  public infos: string;
  public menuItems: MenuItem[];


  constructor(id: number, name: string, startTime: Date, endTime: Date, lanpartyId: number, infos: string, menuItems: MenuItem[]) {
    this.id = id;
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.lanpartyId = lanpartyId;
    this.infos = infos;
    this.menuItems = menuItems;
  }
}
