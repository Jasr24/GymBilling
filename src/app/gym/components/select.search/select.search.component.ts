import { FormControl, Validators } from "@angular/forms";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectorRef,
} from "@angular/core";
import { Subject, ReplaySubject } from "rxjs";
import { MatSelect } from "@angular/material/select";
import { takeUntil, take } from "rxjs/operators";
import { Base } from "../base.class";

@Component({
  selector: "app-select-search",
  templateUrl: "./select.search.component.html",
  styleUrls: ["./select.search.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class SelectSearchComponent extends Base implements OnInit {
  private _data: any = [
    { id:1, name: "andres" },
    { id:2, name: "jose" },
    { id:3, name: "otherxd" },
  ];
  /**Habilita para buscar  */
  @Input() showSearch = false;
  @Input() titulo = "Seleccionar opción";

  /** nameBY lo que se va a mostrar y searchBy por lo cual va a buscar */
  @Input() nameBy = "name";
  @Input() searchBy = "name";

  /**Por si se quiere que sea multiple */
  @Input() isMultiple = false;

  /**Key Id en caso de que AllObject sea falso */
  @Input() key = "id";
  @Input() allObject = false;

  /** Por si llega un formControl */
  @Input() _valueSelected: FormControl = new FormControl("", [
    Validators.required
  ]);

  /** Displayed */
  @Input() displayed:string[] = [];

  /**Para mostrar errores */
  @Input() mapError = {};

  /**Evento que emite */
  @Output() changeSelect = new EventEmitter();
  empty = false;

  /**Carpinteria  de aquí para abajo! */

  _onDestroy = new Subject<void>();
  @ViewChild("matSelect") matSelect: MatSelect | undefined;

  filteredCtrl = new ReplaySubject<[]>(1);
  emptySearch = false;
  search: FormControl = new FormControl("");
  get data() {
    return this._data;
  }

  @Input() set valueSelected(val: any) {
    this._valueSelected.setValue(val);
  }

  @Input() set data(val: any) {
    this._data = val;
    this.initSearch();
  }

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    this.change();
    this.filteredCtrl.subscribe((dat) => {
      if (dat.length == 0) {
        // this._valueSelected.setValue("");
        this.empty = true;
      } else {
        this.empty = false;
      }
    });
  }

  change() {
    this._valueSelected.valueChanges.subscribe((dat) => {
      this.changeSelect.next(dat);
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.initSearch();
  }

  initSearch() {
    this.filteredCtrl.next(this._data.slice());
    this.search.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filter();
    });
  }

  mostrarDisplayed(){
    let mostrar = "";
    let value: any = null;   
    if(this.allObject){
      value = this._valueSelected.value;
    }else{
      value = this._data.find((r: any) => r[this.key] == this._valueSelected.value);
    }
    if(value){
      this.displayed.forEach(dt=>{
        let mostrar: string = '';
        mostrar += (value[dt] ?? "") + " ";
      })
    }  
    return mostrar;
  }

  filter() {
    let search: string = this.search.value;
    if (!this._data) return;

    if (!search) {
      this.filteredCtrl.next(this._data.slice());
    } else {
      search = search.toLowerCase();
    }
    this.filteredCtrl.next(
      this._data.filter(
        (dat: any) => dat[this.searchBy].toLowerCase().indexOf(search) > -1
      )
    );
  }

  name(dat: any) {
    return dat[this.nameBy];
  }
}