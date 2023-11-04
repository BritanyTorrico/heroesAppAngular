import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  public myForm : FormGroup= this.fb.group({
    username:['',Validators.required],
    name:['',[Validators.required,Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)],],
    password:['',Validators.required],
    email:['',[Validators.required,Validators.email]]

  })
  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private authService: AuthService
  ){}

  isValidField(field: string){
    return this.validatorsService.isValidField(this.myForm,field);
   }

   createAcount(){
    if(this.myForm.invalid) return;
    this.authService.newUser(this.myForm);
    this.myForm.reset();

   }
  onSubmit(){

    this.myForm.markAllAsTouched();

  }
}
