var lb = {
        pos: 0,
        index: 0,
        container: $("#lb-container"),
        lb: $("#lb"),
        img: $(".lb-img"),
        li: $("#lb-choose li"),
        timer: function (){
            lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
            if(lb.index == -6){
                lb.lb.css("left", "-100%");
                lb.index = -1;
            }
            lb.pos = --lb.index * 100 + '%';
            lb.lb.animate({left: lb.pos},500,function(){
                lb.index = lb.index == -6 ? -1 : lb.index;
                lb.li.get(-lb.index - 2 < 0 ? 4 : -lb.index -2 ).style.background = 'rgba(0,0,0,0.3)';
                lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
            });
        }
    },//定义轮播图大对象
    imgFirst = lb.img.get(0).cloneNode(true),
    imgLast = lb.img.get(4).cloneNode(true);//复制第一张图与最后一张图用作过渡

lb.lb.get(0).appendChild(imgFirst);
lb.lb.get(0).insertBefore(imgLast, lb.lb.get(0).firstChild);//插入复制的图片节点
lb.li.get(0).style.background = 'rgb(0,0,0)'; //首亮

var start = setInterval(lb.timer,4000); //开始轮播

lb.container.delegate(".glyphicon-chevron-left", "click", function(){
    lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
    lb.pos = ++lb.index * 100 + "%";
    lb.lb.animate({left: lb.pos},500,function(){
        if(lb.pos == "0%"){
            lb.lb.css("left","-500%");
        }
        lb.li.get(-lb.index).style.background = 'rgba(0,0,0,0.3)';
        lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
    });
}).delegate(".glyphicon-chevron-right", "click", function() {
    lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
    lb.pos = --lb.index * 100 + "%";
    lb.lb.animate({left: lb.pos}, 500,function(){
        if(lb.pos == "-600%"){
            lb.lb.css("left","-100%");
        }
        lb.index = lb.index == -6 ? -1 : lb.index;
        lb.li.get(-lb.index - 2 < 0 ? 4 : -lb.index -2 ).style.background = 'rgba(0,0,0,0.3)';
        lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
    });
}).bind("mouseleave",function(){
    start = setInterval(lb.timer,4000); //重新开始轮播
}).bind("mouseenter",function(){
    clearInterval(start);
});

lb.li.mouseenter(function (){
    lb.li.css("background","rgba(0,0,0,0.3)");
    $(this).css("background","rgb(0,0,0)");
    lb.lb.animate({left: -(lb.li.index($(this)) + 1) * 100 + "%"});
});
