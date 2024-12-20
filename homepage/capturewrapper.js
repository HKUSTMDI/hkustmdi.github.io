var savedPictureContent = "";
var extendName = "";
var captureObj = null;
var downloadUrl = "https://7m-sdk.oss-accelerate.aliyuncs.com/im/CaptureInstall.exe?";

/*
用于初始化牛牛截图控件，此函数需要在页面加载完成后立即调用 
在此函数中，您可以设置相关的截图的UI控制，如，画笔大小、边框颜色等等 【这部分信息在niuniucapture.js中也有默认值，直接修改默认值也可 】
*/
function InitNiuNiu() {
  if (isMacintosh()) {
    downloadUrl = "https://7m-sdk.oss-accelerate.aliyuncs.com/im/CaptureInstall.dmg?";
  }
  captureObj = new NiuniuCaptureObject();
  captureObj.NiuniuAuthKey = "niuniu";
  //此处可以设置相关参数
  captureObj.TrackColor = rgb2value(255, 0, 0);
  captureObj.EditBorderColor = rgb2value(0, 0, 255);

  //设置工具栏的TOOLTIP
  //captureObj.ToolTipText = "tipRectangle|tipCircle|tipArrow|tipBrush|tipGlitter|tipMosaic|tipText|tipUndo|tipSave|tipCancel|tipFinish|Finish";

  //如果要设置额外的参数，往如下这个数组中增加，例如要隐藏指定的按钮
  //captureObj.More_Ext_Params[0] = "2,rectangle|text";

  //设置控件加载完成以及截图完成的回调函数
  captureObj.FinishedCallback = OnCaptureFinishedCallback;
  captureObj.PluginLoadedCallback = PluginLoadedCallback;
  captureObj.VersionCallback = VersionCallback;

  //初始化控件
  captureObj.InitNiuniuCapture();
}

//用于返回控件的版本号
function VersionCallback(ver) {
  //captureObj.Version;
  //可以在此根据最新的版本号与控件返回的版本号对比，决定是否要提示升级
  //alert(ver);
}
/*
当控件成功加载后回调的的函数，您可以在此控制相应的UI显示  
*/
function PluginLoadedCallback(success) {
  if (success) {
    $(".captureErrorInfo").html('');
    $(".captureErrorInfo").hide();
    // $("#info").html("");
    // $("#imgshow").hide();
    // $("#imgshow").attr("src", "./image/loading.gif?v=1");
    // $("#btnReload").hide();
    // $("#btnCapture").show();
  }
}

function openDownloadNiuniu () {
  window.open(downloadUrl, '_blank')
}

//根据是否是Chrome新版本来控制下载不同的控件安装包
function ShowDownLoad() {
  $(".captureErrorInfo").html(
    '正在截图中，如果超过5秒无响应，请点此<a onclick="openDownloadNiuniu()" href="javascript:">下载安装</a>'
  );
  $(".captureErrorInfo").show();
}

/*
当提示安装控件后，需要重新加载控件来使用截图；
也有部分是需要刷新浏览器的
*/
function ReloadPlugin() {
  captureObj.LoadPlugin();
  $("#btnReload").hide();
  $("#btnCapture").show();
  if (captureObj.pluginValid()) {
    $("#downloadNotice").hide();
    $("#info").html("截图控件已经安装完毕，您可以进行截图了。");
  } else {
    var browserInfo =
      "查看控件是否被浏览器阻止，或通过浏览器设置中的加载项查看NiuniuCapture是否加载并正常运行";
    $("#info").html(
      "截图控件未能识别到，请按如下步骤检查:<br/>1. 确定您已经下载控件安装包并正常安装 <br/>2. " +
        browserInfo +
        "<br/>3. 刷新页面或重新启动浏览器试下<br/>4. 如果仍旧不能截图，出大招吧：" +
        '<a target="_blank" style="color:#ff0000;" class="btn" href="http://shang.qq.com/wpa/qunwpa?idkey=a9dab7a14df03d19a2833e6b5f17a33639027d06213cf61bdb7554b04492b6e5">一键加群求助</a>'
    );
  }
}

