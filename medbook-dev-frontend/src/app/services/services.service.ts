import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Service } from '../models/models.index';
import { ConfigService } from './../config.service';
import { ServicesEventService } from './services-event.service';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  constructor(private httpClient: HttpClient,
    private configService: ConfigService,
    private servicesEventService: ServicesEventService
    ) {}

  getServices(searchTerms?: string): Observable<Service[]> {
    const endpoint = `${this.configService.apiEndpoint}/services`;

    let params = new HttpParams();

    // if searchTerms are provided, add them as a query parameter
    if (searchTerms) {
      params = params.append('searchTerms', searchTerms);
    }

    // pass the params object in the request
    return this.httpClient.get<Service[]>(endpoint, { params }).pipe(
      map((response: any) => response.data),
      catchError((error) => {
        console.error('Error fetching services:', error);
        return throwError(error);
      })
    );
  }

  addService(patient: Service) {
    const endpoint = `${this.configService.apiEndpoint}/services`;

    return this.httpClient.post<Service>(endpoint, patient).pipe(
      catchError((error) => {
        console.error('Error adding service:', error);
        return throwError(error);
      }),
      tap((addedService) => {
        // emit patientAdded event
        this.servicesEventService.serviceAdded$.next(addedService);
      })
    );
  }

  deleteService(id: number) {
    const endpoint = `${this.configService.apiEndpoint}/services/${id}`;

    return this.httpClient.delete(endpoint).pipe(
      catchError((error) => {
        console.error('Error deleting service:', error);
        return throwError(error);
      }),
      tap(() => {
        // emit patientDeleted event
        this.servicesEventService.serviceDeleted$.next(id);
      })
    );
  }

}
