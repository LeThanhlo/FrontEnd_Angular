import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedResult, User } from './users-list-component/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = 'https://localhost:7251/api/User';
  constructor(private http: HttpClient) {}

  getUsers(pagedResult: PagedResult): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.api}/get-all-user`, pagedResult, { headers });
  }

  createUser(user: User): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage hoặc nơi bạn lưu trữ
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.api}/create-user`, user, { headers });
  }

  updateUser(id: number, user: User): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage hoặc nơi lưu trữ
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Đường dẫn chứa `id` và body là `user`
    return this.http.put<any>(`${this.api}/update-user/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage hoặc nơi lưu trữ
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.delete<any>(`${this.api}/delete-user/${id}`, { headers });
  }
}
