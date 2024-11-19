import React, { useRef } from 'react';
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';
import { Animated, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';
import ClusterMapView from 'react-native-map-clustering';
import { colors } from '../../../Colors/Colors';
import { useSelector } from 'react-redux';
import { locationSelector, userSelector } from '../../../store/user/selectors';
import { itemCoordsSelector } from '../../../store/Items/selectors';
import { faBell, faGift, faSyncAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SelectedCard } from './SelectedCard/SelectedCard';
import { useMap } from './Hooks';
import { LatLng } from 'react-native-maps';


export default function MapComponent() {
    const location = useSelector(locationSelector)
    const user = useSelector(userSelector)
    const itemsCoords = useSelector(itemCoordsSelector).filter(item => 
      item.transactionStatus === 0 && item.userId !== user._id
    );
    const { onMarkerPress, selectedItem, markerScales, refreshMap } = useMap();

    const mapRef = useRef<ClusterMapView>(null);

    // Function to center the map on the user's current location
    const goToUserLocation = () => {
      if (mapRef.current) {
          mapRef.current.animateToRegion({
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
          }, 1000); // Animation duration in milliseconds
      }
  }

    return (
      <View style={styles.container}>
            { selectedItem && <SelectedCard 
              imageDownloadUrl={selectedItem.imageDownloadUrl}
              itemId={selectedItem._id} 
              itemName={selectedItem.itemName} 
              itemType={selectedItem.itemType} 
              distance={selectedItem.distance} 
            />}
            <ClusterMapView 
                ref={mapRef}
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
              {
              itemsCoords.map((item, i) => {
                if (!markerScales.current[item._id]) {
                  markerScales.current[item._id] = new Animated.Value(1);
              }
              
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

            {/* Location Button */}
            <TouchableOpacity style={styles.locationButton} onPress={goToUserLocation}>
                <FontAwesomeIcon icon={faLocationArrow} size={24} color={colors.primaryPurple} />
            </TouchableOpacity>

            {/* Refresh Button */}
            <TouchableOpacity style={styles.refreshButton} onPress={refreshMap}>
                <FontAwesomeIcon icon={faSyncAlt} size={24} color={colors.primaryPurple} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationButton: {
    position: 'absolute',
    bottom: 240, // Positioned above the refresh button; adjust as needed
    right: 20,    // Adjust as needed
    backgroundColor: colors.ultraLightPurple,
    padding: 10,
    borderRadius: 30,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  refreshButton: {
    position: 'absolute',
    bottom: 180, // Adjust as needed
    right: 20,  // Adjust as needed
    backgroundColor: colors.ultraLightPurple,
    padding: 10,
    borderRadius: 30,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
