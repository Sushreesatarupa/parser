const fs = require('fs');

// Read flattened JSON data from file
try {
    const jsonData = fs.readFileSync('input.json');
    const flattenedData = JSON.parse(jsonData);

    // Custom function to convert flattened JSON to SQL
    function convertFlattenedJSONToSQL(flattenedData) {
        const sqlStatements = [];

        for (const key in flattenedData) {
            const [tableName, columnName] = key.split('.');

            // Generate CREATE TABLE statement if it hasn't been added yet
            if (!sqlStatements.includes(`CREATE TABLE ${tableName}`)) {
                sqlStatements.push(`CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ${columnName} VARCHAR(255)
        )`);
            }

            // Generate INSERT INTO statement
            const value = flattenedData[key];
            sqlStatements.push(`INSERT INTO ${tableName} (${columnName}) VALUES ('${value}')`);
        }

        return sqlStatements.join('\n'); // Join SQL statements with newline character
    }

    // Convert flattened JSON to SQL
    const sqlStatements = convertFlattenedJSONToSQL(flattenedData);

    // Get the name of the JSON file without extension
    const jsonFileName = 'input.json';
    const sqlFileName = jsonFileName.replace(/\.[^/.]+$/, "") + '.sql'; // Replace extension with .sql

    // Save SQL statements to a file with the same name as JSON file
    fs.writeFileSync(sqlFileName, sqlStatements);

    console.log(`SQL statements saved to ${sqlFileName} file.`);
} catch (error) {
    console.error('Error:', error);
}
