let evTime
let showEvTime
// let defaultImg = '/wp-content/themes/hkust-gz-offical/images/common/default-events.jpg'
let index = 1
let eventsConfig = {
  params: {
    total: 0,
    currentpage: 1,
    pagesize: 10,
    datalist: []
  },
  searchData: function () {
    $('.loading').css('display', 'block')
    let now = new Date()
    let feaTime = this.startTimeFormat(new Date(now.setDate(now.getDate() + 14)))
    let pasTime = this.startTimeFormat(new Date(now.setDate(now.getDate() - 20)))
    $.ajax({
      url:'/events-api/getEvent.php',
      data:`date_from=${pasTime}&date_to=${feaTime}`,
      type: 'GET',
      dataType: 'json',
      success: function (res) {
        let data = res.event.filter(item => {
          if(item.events_en_organizer.indexOf('HKUST(GZ)') !== -1)
          return item
        })
        let qswData = res.event.filter(item => {
          if(item.events_en_organizer.indexOf('HKUST(GZ)') == -1 && item.events_en_organizer !== '')
          return item
        })
        
        let fEv = eventsConfig.getFeatureEv(data)
        
        let qswFEv = eventsConfig.getFeatureEv(qswData)
        fEv.push(...qswFEv)
        eventsConfig.showData(fEv)
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log('Error: ' + textStatus + ', ' + errorThrown);
      }
    })
  },
  showData: function (data) {
    if (data.length > 0) {
      let str = ''
      let title = ''
      for(let i = 0; i < data.length;i++) {
        let imgurl = ''
        let startTime = this.enFormat(data[i].events_start_dt)
        let endTime = this.enFormat(data[i].events_end_dt)
        if(startTime == endTime) {
          time = startTime
        }else {
          time = `${startTime} to ${endTime}`
        }
        // categories = data[i].categories.join(', ')
        if(data[i].events_en_subject !== '' && data[i].events_en_subject !== '') {
          title = this.unlabels(data[i].events_en_subject) + ' - ' + this.unlabels(data[i].events_en_title)
        }else {
          title = this.unlabels(data[i].events_en_title)
        }
        if (data[i].events_file_poster) {
          if(data[i].events_file_poster.indexOf('http://prod.ucal02.ust.hk') !== -1) {
            imgurl = data[i].events_file_poster.replace('http://prod.ucal02.ust.hk','//calendar.hkust.edu.hk')
          }else {
            imgurl = data[i].events_file_poster
          }
        }
        str += `
        <div class="swiper-slide">
          <div class="dt">
            <div class="pic">
              <a href="https://ucalendar.ust.hk/events/${data[i].events_id}" target="_blank" rel="noopener noreferrer">
                ${data[i].events_file_poster === '' ? 
                '<img referrerpolicy="no-referrer" src="' + this.randomImg() + '" loading="lazy" decoding="async" alt="">'  : 
                '<img referrerpolicy="no-referrer" src="' + imgurl + '" onerror="javascript:this.src=' + this.randomImg()+'" loading="lazy" decoding="async" alt="">'
              }
              </a>
            </div>
            <div class="text">
              <div class="title ellipsis-2">
                <a href="https://ucalendar.ust.hk/events/${data[i].events_id}" target="_blank" rel="noopener noreferrer">${title}</a>
              </div>
              <div class="subtitle">
                <a href="https://ucalendar.ust.hk/events/${data[i].events_id}" target="_blank" rel="noopener noreferrer">${data[i].events_en_organizer == null || data[i].events_en_organizer === '' ? '' : 'organized by ' + data[i].events_en_organizer}</a>
              </div>
              <div class="subtitle">
                <a href="https://ucalendar.ust.hk/events/${data[i].events_id}" target="_blank" rel="noopener noreferrer">${data[i].events_en_venue == null || data[i].events_en_venue === '' ? '' : data[i].events_en_venue}</a>
              </div>
              <div class="date">
                <a href="https://ucalendar.ust.hk/events/${data[i].events_id}" target="_blank" rel="noopener noreferrer">${time}</a>
              </div>
            </div>
          </div>
        </div>
      `
      }
      $('.events-wrapper')[0].innerHTML = str
      $('.loading').css('display', 'none')
    }
    
  },
  getEventsList: function () {
    clearTimeout(evTime)
    // $('.pEv-wrap h2').css('display','none')
    evTime = setTimeout(function () {
      $('.fEv-wrap .loading').css('display', 'block')
      $('.nl-list')[0].innerHTML = ''
      let now = new Date(eventsConfig.startTimeFormat(new Date()))
      let feaTime = eventsConfig.startTimeFormat(new Date(now.setDate(now.getDate() + 14)))
      let pasTime = eventsConfig.startTimeFormat(new Date(now.setDate(now.getDate() - 20)))
      $.ajax({
        url:'/events-api/getEvent.php',
        data:`date_from=${pasTime}&date_to=${feaTime}`,
        type: 'GET',
        dataType: 'json',
        success: function (res) {
          let data = res.event.filter(item => {
            if(item.events_en_organizer.indexOf('HKUST(GZ)') !== -1)
            return item
          })
          let qswData = res.event.filter(item => {
            if(item.events_en_organizer.indexOf('HKUST(GZ)') == -1 && item.events_en_organizer !== '')
            return item
          })
          
          let fEv = eventsConfig.getFeatureEv(data)
          
          let qswFEv = eventsConfig.getFeatureEv(qswData)
          fEv.push(...qswFEv)

          if (fEv.length > 0) {
            $('.fEv-wrap').removeClass('nodata')
            let time = ''
            let title = ''
            let str = fEv.map(item => {
              let imgurl = ''
              let startTime = eventsConfig.enFormat(item.events_start_dt)
              let endTime = eventsConfig.enFormat(item.events_end_dt)
              if(startTime == endTime) {
                time = startTime
              }else {
                time = `${startTime} to ${endTime}`
              }
              if(item.events_en_subject !== '' && item.events_en_subject !== '') {
                title = eventsConfig.unlabels(item.events_en_subject) + ' - ' + eventsConfig.unlabels(item.events_en_title)
              }else {
                title = eventsConfig.unlabels(item.events_en_title)
              }
              if (item.events_file_poster) {
                if(item.events_file_poster.indexOf('http://prod.ucal02.ust.hk') !== -1) {
                  imgurl = item.events_file_poster.replace('http://prod.ucal02.ust.hk','//calendar.hkust.edu.hk')
                }else {
                  imgurl = item.events_file_poster
                }
              }
              return  `
                  <li class="nl-part slide-top">
            
                  <div class="desc-img nl-img">
                    <a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">
                    ${item.events_file_poster === '' ? 
                    '<img referrerpolicy="no-referrer" src="' + eventsConfig.randomImg() + '" loading="lazy" decoding="async" alt="">'  : 
                    '<img referrerpolicy="no-referrer" src="' + imgurl + '" onerror="javascript:this.src=' + eventsConfig.randomImg()+'" loading="lazy" decoding="async" alt="">'
                  }
                    </a>
                  </div>
                  <div class="nl-detail">
                    <div class="nl-category"><a href="https://ucalendar.ust.hk/events/${item.events_id}">${item.events_category}</a></div>
                    <div class="nl-title ellipsis-2"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${title}</a></div>
                    <div class="nl-info"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${item.events_en_organizer == null || item.events_en_organizer === '' ? '' : 'organized by ' + item.events_en_organizer}</a></div>
                    <div class="nl-info"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${item.events_en_venue == null || item.events_en_venue === ''|| item.events_en_venue === undefined ? '' : item.events_en_venue}</a></div>
                    <div class="nl-time"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${time}</a></div>
                  </div>
                </li>
              `
            }).join('')
            $('.fEv-wrap .loading').css('display', 'none')
            $('.fEv-wrap .nl-list')[0].innerHTML = str
          }else {
            $('.fEv-wrap').addClass('nodata')
          }
          slideTop()
          // let pEv = eventsConfig.getPastedEv(data)
          // let qswpEv = eventsConfig.getPastedEv(qswData)
          // pEv.push(...qswpEv)
          // eventsConfig.params.total = pEv.length
          // eventsConfig.params.datalist = pEv
          // eventsConfig.showEventsList()

        },
        error: function (xhr, textStatus, errorThrown) {
          // console.log('Error: ' + textStatus + ', ' + errorThrown);
        }
      })
    },200)
  },
  showEventsList: function () {
    clearTimeout(showEvTime)
    $('.pEv-wrap .loading').css('display', 'block')
    showEvTime = setTimeout(() => {
      let data = eventsConfig.params.datalist
      if (data.length > 0) {
        let time = ''
        let title = ''
        let currentpage = eventsConfig.params.currentpage
        let pagesize = eventsConfig.params.pagesize
        let datalist = data.slice(currentpage * pagesize - pagesize,currentpage * pagesize)
        let str = datalist.map(item => {
          let startTime = this.enFormat(item.events_start_dt)
          let endTime = this.enFormat(item.events_end_dt)
          if(startTime == endTime) {
            time = startTime
          }else {
            time = `${startTime} to ${endTime}`
          }
          if(item.events_en_subject !== '' && item.events_en_subject !== undefined) {
            title = this.unlabels(item.events_en_subject) + ' - ' + this.unlabels(item.events_en_title)
          }else {
            title = this.unlabels(item.events_en_title)
          }
          return  `
              <li class="nl-part slide-top">
        
              <div class="desc-img nl-img">
                <a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">
                ${item.events_file_poster === '' ? 
                '<img referrerpolicy="no-referrer" src="' + eventsConfig.randomImg() + '" loading="lazy" decoding="async" alt="">'  : 
                '<img referrerpolicy="no-referrer" src="' + item.events_file_poster + '" onerror="javascript:this.src=' + eventsConfig.randomImg()+'" loading="lazy" decoding="async" alt="">'
              }
                </a>
              </div>
              <div class="nl-detail">
                <div class="nl-category"><a href="https://ucalendar.ust.hk/events/${item.events_id}">${item.events_category}</a></div>
                <div class="nl-title ellipsis-2"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${title}</a></div>
                <div class="nl-info"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${item.events_en_organizer == null || item.events_en_organizer === '' ? '' : 'organized by ' + item.events_en_organizer}</a></div>
                <div class="nl-info"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${item.events_en_venue == null || item.events_en_venue === ''|| item.events_en_venue === undefined ? '' : item.events_en_venue}</a></div>
                <div class="nl-time"><a href="https://ucalendar.ust.hk/events/${item.events_id}" target="_blank" rel="noopener noreferrer">${time}</a></div>
              </div>
            </li>
          `
        }).join('')
        $('.pEv-wrap .nl-list')[0].innerHTML = str
  
        eventsConfig.showPage(data)
        if(data.length > eventsConfig.params.pagesize) {
          $('.nl-pagination').css('display','block')
          $('.pEv-wrap h2').css('display','block')
        }
        $('.loading').css('display', 'none')
        slideTop()
      }else {
        $('.pEv-wrap').addClass('nodata')
      }
    }, 200);
  },
  showPage: function () {
    let pageShowNum = 5
    let adjustNum = 2
    let total = eventsConfig.params.total
    let pagesize = eventsConfig.params.pagesize
    let currentpage = eventsConfig.params.currentpage
    let sum = Math.ceil(total / pagesize)
    let str = `<div class="page left-arrow button-pre">&lt;</div>`

    if (sum <= pageShowNum) {
      for (let i = 1; i <= sum; i++) {
        if (i === currentpage) {
          str += `<div class="page page-num active data-index=${currentpage}">${currentpage}</div>`
        } else {
          str += `<div class="page page-num data-index=${i}">${i}</div>`
        }
      }
    } else {
      if (currentpage - 1 > adjustNum) {
        str += `<div class="page page-dot">...</div>`
      }
      let stratIndex = currentpage - adjustNum
      if (stratIndex < 1) {
        stratIndex = 1
      }
      if (stratIndex > sum - pageShowNum) {
        stratIndex = sum - pageShowNum + 1
      }
      let endIndex = currentpage + adjustNum
      if (endIndex >= sum) {
        endIndex = sum
      }
      if (endIndex < pageShowNum) {
        endIndex = pageShowNum
      }
      for (let i = stratIndex; i <= endIndex; i++) {
        if (i === currentpage) {
          str += `<div class="page page-num active data-index=${currentpage}">${currentpage}</div>`
        } else {
          str += `<div class="page page-num data-index=${i}">${i}</div>`
        }
      }
      if (currentpage < sum - adjustNum) {
        str += `<div class="page page-dot">...</div>`
      }
    }
    str += `<div class="page right-arrow button-net">&gt;</div>`

    $('.nl-pagination .page-list')[0].innerHTML = str
    pageClick()
    if(eventsConfig.params.currentpage <= 1) {
      $('.right-arrow').removeClass('unclick')
      $('.left-arrow').addClass('unclick')
    }
    if(eventsConfig.params.currentpage >= sum) {
      $('.left-arrow').removeClass('unclick')
      $('.right-arrow').addClass('unclick')
    }

  },
  getFeatureEv: function (data) {
    // 获取未来两周活动
    let now = new Date(this.startTimeFormat(new Date()))
    // 筛选未过期活动
    let feaTime = new Date().setDate(now.getDate() + 15)
    let temp = data.filter(item => {
        return Date.parse(item.events_end_dt) >= Date.parse(now) && Date.parse(item.events_start_dt) <= feaTime
    })
    // 筛选最近进行中的活动
    // let time = this.startTimeFormat(new Date().setDate(1))
    let pTime = new Date().setDate(now.getDate() + 7)
    let feature = temp.filter(item => {
      return Date.parse(item.events_end_dt) <= new Date(pTime).getTime()
    })

    // 按近到远排序
    let sortFData = feature.sort((a,b) => {
      return Date.parse(a.events_start_dt) - Date.parse(b.events_start_dt)
    })
    return sortFData
  },
  getPastedEv: function (data) {
    console.log('pastData---->',data);
    let now = new Date()
    // 已过期活动
    let pasted = data.filter(item => {
      return Date.parse(item.events_end_dt) < Date.parse(now)
    })
    console.log('pasted---->',pasted);
    let sortPData = pasted.sort((a,b) => {
      return Date.parse(b.events_start_dt) - Date.parse(a.events_start_dt)
    })
    return sortPData
  },
  startTimeFormat: function (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + Number(date.getMonth() + 1);
    let day = date.getDate() >= 10 ? date.getDate() : '0' + Number(date.getDate());
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();

    return `${year}-${month}-${day} 00:00:00`; 
  },
  enFormat: function (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + Number(date.getMonth() + 1);
    let day = date.getDate()>= 10 ? date.getDate() : '0' + date.getDate();
    let hour = date.getHours()>= 10 ? date.getHours() : '0' + date.getHours();
    let minute = date.getMinutes()>= 10 ? date.getMinutes() : '0' + date.getMinutes();
    let d = new Date(`${year}/${month}/${day}`)

    let chinaDate = d.toDateString();
    // let globalDate = d.toUTCString(); //"Wed Jan 02 2019"

    let chinaDateArray = chinaDate.split(' ');
    let displayDate = `${chinaDateArray[2]} ${chinaDateArray[1]} ${chinaDateArray[3]}`;
    return displayDate; 
  },
  cnFormat: function (time) {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + Number(date.getMonth() + 1);
    let day = date.getDate()>= 10 ? date.getDate() : '0' + date.getDate();
    let hour = date.getHours()>= 10 ? date.getHours() : '0' + date.getHours();
    let minute = date.getMinutes()>= 10 ? date.getMinutes() : '0' + date.getMinutes();

    return `${year}年${month}月${day}日`; 
  },
  strToDate: function (str){
    let time = str.replace(/-/g,"/")

    return this.dateFormat(new Date(time))
  },
  unlabels: function (str) {
    return str.replace(/<[^>]+>/g,"")
  },
  reduceData: function (data) {
    for(let i = 0;i < data.length - 1;i++) {
      for(let j = i + 1;j < data.length;j++){
        if(eventsConfig.unlabels(data[i].title) == eventsConfig.unlabels(data[j].title) && data[i].startAt == data[j].startAt) {
          data.splice(j,1)
        }
      }
    }
  },
  randomImg: function () {
    // let index = Math.floor((Math.random() * 4 + 1))
    if(index < 4) {
      index++
    }else {
      index = 1
    }
    // console.log('---->',index);
    return `/wp-content/themes/hkust-gz-offical/images/common/default_r${index}.jpg`
  },
  getCnLink: function (link) {
    return link.replace('events','zh-hans/events')
  }
}

function slideTop() {
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
}
function pageClick() {
  let total = eventsConfig.params.total
  let pagesize = eventsConfig.params.pagesize
  let sum = Math.ceil(total / pagesize)
  $('.nl-pagination').on('click', '.left-arrow', function () {
    if (eventsConfig.params.currentpage > 1) {
      let num = Number($('.page-num.active')[0].innerHTML)
      eventsConfig.params.currentpage = num - 1
      eventsConfig.showEventsList()
    }
  })
  $('.nl-pagination').on('click', '.page-num', function () {
    let num = Number($(this)[0].innerHTML)
    eventsConfig.params.currentpage = num
    eventsConfig.showEventsList()
  })
  $('.nl-pagination').on('click', '.right-arrow', function () {
    if (eventsConfig.params.currentpage < sum) {
      let num = Number($('.page-num.active')[0].innerHTML)
      eventsConfig.params.currentpage = num + 1
      eventsConfig.showEventsList()
    }
  })
  $('.page-header.events').removeClass('slide-top')
}

