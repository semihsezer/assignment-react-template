'use client';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ExpenseTable from './ExpenseTable';


export default function HomePage() {
    const API_USERNAME = "semih.sezer"
    const [expenses, setExpenses] = useState([]);

    const columns = [
        {"id": "formatted_date", "label": "Date"},
        {"id": "merchant", "label": "Merchant"},
        {"id": "formatted_amount", "label": "Amount"},
        {"id": "category", "label": "Category"},
        {"id": "description", "label": "Description"},    
        {"id": "status", "label": "Status"}
    ]

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    function formatAmount(amount){
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    function parseExpenses(data){
        return data.map((expense) => {
            for (let key in expense) {
                if (key === "date") {
                    expense["formatted_date"] = formatDate(expense[key]);
                } else if (key === "amount") {
                    expense["formatted_amount"] = formatAmount(expense[key]);
                }
            }
            return {
                "id": expense.id,
                "date": expense.date,
                "formatted_date": expense.formatted_date,
                "merchant": expense.merchant,
                "amount": expense.amount,
                "formatted_amount": expense.formatted_amount,
                "category": expense.category,
                "description": expense.description,
                "status": expense.status
            }
        });


    }

    function callAPI(){
		try {
            fetch(`https://expenses-backend-mu.vercel.app/expenses`, {
                headers: {   
                    "Content-Type": "application/json", 
                    Username: API_USERNAME }
                })
                .then((res) => 
                    res.json())
                .then((data) => {
                    console.log(data);
                    data = parseExpenses(data);
                    setExpenses(data);
                });
                } catch (err) {
                    console.log(err);
                }
	};

  useEffect(() => {
    callAPI();
  }, []);

	return (
		<div>
            <h1>HomePage</h1>
            <Button>Get Expenses</Button>
            <ExpenseTable expenses={expenses} columns={columns}/>
		</div>
	);
}