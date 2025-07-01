# Customer Training Manager App

This is a React-based web application for managing customer information and training sessions. The app supports adding, editing, and viewing customer and training records through a user-friendly interface.

Originally built as a task/project exercise, this app demonstrates practical use of React components, routing, form handling, and conditional rendering.

---

## Features

- View a list of customers and their details
- View, add, or edit training sessions
- Add and update customer or training data using forms
- Error page for unknown routes
- Component-based structure for reusability and clarity

---

## Tech Stack

| Technology    | Purpose                        |
|---------------|--------------------------------|
| React         | Front-end framework            |
| React Router  | Page navigation and routing    |
| JavaScript    | App logic and interactions     |
| CSS           | Styling and layout             |

---

## 📁 Project Structure

```
Final_Task-master/
├── public/                                           # Static files (HTML, icons)
├── src/
│ ├── App.js                                          # Main app layout and router
│ ├── index.js                                        # React root renderer
│ ├── App.css, index.css                              # Global styling
│ └── pages/                                          # Page-level components
│ ├── Home.js
│ ├── Customer.js
│ ├── Training.js
│ ├── AddCustomerForm.js
│ ├── EditCustomerPage.js
│ ├── AddTrainingForm.js
│ ├── EditTrainingPage.js
│ └── Error.js
├── package.json                                     # Project dependencies
└── README.md                                        # Project documentation
```
---

## How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/your-username/Final_Task.git
cd Final_Task-master

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
