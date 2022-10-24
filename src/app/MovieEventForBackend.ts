import { Time } from "@angular/common";

export interface MovieEventForBackend{
    id: number;
    date: Date;
    time: number;
    movieId: number;
    roomId: number;
}