import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeExpenses } from '../../actions';

class Table extends React.Component {
  render() {
    const { expensesReturn, remove } = this.props;
    console.log(expensesReturn);
    return (
      <table>
        <tbody>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
          {
            expensesReturn.length > 0 && expensesReturn.map((item) => {
              const converted = Number(item
                .value) * Number(item
                .exchangeRates[item.currency].ask);
              return (
                <tr key={ item.id }>
                  <td>{ item.description }</td>
                  <td>{ item.tag }</td>
                  <td>{ item.method }</td>
                  <td>{ Number(item.value).toFixed(2) }</td>
                  <td>{ item.exchangeRates[item.currency].name }</td>
                  <td>
                    {
                      Number(item.exchangeRates[item.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>{ converted.toFixed(2).toString() }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => remove(item.id) }
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expensesReturn: propTypes.arrayOf(propTypes.any).isRequired,
  remove: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expensesReturn: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExpenses(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
