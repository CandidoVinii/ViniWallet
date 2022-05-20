import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../actions';

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
          onClick={ () => {
            this.updateExpenses();
            this.setState({ value: '' });
          } }
        >
          Editar despesa
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
