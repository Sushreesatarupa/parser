## Script Purpose:
The script processes input data in JSON or XML format, converts it to a flattened JSON structure, generates CSV and SQL data from the flattened JSON, and creates SQL statements for database insertion.

## File Structure:

functions.js: Contains functions for processing input data and generating output data.

input.json: Sample input file in JSON format.

input.xml: Sample input file in XML format.

output.json: Output file containing the flattened JSON data.

output.csv: Output file containing CSV data generated from the flattened JSON.

output.sql: Output file containing SQL data generated from the CSV data.

output_db.sql: Output file containing SQL statements for database insertion.

## Usage:

Ensure Node.js is installed on your system.

Install required packages by running npm install xml-js.

node parser.js input.xml

Replace input.xml with your actual input file name.

## Functions:

### convertToJSON(inputFileName):

Accepts the input file name as a parameter.

Determines the input file type (JSON or XML) based on the file extension.

Converts XML data to JSON using xml-js library and writes the output to output.json.

Calls other functions to process the JSON data and generate CSV, SQL, and database insertion statements.

Writes the generated data and statements to respective output files.

### flattenJson(jsonData):

Accepts JSON data as input.

Flattens the JSON structure to a single-level object with dot notation keys.

### jsonToCsv(jsonData):

Accepts flattened JSON data as input.

Converts the JSON data to CSV format.

### csvToSql(csvData):

Accepts CSV data as input.

Generates SQL insert statements based on the CSV data and column headers.

### csvToDatabase(csvData):

Accepts CSV data as input.

Similar to csvToSql, generates SQL insert statements but returns them as an array for potential further processing.



Ensure the input file (input.json or input.xml) exists in the same directory as the script.
Replace "tableName" in csvToSql and csvToDatabase functions with your actual table name.
The script includes error handling for invalid input data and file operations.
This documentation provides an overview of the script's purpose, file structure, usage instructions, functions, and important notes for using the script effectively.
