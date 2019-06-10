import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';
import {BrowserRouter} from 'react-router-dom';
import reducer from './reducers/index';
import {Operation, ActionCreator} from './reducers/data/data';
import {Operation as UserOperation} from './reducers/user/user';
import {getOffers} from './reducers/data/selectors';
import {createAPI} from './api';
import App from './components/app/app.jsx';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a)
  );

  // TODO
  const getRandomOffer = (offers) => {
    const min = 0;
    const max = Math.floor(offers.length);
    return offers[Math.floor(Math.random() * (max - min)) + min];
  };

  store.dispatch(UserOperation.checkAuthorization());
  store.dispatch(Operation.loadOffers())
    .then(() => {
      const currentState = store.getState();
      const offer = getRandomOffer(getOffers(currentState));

      if (offer) {
        store.dispatch(ActionCreator.changeTown(offer.city));
      }
    });

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
