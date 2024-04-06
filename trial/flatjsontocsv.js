const jsonexport = require('jsonexport');
const fs = require('fs');

// Check if command-line arguments are provided
if (process.argv.length !== 4) {
    console.error('Usage: node json_to_csv.js input.json output.csv');
    process.exit(1);
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

// Read JSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading input file:', err);
        process.exit(1);
    }

    try {
        const jsonData = JSON.parse(data);

        // Convert JSON to CSV
        jsonexport(jsonData, (err, csv) => {
            if (err) {
                console.error('Error converting JSON to CSV:', err);
                process.exit(1);
            }

            // Write CSV to output file
            fs.writeFileSync(outputFile, csv);
            console.log('CSV file created successfully:', outputFile);
        });
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        process.exit(1);
    }
});
