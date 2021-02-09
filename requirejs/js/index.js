// 当鼠标滑过code时， customer 的son的display： block， 移出为none;

// 输入框事件，当点击输入框时，input的字体颜色变浅
// 封装byClass函数
var search_nav = byClass("search-nav")[0];
var search_text = byClass("search_text")[0];
var text = search_text.getAttribute("placeholder")

// 当鼠标移入logo事件时
// 获取元素
var logo = byClas("logo");
var logo_nav = byClas("logo_nav");
Event.addEvent(logo, "mouseenter", callback_in, false);
Event.addEvent(logo, "mouseleave", callback_out, false);
// 鼠标移入logo的动画
function callback_in() {
    logo.innerHTML = `<a href="" class="logo_gif">
    <span class="logo_text">轻松做大餐</span>
    <span class="logo_watch" href="">去看看></span>
    </a>`;
    var logo_gif = byClas("logo_gif");

    logo_gif.style.cssText = ` 
    background:url(./images/search.gif?${Date.now()}) no-repeat center;
    background-size: 130px 130px; `

};
// 鼠标移出logo的动画
function callback_out() {
    setTimeout(function() {
        logo.innerHTML = ` <h1><a class="logo_nav" href="https://hellojoy.jd.com/?babelChannel=1518455&activityId=7957&source=01">京东网</a></h1>`;
    }, 2000)
};
// 当输入框输入文字时，下拉提示框出现
(function() {
    var search_json = $q(".search_json ");
    var search_text = $q(".search_text");
    search_text.oninput = function() {
        search_json.style.display = "block";
        ajax({
            type: "get",
            data: "wd=" + search_text.value,
            url: "http://suggestion.baidu.com/su",
            jsonp: "cb",
            jsonpCallback: "test",
            dataType: "jsonp",
            success: function(json) {
                var str = ""
                console.log(json)
                json.s.forEach(function(item) {

                    str += `<li><a  href="javascript:"> ${item}</a></li>`;
                })
                search_json.innerHTML = str;
            }
        })
    };
    // 当输入框失去焦点时下拉提示消失
    search_text.onblur = function() {
        search_json.style.display = "none";
    };

    // 当鼠标移出下拉提示框时， 1s 后消失;
    search_json.onmouseleave = function() {
        setTimeout(function() {
            search_json.style.display = "none";
        }, 1500);
    };

})();

// 鼠标移到二维码， 手机京东的二级菜单出现
var code = $q(".code");
// 获取二级菜单元素
var customer = $q(".customer .son")
    // 绑定事件
Event.addEvent(code, "mouseover", function() {
    customer.style.display = "block";
}, false);
Event.addEvent(code, "mouseout", function() {
    customer.style.display = "none";
}, false);
// 特别注意的是， 由于js改动的是行内样式属性， 而之前的二级菜单出现是
// 内部样式，所以为了避免js影响css设置的hover，需要给css提权

//二级菜单选项卡切换
// 获取一级菜单
// 需求， 鼠标移入一级菜单， 二级菜单展示， 鼠标移出一级菜单， 二级菜单消失（ 如果此时鼠标移入二级菜单， 二级菜单继续展示）
var cla_show = $q(".main_left .cla_show")
var classify_li = $qa(".main_left .classify li");
var classify = $q(".classify")
var previndex = 0;
var cla_second = $qa(".main_left .cla_show .cla_second");
for (var i = 0, len = classify_li.length; i < len; i++) {
    classify_li[i].index = i;
    classify_li[i].onmouseenter = function() {
        cla_second[previndex].style.display = "";
        cla_second[this.index].style.display = "block";
        previndex = this.index;

    }

    // 进入二级菜单，三级菜单要展示
    cla_second[i].onmouseenter = function() {
        this.style.display = "block";
    };
    //移出二级菜单，对应的三级菜单也要消失
    cla_second[i].onmouseleave = function() {
        this.style.display = "none";
    };

};
// 离开一级级菜单，选项卡也要消失
classify.onmouseleave = function() {
    cla_second[previndex].style.display = "none";
};
// 注意在这里不能使用委托事件，不然进入三级菜单的子菜单，display三级菜单会消失
// 委托事件只适合进入到对应子菜单改变样式，要是还要进入孙子菜单如display就会发生变化

/* 调用图片缓冲运动函数*/
// 获取元素

