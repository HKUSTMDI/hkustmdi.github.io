// var active = true;


var canScrollToBanner = true;
var contentSwiper;

var newsSwiperTimer = null, fifthSwiperTimer = null;
var newsSwiper;

var universityForumSwiper;

var researchSwiperTimer = null;
var researchSwiper;

var campusLifeSwiper, fifthSwiper, topAreaSwiperMobile;

var Index = {
  init: function () {
    this.bind();
  },
  bind: function () {

    // var expTime = window.localStorage.getItem('showBannerExpTime');
    // if (!expTime
    //   || new Date().getTime() > expTime) {
    //   bannerScrollControl();
    //   window.localStorage.setItem('showBannerExpTime', new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    // }

    // binAreaSwiperMobile();
    // bindBannerSwiper();
    
    bindContentSwiper();
    // bindNewsSwiper();
    // bindUniversityForumSwiper();
    // bindResearchSwiper();
    // bindCampusLifeSwiper();

    // bindAllPhotos();
    // bindFifthSwiper();
    // $('.js_top_area').click(function () {
    //   $('.js_admission_window').addClass('active');
    //   $('.aw-get-content').html($(this).find('.topAreaSildeContent').html());
    //   $('.aw-btn').attr('href', $('.aw-get-content').attr('data-href'))
    //   topAreaSwiperMobile.autoplay.stop();
    // })
    // $('.js_aw_bg, .js_close_btn').click(function () {
    //   $('.js_admission_window').removeClass('active');
    //   topAreaSwiperMobile.autoplay.start();
    // })

  },
}
//移动端页头公告
function binAreaSwiperMobile() {
  topAreaSwiperMobile = new Swiper('.jsTopAreaSwiperMobile .swiper', {
    autoplay: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: false,
      shadow: false,
    },
    pagination: {
      el: '.jsTopAreaSwiperMobile .swiper-pagination',
    },
  })
}

