import React from 'react';
import PropTypes from 'prop-types';

const OfferCard = (props) => {
  const {offer, onOfferImgClick, onOfferTitleClick, onMouseOver, onMouseOut} = props;

  return (
    <article
      className="cities__place-card place-card"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#" onClick={onOfferImgClick}>
          <img
            className="place-card__image"
            src={offer.img}
            width="260"
            height="200"
            alt={offer.title}
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              `place-card__bookmark-button button 
              ${offer.isInBookmarks ? `place-card__bookmark-button--active` : ``}`
            }
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: (offer.stars * 10) * 2 + `%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#" onClick={onOfferTitleClick}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    img: PropTypes.string,
    isPremium: PropTypes.bool,
    price: PropTypes.number,
    stars: PropTypes.number,
    type: PropTypes.string,
    isInBookmarks: PropTypes.bool,
    coordinates: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  onOfferImgClick: PropTypes.func.isRequired,
  onOfferTitleClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default OfferCard;