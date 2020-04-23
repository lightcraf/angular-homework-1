import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameService } from '../services/username.service';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  profileForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usernameService: UsernameService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
  }

  submitProfileForm(): void {
    this.usernameService.setUsername(this.profileForm.value.username);
    this.authGuardService.setUsername(this.profileForm.value.username);
    this.router.navigateByUrl('/play');
  }
}
