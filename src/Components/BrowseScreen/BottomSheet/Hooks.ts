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
  const [donations, setDonations] = useState<Item[]>();
  const [startIndexDon, setStartIndexDon] = useState<number>(0);
  const [isDonLoading, setIsDonLoading] = useState<boolean>(true);
  const user = useSelector(userSelector);
  const donCoords = itemsCoords.filter((item) => item.transactionStatus === 0 && item.userId !== user._id && !item.isRequest);
  const loadDonations = async () => {
    if (startIndexDon > donCoords.length) {
      // all items already loaded
      return;
    }
    setIsDonLoading(true);
    let pageOfItemIds = donCoords.slice(startIndexDon, startIndexDon + 10);
    let itemIds = pageOfItemIds.map((item) => item._id);
    let res = await getItemsByIds(itemIds);
    let data = res.data.items.map((item, i) => {
      return { ...item, distance: donCoords[startIndexDon + i].distance };
    })
    donations ? setDonations([...donations, ...data]) : setDonations([...data]);
    setStartIndexDon(startIndexDon + 10);
    setIsDonLoading(false);
  };

  
  useEffect(() => {
    // load 10 initially
    loadDonations();
  }, []);

  return {
    snapPoints,
    donations,
    isDonLoading,
    loadDonations,
  };
};
