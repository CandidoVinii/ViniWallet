import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses } from '../../actions';
import { Plus } from 'phosphor-react';

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
      <form className="mt-16 flex justify-evenly h-28 items-center border-2 rounded-lg dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-400 hover:text-zinc-900 transition-all">
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            className="form-input text-zinc-900 rounded-lg focus:caret-indigo-500 transition-colors"
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
            className="form-input text-zinc-900 rounded-lg focus:caret-indigo-500 transition-colors"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:
          <select
            name="currency"
            className="form-select rounded-lg text-zinc-900"
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
            className="form-select rounded-lg text-zinc-900 w-fit"
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
            className="form-select rounded-lg text-zinc-900"
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
          className="pl-4"
          onClick={ this.handleClick }
        >
          <Plus size={32} color="#262626" />
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