(function() {
    var imgsmax = $qa(".main_imgwrap img");
    var ali = $qa(".main_c_f .btn span");
    var main_imgwrap = $q(".main_imgwrap");
    var main_c_f = $q(".mian_c_f")
    var next = $q(".nexts");
    var prev = $q(".prevs");
    var imgIndex = 0;
    var prevIndex = 0;
    var timer = null;
    var mark = 0;
    var lastTime = 0;
    //第一步 进入页面执行自动播放函数封装
    animate(imgsmax[imgIndex], {
        "opacity": 1
    }, function() {
        autoPlay();
    });

    function autoPlay() {
        timer = setInterval(function() {
            moveNext()
        }, 2000)
    }

    //第二步  封装往下一张索引运动的函数

    function moveNext() {
        // console.log(1);
        // 在自动播放的时候， 每个图片都会有个animate动画，如果autoPlay执行太快，前两个动画还没走完，就已经到当前动画，
        //会导致上上个动画到达target而没有设置回0.1，从而错乱;解决方法一：将animate动画速度加快
        //，二清除上一个图片的定时器，不会导致动画还在继续执行而产生异步操作，错过imgs[prevIndex].style.opacity = 0.1;
        clearInterval(imgsmax[prevIndex].timer)
            //  清除上一张图片显示类名
        imgsmax[prevIndex].className = "";
        ali[prevIndex].className = ""
            //并且把上一张图片的透明度改为0.1
        imgsmax[prevIndex].style.opacity = 0.1;
        // 当前索引加1
        imgIndex++;
        // 判断临界值
        if (imgIndex > imgsmax.length - 1) {
            imgIndex = 0;
        }
        // 给当前图片添加样式
        imgsmax[imgIndex].className = "show";
        ali[imgIndex].className = "active";
        // 调用多属性封装函数;

        animate(imgsmax[imgIndex], {
            "opacity": 1
        });
        // 用上一次索引保存当前索引值
        prevIndex = imgIndex;
    }
    // 封装向上一张移动的函数
    function movePrev() {
        clearInterval(imgsmax[prevIndex].timer)
            // 清空上一张图片样式
        imgsmax[prevIndex].className = "";
        ali[prevIndex].className = ""
        imgsmax[prevIndex].style.opacity = 0.1;

        imgIndex--;
        if (imgIndex < 0) {
            imgIndex = imgsmax.length - 1;
        }
        // 给当前图片添加样式
        imgsmax[imgIndex].className = "show";
        ali[imgIndex].className = "active";
        animate(imgsmax[imgIndex], {
            "opacity": 1
        });
        prevIndex = imgIndex;
    }
    //第三步 点击箭头按钮切换图片
    next.onclick = function() {
        clearInterval(timer);
        var nowTime = Date.now();
        //  同样用函数节流，防止用户点击过快
        if (lastTime && (nowTime - lastTime) < 1000) {
            // 这里用防抖节流最后点击的一次把autoplay加在定时器里会
            // 和autoplay的定时器发生冲突
            // clearInterval(next.timer)
            // next.timer = setInterval(() => {
            //     autoPlay();
            // }, 1000);
            clearInterval(timer)
            autoPlay();
        } else {
            lastTime = nowTime;
            moveNext();
        }
    }

    // 点击上一张，切换到上一张图片
    prev.onclick = function() {
        // 先清除定时器， 等到图片运动到达target在调用movePrev()和autoplay();
        clearInterval(timer);
        var nowTime = Date.now();

        if (lastTime && (nowTime - lastTime) < 1000) {
            clearInterval(timer)
                // 最后一次点击，触发一次自动播放
            autoPlay();
        } else {
            lastTime = nowTime;
            movePrev();
        }
    };
    // 阻止双击默认事件点击会选中文本
    // 当鼠标移入图片，清除自动播放
    main_imgwrap.onmouseover = function() {
        clearInterval(timer);
        // 当mark为1时，再清除当前图片定时器，目的为了让当前图片完全到达target
        clearInterval(imgsmax[imgIndex].timer);
        // 处理页面刚打开，定时器还没走完就被清除的bug
        animate(imgsmax[imgIndex], {
            "opacity": 1
        })

    }
    main_imgwrap.onmouseout = function() {
            autoPlay();
        }
        //第四步 点击小图标，对应播放图片动画。
    for (var i = 0, len = imgsmax.length; i < len; i++) {
        ali[i].index = i;
        ali[i].onmouseenter = function() {
            clearInterval(timer);
            // 清空上一张图片的定时器
            clearInterval(imgsmax[prevIndex].timer);
            // 清空上一张样式
            imgsmax[prevIndex].className = "";

            ali[prevIndex].className = "";
            // 上次显示的图片透明度为0.1
            imgsmax[prevIndex].style.opacity = 0.1;
            // 更新imgIdex
            imgIndex = this.index;
            ali[imgIndex].className = "active";
            imgsmax[imgIndex].className = "show";
            animate(imgsmax[this.index], {
                "opacity": 1
            })
            prevIndex = imgIndex;
            autoPlay();
        }
    }
})();

