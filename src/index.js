import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Error from './pages/Error';
import CustomerList from './pages/Customer';
import TrainingList from './pages/Training';
import EditCustomerPage from './pages/EditCustomerPage';
import EditTrainingPage from './pages/EditTrainingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "trainings",
        element: <TrainingList />,
      },
      {
        path: "edit_customer/:customerId",
        element: <EditCustomerPage />,
      },
      {
        path: "edit_training/:trainingId",
        element: <EditTrainingPage />,
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);