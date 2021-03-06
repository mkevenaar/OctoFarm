const dbHandler = require("../db-handler");
const request = require("supertest");
const { setupTestApp, getServer } = require("../../app-test");
const isDocker = require("is-docker");
const {AppConstants} = require("../../server_src/app.constants");
const envUtils = require("../../server_src/utils/env.utils");
const path = require("path");

let app = null;
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await dbHandler.clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  if (!!app) {
    getServer().close();
  }
  await dbHandler.closeDatabase();
  jest.clearAllTimers();
});

async function getOrCreateApp() {
  if (!app) {
    app = await setupTestApp();
  }
  return app;
}

jest.mock("../../server_src/runners/githubClient");
const softwareUpdateChecker = require("../../server_src/runners/softwareUpdateChecker");

describe("AmIAlive Endpoint", () => {
  it("should return ok and no update", async () => {
    process.env[AppConstants.VERSION_KEY] = require("../../package.json").version;
    process.env.testlatest_package_version = require("../../package.json").version;
    app = await getOrCreateApp();
    await softwareUpdateChecker.syncLatestOctoFarmRelease();

    const res = await request(app).get("/serverchecks/amialive").send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ok");
    expect(res.body.isDockerContainer).toEqual(isDocker());
    expect(res.body.isPm2).toEqual(false);
    expect(res.body).toHaveProperty("update");
    expect(res.body.update.installed_release_found).toEqual(true);
    expect(res.body.update.update_available).toEqual(false);
  }, 15000);

  it("should look for octofarm update", async () => {
    // Ensure that the update sync has completed by explicit call
    process.env.testlatest_package_version = "0.0.0-TEST";
    process.env[AppConstants.VERSION_KEY] = "1.1.1-TEST";
    app = await getOrCreateApp();
    await softwareUpdateChecker.syncLatestOctoFarmRelease();

    // Perform API action
    const res = await request(app).get("/serverchecks/amialive").send();

    // Assert response
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("update");
    expect(res.body.isDockerContainer).toEqual(isDocker());
    expect(res.body.isPm2).toEqual(false);
    expect(res.body.update.update_available).toEqual(false);
    expect(res.body.update.installed_release_found).toEqual(false);
  }, 15000);

  it("should tolerate undefined package version", async () => {
    // Ensure that the update sync has completed by explicit call
    process.env.testlatest_package_version = "0.0.0-TEST";
    process.env[AppConstants.VERSION_KEY] = undefined;
    app = await getOrCreateApp();
    await softwareUpdateChecker.syncLatestOctoFarmRelease();

    // Perform API action
    const res = await request(app).get("/serverchecks/amialive").send();

    // Assert response
    expect(res.body.update.installed_release_found).toEqual(false);
    expect(res.body.update.update_available).toEqual(false);
  }, 15000);

  it("should tolerate being air-gapped silently", async () => {
    process.env.test_airgapped = true;
    process.env[AppConstants.VERSION_KEY] = undefined;
    app = await getOrCreateApp();
    await softwareUpdateChecker.syncLatestOctoFarmRelease();

    // Perform API action
    const res = await request(app).get("/serverchecks/amialive").send();

    // Assert response
    expect(res.body.update.update_available).toEqual(false);

    delete process.env.test_airgapped;
  });
});

describe("Dashboard rendering", () => {
  it("should show login page by redirect", async () => {
    app = await getOrCreateApp();
    const res = await request(app)
      .get("/dashboard")
      .send() // We should be redirected to login by default
      .expect(302)
      .then((response) => {
        expect(response.text).toEqual("Found. Redirecting to /users/login");
      });
  });
});

describe("Env util package.json check", () => {
  it("should pass validation", () => {
    expect(envUtils.verifyPackageJsonRequirements(__dirname)).toEqual(false);

    expect(
      envUtils.verifyPackageJsonRequirements(path.join(__dirname, "mock-data"))
    ).toEqual(true);
  });
});

// ["/dashboard","/printers","/filemanager","/history","/mon/panel","/mon/camera","/mon/printerMap","/mon/list","/mon/currentOp","/filament","/system","/serverChecks/amialive","/printers/add","/printers/update","/printers/remove","/printers/removefile","/printers/removefolder","/printers/resyncFile","/prin
//   ters/stepChange","/printers/flowChange","/printers/feedChange","/printers/updateSettings","/printers/killPowerSettings/:id","/printers/groups","/printers/printerInfo","/printers/runner/checkOffline","/printers/moveFile","/printers/moveFolder","/printers/newFolder","/printers/newFiles","/printers/selectFilament","/printers/reScanOcto","/printers/wakeH
// ost","/printers/updateSortIndex","/printers/connectionLogs/:id","/printers/pluginList/:id","/printers/scanNetwork","/groups/list","/settings/server/logs","/settings/server/logs/:name","/settings/server/logs/generateLogDump","/settings/server/delete/database/:name","/settings/server/get/database/:name","/settings/server/restart","/settings/server/upda
// te","/settings/server/update/check","/settings/client/get","/settings/client/update","/settings/backgroundUpload","/settings/server/get","/settings/sysInfo","/settings/customGcode/delete/:id","/settings/customGcode/edit","/settings/customGcode","/printersInfo/get/","/dashboardInfo/get/","/monitoringInfo/get/","/filament/get/printerList","/filament/ge
// t/profile","/filament/get/filament","/filament/get/dropDownList","/filament/select","/filament/save/filament","/filament/delete/filament","/filament/edit/filament","/filament/save/profile","/filament/edit/profile","/filament/delete/profile","/filament/filamentManagerReSync","/filament/filamentManagerSync","/filament/disableFilamentPlugin","/history/u
// pdate","/history/delete","/history/get","/history/statisticsData","/history/updateCostMatch","/history/statistics/:id","/scripts/get","/scripts/delete/:id","/scripts/test","/scripts/save","/scripts/edit","/input/roomData","/client/updateFilter/:filter","/client/updateSorting/:sorting","*"]
