function generateSchema(data) {
    const schema = {};
  
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          schema[key] = {
            type: 'object',
            properties: generateSchema(value),
            required: Object.keys(value)
          };
        } else if (Array.isArray(value)) {
          schema[key] = {
            type: 'array',
            items: generateSchema(value[0])
          };
        } else {
          schema[key] = {
            type: typeof value
          };
        }
      }
    }
  
    return schema;
  }
  
  // Example usage:
  const jsonData = {
    "name": "John",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Anytown"
    },
    "hobbies": ["reading", "painting"]
  };
  
  const schema = generateSchema(jsonData);
  console.log(JSON.stringify(schema, null, 2));
  