// 中区小图区
// 需求一，每隔4s整版切换
// 需求二，点击按钮切换，盒子的top变3*offsetHeight,当top =9*offsetTop后
//4s后又切回到top为0;
// 鼠标移入，动画效果消失

(function() {
    var main_c_main = $q(".main_c_main");
    var prev = $q('.main_c_main .prev');
    var next = $q('.main_c_main .next');
    var main_c_wrap = $q(".main_c_wrap");
    var main_son = $q(".main_wrap_son");
    var moveHeight = main_son.offsetHeight;
    var timer = null;
    autoPlay();

    function autoPlay() {
        timer = setInterval(function() {
            moveNext();
        }, 7000)
    }

    function moveNext() {
        // 边界判断 第一次，wrap的top为0，此时 main_c_wrap.style.top在下方已经为-480
        //第二次为-480时，main_c_wrap.style.top已经为-960px
        if (main_c_wrap.offsetTop < -moveHeight) {
            main_c_wrap.style.top = 0 + "px";
            return false;
        }
        main_c_wrap.style.top = parseInt(main_c_wrap.offsetTop) - moveHeight + 'px';

    };

    function movePrev() {
        // 边界判断 第一次，wrap的top为0，此时 main_c_wrap.style.top在下方已经为480
        //第二次为480时，main_c_wrap.style.top已经为960px
        if (main_c_wrap.offsetTop == 0) {
            console.log(1)
            main_c_wrap.style.top = -moveHeight * 2 + 'px';
            return false;
        }
        main_c_wrap.style.top = parseInt(main_c_wrap.offsetTop) + moveHeight + 'px';
    };

    var lastTime;
    // 点击prev按钮4 防抖节流
    prev.onclick = function() {
            clearInterval(timer);
            // 每次点击刷新nowTime时间
            var nowTime = Date.now();
            if (lastTime && (nowTime - lastTime) < 1000) {
                clearInterval(timer);
                // 点击结束4秒后继续执行轮播图
                autoPlay();
            } else {
                lastTime = nowTime;
                movePrev();
            }
        }
        // 点击next按钮 防抖节流
    next.onclick = function() {
        clearInterval(timer);
        // 每次点击刷新nowTime时间
        var nowTime = Date.now();
        if (lastTime && (nowTime - lastTime) < 1000) {
            clearInterval(timer);
            // 点击结束4秒后继续执行轮播图
            // 或者加延时器也可以

            autoPlay();

        } else {
            lastTime = nowTime;
            moveNext();
        }
    }
})()

;
(function() {

})();

// 选项卡区
// 调用Tabchange选项卡面向对象
var tab = new Tabchange({
    btn: ".charge_class a",
    display: ".charge_display li",
    index: 1
});


// 鼠标移入icon图表,

(function() {
    var wrap = $q('.tickets-wrap')
    var move = $q('.ticket_charge');

    // 事假委托，移入mousemove_wrap，动画启动
    onTarget(wrap, 'mouseover', '.mousemove_wrap', function() {
        //tickets-wrap 向上移动,ticket_charge展示，向上移动63px;
        animate(wrap, { "top": "-63" });
        move.style.display = "block";
        // 待.ticket_charge移动到目的地， 执行animate的回调函数， 把tickets-wrap移回原地
        animate(move, {
            "top": "0"
        }, function() {
            animate(wrap, { "top": "0" });
        }, 15)
    })
})();

