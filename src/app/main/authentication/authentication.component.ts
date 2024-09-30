import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [RouterLink, RouterOutlet],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
    constructor(private commonService:CommonService){
        this.commonService.layoutVM.showCustomSettings=false;
        this.commonService.layoutVM.showSideAndTopNav=false;
    }
}