import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() pageSizes: number[] = [5, 10, 20]; // Mảng các kích thước trang
  @Input() totalPagesArray: number[] = []; // Mảng các trang
  @Input() pagedResult: any = { pageSize: 10, pageNumber: 1 }; // Dữ liệu phân trang
  @Output() pageSizeChange = new EventEmitter<number>(); // Sự kiện thay đổi page size
  @Output() pageChange = new EventEmitter<number>(); // Sự kiện thay đổi trang

  onPageSizeChange(event: any): void {
    this.pageSizeChange.emit(event.target.value);
  }

  goToPage(page: number): void {
    this.pageChange.emit(page);
  }
}
