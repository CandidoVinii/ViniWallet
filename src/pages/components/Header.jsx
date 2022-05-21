import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Wallet, User, Money } from 'phosphor-react';

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
      <header className="border-2 rounded-lg h-32 flex items-center justify-between">
        <div className="flex items-center ">
          <Wallet size={40} />
          <h1>ViniWallet</h1>
        </div>
        <div className="flex items-center">
          <User size={30} />
          <p
            data-testid="email-field"
            className=""
          >
            { emailUser }
          </p>
        </div>
        <div className="flex items-center">
          <Money size={34} />
          <p data-testid="total-field">
            <p data-testid="header-currency-field">
              { total.toFixed(2) } { currency }
            </p>
          </p>
        </div>
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
