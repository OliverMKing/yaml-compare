import * as core from "@actions/core";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { FILE_1_PATH_INPUT, FILE_2_PATH_INPUT } from "./inputs";

async function run() {
  const file1Objs = getYamlObjs(FILE_1_PATH_INPUT);
  const file2Objs = getYamlObjs(FILE_2_PATH_INPUT);

  core.info(`Comparing ${FILE_1_PATH_INPUT} to ${FILE_2_PATH_INPUT}`);
  if (dumpYamlObjs(file1Objs) !== dumpYamlObjs(file2Objs)) {
    throw Error("YAML files are not equal");
  }
}

function getYamlObjs(path: string): any[] {
  core.info(`Loading file ${path}`);
  const file = fs.readFileSync(FILE_1_PATH_INPUT, "utf8");
  return yaml.loadAll(file);
}

function dumpYamlObjs(objs: any[]): string {
  return objs.map((obj) => yaml.dump(obj)).join("---\n");
}

run().catch(core.setFailed);
