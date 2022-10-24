import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Booking } from '../booking';




@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  link : string = "";

  @Input() bookingInfo: Booking | undefined;

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
