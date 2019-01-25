var map = new AMap.Map("container", {
     center: [116.397559, 39.89621],
     zoom: 14
 });

 var drivingOption = {
     policy: AMap.DrivingPolicy.LEAST_TIME,
     // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
     ferry: 1,
     // 是否可以使用轮渡
     province: '京',
     // 车牌省份的汉字缩写
     map: map,
     panel: 'panel'
 }

 // 构造路线导航类
 var driving = new AMap.Driving(drivingOption)

 // 根据起终点经纬度规划驾车导航路线
 driving.search(new AMap.LngLat(115.635650, 39.745660), new AMap.LngLat(115.599145, 39.684890),
 function(status, result) {
     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-        search#m_DrivingResult
     if (status === 'complete') {
         log.success('绘制驾车路线完成')
         var routes = result.routes[0].steps;
         for (var index in routes) { //遍历json数组时，这么写index为索引，0,1
             console.log(routes[index].start_location.lng + ',' + routes[index].start_location.lat);
             //console.log(routes[index].end_location.lng + ',' + routes[index].end_location.lat);
         }
     } else {
         log.error('获取驾车数据失败：' + result)
     }
 });
