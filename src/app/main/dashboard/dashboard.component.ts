import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../internal-components/other-components/base.component';
import { DashboardViewModel } from '../../models/view/end-user/dashboard.viewmodel';
import { CommonService } from '../../services/common.service';
import { LogHandlerService } from '../../services/log-handler.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent<DashboardViewModel> implements OnInit{
constructor(commonService:CommonService,exceptionHandler:LogHandlerService){
  super(commonService,exceptionHandler)
  this._commonService.layoutVM.showSideAndTopNav=true;
  this.viewModel=new DashboardViewModel()
}
  ngOnInit(){
  }
}
