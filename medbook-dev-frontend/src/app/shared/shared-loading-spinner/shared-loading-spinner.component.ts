import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-loading-spinner',
  templateUrl: './shared-loading-spinner.component.html',
  styleUrls: ['./shared-loading-spinner.component.scss'],
})
export class SharedLoadingSpinnerComponent {
  @Input() message: string = 'Please wait...';
}
