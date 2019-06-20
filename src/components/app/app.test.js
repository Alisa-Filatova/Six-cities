import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';
import {App} from './app.jsx';

configure({adapter: new Adapter()});

const userMock = {
  avatarUrl: `/static/avatar/4.jpg`,
  email: `alicefill@y888.ru`,
  id: 1,
  isPro: false,
  name: `alicefill`,
};

describe(`App`, () => {
  it(`renders correctly`, () => {
    const app = shallow(
        <App
          location={`/`}
          isAuthenticated={true}
          cityOffers={[`Amsterdam`, `Paris`]}
          onCityClick={jest.fn()}
          pendingAuthorization={false}
          user={userMock}
        />
    );

    expect(shallowToJson(app)).toMatchSnapshot();
  });
});
