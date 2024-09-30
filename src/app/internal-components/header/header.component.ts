import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from '../sidebar/toggle.service';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { NgClass } from '@angular/common';
import { BaseComponent } from '../other-components/base.component';
import { SideNavViewModel } from '../../models/view/end-user/sideNav.viewmodel';
import { CommonService } from '../../services/common.service';
import { LogHandlerService } from '../../services/log-handler.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent extends BaseComponent<SideNavViewModel> implements OnInit {
    constructor( commonService:CommonService,exceptionHandler:LogHandlerService,private sidebarService: ToggleService) {
      super(commonService,exceptionHandler)
    }
  ngOnInit(): void {
    
  }
    toggleSidebar() {
      this._commonService.layoutVM.sideNavExpand = !this._commonService.layoutVM.sideNavExpand;
    }
}
