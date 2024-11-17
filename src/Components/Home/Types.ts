import { LatLng } from "react-native-maps"
import { Reservation } from "../../store/user/slice"

export type HomeProps = {
    userId: string,
    firstName: string,
    lastName: string
}

export type DonationProps = {
    itemId: string,
    itemName: string,
    expirationTime: string,
    itemType: string,
    description: string,
    itemStatus: number,
    location?: LatLng,
    pickupLocationText: string | undefined,
    userId: string,
    fullName?: string,
    imageDownloadUrl: string | undefined,
    reservationInfo: Reservation
}

export type ReservationProps = {
    _id: string;
    userId: string;
    isReserved: Boolean;
    startTime: String;
    expirationTime: String;
    pickUpDate: String;
    itemId: any;
    transactionStatus?: Number;
};