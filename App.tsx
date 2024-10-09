import { store } from "./src/store/store"
import { Provider } from 'react-redux'
import RootNavigation from "./src/Stacks/rootNavigation";
import {Provider as PaperProvider} from 'react-native-paper';
import DonationFocus from './src/Components/BrowseScreen/DonationFocus/Donation';
import { Item } from './src/store/user/slice';

export default function TabOneScreen() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigation/>
      </PaperProvider>
    </Provider>
  );
}

// const sampleItem: Item = {
//   _id: "1",
//   itemName: "Sample Item",
//   itemType: "Electronics",
//   distance: 10,
//   description: "A sample electronic item for testing.",
//   postedTime: "2023-10-01",
//   expirationTime: "2023-12-01",
//   itemStatus: 0,
//   isRequest: false,
//   location: {
//     latitude: 37.7749,
//     longitude: -122.4194,
//     latitudeDelta: 0.01,
//     longitudeDelta: 0.01,
//   },
//   reservationInfo: {
//     userId: "user123",
//     isReserved: false,
//     startTime: "2023-10-01",
//     expirationTime: "2023-12-01",
//     pickUpDate: "2023-11-01",
//   },
//   imageDownloadUrl: "https://via.placeholder.com/150",
//   pickupTimes: ["2023-11-01T10:00:00Z"],
//   pickupLocationText: "123 Main Street",
// };

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PaperProvider>
//         <DonationFocus item={sampleItem} />
//       </PaperProvider>
//     </Provider>
//   );
// }
