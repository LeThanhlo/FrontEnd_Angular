import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/theme/shared/notification-modal/notification.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  onDelete(): void {
    this.userService.deleteUser(this.data.id).subscribe((response) => {
      // Kiểm tra nếu response không thành công (success: false)
      if (response.success) {
        this.notificationService.showNotification(true, response.message);
        this.dialogRef.close(true);
      } else {
        // Trường hợp không có quyền hoặc lỗi từ server
        this.notificationService.showNotification(false, response.message);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
