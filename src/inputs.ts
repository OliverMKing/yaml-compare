import * as core from "@actions/core";

const FILE_1_PATH_INPUT_NAME = "file1Path";
const FILE_2_PATH_INPUT_NAME = "file2Path";

// get and export inputs
export const FILE_1_PATH_INPUT = core.getInput(FILE_1_PATH_INPUT_NAME, {
  required: true,
});
export const FILE_2_PATH_INPUT = core.getInput(FILE_2_PATH_INPUT_NAME, {
  required: true,
});
