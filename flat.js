// import jsonData from './data.json';
// import fs  from 'fs';

import { readFileSync } from 'fs';

function isBuffer (obj) {
    return obj &&
      obj.constructor &&
      (typeof obj.constructor.isBuffer === 'function') &&
      obj.constructor.isBuffer(obj)
  }
  
  function keyIdentity (key) {
    return key
  }
  
   function flatten (target, opts) {
    opts = opts || {}
  
    const delimiter = opts.delimiter || '.'
    const maxDepth = opts.maxDepth
    const transformKey = opts.transformKey || keyIdentity
    const output = {}
  
    function step (object, prev, currentDepth) {
      currentDepth = currentDepth || 1
      Object.keys(object).forEach(function (key) {
        const value = object[key]
        const isarray = opts.safe && Array.isArray(value)
        const type = Object.prototype.toString.call(value)
        const isbuffer = isBuffer(value)
        const isobject = (
          type === '[object Object]' ||
          type === '[object Array]'
        )
  
        const newKey = prev
          ? prev + delimiter + transformKey(key)
          : transformKey(key)
  
        if (!isarray && !isbuffer && isobject && Object.keys(value).length &&
          (!opts.maxDepth || currentDepth < maxDepth)) {
          return step(value, newKey, currentDepth + 1)
        }
  
        output[newKey] = value
      })
    }
  
    step(target)
  
    return output
  }
  
// const jsonData = require('./data.json');
const jsonData = readFileSync('./data.json', 'utf-8');
// const result = JSON.stringify(jsonData);
const jsonObject = JSON.parse(jsonData);

// console.log(result);
const result = flatten(jsonObject);
export default result;

