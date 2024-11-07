import { useSelector } from "react-redux"
import { userDonationsSelector } from "../../store/user/selectors"
import { userReservationsSelector } from "../../store/user/selectors";
import { DonationProps, ReservationProps } from "./Types"

export const useHome = () => {
    const donations = useSelector(userDonationsSelector)
    const donationCardProps = donations.map((item) => {
        const {itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText} = item
        const prop: DonationProps = {itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText}
        return prop
    })

    return {donationCardProps}
}

export const useHomeReservations = () => {
    const reservations = useSelector(userReservationsSelector);
    const reservationCardProps = reservations.map((reservation) => {
      const {
        _id,
        userId,
        isReserved,
        startTime,
        expirationTime,
        pickUpDate,
        itemId,
        transactionStatus
      } = reservation;
      const prop: ReservationProps = {
        _id,
        userId,
        isReserved,
        startTime,
        expirationTime,
        pickUpDate,
        itemId,
        transactionStatus
      };
      return prop;
    });
  
    return { reservationCardProps };
  };