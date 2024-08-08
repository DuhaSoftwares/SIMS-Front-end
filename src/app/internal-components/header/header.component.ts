import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ToggleService } from '../sidebar/toggle.service';
import { CustomizerSettingsService } from '../customizer-settings/customizer-settings.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, MatMenuModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   // isSidebarToggled
   isSidebarToggled = false;

   // isToggled
   isToggled = false;
 
   constructor(
       private toggleService: ToggleService,
       public themeService: CustomizerSettingsService
   ) {
       this.toggleService.isSidebarToggled$.subscribe(isSidebarToggled => {
           this.isSidebarToggled = isSidebarToggled;
       });
       this.themeService.isToggled$.subscribe(isToggled => {
           this.isToggled = isToggled;
       });
   }
 
   // Burger Menu Toggle
   toggle() {
       this.toggleService.toggle();
   }
 
   // Header Sticky
   isSticky: boolean = false;
   @HostListener('window:scroll', ['$event'])
   checkScroll() {
       const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
       if (scrollPosition >= 50) {
           this.isSticky = true;
       } else {
           this.isSticky = false;
       }
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
 
   // RTL Mode
   toggleRTLEnabledTheme() {
       this.themeService.toggleRTLEnabledTheme();
   }

}
