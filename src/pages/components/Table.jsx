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
      <div className="bg-white mt-6 shadow-lg hover:shadow-xl rounded-md overflow-hidden">
        <table className="table-flex table-auto w-full leading-normal" >
          <thead className="uppercase text-gray-600 text-xs font-semibold bg-gray-200">
            <tr className="text-center hidden md:table-row">
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
          <tbody className="flex-1 justify-center items-center text-gray-700 sm:flex-none">
            {
              expensesReturn.length > 0 && expensesReturn.map((item) => {
                const converted = (item.value) * Number(item.exchangeRates[item.currency].ask);
                
                return (
                  <tr
                  className="border-t first:border-t-0 flex justify-center items-center p-1 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap" 
                  key={ item.id }
                  >
                    <td scope="row" className="px-6 py-4 whitespace-nowrap text-base text-center text-gray-600 uppercase font-semibold">{ item.description }</td>
                    <td scope="col" className="px-6 text-center py-3 p-1">{ item.tag }</td>
                    <td scope="col" className="px-6 text-center py-3 p-1">{ item.method }</td>
                    <td scope="col" className="px-6 text-center py-3 p-1">{`${ item.exchangeRates[item.currency].code }: ${ (Number(item.value).toFixed(2)) }`}</td>
                    <td scope="col" className="px-6 text-center py-3 p-1">{ item.exchangeRates[item.currency].name }</td>
                    <td scope="col" className="px-6 text-center py-3 p-1">
                      {
                        Number(item.exchangeRates[item.currency].ask).toFixed(2)
                      }
                    </td>
                    <td scope="col" className="px-6 text-center py-3">{ converted.toFixed(2).toString() }</td>
                    <td scope="col" className="px-6 text-center py-3">{ item.exchangeRates[item.currency].codein }</td>
                    <td scope="col" className="px-6 text-center py-3">
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
