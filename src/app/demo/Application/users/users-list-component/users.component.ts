import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { PagedResult } from './user.model';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true
})
export class UsersComponent {
  user: any[] = [];
  userForm: FormGroup;
  isEdit = false;
  currentUserId: number | null = null;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    const pagedResult: PagedResult = {
      pageNumber: 1,
      pageSize: 10,
      searchTerm: ''
    };

    this.loadUsers(pagedResult);
  }

  loadUsers(pagedResult: PagedResult): void {
    this.userService.getUsers(pagedResult).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }
}