// 倒计时区
(function() {
    function common(n) {
        return n > 9 ? n : "0" + n;
    }
    //    封装倒计时函数
    function reverseTime() {
        var spanhours = $q(".unit_hour");
        var spanminutes = $q(".unit_minutes");
        var spansecond = $q(".unit_second");
        var c_wran = $q('.countdown-warn');
        var time = new Date();
        // 获取现在时间的小时数
        var nowHour = time.getHours();
        var nowTime = time.getTime();
        // 未来时间在偶数小时内都作为倒计时终点
        if (nowHour % 2) {
            time.setHours(nowHour + 1);

            var t = time.getHours();
            var someTime = new Date();
            var y = someTime.getFullYear();
            var m = someTime.getMonth();
            var d = someTime.getDate();

            var h = t;
            //京东页面设置秒杀开始的时间
            var showTime = t - 2;
            if (h == 0) {
                var showTime = "22";
                d = d + 1;
            } else {
                var showTime = h - 2;
            }

            showTime = common(showTime)
                // 时间在字符串里设置的月份是1-12
            var newTime = new Date(`${y}/${m+1}/${d} ${h}:00:00`)
        } else {
            time.setHours(nowHour + 2);
            var t = time.getHours();
            var someTime = new Date();
            var y = someTime.getFullYear();
            var m = someTime.getMonth();
            var d = someTime.getDate();
            var h = t;
            //京东页面设置秒杀开始的时间

            if (h == 0) {
                var showTime = "22";
                // d = d + 1;
            } else {
                var showTime = h - 2;
            }

            showTime = common(showTime)
            var newTime = new Date(`${y}/${m+1}/${d} ${h}:00:00`)
        }

        var allTime = newTime - nowTime;
        var day = parseInt(allTime / (24 * 60 * 60 * 1000));
        var hour = parseInt(allTime % (24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        /********************************  模天剩余不够一天的小时  模小时剩余不够1小时的分钟*/
        var minutes = parseInt(allTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) / (60 * 1000));
        var seconds = parseInt(allTime % (24 * 60 * 60 * 1000) % (60 * 60 * 1000) % (60 * 1000) / 1000)

        day = common(day);
        hour = common(hour);
        minutes = common(minutes);
        seconds = common(seconds);
        // 倒计时开始显示区如18:00开始
        c_wran.innerHTML = `${showTime}:00点场  倒计时`
            // 倒计时显示区
        spanhours.innerHTML = hour;
        spanminutes.innerHTML = minutes;
        spansecond.innerHTML = seconds;

    }
    var timer = setInterval(reverseTime, 30);
})();

// 倒计时区轮播图
(function() {
    var timer = null;
    var flag = false;
    var prevIndex = 0;
    var ulIndex = 0;
    var lastTime = 0;
    // 给最后再加第一副轮播图等运动到最后一次，立马跳到第一幅
    var carousel_nav = $q('.carousel-nav');
    var special_wrap = $qa('.carousel-nav ul');
    // 获取点击按钮
    var prev = $q('.special_carousel .prev');
    var next = $q('.special_carousel .next');
    // 克隆节点
    var width = special_wrap[0].offsetWidth;
    var special_clone = special_wrap[0].cloneNode(true);
    carousel_nav.appendChild(special_clone)
        // 将克隆的节点插在盒子最后
    animate(carousel_nav, { "left": (width * ulIndex) }, function() {
        autoPlay();
    })
    autoPlay();

    function autoPlay() {
        timer = setInterval(() => {
            moveNext();
        }, 4000);
    };

    var special_wrap = $qa('.carousel-nav ul');

    function moveNext() {
        var target = width * (ulIndex);
        // animate(carousel_nav, { left: "-1644" });
        animate(carousel_nav, { "left": `${-target}` }, function() {
            ulIndex++;
            flag = true;
            if (ulIndex >= 4) {
                ulIndex = 0;
                carousel_nav.style.left = 0;
            };
        }, 15);
    };

    function movePrev() {
        ulIndex--;
        if (ulIndex < 0) {
            ulIndex = special_wrap.length - 1;
            // 因为要从右往左，所以left值是负值
            carousel_nav.style.left = -special_wrap[0].offsetWidth * (special_wrap.length - 1) + "px";
        };
        var target = special_wrap[0].offsetWidth * ulIndex;
        animate(carousel_nav, { "left": `${-target}` },
            10);
    }
    // 点击向左按钮
    prev.onclick = function() {
        clearInterval(timer);
        // 当flag为true时说明运动动画运动结束

        var nowTime = new Date();
        if (lastTime && (nowTime - lastTime) < 900) {
            clearInterval(timer);
            autoPlay();
        } else {

            lastTime = nowTime;
            if (flag) {
                movePrev();
            }
        }
    }

    // 点击向右按钮
    next.onclick = function() {
        var nowTime = new Date();
        clearInterval(timer);
        if (lastTime && (nowTime - lastTime) < 800) {
            clearInterval(timer);
            autoPlay();
        } else {
            lastTime = nowTime;
            moveNext();
        }
    }
})();


// 秒杀专区轮播图
(function() {
    var kill_wrap = $q('.kill_wrap')
        // var = $1('.content')
    var Lis = $qa('.kill_wrap li ') //5
    var Li = Lis[0];
    var nums = $qa('.mouse-move span');
    var imgIndex = 0;
    var pageIndex = 0;
    var timer = null;
    var liWidth = Li.clientWidth //一张图片的宽度

    // 在末尾添加第一张图片
    var firstLi = Li.cloneNode(true);
    kill_wrap.appendChild(firstLi);

    // 进入页面开启自动播放
    autoPlay()

    // 自动播放函数
    function autoPlay() {
        timer = setInterval(function() {
            moveNext() //移动到下一页
        }, 3000)
    }

    // 移动到下一页
    function moveNext() {
        imgIndex++
        if (imgIndex > Lis.length) {
            imgIndex = 1; //到达最后一张，接下来应该显示第二张图片
            kill_wrap.style.left = 0; //滚动条设置到0的位置
        }
        // 滚动条执行动画
        animate(kill_wrap, {
            'left': -imgIndex * liWidth
        })

        // 清除上次的类名
        nums[pageIndex].className = '';
        // 当前点击的页码添加类名
        pageIndex++
        if (pageIndex >= nums.length) {
            pageIndex = 0;
        }
        // 当前页码添加类名
        nums[pageIndex].className = 'show';
    }

    // 移动到上一页
    function movePrev() {
        imgIndex--;
        if (imgIndex < 0) {
            imgIndex = Li.length - 1 //到达第一张，接下来应该显示倒数第二张图片
            kill_wrap.left = Li.length * liWidth + "px" //滚动条设置到最后一张图片的位置
        }
        // 滚动条执行动画
        animate(kill_wrap, {
                'left': -imgIndex * liWidth
            })
            // 清除上次的类名
        nums[pageIndex].className = ''
            // 当前点击的页码添加类名
        pageIndex--
        if (pageIndex < 0) {
            pageIndex = nums.length - 1
        }
        // 当前页码添加类名
        nums[pageIndex].className = 'show'
    }




    // 点击页码切换图片
    for (var i = 0, len = nums.length; i < len; i++) {
        nums[i].index = i
        nums[i].onmouseenter = function() {
            // 停止自动播放
            clearInterval(timer)
                // 切换图片
            imgIndex = this.index
            animate(kill_wrap, {
                'left': -imgIndex * liWidth
            });
            // 启动自动播放
            autoPlay()
                // 清除上次的类名
            nums[pageIndex].className = ''
                // 当前点击的页码添加类名
            nums[this.index].className = 'show'
                // 更新上次的页码
            pageIndex = this.index
        }
    }
})();

// 购物车区
$(function() {
    // 主菜单
    $.ajax({
            url: './data/goods.json',
            dataType: 'json',
            type: 'get',
            success: function(json) {
                var jsonDom = '';
                // 要使用jq方法，变量只要用$()即可使用jq方法
                $(json).each(function(index, item) {

                        jsonDom += ` <li class="goods clearfix">
                <a href=""> <img src="${item.imgurl}" alt=""></a>
                <span class="price ">${item.price}</span>
                <span class="word">${item.title}</span>
                <div class="btn " data-id="${item.id}">添加购物车 </div>
            </li>`
                    })
                    // 遍历结束全部一次渲染到页面
                $('.shop_nav').append(jsonDom);
            }
        })
        //点击添加购物车，本地存储也改变
        // 需求，如果点击购物车，本地存储的值先判断有没有这个id的商品，如果有，
        // 则只增加数量，不增加长度，如果没有，直接push进去
    var $shop_nav = $('.shop_nav');
    $shop_nav.on('click', '.goods .btn', function() {
            var goodArr = [];
            // 本地存储数据的格式
            // key: goods //val:[{id:'abc1',num:1},{id:'abc10',num:2}];
            // 每次点击先判断本地存储是否有数据
            if (localStorage.getItem("goods")) {
                goodArr = JSON.parse(localStorage.getItem("goods"));
            };
            var flag = true;
            var $id = $(this).attr('data-id');
            var obj = { 'id': $id, 'num': 1 };
            // 有，则num+1
            //则遍历数组,在数组找是否有id相同的商品
            $.each(goodArr, (index, item) => {
                if (item.id == $id) {
                    flag = !flag;
                    item.num++;
                };
            })
            if (flag) {
                goodArr.push(obj);
            }
            // 更新本地存储的数据
            localStorage.setItem('goods', JSON.stringify(goodArr));

        })
        // 点击跳转到购物车
    $('.sub_shop').click(() => {
        location.href = "./shoplist.html";
    });
});

// 购物车区
// 单例模式
// function Fn() {
//     if (Fn.instance) {
//         return Fn.instance
//     }
//     this.attr = "hello world";
//     return Fn.instance = this;
// }

// var obj1 = new Fn();
// var obj2 = new Fn();
// console.log(obj1 === obj2);
// console.log(obj1.attr)

// 函数传参机制
// var num = 123;

// var obj = { age: 12 };

// function change(num) {

//     num--;

//     obj.age--;

// }

// change(num, obj);

// document.write(num + " " + obj.age);