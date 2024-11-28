import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router để điều hướng
import { HttpClient } from '@angular/common/http'; // Import HttpClient để gọi API
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule], // Thêm RouterModule ở đây
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  SignInOptions = [
    {
      image: 'assets/images/authentication/google.svg',
      name: 'Google'
    },
    {
      image: 'assets/images/authentication/twitter.svg',
      name: 'Twitter'
    },
    {
      image: 'assets/images/authentication/facebook.svg',
      name: 'Facebook'
    }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('https://localhost:7251/login', loginData)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/dashboard/default']);
          } else {
            alert('Login failed: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Có lỗi xảy ra!', error);
          alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
        }
      });
  }
}
