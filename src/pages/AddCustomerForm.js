import React, { useState } from 'react';
import '../App.css';

const AddCustomerForm = ({ onAddCustomer, onClose }) => {
    const [newCustomer, setNewCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        city: '',
        postcode: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({ ...newCustomer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCustomer(newCustomer);
        onClose();
    };

    return (
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Add New Customer</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={newCustomer.firstname}
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
                        value={newCustomer.lastname}
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
                        value={newCustomer.email}
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
                        value={newCustomer.phone}
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
                        value={newCustomer.streetaddress}
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
                        value={newCustomer.city}
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
                        value={newCustomer.postcode}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <button type="submit">ADD</button>
                </div>
            </form>

        </div>
    );
};

export default AddCustomerForm;
