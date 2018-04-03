/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//跨浏览器事件绑定
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener){
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  
   return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
  
/**
 * 渲染图表
 */
function renderChart() {
  
  var aqiChartWrap=document.getElementsByClassName("aqi-chart-wrap")[0];
  var divs='',color='';
  for(var time in chartData){
    var a=Math.ceil(Math.random() * 255);
    var b=Math.ceil(Math.random() * 255);
    var c=Math.ceil(Math.random() * 255);//随机产生颜色值
     color='rgb('+a+','+b+','+c+')';
     
     divs += '<div title="'+time+":"+chartData[time]+'" style="height:'+chartData[time]+'px;background-color:'+color+'"></div>';
  }
  aqiChartWrap.innerHTML=divs;
}
  


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime==this.value){
    return;
  }else {pageState.nowGraTime=this.value;}

  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
 var citySelect=document.getElementById("city-select");
 var cityAdds=new Array();
 var citySelected='北京';
function citySelectChange() {

    var cityAdd='';
    var nn=0;
      for(var cityAdd in aqiSourceData){
        cityAdds[nn] = cityAdd;
        nn++;
      }
    citySelected=cityAdds[pageState.nowSelectCity];
  // 确定是否选项发生了变化 
 if(citySelected==this.value){
  return;
 }else{citySelected=this.value;}
  
   initAqiChartData();
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
   var formGraTime = document.getElementById('form-gra-time');
   var pageRadio = formGraTime.getElementsByTagName('input');
   for (var i = 0; i < pageRadio.length; i++) {
    addEventHandler(pageRadio[i],'click',graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */

function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
      var cityAdd='';//记录城市
      for(var cityAdd in aqiSourceData){
          var citys=document.createElement('option');
          var citysText=document.createTextNode(cityAdd);
              citys.appendChild(citysText);
              citySelect.appendChild(citys);
              }    
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
addEventHandler(citySelect,'change',citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */

function initAqiChartData() {
  
  // 将原始的源数据处理成图表需要的数据格式
    
    var city={};
    city=aqiSourceData[citySelected];
    
         
        
                
        //以日为粒度     
        if(pageState.nowGraTime=='day'){
           //barAmount=chartData.length;
           chartData=city;
           //times=times;
           
        }
       
        // 以周为粒度
        if(pageState.nowGraTime=='week'){
              chartData = {};
              var weekValue=0,days=0,weeks=0;
              for(var time in city){
                weekValue +=city[time];
                days++;
                if(new Date(time).getDay()==6){
                  weeks++;
                  chartData['第'+weeks+'周']=Math.floor(weekValue/days);
                  days=0;
                  weekValue=0;
                }
              }
              if(days!=0){//最后不满一周的也能算一周
                weeks++;
                chartData['第'+weeks+'周']=Math.floor(weekValue/days);
              }
             
          }

          //以月为粒度
          if(pageState.nowGraTime=='month'){
             chartData = {};
             var monthValue=0,days=0,month=0;
             for(var time in city){
              monthValue +=city[time];
              days++;
              if(new Date(time).getMonth()!==month){
                month++;
                chartData['第'+month+'月']=Math.floor(monthValue/days);
                monthValue=0;
                days=0;
              }
             }
             if(days!=0){//最后不满一个月也算一个月
                month++;
                chartData['第'+month+'月']=Math.floor(monthValue/days);
              }
          }
            
            renderChart();
        }  
 
      
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
      
  // 处理好的数据存到 chartData 中
  

/**
 * 初始化函数
 */
function init(){
  initCitySelector();
  initGraTimeForm();
  initAqiChartData();
}

init();
