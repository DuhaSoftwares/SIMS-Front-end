import { Component, OnInit } from '@angular/core';
import { CustomizerSettingsService } from '../../internal-components/customizer-settings/customizer-settings.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WarehouseService } from '../../services/warehouse.service';
import { CommonService } from '../../services/common.service';
import { BaseComponent } from '../../internal-components/other-components/base.component';
import { LogHandlerService } from '../../services/log-handler.service';
import { WarehouseViewModel } from '../../models/view/end-user/warehouse.viewmodel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent
  extends BaseComponent<WarehouseViewModel>
  implements OnInit
{
  constructor(
    public themeService: CustomizerSettingsService,
    private warehouseService: WarehouseService,
    private commonService: CommonService,
    private logHandlerService: LogHandlerService
  ) {
    super(commonService, logHandlerService);

    this.themeService.isToggled$.subscribe((isToggled) => {
      this.isToggled = isToggled;
    });
    this.viewModel = new WarehouseViewModel();
  }

  ngOnInit(): void {
    this.getWareHouses();
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

  async getWareHouses() {
    /**
     * Retrieves all warehouses from the server and updates the component's view model.
     */
    try {
      let resp = await this.warehouseService.getAllWarehouses();
      if (resp.isError) {
        this.commonService.showSweetAlertConfirmation({
          text: 'Sorry we Ran into an error!',
          icon: 'error',
        });
      } else {
        this.viewModel.warehouses = resp.successData;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteWareHouseById(id: number) {
    try {
      const result = await this.commonService.showSweetAlertConfirmation({
        text: 'Are you sure you want to delete this warehouse?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      });

      if (result.isConfirmed) {
        const resp = await this.warehouseService.deleteWarehouse(id);

        if (resp.isError) {
          await this.commonService.showSweetAlertConfirmation({
            text: 'Sorry, we ran into an error!',
            icon: 'error',
          });
        } else {
          await this.getWareHouses();
          await this.commonService.showSweetAlertConfirmation({
            text: 'Deleted successfully!',
            icon: 'success',
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
