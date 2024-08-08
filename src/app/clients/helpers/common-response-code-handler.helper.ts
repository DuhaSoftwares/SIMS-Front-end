import { AxiosResponse } from 'axios';
import { Injectable } from '@angular/core';
import { AppConstants } from '../../app-constants';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { IDictionaryCollection } from '../../models/internal/Idictionary-collection';
import { DictionaryCollection } from '../../models/internal/dictionary-collection';


@Injectable({
    providedIn: 'root'
})
export class CommonResponseCodeHandler {//dont extend from base

    public handlerDict: IDictionaryCollection<string, (resp: AxiosResponse) => string>;

    constructor( private router: Router,
        private storageService: StorageService) {
        // add common functions here
        this.handlerDict = new DictionaryCollection<string, (resp: AxiosResponse) => string>();
        this.AddCommonHandlers();
    }

    async AddCommonHandlers() {
        this.handlerDict.Add('401', (resp) => {
            // this.commonService.presentToast(AppConstants.ErrorPrompts.Unauthorized_User);
            this.router.navigate(['home-page']);
            this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN);
            return AppConstants.ERROR_PROMPTS.Unauthorized_User;
        });
    }

}
