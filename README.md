# Cricket Analyzer

Cricket Analyzer is a Node.js backend application that analyzes cricket match data and displays information through a web interface.
It uses Express.js for the server and MongoDB for storing data.

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS (for views)

## Prerequisites

Make sure you have the following installed:

* Node.js
* MongoDB
* Git
* VS Code (optional)

## Clone the Repository

```bash
git clone https://github.com/ramakrishna5201/Cricket-Analyzer.git
cd Cricket-Analyzer
```

## Install Dependencies

```bash
npm install
```

This will automatically install all dependencies listed in **package.json** and create the **node_modules** folder.

## Environment Variables

Create a file named **.env** in the root folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Example:

```
MONGO_URI=mongodb://127.0.0.1:27017/cricketAnalyzer
PORT=3000
```

## Run the Application

Start the server:

```bash
npm start
```

or

```bash
node src/app.js
```

## Open in Browser

Go to:

```
http://localhost:3000
```

## Project Structure

```
Cricket-Analyzer
│
├── src
│   └── app.js
├── public
├── views
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Notes

* The **node_modules** folder is not included in GitHub because it is automatically created using **npm install**.
* The **.env** file is ignored for security reasons.

## Author

Anugu Ramakrishna Reddy
