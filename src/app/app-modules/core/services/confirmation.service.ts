/* 
* AMRIT – Accessible Medical Records via Integrated Technology 
* Integrated EHR (Electronic Health Records) Solution 
*
* Copyright (C) "Piramal Swasthya Management and Research Institute" 
*
* This file is part of AMRIT.
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see https://www.gnu.org/licenses/.
*/


import { Observable } from 'rxjs/Rx';
import { CommonDialogComponent } from '../components/common-dialog/common-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class ConfirmationService {

    constructor(private dialog: MdDialog, @Inject(DOCUMENT) doc: any) {
    }

    public confirm(title: string, message: string, btnOkText: string = 'OK', btnCancelText: string = 'Cancel'): Observable<boolean> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = new MdDialogConfig();
        dialogRef = this.dialog.open(CommonDialogComponent, {
            width: '420px',
            disableClose: false
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        dialogRef.componentInstance.confirmAlert = true;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.comments = null;

        return dialogRef.afterClosed();
    }

    public alert(message: string, status: string = 'info', btnOkText: string = 'OK'): void {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px',
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.status = status.toLowerCase();
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = true;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.comments = null;

    }


    public alertError(message: string, status: string = 'info', btnOkText: string = 'OK'): Observable<any>  {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px',
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.status = status.toLowerCase();
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.comments = null;
        dialogRef.componentInstance.alertError = true;
      
        return dialogRef.afterClosed();
    }


    public remarks(message: string, titleAlign: string = 'center', messageAlign: string = 'center', btnOkText: string = 'Submit', btnCancelText:string = "Cancel"): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px',
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = true;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.comments = null;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }

    public editRemarks(message: string, comments: string, titleAlign: string = 'center', messageAlign: string = 'center', btnOkText: string = 'Submit', btnCancelText:string = "Cancel"): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        dialogRef = this.dialog.open(CommonDialogComponent, { width: '60%' });
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = true;
        dialogRef.componentInstance.comments = comments;
        dialogRef.componentInstance.btnCancelText = btnCancelText;

        return dialogRef.afterClosed();
    }

    public notify(message: string, mandatories, titleAlign: string = 'center', messageAlign: string = 'center', btnOkText: string = 'OK'): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px'
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.notify = true;
        dialogRef.componentInstance.mandatories = mandatories;
        return dialogRef.afterClosed();
    }

    public choice(message: string, values, titleAlign: string = 'center', messageAlign: string = 'center', btnOkText: string = 'Confirm', btnCancelText: string = 'Cancel'): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px',
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.notify = false;
        dialogRef.componentInstance.choice = true;
        dialogRef.componentInstance.values = values;
        return dialogRef.afterClosed();
    }

    public startTimer(title: string, message: string, timer: number, btnOkText: string = 'Continue', btnCancelText: string = 'Cancel'): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = new MdDialogConfig();
        dialogRef = this.dialog.open(CommonDialogComponent, {
            width: '420px',
            disableClose: true,
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.sessionTimeout = true;
        dialogRef.componentInstance.updateTimer(timer);
        dialogRef.componentInstance.comments = null;

        return dialogRef.afterClosed();
    }

     public choiceSelect(message: string, values, titleAlign: string = 'center', messageAlign: string = 'center', btnOkText: string = 'Proceed', btnCancelText: string = 'Cancel'): Observable<any> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = {
            width: '420px',
        }
        dialogRef = this.dialog.open(CommonDialogComponent, config);
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.notify = false;
        dialogRef.componentInstance.choice = false;
        dialogRef.componentInstance.choiceSelect = true;
        dialogRef.componentInstance.values = values;
        return dialogRef.afterClosed();
    }
    public confirmCalibration(title: string, message: string, btnOkText: string = 'Yes', btnCancelText: string = 'No'): Observable<boolean> {
        let dialogRef: MdDialogRef<CommonDialogComponent>;
        const config = new MdDialogConfig();
        dialogRef = this.dialog.open(CommonDialogComponent, {
            width: '420px',
            disableClose: false
        });
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.btnOkText = btnOkText;
        dialogRef.componentInstance.btnCancelText = btnCancelText;
        dialogRef.componentInstance.confirmAlert = false;
        dialogRef.componentInstance.confirmcalibration = true;
        dialogRef.componentInstance.alert = false;
        dialogRef.componentInstance.remarks = false;
        dialogRef.componentInstance.editRemarks = false;
        dialogRef.componentInstance.comments = null;


        return dialogRef.afterClosed();
    }

}
