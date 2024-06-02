import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal.alert.component.html',
  styleUrls: ['./modal.alert.component.css']
})
export class ModalAlert {
  title: String = "";
  message: String = "";
  confirm:boolean =false;
  
  type:number = 1;
    
  constructor(
    public dialogRef: MatDialogRef<ModalAlert>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
    this.type = this.data.type;    
    this.confirm= this.data.confirm!=null
  }

  close(){
    this.dialogRef.close(false);
  }

  accept(){
    this.dialogRef.close(true);
  }
}
