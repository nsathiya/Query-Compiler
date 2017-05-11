var parseString = require('./parser').parseString;

//Would use Mocha test framework

var testString1 = 'error OR info';
var testString2 = '>400 <500';
var testString3 = '="TEST DATA" OR >len(9)';
var testString4 = '!false';
var testString5 = '="TEST DATA" >len(9)';
var testString6 = '( >400 <500 ) AND !false';
var testString7 = '( >400 <500 ) AND ( !false OR >len(9) )';
var testString8 = '( >400 <=500 ) AND ( !false OR >=len(9) )';
var testString9 = 'error OR ( info AND test )';
var testString10 = 'error OR ( info OR test )';
var testString11 = '( error OR info ) OR test';
var testString12 = 'error OR info AND test'; // should not work
var testString13 = 'error OR info OR test'; // should not work
var testString14 = '=error OR ( =info OR ( =test OR =flag ) )';


console.log(testString1);
console.log(JSON.stringify(parseString(testString1), null, 2));
console.log(testString2);
console.log(JSON.stringify(parseString(testString2), null, 2));
console.log(testString3);
console.log(JSON.stringify(parseString(testString3), null, 2));
console.log(testString4);
console.log(JSON.stringify(parseString(testString4), null, 2));
console.log(testString5);
console.log(JSON.stringify(parseString(testString5), null, 2));
console.log(testString6);
console.log(JSON.stringify(parseString(testString6), null, 2));
console.log(testString7);
console.log(JSON.stringify(parseString(testString7), null, 2));
console.log(testString8);
console.log(JSON.stringify(parseString(testString8), null, 2));
console.log(testString9);
console.log(JSON.stringify(parseString(testString9), null, 2));
console.log(testString10);
console.log(JSON.stringify(parseString(testString10), null, 2));
console.log(testString11);
console.log(JSON.stringify(parseString(testString11), null, 2));
console.log(testString12);
console.log(JSON.stringify(parseString(testString12), null, 2));
console.log(testString13);
console.log(JSON.stringify(parseString(testString13), null, 2));
console.log(testString14);
console.log(JSON.stringify(parseString(testString14), null, 2));
