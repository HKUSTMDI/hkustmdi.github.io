// let apiServer = 'https://universityforum.hkust-gz.edu.cn/search/api/'
// let apiServer = 'https://campustest.hkust-gz.edu.cn/search/api/'
let apiServer = 'https://www.hkust-gz.edu.cn/find/api/'
let scTime
let searchConfig = {
  params: {
    keyword: ''
  },
  searchData: function (iptValue, el) {
    let key = iptValue.toLowerCase()
    $.ajax({
      url: apiServer + 'searchAllType?keyword=' + key,
      type: 'GET',
      success: function (res) {
        clearTimeout(scTime)
        scTime = setTimeout(() => {
          getSearchData(res, iptValue, el)
          hasData = true
          if (res.news[0] === undefined && res.professor[0] === undefined && res.recruit[0] === undefined) {
            hasData = false
          }
        }, 200);
      },
      error: function (xhr, textStatus, errorThrown) {
        // console.log('Error: ' + textStatus + ', ' + errorThrown);
      }
    })
  },
}

let openTime
let siptTime = true
$('.sd-input').on('compositionstart', function () {
  siptTime = false
})
$('.sd-input').on('compositionend', function () {
  siptTime = true
})
$(".search-input").on('input', function () {
  searchIptFn()
})
$('.search-btn').on('click', function () {
  let iptValue = $('.search-input').val()
  if (iptValue !== '') {
    $(this).attr('href', `/s?searchContent=${iptValue}&searchType=1`)
  }
})
$('.sd-btn').on('click', function () {
  let iptValue = $('.sd-input').val()
  if (iptValue !== '') {
    $(this).attr('href', `/s?searchContent=${iptValue}&searchType=1`)
  }
})

function searchIptFn() {
  if (siptTime) {
    if ($(".search-input").val() !== '') {
      $('.sf-wrapper').addClass('ipt-wrapper')
    } else {
      $('.sf-wrapper').removeClass('ipt-wrapper')
    }
    clearTimeout(openTime)
    openTime = setTimeout(() => {
      inputFn()
      isOpen = true
    }, 500)
  }
}

function inputFn() {
  let iptValue = $(".search-input").val()
  searchConfig.params.keyword = iptValue
  let el = $('.search-info')
  searchConfig.searchData(iptValue, el)
  if ($(`.search-info`).css('display') == 'none') {
    $(".search-input").addClass('iptFocus')
    $(`.search-info`).addClass('infoShow')
  }

  if (iptValue === '') {
    stimes = 1
    $(".search-input").removeClass('iptFocus')
    $(`.search-info`).removeClass('infoShow')
  }
}

function getSearchData(res, iptValue, el) {
  let str = 'No results'
  if (res.news[0] !== undefined || res.professor[0] !== undefined || res.recruit[0] !== undefined) {
    str = '<ul class="s-ul">'
    if (res.news[0] !== undefined) {
      const newsIntro = `
        <li class="s-part">
            <a href="/s?searchContent=${iptValue}&searchType=1" target="_blank">
              <span class="s-title">Websites</span>
              <span>results for "${iptValue}" view all</span>
            </a>`
      const newsContent = res.news.map(res => {
        return `
              <a class="s-content" href="${res.detailUrl}" target="_blank">${res.title}</a>
          `
      }).join('')
      str += newsIntro + newsContent + '</li>'
    }
    if (res.professor[0] !== undefined) {
      const newsIntro = `
        <li class="s-part">
            <a href="/s?searchContent=${iptValue}&searchType=2" target="_blank">
              <span class="s-title">Professor</span>
              <span>results for "${iptValue}" view all</span>
            </a>`
      const newsContent = res.professor.map(res => {
        return `
              <a class="s-content" href="${res.detailUrl}" target="_blank">${res.jobs[0].jobDepartCn} ${res.nameEn}</a>
          `
      }).join('')
      str += newsIntro + newsContent + '</li>'
    }
    if (res.recruit[0] !== undefined) {
      const newsIntro = `
        <li class="s-part">
            <a href="/s?searchContent=${iptValue}&searchType=3" target="_blank">
              <span class="s-title">Recruitment</span>
              <span>results for "${iptValue}" view all</span>
            </a>`
      const newsContent = res.recruit.map(res => {
        return `
              <a class="s-content" href="${res.detailUrl}" target="_blank">${res.postDepartEn} ${res.postNameCh}</a>
          `
      }).join('')
      str += newsIntro + newsContent + `</li>`
    }
    str += `</ul>
    <div class="see-more">
      <a href="/s?searchContent=${iptValue}&searchType=1" target="_blank">See More Results</a>
    </div>`
  }
  el[0].innerHTML = str
}
let useFlag = true
let inputCnFlag = true
let searchTime
$('.search-inp').on('compositionstart', function () {
  inputCnFlag = false
})
$('.search-inp').on('compositionend', function () {
  inputCnFlag = true
})
$('.search-inp').on('input', function () {
  let iptValue = $(this).val()
  clearTimeout(searchTime)
  searchTime = setTimeout(function () {
    if (useFlag && iptValue && inputCnFlag) {
      $('.search-area').addClass('sidebar-active')
      $('.sidebar').addClass('sidebar-active')
      $("html").addClass("hidden");
      $(".header-wrap").addClass("search-open");
      $(".search-area").addClass("active");
      setTimeout(function () {
        $('.search-inp').val('')
      }, 500)
      $('.search-input').val(iptValue)
      $('.search-input').focus()
      setTimeout(() => {
        inputFn()
        isOpen = true
      }, 500)
    }
  }, 500)

})

$('.close-btn').on('click', function () {
  $('.search-area .search-input').val('')
  $('.search-input').removeClass('iptFocus')
  $('.search-info').removeClass('infoShow')
})
let times = 1
$('.search-input').keyup(function (e) {
  if ($('.search-input').val() === '') {
    if (e.keyCode === 8) {
      times++
      if (times > 2) {
        $('.search-input').val('')
        $('.search-input').removeClass('iptFocus')
        $('.search-info').removeClass('infoShow')

        $("html").removeClass("hidden");
        $(".search_btn").removeClass("active");
        $(".header-wrap").removeClass("search-open");
        $(".search-area").removeClass("active");
        times = 1
      }
    } else {
      times = 1
    }
  }
  if (e.keyCode === 13) {
    let iptValue = $('.search-input').val()
    window.location.href = `/s?searchContent=${iptValue}&searchType=1`
  }
})