function bannerScrollControl() {
  var showNote = false;

  var showhideBanner = function (show) {
    if (show) {
      $('.home-banner').removeClass('hide')
      $('.home-banner .banner_content .banner-title p').addClass('animated-enter');
      $('.home-banner .banner_content .play').addClass('animated-enter');
      $('.home-banner .banner_content .more').addClass('animated-enter');
      $('.home-banner .banner_content .more_btn').addClass('animated-enter');
    } else {
      $('.home-banner').addClass('hide')
      $('.home-banner .banner_content .banner-title p').removeClass('animated-enter');
      $('.home-banner .banner_content .play').removeClass('animated-enter');
      $('.home-banner .banner_content .more').removeClass('animated-enter');
      $('.home-banner .banner_content .more_btn').removeClass('animated-enter');
    }
  }
  var scrollFunc = function (e) {
    e = e || window.event;
    // console.log(e)
    var scrollDirection = 0;//1下，-1上
    if (e.wheelDelta) { //如果是 IE / 谷歌 滚轮事件
      if (e.wheelDelta < 0) {
        // console.log('IE / 谷歌 下');
        scrollDirection = 1
      }
      if (e.wheelDelta > 0) {

        // console.log('IE / 谷歌 上');
        scrollDirection = -1
      }
    }
    else if (e.detail) { //Firefox 滚轮事件
      if (e.detail > 0) { //向下滚动
        // console.log('Firefox 下');
        scrollDirection = 1
      }
      if (e.detail < 0) {
        // console.log('Firefox 上');
        scrollDirection = -1
      }
    }

    // if (scrollDirection == -1) {
    //     if ($('.home-banner').hasClass('hide') && canScrollToBanner) {
    //         showhideBanner(true)
    //     } else {
    //         contentSwiper.slidePrev();
    //     }
    // }
    // if (scrollDirection == 1) {
    //     if (!$('.home-banner').hasClass('hide')) {
    //         showhideBanner(false)
    //     } else {

    //         contentSwiper.slideNext();
    //     }
    // }

    //console.log($('.home-banner').hasClass('hide'),scrollDirection==-1,canScrollToBanner)
    if ($('.home-banner').hasClass('hide') && scrollDirection == -1 && canScrollToBanner) {
      !showNote && showhideBanner(true)
    }
    if (!$('.home-banner').hasClass('hide') && scrollDirection == 1) {
      !showNote && showhideBanner(false)
    }
  }
  //给页面绑定滑轮滚动事件
  //console.log(document.addEventListener)
  if (document.addEventListener) { //火狐使用DOMMouseScroll绑定
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
  }
  //其他浏览器直接绑定滚动事件
  window.onmousewheel = document.onmousewheel = scrollFunc;

  $('.scroll-icon').on('click', function () {
    !showNote && showhideBanner(false)
  })

  !showNote && showhideBanner(true)
}
function bindBannerSwiper() {
  //banner的swiper

  var slideBox = $("#bannerSwiper .swiper-slide"),
    video,
    time,
    inter,
    imgTime = 4000,
    playButton = $("#playButton");
  const progressRing = document.getElementById("progress-ring");

  let running = false;
  var bannerSwiper = new Swiper('#bannerSwiper', {

    loop: true,
    effect: 'fade',
    navigation: {
      nextEl: '.home-banner .swiper-pagination .swiper-button-next',
      prevEl: '.home-banner .swiper-pagination .swiper-button-prev',
    },
    on: {

      init: function (swiper) {
        // console.log(swiper.realIndex);
        let current = swiper.realIndex + 1
        let total = swiper.slides.length;
        console.log(swiper.slides.length);

        $('.home-banner .swiper-pagination .current').html(current > 10 ? current : '0' + current)
        $('.home-banner .swiper-pagination .total').html(total > 10 ? total : '0' + total)
      },
      slideChangeTransitionEnd: function (swiper) {

        //  console.log('slideChangeTransitionEnd',swiper.autoplay);
        if (running) {
          swiper.autoplay.start()
        }

        let current = swiper.realIndex + 1
        let total = swiper.slides.length;
        $('.home-banner .swiper-pagination .current').html(current > 10 ? current : '0' + current)
        $('.home-banner .swiper-pagination .total').html(total > 10 ? total : '0' + total)
        $('.home-banner .swiper-pagination .progress-ring').removeClass('animate')
        setTimeout(function () {
          $('#bannerSwiper .progress-ring').addClass('animate')
        }, 100)
      }
    }
  })
  $('.progress-indicator').on('click', function () {

    if (running) {
      bannerSwiper.autoplay.stop();
      running = false
      //            $('.swiper-pagination .progress-ring').removeClass('animate')
      $('.progress-indicator .pause').hide();
      $('.progress-indicator .play').show();
    } else {
      bannerSwiper.autoplay.start();
      running = true;
      //            $('#bannerSwiper .progress-ring').addClass('animate')
      $('.progress-indicator .pause').show();
      $('.progress-indicator .play').hide();
    }
  })

  function videoChange(index) {
    let change = (t) => {
      clearTimeout(time)
      inter = setInterval(() => {
        imgTime--
      }, 1)
      time = setTimeout(() => {
        if (index == slideBox.length - 1) {
          bannerSwiper.slideTo(0)
          // console.log("切换0");
        } else {
          // console.log("切换-下一个");
          bannerSwiper.slideNext();
        }
        imgTime = 4000
        clearTimeout(inter);
      }, t)
    }
    let playButtonFunc = (v) => {
      playButton.unbind();
      playButton.click(function () {
        clearTimeout(time)
        if (v == 'img') {
          if (playButton.hasClass("play")) {
            playButton.removeClass("play").addClass("paused");
            change(imgTime);

            // console.log(imgTime, 'imgTime')
          } else {
            clearTimeout(inter);
            playButton.removeClass("paused").addClass("play");
            // console.log(imgTime, 'imgTime22')
          }
          return
        }
        if (v.paused) {
          v.play();
          playButton.removeClass("play").addClass("paused");
          change((video.duration - video.currentTime) * 1000)
        } else {
          v.pause();
          playButton.removeClass("paused").addClass("play");
        }
      })
    }


    if ($(".home-banner-wrap .swiper-slide").eq(index).find('video').length >= 1) {
      playButton.removeClass("none");
      video = $(".home-banner-wrap .swiper-slide").eq(index).find('video').get(0);
      if (video.paused) {
        video.currentTime = 0;
        video.play();
      }
      playButton.removeClass("play").addClass("paused");
      if (video.duration) {
        change(video.duration * 1000)
        playButtonFunc(video);
      } else {
        video.addEventListener('loadedmetadata', function () {
          change(video.duration * 1000)
          playButtonFunc(video);
        })
      }
    } else {
      $(".home-banner-wrap .swiper-slide video").trigger('pause');
      playButton.removeClass("play").addClass("paused");
      clearTimeout(time)
      playButtonFunc("img");
      change(imgTime)
    }
  }
  if (window.innerWidth <= 910) {
    $('.home-banner .banner_content .banner-title p').addClass('animated-enter');
    $('.home-banner .banner_content .play').addClass('animated-enter');
    $('.home-banner .banner_content .more').addClass('animated-enter');
    $('.home-banner .banner_content .more_btn').addClass('animated-enter');
  }
}