/*
截图入口函数，用于控制UI标签的显示 
*/
function StartCapture() {
  var captureRet = Capture();
  //从返回值来解析显示
  if (captureRet == emCaptureFailed) {
    ShowDownLoad();
  } else if (captureRet == emCaptureUnknown) {
    $(".captureErrorInfo").html(
      '正在截图中，如果超过5秒无响应，请点此<a target="_blank" href="' +
        downloadUrl +
        '" + date.getMinutes() + date.getSeconds()">下载安装</a>'
    );
  }
}

/*
此函数是根据在测试页面上的不同选项来进行截图，在实际应用中，您只需要根据您实际需要的截图模式，传入相应的参数即可 
*/
function Capture() {
  var defaultName = "1.png"; //此处为了防止上传的数据过大，建议使用JPG格式
  var hideFlag = 0;
  var autoFlag = 3;
  var captureRet = true;
  if (autoFlag == 0) {
    return captureObj.DoCapture("1.png", hideFlag, 0, 0, 0, 0, 0);
  } else {
    // autoFlag = $("#getimagefromclipboard").is(":checked") ? 4 : 1;
    if (autoFlag == 4) {
      return captureObj.DoCapture("", 0, 4, 0, 0, 0, 0);
    }
    // autoFlag = $("#showprewindow").is(":checked") ? 3 : 1;
    if (autoFlag == 3) {
      //此时如果x, y, width, height全为0，则表示预截图窗口点击“开始截图”时，手工先把区域
      //x, y, width, height全为1，则表示预截图窗口点击“开始截图”时，自动截取整个桌面
      //其他情况，则自动截取 x, y, width, height 指定的区域
      return captureObj.DoCapture("1.png", hideFlag, 3, 0, 0, 0, 0);
    }
    autoFlag = $("#fullscreen").is(":checked") ? 2 : 1;
    if (autoFlag == 2) {
      return captureObj.DoCapture("1.png", hideFlag, 2, 0, 0, 0, 0);
    } else {
      return captureObj.DoCapture(
        "1.png",
        hideFlag,
        1,
        $("#xpos").val(),
        $("#ypos").val(),
        $("#width").val(),
        $("#height").val()
      );
    }
  }
}

