import { ConnectionOptions } from 'typeorm'
import { TYPE, HOST, PORT, USERNAME, PASSWORD, DATABASE } from './constants'

export default {
    type: TYPE,
    host: HOST,
    port: PORT,
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    ssl: true,
    synchronize: true,
    logging: false,
    entities: ['./entity/*.js'],
    cli: {
        entitiesDir: `./entity`,
    },
} as ConnectionOptions
