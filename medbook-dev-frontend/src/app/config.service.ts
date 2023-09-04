import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiEndpoint = 'http://localhost:8000/api/v1';

  constructor() {}
}
