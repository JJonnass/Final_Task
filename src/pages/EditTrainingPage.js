import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTrainingPage = () => {
    const [training, setTraining] = useState({
        date: null,
        duration: '',
        activity: '',
    });
    const navigate = useNavigate();
    const { trainingId } = useParams();

    useEffect(() => {
        const fetchTrainingDetails = async () => {
            try {
                if (!trainingId) {
                    return;
                }
                const response = await fetch(`http://traineeapp.azurewebsites.net/api/trainings/${trainingId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch training details for editing');
                }
                const trainingDetails = await response.json();
                setTraining(trainingDetails);
            } catch (error) {
                console.error('Error fetching training details for editing:', error);
            }
        };

        fetchTrainingDetails();
    }, [trainingId]);

    console.log(training.date);

    const handleDateChange = (date) => {
        setTraining({ ...training, date });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTraining({ ...training, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(training),
            });
            if (!response.ok) {
                throw new Error('Failed to update training');
            }
            console.log('Training updated successfully');
        } catch (error) {
            console.error('Error updating training:', error);
        }
        navigate('/trainings');
    };

    const handleCancel = () => {
        navigate('/trainings');
    };

    return (
        <div className="modal-content">
            <h2 style={{ textAlign: 'center' }}>Edit Trainings</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        id="date"
                        name="date"
                        value={training.date}
                        onChange={(e) => handleDateChange(e.target.value)}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor="duration">Duration:</label>
                    <input
                        type="number"
                        id="duration"
                        name="duration"
                        value={training.duration}
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
                        value={training.activity}
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

export default EditTrainingPage;
