
/* params */
/* obj - object */
/* options */
/* type - circle or straight тип - круглый или прямой*/
/* value - percents значение - в процентах*/
/* direction - foward or back направление - вперед или назад */
/* timing - miliseconds продолжительность анимации в милесекундах */
/* сaption - string value надпись - строковое значение */
(function(){

  /* draw functions */  
  function circlePreloadBack(canvas, caption, progress, endValue, bc){

    var ctx = canvas.getContext('2d'),
    x = canvas.offsetWidth / 2,
    y = canvas.offsetHeight / 2, 
    radius = canvas.offsetWidth / 2, 
    startAngle = 0, 
    endAngle = -360*progress*endValue,
    color = null;

    // console.log('endAngle - '+endAngle);

    ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);

    for (var i = 0; i < bc.length; i++) {

      if(endAngle < -bc[i].to){
        color = setColorShema(bc, i, ctx, canvas, x, y, radius, true);
        strokeArc(ctx, 10, color, x, y, radius, -bc[i].from, -bc[i].to, true); 
      }else{
        color = setColorShema(bc, i, ctx, canvas, x, y, radius, true);
        startAngle = -bc[i].from;
        break;
      }
    }

    strokeArc(ctx, 10, color, x, y, radius, startAngle, endAngle, true);  

    if(caption !== null)
      caption.textContent = Math.round(progress*endValue*100) + "%";
    
  }

  function circlePreloadForward(canvas, caption, progress, endValue, bc){

    var ctx = canvas.getContext('2d'),
    x = canvas.offsetWidth / 2,
    y = canvas.offsetHeight / 2, 
    radius = canvas.offsetWidth / 2, 
    startAngle = 0, 
    endAngle = 360*progress*endValue,
    color = null;
    

    ctx.clearRect(0,0,canvas.offsetWidth,canvas.offsetHeight);

    for (var i = 0; i < bc.length; i++) {

      console.log('endAngle - '+endAngle+' bc[i].to - '+bc[i].to);

      if(endAngle > bc[i].to){
        color = setColorShema(bc, i, ctx, canvas, x, y, radius, false);
        strokeArc(ctx, 12, color, x, y, radius, bc[i].from, bc[i].to, false); 
      }else{
        color = setColorShema(bc, i, ctx, canvas, x, y, radius, false);
        startAngle = bc[i].from;
        console.log('startAngle - '+ startAngle+' bc[i].to - '+bc[i].to);
        break;
      }
    }

    console.log('startAngle - '+ startAngle);
    
    strokeArc(ctx, 12, color, x, y, radius, startAngle, endAngle, false);  

    if(caption !== null)
      caption.textContent = Math.round(progress*endValue*100) + "%";
    
  }

  function linePreloadForward(canvas, caption, progress, endValue, bc){
    
  }

  function getDraw(fun, dir){
    var res = null;

    switch(fun) {
      case 'circle':  
        
        res = !dir ? circlePreloadForward: circlePreloadBack;
        break;
    
      case 'line':  
        
        res = !dir ? linePreloadForward : linePreloadBack;
        break;

      default:
        res = circlePreloadForward;  
    }

    return res;  
  }

  function strokeArc(ctx, lw, bc, x, y, r, sa, ea, acw){
    ctx.beginPath();
    ctx.lineWidth = lw;
    ctx.strokeStyle = bc;
    var sAngle = sa*Math.PI/180,
        eAngle = ea*Math.PI/180;

    ctx.arc(x, y, r, sAngle, eAngle, acw);
    ctx.stroke();
  }
 
  /* timing functions */
  function getTimming(fun){

    var res = null;

    switch(fun) {
      case 'linear':  
        
        res = linear;
        break;
    
      case 'power':  
        
        res = power;
        break;
    
      case 'arc':

        res = arc;
        break;

      default:
        res = linear;  
    }

    return res;
  }

  function linear(timeFraction) {
    return timeFraction;
  }

  function power(progress, pow) {
    return Math.pow(progress, pow || 2);
  }

  function arc(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction))
  }

  function elastic(x, timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
  }

  function bounce(timeFraction) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
      }
    }
  }

  function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }

  /* color shema */
  function toDecartFromPolar(r, angl, x0, y0){
    return {
      x: x0 + r*Math.cos(angl*Math.PI/180),
      y: y0 + r*Math.sin(angl*Math.PI/180)
    };
  }

  function setColorShema(bc, i, ctx, canvas, x, y, r, dir){
    /* функция определения цветовой схемы для текущей дуги */
    var color = null;
    
    if(bc[i].fillType == 'line')
      color = bc[i].bcColor;
    else if(bc[i].fillType == 'gradient'){
      var coord1 = toDecartFromPolar(r, !dir ? bc[i].from : 0-bc[i].from, x, y),
          coord2 = toDecartFromPolar(r, !dir ? bc[i].to : 0-bc[i].to, x, y);

      color = ctx.createLinearGradient(coord1.x, coord1.y, coord2.x, coord2.y);
      if(bc.length > 1){
        if(i == 0){
          color.addColorStop(0, bc[i].bcColor);
          color.addColorStop(1, bc[i+1].bcColor);
        }else if(i == bc.length-1){
          color.addColorStop(0, bc[i-1].bcColor);
          color.addColorStop(1, bc[i].bcColor);
        }else{
          color.addColorStop(0, bc[i-1].bcColor);
          color.addColorStop(0.5, bc[i].bcColor);
          color.addColorStop(1, bc[i+1].bcColor);
        }
      }else{
        color.addColorStop(0, bc[i].bcColor);
        color.addColorStop(1, 'transparent');
      }
    } 

    return color;
  }
  
  function getColorShema(bc){

    try{
      var res = [];

      if(typeof bc === 'object' && bc instanceof Array){
        var sum = 0;
        for (var i = 0; i < bc.length; i++) {
          if(typeof bc[i] === 'object'){
            var o = {};
            if(i == 0){
              o.from = 0;
              o.to = bc[i].val*360/100;
              o.bcColor = bc[i].bcColor;
              o.fillType = bc[i].fillType;
            }else{

              o.from = sum;
              o.to = bc[i].val*360/100 + sum;
              o.bcColor = bc[i].bcColor;
              o.fillType = bc[i].fillType;
            }
            sum = o.to;
            res.push(o);
          }
        }  
      
      }else if(typeof bc === 'string'){
        res = { val: 100,
                 bcColors: bc
              };
      }

      return res;

    }catch(err){
      console.log('цветовая схема должна быть задана строкой или массивом из объектов с полями:');
      console.log('val - значение указывающее на прогрес(задается в процентах)');
      console.log('bcColors - строка или массив с указанеим цветов');
    }
  }

  /*  */
  function Preload($, options){

    /* wrapper object */
    this.$ = $;

    /* type preloader */
    this.type = options.type;

    /* length progress */
    this.value = options.value;

    /* direction progress */
    this.direction = false || options.direction;

    /* duration progress */
    this.duration = options.duration;

    /* caption */
    this.caption = false || options.caption;

    /* background color brogress bar */
    this.bc = getColorShema(options.bc);

    /* timing function */
    this.timing = typeof options.timing === 'function' ? options.timing : getTimming(options.timing);

    /* draw function */
    this.draw = typeof options.draw === 'function' ? options.draw : getDraw(options.type, this.direction);

    /*  */
    this.$.style.position = "relative";

    var canvas = document.createElement('canvas');
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.width = this.$.offsetWidth;
    canvas.height = this.$.offsetHeight;
    canvas.style.borderRadius = "50%";
    if(this.caption)
      canvas.style.backgroundColor = "#fff";
    else
    canvas.style.backgroundColor = "transparent";  
    canvas.style.zIndex = "100";
    
    this.$.appendChild(canvas);

    var div = null;
    if (this.caption){
      div = document.createElement('div');
      div.style.position = "absolute";
      div.style.top = "50%";
      div.style.left = "50%";
      div.style.transform = "translate(-50%, -50%)";
      div.style.color = "#1261a7";
      div.style.fontFamily = "'Amatic SC', cursive";
      div.style.fontSize = "22px";
      div.style.fontWeight = "600";
      div.style.textAlign = "center";
      div.style.zIndex = "200";
      div.style.opacity = "1";
      var divText = document.createTextNode('0%');

      div.appendChild(divText);
      this.$.appendChild(div);
    }  
    this.canvas = canvas;
    this.caption = div;
    
  }

  Preload.prototype.run = function(){
    
    function animate(){

      var that = this;
      return new Promise(function(res){

      var start = null;
      var progress = 0;
    
        requestAnimationFrame(function animate(time) {
          // timeFraction от 0 до 1
          if (!start) start = time;
          var timeFraction = (time - start) / that.duration;
          if (timeFraction > 1) timeFraction = 1;

          // текущее состояние анимации
          progress = that.timing(timeFraction) 
          
          that.draw(that.canvas, that.caption, progress, that.value/100, that.bc, that.direction);
      
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }else{
            res(that);
          }
        });
      });
    }

    animate.call(this).then((that)=>{
      if(that.caption){
        that.caption.style.transition = "opacity .5s ease .3s";
        that.caption.style.opacity = "0";
      }  

      that.canvas.style.transition = "background-color .5s ease .5s";
      that.canvas.style.backgroundColor = "transparent";
    });  
  }

  window.Preload = Preload;

}());