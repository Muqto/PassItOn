import { useRef, useState } from 'react';
import { getItemsByIds, getItemsCoord } from '../../../api/userApi';
import { useSelector, useDispatch } from 'react-redux';
import { Animated } from 'react-native';
import { LatLng } from 'react-native-maps';

import { Item } from '../../../store/user/slice';
import { userSelector, locationSelector } from './../../../store/user/selectors';
import { clearItemsCoordsAction, addItemsCoordsAction } from '../../../store/Items/slice';


export const useMap = () => {
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState<Item>();
    const markerScales = useRef<{[key: string]: Animated.Value}>({});
    const user = useSelector(userSelector);
    const location = useSelector(locationSelector);

    const onMarkerPress = async (itemId: string, distance: number) => {
        const scale = markerScales.current[itemId];
        //its bugging out so i removed the animation
        // Animated.timing(scale, {
        // toValue: 1.1,
        // duration: 100,
        // useNativeDriver: true,
        // }).start(() => {
        // Animated.timing(scale, {
        //     toValue: 1,
        //     duration: 50,
        //     useNativeDriver: true,
        // }).start()
        // })

        const res = await getItemsByIds([itemId]);
        const item = res.data.items[0];
        setSelectedItem({...item, distance});
    }

    const refreshMap = async () => {
        try {
            // Dispatch action to clear existing itemsCoords
            dispatch(clearItemsCoordsAction());

            // Fetch new itemsCoords based on current location
            const currentLocation: LatLng = {
                latitude: location.latitude,
                longitude: location.longitude
            };
            const res = await getItemsCoord(currentLocation);
            const newItemsCoords = res.data.itemsCoords;

            // Dispatch action to add new itemsCoords
            dispatch(addItemsCoordsAction(newItemsCoords));
        } catch (error) {
            console.error("Error refreshing map:", error);
        }
    }

    return { onMarkerPress, selectedItem, setSelectedItem, markerScales, refreshMap };
}
