import {Component, Input} from "@angular/core"
@Component({
    selector: 'details-row',
    templateUrl: './datatabledetails.component.html',
    styleUrls: ['./datatabledetails.component.scss']
})
export class DataTableDetailsComponent {

    //@Input() _id: any;

    public ClickEdit():void {

        //alert( `Edir: ${this._id}`);

    }

    public ClickDelete():void {

        //alert( `Edir: ${this._id}`);

    }

}