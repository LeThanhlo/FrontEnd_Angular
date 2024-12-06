import { Injectable } from '@angular/core';
import { NotificationModalComponent } from './notification-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private dialog: MatDialog) {}

  showNotification(success: boolean, message: string): void {
    this.dialog.open(NotificationModalComponent, {
      width: '400px',
      data: { success, message }
    });
  }
}