//分屏内容区域的Swiper
function bindContentSwiper() {
  
  function initContentSwiper() {

    contentSwiper = new Swiper('.content_view .content_swiper', {
      mousewheel: true,
      direction: 'vertical',
      //        grabCursor : true,
      autoHeight: true, //高度随内容变化
      observer: true, //开启动态检查器，监测swiper和slide
      speed: 800,
      on: {
        slideChangeTransitionEnd: function (swiper) {
          
          // console.log(this.activeIndex)
          if (this.activeIndex == 0 && $('#videoBox').hasClass('out')) {
            vidoStatus = true;
            // console.log(this.activeIndex)
          }

          canScrollToBanner = swiper.realIndex == 0;
        },
        touchMove: function () {
          // console.log(this.activeIndex)
          if (this.activeIndex == 0 && $('#videoBox').hasClass('out')) {
            vidoStatus = true;
            
            // console.log(this.activeIndex)
          }
        },
      },
    })
  }
  console.log(this.activeIndex)
  console.log("hello")
  window.addEventListener("resize", function () {
    var width = window.innerWidth;
    if (width <= 910) {
      // if(contentSwiper){
      contentSwiper.disable()
      contentSwiper.destroy()
      // }

    } else {
      // initContentSwiper()
    }
  }, false)

  if (window.innerWidth > 910) {
    initContentSwiper()
    contentSwiper.disable()
    contentSwiper.destroy()
    initContentSwiper()
  }
}


function slideNext(swiper) {
  var index = swiper.realIndex;
  index++;
  if (index >= swiper.slides.length) {
    index = 0
  }
  swiper.slideTo(index)
}
function initM1Swiper(swiper, currentEle, totalEle, prevEle, nextEle) {

  currentEle.html(swiper.realIndex + 1);
  totalEle.html(swiper.slides.length);

  prevEle.on('click', function () {
    var index = swiper.realIndex;
    index--;
    if (index < 0) {
      index = swiper.slides.length - 1
    }
    swiper.slideTo(index)
  });

  nextEle.on('click', function () {
    slideNext(swiper)
  });
}

//第一屏的swiper

