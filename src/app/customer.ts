import { User } from "./user";
export interface Customer extends User {
    userType: string
    mailAdress: string;
    lastName: string;
    firstName: string;
    birthDate: Date;
    postalCode: number;
    houseNumber: number;
    location: string;
    street: string;
    countryCode: string;
    mobileNumber: String;
    password: string;

}