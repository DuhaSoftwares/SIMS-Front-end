import { BaseViewModel } from "../internal/base.viewmodel";

export class AppViewModel extends BaseViewModel {
    title = 'Musaib:SIMs';
    routerSubscription: any;
    location: any;
  
    // isSidebarToggled
    isSidebarToggled = false;
  
    // isToggled
    isToggled = false;
}