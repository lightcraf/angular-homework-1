import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameService } from '../services/username.service';
import { PlayersService } from '../services/players.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  settingsForm = this.formBuilder.group({
    duration: ['', [Validators.required]]
  });
  count: number = 0;
  duration: number = 10;
  initClicker: boolean = true;
  isCountDownDone: boolean = false;
  isSettingsVisible: boolean = false;
  username: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usernameService: UsernameService,
    private playersService: PlayersService
  ) { }

  ngOnInit(): void {
    this.username = this.usernameService.getUsername();
  }

  startCount(): void {
    if (this.duration > 0) {
      this.count += 1;
    }

    if (this.initClicker) {
      const countDownTimer = setInterval(() => {
        this.duration -= 1;
        if (this.duration < 1) {
          clearInterval(countDownTimer);
          this.isCountDownDone = true;

          const player = {
            player: this.username,
            count: this.count,
            duration: parseInt(this.settingsForm.value.duration) || 10,
            clicksPerSecond: (this.count / (parseInt(this.settingsForm.value.duration) || 10)).toFixed(3)
          };

          this.playersService.setPlayers(player);
        }
      }, 1000);
    }
    this.initClicker = false;
  }

  showPlayers(): void {
    this.router.navigateByUrl('/result');
  }

  playAgain(): void {
    this.count = 0;
    this.duration = parseInt(this.settingsForm.value.duration) || 10;
    this.initClicker = true;
    this.isCountDownDone = false;
  }

  submitSettingsForm(): void {
    if (this.initClicker) {
      this.duration = parseInt(this.settingsForm.value.duration);
    }
  }

  toggleSettings(): void {
    this.isSettingsVisible = !this.isSettingsVisible;
  }
}
