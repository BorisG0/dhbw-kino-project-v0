import { Time } from "@angular/common";

export interface MovieEvent{
    id: number;
    date: Date;
    time: string;
    movieId: number;
    roomId: number;
    weekDay: string;
}