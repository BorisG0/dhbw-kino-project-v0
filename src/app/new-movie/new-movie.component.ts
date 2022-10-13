import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  url="";
  constructor() { }

  ngOnInit(): void {
  }
  onChangeImage(e: any): void{
    if(e.target.files){
      var reader = new FileReader;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
      }
    }

  }
}
