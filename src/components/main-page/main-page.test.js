import React from 'react';
import renderer from 'react-test-renderer';
import MainPage from './main-page.jsx';

const mock = [
  {
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  },
  {
    title: `Beautiful & luxurious apartment at great location`,
    img: `img/apartment-01.jpg`,
    isPremium: true,
    price: 120,
    stars: 4,
    type: `Apartment`,
    isInBookmarks: false,
  }
];

describe(`MainPage`, () => {
  it(`renders correctly`, () => {
    const page = renderer.create(
        <MainPage
          rentalOffers={mock}
          onOfferTitleClick={jest.fn()}
        />
    ).toJSON();

    expect(page).toMatchSnapshot();
  });
});
