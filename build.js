const {ondc_build} = require("ondc-build-utility")
var base_yaml = "./api/components/beckn_yaml.yaml";
var example_yaml = "./api/components/index.yaml";
var outputPath = "./api/build/build.yaml";
var uiPath = "./ui/build.js";
var docs = './api/components/docs'

ondc_build(base_yaml,example_yaml,outputPath,uiPath,docs)
