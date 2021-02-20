/**
 * @fileoverview The services to boot.
 */

const log = require('./services/log.service').get();

const postgresService = require('./services/postgres.service');
const expressService = require('./services/web/express.service');
const dbConnService = require('./services/db-connection.service');
const migrationService = require('./services/migration.service');

/**
 * Boots all the services of the application.
 *
 */
const appServices = (module.exports = {});

/**
 * Starts all the application's required services.
 * Triggers after all databases are connected.
 *
 * @param {Object} bootOpts A set of options.
 * @return {BPromise} a promise.
 */
appServices.boot = async (bootOpts) => {
  log.notice('Booting Services...');

  await awsService.init();

  await dbConnService.init();

  await postgresService.init();

  await migrationService.runHerokuMigration();

  await expressService.init(bootOpts);

  await policies.init();

  log.notice('Service Boot Finished');
};

/**
 * Dispose of all needed services for a gracefull shutdown.
 *
 * @return {Promise<void>}
 */
appServices.dispose = async () => {
  await postgresService.dispose();
  await redisService.disposeAll();
};
