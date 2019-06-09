import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import TownsList from '../towns-list/towns-list.jsx';
import withActiveItem from '../../hocs/with-active-item.jsx';
import withTransformProps from '../../hocs/with-transform-props.jsx';

// const WrappedTownsList = withActiveItem(
//     withTransformProps((props) => Object.assign({}, props, {
//       currentTown: props.currentItem,
//       onTownClick: props.setActiveItem
//     }))(TownsList)
// );

const WrappedOffersList = withActiveItem(
    withTransformProps((props) => Object.assign({}, props, {
      setActiveItem: props.setActiveItem,
    }))(OffersList)
);

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOfferId: null,
    };
  }

  render() {
    const {rentalOffers, onTownClick, currentTown, cityOffers, isAuthorizationRequired} = this.props;
    console.log(currentTown);
    console.log(cityOffers);

    return (
      <>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-arrow-select" viewBox="0 0 7 4">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"/>
            </symbol>
            <symbol id="icon-bookmark" viewBox="0 0 17 18">
              <path
                d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
            </symbol>
            <symbol id="icon-star" viewBox="0 0 13 12">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
              />
            </symbol>
          </svg>
        </div>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width="81"
                    height="41"
                  />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {isAuthorizationRequired
                        ?
                        <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                        :
                        <span className="header__login">Sign in</span>
                      }
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <TownsList
            offers={rentalOffers}
            currentTown={currentTown.name}
            onTownClick={onTownClick}
          />
          <div className="cities__places-wrapper" style={{height: `100vh`}}>
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {`${cityOffers.length} ${cityOffers.length === 1 ? `place` : `places`} to stay in ${currentTown.name}`}
                </b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>
                </form>
                <WrappedOffersList
                  rentalOffers={cityOffers}
                  setActiveItem={this._handleActivePlaceCard.bind(this)}
                />
              </section>
              <div className="cities__right-section">
                {/*<Map*/}
                {/*  key={currentTown.name}*/}
                {/*  activeOfferId={this.state.activeOfferId}*/}
                {/*  cityOffers={cityOffers}*/}
                {/*/>*/}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  _handleActivePlaceCard(offerId) {
    this.setState((prevState) => {
      return Object.assign({}, prevState, {activeOfferId: offerId});
    });
  }
}

MainPage.propTypes = {
  rentalOffers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    [`preview_image`]: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    [`is_premium`]: PropTypes.bool,
    [`is_favorite`]: PropTypes.bool,
    bedrooms: PropTypes.number,
    goods: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.number,
    type: PropTypes.string,
    location: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      zoom: PropTypes.number,
    }),
    city: PropTypes.shape({
      name: PropTypes.string,
      location: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        zoom: PropTypes.number,
      }),
    }),
    host: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      [`is_pro`]: PropTypes.bool,
      [`avatar_url`]: PropTypes.string,
    }),
  })).isRequired,
  currentTown: PropTypes.string.isRequired,
  onTownClick: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  isAuthorizationRequired: PropTypes.bool,
};

export default MainPage;
