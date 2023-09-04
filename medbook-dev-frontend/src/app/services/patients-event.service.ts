import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Patient } from '../models/models.index';

@Injectable({
  providedIn: 'root',
})
export class PatientsEventService {
  patientAdded$ = new Subject<Patient>();
  patientDeleted$ = new Subject<number>();
}