function bindNewsSwiper() {
  let slide, title = '', day = '', month = '';
  slide = $('.content_main.news .content_bottom .swiper-slide').eq(0);
  title = slide.find('.title');
  day = slide.find('.day').text();
  month = slide.find('.month').text();
  $('.content_main.news .jsDay').text(day);
  $('.content_main.news .jsMonth').text(month);
  $('.content_main.news .jsTitle').text(title.text());
  $('.content_main.news .jsDetail_area').attr('href', title.attr('data-href'));

  newsSwiper = new Swiper('.content_main.news .pic_list', {

    spaceBetween: 10,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    normalizeSlideIndex: false, //关闭标准化的Slide 索引
    autoplay: true,

    navigation: {
    },
    on: {
      init: function (swiper) {
        //            console.log(swiper)
        initM1Swiper(swiper,
          $('.content_main.news .swiper_header .swiper-paging .current'),
          $('.content_main.news .swiper_header .swiper-paging .total'),
          $('.content_main.news .swiper_header .swiper-control .page-prev'),
          $('.content_main.news .swiper_header .swiper-control .page-next'))
          // $('.content_main.news .list_area').remove();

      },
      slideChangeTransitionEnd: function (swiper) {
        //            console.log(swiper.realIndex)
        $('.content_main.news .swiper_header .swiper-paging .current').html(swiper.realIndex + 1);
        $('.content_main.news .big_pic .pic_item').removeClass('active');
        $('.content_main.news .big_pic .pic_item').eq(swiper.realIndex).addClass('active');

        slide = $('.content_main.news .content_bottom .swiper-slide').eq(swiper.activeIndex);
        title = slide.find('.title');
        day = slide.find('.day').text();
        month = slide.find('.month').text();
        
        // $('.content_main.news .jsDay').text(day);
        // $('.content_main.news .jsMonth').text(month);
        // $('.content_main.news .jsTitle').text(title.text());
        // $('.content_main.news .jsDetail_area').attr('href', title.attr('data-href'));

        clearTimeout(newsSwiperTimer)
        newsSwiperTimer = setTimeout(function () {
          slideNext(swiper)
        }, 2000)
      },
    },
  })
  // newsSwiperTimer = setTimeout(function () {
  //   slideNext(newsSwiper)
  // }, 2000)
}

//第二屏的swiper
function bindUniversityForumSwiper() {
  function initUniversityForumSwiper() {
    universityForumSwiper = new Swiper('.content_main.m2 .list_content', {
      autoplay: true,
      spaceBetween: 12,
      slidesPerView: "auto",
      navigation: {
        nextEl: '.content_main.m2 .paging-control .swiper-button-next',
        prevEl: '.content_main.m2 .paging-control .swiper-button-prev',
      },
      pagination: {
        el: '.content_main.m2 .swiper-pagination',
        type: 'progressbar',
      },
    })
  }
  // window.addEventListener("resize", function () {
  //     var width = window.innerWidth;
  //     if (width <= 910) {
  //         // if(universityForumSwiper){
  //         universityForumSwiper.disable()
  //         universityForumSwiper.destroy()
  //         // }

  //     } else {
  //         // initUniversityForumSwiper()
  //     }
  // }, false)
  // if (window.innerWidth > 910) {

  //     initUniversityForumSwiper()
  // }
  initUniversityForumSwiper()
  // let changeBnt = $('.jsTabbar li'), changeContent = $('.jsListContent');
  // changeBnt.click(function () {
  //     changeBnt.removeClass('active').eq($(this).index()).addClass('active');
  //     changeContent.removeClass('active').eq($(this).index()).addClass('active');
  // })
}

