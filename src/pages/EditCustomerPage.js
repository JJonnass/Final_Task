import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomerPage = () => {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        city: '',
        postcode: '',
    });
    const navigate = useNavigate();
    const { customerId } = useParams();

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (!customerId) {
                    return;
                }
                const response = await fetch(`http://traineeapp.azurewebsites.net/api/customers/${customerId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch customer details for editing');
                }
                const customerDetails = await response.json();
                setCustomer(customerDetails);
            } catch (error) {
                console.error('Error fetching customer details for editing:', error);
            }
        };
        console.log(customerId)
        fetchCustomerDetails();
    }, [customerId]);


    console.log(customer);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://traineeapp.azurewebsites.net/api/customers/${customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            });

            if (!response.ok) {
                throw new Error('Failed to update customer');
            }

            console.log('Customer updated successfully');
        } catch (error) {
            console.error('Error updating customer:', error);
        }
        navigate('/customers');
    };

    const handleCancel = () => {
        navigate('/customers');
    }

    return (
        <div className="modal-content">
            <h2 style={{ textAlign: 'center' }}>Edit Customer</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="streetaddress">Street Address:</label>
                    <input
                        type="text"
                        id="streetaddress"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="postcode">Postcode:</label>
                    <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group' style={{ textAlign: 'center' }}>
                    <button className='edit-button' type="submit">UPDATE</button>
                    <button className='delete-button' type="button" onClick={handleCancel}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomerPage;