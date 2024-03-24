import { itemCoordsSelector } from './../../../store/Items/selectors';
import React, { useState } from 'react'
import { getItemsByIds } from '../../../api/userApi'
import { useSelector } from 'react-redux';
import { Item } from '../../../store/user/slice';

export const useMap = () => {
    const itemCoords = useSelector(itemCoordsSelector)
    const [selectedItem, setSelectedItem] = useState<Item>()

    const fetchItemData = async (itemId: string, distance: number) => {
        const res = await getItemsByIds([itemId])
        const item = res.data.items[0]
        setSelectedItem({...item, distance})
    }

    return {fetchItemData, selectedItem, setSelectedItem}
}
