import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/internal/other-components/base.component';
import { LoginViewModel } from 'src/app/models/view/auth-viewModels/login.viewmodel';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { AccountService } from 'src/app/services/account.service';
import { RoleTypeSM } from 'src/app/models/service-models/app/enums/role-type-s-m.enum';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [RouterLink,FormsModule, ReactiveFormsModule, NgIf],
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent<LoginViewModel> implements OnInit{


    constructor(commonService:CommonService,exceptionHandler:LogHandlerService,
        private fb: FormBuilder,
        private router: Router,
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

}