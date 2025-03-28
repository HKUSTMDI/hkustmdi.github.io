var screen_w = window.innerWidth;
var MobileWidth = 1200;
var IsMobile = false;
if (screen_w <= MobileWidth) {
  IsMobile = true;
} else {
  IsMobile = false;
}
$(window).resize(function () {
  screen_w = window.innerWidth;
  if (screen_w <= MobileWidth) {
    IsMobile = true;
    // $(".menu-search-wrapper").css("display", "none")
  } else {
    IsMobile = false;
    // $(".menu-search-wrapper").css("display", "flex")
  }
})
var Common = {
  init: function () {
    this.bind();
    // this.menuHover();
    this.searchClick();
    this.topMuneBotton();
    this.sidebarbutton();
    this.mobileMune();
    this.initLangMenu();
    this.binTopAreaSwiper();
  },
  bind: function () {
    //回到顶部按钮
    if ($(window).scrollTop() > 200) {
      $(".fixed-button").addClass('active')
    } else {
      $(".fixed-button").removeClass('active')
    }
    $('.up').click(function () {
      $(document.documentElement).animate({ scrollTop: 0 }, "slow");
    });
    //修改下载按钮样式
    $(".wp-block-file .wp-block-file__button").text('')

    //入场动画
    gsap.registerPlugin(ScrollTrigger);
    const slideTopAnimation = gsap.utils.toArray(".slide-top");
    slideTopAnimation.forEach((data) => {
      gsap.from(data, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "inOut",
        scrollTrigger: {
          trigger: data,
          start: "top bottom",
          toggleActions: "play play play reset"
        },
      });
    })
    //弹窗
    $('.js_top_area.page').click(function () {
      $('.js_admission_window.page').addClass('active');
      $('.aw-get-content').html($(this).find('.topAreaSildeContent').html());
      $('.aw-btn').attr('href', $('.aw-get-content').attr('data-href'))
    })
    $('.js_aw_bg.page, .js_close_btn.page').click(function () {
      $('.js_admission_window.page').removeClass('active');
    })
  },
  //页头导航鼠标经过
  // menuHover: function () {
  //   $(".header-wrap .menu > li").hover(function () {
  //     $(".header-data-bg").addClass("active")
  //   }, function () {
  //     $(".header-data-bg").removeClass("active")
  //   })
  // },
  //页头点击搜索
  searchClick: function () {
    $(".search_btn").click(function () {
      if ($(this).hasClass("active")) {
        $("html").removeClass("hidden");
        $(this).removeClass("active");
        $(".header-wrap").removeClass("search-open");
        $(".search-area").removeClass("active");
      } else {
        $("html").addClass("hidden");
        $(this).addClass("active");
        $(".header-wrap").addClass("search-open");
        $(".search-area").addClass("active");
        $("#search-ipt")[0].focus();
      }
    })
    $('.close-btn').click(function () {
      $("html").removeClass("hidden");
      $(".search_btn").removeClass("active");
      $(".header-wrap").removeClass("search-open");
      $(".search-area").removeClass("active");
    })
  },
  //动画
  showAnimation: function (demo) {
    var scroll_H =
      document.body.scrollTop || document.documentElement.scrollTop;
    $(demo).each(function () {
      var label_offset_top = $(this).offset().top - $(window).height();
      if (label_offset_top < scroll_H) {
        $(this).addClass("active");
      } else if (label_offset_top > scroll_H) {
        $(this).removeClass("active");
      }
    });
  },
  //顶部下拉按钮
  topMuneBotton: function () {
    $(".menu-button").click(function () {
      if ($(this).hasClass("active")) {
        $("html").removeClass("hidden");
        $(this).removeClass("active");
        $(".header-wrap").removeClass("open");
      } else {
        $("html").addClass("hidden");
        $(this).addClass("active");
        $(".header-wrap").addClass("open");
      }
    })
    $(".header-menu-bg").click(function () {
      $(".menu-button").removeClass("active");
      $(".header-menu-bg").removeClass("active");
      $(".header-wrap").removeClass("active");
      $("html").removeClass("hidden");
    })
  },
  //侧边栏按钮
  sidebarbutton: function () {
    $(".jsSidebarButton").click(function () {
      let sTop = $(window).scrollTop(),
        wHeight = $(window).height(),
        dHeight = $(document).height();

      // console.log(sTop / (dHeight - wHeight) * 100)
      if ($(this).hasClass("active")) {
        $("html").removeClass("hidden");
        $(this).removeClass("active");
        $(".jsSidebar").removeClass("active");
        $(".jsMainWrapper").removeClass("active");
        $(".jsHeaderWrap").removeClass("active");
      } else {
        $("html").addClass("hidden");
        $(this).addClass("active");
        $(".jsSidebar").addClass("active");
        $(".jsMainWrapper").addClass("active").css("transform-origin", `100% ${sTop / (dHeight - wHeight) * 100}%`);
        $(".jsHeaderWrap").addClass("active").css("transform-origin", `100% 0%`);

      }
    })
    $(".jsScrollPrevent").click(function () {
      $("html").removeClass("hidden");
      $(".jsSidebarButton").removeClass("active");
      $(".jsSidebar").removeClass("active");
      $(".jsMainWrapper").removeClass("active");
      $(".jsHeaderWrap").removeClass("active");
    })
  },
  //移动端菜单图标
  mobileMune: function () {
    if (IsMobile) {
      $(".menu-button-mobile").click(function () {
        $(".header-mobile-menu-bg").addClass("active")
        $(".menu-search-wrapper").addClass("active")
        $("html").addClass("hidden")
      })
      $(".menu-mobile-close").click(function () {
        $(".header-mobile-menu-bg").removeClass("active")
        $(".menu-search-wrapper").removeClass("active")
        $("html").removeClass("hidden")
      })
      $(".header-mobile-menu-bg").click(function () {
        $(".header-mobile-menu-bg").removeClass("active")
        $(".menu-search-wrapper").removeClass("active")
        $("html").removeClass("hidden")
      })
    }
  },
  parseQuery: function (queryStr) {
    var reg =
      /^(\?)?(([^=&\?\s]+)(=([^=&\?\s]+)?)?)?(&([^=&\?\s]+)(=([^=&\?\s]+)?)?)*(&)?$/;
    if (reg.test(queryStr)) {
      let obj = {};
      let reg = /([^=&\?\s]+)(=([^=&\?\s]+)?)?/g;
      let result;
      while ((result = reg.exec(queryStr))) {
        // console.log(result);
        obj[result[1]] = result[3] || "";
      }
      // console.log(obj)
      return obj;
    } else {
      return null;
    }
  },
  initLangMenu: function () {

    var link = $('.lang li a').attr('href');

    let createUrl = (url, lang = '') => {
      let urlComps = url.split('#');
      let hash = urlComps.length > 1 ? urlComps[1] : '';
      urlComps = urlComps[0].split('?');
      let siteUrl = urlComps[0];
      let queryStr = urlComps.length > 1 ? urlComps[1] : '';

      // console.log(siteUrl, queryStr, hash)
      let queryObj = this.parseQuery(queryStr);
      if (!lang) {
        delete queryObj.variant;
      } else {
        queryObj.variant = lang;
      }

      let paramstr = '';
      for (let key in queryObj) {
        paramstr += (paramstr == '' ? '?' : '&') + key + '=' + queryObj[key];
      }
      paramstr = paramstr.replace(/:|'|"/g, '');
      hash = hash.replace(/:|'|"/g, '');
      return siteUrl + paramstr + (hash ? '#' + hash : '');
    }


    var html = '';
    if (link.indexOf('/zh/') >= 0) {
      let zhhkUrl = createUrl(link, 'zh-hk')
      let zhcnUrl = createUrl(link, 'zh-cn')

      html += '<li><a href="javascript:void(0)">Eng</a></li>';
      html += '<li><a href="' + zhhkUrl + '">繁體</a></li>';
      html += '<li><a href="' + zhcnUrl + '">简体</a></li>';
    } else {
      let url = window.location.href;

      let enUrl = createUrl(link, '')
      let zhhkUrl = createUrl(url, 'zh-hk')
      let zhcnUrl = createUrl(url, 'zh-cn')

      html += '<li><a href="' + enUrl + '">Eng</a></li>';
      html += '<li><a href="' + zhhkUrl + '">繁體</a></li>'
      html += '<li><a href="' + zhcnUrl + '">简体</a></li>'
    }

    // console.log(html)
    $(".header-wrap .lang").html(html);

  },
  //顶部通知轮播
  binTopAreaSwiper: function () {
    var topAreaSwiper = new Swiper('.jsTopAreaSwiper .swiper', {
      autoplay: true,
      effect: 'cube',
      cubeEffect: {
        slideShadows: false,
        shadow: false,
      },
      pagination: {
        el: '.jsTopAreaSwiper .swiper-pagination',
      },
    })
  }
}
Common.init();