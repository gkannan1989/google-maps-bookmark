import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import placesReducer from '../ducks/places/reducers';

const appPersistConfig = {
  key: 'places',
  storage,
};

const rootReducer = {
  places: persistReducer(appPersistConfig, placesReducer),
};
export default rootReducer;
