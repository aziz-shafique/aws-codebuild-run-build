// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const core = require("@actions/core");
const { runBuild } = require("./code-build");
const assert = require("assert");

/* istanbul ignore next */
if (require.main === module) {
  run();
}

module.exports = run;

async function run() {
  console.log("*****STARTING CODEBUILD*****");
  try {
    const build = await runBuild();
    console.log("*****CODEBUILD DETAILS*****");
    console.log(JSON.stringify(build));
    core.setOutput("aws-build-number", build.buildNumber.toString());

    // Signal the outcome
    assert(
      build.buildStatus === "SUCCEEDED",
      `Build status: ${build.buildStatus}`
    );
  } catch (error) {
    console.log("*****CODEBUILD ERROR*****");
    console.log(error.message);
    core.setFailed(error.message);
  } finally {
    console.log("*****CODEBUILD COMPLETE*****");
  }
}
