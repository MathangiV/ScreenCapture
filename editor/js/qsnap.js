var Iris;
(function(e) {
  var t = (function() {
    function e() {}
    return (
      (e.version = "1.4.1.0"),
      (e.serverUrl = "https://qsnapnet.com"),
      (e.serverApiKey = "vgDPcSE98XxnlgxGmfugJR8jKo6PDhsy"),
      e
    );
  })();
  e.AppInfo = t;
})(Iris || (Iris = {}));
var __extends =
    this.__extends ||
    function(e, t) {
      function n() {
        this.constructor = e;
      }
      (n.prototype = t.prototype), (e.prototype = new n());
    },
  Iris;
(function(e) {
  (e.HANDLE_SIZE = 6),
    (e.HANDLE_STROKE_COLOR = "#000"),
    (e.HANDLE_FILL_COLOR = "#fff");
  var t = (function() {
    function e(e, t, n) {
      (this.status = e), (this.cursor = t), (this.handle = n);
    }
    return e;
  })();
  e.HitResult = t;
  var n = (function(n) {
    function r(e, t, r) {
      n.call(this),
        (this.strokeColor = e),
        (this.strokeSize = t),
        (this.shape = r),
        (this.selected = !1);
    }
    return (
      __extends(r, n),
      (r.prototype.draw = function(e, t) {
        this.shape.draw(e, t);
      }),
      (r.prototype.select = function() {
        (this.selected = !0),
          (this.outline = new E.Container()),
          this.getStage().addChild(this.outline),
          this.repaint();
      }),
      (r.prototype.deselect = function() {
        if (!this.selected) return;
        (this.selected = !1),
          this.getStage().removeChild(this.outline),
          (this.outline = null),
          this.repaint();
      }),
      (r.prototype.setStrokeColor = function(e) {
        (this.strokeColor = e), this.repaint();
      }),
      (r.prototype.setStrokeSize = function(e) {
        (this.strokeSize = e), this.repaint();
      }),
      (r.prototype.paintOutline = function() {}),
      (r.prototype.repaint = function() {
        this.selected
          ? (this.paintOutline(),
            (this.shadow = new E.Shadow("#FF1414", 0, 0, 10)))
          : (this.shadow = this.createShadow()),
          this.getStage() && this.getStage().update();
      }),
      (r.prototype.createShadow = function() {
        return new E.Shadow("#000", 3, 3, 10);
      }),
      (r.prototype.checkHit = function(e, n) {
        var r = this.getHandleAtPoint(e, n);
        return r ? new t(!0, r.cursor, r) : new t(this.hitTest(e, n), "move");
      }),
      (r.prototype.getHandleAtPoint = function(t, n) {
        if (!this.selected) return null;
        for (var r = this.outline.getNumChildren() - 1; r >= 0; r--) {
          var i = this.outline.getChildAt(r);
          if (!i.name || i.name.indexOf("handle_") < 0) continue;
          var s =
            Math.pow(t - i.center.x, 2) + Math.pow(n - i.center.y, 2) <=
            Math.pow(e.HANDLE_SIZE, 2);
          if (s) return i;
        }
        return null;
      }),
      (r.prototype.moveBy = function(e, t, n, r, i) {
        return null;
      }),
      (r.prototype.move = function(e, t) {}),
      (r.prototype.getState = function() {
        return { strokeColor: this.strokeColor, strokeSize: this.strokeSize };
      }),
      (r.prototype.setState = function(e) {
        (this.strokeColor = e.strokeColor),
          (this.strokeSize = e.strokeSize),
          this.repaint();
      }),
      r
    );
  })(E.Shape);
  e.Shape = n;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(e, n) {
      t.call(this, e, n, new E.Shape());
    }
    return (
      __extends(n, t),
      (n.prototype.start = function(e, t) {
        (this.x0 = e), (this.y0 = t);
      }),
      (n.prototype.end = function(e, t, n) {
        typeof n == "undefined" && (n = !0),
          (this.x1 = e),
          (this.y1 = t),
          n && this.repaint();
      }),
      (n.prototype.paintOutline = function() {
        for (var t = 0; t < 2; t++) {
          var n = t == 0 ? this.x0 : this.x1,
            r = t == 0 ? this.y0 : this.y1,
            i = this.outline["handle_" + t];
          if (!i) {
            var i = (this.outline["handle_" + t] = new E.Shape());
            (i.name = "handle_" + t),
              (i.cursor = "move"),
              this.outline.addChild(i);
          }
          (i.center = { x: n, y: r }),
            i.graphics
              .clear()
              .setStrokeStyle(1)
              .beginStroke(e.HANDLE_STROKE_COLOR)
              .beginFill(e.HANDLE_FILL_COLOR)
              .drawCircle(n, r, e.HANDLE_SIZE);
        }
      }),
      (n.prototype.repaint = function() {
        var e =
          (Math.atan2(this.y1 - this.y0, this.x1 - this.x0) * 180) / Math.PI;
        this.shape.graphics
          .clear()
          .setStrokeStyle(this.strokeSize, "round", "round")
          .beginStroke(this.strokeColor)
          .lineTo(this.x0, this.y0)
          .lineTo(this.x1, this.y1)
          .setStrokeStyle(1, "miter", "miter")
          .beginStroke(this.strokeColor)
          .beginFill(this.strokeColor)
          .drawPolyStar(this.x1, this.y1, this.strokeSize * 1.5, 3, 0.6, e),
          t.prototype.repaint.call(this);
      }),
      (n.prototype.moveBy = function(e, t, n, r, i) {
        return (
          (!i || i.name === "handle_0") && this.start(this.x0 + n, this.y0 + r),
          (!i || i.name === "handle_1") &&
            this.end(this.x1 + n, this.y1 + r, !1),
          this.repaint(),
          i
        );
      }),
      (n.prototype.move = function(e, t) {
        this.start(this.x0 + e, this.y0 + t),
          this.end(this.x1 + e, this.y1 + t, !1),
          this.repaint();
      }),
      (n.prototype.getState = function() {
        var e = t.prototype.getState.call(this);
        return (
          (e.x0 = this.x0),
          (e.y0 = this.y0),
          (e.x1 = this.x1),
          (e.y1 = this.y1),
          e
        );
      }),
      (n.prototype.setState = function(e) {
        this.start(e.x0, e.y0),
          this.end(e.x1, e.y1, !1),
          t.prototype.setState.call(this, e);
      }),
      n
    );
  })(e.Shape);
  e.Arrow = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n) {
      e.call(this, t, n, new E.Shape()), (this.points = []);
    }
    return (
      __extends(t, e),
      (t.prototype.repaint = function() {
        var t = this.shape.graphics;
        t
          .clear()
          .setStrokeStyle(this.strokeSize)
          .beginStroke(this.strokeColor),
          _.each(this.points, function(e) {
            return t.lineTo(e.x, e.y);
          }),
          e.prototype.repaint.call(this);
      }),
      (t.prototype.lineTo = function(e, t) {
        this.points.push({ x: e, y: t }), this.repaint();
      }),
      (t.prototype.end = function() {
        (this.points = simplify(this.points, 0.1)), this.repaint();
      }),
      (t.prototype.moveBy = function(e, t, n, r, i) {
        return this.move(n, r), this.repaint(), null;
      }),
      (t.prototype.move = function(e, t) {
        _.each(this.points, function(n) {
          (n.x += e), (n.y += t);
        });
      }),
      (t.prototype.getState = function() {
        var t = e.prototype.getState.call(this);
        return (
          (t.points = []),
          _.each(this.points, function(e) {
            return t.points.push({ x: e.x, y: e.y });
          }),
          t
        );
      }),
      (t.prototype.setState = function(t) {
        var n = this;
        (this.points = []),
          _.each(t.points, function(e) {
            return n.points.push({ x: e.x, y: e.y });
          }),
          e.prototype.setState.call(this, t);
      }),
      t
    );
  })(e.Shape);
  e.Pencil = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments), (this.bound = new E.Rectangle(0, 0, 0, 0));
    }
    return (
      __extends(n, t),
      (n.prototype.checkHit = function(t, n) {
        var r = this.getHandleAtPoint(t, n);
        if (r) return new e.HitResult(!0, r.cursor, r);
        var i =
          this.bound.x - this.strokeSize / 2 <= t &&
          t <= this.bound.x + this.bound.width + this.strokeSize / 2 &&
          this.bound.y - this.strokeSize / 2 <= n &&
          n <= this.bound.y + this.bound.height + this.strokeSize / 2;
        return new e.HitResult(i, "move");
      }),
      (n.prototype.moveBy = function(e, t, n, r, i) {
        var s = this.bound.x,
          o = this.bound.y,
          u = s + this.bound.width,
          a = o + this.bound.height;
        if (i)
          switch (i.name) {
            case "handle_0":
              (s += n),
                (o += r),
                s >= u && o >= a
                  ? (i = this.outline.handle_7)
                  : s >= u
                  ? (i = this.outline.handle_2)
                  : o >= a && (i = this.outline.handle_5);
              break;
            case "handle_1":
              (o += r), o >= a && (i = this.outline.handle_6);
              break;
            case "handle_2":
              (u += n),
                (o += r),
                u <= s && o >= a
                  ? (i = this.outline.handle_5)
                  : u <= s
                  ? (i = this.outline.handle_0)
                  : o >= a && (i = this.outline.handle_7);
              break;
            case "handle_3":
              (s += n), s >= u && (i = this.outline.handle_4);
              break;
            case "handle_4":
              (u += n), u <= s && (i = this.outline.handle_3);
              break;
            case "handle_5":
              (s += n),
                (a += r),
                s >= u && a <= o
                  ? (i = this.outline.handle_2)
                  : s >= u
                  ? (i = this.outline.handle_7)
                  : a <= o && (i = this.outline.handle_0);
              break;
            case "handle_6":
              (a += r), a <= o && (i = this.outline.handle_1);
              break;
            case "handle_7":
              (u += n),
                (a += r),
                u <= s && a <= o
                  ? (i = this.outline.handle_0)
                  : u <= s
                  ? (i = this.outline.handle_5)
                  : a <= o && (i = this.outline.handle_2);
          }
        else
          (s = this.bound.x + n),
            (o = this.bound.y + r),
            (u = s + this.bound.width),
            (a = o + this.bound.height);
        return (
          this.setBound(
            Math.min(s, u),
            Math.min(o, a),
            Math.abs(u - s),
            Math.abs(a - o)
          ),
          i
        );
      }),
      (n.prototype.setBound = function(e, t, n, r) {
        (this.bound.x = e),
          (this.bound.y = t),
          (this.bound.width = n),
          (this.bound.height = r),
          this.repaint();
      }),
      (n.prototype.move = function(e, t) {
        (this.bound.x = this.bound.x + e),
          (this.bound.y = this.bound.y + t),
          this.repaint();
      }),
      (n.prototype.paintOutline = function() {
        var t = this,
          n = this.bound,
          r = [];
        (r[0] = { name: "handle_0", cursor: "nwse-resize", x: n.x, y: n.y }),
          (r[1] = {
            name: "handle_1",
            cursor: "ns-resize",
            x: n.x + n.width / 2,
            y: n.y
          }),
          (r[2] = {
            name: "handle_2",
            cursor: "nesw-resize",
            x: n.x + n.width,
            y: n.y
          }),
          (r[3] = {
            name: "handle_3",
            cursor: "ew-resize",
            x: n.x,
            y: n.y + n.height / 2
          }),
          (r[4] = {
            name: "handle_4",
            cursor: "ew-resize",
            x: n.x + n.width,
            y: n.y + n.height / 2
          }),
          (r[5] = {
            name: "handle_5",
            cursor: "nesw-resize",
            x: n.x,
            y: n.y + n.height
          }),
          (r[6] = {
            name: "handle_6",
            cursor: "ns-resize",
            x: n.x + n.width / 2,
            y: n.y + n.height
          }),
          (r[7] = {
            name: "handle_7",
            cursor: "nwse-resize",
            x: n.x + n.width,
            y: n.y + n.height
          }),
          r.forEach(function(n) {
            var r = t.outline[n.name];
            if (!r) {
              var r = (t.outline[n.name] = new E.Shape());
              (r.name = n.name), (r.cursor = n.cursor), t.outline.addChild(r);
            }
            (r.center = { x: n.x, y: n.y }),
              r.graphics
                .clear()
                .setStrokeStyle(1)
                .beginStroke(e.HANDLE_STROKE_COLOR)
                .beginFill(e.HANDLE_FILL_COLOR)
                .drawCircle(n.x, n.y, e.HANDLE_SIZE);
          });
      }),
      (n.prototype.getState = function() {
        var e = t.prototype.getState.call(this);
        return (
          (e.bound = new E.Rectangle(
            this.bound.x,
            this.bound.y,
            this.bound.width,
            this.bound.height
          )),
          e
        );
      }),
      (n.prototype.setState = function(e) {
        this.setBound(e.bound.x, e.bound.y, e.bound.width, e.bound.height),
          t.prototype.setState.call(this, e);
      }),
      n
    );
  })(e.Shape);
  e.BoundedShape = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n, r, i, s) {
      e.call(this, t, n, new E.Container()),
        (this.$textBox = i),
        (this.text = ""),
        (this.textboxStyle = s),
        (this.fontSize = r);
      var o = this;
      this.$textBox
        .on("keydown", function(e) {
          if (o.selected) {
            var t = e.keyCode || e.which;
            t === 9 &&
              (e.preventDefault(),
              (this.value += "        "),
              o.onTextChanged(this.value));
          }
        })
        .on("keyup", function(e) {
          o.selected && (o.onTextChanged(this.value), e.preventDefault());
        }),
        $(window).resize(function() {
          o.selected && o.refreshTextboxBound();
        });
    }
    return (
      __extends(t, e),
      (t.prototype.onTextChanged = function(e) {
        this.text = e;
      }),
      (t.prototype.select = function() {
        e.prototype.select.call(this), this.showTextBox();
      }),
      (t.prototype.deselect = function() {
        this.hideTextBox(), e.prototype.deselect.call(this);
      }),
      (t.prototype.repaint = function() {
        this.$textBox.val(this.text).css("color", this.strokeColor),
          this.selected && this.showTextBox(),
          e.prototype.repaint.call(this);
      }),
      (t.prototype.setTextboxBound = function(e, t, n, r) {
        var i = $("canvas").position(),
          s = this.localToGlobal(e, t);
        this.$textBox.css("left", s.x + (i.left > 0 ? i.left : 0)),
          this.$textBox.css("top", s.y),
          this.$textBox.css("width", n),
          this.$textBox.css("height", r);
      }),
      (t.prototype.refreshTextboxBound = function() {}),
      (t.prototype.showText = function(e, t, n) {
        (this.textLabel = this.createLabel(this.text)),
          this.shape.addChild(this.textLabel),
          (this.textLabel.x = e),
          (this.textLabel.y = t),
          (this.textLabel.lineWidth = n),
          (this.textLabel.shadow = new E.Shadow("#000", 0, 0, 0));
      }),
      (t.prototype.createLabel = function(e) {
        var t = new E.Text(
          "",
          "normal " + this.fontSize.toString() + "px Arial",
          this.strokeColor
        );
        return (t.text = e), t;
      }),
      (t.prototype.hideText = function() {
        this.textLabel && this.shape.removeChild(this.textLabel);
      }),
      (t.prototype.showTextBox = function() {
        this.$textBox.css("background", "transparent"),
          this.strokeColor === "#ffffff" &&
            this.$textBox.css("background", "#cccccc"),
          this.$textBox
            .val(this.text)
            .removeClass()
            .addClass(this.textboxStyle)
            .css("color", this.strokeColor)
            .css("font-size", this.fontSize)
            .css("line-height", this.fontSize + "px")
            .show();
      }),
      (t.prototype.hideTextBox = function() {
        this.$textBox.val("").hide();
      }),
      (t.prototype.setFontSize = function(e) {
        (this.fontSize = e), this.repaint();
      }),
      (t.prototype.getState = function() {
        var t = e.prototype.getState.call(this);
        return (t.text = this.text), (t.fontSize = this.fontSize), t;
      }),
      (t.prototype.setState = function(t) {
        (this.text = t.text),
          (this.fontSize = t.fontSize),
          e.prototype.setState.call(this, t);
      }),
      t
    );
  })(e.BoundedShape);
  e.TextBoundedShape = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(e, n) {
      t.call(this, e, n, new E.Shape());
    }
    return (
      __extends(n, t),
      (n.prototype.repaint = function() {
        this.shape.graphics
          .clear()
          .setStrokeStyle(this.strokeSize)
          .beginStroke(this.strokeColor)
          .drawEllipse(
            this.bound.x,
            this.bound.y,
            this.bound.width,
            this.bound.height
          ),
          t.prototype.repaint.call(this);
      }),
      (n.prototype.checkHit = function(t, n) {
        var r = this.getHandleAtPoint(t, n);
        if (r) return new e.HitResult(!0, r.cursor, r);
        (t -= this.bound.x + this.bound.width / 2),
          (n -= this.bound.y + this.bound.height / 2);
        var i =
          (t * t) /
            ((this.bound.width / 2 + this.strokeSize / 2) *
              (this.bound.width / 2 + this.strokeSize / 2)) +
            (n * n) /
              ((this.bound.height / 2 + this.strokeSize / 2) *
                (this.bound.height / 2 + this.strokeSize / 2)) <=
          1;
        return new e.HitResult(i, "move");
      }),
      n
    );
  })(e.BoundedShape);
  e.Ellipse = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n) {
      e.call(this, t, n, new E.Shape());
    }
    return (
      __extends(t, e),
      (t.prototype.repaint = function() {
        this.shape.graphics
          .clear()
          .setStrokeStyle(this.strokeSize)
          .beginStroke(this.strokeColor)
          .drawRect(
            this.bound.x,
            this.bound.y,
            this.bound.width,
            this.bound.height
          ),
          e.prototype.repaint.call(this);
      }),
      t
    );
  })(e.BoundedShape);
  e.Rectangle = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(e, n, r, i) {
      t.call(this, e, n, r, i, "shape-callout"),
        (this.calloutShape = new E.Shape()),
        this.shape.addChild(this.calloutShape),
        (this.isDefaultAnchor = !0);
    }
    return (
      __extends(n, t),
      (n.prototype.getCornerRadius = function() {
        return Math.min(this.bound.width, this.bound.height) * 0.1;
      }),
      (n.prototype.checkHit = function(t, n) {
        var r = this.getHandleAtPoint(t, n);
        if (r) return new e.HitResult(!0, r.cursor, r);
        var i = this.getCornerRadius(),
          s =
            this.bound.x + i / 2 <= t &&
            t <= this.bound.x + this.bound.width - i / 2 &&
            this.bound.y + i / 2 <= n &&
            n <= this.bound.y + this.bound.height - i / 2;
        return s
          ? ((this.notOnBorder = !0), new e.HitResult(s, "move"))
          : ((s =
              this.bound.x - this.strokeSize / 2 <= t &&
              t <= this.bound.x + this.bound.width + this.strokeSize / 2 &&
              this.bound.y - this.strokeSize / 2 <= n &&
              n <= this.bound.y + this.bound.height + this.strokeSize / 2),
            s && (this.notOnBorder = !1),
            new e.HitResult(s, "move"));
      }),
      (n.prototype.setAnchorPoint = function(e, t) {
        (this.anchorX = e), (this.anchorY = t);
      }),
      (n.prototype.getAnchorArea = function() {
        var e = this.bound.x + this.bound.width / 2,
          t = this.bound.y + this.bound.height / 2,
          n = this.bound.height / this.bound.width,
          r = Math.abs(this.anchorY - t) / Math.abs(this.anchorX - e);
        if (this.anchorX < e && this.anchorY < t) return r < n ? 1 : 2;
        if (this.anchorX > e && this.anchorY < t) return r > n ? 3 : 4;
        if (this.anchorX > e && this.anchorY > t) return r < n ? 5 : 6;
        if (this.anchorX < e && this.anchorY > t) return r > n ? 7 : 8;
      }),
      (n.prototype.drawAnchorLeft = function(e) {
        var t = this.bound.x,
          n = this.bound.y,
          r = this.bound.width,
          i = this.bound.height,
          s = this.getCornerRadius(),
          o = (r / 2 - s) / 3,
          u = (i / 2 - s) / 3,
          a = t,
          f = 0,
          l = t,
          c = 0;
        e === 1
          ? ((c = n + s + u), (f = n + s + 2 * u))
          : ((c = n + i / 2 + u), (f = n + i / 2 + 2 * u)),
          this.calloutShape.graphics
            .moveTo(t + s, n)
            .lineTo(t + r - s, n)
            .arc(t + r - s, n + s, s, Math.PI * -0.5, 0, !1)
            .lineTo(t + r, n + i - s)
            .arc(t + r - s, n + i - s, s, 0, Math.PI * 0.5, !1)
            .arc(t + s, n + i - s, s, Math.PI * 0.5, Math.PI, !1)
            .lineTo(a, f)
            .lineTo(this.anchorX, this.anchorY)
            .lineTo(l, c)
            .lineTo(t, n + s)
            .arc(t + s, n + s, s, Math.PI, Math.PI * 1.5, !1);
      }),
      (n.prototype.drawAnchorTop = function(e) {
        var t = this.bound.x,
          n = this.bound.y,
          r = this.bound.width,
          i = this.bound.height,
          s = this.getCornerRadius(),
          o = (r / 2 - s) / 3,
          u = (i / 2 - s) / 3,
          a = 0,
          f = n,
          l = 0,
          c = n;
        e === 2
          ? ((a = t + s + o), (l = t + s + 2 * o))
          : ((a = t + r / 2 + o), (l = t + r / 2 + 2 * o)),
          this.calloutShape.graphics
            .moveTo(t + s, n)
            .lineTo(a, f)
            .lineTo(this.anchorX, this.anchorY)
            .lineTo(l, c)
            .lineTo(t + r - s, n)
            .arc(t + r - s, n + s, s, Math.PI * -0.5, 0, !1)
            .lineTo(t + r, n + i - s)
            .arc(t + r - s, n + i - s, s, 0, Math.PI * 0.5, !1)
            .arc(t + s, n + i - s, s, Math.PI * 0.5, Math.PI, !1)
            .lineTo(t, n + s)
            .arc(t + s, n + s, s, Math.PI, Math.PI * 1.5, !1);
      }),
      (n.prototype.drawAnchorRight = function(e) {
        var t = this.bound.x,
          n = this.bound.y,
          r = this.bound.width,
          i = this.bound.height,
          s = this.getCornerRadius(),
          o = (r / 2 - s) / 3,
          u = (i / 2 - s) / 3,
          a = t + r,
          f = 0,
          l = t + r,
          c = 0;
        e === 4
          ? ((f = n + s + u), (c = n + s + 2 * u))
          : ((f = n + i / 2 + u), (c = n + i / 2 + 2 * u)),
          this.calloutShape.graphics
            .moveTo(t + s, n)
            .lineTo(t + r - s, n)
            .arc(t + r - s, n + s, s, Math.PI * -0.5, 0, !1)
            .lineTo(a, f)
            .lineTo(this.anchorX, this.anchorY)
            .lineTo(l, c)
            .lineTo(t + r, n + i - s)
            .arc(t + r - s, n + i - s, s, 0, Math.PI * 0.5, !1)
            .arc(t + s, n + i - s, s, Math.PI * 0.5, Math.PI, !1)
            .lineTo(t, n + s)
            .arc(t + s, n + s, s, Math.PI, Math.PI * 1.5, !1);
      }),
      (n.prototype.drawAnchorBottom = function(e) {
        var t = this.bound.x,
          n = this.bound.y,
          r = this.bound.width,
          i = this.bound.height,
          s = this.getCornerRadius(),
          o = (r / 2 - s) / 3,
          u = (i / 2 - s) / 3,
          a = 0,
          f = n + i,
          l = 0,
          c = n + i;
        e === 6
          ? ((a = t + r - s - o), (l = t + r - s - 2 * o))
          : ((a = t + r / 2 - o), (l = t + r / 2 - 2 * o)),
          this.calloutShape.graphics
            .moveTo(t + s, n)
            .lineTo(t + r - s, n)
            .arc(t + r - s, n + s, s, Math.PI * -0.5, 0, !1)
            .lineTo(t + r, n + i - s)
            .arc(t + r - s, n + i - s, s, 0, Math.PI * 0.5, !1)
            .lineTo(a, f)
            .lineTo(this.anchorX, this.anchorY)
            .lineTo(l, c)
            .lineTo(t + s, n + i)
            .arc(t + s, n + i - s, s, Math.PI * 0.5, Math.PI, !1)
            .lineTo(t, n + s)
            .arc(t + s, n + s, s, Math.PI, Math.PI * 1.5, !1);
      }),
      (n.prototype.refreshTextboxBound = function() {
        var e = this.getCornerRadius();
        this.setTextboxBound(
          this.bound.x + e / 2 - 1,
          this.bound.y + e / 2 - 1,
          this.bound.width - e,
          this.bound.height - e
        );
      }),
      (n.prototype.paintOutline = function() {
        t.prototype.paintOutline.call(this);
        var n = 9,
          r = this.outline["handle_" + n];
        if (!r) {
          var r = (this.outline["handle_" + n] = new E.Shape());
          (r.name = "handle_" + n),
            (r.cursor = "move"),
            this.outline.addChild(r);
        }
        (r.center = { x: this.anchorX, y: this.anchorY }),
          r.graphics
            .clear()
            .setStrokeStyle(1)
            .beginStroke(e.HANDLE_STROKE_COLOR)
            .beginFill(e.HANDLE_FILL_COLOR)
            .drawCircle(this.anchorX, this.anchorY, e.HANDLE_SIZE),
          this.refreshTextboxBound();
      }),
      (n.prototype.repaint = function() {
        this.isDefaultAnchor &&
          ((this.anchorX = this.bound.x),
          (this.anchorY = this.bound.y + this.bound.height * 1.5));
        var e = this.getAnchorArea();
        this.calloutShape.graphics
          .clear()
          .setStrokeStyle(this.strokeSize, "round", "round")
          .beginStroke(this.strokeColor)
          .beginFill("#fff"),
          e === 2 || e === 3
            ? this.drawAnchorTop(e)
            : e === 4 || e === 5
            ? this.drawAnchorRight(e)
            : e === 6 || e === 7
            ? this.drawAnchorBottom(e)
            : (e === 8 || e === 1) && this.drawAnchorLeft(e),
          this.hideText();
        if (this.text && !this.selected) {
          var n = this.getCornerRadius();
          this.showText(
            this.bound.x + n / 2,
            this.bound.y + n / 2,
            this.bound.width - n
          );
        }
        t.prototype.repaint.call(this);
      }),
      (n.prototype.select = function() {
        t.prototype.select.call(this);
        if (this.notOnBorder == 1 || this.isDefaultAnchor == 1)
          (this.isDefaultAnchor = !1), this.$textBox.focus();
      }),
      (n.prototype.getState = function() {
        var e = t.prototype.getState.call(this);
        return (e.anchorX = this.anchorX), (e.anchorY = this.anchorY), e;
      }),
      (n.prototype.setState = function(e) {
        (this.anchorX = e.anchorX),
          (this.anchorY = e.anchorY),
          t.prototype.setState.call(this, e);
      }),
      (n.prototype.moveBy = function(e, n, r, i, s) {
        return (
          (this.isDefaultAnchor = !1),
          !s || s.name !== "handle_9"
            ? t.prototype.moveBy.call(this, e, n, r, i, s)
            : (this.setAnchorPoint(this.anchorX + r, this.anchorY + i),
              this.repaint(),
              s)
        );
      }),
      (n.prototype.move = function(e, n) {
        this.setAnchorPoint(this.anchorX + e, this.anchorY + n),
          t.prototype.move.call(this, e, n);
      }),
      n
    );
  })(e.TextBoundedShape);
  e.Callout = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t) {
      e.call(this, null, 0, new E.Container()),
        (this.image = t),
        this.shape.addChild(t),
        (this.image.filters = [new E.BoxBlurFilter(6, 6, 1)]);
    }
    return (
      __extends(t, e),
      (t.prototype.createShadow = function() {
        return null;
      }),
      (t.prototype.repaint = function() {
        if (this.bound.width > 0 && this.bound.height > 0) {
          var t = this.bound.x,
            n = this.bound.y,
            r = this.bound.width,
            i = this.bound.height,
            s = this.getStage().canvas,
            o = s.width,
            u = s.height;
          t < 0 ? ((r += t), (t = 0)) : t + r > o && (r = o - t),
            n < 0 ? ((i += n), (n = 0)) : n + i > u && (i = u - n),
            (this.image.sourceRect = new E.Rectangle(t, n, r, i)),
            (this.image.x = t),
            (this.image.y = n),
            this.image.cache(0, 0, r, i),
            e.prototype.repaint.call(this);
        }
      }),
      t
    );
  })(e.BoundedShape);
  e.BlurImage = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n, r, i, s) {
      e.call(this, t, 0, n, s, "shape-text"), this.recomputeBound(r, i);
    }
    return (
      __extends(t, e),
      (t.prototype.recomputeBound = function(e, t) {
        typeof e == "undefined" && (e = this.bound.x),
          typeof t == "undefined" && (t = this.bound.y);
        var n = this.getMeasuredWidth() + this.fontSize + 60,
          r = this.getMeasuredHeight() + this.fontSize + 10;
        this.setBound(e, t, n, r);
      }),
      (t.prototype.onTextChanged = function(t) {
        e.prototype.onTextChanged.call(this, t), this.recomputeBound();
      }),
      (t.prototype.select = function() {
        e.prototype.select.call(this), this.$textBox.focus();
      }),
      (t.prototype.paintOutline = function() {}),
      (t.prototype.refreshTextboxBound = function() {
        this.setTextboxBound(
          this.bound.x + 5,
          this.bound.y + 5,
          this.bound.width,
          this.bound.height
        );
      }),
      (t.prototype.repaint = function() {
        this.refreshTextboxBound(),
          this.hideText(),
          this.text &&
            !this.selected &&
            this.showText(
              this.bound.x + 5,
              this.bound.y + 5,
              this.bound.width - 10
            ),
          e.prototype.repaint.call(this);
      }),
      (t.prototype.getMeasuredHeight = function() {
        if (!this.text) return 0;
        var e = this.createLabel(this.text);
        return e.getMeasuredHeight();
      }),
      (t.prototype.getMeasuredWidth = function() {
        if (!this.text) return 0;
        var e = this.text.split(/\r\n|\r|\n/),
          t = null;
        _.each(e, function(e) {
          t ? e.length > t.length && (t = e) : (t = e);
        });
        var n = this.createLabel(t);
        return n.getMeasuredWidth();
      }),
      (t.prototype.setFontSize = function(t) {
        e.prototype.setFontSize.call(this, t), this.recomputeBound();
      }),
      t
    );
  })(e.TextBoundedShape);
  e.ShapeText = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t() {
      e.call(this, "#fff", 0, new E.Shape());
    }
    return (
      __extends(t, e),
      (t.prototype.createShadow = function() {
        return new E.Shadow("#FF1414", 0, 0, 10);
      }),
      (t.prototype.repaint = function() {
        this.shape.graphics
          .clear()
          .setStrokeStyle(1)
          .beginStroke("#000000")
          .drawRect(
            this.bound.x,
            this.bound.y,
            this.bound.width,
            this.bound.height
          ),
          e.prototype.repaint.call(this);
      }),
      t
    );
  })(e.BoundedShape);
  e.Crop = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n, r, i, s) {
      typeof s == "undefined" && (s = !0),
        e.call(this),
        (this.editor = t),
        (this.name = n),
        (this.$el = r),
        (this.cursor = i),
        (this.activatable = s);
    }
    return (
      __extends(t, e),
      (t.prototype.activate = function() {
        return !0;
      }),
      (t.prototype.onToolChanging = function(e) {}),
      (t.prototype.onToolChanged = function(e) {}),
      (t.prototype.onScreenChanging = function(e) {}),
      (t.prototype.onScreenChanged = function(e) {}),
      (t.prototype.onStrokeColorChanged = function(e) {
        this.strokeColor = e;
      }),
      (t.prototype.onStrokeSizeChanged = function(e) {
        this.strokeSize = e;
      }),
      (t.prototype.onFontSizeChanged = function(e) {
        this.fontSize = e;
      }),
      (t.prototype.onMouseDown = function(e) {
        (this.startX = e.stageX),
          (this.startY = e.stageY),
          (this.isMouseDown = !0);
      }),
      (t.prototype.onMouseMove = function(e) {}),
      (t.prototype.onMouseUp = function(e) {
        (this.isMouseDown = !1), (this.startX = this.startY = null);
      }),
      (t.prototype.onKeyUp = function(e) {}),
      (t.prototype.onKeyDown = function(e) {}),
      (t.prototype.onCreated = function(e) {
        this.completedShape = e;
        var t = (function(e, t) {
            return function() {
              t.removeChild(e), t.update();
            };
          })(e, e.getStage()),
          n = (function(e, t) {
            return function() {
              t.addChild(e), t.update();
            };
          })(e, e.getStage());
        this.editor.undo(t, n);
      }),
      (t.prototype.onRemoved = function(e) {
        var t = (function(e, t) {
            return function() {
              t.addChild(e), t.update();
            };
          })(e, e.getStage()),
          n = (function(e, t) {
            return function() {
              t.removeChild(e), t.update();
            };
          })(e, e.getStage());
        this.editor.undo(t, n);
      }),
      (t.prototype.onChanged = function(e, t) {
        var n = (function(e, t) {
            return function() {
              return e.setState(t);
            };
          })(e, t),
          r = (function(e, t) {
            return function() {
              return e.setState(t);
            };
          })(e, e.getState());
        this.editor.undo(n, r);
      }),
      t
    );
  })(Eventify);
  e.Tool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function e(e, t, n) {
      (this.shape = e), (this.cursor = t), (this.handle = n);
    }
    return e;
  })();
  e.Hit = t;
  var n = (function(n) {
    function r() {
      n.apply(this, arguments);
    }
    return (
      __extends(r, n),
      (r.prototype.checkHit = function(n, r, i) {
        for (var s = n.children.length - 1; s >= 0; s--) {
          var o = n.children[s];
          if (!(o instanceof e.Shape)) continue;
          var u = o.checkHit(r, i);
          if (u.status) return new t(o, u.cursor, u.handle);
        }
        return null;
      }),
      (r.prototype.deselect = function(t) {
        typeof t == "undefined" && (t = !1);
        if (!this.selected) return;
        this.hasTyped && this.selected instanceof e.TextBoundedShape
          ? (this.selected.deselect(),
            this.onChanged(this.selected, this.state))
          : this.selected.deselect(),
          t === !0 &&
            (this.onRemoved(this.selected),
            this.editor.removeChild(this.selected),
            this.editor.repaint()),
          (this.selected = this.hasTyped = null);
      }),
      (r.prototype.select = function(e) {
        if (this.selected === e) return;
        this.deselect(),
          (this.selected = e),
          this.editor.removeChild(this.selected),
          this.editor.addChild(this.selected),
          this.selected.select();
      }),
      (r.prototype.onToolChanging = function(e) {
        this.deselect();
      }),
      (r.prototype.onScreenChanging = function(e) {
        this.deselect();
      }),
      (r.prototype.onStrokeColorChanged = function(e) {
        if (this.selected && this.selected.strokeColor != e) {
          var t = this.selected.getState();
          this.selected.setStrokeColor(e), this.onChanged(this.selected, t);
        }
      }),
      (r.prototype.onStrokeSizeChanged = function(e) {
        if (this.selected && this.selected.strokeSize != e) {
          var t = this.selected.getState();
          this.selected.setStrokeSize(e), this.onChanged(this.selected, t);
        }
      }),
      (r.prototype.onFontSizeChanged = function(t) {
        if (!(this.selected instanceof e.TextBoundedShape)) return;
        var n = this.selected;
        if (n.fontSize != t) {
          var r = n.getState();
          n.setFontSize(t), this.onChanged(n, r);
        }
      }),
      (r.prototype.onMouseDown = function(e) {
        $("#main").focus(),
          (this.isMouseDown = !0),
          (this.lastX = e.stageX),
          (this.lastY = e.stageY);
        var t = this.checkHit(
          this.editor.currentScreen.stage,
          this.lastX,
          this.lastY
        );
        t
          ? (this.select(t.shape),
            (this.state = this.selected.getState()),
            (this.selectedHandle = t.handle),
            this.editor.cursor(t.cursor))
          : this.deselect();
      }),
      (r.prototype.onMouseMove = function(e) {
        if (this.isMouseDown)
          this.selected &&
            ((this.selectedHandle = this.selected.moveBy(
              this.lastX,
              this.lastY,
              e.stageX - this.lastX,
              e.stageY - this.lastY,
              this.selectedHandle
            )),
            (this.lastX = e.stageX),
            (this.lastY = e.stageY),
            (this.hasMoved = !0));
        else {
          var t = this.checkHit(
            this.editor.currentScreen.stage,
            e.stageX,
            e.stageY
          );
          this.editor.cursor(t ? t.cursor : "default");
        }
      }),
      (r.prototype.onMouseUp = function(e) {
        this.hasMoved && this.onChanged(this.selected, this.state),
          (this.selectedHandle = this.state = this.isMouseDown = this.hasMoved = null),
          this.editor.cursor("default");
      }),
      (r.prototype.onKeyUp = function(e) {
        this.selected && e.keyCode === 46 && this.deselect(!0),
          this.selected && e.keyCode !== 46 && (this.hasTyped = !0);
      }),
      r
    );
  })(e.Tool);
  e.SelectTool = n;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.rect ||
          ((this.rect = new e.Rectangle(this.strokeColor, this.strokeSize)),
          this.editor.addChild(this.rect)),
          this.rect.setBound(
            Math.min(this.startX, t.stageX),
            Math.min(this.startY, t.stageY),
            Math.abs(this.startX - t.stageX),
            Math.abs(this.startY - t.stageY)
          );
      }),
      (n.prototype.onMouseUp = function(e) {
        this.rect && this.onCreated(this.rect),
          (this.rect = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.RectangleTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.ellipse ||
          ((this.ellipse = new e.Ellipse(this.strokeColor, this.strokeSize)),
          this.editor.addChild(this.ellipse)),
          this.ellipse.setBound(
            Math.min(this.startX, t.stageX),
            Math.min(this.startY, t.stageY),
            Math.abs(this.startX - t.stageX),
            Math.abs(this.startY - t.stageY)
          );
      }),
      (n.prototype.onMouseUp = function(e) {
        this.ellipse && this.onCreated(this.ellipse),
          (this.ellipse = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.EllipseTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.arrow ||
          ((this.arrow = new e.Arrow(this.strokeColor, this.strokeSize)),
          this.editor.addChild(this.arrow),
          this.arrow.start(this.startX, this.startY)),
          this.arrow.end(t.stageX, t.stageY);
      }),
      (n.prototype.onMouseUp = function(e) {
        this.arrow && this.onCreated(this.arrow),
          (this.arrow = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.ArrowTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseDown = function(t) {
        (this.text = new e.ShapeText(
          this.strokeColor,
          this.fontSize,
          t.stageX,
          t.stageY,
          this.editor.$textBox
        )),
          this.editor.addChild(this.text);
      }),
      (n.prototype.onMouseUp = function(e) {
        this.text && this.onCreated(this.text), (this.text = null);
      }),
      n
    );
  })(e.Tool);
  e.TextTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.callout ||
          ((this.callout = new e.Callout(
            this.strokeColor,
            this.strokeSize,
            this.fontSize,
            this.editor.$textBox
          )),
          this.editor.addChild(this.callout)),
          this.callout.setBound(
            Math.min(this.startX, t.stageX),
            Math.min(this.startY, t.stageY),
            Math.abs(this.startX - t.stageX),
            Math.abs(this.startY - t.stageY)
          );
      }),
      (n.prototype.onMouseUp = function(e) {
        this.callout && this.onCreated(this.callout),
          (this.callout = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.CalloutTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.pencil ||
          ((this.pencil = new e.Pencil(this.strokeColor, this.strokeSize)),
          this.editor.addChild(this.pencil)),
          this.pencil.lineTo(t.stageX, t.stageY);
      }),
      (n.prototype.onMouseUp = function(e) {
        this.pencil &&
          (this.pencil.end(),
          this.onCreated(this.pencil),
          (this.completedShape = null)),
          (this.pencil = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.PencilTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments);
    }
    return (
      __extends(n, t),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown) return;
        this.blurImage ||
          ((this.blurImage = new e.BlurImage(
            new E.Bitmap(this.editor.currentScreen.background)
          )),
          this.editor.addChild(this.blurImage)),
          this.blurImage.setBound(
            Math.min(this.startX, t.stageX),
            Math.min(this.startY, t.stageY),
            Math.abs(this.startX - t.stageX),
            Math.abs(this.startY - t.stageY)
          );
      }),
      (n.prototype.onMouseUp = function(e) {
        this.blurImage && this.onCreated(this.blurImage),
          (this.blurImage = null),
          t.prototype.onMouseUp.call(this, e);
      }),
      n
    );
  })(e.Tool);
  e.BlurTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n() {
      t.apply(this, arguments),
        (this.isScrolling = !1),
        (this.isDrawing = !1),
        (this.selected = !1);
    }
    return (
      __extends(n, t),
      (n.prototype.checkHit = function(t, n, r) {
        if (!this.crop) return null;
        var i = this.crop,
          s = i.checkHit(n, r);
        if (s.status) return new e.Hit(i, s.cursor, s.handle);
      }),
      (n.prototype.onMouseDown = function(e) {
        if (this.crop) {
          (this.lastX = e.stageX), (this.lastY = e.stageY);
          var n = this.checkHit(
            this.editor.currentScreen.stage,
            this.lastX,
            this.lastY
          );
          (this.hitResult = n),
            n &&
              ((this.selectedHandle = n.handle), this.editor.cursor(n.cursor));
        } else this.startSourceRect = null;
        t.prototype.onMouseDown.call(this, e);
      }),
      (n.prototype.onMouseMove = function(t) {
        if (!this.isMouseDown)
          if (this.crop && !this.isDrawing) {
            var n = this.checkHit(
              this.editor.currentScreen.stage,
              t.stageX,
              t.stageY
            );
            this.editor.cursor(n ? n.cursor : "default");
          } else this.editor.cursor("crosshair");
        else {
          this.crop ||
            ((this.isDrawing = !0),
            (this.crop = new e.Crop()),
            this.editor.addChild(this.crop),
            (this.editor.currentScreen.selectCrop = !0));
          if (this.isDrawing) this.doCrop(t);
          else if (this.hitResult) {
            this.selectedHandle = this.crop.moveBy(
              this.lastX,
              this.lastY,
              t.stageX - this.lastX,
              t.stageY - this.lastY,
              this.selectedHandle
            );
            var r = this.crop.bound;
            if (!this.hasMoved) {
              var i = this.editor.currentScreen.cropRectangle;
              i && i.x >= 0 && i.y >= 0 && i.width >= 0 && i.height >= 0
                ? (this.startSourceRect = new E.Rectangle(
                    i.x,
                    i.y,
                    i.width,
                    i.height
                  ))
                : (this.startSourceRect = null),
                (this.hasMoved = !0);
            }
            (this.editor.currentScreen.cropRectangle = new E.Rectangle(
              r.x,
              r.y,
              r.width,
              r.height
            )),
              this.editor.repaint(),
              (this.lastX = t.stageX),
              (this.lastY = t.stageY);
          }
        }
      }),
      (n.prototype.onMouseUp = function(e) {
        this.crop && this.isDrawing && (this.doCrop(e, !0), this.crop.select());
        if (this.hasMoved === !0) {
          var n = this.startSourceRect;
          this.AddUndoRedo(
            n === null ? null : new E.Rectangle(n.x, n.y, n.width, n.height),
            this.editor.currentScreen.cropRectangle
          );
        }
        (this.hasMoved = !1),
          (this.isDrawing = !1),
          t.prototype.onMouseUp.call(this, e);
      }),
      (n.prototype.onToolChanged = function(e) {
        e !== this
          ? ((this.selected = !1), this.removeCrop())
          : ((this.selected = !0), this.addCrop());
      }),
      (n.prototype.onScreenChanging = function(e) {
        this.removeCrop();
      }),
      (n.prototype.onScreenChanged = function(e) {
        this.selected && e.cropRectangle && this.addCrop();
      }),
      (n.prototype.onKeyUp = function(e) {
        if (
          this.selected &&
          e.keyCode === 46 &&
          this.editor.currentScreen.cropRectangle
        ) {
          var t = this.editor.currentScreen.cropRectangle;
          this.removeCrop(),
            this.AddUndoRedo(
              t === null ? null : new E.Rectangle(t.x, t.y, t.width, t.height),
              null
            ),
            (this.editor.currentScreen.cropRectangle = null),
            this.editor.repaint();
        }
      }),
      (n.prototype.removeCrop = function() {
        this.crop &&
          (this.crop.deselect(),
          this.editor.removeChild(this.crop),
          (this.editor.currentScreen.selectCrop = !1),
          this.editor.repaint(),
          (this.crop = this.startSourceRect = null),
          (this.isDrawing = !1));
      }),
      (n.prototype.addCrop = function() {
        this.removeCrop();
        if (this.selected && this.editor.currentScreen.cropRectangle) {
          this.editor.currentScreen.selectCrop = !0;
          var t = this.editor.currentScreen.cropRectangle;
          (this.crop = new e.Crop()),
            this.crop.setBound(t.x, t.y, t.width, t.height),
            this.editor.addChild(this.crop),
            this.crop.select();
        }
      }),
      (n.prototype.doCrop = function(e, t) {
        typeof t == "undefined" && (t = !1);
        var n = Math.min(this.startX, e.stageX),
          r = Math.min(this.startY, e.stageY),
          i = Math.abs(this.startX - e.stageX),
          s = Math.abs(this.startY - e.stageY),
          o = this.editor.currentScreen,
          u = new E.Rectangle(n, r, i, s),
          a = this;
        if (i <= 0 || s <= 0) return;
        this.crop.setBound(n, r, i, s),
          (o.cropRectangle = u),
          this.editor.repaint();
        var f = $("#main"),
          l = f.scrollLeft(),
          c = l + f.width(),
          h = f.scrollTop(),
          p = h + f.height();
        if (!this.isScrolling) {
          var d = { scrollLeft: f.scrollLeft(), scrollTop: f.scrollTop() },
            v = !1;
          e.stageX > c && ((d.scrollLeft = f.scrollLeft() + 100), (v = !0)),
            e.stageX < l && ((d.scrollLeft = f.scrollLeft() - 100), (v = !0)),
            e.stageY > p && ((d.scrollTop = f.scrollTop() + 100), (v = !0)),
            e.stageY < h && ((d.scrollTop = f.scrollTop() - 100), (v = !0)),
            v &&
              ((this.isScrolling = !0),
              f.animate(d, 600, function() {
                a.isScrolling = !1;
              }));
        }
        if (t === !0) {
          var m = this.startSourceRect;
          this.AddUndoRedo(
            m === null ? null : new E.Rectangle(m.x, m.y, m.width, m.height),
            u
          );
        }
      }),
      (n.prototype.AddUndoRedo = function(e, t) {
        var n = this,
          r = (function(e, t) {
            return function() {
              n.crop && n.crop.deselect(),
                t == null
                  ? ((e.cropRectangle = null), n.removeCrop())
                  : ((e.cropRectangle = t), n.addCrop()),
                (n.isDrawing = !1),
                n.editor.repaint();
            };
          })(this.editor.currentScreen, e),
          i = (function(e, t) {
            return function() {
              n.crop && n.crop.deselect(),
                t == null
                  ? ((e.cropRectangle = null), n.removeCrop())
                  : ((e.cropRectangle = t),
                    n.selected === !0 && t && n.addCrop()),
                (n.isDrawing = !1),
                n.editor.repaint();
            };
          })(this.editor.currentScreen, t);
        this.editor.undo(r, i);
      }),
      n
    );
  })(e.Tool);
  e.CropTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n, r, i) {
      e.call(this, t, n, r, i),
        (this.editor = t),
        (this.name = n),
        (this.$el = r),
        (this.cursor = i),
        (this.enabled = !1),
        r.addClass("disabled"),
        t.on(
          t.UNDO_REDO_EVENT,
          function(e, t, n) {
            t
              ? (this.$el.removeClass("disabled"),
                this.$el.find($("i")).addClass("icon-white"))
              : (this.$el.addClass("disabled"),
                this.$el.find($("i")).removeClass("icon-white")),
              (this.enabled = t);
          },
          this
        );
    }
    return (
      __extends(t, e),
      (t.prototype.activate = function() {
        return this.enabled && this.editor.undo(), !1;
      }),
      t
    );
  })(e.Tool);
  e.UndoTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(e) {
    function t(t, n, r, i) {
      e.call(this, t, n, r, i),
        (this.editor = t),
        (this.name = n),
        (this.$el = r),
        (this.cursor = i),
        (this.enabled = !1),
        r.addClass("disabled"),
        t.on(
          t.UNDO_REDO_EVENT,
          function(e, t, n) {
            n
              ? (this.$el.removeClass("disabled"),
                this.$el.find($("i")).addClass("icon-white"))
              : (this.$el.addClass("disabled"),
                this.$el.find($("i")).removeClass("icon-white")),
              (this.enabled = n);
          },
          this
        );
    }
    return (
      __extends(t, e),
      (t.prototype.activate = function() {
        return this.enabled && this.editor.redo(), !1;
      }),
      t
    );
  })(e.Tool);
  e.RedoTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(n, r, i, s) {
      var o = this;
      t.call(this, n, r, i, s, !1),
        (this.editor = n),
        (this.name = r),
        (this.$el = i),
        (this.cursor = s),
        (this.$colorOptions = null),
        (this.$color = null),
        (this.show = !1),
        this.$el.addClass("color-picker"),
        (this.$color = this.$el.find(".color")),
        this.$color.css("background", e.Storage.strokeColor()),
        this.initColorOptions(),
        this.$el.bind("mousedown", function() {
          i.tooltip("hide"), o.show ? o.hidePicker() : o.showPicker();
        });
    }
    return (
      __extends(n, t),
      (n.prototype.initColorOptions = function() {
        var e = [
          "#00688B",
          "#1C86EE",
          "#75A1D0",
          "#0FDDAF",
          "#00C957",
          "#99CC32",
          "#ff0000",
          "#FF3E96",
          "#E47833",
          "#EEC900",
          "#f3ec00",
          "#B35AFF",
          "#000000",
          "#483000",
          "#987654",
          "#808080",
          "#DEDEDE",
          "#ffffff"
        ];
        (this.$colorOptions = $('<div class="color-options">')),
          $("body").append(this.$colorOptions);
        for (var t = 0; t < e.length; t++) {
          var n = $(
              '<div ref="' +
                e[t] +
                '" class="color-options-item" style="background:' +
                e[t] +
                ';">'
            ),
            r = this;
          n.bind("mousedown", function() {
            r.selectColor($(this).attr("ref"));
          }),
            this.$colorOptions.append(n);
        }
      }),
      (n.prototype.showPicker = function() {
        var e = this;
        if ($("#ColorTool").hasClass("disabled") === !0) return;
        this.$colorOptions.show(100, function() {
          (e.show = !0),
            e.$colorOptions.css("left", e.$el.offset().left),
            e.$colorOptions.css("top", e.$el.offset().top + 30),
            $("body").one("mousedown", function() {
              return e.hidePicker();
            });
        });
      }),
      (n.prototype.hidePicker = function() {
        var e = this;
        this.$colorOptions.hide(100, function() {
          return (e.show = !1);
        });
      }),
      (n.prototype.selectColor = function(t) {
        this.hidePicker(),
          this.$color.css("background", t),
          e.Storage.strokeColor(t),
          this.trigger("change", t);
      }),
      n
    );
  })(e.Tool);
  e.ColorTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(r, i, s, o) {
      var u = this;
      t.call(this, r, i, s, o, !1),
        (this.editor = r),
        (this.name = i),
        (this.$el = s),
        (this.cursor = o),
        (this.$sizeList = null),
        (this.show = !1),
        (this.$sizeList = s.next("ul")),
        this.setSize(e.Storage.strokeSize()),
        this.$el.bind("mousedown", function() {
          s.tooltip("hide"), u.show ? u.hidePicker() : u.showPicker();
        }),
        _.each(n.STROKE_SIZES, function(t) {
          var n = $(
            '<li><a href="#">&nbsp;<div class="toolsize-item size-' +
              t +
              '"></div></a></li>'
          );
          u.$sizeList.append(n),
            n.bind("mousedown", function() {
              e.Storage.strokeSize(t), u.setSize(t), u.trigger("change", t);
            });
        });
    }
    return (
      __extends(n, t),
      (n.STROKE_SIZES = [2, 4, 6, 8, 10, 12]),
      (n.prototype.showPicker = function() {
        var e = this;
        if ($("#SizeTool").hasClass("disabled") === !0) return;
        this.$sizeList.show(100, function() {
          (e.show = !0),
            $("body").one("mousedown", function() {
              return e.hidePicker();
            });
        });
      }),
      (n.prototype.hidePicker = function() {
        var e = this;
        this.$sizeList.hide(100, function() {
          return (e.show = !1);
        });
      }),
      (n.prototype.setSize = function(e) {
        this.$el
          .find($("i"))
          .css({
            height: e,
            width: 30,
            background: "white",
            "margin-top": (16 - e) / 2 + "px"
          });
      }),
      n
    );
  })(e.Tool);
  e.SizeTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(r, i, s, o) {
      var u = this;
      t.call(this, r, i, s, o, !1),
        (this.editor = r),
        (this.name = i),
        (this.$el = s),
        (this.cursor = o),
        (this.$sizeList = null),
        (this.show = !1),
        (this.$sizeList = s.next("ul")),
        this.setSize(e.Storage.fontSize()),
        this.$el.bind("mousedown", function() {
          s.tooltip("hide"), u.show ? u.hidePicker() : u.showPicker();
        }),
        _.each(n.FONT_SIZES, function(t) {
          var n = $('<li><a href="#">' + t.toString() + " px" + "</a></li>");
          u.$sizeList.append(n),
            n.bind("mousedown", function() {
              e.Storage.fontSize(t), u.setSize(t), u.trigger("change", t);
            });
        });
    }
    return (
      __extends(n, t),
      (n.FONT_SIZES = [10, 12, 14, 18, 24, 32, 46, 72]),
      (n.prototype.showPicker = function() {
        var e = this;
        if ($("#FontSizeTool").hasClass("disabled") === !0) return;
        this.$sizeList.show(100, function() {
          (e.show = !0),
            $("body").one("mousedown", function() {
              return e.hidePicker();
            });
        });
      }),
      (n.prototype.hidePicker = function() {
        var e = this;
        this.$sizeList.hide(100, function() {
          return (e.show = !1);
        });
      }),
      (n.prototype.setSize = function(e) {
        this.$el.find($("i")).text(e.toString() + " px");
      }),
      n
    );
  })(e.Tool);
  e.FontSizeTool = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = "SelectTool",
    n = "RectangleTool",
    r = "EllipseTool",
    i = "ArrowTool",
    s = "TextTool",
    o = "CalloutTool",
    u = "PencilTool",
    a = "CropTool",
    f = "BlurTool",
    l = "UndoTool",
    c = "RedoTool",
    h = "ColorTool",
    p = "SizeTool",
    d = "FontSizeTool",
    v = [
      {
        id: t,
        tooltip: "Select",
        iconClass: "icon-select",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "default"
      },
      {
        id: n,
        tooltip: "Rectangle",
        iconClass: "icon-rectangle",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: r,
        tooltip: "Ellipse",
        iconClass: "icon-elipse",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: i,
        tooltip: "Arrow",
        iconClass: "icon-arrow",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: s,
        tooltip: "Text",
        iconClass: "icon-text",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: o,
        tooltip: "Callout",
        iconClass: "icon-comment icon-white",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: u,
        tooltip: "Pencil",
        iconClass: "icon-pencil icon-white",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: f,
        tooltip: "Blur",
        iconClass: "icon-tint icon-white",
        group: 1,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: a,
        tooltip: "Crop",
        iconClass: "icon-crop",
        group: 2,
        templateSelector: "#tool-template",
        cursor: "crosshair"
      },
      {
        id: h,
        tooltip: "Color",
        iconClass: "",
        group: 3,
        templateSelector: "#color-picker-template",
        cursor: "default"
      },
      {
        id: p,
        tooltip: "Border size",
        iconClass: "",
        group: 3,
        templateSelector: "#size-picker-template",
        cursor: "default"
      },
      {
        id: d,
        tooltip: "Font size",
        iconClass: "",
        group: 3,
        templateSelector: "#font-size-picker-template",
        cursor: "default"
      },
      {
        id: l,
        tooltip: "Undo",
        iconClass: "icon-undo",
        group: 4,
        templateSelector: "#tool-template",
        cursor: "default"
      },
      {
        id: c,
        tooltip: "Redo",
        iconClass: "icon-redo",
        group: 4,
        templateSelector: "#tool-template",
        cursor: "default"
      }
    ],
    m = (function() {
      function r(e, t) {
        this.editor = e;
        var n = this;
        (this.allTools = {}),
          (this.isDisabled = !1),
          this.createToolbar(function() {
            n.loadTools(), t(n);
          });
      }
      return (
        (r.prototype.createToolbar = function(t) {
          var n = $("#tools"),
            r = 0,
            i = null,
            s = function(o) {
              var u = v[o];
              e.Templates.load({
                fileName: "qsnap.tmpl",
                selector: u.templateSelector,
                context: u,
                callback: function(e) {
                  r !== u.group &&
                    ((i = $('<div class="btn-group">')),
                    n.append(i),
                    (r = u.group)),
                    i.append(e),
                    o + 1 === v.length ? t() : s(o + 1);
                }
              });
            };
          s(0);
        }),
        (r.prototype.loadTools = function() {
          var t = this,
            r = this;
          v.forEach(function(n) {
            var r = new e[n.id](t.editor, n.id, $("#" + n.id), n.cursor);
            t.allTools[r.name] = r;
          }),
            _.each(this.allTools, function(e) {
              e.on("change", function(n) {
                var r = [];
                for (var i = 0; i < arguments.length - 1; i++)
                  r[i] = arguments[i + 1];
                e.name === h
                  ? t.setStrokeColor(r[0])
                  : e.name === p
                  ? t.setStrokeSize(r[0])
                  : e.name === d && t.setFontSize(r[0]);
              });
            }),
            $("#tools .btn[id]").click(function() {
              if (r.isDisabled === !0) return;
              r.activate($(this).attr("id"));
            }),
            this.activate(n),
            this.setStrokeColor(e.Storage.strokeColor()),
            this.setStrokeSize(e.Storage.strokeSize()),
            this.setFontSize(e.Storage.fontSize());
        }),
        (r.prototype.disable = function() {
          $("#tools .btn[id]").addClass("disabled"), (this.isDisabled = !0);
        }),
        (r.prototype.enable = function() {
          $("#tools .btn[id]").removeClass("disabled"), (this.isDisabled = !1);
        }),
        (r.prototype.activate = function(e) {
          var t = this,
            n = this.allTools[e];
          return (this.selectedTool && this.selectedTool.name === e) ||
            !n.activatable
            ? this.selectedTool
            : (_.each(this.allTools, function(e) {
                return e.onToolChanging(n);
              }),
              n.activate() &&
                (this.selectedTool &&
                  this.selectedTool.$el.removeClass("active"),
                (this.selectedTool = n),
                this.selectedTool.$el.addClass("active"),
                _.each(this.allTools, function(e) {
                  return e.onToolChanged(t.selectedTool);
                })),
              this.editor.cursor("crosshair"),
              this.selectedTool);
        }),
        (r.prototype.onScreenChanging = function(e) {
          _.each(this.allTools, function(t) {
            return t.onScreenChanging(e);
          });
        }),
        (r.prototype.onScreenChanged = function(e) {
          _.each(this.allTools, function(t) {
            return t.onScreenChanged(e);
          });
        }),
        (r.prototype.setStrokeColor = function(e) {
          _.each(this.allTools, function(t) {
            return t.onStrokeColorChanged(e);
          });
        }),
        (r.prototype.setStrokeSize = function(e) {
          _.each(this.allTools, function(t) {
            return t.onStrokeSizeChanged(e);
          });
        }),
        (r.prototype.setFontSize = function(e) {
          _.each(this.allTools, function(t) {
            return t.onFontSizeChanged(e);
          });
        }),
        (r.prototype.onMouseDown = function(e) {
          if (this.isDisabled === !0 || e.nativeEvent.button === 2) return;
          this.selectedTool.onMouseDown(e), e.nativeEvent.preventDefault();
        }),
        (r.prototype.onMouseMove = function(e) {
          if (this.isDisabled === !0 || e.nativeEvent.button === 2) return;
          this.selectedTool.onMouseMove(e), e.nativeEvent.preventDefault();
        }),
        (r.prototype.onMouseUp = function(e) {
          if (this.isDisabled === !0 || e.nativeEvent.button === 2) return;
          this.selectedTool.onMouseUp(e);
          var n = this.selectedTool.completedShape;
          (this.selectedTool.completedShape = null),
            n && this.activate(t).select(n),
            e.nativeEvent.preventDefault();
        }),
        (r.prototype.onKeyDown = function(e) {
          if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA")
            return;
          if (e.keyCode == 32) {
            e.preventDefault && e.preventDefault(),
              e.preventDefault && e.stopPropagation();
            return;
          }
          if (this.isDisabled === !0) return;
          (e.metaKey && e.shiftKey && e.keyCode === 90) ||
          (e.ctrlKey && e.keyCode === 89)
            ? this.activate(c)
            : (e.metaKey && e.keyCode === 90) || (e.ctrlKey && e.keyCode === 90)
            ? this.activate(l)
            : this.selectedTool.onKeyDown(e);
        }),
        (r.prototype.onKeyUp = function(e) {
          if (e.target.nodeName == "INPUT" || e.target.nodeName == "TEXTAREA")
            return;
          if (e.keyCode == 32) {
            e.preventDefault && e.preventDefault(),
              e.preventDefault && e.stopPropagation();
            return;
          }
          if (this.isDisabled === !0) return;
          this.selectedTool.onKeyUp(e);
        }),
        r
      );
    })();
  e.Tools = m;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function t(e, n, r, i, s) {
      typeof i == "undefined" && (i = $("#main .background")),
        typeof s == "undefined" && (s = i[0]),
        (this.title = e),
        (this.url = n),
        (this.background = r),
        (this.$canvas = i),
        (this.canvas = s),
        (this.EXPORT_IMAGE_KEY = "export-image"),
        (this.undoStack = []),
        (this.redoStack = []),
        (this.exporting = !1),
        (this.width = 0),
        (this.height = 0),
        (this.id = t.nextScreenId++);
    }
    return (
      (t.nextScreenId = 1),
      (t.prototype.showLoader = function() {
        this.$canvas.hide(), e.Dialog.spin();
      }),
      (t.prototype.hideLoader = function() {
        e.Dialog.spin(!1), this.$canvas.fadeIn();
      }),
      (t.prototype.init = function(e, t) {
        var n = this,
          r = new Image();
        (r.onload = function() {
          var i = window.devicePixelRatio ? window.devicePixelRatio : 1;
          (n.canvas.width = r.width / i),
            (n.canvas.height = r.height / i),
            n.stage || n.setupStage(e, r),
            t();
        }),
          (r.src = this.background);
      }),
      (t.prototype.load = function(e, t) {
        var n = this;
        this.showLoader(),
          this.init(e, function() {
            n.hideLoader(), t();
          });
      }),
      (t.prototype.setupStage = function(e, t) {
        var n = this;
        (this.width = this.canvas.width), (this.height = this.canvas.height);
        var r = (this.stage = new E.Stage(this.canvas));
        (r.onMouseDown = _.bind(e.onMouseDown, e)),
          (r.onMouseMove = _.bind(e.onMouseMove, e)),
          (r.onMouseUp = _.bind(e.onMouseUp, e)),
          (r.mouseMoveOutside = !0);
        var i = new E.Bitmap(t);
        window.devicePixelRatio &&
          ((i.scaleX = 1 / window.devicePixelRatio),
          (i.scaleY = 1 / window.devicePixelRatio)),
          (this.backgroundBitmap = i),
          window.devicePixelRatio,
          r.addChild(i);
        var s = null,
          o = _.bind(r.update, r);
        r.update = function() {
          s && r.removeChild(s);
          if (n.cropRectangle && !n.exporting) {
            var e = n.cropRectangle;
            (s = new E.Container()),
              s.addChild(n.createBorderRect(0, 0, n.width, e.y)),
              s.addChild(n.createBorderRect(0, e.y, e.x, n.height - e.y)),
              s.addChild(
                n.createBorderRect(
                  e.x + e.width,
                  e.y,
                  n.width - (e.x + e.width),
                  n.height - e.y
                )
              ),
              s.addChild(
                n.createBorderRect(
                  e.x,
                  e.y + e.height,
                  e.width,
                  n.height - (e.y + e.height)
                )
              ),
              s.addChild(n.createResolutionRect(e)),
              r.addChild(s);
          }
          o();
        };
      }),
      (t.prototype.getFileName = function() {
        var e = this.getSettings();
        return (
          this.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + "." + e.format
        );
      }),
      (t.prototype.getSettings = function() {
        var t = e.Storage,
          n = t.pref(this.EXPORT_IMAGE_KEY);
        return n || (n = { format: "jpg", quality: 0.75 }), n;
      }),
      (t.prototype.export = function() {
        var e = this.getSettings(),
          t = e.format == "jpg" ? "image/jpeg" : "image/png";
        (this.stage.canvas.width = this.width),
          (this.stage.canvas.height = this.height),
          (this.exporting = !0),
          this.stage.update();
        var n = e.quality,
          r = this.cropRectangle,
          i = this.stage.canvas.toDataURL(t, n);
        if (r) {
          var s = $("<canvas>")[0];
          (s.width = r.width), (s.height = r.height);
          var o = s.getContext("2d");
          o.drawImage(
            this.stage.canvas,
            r.x,
            r.y,
            r.width,
            r.height,
            0,
            0,
            r.width,
            r.height
          ),
            (i = s.toDataURL(t, n));
        }
        return (
          (this.exporting = !1),
          this.stage.update(),
          {
            name: this.getFileName(),
            title: this.title,
            format: e.format,
            image: i
          }
        );
      }),
      (t.prototype.createResolutionRect = function(e) {
        var t = e.x,
          n = e.y - 25,
          r = new E.Container(),
          i = new E.Shape(),
          s = this.selectCrop,
          o = s ? 80 : 260,
          u = 20,
          a = Math.round(e.width).toString();
        a.indexOf(".") > 0 && (a = a.substring(0, a.indexOf(".")));
        var f = Math.round(e.height).toString();
        f.indexOf(".") > 0 && (f = f.substring(0, f.indexOf(".")));
        var l = s ? "" : " - Select crop tool to edit crop area.",
          c = new E.Text(a + " x " + f + l, "normal 11px Arial", "#fff");
        return (
          n < 0 && ((t = e.x + 5), (n = e.y + 5)),
          i.graphics
            .setStrokeStyle(1)
            .beginStroke(E.Graphics.getRGB(0, 0, 0, 0.8))
            .beginFill(E.Graphics.getRGB(0, 0, 0, 0.8))
            .drawRoundRect(t, n, o, u, 10),
          r.addChild(i),
          (c.x = t + o / 2 - c.getMeasuredWidth() / 2),
          (c.y = n + u / 2 - c.getMeasuredHeight() / 2),
          r.addChild(c),
          r
        );
      }),
      (t.prototype.createCenterRect = function(e, t, n, r) {
        var i = new E.Shape();
        return (
          (i.shadow = new E.Shadow("#000", 0, 0, 15)),
          i.graphics
            .setStrokeStyle(1)
            .beginStroke(E.Graphics.getRGB(30, 30, 30, 0.9))
            .drawRect(e, t, n, r),
          i
        );
      }),
      (t.prototype.createBorderRect = function(e, t, n, r) {
        var i = new E.Shape();
        return (
          i.graphics
            .beginFill(E.Graphics.getRGB(30, 30, 30, 0.5))
            .setStrokeStyle(0)
            .drawRect(e, t, n, r),
          i
        );
      }),
      t
    );
  })();
  e.Screen = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(e, n, r, i, s, o, u) {
      typeof n == "undefined" && (n = $("#main")),
        typeof r == "undefined" && (r = $("#thumbnails")),
        typeof i == "undefined" && (i = $("#btn-show-thumbnails")),
        typeof s == "undefined" && (s = $("#btn-capture-new")),
        typeof o == "undefined" && (o = $("#btn-prev-thumbnail")),
        typeof u == "undefined" && (u = $("#btn-next-thumbnail")),
        t.call(this),
        (this.editor = e),
        (this.$main = n),
        (this.$thumbnailPanel = r),
        (this.$btnThumbnail = i),
        (this.$btnCaptureNew = s),
        (this.$prevThumbnail = o),
        (this.$nextThumbnail = u),
        (this.screens = []),
        (this.isShown = !1),
        (this.isEdited = !1),
        (this.firstShow = !0),
        this.handleEvents();
    }
    return (
      __extends(n, t),
      (n.prototype.handleEvents = function() {
        var e = this;
        this.$btnCaptureNew.click(function() {
          return e.editor.trigger("capture-new");
        }),
          this.$btnThumbnail.click(function() {
            e.isShown
              ? (e.$btnThumbnail
                  .attr("title", "Show list")
                  .tooltip("fixTitle")
                  .tooltip("show"),
                e.hideThumbnails())
              : (e.$btnThumbnail
                  .attr("title", "Hide list")
                  .tooltip("fixTitle")
                  .tooltip("show"),
                e.showThumbnails());
          }),
          this.$thumbnailPanel
            .yajc({ addDuration: 0, removeDuration: 300 })
            .yajc("wings", "pad"),
          this.$thumbnailPanel.find("ul").dragsort({
            dragSelector: "li",
            dragEnd: function() {
              var t = e.$thumbnailPanel.find("ul").children();
              (e.screens = _.sortBy(e.screens, function(e) {
                return t.index(t.find("#thumbnail_" + e.id).parent());
              })),
                e.refreshCounter();
            },
            dragBetween: !1,
            placeHolderTemplate: '<li class="placeHolder"></li>'
          }),
          this.$prevThumbnail.click(function() {
            var t = e.getIndexOfThumbnail(e.selectedThumbnailId);
            if (t <= 0) return;
            $("#thumbnail_" + e.screens[t - 1].id).trigger("click");
          }),
          this.$nextThumbnail.click(function() {
            var t = e.getIndexOfThumbnail(e.selectedThumbnailId);
            if (t >= e.screens.length - 1) return;
            $("#thumbnail_" + e.screens[t + 1].id).trigger("click");
          });
      }),
      (n.prototype.showThumbnails = function() {
        if (this.isShown) return;
        this.$btnThumbnail.attr("title", "Hide list").tooltip("fixTitle"),
          this.$thumbnailPanel.stop(!0, !0).slideDown(400),
          this.$main.stop(!0, !0).animate({ bottom: 133 }, 400),
          (this.isShown = !0),
          (this.firstShow = !1);
      }),
      (n.prototype.hideThumbnails = function() {
        if (!this.isShown) return;
        this.$btnThumbnail.attr("title", "Show list").tooltip("fixTitle"),
          this.$thumbnailPanel.stop(!0, !0).slideUp(400),
          this.$main.stop(!0, !0).animate({ bottom: 38 }, 400),
          (this.isShown = !1);
      }),
      (n.prototype.switchToThumbnail = function(e) {
        if (this.selectedThumbnailId === e) return;
        $("#thumbnail_" + this.selectedThumbnailId)
          .parent()
          .removeClass("selected"),
          (this.selectedThumbnailId = e),
          $("#thumbnail_" + this.selectedThumbnailId)
            .parent()
            .addClass("selected"),
          this.trigger(
            "screenChanged",
            _.find(this.screens, function(t) {
              return t.id === e;
            })
          );
        var t = this.getIndexOfThumbnail(e);
        this.$thumbnailPanel.yajc("show", t), this.refreshCounter(t);
      }),
      (n.prototype.refreshCounter = function(e) {
        _.isUndefined(e) &&
          (e = this.getIndexOfThumbnail(this.selectedThumbnailId)),
          $("#thumbnail-index").text((e + 1).toString()),
          $("#thumbnail-counter").text(this.screens.length.toString()),
          e === 0
            ? this.$prevThumbnail.addClass("disabled")
            : this.$prevThumbnail.removeClass("disabled"),
          e === this.screens.length - 1
            ? this.$nextThumbnail.addClass("disabled")
            : this.$nextThumbnail.removeClass("disabled");
      }),
      (n.prototype.getIndexOfThumbnail = function(e) {
        for (var t = 0; t < this.screens.length; t++)
          if (this.screens[t].thumbnailImg.id === "thumbnail_" + e) return t;
        return -1;
      }),
      (n.prototype.appendTitle = function(e, t) {
        var n = this,
          r = $("<div>"),
          i = $('<span data-type="editable">' + e.title + "</span>"),
          s = $("<input>");
        r.append(i).append(s),
          r.editables({
            beforeEdit: function() {
              (n.isEdited = !0), s.val(e.title);
            },
            freezeOn: ["blur", "keyup"],
            beforeFreeze: function(e, t) {
              if (!t.keyCode) return !0;
              if (t.keyCode !== 13) return !1;
            },
            onFreeze: function() {
              (e.title = s.val()), i.text(e.title), (n.isEdited = !1);
            }
          }),
          t.append(r);
      }),
      (n.prototype.appendDelete = function(t, n) {
        var r = this,
          i = $(
            '<a data-original-title="Delete screen" data-placement="bottom" rel="tooltip" href="#"><i class="icon-remove"></i></a>'
          );
        n.append(i),
          i.tooltip(),
          i.click(function(n) {
            e.Dialog.confirm(
              "qSnap",
              "Are you sure you want to delete this screen? This action cannot be undone.",
              e.DIALOG_BUTTON_TYPE.DANGER,
              e.DIALOG_BUTTON_TYPE.NORMAL,
              function(n) {
                n === e.DIALOG_RESULT.YES && r.remove(t.id);
              }
            );
          });
      }),
      (n.prototype.add = function(e, t, n) {
        typeof t == "undefined" && (t = !0);
        var r = this,
          i = new Image();
        this.isShown || this.showThumbnails(),
          (i.onload = function() {
            var s = $(i),
              o;
            (e.thumbnailImg = i),
              r.screens.push(e),
              (o = $("<li></li>")),
              s.attr("id", "thumbnail_" + e.id),
              o.append(s),
              r.appendDelete(e, o),
              r.appendTitle(e, o),
              r.$thumbnailPanel.yajc("add", o, function() {
                r.firstShow && r.showThumbnails(),
                  o.click(function(t) {
                    t.preventDefault(), r.switchToThumbnail(e.id);
                  }),
                  t && o.trigger("click");
                var n = o.height(),
                  i = s.height(),
                  u = o.find("div").height();
                i > 0 && i < n - u && s.css("margin-top", (n - u - i) / 2);
              }),
              n && n({ error: !1 });
          }),
          (i.onerror = function() {
            n && n({ error: !0, fileName: e.title });
          }),
          (i.src = e.background);
      }),
      (n.prototype.remove = function(e) {
        var t = this,
          n = this.getIndexOfThumbnail(e);
        this.$thumbnailPanel.yajc("remove", n, function() {
          var r = _.find(t.screens, function(t) {
            return t.id === e;
          });
          (t.screens = _.reject(t.screens, function(e) {
            return e === r;
          })),
            JUndo.remove(r),
            e === t.selectedThumbnailId
              ? ((n = n == t.screens.length ? n - 1 : n),
                n >= 0
                  ? $("#thumbnail_" + t.screens[n].id).trigger("click")
                  : (t.refreshCounter(n), t.editor.clear()))
              : t.refreshCounter();
        });
      }),
      (n.prototype.count = function() {
        return this.screens.length;
      }),
      (n.prototype.getAll = function() {
        var e = [];
        return e.concat(this.screens);
      }),
      n
    );
  })(Eventify);
  e.ScreenList = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function e() {}
    return (
      (e.compile = function(t) {
        var n = $.trim($(t.selector).html());
        (n = t.context ? Handlebars.compile(n)(t.context) : n), t.callback(n);
      }),
      (e.load = function(n) {
        $(n.selector).length === 1
          ? e.compile(n)
          : $.ajax({
              url: "js/" + n.fileName,
              dataType: "html",
              success: function(t, r, i) {
                $(n.selector).length === 0 && $("body").append(t), e.compile(n);
              },
              error: function(e, t, r) {
                console.log(
                  "Cannot load template " +
                    n.fileName +
                    ". Status code: " +
                    e.status +
                    "; Error: " +
                    r
                );
              }
            });
      }),
      e
    );
  })();
  e.Templates = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  (e.DIALOG_TYPE = { INFO: "info", ERROR: "error", CONFIRM: "confirm" }),
    (e.DIALOG_RESULT = { YES: "yes", NO: "no", CALCEL: "cancel" }),
    (e.DIALOG_BUTTON_TYPE = {
      NORMAL: "btn",
      PRIMARY: "btn btn-primary",
      DANGER: "btn btn-danger",
      WARNING: "btn btn-warning",
      SUCCESS: "btn btn-success",
      INFO: "btn btn-info"
    });
  var t = "qSnap",
    n = {
      lines: 12,
      length: 6,
      width: 4,
      radius: 10,
      corners: 1,
      rotate: 0,
      color: "#fff",
      speed: 2,
      trail: 60,
      shadow: !0,
      hwaccel: !1,
      className: "spinner",
      zIndex: 2e9,
      top: "auto",
      left: "auto"
    },
    r = {
      centered: !0,
      overlaySpeed: 0,
      lightboxSpeed: 0,
      closeClick: !1,
      closeEsc: !1,
      destroyOnClose: !0,
      zIndex: 10001,
      overlayCSS: { opacity: 0 }
    },
    i = (function() {
      function i() {}
      return (
        (i.spinner = new require("spin")(n)),
        (i.$spinnerBox = $('<div class="spinner-box">')),
        (i.isSpinning = !1),
        (i.nextDialogId = 1),
        (i.suspendSpinning = !1),
        (i.spin = function(t) {
          typeof t == "undefined" && (t = !0);
          if (t === !0)
            return (
              i.isSpinning ||
                (i.$spinnerBox.lightbox_me(r),
                i.spinner.spin(i.$spinnerBox[0]),
                (i.isSpinning = !0)),
              {
                stop: function() {
                  return i.spin(!1);
                }
              }
            );
          i.isSpinning &&
            (i.$spinnerBox.trigger("close"),
            i.spinner.stop(),
            (i.isSpinning = !1));
        }),
        (i.info = function(n, r, s) {
          i.modal({
            type: e.DIALOG_TYPE.INFO,
            title: n,
            message: r,
            closeCallback: s
          });
        }),
        (i.error = function(n, r, s) {
          i.modal({
            type: e.DIALOG_TYPE.ERROR,
            title: n,
            message: r,
            closeCallback: s
          });
        }),
        (i.confirm = function(n, r, s, o, u) {
          typeof s == "undefined" && (s = e.DIALOG_BUTTON_TYPE.PRIMARY),
            typeof o == "undefined" && (o = e.DIALOG_BUTTON_TYPE.NORMAL),
            i.modal({
              type: e.DIALOG_TYPE.CONFIRM,
              title: n,
              message: r,
              yesBtnClass: s,
              noBtnClass: o,
              closeCallback: u
            });
        }),
        (i.modal = function(r) {
          var s = i.nextDialogId++ + "-dlg";
          e.Templates.load({
            fileName: "qsnap.tmpl",
            selector: "#dialog-template",
            context: {
              id: s,
              title: r.title || t,
              message: r.message,
              isError: r.type === e.DIALOG_TYPE.ERROR,
              isInfo: r.type === e.DIALOG_TYPE.INFO,
              isConfirm: r.type === e.DIALOG_TYPE.CONFIRM,
              yesBtnClass: r.yesBtnClass,
              noBtnClass: r.noBtnClass
            },
            callback: function(t) {
              $("body").append(t);
              var n = $("#" + s),
                i = e.DIALOG_RESULT.NO;
              r.type === e.DIALOG_TYPE.CONFIRM &&
                (n.find("#yes-btn").on("click", function() {
                  (i = e.DIALOG_RESULT.YES), n.modal("hide");
                }),
                n.find("#no-btn").on("click", function() {
                  (i = e.DIALOG_RESULT.NO), n.modal("hide");
                })),
                n
                  .on("hidden", function() {
                    _.isUndefined(r.closeCallback) ||
                      (r.type === e.DIALOG_TYPE.CONFIRM
                        ? r.closeCallback(i)
                        : r.closeCallback());
                  })
                  .modal({ show: !0, removeAfterHide: !0 });
            }
          });
        }),
        i
      );
    })();
  (e.Dialog = i), ($.fn.modal.defaults.attentionAnimation = null);
  var s = $.fn.modal.Constructor.prototype.teardown;
  $.fn.modal.Constructor.prototype.teardown = function() {
    s.call(this), this.options.removeAfterHide && this.$element.remove();
  };
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = function(e) {
      return _.isUndefined(e);
    },
    n = ["mt&ykNWUbNIeR&43"][0],
    r = (function() {
      function e() {}
      return (
        (e.DEFAULT_OPTIONS = {
          secure: !1,
          persistent: !0,
          defaultValue: null
        }),
        (e.preferences = {}),
        (e.pref = function(r, i, s) {
          if (t(i)) return e.load(r);
          e.store(r, i, s);
        }),
        (e.define = function(n, r) {
          (e.preferences[n] = r || {}),
            (e[n] = function(t) {
              return e.pref(n, t);
            });
        }),
        (e.store = function(r, i, s) {
          (e.preferences[r] = _.extend({}, e.preferences[r], s)),
            (s = _.extend({}, e.DEFAULT_OPTIONS, e.preferences[r])),
            (i = JSON.stringify(i)),
            (i = s.secure ? sjcl.encrypt(n, i) : i),
            s.persistent
              ? $.cookie(r, i, { expires: 365, path: "/" })
              : $.cookie(r, i, { path: "/" });
        }),
        (e.load = function(r) {
          var i = $.cookie(r),
            s = _.extend({}, e.DEFAULT_OPTIONS, e.preferences[r]);
          if (i === null) return s.defaultValue;
          try {
            if (!s.secure) {
              var u = JSON.parse(i);
              return u.salt && u.mode ? JSON.parse(sjcl.decrypt(n, i)) : u;
            }
            try {
              return JSON.parse(sjcl.decrypt(n, i));
            } catch (o) {
              return JSON.parse(i);
            }
          } catch (o) {
            return s.defaultValue;
          }
        }),
        e
      );
    })();
  e.Storage = r;
  var i = {
    strokeColor: { defaultValue: "#00688B" },
    strokeSize: { defaultValue: 8 },
    fontSize: { defaultValue: 20 },
    clientName: null,
    connectionUsername: null,
    authToken: { secure: !0, persistent: !1 }
  };
  _.each(i, function(e, t, n) {
    return r.define(t, e);
  });
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function t() {
      (this.KEYBOARD_SHORTCUT_KEY = "keyboard-shortcut"),
        (this.CAPTURE_FULL_PAGE_KEYBOARD_SHORTCUT_KEY =
          "capture-full-page-keyboard-shortcut"),
        (this.DIALOG_ID = "settings-dlg"),
        (this.EXPORT_IMAGE_KEY = "export-image");
    }
    return (
      (t.prototype.show = function(t) {
        var n = this,
          r = e.Storage;
        this.createDialog(function(e) {
          var i = e.find("#cancel-btn"),
            s = e.find("#x-btn"),
            o = e.find("#save-btn"),
            u = e.find("#chkAlt"),
            a = e.find("#chkShift"),
            f = e.find("#txtKey"),
            l = e.find("#image-format"),
            c = e.find("#image-quality"),
            h = $("#export-image-quality-settings"),
            p = window.supportFullPageCapture(),
            d,
            v,
            m,
            g;
          p
            ? ((d = e.find("#capture-full-page-chkAlt")),
              (v = e.find("#capture-full-page-chkShift")),
              (m = e.find("#capture-full-page-txtKey")),
              (g = r.pref(n.CAPTURE_FULL_PAGE_KEYBOARD_SHORTCUT_KEY)))
            : e.find("#capture-full-page-settings").hide();
          var y = r.pref(n.KEYBOARD_SHORTCUT_KEY);
          y ||
            ((y = { altKey: !0, shiftKey: !1, keyCode: "V".charCodeAt(0) }),
            r.pref(n.KEYBOARD_SHORTCUT_KEY, y)),
            p &&
              !g &&
              ((g = { altKey: !0, shiftKey: !1, keyCode: "F".charCodeAt(0) }),
              r.pref(n.CAPTURE_FULL_PAGE_KEYBOARD_SHORTCUT_KEY, g)),
            f.val(String.fromCharCode(y.keyCode)),
            u.prop("checked", y.altKey),
            a.prop("checked", y.shiftKey),
            p &&
              (d.prop("checked", g.altKey),
              v.prop("checked", g.shiftKey),
              m.val(String.fromCharCode(g.keyCode)));
          var b = function(e, t) {
            !t.shiftKey &&
            !t.ctrlKey &&
            !t.altKey &&
            (t.keyCode === 9 ||
              (t.keyCode >= 65 && t.keyCode <= 90) ||
              (t.keyCode >= 48 && t.keyCode <= 57) ||
              (t.keyCode >= 96 && t.keyCode <= 105))
              ? t.keyCode !== 9 &&
                (e.val(String.fromCharCode(t.keyCode).toUpperCase()),
                t.preventDefault())
              : t.keyCode !== 8 &&
                t.keyCode !== 46 &&
                t.keyCode !== 37 &&
                t.keyCode !== 39 &&
                t.preventDefault();
          };
          f
            .bind("keydown", function(e) {
              b(f, e);
            })
            .bind("blur focusout", function() {
              f.val() === "" && f.val(String.fromCharCode(y.keyCode));
            }),
            p &&
              m
                .bind("keydown", function(e) {
                  b(m, e);
                })
                .bind("blur focusout", function() {
                  m.val() === "" && m.val(String.fromCharCode(g.keyCode));
                });
          var w = r.pref(n.EXPORT_IMAGE_KEY);
          w ||
            ((w = { format: "jpg", quality: 0.75 }),
            r.pref(n.EXPORT_IMAGE_KEY, w)),
            w.format == "png" && h.hide(),
            l.val(w.format),
            c.val(w.quality),
            l.change(function() {
              l.val() == "png" ? h.hide() : h.show();
            }),
            o.on("click", function() {
              var i = f.val().charCodeAt(0),
                s = {
                  altKey: u.is(":checked"),
                  shiftKey: a.is(":checked"),
                  keyCode: i >= 97 && i <= 122 ? i - 32 : i
                },
                o,
                h;
              p &&
                ((o = m.val().charCodeAt(0)),
                (h = {
                  altKey: d.is(":checked"),
                  shiftKey: v.is(":checked"),
                  keyCode: o >= 97 && o <= 122 ? o - 32 : o
                }));
              if (
                p &&
                s.altKey === h.altKey &&
                s.shiftKey === h.shiftKey &&
                s.keyCode === h.keyCode
              ) {
                var g = $("#err-message");
                g.html(
                  "Error: duplicate key combination of Capture Visible Part and Capture Full Page"
                ),
                  g.show();
                return;
              }
              r.pref(n.KEYBOARD_SHORTCUT_KEY, s),
                p && r.pref(n.CAPTURE_FULL_PAGE_KEYBOARD_SHORTCUT_KEY, h);
              var y = { format: l.val(), quality: parseFloat(c.val()) };
              r.pref(n.EXPORT_IMAGE_KEY, y),
                e.modal("hide"),
                t &&
                  (p
                    ? t({
                        hotkeySettings: s,
                        captureFullPageHotkeySettings: h,
                        imageSettings: y
                      })
                    : t({ hotkeySettings: s, imageSettings: y }));
            }),
            e.modal({ show: !0, removeAfterHide: !0 });
        });
      }),
      (t.prototype.createDialog = function(t) {
        var n = this,
          r = $("body").find("#" + n.DIALOG_ID);
        if (r.length === 1) {
          t(r);
          return;
        }
        e.Templates.load({
          fileName: "qsnap.tmpl",
          selector: "#settings-dlg-template",
          context: {
            id: n.DIALOG_ID,
            CtrlOrCmd: navigator.platform.indexOf("Mac") !== -1 ? "Cmd" : "Ctrl"
          },
          callback: function(e) {
            $("body").append(e),
              (r = $("#settings-dlg")),
              r.on("shown", function() {
                $("input:text:visible:first", r).focus();
              }),
              t(r);
          }
        });
      }),
      t
    );
  })();
  e.SettingsDialog = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function t() {
      this.DIALOG_ID = "upload-dlg";
    }
    return (
      (t.prototype.upload = function(t, n, r) {
        this.createDialog(function(i) {
          var s = e.AppInfo.serverUrl,
            o = s + "/api/v1/snaps/upload",
            u = s + "/api/v1/albums/" + e.AppInfo.serverApiKey,
            a = i.find("#loader"),
            f = i.find("#upload-form"),
            l = i.find("#album-name"),
            c = i.find("#share"),
            h = i.find("#x-btn, #close-btn"),
            p = i.find("#sharing-status"),
            d,
            v = i.find("#cancelUpload"),
            m = i.find(".modal-body"),
            g = i.find("#copyToClipboard"),
            y = [],
            b = !1,
            w,
            E,
            S = null;
          t.length > 1 &&
            i.on("shown", function(e) {
              window.setTimeout(function() {
                l.focus();
              }, 500);
            }),
            i.modal({ show: !0, removeAfterHide: !0 });
          var x = function() {
              d.html("<em>Upload cancelled by user</em>"), N();
            },
            T = _.isFunction(window.copyToClipboard),
            N = function() {
              a.hide(),
                c.hide(),
                v.hide(),
                h.removeAttr("disabled"),
                S !== null &&
                  t.length > 1 &&
                  i
                    .find("#album-link")
                    .html(
                      'All snaps:&nbsp;<a href="' +
                        S.url +
                        '" target="_blank">' +
                        S.url +
                        "</a>"
                    ),
                m.scrollTop(m.height()),
                T && y.length > 0 && g.show(),
                r();
            },
            C = function(r) {
              typeof r == "undefined" && (r = 0);
              if (r === t.length) {
                N();
                return;
              }
              (E = t[r]),
                (d = $(
                  "<li>Uploading <em>" +
                    E.title +
                    '</em>... <img src="img/loader.gif"/></li>'
                )),
                p.append(d);
              if (b) {
                x();
                return;
              }
              var i = n(E);
              _.extend(i, { apiKey: e.AppInfo.serverApiKey });
              var s = o,
                u = l.val().trim();
              if (!u || u == "") u = t[0].title;
              _.extend(i, { albumName: u }),
                (w = $.ajax({
                  type: "POST",
                  url: s,
                  data: i,
                  success: function(e, t, n) {
                    var i = e.snap.url;
                    (S = {
                      id: e.album.id,
                      url: e.album.url,
                      name: e.album.name,
                      code: e.album.code
                    }),
                      y.push(i),
                      d.html(
                        '<a href="' + i + '" target="_blank">' + i + "</a>"
                      ),
                      C(++r);
                  },
                  error: function(e, t, n) {
                    b && e.readystate === 0
                      ? x()
                      : (d.html(
                          "Error: " +
                            (e.responseText && e.responseText !== ""
                              ? e.responseText
                              : "Error connecting to qSnap server")
                        ),
                        C(++r));
                  }
                }));
            };
          v.on("click", function(e) {
            e.preventDefault(),
              (b = !0),
              w && w.readystate === 0 && w.abort(),
              v.hide();
          }),
            T &&
              g.on("click", function(e) {
                e.preventDefault();
                var n = [];
                $.each(y, function(e, t) {
                  n.push(t);
                }),
                  t.length > 1 && n.push("All snaps: " + S.url),
                  window.copyToClipboard(n.join("\r\n"));
              }),
            g.hide(),
            v.hide(),
            c.on("click", function(e) {
              e.preventDefault(),
                c.hide(),
                v.show(),
                h.attr("disabled", "disabled"),
                l.attr("disabled", "disabled"),
                C();
            }),
            t.length > 1
              ? (l.val(t[0].title), l.focus())
              : (f.hide(), t.length == 1 && c.trigger("click"));
        });
      }),
      (t.prototype.createDialog = function(t) {
        var n = this,
          r = $("body").find("#" + n.DIALOG_ID);
        if (r.length === 1) {
          t(r);
          return;
        }
        e.Templates.load({
          fileName: "qsnap.tmpl",
          selector: "#upload-dlg-template",
          context: { id: n.DIALOG_ID },
          callback: function(e) {
            $("body").append(e), (r = $("#upload-dlg")), t(r);
          }
        });
      }),
      t
    );
  })();
  e.ShareDialog = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function() {
    function t() {
      this.DIALOG_ID = "save-file-dlg";
    }
    return (
      (t.prototype.show = function(e) {
        if (e.length > 0) {
          var t = "Right-click on images to save.";
          e.length == 1 && (t = "Right-click on image to save."),
            this.createDialog(t, function(t) {
              for (var n = 0; n < e.length; n++) {
                var r = e[n],
                  i = new Image();
                i.src = r;
                var s = $(
                  '<div style="padding: 3px; border: 1px solid #CCC; margin-bottom: 5px;"></div>'
                );
                s.append(i), $("#exported-images").append(s);
              }
              t.modal({ show: !0, removeAfterHide: !0 });
            });
        }
      }),
      (t.prototype.createDialog = function(t, n) {
        var r = this,
          i = $("body").find("#" + r.DIALOG_ID);
        if (i.length === 1) {
          n(i);
          return;
        }
        e.Templates.load({
          fileName: "qsnap.tmpl",
          selector: "#save-file-dlg-template",
          context: { id: r.DIALOG_ID, message: t },
          callback: function(e) {
            $("body").append(e), (i = $("#save-file-dlg")), n(i);
          }
        });
      }),
      t
    );
  })();
  e.SaveFileDialog = t;
})(Iris || (Iris = {}));
var Iris;
(function(e) {
  var t = (function(t) {
    function n(n) {
      var r = this;
      t.call(this),
        (this.isDisabled = !1),
        (this.UNDO_REDO_EVENT = "undo_redo_event"),
        (this.settings = new e.SettingsDialog()),
        ($.support.cors = !0),
        (this.screens = new e.ScreenList(this)),
        this.screens.on("screenChanged", function(e, t) {
          return r.loadScreen(t);
        });
      var i = this;
      (this.tools = new e.Tools(this, function(e) {
        $(document)
          .keydown(_.bind(e.onKeyDown, e))
          .keyup(_.bind(e.onKeyUp, e)),
          $("[rel=tooltip]").tooltip({ delay: { show: 350, hide: 100 } }),
          (r.$textBox = $("<textarea><textarea>").hide()),
          $("#main").append(r.$textBox),
          r.screens.count() <= 0 && e.disable();
      })),
        this.screens.count() <= 0 && i.disable(),
        this.handleSettingsButton(),
        this.handleAddFileButton(),
        this.handlePrintButton(),
        this.handleSaveButton(),
        this.handleSaveAllButton(),
        this.handleShareButtons(n),
        window.supportReadingLocalFile() &&
          ($(document).on("drop", function(e) {
            e.preventDefault && e.preventDefault(),
              e.returnValue && (e.returnValue = !1);
            var t = e.originalEvent.dataTransfer.files;
            t.length > 0 && r.addFiles(t);
          }),
          $(document).on("dragover", function(e) {
            e.preventDefault(),
              e.stopPropagation(),
              (e.originalEvent.dataTransfer.dropEffect = "copy");
          }));
    }
    return (
      __extends(n, t),
      (n.prototype.handleAddFileButton = function() {
        var e = $("#btn-add-file"),
          t = $("#add-file-form");
        if (!window.supportReadingLocalFile()) {
          e.remove(), t.remove();
          return;
        }
        var n = this;
        e.on("click", function(e) {
          e.preventDefault(),
            t.empty(),
            t.append(
              '<input class="file-attachment" type="file" id="files" name="files" accept="image/jpeg,image/png,jpg|png" multiple />'
            );
          var r = t.find("#files");
          r.on("change", function(e) {
            n.addFiles(e.target.files);
          }),
            r.focus().trigger("click");
        });
      }),
      (n.prototype.addFiles = function(t) {
        var n = this,
          r = _.size(t),
          i = _.filter(t, function(e) {
            return (
              e.type.match("image.*") &&
              e.name.match(/.+(jpg|jpeg|JPG|JPEG|png|PNG)$/)
            );
          }),
          s = _.size(i);
        if (s == 0) {
          e.Dialog.error(null, "Only support .jpg or .png file types");
          return;
        }
        e.Dialog.spin();
        var o = [],
          u = function() {
            var t = r,
              i = _.sortBy(o, function(e) {
                return e.title;
              }),
              s = 0;
            for (var u = 0; u < i.length; u++)
              n.addScreen(i[u], !0, function(n) {
                s++,
                  n.error || t--,
                  s === i.length &&
                    (e.Dialog.spin(!1),
                    t > 0 &&
                      (r == 1 || r === t
                        ? e.Dialog.error(
                            null,
                            "Only support .jpg or .png file types"
                          )
                        : t > 1
                        ? e.Dialog.error(
                            null,
                            "Some files are not under .jpg or .png format or the files are corrupted."
                          )
                        : e.Dialog.error(
                            null,
                            "A file is not under correct .jpg or .png format or the file is corrupted."
                          )));
              });
          },
          a = s;
        for (var f = 0, l; (l = i[f]); f++) {
          var c = new window.FileReader();
          (c.onload = (function(e) {
            return function(t) {
              o.push({ image: t.target.result, title: e.name, url: "" }),
                a--,
                a <= 0 && u();
            };
          })(l)),
            (c.onerror = function() {
              a--, a <= 0 && u();
            }),
            c.readAsDataURL(l);
        }
      }),
      (n.prototype.handleSettingsButton = function() {
        var e = this;
        $("#btn-settings").on("click", function(t) {
          t.preventDefault(),
            e.settings.show(function(t) {
              e.trigger("setting-changed", t);
            });
        });
      }),
      (n.prototype.handlePrintButton = function() {
        var e = this,
          t = this,
          n = $("#btn-print");
        n.on("click", function(t) {
          t.preventDefault();
          if (e.currentScreen) {
            e.tools.onScreenChanging(e.currentScreen);
            var n = $("<div>"),
              r = $("div.wrapper");
            n.css({
              width: "100%",
              height: "100%",
              "z-index": "5000",
              position: "absolute",
              left: "0",
              top: "0"
            }),
              $("body").append(n),
              r.hide();
            var i = new Image();
            n.append($(i)),
              (i.onload = function() {
                setTimeout(function() {
                  window.print(),
                    setTimeout(function() {
                      n.remove(), r.show();
                    }, 0);
                }, 0);
              });
            var s = e.currentScreen.export();
            i.src = s.image;
          }
        }),
          window.key("command+alt+p,ctrl+alt+p", function() {
            return t.hasOpeningDialog() ? !1 : (n.trigger("click"), !1);
          });
      }),
      (n.prototype.handleSaveButton = function() {
        var e = this,
          t = this,
          n = $("#btn-save");
        n.on("click", function(n) {
          n.preventDefault(),
            e.currentScreen &&
              (e.tools.onScreenChanging(e.currentScreen),
              window.saveImages &&
                window.saveImages([e.currentScreen], t.exportScreen));
        }),
          window.key("command+alt+s,ctrl+alt+s", function() {
            return t.hasOpeningDialog() ? !1 : (n.trigger("click"), !1);
          });
      }),
      (n.prototype.exportScreen = function(e) {
        var t = e.export();
        return t;
      }),
      (n.prototype.handleSaveAllButton = function() {
        var t = this,
          n = this,
          r = $("#btn-save-all");
        r.on("click", function(r) {
          r.preventDefault();
          var i = t.currentScreen;
          window.saveImages &&
            (e.Dialog.spin(!0),
            window.saveImages(t.screens.getAll(), n.exportScreen),
            i.load(t.tools, function() {
              (n.currentScreen = i),
                n.tools.onScreenChanged(n.currentScreen),
                n.repaint(),
                n.triggerUndoRedoEvent();
            }),
            e.Dialog.spin(!1));
        }),
          window.key("command+alt+a,ctrl+alt+a", function() {
            return n.hasOpeningDialog() ? !1 : (r.trigger("click"), !1);
          });
      }),
      (n.prototype.handleShareButtons = function(t) {
        var n = this,
          r = e.AppInfo.serverUrl,
          i = r + "/api/v1/auth",
          s = r + "/users/login",
          o = $("#btn-share"),
          u = $("#btn-share-all"),
          a = this,
          f = function(e) {
            var n = e.export();
            return (
              (n.description =
                "Source URL: " +
                e.url +
                "\n" +
                "Captured with " +
                t.browser +
                " on " +
                t.OS),
              n
            );
          },
          l = function(t) {
            e.Dialog.spin(),
              $.ajax({
                type: "GET",
                url: i,
                complete: function(r) {
                  e.Dialog.spin(!1);
                  if (r.status === 200) {
                    var i = n.currentScreen;
                    n.tools.onScreenChanging(n.currentScreen);
                    var o = new e.ShareDialog();
                    o.upload(t, f, function() {
                      i.load(n.tools, function() {
                        (a.currentScreen = i),
                          a.tools.onScreenChanged(a.currentScreen),
                          a.repaint(),
                          a.triggerUndoRedoEvent();
                      });
                    });
                  } else
                    r.status === 401
                      ? e.Dialog.error(
                          null,
                          "Please login to <a href='" +
                            s +
                            "' target='_blank'>qSnap</a> first. It is quick and easy."
                        )
                      : e.Dialog.error(
                          null,
                          r.responseText || "Error connecting to qSnap"
                        );
                }
              });
          };
        o.on("click", function(e) {
          e.preventDefault(), n.currentScreen && l([n.currentScreen]);
        }),
          u.on("click", function(e) {
            e.preventDefault();
            if (n.screens.getAll().length <= 0) return;
            l(n.screens.getAll());
          }),
          window.key("command+x,ctrl+x", function() {
            if (a.hasOpeningDialog()) return;
            return o.trigger("click"), !1;
          }),
          window.key("command+alt+x,ctrl+alt+x", function() {
            if (a.hasOpeningDialog()) return;
            return u.trigger("click"), !1;
          });
      }),
      (n.prototype.triggerUndoRedoEvent = function() {
        var e = JUndo.get(this.currentScreen);
        this.trigger(
          this.UNDO_REDO_EVENT,
          e.undoCount() > 0,
          e.redoCount() > 0
        );
      }),
      (n.prototype.loadScreen = function(e) {
        var t = this;
        if (e === this.currentScreen) return;
        this.tools.onScreenChanging(this.currentScreen),
          e.load(this.tools, function() {
            (t.currentScreen = e),
              t.tools.onScreenChanged(t.currentScreen),
              t.repaint(),
              t.triggerUndoRedoEvent();
          });
      }),
      (n.prototype.addScreens = function(e) {
        if (e == null || e.length == 0) return;
        for (var t = 0; t < e.length - 1; t++) this.addScreen(e[t], !1);
        this.addScreen(e[e.length - 1], !0);
      }),
      (n.prototype.addScreen = function(t, n, r) {
        typeof n == "undefined" && (n = !0);
        var i = this;
        if (!t) return;
        if (!t.image)
          window.alert("Screen Capture does not have permission to capture that page");
        else {
          e.Dialog.spin();
          var s = new e.Screen(t.title, t.url, t.image);
          s.init(this.tools, function() {}),
            this.screens.add(s, n, function(t) {
              e.Dialog.spin(!1), i.enable(), r && r(t);
            }),
            JUndo.get(s).on("change", function() {
              i.triggerUndoRedoEvent();
            });
        }
      }),
      (n.prototype.undo = function(e, t) {
        if (!this.currentScreen) return;
        _.isUndefined(e)
          ? JUndo.get(this.currentScreen).undo()
          : JUndo.get(this.currentScreen).register(e, t);
      }),
      (n.prototype.redo = function() {
        JUndo.get(this.currentScreen).redo();
      }),
      (n.prototype.addChild = function(e) {
        this.currentScreen.stage.addChild(e);
      }),
      (n.prototype.removeChild = function(e) {
        this.currentScreen.stage.removeChild(e);
      }),
      (n.prototype.repaint = function() {
        this.currentScreen.stage.update();
      }),
      (n.prototype.clear = function() {
        this.currentScreen.stage.clear(),
          (this.currentScreen = null),
          this.disable();
      }),
      (n.prototype.disable = function() {
        this.tools && this.tools.disable(),
          $("#btn-share-screen").addClass("disabled"),
          (this.isDisabled = !0);
      }),
      (n.prototype.enable = function() {
        this.tools.enable(),
          $("#btn-share-screen").removeClass("disabled"),
          (this.isDisabled = !1);
      }),
      (n.prototype.cursor = function(e) {
        $("#canvas").css("cursor", e);
      }),
      (n.prototype.hasOpeningDialog = function(e) {
        return _.isUndefined(e)
          ? $("*[id$='dlg']").length != 0
          : $("*[id='" + e + "']").length != 0;
      }),
      n
    );
  })(Eventify);
  e.Editor = t;
})(Iris || (Iris = {}));
