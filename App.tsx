import { store } from "./src/store/store"
import { Provider } from 'react-redux'
import RootNavigation from "./src/Stacks/rootNavigation";
import {Provider as PaperProvider} from 'react-native-paper';
import { LogBox } from 'react-native';
export default function TabOneScreen() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigation/>
      </PaperProvider>
    </Provider>
  );
}
