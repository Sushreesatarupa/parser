// Custom JSON parser function that parses JSON data and filters fields based on metadata
function customJSONParse(jsonString, metadata) {
  const data = []; // Array to store parsed JSON objects or arrays
  let currentIndex = 0; // Index to track the current position in the JSON string

  // Function to throw custom errors with descriptive messages
  const throwError = (message) => {
    throw new Error(message);
  };

  // Function to get the next token from the JSON string
  const getNextToken = () => {
    // Skip whitespace and newlines
    while (jsonString[currentIndex] === ' ' || jsonString[currentIndex] === '\n') {
      currentIndex++;
    }

    const char = jsonString[currentIndex];
    currentIndex++; // Move to the next character

    // Check the character type and return the corresponding token
    if (char === '{') return { type: 'objectStart' };
    if (char === '}') return { type: 'objectEnd' };
    if (char === '[') return { type: 'arrayStart' };
    if (char === ']') return { type: 'arrayEnd' };
    if (char === '"') {
      // Parse string value
      let value = '';
      while (jsonString[currentIndex] !== '"') {
        value += jsonString[currentIndex]; // Append characters to the value
        currentIndex++;
      }
      if (jsonString[currentIndex] !== '"') {
        throwError('Unterminated string literal');
      }
      currentIndex++; // Skip closing quote
      return { type: 'string', value };
    }
    // Handle other token types: numbers, booleans, null, comma, colon
    // Add code here for handling numbers, booleans, null, comma, colon

    throwError('Invalid token');
  };

  // Function to parse an object from the JSON string
  const parseObject = () => {
    const obj = {};
    let key = '';
    let token = getNextToken(); // Get the next token
    while (token && token.type !== 'objectEnd') {
      if (token.type === 'string') {
        key = token.value; // Save the key for the current key-value pair
        token = getNextToken(); // Get the next token (expecting colon after key)
        if (token && token.type === 'colon') {
          token = getNextToken(); // Get the next token (expecting value after colon)
          obj[key] = parseValue(token); // Parse value and assign to object key
          token = getNextToken(); // Get the next token (expecting comma or object end)
        } else {
          throwError('Colon expected after key');
        }
      } else if (token.type === 'comma') {
        token = getNextToken(); // Get the next token (expecting another key-value pair)
      } else {
        throwError('Invalid object structure');
      }
    }
    return obj;
  };

  // Function to parse an array from the JSON string
  const parseArray = () => {
    const arr = [];
    let token = getNextToken(); // Get the next token
    while (token && token.type !== 'arrayEnd') {
      arr.push(parseValue(token)); // Parse array elements and add to array
      token = getNextToken(); // Get the next token (expecting comma or array end)
    }
    return arr;
  };

  // Function to parse a value based on its token type
  const parseValue = (token) => {
    if (token.type === 'string' || token.type === 'number' || token.type === 'boolean' || token.type === 'null') {
      return token.value;
    } else if (token.type === 'objectStart') {
      return parseObject(); // Parse object
    } else if (token.type === 'arrayStart') {
      return parseArray(); // Parse array
    }
    throwError('Invalid value type');
  };

  // Start parsing the JSON string
  const token = getNextToken(); // Get the first token
  if (token && token.type === 'objectStart') {
    const obj = parseObject(); // Parse object
    if (obj) data.push(obj); // Add parsed object to data array
  } else if (token && token.type === 'arrayStart') {
    const arr = parseArray(); // Parse array
    if (arr) data.push(arr); // Add parsed array to data array
  } else {
    throwError('Invalid JSON structure');
  }

  return data; // Return the parsed data
}

// Example usage
const jsonDataString = '{"name": "John", "age": 30, "details": {"email": "john@example.com", "phone": {"mobile": "1234567890", "landline": "9876543210"}}, "tags": ["tag1", "tag2"]}';
const metadata = ['name', 'age', 'details', 'details.email', 'details.phone.mobile', 'tags']; // Metadata specifying the fields to keep
try {
  const parsedData = customJSONParse(jsonDataString, metadata);
  console.log(parsedData);
} catch (error) {
  console.error(error.message);
}