/*
此处是截图后的回调函数，用于将截图的详细信息反馈回来，你需要调整此函数，完成图像数据的传输与显示  
*/
function OnCaptureFinishedCallback(
  type,
  x,
  y,
  width,
  height,
  extinfo,
  content,
  localpath
) {
  if (type < 0) {
    //需要重新安装控件
    ShowDownLoad();
    return;
  }
  console.log(type, '====')
  //extinfo是一个扩展的json字符串，可以取出来后进行解析，目前用于返回点击完成截图的按钮名称，用于扩展按钮
  //比如：{"btnname":"finish"}
  // $("#show").hide();
  switch (type) {
    case 1: {
      // $("#info").html(
      //   "截图完成： x:" +
      //     x +
      //     ",y:" +
      //     y +
      //     ",widht:" +
      //     width +
      //     ",height:" +
      //     height
      // );
      var data = ''
      var height = ''
      if (phoneSystem) {
        if ($('#chatbox_input_wap:visible').length) {
          data = $('#chatbox_input_wap').val()
          height = $('#chatbox_input_wap').height()
        }
        if ($('#chatbox_input:visible').length) {
          data = $('#chatbox_input').val()
        }
      }
      
      var binaryData = atob(content);
      // 定义一个空的Uint8Array数组
      var uint8Array = new Uint8Array(binaryData.length);

      // 将二进制数据存储到Uint8Array数组中
      for (var i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
      }

      // 创建Blob对象
      var blob = new Blob([uint8Array], { type: 'image/png' });
      blob.fileName = "clipboard" + new Date().getTime() + ".png";
      var blob1 = new File([blob], blob.fileName, { type: 'image/png' });
      
      var xhr = {};
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      var time = chatUtils.getTimestamp();
      var sendData = {
        sid: cookie_sid,
        accessId: msg_config.accessId,
        contentType: 'image',
        action: 'newMsg',
        socketId: currentSocketId,
        socketKey: currentSocketIdKey,
        timestamp: time,
        token: token,
        tokenTime: tokenTime,
        inviteAgentId: inviteAgentId
      }
      fd.append('data', JSON.stringify(sendData));
      fd.append("picToUpload", blob1);
      fd.append("isClipboard", true);

      /* event listners */
      xhr.upload.addEventListener("progress", uploadImgProgress, false);
      xhr.addEventListener("load", uploadImgComplete, false);
      xhr.addEventListener("error", uploadImgFailed, false);
      xhr.addEventListener("abort", uploadImgCanceled, false);
      /* Be sure to change the url below to the url of your upload server side script */
      xhr.open("POST", msg_config.proxyMsgUrl + "/chat");
      xhr.send(fd);
      chatUtils.appendCustomerChatMsg({ contentType: "uploadeGif", time: time });
      $(".a_msg_imgandfile").parents(".outer-right").addClass("img-file");
      chatUtils.scrollMsgBoxToBottom();
      setTimeout(function () {
        if (phoneSystem) {
          if ($('#chatbox_input_wap:visible').length) {
            $('#chatbox_input_wap').val(data)
            $('#chatbox_input_wap').height(height)
            chatUtils.inputHeightChange();
          }
          if ($('#chatbox_input:visible').length) {
            $('#chatbox_input').val(data)
          }
        }
      }, 0)
      break;
    }
    case 2: {
      // $("#info").html("您取消了截图");
      break;
    }
    case 3: {
      // $("#info").html(
      //   "您保存了截图到本地： x:" +
      //     x +
      //     ",y:" +
      //     y +
      //     ",widht:" +
      //     width +
      //     ",height:" +
      //     height +
      //     " " +
      //     localpath
      // );
      // UploadCaptureData(content, localpath);
      break;
    }
    case 4: {
      if (content != "") {
        // $("#info").html("从剪贴板获取到了截图： " + localpath);
        // UploadCaptureData(content, localpath);
      } else {
        // $("#info").html("从剪贴板获取图片失败。");
      }
      break;
    }
  }
}

//控制上传
function UploadCaptureData(content, localpath) {
  savedPictureContent = content;

  //获取图片的扩展名
  var pos = localpath.lastIndexOf(".");
  extendName = localpath.substr(pos + 1);
  if (extendName == "") {
    extendname = "jpg";
  }
  $("#show").html("截图已经完成，请点击");
  $("#show").show();
  var autoUpload = $("#autoupload").attr("checked") == "checked" ? 1 : 0;
  if (autoUpload) {
    UploadData();
  } else {
    $("#btnUpload").show();
  }
}

/*
实际上传图像数据的函数，此处主要是将BASE64的图像数据，通过AJAX的方式POST到服务器保存成文件，并且显示在页面上
*/
function UploadData() {
  $("#show").html("截图完成，正在上传，请稍后...");
  $("#btnUpload").hide();
  //上传的数据除了图片外，还可以包含自己需要传递的参数
  var data =
    "userid=test111&extendname=" +
    extendName +
    "&picdata=" +
    encodeURIComponent(savedPictureContent);

  $.ajax({
    type: "POST",
    url: "./upload.php",
    dataType: "json",
    data: data,
    success: function (obj) {
      if (obj.code == 0) {
        $("#show").html("上传成功，图片地址：" + obj.info);
        $("#imgshow").show();
        $("#imgshow").attr("src", obj.info);
      } else {
        $("#show").html("上传失败 :" + obj.info);
      }
    },
    error: function () {
      $("#show").html("由于网络原因，上传失败。");
    },
  });
}
