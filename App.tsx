import { store } from "./src/store/store"
import { Provider } from 'react-redux'
import RootNavigation from "./src/Stacks/rootNavigation";

export default function TabOneScreen() {

  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
}
