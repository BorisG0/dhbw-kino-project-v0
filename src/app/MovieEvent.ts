import { Time } from "@angular/common";

export interface MovieEvent{
    id: number;
    date: Date;
    time: number;
    movieId: number;
    roomId: number;
    weekDay: string;
}