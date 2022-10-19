import { Component, OnInit } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';








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
  enteredduration: string = "";
  durationAsNumber: number = -1;

  //enteredduration: number | undefined;
  enteredTitle: string = "";
  enteredLink: string = "";


  separatorKeysCodes: number[] = [ENTER, COMMA];
  //filteredGenres: Observable<string[]>;
  genres: string[] = ['Action'];

  allGenres: string[] = ["Thriller", "Science Fiction","Komödie","Horror","Fantasy","Animation","Action"]
  genreCtrl = new FormControl('');

  


  constructor(
    /*this.filteredGenres = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );*/
    private movieService: MovieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,

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

  remove(fruit: string): void {
    const index = this.genres.indexOf(fruit);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.genres.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.genreCtrl.setValue(null);
  }

  clearInputFields(){
    this.enteredTitle = "";
    this.selectedFSK = -1;
    this.selectedDate= new Date;
    this.selectedGenre = "";
    this.enteredCast = "";
    this.enteredRegie = "";
    this.enteredDescription = "";
    this.enteredStudio = "";
    this.enteredduration = "";

    //this.enteredduration = undefined;
    this.enteredTitle = "";
    this.enteredLink = "";

  }
  inputsAreCorrect (){
    let areCorret : boolean = false;
    if(this.enteredTitle != "" &&
    this.enteredduration.match(/^[0-9]+$/) != null &&//nur zahlen eingegeben
    this.enteredduration != "" &&
    this.selectedFSK != -1 &&
    this.enteredDescription != "" &&
    this.selectedGenre != "" &&
    this.enteredStudio != "" &&
    this.enteredRegie != "" &&
    this.enteredCast != "" &&
    this.enteredLink != ""
    )  {//vllt noch abfragen ob es ein richtiger Link ist unso 
      areCorret = true;
      this.durationAsNumber = Number(this.enteredduration);
    }
    return areCorret;
  }
  /*checkLink(){
    var request;
    if(window.XMLHttpRequest){
      request = new XMLHttpRequest();
    }
    else{
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    request.open('GET', 'http://www.mozilla.org', false);
    request.send(); // there will be a 'pause' here until the response to come.
    // the object request will be actually modified
    if (request.status === 404) {
      alert("The page you are trying to reach is not available.");
    }else{
      alert("gibts")
    }
  }*/
  openFailedAddMovieDialog(){
    //let config = new MatSnackBarConfig();
    //config.duration = 10;
    this._snackBar.open("Falsche Eingabe", "okay"
    );
  }


  onPressAddMovie()  {
    //Film nur hinzufügen wenn alle Eingaben korrekt sind
    if(this.inputsAreCorrect()){
      let newMovie: Movie;
      this._snackBar.open("Film wurde hinzugefügt","okay")
      //abfrage ist notwendig da enteredduration als undefined deklariert wird
      if(this.enteredduration!=null){
        //Film zwischenspeichern - Nur notwendig wegen der Error Meldung (Methode geht nicht in subscribe rein)
        newMovie = {id: 18,
          title: this.enteredTitle,
          duration: this.durationAsNumber,
          ageRestriction: this.selectedFSK,
          imageName: "img0.png",
          //image: this.selectedFile,
          description: this.enteredDescription,
          genre: this.selectedGenre,
          startDate: this.selectedDate,
          movieStudio: this.enteredStudio,
          regie: this.enteredRegie,
          cast: this.enteredCast,
          trailerLink: this.enteredLink}
      }
      //input Felder zurück setzen
      this.clearInputFields();
  
      return new Promise((resolve, reject) => {
  
        setTimeout(() => {
          if(this.enteredduration!=null)
          {
            
          
          this.movieService.addMovie(newMovie).subscribe(
            data => {
              this.enteredTitle = "";
              //console.log(data);
              resolve(0);
            }
          );
          }
        }, 0)
      })
      //else wenn nicht alle eingaben korrekt sind
    }else{
      this.openFailedAddMovieDialog();
      return;
    }
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
