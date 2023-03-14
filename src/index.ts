import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { createConnection } from 'typeorm'
import schema from './schema/index'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
import ormconfig from './ormconfig'

const app = express()

createConnection(ormconfig)
    .then(async (connection) => {
        app.use(cors())
        app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))
        app.listen(4000, () =>
            console.log('listening on http://localhost:4000')
        )
    })
    .catch((e) => console.log(e))
