'use strict';

module.exports = (task) => {
  return function() {
    const archy = require('archy');
    const tree = { label: 'gulp', nodes: [] };
    const tasks = require('gulp/lib/taskTree')(this.tasks);
    const nodesList = {};

    tasks.nodes.forEach(({label}) =>
      tree.nodes.push(nodesList[label] = { label: label, nodes: [] })
    );

    tasks.nodes.forEach(({ label, nodes }) =>
      nodes.forEach(dep => nodesList[label].nodes.push(nodesList[dep]))
    );

    const sortByLabel = (n1, n2) => n1.label.localeCompare(n2.label);
    const sortNodes = nodes => {
      nodes.sort(sortByLabel);
      nodes.forEach(({nodes}) => sortNodes(nodes));
    }

    sortNodes(tree.nodes);
    console.log(archy(nodesList[task] || tree));
  };
}
