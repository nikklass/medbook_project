import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Patient } from '../models/models.index';
import { ConfigService } from './../config.service';
import { PatientsEventService } from './patients-event.service';

@Injectable({ providedIn: 'root' })
export class PatientsService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private patientsEventService: PatientsEventService
  ) {}

  getPatients(searchTerms?: string): Observable<Patient[]> {
    const endpoint = `${this.configService.apiEndpoint}/patients`;

    let params = new HttpParams();

    // if searchTerms are provided, add them as a query parameter
    if (searchTerms) {
      params = params.append('searchTerms', searchTerms);
    }

    // pass the params object in the request
    return this.httpClient.get<Patient[]>(endpoint, { params }).pipe(
      map((response: any) => response.data),
      catchError((error) => {
        console.error('Error fetching patients:', error);
        return throwError(error);
      })
    );
  }

  showPatient(id: number) {
    const endpoint = `${this.configService.apiEndpoint}/patients/${id}`;

    return this.httpClient.get<Patient>(endpoint).pipe(
      catchError((error) => {
        console.error('Error fetching patient:', error);
        return throwError(error);
      })
    );
  }

  addPatient(patient: Patient) {
    const endpoint = `${this.configService.apiEndpoint}/patients`;

    return this.httpClient.post<Patient>(endpoint, patient).pipe(
      catchError((error) => {
        console.error('Error adding patient:', error);
        return throwError(error);
      }),
      tap((addedPatient) => {
        // emit patientAdded event
        this.patientsEventService.patientAdded$.next(addedPatient);
      })
    );
  }

  updatePatient(patient: Patient, id: number) {
    const endpoint = `${this.configService.apiEndpoint}/patients/${id}`;

    return this.httpClient.put<Patient>(endpoint, patient).pipe(
      catchError((error) => {
        console.error('Error updating patient:', error);
        return throwError(error);
      })
    );
  }

  deletePatient(id: number) {
    const endpoint = `${this.configService.apiEndpoint}/patients/${id}`;

    return this.httpClient.delete(endpoint).pipe(
      catchError((error) => {
        console.error('Error deleting patient:', error);
        return throwError(error);
      }),
      tap(() => {
        // emit patientDeleted event
        this.patientsEventService.patientDeleted$.next(id);
      })
    );
  }
}
