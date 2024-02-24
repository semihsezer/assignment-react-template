'use client';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

const DEFAULT_COLUMNS = [
    {"id": "date", "label": "Date"},
    {"id": "merchant", "label": "Merchant"},
    {"id": "amount", "label": "Amount"},
    {"id": "category", "label": "Category"},
    {"id": "description", "label": "Description"},    
    {"id": "status", "label": "Status"}
]

export default function ExpenseTable({expenses, columns = DEFAULT_COLUMNS}) {
    function getDateDisplayLabel(dateString){
        return formatDate(dateString);
    }

    function getTableBody(){
        return (
            <tbody>
                {expenses.map((expense) => {
                    return (
                        <tr key={expense.id}>
                            {columns.map((col) => {
                                let key = expense.id + col.id;
                                let label = expense[col.id]
                                return <td key={key}>{expense[col.id]}</td>
                            })
                            }
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    function getHeadColumn(){
        return (
            <thead>
                <tr>
                    {columns.map((col) => <th key={col.id}>{col.label}</th>)}
                </tr>
            </thead>
        )
    }

	return (
		<div>
            <h1>Expense Table</h1>
            <Table striped bordered hover>
                {getHeadColumn()}
                {getTableBody()}
            </Table>
		</div>
	);
}