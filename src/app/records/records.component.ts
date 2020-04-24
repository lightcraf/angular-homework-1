import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players.service';
import IPlayers from '../IPlayers';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  players: IPlayers[];

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.players = this.playersService.getPlayers();
  }
}
