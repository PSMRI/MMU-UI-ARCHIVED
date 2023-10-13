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


import { Component, OnInit, Input, OnChanges, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { SetLanguageComponent } from 'app/app-modules/core/components/set-language.component';
import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';

import { BeneficiaryDetailsService } from '../../../../core/services/beneficiary-details.service';

import { CancerUtils } from '../../../shared/utility'

@Component({
  selector: 'doctor-signs-and-symptoms',
  templateUrl: './signs-and-symptoms.component.html',
  styleUrls: ['./signs-and-symptoms.component.css']
})
export class SignsAndSymptomsComponent implements OnInit,DoCheck {

  @Input('signsForm')
  signsForm: FormGroup;

  female18 = false;
  female30 = false;
  female = false;
  languageComponent: SetLanguageComponent;

  currentLanguageSet: any;

  constructor(
    private fb: FormBuilder,
    private httpServiceService: HttpServiceService,
    private beneficiaryDetailsService: BeneficiaryDetailsService) { }
  // ngDoCheck(): void {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit() {
    this.getBeneficiaryDetails();
    this.fetchLanguageResponse();
  }

  ngOnDestroy() {
    if (this.beneficiaryDetailsSubs)
      this.beneficiaryDetailsSubs.unsubscribe();
  }

  beneficiaryDetailsSubs: any;
  getBeneficiaryDetails() {
    this.beneficiaryDetailsSubs = this.beneficiaryDetailsService.beneficiaryDetails$
      .subscribe(beneficiaryDetails => {
        if ((beneficiaryDetails && beneficiaryDetails.genderName && (beneficiaryDetails.genderName.toLocaleLowerCase() == 'female' || beneficiaryDetails.genderName.toLocaleLowerCase() == 'transgender')))
          this.female = true;
        else
          this.female = false;

        if (beneficiaryDetails && beneficiaryDetails.genderName && beneficiaryDetails.genderName.toLocaleLowerCase() == 'female' && beneficiaryDetails.ageVal >= 18)
          this.female18 = true;
        else
          this.female18 = false;

        if (beneficiaryDetails && beneficiaryDetails.genderName && beneficiaryDetails.genderName.toLocaleLowerCase() == 'female' && beneficiaryDetails.ageVal >= 30)
          this.female30 = true;
        else
          this.female30 = false;
      })
  }

  checkLymph(lymphNode_Enlarged) {
    if (lymphNode_Enlarged == false) {
      this.signsForm.patchValue({ lymphNodes: new CancerUtils(this.fb).lymphNodesArray.map(item => (item)) })
    }
  }

  get observation() {
    return this.signsForm.get('observation');
  }

  get lymphNode_Enlarged() {
    return this.signsForm.controls['lymphNode_Enlarged'].value;
  }

  get lymphNodes() {
    return this.signsForm.controls['lymphNodes'].value;
  }


  //BU40088124 12/10/2021 Integrating Multilingual Functionality --Start--
  ngDoCheck(){
    this.fetchLanguageResponse();
  }

  fetchLanguageResponse() {
    this.languageComponent = new SetLanguageComponent(this.httpServiceService);
    this.languageComponent.setLanguage();
    this.currentLanguageSet = this.languageComponent.currentLanguageObject; 
  }
  //--End--
}
