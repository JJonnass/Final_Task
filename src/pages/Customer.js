import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddCustomerForm from './AddCustomerForm';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const navigate = useNavigate();

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

    const handleAddCustomer = () => {
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleAddModalSubmit = (newCustomer) => {
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
        handleAddModalClose();
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            console.log('Deleting customer with ID:', customerId);
            const response = await fetch(`http://traineeapp.azurewebsites.net/api/customers/${customerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
            const responseBody = await response.text();

            if (responseBody.trim() !== '') {
                const deletedCustomer = JSON.parse(responseBody);
                console.log('Deleted customer:', deletedCustomer);
            } else {
                console.log('Customer deleted successfully.');
            }

            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEditCustomer = (customerId) => {
        navigate(`/edit_customer/${customerId}`);
    };

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
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <>
                    <button className="edit-button" onClick={() => handleEditCustomer(getCustomerIdFromLink(params.data.links))}>EDIT</button>
                    <button className="delete-button" onClick={() => handleDeleteCustomer(getCustomerIdFromLink(params.data.links))}>DELETE</button>
                </>
            ),
        },
    ];

    const getCustomerIdFromLink = (links) => {
        const selfLink = links.find(link => link.rel === 'self');
        if (selfLink) {
            const segments = selfLink.href.split('/');
            return segments[segments.length - 1];
        }
        return null;
    };

    const gridOptions = {
        defaultColDef,
        domLayout: 'autoHeight',
        suppressRowClickSelection: true,
        rowSelection: 'single',
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>CUSTOMER LIST</h1>
            <button style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }} onClick={handleAddCustomer}>ADD CUSTOMER</button>

            {isAddModalOpen && (
                <div className="modal">
                    <AddCustomerForm onAddCustomer={handleAddModalSubmit} onClose={handleAddModalClose} />
                </div>
            )}

            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
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