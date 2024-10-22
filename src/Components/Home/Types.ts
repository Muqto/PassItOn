import { LatLng } from "react-native-maps"

export type HomeProps = {
    userId: string,
    firstName: string,
    lastName: string
}

export type DonationProps = {
    itemName: string,
    expirationTime: string,
    itemType: string,
    description: string,
    itemStatus: number,
    location: LatLng,
    userId: string,
    fullName: string
}
