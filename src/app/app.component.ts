import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    profileForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]]
    });
    settingsForm = this.formBuilder.group({
        duration: ['', [Validators.required]]
    });
    count: number = 0;
    duration: number = 10;
    isProfileFormHidden: boolean = false;
    initClicker: boolean = true;
    isCountDownDone: boolean = false;
    players: any[];
    isPlayersVisible: boolean = false;
    isSettingsVisible: boolean = false;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    submitProfileForm(): void {
        this.isProfileFormHidden = true;
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

                    const playerList = JSON.parse(localStorage.getItem('players')) || [];
                    const player = {
                        player: this.profileForm.value.username,
                        count: this.count,
                        duration: parseInt(this.settingsForm.value.duration) || 10,
                        clicksPerSecond: (this.count / (parseInt(this.settingsForm.value.duration) || 10)).toFixed(3)
                    };

                    playerList.push(player);
                    localStorage.setItem('players', JSON.stringify(playerList));
                }
            }, 200);
        }
        this.initClicker = false;
    }

    showPlayers(): void {
        const playerList = JSON.parse(localStorage.getItem('players')) || [];
        this.players = playerList.sort(this.compareValues('clicksPerSecond')).slice(0, 10);
        this.isPlayersVisible = !this.isPlayersVisible;
    }

    compareValues(propertyName) {
        return function (object1, object2) {
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
