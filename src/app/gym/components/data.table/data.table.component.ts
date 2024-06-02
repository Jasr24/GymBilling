import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Base } from '../base.class';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data-table',
  templateUrl: './data.table.component.html',
  styleUrls: ['./data.table.component.css']
})
export class DataTableComponent extends Base implements OnInit, AfterViewChecked {
  @Input() searchTitle = "Buscar...";
  @Input() pageSize = 20;
  @Input() attrData: string[] = ["position", "name", "weight", "symbol"];
  @Input() namesColumns: string[] = ["No.", "Nombre", "Peso", "Symbolo"];
  @Input() opcion = true;
  @Input() sizeStringLength = 30;

  @Input() showSearch = true;
  @Input() showPaginator= true;

  @Input() columnMoney: string[] = [];
  @Input() columnPer: string[] = [];

  @Output() selectedDat = new EventEmitter();

  @Output() button = new EventEmitter();

  @Input() _button?: { attr: string, titulo: string }

  @Input() typeStyle = 0

  private _data:any[] = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this._data);
  search = "";


  @Input() set data(val: any) {
    this._data = val;
    this.dataSource = new MatTableDataSource(this._data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  @Input() set searchTab(val: string) {
    this.search = val
    this.dataSource.filter = this.search.trim().toLowerCase();
  }

  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  allComplete = false

  applyFilter(filterValue: any) {
    this.search = filterValue.target.value;
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  constructor(private cdRef : ChangeDetectorRef) {
    super();
  }

  ngAfterViewChecked(){
     //Detecta cambios
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(element:any) {
    this.selectedDat.next(element);
    //Abrir modal
  }


  changeSelectSede(row:any) {
    this.button.next(row)
  }

  edit2(element:any, num:any) {
  
    this.selectedDat.next({ id: num, data: JSON.parse(JSON.stringify(element)) });
  }

  toShow(dato: any, nameColumn: string) {
    if (typeof dato == "number") {
      if (this.columnMoney.findIndex(r => r == nameColumn) != -1) {
        return this.formatMoney(dato);
      }
      if (this.columnPer.findIndex(r => r == nameColumn) != -1) {
        let dt = Math.round((dato + Number.EPSILON) * 100) / 100
        return dt + "%"
      }
    }
    return dato;
  }

  isNumber(dato:any) {
    if (typeof dato == "number") {
      return true
    }
    return false;
  }

  setAll(bol:any) {
    this._data.forEach(dt=>{
      dt._sel=bol
    })
    this.allComplete=bol
  }

  someComplete() { 
    let count= this._data.filter(r=>r._sel).length
    this.allComplete=(count==this._data.length)?true:false;
    return count>0 && !this.allComplete;   
  }

  selDt(bol:any,element:any){
    element._sel=bol;
    this.someComplete()
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
  { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
  { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
  { position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
  { position: 5, name: "Boron", weight: 10.811, symbol: "B" },
  { position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
  { position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
  { position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
  { position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
  { position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" }
];
