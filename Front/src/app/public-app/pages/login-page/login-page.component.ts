import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'front-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    constructor(private router: Router, private loginService: LoginService, private guardservice: AuthGuard, private authServices: AuthService) { }
    public loginForm: FormGroup = new FormGroup({});
    ngOnInit(): void {
        this.loginForm = new FormGroup(
            {
                email: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required])
            }
        )
        this.authServices.getCookie().subscribe({
            next: data => { 
                if (data.status == 0) {
                    this.guardservice.flag = true;
                    this.router.navigate(['home']);
                }
            },
            error: error=>console.error(error)
        });
    }
    login() {
        if (this.loginForm.get('email')?.errors?.['required'] || this.loginForm.get('password')?.errors?.['required']) {
            alert('Ningún campo puede estar vacío.');
        } else {
            this.loginService.loginUser(this.loginForm.value).subscribe({
                next: data => {
                    if (data.status == 0) {
                        this.guardservice.flag=true;
                        this.router.navigate(['home']);
                    } else {
                        alert('Credenciales inválidas.')
                    }
                },
                error: e => {
                    if (e.status == 401) {
                        alert('Credenciales inválidas');
                    }
                }
            })
        }
    }
    goRegister() {
        this.router.navigate(['/auth/register']);
    }
}
