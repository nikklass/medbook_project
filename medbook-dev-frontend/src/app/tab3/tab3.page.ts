import { Component, ViewChild, AfterViewInit   } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Service } from 'src/app/models/models.index';
import {
  ServicesService,
  ToastService,
} from 'src/app/services/services.index';
import { ServiceListComponent } from 'src/app/pages/service-list/service-list.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  // new service
  newService: any = {};
  showForm: boolean = false;

  services: Service[] = [];
  isLoading: boolean = false;

  // search
  searchQuery: string = '';
  searchTerms = new Subject<string>();

  // ViewChild reference to the ServiceListComponent
  @ViewChild('serviceListComponent') serviceListComponent: ServiceListComponent;

  constructor(
    private servicesService: ServicesService,
    private toastService: ToastService,
  ) {
    this.searchTerms
      .pipe(
        // 1000ms debounce time
        debounceTime(1000),
        // ignore if the search query hasn't changed
        distinctUntilChanged()
      )
      .subscribe((term: string | undefined) => {
        // pass the search query to fetchServices
        this.fetchServices(term);
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // fetch data after the view and child components have been initialized
    this.fetchServices();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  async addNewService() {
    // check if all required fields are filled
    if (
      !this.newService.name
    ) {
      this.toastService.presentToast(
        'error',
        'Please fill in the service name'
      );
      return;
    }

    // show loading spinner
    this.isLoading = true;

    // send the new service data to the backend API
    this.servicesService.addService(this.newService).subscribe({
      next: (data: any) => {
        console.log('data === ', data);
        // reset the form and hide it
        this.newService = {};
        this.showForm = false;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast(
          'error',
          'Error adding service: ' + error.message
        );
      },
    });
  }

  onCancel() {
    this.showForm = false;
  }

  // handle search input change
  onSearchInputChange() {
    this.serviceListComponent.fetchServices(this.searchQuery);
  }

  onSearchInputClear() {
    this.searchQuery = '';
    this.serviceListComponent.fetchServices(this.searchQuery);
  }

  fetchServices(searchQuery: string = '') {
    this.serviceListComponent.fetchServices(searchQuery);
  }


  onEditService(service: Service) {
  }

  onConfirmDelete(service: Service) {
  }

}

