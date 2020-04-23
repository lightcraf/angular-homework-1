import { Component, OnInit } from '@angular/core';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  players: any[];

  constructor(
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.players = this.playersService.getPlayers();
  }
}
