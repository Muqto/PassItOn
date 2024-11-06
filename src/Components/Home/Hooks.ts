import { useSelector } from "react-redux"
import { userDonationsSelector } from "../../store/user/selectors"
import { DonationProps } from "./Types"

export const useHome = () => {
    const donations = useSelector(userDonationsSelector)
    const donationCardProps = donations.map((item) => {
        const {_id, itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText} = item
        const prop: DonationProps = {itemId: _id, itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText}
        return prop
    })

    return {donationCardProps}
}