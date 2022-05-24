import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Wallet, User, Money, GithubLogo, LinkedinLogo, InstagramLogo } from 'phosphor-react';

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
      <header className="border-2 rounded-lg w-screen shadow-lg h-32 grid grid-cols-3 items-center justify-center gap-x-96 bg-indigo-100 text-zinc-900">
          <div className="flex mt-8 items-center">
            <User size={30} />
            <p
              data-testid="email-field"
              className="z-10"
            >
              {emailUser}
            </p>
          </div>
          <div className="flex mt-8 items-center ">
            <Wallet size={40} />
            <h1 className="font-mono text-4xl">ViniWallet</h1>
          </div>
          <div className="mt-8">
            <div className="ml-14 flex items-center">
              <p data-testid="header-currency-field">
                {`R$ ${total.toFixed(2)}`}
              </p>
              <Money size={34} />
            </div>
            <div className="ml-8 ">
              {totalLenght.length === 1 ? <span>{`Você tem ${totalLenght.length} despesa`}</span>
                : <span>{`Você tem ${totalLenght.length} despesas`}</span>}
            </div>
          </div>
          <div className="flex justify-center -ml-1 w-screen">
            <a target="_blank" href="https://www.linkedin.com/in/vinicius-candido-749262110/">
              <LinkedinLogo size={28} color="#151414" weight="thin" />
            </a>
            <a target="_blank" href="https://github.com/CandidoVinii">
              <GithubLogo size={28} color="#151414" weight="thin" />
            </a>
            <a target="_blank" href="https://www.instagram.com/candido.vinii/">
              <InstagramLogo size={28} color="#151414" weight="thin" />
            </a>
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
