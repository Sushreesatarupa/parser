import fs from 'fs';
import path from 'path';
import convert from 'xml-js';

function convertXmlToJson(xmlFileName) {
    // Construct file paths
    const xmlFilePath = `${xmlFileName}.xml`;
    const jsonFilePath = `${xmlFileName}.json`;

    try {
        // Check if the XML file exists
        if (!fs.existsSync(xmlFilePath)) {
            throw new Error(`XML file '${xmlFilePath}' not found.`);
        }

        // Read XML from input file
        const xmlString = fs.readFileSync(xmlFilePath, 'utf8');

        // Convert XML to JSON
        const options = { compact: true, spaces: 4 };
        const jsonOutput = convert.xml2json(xmlString, options);

        // Write JSON to output file
        fs.writeFileSync(jsonFilePath, jsonOutput);

        console.log(`Conversion successful! JSON file saved as ${jsonFilePath}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Usage example
const xmlFileName = 'input'; // Change this to the desired XML file name without the extension
convertXmlToJson(xmlFileName);
