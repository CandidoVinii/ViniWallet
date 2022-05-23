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
    const { emailUser, total, totalLenght } = this.props;
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
        <div>
          <div className="flex items-center">
            <Money size={34} />
              <p data-testid="header-currency-field">
               {`R$ ${ total.toFixed(2) }`} 
              </p>
          </div>
            { totalLenght.length >= 0 && totalLenght.length <= 1  ? <span>{`Você tem ${totalLenght.length} despesa`}</span>
            : <span>{`Você tem ${totalLenght.length} despesas`}</span>
            }

        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailUser: state.user.email,
  totalLenght: state.wallet.expenses,
  total: state.wallet.expenses
    .reduce((acc, curr) => {
      acc += curr.value * Number(curr.exchangeRates[curr.currency].ask);
      return acc;
    }, 0),
});

Header.propTypes = {
  emailUser: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  totalLenght: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
