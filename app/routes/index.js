const shipsRoutes = require('./ships_routes');

module.exports = function(app, db) {
  shipsRoutes(app, db);
};
