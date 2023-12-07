/******************************

[rewrite_local]
^https:\/\/(api-ks|xiaoshuo)\.wtzw\.com\/api\/(v1\/extra\/init|v3\/user\/my-center) url script-request-header https://raw.githubusercontent.com/Kyle0816/Quantumult-X/main/Rewrite/7mao.js
# 重定向福利活动页面，链接可以改成想改的网页
^https:\/\/xiaoshuo\.wtzw\.com\/app-h5\/freebook\/welfare-center.*$ 302 https://baidu.com

[mitm]
hostname = api-gw.wtzw.com, xiaoshuo.wtzw.com,api-ks.wtzw.com

********************************/
	
if ($request.url.includes("/api/v1/extra/init")) {
  var obj = JSON.parse($response.body);
  obj.data.reader_floats = [];
  obj.data.reader_top_banner = [];
  $done({body : JSON.stringify(obj)});
}else if ($request.url.includes("/api/v3/user/my-center")) {
  var obj = JSON.parse($response.body);
 if(obj.data.func_area.length == 4){
  obj.data.func_area[1].list = [];
   obj.data.func_area[2].list = [];
  obj.data.func_area[3].list = obj.data.func_area[3].list.filter((_, index) => ![2, 3, 5, 6].includes(index));
 }else if(obj.data.func_area.length == 5){
  obj.data.func_area[1].list = [];
   obj.data.func_area[2].list = [];
   obj.data.func_area[3].list = [{}];
  obj.data.func_area[4].list = obj.data.func_area[4].list.filter((_, index) => ![2, 3, 5, 6].includes(index));
 }
  $done({body : JSON.stringify(obj)});
}
