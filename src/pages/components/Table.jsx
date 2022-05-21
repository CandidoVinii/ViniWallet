import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { edit, removeExpenses } from '../../actions';
import { Pen, Trash, LineSegment } from 'phosphor-react';


class Table extends React.Component {
  render() {
    const { expensesReturn, remove, updateExpense } = this.props;
    console.log(expensesReturn);
    return (
      <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Método de pagamento
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Moeda
              </th>
              <th scope="col" className="px-6 py-3">
                Câmbio utilizado
              </th>
              <th scope="col" className="px-6 py-3">
                Valor convertido
              </th>
              <th scope="col" className="px-6 py-3">
                Moeda de conversão
              </th>
              <th scope="col" className="px-6 py-3">
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody className="bg-white border-b text-center hover:bg-gray-300 transition-colors hover:text-zinc-900 dark:bg-gray-800 dark:border-gray-700" >
            {
              expensesReturn.length > 0 && expensesReturn.map((item) => {
                const converted = Number(item
                  .value) * Number(item
                  .exchangeRates[item.currency].ask);
                return (
                  <tr
                    className="dark:text-white hover:dark:text-zinc-900 transition-colors bg-white border-b text-center hover:bg-gray-300 hover:text-zinc-900 dark:bg-gray-800 dark:border-gray-700" 
                    key={ item.id }
                  >
                    <td scope="row" className="px-6 py-4 font-medium  whitespace-nowrap">{ item.description }</td>
                    <td scope="col" className="px-6 py-3">{ item.tag }</td>
                    <td scope="col" className="px-6 py-3">{ item.method }</td>
                    <td scope="col" className="px-6 py-3">{`${ item.exchangeRates[item.currency].code }: ${ (Number(item.value).toFixed(2)) }`}</td>
                    <td scope="col" className="px-6 py-3">{ item.exchangeRates[item.currency].name }</td>
                    <td scope="col" className="px-6 py-3">
                      {
                        Number(item.exchangeRates[item.currency].ask).toFixed(2)
                      }
                    </td>
                    <td scope="col" className="px-6 py-3">{ converted.toFixed(2).toString() }</td>
                    <td scope="col" className="px-6 py-3">{ item.exchangeRates[item.currency].codein }</td>
                    <td scope="col" className="px-6 py-3">
                      <button
                        type="button"
                        className="pr-4"
                        data-testid="edit-btn"
                        onClick={ () => updateExpense(item) }
                      >
                        <Pen size={24} className="text-zinc-900" />
                      </button>
                      <button
                        type="button"
                        className="pl-4"
                        data-testid="delete-btn"
                        onClick={ () => remove(item.id) }
                      >
                        <Trash size={24} className="text-zinc-900" />
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expensesReturn: propTypes.arrayOf(propTypes.any).isRequired,
  remove: propTypes.func.isRequired,
  updateExpense: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expensesReturn: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExpenses(id)),
  updateExpense: (item) => dispatch(edit(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
