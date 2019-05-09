import React from 'react';
import PropTypes from 'prop-types';
import OfferCard from '../offer-card/offer-card.jsx';

class OffersList extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
    };
  }

  render() {
    const {rentalOffers, onOfferTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {rentalOffers.map((offer, idx) => (
          <OfferCard
            offer={offer}
            onTitleClick={onOfferTitleClick}
            key={idx}
            onMouseOver={() => {
              this.setState({activeOffer: offer});
            }}
            onMouseOut={() => {
              this.setState({activeOffer: null});
            }}
          />
        ))}
      </div>
    );
  }
}

OffersList.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    img: PropTypes.string,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
    stars: PropTypes.number,
    type: PropTypes.string,
    isInBookmarks: PropTypes.bool,
  })).isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
};

export default OffersList;
