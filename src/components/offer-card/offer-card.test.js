import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';

const mock = {
  id: 123,
  title: `Beautiful & luxurious apartment at great location`,
  img: `img/apartment-01.jpg`,
  isPremium: true,
  price: 120,
  stars: 4,
  type: `Apartment`,
  isInBookmarks: false,
  coordinates: [52.3909553943508, 4.929309666406198],
  town: {
    name: `Amsterdam`,
    coordinates: [52.38333, 4.9],
  },
};

describe(`OfferCard`, () => {
  it(`renders correctly`, () => {
    const onTitleClickHandler = jest.fn();
    const onImageClickHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseLeaveHandler = jest.fn();

    const card = renderer.create(
        <OfferCard
          activeItem={1}
          offer={mock}
          onOfferTitleClick={onTitleClickHandler}
          onOfferImgClick={onImageClickHandler}
          onMouseOver={mouseOverHandler}
          onMouseOut={mouseLeaveHandler}
        />
    ).toJSON();

    expect(card).toMatchSnapshot();
  });
});
