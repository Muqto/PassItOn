import { useSelector } from "react-redux"
import { userDonationsSelector, userSelector } from "../../store/user/selectors"
import { DonationProps } from "./Types"

export const useHome = () => {
    const donations = useSelector(userDonationsSelector)

    const donationCardProps = donations.map((item) => {
        console.log(item)
        return item
    })

    return {donationCardProps}
}