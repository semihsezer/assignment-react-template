'use client';
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
    function getTableBody(){
        return (
            <tbody>
                {expenses.map((expense) => {
                    return (
                        <tr key={expense.id}>
                            {columns.map((col) => {
                                let key = expense.id + col.id;
                                let label = expense[col.id]
                                if (col.formatter){
                                    label = col.formatter(expense[col.id])
                                }
                                return <td key={key}>{label}</td>
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
            <h3>Expense Table</h3>
            <Table striped bordered hover>
                {getHeadColumn()}
                {getTableBody()}
            </Table>
		</div>
	);
}