import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users-list-component/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';

@NgModule({
  providers: [UserService],
  imports: [
    CommonModule, // CommonModule cho các tính năng chung
    RouterModule, // RouterModule để sử dụng các routing
    UsersComponent,
    FormsModule,
    HttpClientModule
  ],
  exports: [UsersComponent] // Xuất LoginComponent để sử dụng ở AppModule
})
export class UsersModule {}
