import { Component } from '@angular/core';
import { CustomizerSettingsService } from '../../internal-components/customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent {
  constructor(
    public themeService: CustomizerSettingsService
) {
    this.themeService.isToggled$.subscribe(isToggled => {
        this.isToggled = isToggled;
    });
}

// isToggled
isToggled = false;

// Dark Mode
toggleTheme() {
    this.themeService.toggleTheme();
}

// RTL Mode
toggleRTLEnabledTheme() {
    this.themeService.toggleRTLEnabledTheme();
}
}
