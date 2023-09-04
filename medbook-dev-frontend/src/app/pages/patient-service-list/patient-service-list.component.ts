import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';

import { PatientService } from 'src/app/models/models.index';
import {
  PatientServicesService,
  ToastService,
} from 'src/app/services/services.index';
import { EditPatientModalComponent } from '../edit-patient-modal/edit-patient-modal.component';
import { PatientServicesEventService } from 'src/app/services/patient-services-event.service';

@Component({
  selector: 'app-patient-service-list',
  templateUrl: './patient-service-list.component.html',
  styleUrls: ['./patient-service-list.component.scss'],
})
export class PatientServiceListComponent implements OnInit {
  @Input() patientServices: PatientService[] = [];
  @Input() isLoading: boolean = false;

  @Output() editPatientServiceEvent = new EventEmitter<PatientService>();
  @Output() confirmDeleteEvent = new EventEmitter<PatientService>();

  constructor(
    private patientServicesService: PatientServicesService,
    private alertController: AlertController,
    private toastService: ToastService,
    private modalController: ModalController,
    private patientsEventService: PatientServicesEventService
  ) {}
  ngOnInit(): void {
    // subscribe to patientAdded$ event
    this.patientsEventService.patientServiceAdded$.subscribe((addedPatientService) => {
      // add new itemat the beginning
      this.patientServices.unshift(addedPatientService);
    });

    // subscribe to the patientDeleted$ event to update the patient list
    this.patientsEventService.patientServiceDeleted$.subscribe((deletedPatientServiceId) => {
      // remove the patient from patient list
      this.patientServices = this.patientServices.filter(
        (patient) => patient.id !== deletedPatientServiceId
      );
    });
  }

  fetchPatientServices(searchQuery: string = '') {
    this.isLoading = true;

    this.patientServicesService.getPatientServices(searchQuery).subscribe({
      next: (data: PatientService[]) => {
        this.isLoading = false;
        this.patientServices = data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast('error', error.message);
      },
    });
  }

  async confirmDelete(patientService: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${patientService.name}?`,
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
            this.patientServicesService.deletePatientService(patientService.id).subscribe({
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
    this.patientsEventService.patientServiceAdded$.unsubscribe();
    this.patientsEventService.patientServiceDeleted$.unsubscribe();
  }
}
