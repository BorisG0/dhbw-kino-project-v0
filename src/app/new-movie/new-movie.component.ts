import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';










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
  //selectedGenre: string = "";
  enteredCast: string = "";
  enteredRegie: string = "";
  enteredDescription: string = "";
  enteredStudio: string = "";
  enteredduration: string = "";
  durationAsNumber: number = -1;
  id: number = 0;

  //enteredduration: number | undefined;
  enteredTitle: string = "";
  enteredLink: string = "";


  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredGenres: Observable<string[]>;
  selectedGenres: string[] = [];

  allGenres: string[] = ["Thriller", "Science Fiction","Komödie","Horror","Fantasy","Animation","Action"]
  genreCtrl = new FormControl('');
  
  movie : Movie = { id:0, title:"", duration:0, ageRestriction:0, imageName:"",  description:"", genre:"", startDate: new Date(), movieStudio:"",regie:"", cast:"", trailerLink:"" }
  //Funkt noch nicht ... bei select wird input value nicht zurückgesetzt
  //@ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;


  


  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private movieService: MovieService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,) { 
      //Für was braucht man das hier?
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
    );

    }
    

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    
    if(this.id){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          //wenn es eine id gibt -> bin ich im Film bearbeiten
  
  
          this.movieService.getMovie(this.id).subscribe(movie =>{
            this.movie = movie;
            this.enteredTitle = movie.title;
            this.enteredCast = movie.cast;
            this.enteredDescription = movie.description;
            this.enteredLink = movie.trailerLink;
            this.enteredRegie = movie.regie;
            this.enteredStudio = movie.movieStudio;
            this.enteredduration = String(movie.duration);
            this.selectedDate = movie.startDate;
            this.selectedFSK = movie.ageRestriction;
            console.log(this.selectedFSK)
            this.selectedGenres = movie.genre.split(',');
            
            this.movie.trailerLink = this.movie.trailerLink.substring(1, this.movie.trailerLink.length - 1);
            resolve(0)
            })
        }, 0)
      })
    }
    else{
      return;
    }

  }
  onPressUpdateMovie(){
    if(this.id){
      //Film nur ändern wenn alle Eingaben korrekt sind
    if(this.inputsAreCorrect()){
      let newUpdateMovie : Movie;

      let genreString = this.selectedGenres.toString()
      this._snackBar.open("Film wurde geändert","okay")
      //abfrage ist notwendig da enteredduration als undefined deklariert wird
      if(this.enteredduration!=null){
        //Film zwischenspeichern - Nur notwendig wegen der Error Meldung (Methode geht nicht in subscribe rein)
        newUpdateMovie = {id: this.movie.id,
          title: this.enteredTitle,
          duration: this.durationAsNumber,
          ageRestriction: this.selectedFSK,
          imageName: this.movie.imageName,
          //image: this.selectedFile,
          description: this.enteredDescription,
          genre: genreString,
          startDate: this.selectedDate,
          movieStudio: this.enteredStudio,
          regie: this.enteredRegie,
          cast: this.enteredCast,
          trailerLink: this.movie.trailerLink}
      }
      //input Felder zurück setzen
      //this.clearInputFields();
  
      return new Promise((resolve, reject) => {
  
        setTimeout(() => {
          if(this.enteredduration!=null)
          {
            
          
          this.movieService.updateMovie(newUpdateMovie).subscribe(
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
    }
    }
    return;

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
    const index = this.selectedGenres.indexOf(fruit);
    console.log("jetzt in remove")
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    console.log("jetzt in add")

    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedGenres.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
    this.genreCtrl.setValue(null);
  }
  
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("jetzt in select")
    console.log(event);
    this.selectedGenres.push(event.option.viewValue);
    //Funkt noch nicht
    //this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }

  clearInputFields(){
    this.enteredTitle = "";
    this.selectedFSK = -1;
    this.selectedDate= new Date;
    this.selectedGenres = [];
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
    this.selectedGenres.length != 0 &&
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
      let genreString = this.selectedGenres.toString()
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
          genre: genreString,
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
