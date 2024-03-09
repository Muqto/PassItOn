import { store } from "./src/store/store"
import { Provider } from 'react-redux'
import AppWrapped from './src/AppWrapped';

export default function TabOneScreen() {

  return (
    <Provider store={store}>
      <AppWrapped/>
    </Provider>
  );
}
