# Learning Management System (LMS)

A full-stack Learning Management System built with React and Express.js.

## Project Structure

```
lms/
├── client/              # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── server/              # Express backend API
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## Features

- **Frontend**: React application with React Router for navigation
- **Backend**: Express.js server with CORS and JSON middleware support
- **Database**: MongoDB integration ready (via mongoose)
- **Cookie Support**: Cookie parser middleware configured

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for database features)

## Installation

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=8000
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Start the Server

From the `server` directory:

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:8000` (or the PORT specified in `.env`)

### Start the Client

From the `client` directory:

```bash
npm run dev
```

The client will typically run on `http://localhost:5173`

## Server Configuration

The Express server is configured with:

- **CORS**: Enabled with wildcard origin and credentials support
- **JSON Parsing**: Built-in Express JSON middleware
- **URL Encoded**: Extended URL encoding enabled
- **Environment Variables**: Configured via dotenv
- **Hot Reload**: Nodemon for development

### Available Endpoints

- `GET /` - Server health check

## Technologies Used

### Frontend
- React
- React Router DOM
- Vite (Build tool)
- ESLint (Code quality)

### Backend
- Express.js
- CORS
- dotenv
- Mongoose (MongoDB ODM)
- Cookie Parser
- Nodemon (Development)

## Development

### Available Scripts

**Server:**
```bash
npm run dev    # Start with nodemon
npm start      # Start production server
```

**Client:**
```bash
npm run dev    # Start development server
```

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=8000
```

## License

ISC

## Author

Himanshu

---

For more information, visit the [GitHub repository](https://github.com/Himanshu6307/LMS)
