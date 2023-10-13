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


import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BeneficiaryDetailsService } from '../../services/beneficiary-details.service';
import 'rxjs/Rx';
import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';

@Component({
  selector: 'app-beneficiary-details',
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.css']
})
export class BeneficiaryDetailsComponent implements OnInit, DoCheck {

  beneficiary: any;
  today: any;
  beneficiaryDetailsSubscription: any;
  current_language_set: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public httpServiceService: HttpServiceService,
    private beneficiaryDetailsService: BeneficiaryDetailsService
  ) { }

  ngOnInit() {
    this.assignSelectedLanguage();
    this.today = new Date();
    this.route.params.subscribe(param => {
      this.beneficiaryDetailsService.getBeneficiaryDetails(param['beneficiaryRegID'], localStorage.getItem('benFlowID'));
      this.beneficiaryDetailsSubscription = this.beneficiaryDetailsService.beneficiaryDetails$
        .subscribe(res => {
          if (res != null) {
            this.beneficiary = res;
           if (res.serviceDate) {
             this.today = res.serviceDate;
           }
          }
        });

      this.beneficiaryDetailsService.getBeneficiaryImage(param['beneficiaryRegID'])
        .subscribe(data => {
          if (data && data.benImage) {
            this.beneficiary.benImage = data.benImage;
          }
        });
    });
  }

  ngDoCheck() {
    this.assignSelectedLanguage();
  }
  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.current_language_set = getLanguageJson.currentLanguageObject;
    }
    
  ngOnDestroy() {
    if (this.beneficiaryDetailsSubscription)
      this.beneficiaryDetailsSubscription.unsubscribe();
  }

}
