import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { ConfigService } from './../config.service';
import { Gender } from '../models/models.index';

@Injectable({ providedIn: 'root' })
export class GenderService {

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  getGenders() {
    const endpoint = `${this.configService.apiEndpoint}/genders`;

    return this.httpClient.get<Gender[]>(endpoint)
      .pipe(
        map((response: any) => response),
        catchError((error) => {
          console.error("Error fetching gender list:", error);
          return throwError(error);
        })
      );
  }

}
