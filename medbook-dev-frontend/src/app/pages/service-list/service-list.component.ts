import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';

import { Service } from 'src/app/models/models.index';
import {
  ServicesService,
  ToastService,
} from 'src/app/services/services.index';
import { ServicesEventService } from 'src/app/services/services-event.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
})
export class ServiceListComponent implements OnInit {
  @Input() services: Service[] = [];
  @Input() isLoading: boolean = false;

  @Output() editServiceEvent = new EventEmitter<Service>();
  @Output() confirmDeleteEvent = new EventEmitter<Service>();

  constructor(
    private servicesService: ServicesService,
    private alertController: AlertController,
    private toastService: ToastService,
    private modalController: ModalController,
    private servicesEventService: ServicesEventService
  ) {}
  ngOnInit(): void {
    // subscribe to serviceAdded$ event
    this.servicesEventService.serviceAdded$.subscribe((addedService) => {
      // add new item at the beginning
      this.services.unshift(addedService);
    });

    // subscribe to the serviceDeleted$ event to update the service list
    this.servicesEventService.serviceDeleted$.subscribe((deletedServiceId) => {
      // remove the service from service list
      this.services = this.services.filter(
        (service) => service.id !== deletedServiceId
      );
    });
  }

  fetchServices(searchQuery: string = '') {
    this.isLoading = true;

    this.servicesService.getServices(searchQuery).subscribe({
      next: (data: Service[]) => {
        this.isLoading = false;
        this.services = data;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.toastService.presentToast('error', error.message);
      },
    });
  }

  async confirmDelete(service: any) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete ${service.name}?`,
      cssClass: 'alert-header',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.isLoading = false;
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.isLoading = true;
            this.servicesService.deleteService(service.id).subscribe({
              next: (data: any) => {
                this.isLoading = false;
              },
              error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                this.toastService.presentToast('error', error.message);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.servicesEventService.serviceAdded$.unsubscribe();
    this.servicesEventService.serviceDeleted$.unsubscribe();
  }
}
