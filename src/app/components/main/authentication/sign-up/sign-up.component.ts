import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, NgIf],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

    // isToggled
    isToggled = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ) {
        this.authForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    onSubmit() {
        if (this.authForm.valid) {
            this.router.navigate(['/']);
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }


}