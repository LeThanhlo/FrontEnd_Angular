import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/theme/shared/notification-modal/notification.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  updateForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number; fullName: string; address: string; phone: string; email: string },
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.updateForm = this.fb.group({
      userId: [data.userId, Validators.required],
      fullName: [data.fullName, Validators.required],
      address: [data.address, Validators.required],
      phone: [data.phone, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      username: '',
      password: ''
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const user = this.updateForm.value;
      this.userService.updateUser(user).subscribe(
        (response) => {
          // Kiểm tra nếu response không thành công (success: false)
          if (response.success) {
            this.notificationService.showNotification(true, response.message);
            this.dialogRef.close(true);
          } else {
            // Trường hợp không có quyền hoặc lỗi từ server
            this.notificationService.showNotification(false, response.message);
          }
        },
        (error) => {
          if (error.status === 400) {
            // Lỗi do request không hợp lệ
            const errorMessage = error.error?.message || 'Yêu cầu không hợp lệ, vui lòng kiểm tra lại!';
            this.notificationService.showNotification(false, errorMessage);
          } else {
            // Các lỗi khác
            console.error('Lỗi từ server:', error);
            this.notificationService.showNotification(false, 'Đã xảy ra lỗi, vui lòng thử lại!');
          }
        }
      );
    } else {
      this.notificationService.showNotification(false, 'Vui lòng điền đầy đủ thông tin!');
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
