import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gastos: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { gastos, currency } = this.state;
    const { emailUser } = this.props;
    return (
      <header>
        <h1>TRYBEWALLET</h1>
        <p data-testid="email-field">
          { emailUser }
        </p>
        <p data-testid="total-field">
          { gastos }
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
  getCurrencies: state.wallet.currencies,
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
