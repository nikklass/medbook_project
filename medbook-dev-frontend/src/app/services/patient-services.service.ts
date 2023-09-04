import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { PatientService } from '../models/models.index';
import { ConfigService } from './../config.service';
import { PatientServicesEventService } from './patient-services-event.service';

@Injectable({ providedIn: 'root' })
export class PatientServicesService {
  constructor(private httpClient: HttpClient,
    private configService: ConfigService,
    private patientServicesEventService: PatientServicesEventService
    ) {}

  getPatientServices(searchTerms?: string): Observable<PatientService[]> {
    const endpoint = `${this.configService.apiEndpoint}/patient-services`;

    let params = new HttpParams();

    // if searchTerms are provided, add them as a query parameter
    if (searchTerms) {
      params = params.append('searchTerms', searchTerms);
    }

    // pass the params object in the request
    return this.httpClient.get<PatientService[]>(endpoint, { params }).pipe(
      map((response: any) => response.data),
      catchError((error) => {
        console.error('Error fetching patient services:', error);
        return throwError(error);
      })
    );
  }

  showPatientService(id: number) {
    const endpoint = `${this.configService.apiEndpoint}/patient-services/${id}`;

    return this.httpClient.get<PatientService>(endpoint).pipe(
      catchError((error) => {
        console.error('Error fetching patient service:', error);
        return throwError(error);
      })
    );
  }

  addPatientService(patientService: PatientService) {
    const endpoint = `${this.configService.apiEndpoint}/patient-services`;

    return this.httpClient.post<PatientService>(endpoint, patientService).pipe(
      catchError((error) => {
        console.error('Error adding patient service:', error);
        return throwError(error);
      }),
      tap((addedPatientService) => {
        // emit patientAdded event
        this.patientServicesEventService.patientServiceAdded$.next(addedPatientService);
      })
    );
  }

  deletePatientService(id: number) {
    const endpoint = `${this.configService.apiEndpoint}/patient-services/${id}`;

    return this.httpClient.delete(endpoint).pipe(
      catchError((error) => {
        console.error('Error deleting patient service:', error);
        return throwError(error);
      }),
      tap(() => {
        // emit patientDeleted event
        this.patientServicesEventService.patientServiceDeleted$.next(id);
      })
    );
  }

}
