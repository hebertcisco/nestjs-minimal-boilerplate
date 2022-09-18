const { join } = require('path');
const { execSync } = require('child_process');

const directoryToWork = `${join(__dirname, '..')}`;

(async () => {
    execSync(`cp ${directoryToWork}/.env.example ${directoryToWork}/.env`);

    execSync(
        `docker-compose up dev`,
    );
})();