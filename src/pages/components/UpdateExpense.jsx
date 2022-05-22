import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../actions';
import { Pen } from 'phosphor-react';

const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class UpdateExpenses extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const { getUpdateObj } = this.props;
    this.setState({
      value: getUpdateObj.value,
      currency: getUpdateObj.currency,
      method: getUpdateObj.method,
      tag: getUpdateObj.tag,
      description: getUpdateObj.description,
    });
  }

  updateExpenses = () => {
    const { getUpdateObj, updateAll } = this.props;
    const newExpense = { ...getUpdateObj, ...this.state };
    updateAll(newExpense);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { getCurrencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expense = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return(
      <form className="mt-16 flex justify-evenly h-28 items-center border-2 rounded-lg bg-white text-zinc-900 transition-all">
        <label htmlFor="valor">
          Valor:
          <input
            data-testid="value-input"
            className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            className="appearance-none block w-full h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            className="appearance-none block text-xs w-20 h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            data-testid="currency-input"
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
            className="appearance-none block text-xs w-40 h-10 bg-gray-200 text-gray-700 border-indigo-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          className="pl-4"
          onClick={ () => {
            this.updateExpenses();
            this.setState({ value: '' });
          } }
        >
          <Pen size={24} color="#262626" />
        </button>
      </form>
      );
    }
  }

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
  getUpdateObj: state.wallet.updateAll,
});

const mapDispatchToProps = (dispatch) => ({
  updateAll: (item) => dispatch(update(item)),
});

UpdateExpenses.propTypes = {
  getCurrencies: propTypes.arrayOf(propTypes.string).isRequired,
  getUpdateObj: propTypes.shape(propTypes.any).isRequired,
  updateAll: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExpenses);
