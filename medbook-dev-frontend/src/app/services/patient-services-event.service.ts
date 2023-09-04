import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PatientService } from '../models/models.index';

@Injectable({
  providedIn: 'root',
})
export class PatientServicesEventService {
  patientServiceAdded$ = new Subject<PatientService>();
  patientServiceDeleted$ = new Subject<number>();
}
