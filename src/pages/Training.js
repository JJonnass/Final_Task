import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { format, parseISO } from 'date-fns';
import AddTrainingForm from './AddTrainingForm';
import { useNavigate } from 'react-router-dom';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrainings = async () => {

            const response = await fetch('http://traineeapp.azurewebsites.net/api/trainings');

            if (!response.ok) {
                throw new Error('Failed to fetch trainings');
            }

            const responseData = await response.json();
            console.log('Fetched Data:', responseData);
            const trainingsData = responseData.content || [];

            setTrainings(trainingsData);
        };

        fetchTrainings();
    }, []);

    const handleAddTraining = () => {
        setAddModalOpen(true);
    };

    const handleAddModalClose = () => {
        setAddModalOpen(false);
    };

    const handleAddModalSubmit = (newTraining) => {
        setTrainings((prevTrainings) => [...prevTrainings, newTraining]);
        handleAddModalClose();
    };

    const handleDeleteTraining = async (trainingId) => {
        try {
            console.log('Deleting training with ID:', trainingId);
            const response = await fetch(`http://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete training');
            }
            const responseBody = await response.text();

            if (responseBody.trim() !== '') {
                const deletedTraining = JSON.parse(responseBody);
                console.log('Deleted training:', deletedTraining);
            } else {
                console.log('Training deleted successfully.');
            }

            setTrainings((prevTrainings) => prevTrainings.filter((training) => training.id !== trainingId));
        } catch (error) {
            console.error('Error deleting training:', error);
        }
    };

    const handleEditTraining = (trainingId) => {
        navigate(`/edit_training/${trainingId}`);
    };

    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    const columnDefs = [
        {
            headerName: 'Date', field: 'date', sortable: true, filter: true,
            valueFormatter: (params) => {
                const parsedDate = parseISO(params.value);
                const formattedDate = format(parsedDate, 'dd.MM.yyyy HH:mm');
                return formattedDate;
            },
        },
        { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Actions',
            cellRenderer: (params) => (
                <>
                    <button className="edit-button" onClick={() => handleEditTraining(getTrainingIdFromLink(params.data.links))}>EDIT</button>
                    <button className="delete-button" onClick={() => handleDeleteTraining(getTrainingIdFromLink(params.data.links))}>DELETE</button>
                </>
            ),
        },
    ];

    const getTrainingIdFromLink = (links) => {
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
            <h1 style={{ textAlign: 'center' }}>TRAINING LIST</h1>
            <button style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }} onClick={handleAddTraining}>ADD TRAINING</button>

            {isAddModalOpen && (
                <div className="modal">
                    <AddTrainingForm onAddTraining={handleAddModalSubmit} onClose={handleAddModalClose} />
                </div>
            )}

            <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    rowData={trainings}
                />
            </div>
        </div>
    );
};

export default TrainingList;
