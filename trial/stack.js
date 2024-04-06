class Stack {
    constructor() {
      this.items = [];
    }
  
    // Push element onto the stack
    push(element) {
      this.items.push(element);
    }
  
    // Pop element from the stack
    pop() {
      if (this.isEmpty()) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    // Peek at the top element of the stack without removing it
    peek() {
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Get the size of the stack
    size() {
      return this.items.length;
    }
  
    // Print the stack elements
    print() {
      console.log(this.items.toString());
    }
  
    // Clear the stack
    clear() {
      this.items = [];
    }
  }
  
  // Example usage:
//   const stack = new Stack();
  
//   stack.push(1);
//   stack.push(2);
//   stack.push(3);
  
//   console.log("Stack elements:");
//   stack.print(); // Output: [1, 2, 3]
  
//   console.log("Popped element:", stack.pop()); // Output: 3
//   console.log("Top element:", stack.peek()); // Output: 2
//   console.log("Stack size:", stack.size()); // Output: 2
  
//   console.log("Is stack empty?", stack.isEmpty()); // Output: false
  
//   stack.clear();
//   console.log("Is stack empty after clear?", stack.isEmpty()); // Output: true
function Nesting()
{
    const jsonData = require('../data.json');
    // result = parseJSON("{jsonData}");
    result = JSON.stringify(jsonData);
    jsonObject = JSON.parse(result);
    nestCount = 0;
    maxNestCount =0;
    i=0;
    console.log(result);
    // while(i<result.length)
    // {
    //   if(result[i]=='{'){
    //     nestCount = nestCount+1;
    //     console.log(nestCount);
    //     // Stack.push(result[i]);
    //     if(nestCount > maxNestCount)
    //     maxNestCount= nestCount;
    //   }
    //   else if(result[i]=='}'){
    //     nestCount-=1;
    //     // Stack.pop();
    //   }
    // }
    console.log(maxNestCount);
}

Nesting();
