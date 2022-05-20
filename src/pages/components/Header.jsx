import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'BRL',
    };
  }

  render() {
    const { currency } = this.state;
    const { emailUser, total } = this.props;
    console.log(total);
    return (
      <header>
        <h1>TRYBEWALLET</h1>
        <p data-testid="email-field">
          { emailUser }
        </p>
        <p data-testid="total-field">
          { total.toFixed(2) }
        </p>
        <p data-testid="header-currency-field">
          { currency }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  total: state.wallet.expenses
    .reduce((acc, curr) => {
      acc += curr.value * Number(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0),
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
