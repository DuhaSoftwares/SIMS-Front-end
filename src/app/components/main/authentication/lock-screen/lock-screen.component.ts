import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-lock-screen',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule, NgIf],
    templateUrl: './lock-screen.component.html',
    styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent {


}