import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule cho các directive như ngIf, ngFor
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component'; // Import LoginComponent từ file hiện tại
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [LoginService],
  imports: [
    CommonModule, // CommonModule cho các tính năng chung
    RouterModule, // RouterModule để sử dụng các routing
    LoginComponent,
    FormsModule,
    HttpClientModule
  ],
  exports: [LoginComponent] // Xuất LoginComponent để sử dụng ở AppModule
})
export class LoginModule {}
