export default function importAPI () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap);
    } else {
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = "https://webapi.amap.com/maps?v=1.4.15&key=c53c3b4ab77aa34fc2f75b57004bbc10&callback=initAMap&plugin=AMap.Geolocation";
		script.onerror = reject;
		document.head.appendChild(script);
		
		//引入UI组件库
		const script2 = document.createElement('script')
		script.type = "text/javascript";
		script2.src = 'https://webapi.amap.com/ui/1.0/main-async.js'
		document.head.appendChild(script2);
		console.log("引入api")
    }
    window.initAMap  = () => {
      resolve(window.AMap);
    };
  });
}