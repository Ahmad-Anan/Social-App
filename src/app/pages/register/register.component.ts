import { Component, inject } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private readonly usersService = inject(UsersService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  isLoading: boolean = false;
  msgSuccess: string | null = null;
  msgError: string | null = null;

  registerForm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null,[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/)]],
    rePassword: [null, [Validators.required]],
    dateOfBirth: [null, [Validators.required]],
    gender: [null, [Validators.required]]
  }, { validators: this.confirmPassword });

  confirmPassword(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const signupData = this.registerForm.value; // Include all fields, including rePassword

      this.usersService.signUp(signupData).subscribe({
        next: (res: any) => {
          if (res.message === 'success') {
            this.msgSuccess = 'Registration successful!';
            if (res.token) {
              sessionStorage.setItem('token', res.token);
              this.usersService.saveDataUser();
            }
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log('Full error details:', err);
          this.msgError = err.error.error || 'Registration failed'; // Use server error message
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}