import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"

export default function ExpenseList() {

    const {state} = useBudget()    
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) : state.expenses
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expenses])

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
        {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p> : (
            <>
                <p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos</p>
                <div className="flex justify-between mb-2">
                    <span className="text-green-600 font-bold text-sm">Editar gasto (swipe hacia la derecha)</span>
                    <span className="text-red-600 font-bold text-sm">Eliminar gasto (swipe hacia la izquierda)</span>
                </div>
                {filteredExpenses.map(expense => (
                    <ExpenseDetail
                        key={expense.id}
                        expense={expense}
                    />
                ))}
            </>
        )}
    </div>
  )
}
