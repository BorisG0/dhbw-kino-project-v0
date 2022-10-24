import { Ticket } from "./ticket";

export interface Booking{
    id: number;
    eventId: number;
    tickets: Ticket[];
}