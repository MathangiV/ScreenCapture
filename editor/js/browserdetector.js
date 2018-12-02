define([], function() {
  var e = {
    init: function() {
      (this.browser =
        this.searchString(this.dataBrowser) || "An unknown browser"),
        (this.version =
          this.searchVersion(window.navigator.userAgent) ||
          this.searchVersion(window.navigator.appVersion) ||
          "an unknown version"),
        (this.OS = this.searchString(this.dataOS) || "an unknown OS");
    },
    searchString: function(e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t].string,
          r = e[t].prop;
        this.versionSearchString = e[t].versionSearch || e[t].identity;
        if (n) {
          if (n.indexOf(e[t].subString) != -1) return e[t].identity;
        } else if (r) return e[t].identity;
      }
    },
    searchVersion: function(e) {
      var t = e.indexOf(this.versionSearchString);
      if (t == -1) return;
      return parseFloat(e.substring(t + this.versionSearchString.length + 1));
    },
    dataBrowser: [
      {
        string: window.navigator.userAgent,
        subString: "OPR",
        identity: "Opera"
      },
      {
        string: window.navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
      },
      {
        string: window.navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
      },
      {
        string: window.navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
      },
      { string: window.navigator.vendor, subString: "iCab", identity: "iCab" },
      {
        string: window.navigator.vendor,
        subString: "KDE",
        identity: "Konqueror"
      },
      {
        string: window.navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
      },
      {
        string: window.navigator.vendor,
        subString: "Camino",
        identity: "Camino"
      },
      {
        string: window.navigator.userAgent,
        subString: "Netscape",
        identity: "Netscape"
      },
      {
        string: window.navigator.userAgent,
        subString: "MSIE",
        identity: "Internet Explorer",
        versionSearch: "MSIE"
      },
      {
        string: window.navigator.userAgent,
        subString: "Trident",
        identity: "Internet Explorer",
        versionSearch: "rv"
      },
      {
        string: window.navigator.userAgent,
        subString: "Gecko",
        identity: "Mozilla",
        versionSearch: "rv"
      },
      {
        string: window.navigator.userAgent,
        subString: "Mozilla",
        identity: "Netscape",
        versionSearch: "Mozilla"
      }
    ],
    dataOS: [
      {
        string: window.navigator.platform,
        subString: "Win",
        identity: "Windows"
      },
      { string: window.navigator.platform, subString: "Mac", identity: "Mac" },
      {
        string: window.navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
      },
      {
        string: window.navigator.platform,
        subString: "Linux",
        identity: "Linux"
      }
    ]
  };
  return (
    e.init(),
    {
      getBrowser: function() {
        return e.browser;
      },
      getVersion: function() {
        return e.version;
      },
      getOS: function() {
        return e.OS;
      }
    }
  );
});
