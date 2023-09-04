import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';

import { Patient } from 'src/app/models/models.index';
import {
  PatientsService,
  ToastService,
} from 'src/app/services/services.index';
import { EditPatientModalComponent } from '../edit-patient-modal/edit-patient-modal.component';
import { PatientsEventService } from 'src/app/services/patients-event.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  @Input() patients: Patient[] = [];
  @Input() isLoading: boolean = false;

  @Output() editPatientEvent = new EventEmitter<Patient>();
  @Output() confirmDeleteEvent = new EventEmitter<Patient>();

  constructor(
    private patientsService: PatientsService,
    private alertController: AlertController,
    private toastService: ToastService,
    private modalController: ModalController,
    private patientsEventService: PatientsEventService
  ) {}
  ngOnInit(): void {
    // subscribe to patientAdded$ event
    this.patientsEventService.patientAdded$.subscribe((addedPatient) => {
      // add new itemat the beginning
      this.patients.unshift(addedPatient);
    });

    // subscribe to the patientDeleted$ event to update the patient list
    this.patientsEventService.patientDeleted$.subscribe((deletedPatientId) => {
      // remove the patient from patient list
      this.patients = this.patients.filter(
        (patient) => patient.id !== deletedPatientId
      );
    });
  }

  fetchPatients(searchQuery: string = '') {
    this.isLoading = true;

    this.patientsService.getPatients(searchQuery).subscribe({
      next: (data: Patient[]) => {
        this.isLoading = false;
        this.patients = data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast('error', error.message);
      },
    });
  }

  async editPatient(patient: Patient) {
    const modal = await this.modalController.create({
      component: EditPatientModalComponent,
      componentProps: { patient },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.updated) {
        console.log('Modal closed with data:', result.data);
        // refresh data after update
        this.fetchPatients();
      }
    });

    await modal.present();
  }

  async confirmDelete(patient: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${patient.name}?`,
      cssClass: 'alert-header',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isLoading = false;
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.isLoading = true;
            this.patientsService.deletePatient(patient.id).subscribe({
              next: (data: any) => {
                this.isLoading = false;
              },
              error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.toastService.presentToast('error', error.message);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.patientsEventService.patientAdded$.unsubscribe();
    this.patientsEventService.patientDeleted$.unsubscribe();
  }
}
