import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [RouterLink,  ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {


}