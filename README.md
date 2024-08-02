# Building Entry System

**Open Link:** [Building Entry System](https://building-entry-system-pramod.netlify.app/)  
*Ensure MongoDB is connected before clicking the link.*

## Backend Setup

1. **Start MongoDB:**
    ```bash
    net start MongoDB
    ```

2. **Navigate to Backend Directory and Install Dependencies:**
    ```bash
    cd building-entry-system/backend
    npm install
    ```

3. **Build and Run Backend Server:**
    ```bash
    npm run build  # to build the project
    npm start      # to start the backend server
    ```

## Frontend Setup

1. **Navigate to Frontend Directory and Install Dependencies:**
    ```bash
    cd building-entry-system/frontend
    npm install
    ```

2. **Start Frontend Development Server:**
    ```bash
    npm start
    ```

## Additional Notes

- Ensure that MongoDB is running and properly connected before starting the backend server.
- The backend server must be running for the frontend application to interact with it correctly.
- Use separate terminal windows/tabs for running the backend and frontend servers simultaneously.

