import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/theme/shared/notification-modal/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent {
  createForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserCreateComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.createForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      address: [''],
      phone: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.userService.createUser(this.createForm.value).subscribe(
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
          console.error('Lỗi khi tạo user:', error);
          this.notificationService.showNotification(false, 'Đã xảy ra lỗi, vui lòng thử lại!');
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
