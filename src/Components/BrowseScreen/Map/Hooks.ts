import { itemCoordsSelector } from './../../../store/Items/selectors';
import React, { useRef, useState } from 'react'
import { getItemsByIds } from '../../../api/userApi'
import { useSelector } from 'react-redux';
import { Item } from '../../../store/user/slice';
import { Animated } from 'react-native';

export const useMap = () => {
    const itemCoords = useSelector(itemCoordsSelector)
    const [selectedItem, setSelectedItem] = useState<Item>()
    const markerScales = useRef<{[key: string]: Animated.Value}>({});

    const onMarkerPress = async (itemId: string, distance: number) => {
        const scale = markerScales.current[itemId];
        
        Animated.timing(scale, {
        toValue: 1.25,
        duration: 100,
        useNativeDriver: true,
        }).start(() => {
        Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start()
        })

        const res = await getItemsByIds([itemId])
        const item = res.data.items[0]
        setSelectedItem({...item, distance})
    }

    return {onMarkerPress, selectedItem, setSelectedItem, markerScales}
}
