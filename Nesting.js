function countNestingLevel(obj) {
    let maxDepth = 0;
    function traverse(obj, depth) {
      if (typeof obj !== 'object' || obj === null) {
        return;
      }
      iteration+=1;

      maxDepth = Math.max(maxDepth, depth);
  
      for (const key in obj) {
        console.log(key);
        if (obj.hasOwnProperty(key)) {
          traverse(obj[key], depth + 1);
        }
      }
    }
  
    traverse(obj, 1);
  
    return maxDepth;
  }

  const jsonData = require('../data.json');

  const nestingLevel = countNestingLevel(jsonData);
  console.log("Nesting level:", nestingLevel); 
  