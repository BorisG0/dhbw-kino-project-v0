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
  url="";
  selectedFile : any;
  /*file = new File(["foo"], "foo.txt", {
    type: "text/plain",
  });*/
  file : any;
  selectedFSK : number = -1;
  selectedDate: any;
  selectedGenre: string = "";
  enteredCast: string = "";
  enteredRegie: string = "";
  enteredDescription: string = "";
  enteredStudio: string = "";
  enteredduration: number = -1;
  enteredTitle: string = "";
  enteredLink: string = "";
  id: number = -1;

  constructor(    
    private movieService: MovieService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onChangeImage(e: any){
    if(e.target.files){
      var reader = new FileReader;
      this.selectedFile = <File> e.target.files[0];
      this.file = <File> e.target.files[0];

      reader.readAsDataURL(e.target.files[0]);
      /*reader.onload=(event: any)=>{
        this.url = event.target.result;
        console.log(this.url)
      } */   }
  }
  test(){
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        this.movieService.addImage({
          newImage: this.file
        }).subscribe(
          data => {
            console.log(data);
            resolve(0);
          }
        );
      }, 0)
    })
  }
  
  onPressAddMovie()  {
    return new Promise((resolve, reject) => {

      setTimeout(() => {

        this.movieService.addMovie({
          id: this.id,
          title: this.enteredTitle,
          duration: this.enteredduration,
          ageRestriction: this.selectedFSK,
          //imageName: this.selectedFile,
          image: this.selectedFile,
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
