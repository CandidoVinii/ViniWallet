import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddExpense extends React.Component {
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
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
            name="valor"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descricao">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="descricao"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="Moeda">
          Moeda
          <select
            name="Moeda"
            id="Moeda"
            onChange={ this.handleChange }
          >
            {
              getCurrencies.map((coin, i) => (
                <option value={ coin } key={ i }>{coin}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="paypal">
          Método de pagamento
          <select
            data-testid="method-input"
            name="paypal"
            onChange={ this.handleChange }
          >
            {
              payment.map((pay, i) => (
                <option value={ pay } key={ i }>{pay}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="categories">
          Categoria
          <select
            data-testid="tag-input"
            name="categories"
            onChange={ this.handleChange }
          >
            {
              expense.map((categorie, i) => (
                <option value={ categorie } key={ i }>{categorie}</option>
              ))
            }
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet.currencies,
});

AddExpense.propTypes = {
  getCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(AddExpense);
