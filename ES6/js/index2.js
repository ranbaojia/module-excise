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
        $(this).css({
            backgroundColor: "#333",
            border: "#000"
        })
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
})