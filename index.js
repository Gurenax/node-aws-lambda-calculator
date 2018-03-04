const R = require('ramda')

exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2))
  if (
    event.a === undefined ||
    event.b === undefined ||
    event.op === undefined
  ) {
    callback('400 Invalid Input')
  }
  if (isNaN(event.a) || isNaN(event.b)) {
    callback('400 Invalid Operand')
  }
  try {
    const response = calculate(event)
    callback(null, response)
  }
  catch(error) {
    callback(error)
  }
}

// Best practice to separate functions from handler
const calculate = params => {
  let result = 0
  switch (params.op) {
    case '+':
    case 'add':
      result = R.add(params.a, params.b)
      break
    case '-':
    case 'sub':
      result = R.subtract(params.a, params.b)
      break
    case '*':
    case 'mul':
      result = R.multiply(params.a, params.b)
      break
    case '/':
    case 'div':
      result = R.divide(params.a, params.b)
      break
    default:
      throw new Error('400 Invalid Operator')
  }
  return {
    a: params.a,
    b: params.b,
    op: params.op,
    result: result
  }
}
