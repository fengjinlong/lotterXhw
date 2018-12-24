var Lottery = (function () {
  // 设置中奖人数
  var setWinerNum = 1
  // 当前获奖的人数组
  var currentTenArr = []
  var allPeople = []
  // 当洗牌后数组为[]，需要重新开始一轮，且不能改变COPYALLPEOPLE
  var COPYALLPEOPLE = []
  var timer = null
  // timerOther是检测数据的timer
  var timerOther = null
  // 没有点击开始时候，自动更换显示的数据
  var noBeginTimer = null
  var itemWidth = $(document).width() / 5
  var itemCount = 0
  var curPos = 0
  // 在这个范围内加载图片
  var addPic = 0
  // 一个li分多少次移动完
  var ADDLEFT = 10
  // 设置li宽度
  $('.content ul li').width(itemWidth)
  $('.yellow').width($(document).width())
  // 是否可以换图片
  var onceChange = 1

  var $container = $("#content")
  var $content = $("#content ul")
  var $item = $("#content ul li")

  var init = function () {
    itemCount = $("#content ul li").length
    // li个数
    $content.append($content.html())
    // 获取初始总人数数组
    getAllPeople()
  };
  var getAllPeople = function () {
    // 需要具体配置
    // 异步获取
    allPeople = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      211,
      111
    ]
    COPYALLPEOPLE = allPeople.slice()
    // 获取成功后初始赋值前十个人
    // 初始添加名字和头像
    noBeginTimer = setInterval(function () {
      shuffle(allPeople)
      // 需要具体配置
      $('ul li').each(function (i,ele) {
        $(this).find('p').text(allPeople[i])
      })
    },1000)
    
  }
  var start = function () {
    clearInterval(noBeginTimer)
    // 如果总人数数据没有获取到，不允许出现停止按钮
    if (allPeople.length) {
    $('.content ul li').removeClass('animated tada infinite')
      clearInterval(timerOther) 
      $('.beginBtn').hide()
      $('.stopBtn').show().css({display: 'block'})

      clearInterval(timer);
      timer = setInterval(function () {
        curPos = parseInt($content.css("left")) | 0;
        curPos -= itemWidth / ADDLEFT;
        addPic = itemWidth / ADDLEFT + itemWidth / ADDLEFT / 2
        if (curPos > -addPic && curPos < 0) {
          console.log('数据未换完，不能继续换图片，等待。。。。。。。。。。')
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
    } else {
      clearInterval(timerOther) 
        timerOther = setTimeout(function () {
          console.log('reload')
          Lottery.start()
          timerOther = null
      }, 2000)
    }
    
  };

  var stop = function () {
    clearInterval(timer);
    timer = null;
    console.log(currentTenArr)
    shuffle(currentTenArr)
    $('.content ul').css({'left': '0px'})
    sendWiner(currentTenArr.splice(0,setWinerNum))
 
  }
  var sendWiner = function (arr) {
    console.log(arr)
    // 存本地
    window.location.href = './result.html'
  }
  var changeImg = function () {
    console.log('数据已经换完，可以进行下一波更换！')
    if (shuffle(allPeople)) {
      if (allPeople.length < 10) {
        allPeople = COPYALLPEOPLE.slice()
        shuffle(allPeople)
      }
      // 取出洗牌数组的前十
      currentTenArr = allPeople.splice(0,10)
      // var currentTenArr = allPeople.splice(0,10)
      // console.log(currentTenArr)
      // 添加名字和头像
      $('ul li').each(function (i,ele) {
        // 需要具体配置
        $(this).find('p').text(currentTenArr[i])
      })
      onceChange = 1
    }
  }

  // 洗牌
  var shuffle = function(arr) {
    var len = arr.length
    console.log('length='+len)
    var temp
    var random_index
    while(len != 0) {
      random_index = parseInt(Math.random()*len);
      temp = arr[random_index];
      arr[random_index] = arr[len-1];
      arr[len-1] = temp;
      --len;
    }
    return true
  };
  return {
    init: init,
    start: start,
    stop: stop
  };

})();

$(document).ready(function () {
  Lottery.init();
});
