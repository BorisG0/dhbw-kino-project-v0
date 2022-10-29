import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  url: string = "";
  id: number = 0;
  movie: Movie = { id: 0, title: "", duration: 0, ageRestriction: 0, imageName: "", description: "", genre: "", startDate: new Date(), movieStudio: "", regie: "", cast: "", trailerLink: "", active: true }
  movieForBackend : Movie | undefined;
  //Variablen für die Input Felder
  selectedFile: File | undefined;
  selectedFSK: number = -1;
  selectedDate: Date = new Date;
  enteredCast: string = "";
  enteredRegie: string = "";
  enteredDescription: string = "";
  enteredStudio: string = "";
  enteredduration: string = "";//Duration als String, da bei number sonst ein Wert im Input Feld angezeigt wird und man bei number undefined Probleme mit typescript gibt
  durationAsNumber: number = -1;
  enteredTitle: string = "";
  enteredLink: string = "";

  currentActive: boolean = true;
  currentUserType : string = HeaderComponent.currentUser.userType;

  readonly snackBarDuration : number = 1500;
  //Notwendig für die Chip List von Angular -> Genre Auwahl
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredGenres: Observable<string[]>;
  selectedGenres: string[] = []; //Genre wird in de DB und im Backend als String behandelt, jedoch ist für die Chip List ein Array notwendig, weshalb Casts vorgenommen werden
  allGenres: string[] = ["Thriller", "Science Fiction", "Komödie", "Horror", "Fantasy", "Animation", "Action"]
  genreCtrl = new FormControl('');

  //Soll den eingegebnen Wert zurücksetzen, wenn ein vorgeschlagener Wert ausgewählt wird
  //@ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private _snackBar: MatSnackBar,
    private router: Router,
    ) {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
    );
  }

  //Es wird überprüft, ob die Componente über den Button "Film hinzufügen" oder durch die Auswahl eines bereits vorhanden Film aufgerufen wurde
  //Bei zweiterem wird das Movie Objekt des ausgewählten Films geladen
  ngOnInit() {
    if(HeaderComponent.currentUser.userType != 'Employee'){
      this.router.navigate(['dashboard']);
    }
    else{
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if (this.id) {
        this.getMovie();
      }
    }
  }
  //Lädt den ausgewählten Film und befüllt die Input Felder mit dessen Attributen
  getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.getMovie(this.id).subscribe(movie => {
          this.movie = movie;
          this.enteredTitle = movie.title;
          this.enteredCast = movie.cast;
          this.enteredDescription = movie.description;
          this.enteredLink = movie.trailerLink.replace(/"/g, '');
          this.enteredRegie = movie.regie;
          this.enteredStudio = movie.movieStudio;
          this.enteredduration = String(movie.duration);
          this.selectedDate = movie.startDate;
          //FSk wird im select noch nicht augewählt
          this.selectedFSK = movie.ageRestriction;
          this.selectedGenres = movie.genre.split(',');
          this.currentActive = movie.active;
          resolve(0)
        })
      }, 0)
    })
  }

  onPressAddMovie() {
    //Film nur hinzufügen wenn alle Eingaben korrekt sind
    if (this.inputsAreCorrect()) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {

            this.movieService.addMovie(this.getInputField()).subscribe(
              data => {
                //input Felder zurück setzen
                let currentSnackbar : any = this._snackBar.open("Film wurde hinzugefügt", "okay")
                this.clearInputFields();
                setTimeout(() => {
                  currentSnackbar.dismiss();
                }, this.snackBarDuration)
                resolve(0);
              }
            );
        }, 0)
      })
      //else (wenn nicht alle eingaben korrekt sind)
    } else {
      this.openFailedAddMovieDialog();
      return;
    }
  }
  //Ändert die Film Aktivität
  onPressChangeActivity() {
    if(this.inputsAreCorrect()){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
          this.movieService.changeMovieActivity(this.getInputField()).subscribe(
            data => {
              this.currentActive = !this.currentActive;
              let currentSnackbar : any = this._snackBar.open("Aktivität wurde geändert", "okay")
              setTimeout(() => {
                currentSnackbar.dismiss();
              }, this.snackBarDuration)
              resolve(0);
            }
          );
      }, 0)
    })

  }
  return;
  }
  //Film welcher bereits existiert wird geändert
  onPressUpdateMovie() {
    if (this.id) {
      //Film nur ändern wenn alle Eingaben korrekt sind
      if (this.inputsAreCorrect()) {

        return new Promise((resolve, reject) => {
          setTimeout(() => {
              this.movieService.updateMovie(this.getInputField()).subscribe(
                data => {
                  let currentSnackbar : any = this._snackBar.open("Film wurde geändert", "okay")
                 setTimeout(() => {
                  currentSnackbar.dismiss();
                }, this.snackBarDuration)
                  resolve(0);
                }
              );
          }, 0)
        })
        //else wenn nicht alle eingaben korrekt sind
      } else {
        this.openFailedAddMovieDialog();
      }
    }
    return;
  }
  //Liest alle Input Felder aus
  getInputField(): Movie{
    let genreString = this.selectedGenres.toString()
    this.movieForBackend = {
      id: this.movie.id,
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
      trailerLink: "\"" + this.enteredLink + "\"",
      active: this.currentActive
    }
    return this.movieForBackend
  }
  //Eingabe Felder zurücksetzen
  clearInputFields() {
    this.enteredTitle = "";
    this.selectedFSK = -1;
    this.selectedDate = new Date;
    this.selectedGenres = [];
    this.enteredCast = "";
    this.enteredRegie = "";
    this.enteredDescription = "";
    this.enteredStudio = "";
    this.enteredduration = "";
    this.enteredTitle = "";
    this.enteredLink = "";
  }
  //Überprüft die eingegebenen Werte
  //Für die Zukunft noch den Link überprüfen lassen und weitere logische Überprüfungen
  inputsAreCorrect() {
    let areCorret: boolean = false;
    if (this.enteredTitle != "" &&
      this.enteredduration.match(/^[0-9]+$/) != null &&//nur zahlen eingegeben
      this.enteredduration != "" &&
      this.selectedFSK != -1 &&
      this.enteredDescription != "" &&
      this.selectedGenres.length != 0 &&
      this.enteredStudio != "" &&
      this.enteredRegie != "" &&
      this.enteredCast != "" &&
      this.enteredLink != ""
    ) {
      areCorret = true;
      this.durationAsNumber = Number(this.enteredduration);
    }
    return areCorret;
  }
  //Snackbar für falsche Eingaben -> Ausgelagert für Wiederverwendung
  openFailedAddMovieDialog() {
    this._snackBar.open("Falsche Eingabe", "okay");
  }
  //Zeigt das ausgewählte Bild an
  onChangeImage(e: any): void {
    if (e.target.files) {
      var reader = new FileReader;
      this.selectedFile = <File>e.target.files[0];
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }

/*----------------------------------------------------------------------------------------------------------------------
--------------------------------------Methoden für Genre Chip List -----------------------------------------------------
------------------------------------------------------------------------------------------------------------------------*/
  remove(fruit: string): void {
    const index = this.selectedGenres.indexOf(fruit);
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    }
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.selectedGenres.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.genreCtrl.setValue(null);
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedGenres.push(event.option.viewValue);
    //Soll den eingegebnen Wert zurücksetzen, wenn ein vorgeschlagener Wert ausgewählt wird
    //this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }
}
