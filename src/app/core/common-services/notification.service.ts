import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private translateService: TranslateService) {


    }
    error(error: string) {
        if (error) {
            document.getElementById('errorMsg')!.innerHTML = this.translateService.instant(error);
            if (document.getElementsByClassName('error_toaster').length > 0) {
                document.getElementsByClassName('error_toaster')[0].setAttribute('class', 'error_toaster_show');
                setTimeout(() => {
                    document.getElementById('errorMsg')!.innerHTML = '';
                    if (document.getElementsByClassName('error_toaster_show').length > 0)
                        document.getElementsByClassName('error_toaster_show')[0].setAttribute('class', 'error_toaster');
                }, 5000);
            }
        } else {
            document.getElementById('errorMsg')!.innerHTML = '';
            if (document.getElementsByClassName('error_toaster_show').length > 0)
                document.getElementsByClassName('error_toaster_show')[0].setAttribute('class', 'error_toaster');
        }
    }

    success(message: string) {
        if (message) {
            document.getElementById('successMsg')!.innerHTML = this.translateService.instant(message);
            if (document.getElementsByClassName('success_toaster').length > 0) {
                document.getElementsByClassName('success_toaster')[0].setAttribute('class', 'success_toaster_show');
                setTimeout(() => {
                    document.getElementById('successMsg')!.innerHTML = '';
                    if (document.getElementsByClassName('success_toaster_show').length > 0)
                        document.getElementsByClassName('success_toaster_show')[0].setAttribute('class', 'success_toaster');
                }, 5000);
            }
        } else {
            document.getElementById('successMsg')!.innerHTML = '';
            if (document.getElementsByClassName('success_toaster_show').length > 0)
                document.getElementsByClassName('success_toaster_show')[0].setAttribute('class', 'success_toaster');
        }
    }
    warning(message: string) {
        if (message) {
            document.getElementById('warningMsg')!.innerHTML = this.translateService.instant(message);
            if (document.getElementsByClassName('warning_toaster').length > 0) {
                document.getElementsByClassName('warning_toaster')[0].setAttribute('class', 'warning_toaster_show');
                setTimeout(() => {
                    document.getElementById('warningMsg')!.innerHTML = '';
                    if (document.getElementsByClassName('warning_toaster_show').length > 0)
                        document.getElementsByClassName('warning_toaster_show')[0].setAttribute('class', 'warning_toaster');
                }, 5000);
            }
        } else {
            document.getElementById('warningMsg')!.innerHTML = '';
            if (document.getElementsByClassName('warning_toaster_show').length > 0)
                document.getElementsByClassName('warning_toaster_show')[0].setAttribute('class', 'warning_toaster');
        }
    }
}