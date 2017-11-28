import bodyParser from 'body-parser'
import config from 'config'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { formatError } from 'graphql'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'

import {
  schema,
} from './schema'

const app = express()
const graphqlServer = graphqlHTTP((req, res) => ({
  schema: schema,
  graphiql: true,
  context: req,
  rootValue: {
    request: req,
    response: res,
  },
  pretty: process.env.NODE_ENV !== 'production',
  formatError: (error) => {
    let data = formatError(error)
    const {originalError} = error

    if (originalError) {
      data = {
        ...data,
        name: get(originalError, 'name'),
        message: get(originalError, 'message'),
        code: get(originalError, 'code'),
        status: get(originalError, 'status'),
        details: get(originalError, 'details'),
        originalError,
      }
    }

    return data
  },
}))

app.use('/', (req, res) => { res.send(200) })
app.use('/graphql/batch', bodyParser.json(), graphqlBatchHTTPWrapper(graphqlServer))
app.use('/graphql', bodyParser.json(), graphqlServer)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Hackernews GraphQL server running on port ${PORT}.`)
})