//第三屏的swiper
function bindResearchSwiper() {
  let slide, title = '', day = '', month = '';
  slide = $('.content_main.research .content_bottom .swiper-slide').eq(0);
  title = slide.find('.title');
  day = slide.find('.day').text();
  month = slide.find('.month').text();
  $('.content_main.research .jsDay').text(day);
  $('.content_main.research .jsMonth').text(month);
  $('.content_main.research .jsTitle').text(title.text());
  $('.content_main.research .jsDetail_area').attr('href', title.attr('data-href'));

  researchSwiper = new Swiper('.content_main.research .pic_list', {
    spaceBetween: 10,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    normalizeSlideIndex: false, //关闭标准化的Slide 索引

    navigation: {
      //        nextEl: '.content_main.m1b .swiper-control .page-next',
      //        prevEl: '.content_main.m1b .swiper-control .page-prev',
    },
    on: {
      init: function (swiper) {
        // console.log(swiper)
        initM1Swiper(swiper,
          $('.content_main.research .swiper_header .swiper-paging .current'),
          $('.content_main.research .swiper_header .swiper-paging .total'),
          $('.content_main.research .swiper_header .swiper-control .page-prev'),
          $('.content_main.research .swiper_header .swiper-control .page-next'))

      },
      slideChangeTransitionEnd: function (swiper) {
        //            console.log(swiper.realIndex)
        $('.content_main.research .swiper_header .swiper-paging .current').html(swiper.realIndex + 1);
        $('.content_main.research .big_pic .pic_item').removeClass('active');
        $('.content_main.research .big_pic .pic_item').eq(swiper.realIndex).addClass('active');

        slide = $('.content_main.research .content_bottom .swiper-slide').eq(swiper.activeIndex);
        title = slide.find('.title');
        day = slide.find('.day').text();
        month = slide.find('.month').text();
        $('.content_main.research .jsDay').text(day);
        $('.content_main.research .jsMonth').text(month);
        $('.content_main.research .jsTitle').text(title.text());
        $('.content_main.research .jsDetail_area').attr('href', title.attr('data-href'));

        clearTimeout(researchSwiperTimer)
        researchSwiperTimer = setTimeout(function () {
          slideNext(swiper)
        }, 5000)
      },
    },
  })
  // researchSwiperTimer = setTimeout(function () {
  //   slideNext(researchSwiper)
  // }, 5000)
}
//第五屏的swiper
function bindFifthSwiper() {
  // let slide, title = '', day = '', month = '';
  // slide = $('.content_main.campus_life .content_bottom .swiper-slide').eq(0);
  // title = slide.find('.title');
  // day = slide.find('.day').text();
  // month = slide.find('.month').text();

  // $('.content_main.campus_life .jsDay').text(day);
  // $('.content_main.campus_life .jsMonth').text(month);
  // $('.content_main.campus_life .jsTitle').text(title.text());
  // $('.content_main.campus_life .jsDetail_area').attr('href', title.attr('data-href'));

  let thisVideoBox = $('.jsPhotos');
  thisVideoBox.eq(0).find('img').attr('src', thisVideoBox.eq(0).find('img').attr('src'));
  fifthSwiper = new Swiper('.content_main.campus_life .swiper_container', {

    // spaceBetween: 10,
    // slidesPerView: "auto",
    // slideToClickedSlide: true,
    // normalizeSlideIndex: false, //关闭标准化的Slide 索引
    
    loop: true,
    loopAdditionalSlides: 3,
    loopedSlides: 3,
    loopPreventsSlide: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    autoplay: {
      delay: 5000,
    },
    slideToClickedSlide: true,
    // centerInsufficientSlides: true,
    navigation: {
      nextEl: '.content_main.campus_life .pic_list .page-next',
      prevEl: '.content_main.campus_life .pic_list .page-prev',
    },
    on: {
      // init: function (swiper) {
      //   //            console.log(swiper)
      //   initM1Swiper(swiper,
      //     $('.content_main.campus_life .swiper_header .swiper-paging .current'),
      //     $('.content_main.campus_life .swiper_header .swiper-paging .total'),
      //     $('.content_main.campus_life .swiper_header .swiper-control .page-prev'),
      //     $('.content_main.campus_life .swiper_header .swiper-control .page-next'))

      // },
      // slideChangeTransitionEnd: function (swiper) {
      //   //            console.log(swiper.realIndex)
      //   $('.content_main.campus_life .swiper_header .swiper-paging .current').html(swiper.realIndex + 1);
      //   $('.content_main.campus_life .big_pic .pic_item').removeClass('active');
      //   $('.content_main.campus_life .big_pic .pic_item').eq(swiper.realIndex).addClass('active');
      //   slide = $('.content_main.campus_life .content_bottom .swiper-slide').eq(swiper.activeIndex);
      //   title = slide.find('.title');
      //   day = slide.find('.day').text();
      //   month = slide.find('.month').text();

      //   $('.content_main.campus_life .jsDay').text(day);
      //   $('.content_main.campus_life .jsMonth').text(month);
      //   $('.content_main.campus_life .jsTitle').text(title.text());
      //   $('.content_main.campus_life .jsDetail_area').attr('href', title.attr('data-href'));

      //   clearTimeout(fifthSwiperTimer)
      //   fifthSwiperTimer = setTimeout(function () {
      //     slideNext(swiper)
      //   }, 5000)
      // },
      slideChangeTransitionEnd: function (swiper) {
        $('.jsPhotos').removeClass('active').eq(swiper.realIndex).addClass('active');
        $('.jsPhotos').each(function () {
          // $(this).find('video').trigger("pause");
          // $(this).find('img').attr('src', '');
        })
        thisVideoBox.eq(swiper.realIndex).find('img').attr('src', thisVideoBox.eq(swiper.realIndex).find('img').attr('src'));
        // thisVideoBox.eq(swiper.realIndex).find('video').trigger("play");
      },
    },
  })
  // fifthSwiperTimer = setTimeout(function () {
  //   slideNext(fifthSwiper)
  // }, 5000)
}

