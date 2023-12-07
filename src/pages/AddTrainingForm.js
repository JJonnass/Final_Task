import React, { useState } from 'react';
import '../App.css';

const AddTrainingForm = ({ onAddTraining, onClose }) => {
    const [newTraining, setNewTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    });

    const handleDateChange = (date) => {
        setNewTraining({ ...newTraining, date });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'duration' ? parseFloat(value) : value;
        setNewTraining({ ...newTraining, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTraining(newTraining);
        onClose();
    };

    return (
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Add New Training</h2>

            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={newTraining.date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="numeric"
                        id="duration"
                        name="duration"
                        value={newTraining.duration}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="activity">Activity:</label>
                    <input
                        type="text"
                        id="activity"
                        name="activity"
                        value={newTraining.activity}
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

export default AddTrainingForm;
