import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  url="";
  selectedFile : any;
  selectedFSK : number = -1;
  selectedDate: any;
  selectedGenre: String = "";
  enteredCast: String = "";
  enteredRegie: String = "";
  enteredDescription: String = "";
  enteredStudio: String = "";
  enteredduration: number = -1;
  enteredTitle: String = "";
  enteredLink: String = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  onChangeImage(e: any): void{
    if(e.target.files){
      var reader = new FileReader;
      this.selectedFile = <File> e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event: any)=>{
        this.url = event.target.result;
      }
    }

  }
  onPressAddMovie()  {
    console.log(this.selectedFSK + this.selectedDate + this.selectedGenre + this.enteredCast + this.enteredDescription + this.enteredRegie + this.enteredStudio + this.enteredTitle + this.enteredduration + this.selectedFile + this.enteredLink)
  }
 onUpload(){
 /*   var anchor = document.createElement("a");
    var myFolder = Folder ((app.activeDocument.path))
    anchor.href = URL.createObjectURL(this.selectedFile);
    console.log(anchor)
    console.log(anchor.href)
    anchor.setAttribute('desktop', '{{this.selectedFile}}.png')
    //anchor.download = "save.png"
    anchor.click()
    AppComp
 */}

}
