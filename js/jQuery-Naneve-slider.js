(function($) {
    var namespace = "listInit";
    var index = 0;
    var timer = null;
    var methods = {
        slider:function(useroption){
            newoption = $.extend({},$.fn[namespace].option,useroption);
            console.log(newoption);
            // 图片样式初始化
            $(this).width(newoption.width).height(newoption.height);
            // 如果要加载左右导航
            if(newoption.loadNav){
                // 给左右导航添加样式
                var pre = $('<li></li>').addClass('pre');
                var next = $('<li></li>').addClass('next');
                $('.list').append(pre).append(next);

                // 给左右导航添加事件
                pre.on('click',function(){
                    if(index-- === 0)index=4;
                    changeImg();
                })
                next.click(function(){
                    if(index++ === 4)index=0;
                    changeImg();
                });
            }
            // 如果要加载圆点选项卡
            if(newoption.loadTab){
                // 新建结点,给每个li添加一个data-id
                var ul = $('<ul></ul>');
                for(var i=0;i<5;i++){
                    var li = $('<li></li>').data('id', i+1);
                    console.log(li.data('id'));
                    ul.append(li);
                    // console.log(li.data('id'));
                }
                $('.slider').append(ul);
                // 给tab圆点选项卡添加样式
                ul.addClass('tab-list');

                // 事件委托来处理点击事件
                ul.on('click',function(event){
                        index = $(event.target).data('id') || index;//如果点击li之外的位置，就让他的index不变
                        index--;
                        console.log(index);
                        changeImg();
                })

            }
            // 添加自动轮询事件
            var switchTime = parseInt(newoption.switchTime);
            function auto(){
                timer = setInterval(function(){
                    if(index++ === 4)index = 0;
                    changeImg();
                },switchTime);
            }
            // 页面加载图片自动轮询
            auto();
            changeImg();
            $(this)
            .on('mouseout',auto)
            .on('mouseover',function(){
                clearInterval(timer);
            })

            return this; //链式语法
        }
    }
    // 根据Index来显示图片和tab圆点
    function changeImg(){
        $('.list li').removeClass('pic-active').eq(index).addClass('pic-active');
        $('.tab-list li').removeClass('tab-active').eq(index).addClass('tab-active');
    }
    // 给jquery对象添加插件
    $.fn[namespace] = function(usermethod){
        if(usermethod === "undefined"){
            return methods['slider'].call(this);
        }
        else if(methods[usermethod]){
            return methods[usermethod].apply(this,Array.prototype.slice.call(arguments, 1));
        }
        else if(usermethod === "object"){
            return methods['slider'].call(useroption);
        }
    }
    $.fn[namespace].option = {
        width:'1200px',
        height:'460px',
        loadNav:true,
        loadTab:true,
        switchTime:'2000'
    }
})(jQuery);