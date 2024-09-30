import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseComponent } from './internal-components/other-components/base.component';
import { AppViewModel } from './models/view/app.viewmodel';
import { CommonService } from './services/common.service';
import { LogHandlerService } from './services/log-handler.service';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './internal-components/sidebar/sidebar.component';
import { HeaderComponent } from './internal-components/header/header.component';
import { FooterComponent } from './internal-components/footer/footer.component';
import { CustomizerSettingsComponent } from './internal-components/customizer-settings/customizer-settings.component';
import { ToggleService } from './internal-components/sidebar/toggle.service';
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, RouterLink, CustomizerSettingsComponent,SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent<AppViewModel> implements OnInit, AfterViewInit {
 
  constructor(
    commonService: CommonService,
    exceptionhandler: LogHandlerService,
    public router: Router,
    private toggleService: ToggleService,
  ) {
    super(commonService, exceptionhandler);
    this.viewModel= new AppViewModel()
  }
  isSidebarVisible = true;
  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}