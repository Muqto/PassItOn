import { useSelector } from "react-redux"
import { userDonationsSelector, userSelector } from "../../store/user/selectors"
import { DonationProps } from "./Types"

export const useHome = () => {
    const donations = useSelector(userDonationsSelector)
    const donationCardProps = donations.map((item) => {
        const {itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location} = item
        const prop: DonationProps = {itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location}
        return prop
    })

    return {donationCardProps}
}