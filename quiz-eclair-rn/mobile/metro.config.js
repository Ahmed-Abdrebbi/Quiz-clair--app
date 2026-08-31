const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const customBlockList = [
  /[\\/\\\\]AppData[\\/\\\\]/,
  /[\\/\\\\]ElevatedDiagnostics[\\/\\\\]/,
];

if (config.resolver.blockList) {
  if (Array.isArray(config.resolver.blockList)) {
    config.resolver.blockList = [...config.resolver.blockList, ...customBlockList];
  } else {
    config.resolver.blockList = [config.resolver.blockList, ...customBlockList];
  }
} else {
  config.resolver.blockList = customBlockList;
}

module.exports = config;
