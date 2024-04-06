
function parseJSON(input) {
    console.log(input);
    console.log(input.length);
    for(i=0;i<input.length;i++)
    {
      console.log(i);
      console.log(" "+input[i]);
    }
    // if the input is empty or starts with an invalid character, throw an error
    if (input === "" || input[0] === "'") {
        throw Error();
    }

    // check if the input is null, an empty object, empty array, or a boolean and return the value from the input
    if (input === "null") {
        return null;
    }
    if (input === "{}") {
        return {};
    }
    if (input === "[]") {
        return [];
    }
    if (input === "true") {
        return true;
    }
    if (input === "false") {
        return false;
    }

    //if the input starts with a quote, return the value from inside the quotes
    if (input[0] === '"') {
        return input.slice(1, -1);
    }

    // if it starts with a bracket, perform parsing of the contents within the brackets
    if (input[0] === "{") {
        return input
            .slice(1, -1).split(",").reduce((acc, item) => {
                // get the key and the value of the JSON property by splitting the string on the colon character
                const index = item.indexOf(":");
                const key = item.slice(0, index);
                const value = item.slice(index + 1);
                acc[parseJSON(key)] = parseJSON(value);
                return acc;
            }, {});
    }
    // if the input is an array, return the value from inside the array
    if (input[0] === "[") {
        return input.slice(1, -1).split(",").map((x) => parseJSON(x));
    }
}

const jsonData = require('./data.json');

function Main()
{
    // result = parseJSON("{jsonData}");
    result = JSON.stringify(jsonData);
    jsonObject = JSON.parse(result);
    console.log(jsonObject);
    // result = JSON.stringify(jsonData);
    // console.log(typeof(result));
    // console.log(result);
    // for(i=0;i<result.length;i++)
    // {
    //     console.log(i + " " + result[i]);
    // }
}

Main();

