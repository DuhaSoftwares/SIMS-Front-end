import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToggleService } from './toggle.service';
import { SharedModule } from '../../shared/shared.module';
import { BaseComponent } from '../other-components/base.component';
import { SideNavViewModel } from '../../models/view/end-user/sideNav.viewmodel';
import { CommonService } from '../../services/common.service';
import { LogHandlerService } from '../../services/log-handler.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone:true,
  imports:[SharedModule],
  styleUrls: ['./sidebar.component.scss']

})
export class SidebarComponent extends BaseComponent<SideNavViewModel> implements OnInit {


  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
   headerwrapper:string=''

  constructor(commonService:CommonService,exceptionHandler:LogHandlerService,private sidebarService: ToggleService) {
    super(commonService,exceptionHandler)
  }

  ngOnInit() {
  }
  isSidebarCollapsed = false;
  isSidebarExpanded = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  expandSidebar() {
    this.isSidebarExpanded = true;
  }

  collapseSidebar() {
    this.isSidebarExpanded = false;
  }
}
