module.exports = {
    development: {
        username: process.env['USERNAME_DEVELOPMENT'],
        password: process.env['PASSWORD_DEVELOPMENT'],
        database: process.env['DATABASE_DEVELOPMENT'],
        host: process.env['HOST_DEVELOPMENT'],
        dialect: process.env['DIALECT_DEVELOPMENT']
    },
    test: {
        username: process.env['USERNAME_TEST'],
        password: process.env['PASSWORD_TEST'],
        database: process.env['DATABASE_TEST'],
        host: process.env['HOST_TEST'],
        dialect: process.env['DIALECT_TEST']
    },
    production: {
        username: process.env['USERNAME_PRODUCTION'],
        password: process.env['PASSWORD_PRODUCTION'],
        database: process.env['DATABASE_PRODUCTION'],
        host: process.env['HOST_PRODUCTION'],
        dialect: process.env['DIALECT_PRODUCTION']
    }
}
