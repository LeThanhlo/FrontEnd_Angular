import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { PagedResult, User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { PermissionService } from '../../permissions.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../users-create-component/user-create.component';
import { UserUpdateComponent } from '../users-update-component/user-update.component';
import { UserDeleteComponent } from '../users-delete-component/user-delete.component';
import { NotificationService } from 'src/app/theme/shared/notification-modal/notification.service';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true
})
export class UsersComponent implements OnInit {
  user: any[] = [];
  userForm: FormGroup;
  isEdit = false;
  currentUserId: number | null = null;

  canAdd = false;
  canEdit = false;
  canDelete = false;

  pagedResult = { pageNumber: 1, pageSize: 10, searchTerm: '' };
  totalRecords: number = 0;
  totalPagesArray: number[] = [];
  pageSizes = [5, 10, 20];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.loadUsers(this.pagedResult);

    const permissions = this.permissionService.getPermissionsForUrl('/users');
    if (permissions) {
      this.canAdd = permissions.canAdd;
      this.canEdit = permissions.canEdit;
      this.canDelete = permissions.canDelete;
    }
  }

  loadUsers(pagedResult: any): void {
    this.userService.getUsers(pagedResult).subscribe({
      next: (response) => {
        this.user = response.data;
        this.totalRecords = response.affectedRows;
        this.calculatePagination();
      },
      error: (err) => {
        console.error('Lỗi khi tải danh sách user:', err);
      }
    });
  }

  calculatePagination(): void {
    const totalPages = Math.ceil(this.totalRecords / this.pagedResult.pageSize);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Chuyển đến trang khác
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPagesArray.length) {
      this.pagedResult.pageNumber = page;
      this.loadUsers(this.pagedResult);
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pagedResult.pageSize = Number(selectElement.value);
    this.loadUsers(this.pagedResult);
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(UserCreateComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(this.pagedResult);
      }
    });
  }

  openEditModal(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '500px',
      data: user // Truyền dữ liệu của user cần chỉnh sửa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(this.pagedResult);
      }
    });
  }

  openDeleteModal(userId: number): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '400px',
      data: { id: userId } // Truyền ID của user cần xóa
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers(this.pagedResult);
      }
    });
  }
}
