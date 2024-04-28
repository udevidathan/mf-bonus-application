const tar = require("tar");

const fs = require("fs");

const rimraf = require("rimraf");

const project = process.argv[process.argv.length - 1];
const copydir = require("copy-dir");
const fx = require("mkdir-recursive");

const packageJson = require("./package.json");

const { versions } = packageJson;

if (!project) {
  console.error("Please provide project as an argument");
  process.exit(1);
}

if (!versions.hasOwnProperty(project)) {
  console.error(`${project} is not a valid application`);
  process.exit(1);
}

function getAppVersion(project) {
  return versions[project];
}

function stagingLocation() {
  const root = "./tmp";
  const path = `${root}/package/dist`;

  // if (fs.existsSync(root)) rimraf.sync(root);
  fx.mkdirSync(path);
  copydir.sync(`./dist`, path);

  return root;
}

function _tar() {
  const stagingRoot = stagingLocation();
  const file = `${project}.tgz`;

  // Tar staging folder
  tar
    .c(
      {
        gzip: true,
        file,
        cwd: stagingRoot,
      },
      ["./package"]
    )
    .then(() => {
      console.log(`${file} has been created successfully`);

      // Cleanup temporary pacakage root
      // rimraf.sync(stagingRoot);
    })
    .catch((e) => console.error(e));
}

_tar();
