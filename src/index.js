import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import config from 'config'
import express from 'express'
import { formatError } from 'graphql'
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer'

import {
  schema,
} from './schema'

import {
  get,
} from 'lodash'

const app = express()

const graphqlServer = graphqlExpress((req, res) => ({
  schema: schema,
  context: req,
  rootValue: {
    request: req,
    response: res,
  },
  tracing: true,
  cacheControl: true,
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

app.use(bodyParser.json())
app.use('/graphql/batch', graphqlBatchHTTPWrapper(graphqlServer))
app.use('/graphql', graphqlServer)
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Hackernews GraphQL server running on port ${PORT}.`)
})
