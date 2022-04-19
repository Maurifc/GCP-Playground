'use strict';

function f1(){
  console.log('f1() was triggered');
}

function f2(){
  console.log('f2() was triggered');
}

exports.parameters = (event, context) => {
  // Decode body
  const raw = Buffer.from(event.data, 'base64')
  
  // Turn JSON into object
  const obj = JSON.parse(raw)

  // Parse action and call the appropriated function
  switch (obj.action) {
    case 'f1':
      f1()
      break;
    case 'f2':
      f2()
      break;
  
    default:
      console.log('Unknown Action. Payload = ' + JSON.stringify(raw));
      break;
  }

  console.log('Ran with payload - ' + raw);
};