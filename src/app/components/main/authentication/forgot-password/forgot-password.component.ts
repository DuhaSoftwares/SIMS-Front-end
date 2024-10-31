import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {


}