var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397, lng: 150.644
    },
    zoom: 8
  })
}
var map = new AMap.Map('map',{
  resizeEnable:true, //是否监控地图容器尺寸变化
  zoom:11, //初始化地图层级
  center:[116.397428, 39.90923] //初始化地图中心点

});
