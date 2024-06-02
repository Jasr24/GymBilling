import { AbstractControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalAlert } from "./modals/modal.alert/modal.alert.component";

export class Base {
    constructor() {}

    /**
     * Confirma si el FormControl tiene algún error
     * @param control
     */
    hasError(control: AbstractControl) {
        if (control.errors ) {
            return true;
        }
        return false;
    }

    /**
     * Imprime el error correspondiente
     *
     * @param control
     * @param mapMss Para personalizar los errores
     */
    printError(control: AbstractControl, mapMss?:any) {
        let e = control.errors;
        let mss = "Error";
        let aux = "";

        let listaErrores = [
            "required",
            "min",
            "max",
            "mustMatch",
            "pattern",
            "differentMatch",
            "email",
            "maxlength",
            "sizeMb",
            "lessDay"
        ];

        // for (let i = 0; i < listaErrores.length; i++) {
        //     const r = listaErrores[i];
        //     if (e[r]) {
        //         mss = mapMss && mapMss[r] ? mapMss[r] : mss;
        //         return mss;
        //     }
        // }

        // //Errores especiales ->
        // if (e.generalRange) {
        //     let a = String(e.generalRange.type).split(" ");

        //     if (a.length > 1) {
        //         return `El valor debe ser ${a[0]}${e.generalRange.min} ${a[1]}${e.generalRange.max}`;
        //     } else {
        //         return `El valor debe ser ${a[0]}${e.generalRange.min}`;
        //     }
        // }
        // aux = "minlength";
        // if (e[aux]) {
        //     mss = `Debe tener al menos ${e[aux].requiredLength} caractere`;
        //     mss =
        //         mapMss && mapMss[aux]
        //         ? mapMss[aux] + ` ${e[aux].requiredLength} caractere`
        //         : mss;
        //     return mss;
        // }
        return "Tiene errores";
    }

    /**
     * Para todos los campos tipo texto
     * @param form
     */
    trimForm(form: FormGroup) { 
        for (var key in form.controls) {
            const valor = form.get(key)!.value;
            if (typeof valor == "string") {
                form.get(key)!.setValue((<string>form.get(key)!.value).trim());
            }
        } 
    }

    openDialog(dialog:any,title: string, message: string,type:number,call:any) {
        dialog.open(ModalAlert, {
            disableClose: true,
            data: {
                title: title,
                message: message,
                type:type
            }
        }).afterClosed().subscribe((result:any) => {     
            call(result)
        });
    }

    openDialogConfirm(dialog:any, title: string, message: string, type:number, call:any){
        dialog.open(ModalAlert, {
            disableClose:true,
            data: {
                title: title,
                message: message,
                type:type,
                confirm:true
            }
        }).afterClosed().subscribe( (result:any) => {
            call(result)        
        });
    }


    /**
     * Formato de dinero
     * @param val 
     */
    formatMoney(val: number) {
        val = Math.round((val + Number.EPSILON) * 100) / 100;
        const arr: string[] = (val + "").split(".");
        let aux = "00";
        if (arr.length > 1) {
            aux = arr[1];
        }
        return "$ "+arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    // _getControl(form:FormGroup, key:string):FormControl{
    //     return form.controls[key];
    // }


    
    /**
     * Tener en cuenta que panelClass debe estar en el componente donde se llama, además tiene que estar con la siguiente sintaxis 
     * ::ng-deep .custom-style { }
     * @param snackBar 
     * @param mss 
     * @param action 
     * @param duration 
     * @param panelClass 
     */
    openSnackBar(snackBar: MatSnackBar, mss: string, action: string, duration: number, panelClass: string) {
        snackBar.open(mss, action, {
            duration: duration,
            panelClass: [panelClass],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }

    
    
}