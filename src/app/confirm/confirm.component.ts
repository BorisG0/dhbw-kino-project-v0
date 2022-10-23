import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  link : string = "";

  constructor(    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    if(this.route.snapshot.routeConfig?.path!=undefined){
      this.link = this.route.snapshot.routeConfig?.path
    }
    if(this.link=="confirm"){
      this._snackBar.open("Danke fürs buchen, eine Email wurde an Sie verschickt", "alles klar", {
        verticalPosition: 'bottom'
      });

    }

  }
  onClickPay(){

  }

}
