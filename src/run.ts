import * as core from "@actions/core";
import * as fs from "fs";
import * as yaml from "yaml";
import { FILE_1_PATH_INPUT, FILE_2_PATH_INPUT } from "./inputs";

async function run() {
  core.info(`Loading file ${FILE_1_PATH_INPUT}`);
  const file1 = fs.readFileSync(FILE_1_PATH_INPUT, "utf8");
  const file1Obj = yaml.parse(file1);

  core.info(`Loading file ${FILE_2_PATH_INPUT}`);
  const file2 = fs.readFileSync(FILE_2_PATH_INPUT, "utf8");
  const file2Obj = yaml.parse(file2);

  core.info(`Comparing ${FILE_1_PATH_INPUT} to ${FILE_2_PATH_INPUT}`);
  if (yaml.stringify(file1Obj) !== yaml.stringify(file2Obj)) {
    core.setFailed(
      `${FILE_1_PATH_INPUT}'s YAML is not equal to ${FILE_2_PATH_INPUT}`
    );
  }
}

run().catch(core.setFailed);
