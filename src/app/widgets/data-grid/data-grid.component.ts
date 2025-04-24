import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @ViewChild('columnManagerModal') columnManagerModal!: ModalComponent;

  @Input() columns: { name: string; field: string; width: string; show: boolean; type: string }[] = [];
  @Input() data: any[] = [];
  @Input() showSelector: boolean = false;
  @Input() selectMulti: boolean = true; // Por defecto, selección de una sola fila

  @Input() showEdit: boolean = false;

  @Input() showColumnManager: boolean = true;

  @Output() selectRowEvent: EventEmitter<any> = new EventEmitter<any>();

  isEditing: boolean = false;

  pageSize: number = 30;
  currentPage: number = 1;
  paginatedData: any[] = [];

  columnSettings: { name: string; field: string; editable: boolean; show: boolean }[] = [];

  checked: boolean = false;

  ngOnInit(): void {
    this.columnSettings = JSON.parse(JSON.stringify(this.columns));
    this.paginateData();
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.data.slice(start, end);
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.paginateData();
    }
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.data.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  rowSelected(row: any): void {

    const selected = row.selected;

    if (!this.selectMulti) {
      // Desmarca todas las filas excepto la seleccionada
      this.paginatedData.forEach(r => r.selected = false);
      row.selected = selected;
      this.selectRowEvent.emit(row);
    }
    else {
      row.selected = selected;
      this.selectRowEvent.emit(row);
    }

  }

  openColumnModal(): void {
    this.columnManagerModal.openModal();
  }

  applyColumnVisibility(): void {
    this.paginateData();
  }

  applyChanges(): void {
    this.columns.forEach((col, index) => {
      col.show = this.columnSettings[index].show;
    });
    this.columnManagerModal.closeModal();
  }

  closeModal(): void {
    this.columnSettings = JSON.parse(JSON.stringify(this.columns));
    this.columnManagerModal.closeModal();
  }


  selectAll(event: any): void {
    if (this.selectMulti) {
      this.checked = event.target.checked;
      this.paginatedData.forEach(row => row.selected = this.checked);
  
      this.selectedRows();
    }
  }

  selectedRows(): any[] {
    return this.paginatedData.filter(row => row.selected);
  }

  getRows(): any[] {
    return this.paginatedData;
  }


  formatCellValue(value: any, type?: string): string {
    if (type === 'percentage' && value) {
      return `${value}%`; // Agregar símbolo de porcentaje
    }
    else if (type === 'date' && value) {

      const date = new Date(value);
      const fecha = date.toISOString().split('T')[0];

      return fecha;
    }
    return this.capitalize(value) || "";
  }

  capitalize(value: any, locale = 'en-US') {
    if (!value) return '';
    if (typeof value !== 'string') return value;
    return value[0].toLocaleUpperCase(locale) + value.slice(1);
  }


  
}
