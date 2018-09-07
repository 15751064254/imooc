// map index page
exports.index = function (req, res) {
  res.render('../map/pages/index', {
    title: 'Map'
  })
}