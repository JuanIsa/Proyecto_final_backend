import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'front-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private router: Router, private registerService: RegisterService) { }
  public registerForm: FormGroup = new FormGroup({});

  @ViewChild('fileInput', { static: false }) fileInput: any;
  @ViewChild('form', { static: false }) form: any;

  public file!: File;
  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const parts = this.file.name.split(".");
    if (parts[parts.length - 1] != "jpg") {
      alert('El archivo tiene que ser una imagen formato: jpg')
      this.fileInput.nativeElement.value = null;
    } 
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        repeatpassword: new FormControl('', [Validators.required]),
        completeName: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        age: new FormControl('', [Validators.required]),
        telphoneNumber: new FormControl('', [Validators.required]),
      }
    )
  }
  register() {
    if (
      this.registerForm.get('email')?.errors?.['required'] ||
      this.registerForm.get('password')?.errors?.['required'] ||
      this.registerForm.get('repeatpassword')?.errors?.['required'] ||
      this.registerForm.get('completeName')?.errors?.['required'] ||
      this.registerForm.get('address')?.errors?.['required'] ||
      this.registerForm.get('age')?.errors?.['required'] ||
      this.registerForm.get('telphoneNumber')?.errors?.['required']
    ) {
      alert('Ningún campo puede estar vacío.');
    } else {
      if (this.registerForm.value['password'] === this.registerForm.value['repeatpassword']) {
        this.registerService.registerUser({
          email: this.registerForm.value['email'],
          password: this.registerForm.value['password'],
          completeName: this.registerForm.value['completeName'],
          address: this.registerForm.value['address'],
          age: this.registerForm.value['age'],
          telphoneNumber: this.registerForm.value['telphoneNumber']
        }, this.file).subscribe({
          next: (data) => {
            if (data['status'] == 0) {
              alert(data['message']);
              this.router.navigate(['/auth/login']);
            } else {
              alert(data['message']);
              this.form.nativeElement.reset();
            }
          },
          error:()=> alert('Ah ocurrido un error inesperado, intente nuevamente en unos instantes.')
        })
      } else {
        alert('Las contraseñas deben coincidir');
      }
    }
  }
  goLogin() {
    this.router.navigate(['/auth/login']);
  }

}
