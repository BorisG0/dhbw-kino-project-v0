export interface SeatInEvent{
    row: string;
    numberInRow: number;
    status: number;     // 0 = free, 1 = occupied, 2 = reserved
    seatId: number;
    eventId: number;
}