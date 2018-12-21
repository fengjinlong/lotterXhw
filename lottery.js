var Lottery = (function () {

  var timer = null
  var itemWidth = $(document).width() / 5
  var itemCount = 0
  var curPos = 0
  // 在这个范围内加载图片
  var addPic = 0
  // left更改单位
  var ADDLEFT = 20
  // 设置li宽度
  $('.content ul li').width(itemWidth)
  $('.yellow').width($(document).width())
  // 是否可以换图片
  var onceChange = 1

  var $container = $("#content")
  var $content = $("#content ul")
  var $item = $("#content ul li")

  var init = function () {
    itemCount = $("#content ul li").length;
    // li个数
    $content.append($content.html());
  };

  var start = function () {
    clearInterval(timer);
    timer = setInterval(function () {
      curPos = parseInt($content.css("left")) | 0;
      curPos -= itemWidth / ADDLEFT;
      addPic = itemWidth / ADDLEFT + itemWidth / ADDLEFT / 2
      if (curPos > -addPic && curPos < 0) {
        console.log('图片未换完，不能继续换图片，等待。。。。。。。。。。')
        if (onceChange) {
          onceChange = 0
          changeImg()

        }

      }
      (curPos < 0 - itemWidth * itemCount) && (curPos = 0);
      $content.css({
        "left": curPos
      });

    }, 10);

  };

  var stop = function () {
    clearInterval(timer);
    timer = null;
    // 设置中奖人位置 中奖人头像变大 名字变大
    setWiner()
    $content.css("left", 0)
  }
  var setWiner = function () {
    $('.content ul li').eq(2).css({'-webkit-transform': 'scale(1.3)'})
    $('.content ul li').eq(2).css({'margin-top': '76px'})
    $('.content .yellow').css({'top': '53px'})
    $('.content ul li').eq(2).find('img').css({'width': '180px','height': '180px'})
    $('.content ul li').eq(2).find('p').css({'font-weight': 'bold','font-size': '24px'})
    $('.content .yellow .div').css({'width': '222px','height': '222px','border-radius': '222px'})
  }
  var changeImg = function () {
    console.log('图片已经换完，可以进行下一波更换！')
    onceChange = 1
  }
  return {
    init: init,
    start: start,
    stop: stop
  };

})();

$(document).ready(function () {
  Lottery.init();
});