"use strict";

var _merge = require("@graphql-tools/merge");

var _loadFiles = require("@graphql-tools/load-files");

const typesArray = (0, _loadFiles.loadFilesSync)('**/*.gql');
module.exports = (0, _merge.mergeTypeDefs)(typesArray);