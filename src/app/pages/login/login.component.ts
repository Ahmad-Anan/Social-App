import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

private readonly usersService = inject(UsersService);
private readonly formBuilder = inject(FormBuilder);
private readonly router = inject(Router);
isLoading:boolean = false;
msgSucsess!:string;
msgError!:string;





loginForm:FormGroup = this.formBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password: [null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]],
})


submitForm():void{
  if(this.loginForm.valid){
    this.isLoading=true;
    this.usersService.signIn(this.loginForm.value).subscribe({

      next:(res)=>{
        if(res.message == 'success'){}
        this.isLoading = false;
        this.msgSucsess = res.message
        setTimeout(() => {
          sessionStorage.setItem('token', res.token); 
          this.usersService.saveDataUser();/// Storage Token
          this.router.navigate(['/timeLine'])
        }, 500);
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err);
        this.isLoading = false;
        this.msgError = err.error.message
      },
    })
  }
}

}
