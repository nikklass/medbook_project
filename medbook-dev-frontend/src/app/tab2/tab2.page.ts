import { Component, ViewChild, AfterViewInit   } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Gender, Patient } from 'src/app/models/models.index';
import {
  GenderService,
  PatientsService,
  ToastService,
} from 'src/app/services/services.index';
import { PatientListComponent } from 'src/app/pages/patient-list/patient-list.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  // new patient
  newPatient: any = {};
  genders: any[] = [];
  showForm: boolean = false;

  patients: Patient[] = [];
  isLoading: boolean = false;

  // search
  searchQuery: string = '';
  searchTerms = new Subject<string>();

  // ViewChild reference to the PatientListComponent
  @ViewChild('patientListComponent') patientListComponent: PatientListComponent;

  constructor(
    private patientsService: PatientsService,
    private gendersService: GenderService,
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
        // pass the search query to fetchPatients
        this.fetchPatients(term);
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // fetch data after the view and child components have been initialized
    this.fetchPatients();
    this.fetchGenders();
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

  async addNewPatient() {
    // check if all required fields are filled
    if (
      !this.newPatient.name ||
      !this.newPatient.date_of_birth ||
      !this.newPatient.gender_id
    ) {
      this.toastService.presentToast(
        'error',
        'Please fill in all required fields'
      );
      return;
    }

    // show loading spinner
    this.isLoading = true;

    // send the new patient data to the backend API
    this.patientsService.addPatient(this.newPatient).subscribe({
      next: (data: any) => {
        console.log('data === ', data);
        // reset the form and hide it
        this.newPatient = {};
        this.showForm = false;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast(
          'error',
          'Error adding patient: ' + error.message
        );
      },
    });
  }

  onCancel() {
    this.showForm = false;
  }

  // handle search input change
  onSearchInputChange() {
    this.patientListComponent.fetchPatients(this.searchQuery);
  }

  onSearchInputClear() {
    this.searchQuery = '';
    this.patientListComponent.fetchPatients(this.searchQuery);
  }

  fetchPatients(searchQuery: string = '') {
    this.patientListComponent.fetchPatients(searchQuery);
  }

  onEditPatient(patient: Patient) {
  }

  onConfirmDelete(patient: Patient) {
  }


}
