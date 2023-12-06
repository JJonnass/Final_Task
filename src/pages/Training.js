import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { format, parseISO } from 'date-fns';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);

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
    ];

    const gridOptions = {
        defaultColDef,
        domLayout: 'autoHeight',
        suppressRowClickSelection: true,
        rowSelection: 'single',
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>TRAINING LIST</h1>

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
