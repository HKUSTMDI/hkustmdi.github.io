var _hmt = _hmt || [];

(function() {

  var hm = document.createElement("script");

  hm.src = "https://hm.baidu.com/hm.js?d5243938768ecbc44e55b01a2a2a7796";

  var s = document.getElementsByTagName("script")[0];

  s.parentNode.insertBefore(hm, s);
  
  var GoogleOP = document.createElement("script");

  GoogleOP.src = "https://www.googleoptimize.com/optimize.js?id=OPT-PTK6VKV";

  s.parentNode.insertBefore(GoogleOP, s);
  
  document.addEventListener("DOMContentLoaded", function(event){
    var video = document.querySelectorAll('video')
    if (video.length){
      video.forEach((element) => {element.setAttribute('playsinline','playsinline'); var src = element.firstElementChild.getAttribute('src'); element.setAttribute('src',src);});
    }
  });

})();

 (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2207042,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
