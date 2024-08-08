import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { BaseComponent } from '../../../internal-components/other-components/base.component';
import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { LoginViewModel } from '../../../models/view/auth-viewModels/login.viewmodel';
import { AccountService } from '../../../services/account.service';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends BaseComponent<LoginViewModel> implements OnInit{

    // isToggled
    isToggled = false;

    constructor(commonService:CommonService,exceptionHandler:LogHandlerService,
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private accountService:AccountService,
    ) {
        super(commonService,exceptionHandler);
        this.authForm = this.fb.group({
            username: ['', [Validators.required,]],
            passwordHash: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
        this.viewModel= new LoginViewModel();
    }

    ngOnInit(): void {

    }
    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
 async   onSubmit() {
        if (this.authForm.valid) {
            this.viewModel.userLogin=this.authForm.value;
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
        try {
           let resp= await this.accountService.generateToken(this.viewModel.userLogin,false)
           if(resp.isError){
             this._exceptionHandler.handleError(resp.errorData);
             return;  // Return if error occurred. Else, the next line will be executed.

           }
           console.log(resp.successData)
            this.router.navigate(['/dashboard']);

        } catch (error) {
            
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

}