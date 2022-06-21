import * as core from "@actions/core";
import * as fs from "fs";
import * as yaml from "js-yaml";
import { FILE_1_PATH_INPUT, FILE_2_PATH_INPUT } from "./inputs";

async function run() {
  const file1Objs = getYamlObjs(FILE_1_PATH_INPUT);
  const file2Objs = getYamlObjs(FILE_2_PATH_INPUT);

  core.info(`Comparing ${FILE_1_PATH_INPUT} to ${FILE_2_PATH_INPUT}`);
  if (!objEquals(file1Objs, file2Objs)) {
    throw Error("YAML files are not equal");
  }
}

function getYamlObjs(path: string): any[] {
  core.info(`Loading file ${path}`);
  const file = fs.readFileSync(FILE_1_PATH_INPUT, "utf8");
  return yaml.loadAll(file);
}

// from https://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects/16788517#16788517
function objEquals(x: any, y: any): boolean {
  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  if (x instanceof Function) {
    return x === y;
  }
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false;
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }

  // recursive object equality check
  var p = Object.keys(x);
  return (
    Object.keys(y).every(function (i) {
      return p.indexOf(i) !== -1;
    }) &&
    p.every(function (i) {
      return objEquals(x[i], y[i]);
    })
  );
}

run().catch(core.setFailed);
