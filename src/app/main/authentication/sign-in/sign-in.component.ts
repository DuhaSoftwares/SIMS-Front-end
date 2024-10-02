import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../../internal-components/customizer-settings/customizer-settings.service';
import { BaseComponent } from '../../../internal-components/other-components/base.component';
import { CommonService } from '../../../services/common.service';
import { LogHandlerService } from '../../../services/log-handler.service';
import { LoginViewModel } from '../../../models/view/auth-viewModels/login.viewmodel';
import { AccountService } from '../../../services/account.service';
import { RoleTypeSM } from '../../../models/service-models/app/enums/role-type-s-m.enum';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink,FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.scss'
})
export class SignInComponent extends BaseComponent<LoginViewModel> implements OnInit{


    constructor(commonService:CommonService,exceptionHandler:LogHandlerService,
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private accountService:AccountService,
    ) {
        super(commonService,exceptionHandler);

        this.viewModel= new LoginViewModel();
    }

    ngOnInit(): void {
        this.viewModel.authForm = this.fb.group({
            loginId: ['', [Validators.required,]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            companyCode: ['123',[Validators.required,Validators.minLength(3)]],
            roleType: [RoleTypeSM.CompanyAdmin],
        });
        this.themeService.isToggled$.subscribe(isToggled => {
            this.viewModel.isToggled = isToggled;
        });
    }

rememberMeValue(event: Event) {
  const checkbox = event.target as HTMLInputElement;
  this.viewModel.rememberMe = checkbox.checked; // true if checked, false if unchecked
}
    // Password Hide
    async onSubmit() {
        try {
            if (this.viewModel.authForm.valid) {
                this.viewModel.userLogin=this.viewModel.authForm.value;
            } else {
                this._commonService.showSweetAlertToast({
                    title: 'Error!',
                    text: 'Form is invalid. Please check the fields.',
                    position: "top-end",
                    icon: "error"
                  });
            }
          await this._commonService.presentLoading();
          this.viewModel.rememberMe
          let resp= await this.accountService.generateToken(this.viewModel.userLogin,this.viewModel.rememberMe)
          if (resp.isError) {
            await this._exceptionHandler.logObject(resp);
            this._commonService.showSweetAlertToast({
              title: 'Error!',
              text: resp.errorData.displayMessage,
              position: "top-end",
              icon: "error"
            });
          } else {
            this.router.navigate(['/dashboard']);
          }
        } catch (error) {
          throw error;
        } finally {
          await this._commonService.dismissLoader();
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