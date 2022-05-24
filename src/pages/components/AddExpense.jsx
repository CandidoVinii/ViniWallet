import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getExpenses } from '../../actions';
import { FirstAid } from 'phosphor-react';

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
      <form className="mt-16 flex justify-evenly h-28 items-center hover:bg-gray-100 border-2 rounded-lg bg-white text-zinc-900 transition-all shadow-lg hover:shadow-xl">
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            name="value"
            value={ value }
            min="0"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="Moeda">
          Moeda:
          <select
            name="currency"
            className="appearance-none block text-xs w-20 h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            className="appearance-none block text-xs w-full h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            className="appearance-none block text-xs w-40 h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          className="mt-2 bg-indigo-600 hover:bg-indigo-900 transition-all hover:shadow-2xl w-10 h-10 flex justify-center items-center rounded"
          onClick={ this.handleClick }
        >
          <FirstAid size={28} color="#ffff" weight="thin" />
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
