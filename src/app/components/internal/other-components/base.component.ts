import { NgForm, NgModel } from "@angular/forms";
import { InputControlInformation } from "src/app/models/internal/common-models";
import { PaginationViewModel } from "src/app/models/internal/pagination.viewmodel";
import { CommonService } from "src/app/services/common.service";
import { LogHandlerService } from "src/app/services/log-handler.service";

import * as XLSX from 'xlsx';





export class BaseComponent<T>   {
    protected _commonService: CommonService;
    protected _exceptionHandler: LogHandlerService;
    viewModel!: T;
    constructor(commonService: CommonService, exceptionHandler: LogHandlerService) {
        this._commonService = commonService;
        this._exceptionHandler = exceptionHandler;
    }

    async loadPageData() {
    }

    getValidationClass(model: NgModel, control: InputControlInformation): string {
        let inputClass = ''
        control.hasError = false;
        if (control && control.validations) {
            control.validations.forEach((validation: any) => {
                if (model.touched) {
                    if (!model.errors)
                        inputClass = 'valid-input';
                    if (model.hasError(validation.type)) {
                        inputClass = 'invalid-input';
                        control.errorMessage = validation.message;
                        control.hasError = true;
                        return;
                    }
                }
            });
        }
        return inputClass;
    }

    markAllControlsAsTouched(form: NgForm) {
        let focusDone = false;
        Object.keys(form.controls).forEach((controlName) => {
            let control = form.form.get(controlName);
            control?.markAsTouched();
            if (control?.errors && !focusDone) {
                let controlElementbyName = document.querySelector(`[name="${controlName}"]`) as HTMLInputElement;
                let controlElementById = document.querySelector(`[id="${controlName}"]`) as HTMLInputElement;
                if (controlElementbyName) {
                    controlElementbyName.focus();
                    focusDone = true;
                }
                else if (controlElementById) {
                    controlElementById.focus();
                    focusDone = true;
                }
            }
        });
    }
    generateExcel(tableId:string) {
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(document.getElementById(tableId));
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb,`${tableId}.xlsx`);
    }
    // async show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    //     this.toasts.push({ textOrTpl, ...options });
    // }

    // async presentToast(message: string) {
    //     this.showToast = true;
    //     this.toasts.push({ message });
    // }

    // async remove(toast: any) {
    //     this.toasts = this.toasts.filter((t) => t !== toast);
    // }

    getPagesCountArray(paginationModel: PaginationViewModel): number[] {
        let totalPages = Math.ceil(paginationModel.totalCount / paginationModel.PageSize);
        return Array.from(new Array(totalPages), (x, i) => i + 1);

    }
    isValidDate(date: any): boolean {
        let x = date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
        if (x)
            x = new Date(date).getFullYear() > 1900;
        return x;
    }

    async getFormattedDate(date: any, convertTime: boolean): Promise<any> {
        if (!this.isValidDate(new Date(date)))
            return '';
        let dateString = date.toString();
        if (!convertTime) {
            dateString = dateString.split('T')[0];
            return dateString;
        }
        else {
            let apiUTCTime = new Date(dateString);
            let utcDate = Date.UTC(apiUTCTime.getFullYear(), apiUTCTime.getMonth(), apiUTCTime.getDate(), apiUTCTime.getHours(), apiUTCTime.getMinutes(), apiUTCTime.getSeconds(), apiUTCTime.getMilliseconds());
            let localDateTime = new Date(utcDate);
            let months = localDateTime.getMonth() < 9 ? `0${localDateTime.getMonth() + 1}` : localDateTime.getMonth() + 1;
            let fullDate = localDateTime.getDate() <= 9 ? `0${localDateTime.getDate()}` : localDateTime.getDate();
            let hours = localDateTime.getHours() <= 9 ? `0${localDateTime.getHours()}` : localDateTime.getHours();
            let minutes = localDateTime.getMinutes() <= 9 ? `0${localDateTime.getMinutes()}` : localDateTime.getMinutes();
            let seconds = localDateTime.getSeconds() <= 9 ? `0${localDateTime.getSeconds()}` : localDateTime.getSeconds();
            dateString = `${localDateTime.getFullYear()}-${months}-${fullDate}T${hours}:${minutes}:${seconds}`
            return dateString;
        }
    }
}