import { Injectable } from '@angular/core';
import IPlayers from '../IPlayers';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor() { }

  getPlayers(): IPlayers[] {
    const playerList = JSON.parse(localStorage.getItem('players')) || [];
    return playerList.sort(this.compareValues('clicksPerSecond')).slice(0, 10);
  }

  setPlayers(player: object): void {
    const playerList = JSON.parse(localStorage.getItem('players')) || [];
    playerList.push(player);
    localStorage.setItem('players', JSON.stringify(playerList));
  }

  compareValues(propertyName) {
    return function (object1: IPlayers, object2: IPlayers): number {
      const value1 = (typeof object1[propertyName] === 'string') ? object1[propertyName].toUpperCase() : object1[propertyName];
      const value2 = (typeof object2[propertyName] === 'string') ? object2[propertyName].toUpperCase() : object2[propertyName];

      if (value1 < value2) {
        return 1;
      } else if (value1 > value2) {
        return -1;
      } else {
        return 0;
      }
    };
  }
}