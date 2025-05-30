// ESM
import fastifyPlugin from 'fastify-plugin'
import fastifyMongo from '@fastify/mongodb'

async function dbConnector(fastify, options) {
  fastify.register(fastifyMongo, {
    url: 'mongodb://127.0.0.1:27017/user_management'
  })
}

export default fastifyPlugin(dbConnector)
