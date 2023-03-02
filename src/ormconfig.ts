import { ConnectionOptions } from 'typeorm'
import { TYPE, HOST, PORT, USERNAME, PASSWORD, DATABASE } from './contstants'

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
    entities: [
        `./${process.env.BUILD ? 'bin' : 'src'}/entity/*.${
            process.env.BUILD ? 'js' : 'ts'
        }`,
    ],
    cli: {
        entitiesDir: `./${process.env.BUILD ? 'bin' : 'src'}/entity`,
    },
} as ConnectionOptions
