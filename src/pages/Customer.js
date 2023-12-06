import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://traineeapp.azurewebsites.net/api/customers');

                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }

                const responseData = await response.json();
                const customersData = responseData.content || [];

                setCustomers(customersData);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const columnDefs = [
        { headerName: 'First Name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last Name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
    ];

    const gridOptions = {
        defaultColDef,
        domLayout: 'autoHeight',
        suppressRowClickSelection: true,
        rowSelection: 'single',
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>CUSTOMER LIST</h1>

            <div className="ag-theme-material" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowData={customers}
                />
            </div>
        </div>
    );
};

export default CustomerList;
