module.exports = function(app, db) {
  app.post('/ships', (req, res) => {
    console.log(req.body)
    res.send('Hello Starship')
  });
};
