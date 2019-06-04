import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '../_services/login.service';
import { Menu } from '../_entities/usuarioInfo.entity';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  today: number = Date.now();
  backgroundImage: string;
  copyright: string;
  copyrightLink: string;
  doLogin = false;
  logo: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    // redirect donde corresponda si el usuario se encuentra logueado
  }

  async ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'

    this.loginService.getLoginImage()
      .subscribe(
        data => {
          this.backgroundImage = data.url;
          this.copyright = data.copyright;
          this.copyrightLink = data.copyrightLink;
        });

    this.loginService.getLogo()
        .subscribe(
          data => this.logo = data
        );

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  setStyles() {
    const styles = {
      'background': 'url(' + this.backgroundImage + ') no-repeat center center fixed'
    };
    return styles;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.snackBar.open('Ingrese los valores', 'OK', {
        duration: 5000,
      });
      return;
    }

    this.doLogin = true;
    this.loginService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          // Valido si tiene que mostrar las pantallas de "Onboarding"
          localStorage.removeItem('items_cart');
          this.router.navigate(['/menu/products-list']);
          this.doLogin = false;
        },
        error => {
          this.doLogin = false;
        });
  }

}
