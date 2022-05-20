import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getCurrencyAPI } from '../actions';
import AddExpense from './components/AddExpense';
import Header from './components/Header';
import Table from './components/Table';
import UpdateExpenses from './components/UpdateExpense';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { edit } = this.props;
    return (
      <div>
        <Header />
        { edit ? <UpdateExpenses /> : <AddExpense /> }
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(getCurrencyAPI()),
});

const mapStateToProps = (state) => ({
  edit: state.wallet.editing,
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
