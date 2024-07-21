# Martha's Good Eats - Full Stack JavaScript and PostgreSQL Integration Project

## Project Overview

This project is a Full Stack JavaScript and Database Integration assignment for the 3rd semester Full Stack Software Development course. The goal is to build a simple user interface working with server routes and a RESTful API against a PostgreSQL database. The application performs CRUD operations and integrates Node.js, Express, EJS, and PostgreSQL.

## Features

- Create, Read, Update, and Delete (CRUD) operations on a PostgreSQL database
- RESTful API implementation
- User-friendly interface with EJS templating
- Flash messages for user feedback on CRUD actions
- Responsive design using CSS

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- PostgreSQL
- PG module
- Method-override for supporting PUT and DELETE methods
- CSS for styling

## Installation

1. Clone the repository:
    git clone https://github.com/yourusername/s3-fsjs-qap3.git

2. Navigate to the project directory:
    cd s3-fsjs-qap3

3. Install dependencies:
    npm install

4. Set up PostgreSQL database:

    - Create a PostgreSQL database named `marthas_good_eats`.
    - Run the SQL scripts provided in the `sql` directory to set up the database schema and initial data.

5. Configure database connection:

    Update the database connection settings in `services/models/dal.js`:

    ```js
    const { Pool } = require('pg');
    const pool = new Pool({
        user: 'mge_admin',
        host: 'localhost',
        database: 'marthas_good_eats',
        password: 'mge_pw',
        port: 5432,
    });
   
## Usage

1. Start the server:
    node index.js

2. Open your browser and navigate to: http://localhost:3000

## CRUD Operations

- **View Menu**: Navigate to `/menu` to see the list of menu items.
- **Add Item**: Navigate to `/add` to add a new menu item.
- **Update Item**: Click on the "Edit" button on a menu item to update it (Full Update or Partial Update)
- **Delete Item**: Click on the "Delete" button on a menu item to delete it.

## Iteration and Improvement

This project follows an iterative development process. Continuous improvement and feedback integration are key parts of the development cycle.


## License

This project is licensed under the MIT License.

---

This project was developed as part of the Keyin College Full Stack Software Development course. It showcases the integration of frontend and backend technologies to build a complete web application.
