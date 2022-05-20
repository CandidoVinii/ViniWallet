import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses } from '../../actions';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};
class AddExpense extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  clearState = () => (this.setState({ ...INITIAL_STATE }));

  handleClick = () => {
    const { addExpense } = this.props;
    this.clearState();
    addExpense(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { getCurrencies } = this.props;
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expense = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:
          <select
            name="currency"
            id="Moeda"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              getCurrencies.map((coin, i) => (
                <option value={ coin } key={ i }>{coin}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {
              payment.map((pay, i) => (
                <option value={ pay } key={ i }>{pay}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {
              expense.map((categorie, i) => (
                <option value={ categorie } key={ i }>{categorie}</option>
              ))
            }
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (state) => {
    dispatch(getExpenses(state));
  },
});

AddExpense.propTypes = {
  getCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);
