import { Component, ViewChild, AfterViewInit   } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Gender, PatientService, Service } from 'src/app/models/models.index';
import {
  GenderService,
  PatientServicesService,
  ServicesService,
  ToastService,
} from 'src/app/services/services.index';
import { PatientServiceListComponent } from 'src/app/pages/patient-service-list/patient-service-list.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  // new patientService
  newPatientService: any = {};
  genders: any[] = [];
  services: any[] = [];
  showForm: boolean = false;

  patientServices: PatientService[] = [];
  isLoading: boolean = false;

  // search
  searchQuery: string = '';
  searchTerms = new Subject<string>();

  // ViewChild reference to the PatientServiceListComponent
  @ViewChild('patientServiceListComponent') patientServiceListComponent: PatientServiceListComponent;

  constructor(
    private patientsService: PatientServicesService,
    private gendersService: GenderService,
    private servicesService: ServicesService,
    private toastService: ToastService,
  ) {
    this.searchTerms
      .pipe(
        // 1000ms debounce time
        debounceTime(1000),
        // ignore if the search query hasn't changed
        distinctUntilChanged()
      )
      .subscribe((term: string | undefined) => {
        // pass the search query to fetchPatientServices
        this.fetchPatientServices(term);
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // fetch data after the view and child components have been initialized
    this.fetchPatientServices();
    this.fetchGenders();
    this.fetchServices();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async fetchGenders() {
    this.gendersService.getGenders().subscribe({
      next: (data: Gender[]) => {
        this.genders = data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.presentToast('error', error.message);
      },
    });
  }

  async fetchServices() {
    this.servicesService.getServices().subscribe({
      next: (data: Service[]) => {
        this.services = data;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.presentToast('error', error.message);
      },
    });
  }

  async addNewPatientService() {
    // check if all required fields are filled
    if (
      !this.newPatientService.name ||
      !this.newPatientService.date_of_birth ||
      !this.newPatientService.gender_id ||
      !this.newPatientService.service_id
    ) {
      this.toastService.presentToast(
        'error',
        'Please fill in all required fields'
      );
      return;
    }

    // show loading spinner
    this.isLoading = true;

    // send the new patientService data to the backend API
    this.patientsService.addPatientService(this.newPatientService).subscribe({
      next: (data: any) => {
        this.fetchPatientServices();
        // reset the form and hide it
        this.newPatientService = {};
        this.showForm = false;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast(
          'error',
          'Error adding patient service: ' + error.message
        );
      },
    });
  }

  onCancel() {
    this.showForm = false;
  }

  // handle search input change
  onSearchInputChange() {
    this.patientServiceListComponent.fetchPatientServices(this.searchQuery);
  }

  onSearchInputClear() {
    this.searchQuery = '';
    this.patientServiceListComponent.fetchPatientServices(this.searchQuery);
  }

  fetchPatientServices(searchQuery: string = '') {
    this.patientServiceListComponent.fetchPatientServices(searchQuery);
  }

  onEditPatientService(patientService: PatientService) {
  }

  onConfirmDelete(patientService: PatientService) {
  }


}
