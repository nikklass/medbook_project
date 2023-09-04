import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CustomDatePipe } from 'src/app/pipes/custom-date.pipe';
import { SharedLoadingSpinnerComponent } from 'src/app/shared/shared-loading-spinner/shared-loading-spinner.component';
import { PatientListComponent } from 'src/app/pages/patient-list/patient-list.component';
import { ServiceListComponent } from 'src/app/pages/service-list/service-list.component';
import { PatientServiceListComponent } from 'src/app/pages/patient-service-list/patient-service-list.component';

@NgModule({
  declarations: [
    PatientListComponent,
    ServiceListComponent,
    PatientServiceListComponent,
    SharedLoadingSpinnerComponent,
    CustomDatePipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PatientListComponent, ServiceListComponent, PatientServiceListComponent],
})
export class PagesModule { }
