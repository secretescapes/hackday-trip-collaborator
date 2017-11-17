import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'app/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) {
    this.form = formBuilder.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmPassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onSignUp() {
    if (this.form.valid &&
        this.form.value.password === this.form.value.confirmPassword) {
      this.authService.signup(this.form.value.email, this.form.value.password)
        .then(() => {
          this.router.navigate(['/app/boards']);
        })
        .catch(err => {
          alert(`Error: ${err}`);
        });
    }
  }

}
