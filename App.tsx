import { store } from "./src/store/store"
import { Provider } from 'react-redux'
import RootNavigation from "./src/Stacks/rootNavigation";
import {Provider as PaperProvider} from 'react-native-paper';

export default function TabOneScreen() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigation/>
      </PaperProvider>
    </Provider>
  );
}