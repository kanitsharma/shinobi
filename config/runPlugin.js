

function runPlugin(plugin, config, { target, dev }, webpack) {
  if (typeof plugin === 'string') {
    // Apply the plugin with default options if passing only a string
    return runPlugin({ name: plugin }, config, { target, dev }, webpack);
  }

  if (typeof plugin === 'function') {
    return plugin(config, { target, dev }, webpack);
  }

  if (typeof plugin.func === 'function') {
    // Used for writing plugin tests
    return plugin.func(config, { target, dev }, webpack, plugin.options);
  }

  const completePluginName = `shinobi-plugin-${plugin.name}`;

  // Try to find the plugin in node_modules
  const shinobiPlugin = require(completePluginName);
  if (!shinobiPlugin) {
    throw new Error(`Unable to find '${completePluginName}`);
  }

  return shinobiPlugin(config, { target, dev }, webpack, plugin.options);
}

module.exports = runPlugin;
