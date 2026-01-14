import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express4'
import { buildSchema } from 'type-graphql'
import { printSchema } from 'graphql'
import fs from 'fs'
import bodyParser from 'body-parser'

import { UserResolver } from '../../../modules/users/resolver/user.resolver'

export class GraphQLFactory {
    async apply(app: express.Application) {
        const schema = await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        })

        fs.writeFileSync('schema.gql', printSchema(schema))

        const server = new ApolloServer({ schema })
        await server.start()

        app.use('/graphql', bodyParser.json(), expressMiddleware(server))
    }
}
