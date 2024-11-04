import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE} from 'react-native-maps';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import ClusterMapView from 'react-native-map-clustering';
import { colors } from '../../../Colors/Colors';
import { useSelector } from 'react-redux';
import { locationSelector } from '../../../store/user/selectors';
import { itemCoordsSelector } from '../../../store/Items/selectors';
import { faBell, faGift} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectedCard } from './SelectedCard/SelectedCard';
import { useMap } from './Hooks';


export default function MapComponent() {
    const location = useSelector(locationSelector)
    const itemsCoords = useSelector(itemCoordsSelector)
    const {onMarkerPress, selectedItem, markerScales} = useMap()

    const randomCoords = (n: number) => {
      const loc =  {latitude: 37.4219983, latitudeDelta: 0.01, longitude: -122.084, longitudeDelta: 0.01}
      return new Array(n).fill(0).map((x, i) => (
          {
            latitude: loc.latitude + 3 * (Math.random() - 0.5) * loc.latitudeDelta,
            longitude: loc.longitude + 3 * (Math.random() - 0.5) * loc.longitudeDelta
          }
      ));
    }
 
    return (
        <View style={styles.container}>
            { selectedItem && <SelectedCard 
              itemName={selectedItem.itemName} 
              itemType={selectedItem.itemType} 
              distance={selectedItem.distance} 
            />}
            <ClusterMapView 
                moveOnMarkerPress={false}
                style={styles.map} 
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                region={location}
                showsUserLocation
                showsMyLocationButton
                minPoints={5}
                clusterColor={colors.primaryPurple}
                mapPadding={{top:15, right:0, left:0, bottom:0}}
                radius={25}
            >
            {itemsCoords.map((item, i) => {
              markerScales.current[item._id] = new Animated.Value(1);
              return  <Marker 
                        key={`${item.location.latitude}_${item.location.longitude}_${i}`} 
                        coordinate={item.location}
                        tracksViewChanges={true} 
                        onPress={() => onMarkerPress(item._id, item.distance)}
                        >
                        <Animated.View
                          style={{
                          padding: 10,
                          transform: [{ scale: markerScales.current[item._id],  }],
                        }}>
                          <FontAwesomeIcon  
                              icon={ item.isRequest ? faBell : faGift } 
                              size={20} 
                              color={item._id === selectedItem?._id ? 
                                colors.selectedMarker:
                                item.isRequest ? '#EE6B6B' : colors.primaryPurple}>
                              
                            </FontAwesomeIcon> 
                        </Animated.View>
                      </Marker>
            })}
            </ClusterMapView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
