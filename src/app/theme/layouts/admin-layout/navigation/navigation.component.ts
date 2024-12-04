// Angular import
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavContentComponent } from './nav-content/nav-content.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [SharedModule, NavContentComponent, CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // media 1025 After Use Menu Open
  @Output() NavCollapsedMob = new EventEmitter();

  navCollapsedMob;
  windowWidth: number;
  menus: any[] = [];
  activeMenu: any = null;
  icons: string[] = [
    'fa-home',
    'fa-briefcase',
    'fa-chart-line',
    'fa-tachometer-alt',
    'fa-cogs',
    'fa-users',
    'fa-bell',
    'fa-chart-line',
    'fa-comment',
    'fa-headset'
  ];

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }
  ngOnInit() {
    this.loadMenus();
  }

  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }

  loadMenus() {
    const menusFromLocalStorage = localStorage.getItem('menus');
    if (menusFromLocalStorage) {
      try {
        this.menus = JSON.parse(menusFromLocalStorage); // Parse the menus JSON string into an array
        // Optionally, filter out invisible menus
        this.menus = this.menus.filter((menu) => menu.isVisible);
        this.menus.forEach((menu, index) => {
          menu.icon = this.icons[index % this.icons.length]; // Assign icon in a circular manner
        });
      } catch (error) {
        console.error('Error parsing menus from localStorage', error);
      }
    } else {
      console.log('No menus found in localStorage');
    }
  }
  selectMenu(menu: any) {
    this.activeMenu = menu;
  }

  // Kiểm tra nếu menu này là menu đang được chọn
  isActive(menu: any): boolean {
    return this.activeMenu === menu;
  }
}
