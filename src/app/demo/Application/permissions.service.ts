import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: any[] = [];

  constructor() {
    const storedPermissions = localStorage.getItem('permission');
    this.permissions = storedPermissions ? JSON.parse(storedPermissions) : [];
  }

  getPermissionsForUrl(url: string): any {
    return this.permissions.find((permission) => permission.menuUrl === url) || null;
  }
}
