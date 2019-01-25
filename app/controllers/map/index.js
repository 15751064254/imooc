// map index page
exports.index = function (req, res) {
  res.render('../map/amap/pages/index', {
    title: 'Map'
  })
}
// Driving route planning 驾车路线规划
exports.driving = function (req, res) {
  res.render('../map/amap/pages/driving', {
    title: 'Driving route planning'
  })
}
