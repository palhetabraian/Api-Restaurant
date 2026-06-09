//responsavel pela configuracao do knex
// knex a biblioteca para querybuilder

export default {
    client: 'sqlite3',
    connection: {
        filename: './src/database/database.db',
    },
    useNullAsDefault: true,
    migrations: {
        extensions: 'ts',
        directory: './src/database/migrations',
    },
    seeds: {
        extends: 'ts',
        directory: './src/database/seeds',
    },
};
