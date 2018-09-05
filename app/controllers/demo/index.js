// demo index page
exports.index = function(req, res) {
  res.render('../demo/pages/index', {
    title: 'demo index'
  })
}
