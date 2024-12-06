import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users-list-component/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { UserCreateComponent } from './users-create-component/user-create.component';
import { UserUpdateComponent } from './users-update-component/user-update.component';
import { UserDeleteComponent } from './users-delete-component/user-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  providers: [UserService],
  declarations: [UserCreateComponent, UserUpdateComponent, UserDeleteComponent],
  imports: [
    CommonModule, // CommonModule cho các tính năng chung
    RouterModule, // RouterModule để sử dụng các routing
    UsersComponent,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [UsersComponent] // Xuất LoginComponent để sử dụng ở AppModule
})
export class UsersModule {}
