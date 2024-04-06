const flattenedData = {
    "table1.column1": "value1",
    "table1.column2": "value2",
    "table2.column1": "value3",
    "table2.column2": "value4"
  };
  
  // Custom function to convert flattened JSON to SQL
  function convertFlattenedJSONToSQL(flattenedData) {
    const sqlStatements = [];
  
    for (const key in flattenedData) {
      const [tableName, columnName] = key.split('.');
  
      // Generate CREATE TABLE statement if it hasn't been added yet
      if (!sqlStatements.includes('CREATE TABLE ${tableName}')) {
        sqlStatements.push(`CREATE TABLE ${tableName} (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ${columnName} VARCHAR(255)
        )`);
      }

      else {
        sqlStatements.push(`ALTER TABLE ${tableName} ADD ${columnName} VARCHAR(255)`);
      }
  
      // Generate INSERT INTO statement
      const value = flattenedData[key];
      sqlStatements.push(`INSERT INTO ${tableName} (${columnName}) VALUES ('${value}')`);
    }
  
    return sqlStatements.join('\n');
  }
  
  // Convert flattened JSON to SQL
  const sqlStatements = convertFlattenedJSONToSQL(flattenedData);
  
  // Output SQL statements
  sqlStatements.forEach(sql => console.log(sql));