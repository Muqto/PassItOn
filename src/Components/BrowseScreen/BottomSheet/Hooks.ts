import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getItemsByIds } from "../../../api/userApi";
import { itemCoordsSelector } from "../../../store/Items/selectors";
import { Item } from "../../../store/user/slice";
import { ItemCoord } from "../../../store/Items/slice";
import { userSelector } from "../../../store/user/selectors";

export const useBottomSheet = () => {
  const snapPoints = useMemo(() => ["20%", "50%", "80%"], []);
  const itemsCoords = useSelector(itemCoordsSelector);
  const [donations, setDonations] = useState<Item[]>([]); // Initialize as empty array
  const [startIndexDon, setStartIndexDon] = useState<number>(0);
  const [isDonLoading, setIsDonLoading] = useState<boolean>(false); // Start as false
  const [hasMoreDon, setHasMoreDon] = useState<boolean>(true); // New flag to indicate more data
  const user = useSelector(userSelector);
  const donCoords = itemsCoords.filter(
    (item) =>
      item.transactionStatus === 0 &&
      item.userId !== user._id &&
      !item.isRequest
  );

  const loadDonations = useCallback(async () => {

    if (isDonLoading || !hasMoreDon) {
      return; // Prevent multiple simultaneous fetches or fetching when no more data
    }

    if (startIndexDon >= donCoords.length) {
      setHasMoreDon(false); // No more data to load
      return;
    }

    setIsDonLoading(true);
    try {
      const pageOfItemIds = donCoords.slice(startIndexDon, startIndexDon + 10);
      const itemIds = pageOfItemIds.map((item) => item._id);
      const res = await getItemsByIds(itemIds);
      const data = res.data.items.map((item, i) => ({
        ...item,
        distance: donCoords[startIndexDon + i]?.distance || 0,
      }));

      console.log(
        `Loading donations: startIndexDon=${startIndexDon}, hasMoreDon=${hasMoreDon}`
      );
      console.log("Fetched page of item IDs:", itemIds);
      console.log("Fetched donations data:", data);

      // setDonations((prevDonations) => [...prevDonations, ...data]);
      setDonations([...data]); // Replaces existing donations
      setStartIndexDon((prevIndex) => prevIndex + 10);

      // If fewer items were fetched than requested, assume no more data
      if (data.length < 10) {
        setHasMoreDon(false);
      }

    } catch (error) {
      console.error("Error loading donations:", error);
      // Optionally, handle the error (e.g., show a toast message)
    } finally {
      setIsDonLoading(false);
    }
  }, [isDonLoading, hasMoreDon, startIndexDon, donCoords]);

  useEffect(() => {
    // Load initial donations
    loadDonations();
  }, [loadDonations]);

  return {
    snapPoints,
    donations,
    isDonLoading,
    loadDonations,
    hasMoreDon, // Expose if needed elsewhere
  };
};
