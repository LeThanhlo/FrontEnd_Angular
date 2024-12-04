import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router để điều hướng
import { HttpClient } from '@angular/common/http'; // Import HttpClient để gọi API
import { RouterModule } from '@angular/router'; // Import RouterModule
import { LoginService } from './login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule], // Thêm RouterModule ở đây
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login(): void {
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response && response.accessToken) {
          this.loginService.saveToken(response.accessToken);
          localStorage.setItem('menus', JSON.stringify(response.menus)); // Lưu menu vào localStorage
          this.router.navigate(['/project']); // Điều hướng đến dashboard
        }
      },
      (error) => {
        this.errorMessage = 'Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin!';
      }
    );
  }
}
