// Init F7 Vue Plugin
Vue.use(Framework7Vue)

// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
})
Vue.component('page-form', {
  template: '#page-form'
})
Vue.component('page-dynamic-routing', {
  template: '#page-dynamic-routing'
})

// Init App
new Vue({
  el: '#app',
	data:{ 
				sl01 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/TDJZ/MapServer',opacity: 0.7,maptype:'sl01',added:false}),
				sl02 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/0805/MapServer',opacity: 0.7,maptype:'sl02',added:false}),
				sl03 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/DWHHSJ/MapServer',opacity: 0.7,maptype:'sl03',added:false}),
				sl04 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/GDJT/MapServer',opacity: 0.7,maptype:'sl04',added:false}),
				sl05 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/LAYD/MapServer',opacity: 0.7,maptype:'sl05',added:false}),
				sl06 : L.esri.dynamicMapLayer({url: 'http://14.23.112.28:81/arcgis/rest/services/SL/TDJZ/MapServer',opacity: 0.7,maptype:'sl06',added:false})
			},
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: [
      {
        path: '/about/',
        component: 'page-about'
      },
      {
        path: '/form/',
        component: 'page-form'
      },
      {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: 'page-dynamic-routing'
      }
    ],
  },
	methods:{
		addLayer:function(event){
			var lname = event.target.attributes.value;
			if(!this[lname].options.added){
				this[lname].options.added = true;
				this[lname].addTo(map);
			}else{
				map.eachLayer(function(layer){
						if(layer.options.maptype == lname){
								map.removeLayer(layer);
						}
				});
			}
		}
	}
});


	var map = L.map("br-map", {
    // center: [37.71, -99.88],
    center: [23, 113.25],
    zoom: 10,
    zoomControl: false,
    attributionControl:false
});

customBaselayer= L.esri.basemapLayer("GaodeVec");
map.addLayer(customBaselayer);  

L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map);

var loc = new L.control.loc();
loc.addTo(map)

var sl01 = L.esri.dynamicMapLayer({
    url: 'http://14.23.112.28:81/arcgis/rest/services/SL/TDJZ/MapServer',
    opacity: 0.7,
		maptype:'sl01',
  })

var dxtfirst = false;
var dxtMapon = true;

$('.list-group-item').on('click',function(e){
    var className = e.target.className
    if($(e.target).hasClass('active')){
        $(e.target).removeClass('active')
         map.eachLayer(function(layer){
                    if(layer.options.maptype == 'dxt'){
                        // layer.setOpacity(0);
                        map.removeLayer(layer);
                        dxtMapon = false;
                    }
                })
    }else{
        $(e.target).addClass('active')
        $(e.target).siblings().removeClass('active')
        if(!dxtfirst){
            dxt.addTo(map);
            dxtfirst = true;
        }else{
            if(!dxtMapon){     
                map.addLayer(dxt)           
                // map.eachLayer(function(layer){
                //     if(layer.options.maptype == 'dxt'){
                //         // layer.setOpacity(1);
                //         dxtMapon = true;
                //     }
                // })
                dxtMapon = true;
            }
        }
    }
})
