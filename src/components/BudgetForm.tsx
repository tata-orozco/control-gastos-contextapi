import { useState, ChangeEvent, FormEvent, useMemo } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudgetForm() {

    const [budget, setBudget] = useState<string>('0')
    const {dispatch} = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.value)
    }

    const isValid = useMemo(() => {
        const budgetValue = parseFloat(budget) 
        return isNaN(budgetValue) || budgetValue <= 0
    }, [budget])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const budgetValue = parseFloat(budget)
        if (!isNaN(budgetValue) && budgetValue > 0) {
            dispatch({ type: 'add-budget', payload: { budget: budgetValue } })
        }
    }

  return (
    <form 
        className="space-y-5"
        onSubmit={handleSubmit}
    >
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
                Definir Presupuesto
            </label>
            <input
                id="budget"
                type="number"
                className="w-full bg-white border border-gray-200 p-2"
                placeholder="Defini tu presupuesto"
                name="budget"
                value={budget}
                onChange={handleChange}
            />
        </div>

        <input
            type="submit"
            value="Definir presupuesto"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
            disabled={isValid}
        />
    </form>
  )
}