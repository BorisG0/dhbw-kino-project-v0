import { Time } from "@angular/common";

export interface MovieEventForBackend{
    id: number;
    date: Date;
    time: string;
    movieId: number;
    roomId: number;
}