//视频轮播
function bindCampusLifeSwiper() {
  let thisVideoBox = $('.jsUniversityVideo');
  thisVideoBox.eq(0).find('video').attr('src', thisVideoBox.eq(0).find('video').attr('data-src'));
  campusLifeSwiper = new Swiper('.content_main.m4.video-wrap .swiper_container', {
    loop: true,
    loopAdditionalSlides: 3,
    loopedSlides: 3,
    loopPreventsSlide: true,
    slidesPerView: "auto",
    // autoplay: true,
    //    spaceBetween: 12,
    centeredSlides: true,
    slideToClickedSlide: true,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: '.content_main.m4.video-wrap .pic_list .page-next',
      prevEl: '.content_main.m4.video-wrap .pic_list .page-prev',
    },
    on: {

      // init: function (swiper) {
      //            console.log(swiper)
      // initM1Swiper(swiper,
      //     $(null),
      //     $(null),
      //     $('.content_main.campus-life .pic_list .page-prev'),
      //     $(''))

      // },
      slideChangeTransitionEnd: function (swiper) {
        $('.jsUniversityVideo').removeClass('active').eq(swiper.realIndex).addClass('active');
        $('.jsUniversityVideo').each(function () {
          // $(this).find('video').trigger("pause");
          $(this).find('video').attr('src', '');
        })
        thisVideoBox.eq(swiper.realIndex).find('video').attr('src', thisVideoBox.eq(swiper.realIndex).find('video').attr('data-src'));
        thisVideoBox.eq(swiper.realIndex).find('video').trigger("play");
      },
    },
  })
}

function bindAllPhotos() {
  let photos = $('.allphotos-wrap .wp-block-image img')
  let photosArr = []
  if(photos.length > 0) {
    for(let i = 0;i < photos.length; i++) {
      photosArr.push(photos.eq(i).attr('src'))
    }
  } else {
    photosArr.push('/wp-content/themes/hkust-gz-offical/images/default-cover-image.jpg')
  }

  let bigPicStr = photosArr.map((item,index) =>  {
    if(index == 0) {
      return `<div class="big_pic jsPhotos active"><img src="${item}" alt="" loading="lazy" decoding="async"></div>`
    }
    return `<div class="big_pic jsPhotos"><img src="${item}" alt="" loading="lazy" decoding="async"></div>`
  }).join('')

  let picListStr = `<div class="pic_list">
  <div class="swiper_container">
      <div class="swiper-wrapper">`
  picListStr += photosArr.map(item =>  {
    return `
    <div class="swiper-slide">
      <div class="pic">
        <img src="${item}" loading="lazy" decoding="async" alt="">
      </div>
    </div>
    `
  }).join('')

  picListStr += `</div>
    <div class="page-prev"></div>
    <div class="page-next"></div>
  </div>
  </div>
  </div>`
  
  $('.content_main.campus_life').html(bigPicStr + picListStr)

}

Index.init();