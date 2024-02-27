'use client';
import { useState, useEffect } from 'react';
import ExpenseTable from './ExpenseTable';


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function formatUSD(amount){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatCamelCase(input){
    return input.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

}

export default function HomePage() {
    const API_USERNAME = "semih.sezer"
    const [expenses, setExpenses] = useState([]);

    const columns = [
        {"id": "date", "label": "Date", "formatter": formatDate },
        {"id": "merchant", "label": "Merchant", "formatter": formatCamelCase },
        {"id": "amount", "label": "Amount", "formatter": formatUSD },
        {"id": "category", "label": "Category", "formatter": formatCamelCase },
        {"id": "description", "label": "Description", "formatter": null },    
        {"id": "status", "label": "Status", "formatter": formatCamelCase }
    ]

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
            <ExpenseTable expenses={expenses} columns={columns}/>
		</div>
	);
}