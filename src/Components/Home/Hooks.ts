import { useSelector } from "react-redux"
import { userDonationsSelector } from "../../store/user/selectors"
import { userReservationsSelector } from "../../store/user/selectors";
import { DonationProps, ReservationProps } from "./Types"

export const useHome = () => {
    const donations = useSelector(userDonationsSelector)
    const donationCardProps = donations
    .filter((item) => item.reservationInfo.transactionStatus === 0 || item.reservationInfo.transactionStatus === 1)
    .map((item) => {
        const {_id, itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText, reservationInfo} = item
        const prop: DonationProps = {itemId: _id, itemName, expirationTime, itemType, imageDownloadUrl, description, itemStatus, location, pickupLocationText, reservationInfo}
        return prop
    })

    return {donationCardProps}
}

export const useHomeReservations = () => {
    const reservations = useSelector(userReservationsSelector);
    const reservationCardProps = reservations.filter((reservation) => reservation.transactionStatus !== 3).map((reservation) => {
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