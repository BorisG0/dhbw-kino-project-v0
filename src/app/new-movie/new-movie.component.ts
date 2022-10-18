import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  /*url : String | undefined;
  selectedFile : File | undefined;
  selectedFSK : number | undefined;
  selectedDate: Date | undefined;
  selectedGenre: String | undefined;
  enteredCast: String| undefined;
  enteredRegie: String | undefined;
  enteredDescription: String | undefined;
  enteredStudio: String | undefined;
  enteredduration: number | undefined;
  enteredTitle: String | undefined;
  enteredLink: String | undefined;*/
  url : string = "";
  selectedFile : File | undefined;
  selectedFSK : number = -1;
  selectedDate: Date = new Date;
  selectedGenre: string = "";
  enteredCast: string = "";
  enteredRegie: string = "";
  enteredDescription: string = "";
  enteredStudio: string = "";
  enteredduration: number | undefined;
  enteredTitle: string = "";
  enteredLink: string = "";


  constructor(
    private movieService: MovieService,
    private http: HttpClient
    ) { }

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
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if(this.enteredduration!=null)
        {

        
        this.movieService.addMovie({
          id: 18,
          title: this.enteredTitle,
          duration: this.enteredduration,
          ageRestriction: this.selectedFSK,
          imageName: "newImageName.png",
          //image: this.selectedFile,
          description: this.enteredDescription,
          genre: this.selectedGenre,
          startDate: this.selectedDate,
          movieStudio: this.enteredStudio,
          regie: this.enteredRegie,
          cast: this.enteredCast,
          trailerLink: this.enteredLink
        }).subscribe(
          data => {
            console.log(data);
            resolve(0);
          }
        );
        }
      }, 0)
    })
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
