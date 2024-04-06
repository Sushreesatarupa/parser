import flattenedData from '../flat.js';

// const fs = require('fs');
import fs  from 'fs';

// Read flattened JSON data from file
try {
console.log(flattenedData);
    // const jsonData = fs.readFileSync('input.json');
    // const flattenedData = JSON.parse(jsonData);
    // console.log(jsonData);
    // Custom function to convert flattened JSON to SQL
    function convertFlattenedJSONToSQL(flattenedData, rootTable) {
        const sqlStatements = [];
        sqlStatements.push(`CREATE TABLE ${rootTable} (
            id INT AUTO_INCREMENT PRIMARY KEY
          )`);

        // console.log(flattenedData);
        for (const key in flattenedData) {
            console.log(key +" "+ key.includes('.'));
            if(key.includes('.')){
                const [tableName, columnName] = key.split('.');
                // Generate CREATE TABLE statement if it hasn't been added yet
                if (!sqlStatements.includes(`CREATE TABLE ${tableName}`)) {
                    sqlStatements.push(`CREATE TABLE ${tableName} (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    ${columnName} VARCHAR(255)
                )`);                      
            // Generate INSERT INTO statement
                const value = flattenedData[key];
                sqlStatements.push(`INSERT INTO ${tableName} (${columnName}) VALUES ('${value}')`);
            }
        if(key.includes('.')===false){
            console.log("This is root's data ");
            sqlStatements.push(`ALTER TABLE ${rootTable} ADD ${key} VARCHAR(255)`);
         }
        }  
        }

        return sqlStatements.join('\n'); // Join SQL statements with newline character
    }

    // Convert flattened JSON to SQL
    const sqlStatements = convertFlattenedJSONToSQL(flattenedData,"RootTable");

    // Get the name of the JSON file without extension
    const jsonFileName = 'input.json';
    const sqlFileName = jsonFileName.replace(/\.[^/.]+$/, "") + '.sql'; // Replace extension with .sql

    // Save SQL statements to a file with the same name as JSON file
    fs.writeFileSync(sqlFileName, sqlStatements);

    console.log(`SQL statements saved to ${sqlFileName} file.`);
} catch (error) {
    console.error('Error:', error);
}