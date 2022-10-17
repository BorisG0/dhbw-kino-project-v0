export interface Movie {
    id: number;
    title: string;
    duration: number;
    ageRestriction: number;
    //imageName: string;
    image: File;
    description: string;
    genre: string;
    startDate: Date;
    movieStudio: string;
    regie: string;
    cast: string;
    trailerLink: string;
    
    //studio: string;
    //discription: string;
    //cast: string;
}