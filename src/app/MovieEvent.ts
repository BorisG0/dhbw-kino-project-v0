import { Time } from "@angular/common";

export interface MovieEvent{
    id: number;
    date: Date;
    time: Time;
    movieId: number;
    roomId: number;
    weekDay: string;
}