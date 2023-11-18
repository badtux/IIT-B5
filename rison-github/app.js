// app.js
const express = require('express');
const mathOperations = require('./arithmetic');
const num1 = 10;
const num2 = 5;
console.log( `Addition: ${mathOperations.add(num1, num2)}` );
console.log( `Addition: ${mathOperations.subtract(num1, num2)}` );
console.log( `Addition: ${mathOperations.multiply(num1, num2)}` );
console.log( `Addition: ${mathOperations.divide(num1, num2)}` );