import { Component, OnInit } from '@angular/core';
import { BaseComponent } from './internal-components/other-components/base.component';
import { AppViewModel } from './models/view/app.viewmodel';
import { CommonService } from './services/common.service';
import { LogHandlerService } from './services/log-handler.service';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NavigationCancel, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './internal-components/sidebar/sidebar.component';
import { HeaderComponent } from './internal-components/header/header.component';
import { FooterComponent } from './internal-components/footer/footer.component';
import { CustomizerSettingsComponent } from './internal-components/customizer-settings/customizer-settings.component';
import { ToggleService } from './internal-components/sidebar/toggle.service';
import { CustomizerSettingsService } from './internal-components/customizer-settings/customizer-settings.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent, RouterLink, CustomizerSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
      Location, {
          provide: LocationStrategy,
          useClass: PathLocationStrategy
      }
  ]
})
export class AppComponent extends BaseComponent<AppViewModel> implements OnInit {
  title = 'Musaib:SIMs';
  routerSubscription: any;
  location: any;

  // isSidebarToggled
  isSidebarToggled = false;

  // isToggled
  isToggled = false;
  constructor(
    commonService: CommonService,
    exceptionhandler: LogHandlerService,
    public router: Router,
    private toggleService: ToggleService,
    public themeService: CustomizerSettingsService
  ) {
    super(commonService, exceptionhandler);
    this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
      this.isSidebarToggled = isSidebarToggled;
  });
  this.themeService.isToggled$.subscribe(isToggled => {
      this.isToggled = isToggled;
  });
  }

  ngOnInit(){
    this.recallJsFuntions();
}

// recallJsFuntions
recallJsFuntions() {
    this.routerSubscription = this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd || event instanceof NavigationCancel))
    .subscribe(event => {
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });
}

// Dark Mode
toggleTheme() {
    this.themeService.toggleTheme();
}

// Sidebar Dark
toggleSidebarTheme() {
    this.themeService.toggleSidebarTheme();
}

// Right Sidebar
toggleRightSidebarTheme() {
    this.themeService.toggleRightSidebarTheme();
}

// Hide Sidebar
toggleHideSidebarTheme() {
    this.themeService.toggleHideSidebarTheme();
}

// Header Dark Mode
toggleHeaderTheme() {
    this.themeService.toggleHeaderTheme();
}

// Card Border
toggleCardBorderTheme() {
    this.themeService.toggleCardBorderTheme();
}

// Card Border Radius
toggleCardBorderRadiusTheme() {
    this.themeService.toggleCardBorderRadiusTheme();
}

// RTL Mode
toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
}

}