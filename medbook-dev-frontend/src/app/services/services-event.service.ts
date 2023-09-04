import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Service } from '../models/models.index';

@Injectable({
  providedIn: 'root',
})
export class ServicesEventService {
  serviceAdded$ = new Subject<Service>();
  serviceDeleted$ = new Subject<number>();
}
