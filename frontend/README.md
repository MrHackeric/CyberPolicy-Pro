# **CyberPolicy Pro - Frontend**

This repository contains the frontend for **CyberPolicy Pro**, a compliance management platform that centralizes regulatory tracking, risk scoring, document drafting, and compliance notifications.


## **Overview**

The frontend provides a modern, responsive user interface built with **React** and **Tailwind CSS**. It enables users to interact with the platform’s features, including:
- Regulatory Compliance Dashboard
- Compliance Risk Scoring
- Document Drafting
- Compliance Notifications


## **Getting Started**

### **Setup Instructions**

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   The following command will install all necessary libraries and packages to run the frontend:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   Start the frontend in development mode:
   ```bash
   npm run dev
   ```
   The server should be running on `http://localhost:3000` or a different port depending on your configuration. Open this link in a browser to access the platform's frontend.


## **Folder Structure**

```
frontend/
├── src/
│   ├── assets/                # Static assets like images, icons, etc.
│   ├── components/            # Reusable UI components (e.g., headers, footers, forms)
│   ├── pages/                 # Main pages of the app (e.g., Dashboard, Document Drafting)
│   ├── services/              # Services for API interactions
│   ├── utils/                 # Helper functions and utilities
│   ├── App.jsx                # Main app component
│   └── index.jsx              # Entry point for the app
└── tailwind.config.js         # Tailwind CSS configuration
```

### **Key Components**

- **Dashboard**: Provides a summary of compliance status, tracking, and risk scores.
- **Document Drafting**: Offers customizable templates for generating compliance documents.
- **Settings**: Allows users to manage their profiles and notification preferences.
- **Notification Center**: Displays compliance alerts and updates.

### **Configuration and Customization**

- **Tailwind CSS**: For customizing the theme, update the color schemes and font styles in `tailwind.config.js`.
- **API Endpoints**: Set the backend API URLs and endpoints in `src/services/api.js` to ensure correct communication with the backend.

---

## **Deployment**

For production, build the project with:
```bash
npm run build
```
This will create an optimized `build` folder with minified assets. Deploy the contents of the `build` folder to a static hosting provider.

## **Troubleshooting**

- **Issue**: "Port is already in use."
   - **Solution**: Stop any conflicting servers or change the port in `vite.config.js`.
- **Issue**: "CORS errors when accessing the backend."
   - **Solution**: Ensure the backend server has CORS configured to allow requests from `http://localhost:3000` (or the port you are using).

---

CyberPolicy Pro’s frontend empowers businesses with a user-friendly interface for managing their compliance needs. For further assistance, please contact the support team.
```