(() => {
  "use strict";
  /*!
   *  電脳麻将 v2.1.1
   *
   *  Copyright(C) 2017 Satoshi Kobayashi
   *  Released under the MIT license
   *  https://github.com/kobalab/Majiang/blob/master/LICENSE
   */
  const {
    hide: a,
    show: t,
    fadeIn: e,
    scale: n,
    setSelector: o,
    clearSelector: i,
  } = Majiang.UI.Util;
  let l;
  $(function () {
    let r;
    const d = Majiang.UI.pai($("#loaddata")),
      s = Majiang.UI.audio($("#loaddata")),
      c = (a) => (
        $("body").addClass("analyzer"),
        new Majiang.UI.Analyzer($("#board > .analyzer"), a, d, () =>
          $("body").removeClass("analyzer")
        )
      ),
      g = new Majiang.UI.PaipuFile(
        $("#file"),
        "Majiang.game",
        (a) => (
          $("body").attr("class", "board"),
          n($("#board"), $("#space")),
          new Majiang.UI.Paipu(
            $("#board"),
            a,
            d,
            s,
            "Majiang.pref",
            () => e($("body").attr("class", "file")),
            c
          )
        ),
        (a) => (
          e($("body").attr("class", "stat")),
          new Majiang.UI.PaipuStat($("#stat"), a, () =>
            e($("body").attr("class", "file"))
          )
        )
      ),
      b = Majiang.rule(
        JSON.parse(localStorage.getItem("Majiang.rule") || "{}")
      );
    function w() {
      let a = [new Majiang.UI.Player($("#board"), d, s)];
      for (let t = 1; t < 4; t++) a[t] = new Majiang.AI();
      (r = new Majiang.Game(a, j, b)),
        (r.view = new Majiang.UI.Board($("#board .board"), d, s, r.model)),
        $("body").attr("class", "board"),
        n($("#board"), $("#space")),
        new Majiang.UI.GameCtl($("#board"), r, "Majiang.pref"),
        r.kaiju();
    }
    function j(a) {
      a && g.add(a, 10), e($("body").attr("class", "file")), g.redraw();
    }
    $("#file .start").on("click", w),
      $(window).on("resize", () => n($("#board"), $("#space"))),
      $(window).on("load", function () {
        a($("#title .loading")),
          $("#title .start")
            .attr("tabindex", 0)
            .attr("role", "button")
            .on("click", () => {
              i("title"), g.isEmpty ? w() : j();
            }),
          t(o($("#title .start"), "title", { focus: null, touch: !1 }));
      }),
      l && $(window).trigger("load");
  }),
    $(window).on("load", () => (l = !0));
})();
