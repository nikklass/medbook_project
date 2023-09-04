import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Patient } from 'src/app/models/models.index';

@Component({
  selector: 'app-edit-patient-modal',
  templateUrl: './edit-patient-modal.component.html',
  styleUrls: ['./edit-patient-modal.component.scss'],
})
export class EditPatientModalComponent implements OnInit {
  @Input() patient: Patient | undefined;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  closeModal() {
    // Dismiss the modal without any data
    this.modalController.dismiss();
  }

  saveChanges() {
    // Implement logic to update patient information here
    // You can use a service to make the API call to update the patient
    // After updating, close the modal with a data object indicating changes
    const updatedData = {}; // Replace with your updated data
    this.modalController.dismiss({ updated: true, data: updatedData });
  }
}
