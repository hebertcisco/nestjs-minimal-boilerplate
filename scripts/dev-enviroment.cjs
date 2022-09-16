const { join } = require('path');
const { execSync } = require('child_process');
const os = require('os');
const dotenv = require('dotenv');

dotenv.config();

if (os.platform() === 'win32') {
    return process.exit(0);
}
const directoryToWork = `${join(__dirname, '..')}`;

(async () => {
    execSync(`cp ${directoryToWork}/.env.example ${directoryToWork}/.env`);

    const { POSTGRES_PASSWORD, POSTGRES_USER, REDIS_PASSWORD } = process.env;
    execSync(
        `docker run --name db_pg -p 5432:5432 -e POSTGRES_PASSWORD=${POSTGRES_PASSWORD} -e POSTGRES_USER=${POSTGRES_USER} -d postgres:11`,
    );
    execSync(`docker run -d  -h redis -e REDIS_PASSWORD=${REDIS_PASSWORD} -v redis-data:/data  -p 6379:6379  --name redis --restart always redis:5.0.5-alpine3.9 /bin/sh -c 'redis-server --appendonly yes --requirepass ${REDIS_PASSWORD}`);
})()