export interface Movie {
    id: number;
    title: string;
    duration: number;
    ageRestriction: number;
    imageName: string;
    description: string;
    genre: string;
    startDate: Date;
    movieStudio: string;
    regie: string;
    cast: string;
    trailerLink: string;
    active : boolean;
    
    //studio: string;
    //discription: string;
    //cast: string;
}