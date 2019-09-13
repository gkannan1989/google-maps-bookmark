import { all } from 'redux-saga/effects';
import placesSaga from '../ducks/places/saga';

export default function* rootSaga() {
  yield all([...placesSaga]);
}
