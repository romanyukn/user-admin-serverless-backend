'use strict'
const AWS = require('aws-sdk')

module.exports = {
  create: async (event, contex) => {
    console.log(event)
    let bodyObj = {}
    try {
      bodyObj = JSON.parse(event.body)
    } catch (jsonError) {
      console.log(jsonError)
    }

    let putParams = {
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Item: {
        firstName: bodyObj.firstName,
        lastName: bodyObj.lastName,
        email: bodyObj.email,
        password: bodyObj.password
      }
    }

    let putResults = {}
    try {
      let dynamodb = new AWS.DynamoDB.DocumentClient()
      putResults = await dynamodb.put(putParams).promise()
    } catch(putError) {
      console.log(putError)
    }

    return {
      statusCode: 201
    }
  },
  getAll: async (event, contex) => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello world',
      }),
    }
  }
}
