(document.getElementById("noscript").style.display = "none"),
  window.history.length > 1 &&
    setTimeout(function() {
      window.history.forward();
    }, 0),
  require(["jquery", "browserdetector", "qsnap"], function(e, t) {
    var n = function(e, t, r) {
      if (!e || t < 0 || t > e.length) return;
      var i = r(e[t]),
        s = new Image();
      (s.onload = function() {
        var o = atob(s.src.split(",")[1]),
          u = s.src
            .split(",")[0]
            .split(":")[1]
            .split(";")[0],
          a = new ArrayBuffer(o.length),
          f = new Uint8Array(a);
        for (var l = 0; l < o.length; l++) f[l] = o.charCodeAt(l) & 255;
        var c = new Blob([a], { type: u }),
          h = (window.webkitURL || window.URL).createObjectURL(c),
          p = document.createElement("a"),
          d = document.createEvent("MouseEvents");
        d.initMouseEvent(
          "click",
          !0,
          !0,
          window,
          1,
          0,
          0,
          0,
          0,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
          p.setAttribute("href", h),
          p.setAttribute(
            "download",
            i.title.replace(".", " ") + "." + i.format
          ),
          p.dispatchEvent(d),
          t++,
          t < e.length && n(e, t, r);
      }),
        (s.src = i.image);
    };
    (window.saveImages = function(e, t) {
      e && e.length > 0 && n(e, 0, t);
    }),
      (window.supportReadingLocalFile = function() {
        return (
          window.File && window.FileReader && window.FileList && window.Blob
        );
      }),
      (window.copyToClipboard = function(e) {
        chrome.extension.sendMessage({ name: "copy-to-clipboard", data: e });
      }),
      (window.supportFullPageCapture = function() {
        return !0;
      }),
      e(function() {
        var e = new Iris.Editor({
          browser: t.getBrowser(),
          version: t.getVersion(),
          OS: t.getOS()
        });
        chrome.extension.onMessage.addListener(function(t, n, r) {
          e[t.name] && (e[t.name](t.data), r());
        }),
          chrome.extension.sendMessage({ name: "ping" }),
          e.on("capture-new", function() {
            chrome.extension.sendMessage({ name: "capture-new" });
          }),
          e.on("setting-changed", function(e, t) {
            chrome.extension.sendMessage({ name: "setting-changed", data: t });
          }),
          e.on("add-file-err", function(e, t) {
            alert(
              "This browser version does not support adding file. Please upgrade your browser."
            );
          });
      });
  });
