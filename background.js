(function() {
  var e = "../editor/editor.html",
    t = "opera://",
    n = "chrome-extension://" + chrome.i18n.getMessage("@@extension_id"),
    r = "icons/favicon.png",
    i = "icons/favicon.png",
    s,
    o,
    u,
    a,
    f,
    l = ["content_script.js"],
    c = [];
  (function() {
    var e = $.cookie("keyboard-shortcut");
    e
      ? (a = JSON.parse(e))
      : (a = { altKey: !0, shiftKey: !1, keyCode: "V".charCodeAt(0) });
    var t = $.cookie("capture-full-page-keyboard-shortcut");
    t
      ? (f = JSON.parse(t))
      : (f = { altKey: !0, shiftKey: !1, keyCode: "F".charCodeAt(0) });
  })();
  var h = function(e, t, r) {
    if (
      !e.match(/(chrome):\/\//gi) &&
      !e.match(/(opera):\/\//gi) &&
      !e.match(/(chrome-devtools):\/\//gi) &&
      e.indexOf(n) < 0
    ) {
      var i = l.length,
        s = 0;
      for (var o = 0; o < l.length; o++)
        chrome.tabs.executeScript(t, { file: l[o] }, function(e) {
          var n = -1;
          for (var o = 0; o < c.length; o++)
            if (c[o] === t) {
              n = o;
              break;
            }
          n != -1
            ? typeof e == "undefined" && c.splice(n, 1)
            : typeof e != "undefined" && c.push(t),
            s++,
            s === i && typeof r != "undefined" && r != null && r();
        });
    }
  };
  chrome.browserAction.setIcon({ path: i });
  var p = function(e, t) {
      chrome.tabs.sendMessage(e.id, { name: "addScreen", data: t }, function() {
        chrome.windows.update(e.windowId, { focused: !0 }),
          chrome.tabs.update(e.id, { selected: !0 });
      });
    },
    d = function() {
      w(),
        chrome.tabs.query(
          { windowId: chrome.windows.WINDOW_ID_CURRENT, active: !0 },
          function(t) {
            var n = t[0];
            chrome.tabs.captureVisibleTab(null, { format: "png" }, function(t) {
              if (!t) {
                alert("Screen Capture does not have permission to capture this page");
                return;
              }
              var r = { title: n.title, url: n.url, image: t };
              (o = n),
                s
                  ? p(s, r)
                  : v(function(t) {
                      t != null
                        ? ((s = t), p(s, r))
                        : ((u = r),
                          chrome.tabs.create({ index: n.index + 1, url: e }));
                    });
            });
          }
        );
    },
    v = function(e) {
      chrome.windows.getAll({ populate: !0 }, function(t) {
        var r = null;
        for (var i = 0; i < t.length; i++) {
          if (r != null) break;
          for (var s = 0; s < t[i].tabs.length; s++)
            if (t[i].tabs[s].url.indexOf(n) >= 0) {
              r = t[i].tabs[s];
              break;
            }
        }
        return e(r);
      });
    },
    m = !1,
    g,
    y = function(e) {
      (g = {}),
        (m = !0),
        chrome.tabs.sendMessage(e.id, { name: "scroll-page" }, function(e) {});
    },
    b = function(e, t, n) {
      var r;
      g.canvas ||
        ((r = chrome.extension
          .getBackgroundPage()
          .document.createElement("canvas")),
        (r.width = e.totalWidth),
        (r.height = e.totalHeight),
        (g.canvas = r),
        (g.ctx = r.getContext("2d"))),
        chrome.tabs.query({ currentWindow: !0, active: !0 }, function(t) {
          chrome.tabs.captureVisibleTab(null, { format: "png" }, function(t) {
            if (!t) {
              alert("Screen Capture does not have permission to capture this page"), w();
              return;
            }
            if (t) {
              var r = new Image();
              (r.onload = function() {
                g.ctx.drawImage(r, e.x, e.y), n(!0);
              }),
                (r.src = t);
            }
          });
        });
    },
    w = function() {
      m = !1;
      var e = chrome.extension.getViews({ type: "popup" });
      e != null && e.length > 0 && e[0].close(), (g = null);
    },
    E = function() {
      var t = g.canvas.toDataURL();
      w();
      if (t === "data:,") {
        window.alert("Cannot load snap into editor because it is too big!");
        return;
      }
      chrome.tabs.query(
        { windowId: chrome.windows.WINDOW_ID_CURRENT, active: !0 },
        function(n) {
          var r = n[0],
            i = { title: r.title, url: r.url, image: t };
          (o = r),
            s
              ? p(s, i)
              : v(function(t) {
                  t != null
                    ? ((s = t), p(s, i))
                    : ((u = i),
                      chrome.tabs.create({ index: r.index + 1, url: e }));
                });
        }
      );
    };
  chrome.extension.onMessage.addListener(function(e, t, i) {
    if (e.name === "ping")
      u != null
        ? (p(s, u), (u = null))
        : v(function(e) {
            e != null &&
              ((s = e),
              chrome.browserAction.setIcon({ path: r }),
              chrome.tabs.query({ lastFocusedWindow: !0, active: !0 }, function(
                e
              ) {
                if (e.length == 0) return;
                e[0].url.indexOf(n) === 0
                  ? chrome.browserAction.disable()
                  : x(e[0]);
              }));
          });
    else if (e.name === "get-background-states")
      chrome.tabs.getSelected(null, function(e) {
        var t = m;
        if (!m)
          for (var n = 0; n < c.length; n++)
            if (c[n] === e.id) {
              t = !0;
              break;
            }
        t || (m = !1),
          i({
            isCapturingFullPage: m,
            canCaptureFullPage: t,
            captureVisiblePartKeyboardShortcut: a,
            captureFullPageKeyboardShortcut: f
          });
      });
    else if (e.name === "capture-visible-part") d();
    else if (e.name === "capture-full-page")
      chrome.tabs.getSelected(null, function(e) {
        e.url.indexOf("https://chrome.google.com/webstore") >= 0
          ? d()
          : h(e.url, e.id, function() {
              y(e);
            });
      });
    else if (e.name === "capture-scrolling-page") b(e, t, i);
    else if (e.name === "finished-scrolling") E();
    else if (e.name === "capture-new")
      chrome.tabs.query(
        { windowId: o ? o.windowId : chrome.windows.WINDOW_ID_CURRENT },
        function(e) {
          var t = null,
            n = null;
          for (var r = 0; r < e.length; r++) {
            if (s && e[r].id === s.id) continue;
            o && e[r].id === o.id ? (t = o) : n || (n = e[r]);
          }
          var i = t || n;
          i !== null &&
            ((o = i),
            chrome.windows.update(i.windowId, { focused: !0 }),
            chrome.tabs.update(i.id, { selected: !0 }));
        }
      );
    else if (e.name === "setting-changed")
      (a = e.data.hotkeySettings), (f = e.data.captureFullPageHotkeySettings);
    else if (e.name === "keyboard-shortcut") {
      var l = e.keys;
      l.altKey === a.altKey &&
      l.shiftKey === a.shiftKey &&
      l.keyCode === a.keyCode
        ? d()
        : l.altKey === f.altKey &&
          l.shiftKey === f.shiftKey &&
          l.keyCode === f.keyCode &&
          chrome.tabs.getSelected(null, function(e) {
            h(e.url, e.id, function() {
              y(e);
            });
          });
    } else if (e.name === "copy-to-clipboard") {
      var g = e.data;
      if (g == null) return;
      var w = chrome.extension.getBackgroundPage(),
        S = w.document.getElementById("clipboardholder");
      (S.style.display = "block"),
        (S.value = g),
        S.select(),
        w.document.execCommand("Copy"),
        (S.style.display = "none");
    }
    return !0;
  });
  var S = function() {
      (s = null), chrome.browserAction.setIcon({ path: i });
    },
    x = function(e) {
      if (!e) return;
      !e.url ||
      e.url.indexOf("chrome://") === 0 ||
      e.url.indexOf("opera://") === 0 ||
      e.url.indexOf("file://") === 0
        ? (s && e.id === s.id && S(), chrome.browserAction.disable())
        : e.url.indexOf("chrome-extension://") === 0
        ? (s && e.id === s.id && (s = null),
          chrome.browserAction.disable(),
          e.url.indexOf(n) === 0 &&
            ((s = e), chrome.browserAction.setIcon({ path: r })))
        : s && e.id === s.id
        ? (S(), chrome.browserAction.enable())
        : s
        ? chrome.tabs.query({ active: !0 }, function(e) {
            if (e.length == 0) return;
            chrome.browserAction.setIcon({ path: r }),
              e[0].url.indexOf(s.url) === 0
                ? chrome.browserAction.disable()
                : chrome.browserAction.enable();
          })
        : chrome.browserAction.enable();
    };
  chrome.tabs.onActivated.addListener(function(e) {
    chrome.tabs.get(e.tabId, function(e) {
      x(e);
    });
  }),
    chrome.windows.onFocusChanged.addListener(function(e) {
      e !== chrome.windows.WINDOW_ID_NONE &&
        chrome.tabs.query({ windowId: e, active: !0 }, function(e) {
          if (e.length == 0) return;
          var t = e[0];
          x(t);
        });
    }),
    chrome.tabs.onUpdated.addListener(function(e, t, n) {
      h(n.url, n.id, function() {
        t.url && x(n);
      });
    }),
    chrome.tabs.onRemoved.addListener(function(e) {
      var t = -1;
      for (var n = 0; n < c.length; n++)
        if (c[n] === e) {
          t = n;
          break;
        }
      t != -1 && c.splice(t, 1),
        s && e === s.id ? S() : o && e === o.id && (o = null);
    });
  var T = function() {
    chrome.windows.getAll({ populate: !0 }, function(e) {
      for (var t = 0; t < e.length; t++)
        for (var n = 0; n < e[t].tabs.length; n++)
          h(e[t].tabs[n].url, e[t].tabs[n].id, function() {});
    });
  };
  chrome.runtime.onInstalled.addListener(function(e) {
    T();
  }),
    T();
})();
