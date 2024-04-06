const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require('./parser')
const bodyParser = require('body-parser');

// Middleware for parsing JSON and XML bodies
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/xml' }));

// API endpoint to process JSON data
app.post('/process-json', (req, res) => {
    const inputData = req.body;
    const format = '.json'; // Set format to 'json'

    // Call the function to process input data
    res.json(convertToJSON(req.body, format))

    // Send SQL and CSV responses
    // res.json({ sqlData, csvData });
});

// API endpoint to process XML data
app.post('/process-xml', (req, res) => {
    const inputData = req.body;
    const format = '.xml'; // Set format to 'xml'

    // Call the function to process input data
    res.json(convertToJSON(req.body, format))

    // Send SQL and CSV responses
    // res.json({ sqlData, csvData });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function convertToJSON(data, inputFileExtension) {
    try {
        // if (!inputFileName || typeof inputFileName !== 'string') {
        //     throw new Error('Invalid input: Input file name must be a non-empty string.');
        // }

        const inputFilePath = path.join(__dirname, `${inputFileName}`);
        const outputFilePath = path.join(__dirname, `output.json`);
        const csvOutputFilePath = path.join(__dirname, `output.csv`);
        const sqlOutputFilePath = path.join(__dirname, `output.sql`);
        const dbOutputFilePath = path.join(__dirname, `output_db.sql`);

        // if (!fs.existsSync(inputFilePath)) {
        //     throw new Error(`Input file '${inputFilePath}' not found.`);
        // }

        // const inputFileExtension = path.extname(inputFilePath).toLowerCase();

        if (inputFileExtension === '.xml') {
            const xmlString = data

            const options = { compact: true, spaces: 4 };
            const jsonOutput = convert.xml2json(xmlString, options);

            if (!jsonOutput) {
                throw new Error('Error converting XML to JSON.');
            }

            fs.writeFileSync(outputFilePath, jsonOutput);

            console.log(`Conversion successful! JSON file saved as ${outputFilePath}`);

            const jsonData = JSON.parse(jsonOutput);
            const flattenedJsonData = flattenJson(jsonData);
            const csvData = jsonToCsv(flattenedJsonData);
            const sqlData = csvToSql(csvData);
            const dbStatements = csvToDatabase(csvData);

            console.log('Flattened JSON:');
            console.log(flattenedJsonData);
            console.log('CSV:');
            console.log(csvData);
            console.log('SQL:');
            console.log(sqlData);
            console.log('Database Statements:');
            console.log(dbStatements);

            fs.writeFileSync(csvOutputFilePath, csvData); // Write CSV data to a file
            fs.writeFileSync(sqlOutputFilePath, sqlData); // Write SQL data to a file
            fs.writeFileSync(dbOutputFilePath, dbStatements); // Write database statements to a file
        } else if (inputFileExtension === '.json') {
            const jsonString = data

            const jsonData = JSON.parse(jsonString);
            const flattenedJsonData = flattenJson(jsonData);
            const csvData = jsonToCsv(flattenedJsonData);
            const sqlData = csvToSql(csvData);
            const dbStatements = csvToDatabase(csvData);

            console.log('Flattened JSON:');
            console.log(flattenedJsonData);
            console.log('CSV:');
            console.log(csvData);
            console.log('SQL:');
            console.log(sqlData);
            console.log('Database Statements:');
            console.log(dbStatements);

            fs.writeFileSync(csvOutputFilePath, csvData); // Write CSV data to a file
            fs.writeFileSync(sqlOutputFilePath, sqlData); // Write SQL data to a file
            fs.writeFileSync(dbOutputFilePath, dbStatements); // Write database statements to a file
        } else {
            throw new Error('Unsupported file type. Only XML and JSON files are supported.');
        }
        return { "csv": csvData, "sql": sqlData, "db": dbStatements }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function flattenJson(jsonData) {
    if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Invalid input: JSON data must be a non-null object.');
    }

    const flattenedJson = {};

    function flatten(obj, prefix = '') {
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                flatten(obj[key], `${prefix}${key}.`);
            } else {
                flattenedJson[`${prefix}${key}`] = obj[key];
            }
        }
    }

    flatten(jsonData);
    return flattenedJson;
}

function jsonToCsv(jsonData) {
    if (!jsonData || typeof jsonData !== 'object') {
        throw new Error('Invalid input: JSON data must be a non-null object.');
    }

    const csvData = [];

    for (const key in jsonData) {
        const row = `"${key}","${jsonData[key]}"`;
        csvData.push(row);
    }

    return csvData.join('\n');
}

function csvToSql(csvData) {
    if (!csvData || typeof csvData !== 'string') {
        throw new Error('Invalid input: CSV data must be a non-empty string.');
    }

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    let sqlStatements = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const insertStatement = `INSERT INTO tableName (${headers.join(', ')}) VALUES (${values.map(val => `'${val}'`).join(', ')})`;
        sqlStatements.push(insertStatement);
    }

    return sqlStatements.join('\n');
}

function csvToDatabase(csvData) {
    if (!csvData || typeof csvData !== 'string') {
        throw new Error('Invalid input: CSV data must be a non-empty string.');
    }

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    let dbStatements = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const insertStatement = `INSERT INTO tableName (${headers.join(', ')}) VALUES (${values.map(val => `'${val}'`).join(', ')})`;
        dbStatements.push(insertStatement);
    }

    return dbStatements.join('\n');
}

// Use process.argv to get command line arguments for the input file name
const inputFileName = process.argv[2]; // This assumes the input file name is provided as the first argument when running the script
convertToJSON(inputFileName);
