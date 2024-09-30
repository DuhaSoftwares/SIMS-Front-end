import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleService {
 headerWrapper:string="";
    private sidebarVisibilitySubject = new BehaviorSubject<boolean>(true);
    sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();
    toggleSidebar() {
      this.sidebarVisibilitySubject.next(!this.sidebarVisibilitySubject.value);
    
    }

    wrapElements(){
     this.headerWrapper='headerClose'
        return this.headerWrapper
    }

}