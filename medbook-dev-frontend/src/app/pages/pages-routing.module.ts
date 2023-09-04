import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { PatientServiceListComponent } from './patient-service-list/patient-service-list.component';

const routes: Routes = [
  {
    path: '',
    component: PatientServiceListComponent,
  },
  {
    path: 'services',
    component: ServiceListComponent,
  }.
  {
    path: 'patients',
    component: PatientListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
