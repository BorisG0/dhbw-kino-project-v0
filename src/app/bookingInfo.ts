import { Time } from "@angular/common";

export interface BookingInfo{
    id: number;
    pricePaid: number;
    seatPlaces: string[];

    movieTitle: string;
    date: Date;
    time: Time;
}