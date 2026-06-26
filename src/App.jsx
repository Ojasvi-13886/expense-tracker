import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {

  const[expensename, setexpensename] = useState("");
  const [amount, setamount] = useState("");
  const [expenses,setexpenses]=useState([]);
  const [editindex, seteditindex] =useState(null);

  function addExpense(){
    const newexpense={
      name:expensename,
      amount: Number(amount),
    };

    setexpenses([...expenses, newexpense]);

    setexpensename("");
    setamount("");
  }

  const total=expenses.reduce(
    (sum,expense)=> sum + expense.amount,
    0//0 is initial value
  )

  function clearExpense(){
    setexpenses([]);
  }

  function deleteExpense(deleteindex){
    const updatedexpenses = expenses.filter(
      (expense, index)=> index!==deleteindex
      );
      setexpenses(updatedexpenses);
  }

  function editexpense(index){
    const expensetoedit = expenses[index];
    setexpensename(expensetoedit.name);
    setamount(expensetoedit.amount);
    seteditindex(index);
  }

  function updateExpense(){
    const updatedexpenses = expenses.map(
      (expense, index)=>{
        if(index===editindex){
          return{
            name: expensename,
            amount: Number(amount)
          };
        }return expense;
      }
    );

    setexpenses(updatedexpenses);
    seteditindex(null);
    setexpensename("");
    setamount("");
  }

  return (
    <div>
      <h1>Expense Tracker</h1>
      <input
      type="text"
      placeholder='Expense Name'
      value={expensename}
      onChange={(e)=> setexpensename(e.target.value)}
      />

      <input
      type="number"
      placeholder='Amount'
      value={amount}
      onChange={(e)=> setamount(e.target.value)}
      />

      <button onClick={editindex===null? addExpense : updateExpense}>
        {editindex===null? "Add Expense":"Update Expense"}
      </button>

      <button onClick  ={clearExpense}>
        Clear All Expenses
      </button>

      <h3>Expenses</h3>
      <ul>
        {expenses.map((expense,index)=>(
          <li key={index}>
            {expense.name} - {expense.amount} Rs
            <button onClick={()=>editexpense(index)}> 
              Edit 
            </button>
            <button onClick={()=>deleteExpense(index)}> 
              Delete 
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: {total}Rs </h3>
    </div>
  );
}

export default App;
