(() => {
  var t = {
      725: (t, e, i) => {
        "use strict";
        /*!
         *  @kobalab/majiang-ai v1.0.5
         *
         *  Copyright(C) 2021 Satoshi Kobayashi
         *  Released under the MIT license
         *  https://github.com/kobalab/majiang-ai/blob/master/LICENSE
         */ const n = i(384),
          s = i(951),
          a = [12, 72, 216];
        function o(t) {
          let e = [];
          for (let i of t)
            "z" != i[0] && "5" == i[1] && e.push(i.replace(/5/, "0")),
              e.push(i);
          return e;
        }
        t.exports = class extends n.Player {
          qipai(t) {
            (this._defen_cache = {}),
              (this._eval_cache = {}),
              (this._suanpai = new s(this._rule["赤牌"])),
              this._suanpai.qipai(
                t,
                (this._id + 4 - this._model.qijia + 4 - t.jushu) % 4
              ),
              super.qipai(t);
          }
          zimo(t, e) {
            t.l == this._menfeng && (this._eval_cache = {}),
              this._suanpai.zimo(t),
              super.zimo(t, e);
          }
          dapai(t) {
            t.l != this._menfeng && (this._eval_cache = {}),
              this._suanpai.dapai(t),
              super.dapai(t);
          }
          fulou(t) {
            this._suanpai.fulou(t), super.fulou(t);
          }
          gang(t) {
            this._suanpai.gang(t), super.gang(t);
          }
          kaigang(t) {
            (this._defen_cache = {}),
              (this._eval_cache = {}),
              this._suanpai.kaigang(t),
              super.kaigang(t);
          }
          action_kaiju(t) {
            this._callback();
          }
          action_qipai(t) {
            this._callback();
          }
          action_zimo(t, e) {
            if (t.l != this._menfeng) return this._callback();
            let i;
            this.select_hule(null, e)
              ? this._callback({ hule: "-" })
              : this.select_pingju()
              ? this._callback({ daopai: "-" })
              : (i = this.select_gang())
              ? this._callback({ gang: i })
              : this._callback({ dapai: this.select_dapai() });
          }
          action_dapai(t) {
            if (t.l == this._menfeng)
              return void (this.select_daopai()
                ? this._callback({ daopai: "-" })
                : this._callback());
            let e;
            this.select_hule(t)
              ? this._callback({ hule: "-" })
              : (e = this.select_fulou(t))
              ? this._callback({ fulou: e })
              : this.select_daopai()
              ? this._callback({ daopai: "-" })
              : this._callback();
          }
          action_fulou(t) {
            return t.l != this._menfeng || t.m.match(/^[mpsz]\d{4}/)
              ? this._callback()
              : void this._callback({ dapai: this.select_dapai() });
          }
          action_gang(t) {
            if (t.l == this._menfeng) return this._callback();
            this.select_hule(t, !0)
              ? this._callback({ hule: "-" })
              : this._callback();
          }
          action_hule(t) {
            this._callback();
          }
          action_pingju(t) {
            this._callback();
          }
          action_jieju(t) {
            this._callback();
          }
          select_hule(t, e, i) {
            let n;
            if (t) {
              if (t.m && t.m.match(/^[mpsz]\d{4}$/)) return !1;
              let e = ["", "+", "=", "-"][
                (4 + this._model.lunban - this._menfeng) % 4
              ];
              n = t.m ? t.m[0] + t.m.substr(-1) + e : t.p.substr(0, 2) + e;
            }
            let s = this.allow_hule(this.shoupai, n, e);
            if (i && s) {
              let t = this.shoupai.clone();
              n && t.zimo(n),
                i.push({
                  m: "",
                  n_xiangting: -1,
                  ev: this.get_defen(this.shoupai, n),
                  shoupai: t.toString(),
                });
            }
            return s;
          }
          select_pingju() {
            return (
              !(n.Util.xiangting(this.shoupai) < 4) &&
              this.allow_pingju(this.shoupai)
            );
          }
          select_fulou(t, e) {
            let i = n.Util.xiangting(this.shoupai);
            if (this._model.shoupai.find((t) => t.lizhi) && i >= 3) return;
            let s = ["", "+", "=", "-"][
                (4 + this._model.lunban - this._menfeng) % 4
              ],
              a = t.p.substr(0, 2) + s;
            if (i < 3) {
              let t,
                s = this.get_gang_mianzi(this.shoupai, a)
                  .concat(this.get_peng_mianzi(this.shoupai, a))
                  .concat(this.get_chi_mianzi(this.shoupai, a));
              if (!s.length) return;
              let o = this._suanpai.paishu_all(),
                r = this.eval_shoupai(this.shoupai, o, "");
              e &&
                e.push({
                  m: "",
                  n_xiangting: i,
                  ev: r,
                  shoupai: this.shoupai.toString(),
                });
              for (let i of s) {
                let s = this.shoupai.clone().fulou(i),
                  a = n.Util.xiangting(s);
                if (a >= 3) continue;
                let h = this.eval_shoupai(s, o);
                if (
                  (e &&
                    h > 0 &&
                    e.push({
                      m: i,
                      n_xiangting: a,
                      ev: h,
                      shoupai: s.toString(),
                    }),
                  this._model.shoupai.find((t) => t.lizhi))
                ) {
                  if (a > 0 && h < 1200) continue;
                  if (0 == a && h < 500) continue;
                }
                h - r > 1e-7 && ((r = h), (t = i));
              }
              return t;
            }
            {
              let t,
                s = this.get_peng_mianzi(this.shoupai, a).concat(
                  this.get_chi_mianzi(this.shoupai, a)
                );
              if (!s.length) return;
              if (((i = this.xiangting(this.shoupai)), e)) {
                t = this._suanpai.paishu_all();
                let s = this.eval_shoupai(this.shoupai, t),
                  a = n.Util.tingpai(this.shoupai)
                    .map((t) => this._suanpai._paishu[t[0]][t[1]])
                    .reduce((t, e) => t + e, 0);
                e.push({
                  m: "",
                  n_xiangting: i,
                  ev: s,
                  n_tingpai: a,
                  shoupai: this.shoupai.toString(),
                });
              }
              for (let t of s) {
                let n = this.shoupai.clone().fulou(t),
                  s = this.xiangting(n);
                if (!(s >= i))
                  return (
                    e &&
                      e.push({ m: t, n_xiangting: s, shoupai: n.toString() }),
                    t
                  );
              }
            }
          }
          select_gang(t) {
            let e = n.Util.xiangting(this.shoupai);
            if (this._model.shoupai.find((t) => t.lizhi) && e > 0) return;
            let i = this._suanpai.paishu_all();
            if (e < 3) {
              let e,
                s = this.eval_shoupai(this.shoupai, i);
              for (let a of this.get_gang_mianzi(this.shoupai)) {
                let o = this.shoupai.clone().gang(a),
                  r = n.Util.xiangting(o);
                if (r >= 3) continue;
                let h = this.eval_shoupai(o, i);
                if (t) {
                  let e = a.match(/\d{4}$/)
                      ? a.substr(0, 2)
                      : a[0] + a.substr(-1),
                    i = n.Util.tingpai(o),
                    s = i
                      .map((t) => this._suanpai._paishu[t[0]][t[1]])
                      .reduce((t, e) => t + e, 0);
                  t.push({
                    p: e,
                    m: a,
                    n_xiangting: r,
                    ev: h,
                    tingpai: i,
                    n_tingpai: s,
                  });
                }
                h - s > -1e-7 && ((e = a), (s = h));
              }
              return e;
            }
            e = this.xiangting(this.shoupai);
            for (let s of this.get_gang_mianzi(this.shoupai)) {
              let a = this.shoupai.clone().gang(s);
              if (this.xiangting(a) == e) {
                if (t) {
                  let o = s.match(/\d{4}$/)
                      ? s.substr(0, 2)
                      : s[0] + s.substr(-1),
                    r = this.eval_shoupai(a, i),
                    h = n.Util.tingpai(a),
                    l = h
                      .map((t) => this._suanpai._paishu[t[0]][t[1]])
                      .reduce((t, e) => t + e, 0);
                  t.push({
                    p: o,
                    m: s,
                    n_xiangting: e,
                    ev: r,
                    tingpai: h,
                    n_tingpai: l,
                  });
                }
                return s;
              }
            }
          }
          select_dapai(t) {
            let e,
              i = 1 / 0;
            const s = this._suanpai.suan_weixian_all(this.shoupai._bingpai);
            if (s)
              for (let t of this.get_dapai(this.shoupai))
                s(t) < i && ((i = s(t)), (e = t));
            let a = e,
              o = -1,
              r = 0,
              h = [],
              l = n.Util.xiangting(this.shoupai),
              u = this._suanpai.paishu_all();
            const p = this._suanpai.make_paijia(this.shoupai),
              c = (t, e) => p(t) - p(e);
            for (let p of this.get_dapai(this.shoupai).reverse().sort(c)) {
              a || (a = p);
              let c = this.shoupai.clone().dapai(p);
              if ((l > 2 && this.xiangting(c) > l) || n.Util.xiangting(c) > l) {
                if (e) continue;
                l < 2 && h.push(p);
                continue;
              }
              let f = this.eval_shoupai(c, u),
                d = n.Util.tingpai(c),
                g = d
                  .map((t) => this._suanpai._paishu[t[0]][t[1]])
                  .reduce((t, e) => t + e, 0);
              if (
                (t &&
                  (t.map((t) => {
                    t.p == p.substr(0, 2) && t.m && (t.weixian = s && s(p));
                  }),
                  t.find((t) => t.p == p.substr(0, 2) && !t.m) ||
                    t.push({
                      p: p.substr(0, 2),
                      n_xiangting: l,
                      ev: f,
                      tingpai: d,
                      n_tingpai: g,
                      weixian: s && s(p),
                    })),
                s && s(p) > i)
              ) {
                if (s(p) >= 13.5) continue;
                if (l > 2 || (l > 0 && f < 300)) {
                  if (s(p) >= 8) continue;
                  if (i < 3) continue;
                } else if ((l > 0 && f < 1200) || (0 == l && f < 200)) {
                  if (s(p) >= 8) continue;
                  if (i < 3 && s(p) >= 3) continue;
                }
              }
              f - o > 1e-7 && ((o = f), (a = p), (r = 6 * g));
            }
            let f = o;
            for (let e of h) {
              let i = this.shoupai.clone().dapai(e),
                s = n.Util.tingpai(i),
                h = s
                  .map((t) => this._suanpai._paishu[t[0]][t[1]])
                  .reduce((t, e) => t + e, 0);
              if (h < r) continue;
              let p = e[0] + (+e[1] || 5),
                c = this.eval_backtrack(i, u, p, 2 * f);
              t &&
                c > 0 &&
                (t.find((t) => t.p == e.substr(0, 2) && !t.m) ||
                  t.push({
                    p: e.substr(0, 2),
                    n_xiangting: l + 1,
                    ev: c,
                    tingpai: s,
                    n_tingpai: h,
                  })),
                c - o > 1e-7 && ((o = c), (a = e));
            }
            return (
              e &&
                t &&
                a == e &&
                !t.find((t) => !t.m && t.p == e.substr(0, 2)) &&
                t.push({
                  p: e.substr(0, 2),
                  n_xiangting: n.Util.xiangting(this.shoupai.clone().dapai(e)),
                  weixian: s && s(e),
                }),
              this.select_lizhi(a) && o >= 200 && (a += "*"),
              a
            );
          }
          select_lizhi(t) {
            return this.allow_lizhi(this.shoupai, t);
          }
          select_daopai() {
            return this.allow_no_daopai(this.shoupai);
          }
          xiangting(t) {
            function e(t, e) {
              const i = new RegExp(`^[z${e}]`);
              if (t._fulou.find((t) => !t.match(i))) return 1 / 0;
              let s = t.clone();
              for (let t of ["m", "p", "s"])
                t != e && (s._bingpai[t] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
              return n.Util.xiangting(s);
            }
            return Math.min(
              (function (t) {
                return t.menqian ? n.Util.xiangting(t) : 1 / 0;
              })(t),
              (function (t, e, i, s) {
                let a,
                  o = 0;
                for (let n of [e + 1, i + 1, 5, 6, 7]) {
                  t._bingpai.z[n] >= 3
                    ? o++
                    : 2 == t._bingpai.z[n] &&
                      s._paishu.z[n] &&
                      (a = "z" + n + n + n + "+");
                  for (let e of t._fulou) "z" == e[0] && e[1] == n && o++;
                }
                if (o) return n.Util.xiangting(t);
                if (a) {
                  let e = t.clone();
                  return (
                    e.fulou(a, !1), (e._zimo = null), n.Util.xiangting(e) + 1
                  );
                }
                return 1 / 0;
              })(t, this._model.zhuangfeng, this._menfeng, this._suanpai),
              (function (t, e) {
                if (!e["クイタンあり"] && !t.menqian) return 1 / 0;
                if (t._fulou.find((t) => t.match(/^z|[19]/))) return 1 / 0;
                let i = t.clone();
                for (let t of ["m", "p", "s"])
                  (i._bingpai[t][1] = 0), (i._bingpai[t][9] = 0);
                return (
                  (i._bingpai.z = [0, 0, 0, 0, 0, 0, 0, 0]), n.Util.xiangting(i)
                );
              })(t, this._rule),
              (function (t) {
                if (
                  t._fulou
                    .map((t) => t.replace(/0/, "5"))
                    .find((t) => !t.match(/^[mpsz](\d)\1\1/))
                )
                  return 1 / 0;
                let e = t._fulou.length,
                  i = 0;
                for (let n of ["m", "p", "s", "z"]) {
                  let s = t._bingpai[n];
                  for (let t = 1; t < s.length; t++)
                    s[t] >= 3 ? e++ : 2 == s[t] && i++;
                }
                return e + i > 5 && (i = 5 - e), 8 - 2 * e - i;
              })(t),
              e(t, "m"),
              e(t, "p"),
              e(t, "s")
            );
          }
          tingpai(t) {
            let e = this.xiangting(t),
              i = [];
            for (let s of n.Util.tingpai(t, (t) => this.xiangting(t))) {
              if (e > 0) {
                for (let n of this.get_peng_mianzi(t, s + "+")) {
                  let a = t.clone().fulou(n);
                  if (this.xiangting(a) < e) {
                    i.push(s + "+");
                    break;
                  }
                }
                if (i[i.length - 1] == s + "+") continue;
                for (let n of this.get_chi_mianzi(t, s + "-")) {
                  let a = t.clone().fulou(n);
                  if (this.xiangting(a) < e) {
                    i.push(s + "-");
                    break;
                  }
                }
                if (i[i.length - 1] == s + "-") continue;
              }
              i.push(s);
            }
            return i;
          }
          get_defen(t, e) {
            let i = t.toString();
            if (
              (e && (i = i.replace(/^([^\*\,]*)(.*)$/, `$1${e}$2`)),
              null != this._defen_cache[i])
            )
              return this._defen_cache[i];
            let s = {
                rule: this._rule,
                zhuangfeng: this._model.zhuangfeng,
                menfeng: this._menfeng,
                hupai: { lizhi: t.menqian },
                baopai: this.shan.baopai,
                jicun: { changbang: 0, lizhibang: 0 },
              },
              a = n.Util.hule(t, e, s);
            return (this._defen_cache[i] = a.defen), a.defen;
          }
          eval_shoupai(t, e, i) {
            let s = t.toString() + (null != i ? `:${i}` : "");
            if (null != this._eval_cache[s]) return this._eval_cache[s];
            let r = 0,
              h = n.Util.xiangting(t);
            if (-1 == h) r = this.get_defen(t);
            else if (t._zimo)
              for (let s of this.get_dapai(t)) {
                let a = t.clone().dapai(s);
                if (n.Util.xiangting(a) > h) continue;
                let o = this.eval_shoupai(a, e, i);
                o > r && (r = o);
              }
            else if (h < 3) {
              for (let s of o(n.Util.tingpai(t))) {
                if (s == i) {
                  r = 0;
                  break;
                }
                if (0 == e[s]) continue;
                let n = t.clone().zimo(s);
                e[s]--;
                let a = this.eval_shoupai(n, e, i);
                i || (h > 0 && (a += this.eval_fulou(t, s, e, i))),
                  e[s]++,
                  (r += a * e[s]);
              }
              r /= a[h];
            } else
              for (let i of o(this.tingpai(t)))
                0 != e[i.substr(0, 2)] &&
                  (r +=
                    e[i.substr(0, 2)] *
                    ("+" == i[2] ? 4 : "-" == i[2] ? 2 : 1));
            return (this._eval_cache[s] = r), r;
          }
          eval_backtrack(t, e, i, s) {
            let r = n.Util.xiangting(t),
              h = 0;
            for (let a of o(n.Util.tingpai(t))) {
              if (a.replace(/0/, "5") == i) continue;
              if (0 == e[a]) continue;
              let n = t.clone().zimo(a);
              e[a]--;
              let o = this.eval_shoupai(n, e, i);
              e[a]++, o - s > 1e-7 && (h += o * e[a]);
            }
            return h / a[r];
          }
          eval_fulou(t, e, i, s) {
            let a = n.Util.xiangting(t),
              o = 0;
            for (let r of this.get_peng_mianzi(t, e + "+")) {
              let e = t.clone().fulou(r);
              n.Util.xiangting(e) >= a ||
                (o = Math.max(this.eval_shoupai(e, i, s), o));
            }
            let r = 0;
            for (let o of this.get_chi_mianzi(t, e + "-")) {
              let e = t.clone().fulou(o);
              n.Util.xiangting(e) >= a ||
                (r = Math.max(this.eval_shoupai(e, i, s), r));
            }
            return o > r ? 3 * o : 2 * o + r;
          }
        };
      },
      951: (t, e, i) => {
        "use strict";
        const n = i(384);
        t.exports = class {
          constructor(t) {
            (this._paishu = {
              m: [t.m, 4, 4, 4, 4, 4, 4, 4, 4, 4],
              p: [t.p, 4, 4, 4, 4, 4, 4, 4, 4, 4],
              s: [t.s, 4, 4, 4, 4, 4, 4, 4, 4, 4],
              z: [0, 4, 4, 4, 4, 4, 4, 4],
            }),
              (this._zhuangfeng = 0),
              (this._menfeng = 0),
              (this._baopai = []),
              (this._dapai = [{}, {}, {}, {}]),
              (this._lizhi = []);
          }
          decrease(t) {
            this._paishu[t[0]][t[1]]--, 0 == t[1] && this._paishu[t[0]][5]--;
          }
          qipai(t, e) {
            (this._zhuangfeng = t.zhuangfeng),
              (this._menfeng = e),
              (this._baopai = [t.baopai]),
              this.decrease(t.baopai);
            let i = t.shoupai[e];
            for (let t of i.match(/[mpsz]\d[\d\+\=\-]*/g) || []) {
              let e = t[0];
              for (let i of t.match(/\d/g)) this.decrease(e + i);
            }
          }
          zimo(t) {
            t.l == this._menfeng && this.decrease(t.p);
          }
          dapai(t) {
            t.l != this._menfeng &&
              (this.decrease(t.p),
              "*" == t.p.substr(-1) && (this._lizhi[t.l] = !0));
            let e = t.p[0] + (+t.p[1] || 5);
            this._dapai[t.l][e] = !0;
            for (let t = 0; t < 4; t++)
              this._lizhi[t] && (this._dapai[t][e] = !0);
          }
          fulou(t) {
            if (t.l != this._menfeng) {
              let e = t.m[0];
              for (let i of t.m.match(/\d(?![\+\=\-])/g)) this.decrease(e + i);
            }
          }
          gang(t) {
            if (t.l != this._menfeng)
              if (t.m.match(/^[mpsz]\d{4}$/)) {
                let e = t.m[0];
                for (let i of t.m.match(/\d/g)) this.decrease(e + i);
              } else {
                let e = t.m[0],
                  i = t.m.substr(-1);
                this.decrease(e + i);
              }
          }
          kaigang(t) {
            this._baopai.push(t.baopai), this.decrease(t.baopai);
          }
          paishu_all() {
            let t = {};
            for (let e of ["m", "p", "s", "z"])
              for (let i of "z" == e
                ? [1, 2, 3, 4, 5, 6, 7]
                : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
                t[e + i] =
                  5 == i
                    ? this._paishu[e][5] - this._paishu[e][0]
                    : this._paishu[e][i];
            return t;
          }
          paijia(t) {
            const e = (t, e) => {
              if (e < 1 || 9 < e) return 0;
              let i = 1;
              for (let s of this._baopai)
                t + e == n.Shan.zhenbaopai(s) && (i *= 2);
              return i;
            };
            let i = 0,
              s = t[0],
              a = +t[1] || 5;
            const o = Math.min,
              r = Math.max,
              h = this._paishu[s];
            if ("z" == s)
              (i = "0" != t[1] ? h[a] * e(s, a) : 0),
                a == this._zhuangfeng + 1 && (i *= 2),
                a == this._menfeng + 1 && (i *= 2),
                5 <= a && a <= 7 && (i *= 2);
            else {
              let n = 1 <= a - 2 ? o(h[a - 2], h[a - 1]) : 0,
                l = 1 <= a - 1 && a + 1 <= 9 ? o(h[a - 1], h[a + 1]) : 0,
                u = a + 2 <= 9 ? o(h[a + 1], h[a + 2]) : 0,
                p = [n, r(n, l), h[a], r(l, u), u];
              (i =
                p[0] * e(s, a - 2) +
                p[1] * e(s, a - 1) +
                p[2] * e(s, a) +
                p[3] * e(s, a + 1) +
                p[4] * e(s, a + 2)),
                (i += h[0]
                  ? 7 == a
                    ? o(h[0], p[0]) * e(s, a - 2)
                    : 6 == a
                    ? o(h[0], p[1]) * e(s, a - 1)
                    : 5 == a
                    ? o(h[0], p[2]) * e(s, a)
                    : 4 == a
                    ? o(h[0], p[3]) * e(s, a + 1)
                    : 3 == a
                    ? o(h[0], p[4]) * e(s, a + 2)
                    : 0
                  : 0),
                "0" == t[1] && (i *= 2);
            }
            return (i *= e(s, a)), i;
          }
          make_paijia(t) {
            let e = {};
            for (let i of ["m", "p", "s", "z"])
              e[i] = t._bingpai[i].slice(1).reduce((t, e) => t + e);
            let i = t._bingpai.z.slice(1, 5).reduce((t, e) => t + e),
              n = t._bingpai.z.slice(5).reduce((t, e) => t + e);
            for (let s of t._fulou)
              (e[s[0]] += 3),
                s.match(/^z[1234]/) && (i += 3),
                s.match(/^z[567]/) && (n += 3);
            let s = {};
            return (t) =>
              s[t] ??
              (s[t] =
                this.paijia(t) *
                ((t.match(/^z[1234]/) && i >= 9) ||
                (t.match(/^z[567]/) && n >= 6)
                  ? 8
                  : "z" == t[0] &&
                    Math.max(...["m", "p", "s"].map((t) => e[t])) + e.z >= 10
                  ? 4
                  : e[t[0]] + e.z >= 10
                  ? 2
                  : 1));
          }
          suan_weixian(t, e, i) {
            let n = t[0],
              s = +t[1] || 5,
              a = 0;
            if (this._dapai[e][n + s]) return a;
            const o = this._paishu[n];
            return (
              (a +=
                o[s] - (i ? 0 : 1) == 3
                  ? "z" == n
                    ? 8
                    : 3
                  : o[s] - (i ? 0 : 1) == 2
                  ? 3
                  : o[s] - (i ? 0 : 1) == 1
                  ? 1
                  : 0),
              "z" == n ||
                ((a +=
                  s - 2 < 1 || 0 == Math.min(o[s - 2], o[s - 1])
                    ? 0
                    : s - 2 == 1
                    ? 3
                    : this._dapai[e][n + (s - 3)]
                    ? 0
                    : 10),
                (a +=
                  s - 1 < 1 || s + 1 > 9 || 0 == Math.min(o[s - 1], o[s + 1])
                    ? 0
                    : 3),
                (a +=
                  s + 2 > 9 || 0 == Math.min(o[s + 1], o[s + 2])
                    ? 0
                    : s + 2 == 9
                    ? 3
                    : this._dapai[e][n + (s + 3)]
                    ? 0
                    : 10)),
              a
            );
          }
          suan_weixian_all(t) {
            let e;
            for (let i = 0; i < 4; i++) {
              if (!this._lizhi[i]) continue;
              e || (e = {});
              let n = {},
                s = 0;
              for (let e of ["m", "p", "s", "z"])
                for (let a = 1; a < this._paishu[e].length; a++)
                  (n[e + a] = this.suan_weixian(e + a, i, t[e][a])),
                    (s += n[e + a]);
              for (let t of Object.keys(n))
                (n[t] = (n[t] / (s || 1)) * 100 * (0 == i ? 1.4 : 1)),
                  e[t] || (e[t] = 0),
                  (e[t] = Math.max(e[t], n[t]));
            }
            if (e) return (t) => e[t[0] + (+t[1] || 5)];
          }
        };
      },
      471: (t, e, i) => {
        "use strict";
        const n = { Shoupai: i(325), He: i(66) };
        class s {
          constructor(t) {
            (this.paishu = 70), (this.baopai = [t]), this.fubaopai;
          }
          zimo(t) {
            return this.paishu--, t || "_";
          }
          kaigang(t) {
            this.baopai.push(t);
          }
        }
        t.exports = class {
          constructor(t) {
            t && this.kaiju(t);
          }
          kaiju(t) {
            (this.title = t.title),
              (this.player = t.player),
              (this.qijia = t.qijia),
              (this.zhuangfeng = 0),
              (this.jushu = 0),
              (this.changbang = 0),
              (this.lizhibang = 0),
              (this.defen = []),
              (this.shan = null),
              (this.shoupai = []),
              (this.he = []),
              (this.player_id = [0, 1, 2, 3]),
              (this.lunban = -1),
              this._lizhi,
              this._fenpei;
          }
          menfeng(t) {
            return (t + 4 - this.qijia + 4 - this.jushu) % 4;
          }
          qipai(t) {
            (this.zhuangfeng = t.zhuangfeng),
              (this.jushu = t.jushu),
              (this.changbang = t.changbang),
              (this.lizhibang = t.lizhibang),
              (this.shan = new s(t.baopai));
            for (let e = 0; e < 4; e++) {
              let i = t.shoupai[e] || "_".repeat(13);
              (this.shoupai[e] = n.Shoupai.fromString(i)),
                (this.he[e] = new n.He()),
                (this.player_id[e] = (this.qijia + this.jushu + e) % 4),
                (this.defen[this.player_id[e]] = t.defen[e]);
            }
            (this.lunban = -1), (this._lizhi = !1), (this._fenpei = null);
          }
          lizhi() {
            this._lizhi &&
              ((this.defen[this.player_id[this.lunban]] -= 1e3),
              this.lizhibang++,
              (this._lizhi = !1));
          }
          zimo(t) {
            this.lizhi(),
              (this.lunban = t.l),
              this.shoupai[t.l].zimo(this.shan.zimo(t.p), !1);
          }
          dapai(t) {
            (this.lunban = t.l),
              this.shoupai[t.l].dapai(t.p, !1),
              this.he[t.l].dapai(t.p),
              (this._lizhi = "*" == t.p.substr(-1));
          }
          fulou(t) {
            this.lizhi(),
              this.he[this.lunban].fulou(t.m),
              (this.lunban = t.l),
              this.shoupai[t.l].fulou(t.m, !1);
          }
          gang(t) {
            (this.lunban = t.l), this.shoupai[t.l].gang(t.m, !1);
          }
          kaigang(t) {
            this.shan.kaigang(t.baopai);
          }
          hule(t) {
            let e = this.shoupai[t.l];
            if (
              (e.fromString(t.shoupai),
              null != t.baojia && e.dapai(e.get_dapai().pop()),
              this._fenpei)
            ) {
              (this.changbang = 0), (this.lizhibang = 0);
              for (let t = 0; t < 4; t++)
                this.defen[this.player_id[t]] += this._fenpei[t];
            }
            (this.shan.fubaopai = t.fubaopai), (this._fenpei = t.fenpei);
          }
          pingju(t) {
            t.name.match(/^三家和/) || this.lizhi();
            for (let e = 0; e < 4; e++)
              t.shoupai[e] && this.shoupai[e].fromString(t.shoupai[e]);
          }
          jieju(t) {
            for (let e = 0; e < 4; e++) this.defen[e] = t.defen[e];
            this.lunban = -1;
          }
        };
      },
      279: (t, e, i) => {
        "use strict";
        const n = {
          rule: i(568),
          Shoupai: i(325),
          Shan: i(500),
          He: i(66),
          Util: Object.assign(i(961), i(867)),
        };
        t.exports = class t {
          constructor(t, e, i, s) {
            (this._players = t),
              (this._callback = e || (() => {})),
              (this._rule = i || n.rule()),
              (this._model = {
                title: s || "電脳麻将\n" + new Date().toLocaleString(),
                player: ["私", "下家", "対面", "上家"],
                qijia: 0,
                zhuangfeng: 0,
                jushu: 0,
                changbang: 0,
                lizhibang: 0,
                defen: [0, 0, 0, 0].map((t) => this._rule["配給原点"]),
                shan: null,
                shoupai: [],
                he: [],
                player_id: [0, 1, 2, 3],
              }),
              this._view,
              this._status,
              (this._reply = []),
              (this._sync = !1),
              (this._stop = null),
              (this._speed = 3),
              (this._wait = 0),
              this._timeout_id,
              this._handler;
          }
          get model() {
            return this._model;
          }
          set view(t) {
            this._view = t;
          }
          get speed() {
            return this._speed;
          }
          set speed(t) {
            this._speed = t;
          }
          set wait(t) {
            this._wait = t;
          }
          set handler(t) {
            this._handler = t;
          }
          add_paipu(t) {
            this._paipu.log[this._paipu.log.length - 1].push(t);
          }
          delay(t, e) {
            if (this._sync) return t();
            (e =
              0 == this._speed
                ? 0
                : null == e
                ? Math.max(500, 200 * this._speed)
                : e),
              setTimeout(t, e);
          }
          stop(t = () => {}) {
            this._stop = t;
          }
          start() {
            this._timeout_id ||
              ((this._stop = null),
              (this._timeout_id = setTimeout(() => this.next(), 0)));
          }
          notify_players(t, e) {
            for (let t = 0; t < 4; t++) {
              let i = this._model.player_id[t];
              this._sync
                ? this._players[i].action(e[t])
                : setTimeout(() => {
                    this._players[i].action(e[t]);
                  }, 0);
            }
          }
          call_players(t, e, i) {
            (i = 0 == this._speed ? 0 : null == i ? 200 * this._speed : i),
              (this._status = t),
              (this._reply = []);
            for (let t = 0; t < 4; t++) {
              let i = this._model.player_id[t];
              this._sync
                ? this._players[i].action(e[t], (t) => this.reply(i, t))
                : setTimeout(() => {
                    this._players[i].action(e[t], (t) => this.reply(i, t));
                  }, 0);
            }
            this._sync || (this._timeout_id = setTimeout(() => this.next(), i));
          }
          reply(t, e) {
            (this._reply[t] = e || {}),
              this._sync ||
                this._reply.filter((t) => t).length < 4 ||
                this._timeout_id ||
                (this._timeout_id = setTimeout(() => this.next(), 0));
          }
          next() {
            if (
              ((this._timeout_id = clearTimeout(this._timeout_id)),
              !(this._reply.filter((t) => t).length < 4))
            )
              return this._stop
                ? this._stop()
                : void ("kaiju" == this._status
                    ? this.reply_kaiju()
                    : "qipai" == this._status
                    ? this.reply_qipai()
                    : "zimo" == this._status
                    ? this.reply_zimo()
                    : "dapai" == this._status
                    ? this.reply_dapai()
                    : "fulou" == this._status
                    ? this.reply_fulou()
                    : "gang" == this._status
                    ? this.reply_gang()
                    : "gangzimo" == this._status
                    ? this.reply_zimo()
                    : "hule" == this._status
                    ? this.reply_hule()
                    : "pingju" == this._status
                    ? this.reply_pingju()
                    : this._callback(this._paipu));
          }
          do_sync() {
            for (this._sync = !0, this.kaiju(); ; )
              if ("kaiju" == this._status) this.reply_kaiju();
              else if ("qipai" == this._status) this.reply_qipai();
              else if ("zimo" == this._status) this.reply_zimo();
              else if ("dapai" == this._status) this.reply_dapai();
              else if ("fulou" == this._status) this.reply_fulou();
              else if ("gang" == this._status) this.reply_gang();
              else if ("gangzimo" == this._status) this.reply_zimo();
              else if ("hule" == this._status) this.reply_hule();
              else {
                if ("pingju" != this._status) break;
                this.reply_pingju();
              }
            return this._callback(this._paipu), this;
          }
          kaiju(t) {
            (this._model.qijia = t ?? Math.floor(4 * Math.random())),
              (this._max_jushu =
                0 == this._rule["場数"] ? 0 : 4 * this._rule["場数"] - 1),
              (this._paipu = {
                title: this._model.title,
                player: this._model.player,
                qijia: this._model.qijia,
                log: [],
                defen: this._model.defen.concat(),
                point: [],
                rank: [],
              });
            let e = [];
            for (let t = 0; t < 4; t++)
              e[t] = JSON.parse(
                JSON.stringify({
                  kaiju: {
                    id: t,
                    rule: this._rule,
                    title: this._paipu.title,
                    player: this._paipu.player,
                    qijia: this._paipu.qijia,
                  },
                })
              );
            this.call_players("kaiju", e, 0), this._view && this._view.kaiju();
          }
          qipai(t) {
            let e = this._model;
            e.shan = t || new n.Shan(this._rule);
            for (let t = 0; t < 4; t++) {
              let i = [];
              for (let t = 0; t < 13; t++) i.push(e.shan.zimo());
              (e.shoupai[t] = new n.Shoupai(i)),
                (e.he[t] = new n.He()),
                (e.player_id[t] = (e.qijia + e.jushu + t) % 4);
            }
            (e.lunban = -1),
              (this._diyizimo = !0),
              (this._fengpai = this._rule["途中流局あり"]),
              (this._dapai = null),
              (this._gang = null),
              (this._lizhi = [0, 0, 0, 0]),
              (this._yifa = [0, 0, 0, 0]),
              (this._n_gang = [0, 0, 0, 0]),
              (this._neng_rong = [1, 1, 1, 1]),
              (this._hule = []),
              (this._hule_option = null),
              (this._no_game = !1),
              (this._lianzhuang = !1),
              (this._changbang = e.changbang),
              (this._fenpei = null),
              (this._paipu.defen = e.defen.concat()),
              this._paipu.log.push([]);
            let i = {
              qipai: {
                zhuangfeng: e.zhuangfeng,
                jushu: e.jushu,
                changbang: e.changbang,
                lizhibang: e.lizhibang,
                defen: e.player_id.map((t) => e.defen[t]),
                baopai: e.shan.baopai[0],
                shoupai: e.shoupai.map((t) => t.toString()),
              },
            };
            this.add_paipu(i);
            let s = [];
            for (let t = 0; t < 4; t++) {
              s[t] = JSON.parse(JSON.stringify(i));
              for (let e = 0; e < 4; e++)
                e != t && (s[t].qipai.shoupai[e] = "");
            }
            this.call_players("qipai", s, 0), this._view && this._view.redraw();
          }
          zimo() {
            let t = this._model;
            t.lunban = (t.lunban + 1) % 4;
            let e = t.shan.zimo();
            t.shoupai[t.lunban].zimo(e);
            let i = { zimo: { l: t.lunban, p: e } };
            this.add_paipu(i);
            let n = [];
            for (let e = 0; e < 4; e++)
              (n[e] = JSON.parse(JSON.stringify(i))),
                e != t.lunban && (n[e].zimo.p = "");
            this.call_players("zimo", n), this._view && this._view.update(i);
          }
          dapai(t) {
            let e = this._model;
            (this._yifa[e.lunban] = 0),
              e.shoupai[e.lunban].lizhi || (this._neng_rong[e.lunban] = !0),
              e.shoupai[e.lunban].dapai(t),
              e.he[e.lunban].dapai(t),
              this._diyizimo
                ? (t.match(/^z[1234]/) || (this._fengpai = !1),
                  this._dapai &&
                    this._dapai.substr(0, 2) != t.substr(0, 2) &&
                    (this._fengpai = !1))
                : (this._fengpai = !1),
              "*" == t.substr(-1) &&
                ((this._lizhi[e.lunban] = this._diyizimo ? 2 : 1),
                (this._yifa[e.lunban] = this._rule["一発あり"])),
              0 == n.Util.xiangting(e.shoupai[e.lunban]) &&
                n.Util.tingpai(e.shoupai[e.lunban]).find((t) =>
                  e.he[e.lunban].find(t)
                ) &&
                (this._neng_rong[e.lunban] = !1),
              (this._dapai = t);
            let i = { dapai: { l: e.lunban, p: t } };
            this.add_paipu(i), this._gang && this.kaigang();
            let s = [];
            for (let t = 0; t < 4; t++) s[t] = JSON.parse(JSON.stringify(i));
            this.call_players("dapai", s), this._view && this._view.update(i);
          }
          fulou(t) {
            let e = this._model;
            (this._diyizimo = !1),
              (this._yifa = [0, 0, 0, 0]),
              e.he[e.lunban].fulou(t);
            let i = t.match(/[\+\=\-]/);
            (e.lunban = (e.lunban + "_-=+".indexOf(i)) % 4),
              e.shoupai[e.lunban].fulou(t),
              t.match(/^[mpsz]\d{4}/) &&
                ((this._gang = t), this._n_gang[e.lunban]++);
            let n = { fulou: { l: e.lunban, m: t } };
            this.add_paipu(n);
            let s = [];
            for (let t = 0; t < 4; t++) s[t] = JSON.parse(JSON.stringify(n));
            this.call_players("fulou", s), this._view && this._view.update(n);
          }
          gang(t) {
            let e = this._model;
            e.shoupai[e.lunban].gang(t);
            let i = { gang: { l: e.lunban, m: t } };
            this.add_paipu(i),
              this._gang && this.kaigang(),
              (this._gang = t),
              this._n_gang[e.lunban]++;
            let n = [];
            for (let t = 0; t < 4; t++) n[t] = JSON.parse(JSON.stringify(i));
            this.call_players("gang", n), this._view && this._view.update(i);
          }
          gangzimo() {
            let t = this._model;
            (this._diyizimo = !1), (this._yifa = [0, 0, 0, 0]);
            let e = t.shan.gangzimo();
            t.shoupai[t.lunban].zimo(e);
            let i = { gangzimo: { l: t.lunban, p: e } };
            this.add_paipu(i),
              (this._rule["カンドラ後乗せ"] &&
                !this._gang.match(/^[mpsz]\d{4}$/)) ||
                this.kaigang();
            let n = [];
            for (let e = 0; e < 4; e++)
              (n[e] = JSON.parse(JSON.stringify(i))),
                e != t.lunban && (n[e].gangzimo.p = "");
            this.call_players("gangzimo", n),
              this._view && this._view.update(i);
          }
          kaigang() {
            if (((this._gang = null), !this._rule["カンドラあり"])) return;
            let t = this._model;
            t.shan.kaigang();
            let e = { kaigang: { baopai: t.shan.baopai.pop() } };
            this.add_paipu(e);
            let i = [];
            for (let t = 0; t < 4; t++) i[t] = JSON.parse(JSON.stringify(e));
            this.notify_players("kaigang", i),
              this._view && this._view.update(e);
          }
          hule() {
            let t = this._model;
            "hule" != this._status &&
              (t.shan.close(),
              (this._hule_option =
                "gang" == this._status
                  ? "qianggang"
                  : "gangzimo" == this._status
                  ? "lingshang"
                  : null));
            let e = this._hule.length ? this._hule.shift() : t.lunban,
              i =
                e == t.lunban
                  ? null
                  : ("qianggang" == this._hule_option
                      ? this._gang[0] + this._gang.substr(-1)
                      : this._dapai.substr(0, 2)) +
                    "_+=-"[(4 + t.lunban - e) % 4],
              s = t.shoupai[e].clone(),
              a = s.lizhi ? t.shan.fubaopai : null,
              o = {
                rule: this._rule,
                zhuangfeng: t.zhuangfeng,
                menfeng: e,
                hupai: {
                  lizhi: this._lizhi[e],
                  yifa: this._yifa[e],
                  qianggang: "qianggang" == this._hule_option,
                  lingshang: "lingshang" == this._hule_option,
                  haidi:
                    t.shan.paishu > 0 || "lingshang" == this._hule_option
                      ? 0
                      : i
                      ? 2
                      : 1,
                  tianhu: !this._diyizimo || i ? 0 : 0 == e ? 1 : 2,
                },
                baopai: t.shan.baopai,
                fubaopai: a,
                jicun: { changbang: t.changbang, lizhibang: t.lizhibang },
              },
              r = n.Util.hule(s, i, o);
            this._rule["連荘方式"] > 0 && 0 == e && (this._lianzhuang = !0),
              0 == this._rule["場数"] && (this._lianzhuang = !1),
              (this._fenpei = r.fenpei);
            let h = {
              hule: {
                l: e,
                shoupai: i ? s.zimo(i).toString() : s.toString(),
                baojia: i ? t.lunban : null,
                fubaopai: a,
                fu: r.fu,
                fanshu: r.fanshu,
                damanguan: r.damanguan,
                defen: r.defen,
                hupai: r.hupai,
                fenpei: r.fenpei,
              },
            };
            for (let t of ["fu", "fanshu", "damanguan"])
              h.hule[t] || delete h.hule[t];
            this.add_paipu(h);
            let l = [];
            for (let t = 0; t < 4; t++) l[t] = JSON.parse(JSON.stringify(h));
            this.call_players("hule", l, this._wait),
              this._view && this._view.update(h);
          }
          pingju(t, e = ["", "", "", ""]) {
            let i = this._model,
              s = [0, 0, 0, 0];
            if (t) (this._no_game = !0), (this._lianzhuang = !0);
            else {
              let a = 0;
              for (let t = 0; t < 4; t++)
                (!this._rule["ノーテン宣言あり"] ||
                  e[t] ||
                  i.shoupai[t].lizhi) &&
                  ((this._rule["ノーテン罰あり"] ||
                    (2 == this._rule["連荘方式"] && 0 == t) ||
                    i.shoupai[t].lizhi) &&
                  0 == n.Util.xiangting(i.shoupai[t]) &&
                  n.Util.tingpai(i.shoupai[t]).length > 0
                    ? (a++,
                      (e[t] = i.shoupai[t].toString()),
                      2 == this._rule["連荘方式"] &&
                        0 == t &&
                        (this._lianzhuang = !0))
                    : (e[t] = ""));
              if (this._rule["流し満貫あり"])
                for (let e = 0; e < 4; e++) {
                  let n = !0;
                  for (let t of i.he[e]._pai) {
                    if (t.match(/[\+\=\-]$/)) {
                      n = !1;
                      break;
                    }
                    if (!t.match(/^z/) && !t.match(/^[mps][19]/)) {
                      n = !1;
                      break;
                    }
                  }
                  if (n) {
                    t = "流し満貫";
                    for (let t = 0; t < 4; t++)
                      s[t] +=
                        0 == e && t == e
                          ? 12e3
                          : 0 == e
                          ? -4e3
                          : 0 != e && t == e
                          ? 8e3
                          : 0 != e && 0 == t
                          ? -4e3
                          : -2e3;
                  }
                }
              if (
                !t &&
                ((t = "荒牌平局"),
                this._rule["ノーテン罰あり"] && 0 < a && a < 4)
              )
                for (let t = 0; t < 4; t++)
                  s[t] = e[t] ? 3e3 / a : -3e3 / (4 - a);
              3 == this._rule["連荘方式"] && (this._lianzhuang = !0);
            }
            0 == this._rule["場数"] && (this._lianzhuang = !0),
              (this._fenpei = s);
            let a = { pingju: { name: t, shoupai: e, fenpei: s } };
            this.add_paipu(a);
            let o = [];
            for (let t = 0; t < 4; t++) o[t] = JSON.parse(JSON.stringify(a));
            this.call_players("pingju", o, this._wait),
              this._view && this._view.update(a);
          }
          last() {
            let t = this._model;
            (t.lunban = -1),
              this._view && this._view.update(),
              this._lianzhuang ||
                (t.jushu++,
                (t.zhuangfeng += (t.jushu / 4) | 0),
                (t.jushu = t.jushu % 4));
            let e = !1,
              i = -1;
            const n = t.defen;
            for (let s = 0; s < 4; s++) {
              let a = (t.qijia + s) % 4;
              n[a] < 0 && this._rule["トビ終了あり"] && (e = !0),
                n[a] >= 3e4 && (i < 0 || n[a] > n[i]) && (i = a);
            }
            let s = 4 * t.zhuangfeng + t.jushu;
            15 < s || 4 * (this._rule["場数"] + 1) - 1 < s
              ? (e = !0)
              : this._max_jushu < s
              ? 0 == this._rule["延長戦方式"] ||
                0 == this._rule["場数"] ||
                i >= 0
                ? (e = !0)
                : (this._max_jushu +=
                    3 == this._rule["延長戦方式"]
                      ? 4
                      : 2 == this._rule["延長戦方式"]
                      ? 1
                      : 0)
              : this._max_jushu == s &&
                this._rule["オーラス止めあり"] &&
                i == t.player_id[0] &&
                this._lianzhuang &&
                !this._no_game &&
                (e = !0),
              e
                ? this.delay(() => this.jieju(), 0)
                : this.delay(() => this.qipai(), 0);
          }
          jieju() {
            let t = this._model,
              e = [];
            const i = t.defen;
            for (let n = 0; n < 4; n++) {
              let s = (t.qijia + n) % 4;
              for (let t = 0; t < 4; t++)
                if (t == e.length || i[s] > i[e[t]]) {
                  e.splice(t, 0, s);
                  break;
                }
            }
            (i[e[0]] += 1e3 * t.lizhibang), (this._paipu.defen = i);
            let n = [0, 0, 0, 0];
            for (let t = 0; t < 4; t++) n[e[t]] = t + 1;
            this._paipu.rank = n;
            const s = !this._rule["順位点"].find((t) => t.match(/\.\d$/));
            let a = [0, 0, 0, 0];
            for (let t = 1; t < 4; t++) {
              let n = e[t];
              (a[n] = (i[n] - 3e4) / 1e3 + +this._rule["順位点"][t]),
                s && (a[n] = Math.round(a[n])),
                (a[e[0]] -= a[n]);
            }
            this._paipu.point = a.map((t) => t.toFixed(s ? 0 : 1));
            let o = { jieju: this._paipu },
              r = [];
            for (let t = 0; t < 4; t++) r[t] = JSON.parse(JSON.stringify(o));
            this.call_players("jieju", r, this._wait),
              this._view && this._view.summary(this._paipu),
              this._handler && this._handler();
          }
          get_reply(t) {
            let e = this._model;
            return this._reply[e.player_id[t]];
          }
          reply_kaiju() {
            this.delay(() => this.qipai(), 0);
          }
          reply_qipai() {
            this.delay(() => this.zimo(), 0);
          }
          reply_zimo() {
            let t = this._model,
              e = this.get_reply(t.lunban);
            if (e.daopai) {
              if (this.allow_pingju()) {
                let e = ["", "", "", ""];
                return (
                  (e[t.lunban] = t.shoupai[t.lunban].toString()),
                  this.delay(() => this.pingju("九種九牌", e), 0)
                );
              }
            } else if (e.hule) {
              if (this.allow_hule())
                return (
                  this._view && this._view.say("zimo", t.lunban),
                  this.delay(() => this.hule())
                );
            } else if (e.gang) {
              if (this.get_gang_mianzi().find((t) => t == e.gang))
                return (
                  this._view && this._view.say("gang", t.lunban),
                  this.delay(() => this.gang(e.gang))
                );
            } else if (e.dapai) {
              let i = e.dapai.replace(/\*$/, "");
              if (this.get_dapai().find((t) => t == i))
                return "*" == e.dapai.substr(-1) && this.allow_lizhi(i)
                  ? (this._view && this._view.say("lizhi", t.lunban),
                    this.delay(() => this.dapai(e.dapai)))
                  : this.delay(() => this.dapai(i), 0);
            }
            let i = this.get_dapai().pop();
            this.delay(() => this.dapai(i), 0);
          }
          reply_dapai() {
            let t = this._model;
            for (let e = 1; e < 4; e++) {
              let i = (t.lunban + e) % 4;
              if (this.get_reply(i).hule && this.allow_hule(i)) {
                if (1 == this._rule["最大同時和了数"] && this._hule.length)
                  continue;
                this._view && this._view.say("rong", i), this._hule.push(i);
              } else {
                let e = t.shoupai[i].clone().zimo(this._dapai);
                -1 == n.Util.xiangting(e) && (this._neng_rong[i] = !1);
              }
            }
            if (3 == this._hule.length && 2 == this._rule["最大同時和了数"]) {
              let e = ["", "", "", ""];
              for (let i of this._hule) e[i] = t.shoupai[i].toString();
              return this.delay(() => this.pingju("三家和", e));
            }
            if (this._hule.length) return this.delay(() => this.hule());
            if (
              "*" == this._dapai.substr(-1) &&
              ((t.defen[t.player_id[t.lunban]] -= 1e3),
              t.lizhibang++,
              4 == this._lizhi.filter((t) => t).length &&
                this._rule["途中流局あり"])
            ) {
              let e = t.shoupai.map((t) => t.toString());
              return this.delay(() => this.pingju("四家立直", e));
            }
            if (
              this._diyizimo &&
              3 == t.lunban &&
              ((this._diyizimo = !1), this._fengpai)
            )
              return this.delay(() => this.pingju("四風連打"), 0);
            if (
              4 == this._n_gang.reduce((t, e) => t + e) &&
              Math.max(...this._n_gang) < 4 &&
              this._rule["途中流局あり"]
            )
              return this.delay(() => this.pingju("四開槓"), 0);
            if (!t.shan.paishu) {
              let t = ["", "", "", ""];
              for (let e = 0; e < 4; e++) {
                let i = this.get_reply(e);
                i.daopai && (t[e] = i.daopai);
              }
              return this.delay(() => this.pingju("", t), 0);
            }
            for (let e = 1; e < 4; e++) {
              let i = (t.lunban + e) % 4,
                n = this.get_reply(i);
              if (n.fulou) {
                let t = n.fulou.replace(/0/g, "5");
                if (t.match(/^[mpsz](\d)\1\1\1/)) {
                  if (this.get_gang_mianzi(i).find((t) => t == n.fulou))
                    return (
                      this._view && this._view.say("gang", i),
                      this.delay(() => this.fulou(n.fulou))
                    );
                } else if (
                  t.match(/^[mpsz](\d)\1\1/) &&
                  this.get_peng_mianzi(i).find((t) => t == n.fulou)
                )
                  return (
                    this._view && this._view.say("peng", i),
                    this.delay(() => this.fulou(n.fulou))
                  );
              }
            }
            let e = (t.lunban + 1) % 4,
              i = this.get_reply(e);
            if (i.fulou && this.get_chi_mianzi(e).find((t) => t == i.fulou))
              return (
                this._view && this._view.say("chi", e),
                this.delay(() => this.fulou(i.fulou))
              );
            this.delay(() => this.zimo(), 0);
          }
          reply_fulou() {
            let t = this._model;
            if (this._gang) return this.delay(() => this.gangzimo(), 0);
            let e = this.get_reply(t.lunban);
            if (e.dapai && this.get_dapai().find((t) => t == e.dapai))
              return this.delay(() => this.dapai(e.dapai), 0);
            let i = this.get_dapai().pop();
            this.delay(() => this.dapai(i), 0);
          }
          reply_gang() {
            let t = this._model;
            if (this._gang.match(/^[mpsz]\d{4}$/))
              return this.delay(() => this.gangzimo(), 0);
            for (let e = 1; e < 4; e++) {
              let i = (t.lunban + e) % 4;
              if (this.get_reply(i).hule && this.allow_hule(i)) {
                if (1 == this._rule["最大同時和了数"] && this._hule.length)
                  continue;
                this._view && this._view.say("rong", i), this._hule.push(i);
              } else {
                let e = this._gang[0] + this._gang.substr(-1),
                  s = t.shoupai[i].clone().zimo(e);
                -1 == n.Util.xiangting(s) && (this._neng_rong[i] = !1);
              }
            }
            if (this._hule.length) return this.delay(() => this.hule());
            this.delay(() => this.gangzimo(), 0);
          }
          reply_hule() {
            let t = this._model;
            for (let e = 0; e < 4; e++)
              t.defen[t.player_id[e]] += this._fenpei[e];
            return (
              (t.changbang = 0),
              (t.lizhibang = 0),
              this._hule.length
                ? this.delay(() => this.hule())
                : (this._lianzhuang && (t.changbang = this._changbang + 1),
                  this.delay(() => this.last(), 0))
            );
          }
          reply_pingju() {
            let t = this._model;
            for (let e = 0; e < 4; e++)
              t.defen[t.player_id[e]] += this._fenpei[e];
            t.changbang++, this.delay(() => this.last(), 0);
          }
          get_dapai() {
            let e = this._model;
            return t.get_dapai(this._rule, e.shoupai[e.lunban]);
          }
          get_chi_mianzi(e) {
            let i = this._model,
              n = "_+=-"[(4 + i.lunban - e) % 4];
            return t.get_chi_mianzi(
              this._rule,
              i.shoupai[e],
              this._dapai + n,
              i.shan.paishu
            );
          }
          get_peng_mianzi(e) {
            let i = this._model,
              n = "_+=-"[(4 + i.lunban - e) % 4];
            return t.get_peng_mianzi(
              this._rule,
              i.shoupai[e],
              this._dapai + n,
              i.shan.paishu
            );
          }
          get_gang_mianzi(e) {
            let i = this._model;
            if (null == e)
              return t.get_gang_mianzi(
                this._rule,
                i.shoupai[i.lunban],
                null,
                i.shan.paishu,
                this._n_gang.reduce((t, e) => t + e)
              );
            {
              let n = "_+=-"[(4 + i.lunban - e) % 4];
              return t.get_gang_mianzi(
                this._rule,
                i.shoupai[e],
                this._dapai + n,
                i.shan.paishu,
                this._n_gang.reduce((t, e) => t + e)
              );
            }
          }
          allow_lizhi(e) {
            let i = this._model;
            return t.allow_lizhi(
              this._rule,
              i.shoupai[i.lunban],
              e,
              i.shan.paishu,
              i.defen[i.player_id[i.lunban]]
            );
          }
          allow_hule(e) {
            let i = this._model;
            if (null == e) {
              let e =
                i.shoupai[i.lunban].lizhi ||
                "gangzimo" == this._status ||
                0 == i.shan.paishu;
              return t.allow_hule(
                this._rule,
                i.shoupai[i.lunban],
                null,
                i.zhuangfeng,
                i.lunban,
                e
              );
            }
            {
              let n =
                  ("gang" == this._status
                    ? this._gang[0] + this._gang.substr(-1)
                    : this._dapai) + "_+=-"[(4 + i.lunban - e) % 4],
                s =
                  i.shoupai[e].lizhi ||
                  "gang" == this._status ||
                  0 == i.shan.paishu;
              return t.allow_hule(
                this._rule,
                i.shoupai[e],
                n,
                i.zhuangfeng,
                e,
                s,
                this._neng_rong[e]
              );
            }
          }
          allow_pingju() {
            let e = this._model;
            return t.allow_pingju(
              this._rule,
              e.shoupai[e.lunban],
              this._diyizimo
            );
          }
          static get_dapai(t, e) {
            if (0 == t["喰い替え許可レベル"]) return e.get_dapai(!0);
            if (1 == t["喰い替え許可レベル"] && e._zimo && e._zimo.length > 2) {
              let t = e._zimo[0] + (+e._zimo.match(/\d(?=[\+\=\-])/) || 5);
              return e.get_dapai(!1).filter((e) => e.replace(/0/, "5") != t);
            }
            return e.get_dapai(!1);
          }
          static get_chi_mianzi(t, e, i, n) {
            let s = e.get_chi_mianzi(i, 0 == t["喰い替え許可レベル"]);
            return s
              ? (1 == t["喰い替え許可レベル"] &&
                  3 == e._fulou.length &&
                  2 == e._bingpai[i[0]][i[1]] &&
                  (s = []),
                0 == n ? [] : s)
              : s;
          }
          static get_peng_mianzi(t, e, i, n) {
            let s = e.get_peng_mianzi(i);
            return s && 0 == n ? [] : s;
          }
          static get_gang_mianzi(t, e, i, s, a) {
            let o = e.get_gang_mianzi(i);
            if (!o || 0 == o.length) return o;
            if (e.lizhi) {
              if (0 == t["リーチ後暗槓許可レベル"]) return [];
              if (1 == t["リーチ後暗槓許可レベル"]) {
                let t,
                  i = 0,
                  s = 0;
                t = e.clone().dapai(e._zimo);
                for (let e of n.Util.tingpai(t))
                  i += n.Util.hule_mianzi(t, e).length;
                t = e.clone().gang(o[0]);
                for (let e of n.Util.tingpai(t))
                  s += n.Util.hule_mianzi(t, e).length;
                if (i > s) return [];
              } else {
                let t;
                t = e.clone().dapai(e._zimo);
                let i = n.Util.tingpai(t).length;
                if (((t = e.clone().gang(o[0])), n.Util.xiangting(t) > 0))
                  return [];
                if (i > n.Util.tingpai(t).length) return [];
              }
            }
            return 0 == s || 4 == a ? [] : o;
          }
          static allow_lizhi(e, i, s, a, o) {
            if (!i._zimo) return !1;
            if (i.lizhi) return !1;
            if (!i.menqian) return !1;
            if (!e["ツモ番なしリーチあり"] && a < 4) return !1;
            if (e["トビ終了あり"] && o < 1e3) return !1;
            if (n.Util.xiangting(i) > 0) return !1;
            if (s) {
              let t = i.clone().dapai(s);
              return 0 == n.Util.xiangting(t) && n.Util.tingpai(t).length > 0;
            }
            {
              let s = [];
              for (let a of t.get_dapai(e, i)) {
                let t = i.clone().dapai(a);
                0 == n.Util.xiangting(t) &&
                  n.Util.tingpai(t).length > 0 &&
                  s.push(a);
              }
              return !!s.length && s;
            }
          }
          static allow_hule(t, e, i, s, a, o, r) {
            if (i && !r) return !1;
            let h = e.clone();
            if ((i && h.zimo(i), -1 != n.Util.xiangting(h))) return !1;
            if (o) return !0;
            let l = {
              rule: t,
              zhuangfeng: s,
              menfeng: a,
              hupai: {},
              baopai: [],
              jicun: { changbang: 0, lizhibang: 0 },
            };
            return null != n.Util.hule(e, i, l).hupai;
          }
          static allow_pingju(t, e, i) {
            if (!i || !e._zimo) return !1;
            if (!t["途中流局あり"]) return !1;
            let n = 0;
            for (let t of ["m", "p", "s", "z"]) {
              let i = e._bingpai[t],
                s = "z" == t ? [1, 2, 3, 4, 5, 6, 7] : [1, 9];
              for (let t of s) i[t] > 0 && n++;
            }
            return n >= 9;
          }
          static allow_no_daopai(t, e, i) {
            return (
              !(i > 0 || e._zimo) &&
              !!t["ノーテン宣言あり"] &&
              !e.lizhi &&
              0 == n.Util.xiangting(e) &&
              n.Util.tingpai(e).length > 0
            );
          }
        };
      },
      66: (t, e, i) => {
        "use strict";
        const n = { Shoupai: i(325) };
        t.exports = class {
          constructor() {
            (this._pai = []), (this._find = {});
          }
          dapai(t) {
            if (!n.Shoupai.valid_pai(t)) throw new Error(t);
            return (
              this._pai.push(t.replace(/[\+\=\-]$/, "")),
              (this._find[t[0] + (+t[1] || 5)] = !0),
              this
            );
          }
          fulou(t) {
            if (!n.Shoupai.valid_mianzi(t)) throw new Error(t);
            let e = t[0] + t.match(/\d(?=[\+\=\-])/),
              i = t.match(/[\+\=\-]/);
            if (!i) throw new Error(t);
            if (this._pai[this._pai.length - 1].substr(0, 2) != e)
              throw new Error(t);
            return (this._pai[this._pai.length - 1] += i), this;
          }
          find(t) {
            return this._find[t[0] + (+t[1] || 5)];
          }
        };
      },
      867: (t, e, i) => {
        "use strict";
        const n = { Shan: i(500), rule: i(568) };
        function s(t, e, i = 1) {
          if (i > 9) return [[]];
          if (0 == e[i]) return s(t, e, i + 1);
          let n = [];
          if (i <= 7 && e[i] > 0 && e[i + 1] > 0 && e[i + 2] > 0) {
            e[i]--,
              e[i + 1]--,
              e[i + 2]--,
              (n = s(t, e, i)),
              e[i]++,
              e[i + 1]++,
              e[i + 2]++;
            for (let e of n) e.unshift(t + i + (i + 1) + (i + 2));
          }
          let a = [];
          if (3 == e[i]) {
            (e[i] -= 3), (a = s(t, e, i + 1)), (e[i] += 3);
            for (let e of a) e.unshift(t + i + i + i);
          }
          return n.concat(a);
        }
        function a(t) {
          let e = [[]];
          for (let i of ["m", "p", "s"]) {
            let n = [];
            for (let a of e)
              for (let e of s(i, t._bingpai[i])) n.push(a.concat(e));
            e = n;
          }
          let i = [];
          for (let e = 1; e <= 7; e++)
            if (0 != t._bingpai.z[e]) {
              if (3 != t._bingpai.z[e]) return [];
              i.push("z" + e + e + e);
            }
          let n = t._fulou.map((t) => t.replace(/0/g, "5"));
          return e.map((t) => t.concat(i).concat(n));
        }
        function o(t, e) {
          let [i, n, s] = e,
            a = new RegExp(`^(${i}.*${n})`),
            o = `$1${s}!`,
            r = [];
          for (let e = 0; e < t.length; e++) {
            if (t[e].match(/[\+\=\-]|\d{4}/)) continue;
            if (e > 0 && t[e] == t[e - 1]) continue;
            let i = t[e].replace(a, o);
            if (i == t[e]) continue;
            let n = t.concat();
            (n[e] = i), r.push(n);
          }
          return r;
        }
        function r(t, e) {
          let i = t.clone();
          if ((e && i.zimo(e), !i._zimo || i._zimo.length > 2)) return [];
          let n = (e || i._zimo + "_").replace(/0/, "5");
          return []
            .concat(
              (function (t, e) {
                let i = [];
                for (let n of ["m", "p", "s", "z"]) {
                  let s = t._bingpai[n];
                  for (let r = 1; r < s.length; r++) {
                    if (s[r] < 2) continue;
                    s[r] -= 2;
                    let h = n + r + r;
                    for (let n of a(t))
                      n.unshift(h), 5 == n.length && (i = i.concat(o(n, e)));
                    s[r] += 2;
                  }
                }
                return i;
              })(i, n)
            )
            .concat(
              (function (t, e) {
                if (t._fulou.length > 0) return [];
                let i = [];
                for (let n of ["m", "p", "s", "z"]) {
                  let s = t._bingpai[n];
                  for (let t = 1; t < s.length; t++)
                    if (0 != s[t]) {
                      if (2 != s[t]) return [];
                      {
                        let s =
                          n + t == e.substr(0, 2)
                            ? n + t + t + e[2] + "!"
                            : n + t + t;
                        i.push(s);
                      }
                    }
                }
                return 7 == i.length ? [i] : [];
              })(i, n)
            )
            .concat(
              (function (t, e) {
                if (t._fulou.length > 0) return [];
                let i = [],
                  n = 0;
                for (let s of ["m", "p", "s", "z"]) {
                  let a = t._bingpai[s],
                    o = "z" == s ? [1, 2, 3, 4, 5, 6, 7] : [1, 9];
                  for (let t of o)
                    if (2 == a[t]) {
                      let a =
                        s + t == e.substr(0, 2)
                          ? s + t + t + e[2] + "!"
                          : s + t + t;
                      i.unshift(a), n++;
                    } else {
                      if (1 != a[t]) return [];
                      {
                        let n =
                          s + t == e.substr(0, 2) ? s + t + e[2] + "!" : s + t;
                        i.push(n);
                      }
                    }
                }
                return 1 == n ? [i] : [];
              })(i, n)
            )
            .concat(
              (function (t, e) {
                if (t._fulou.length > 0) return [];
                let i = e[0];
                if ("z" == i) return [];
                let n = i,
                  s = t._bingpai[i];
                for (let t = 1; t <= 9; t++) {
                  if (0 == s[t]) return [];
                  if ((1 == t || 9 == t) && s[t] < 3) return [];
                  let i = t == e[1] ? s[t] - 1 : s[t];
                  for (let e = 0; e < i; e++) n += t;
                }
                return 14 != n.length ? [] : ((n += e.substr(1) + "!"), [[n]]);
              })(i, n)
            );
        }
        function h(t, e, i, n) {
          const s = new RegExp(`^z${e + 1}.*$`),
            a = new RegExp(`^z${i + 1}.*$`),
            o = /^z[567].*$/,
            r = /^.*[z19].*$/,
            h = /^z.*$/,
            l = /^[mpsz](\d)\1\1.*$/,
            u = /^[mpsz](\d)\1\1(?:\1|_\!)?$/,
            p = /^[mpsz](\d)\1\1.*\1.*$/,
            c = /^[mpsz](\d)\1[\+\=\-\_]\!$/,
            f = /^[mps]\d\d[\+\=\-\_]\!\d$/,
            d = /^[mps](123[\+\=\-\_]\!|7[\+\=\-\_]\!89)$/;
          let g = {
            fu: 20,
            menqian: !0,
            zimo: !0,
            shunzi: {
              m: [0, 0, 0, 0, 0, 0, 0, 0],
              p: [0, 0, 0, 0, 0, 0, 0, 0],
              s: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            kezi: {
              m: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              p: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              s: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              z: [0, 0, 0, 0, 0, 0, 0, 0],
            },
            n_shunzi: 0,
            n_kezi: 0,
            n_ankezi: 0,
            n_gangzi: 0,
            n_yaojiu: 0,
            n_zipai: 0,
            danqi: !1,
            pinghu: !1,
            zhuangfeng: e,
            menfeng: i,
          };
          for (let e of t)
            if (
              (e.match(/[\+\=\-](?!\!)/) && (g.menqian = !1),
              e.match(/[\+\=\-]\!/) && (g.zimo = !1),
              1 != t.length &&
                (e.match(c) && (g.danqi = !0),
                13 != t.length &&
                  (e.match(r) && g.n_yaojiu++,
                  e.match(h) && g.n_zipai++,
                  5 == t.length)))
            )
              if (e == t[0]) {
                let t = 0;
                e.match(s) && (t += 2),
                  e.match(a) && (t += 2),
                  e.match(o) && (t += 2),
                  (t = n["連風牌は2符"] && t > 2 ? 2 : t),
                  (g.fu += t),
                  g.danqi && (g.fu += 2);
              } else if (e.match(l)) {
                g.n_kezi++;
                let t = 2;
                e.match(r) && (t *= 2),
                  e.match(u) && ((t *= 2), g.n_ankezi++),
                  e.match(p) && ((t *= 4), g.n_gangzi++),
                  (g.fu += t),
                  g.kezi[e[0]][e[1]]++;
              } else
                g.n_shunzi++,
                  e.match(f) && (g.fu += 2),
                  e.match(d) && (g.fu += 2),
                  g.shunzi[e[0]][e[1]]++;
          return (
            7 == t.length
              ? (g.fu = 25)
              : 5 == t.length &&
                ((g.pinghu = g.menqian && 20 == g.fu),
                g.zimo
                  ? g.pinghu || (g.fu += 2)
                  : g.menqian
                  ? (g.fu += 10)
                  : 20 == g.fu && (g.fu = 30),
                (g.fu = 10 * Math.ceil(g.fu / 10))),
            g
          );
        }
        function l(t, e, i, n, s) {
          let a = i.length > 0 && "*" == i[0].fanshu[0] ? i : [];
          a = a
            .concat(
              13 != t.length
                ? []
                : e.danqi
                ? [{ name: "国士無双十三面", fanshu: "**" }]
                : [{ name: "国士無双", fanshu: "*" }]
            )
            .concat(
              4 != e.n_ankezi
                ? []
                : e.danqi
                ? [{ name: "四暗刻単騎", fanshu: "**" }]
                : [{ name: "四暗刻", fanshu: "*" }]
            )
            .concat(
              (function () {
                const i = e.kezi;
                if (i.z[5] + i.z[6] + i.z[7] == 3) {
                  let e = t.filter((t) =>
                      t.match(/^z([567])\1\1(?:[\+\=\-]|\1)(?!\!)/)
                    ),
                    i = e[2] && e[2].match(/[\+\=\-]/);
                  return i
                    ? [{ name: "大三元", fanshu: "*", baojia: i[0] }]
                    : [{ name: "大三元", fanshu: "*" }];
                }
                return [];
              })()
            )
            .concat(
              (function () {
                const i = e.kezi;
                if (i.z[1] + i.z[2] + i.z[3] + i.z[4] == 4) {
                  let e = t.filter((t) =>
                      t.match(/^z([1234])\1\1(?:[\+\=\-]|\1)(?!\!)/)
                    ),
                    i = e[3] && e[3].match(/[\+\=\-]/);
                  return i
                    ? [{ name: "大四喜", fanshu: "**", baojia: i[0] }]
                    : [{ name: "大四喜", fanshu: "**" }];
                }
                return i.z[1] + i.z[2] + i.z[3] + i.z[4] == 3 &&
                  t[0].match(/^z[1234]/)
                  ? [{ name: "小四喜", fanshu: "*" }]
                  : [];
              })()
            )
            .concat(
              e.n_zipai == t.length ? [{ name: "字一色", fanshu: "*" }] : []
            )
            .concat(
              t.filter((t) => t.match(/^[mp]/)).length > 0 ||
                t.filter((t) => t.match(/^z[^6]/)).length > 0 ||
                t.filter((t) => t.match(/^s.*[1579]/)).length > 0
                ? []
                : [{ name: "緑一色", fanshu: "*" }]
            )
            .concat(
              5 == e.n_yaojiu && 4 == e.n_kezi && 0 == e.n_zipai
                ? [{ name: "清老頭", fanshu: "*" }]
                : []
            )
            .concat(4 == e.n_gangzi ? [{ name: "四槓子", fanshu: "*" }] : [])
            .concat(
              1 != t.length
                ? []
                : t[0].match(/^[mpsz]1112345678999/)
                ? [{ name: "純正九蓮宝燈", fanshu: "**" }]
                : [{ name: "九蓮宝燈", fanshu: "*" }]
            );
          for (let t of a)
            s["ダブル役満あり"] || (t.fanshu = "*"),
              s["役満パオあり"] || delete t.baojia;
          if (a.length > 0) return a;
          let o = i
            .concat(
              e.menqian && e.zimo ? [{ name: "門前清自摸和", fanshu: 1 }] : []
            )
            .concat(
              (function () {
                let t = ["東", "南", "西", "北"],
                  i = [];
                return (
                  e.kezi.z[e.zhuangfeng + 1] &&
                    i.push({ name: "場風 " + t[e.zhuangfeng], fanshu: 1 }),
                  e.kezi.z[e.menfeng + 1] &&
                    i.push({ name: "自風 " + t[e.menfeng], fanshu: 1 }),
                  e.kezi.z[5] && i.push({ name: "翻牌 白", fanshu: 1 }),
                  e.kezi.z[6] && i.push({ name: "翻牌 發", fanshu: 1 }),
                  e.kezi.z[7] && i.push({ name: "翻牌 中", fanshu: 1 }),
                  i
                );
              })()
            )
            .concat(e.pinghu ? [{ name: "平和", fanshu: 1 }] : [])
            .concat(
              e.n_yaojiu > 0
                ? []
                : s["クイタンあり"] || e.menqian
                ? [{ name: "断幺九", fanshu: 1 }]
                : []
            )
            .concat(
              (function () {
                if (!e.menqian) return [];
                const t = e.shunzi;
                return 1 ==
                  t.m
                    .concat(t.p)
                    .concat(t.s)
                    .map((t) => t >> 1)
                    .reduce((t, e) => t + e)
                  ? [{ name: "一盃口", fanshu: 1 }]
                  : [];
              })()
            )
            .concat(
              (function () {
                const t = e.shunzi;
                for (let i = 1; i <= 7; i++)
                  if (t.m[i] && t.p[i] && t.s[i])
                    return [{ name: "三色同順", fanshu: e.menqian ? 2 : 1 }];
                return [];
              })()
            )
            .concat(
              (function () {
                const t = e.shunzi;
                for (let i of ["m", "p", "s"])
                  if (t[i][1] && t[i][4] && t[i][7])
                    return [{ name: "一気通貫", fanshu: e.menqian ? 2 : 1 }];
                return [];
              })()
            )
            .concat(
              5 == e.n_yaojiu && e.n_shunzi > 0 && e.n_zipai > 0
                ? [{ name: "混全帯幺九", fanshu: e.menqian ? 2 : 1 }]
                : []
            )
            .concat(7 == t.length ? [{ name: "七対子", fanshu: 2 }] : [])
            .concat(4 == e.n_kezi ? [{ name: "対々和", fanshu: 2 }] : [])
            .concat(3 == e.n_ankezi ? [{ name: "三暗刻", fanshu: 2 }] : [])
            .concat(3 == e.n_gangzi ? [{ name: "三槓子", fanshu: 2 }] : [])
            .concat(
              (function () {
                const t = e.kezi;
                for (let e = 1; e <= 9; e++)
                  if (t.m[e] && t.p[e] && t.s[e])
                    return [{ name: "三色同刻", fanshu: 2 }];
                return [];
              })()
            )
            .concat(
              e.n_yaojiu == t.length && 0 == e.n_shunzi && e.n_zipai > 0
                ? [{ name: "混老頭", fanshu: 2 }]
                : []
            )
            .concat(
              (function () {
                const i = e.kezi;
                return i.z[5] + i.z[6] + i.z[7] == 2 && t[0].match(/^z[567]/)
                  ? [{ name: "小三元", fanshu: 2 }]
                  : [];
              })()
            )
            .concat(
              (function () {
                for (let i of ["m", "p", "s"]) {
                  const n = new RegExp(`^[z${i}]`);
                  if (
                    t.filter((t) => t.match(n)).length == t.length &&
                    e.n_zipai > 0
                  )
                    return [{ name: "混一色", fanshu: e.menqian ? 3 : 2 }];
                }
                return [];
              })()
            )
            .concat(
              5 == e.n_yaojiu && e.n_shunzi > 0 && 0 == e.n_zipai
                ? [{ name: "純全帯幺九", fanshu: e.menqian ? 3 : 2 }]
                : []
            )
            .concat(
              (function () {
                if (!e.menqian) return [];
                const t = e.shunzi;
                return 2 ==
                  t.m
                    .concat(t.p)
                    .concat(t.s)
                    .map((t) => t >> 1)
                    .reduce((t, e) => t + e)
                  ? [{ name: "二盃口", fanshu: 3 }]
                  : [];
              })()
            )
            .concat(
              (function () {
                for (let i of ["m", "p", "s"]) {
                  const n = new RegExp(`^[${i}]`);
                  if (t.filter((t) => t.match(n)).length == t.length)
                    return [{ name: "清一色", fanshu: e.menqian ? 6 : 5 }];
                }
                return [];
              })()
            );
          return o.length > 0 && (o = o.concat(n)), o;
        }
        function u(t, e, i, n) {
          if (0 == e.length) return { defen: 0 };
          let s,
            a,
            o,
            r,
            h,
            l,
            u,
            p,
            c = n.menfeng;
          if ("*" == e[0].fanshu[0]) {
            (t = void 0),
              (a = n.rule["役満の複合あり"]
                ? e.map((t) => t.fanshu.length).reduce((t, e) => t + e)
                : 1),
              (r = 8e3 * a);
            let i = e.find((t) => t.baojia);
            i &&
              ((p = (c + { "+": 1, "=": 2, "-": 3 }[i.baojia]) % 4),
              (u = 8e3 * Math.min(i.fanshu.length, a)));
          } else
            (s = e.map((t) => t.fanshu).reduce((t, e) => t + e)),
              (r =
                s >= 13 && n.rule["数え役満あり"]
                  ? 8e3
                  : s >= 11
                  ? 6e3
                  : s >= 8
                  ? 4e3
                  : s >= 6
                  ? 3e3
                  : n.rule["切り上げ満貫あり"] && t << (2 + s) == 1920
                  ? 2e3
                  : Math.min(t << (2 + s), 2e3));
          let f = [0, 0, 0, 0],
            d = n.jicun.changbang,
            g = n.jicun.lizhibang;
          if (
            (null != p
              ? (i && (u /= 2),
                (r -= u),
                (l = u * (0 == c ? 6 : 4)),
                (f[c] += l),
                (f[p] -= l))
              : (l = 0),
            i || 0 == r)
          )
            (h = 0 == r ? p : (c + { "+": 1, "=": 2, "-": 3 }[i[2]]) % 4),
              (o = 100 * Math.ceil((r * (0 == c ? 6 : 4)) / 100)),
              (f[c] += o + 300 * d + 1e3 * g),
              (f[h] -= o + 300 * d);
          else {
            let t = 100 * Math.ceil((2 * r) / 100),
              e = 100 * Math.ceil(r / 100);
            if (0 == c) {
              o = 3 * t;
              for (let e = 0; e < 4; e++)
                e == c
                  ? (f[e] += o + 300 * d + 1e3 * g)
                  : (f[e] -= t + 100 * d);
            } else {
              o = t + 2 * e;
              for (let i = 0; i < 4; i++)
                i == c
                  ? (f[i] += o + 300 * d + 1e3 * g)
                  : (f[i] -= 0 == i ? t + 100 * d : e + 100 * d);
            }
          }
          return {
            hupai: e,
            fu: t,
            fanshu: s,
            damanguan: a,
            defen: o + l,
            fenpei: f,
          };
        }
        t.exports = {
          hule: function (t, e, i) {
            if (e) {
              if (!e.match(/[\+\=\-]$/)) throw new Error(e);
              e = e.substr(0, 2) + e.substr(-1);
            }
            let s,
              a = (function (t) {
                let e = [];
                return (
                  1 == t.lizhi && e.push({ name: "立直", fanshu: 1 }),
                  2 == t.lizhi && e.push({ name: "ダブル立直", fanshu: 2 }),
                  t.yifa && e.push({ name: "一発", fanshu: 1 }),
                  1 == t.haidi && e.push({ name: "海底摸月", fanshu: 1 }),
                  2 == t.haidi && e.push({ name: "河底撈魚", fanshu: 1 }),
                  t.lingshang && e.push({ name: "嶺上開花", fanshu: 1 }),
                  t.qianggang && e.push({ name: "槍槓", fanshu: 1 }),
                  1 == t.tianhu && (e = [{ name: "天和", fanshu: "*" }]),
                  2 == t.tianhu && (e = [{ name: "地和", fanshu: "*" }]),
                  e
                );
              })(i.hupai),
              o = (function (t, e, i, s) {
                let a = t.clone();
                e && a.zimo(e);
                let o = a.toString(),
                  r = [],
                  h = o.match(/[mpsz][^mpsz,]*/g),
                  l = 0;
                for (let t of i) {
                  t = n.Shan.zhenbaopai(t);
                  const e = new RegExp(t[1], "g");
                  for (let i of h) {
                    if (i[0] != t[0]) continue;
                    i = i.replace(/0/, "5");
                    let n = i.match(e);
                    n && (l += n.length);
                  }
                }
                l && r.push({ name: "ドラ", fanshu: l });
                let u = 0,
                  p = o.match(/0/g);
                p && (u = p.length), u && r.push({ name: "赤ドラ", fanshu: u });
                let c = 0;
                for (let t of s || []) {
                  t = n.Shan.zhenbaopai(t);
                  const e = new RegExp(t[1], "g");
                  for (let i of h) {
                    if (i[0] != t[0]) continue;
                    i = i.replace(/0/, "5");
                    let n = i.match(e);
                    n && (c += n.length);
                  }
                }
                return c && r.push({ name: "裏ドラ", fanshu: c }), r;
              })(t, e, i.baopai, i.fubaopai);
            for (let n of r(t, e)) {
              let t = h(n, i.zhuangfeng, i.menfeng, i.rule),
                r = l(n, t, a, o, i.rule),
                p = u(t.fu, r, e, i);
              (!s ||
                p.defen > s.defen ||
                (p.defen == s.defen &&
                  (!p.fanshu ||
                    p.fanshu > s.fanshu ||
                    (p.fanshu == s.fanshu && p.fu > s.fu)))) &&
                (s = p);
            }
            return s;
          },
          hule_param: function (t = {}) {
            return {
              rule: t.rule ?? n.rule(),
              zhuangfeng: t.zhuangfeng ?? 0,
              menfeng: t.menfeng ?? 1,
              hupai: {
                lizhi: t.lizhi ?? 0,
                yifa: t.yifa ?? !1,
                qianggang: t.qianggang ?? !1,
                lingshang: t.lingshang ?? !1,
                haidi: t.haidi ?? 0,
                tianhu: t.tianhu ?? 0,
              },
              baopai: t.baopai ? [].concat(t.baopai) : [],
              fubaopai: t.fubaopai ? [].concat(t.fubaopai) : null,
              jicun: {
                changbang: t.changbang ?? 0,
                lizhibang: t.lizhibang ?? 0,
              },
            };
          },
          hule_mianzi: r,
        };
      },
      384: (t, e, i) => {
        "use strict";
        /*!
         *  @kobalab/majiang-core v1.1.0
         *
         *  Copyright(C) 2021 Satoshi Kobayashi
         *  Released under the MIT license
         *  https://github.com/kobalab/majiang-core/blob/master/LICENSE
         */ t.exports = {
          rule: i(568),
          Shoupai: i(325),
          Shan: i(500),
          He: i(66),
          Board: i(471),
          Game: i(279),
          Player: i(889),
          Util: Object.assign(i(961), i(867)),
        };
      },
      889: (t, e, i) => {
        "use strict";
        const n = {
          Shoupai: i(325),
          He: i(66),
          Game: i(279),
          Board: i(471),
          Util: Object.assign(i(961), i(867)),
        };
        t.exports = class {
          constructor() {
            this._model = new n.Board();
          }
          action(t, e) {
            (this._callback = e),
              t.kaiju
                ? this.kaiju(t.kaiju)
                : t.qipai
                ? this.qipai(t.qipai)
                : t.zimo
                ? this.zimo(t.zimo)
                : t.dapai
                ? this.dapai(t.dapai)
                : t.fulou
                ? this.fulou(t.fulou)
                : t.gang
                ? this.gang(t.gang)
                : t.gangzimo
                ? this.zimo(t.gangzimo, !0)
                : t.kaigang
                ? this.kaigang(t.kaigang)
                : t.hule
                ? this.hule(t.hule)
                : t.pingju
                ? this.pingju(t.pingju)
                : t.jieju && this.jieju(t.jieju);
          }
          get shoupai() {
            return this._model.shoupai[this._menfeng];
          }
          get he() {
            return this._model.he[this._menfeng];
          }
          get shan() {
            return this._model.shan;
          }
          get hulepai() {
            return (
              (0 == n.Util.xiangting(this.shoupai) &&
                n.Util.tingpai(this.shoupai)) ||
              []
            );
          }
          kaiju(t) {
            (this._id = t.id),
              (this._rule = t.rule),
              this._model.kaiju(t),
              this._callback && this.action_kaiju(t);
          }
          qipai(t) {
            this._model.qipai(t),
              (this._menfeng = this._model.menfeng(this._id)),
              (this._diyizimo = !0),
              (this._n_gang = 0),
              (this._neng_rong = !0),
              this._callback && this.action_qipai(t);
          }
          zimo(t, e) {
            this._model.zimo(t),
              e && this._n_gang++,
              this._callback && this.action_zimo(t, e);
          }
          dapai(t) {
            if (
              (t.l == this._menfeng &&
                (this.shoupai.lizhi || (this._neng_rong = !0)),
              this._model.dapai(t),
              this._callback && this.action_dapai(t),
              t.l == this._menfeng)
            )
              (this._diyizimo = !1),
                this.hulepai.find((t) => this.he.find(t)) &&
                  (this._neng_rong = !1);
            else {
              let e = t.p[0],
                i = +t.p[1] || 5;
              this.hulepai.find((t) => t == e + i) && (this._neng_rong = !1);
            }
          }
          fulou(t) {
            this._model.fulou(t),
              this._callback && this.action_fulou(t),
              (this._diyizimo = !1);
          }
          gang(t) {
            if (
              (this._model.gang(t),
              this._callback && this.action_gang(t),
              (this._diyizimo = !1),
              t.l != this._menfeng && !t.m.match(/^[mpsz]\d{4}$/))
            ) {
              let e = t.m[0],
                i = +t.m.substr(-1) || 5;
              this.hulepai.find((t) => t == e + i) && (this._neng_rong = !1);
            }
          }
          kaigang(t) {
            this._model.kaigang(t);
          }
          hule(t) {
            this._model.hule(t), this._callback && this.action_hule(t);
          }
          pingju(t) {
            this._model.pingju(t), this._callback && this.action_pingju(t);
          }
          jieju(t) {
            this._model.jieju(t),
              (this._paipu = t),
              this._callback && this.action_jieju(t);
          }
          get_dapai(t) {
            return n.Game.get_dapai(this._rule, t);
          }
          get_chi_mianzi(t, e) {
            return n.Game.get_chi_mianzi(this._rule, t, e, this.shan.paishu);
          }
          get_peng_mianzi(t, e) {
            return n.Game.get_peng_mianzi(this._rule, t, e, this.shan.paishu);
          }
          get_gang_mianzi(t, e) {
            return n.Game.get_gang_mianzi(
              this._rule,
              t,
              e,
              this.shan.paishu,
              this._n_gang
            );
          }
          allow_lizhi(t, e) {
            return n.Game.allow_lizhi(
              this._rule,
              t,
              e,
              this.shan.paishu,
              this._model.defen[this._id]
            );
          }
          allow_hule(t, e, i) {
            return (
              (i = i || t.lizhi || 0 == this.shan.paishu),
              n.Game.allow_hule(
                this._rule,
                t,
                e,
                this._model.zhuangfeng,
                this._menfeng,
                i,
                this._neng_rong
              )
            );
          }
          allow_pingju(t) {
            return n.Game.allow_pingju(this._rule, t, this._diyizimo);
          }
          allow_no_daopai(t) {
            return n.Game.allow_no_daopai(this._rule, t, this.shan.paishu);
          }
        };
      },
      568: (t) => {
        "use strict";
        t.exports = function (t = {}) {
          let e = {
            配給原点: 25e3,
            順位点: ["20.0", "10.0", "-10.0", "-20.0"],
            連風牌は2符: !1,
            赤牌: { m: 1, p: 1, s: 1 },
            クイタンあり: !0,
            喰い替え許可レベル: 0,
            場数: 2,
            途中流局あり: !0,
            流し満貫あり: !0,
            ノーテン宣言あり: !1,
            ノーテン罰あり: !0,
            最大同時和了数: 2,
            連荘方式: 2,
            トビ終了あり: !0,
            オーラス止めあり: !0,
            延長戦方式: 1,
            一発あり: !0,
            裏ドラあり: !0,
            カンドラあり: !0,
            カン裏あり: !0,
            カンドラ後乗せ: !0,
            ツモ番なしリーチあり: !1,
            リーチ後暗槓許可レベル: 2,
            役満の複合あり: !0,
            ダブル役満あり: !0,
            数え役満あり: !0,
            役満パオあり: !0,
            切り上げ満貫あり: !1,
          };
          for (let i of Object.keys(t)) e[i] = t[i];
          return e;
        };
      },
      500: (t, e, i) => {
        "use strict";
        const n = { Shoupai: i(325) };
        t.exports = class {
          static zhenbaopai(t) {
            if (!n.Shoupai.valid_pai(t)) throw new Error(t);
            let e = t[0],
              i = +t[1] || 5;
            return "z" == e
              ? i < 5
                ? e + ((i % 4) + 1)
                : e + (((i - 4) % 3) + 5)
              : e + ((i % 9) + 1);
          }
          constructor(t) {
            this._rule = t;
            let e = t["赤牌"],
              i = [];
            for (let t of ["m", "p", "s", "z"])
              for (let n = 1; n <= ("z" == t ? 7 : 9); n++)
                for (let s = 0; s < 4; s++)
                  5 == n && s < e[t] ? i.push(t + 0) : i.push(t + n);
            for (this._pai = []; i.length; )
              this._pai.push(i.splice(Math.random() * i.length, 1)[0]);
            (this._baopai = [this._pai[4]]),
              (this._fubaopai = t["裏ドラあり"] ? [this._pai[9]] : null),
              (this._weikaigang = !1),
              (this._closed = !1);
          }
          zimo() {
            if (this._closed) throw new Error(this);
            if (0 == this.paishu) throw new Error(this);
            if (this._weikaigang) throw new Error(this);
            return this._pai.pop();
          }
          gangzimo() {
            if (this._closed) throw new Error(this);
            if (0 == this.paishu) throw new Error(this);
            if (this._weikaigang) throw new Error(this);
            if (5 == this._baopai.length) throw new Error(this);
            return (
              (this._weikaigang = this._rule["カンドラあり"]),
              this._weikaigang || this._baopai.push(""),
              this._pai.shift()
            );
          }
          kaigang() {
            if (this._closed) throw new Error(this);
            if (!this._weikaigang) throw new Error(this);
            return (
              this._baopai.push(this._pai[4]),
              this._fubaopai &&
                this._rule["カン裏あり"] &&
                this._fubaopai.push(this._pai[9]),
              (this._weikaigang = !1),
              this
            );
          }
          close() {
            return (this._closed = !0), this;
          }
          get paishu() {
            return this._pai.length - 14;
          }
          get baopai() {
            return this._baopai.filter((t) => t);
          }
          get fubaopai() {
            return this._closed && this._fubaopai
              ? this._fubaopai.concat()
              : null;
          }
        };
      },
      325: (t) => {
        "use strict";
        t.exports = class t {
          static valid_pai(t) {
            if (t.match(/^(?:[mps]\d|z[1-7])_?\*?[\+\=\-]?$/)) return t;
          }
          static valid_mianzi(t) {
            if (t.match(/^z.*[089]/)) return;
            let e = t.replace(/0/g, "5");
            if (e.match(/^[mpsz](\d)\1\1[\+\=\-]\1?$/))
              return t.replace(/([mps])05/, "$150");
            if (e.match(/^[mpsz](\d)\1\1\1[\+\=\-]?$/))
              return (
                t[0] +
                t
                  .match(/\d(?![\+\=\-])/g)
                  .sort()
                  .reverse()
                  .join("") +
                (t.match(/\d[\+\=\-]$/) || [""])[0]
              );
            if (e.match(/^[mps]\d+\-\d*$/)) {
              let i = t.match(/0/),
                n = e.match(/\d/g).sort();
              if (3 != n.length) return;
              if (+n[0] + 1 != +n[1] || +n[1] + 1 != +n[2]) return;
              return (
                (e =
                  e[0] +
                  e
                    .match(/\d[\+\=\-]?/g)
                    .sort()
                    .join("")),
                i ? e.replace(/5/, "0") : e
              );
            }
          }
          constructor(e = []) {
            (this._bingpai = {
              _: 0,
              m: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              p: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              s: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              z: [0, 0, 0, 0, 0, 0, 0, 0],
            }),
              (this._fulou = []),
              (this._zimo = null),
              (this._lizhi = !1);
            for (let i of e) {
              if ("_" == i) {
                this._bingpai._++;
                continue;
              }
              if (!(i = t.valid_pai(i))) throw new Error(i);
              let e = i[0],
                n = +i[1];
              if (4 == this._bingpai[e][n]) throw new Error([this, i]);
              this._bingpai[e][n]++,
                "z" != e && 0 == n && this._bingpai[e][5]++;
            }
          }
          static fromString(e = "") {
            let i = e.split(","),
              n = i.shift(),
              s = n.match(/_/g) || [];
            for (let t of n.match(/[mpsz]\d+/g) || []) {
              let e = t[0];
              for (let i of t.match(/\d/g))
                ("z" == e && (i < 1 || 7 < i)) || s.push(e + i);
            }
            s = s.slice(0, 14 - 3 * i.filter((t) => t).length);
            let a = (s.length - 2) % 3 == 0 && s.slice(-1)[0];
            const o = new t(s);
            let r;
            for (let e of i) {
              if (!e) {
                o._zimo = r;
                break;
              }
              (e = t.valid_mianzi(e)), e && (o._fulou.push(e), (r = e));
            }
            return (
              (o._zimo = o._zimo || a || null),
              (o._lizhi = "*" == n.substr(-1)),
              o
            );
          }
          toString() {
            let t = "_".repeat(this._bingpai._ + ("_" == this._zimo ? -1 : 0));
            for (let e of ["m", "p", "s", "z"]) {
              let i = e,
                n = this._bingpai[e],
                s = "z" == e ? 0 : n[0];
              for (let t = 1; t < n.length; t++) {
                let a = n[t];
                this._zimo &&
                  (e + t == this._zimo && a--,
                  5 == t && e + 0 == this._zimo && (a--, s--));
                for (let e = 0; e < a; e++)
                  5 == t && s > 0 ? ((i += 0), s--) : (i += t);
              }
              i.length > 1 && (t += i);
            }
            this._zimo && this._zimo.length <= 2 && (t += this._zimo),
              this._lizhi && (t += "*");
            for (let e of this._fulou) t += "," + e;
            return this._zimo && this._zimo.length > 2 && (t += ","), t;
          }
          clone() {
            const e = new t();
            return (
              (e._bingpai = {
                _: this._bingpai._,
                m: this._bingpai.m.concat(),
                p: this._bingpai.p.concat(),
                s: this._bingpai.s.concat(),
                z: this._bingpai.z.concat(),
              }),
              (e._fulou = this._fulou.concat()),
              (e._zimo = this._zimo),
              (e._lizhi = this._lizhi),
              e
            );
          }
          fromString(e) {
            const i = t.fromString(e);
            return (
              (this._bingpai = {
                _: i._bingpai._,
                m: i._bingpai.m.concat(),
                p: i._bingpai.p.concat(),
                s: i._bingpai.s.concat(),
                z: i._bingpai.z.concat(),
              }),
              (this._fulou = i._fulou.concat()),
              (this._zimo = i._zimo),
              (this._lizhi = i._lizhi),
              this
            );
          }
          decrease(t, e) {
            let i = this._bingpai[t];
            if (0 == i[e] || (5 == e && i[0] == i[5])) {
              if (0 == this._bingpai._) throw new Error([this, t + e]);
              this._bingpai._--;
            } else i[e]--, 0 == e && i[5]--;
          }
          zimo(e, i = !0) {
            if (i && this._zimo) throw new Error([this, e]);
            if ("_" == e) this._bingpai._++, (this._zimo = e);
            else {
              if (!t.valid_pai(e)) throw new Error(e);
              let i = e[0],
                n = +e[1],
                s = this._bingpai[i];
              if (4 == s[n]) throw new Error([this, e]);
              if ((s[n]++, 0 == n)) {
                if (4 == s[5]) throw new Error([this, e]);
                s[5]++;
              }
              this._zimo = i + n;
            }
            return this;
          }
          dapai(e, i = !0) {
            if (i && !this._zimo) throw new Error([this, e]);
            if (!t.valid_pai(e)) throw new Error(e);
            let n = e[0],
              s = +e[1];
            return (
              this.decrease(n, s),
              (this._zimo = null),
              "*" == e.substr(-1) && (this._lizhi = !0),
              this
            );
          }
          fulou(e, i = !0) {
            if (i && this._zimo) throw new Error([this, e]);
            if (e != t.valid_mianzi(e)) throw new Error(e);
            if (e.match(/\d{4}$/)) throw new Error([this, e]);
            if (e.match(/\d{3}[\+\=\-]\d$/)) throw new Error([this, e]);
            let n = e[0];
            for (let t of e.match(/\d(?![\+\=\-])/g)) this.decrease(n, t);
            return (
              this._fulou.push(e), e.match(/\d{4}/) || (this._zimo = e), this
            );
          }
          gang(e, i = !0) {
            if (i && !this._zimo) throw new Error([this, e]);
            if (i && this._zimo.length > 2) throw new Error([this, e]);
            if (e != t.valid_mianzi(e)) throw new Error(e);
            let n = e[0];
            if (e.match(/\d{4}$/)) {
              for (let t of e.match(/\d/g)) this.decrease(n, t);
              this._fulou.push(e);
            } else {
              if (!e.match(/\d{3}[\+\=\-]\d$/)) throw new Error([this, e]);
              {
                let t = e.substr(0, 5),
                  i = this._fulou.findIndex((e) => t == e);
                if (i < 0) throw new Error([this, e]);
                (this._fulou[i] = e), this.decrease(n, e.substr(-1));
              }
            }
            return (this._zimo = null), this;
          }
          get menqian() {
            return 0 == this._fulou.filter((t) => t.match(/[\+\=\-]/)).length;
          }
          get lizhi() {
            return this._lizhi;
          }
          get_dapai(t = !0) {
            if (!this._zimo) return null;
            let e = {};
            if (t && this._zimo.length > 2) {
              let t = this._zimo,
                i = t[0],
                n = +t.match(/\d(?=[\+\=\-])/) || 5;
              (e[i + n] = !0),
                t.replace(/0/, "5").match(/^[mpsz](\d)\1\1/) ||
                  (n < 7 && t.match(/^[mps]\d\-\d\d$/) && (e[i + (n + 3)] = !0),
                  3 < n && t.match(/^[mps]\d\d\d\-$/) && (e[i + (n - 3)] = !0));
            }
            let i = [];
            if (!this._lizhi)
              for (let t of ["m", "p", "s", "z"]) {
                let n = this._bingpai[t];
                for (let s = 1; s < n.length; s++)
                  0 != n[s] &&
                    (e[t + s] ||
                      (t + s == this._zimo && 1 == n[s]) ||
                      ("z" == t || 5 != s
                        ? i.push(t + s)
                        : (((n[0] > 0 && t + 0 != this._zimo) || n[0] > 1) &&
                            i.push(t + 0),
                          n[0] < n[5] && i.push(t + s))));
              }
            return 2 == this._zimo.length && i.push(this._zimo + "_"), i;
          }
          get_chi_mianzi(e, i = !0) {
            if (this._zimo) return null;
            if (!t.valid_pai(e)) throw new Error(e);
            let n = [],
              s = e[0],
              a = +e[1] || 5,
              o = e.match(/[\+\=\-]$/);
            if (!o) throw new Error(e);
            if ("z" == s || "-" != o) return n;
            if (this._lizhi) return n;
            let r = this._bingpai[s];
            return (
              3 <= a &&
                r[a - 2] > 0 &&
                r[a - 1] > 0 &&
                (!i ||
                  (3 < a ? r[a - 3] : 0) + r[a] <
                    14 - 3 * (this._fulou.length + 1)) &&
                (a - 2 == 5 && r[0] > 0 && n.push(s + "067-"),
                a - 1 == 5 && r[0] > 0 && n.push(s + "406-"),
                ((a - 2 != 5 && a - 1 != 5) || r[0] < r[5]) &&
                  n.push(s + (a - 2) + (a - 1) + (e[1] + o))),
              2 <= a &&
                a <= 8 &&
                r[a - 1] > 0 &&
                r[a + 1] > 0 &&
                (!i || r[a] < 14 - 3 * (this._fulou.length + 1)) &&
                (a - 1 == 5 && r[0] > 0 && n.push(s + "06-7"),
                a + 1 == 5 && r[0] > 0 && n.push(s + "34-0"),
                ((a - 1 != 5 && a + 1 != 5) || r[0] < r[5]) &&
                  n.push(s + (a - 1) + (e[1] + o) + (a + 1))),
              a <= 7 &&
                r[a + 1] > 0 &&
                r[a + 2] > 0 &&
                (!i ||
                  r[a] + (a < 7 ? r[a + 3] : 0) <
                    14 - 3 * (this._fulou.length + 1)) &&
                (a + 1 == 5 && r[0] > 0 && n.push(s + "4-06"),
                a + 2 == 5 && r[0] > 0 && n.push(s + "3-40"),
                ((a + 1 != 5 && a + 2 != 5) || r[0] < r[5]) &&
                  n.push(s + (e[1] + o) + (a + 1) + (a + 2))),
              n
            );
          }
          get_peng_mianzi(e) {
            if (this._zimo) return null;
            if (!t.valid_pai(e)) throw new Error(e);
            let i = [],
              n = e[0],
              s = +e[1] || 5,
              a = e.match(/[\+\=\-]$/);
            if (!a) throw new Error(e);
            if (this._lizhi) return i;
            let o = this._bingpai[n];
            return (
              o[s] >= 2 &&
                (5 == s && o[0] >= 2 && i.push(n + "00" + e[1] + a),
                5 == s &&
                  o[0] >= 1 &&
                  o[5] - o[0] >= 1 &&
                  i.push(n + "50" + e[1] + a),
                (5 != s || o[5] - o[0] >= 2) && i.push(n + s + s + e[1] + a)),
              i
            );
          }
          get_gang_mianzi(e) {
            let i = [];
            if (e) {
              if (this._zimo) return null;
              if (!t.valid_pai(e)) throw new Error(e);
              let n = e[0],
                s = +e[1] || 5,
                a = e.match(/[\+\=\-]$/);
              if (!a) throw new Error(e);
              if (this._lizhi) return i;
              let o = this._bingpai[n];
              3 == o[s] &&
                (i =
                  5 == s
                    ? [n + "5".repeat(3 - o[0]) + "0".repeat(o[0]) + e[1] + a]
                    : [n + s + s + s + s + a]);
            } else {
              if (!this._zimo) return null;
              if (this._zimo.length > 2) return null;
              let t = this._zimo.replace(/0/, "5");
              for (let e of ["m", "p", "s", "z"]) {
                let n = this._bingpai[e];
                for (let s = 1; s < n.length; s++)
                  if (0 != n[s])
                    if (4 == n[s]) {
                      if (this._lizhi && e + s != t) continue;
                      5 == s
                        ? i.push(e + "5".repeat(4 - n[0]) + "0".repeat(n[0]))
                        : i.push(e + s + s + s + s);
                    } else {
                      if (this._lizhi) continue;
                      for (let t of this._fulou)
                        t.replace(/0/g, "5").substr(0, 4) == e + s + s + s &&
                          (5 == s && n[0] > 0 ? i.push(t + 0) : i.push(t + s));
                    }
              }
            }
            return i;
          }
        };
      },
      961: (t) => {
        "use strict";
        function e(t, e, i, n) {
          let s = n ? 4 : 5;
          return (
            t > 4 && ((e += t - 4), (t = 4)),
            t + e > 4 && ((i += t + e - 4), (e = 4 - t)),
            t + e + i > s && (i = s - t - e),
            n && e++,
            13 - 3 * t - 2 * e - i
          );
        }
        function i(t, e = 1) {
          if (e > 9)
            return (function (t) {
              let e = 0,
                i = 0,
                n = 0;
              for (let s = 1; s <= 9; s++)
                (e += t[s]),
                  s <= 7 &&
                    0 == t[s + 1] &&
                    0 == t[s + 2] &&
                    ((i += e >> 1), (n += e % 2), (e = 0));
              return (
                (i += e >> 1), (n += e % 2), { a: [0, i, n], b: [0, i, n] }
              );
            })(t);
          let n = i(t, e + 1);
          if (e <= 7 && t[e] > 0 && t[e + 1] > 0 && t[e + 2] > 0) {
            t[e]--, t[e + 1]--, t[e + 2]--;
            let s = i(t, e);
            t[e]++,
              t[e + 1]++,
              t[e + 2]++,
              s.a[0]++,
              s.b[0]++,
              (s.a[2] < n.a[2] || (s.a[2] == n.a[2] && s.a[1] < n.a[1])) &&
                (n.a = s.a),
              (s.b[0] > n.b[0] || (s.b[0] == n.b[0] && s.b[1] > n.b[1])) &&
                (n.b = s.b);
          }
          if (t[e] >= 3) {
            t[e] -= 3;
            let s = i(t, e);
            (t[e] += 3),
              s.a[0]++,
              s.b[0]++,
              (s.a[2] < n.a[2] || (s.a[2] == n.a[2] && s.a[1] < n.a[1])) &&
                (n.a = s.a),
              (s.b[0] > n.b[0] || (s.b[0] == n.b[0] && s.b[1] > n.b[1])) &&
                (n.b = s.b);
          }
          return n;
        }
        function n(t, n) {
          let s = i(t._bingpai.m),
            a = i(t._bingpai.p),
            o = i(t._bingpai.s),
            r = [0, 0, 0];
          for (let e = 1; e <= 7; e++)
            t._bingpai.z[e] >= 3
              ? r[0]++
              : 2 == t._bingpai.z[e]
              ? r[1]++
              : 1 == t._bingpai.z[e] && r[2]++;
          let h = t._fulou.length,
            l = 13;
          for (let t of [s.a, s.b])
            for (let i of [a.a, a.b])
              for (let s of [o.a, o.b]) {
                let a = [h, 0, 0];
                for (let e = 0; e < 3; e++) a[e] += t[e] + i[e] + s[e] + r[e];
                let o = e(a[0], a[1], a[2], n);
                o < l && (l = o);
              }
          return l;
        }
        function s(t) {
          let e = n(t);
          for (let i of ["m", "p", "s", "z"]) {
            let s = t._bingpai[i];
            for (let i = 1; i < s.length; i++)
              if (s[i] >= 2) {
                s[i] -= 2;
                let a = n(t, !0);
                (s[i] += 2), a < e && (e = a);
              }
          }
          return -1 == e && t._zimo && t._zimo.length > 2 ? 0 : e;
        }
        function a(t) {
          if (t._fulou.length) return 1 / 0;
          let e = 0,
            i = 0;
          for (let n of ["m", "p", "s", "z"]) {
            let s = t._bingpai[n],
              a = "z" == n ? [1, 2, 3, 4, 5, 6, 7] : [1, 9];
            for (let t of a) s[t] >= 1 && e++, s[t] >= 2 && i++;
          }
          return i ? 12 - e : 13 - e;
        }
        function o(t) {
          if (t._fulou.length) return 1 / 0;
          let e = 0,
            i = 0;
          for (let n of ["m", "p", "s", "z"]) {
            let s = t._bingpai[n];
            for (let t = 1; t < s.length; t++)
              s[t] >= 2 ? e++ : 1 == s[t] && i++;
          }
          return e > 7 && (e = 7), e + i > 7 && (i = 7 - e), 13 - 2 * e - i;
        }
        function r(t) {
          return Math.min(s(t), a(t), o(t));
        }
        t.exports = {
          xiangting_guoshi: a,
          xiangting_qidui: o,
          xiangting_yiban: s,
          xiangting: r,
          tingpai: function (t, e = r) {
            if (t._zimo) return null;
            let i = [],
              n = e(t);
            for (let s of ["m", "p", "s", "z"]) {
              let a = t._bingpai[s];
              for (let o = 1; o < a.length; o++)
                a[o] >= 4 || (a[o]++, e(t) < n && i.push(s + o), a[o]--);
            }
            return i;
          },
        };
      },
      57: (t, e, i) => {
        "use strict";
        const n = i(725),
          s = i(555),
          { show: a, hide: o } = i(227);
        t.exports = class extends n {
          constructor(t, e, i, n) {
            super(),
              (this._node = {
                root: t,
                shoupai: $("> .shoupai", t),
                dapai: $("> .dapai", t),
                r_shoupai: $("> .shoupai .row", t).eq(0),
                r_dapai: $("> .dapai   .row", t).eq(0),
              }),
              (this._pai = i),
              (this.close = n),
              this.action(e);
          }
          id(t) {
            this.action({
              kaiju: {
                id: t,
                rule: this._rule,
                title: this._model.title,
                player: this._model.player,
                qijia: this._model.qijia,
              },
            });
          }
          next(t) {
            super.action(t);
          }
          action(t) {
            super.action(t, () => {});
          }
          action_kaiju() {
            this.clear();
          }
          action_qipai() {
            this.redraw_shoupai([]), this.active(!0);
          }
          action_zimo(t, e) {
            if (t.l != this._menfeng) return void this.redraw_shoupai([]);
            let i = [];
            if (this.select_hule(null, e, i))
              return this.redraw_shoupai(i), void this.active(!0);
            let n = this.select_gang(i);
            n &&
              i.forEach((t) => {
                t.m == n && (t.selected = !0);
              });
            let s = this.select_dapai(i).substr(0, 2);
            n ||
              i.forEach((t) => {
                t.m || t.p != s || (t.selected = !0);
              }),
              this.redraw_dapai(i);
          }
          action_dapai(t) {
            if (t.l == this._menfeng)
              return void this.update_dapai(t.p.substr(0, 2));
            let e = [];
            if (this.select_hule(t, null, e))
              return this.redraw_shoupai(e), void this.active(!0);
            let i = this.select_fulou(t, e);
            i || (i = ""),
              e.forEach((t) => {
                t.m == i && (t.selected = !0);
              }),
              this.redraw_shoupai(e);
          }
          action_fulou(t) {
            if (t.l != this._menfeng) return void this.redraw_shoupai([]);
            if (t.m.match(/\d{4}/)) return;
            let e = [],
              i = this.select_dapai(e).substr(0, 2);
            e.forEach((t) => {
              t.p == i && (t.selected = !0);
            }),
              this.redraw_dapai(e),
              this.active(!0);
          }
          action_gang(t) {
            if (t.l == this._menfeng) return void this.update_dapai(t.m);
            let e = [];
            return this.select_hule(t, !0, e)
              ? (this.redraw_shoupai(e), void this.active(!0))
              : void 0;
          }
          action_hule() {
            this.clear();
          }
          action_pingju() {
            this.clear();
          }
          active(t) {
            t
              ? this._node.root.addClass("active")
              : this._node.root.removeClass("active");
          }
          clear() {
            this.active(!1), o(this._node.shoupai), o(this._node.dapai);
          }
          redraw_shoupai(t) {
            if (
              (a(this._node.shoupai.empty()), o(this._node.dapai), !t.length)
            ) {
              let e = Majiang.Util.xiangting(this.shoupai),
                i = this._suanpai.paishu_all(),
                n = this.eval_shoupai(this.shoupai, i),
                s = Majiang.Util.tingpai(this.shoupai)
                  .map((t) => this._suanpai._paishu[t[0]][t[1]])
                  .reduce((t, e) => t + e, 0);
              t.push({
                m: "",
                n_xiangting: e,
                n_tingpai: s,
                ev: n,
                shoupai: this.shoupai.toString(),
              });
            }
            const e = (t, e) =>
              t.selected ? -1 : e.selected ? 1 : e.ev - t.ev;
            for (let i of t.sort(e)) {
              let t = this._node.r_shoupai.clone();
              if (
                ($(".xiangting", t).text(
                  i.n_xiangting < 0
                    ? "和了形"
                    : 0 == i.n_xiangting
                    ? "聴牌"
                    : `${i.n_xiangting}向聴`
                ),
                null == i.ev)
              )
                $(".eval", t).text("");
              else if (i.n_xiangting > 2) {
                let e = i.ev - i.n_tingpai;
                $(".eval", t).text(
                  e ? `${i.n_tingpai}(+${e})枚` : `${i.n_tingpai}枚`
                );
              } else $(".eval", t).text(i.ev.toFixed(2));
              new s(
                $(".shoupai", t),
                this._pai,
                Majiang.Shoupai.fromString(i.shoupai)
              ).redraw(!0);
              let e =
                i.n_xiangting < 0
                  ? "和了"
                  : i.m
                  ? i.m.match(/\d{4}/)
                    ? "カン"
                    : i.m.replace(/0/, "5").match(/(\d)\1\1/)
                    ? "ポン"
                    : "チー"
                  : "";
              $(".action", t).text(e), this._node.shoupai.append(t);
            }
            1 == t.length ? this.active(!1) : this.active(!0);
          }
          redraw_dapai(t) {
            o(this._node.shoupai),
              t.length ? a(this._node.dapai.empty()) : o(this._node.dapai);
            const e = (t, e) =>
              t.selected ? -1 : e.selected ? 1 : e.ev - t.ev;
            for (let i of t.sort(e)) {
              let t = this._node.r_dapai
                .clone()
                .removeClass("selected")
                .attr("data-dapai", i.m || i.p);
              if (
                ($(".p", t).empty().append(this._pai(i.p)),
                i.m && $(".p", t).append($("<span>").text("カン")),
                $(".xiangting", t).text(
                  i.n_xiangting ? `${i.n_xiangting}向聴` : "聴牌"
                ),
                null == i.ev)
              )
                $(".eval", t).text("オリ");
              else if (i.n_xiangting > 2) {
                let e = i.ev > i.n_tingpai ? i.ev - i.n_tingpai : 0;
                $(".eval", t).text(
                  e ? `${i.n_tingpai}(+${e})枚` : `${i.n_tingpai}枚`
                );
              } else $(".eval", t).text(i.ev.toFixed(2));
              $(".tingpai", t).empty();
              for (let e of i.tingpai || [])
                $(".tingpai", t).append(this._pai(e));
              i.n_xiangting <= 2 &&
                null != i.ev &&
                $(".tingpai", t).append($("<span>").text(`(${i.n_tingpai}枚)`));
              let e =
                null == i.weixian
                  ? ""
                  : i.weixian >= 13.5
                  ? "high"
                  : i.weixian >= 8
                  ? "middle"
                  : i.weixian >= 3
                  ? "low"
                  : 0 == i.weixian
                  ? "none"
                  : "";
              $(".eval", t).removeClass("high middle low none").addClass(e),
                this._node.dapai.append(t);
            }
            this.shoupai.lizhi && 1 == t.length
              ? this.active(!1)
              : this.active(!0);
          }
          update_dapai(t) {
            $(`.row[data-dapai="${t}"]`, this._node.dapai).addClass("selected");
          }
        };
      },
      918: (t, e, i) => {
        "use strict";
        const n = i(755);
        t.exports = function (t) {
          const e = {};
          return (
            n("audio", t).each(function () {
              let t = n(this).data("name");
              e[t] = n(this);
            }),
            function (t) {
              let i = e[t].clone()[0],
                n = e[t].attr("volume");
              return (
                n &&
                  (i.oncanplaythrough = () => {
                    (i.volume = +n), (i.oncanplaythrough = null);
                  }),
                i
              );
            }
          );
        };
      },
      874: (t, e, i) => {
        "use strict";
        const n = i(755),
          s = i(555),
          a = i(801),
          o = i(63),
          r = i(330),
          h = i(7),
          { hide: l, show: u, fadeIn: p, fadeOut: c } = i(227),
          f = ["main", "xiajia", "duimian", "shangjia"],
          d = ["東", "南", "西", "北"],
          g = ["一", "二", "三", "四"],
          _ = {
            chi: "チー",
            peng: "ポン",
            gang: "カン",
            lizhi: "リーチ",
            rong: "ロン",
            zimo: "ツモ",
          };
        class m {
          constructor(t, e) {
            (this._model = e),
              (this._view = {
                root: t,
                jushu: n(".jushu", t),
                changbang: n(".changbang", t),
                lizhibang: n(".lizhibang", t),
                defen: [],
              }),
              (this._viewpoint = 0),
              l(this._view.root);
          }
          redraw(t) {
            null != t && (this._viewpoint = t), u(this._view.root);
            let e = d[this._model.zhuangfeng] + g[this._model.jushu] + "局";
            this._view.jushu.text(e),
              this._view.changbang.text(this._model.changbang),
              this._view.lizhibang.text(this._model.lizhibang);
            for (let t = 0; t < 4; t++) {
              let e = this._model.player_id[t],
                i = "" + this._model.defen[e];
              (i = i.replace(/(\d)(\d{3})$/, "$1,$2")), (i = `${d[t]}: ${i}`);
              let s = f[(e + 4 - this._viewpoint) % 4];
              (this._view.defen[t] = n(`.defen .${s}`, this._root)),
                this._view.defen[t].removeClass("lunban").text(i),
                t == this._model.lunban &&
                  this._view.defen[t].addClass("lunban");
            }
            return this;
          }
          update() {
            let t = this._model.lunban < 0 ? 0 : this._model.lunban;
            for (let e = 0; e < 4; e++)
              e == t
                ? this._view.defen[e].addClass("lunban")
                : this._view.defen[e].removeClass("lunban");
            return this;
          }
        }
        t.exports = class {
          constructor(t, e, i, s) {
            (this._root = t),
              (this._model = s),
              (this._pai = e),
              (this._view = {
                score: new m(n(".score", t), s),
                shan: null,
                shoupai: [],
                he: [],
                say: [],
                dialog: null,
                summary: l(n("> .summary", t)),
                kaiju: l(n("> .kaiju", t)),
              }),
              (this._say = []),
              (this._lizhi = !1),
              (this.viewpoint = 0),
              (this.sound_on = !0),
              this.open_shoupai,
              this.open_he,
              this.no_player_name,
              this._timeout_id,
              this.set_audio(i);
          }
          set_audio(t) {
            this._audio = {};
            for (let e of [
              "dapai",
              "chi",
              "peng",
              "gang",
              "rong",
              "zimo",
              "lizhi",
            ]) {
              this._audio[e] = [];
              for (let i = 0; i < 4; i++) this._audio[e][i] = t(e);
            }
            return (this._audio.gong = t("gong")), this;
          }
          redraw() {
            (this._timeout_id = clearTimeout(this._timeout_id)),
              l(this._view.summary),
              l(this._view.kaiju),
              this._view.score.redraw(this.viewpoint),
              (this._view.shan = new a(
                n(".score .shan", this._root),
                this._pai,
                this._model.shan
              ).redraw());
            for (let t = 0; t < 4; t++) {
              let e = this._model.player_id[t],
                i = f[(e + 4 - this.viewpoint) % 4];
              u(
                n(`> .player.${i}`, this._root).text(
                  this._model.player[e].replace(/\n.*$/, "")
                )
              ),
                this.no_player_name && l(n(`> .player.${i}`, this._root));
              let a = this._model.player_id[t] == this.viewpoint;
              (this._view.shoupai[t] = new s(
                u(n(`.shoupai.${i}`, this._root)),
                this._pai,
                this._model.shoupai[t]
              ).redraw(a || this.open_shoupai)),
                (this._view.he[t] = new o(
                  u(n(`.he.${i}`, this._root)),
                  this._pai,
                  this._model.he[t]
                ).redraw(this.open_he)),
                (this._view.say[t] = l(n(`.say.${i}`, this._root).text(""))),
                (this._say[t] = null);
            }
            return (
              (this._lunban = this._model.lunban),
              this._view.score.update(),
              (this._view.dialog = new r(
                n(".hule-dialog", this._root),
                this._pai,
                this._model,
                this.viewpoint
              ).hide()),
              this
            );
          }
          update(t = {}) {
            return (
              this._lunban >= 0 &&
                this._lunban != this._model.lunban &&
                (this._say[this._lunban]
                  ? (c(this._view.say[this._lunban]),
                    (this._say[this._lunban] = null))
                  : l(this._view.say[this._lunban].text("")),
                this._lizhi && (this._view.score.redraw(), (this._lizhi = !1)),
                this._view.he[this._lunban].redraw(),
                this._view.shoupai[this._lunban].redraw()),
              ("lizhi" == this._say[this._lunban] ||
                ("chi" == this._say[this._lunban] && !t.fulou) ||
                ("peng" == this._say[this._lunban] && !t.fulou) ||
                ("gang" == this._say[this._lunban] &&
                  !(t.fulou || t.gang || t.kaigang))) &&
                (c(this._view.say[this._lunban]),
                (this._say[this._lunban] = null)),
              t.zimo
                ? (this._view.shan.update(),
                  this._view.shoupai[t.zimo.l].redraw())
                : t.dapai
                ? (this._view.shoupai[t.dapai.l].dapai(t.dapai.p),
                  this.sound_on &&
                    ((this._audio.dapai[t.dapai.l].currentTime = 0),
                    this._audio.dapai[t.dapai.l].play()),
                  this._view.he[t.dapai.l].dapai(t.dapai.p),
                  (this._lizhi = "*" == t.dapai.p.substr(-1)))
                : t.fulou
                ? this._view.shoupai[t.fulou.l].redraw()
                : t.gang
                ? this._view.shoupai[t.gang.l].redraw()
                : t.gangzimo
                ? (this._view.shan.update(),
                  this._view.shoupai[t.gangzimo.l].redraw())
                : t.kaigang
                ? this._view.shan.redraw()
                : t.hule
                ? this.hule(t.hule)
                : t.pingju
                ? this.pingju(t.pingju)
                : this._view.score.redraw(),
              (this._lunban = this._model.lunban),
              this._lunban >= 0 && this._view.score.update(),
              this
            );
          }
          hule(t) {
            for (let t = 0; t < 4; t++)
              c(this._view.say[t]), (this._say[t] = null);
            this._timeout_id = setTimeout(() => {
              this._view.shoupai[t.l].redraw(!0),
                this._view.dialog.hule(t),
                this.sound_on && t.damanguan && this._audio.gong.play();
            }, 400);
          }
          pingju(t) {
            for (let t = 0; t < 4; t++)
              c(this._view.say[t]), (this._say[t] = null);
            let e = 0;
            t.name.match(/^三家和/)
              ? (e = 400)
              : (this._view.he[this._lunban].redraw(),
                this._view.shoupai[this._lunban].redraw()),
              (this._timeout_id = setTimeout(() => {
                for (let e = 0; e < 4; e++) {
                  let i =
                    this._model.player_id[e] == this.viewpoint || t.shoupai[e];
                  this._view.shoupai[e].redraw(i);
                }
                this._view.dialog.pingju(t);
              }, e));
          }
          say(t, e) {
            this.sound_on &&
              ((this._audio[t][e].currentTime = 0), this._audio[t][e].play()),
              u(this._view.say[e].text(_[t])),
              (this._say[e] = t);
          }
          kaiju() {
            if (this.no_player_name) return;
            l(n("> *", this._root));
            let t = n("<span>")
              .text(this._model.title)
              .html()
              .replace(/\n/g, "<br>");
            n(".title", this._view.kaiju).html(t);
            for (let t = 0; t < 4; t++) {
              let e = f[(4 - this.viewpoint + t) % 4],
                i = this._model.player[t].replace(/\n.*$/, "");
              n(`.player .${e}`, this._view.kaiju).text(i);
            }
            u(this._view.kaiju);
          }
          summary(t) {
            (this._timeout_id = clearTimeout(this._timeout_id)),
              this._view.dialog.hide(),
              this._view.summary.scrollTop(0),
              t
                ? p(h(this._view.summary, t, this.viewpoint))
                : l(this._view.summary);
          }
        };
      },
      330: (t, e, i) => {
        "use strict";
        const n = i(755),
          s = i(384),
          a = i(555),
          o = i(801),
          { hide: r, show: h, fadeIn: l, fadeOut: u } = i(227);
        t.exports = class {
          constructor(t, e, i, s = 0) {
            (this._node = {
              root: t,
              hule: n(".hule", t),
              pingju: n(".pingju", t),
              fenpei: n(".fenpai", t),
            }),
              (this._r_hupai = n(".r_hupai", t).eq(0)),
              (this._r_defen = n(".r_defen", t).eq(0)),
              this.hide(),
              (this._pai = e),
              (this._model = i),
              (this._viewpoint = s);
          }
          hule(t) {
            r(this._node.root),
              r(this._node.pingju),
              h(this._node.hule),
              t.fubaopai
                ? h(n(".shan.fubaopai", this._node.hule))
                : r(n(".shan.fubaopai", this._node.hule)),
              new o(
                n(".shan", this._node.hule),
                this._pai,
                this._model.shan
              ).redraw(),
              new a(
                n(".shoupai", this._node.hule),
                this._pai,
                s.Shoupai.fromString(t.shoupai)
              ).redraw(!0);
            let e = n(".hupai", this._node.hule).empty();
            if (t.hupai) {
              for (let i of t.hupai) {
                let t = this._r_hupai.clone();
                n(".name", t).text(i.name),
                  n(".fanshu", t).text(
                    i.fanshu + ("*" == i.fanshu[0] ? "" : "翻")
                  ),
                  e.append(h(t));
              }
              let i = t.damanguan ? "" : t.fu + "符 " + t.fanshu + "翻 ",
                s = t.defen / (0 == t.l ? 6 : 4) / 2e3;
              (i +=
                s >= 24
                  ? "六倍役満 "
                  : s >= 20
                  ? "五倍役満 "
                  : s >= 16
                  ? "四倍役満 "
                  : s >= 12
                  ? "トリプル役満 "
                  : s >= 8
                  ? "ダブル役満 "
                  : s >= 4
                  ? "役満 "
                  : s >= 3
                  ? "三倍満 "
                  : s >= 2
                  ? "倍満 "
                  : s >= 1.5
                  ? "跳満 "
                  : s >= 1
                  ? "満貫 "
                  : ""),
                (i += t.defen + "点");
              let a = this._r_defen.clone();
              n(".defen", a).text(i).removeClass("no_hule"), e.append(a);
            } else {
              let t = this._r_hupai.clone();
              e.append(r(t));
              let i = this._r_defen.clone();
              n(".defen", i).text("役なし").addClass("no_hule"), e.append(i);
            }
            return (
              n(".jicun .changbang", this._node.hule).text(
                this._model.changbang
              ),
              n(".jicun .lizhibang", this._node.hule).text(
                this._model.lizhibang
              ),
              t.fenpei && this.fenpei(t.fenpei),
              this._node.root.attr("aria-label", "ホーラ情報"),
              l(this._node.root),
              this
            );
          }
          pingju(t) {
            return (
              r(this._node.root),
              r(this._node.hule),
              h(this._node.pingju),
              this._node.pingju.text(t.name),
              t.fenpei && this.fenpei(t.fenpei),
              this._node.root.attr("aria-label", "流局情報"),
              l(this._node.root),
              this
            );
          }
          fenpei(t) {
            const e = ["東", "南", "西", "北"],
              i = ["main", "xiajia", "duimian", "shangjia"];
            n(".diff", this._node.fenpai).removeClass("plus minus");
            for (let s = 0; s < 4; s++) {
              let a = this._model.player_id[s],
                o = i[(a + 4 - this._viewpoint) % 4],
                r = n(`.${o}`, this._node.fenpai);
              n(".feng", r).text(e[s]);
              let h = this._model.player[a].replace(/\n.*$/, "");
              n(".player", r).text(h);
              let l = ("" + this._model.defen[a]).replace(
                /(\d)(\d{3})$/,
                "$1,$2"
              );
              n(".defen", r).text(l);
              let u = t[s];
              u > 0
                ? n(".diff", r).addClass("plus")
                : u < 0 && n(".diff", r).addClass("minus"),
                (u = u > 0 ? "+" + u : u < 0 ? "" + u : ""),
                (u = u.replace(/(\d)(\d{3})$/, "$1,$2")),
                n(".diff", r).text(u);
            }
          }
          hide() {
            return this._node.root.scrollTop(0), r(this._node.root), this;
          }
        };
      },
      227: (t) => {
        "use strict";
        t.exports = {
          show: (t) => t.removeClass("hide fadeout"),
          hide: (t) => t.addClass("hide fadeout"),
          fadeIn: (t) => (
            t.addClass("hide fadeout"),
            setTimeout(() => {
              t.removeClass("hide"),
                setTimeout(
                  () => t.off("transitionend").removeClass("fadeout"),
                  0
                );
            }, 100),
            t
          ),
          fadeOut: (t) =>
            t
              .on("transitionend", () =>
                t.off("transitionend").addClass("hide")
              )
              .addClass("fadeout"),
        };
      },
      309: (t, e, i) => {
        "use strict";
        const n = i(755);
        i(526);
        const { hide: s, show: a, fadeIn: o, fadeOut: r } = i(227);
        function h(t) {
          const e = [
            "title",
            "player",
            "qijia",
            "log",
            "defen",
            "rank",
            "point",
          ];
          for (let i of [].concat(t))
            for (let t of e)
              if (null == i[t]) throw new Error(`${t}: undefined`);
          return t;
        }
        class l {
          constructor(t) {
            (this._paipu = []), (this._name = t);
            try {
              t &&
                (this._paipu = h(JSON.parse(localStorage.getItem(t) || "[]")));
            } catch (t) {
              console.log(t);
            }
          }
          get length() {
            return this._paipu.length;
          }
          stringify(t) {
            return JSON.stringify(null == t ? this._paipu : this._paipu[t]);
          }
          save() {
            if (this._name)
              try {
                localStorage.setItem(this._name, this.stringify());
              } catch (t) {
                throw (
                  ((this._paipu = h(
                    JSON.parse(localStorage.getItem(this._name) || "[]")
                  )),
                  t)
                );
              }
          }
          add(t) {
            (this._paipu = this._paipu.concat(h(t))), this.save();
          }
          del(t) {
            this._paipu.splice(t, 1), this.save();
          }
          get(t) {
            return null == t ? this._paipu : this._paipu[t];
          }
          sort(t) {
            let e = this._paipu.concat();
            for (let i = 0; i < this.length; i++) this._paipu[i] = e[t[i]];
            this.save();
          }
        }
        t.exports = class {
          constructor(t, e, i, s, a, h, u) {
            if (
              ((this._root = t),
              (this._row = n(".row", t)),
              (this._storage = e),
              (this._paipu = new l(e)),
              (this._max_idx = 0),
              (this.open_viewer = i),
              (this.goto_stat = s),
              a)
            ) {
              let t = location.href.replace(/\?.*$/, "").replace(/[^\/]*$/, "");
              location.origin;
              a.substr(0, t.length) == t
                ? (this._tenhou = a.substr(t.length))
                : a.substr(0, origin.length) == origin
                ? (this._tenhou = a.substr(origin.length))
                : (this._tenhou = a);
            }
            n('input[name="storage"]', t).prop("checked", !0),
              n(".upload input", t).on("change", (t) => {
                for (let e of t.target.files) this.read_paipu(e);
                n(t.target).val(null);
              }),
              n('input[name="storage"]', t).on("change", (t) => {
                this.storage(n(t.target).prop("checked")), o(n("body"));
              }),
              n(".stat", t).on("click", () => {
                this._url && history.replaceState("", "", "#stat"),
                  this.goto_stat(this._paipu.get());
              }),
              n(".error", t).on("click", () => r(n(".error", t))),
              n("form").on("submit", (t) => {
                let e = n('input[name="url"]', n(t.target)).val(),
                  i = e.match(/#.*$/) || "",
                  s = e
                    .replace(/^.*\?log=/, "")
                    .replace(/\&.*$/, "")
                    .replace(/#.*$/, "")
                    .replace(/^.*\//, "")
                    .replace(/\..*$/, "");
                return (location = "?" + this._tenhou + s + ".json" + i), !1;
              }),
              h
                ? this.load_paipu(h, u)
                : this.isEmpty &&
                  n('input[name="storage"]', t).trigger("click");
          }
          storage(t) {
            t &&
              (delete this._url,
              history.replaceState("", "", location.pathname)),
              (this._paipu = new l(t ? this._storage : null)),
              n('input[name="storage"]', this._root).prop("checked", t),
              this.redraw();
          }
          get isEmpty() {
            return !this._paipu.length;
          }
          add(t, e) {
            for (delete this._url, this._paipu.add(t); this._paipu.length > e; )
              this._paipu.del(0);
          }
          read_paipu(t) {
            if (
              !t.type.match(/^application\/json$/i) &&
              !t.name.match(/\.json$/i)
            )
              return void this.error(`${t.name}: 不正なファイルです`);
            const e = new FileReader();
            (e.onload = (e) => {
              try {
                let t = JSON.parse(e.target.result);
                this.add(t);
              } catch (e) {
                e instanceof DOMException
                  ? this.error("ローカルストレージ容量オーバー")
                  : this.error(`${t.name}: 牌譜形式が不正です`);
              }
              this.redraw();
            }),
              e.readAsText(t);
          }
          load_paipu(t, e) {
            this.storage(!1),
              fetch(t)
                .then((e) => {
                  if (!e.ok)
                    throw (
                      (this.error(
                        `${decodeURI(t)}: ${(function (t) {
                          return t.statusText
                            ? `${t.status} ${t.statusText}`
                            : `${t.status} ${
                                {
                                  400: "Bad Request",
                                  401: "Unauthorized",
                                  402: "Payment Required",
                                  403: "Forbidden",
                                  404: "Not Found",
                                  405: "Method Not Allowed",
                                  406: "Not Acceptable",
                                  407: "Proxy Authentication Required",
                                  408: "Request Timeout",
                                  409: "Conflict",
                                  410: "Gone",
                                  411: "Length Required",
                                  412: "Precondition Failed",
                                  413: "Request Entity Too Large",
                                  414: "Request-URI Too Long",
                                  415: "Unsupported Media Type",
                                  416: "Requested Range Not Satisfiable",
                                  417: "Expectation Failed",
                                  500: "Internal Server Error",
                                  501: "Not Implemented",
                                  502: "Bad Gateway",
                                  503: "Service Unavailable",
                                  504: "Gateway Timeout",
                                  505: "HTTP Version Not Supported",
                                }[t.status]
                              }`;
                        })(e)}`
                      ),
                      new Error())
                    );
                  return e.json();
                })
                .then((i) => {
                  this.add(i),
                    this.redraw(),
                    (this._url = t),
                    e && this.open(e);
                })
                .catch((e) => {
                  e instanceof TypeError
                    ? this.error(`${decodeURI(t)}: ${e.message}`)
                    : e.message &&
                      this.error(`${decodeURI(t)}: 牌譜形式が不正です`);
                });
          }
          redraw() {
            let t = n(".list", this._root).empty();
            for (let e = 0; e < this._paipu.length; e++) {
              let i = this._paipu.get(e),
                o = [];
              if (!i.rank.length)
                for (let t = 0; t < 4; t++) {
                  let e = (i.qijia + t) % 4;
                  (i.rank[e] = t + 1), (i.point[e] = i.point[e] ?? "-");
                }
              for (let t = 0; t < 4; t++) {
                let e = (i.point[t] > 0 ? "+" : "") + i.point[t];
                o[i.rank[t] - 1] = `${i.player[t]} (${e})`;
              }
              let r = this._row.clone();
              r.attr("data-idx", e),
                n(".title", r).text(i.title),
                n(".player", r).text(o.join(" / ")),
                t.append(s(r)),
                e < this._max_idx && a(r);
            }
            (this._max_idx = this._paipu.length),
              this.isEmpty
                ? (s(n(".file > .button", this._root)),
                  n('input[name="storage"]', this._root).prop("checked")
                    ? s(n("form", this._root))
                    : this._tenhou && a(n("form", this._root)))
                : (a(n(".file > .button", this._root)),
                  s(n("form", this._root))),
              this.set_handler(),
              n(".list", this._node).sortable({
                opacity: 0.7,
                cursor: "move",
                axis: "y",
                containment: "parent",
                tolerance: "pointer",
                handle: ".move",
                update: (t, e) => {
                  delete this._url;
                  let i = n.makeArray(
                    n(t.target)
                      .children()
                      .map((t, e) => n(e).data("idx"))
                  );
                  this._paipu.sort(i), this.redraw();
                },
              }),
              navigator.maxTouchPoints && s(n(".move", this._node)),
              a(n(".file", this._root)),
              o(n(".row.hide"), this._root);
          }
          set_handler() {
            if (this.isEmpty) return;
            let t = n(".row", this._root);
            for (let e = 0; e < this._paipu.length; e++) {
              n(".replay", t.eq(e)).on("click", () => {
                const t = this.open_viewer(this._paipu.get(e));
                this._url && t.set_fragment(`#${e || ""}`), t.start();
              }),
                n(".delete", t.eq(e)).on("click", () => {
                  delete this._url, this._paipu.del(e), this.redraw();
                });
              let i = this._paipu.get(e).title.replace(/[\s\n\\\/\:]/g, "_"),
                s = new Blob([this._paipu.stringify(e)], {
                  type: "application/json",
                });
              n(".download", t.eq(e))
                .attr("href", URL.createObjectURL(s))
                .attr("download", `牌譜(${i}).json`);
            }
            let e = this._paipu.get(0).title.replace(/[\s\n\\\/\:]/g, "_"),
              i = new Blob([this._paipu.stringify()], {
                type: "application/json",
              });
            n(".file > .button .download", this._root)
              .attr("href", URL.createObjectURL(i))
              .attr("download", `牌譜(${e}).json`);
          }
          open(t) {
            if ("stat" == t) this.goto_stat(this._paipu.get());
            else if (t) {
              let [e, i] = t.split(":");
              e = e.split("/").map((t) => (isNaN(t) ? 0 : 0 | +t));
              let n = e.shift();
              if (n >= this._paipu.length) return;
              const s = this.open_viewer(this._paipu.get(n));
              if ((s.set_fragment("#" + t), s.start(...e), i)) {
                i.match(/s/) && s.shoupai(),
                  i.match(/h/) && s.he(),
                  i.match(/i/) && s.analyzer();
                for (let t of i.match(/\+/g) || []) {
                  if (s._deny_repeat) break;
                  s.next();
                }
              }
            }
          }
          error(t) {
            const e = n(".error", this._root).text(t);
            o(e), setTimeout(() => e.trigger("click"), 5e3);
          }
        };
      },
      205: (t, e, i) => {
        "use strict";
        const { hide: n, show: s } = i(227);
        t.exports = class {
          constructor(t, e, i) {
            (this._node = {
              controller: $(".controller", t),
              download: $(".download", t),
            }),
              (this._game = e),
              (this._view = e._view),
              (this._pref = i),
              (this._view.no_player_name = !0),
              this.redraw();
          }
          redraw() {
            n($(".exit, .summary, .analyzer", this._node.controller)),
              n($(".first, .last, .prev, .next", this._node.controller)),
              n($(".play", this._node.controller));
            let t = this.get_pref();
            this.sound(t.sound_on), this.speed(t.speed), this.set_handler();
          }
          speed(t) {
            return (
              t < 1 && (t = 1),
              t > 5 && (t = 5),
              (this._game.speed = t),
              $(".speed span", this._root).each((e, i) => {
                $(i).css("visibility", e < t ? "visible" : "hidden");
              }),
              this.set_pref(),
              !1
            );
          }
          sound(t) {
            return (
              (this._view.sound_on = t),
              t
                ? (n($(".sound.off", this._node.controller)),
                  s($(".sound.on", this._node.controller)))
                : (n($(".sound.on", this._node.controller)),
                  s($(".sound.off", this._node.controller))),
              this.set_pref(),
              !1
            );
          }
          get_pref() {
            return localStorage.getItem(this._pref)
              ? JSON.parse(localStorage.getItem(this._pref))
              : { sound_on: this._view.sound_on, speed: this._game.speed };
          }
          set_pref() {
            let t = { sound_on: this._view.sound_on, speed: this._game.speed };
            localStorage.setItem(this._pref, JSON.stringify(t));
          }
          set_handler() {
            this.clear_handler();
            const t = this._node.controller;
            $(".sound", t).on("click", () => this.sound(!this._view.sound_on)),
              $(".minus", t).on("click", () =>
                this.speed(this._game.speed - 1)
              ),
              $(".plus", t).on("click", () => this.speed(this._game.speed + 1)),
              $(window).on("keyup.controler", (t) => {
                "a" == t.key
                  ? this.sound(!this._view.sound_on)
                  : "-" == t.key
                  ? this.speed(this._game.speed - 1)
                  : "+" == t.key && this.speed(this._game.speed + 1);
              });
          }
          clear_handler() {
            $(".sound, .minus, .plus", this._node.controller).off("click"),
              $(window).off(".controler");
          }
          stop() {
            this._game.stop();
            let t = new Blob([JSON.stringify(this._game._paipu)], {
              type: "application/json",
            });
            $("a", this._node.download)
              .attr("href", URL.createObjectURL(t))
              .attr("download", "牌譜.json"),
              s(this._node.download),
              (this.stoped = !0);
          }
          start() {
            (this.stoped = !1), n(this._node.download), this._game.start();
          }
          shoupai() {
            const t = this._game;
            return (
              "hule" == t._status ||
              "pingju" == t._status ||
              "jieju" == t._status ||
              ((t._view.open_shoupai = !t._view.open_shoupai),
              t._view.redraw(),
              !1)
            );
          }
          he() {
            const t = this._game;
            return (
              "hule" == t._status ||
              "pingju" == t._status ||
              "jieju" == t._status ||
              ((t._view.open_he = !t._view.open_he), t._view.redraw(), !1)
            );
          }
        };
      },
      63: (t, e, i) => {
        "use strict";
        const n = i(755);
        t.exports = class {
          constructor(t, e, i, s) {
            (this._node = {
              root: t,
              chouma: n(".chouma", t),
              dapai: n(".dapai", t),
            }),
              (this._pai = e),
              (this._he = i),
              (this._open = s),
              this._node.chouma.addClass("hide");
          }
          redraw(t) {
            null != t && (this._open = t),
              this._node.root.attr("aria-label", "捨て牌"),
              this._node.chouma.attr("aria-label", "リーチ"),
              this._node.dapai.empty();
            let e = !1,
              i = 0;
            for (let t of this._he._pai) {
              if (
                (t.match(/\*/) &&
                  ((e = !0), this._node.chouma.removeClass("hide")),
                t.match(/[\+\=\-]/))
              )
                continue;
              let s = this._pai(t);
              this._open && "_" == t[2] && s.addClass("mopai"),
                e &&
                  ((s = n('<span class="lizhi">')
                    .attr("aria-label", "リーチ")
                    .append(s)),
                  (e = !1)),
                this._node.dapai.append(s),
                i++,
                i < 18 &&
                  i % 6 == 0 &&
                  this._node.dapai.append(n('<span class="break">'));
            }
            return this;
          }
          dapai(t) {
            let e = this._pai(t)
              .addClass("dapai")
              .attr("aria-live", "assertive");
            return (
              "_" == t[2] && e.addClass("mopai"),
              t.match(/\*/) && (e = n('<span class="lizhi">').append(e)),
              this._node.dapai.append(e),
              this
            );
          }
        };
      },
      150: (t, e, i) => {
        "use strict";
        /*!
         *  @kobalab/majiang-ui v1.0.6
         *
         *  Copyright(C) 2021 Satoshi Kobayashi
         *  Released under the MIT license
         *  https://github.com/kobalab/majiang-ui/blob/master/LICENSE
         */ t.exports = {
          pai: i(11),
          audio: i(918),
          Shoupai: i(555),
          He: i(63),
          Shan: i(801),
          Board: i(874),
          HuleDialog: i(330),
          Player: i(987),
          GameCtl: i(205),
          PaipuFile: i(309),
          Paipu: i(770),
          Analyzer: i(57),
          PaipuStat: i(95),
          Util: Object.assign(i(227), i(352), i(32)),
        };
      },
      767: (t, e, i) => {
        "use strict";
        const n = i(755);
        t.exports = function (t) {
          return function (e) {
            let i = n('<span class="mianzi">'),
              s = e[0];
            if (e.replace(/0/, "5").match(/^[mpsz](\d)\1\1\1$/)) {
              let n = e.match(/\d/g);
              i.attr("aria-label", "アンカン")
                .append(t("_"))
                .append(t(s + n[2]))
                .append(t(s + n[3]))
                .append(t("_"));
            } else if (e.replace(/0/g, "5").match(/^[mpsz](\d)\1\1/)) {
              let a = e.match(/[\+\=\-]\d$/),
                o = e.match(/[\+\=\-]/),
                r = e.match(/\d/g),
                h = t(s + r[0]),
                l = n('<span class="rotate">').append(
                  a
                    ? r.slice(-2).map((e) => t(s + e))
                    : r.slice(-1).map((e) => t(s + e))
                ),
                u =
                  a || 4 != r.length
                    ? r.slice(1, 2).map((e) => t(s + e))
                    : r.slice(1, 3).map((e) => t(s + e)),
                p =
                  ("+" == o
                    ? "シモチャから"
                    : "=" == o
                    ? "トイメンから"
                    : "カミチャから") +
                  (a ? "カカン" : 4 == r.length ? "カン" : "ポン");
              i.attr("aria-label", p),
                "+" == o && i.append(h).append(u).append(l),
                "=" == o && i.append(h).append(l).append(u),
                "-" == o && i.append(l).append(h).append(u);
            } else {
              let a = e.match(/\d(?=\-)/).concat(e.match(/\d(?!\-)/g));
              i.attr("aria-label", "チー")
                .append(n('<span class="rotate">').append(t(s + a[0])))
                .append(t(s + a[1]))
                .append(t(s + a[2]));
            }
            return i;
          };
        };
      },
      11: (t, e, i) => {
        "use strict";
        const n = i(755);
        t.exports = function (t) {
          const e = {};
          return (
            n(".pai", t).each(function () {
              let t = n(this).data("pai");
              e[t] = n(this);
            }),
            function (t) {
              return e[t.substr(0, 2)].clone();
            }
          );
        };
      },
      770: (t, e, i) => {
        "use strict";
        const n = i(384),
          s = i(874),
          { hide: a, show: o } = i(227),
          r = ["main", "xiajia", "duimian", "shangjia"];
        t.exports = class {
          constructor(t, e, i, a, o, r, h) {
            (this._root = t),
              (this._paipu = e),
              (this._model = new n.Board(e)),
              (this._view = new s($(".board", t), i, a, this._model)),
              (this._pref = o),
              (this._log_idx = -1),
              (this._idx = 0),
              this._deny_repeat,
              this._repeat_timer,
              this._autoplay,
              this._autoplay_timer,
              (this._view.open_shoupai = !0),
              (this._view.open_he = !0),
              (this._speed = 3),
              (this._summary = !1),
              (this._callback = r),
              (this._open_analyzer = h);
          }
          get_pref() {
            return localStorage.getItem(this._pref)
              ? JSON.parse(localStorage.getItem(this._pref))
              : { sound_on: this._view.sound_on, speed: this._speed };
          }
          set_pref() {
            let t = { sound_on: this._view.sound_on, speed: this._speed };
            localStorage.setItem(this._pref, JSON.stringify(t));
          }
          set_handler() {
            this.clear_handler();
            const t = $(".controller", this._root);
            this._root.on("mousedown", (t) => !!t.button || (this.next(), !1)),
              this._root.on("mouseup mousemove touchend", () => {
                (this._repeat_timer = clearInterval(this._repeat_timer)),
                  this._repeet &&
                    ((this._repeet = !1),
                    this._analyzer &&
                      (this._deny_repeat
                        ? this._analyzer.clear()
                        : (this.seek(this._log_idx, this._idx - 1),
                          this._analyzer.active(!0))));
              }),
              $(".next", t).on(
                "mousedown touchstart",
                () => (
                  this._repeat_timer ||
                    (this.next(),
                    (this._repeat_timer = setTimeout(() => {
                      (this._repeet = !0),
                        this._analyzer && this._analyzer.active(!1),
                        (this._repeat_timer = setInterval(() => {
                          this._deny_repeat || this.next();
                        }, 80));
                    }, 200))),
                  !1
                )
              ),
              $(".prev", t).on(
                "mousedown touchstart",
                () => (
                  this._repeat_timer ||
                    (this.prev(),
                    (this._repeat_timer = setTimeout(() => {
                      (this._repeet = !0),
                        this._analyzer && this._analyzer.active(!1),
                        (this._repeat_timer = setInterval(
                          () => this.prev(),
                          80
                        ));
                    }, 200))),
                  !1
                )
              ),
              $(".last", t).on("mousedown", () => this.forward()),
              $(".first", t).on("mousedown", () => this.backward()),
              $(".play", t).on("mousedown", () => this.autoplay()),
              $(".summary", t).on("mousedown", () => this.summary()),
              $(".analyzer", t).on("mousedown", () => this.analyzer()),
              $(".sound", t).on("mousedown", () =>
                this.sound(!this._view.sound_on)
              ),
              $(".minus", t).on("mousedown", () => this.speed(this._speed - 1)),
              $(".plus", t).on("mousedown", () => this.speed(this._speed + 1)),
              $(".exit", t).on("mousedown", () => this.exit());
            for (let t = 0; t < 4; t++)
              $(`.shoupai.${r[t]}`, this._root).on("mousedown", ".pai", () =>
                this.shoupai()
              ),
                $(`.he.${r[t]}`, this._root).on("mousedown", ".pai", () =>
                  this.he()
                ),
                $(`.player.${r[t]}`, this._root).on("mousedown", () =>
                  this.viewpoint(this._view.viewpoint + t)
                ),
                $(`.player .${r[t]}`, this._root).on("mousedown", () => {
                  this.viewpoint(this._view.viewpoint + t);
                });
            o($("> *", t)),
              a($(".play.off", t)),
              $(window).on("keyup.paipu", (t) => {
                this._repeet &&
                  ((this._repeet = !1),
                  this._analyzer &&
                    (this._deny_repeat
                      ? this._analyzer.clear()
                      : (this.seek(this._log_idx, this._idx - 1),
                        this._analyzer.active(!0)))),
                  "ArrowRight" == t.key
                    ? this.forward()
                    : "ArrowLeft" == t.key
                    ? this.backward()
                    : " " == t.key
                    ? this.autoplay()
                    : "v" == t.key
                    ? this.viewpoint(this._view.viewpoint + 1)
                    : "?" == t.key
                    ? this.summary()
                    : "i" == t.key
                    ? this.analyzer()
                    : "a" == t.key
                    ? this.sound(!this._view.sound_on)
                    : "-" == t.key
                    ? this.speed(this._speed - 1)
                    : "+" == t.key
                    ? this.speed(this._speed + 1)
                    : "s" == t.key
                    ? this.shoupai()
                    : "h" == t.key
                    ? this.he()
                    : ("q" != t.key && "Escape" != t.key) || this.exit();
              }),
              $(window).on("keydown.paipu", (t) => {
                t.key.match(/^Arrow/) && t.preventDefault(),
                  (t.originalEvent.repeat &&
                    ((this._repeet = !0),
                    this._analyzer && this._analyzer.active(!1),
                    this._deny_repeat)) ||
                    ("Enter" == t.key || "ArrowDown" == t.key
                      ? this.next()
                      : "ArrowUp" == t.key && this.prev());
              });
          }
          clear_handler() {
            this._autoplay && this.autoplay(), this.set_fragment("");
            const t = $(".controller", this._root);
            this._root.off("mousedown mouseup mousemove touchstart touchend"),
              $(".player *").off("mousedown"),
              $(".player").off("mousedown"),
              $(".shoupai", this._root).off("mousedown", ".pai"),
              $(".he", this._root).off("mousedown", ".pai"),
              $("*", t).off("mousedown touchstart"),
              $(window).off(".paipu");
          }
          start(t = 0, e = -1, i = 0) {
            this.set_handler();
            let n = this.get_pref();
            this.sound(n.sound_on),
              this.speed(n.speed),
              (this._view.viewpoint = (4 + (t % 4)) % 4),
              this.set_fragment(),
              e < 0
                ? (a($(".controller", this._root)), this._view.kaiju())
                : this.seek(e, i);
          }
          exit() {
            this.clear_handler(), this._callback();
          }
          seek(t, e) {
            let i;
            for (
              this._deny_repeat = !1,
                this._summary && this.summary(),
                t =
                  t < 0
                    ? 0
                    : this._paipu.log.length - 1 < t
                    ? this._paipu.log.length - 1
                    : t,
                e =
                  e < 0
                    ? 0
                    : this._paipu.log[t].length - 1 < e
                    ? this._paipu.log[t].length - 1
                    : e,
                this._log_idx = t,
                this._idx = 0,
                this._redo = !1;
              this._idx <= e;

            )
              (i = this._paipu.log[this._log_idx][this._idx]),
                i.qipai
                  ? this._model.qipai(i.qipai)
                  : i.zimo
                  ? this._model.zimo(i.zimo)
                  : i.dapai
                  ? this._model.dapai(i.dapai)
                  : i.fulou
                  ? this._model.fulou(i.fulou)
                  : i.gang
                  ? this._model.gang(i.gang)
                  : i.gangzimo
                  ? this._model.zimo(i.gangzimo)
                  : i.kaigang
                  ? this._model.kaigang(i.kaigang)
                  : i.hule
                  ? this._model.hule(i.hule)
                  : i.pingju && this._model.pingju(i.pingju),
                this._analyzer &&
                  !this._repeet &&
                  (e == this._idx
                    ? this._analyzer.action(i)
                    : this._analyzer.next(i)),
                this._idx++;
            this.set_fragment(),
              this._view.redraw(),
              o($(".controller", this._root)),
              (i.hule || i.pingju) && this._view.update(i);
          }
          next() {
            if (
              (o($(".controller", this._root)),
              (this._autoplay_timer = clearTimeout(this._autoplay_timer)),
              this._log_idx < 0 && ((this._log_idx = 0), (this._idx = 0)),
              this._log_idx == this._paipu.log.length)
            )
              return void this.exit();
            if (
              (this._idx >= this._paipu.log[this._log_idx].length &&
                (this._log_idx++, (this._idx = 0)),
              this._log_idx == this._paipu.log.length)
            )
              return (
                (this._deny_repeat = !1),
                this._model.jieju(this._paipu),
                this._view.update(),
                void this.summary()
              );
            if (this._summary) return void this.summary();
            let t = this._paipu.log[this._log_idx][this._idx];
            if (
              (t.qipai
                ? this.qipai(t)
                : t.zimo
                ? this.zimo(t)
                : t.dapai
                ? this.dapai(t)
                : t.fulou
                ? this.fulou(t)
                : t.gang
                ? this.gang(t)
                : t.gangzimo
                ? this.gangzimo(t)
                : t.kaigang
                ? this.kaigang(t)
                : t.hule
                ? this.hule(t)
                : t.pingju && this.pingju(t),
              !this._analyzer ||
                this._redo ||
                this._repeet ||
                this._analyzer.action(t),
              this._redo || this._idx++,
              this._paipu.log[this._log_idx][this._idx] &&
                this._paipu.log[this._log_idx][this._idx].kaigang &&
                this.next(),
              this._autoplay && !this._deny_repeat)
            ) {
              let t = this._redo ? 500 : 200 * this._speed;
              this._autoplay_timer = setTimeout(() => this.next(), t);
            }
            this.set_fragment();
          }
          prev() {
            if (this._summary || this._log_idx < 0 || 0 == this._idx) return !0;
            this._autoplay && this.autoplay();
            let t = this._idx >= 2 ? this._idx - 2 : 0,
              e = this._paipu.log[this._log_idx][t];
            for (
              ;
              t > 0 &&
              !(e.zimo || e.gangzimo || (e.fulou && !e.fulou.m.match(/\d{4}/)));

            )
              e = this._paipu.log[this._log_idx][--t];
            this.seek(this._log_idx, t);
          }
          qipai(t) {
            (this._deny_repeat = !1),
              this._model.qipai(t.qipai),
              this._view.redraw();
          }
          zimo(t) {
            this._model.zimo(t.zimo), this._view.update(t);
          }
          dapai(t) {
            if ("*" == t.dapai.p.substr(-1) && !this._redo)
              return (this._redo = !0), void this._view.say("lizhi", t.dapai.l);
            (this._redo = !1), this._model.dapai(t.dapai), this._view.update(t);
          }
          fulou(t) {
            if (this._redo)
              (this._redo = !1),
                this._model.fulou(t.fulou),
                this._view.update(t);
            else {
              this._redo = !0;
              let e = t.fulou.m.replace(/0/, "5");
              e.match(/^[mpsz](\d)\1\1\1/)
                ? this._view.say("gang", t.fulou.l)
                : e.match(/^[mpsz](\d)\1\1/)
                ? this._view.say("peng", t.fulou.l)
                : this._view.say("chi", t.fulou.l);
            }
          }
          gang(t) {
            if (!this._redo)
              return (this._redo = !0), void this._view.say("gang", t.gang.l);
            (this._redo = !1), this._model.gang(t.gang), this._view.update(t);
          }
          gangzimo(t) {
            this._model.zimo(t.gangzimo), this._view.update(t);
          }
          kaigang(t) {
            this._model.kaigang(t.kaigang), this._view.update(t);
          }
          hule(t) {
            if (
              this._redo ||
              this._paipu.log[this._log_idx][this._idx - 1].hule
            )
              (this._redo = !1),
                this._model.hule(t.hule),
                this._view.update(t),
                (this._deny_repeat = !0);
            else {
              (this._redo = !0),
                null == t.hule.baojia
                  ? this._view.say("zimo", t.hule.l)
                  : this._view.say("rong", t.hule.l);
              let e = 1;
              for (; this._idx + e < this._paipu.log[this._log_idx].length; ) {
                let t = this._paipu.log[this._log_idx][this._idx + e];
                this._view.say("rong", t.hule.l), e++;
              }
            }
          }
          pingju(t) {
            if (this._redo || !t.pingju.name.match(/^三家和/))
              (this._redo = !1),
                this._model.pingju(t.pingju),
                this._view.update(t),
                (this._deny_repeat = !0);
            else {
              this._redo = !0;
              for (let t = 1; t < 4; t++) {
                let e = (this._model.lunban + t) % 4;
                this._view.say("rong", e);
              }
            }
          }
          top(t) {
            return (
              this._autoplay && this.autoplay(),
              t < 0 || this._paipu.log.length <= t || this.seek(t, 0),
              !1
            );
          }
          last() {
            this._autoplay && this.autoplay();
            let t = this._paipu.log[this._log_idx].length - 1,
              e = this._paipu.log[this._log_idx][t];
            for (; t > 0 && (e.hule || e.pingju); )
              e = this._paipu.log[this._log_idx][--t];
            return (
              this.seek(this._log_idx, t),
              (e = this._paipu.log[this._log_idx][this._idx]),
              (e.hule || e.pingju) &&
                (this.next(), this._redo && setTimeout(() => this.next(), 400)),
              !1
            );
          }
          forward() {
            return (
              !!this._summary ||
              (!(
                this._log_idx < 0 || this._paipu.log.length <= this._log_idx
              ) &&
                (this._idx < this._paipu.log[this._log_idx].length &&
                !this._deny_repeat
                  ? this.last()
                  : (this.next(), !1)))
            );
          }
          backward() {
            return (
              !!this._summary ||
              this._paipu.log.length <= this._log_idx ||
              (this._idx > 1
                ? this.top(this._log_idx)
                : this.top(this._log_idx - 1))
            );
          }
          summary() {
            if (this._log_idx < 0 || this._deny_repeat) return !0;
            if (this._summary)
              return (
                this._view.summary(),
                this._analyzer && this._analyzer.active(!0),
                o($(".controller", this._root)),
                (this._summary = !1),
                this._autoplay && this.next(),
                !1
              );
            (this._autoplay_timer = clearTimeout(this._autoplay_timer)),
              a($(".controller", this._root)),
              this._analyzer && this._analyzer.active(!1),
              this._view.summary(this._paipu);
            for (let t = 0; t < this._paipu.log.length; t++)
              $(".summary tbody tr", this._root)
                .eq(t)
                .on("mousedown", (e) => this.top(t));
            return (
              $(".summary", this._root).addClass("paipu"),
              (this._summary = !0),
              !1
            );
          }
          viewpoint(t) {
            if (this._summary) return !0;
            if (
              (this._autoplay && this.autoplay(),
              (this._view.viewpoint = t % 4),
              this._analyzer &&
                (this._analyzer.id(this._view.viewpoint),
                this._log_idx >= 0 && this.seek(this._log_idx, this._idx - 1)),
              this.set_fragment(),
              this._log_idx < 0)
            )
              return this._view.kaiju(), !1;
            this._view.redraw();
            let e = this._paipu.log[this._log_idx][this._idx - 1];
            return (e.hule || e.pingju) && this._view.update(e), !1;
          }
          speed(t) {
            t < 1 && (t = 1), t > 5 && (t = 5), (this._speed = t);
            const e = $(".controller", this._root);
            return (
              $(".speed span", e).each((e, i) => {
                $(i).css("visibility", e < t ? "visible" : "hidden");
              }),
              this.set_pref(),
              !1
            );
          }
          sound(t) {
            this._view.sound_on = t;
            const e = $(".controller", this._root);
            return (
              t
                ? (a($(".sound.off", e)), o($(".sound.on", e)))
                : (a($(".sound.on", e)), o($(".sound.off", e))),
              this.set_pref(),
              !1
            );
          }
          shoupai() {
            if (this._summary) return !0;
            if (
              ((this._view.open_shoupai = !this._view.open_shoupai),
              this.set_fragment(),
              this._log_idx < 0)
            )
              return !1;
            this._view.redraw();
            let t = this._paipu.log[this._log_idx][this._idx - 1];
            return (t.hule || t.pingju) && this._view.update(t), !1;
          }
          he() {
            if (this._summary) return !0;
            if (
              ((this._view.open_he = !this._view.open_he),
              this.set_fragment(),
              this._log_idx < 0)
            )
              return !1;
            this._view.redraw();
            let t = this._paipu.log[this._log_idx][this._idx - 1];
            return (t.hule || t.pingju) && this._view.update(t), !1;
          }
          autoplay() {
            if (this._summary && !this._autoplay) return !0;
            (this._autoplay_timer = clearTimeout(this._autoplay_timer)),
              (this._autoplay = !this._autoplay);
            const t = $(".controller", this._root);
            return (
              this._autoplay
                ? (a($(".play.on"), t), o($(".play.off"), t))
                : (a($(".play.off"), t), o($(".play.on"), t)),
              this._autoplay && !this._deny_repeat && this.next(),
              !1
            );
          }
          analyzer() {
            return (
              !!this._summary ||
              (this._analyzer
                ? (this._analyzer.close(), delete this._analyzer)
                : (this._autoplay && this.autoplay(),
                  (this._analyzer = this._open_analyzer({
                    kaiju: {
                      id: this._view.viewpoint,
                      rule: n.rule(),
                      title: this._paipu.title,
                      player: this._paipu.player,
                      qijia: this._paipu.qijia,
                    },
                  })),
                  this._log_idx < 0
                    ? this._analyzer.active(!1)
                    : (this.seek(this._log_idx, this._idx - 1),
                      this._analyzer.active(!0))),
              this.set_fragment(),
              !1)
            );
          }
          set_fragment(t) {
            if (t) this._fragment_base = t.replace(/\/.*$/, "");
            else if ("" == t)
              history.replaceState("", "", location.href.replace(/#.*$/, ""));
            else {
              if (!this._fragment_base) return;
              let t = [this._view.viewpoint];
              this._log_idx >= 0 && t.push(this._log_idx, this._idx - 1);
              let e =
                  (this._view.open_shoupai ? "" : "s") +
                  (this._view.open_he ? "" : "h") +
                  (this._analyzer ? "i" : ""),
                i =
                  this._fragment_base + "/" + t.join("/") + (e ? `:${e}` : "");
              history.replaceState("", "", i);
            }
          }
        };
      },
      987: (t, e, i) => {
        "use strict";
        const n = i(755),
          s = i(384),
          { hide: a, show: o, fadeIn: r } = i(227),
          { setSelector: h, clearSelector: l } = i(352),
          u = i(767);
        t.exports = class extends s.Player {
          constructor(t, e) {
            super(),
              (this._node = {
                root: t,
                button: n(".player-button", t),
                mianzi: n(".select-mianzi", t),
                dapai: n(".shoupai.main .bingpai", t),
              }),
              (this._mianzi = u(e)),
              this.clear_handler();
          }
          clear_handler() {
            this.clear_button(),
              this.clear_mianzi(),
              this.clear_dapai(),
              l("dialog"),
              l("summary");
          }
          callback(t) {
            return this.clear_handler(), this._callback(t), !1;
          }
          set_button(t, e) {
            o(
              n(`.${t}`, this._node.button)
                .attr("tabindex", 0)
                .on("click.button", e)
            ),
              (this._show_button = !0);
          }
          show_button(t = () => {}) {
            if (!this._show_button) return t();
            const e = () => {
              this.clear_button(), t();
            };
            this.set_button("cansel", e),
              this._node.root.on("click.button", e),
              o(this._node.button.width(n(this._node.dapai).width())),
              h(n(".button[tabindex]", this._node.button), "button", {
                focus: -1,
                touch: !1,
              });
          }
          clear_button() {
            a(n(".button", this._node.button)),
              l("button"),
              a(this._node.button),
              this._node.root.off(".button"),
              (this._show_button = !1);
          }
          select_mianzi(t) {
            this.clear_button(), this._node.mianzi.empty();
            for (let e of t) {
              let t = 4 == e.match(/\d/g).length ? { gang: e } : { fulou: e };
              this._node.mianzi.append(
                this._mianzi(e, !0).on("click.mianzi", () => this.callback(t))
              );
            }
            return (
              o(this._node.mianzi.width(n(this._node.dapai).width())),
              h(n(".mianzi", this._node.mianzi), "mianzi", {
                touch: !1,
                focus: null,
              }),
              !1
            );
          }
          clear_mianzi() {
            setTimeout(() => a(this._node.mianzi), 400), l("mianzi");
          }
          select_dapai(t) {
            for (let e of t || this.get_dapai(this.shoupai)) {
              let i = n(
                "_" == e.substr(-1)
                  ? `.zimo .pai[data-pai="${e.substr(0, 2)}"]`
                  : `> .pai[data-pai="${e}"]`,
                this._node.dapai
              );
              t && (i.addClass("blink"), (e += "*")),
                i
                  .attr("tabindex", 0)
                  .attr("role", "button")
                  .on("click.dapai", (t) => {
                    n(t.target).addClass("dapai"), this.callback({ dapai: e });
                  });
            }
            h(n(".pai[tabindex]", this._node.dapai), "dapai", { focus: -1 });
          }
          clear_dapai() {
            n(".pai", this._node.dapai).removeClass("blink"), l("dapai");
          }
          action_kaiju(t) {
            this.callback();
          }
          action_qipai(t) {
            this.callback();
          }
          action_zimo(t, e) {
            if (t.l != this._menfeng) return this._callback();
            this.allow_hule(this.shoupai, null, e) &&
              this.set_button("zimo", () => this.callback({ hule: "-" })),
              this.allow_pingju(this.shoupai) &&
                this.set_button("pingju", () => this.callback({ daopai: "-" }));
            let i = this.get_gang_mianzi(this.shoupai);
            if (
              (1 == i.length
                ? this.set_button("gang", () => this.callback({ gang: i[0] }))
                : i.length > 1 &&
                  this.set_button("gang", () => this.select_mianzi(i)),
              this.shoupai.lizhi)
            )
              return void this.show_button(() =>
                this.callback({ dapai: t.p + "_" })
              );
            let n = this.allow_lizhi(this.shoupai);
            n.length &&
              this.set_button("lizhi", () => {
                this.clear_handler(), this.select_dapai(n);
              }),
              this.show_button(() => this.select_dapai());
          }
          action_dapai(t) {
            if (
              (this.allow_no_daopai(this.shoupai) &&
                this.set_button("daopai", () => this.callback()),
              t.l == this._menfeng)
            )
              return this._show_button
                ? void setTimeout(() => {
                    this.show_button(() => this.callback({ daopai: "-" }));
                  }, 500)
                : this.callback();
            let e = ["", "+", "=", "-"][
                (4 + this._model.lunban - this._menfeng) % 4
              ],
              i = t.p + e;
            this.allow_hule(this.shoupai, i) &&
              this.set_button("rong", () => this.callback({ hule: "-" }));
            let n = this.get_gang_mianzi(this.shoupai, i);
            1 == n.length &&
              this.set_button("gang", () => this.callback({ fulou: n[0] }));
            let a = this.get_peng_mianzi(this.shoupai, i);
            1 == a.length
              ? this.set_button("peng", () => this.callback({ fulou: a[0] }))
              : a.length > 1 &&
                this.set_button("peng", () => this.select_mianzi(a));
            let o = this.get_chi_mianzi(this.shoupai, i);
            1 == o.length
              ? this.set_button("chi", () => this.callback({ fulou: o[0] }))
              : o.length > 1 &&
                this.set_button("chi", () => this.select_mianzi(o)),
              this.show_button(() => {
                0 == this._model.shan.paishu &&
                0 == s.Util.xiangting(this.shoupai)
                  ? this.callback({ daopai: "-" })
                  : this.callback();
              });
          }
          action_fulou(t) {
            return t.l != this._menfeng || t.m.match(/^[mpsz]\d{4}/)
              ? this._callback()
              : void this.select_dapai();
          }
          action_gang(t) {
            if (t.l == this._menfeng) return this._callback();
            if (t.m.match(/^[mpsz]\d{4}$/)) return this._callback();
            let e = ["", "+", "=", "-"][
                (4 + this._model.lunban - this._menfeng) % 4
              ],
              i = t.m[0] + t.m.substr(-1) + e;
            this.allow_hule(this.shoupai, i, !0) &&
              this.set_button("rong", () => this.callback({ hule: "-" })),
              this.show_button(() => this.callback());
          }
          action_hule() {
            n(".hule-dialog", this._node.root)
              .off("click")
              .on("click", () => this.callback()),
              setTimeout(() => {
                h(n(".hule-dialog", this._node.root), "dialog", { touch: !1 });
              }, 800);
          }
          action_pingju() {
            this.action_hule();
          }
          action_jieju(t) {
            n(".summary", this._node.root)
              .off("click")
              .on("click", () => this.callback()),
              setTimeout(() => {
                h(n(".summary", this._node.root), "summary", { touch: !1 });
              }, 800);
          }
        };
      },
      32: (t, e, i) => {
        "use strict";
        const n = i(755);
        t.exports = {
          scale: function (t, e) {
            let i = n("body").height(),
              s = t.height();
            if (s > i) {
              let a = i / s,
                o = (i - s) / 2;
              t.css("transform", `translate(0px, ${o}px) scale(${a})`),
                n(window).scrollTop(e.height());
            } else t.css("transform", "");
          },
        };
      },
      352: (t) => {
        "use strict";
        const e = {};
        function i(t) {
          "." != t[0] && (t = "." + t),
            e[t] &&
              (e[t].removeAttr("tabindex role").off(t),
              $(window).off(t),
              delete e[t]);
        }
        t.exports = {
          setSelector: function (t, n, s = {}) {
            i(n);
            let a = {
              confirm: "Enter",
              prev: "ArrowLeft",
              next: "ArrowRight",
              tabindex: 0,
              focus: 0,
              touch: !0,
            };
            Object.assign(a, s), "." != n[0] && (n = "." + n), (e[n] = t);
            let o = null,
              r = t.length;
            function h(t) {
              if (a.touch)
                return (
                  $(t.target)
                    .off("touchstart" + n)
                    .trigger("focus"),
                  !1
                );
              $(t.target).trigger("focus");
            }
            return (
              t
                .attr("tabindex", a.tabindex)
                .attr("role", "button")
                .on("touchstart" + n, h)
                .on("focus" + n, (e) => {
                  o = t.index($(e.target));
                })
                .on("blur" + n, (t) => {
                  (o = null), $(t.target).on("touchstart" + n, h);
                })
                .on("mouseover" + n, (t) => $(t.target).trigger("focus"))
                .on("mouseout" + n, (t) => $(t.target).trigger("blur")),
              a.confirm &&
                $(window).on("keyup" + n, (e) => {
                  if (e.key == a.confirm && null != o)
                    return t.eq(o).trigger("click"), !1;
                }),
              (a.prev || prev.next) &&
                $(window).on("keydown" + n, (e) =>
                  e.key == a.prev
                    ? ((o = null == o ? r - 1 : o <= 0 ? 0 : o - 1),
                      t.eq(o).trigger("touchstart"),
                      !1)
                    : e.key == a.next
                    ? ((o = null == o ? 0 : o >= r - 1 ? r - 1 : o + 1),
                      t.eq(o).trigger("touchstart"),
                      !1)
                    : void 0
                ),
              null != a.focus && t.eq(a.focus).trigger("touchstart"),
              t
            );
          },
          clearSelector: i,
        };
      },
      801: (t) => {
        "use strict";
        t.exports = class {
          constructor(t, e, i) {
            (this._node = {
              baopai: $(".baopai", t),
              fubaopai: $(".fubaopai", t),
              paishu: $(".paishu", t),
            }),
              (this._pai = e),
              (this._shan = i);
          }
          redraw() {
            let t = this._shan.baopai;
            this._node.baopai.attr("aria-label", "ドラ"),
              this._node.baopai.empty();
            for (let e = 0; e < 5; e++)
              this._node.baopai.append(this._pai(t[e] || "_"));
            let e = this._shan.fubaopai || [];
            this._node.fubaopai.attr("aria-label", "裏ドラ"),
              this._node.fubaopai.empty();
            for (let t = 0; t < 5; t++)
              this._node.fubaopai.append(this._pai(e[t] || "_"));
            return this._node.paishu.text(this._shan.paishu), this;
          }
          update() {
            return this._node.paishu.text(this._shan.paishu), this;
          }
        };
      },
      555: (t, e, i) => {
        "use strict";
        const n = i(755),
          s = i(767);
        t.exports = class {
          constructor(t, e, i, a) {
            (this._node = { bingpai: n(".bingpai", t), fulou: n(".fulou", t) }),
              (this._pai = e),
              (this._mianzi = s(e)),
              (this._shoupai = i),
              (this._open = a);
          }
          redraw(t) {
            null != t && (this._open = t),
              this._node.bingpai.attr("aria-label", "手牌"),
              this._node.bingpai.empty();
            let e = this._shoupai._zimo,
              i = this._shoupai._bingpai._ + ("_" == e ? -1 : 0);
            for (let t = 0; t < i; t++)
              this._node.bingpai.append(this._pai("_"));
            for (let t of ["m", "p", "s", "z"]) {
              let n = this._shoupai._bingpai[t],
                s = n[0];
              for (let a = 1; a < n.length; a++) {
                (i = n[a]),
                  t + a == e ? i-- : 5 == a && t + 0 == e && (i--, s--);
                for (let e = 0; e < i; e++) {
                  let i = 5 == a && s > e ? t + 0 : t + a;
                  this._node.bingpai.append(
                    this._open ? this._pai(i) : this._pai("_")
                  );
                }
              }
            }
            e &&
              e.length <= 2 &&
              this._node.bingpai.append(
                n('<span class="zimo">').append(
                  this._open ? this._pai(e) : this._pai("_")
                )
              ),
              this._node.fulou.empty();
            for (let t of this._shoupai._fulou)
              this._node.fulou.append(this._mianzi(t));
            return this;
          }
          dapai(t) {
            let e = n(".pai.dapai", this._node.bingpai);
            return (
              e.length ||
                ("_" == t[2] && (e = n(".zimo .pai", this._node.bingpai))),
              e.length ||
                (this._open
                  ? (e = n(
                      `.pai[data-pai="${t.substr(0, 2)}"]`,
                      this._node.bingpai
                    ).eq(0))
                  : ((e = n(".pai", this._node.bingpai)),
                    (e = e.eq((Math.random() * (e.length - 1)) | 0)))),
              e.addClass("deleted"),
              this
            );
          }
        };
      },
      95: (t, e, i) => {
        "use strict";
        const n = i(755);
        function s(t, e, i) {
          t ||
            (t = {
              n_game: 0,
              n_rank: [0, 0, 0, 0],
              sum_point: 0,
              n_ju: 0,
              n_hule: 0,
              n_baojia: 0,
              n_lizhi: 0,
              n_fulou: 0,
              sum_defen: 0,
            });
          for (let n of e.log) {
            t.n_ju++;
            let s = (i + 4 - e.qijia + 4 - n[0].qipai.jushu) % 4,
              a = n.find((t) => t.hule && t.hule.l == s);
            a && (t.n_hule++, (t.sum_defen += +a.hule.defen)),
              n.find((t) => t.hule && t.hule.baojia == s) && t.n_baojia++,
              n.find(
                (t) => t.dapai && t.dapai.l == s && "*" == t.dapai.p.substr(-1)
              ) && t.n_lizhi++,
              n.find((t) => t.fulou && t.fulou.l == s) && t.n_fulou++;
          }
          return (
            t.n_game++,
            t.n_rank[e.rank[i] - 1]++,
            (t.sum_point += +e.point[i]),
            t
          );
        }
        function a(t, e, i) {
          let n = t.toFixed(e);
          return 1 == i
            ? n.replace(/^0\./, ".")
            : 2 == i && t > 0
            ? "+" + n
            : n;
        }
        t.exports = class {
          constructor(t, e, i) {
            (this._root = t), (this._tr = n("tbody tr", t).eq(0));
            let { title: o, player: r } = (function (t) {
              let e = t[0].title.replace(/\n.*$/, ""),
                i = {};
              for (let n of t) {
                n.title.replace(/\n.*$/, "") != e && (e = "");
                for (let t = 0; t < 4; t++) {
                  let e = n.player[t].replace(/\n.*$/, "");
                  i[e] = s(i[e], n, t);
                }
              }
              return { title: e, player: i };
            })(e);
            (this._table = (function (t) {
              let e = [];
              for (let i of Object.keys(t)) {
                let n = t[i];
                e.push([
                  i,
                  n.n_game,
                  a(n.sum_point, 1, 2),
                  a(
                    (n.n_rank[0] +
                      2 * n.n_rank[1] +
                      3 * n.n_rank[2] +
                      4 * n.n_rank[3]) /
                      n.n_game,
                    2
                  ),
                  a(n.n_rank[0] / n.n_game, 3, 1),
                  a((n.n_rank[0] + n.n_rank[1]) / n.n_game, 3, 1),
                  a(n.n_rank[3] / n.n_game, 3, 1),
                  a(n.n_hule / n.n_ju, 3, 1),
                  a(n.n_baojia / n.n_ju, 3, 1),
                  a(n.n_lizhi / n.n_ju, 3, 1),
                  a(n.n_fulou / n.n_ju, 3, 1),
                  a(n.sum_defen / (n.n_hule || 1), 0, 0),
                ]);
              }
              return e;
            })(r)),
              n('input[name="cut-off"]', this._root).prop("checked", !0);
            let h = (Math.max(...this._table.map((t) => t[1])) / 5) | 0;
            n('input[name="n_game"]', this._root).val(h || ""),
              n(".button input", this._root).on("change", () => this.show()),
              n(".title", this._root).text(o),
              n(".file", this._root).on("click", () => {
                n(".stat", this._root).scrollLeft(0),
                  history.replaceState(
                    "",
                    "",
                    location.href.replace(/#.*$/, "")
                  ),
                  i();
              });
            for (let t = 1; t < this._table[0].length; t++)
              n("th", this._root)
                .eq(t)
                .on("click", () => this.sort(t).show());
            this.sort(2).sort(1).show();
          }
          sort(t) {
            return (
              (this._order = Math.abs(this._order) == t ? -this._order : -t),
              n("th", this._root)
                .removeClass("asc")
                .removeClass("desc")
                .eq(t)
                .addClass(this._order > 0 ? "asc" : "desc"),
              (this._table = this._table.sort((e, i) =>
                this._order > 0 ? e[t] - i[t] : i[t] - e[t]
              )),
              this
            );
          }
          show() {
            let t =
              (n('input[name="cut-off"]', this._root).prop("checked") &&
                +n('input[name="n_game"]', this._root).val()) ||
              0;
            const e = n("tbody", this._root);
            e.empty();
            for (let i of this._table.filter((e) => e[1] > t)) {
              let t = this._tr.clone();
              for (let e = 0; e < i.length; e++) n("td", t).eq(e).text(i[e]);
              e.append(t);
            }
          }
        };
      },
      7: (t, e, i) => {
        "use strict";
        const n = i(755),
          { hide: s, show: a, fadeIn: o, fadeOut: r } = (i(384), i(227));
        t.exports = function (t, e, i) {
          let s = n(".r_player .player", t);
          for (let t = 0; t < 4; t++) {
            let n = (i + t) % 4;
            s.eq(t).text(e.player[n].replace(/\n.*$/, ""));
          }
          let a = n(".r_diff", t).eq(0).clone(),
            o = n(".body", t).empty();
          for (let t of e.log) {
            if (0 == t.length) continue;
            let s = t[0].qipai,
              r = [],
              h = [0, 0, 0, 0],
              l = null;
            for (let e of t)
              null != l &&
                (e.hule || (e.pingju && e.pingju.name.match(/^三家和/))
                  ? (l = null)
                  : (h[l] = 1)),
                e.dapai && "*" == e.dapai.p.substr(-1) && (l = e.dapai.l),
                (e.hule || e.pingju) && r.push(e);
            (a = a.clone()),
              n(".jushu", a).text(
                ["東", "南", "西", "北"][s.zhuangfeng] +
                  ["一", "二", "三", "四"][s.jushu] +
                  "局"
              ),
              n(".changbang", a).text(`${s.changbang}本場`),
              n(".last", a).text(
                0 == r.length
                  ? "−"
                  : r[0].pingju
                  ? "流局"
                  : null == r[0].hule.baojia
                  ? "ツモ"
                  : "ロン"
              ),
              n(".back", a).removeClass("zhuangjia"),
              n(".diff", a).removeClass("baojia hule").text(""),
              n(".lizhi", a).text("");
            for (let t = 0; t < 4; t++) {
              let o = (i + 4 - e.qijia + 4 - s.jushu + t) % 4;
              if (
                (0 == o && n(".back", a).eq(t).addClass("zhuangjia"),
                0 == r.length)
              )
                continue;
              h[o] && n(".lizhi", a).eq(t).text("*");
              let l = 0;
              for (let e of r)
                e.hule && (l += e.hule.fenpei[o]),
                  e.pingju && (l += e.pingju.fenpei[o]),
                  e.hule &&
                    (e.hule.baojia == o &&
                      n(".diff", a).eq(t).addClass("baojia"),
                    e.hule.l == o && n(".diff", a).eq(t).addClass("hule"));
              (l = l > 0 ? "+" + l : l < 0 ? "" + l : ""),
                (l = l.replace(/(\d)(\d{3})$/, "$1,$2")),
                n(".diff", a).eq(t).text(l);
            }
            o.append(a);
          }
          let r = n(".r_defen .defen", t);
          for (let t = 0; t < 4; t++) {
            r.eq(t).removeClass("plus minus");
            let n = (i + t) % 4;
            r.eq(t).text(("" + e.defen[n]).replace(/(\d)(\d{3})$/, "$1,$2")),
              1 == e.rank[n] && r.eq(t).addClass("plus"),
              e.defen[n] < 0 && r.eq(t).addClass("minus");
          }
          let h = n(".r_point .point", t);
          for (let t = 0; t < 4; t++) {
            h.eq(t).removeClass("plus minus");
            let n = (i + t) % 4;
            h.eq(t).text((e.point[n] > 0 ? "+" : "") + (e.point[n] ?? "−")),
              e.point[n] > 0 && h.eq(t).addClass("plus"),
              e.point[n] < 0 && h.eq(t).addClass("minus");
          }
          return t;
        };
      },
      400: (t, e, i) => {
        var n, s, a;
        /*!
         * jQuery UI :data 1.13.2
         * http://jqueryui.com
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */ !(function (o) {
          "use strict";
          (s = [i(755), i(592)]),
            void 0 ===
              (a =
                "function" ==
                typeof (n = function (t) {
                  return t.extend(t.expr.pseudos, {
                    data: t.expr.createPseudo
                      ? t.expr.createPseudo(function (e) {
                          return function (i) {
                            return !!t.data(i, e);
                          };
                        })
                      : function (e, i, n) {
                          return !!t.data(e, n[3]);
                        },
                  });
                })
                  ? n.apply(e, s)
                  : n) || (t.exports = a);
        })();
      },
      870: (t, e, i) => {
        var n, s, a;
        !(function (o) {
          "use strict";
          (s = [i(755), i(592)]),
            void 0 ===
              (a =
                "function" ==
                typeof (n = function (t) {
                  return (t.ui.ie = !!/msie [\w.]+/.exec(
                    navigator.userAgent.toLowerCase()
                  ));
                })
                  ? n.apply(e, s)
                  : n) || (t.exports = a);
        })();
      },
      464: (t, e, i) => {
        var n, s, a;
        /*!
         * jQuery UI Scroll Parent 1.13.2
         * http://jqueryui.com
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */ !(function (o) {
          "use strict";
          (s = [i(755), i(592)]),
            void 0 ===
              (a =
                "function" ==
                typeof (n = function (t) {
                  return (t.fn.scrollParent = function (e) {
                    var i = this.css("position"),
                      n = "absolute" === i,
                      s = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                      a = this.parents()
                        .filter(function () {
                          var e = t(this);
                          return (
                            (!n || "static" !== e.css("position")) &&
                            s.test(
                              e.css("overflow") +
                                e.css("overflow-y") +
                                e.css("overflow-x")
                            )
                          );
                        })
                        .eq(0);
                    return "fixed" !== i && a.length
                      ? a
                      : t(this[0].ownerDocument || document);
                  });
                })
                  ? n.apply(e, s)
                  : n) || (t.exports = a);
        })();
      },
      592: (t, e, i) => {
        var n, s, a;
        !(function (o) {
          "use strict";
          (s = [i(755)]),
            void 0 ===
              (a =
                "function" ==
                typeof (n = function (t) {
                  return (t.ui = t.ui || {}), (t.ui.version = "1.13.2");
                })
                  ? n.apply(e, s)
                  : n) || (t.exports = a);
        })();
      },
      891: (t, e, i) => {
        var n, s, a;
        /*!
         * jQuery UI Widget 1.13.2
         * http://jqueryui.com
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */ !(function (o) {
          "use strict";
          (s = [i(755), i(592)]),
            (n = function (t) {
              var e = 0,
                i = Array.prototype.hasOwnProperty,
                n = Array.prototype.slice;
              return (
                (t.cleanData = (function (e) {
                  return function (i) {
                    var n, s, a;
                    for (a = 0; null != (s = i[a]); a++)
                      (n = t._data(s, "events")) &&
                        n.remove &&
                        t(s).triggerHandler("remove");
                    e(i);
                  };
                })(t.cleanData)),
                (t.widget = function (e, i, n) {
                  var s,
                    a,
                    o,
                    r = {},
                    h = e.split(".")[0],
                    l = h + "-" + (e = e.split(".")[1]);
                  return (
                    n || ((n = i), (i = t.Widget)),
                    Array.isArray(n) &&
                      (n = t.extend.apply(null, [{}].concat(n))),
                    (t.expr.pseudos[l.toLowerCase()] = function (e) {
                      return !!t.data(e, l);
                    }),
                    (t[h] = t[h] || {}),
                    (s = t[h][e]),
                    (a = t[h][e] =
                      function (t, e) {
                        if (!this || !this._createWidget) return new a(t, e);
                        arguments.length && this._createWidget(t, e);
                      }),
                    t.extend(a, s, {
                      version: n.version,
                      _proto: t.extend({}, n),
                      _childConstructors: [],
                    }),
                    ((o = new i()).options = t.widget.extend({}, o.options)),
                    t.each(n, function (t, e) {
                      r[t] =
                        "function" == typeof e
                          ? (function () {
                              function n() {
                                return i.prototype[t].apply(this, arguments);
                              }
                              function s(e) {
                                return i.prototype[t].apply(this, e);
                              }
                              return function () {
                                var t,
                                  i = this._super,
                                  a = this._superApply;
                                return (
                                  (this._super = n),
                                  (this._superApply = s),
                                  (t = e.apply(this, arguments)),
                                  (this._super = i),
                                  (this._superApply = a),
                                  t
                                );
                              };
                            })()
                          : e;
                    }),
                    (a.prototype = t.widget.extend(
                      o,
                      { widgetEventPrefix: (s && o.widgetEventPrefix) || e },
                      r,
                      {
                        constructor: a,
                        namespace: h,
                        widgetName: e,
                        widgetFullName: l,
                      }
                    )),
                    s
                      ? (t.each(s._childConstructors, function (e, i) {
                          var n = i.prototype;
                          t.widget(
                            n.namespace + "." + n.widgetName,
                            a,
                            i._proto
                          );
                        }),
                        delete s._childConstructors)
                      : i._childConstructors.push(a),
                    t.widget.bridge(e, a),
                    a
                  );
                }),
                (t.widget.extend = function (e) {
                  for (
                    var s, a, o = n.call(arguments, 1), r = 0, h = o.length;
                    r < h;
                    r++
                  )
                    for (s in o[r])
                      (a = o[r][s]),
                        i.call(o[r], s) &&
                          void 0 !== a &&
                          (t.isPlainObject(a)
                            ? (e[s] = t.isPlainObject(e[s])
                                ? t.widget.extend({}, e[s], a)
                                : t.widget.extend({}, a))
                            : (e[s] = a));
                  return e;
                }),
                (t.widget.bridge = function (e, i) {
                  var s = i.prototype.widgetFullName || e;
                  t.fn[e] = function (a) {
                    var o = "string" == typeof a,
                      r = n.call(arguments, 1),
                      h = this;
                    return (
                      o
                        ? this.length || "instance" !== a
                          ? this.each(function () {
                              var i,
                                n = t.data(this, s);
                              return "instance" === a
                                ? ((h = n), !1)
                                : n
                                ? "function" != typeof n[a] ||
                                  "_" === a.charAt(0)
                                  ? t.error(
                                      "no such method '" +
                                        a +
                                        "' for " +
                                        e +
                                        " widget instance"
                                    )
                                  : (i = n[a].apply(n, r)) !== n && void 0 !== i
                                  ? ((h =
                                      i && i.jquery ? h.pushStack(i.get()) : i),
                                    !1)
                                  : void 0
                                : t.error(
                                    "cannot call methods on " +
                                      e +
                                      " prior to initialization; attempted to call method '" +
                                      a +
                                      "'"
                                  );
                            })
                          : (h = void 0)
                        : (r.length &&
                            (a = t.widget.extend.apply(null, [a].concat(r))),
                          this.each(function () {
                            var e = t.data(this, s);
                            e
                              ? (e.option(a || {}), e._init && e._init())
                              : t.data(this, s, new i(a, this));
                          })),
                      h
                    );
                  };
                }),
                (t.Widget = function () {}),
                (t.Widget._childConstructors = []),
                (t.Widget.prototype = {
                  widgetName: "widget",
                  widgetEventPrefix: "",
                  defaultElement: "<div>",
                  options: { classes: {}, disabled: !1, create: null },
                  _createWidget: function (i, n) {
                    (n = t(n || this.defaultElement || this)[0]),
                      (this.element = t(n)),
                      (this.uuid = e++),
                      (this.eventNamespace = "." + this.widgetName + this.uuid),
                      (this.bindings = t()),
                      (this.hoverable = t()),
                      (this.focusable = t()),
                      (this.classesElementLookup = {}),
                      n !== this &&
                        (t.data(n, this.widgetFullName, this),
                        this._on(!0, this.element, {
                          remove: function (t) {
                            t.target === n && this.destroy();
                          },
                        }),
                        (this.document = t(
                          n.style ? n.ownerDocument : n.document || n
                        )),
                        (this.window = t(
                          this.document[0].defaultView ||
                            this.document[0].parentWindow
                        ))),
                      (this.options = t.widget.extend(
                        {},
                        this.options,
                        this._getCreateOptions(),
                        i
                      )),
                      this._create(),
                      this.options.disabled &&
                        this._setOptionDisabled(this.options.disabled),
                      this._trigger("create", null, this._getCreateEventData()),
                      this._init();
                  },
                  _getCreateOptions: function () {
                    return {};
                  },
                  _getCreateEventData: t.noop,
                  _create: t.noop,
                  _init: t.noop,
                  destroy: function () {
                    var e = this;
                    this._destroy(),
                      t.each(this.classesElementLookup, function (t, i) {
                        e._removeClass(i, t);
                      }),
                      this.element
                        .off(this.eventNamespace)
                        .removeData(this.widgetFullName),
                      this.widget()
                        .off(this.eventNamespace)
                        .removeAttr("aria-disabled"),
                      this.bindings.off(this.eventNamespace);
                  },
                  _destroy: t.noop,
                  widget: function () {
                    return this.element;
                  },
                  option: function (e, i) {
                    var n,
                      s,
                      a,
                      o = e;
                    if (0 === arguments.length)
                      return t.widget.extend({}, this.options);
                    if ("string" == typeof e)
                      if (
                        ((o = {}),
                        (n = e.split(".")),
                        (e = n.shift()),
                        n.length)
                      ) {
                        for (
                          s = o[e] = t.widget.extend({}, this.options[e]),
                            a = 0;
                          a < n.length - 1;
                          a++
                        )
                          (s[n[a]] = s[n[a]] || {}), (s = s[n[a]]);
                        if (((e = n.pop()), 1 === arguments.length))
                          return void 0 === s[e] ? null : s[e];
                        s[e] = i;
                      } else {
                        if (1 === arguments.length)
                          return void 0 === this.options[e]
                            ? null
                            : this.options[e];
                        o[e] = i;
                      }
                    return this._setOptions(o), this;
                  },
                  _setOptions: function (t) {
                    var e;
                    for (e in t) this._setOption(e, t[e]);
                    return this;
                  },
                  _setOption: function (t, e) {
                    return (
                      "classes" === t && this._setOptionClasses(e),
                      (this.options[t] = e),
                      "disabled" === t && this._setOptionDisabled(e),
                      this
                    );
                  },
                  _setOptionClasses: function (e) {
                    var i, n, s;
                    for (i in e)
                      (s = this.classesElementLookup[i]),
                        e[i] !== this.options.classes[i] &&
                          s &&
                          s.length &&
                          ((n = t(s.get())),
                          this._removeClass(s, i),
                          n.addClass(
                            this._classes({
                              element: n,
                              keys: i,
                              classes: e,
                              add: !0,
                            })
                          ));
                  },
                  _setOptionDisabled: function (t) {
                    this._toggleClass(
                      this.widget(),
                      this.widgetFullName + "-disabled",
                      null,
                      !!t
                    ),
                      t &&
                        (this._removeClass(
                          this.hoverable,
                          null,
                          "ui-state-hover"
                        ),
                        this._removeClass(
                          this.focusable,
                          null,
                          "ui-state-focus"
                        ));
                  },
                  enable: function () {
                    return this._setOptions({ disabled: !1 });
                  },
                  disable: function () {
                    return this._setOptions({ disabled: !0 });
                  },
                  _classes: function (e) {
                    var i = [],
                      n = this;
                    function s() {
                      var i = [];
                      e.element.each(function (e, s) {
                        t
                          .map(n.classesElementLookup, function (t) {
                            return t;
                          })
                          .some(function (t) {
                            return t.is(s);
                          }) || i.push(s);
                      }),
                        n._on(t(i), { remove: "_untrackClassesElement" });
                    }
                    function a(a, o) {
                      var r, h;
                      for (h = 0; h < a.length; h++)
                        (r = n.classesElementLookup[a[h]] || t()),
                          e.add
                            ? (s(),
                              (r = t(
                                t.uniqueSort(r.get().concat(e.element.get()))
                              )))
                            : (r = t(r.not(e.element).get())),
                          (n.classesElementLookup[a[h]] = r),
                          i.push(a[h]),
                          o && e.classes[a[h]] && i.push(e.classes[a[h]]);
                    }
                    return (
                      (e = t.extend(
                        {
                          element: this.element,
                          classes: this.options.classes || {},
                        },
                        e
                      )).keys && a(e.keys.match(/\S+/g) || [], !0),
                      e.extra && a(e.extra.match(/\S+/g) || []),
                      i.join(" ")
                    );
                  },
                  _untrackClassesElement: function (e) {
                    var i = this;
                    t.each(i.classesElementLookup, function (n, s) {
                      -1 !== t.inArray(e.target, s) &&
                        (i.classesElementLookup[n] = t(s.not(e.target).get()));
                    }),
                      this._off(t(e.target));
                  },
                  _removeClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !1);
                  },
                  _addClass: function (t, e, i) {
                    return this._toggleClass(t, e, i, !0);
                  },
                  _toggleClass: function (t, e, i, n) {
                    n = "boolean" == typeof n ? n : i;
                    var s = "string" == typeof t || null === t,
                      a = {
                        extra: s ? e : i,
                        keys: s ? t : e,
                        element: s ? this.element : t,
                        add: n,
                      };
                    return a.element.toggleClass(this._classes(a), n), this;
                  },
                  _on: function (e, i, n) {
                    var s,
                      a = this;
                    "boolean" != typeof e && ((n = i), (i = e), (e = !1)),
                      n
                        ? ((i = s = t(i)),
                          (this.bindings = this.bindings.add(i)))
                        : ((n = i), (i = this.element), (s = this.widget())),
                      t.each(n, function (n, o) {
                        function r() {
                          if (
                            e ||
                            (!0 !== a.options.disabled &&
                              !t(this).hasClass("ui-state-disabled"))
                          )
                            return ("string" == typeof o ? a[o] : o).apply(
                              a,
                              arguments
                            );
                        }
                        "string" != typeof o &&
                          (r.guid = o.guid = o.guid || r.guid || t.guid++);
                        var h = n.match(/^([\w:-]*)\s*(.*)$/),
                          l = h[1] + a.eventNamespace,
                          u = h[2];
                        u ? s.on(l, u, r) : i.on(l, r);
                      });
                  },
                  _off: function (e, i) {
                    (i =
                      (i || "").split(" ").join(this.eventNamespace + " ") +
                      this.eventNamespace),
                      e.off(i),
                      (this.bindings = t(this.bindings.not(e).get())),
                      (this.focusable = t(this.focusable.not(e).get())),
                      (this.hoverable = t(this.hoverable.not(e).get()));
                  },
                  _delay: function (t, e) {
                    function i() {
                      return ("string" == typeof t ? n[t] : t).apply(
                        n,
                        arguments
                      );
                    }
                    var n = this;
                    return setTimeout(i, e || 0);
                  },
                  _hoverable: function (e) {
                    (this.hoverable = this.hoverable.add(e)),
                      this._on(e, {
                        mouseenter: function (e) {
                          this._addClass(
                            t(e.currentTarget),
                            null,
                            "ui-state-hover"
                          );
                        },
                        mouseleave: function (e) {
                          this._removeClass(
                            t(e.currentTarget),
                            null,
                            "ui-state-hover"
                          );
                        },
                      });
                  },
                  _focusable: function (e) {
                    (this.focusable = this.focusable.add(e)),
                      this._on(e, {
                        focusin: function (e) {
                          this._addClass(
                            t(e.currentTarget),
                            null,
                            "ui-state-focus"
                          );
                        },
                        focusout: function (e) {
                          this._removeClass(
                            t(e.currentTarget),
                            null,
                            "ui-state-focus"
                          );
                        },
                      });
                  },
                  _trigger: function (e, i, n) {
                    var s,
                      a,
                      o = this.options[e];
                    if (
                      ((n = n || {}),
                      ((i = t.Event(i)).type = (
                        e === this.widgetEventPrefix
                          ? e
                          : this.widgetEventPrefix + e
                      ).toLowerCase()),
                      (i.target = this.element[0]),
                      (a = i.originalEvent))
                    )
                      for (s in a) s in i || (i[s] = a[s]);
                    return (
                      this.element.trigger(i, n),
                      !(
                        ("function" == typeof o &&
                          !1 === o.apply(this.element[0], [i].concat(n))) ||
                        i.isDefaultPrevented()
                      )
                    );
                  },
                }),
                t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) {
                  t.Widget.prototype["_" + e] = function (n, s, a) {
                    var o;
                    "string" == typeof s && (s = { effect: s });
                    var r = s
                      ? !0 === s || "number" == typeof s
                        ? i
                        : s.effect || i
                      : e;
                    "number" == typeof (s = s || {})
                      ? (s = { duration: s })
                      : !0 === s && (s = {}),
                      (o = !t.isEmptyObject(s)),
                      (s.complete = a),
                      s.delay && n.delay(s.delay),
                      o && t.effects && t.effects.effect[r]
                        ? n[e](s)
                        : r !== e && n[r]
                        ? n[r](s.duration, s.easing, a)
                        : n.queue(function (i) {
                            t(this)[e](), a && a.call(n[0]), i();
                          });
                  };
                }),
                t.widget
              );
            }),
            void 0 === (a = "function" == typeof n ? n.apply(e, s) : n) ||
              (t.exports = a);
        })();
      },
      177: (t, e, i) => {
        var n, s, a;
        /*!
         * jQuery UI Mouse 1.13.2
         * http://jqueryui.com
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */ !(function (o) {
          "use strict";
          (s = [i(755), i(870), i(592), i(891)]),
            void 0 ===
              (a =
                "function" ==
                typeof (n = function (t) {
                  var e = !1;
                  return (
                    t(document).on("mouseup", function () {
                      e = !1;
                    }),
                    t.widget("ui.mouse", {
                      version: "1.13.2",
                      options: {
                        cancel: "input, textarea, button, select, option",
                        distance: 1,
                        delay: 0,
                      },
                      _mouseInit: function () {
                        var e = this;
                        this.element
                          .on("mousedown." + this.widgetName, function (t) {
                            return e._mouseDown(t);
                          })
                          .on("click." + this.widgetName, function (i) {
                            if (
                              !0 ===
                              t.data(
                                i.target,
                                e.widgetName + ".preventClickEvent"
                              )
                            )
                              return (
                                t.removeData(
                                  i.target,
                                  e.widgetName + ".preventClickEvent"
                                ),
                                i.stopImmediatePropagation(),
                                !1
                              );
                          }),
                          (this.started = !1);
                      },
                      _mouseDestroy: function () {
                        this.element.off("." + this.widgetName),
                          this._mouseMoveDelegate &&
                            this.document
                              .off(
                                "mousemove." + this.widgetName,
                                this._mouseMoveDelegate
                              )
                              .off(
                                "mouseup." + this.widgetName,
                                this._mouseUpDelegate
                              );
                      },
                      _mouseDown: function (i) {
                        if (!e) {
                          (this._mouseMoved = !1),
                            this._mouseStarted && this._mouseUp(i),
                            (this._mouseDownEvent = i);
                          var n = this,
                            s = 1 === i.which,
                            a =
                              !(
                                "string" != typeof this.options.cancel ||
                                !i.target.nodeName
                              ) &&
                              t(i.target).closest(this.options.cancel).length;
                          return (
                            !(s && !a && this._mouseCapture(i)) ||
                            ((this.mouseDelayMet = !this.options.delay),
                            this.mouseDelayMet ||
                              (this._mouseDelayTimer = setTimeout(function () {
                                n.mouseDelayMet = !0;
                              }, this.options.delay)),
                            this._mouseDistanceMet(i) &&
                            this._mouseDelayMet(i) &&
                            ((this._mouseStarted = !1 !== this._mouseStart(i)),
                            !this._mouseStarted)
                              ? (i.preventDefault(), !0)
                              : (!0 ===
                                  t.data(
                                    i.target,
                                    this.widgetName + ".preventClickEvent"
                                  ) &&
                                  t.removeData(
                                    i.target,
                                    this.widgetName + ".preventClickEvent"
                                  ),
                                (this._mouseMoveDelegate = function (t) {
                                  return n._mouseMove(t);
                                }),
                                (this._mouseUpDelegate = function (t) {
                                  return n._mouseUp(t);
                                }),
                                this.document
                                  .on(
                                    "mousemove." + this.widgetName,
                                    this._mouseMoveDelegate
                                  )
                                  .on(
                                    "mouseup." + this.widgetName,
                                    this._mouseUpDelegate
                                  ),
                                i.preventDefault(),
                                (e = !0),
                                !0))
                          );
                        }
                      },
                      _mouseMove: function (e) {
                        if (this._mouseMoved) {
                          if (
                            t.ui.ie &&
                            (!document.documentMode ||
                              document.documentMode < 9) &&
                            !e.button
                          )
                            return this._mouseUp(e);
                          if (!e.which)
                            if (
                              e.originalEvent.altKey ||
                              e.originalEvent.ctrlKey ||
                              e.originalEvent.metaKey ||
                              e.originalEvent.shiftKey
                            )
                              this.ignoreMissingWhich = !0;
                            else if (!this.ignoreMissingWhich)
                              return this._mouseUp(e);
                        }
                        return (
                          (e.which || e.button) && (this._mouseMoved = !0),
                          this._mouseStarted
                            ? (this._mouseDrag(e), e.preventDefault())
                            : (this._mouseDistanceMet(e) &&
                                this._mouseDelayMet(e) &&
                                ((this._mouseStarted =
                                  !1 !==
                                  this._mouseStart(this._mouseDownEvent, e)),
                                this._mouseStarted
                                  ? this._mouseDrag(e)
                                  : this._mouseUp(e)),
                              !this._mouseStarted)
                        );
                      },
                      _mouseUp: function (i) {
                        this.document
                          .off(
                            "mousemove." + this.widgetName,
                            this._mouseMoveDelegate
                          )
                          .off(
                            "mouseup." + this.widgetName,
                            this._mouseUpDelegate
                          ),
                          this._mouseStarted &&
                            ((this._mouseStarted = !1),
                            i.target === this._mouseDownEvent.target &&
                              t.data(
                                i.target,
                                this.widgetName + ".preventClickEvent",
                                !0
                              ),
                            this._mouseStop(i)),
                          this._mouseDelayTimer &&
                            (clearTimeout(this._mouseDelayTimer),
                            delete this._mouseDelayTimer),
                          (this.ignoreMissingWhich = !1),
                          (e = !1),
                          i.preventDefault();
                      },
                      _mouseDistanceMet: function (t) {
                        return (
                          Math.max(
                            Math.abs(this._mouseDownEvent.pageX - t.pageX),
                            Math.abs(this._mouseDownEvent.pageY - t.pageY)
                          ) >= this.options.distance
                        );
                      },
                      _mouseDelayMet: function () {
                        return this.mouseDelayMet;
                      },
                      _mouseStart: function () {},
                      _mouseDrag: function () {},
                      _mouseStop: function () {},
                      _mouseCapture: function () {
                        return !0;
                      },
                    })
                  );
                })
                  ? n.apply(e, s)
                  : n) || (t.exports = a);
        })();
      },
      526: (t, e, i) => {
        var n, s, a;
        /*!
         * jQuery UI Sortable 1.13.2
         * http://jqueryui.com
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license.
         * http://jquery.org/license
         */ !(function (o) {
          "use strict";
          (s = [i(755), i(177), i(400), i(870), i(464), i(592), i(891)]),
            (n = function (t) {
              return t.widget("ui.sortable", t.ui.mouse, {
                version: "1.13.2",
                widgetEventPrefix: "sort",
                ready: !1,
                options: {
                  appendTo: "parent",
                  axis: !1,
                  connectWith: !1,
                  containment: !1,
                  cursor: "auto",
                  cursorAt: !1,
                  dropOnEmpty: !0,
                  forcePlaceholderSize: !1,
                  forceHelperSize: !1,
                  grid: !1,
                  handle: !1,
                  helper: "original",
                  items: "> *",
                  opacity: !1,
                  placeholder: !1,
                  revert: !1,
                  scroll: !0,
                  scrollSensitivity: 20,
                  scrollSpeed: 20,
                  scope: "default",
                  tolerance: "intersect",
                  zIndex: 1e3,
                  activate: null,
                  beforeStop: null,
                  change: null,
                  deactivate: null,
                  out: null,
                  over: null,
                  receive: null,
                  remove: null,
                  sort: null,
                  start: null,
                  stop: null,
                  update: null,
                },
                _isOverAxis: function (t, e, i) {
                  return t >= e && t < e + i;
                },
                _isFloating: function (t) {
                  return (
                    /left|right/.test(t.css("float")) ||
                    /inline|table-cell/.test(t.css("display"))
                  );
                },
                _create: function () {
                  (this.containerCache = {}),
                    this._addClass("ui-sortable"),
                    this.refresh(),
                    (this.offset = this.element.offset()),
                    this._mouseInit(),
                    this._setHandleClassName(),
                    (this.ready = !0);
                },
                _setOption: function (t, e) {
                  this._super(t, e),
                    "handle" === t && this._setHandleClassName();
                },
                _setHandleClassName: function () {
                  var e = this;
                  this._removeClass(
                    this.element.find(".ui-sortable-handle"),
                    "ui-sortable-handle"
                  ),
                    t.each(this.items, function () {
                      e._addClass(
                        this.instance.options.handle
                          ? this.item.find(this.instance.options.handle)
                          : this.item,
                        "ui-sortable-handle"
                      );
                    });
                },
                _destroy: function () {
                  this._mouseDestroy();
                  for (var t = this.items.length - 1; t >= 0; t--)
                    this.items[t].item.removeData(this.widgetName + "-item");
                  return this;
                },
                _mouseCapture: function (e, i) {
                  var n = null,
                    s = !1,
                    a = this;
                  return (
                    !this.reverting &&
                    !this.options.disabled &&
                    "static" !== this.options.type &&
                    (this._refreshItems(e),
                    t(e.target)
                      .parents()
                      .each(function () {
                        if (t.data(this, a.widgetName + "-item") === a)
                          return (n = t(this)), !1;
                      }),
                    t.data(e.target, a.widgetName + "-item") === a &&
                      (n = t(e.target)),
                    !!n &&
                      !(
                        this.options.handle &&
                        !i &&
                        (t(this.options.handle, n)
                          .find("*")
                          .addBack()
                          .each(function () {
                            this === e.target && (s = !0);
                          }),
                        !s)
                      ) &&
                      ((this.currentItem = n),
                      this._removeCurrentsFromItems(),
                      !0))
                  );
                },
                _mouseStart: function (e, i, n) {
                  var s,
                    a,
                    o = this.options;
                  if (
                    ((this.currentContainer = this),
                    this.refreshPositions(),
                    (this.appendTo = t(
                      "parent" !== o.appendTo
                        ? o.appendTo
                        : this.currentItem.parent()
                    )),
                    (this.helper = this._createHelper(e)),
                    this._cacheHelperProportions(),
                    this._cacheMargins(),
                    (this.offset = this.currentItem.offset()),
                    (this.offset = {
                      top: this.offset.top - this.margins.top,
                      left: this.offset.left - this.margins.left,
                    }),
                    t.extend(this.offset, {
                      click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top,
                      },
                      relative: this._getRelativeOffset(),
                    }),
                    this.helper.css("position", "absolute"),
                    (this.cssPosition = this.helper.css("position")),
                    o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
                    (this.domPosition = {
                      prev: this.currentItem.prev()[0],
                      parent: this.currentItem.parent()[0],
                    }),
                    this.helper[0] !== this.currentItem[0] &&
                      this.currentItem.hide(),
                    this._createPlaceholder(),
                    (this.scrollParent = this.placeholder.scrollParent()),
                    t.extend(this.offset, { parent: this._getParentOffset() }),
                    o.containment && this._setContainment(),
                    o.cursor &&
                      "auto" !== o.cursor &&
                      ((a = this.document.find("body")),
                      (this.storedCursor = a.css("cursor")),
                      a.css("cursor", o.cursor),
                      (this.storedStylesheet = t(
                        "<style>*{ cursor: " +
                          o.cursor +
                          " !important; }</style>"
                      ).appendTo(a))),
                    o.zIndex &&
                      (this.helper.css("zIndex") &&
                        (this._storedZIndex = this.helper.css("zIndex")),
                      this.helper.css("zIndex", o.zIndex)),
                    o.opacity &&
                      (this.helper.css("opacity") &&
                        (this._storedOpacity = this.helper.css("opacity")),
                      this.helper.css("opacity", o.opacity)),
                    this.scrollParent[0] !== this.document[0] &&
                      "HTML" !== this.scrollParent[0].tagName &&
                      (this.overflowOffset = this.scrollParent.offset()),
                    this._trigger("start", e, this._uiHash()),
                    this._preserveHelperProportions ||
                      this._cacheHelperProportions(),
                    !n)
                  )
                    for (s = this.containers.length - 1; s >= 0; s--)
                      this.containers[s]._trigger(
                        "activate",
                        e,
                        this._uiHash(this)
                      );
                  return (
                    t.ui.ddmanager && (t.ui.ddmanager.current = this),
                    t.ui.ddmanager &&
                      !o.dropBehaviour &&
                      t.ui.ddmanager.prepareOffsets(this, e),
                    (this.dragging = !0),
                    this._addClass(this.helper, "ui-sortable-helper"),
                    this.helper.parent().is(this.appendTo) ||
                      (this.helper.detach().appendTo(this.appendTo),
                      (this.offset.parent = this._getParentOffset())),
                    (this.position = this.originalPosition =
                      this._generatePosition(e)),
                    (this.originalPageX = e.pageX),
                    (this.originalPageY = e.pageY),
                    (this.lastPositionAbs = this.positionAbs =
                      this._convertPositionTo("absolute")),
                    this._mouseDrag(e),
                    !0
                  );
                },
                _scroll: function (t) {
                  var e = this.options,
                    i = !1;
                  return (
                    this.scrollParent[0] !== this.document[0] &&
                    "HTML" !== this.scrollParent[0].tagName
                      ? (this.overflowOffset.top +
                          this.scrollParent[0].offsetHeight -
                          t.pageY <
                        e.scrollSensitivity
                          ? (this.scrollParent[0].scrollTop = i =
                              this.scrollParent[0].scrollTop + e.scrollSpeed)
                          : t.pageY - this.overflowOffset.top <
                              e.scrollSensitivity &&
                            (this.scrollParent[0].scrollTop = i =
                              this.scrollParent[0].scrollTop - e.scrollSpeed),
                        this.overflowOffset.left +
                          this.scrollParent[0].offsetWidth -
                          t.pageX <
                        e.scrollSensitivity
                          ? (this.scrollParent[0].scrollLeft = i =
                              this.scrollParent[0].scrollLeft + e.scrollSpeed)
                          : t.pageX - this.overflowOffset.left <
                              e.scrollSensitivity &&
                            (this.scrollParent[0].scrollLeft = i =
                              this.scrollParent[0].scrollLeft - e.scrollSpeed))
                      : (t.pageY - this.document.scrollTop() <
                        e.scrollSensitivity
                          ? (i = this.document.scrollTop(
                              this.document.scrollTop() - e.scrollSpeed
                            ))
                          : this.window.height() -
                              (t.pageY - this.document.scrollTop()) <
                              e.scrollSensitivity &&
                            (i = this.document.scrollTop(
                              this.document.scrollTop() + e.scrollSpeed
                            )),
                        t.pageX - this.document.scrollLeft() <
                        e.scrollSensitivity
                          ? (i = this.document.scrollLeft(
                              this.document.scrollLeft() - e.scrollSpeed
                            ))
                          : this.window.width() -
                              (t.pageX - this.document.scrollLeft()) <
                              e.scrollSensitivity &&
                            (i = this.document.scrollLeft(
                              this.document.scrollLeft() + e.scrollSpeed
                            ))),
                    i
                  );
                },
                _mouseDrag: function (e) {
                  var i,
                    n,
                    s,
                    a,
                    o = this.options;
                  for (
                    this.position = this._generatePosition(e),
                      this.positionAbs = this._convertPositionTo("absolute"),
                      (this.options.axis && "y" === this.options.axis) ||
                        (this.helper[0].style.left = this.position.left + "px"),
                      (this.options.axis && "x" === this.options.axis) ||
                        (this.helper[0].style.top = this.position.top + "px"),
                      o.scroll &&
                        !1 !== this._scroll(e) &&
                        (this._refreshItemPositions(!0),
                        t.ui.ddmanager &&
                          !o.dropBehaviour &&
                          t.ui.ddmanager.prepareOffsets(this, e)),
                      this.dragDirection = {
                        vertical: this._getDragVerticalDirection(),
                        horizontal: this._getDragHorizontalDirection(),
                      },
                      i = this.items.length - 1;
                    i >= 0;
                    i--
                  )
                    if (
                      ((s = (n = this.items[i]).item[0]),
                      (a = this._intersectsWithPointer(n)) &&
                        n.instance === this.currentContainer &&
                        !(
                          s === this.currentItem[0] ||
                          this.placeholder[1 === a ? "next" : "prev"]()[0] ===
                            s ||
                          t.contains(this.placeholder[0], s) ||
                          ("semi-dynamic" === this.options.type &&
                            t.contains(this.element[0], s))
                        ))
                    ) {
                      if (
                        ((this.direction = 1 === a ? "down" : "up"),
                        "pointer" !== this.options.tolerance &&
                          !this._intersectsWithSides(n))
                      )
                        break;
                      this._rearrange(e, n),
                        this._trigger("change", e, this._uiHash());
                      break;
                    }
                  return (
                    this._contactContainers(e),
                    t.ui.ddmanager && t.ui.ddmanager.drag(this, e),
                    this._trigger("sort", e, this._uiHash()),
                    (this.lastPositionAbs = this.positionAbs),
                    !1
                  );
                },
                _mouseStop: function (e, i) {
                  if (e) {
                    if (
                      (t.ui.ddmanager &&
                        !this.options.dropBehaviour &&
                        t.ui.ddmanager.drop(this, e),
                      this.options.revert)
                    ) {
                      var n = this,
                        s = this.placeholder.offset(),
                        a = this.options.axis,
                        o = {};
                      (a && "x" !== a) ||
                        (o.left =
                          s.left -
                          this.offset.parent.left -
                          this.margins.left +
                          (this.offsetParent[0] === this.document[0].body
                            ? 0
                            : this.offsetParent[0].scrollLeft)),
                        (a && "y" !== a) ||
                          (o.top =
                            s.top -
                            this.offset.parent.top -
                            this.margins.top +
                            (this.offsetParent[0] === this.document[0].body
                              ? 0
                              : this.offsetParent[0].scrollTop)),
                        (this.reverting = !0),
                        t(this.helper).animate(
                          o,
                          parseInt(this.options.revert, 10) || 500,
                          function () {
                            n._clear(e);
                          }
                        );
                    } else this._clear(e, i);
                    return !1;
                  }
                },
                cancel: function () {
                  if (this.dragging) {
                    this._mouseUp(new t.Event("mouseup", { target: null })),
                      "original" === this.options.helper
                        ? (this.currentItem.css(this._storedCSS),
                          this._removeClass(
                            this.currentItem,
                            "ui-sortable-helper"
                          ))
                        : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--)
                      this.containers[e]._trigger(
                        "deactivate",
                        null,
                        this._uiHash(this)
                      ),
                        this.containers[e].containerCache.over &&
                          (this.containers[e]._trigger(
                            "out",
                            null,
                            this._uiHash(this)
                          ),
                          (this.containers[e].containerCache.over = 0));
                  }
                  return (
                    this.placeholder &&
                      (this.placeholder[0].parentNode &&
                        this.placeholder[0].parentNode.removeChild(
                          this.placeholder[0]
                        ),
                      "original" !== this.options.helper &&
                        this.helper &&
                        this.helper[0].parentNode &&
                        this.helper.remove(),
                      t.extend(this, {
                        helper: null,
                        dragging: !1,
                        reverting: !1,
                        _noFinalSort: null,
                      }),
                      this.domPosition.prev
                        ? t(this.domPosition.prev).after(this.currentItem)
                        : t(this.domPosition.parent).prepend(this.currentItem)),
                    this
                  );
                },
                serialize: function (e) {
                  var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                  return (
                    (e = e || {}),
                    t(i).each(function () {
                      var i = (
                        t(e.item || this).attr(e.attribute || "id") || ""
                      ).match(e.expression || /(.+)[\-=_](.+)/);
                      i &&
                        n.push(
                          (e.key || i[1] + "[]") +
                            "=" +
                            (e.key && e.expression ? i[1] : i[2])
                        );
                    }),
                    !n.length && e.key && n.push(e.key + "="),
                    n.join("&")
                  );
                },
                toArray: function (e) {
                  var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                  return (
                    (e = e || {}),
                    i.each(function () {
                      n.push(t(e.item || this).attr(e.attribute || "id") || "");
                    }),
                    n
                  );
                },
                _intersectsWith: function (t) {
                  var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    n = this.positionAbs.top,
                    s = n + this.helperProportions.height,
                    a = t.left,
                    o = a + t.width,
                    r = t.top,
                    h = r + t.height,
                    l = this.offset.click.top,
                    u = this.offset.click.left,
                    p = "x" === this.options.axis || (n + l > r && n + l < h),
                    c = "y" === this.options.axis || (e + u > a && e + u < o),
                    f = p && c;
                  return "pointer" === this.options.tolerance ||
                    this.options.forcePointerForContainers ||
                    ("pointer" !== this.options.tolerance &&
                      this.helperProportions[
                        this.floating ? "width" : "height"
                      ] > t[this.floating ? "width" : "height"])
                    ? f
                    : a < e + this.helperProportions.width / 2 &&
                        i - this.helperProportions.width / 2 < o &&
                        r < n + this.helperProportions.height / 2 &&
                        s - this.helperProportions.height / 2 < h;
                },
                _intersectsWithPointer: function (t) {
                  var e,
                    i,
                    n =
                      "x" === this.options.axis ||
                      this._isOverAxis(
                        this.positionAbs.top + this.offset.click.top,
                        t.top,
                        t.height
                      ),
                    s =
                      "y" === this.options.axis ||
                      this._isOverAxis(
                        this.positionAbs.left + this.offset.click.left,
                        t.left,
                        t.width
                      );
                  return (
                    !(!n || !s) &&
                    ((e = this.dragDirection.vertical),
                    (i = this.dragDirection.horizontal),
                    this.floating
                      ? "right" === i || "down" === e
                        ? 2
                        : 1
                      : e && ("down" === e ? 2 : 1))
                  );
                },
                _intersectsWithSides: function (t) {
                  var e = this._isOverAxis(
                      this.positionAbs.top + this.offset.click.top,
                      t.top + t.height / 2,
                      t.height
                    ),
                    i = this._isOverAxis(
                      this.positionAbs.left + this.offset.click.left,
                      t.left + t.width / 2,
                      t.width
                    ),
                    n = this.dragDirection.vertical,
                    s = this.dragDirection.horizontal;
                  return this.floating && s
                    ? ("right" === s && i) || ("left" === s && !i)
                    : n && (("down" === n && e) || ("up" === n && !e));
                },
                _getDragVerticalDirection: function () {
                  var t = this.positionAbs.top - this.lastPositionAbs.top;
                  return 0 !== t && (t > 0 ? "down" : "up");
                },
                _getDragHorizontalDirection: function () {
                  var t = this.positionAbs.left - this.lastPositionAbs.left;
                  return 0 !== t && (t > 0 ? "right" : "left");
                },
                refresh: function (t) {
                  return (
                    this._refreshItems(t),
                    this._setHandleClassName(),
                    this.refreshPositions(),
                    this
                  );
                },
                _connectWith: function () {
                  var t = this.options;
                  return t.connectWith.constructor === String
                    ? [t.connectWith]
                    : t.connectWith;
                },
                _getItemsAsjQuery: function (e) {
                  var i,
                    n,
                    s,
                    a,
                    o = [],
                    r = [],
                    h = this._connectWith();
                  if (h && e)
                    for (i = h.length - 1; i >= 0; i--)
                      for (
                        n = (s = t(h[i], this.document[0])).length - 1;
                        n >= 0;
                        n--
                      )
                        (a = t.data(s[n], this.widgetFullName)) &&
                          a !== this &&
                          !a.options.disabled &&
                          r.push([
                            "function" == typeof a.options.items
                              ? a.options.items.call(a.element)
                              : t(a.options.items, a.element)
                                  .not(".ui-sortable-helper")
                                  .not(".ui-sortable-placeholder"),
                            a,
                          ]);
                  function l() {
                    o.push(this);
                  }
                  for (
                    r.push([
                      "function" == typeof this.options.items
                        ? this.options.items.call(this.element, null, {
                            options: this.options,
                            item: this.currentItem,
                          })
                        : t(this.options.items, this.element)
                            .not(".ui-sortable-helper")
                            .not(".ui-sortable-placeholder"),
                      this,
                    ]),
                      i = r.length - 1;
                    i >= 0;
                    i--
                  )
                    r[i][0].each(l);
                  return t(o);
                },
                _removeCurrentsFromItems: function () {
                  var e = this.currentItem.find(
                    ":data(" + this.widgetName + "-item)"
                  );
                  this.items = t.grep(this.items, function (t) {
                    for (var i = 0; i < e.length; i++)
                      if (e[i] === t.item[0]) return !1;
                    return !0;
                  });
                },
                _refreshItems: function (e) {
                  (this.items = []), (this.containers = [this]);
                  var i,
                    n,
                    s,
                    a,
                    o,
                    r,
                    h,
                    l,
                    u = this.items,
                    p = [
                      [
                        "function" == typeof this.options.items
                          ? this.options.items.call(this.element[0], e, {
                              item: this.currentItem,
                            })
                          : t(this.options.items, this.element),
                        this,
                      ],
                    ],
                    c = this._connectWith();
                  if (c && this.ready)
                    for (i = c.length - 1; i >= 0; i--)
                      for (
                        n = (s = t(c[i], this.document[0])).length - 1;
                        n >= 0;
                        n--
                      )
                        (a = t.data(s[n], this.widgetFullName)) &&
                          a !== this &&
                          !a.options.disabled &&
                          (p.push([
                            "function" == typeof a.options.items
                              ? a.options.items.call(a.element[0], e, {
                                  item: this.currentItem,
                                })
                              : t(a.options.items, a.element),
                            a,
                          ]),
                          this.containers.push(a));
                  for (i = p.length - 1; i >= 0; i--)
                    for (
                      o = p[i][1], n = 0, l = (r = p[i][0]).length;
                      n < l;
                      n++
                    )
                      (h = t(r[n])).data(this.widgetName + "-item", o),
                        u.push({
                          item: h,
                          instance: o,
                          width: 0,
                          height: 0,
                          left: 0,
                          top: 0,
                        });
                },
                _refreshItemPositions: function (e) {
                  var i, n, s, a;
                  for (i = this.items.length - 1; i >= 0; i--)
                    (n = this.items[i]),
                      (this.currentContainer &&
                        n.instance !== this.currentContainer &&
                        n.item[0] !== this.currentItem[0]) ||
                        ((s = this.options.toleranceElement
                          ? t(this.options.toleranceElement, n.item)
                          : n.item),
                        e ||
                          ((n.width = s.outerWidth()),
                          (n.height = s.outerHeight())),
                        (a = s.offset()),
                        (n.left = a.left),
                        (n.top = a.top));
                },
                refreshPositions: function (t) {
                  var e, i;
                  if (
                    ((this.floating =
                      !!this.items.length &&
                      ("x" === this.options.axis ||
                        this._isFloating(this.items[0].item))),
                    this.offsetParent &&
                      this.helper &&
                      (this.offset.parent = this._getParentOffset()),
                    this._refreshItemPositions(t),
                    this.options.custom &&
                      this.options.custom.refreshContainers)
                  )
                    this.options.custom.refreshContainers.call(this);
                  else
                    for (e = this.containers.length - 1; e >= 0; e--)
                      (i = this.containers[e].element.offset()),
                        (this.containers[e].containerCache.left = i.left),
                        (this.containers[e].containerCache.top = i.top),
                        (this.containers[e].containerCache.width =
                          this.containers[e].element.outerWidth()),
                        (this.containers[e].containerCache.height =
                          this.containers[e].element.outerHeight());
                  return this;
                },
                _createPlaceholder: function (e) {
                  var i,
                    n,
                    s = (e = e || this).options;
                  (s.placeholder && s.placeholder.constructor !== String) ||
                    ((i = s.placeholder),
                    (n = e.currentItem[0].nodeName.toLowerCase()),
                    (s.placeholder = {
                      element: function () {
                        var s = t("<" + n + ">", e.document[0]);
                        return (
                          e
                            ._addClass(
                              s,
                              "ui-sortable-placeholder",
                              i || e.currentItem[0].className
                            )
                            ._removeClass(s, "ui-sortable-helper"),
                          "tbody" === n
                            ? e._createTrPlaceholder(
                                e.currentItem.find("tr").eq(0),
                                t("<tr>", e.document[0]).appendTo(s)
                              )
                            : "tr" === n
                            ? e._createTrPlaceholder(e.currentItem, s)
                            : "img" === n &&
                              s.attr("src", e.currentItem.attr("src")),
                          i || s.css("visibility", "hidden"),
                          s
                        );
                      },
                      update: function (t, a) {
                        (i && !s.forcePlaceholderSize) ||
                          ((a.height() &&
                            (!s.forcePlaceholderSize ||
                              ("tbody" !== n && "tr" !== n))) ||
                            a.height(
                              e.currentItem.innerHeight() -
                                parseInt(
                                  e.currentItem.css("paddingTop") || 0,
                                  10
                                ) -
                                parseInt(
                                  e.currentItem.css("paddingBottom") || 0,
                                  10
                                )
                            ),
                          a.width() ||
                            a.width(
                              e.currentItem.innerWidth() -
                                parseInt(
                                  e.currentItem.css("paddingLeft") || 0,
                                  10
                                ) -
                                parseInt(
                                  e.currentItem.css("paddingRight") || 0,
                                  10
                                )
                            ));
                      },
                    })),
                    (e.placeholder = t(
                      s.placeholder.element.call(e.element, e.currentItem)
                    )),
                    e.currentItem.after(e.placeholder),
                    s.placeholder.update(e, e.placeholder);
                },
                _createTrPlaceholder: function (e, i) {
                  var n = this;
                  e.children().each(function () {
                    t("<td>&#160;</td>", n.document[0])
                      .attr("colspan", t(this).attr("colspan") || 1)
                      .appendTo(i);
                  });
                },
                _contactContainers: function (e) {
                  var i,
                    n,
                    s,
                    a,
                    o,
                    r,
                    h,
                    l,
                    u,
                    p,
                    c = null,
                    f = null;
                  for (i = this.containers.length - 1; i >= 0; i--)
                    if (
                      !t.contains(
                        this.currentItem[0],
                        this.containers[i].element[0]
                      )
                    )
                      if (
                        this._intersectsWith(this.containers[i].containerCache)
                      ) {
                        if (
                          c &&
                          t.contains(
                            this.containers[i].element[0],
                            c.element[0]
                          )
                        )
                          continue;
                        (c = this.containers[i]), (f = i);
                      } else
                        this.containers[i].containerCache.over &&
                          (this.containers[i]._trigger(
                            "out",
                            e,
                            this._uiHash(this)
                          ),
                          (this.containers[i].containerCache.over = 0));
                  if (c)
                    if (1 === this.containers.length)
                      this.containers[f].containerCache.over ||
                        (this.containers[f]._trigger(
                          "over",
                          e,
                          this._uiHash(this)
                        ),
                        (this.containers[f].containerCache.over = 1));
                    else {
                      for (
                        s = 1e4,
                          a = null,
                          o = (u =
                            c.floating || this._isFloating(this.currentItem))
                            ? "left"
                            : "top",
                          r = u ? "width" : "height",
                          p = u ? "pageX" : "pageY",
                          n = this.items.length - 1;
                        n >= 0;
                        n--
                      )
                        t.contains(
                          this.containers[f].element[0],
                          this.items[n].item[0]
                        ) &&
                          this.items[n].item[0] !== this.currentItem[0] &&
                          ((h = this.items[n].item.offset()[o]),
                          (l = !1),
                          e[p] - h > this.items[n][r] / 2 && (l = !0),
                          Math.abs(e[p] - h) < s &&
                            ((s = Math.abs(e[p] - h)),
                            (a = this.items[n]),
                            (this.direction = l ? "up" : "down")));
                      if (!a && !this.options.dropOnEmpty) return;
                      if (this.currentContainer === this.containers[f])
                        return void (
                          this.currentContainer.containerCache.over ||
                          (this.containers[f]._trigger(
                            "over",
                            e,
                            this._uiHash()
                          ),
                          (this.currentContainer.containerCache.over = 1))
                        );
                      a
                        ? this._rearrange(e, a, null, !0)
                        : this._rearrange(
                            e,
                            null,
                            this.containers[f].element,
                            !0
                          ),
                        this._trigger("change", e, this._uiHash()),
                        this.containers[f]._trigger(
                          "change",
                          e,
                          this._uiHash(this)
                        ),
                        (this.currentContainer = this.containers[f]),
                        this.options.placeholder.update(
                          this.currentContainer,
                          this.placeholder
                        ),
                        (this.scrollParent = this.placeholder.scrollParent()),
                        this.scrollParent[0] !== this.document[0] &&
                          "HTML" !== this.scrollParent[0].tagName &&
                          (this.overflowOffset = this.scrollParent.offset()),
                        this.containers[f]._trigger(
                          "over",
                          e,
                          this._uiHash(this)
                        ),
                        (this.containers[f].containerCache.over = 1);
                    }
                },
                _createHelper: function (e) {
                  var i = this.options,
                    n =
                      "function" == typeof i.helper
                        ? t(
                            i.helper.apply(this.element[0], [
                              e,
                              this.currentItem,
                            ])
                          )
                        : "clone" === i.helper
                        ? this.currentItem.clone()
                        : this.currentItem;
                  return (
                    n.parents("body").length ||
                      this.appendTo[0].appendChild(n[0]),
                    n[0] === this.currentItem[0] &&
                      (this._storedCSS = {
                        width: this.currentItem[0].style.width,
                        height: this.currentItem[0].style.height,
                        position: this.currentItem.css("position"),
                        top: this.currentItem.css("top"),
                        left: this.currentItem.css("left"),
                      }),
                    (n[0].style.width && !i.forceHelperSize) ||
                      n.width(this.currentItem.width()),
                    (n[0].style.height && !i.forceHelperSize) ||
                      n.height(this.currentItem.height()),
                    n
                  );
                },
                _adjustOffsetFromHelper: function (t) {
                  "string" == typeof t && (t = t.split(" ")),
                    Array.isArray(t) && (t = { left: +t[0], top: +t[1] || 0 }),
                    "left" in t &&
                      (this.offset.click.left = t.left + this.margins.left),
                    "right" in t &&
                      (this.offset.click.left =
                        this.helperProportions.width -
                        t.right +
                        this.margins.left),
                    "top" in t &&
                      (this.offset.click.top = t.top + this.margins.top),
                    "bottom" in t &&
                      (this.offset.click.top =
                        this.helperProportions.height -
                        t.bottom +
                        this.margins.top);
                },
                _getParentOffset: function () {
                  this.offsetParent = this.helper.offsetParent();
                  var e = this.offsetParent.offset();
                  return (
                    "absolute" === this.cssPosition &&
                      this.scrollParent[0] !== this.document[0] &&
                      t.contains(this.scrollParent[0], this.offsetParent[0]) &&
                      ((e.left += this.scrollParent.scrollLeft()),
                      (e.top += this.scrollParent.scrollTop())),
                    (this.offsetParent[0] === this.document[0].body ||
                      (this.offsetParent[0].tagName &&
                        "html" === this.offsetParent[0].tagName.toLowerCase() &&
                        t.ui.ie)) &&
                      (e = { top: 0, left: 0 }),
                    {
                      top:
                        e.top +
                        (parseInt(
                          this.offsetParent.css("borderTopWidth"),
                          10
                        ) || 0),
                      left:
                        e.left +
                        (parseInt(
                          this.offsetParent.css("borderLeftWidth"),
                          10
                        ) || 0),
                    }
                  );
                },
                _getRelativeOffset: function () {
                  if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                      top:
                        t.top -
                        (parseInt(this.helper.css("top"), 10) || 0) +
                        this.scrollParent.scrollTop(),
                      left:
                        t.left -
                        (parseInt(this.helper.css("left"), 10) || 0) +
                        this.scrollParent.scrollLeft(),
                    };
                  }
                  return { top: 0, left: 0 };
                },
                _cacheMargins: function () {
                  this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
                  };
                },
                _cacheHelperProportions: function () {
                  this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight(),
                  };
                },
                _setContainment: function () {
                  var e,
                    i,
                    n,
                    s = this.options;
                  "parent" === s.containment &&
                    (s.containment = this.helper[0].parentNode),
                    ("document" !== s.containment &&
                      "window" !== s.containment) ||
                      (this.containment = [
                        0 - this.offset.relative.left - this.offset.parent.left,
                        0 - this.offset.relative.top - this.offset.parent.top,
                        "document" === s.containment
                          ? this.document.width()
                          : this.window.width() -
                            this.helperProportions.width -
                            this.margins.left,
                        ("document" === s.containment
                          ? this.document.height() ||
                            document.body.parentNode.scrollHeight
                          : this.window.height() ||
                            this.document[0].body.parentNode.scrollHeight) -
                          this.helperProportions.height -
                          this.margins.top,
                      ]),
                    /^(document|window|parent)$/.test(s.containment) ||
                      ((e = t(s.containment)[0]),
                      (i = t(s.containment).offset()),
                      (n = "hidden" !== t(e).css("overflow")),
                      (this.containment = [
                        i.left +
                          (parseInt(t(e).css("borderLeftWidth"), 10) || 0) +
                          (parseInt(t(e).css("paddingLeft"), 10) || 0) -
                          this.margins.left,
                        i.top +
                          (parseInt(t(e).css("borderTopWidth"), 10) || 0) +
                          (parseInt(t(e).css("paddingTop"), 10) || 0) -
                          this.margins.top,
                        i.left +
                          (n
                            ? Math.max(e.scrollWidth, e.offsetWidth)
                            : e.offsetWidth) -
                          (parseInt(t(e).css("borderLeftWidth"), 10) || 0) -
                          (parseInt(t(e).css("paddingRight"), 10) || 0) -
                          this.helperProportions.width -
                          this.margins.left,
                        i.top +
                          (n
                            ? Math.max(e.scrollHeight, e.offsetHeight)
                            : e.offsetHeight) -
                          (parseInt(t(e).css("borderTopWidth"), 10) || 0) -
                          (parseInt(t(e).css("paddingBottom"), 10) || 0) -
                          this.helperProportions.height -
                          this.margins.top,
                      ]));
                },
                _convertPositionTo: function (e, i) {
                  i || (i = this.position);
                  var n = "absolute" === e ? 1 : -1,
                    s =
                      "absolute" !== this.cssPosition ||
                      (this.scrollParent[0] !== this.document[0] &&
                        t.contains(this.scrollParent[0], this.offsetParent[0]))
                        ? this.scrollParent
                        : this.offsetParent,
                    a = /(html|body)/i.test(s[0].tagName);
                  return {
                    top:
                      i.top +
                      this.offset.relative.top * n +
                      this.offset.parent.top * n -
                      ("fixed" === this.cssPosition
                        ? -this.scrollParent.scrollTop()
                        : a
                        ? 0
                        : s.scrollTop()) *
                        n,
                    left:
                      i.left +
                      this.offset.relative.left * n +
                      this.offset.parent.left * n -
                      ("fixed" === this.cssPosition
                        ? -this.scrollParent.scrollLeft()
                        : a
                        ? 0
                        : s.scrollLeft()) *
                        n,
                  };
                },
                _generatePosition: function (e) {
                  var i,
                    n,
                    s = this.options,
                    a = e.pageX,
                    o = e.pageY,
                    r =
                      "absolute" !== this.cssPosition ||
                      (this.scrollParent[0] !== this.document[0] &&
                        t.contains(this.scrollParent[0], this.offsetParent[0]))
                        ? this.scrollParent
                        : this.offsetParent,
                    h = /(html|body)/i.test(r[0].tagName);
                  return (
                    "relative" !== this.cssPosition ||
                      (this.scrollParent[0] !== this.document[0] &&
                        this.scrollParent[0] !== this.offsetParent[0]) ||
                      (this.offset.relative = this._getRelativeOffset()),
                    this.originalPosition &&
                      (this.containment &&
                        (e.pageX - this.offset.click.left <
                          this.containment[0] &&
                          (a = this.containment[0] + this.offset.click.left),
                        e.pageY - this.offset.click.top < this.containment[1] &&
                          (o = this.containment[1] + this.offset.click.top),
                        e.pageX - this.offset.click.left >
                          this.containment[2] &&
                          (a = this.containment[2] + this.offset.click.left),
                        e.pageY - this.offset.click.top > this.containment[3] &&
                          (o = this.containment[3] + this.offset.click.top)),
                      s.grid &&
                        ((i =
                          this.originalPageY +
                          Math.round((o - this.originalPageY) / s.grid[1]) *
                            s.grid[1]),
                        (o = this.containment
                          ? i - this.offset.click.top >= this.containment[1] &&
                            i - this.offset.click.top <= this.containment[3]
                            ? i
                            : i - this.offset.click.top >= this.containment[1]
                            ? i - s.grid[1]
                            : i + s.grid[1]
                          : i),
                        (n =
                          this.originalPageX +
                          Math.round((a - this.originalPageX) / s.grid[0]) *
                            s.grid[0]),
                        (a = this.containment
                          ? n - this.offset.click.left >= this.containment[0] &&
                            n - this.offset.click.left <= this.containment[2]
                            ? n
                            : n - this.offset.click.left >= this.containment[0]
                            ? n - s.grid[0]
                            : n + s.grid[0]
                          : n))),
                    {
                      top:
                        o -
                        this.offset.click.top -
                        this.offset.relative.top -
                        this.offset.parent.top +
                        ("fixed" === this.cssPosition
                          ? -this.scrollParent.scrollTop()
                          : h
                          ? 0
                          : r.scrollTop()),
                      left:
                        a -
                        this.offset.click.left -
                        this.offset.relative.left -
                        this.offset.parent.left +
                        ("fixed" === this.cssPosition
                          ? -this.scrollParent.scrollLeft()
                          : h
                          ? 0
                          : r.scrollLeft()),
                    }
                  );
                },
                _rearrange: function (t, e, i, n) {
                  i
                    ? i[0].appendChild(this.placeholder[0])
                    : e.item[0].parentNode.insertBefore(
                        this.placeholder[0],
                        "down" === this.direction
                          ? e.item[0]
                          : e.item[0].nextSibling
                      ),
                    (this.counter = this.counter ? ++this.counter : 1);
                  var s = this.counter;
                  this._delay(function () {
                    s === this.counter && this.refreshPositions(!n);
                  });
                },
                _clear: function (t, e) {
                  this.reverting = !1;
                  var i,
                    n = [];
                  if (
                    (!this._noFinalSort &&
                      this.currentItem.parent().length &&
                      this.placeholder.before(this.currentItem),
                    (this._noFinalSort = null),
                    this.helper[0] === this.currentItem[0])
                  ) {
                    for (i in this._storedCSS)
                      ("auto" !== this._storedCSS[i] &&
                        "static" !== this._storedCSS[i]) ||
                        (this._storedCSS[i] = "");
                    this.currentItem.css(this._storedCSS),
                      this._removeClass(this.currentItem, "ui-sortable-helper");
                  } else this.currentItem.show();
                  function s(t, e, i) {
                    return function (n) {
                      i._trigger(t, n, e._uiHash(e));
                    };
                  }
                  for (
                    this.fromOutside &&
                      !e &&
                      n.push(function (t) {
                        this._trigger(
                          "receive",
                          t,
                          this._uiHash(this.fromOutside)
                        );
                      }),
                      (!this.fromOutside &&
                        this.domPosition.prev ===
                          this.currentItem
                            .prev()
                            .not(".ui-sortable-helper")[0] &&
                        this.domPosition.parent ===
                          this.currentItem.parent()[0]) ||
                        e ||
                        n.push(function (t) {
                          this._trigger("update", t, this._uiHash());
                        }),
                      this !== this.currentContainer &&
                        (e ||
                          (n.push(function (t) {
                            this._trigger("remove", t, this._uiHash());
                          }),
                          n.push(
                            function (t) {
                              return function (e) {
                                t._trigger("receive", e, this._uiHash(this));
                              };
                            }.call(this, this.currentContainer)
                          ),
                          n.push(
                            function (t) {
                              return function (e) {
                                t._trigger("update", e, this._uiHash(this));
                              };
                            }.call(this, this.currentContainer)
                          ))),
                      i = this.containers.length - 1;
                    i >= 0;
                    i--
                  )
                    e || n.push(s("deactivate", this, this.containers[i])),
                      this.containers[i].containerCache.over &&
                        (n.push(s("out", this, this.containers[i])),
                        (this.containers[i].containerCache.over = 0));
                  if (
                    (this.storedCursor &&
                      (this.document
                        .find("body")
                        .css("cursor", this.storedCursor),
                      this.storedStylesheet.remove()),
                    this._storedOpacity &&
                      this.helper.css("opacity", this._storedOpacity),
                    this._storedZIndex &&
                      this.helper.css(
                        "zIndex",
                        "auto" === this._storedZIndex ? "" : this._storedZIndex
                      ),
                    (this.dragging = !1),
                    e || this._trigger("beforeStop", t, this._uiHash()),
                    this.placeholder[0].parentNode.removeChild(
                      this.placeholder[0]
                    ),
                    this.cancelHelperRemoval ||
                      (this.helper[0] !== this.currentItem[0] &&
                        this.helper.remove(),
                      (this.helper = null)),
                    !e)
                  ) {
                    for (i = 0; i < n.length; i++) n[i].call(this, t);
                    this._trigger("stop", t, this._uiHash());
                  }
                  return (this.fromOutside = !1), !this.cancelHelperRemoval;
                },
                _trigger: function () {
                  !1 === t.Widget.prototype._trigger.apply(this, arguments) &&
                    this.cancel();
                },
                _uiHash: function (e) {
                  var i = e || this;
                  return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null,
                  };
                },
              });
            }),
            void 0 === (a = "function" == typeof n ? n.apply(e, s) : n) ||
              (t.exports = a);
        })();
      },
      755: function (t, e) {
        var i;
        /*!
         * jQuery JavaScript Library v3.6.0
         * https://jquery.com/
         *
         * Includes Sizzle.js
         * https://sizzlejs.com/
         *
         * Copyright OpenJS Foundation and other contributors
         * Released under the MIT license
         * https://jquery.org/license
         *
         * Date: 2021-03-02T17:08Z
         */ !(function (e, i) {
          "use strict";
          "object" == typeof t.exports
            ? (t.exports = e.document
                ? i(e, !0)
                : function (t) {
                    if (!t.document)
                      throw new Error(
                        "jQuery requires a window with a document"
                      );
                    return i(t);
                  })
            : i(e);
        })("undefined" != typeof window ? window : this, function (n, s) {
          "use strict";
          var a = [],
            o = Object.getPrototypeOf,
            r = a.slice,
            h = a.flat
              ? function (t) {
                  return a.flat.call(t);
                }
              : function (t) {
                  return a.concat.apply([], t);
                },
            l = a.push,
            u = a.indexOf,
            p = {},
            c = p.toString,
            f = p.hasOwnProperty,
            d = f.toString,
            g = d.call(Object),
            _ = {},
            m = function (t) {
              return (
                "function" == typeof t &&
                "number" != typeof t.nodeType &&
                "function" != typeof t.item
              );
            },
            v = function (t) {
              return null != t && t === t.window;
            },
            y = n.document,
            b = { type: !0, src: !0, nonce: !0, noModule: !0 };
          function w(t, e, i) {
            var n,
              s,
              a = (i = i || y).createElement("script");
            if (((a.text = t), e))
              for (n in b)
                (s = e[n] || (e.getAttribute && e.getAttribute(n))) &&
                  a.setAttribute(n, s);
            i.head.appendChild(a).parentNode.removeChild(a);
          }
          function x(t) {
            return null == t
              ? t + ""
              : "object" == typeof t || "function" == typeof t
              ? p[c.call(t)] || "object"
              : typeof t;
          }
          var z = "3.6.0",
            k = function (t, e) {
              return new k.fn.init(t, e);
            };
          function j(t) {
            var e = !!t && "length" in t && t.length,
              i = x(t);
            return (
              !m(t) &&
              !v(t) &&
              ("array" === i ||
                0 === e ||
                ("number" == typeof e && e > 0 && e - 1 in t))
            );
          }
          (k.fn = k.prototype =
            {
              jquery: z,
              constructor: k,
              length: 0,
              toArray: function () {
                return r.call(this);
              },
              get: function (t) {
                return null == t
                  ? r.call(this)
                  : t < 0
                  ? this[t + this.length]
                  : this[t];
              },
              pushStack: function (t) {
                var e = k.merge(this.constructor(), t);
                return (e.prevObject = this), e;
              },
              each: function (t) {
                return k.each(this, t);
              },
              map: function (t) {
                return this.pushStack(
                  k.map(this, function (e, i) {
                    return t.call(e, i, e);
                  })
                );
              },
              slice: function () {
                return this.pushStack(r.apply(this, arguments));
              },
              first: function () {
                return this.eq(0);
              },
              last: function () {
                return this.eq(-1);
              },
              even: function () {
                return this.pushStack(
                  k.grep(this, function (t, e) {
                    return (e + 1) % 2;
                  })
                );
              },
              odd: function () {
                return this.pushStack(
                  k.grep(this, function (t, e) {
                    return e % 2;
                  })
                );
              },
              eq: function (t) {
                var e = this.length,
                  i = +t + (t < 0 ? e : 0);
                return this.pushStack(i >= 0 && i < e ? [this[i]] : []);
              },
              end: function () {
                return this.prevObject || this.constructor();
              },
              push: l,
              sort: a.sort,
              splice: a.splice,
            }),
            (k.extend = k.fn.extend =
              function () {
                var t,
                  e,
                  i,
                  n,
                  s,
                  a,
                  o = arguments[0] || {},
                  r = 1,
                  h = arguments.length,
                  l = !1;
                for (
                  "boolean" == typeof o &&
                    ((l = o), (o = arguments[r] || {}), r++),
                    "object" == typeof o || m(o) || (o = {}),
                    r === h && ((o = this), r--);
                  r < h;
                  r++
                )
                  if (null != (t = arguments[r]))
                    for (e in t)
                      (n = t[e]),
                        "__proto__" !== e &&
                          o !== n &&
                          (l &&
                          n &&
                          (k.isPlainObject(n) || (s = Array.isArray(n)))
                            ? ((i = o[e]),
                              (a =
                                s && !Array.isArray(i)
                                  ? []
                                  : s || k.isPlainObject(i)
                                  ? i
                                  : {}),
                              (s = !1),
                              (o[e] = k.extend(l, a, n)))
                            : void 0 !== n && (o[e] = n));
                return o;
              }),
            k.extend({
              expando: "jQuery" + (z + Math.random()).replace(/\D/g, ""),
              isReady: !0,
              error: function (t) {
                throw new Error(t);
              },
              noop: function () {},
              isPlainObject: function (t) {
                var e, i;
                return (
                  !(!t || "[object Object]" !== c.call(t)) &&
                  (!(e = o(t)) ||
                    ("function" ==
                      typeof (i = f.call(e, "constructor") && e.constructor) &&
                      d.call(i) === g))
                );
              },
              isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0;
              },
              globalEval: function (t, e, i) {
                w(t, { nonce: e && e.nonce }, i);
              },
              each: function (t, e) {
                var i,
                  n = 0;
                if (j(t))
                  for (
                    i = t.length;
                    n < i && !1 !== e.call(t[n], n, t[n]);
                    n++
                  );
                else for (n in t) if (!1 === e.call(t[n], n, t[n])) break;
                return t;
              },
              makeArray: function (t, e) {
                var i = e || [];
                return (
                  null != t &&
                    (j(Object(t))
                      ? k.merge(i, "string" == typeof t ? [t] : t)
                      : l.call(i, t)),
                  i
                );
              },
              inArray: function (t, e, i) {
                return null == e ? -1 : u.call(e, t, i);
              },
              merge: function (t, e) {
                for (var i = +e.length, n = 0, s = t.length; n < i; n++)
                  t[s++] = e[n];
                return (t.length = s), t;
              },
              grep: function (t, e, i) {
                for (var n = [], s = 0, a = t.length, o = !i; s < a; s++)
                  !e(t[s], s) !== o && n.push(t[s]);
                return n;
              },
              map: function (t, e, i) {
                var n,
                  s,
                  a = 0,
                  o = [];
                if (j(t))
                  for (n = t.length; a < n; a++)
                    null != (s = e(t[a], a, i)) && o.push(s);
                else for (a in t) null != (s = e(t[a], a, i)) && o.push(s);
                return h(o);
              },
              guid: 1,
              support: _,
            }),
            "function" == typeof Symbol &&
              (k.fn[Symbol.iterator] = a[Symbol.iterator]),
            k.each(
              "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
              ),
              function (t, e) {
                p["[object " + e + "]"] = e.toLowerCase();
              }
            );
          var C =
            /*!
             * Sizzle CSS Selector Engine v2.3.6
             * https://sizzlejs.com/
             *
             * Copyright JS Foundation and other contributors
             * Released under the MIT license
             * https://js.foundation/
             *
             * Date: 2021-02-16
             */
            (function (t) {
              var e,
                i,
                n,
                s,
                a,
                o,
                r,
                h,
                l,
                u,
                p,
                c,
                f,
                d,
                g,
                _,
                m,
                v,
                y,
                b = "sizzle" + 1 * new Date(),
                w = t.document,
                x = 0,
                z = 0,
                k = ht(),
                j = ht(),
                C = ht(),
                T = ht(),
                S = function (t, e) {
                  return t === e && (p = !0), 0;
                },
                $ = {}.hasOwnProperty,
                E = [],
                q = E.pop,
                N = E.push,
                P = E.push,
                D = E.slice,
                A = function (t, e) {
                  for (var i = 0, n = t.length; i < n; i++)
                    if (t[i] === e) return i;
                  return -1;
                },
                I =
                  "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                O = "[\\x20\\t\\r\\n\\f]",
                L =
                  "(?:\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
                H =
                  "\\[[\\x20\\t\\r\\n\\f]*(" +
                  L +
                  ")(?:" +
                  O +
                  "*([*^$|!~]?=)" +
                  O +
                  "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                  L +
                  "))|)" +
                  O +
                  "*\\]",
                M =
                  ":(" +
                  L +
                  ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                  H +
                  ")*)|.*)\\)|)",
                R = new RegExp(O + "+", "g"),
                U = new RegExp(
                  "^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$",
                  "g"
                ),
                W = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
                F = new RegExp(
                  "^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"
                ),
                B = new RegExp(O + "|>"),
                X = new RegExp(M),
                J = new RegExp("^" + L + "$"),
                Y = {
                  ID: new RegExp("^#(" + L + ")"),
                  CLASS: new RegExp("^\\.(" + L + ")"),
                  TAG: new RegExp("^(" + L + "|[*])"),
                  ATTR: new RegExp("^" + H),
                  PSEUDO: new RegExp("^" + M),
                  CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
                    "i"
                  ),
                  bool: new RegExp("^(?:" + I + ")$", "i"),
                  needsContext: new RegExp(
                    "^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
                    "i"
                  ),
                },
                G = /HTML$/i,
                V = /^(?:input|select|textarea|button)$/i,
                Q = /^h\d$/i,
                K = /^[^{]+\{\s*\[native \w/,
                Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                tt = /[+~]/,
                et = new RegExp(
                  "\\\\[\\da-fA-F]{1,6}[\\x20\\t\\r\\n\\f]?|\\\\([^\\r\\n\\f])",
                  "g"
                ),
                it = function (t, e) {
                  var i = "0x" + t.slice(1) - 65536;
                  return (
                    e ||
                    (i < 0
                      ? String.fromCharCode(i + 65536)
                      : String.fromCharCode(
                          (i >> 10) | 55296,
                          (1023 & i) | 56320
                        ))
                  );
                },
                nt = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
                st = function (t, e) {
                  return e
                    ? "\0" === t
                      ? "�"
                      : t.slice(0, -1) +
                        "\\" +
                        t.charCodeAt(t.length - 1).toString(16) +
                        " "
                    : "\\" + t;
                },
                at = function () {
                  c();
                },
                ot = bt(
                  function (t) {
                    return (
                      !0 === t.disabled &&
                      "fieldset" === t.nodeName.toLowerCase()
                    );
                  },
                  { dir: "parentNode", next: "legend" }
                );
              try {
                P.apply((E = D.call(w.childNodes)), w.childNodes),
                  E[w.childNodes.length].nodeType;
              } catch (t) {
                P = {
                  apply: E.length
                    ? function (t, e) {
                        N.apply(t, D.call(e));
                      }
                    : function (t, e) {
                        for (var i = t.length, n = 0; (t[i++] = e[n++]); );
                        t.length = i - 1;
                      },
                };
              }
              function rt(t, e, n, s) {
                var a,
                  r,
                  l,
                  u,
                  p,
                  d,
                  m,
                  v = e && e.ownerDocument,
                  w = e ? e.nodeType : 9;
                if (
                  ((n = n || []),
                  "string" != typeof t ||
                    !t ||
                    (1 !== w && 9 !== w && 11 !== w))
                )
                  return n;
                if (!s && (c(e), (e = e || f), g)) {
                  if (11 !== w && (p = Z.exec(t)))
                    if ((a = p[1])) {
                      if (9 === w) {
                        if (!(l = e.getElementById(a))) return n;
                        if (l.id === a) return n.push(l), n;
                      } else if (
                        v &&
                        (l = v.getElementById(a)) &&
                        y(e, l) &&
                        l.id === a
                      )
                        return n.push(l), n;
                    } else {
                      if (p[2]) return P.apply(n, e.getElementsByTagName(t)), n;
                      if (
                        (a = p[3]) &&
                        i.getElementsByClassName &&
                        e.getElementsByClassName
                      )
                        return P.apply(n, e.getElementsByClassName(a)), n;
                    }
                  if (
                    i.qsa &&
                    !T[t + " "] &&
                    (!_ || !_.test(t)) &&
                    (1 !== w || "object" !== e.nodeName.toLowerCase())
                  ) {
                    if (
                      ((m = t), (v = e), 1 === w && (B.test(t) || F.test(t)))
                    ) {
                      for (
                        ((v = (tt.test(t) && mt(e.parentNode)) || e) === e &&
                          i.scope) ||
                          ((u = e.getAttribute("id"))
                            ? (u = u.replace(nt, st))
                            : e.setAttribute("id", (u = b))),
                          r = (d = o(t)).length;
                        r--;

                      )
                        d[r] = (u ? "#" + u : ":scope") + " " + yt(d[r]);
                      m = d.join(",");
                    }
                    try {
                      return P.apply(n, v.querySelectorAll(m)), n;
                    } catch (e) {
                      T(t, !0);
                    } finally {
                      u === b && e.removeAttribute("id");
                    }
                  }
                }
                return h(t.replace(U, "$1"), e, n, s);
              }
              function ht() {
                var t = [];
                return function e(i, s) {
                  return (
                    t.push(i + " ") > n.cacheLength && delete e[t.shift()],
                    (e[i + " "] = s)
                  );
                };
              }
              function lt(t) {
                return (t[b] = !0), t;
              }
              function ut(t) {
                var e = f.createElement("fieldset");
                try {
                  return !!t(e);
                } catch (t) {
                  return !1;
                } finally {
                  e.parentNode && e.parentNode.removeChild(e), (e = null);
                }
              }
              function pt(t, e) {
                for (var i = t.split("|"), s = i.length; s--; )
                  n.attrHandle[i[s]] = e;
              }
              function ct(t, e) {
                var i = e && t,
                  n =
                    i &&
                    1 === t.nodeType &&
                    1 === e.nodeType &&
                    t.sourceIndex - e.sourceIndex;
                if (n) return n;
                if (i) for (; (i = i.nextSibling); ) if (i === e) return -1;
                return t ? 1 : -1;
              }
              function ft(t) {
                return function (e) {
                  return "input" === e.nodeName.toLowerCase() && e.type === t;
                };
              }
              function dt(t) {
                return function (e) {
                  var i = e.nodeName.toLowerCase();
                  return ("input" === i || "button" === i) && e.type === t;
                };
              }
              function gt(t) {
                return function (e) {
                  return "form" in e
                    ? e.parentNode && !1 === e.disabled
                      ? "label" in e
                        ? "label" in e.parentNode
                          ? e.parentNode.disabled === t
                          : e.disabled === t
                        : e.isDisabled === t ||
                          (e.isDisabled !== !t && ot(e) === t)
                      : e.disabled === t
                    : "label" in e && e.disabled === t;
                };
              }
              function _t(t) {
                return lt(function (e) {
                  return (
                    (e = +e),
                    lt(function (i, n) {
                      for (var s, a = t([], i.length, e), o = a.length; o--; )
                        i[(s = a[o])] && (i[s] = !(n[s] = i[s]));
                    })
                  );
                });
              }
              function mt(t) {
                return t && void 0 !== t.getElementsByTagName && t;
              }
              for (e in ((i = rt.support = {}),
              (a = rt.isXML =
                function (t) {
                  var e = t && t.namespaceURI,
                    i = t && (t.ownerDocument || t).documentElement;
                  return !G.test(e || (i && i.nodeName) || "HTML");
                }),
              (c = rt.setDocument =
                function (t) {
                  var e,
                    s,
                    o = t ? t.ownerDocument || t : w;
                  return o != f && 9 === o.nodeType && o.documentElement
                    ? ((d = (f = o).documentElement),
                      (g = !a(f)),
                      w != f &&
                        (s = f.defaultView) &&
                        s.top !== s &&
                        (s.addEventListener
                          ? s.addEventListener("unload", at, !1)
                          : s.attachEvent && s.attachEvent("onunload", at)),
                      (i.scope = ut(function (t) {
                        return (
                          d.appendChild(t).appendChild(f.createElement("div")),
                          void 0 !== t.querySelectorAll &&
                            !t.querySelectorAll(":scope fieldset div").length
                        );
                      })),
                      (i.attributes = ut(function (t) {
                        return (
                          (t.className = "i"), !t.getAttribute("className")
                        );
                      })),
                      (i.getElementsByTagName = ut(function (t) {
                        return (
                          t.appendChild(f.createComment("")),
                          !t.getElementsByTagName("*").length
                        );
                      })),
                      (i.getElementsByClassName = K.test(
                        f.getElementsByClassName
                      )),
                      (i.getById = ut(function (t) {
                        return (
                          (d.appendChild(t).id = b),
                          !f.getElementsByName || !f.getElementsByName(b).length
                        );
                      })),
                      i.getById
                        ? ((n.filter.ID = function (t) {
                            var e = t.replace(et, it);
                            return function (t) {
                              return t.getAttribute("id") === e;
                            };
                          }),
                          (n.find.ID = function (t, e) {
                            if (void 0 !== e.getElementById && g) {
                              var i = e.getElementById(t);
                              return i ? [i] : [];
                            }
                          }))
                        : ((n.filter.ID = function (t) {
                            var e = t.replace(et, it);
                            return function (t) {
                              var i =
                                void 0 !== t.getAttributeNode &&
                                t.getAttributeNode("id");
                              return i && i.value === e;
                            };
                          }),
                          (n.find.ID = function (t, e) {
                            if (void 0 !== e.getElementById && g) {
                              var i,
                                n,
                                s,
                                a = e.getElementById(t);
                              if (a) {
                                if (
                                  (i = a.getAttributeNode("id")) &&
                                  i.value === t
                                )
                                  return [a];
                                for (
                                  s = e.getElementsByName(t), n = 0;
                                  (a = s[n++]);

                                )
                                  if (
                                    (i = a.getAttributeNode("id")) &&
                                    i.value === t
                                  )
                                    return [a];
                              }
                              return [];
                            }
                          })),
                      (n.find.TAG = i.getElementsByTagName
                        ? function (t, e) {
                            return void 0 !== e.getElementsByTagName
                              ? e.getElementsByTagName(t)
                              : i.qsa
                              ? e.querySelectorAll(t)
                              : void 0;
                          }
                        : function (t, e) {
                            var i,
                              n = [],
                              s = 0,
                              a = e.getElementsByTagName(t);
                            if ("*" === t) {
                              for (; (i = a[s++]); )
                                1 === i.nodeType && n.push(i);
                              return n;
                            }
                            return a;
                          }),
                      (n.find.CLASS =
                        i.getElementsByClassName &&
                        function (t, e) {
                          if (void 0 !== e.getElementsByClassName && g)
                            return e.getElementsByClassName(t);
                        }),
                      (m = []),
                      (_ = []),
                      (i.qsa = K.test(f.querySelectorAll)) &&
                        (ut(function (t) {
                          var e;
                          (d.appendChild(t).innerHTML =
                            "<a id='" +
                            b +
                            "'></a><select id='" +
                            b +
                            "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                            t.querySelectorAll("[msallowcapture^='']").length &&
                              _.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"),
                            t.querySelectorAll("[selected]").length ||
                              _.push(
                                "\\[[\\x20\\t\\r\\n\\f]*(?:value|" + I + ")"
                              ),
                            t.querySelectorAll("[id~=" + b + "-]").length ||
                              _.push("~="),
                            (e = f.createElement("input")).setAttribute(
                              "name",
                              ""
                            ),
                            t.appendChild(e),
                            t.querySelectorAll("[name='']").length ||
                              _.push(
                                "\\[[\\x20\\t\\r\\n\\f]*name[\\x20\\t\\r\\n\\f]*=[\\x20\\t\\r\\n\\f]*(?:''|\"\")"
                              ),
                            t.querySelectorAll(":checked").length ||
                              _.push(":checked"),
                            t.querySelectorAll("a#" + b + "+*").length ||
                              _.push(".#.+[+~]"),
                            t.querySelectorAll("\\\f"),
                            _.push("[\\r\\n\\f]");
                        }),
                        ut(function (t) {
                          t.innerHTML =
                            "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                          var e = f.createElement("input");
                          e.setAttribute("type", "hidden"),
                            t.appendChild(e).setAttribute("name", "D"),
                            t.querySelectorAll("[name=d]").length &&
                              _.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?="),
                            2 !== t.querySelectorAll(":enabled").length &&
                              _.push(":enabled", ":disabled"),
                            (d.appendChild(t).disabled = !0),
                            2 !== t.querySelectorAll(":disabled").length &&
                              _.push(":enabled", ":disabled"),
                            t.querySelectorAll("*,:x"),
                            _.push(",.*:");
                        })),
                      (i.matchesSelector = K.test(
                        (v =
                          d.matches ||
                          d.webkitMatchesSelector ||
                          d.mozMatchesSelector ||
                          d.oMatchesSelector ||
                          d.msMatchesSelector)
                      )) &&
                        ut(function (t) {
                          (i.disconnectedMatch = v.call(t, "*")),
                            v.call(t, "[s!='']:x"),
                            m.push("!=", M);
                        }),
                      (_ = _.length && new RegExp(_.join("|"))),
                      (m = m.length && new RegExp(m.join("|"))),
                      (e = K.test(d.compareDocumentPosition)),
                      (y =
                        e || K.test(d.contains)
                          ? function (t, e) {
                              var i = 9 === t.nodeType ? t.documentElement : t,
                                n = e && e.parentNode;
                              return (
                                t === n ||
                                !(
                                  !n ||
                                  1 !== n.nodeType ||
                                  !(i.contains
                                    ? i.contains(n)
                                    : t.compareDocumentPosition &&
                                      16 & t.compareDocumentPosition(n))
                                )
                              );
                            }
                          : function (t, e) {
                              if (e)
                                for (; (e = e.parentNode); )
                                  if (e === t) return !0;
                              return !1;
                            }),
                      (S = e
                        ? function (t, e) {
                            if (t === e) return (p = !0), 0;
                            var n =
                              !t.compareDocumentPosition -
                              !e.compareDocumentPosition;
                            return (
                              n ||
                              (1 &
                                (n =
                                  (t.ownerDocument || t) ==
                                  (e.ownerDocument || e)
                                    ? t.compareDocumentPosition(e)
                                    : 1) ||
                              (!i.sortDetached &&
                                e.compareDocumentPosition(t) === n)
                                ? t == f || (t.ownerDocument == w && y(w, t))
                                  ? -1
                                  : e == f || (e.ownerDocument == w && y(w, e))
                                  ? 1
                                  : u
                                  ? A(u, t) - A(u, e)
                                  : 0
                                : 4 & n
                                ? -1
                                : 1)
                            );
                          }
                        : function (t, e) {
                            if (t === e) return (p = !0), 0;
                            var i,
                              n = 0,
                              s = t.parentNode,
                              a = e.parentNode,
                              o = [t],
                              r = [e];
                            if (!s || !a)
                              return t == f
                                ? -1
                                : e == f
                                ? 1
                                : s
                                ? -1
                                : a
                                ? 1
                                : u
                                ? A(u, t) - A(u, e)
                                : 0;
                            if (s === a) return ct(t, e);
                            for (i = t; (i = i.parentNode); ) o.unshift(i);
                            for (i = e; (i = i.parentNode); ) r.unshift(i);
                            for (; o[n] === r[n]; ) n++;
                            return n
                              ? ct(o[n], r[n])
                              : o[n] == w
                              ? -1
                              : r[n] == w
                              ? 1
                              : 0;
                          }),
                      f)
                    : f;
                }),
              (rt.matches = function (t, e) {
                return rt(t, null, null, e);
              }),
              (rt.matchesSelector = function (t, e) {
                if (
                  (c(t),
                  i.matchesSelector &&
                    g &&
                    !T[e + " "] &&
                    (!m || !m.test(e)) &&
                    (!_ || !_.test(e)))
                )
                  try {
                    var n = v.call(t, e);
                    if (
                      n ||
                      i.disconnectedMatch ||
                      (t.document && 11 !== t.document.nodeType)
                    )
                      return n;
                  } catch (t) {
                    T(e, !0);
                  }
                return rt(e, f, null, [t]).length > 0;
              }),
              (rt.contains = function (t, e) {
                return (t.ownerDocument || t) != f && c(t), y(t, e);
              }),
              (rt.attr = function (t, e) {
                (t.ownerDocument || t) != f && c(t);
                var s = n.attrHandle[e.toLowerCase()],
                  a =
                    s && $.call(n.attrHandle, e.toLowerCase())
                      ? s(t, e, !g)
                      : void 0;
                return void 0 !== a
                  ? a
                  : i.attributes || !g
                  ? t.getAttribute(e)
                  : (a = t.getAttributeNode(e)) && a.specified
                  ? a.value
                  : null;
              }),
              (rt.escape = function (t) {
                return (t + "").replace(nt, st);
              }),
              (rt.error = function (t) {
                throw new Error("Syntax error, unrecognized expression: " + t);
              }),
              (rt.uniqueSort = function (t) {
                var e,
                  n = [],
                  s = 0,
                  a = 0;
                if (
                  ((p = !i.detectDuplicates),
                  (u = !i.sortStable && t.slice(0)),
                  t.sort(S),
                  p)
                ) {
                  for (; (e = t[a++]); ) e === t[a] && (s = n.push(a));
                  for (; s--; ) t.splice(n[s], 1);
                }
                return (u = null), t;
              }),
              (s = rt.getText =
                function (t) {
                  var e,
                    i = "",
                    n = 0,
                    a = t.nodeType;
                  if (a) {
                    if (1 === a || 9 === a || 11 === a) {
                      if ("string" == typeof t.textContent)
                        return t.textContent;
                      for (t = t.firstChild; t; t = t.nextSibling) i += s(t);
                    } else if (3 === a || 4 === a) return t.nodeValue;
                  } else for (; (e = t[n++]); ) i += s(e);
                  return i;
                }),
              (n = rt.selectors =
                {
                  cacheLength: 50,
                  createPseudo: lt,
                  match: Y,
                  attrHandle: {},
                  find: {},
                  relative: {
                    ">": { dir: "parentNode", first: !0 },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: !0 },
                    "~": { dir: "previousSibling" },
                  },
                  preFilter: {
                    ATTR: function (t) {
                      return (
                        (t[1] = t[1].replace(et, it)),
                        (t[3] = (t[3] || t[4] || t[5] || "").replace(et, it)),
                        "~=" === t[2] && (t[3] = " " + t[3] + " "),
                        t.slice(0, 4)
                      );
                    },
                    CHILD: function (t) {
                      return (
                        (t[1] = t[1].toLowerCase()),
                        "nth" === t[1].slice(0, 3)
                          ? (t[3] || rt.error(t[0]),
                            (t[4] = +(t[4]
                              ? t[5] + (t[6] || 1)
                              : 2 * ("even" === t[3] || "odd" === t[3]))),
                            (t[5] = +(t[7] + t[8] || "odd" === t[3])))
                          : t[3] && rt.error(t[0]),
                        t
                      );
                    },
                    PSEUDO: function (t) {
                      var e,
                        i = !t[6] && t[2];
                      return Y.CHILD.test(t[0])
                        ? null
                        : (t[3]
                            ? (t[2] = t[4] || t[5] || "")
                            : i &&
                              X.test(i) &&
                              (e = o(i, !0)) &&
                              (e = i.indexOf(")", i.length - e) - i.length) &&
                              ((t[0] = t[0].slice(0, e)),
                              (t[2] = i.slice(0, e))),
                          t.slice(0, 3));
                    },
                  },
                  filter: {
                    TAG: function (t) {
                      var e = t.replace(et, it).toLowerCase();
                      return "*" === t
                        ? function () {
                            return !0;
                          }
                        : function (t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e;
                          };
                    },
                    CLASS: function (t) {
                      var e = k[t + " "];
                      return (
                        e ||
                        ((e = new RegExp(
                          "(^|[\\x20\\t\\r\\n\\f])" + t + "(" + O + "|$)"
                        )) &&
                          k(t, function (t) {
                            return e.test(
                              ("string" == typeof t.className && t.className) ||
                                (void 0 !== t.getAttribute &&
                                  t.getAttribute("class")) ||
                                ""
                            );
                          }))
                      );
                    },
                    ATTR: function (t, e, i) {
                      return function (n) {
                        var s = rt.attr(n, t);
                        return null == s
                          ? "!=" === e
                          : !e ||
                              ((s += ""),
                              "=" === e
                                ? s === i
                                : "!=" === e
                                ? s !== i
                                : "^=" === e
                                ? i && 0 === s.indexOf(i)
                                : "*=" === e
                                ? i && s.indexOf(i) > -1
                                : "$=" === e
                                ? i && s.slice(-i.length) === i
                                : "~=" === e
                                ? (" " + s.replace(R, " ") + " ").indexOf(i) >
                                  -1
                                : "|=" === e &&
                                  (s === i ||
                                    s.slice(0, i.length + 1) === i + "-"));
                      };
                    },
                    CHILD: function (t, e, i, n, s) {
                      var a = "nth" !== t.slice(0, 3),
                        o = "last" !== t.slice(-4),
                        r = "of-type" === e;
                      return 1 === n && 0 === s
                        ? function (t) {
                            return !!t.parentNode;
                          }
                        : function (e, i, h) {
                            var l,
                              u,
                              p,
                              c,
                              f,
                              d,
                              g = a !== o ? "nextSibling" : "previousSibling",
                              _ = e.parentNode,
                              m = r && e.nodeName.toLowerCase(),
                              v = !h && !r,
                              y = !1;
                            if (_) {
                              if (a) {
                                for (; g; ) {
                                  for (c = e; (c = c[g]); )
                                    if (
                                      r
                                        ? c.nodeName.toLowerCase() === m
                                        : 1 === c.nodeType
                                    )
                                      return !1;
                                  d = g = "only" === t && !d && "nextSibling";
                                }
                                return !0;
                              }
                              if (
                                ((d = [o ? _.firstChild : _.lastChild]), o && v)
                              ) {
                                for (
                                  y =
                                    (f =
                                      (l =
                                        (u =
                                          (p = (c = _)[b] || (c[b] = {}))[
                                            c.uniqueID
                                          ] || (p[c.uniqueID] = {}))[t] ||
                                        [])[0] === x && l[1]) && l[2],
                                    c = f && _.childNodes[f];
                                  (c =
                                    (++f && c && c[g]) ||
                                    (y = f = 0) ||
                                    d.pop());

                                )
                                  if (1 === c.nodeType && ++y && c === e) {
                                    u[t] = [x, f, y];
                                    break;
                                  }
                              } else if (
                                (v &&
                                  (y = f =
                                    (l =
                                      (u =
                                        (p = (c = e)[b] || (c[b] = {}))[
                                          c.uniqueID
                                        ] || (p[c.uniqueID] = {}))[t] ||
                                      [])[0] === x && l[1]),
                                !1 === y)
                              )
                                for (
                                  ;
                                  (c =
                                    (++f && c && c[g]) ||
                                    (y = f = 0) ||
                                    d.pop()) &&
                                  ((r
                                    ? c.nodeName.toLowerCase() !== m
                                    : 1 !== c.nodeType) ||
                                    !++y ||
                                    (v &&
                                      ((u =
                                        (p = c[b] || (c[b] = {}))[c.uniqueID] ||
                                        (p[c.uniqueID] = {}))[t] = [x, y]),
                                    c !== e));

                                );
                              return (
                                (y -= s) === n || (y % n == 0 && y / n >= 0)
                              );
                            }
                          };
                    },
                    PSEUDO: function (t, e) {
                      var i,
                        s =
                          n.pseudos[t] ||
                          n.setFilters[t.toLowerCase()] ||
                          rt.error("unsupported pseudo: " + t);
                      return s[b]
                        ? s(e)
                        : s.length > 1
                        ? ((i = [t, t, "", e]),
                          n.setFilters.hasOwnProperty(t.toLowerCase())
                            ? lt(function (t, i) {
                                for (var n, a = s(t, e), o = a.length; o--; )
                                  t[(n = A(t, a[o]))] = !(i[n] = a[o]);
                              })
                            : function (t) {
                                return s(t, 0, i);
                              })
                        : s;
                    },
                  },
                  pseudos: {
                    not: lt(function (t) {
                      var e = [],
                        i = [],
                        n = r(t.replace(U, "$1"));
                      return n[b]
                        ? lt(function (t, e, i, s) {
                            for (
                              var a, o = n(t, null, s, []), r = t.length;
                              r--;

                            )
                              (a = o[r]) && (t[r] = !(e[r] = a));
                          })
                        : function (t, s, a) {
                            return (
                              (e[0] = t),
                              n(e, null, a, i),
                              (e[0] = null),
                              !i.pop()
                            );
                          };
                    }),
                    has: lt(function (t) {
                      return function (e) {
                        return rt(t, e).length > 0;
                      };
                    }),
                    contains: lt(function (t) {
                      return (
                        (t = t.replace(et, it)),
                        function (e) {
                          return (e.textContent || s(e)).indexOf(t) > -1;
                        }
                      );
                    }),
                    lang: lt(function (t) {
                      return (
                        J.test(t || "") || rt.error("unsupported lang: " + t),
                        (t = t.replace(et, it).toLowerCase()),
                        function (e) {
                          var i;
                          do {
                            if (
                              (i = g
                                ? e.lang
                                : e.getAttribute("xml:lang") ||
                                  e.getAttribute("lang"))
                            )
                              return (
                                (i = i.toLowerCase()) === t ||
                                0 === i.indexOf(t + "-")
                              );
                          } while ((e = e.parentNode) && 1 === e.nodeType);
                          return !1;
                        }
                      );
                    }),
                    target: function (e) {
                      var i = t.location && t.location.hash;
                      return i && i.slice(1) === e.id;
                    },
                    root: function (t) {
                      return t === d;
                    },
                    focus: function (t) {
                      return (
                        t === f.activeElement &&
                        (!f.hasFocus || f.hasFocus()) &&
                        !!(t.type || t.href || ~t.tabIndex)
                      );
                    },
                    enabled: gt(!1),
                    disabled: gt(!0),
                    checked: function (t) {
                      var e = t.nodeName.toLowerCase();
                      return (
                        ("input" === e && !!t.checked) ||
                        ("option" === e && !!t.selected)
                      );
                    },
                    selected: function (t) {
                      return (
                        t.parentNode && t.parentNode.selectedIndex,
                        !0 === t.selected
                      );
                    },
                    empty: function (t) {
                      for (t = t.firstChild; t; t = t.nextSibling)
                        if (t.nodeType < 6) return !1;
                      return !0;
                    },
                    parent: function (t) {
                      return !n.pseudos.empty(t);
                    },
                    header: function (t) {
                      return Q.test(t.nodeName);
                    },
                    input: function (t) {
                      return V.test(t.nodeName);
                    },
                    button: function (t) {
                      var e = t.nodeName.toLowerCase();
                      return (
                        ("input" === e && "button" === t.type) || "button" === e
                      );
                    },
                    text: function (t) {
                      var e;
                      return (
                        "input" === t.nodeName.toLowerCase() &&
                        "text" === t.type &&
                        (null == (e = t.getAttribute("type")) ||
                          "text" === e.toLowerCase())
                      );
                    },
                    first: _t(function () {
                      return [0];
                    }),
                    last: _t(function (t, e) {
                      return [e - 1];
                    }),
                    eq: _t(function (t, e, i) {
                      return [i < 0 ? i + e : i];
                    }),
                    even: _t(function (t, e) {
                      for (var i = 0; i < e; i += 2) t.push(i);
                      return t;
                    }),
                    odd: _t(function (t, e) {
                      for (var i = 1; i < e; i += 2) t.push(i);
                      return t;
                    }),
                    lt: _t(function (t, e, i) {
                      for (var n = i < 0 ? i + e : i > e ? e : i; --n >= 0; )
                        t.push(n);
                      return t;
                    }),
                    gt: _t(function (t, e, i) {
                      for (var n = i < 0 ? i + e : i; ++n < e; ) t.push(n);
                      return t;
                    }),
                  },
                }),
              (n.pseudos.nth = n.pseudos.eq),
              { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
                n.pseudos[e] = ft(e);
              for (e in { submit: !0, reset: !0 }) n.pseudos[e] = dt(e);
              function vt() {}
              function yt(t) {
                for (var e = 0, i = t.length, n = ""; e < i; e++)
                  n += t[e].value;
                return n;
              }
              function bt(t, e, i) {
                var n = e.dir,
                  s = e.next,
                  a = s || n,
                  o = i && "parentNode" === a,
                  r = z++;
                return e.first
                  ? function (e, i, s) {
                      for (; (e = e[n]); )
                        if (1 === e.nodeType || o) return t(e, i, s);
                      return !1;
                    }
                  : function (e, i, h) {
                      var l,
                        u,
                        p,
                        c = [x, r];
                      if (h) {
                        for (; (e = e[n]); )
                          if ((1 === e.nodeType || o) && t(e, i, h)) return !0;
                      } else
                        for (; (e = e[n]); )
                          if (1 === e.nodeType || o)
                            if (
                              ((u =
                                (p = e[b] || (e[b] = {}))[e.uniqueID] ||
                                (p[e.uniqueID] = {})),
                              s && s === e.nodeName.toLowerCase())
                            )
                              e = e[n] || e;
                            else {
                              if ((l = u[a]) && l[0] === x && l[1] === r)
                                return (c[2] = l[2]);
                              if (((u[a] = c), (c[2] = t(e, i, h)))) return !0;
                            }
                      return !1;
                    };
              }
              function wt(t) {
                return t.length > 1
                  ? function (e, i, n) {
                      for (var s = t.length; s--; )
                        if (!t[s](e, i, n)) return !1;
                      return !0;
                    }
                  : t[0];
              }
              function xt(t, e, i, n, s) {
                for (
                  var a, o = [], r = 0, h = t.length, l = null != e;
                  r < h;
                  r++
                )
                  (a = t[r]) &&
                    ((i && !i(a, n, s)) || (o.push(a), l && e.push(r)));
                return o;
              }
              function zt(t, e, i, n, s, a) {
                return (
                  n && !n[b] && (n = zt(n)),
                  s && !s[b] && (s = zt(s, a)),
                  lt(function (a, o, r, h) {
                    var l,
                      u,
                      p,
                      c = [],
                      f = [],
                      d = o.length,
                      g =
                        a ||
                        (function (t, e, i) {
                          for (var n = 0, s = e.length; n < s; n++)
                            rt(t, e[n], i);
                          return i;
                        })(e || "*", r.nodeType ? [r] : r, []),
                      _ = !t || (!a && e) ? g : xt(g, c, t, r, h),
                      m = i ? (s || (a ? t : d || n) ? [] : o) : _;
                    if ((i && i(_, m, r, h), n))
                      for (l = xt(m, f), n(l, [], r, h), u = l.length; u--; )
                        (p = l[u]) && (m[f[u]] = !(_[f[u]] = p));
                    if (a) {
                      if (s || t) {
                        if (s) {
                          for (l = [], u = m.length; u--; )
                            (p = m[u]) && l.push((_[u] = p));
                          s(null, (m = []), l, h);
                        }
                        for (u = m.length; u--; )
                          (p = m[u]) &&
                            (l = s ? A(a, p) : c[u]) > -1 &&
                            (a[l] = !(o[l] = p));
                      }
                    } else (m = xt(m === o ? m.splice(d, m.length) : m)), s ? s(null, o, m, h) : P.apply(o, m);
                  })
                );
              }
              function kt(t) {
                for (
                  var e,
                    i,
                    s,
                    a = t.length,
                    o = n.relative[t[0].type],
                    r = o || n.relative[" "],
                    h = o ? 1 : 0,
                    u = bt(
                      function (t) {
                        return t === e;
                      },
                      r,
                      !0
                    ),
                    p = bt(
                      function (t) {
                        return A(e, t) > -1;
                      },
                      r,
                      !0
                    ),
                    c = [
                      function (t, i, n) {
                        var s =
                          (!o && (n || i !== l)) ||
                          ((e = i).nodeType ? u(t, i, n) : p(t, i, n));
                        return (e = null), s;
                      },
                    ];
                  h < a;
                  h++
                )
                  if ((i = n.relative[t[h].type])) c = [bt(wt(c), i)];
                  else {
                    if (
                      (i = n.filter[t[h].type].apply(null, t[h].matches))[b]
                    ) {
                      for (s = ++h; s < a && !n.relative[t[s].type]; s++);
                      return zt(
                        h > 1 && wt(c),
                        h > 1 &&
                          yt(
                            t
                              .slice(0, h - 1)
                              .concat({
                                value: " " === t[h - 2].type ? "*" : "",
                              })
                          ).replace(U, "$1"),
                        i,
                        h < s && kt(t.slice(h, s)),
                        s < a && kt((t = t.slice(s))),
                        s < a && yt(t)
                      );
                    }
                    c.push(i);
                  }
                return wt(c);
              }
              return (
                (vt.prototype = n.filters = n.pseudos),
                (n.setFilters = new vt()),
                (o = rt.tokenize =
                  function (t, e) {
                    var i,
                      s,
                      a,
                      o,
                      r,
                      h,
                      l,
                      u = j[t + " "];
                    if (u) return e ? 0 : u.slice(0);
                    for (r = t, h = [], l = n.preFilter; r; ) {
                      for (o in ((i && !(s = W.exec(r))) ||
                        (s && (r = r.slice(s[0].length) || r),
                        h.push((a = []))),
                      (i = !1),
                      (s = F.exec(r)) &&
                        ((i = s.shift()),
                        a.push({ value: i, type: s[0].replace(U, " ") }),
                        (r = r.slice(i.length))),
                      n.filter))
                        !(s = Y[o].exec(r)) ||
                          (l[o] && !(s = l[o](s))) ||
                          ((i = s.shift()),
                          a.push({ value: i, type: o, matches: s }),
                          (r = r.slice(i.length)));
                      if (!i) break;
                    }
                    return e ? r.length : r ? rt.error(t) : j(t, h).slice(0);
                  }),
                (r = rt.compile =
                  function (t, e) {
                    var i,
                      s = [],
                      a = [],
                      r = C[t + " "];
                    if (!r) {
                      for (e || (e = o(t)), i = e.length; i--; )
                        (r = kt(e[i]))[b] ? s.push(r) : a.push(r);
                      (r = C(
                        t,
                        (function (t, e) {
                          var i = e.length > 0,
                            s = t.length > 0,
                            a = function (a, o, r, h, u) {
                              var p,
                                d,
                                _,
                                m = 0,
                                v = "0",
                                y = a && [],
                                b = [],
                                w = l,
                                z = a || (s && n.find.TAG("*", u)),
                                k = (x += null == w ? 1 : Math.random() || 0.1),
                                j = z.length;
                              for (
                                u && (l = o == f || o || u);
                                v !== j && null != (p = z[v]);
                                v++
                              ) {
                                if (s && p) {
                                  for (
                                    d = 0,
                                      o ||
                                        p.ownerDocument == f ||
                                        (c(p), (r = !g));
                                    (_ = t[d++]);

                                  )
                                    if (_(p, o || f, r)) {
                                      h.push(p);
                                      break;
                                    }
                                  u && (x = k);
                                }
                                i && ((p = !_ && p) && m--, a && y.push(p));
                              }
                              if (((m += v), i && v !== m)) {
                                for (d = 0; (_ = e[d++]); ) _(y, b, o, r);
                                if (a) {
                                  if (m > 0)
                                    for (; v--; )
                                      y[v] || b[v] || (b[v] = q.call(h));
                                  b = xt(b);
                                }
                                P.apply(h, b),
                                  u &&
                                    !a &&
                                    b.length > 0 &&
                                    m + e.length > 1 &&
                                    rt.uniqueSort(h);
                              }
                              return u && ((x = k), (l = w)), y;
                            };
                          return i ? lt(a) : a;
                        })(a, s)
                      )),
                        (r.selector = t);
                    }
                    return r;
                  }),
                (h = rt.select =
                  function (t, e, i, s) {
                    var a,
                      h,
                      l,
                      u,
                      p,
                      c = "function" == typeof t && t,
                      f = !s && o((t = c.selector || t));
                    if (((i = i || []), 1 === f.length)) {
                      if (
                        (h = f[0] = f[0].slice(0)).length > 2 &&
                        "ID" === (l = h[0]).type &&
                        9 === e.nodeType &&
                        g &&
                        n.relative[h[1].type]
                      ) {
                        if (
                          !(e = (n.find.ID(l.matches[0].replace(et, it), e) ||
                            [])[0])
                        )
                          return i;
                        c && (e = e.parentNode),
                          (t = t.slice(h.shift().value.length));
                      }
                      for (
                        a = Y.needsContext.test(t) ? 0 : h.length;
                        a-- && ((l = h[a]), !n.relative[(u = l.type)]);

                      )
                        if (
                          (p = n.find[u]) &&
                          (s = p(
                            l.matches[0].replace(et, it),
                            (tt.test(h[0].type) && mt(e.parentNode)) || e
                          ))
                        ) {
                          if ((h.splice(a, 1), !(t = s.length && yt(h))))
                            return P.apply(i, s), i;
                          break;
                        }
                    }
                    return (
                      (c || r(t, f))(
                        s,
                        e,
                        !g,
                        i,
                        !e || (tt.test(t) && mt(e.parentNode)) || e
                      ),
                      i
                    );
                  }),
                (i.sortStable = b.split("").sort(S).join("") === b),
                (i.detectDuplicates = !!p),
                c(),
                (i.sortDetached = ut(function (t) {
                  return (
                    1 & t.compareDocumentPosition(f.createElement("fieldset"))
                  );
                })),
                ut(function (t) {
                  return (
                    (t.innerHTML = "<a href='#'></a>"),
                    "#" === t.firstChild.getAttribute("href")
                  );
                }) ||
                  pt("type|href|height|width", function (t, e, i) {
                    if (!i)
                      return t.getAttribute(
                        e,
                        "type" === e.toLowerCase() ? 1 : 2
                      );
                  }),
                (i.attributes &&
                  ut(function (t) {
                    return (
                      (t.innerHTML = "<input/>"),
                      t.firstChild.setAttribute("value", ""),
                      "" === t.firstChild.getAttribute("value")
                    );
                  })) ||
                  pt("value", function (t, e, i) {
                    if (!i && "input" === t.nodeName.toLowerCase())
                      return t.defaultValue;
                  }),
                ut(function (t) {
                  return null == t.getAttribute("disabled");
                }) ||
                  pt(I, function (t, e, i) {
                    var n;
                    if (!i)
                      return !0 === t[e]
                        ? e.toLowerCase()
                        : (n = t.getAttributeNode(e)) && n.specified
                        ? n.value
                        : null;
                  }),
                rt
              );
            })(n);
          (k.find = C),
            (k.expr = C.selectors),
            (k.expr[":"] = k.expr.pseudos),
            (k.uniqueSort = k.unique = C.uniqueSort),
            (k.text = C.getText),
            (k.isXMLDoc = C.isXML),
            (k.contains = C.contains),
            (k.escapeSelector = C.escape);
          var T = function (t, e, i) {
              for (
                var n = [], s = void 0 !== i;
                (t = t[e]) && 9 !== t.nodeType;

              )
                if (1 === t.nodeType) {
                  if (s && k(t).is(i)) break;
                  n.push(t);
                }
              return n;
            },
            S = function (t, e) {
              for (var i = []; t; t = t.nextSibling)
                1 === t.nodeType && t !== e && i.push(t);
              return i;
            },
            $ = k.expr.match.needsContext;
          function E(t, e) {
            return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
          }
          var q =
            /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
          function N(t, e, i) {
            return m(e)
              ? k.grep(t, function (t, n) {
                  return !!e.call(t, n, t) !== i;
                })
              : e.nodeType
              ? k.grep(t, function (t) {
                  return (t === e) !== i;
                })
              : "string" != typeof e
              ? k.grep(t, function (t) {
                  return u.call(e, t) > -1 !== i;
                })
              : k.filter(e, t, i);
          }
          (k.filter = function (t, e, i) {
            var n = e[0];
            return (
              i && (t = ":not(" + t + ")"),
              1 === e.length && 1 === n.nodeType
                ? k.find.matchesSelector(n, t)
                  ? [n]
                  : []
                : k.find.matches(
                    t,
                    k.grep(e, function (t) {
                      return 1 === t.nodeType;
                    })
                  )
            );
          }),
            k.fn.extend({
              find: function (t) {
                var e,
                  i,
                  n = this.length,
                  s = this;
                if ("string" != typeof t)
                  return this.pushStack(
                    k(t).filter(function () {
                      for (e = 0; e < n; e++)
                        if (k.contains(s[e], this)) return !0;
                    })
                  );
                for (i = this.pushStack([]), e = 0; e < n; e++)
                  k.find(t, s[e], i);
                return n > 1 ? k.uniqueSort(i) : i;
              },
              filter: function (t) {
                return this.pushStack(N(this, t || [], !1));
              },
              not: function (t) {
                return this.pushStack(N(this, t || [], !0));
              },
              is: function (t) {
                return !!N(
                  this,
                  "string" == typeof t && $.test(t) ? k(t) : t || [],
                  !1
                ).length;
              },
            });
          var P,
            D = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
          ((k.fn.init = function (t, e, i) {
            var n, s;
            if (!t) return this;
            if (((i = i || P), "string" == typeof t)) {
              if (
                !(n =
                  "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3
                    ? [null, t, null]
                    : D.exec(t)) ||
                (!n[1] && e)
              )
                return !e || e.jquery
                  ? (e || i).find(t)
                  : this.constructor(e).find(t);
              if (n[1]) {
                if (
                  ((e = e instanceof k ? e[0] : e),
                  k.merge(
                    this,
                    k.parseHTML(
                      n[1],
                      e && e.nodeType ? e.ownerDocument || e : y,
                      !0
                    )
                  ),
                  q.test(n[1]) && k.isPlainObject(e))
                )
                  for (n in e) m(this[n]) ? this[n](e[n]) : this.attr(n, e[n]);
                return this;
              }
              return (
                (s = y.getElementById(n[2])) &&
                  ((this[0] = s), (this.length = 1)),
                this
              );
            }
            return t.nodeType
              ? ((this[0] = t), (this.length = 1), this)
              : m(t)
              ? void 0 !== i.ready
                ? i.ready(t)
                : t(k)
              : k.makeArray(t, this);
          }).prototype = k.fn),
            (P = k(y));
          var A = /^(?:parents|prev(?:Until|All))/,
            I = { children: !0, contents: !0, next: !0, prev: !0 };
          function O(t, e) {
            for (; (t = t[e]) && 1 !== t.nodeType; );
            return t;
          }
          k.fn.extend({
            has: function (t) {
              var e = k(t, this),
                i = e.length;
              return this.filter(function () {
                for (var t = 0; t < i; t++)
                  if (k.contains(this, e[t])) return !0;
              });
            },
            closest: function (t, e) {
              var i,
                n = 0,
                s = this.length,
                a = [],
                o = "string" != typeof t && k(t);
              if (!$.test(t))
                for (; n < s; n++)
                  for (i = this[n]; i && i !== e; i = i.parentNode)
                    if (
                      i.nodeType < 11 &&
                      (o
                        ? o.index(i) > -1
                        : 1 === i.nodeType && k.find.matchesSelector(i, t))
                    ) {
                      a.push(i);
                      break;
                    }
              return this.pushStack(a.length > 1 ? k.uniqueSort(a) : a);
            },
            index: function (t) {
              return t
                ? "string" == typeof t
                  ? u.call(k(t), this[0])
                  : u.call(this, t.jquery ? t[0] : t)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
            },
            add: function (t, e) {
              return this.pushStack(k.uniqueSort(k.merge(this.get(), k(t, e))));
            },
            addBack: function (t) {
              return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t)
              );
            },
          }),
            k.each(
              {
                parent: function (t) {
                  var e = t.parentNode;
                  return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (t) {
                  return T(t, "parentNode");
                },
                parentsUntil: function (t, e, i) {
                  return T(t, "parentNode", i);
                },
                next: function (t) {
                  return O(t, "nextSibling");
                },
                prev: function (t) {
                  return O(t, "previousSibling");
                },
                nextAll: function (t) {
                  return T(t, "nextSibling");
                },
                prevAll: function (t) {
                  return T(t, "previousSibling");
                },
                nextUntil: function (t, e, i) {
                  return T(t, "nextSibling", i);
                },
                prevUntil: function (t, e, i) {
                  return T(t, "previousSibling", i);
                },
                siblings: function (t) {
                  return S((t.parentNode || {}).firstChild, t);
                },
                children: function (t) {
                  return S(t.firstChild);
                },
                contents: function (t) {
                  return null != t.contentDocument && o(t.contentDocument)
                    ? t.contentDocument
                    : (E(t, "template") && (t = t.content || t),
                      k.merge([], t.childNodes));
                },
              },
              function (t, e) {
                k.fn[t] = function (i, n) {
                  var s = k.map(this, e, i);
                  return (
                    "Until" !== t.slice(-5) && (n = i),
                    n && "string" == typeof n && (s = k.filter(n, s)),
                    this.length > 1 &&
                      (I[t] || k.uniqueSort(s), A.test(t) && s.reverse()),
                    this.pushStack(s)
                  );
                };
              }
            );
          var L = /[^\x20\t\r\n\f]+/g;
          function H(t) {
            return t;
          }
          function M(t) {
            throw t;
          }
          function R(t, e, i, n) {
            var s;
            try {
              t && m((s = t.promise))
                ? s.call(t).done(e).fail(i)
                : t && m((s = t.then))
                ? s.call(t, e, i)
                : e.apply(void 0, [t].slice(n));
            } catch (t) {
              i.apply(void 0, [t]);
            }
          }
          (k.Callbacks = function (t) {
            t =
              "string" == typeof t
                ? (function (t) {
                    var e = {};
                    return (
                      k.each(t.match(L) || [], function (t, i) {
                        e[i] = !0;
                      }),
                      e
                    );
                  })(t)
                : k.extend({}, t);
            var e,
              i,
              n,
              s,
              a = [],
              o = [],
              r = -1,
              h = function () {
                for (s = s || t.once, n = e = !0; o.length; r = -1)
                  for (i = o.shift(); ++r < a.length; )
                    !1 === a[r].apply(i[0], i[1]) &&
                      t.stopOnFalse &&
                      ((r = a.length), (i = !1));
                t.memory || (i = !1), (e = !1), s && (a = i ? [] : "");
              },
              l = {
                add: function () {
                  return (
                    a &&
                      (i && !e && ((r = a.length - 1), o.push(i)),
                      (function e(i) {
                        k.each(i, function (i, n) {
                          m(n)
                            ? (t.unique && l.has(n)) || a.push(n)
                            : n && n.length && "string" !== x(n) && e(n);
                        });
                      })(arguments),
                      i && !e && h()),
                    this
                  );
                },
                remove: function () {
                  return (
                    k.each(arguments, function (t, e) {
                      for (var i; (i = k.inArray(e, a, i)) > -1; )
                        a.splice(i, 1), i <= r && r--;
                    }),
                    this
                  );
                },
                has: function (t) {
                  return t ? k.inArray(t, a) > -1 : a.length > 0;
                },
                empty: function () {
                  return a && (a = []), this;
                },
                disable: function () {
                  return (s = o = []), (a = i = ""), this;
                },
                disabled: function () {
                  return !a;
                },
                lock: function () {
                  return (s = o = []), i || e || (a = i = ""), this;
                },
                locked: function () {
                  return !!s;
                },
                fireWith: function (t, i) {
                  return (
                    s ||
                      ((i = [t, (i = i || []).slice ? i.slice() : i]),
                      o.push(i),
                      e || h()),
                    this
                  );
                },
                fire: function () {
                  return l.fireWith(this, arguments), this;
                },
                fired: function () {
                  return !!n;
                },
              };
            return l;
          }),
            k.extend({
              Deferred: function (t) {
                var e = [
                    [
                      "notify",
                      "progress",
                      k.Callbacks("memory"),
                      k.Callbacks("memory"),
                      2,
                    ],
                    [
                      "resolve",
                      "done",
                      k.Callbacks("once memory"),
                      k.Callbacks("once memory"),
                      0,
                      "resolved",
                    ],
                    [
                      "reject",
                      "fail",
                      k.Callbacks("once memory"),
                      k.Callbacks("once memory"),
                      1,
                      "rejected",
                    ],
                  ],
                  i = "pending",
                  s = {
                    state: function () {
                      return i;
                    },
                    always: function () {
                      return a.done(arguments).fail(arguments), this;
                    },
                    catch: function (t) {
                      return s.then(null, t);
                    },
                    pipe: function () {
                      var t = arguments;
                      return k
                        .Deferred(function (i) {
                          k.each(e, function (e, n) {
                            var s = m(t[n[4]]) && t[n[4]];
                            a[n[1]](function () {
                              var t = s && s.apply(this, arguments);
                              t && m(t.promise)
                                ? t
                                    .promise()
                                    .progress(i.notify)
                                    .done(i.resolve)
                                    .fail(i.reject)
                                : i[n[0] + "With"](this, s ? [t] : arguments);
                            });
                          }),
                            (t = null);
                        })
                        .promise();
                    },
                    then: function (t, i, s) {
                      var a = 0;
                      function o(t, e, i, s) {
                        return function () {
                          var r = this,
                            h = arguments,
                            l = function () {
                              var n, l;
                              if (!(t < a)) {
                                if ((n = i.apply(r, h)) === e.promise())
                                  throw new TypeError(
                                    "Thenable self-resolution"
                                  );
                                (l =
                                  n &&
                                  ("object" == typeof n ||
                                    "function" == typeof n) &&
                                  n.then),
                                  m(l)
                                    ? s
                                      ? l.call(n, o(a, e, H, s), o(a, e, M, s))
                                      : (a++,
                                        l.call(
                                          n,
                                          o(a, e, H, s),
                                          o(a, e, M, s),
                                          o(a, e, H, e.notifyWith)
                                        ))
                                    : (i !== H && ((r = void 0), (h = [n])),
                                      (s || e.resolveWith)(r, h));
                              }
                            },
                            u = s
                              ? l
                              : function () {
                                  try {
                                    l();
                                  } catch (n) {
                                    k.Deferred.exceptionHook &&
                                      k.Deferred.exceptionHook(n, u.stackTrace),
                                      t + 1 >= a &&
                                        (i !== M && ((r = void 0), (h = [n])),
                                        e.rejectWith(r, h));
                                  }
                                };
                          t
                            ? u()
                            : (k.Deferred.getStackHook &&
                                (u.stackTrace = k.Deferred.getStackHook()),
                              n.setTimeout(u));
                        };
                      }
                      return k
                        .Deferred(function (n) {
                          e[0][3].add(o(0, n, m(s) ? s : H, n.notifyWith)),
                            e[1][3].add(o(0, n, m(t) ? t : H)),
                            e[2][3].add(o(0, n, m(i) ? i : M));
                        })
                        .promise();
                    },
                    promise: function (t) {
                      return null != t ? k.extend(t, s) : s;
                    },
                  },
                  a = {};
                return (
                  k.each(e, function (t, n) {
                    var o = n[2],
                      r = n[5];
                    (s[n[1]] = o.add),
                      r &&
                        o.add(
                          function () {
                            i = r;
                          },
                          e[3 - t][2].disable,
                          e[3 - t][3].disable,
                          e[0][2].lock,
                          e[0][3].lock
                        ),
                      o.add(n[3].fire),
                      (a[n[0]] = function () {
                        return (
                          a[n[0] + "With"](
                            this === a ? void 0 : this,
                            arguments
                          ),
                          this
                        );
                      }),
                      (a[n[0] + "With"] = o.fireWith);
                  }),
                  s.promise(a),
                  t && t.call(a, a),
                  a
                );
              },
              when: function (t) {
                var e = arguments.length,
                  i = e,
                  n = Array(i),
                  s = r.call(arguments),
                  a = k.Deferred(),
                  o = function (t) {
                    return function (i) {
                      (n[t] = this),
                        (s[t] = arguments.length > 1 ? r.call(arguments) : i),
                        --e || a.resolveWith(n, s);
                    };
                  };
                if (
                  e <= 1 &&
                  (R(t, a.done(o(i)).resolve, a.reject, !e),
                  "pending" === a.state() || m(s[i] && s[i].then))
                )
                  return a.then();
                for (; i--; ) R(s[i], o(i), a.reject);
                return a.promise();
              },
            });
          var U = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
          (k.Deferred.exceptionHook = function (t, e) {
            n.console &&
              n.console.warn &&
              t &&
              U.test(t.name) &&
              n.console.warn(
                "jQuery.Deferred exception: " + t.message,
                t.stack,
                e
              );
          }),
            (k.readyException = function (t) {
              n.setTimeout(function () {
                throw t;
              });
            });
          var W = k.Deferred();
          function F() {
            y.removeEventListener("DOMContentLoaded", F),
              n.removeEventListener("load", F),
              k.ready();
          }
          (k.fn.ready = function (t) {
            return (
              W.then(t).catch(function (t) {
                k.readyException(t);
              }),
              this
            );
          }),
            k.extend({
              isReady: !1,
              readyWait: 1,
              ready: function (t) {
                (!0 === t ? --k.readyWait : k.isReady) ||
                  ((k.isReady = !0),
                  (!0 !== t && --k.readyWait > 0) || W.resolveWith(y, [k]));
              },
            }),
            (k.ready.then = W.then),
            "complete" === y.readyState ||
            ("loading" !== y.readyState && !y.documentElement.doScroll)
              ? n.setTimeout(k.ready)
              : (y.addEventListener("DOMContentLoaded", F),
                n.addEventListener("load", F));
          var B = function (t, e, i, n, s, a, o) {
              var r = 0,
                h = t.length,
                l = null == i;
              if ("object" === x(i))
                for (r in ((s = !0), i)) B(t, e, r, i[r], !0, a, o);
              else if (
                void 0 !== n &&
                ((s = !0),
                m(n) || (o = !0),
                l &&
                  (o
                    ? (e.call(t, n), (e = null))
                    : ((l = e),
                      (e = function (t, e, i) {
                        return l.call(k(t), i);
                      }))),
                e)
              )
                for (; r < h; r++)
                  e(t[r], i, o ? n : n.call(t[r], r, e(t[r], i)));
              return s ? t : l ? e.call(t) : h ? e(t[0], i) : a;
            },
            X = /^-ms-/,
            J = /-([a-z])/g;
          function Y(t, e) {
            return e.toUpperCase();
          }
          function G(t) {
            return t.replace(X, "ms-").replace(J, Y);
          }
          var V = function (t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
          };
          function Q() {
            this.expando = k.expando + Q.uid++;
          }
          (Q.uid = 1),
            (Q.prototype = {
              cache: function (t) {
                var e = t[this.expando];
                return (
                  e ||
                    ((e = {}),
                    V(t) &&
                      (t.nodeType
                        ? (t[this.expando] = e)
                        : Object.defineProperty(t, this.expando, {
                            value: e,
                            configurable: !0,
                          }))),
                  e
                );
              },
              set: function (t, e, i) {
                var n,
                  s = this.cache(t);
                if ("string" == typeof e) s[G(e)] = i;
                else for (n in e) s[G(n)] = e[n];
                return s;
              },
              get: function (t, e) {
                return void 0 === e
                  ? this.cache(t)
                  : t[this.expando] && t[this.expando][G(e)];
              },
              access: function (t, e, i) {
                return void 0 === e ||
                  (e && "string" == typeof e && void 0 === i)
                  ? this.get(t, e)
                  : (this.set(t, e, i), void 0 !== i ? i : e);
              },
              remove: function (t, e) {
                var i,
                  n = t[this.expando];
                if (void 0 !== n) {
                  if (void 0 !== e) {
                    i = (e = Array.isArray(e)
                      ? e.map(G)
                      : (e = G(e)) in n
                      ? [e]
                      : e.match(L) || []).length;
                    for (; i--; ) delete n[e[i]];
                  }
                  (void 0 === e || k.isEmptyObject(n)) &&
                    (t.nodeType
                      ? (t[this.expando] = void 0)
                      : delete t[this.expando]);
                }
              },
              hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !k.isEmptyObject(e);
              },
            });
          var K = new Q(),
            Z = new Q(),
            tt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            et = /[A-Z]/g;
          function it(t, e, i) {
            var n;
            if (void 0 === i && 1 === t.nodeType)
              if (
                ((n = "data-" + e.replace(et, "-$&").toLowerCase()),
                "string" == typeof (i = t.getAttribute(n)))
              ) {
                try {
                  i = (function (t) {
                    return (
                      "true" === t ||
                      ("false" !== t &&
                        ("null" === t
                          ? null
                          : t === +t + ""
                          ? +t
                          : tt.test(t)
                          ? JSON.parse(t)
                          : t))
                    );
                  })(i);
                } catch (t) {}
                Z.set(t, e, i);
              } else i = void 0;
            return i;
          }
          k.extend({
            hasData: function (t) {
              return Z.hasData(t) || K.hasData(t);
            },
            data: function (t, e, i) {
              return Z.access(t, e, i);
            },
            removeData: function (t, e) {
              Z.remove(t, e);
            },
            _data: function (t, e, i) {
              return K.access(t, e, i);
            },
            _removeData: function (t, e) {
              K.remove(t, e);
            },
          }),
            k.fn.extend({
              data: function (t, e) {
                var i,
                  n,
                  s,
                  a = this[0],
                  o = a && a.attributes;
                if (void 0 === t) {
                  if (
                    this.length &&
                    ((s = Z.get(a)),
                    1 === a.nodeType && !K.get(a, "hasDataAttrs"))
                  ) {
                    for (i = o.length; i--; )
                      o[i] &&
                        0 === (n = o[i].name).indexOf("data-") &&
                        ((n = G(n.slice(5))), it(a, n, s[n]));
                    K.set(a, "hasDataAttrs", !0);
                  }
                  return s;
                }
                return "object" == typeof t
                  ? this.each(function () {
                      Z.set(this, t);
                    })
                  : B(
                      this,
                      function (e) {
                        var i;
                        if (a && void 0 === e)
                          return void 0 !== (i = Z.get(a, t)) ||
                            void 0 !== (i = it(a, t))
                            ? i
                            : void 0;
                        this.each(function () {
                          Z.set(this, t, e);
                        });
                      },
                      null,
                      e,
                      arguments.length > 1,
                      null,
                      !0
                    );
              },
              removeData: function (t) {
                return this.each(function () {
                  Z.remove(this, t);
                });
              },
            }),
            k.extend({
              queue: function (t, e, i) {
                var n;
                if (t)
                  return (
                    (e = (e || "fx") + "queue"),
                    (n = K.get(t, e)),
                    i &&
                      (!n || Array.isArray(i)
                        ? (n = K.access(t, e, k.makeArray(i)))
                        : n.push(i)),
                    n || []
                  );
              },
              dequeue: function (t, e) {
                e = e || "fx";
                var i = k.queue(t, e),
                  n = i.length,
                  s = i.shift(),
                  a = k._queueHooks(t, e);
                "inprogress" === s && ((s = i.shift()), n--),
                  s &&
                    ("fx" === e && i.unshift("inprogress"),
                    delete a.stop,
                    s.call(
                      t,
                      function () {
                        k.dequeue(t, e);
                      },
                      a
                    )),
                  !n && a && a.empty.fire();
              },
              _queueHooks: function (t, e) {
                var i = e + "queueHooks";
                return (
                  K.get(t, i) ||
                  K.access(t, i, {
                    empty: k.Callbacks("once memory").add(function () {
                      K.remove(t, [e + "queue", i]);
                    }),
                  })
                );
              },
            }),
            k.fn.extend({
              queue: function (t, e) {
                var i = 2;
                return (
                  "string" != typeof t && ((e = t), (t = "fx"), i--),
                  arguments.length < i
                    ? k.queue(this[0], t)
                    : void 0 === e
                    ? this
                    : this.each(function () {
                        var i = k.queue(this, t, e);
                        k._queueHooks(this, t),
                          "fx" === t &&
                            "inprogress" !== i[0] &&
                            k.dequeue(this, t);
                      })
                );
              },
              dequeue: function (t) {
                return this.each(function () {
                  k.dequeue(this, t);
                });
              },
              clearQueue: function (t) {
                return this.queue(t || "fx", []);
              },
              promise: function (t, e) {
                var i,
                  n = 1,
                  s = k.Deferred(),
                  a = this,
                  o = this.length,
                  r = function () {
                    --n || s.resolveWith(a, [a]);
                  };
                for (
                  "string" != typeof t && ((e = t), (t = void 0)),
                    t = t || "fx";
                  o--;

                )
                  (i = K.get(a[o], t + "queueHooks")) &&
                    i.empty &&
                    (n++, i.empty.add(r));
                return r(), s.promise(e);
              },
            });
          var nt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            st = new RegExp("^(?:([+-])=|)(" + nt + ")([a-z%]*)$", "i"),
            at = ["Top", "Right", "Bottom", "Left"],
            ot = y.documentElement,
            rt = function (t) {
              return k.contains(t.ownerDocument, t);
            },
            ht = { composed: !0 };
          ot.getRootNode &&
            (rt = function (t) {
              return (
                k.contains(t.ownerDocument, t) ||
                t.getRootNode(ht) === t.ownerDocument
              );
            });
          var lt = function (t, e) {
            return (
              "none" === (t = e || t).style.display ||
              ("" === t.style.display &&
                rt(t) &&
                "none" === k.css(t, "display"))
            );
          };
          function ut(t, e, i, n) {
            var s,
              a,
              o = 20,
              r = n
                ? function () {
                    return n.cur();
                  }
                : function () {
                    return k.css(t, e, "");
                  },
              h = r(),
              l = (i && i[3]) || (k.cssNumber[e] ? "" : "px"),
              u =
                t.nodeType &&
                (k.cssNumber[e] || ("px" !== l && +h)) &&
                st.exec(k.css(t, e));
            if (u && u[3] !== l) {
              for (h /= 2, l = l || u[3], u = +h || 1; o--; )
                k.style(t, e, u + l),
                  (1 - a) * (1 - (a = r() / h || 0.5)) <= 0 && (o = 0),
                  (u /= a);
              (u *= 2), k.style(t, e, u + l), (i = i || []);
            }
            return (
              i &&
                ((u = +u || +h || 0),
                (s = i[1] ? u + (i[1] + 1) * i[2] : +i[2]),
                n && ((n.unit = l), (n.start = u), (n.end = s))),
              s
            );
          }
          var pt = {};
          function ct(t) {
            var e,
              i = t.ownerDocument,
              n = t.nodeName,
              s = pt[n];
            return (
              s ||
              ((e = i.body.appendChild(i.createElement(n))),
              (s = k.css(e, "display")),
              e.parentNode.removeChild(e),
              "none" === s && (s = "block"),
              (pt[n] = s),
              s)
            );
          }
          function ft(t, e) {
            for (var i, n, s = [], a = 0, o = t.length; a < o; a++)
              (n = t[a]).style &&
                ((i = n.style.display),
                e
                  ? ("none" === i &&
                      ((s[a] = K.get(n, "display") || null),
                      s[a] || (n.style.display = "")),
                    "" === n.style.display && lt(n) && (s[a] = ct(n)))
                  : "none" !== i && ((s[a] = "none"), K.set(n, "display", i)));
            for (a = 0; a < o; a++) null != s[a] && (t[a].style.display = s[a]);
            return t;
          }
          k.fn.extend({
            show: function () {
              return ft(this, !0);
            },
            hide: function () {
              return ft(this);
            },
            toggle: function (t) {
              return "boolean" == typeof t
                ? t
                  ? this.show()
                  : this.hide()
                : this.each(function () {
                    lt(this) ? k(this).show() : k(this).hide();
                  });
            },
          });
          var dt,
            gt,
            _t = /^(?:checkbox|radio)$/i,
            mt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
            vt = /^$|^module$|\/(?:java|ecma)script/i;
          (dt = y.createDocumentFragment().appendChild(y.createElement("div"))),
            (gt = y.createElement("input")).setAttribute("type", "radio"),
            gt.setAttribute("checked", "checked"),
            gt.setAttribute("name", "t"),
            dt.appendChild(gt),
            (_.checkClone = dt.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (dt.innerHTML = "<textarea>x</textarea>"),
            (_.noCloneChecked = !!dt.cloneNode(!0).lastChild.defaultValue),
            (dt.innerHTML = "<option></option>"),
            (_.option = !!dt.lastChild);
          var yt = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
          };
          function bt(t, e) {
            var i;
            return (
              (i =
                void 0 !== t.getElementsByTagName
                  ? t.getElementsByTagName(e || "*")
                  : void 0 !== t.querySelectorAll
                  ? t.querySelectorAll(e || "*")
                  : []),
              void 0 === e || (e && E(t, e)) ? k.merge([t], i) : i
            );
          }
          function wt(t, e) {
            for (var i = 0, n = t.length; i < n; i++)
              K.set(t[i], "globalEval", !e || K.get(e[i], "globalEval"));
          }
          (yt.tbody = yt.tfoot = yt.colgroup = yt.caption = yt.thead),
            (yt.th = yt.td),
            _.option ||
              (yt.optgroup = yt.option =
                [1, "<select multiple='multiple'>", "</select>"]);
          var xt = /<|&#?\w+;/;
          function zt(t, e, i, n, s) {
            for (
              var a,
                o,
                r,
                h,
                l,
                u,
                p = e.createDocumentFragment(),
                c = [],
                f = 0,
                d = t.length;
              f < d;
              f++
            )
              if ((a = t[f]) || 0 === a)
                if ("object" === x(a)) k.merge(c, a.nodeType ? [a] : a);
                else if (xt.test(a)) {
                  for (
                    o = o || p.appendChild(e.createElement("div")),
                      r = (mt.exec(a) || ["", ""])[1].toLowerCase(),
                      h = yt[r] || yt._default,
                      o.innerHTML = h[1] + k.htmlPrefilter(a) + h[2],
                      u = h[0];
                    u--;

                  )
                    o = o.lastChild;
                  k.merge(c, o.childNodes),
                    ((o = p.firstChild).textContent = "");
                } else c.push(e.createTextNode(a));
            for (p.textContent = "", f = 0; (a = c[f++]); )
              if (n && k.inArray(a, n) > -1) s && s.push(a);
              else if (
                ((l = rt(a)),
                (o = bt(p.appendChild(a), "script")),
                l && wt(o),
                i)
              )
                for (u = 0; (a = o[u++]); ) vt.test(a.type || "") && i.push(a);
            return p;
          }
          var kt = /^([^.]*)(?:\.(.+)|)/;
          function jt() {
            return !0;
          }
          function Ct() {
            return !1;
          }
          function Tt(t, e) {
            return (
              (t ===
                (function () {
                  try {
                    return y.activeElement;
                  } catch (t) {}
                })()) ==
              ("focus" === e)
            );
          }
          function St(t, e, i, n, s, a) {
            var o, r;
            if ("object" == typeof e) {
              for (r in ("string" != typeof i && ((n = n || i), (i = void 0)),
              e))
                St(t, r, i, n, e[r], a);
              return t;
            }
            if (
              (null == n && null == s
                ? ((s = i), (n = i = void 0))
                : null == s &&
                  ("string" == typeof i
                    ? ((s = n), (n = void 0))
                    : ((s = n), (n = i), (i = void 0))),
              !1 === s)
            )
              s = Ct;
            else if (!s) return t;
            return (
              1 === a &&
                ((o = s),
                (s = function (t) {
                  return k().off(t), o.apply(this, arguments);
                }),
                (s.guid = o.guid || (o.guid = k.guid++))),
              t.each(function () {
                k.event.add(this, e, s, n, i);
              })
            );
          }
          function $t(t, e, i) {
            i
              ? (K.set(t, e, !1),
                k.event.add(t, e, {
                  namespace: !1,
                  handler: function (t) {
                    var n,
                      s,
                      a = K.get(this, e);
                    if (1 & t.isTrigger && this[e]) {
                      if (a.length)
                        (k.event.special[e] || {}).delegateType &&
                          t.stopPropagation();
                      else if (
                        ((a = r.call(arguments)),
                        K.set(this, e, a),
                        (n = i(this, e)),
                        this[e](),
                        a !== (s = K.get(this, e)) || n
                          ? K.set(this, e, !1)
                          : (s = {}),
                        a !== s)
                      )
                        return (
                          t.stopImmediatePropagation(),
                          t.preventDefault(),
                          s && s.value
                        );
                    } else
                      a.length &&
                        (K.set(this, e, {
                          value: k.event.trigger(
                            k.extend(a[0], k.Event.prototype),
                            a.slice(1),
                            this
                          ),
                        }),
                        t.stopImmediatePropagation());
                  },
                }))
              : void 0 === K.get(t, e) && k.event.add(t, e, jt);
          }
          (k.event = {
            global: {},
            add: function (t, e, i, n, s) {
              var a,
                o,
                r,
                h,
                l,
                u,
                p,
                c,
                f,
                d,
                g,
                _ = K.get(t);
              if (V(t))
                for (
                  i.handler && ((i = (a = i).handler), (s = a.selector)),
                    s && k.find.matchesSelector(ot, s),
                    i.guid || (i.guid = k.guid++),
                    (h = _.events) || (h = _.events = Object.create(null)),
                    (o = _.handle) ||
                      (o = _.handle =
                        function (e) {
                          return void 0 !== k && k.event.triggered !== e.type
                            ? k.event.dispatch.apply(t, arguments)
                            : void 0;
                        }),
                    l = (e = (e || "").match(L) || [""]).length;
                  l--;

                )
                  (f = g = (r = kt.exec(e[l]) || [])[1]),
                    (d = (r[2] || "").split(".").sort()),
                    f &&
                      ((p = k.event.special[f] || {}),
                      (f = (s ? p.delegateType : p.bindType) || f),
                      (p = k.event.special[f] || {}),
                      (u = k.extend(
                        {
                          type: f,
                          origType: g,
                          data: n,
                          handler: i,
                          guid: i.guid,
                          selector: s,
                          needsContext: s && k.expr.match.needsContext.test(s),
                          namespace: d.join("."),
                        },
                        a
                      )),
                      (c = h[f]) ||
                        (((c = h[f] = []).delegateCount = 0),
                        (p.setup && !1 !== p.setup.call(t, n, d, o)) ||
                          (t.addEventListener && t.addEventListener(f, o))),
                      p.add &&
                        (p.add.call(t, u),
                        u.handler.guid || (u.handler.guid = i.guid)),
                      s ? c.splice(c.delegateCount++, 0, u) : c.push(u),
                      (k.event.global[f] = !0));
            },
            remove: function (t, e, i, n, s) {
              var a,
                o,
                r,
                h,
                l,
                u,
                p,
                c,
                f,
                d,
                g,
                _ = K.hasData(t) && K.get(t);
              if (_ && (h = _.events)) {
                for (l = (e = (e || "").match(L) || [""]).length; l--; )
                  if (
                    ((f = g = (r = kt.exec(e[l]) || [])[1]),
                    (d = (r[2] || "").split(".").sort()),
                    f)
                  ) {
                    for (
                      p = k.event.special[f] || {},
                        c =
                          h[(f = (n ? p.delegateType : p.bindType) || f)] || [],
                        r =
                          r[2] &&
                          new RegExp(
                            "(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          ),
                        o = a = c.length;
                      a--;

                    )
                      (u = c[a]),
                        (!s && g !== u.origType) ||
                          (i && i.guid !== u.guid) ||
                          (r && !r.test(u.namespace)) ||
                          (n &&
                            n !== u.selector &&
                            ("**" !== n || !u.selector)) ||
                          (c.splice(a, 1),
                          u.selector && c.delegateCount--,
                          p.remove && p.remove.call(t, u));
                    o &&
                      !c.length &&
                      ((p.teardown && !1 !== p.teardown.call(t, d, _.handle)) ||
                        k.removeEvent(t, f, _.handle),
                      delete h[f]);
                  } else for (f in h) k.event.remove(t, f + e[l], i, n, !0);
                k.isEmptyObject(h) && K.remove(t, "handle events");
              }
            },
            dispatch: function (t) {
              var e,
                i,
                n,
                s,
                a,
                o,
                r = new Array(arguments.length),
                h = k.event.fix(t),
                l =
                  (K.get(this, "events") || Object.create(null))[h.type] || [],
                u = k.event.special[h.type] || {};
              for (r[0] = h, e = 1; e < arguments.length; e++)
                r[e] = arguments[e];
              if (
                ((h.delegateTarget = this),
                !u.preDispatch || !1 !== u.preDispatch.call(this, h))
              ) {
                for (
                  o = k.event.handlers.call(this, h, l), e = 0;
                  (s = o[e++]) && !h.isPropagationStopped();

                )
                  for (
                    h.currentTarget = s.elem, i = 0;
                    (a = s.handlers[i++]) && !h.isImmediatePropagationStopped();

                  )
                    (h.rnamespace &&
                      !1 !== a.namespace &&
                      !h.rnamespace.test(a.namespace)) ||
                      ((h.handleObj = a),
                      (h.data = a.data),
                      void 0 !==
                        (n = (
                          (k.event.special[a.origType] || {}).handle ||
                          a.handler
                        ).apply(s.elem, r)) &&
                        !1 === (h.result = n) &&
                        (h.preventDefault(), h.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, h), h.result;
              }
            },
            handlers: function (t, e) {
              var i,
                n,
                s,
                a,
                o,
                r = [],
                h = e.delegateCount,
                l = t.target;
              if (h && l.nodeType && !("click" === t.type && t.button >= 1))
                for (; l !== this; l = l.parentNode || this)
                  if (
                    1 === l.nodeType &&
                    ("click" !== t.type || !0 !== l.disabled)
                  ) {
                    for (a = [], o = {}, i = 0; i < h; i++)
                      void 0 === o[(s = (n = e[i]).selector + " ")] &&
                        (o[s] = n.needsContext
                          ? k(s, this).index(l) > -1
                          : k.find(s, this, null, [l]).length),
                        o[s] && a.push(n);
                    a.length && r.push({ elem: l, handlers: a });
                  }
              return (
                (l = this),
                h < e.length && r.push({ elem: l, handlers: e.slice(h) }),
                r
              );
            },
            addProp: function (t, e) {
              Object.defineProperty(k.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: m(e)
                  ? function () {
                      if (this.originalEvent) return e(this.originalEvent);
                    }
                  : function () {
                      if (this.originalEvent) return this.originalEvent[t];
                    },
                set: function (e) {
                  Object.defineProperty(this, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: e,
                  });
                },
              });
            },
            fix: function (t) {
              return t[k.expando] ? t : new k.Event(t);
            },
            special: {
              load: { noBubble: !0 },
              click: {
                setup: function (t) {
                  var e = this || t;
                  return (
                    _t.test(e.type) &&
                      e.click &&
                      E(e, "input") &&
                      $t(e, "click", jt),
                    !1
                  );
                },
                trigger: function (t) {
                  var e = this || t;
                  return (
                    _t.test(e.type) &&
                      e.click &&
                      E(e, "input") &&
                      $t(e, "click"),
                    !0
                  );
                },
                _default: function (t) {
                  var e = t.target;
                  return (
                    (_t.test(e.type) &&
                      e.click &&
                      E(e, "input") &&
                      K.get(e, "click")) ||
                    E(e, "a")
                  );
                },
              },
              beforeunload: {
                postDispatch: function (t) {
                  void 0 !== t.result &&
                    t.originalEvent &&
                    (t.originalEvent.returnValue = t.result);
                },
              },
            },
          }),
            (k.removeEvent = function (t, e, i) {
              t.removeEventListener && t.removeEventListener(e, i);
            }),
            (k.Event = function (t, e) {
              if (!(this instanceof k.Event)) return new k.Event(t, e);
              t && t.type
                ? ((this.originalEvent = t),
                  (this.type = t.type),
                  (this.isDefaultPrevented =
                    t.defaultPrevented ||
                    (void 0 === t.defaultPrevented && !1 === t.returnValue)
                      ? jt
                      : Ct),
                  (this.target =
                    t.target && 3 === t.target.nodeType
                      ? t.target.parentNode
                      : t.target),
                  (this.currentTarget = t.currentTarget),
                  (this.relatedTarget = t.relatedTarget))
                : (this.type = t),
                e && k.extend(this, e),
                (this.timeStamp = (t && t.timeStamp) || Date.now()),
                (this[k.expando] = !0);
            }),
            (k.Event.prototype = {
              constructor: k.Event,
              isDefaultPrevented: Ct,
              isPropagationStopped: Ct,
              isImmediatePropagationStopped: Ct,
              isSimulated: !1,
              preventDefault: function () {
                var t = this.originalEvent;
                (this.isDefaultPrevented = jt),
                  t && !this.isSimulated && t.preventDefault();
              },
              stopPropagation: function () {
                var t = this.originalEvent;
                (this.isPropagationStopped = jt),
                  t && !this.isSimulated && t.stopPropagation();
              },
              stopImmediatePropagation: function () {
                var t = this.originalEvent;
                (this.isImmediatePropagationStopped = jt),
                  t && !this.isSimulated && t.stopImmediatePropagation(),
                  this.stopPropagation();
              },
            }),
            k.each(
              {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0,
              },
              k.event.addProp
            ),
            k.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
              k.event.special[t] = {
                setup: function () {
                  return $t(this, t, Tt), !1;
                },
                trigger: function () {
                  return $t(this, t), !0;
                },
                _default: function () {
                  return !0;
                },
                delegateType: e,
              };
            }),
            k.each(
              {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
              },
              function (t, e) {
                k.event.special[t] = {
                  delegateType: e,
                  bindType: e,
                  handle: function (t) {
                    var i,
                      n = this,
                      s = t.relatedTarget,
                      a = t.handleObj;
                    return (
                      (s && (s === n || k.contains(n, s))) ||
                        ((t.type = a.origType),
                        (i = a.handler.apply(this, arguments)),
                        (t.type = e)),
                      i
                    );
                  },
                };
              }
            ),
            k.fn.extend({
              on: function (t, e, i, n) {
                return St(this, t, e, i, n);
              },
              one: function (t, e, i, n) {
                return St(this, t, e, i, n, 1);
              },
              off: function (t, e, i) {
                var n, s;
                if (t && t.preventDefault && t.handleObj)
                  return (
                    (n = t.handleObj),
                    k(t.delegateTarget).off(
                      n.namespace ? n.origType + "." + n.namespace : n.origType,
                      n.selector,
                      n.handler
                    ),
                    this
                  );
                if ("object" == typeof t) {
                  for (s in t) this.off(s, e, t[s]);
                  return this;
                }
                return (
                  (!1 !== e && "function" != typeof e) ||
                    ((i = e), (e = void 0)),
                  !1 === i && (i = Ct),
                  this.each(function () {
                    k.event.remove(this, t, i, e);
                  })
                );
              },
            });
          var Et = /<script|<style|<link/i,
            qt = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Nt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
          function Pt(t, e) {
            return (
              (E(t, "table") &&
                E(11 !== e.nodeType ? e : e.firstChild, "tr") &&
                k(t).children("tbody")[0]) ||
              t
            );
          }
          function Dt(t) {
            return (
              (t.type = (null !== t.getAttribute("type")) + "/" + t.type), t
            );
          }
          function At(t) {
            return (
              "true/" === (t.type || "").slice(0, 5)
                ? (t.type = t.type.slice(5))
                : t.removeAttribute("type"),
              t
            );
          }
          function It(t, e) {
            var i, n, s, a, o, r;
            if (1 === e.nodeType) {
              if (K.hasData(t) && (r = K.get(t).events))
                for (s in (K.remove(e, "handle events"), r))
                  for (i = 0, n = r[s].length; i < n; i++)
                    k.event.add(e, s, r[s][i]);
              Z.hasData(t) &&
                ((a = Z.access(t)), (o = k.extend({}, a)), Z.set(e, o));
            }
          }
          function Ot(t, e) {
            var i = e.nodeName.toLowerCase();
            "input" === i && _t.test(t.type)
              ? (e.checked = t.checked)
              : ("input" !== i && "textarea" !== i) ||
                (e.defaultValue = t.defaultValue);
          }
          function Lt(t, e, i, n) {
            e = h(e);
            var s,
              a,
              o,
              r,
              l,
              u,
              p = 0,
              c = t.length,
              f = c - 1,
              d = e[0],
              g = m(d);
            if (
              g ||
              (c > 1 && "string" == typeof d && !_.checkClone && qt.test(d))
            )
              return t.each(function (s) {
                var a = t.eq(s);
                g && (e[0] = d.call(this, s, a.html())), Lt(a, e, i, n);
              });
            if (
              c &&
              ((a = (s = zt(e, t[0].ownerDocument, !1, t, n)).firstChild),
              1 === s.childNodes.length && (s = a),
              a || n)
            ) {
              for (r = (o = k.map(bt(s, "script"), Dt)).length; p < c; p++)
                (l = s),
                  p !== f &&
                    ((l = k.clone(l, !0, !0)),
                    r && k.merge(o, bt(l, "script"))),
                  i.call(t[p], l, p);
              if (r)
                for (
                  u = o[o.length - 1].ownerDocument, k.map(o, At), p = 0;
                  p < r;
                  p++
                )
                  (l = o[p]),
                    vt.test(l.type || "") &&
                      !K.access(l, "globalEval") &&
                      k.contains(u, l) &&
                      (l.src && "module" !== (l.type || "").toLowerCase()
                        ? k._evalUrl &&
                          !l.noModule &&
                          k._evalUrl(
                            l.src,
                            { nonce: l.nonce || l.getAttribute("nonce") },
                            u
                          )
                        : w(l.textContent.replace(Nt, ""), l, u));
            }
            return t;
          }
          function Ht(t, e, i) {
            for (
              var n, s = e ? k.filter(e, t) : t, a = 0;
              null != (n = s[a]);
              a++
            )
              i || 1 !== n.nodeType || k.cleanData(bt(n)),
                n.parentNode &&
                  (i && rt(n) && wt(bt(n, "script")),
                  n.parentNode.removeChild(n));
            return t;
          }
          k.extend({
            htmlPrefilter: function (t) {
              return t;
            },
            clone: function (t, e, i) {
              var n,
                s,
                a,
                o,
                r = t.cloneNode(!0),
                h = rt(t);
              if (
                !(
                  _.noCloneChecked ||
                  (1 !== t.nodeType && 11 !== t.nodeType) ||
                  k.isXMLDoc(t)
                )
              )
                for (o = bt(r), n = 0, s = (a = bt(t)).length; n < s; n++)
                  Ot(a[n], o[n]);
              if (e)
                if (i)
                  for (
                    a = a || bt(t), o = o || bt(r), n = 0, s = a.length;
                    n < s;
                    n++
                  )
                    It(a[n], o[n]);
                else It(t, r);
              return (
                (o = bt(r, "script")).length > 0 &&
                  wt(o, !h && bt(t, "script")),
                r
              );
            },
            cleanData: function (t) {
              for (
                var e, i, n, s = k.event.special, a = 0;
                void 0 !== (i = t[a]);
                a++
              )
                if (V(i)) {
                  if ((e = i[K.expando])) {
                    if (e.events)
                      for (n in e.events)
                        s[n]
                          ? k.event.remove(i, n)
                          : k.removeEvent(i, n, e.handle);
                    i[K.expando] = void 0;
                  }
                  i[Z.expando] && (i[Z.expando] = void 0);
                }
            },
          }),
            k.fn.extend({
              detach: function (t) {
                return Ht(this, t, !0);
              },
              remove: function (t) {
                return Ht(this, t);
              },
              text: function (t) {
                return B(
                  this,
                  function (t) {
                    return void 0 === t
                      ? k.text(this)
                      : this.empty().each(function () {
                          (1 !== this.nodeType &&
                            11 !== this.nodeType &&
                            9 !== this.nodeType) ||
                            (this.textContent = t);
                        });
                  },
                  null,
                  t,
                  arguments.length
                );
              },
              append: function () {
                return Lt(this, arguments, function (t) {
                  (1 !== this.nodeType &&
                    11 !== this.nodeType &&
                    9 !== this.nodeType) ||
                    Pt(this, t).appendChild(t);
                });
              },
              prepend: function () {
                return Lt(this, arguments, function (t) {
                  if (
                    1 === this.nodeType ||
                    11 === this.nodeType ||
                    9 === this.nodeType
                  ) {
                    var e = Pt(this, t);
                    e.insertBefore(t, e.firstChild);
                  }
                });
              },
              before: function () {
                return Lt(this, arguments, function (t) {
                  this.parentNode && this.parentNode.insertBefore(t, this);
                });
              },
              after: function () {
                return Lt(this, arguments, function (t) {
                  this.parentNode &&
                    this.parentNode.insertBefore(t, this.nextSibling);
                });
              },
              empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++)
                  1 === t.nodeType &&
                    (k.cleanData(bt(t, !1)), (t.textContent = ""));
                return this;
              },
              clone: function (t, e) {
                return (
                  (t = null != t && t),
                  (e = null == e ? t : e),
                  this.map(function () {
                    return k.clone(this, t, e);
                  })
                );
              },
              html: function (t) {
                return B(
                  this,
                  function (t) {
                    var e = this[0] || {},
                      i = 0,
                      n = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if (
                      "string" == typeof t &&
                      !Et.test(t) &&
                      !yt[(mt.exec(t) || ["", ""])[1].toLowerCase()]
                    ) {
                      t = k.htmlPrefilter(t);
                      try {
                        for (; i < n; i++)
                          1 === (e = this[i] || {}).nodeType &&
                            (k.cleanData(bt(e, !1)), (e.innerHTML = t));
                        e = 0;
                      } catch (t) {}
                    }
                    e && this.empty().append(t);
                  },
                  null,
                  t,
                  arguments.length
                );
              },
              replaceWith: function () {
                var t = [];
                return Lt(
                  this,
                  arguments,
                  function (e) {
                    var i = this.parentNode;
                    k.inArray(this, t) < 0 &&
                      (k.cleanData(bt(this)), i && i.replaceChild(e, this));
                  },
                  t
                );
              },
            }),
            k.each(
              {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
              },
              function (t, e) {
                k.fn[t] = function (t) {
                  for (
                    var i, n = [], s = k(t), a = s.length - 1, o = 0;
                    o <= a;
                    o++
                  )
                    (i = o === a ? this : this.clone(!0)),
                      k(s[o])[e](i),
                      l.apply(n, i.get());
                  return this.pushStack(n);
                };
              }
            );
          var Mt = new RegExp("^(" + nt + ")(?!px)[a-z%]+$", "i"),
            Rt = function (t) {
              var e = t.ownerDocument.defaultView;
              return (e && e.opener) || (e = n), e.getComputedStyle(t);
            },
            Ut = function (t, e, i) {
              var n,
                s,
                a = {};
              for (s in e) (a[s] = t.style[s]), (t.style[s] = e[s]);
              for (s in ((n = i.call(t)), e)) t.style[s] = a[s];
              return n;
            },
            Wt = new RegExp(at.join("|"), "i");
          function Ft(t, e, i) {
            var n,
              s,
              a,
              o,
              r = t.style;
            return (
              (i = i || Rt(t)) &&
                ("" !== (o = i.getPropertyValue(e) || i[e]) ||
                  rt(t) ||
                  (o = k.style(t, e)),
                !_.pixelBoxStyles() &&
                  Mt.test(o) &&
                  Wt.test(e) &&
                  ((n = r.width),
                  (s = r.minWidth),
                  (a = r.maxWidth),
                  (r.minWidth = r.maxWidth = r.width = o),
                  (o = i.width),
                  (r.width = n),
                  (r.minWidth = s),
                  (r.maxWidth = a))),
              void 0 !== o ? o + "" : o
            );
          }
          function Bt(t, e) {
            return {
              get: function () {
                if (!t()) return (this.get = e).apply(this, arguments);
                delete this.get;
              },
            };
          }
          !(function () {
            function t() {
              if (u) {
                (l.style.cssText =
                  "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
                  (u.style.cssText =
                    "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
                  ot.appendChild(l).appendChild(u);
                var t = n.getComputedStyle(u);
                (i = "1%" !== t.top),
                  (h = 12 === e(t.marginLeft)),
                  (u.style.right = "60%"),
                  (o = 36 === e(t.right)),
                  (s = 36 === e(t.width)),
                  (u.style.position = "absolute"),
                  (a = 12 === e(u.offsetWidth / 3)),
                  ot.removeChild(l),
                  (u = null);
              }
            }
            function e(t) {
              return Math.round(parseFloat(t));
            }
            var i,
              s,
              a,
              o,
              r,
              h,
              l = y.createElement("div"),
              u = y.createElement("div");
            u.style &&
              ((u.style.backgroundClip = "content-box"),
              (u.cloneNode(!0).style.backgroundClip = ""),
              (_.clearCloneStyle = "content-box" === u.style.backgroundClip),
              k.extend(_, {
                boxSizingReliable: function () {
                  return t(), s;
                },
                pixelBoxStyles: function () {
                  return t(), o;
                },
                pixelPosition: function () {
                  return t(), i;
                },
                reliableMarginLeft: function () {
                  return t(), h;
                },
                scrollboxSize: function () {
                  return t(), a;
                },
                reliableTrDimensions: function () {
                  var t, e, i, s;
                  return (
                    null == r &&
                      ((t = y.createElement("table")),
                      (e = y.createElement("tr")),
                      (i = y.createElement("div")),
                      (t.style.cssText =
                        "position:absolute;left:-11111px;border-collapse:separate"),
                      (e.style.cssText = "border:1px solid"),
                      (e.style.height = "1px"),
                      (i.style.height = "9px"),
                      (i.style.display = "block"),
                      ot.appendChild(t).appendChild(e).appendChild(i),
                      (s = n.getComputedStyle(e)),
                      (r =
                        parseInt(s.height, 10) +
                          parseInt(s.borderTopWidth, 10) +
                          parseInt(s.borderBottomWidth, 10) ===
                        e.offsetHeight),
                      ot.removeChild(t)),
                    r
                  );
                },
              }));
          })();
          var Xt = ["Webkit", "Moz", "ms"],
            Jt = y.createElement("div").style,
            Yt = {};
          function Gt(t) {
            var e = k.cssProps[t] || Yt[t];
            return (
              e ||
              (t in Jt
                ? t
                : (Yt[t] =
                    (function (t) {
                      for (
                        var e = t[0].toUpperCase() + t.slice(1), i = Xt.length;
                        i--;

                      )
                        if ((t = Xt[i] + e) in Jt) return t;
                    })(t) || t))
            );
          }
          var Vt = /^(none|table(?!-c[ea]).+)/,
            Qt = /^--/,
            Kt = {
              position: "absolute",
              visibility: "hidden",
              display: "block",
            },
            Zt = { letterSpacing: "0", fontWeight: "400" };
          function te(t, e, i) {
            var n = st.exec(e);
            return n ? Math.max(0, n[2] - (i || 0)) + (n[3] || "px") : e;
          }
          function ee(t, e, i, n, s, a) {
            var o = "width" === e ? 1 : 0,
              r = 0,
              h = 0;
            if (i === (n ? "border" : "content")) return 0;
            for (; o < 4; o += 2)
              "margin" === i && (h += k.css(t, i + at[o], !0, s)),
                n
                  ? ("content" === i &&
                      (h -= k.css(t, "padding" + at[o], !0, s)),
                    "margin" !== i &&
                      (h -= k.css(t, "border" + at[o] + "Width", !0, s)))
                  : ((h += k.css(t, "padding" + at[o], !0, s)),
                    "padding" !== i
                      ? (h += k.css(t, "border" + at[o] + "Width", !0, s))
                      : (r += k.css(t, "border" + at[o] + "Width", !0, s)));
            return (
              !n &&
                a >= 0 &&
                (h +=
                  Math.max(
                    0,
                    Math.ceil(
                      t["offset" + e[0].toUpperCase() + e.slice(1)] -
                        a -
                        h -
                        r -
                        0.5
                    )
                  ) || 0),
              h
            );
          }
          function ie(t, e, i) {
            var n = Rt(t),
              s =
                (!_.boxSizingReliable() || i) &&
                "border-box" === k.css(t, "boxSizing", !1, n),
              a = s,
              o = Ft(t, e, n),
              r = "offset" + e[0].toUpperCase() + e.slice(1);
            if (Mt.test(o)) {
              if (!i) return o;
              o = "auto";
            }
            return (
              ((!_.boxSizingReliable() && s) ||
                (!_.reliableTrDimensions() && E(t, "tr")) ||
                "auto" === o ||
                (!parseFloat(o) && "inline" === k.css(t, "display", !1, n))) &&
                t.getClientRects().length &&
                ((s = "border-box" === k.css(t, "boxSizing", !1, n)),
                (a = r in t) && (o = t[r])),
              (o = parseFloat(o) || 0) +
                ee(t, e, i || (s ? "border" : "content"), a, n, o) +
                "px"
            );
          }
          function ne(t, e, i, n, s) {
            return new ne.prototype.init(t, e, i, n, s);
          }
          k.extend({
            cssHooks: {
              opacity: {
                get: function (t, e) {
                  if (e) {
                    var i = Ft(t, "opacity");
                    return "" === i ? "1" : i;
                  }
                },
              },
            },
            cssNumber: {
              animationIterationCount: !0,
              columnCount: !0,
              fillOpacity: !0,
              flexGrow: !0,
              flexShrink: !0,
              fontWeight: !0,
              gridArea: !0,
              gridColumn: !0,
              gridColumnEnd: !0,
              gridColumnStart: !0,
              gridRow: !0,
              gridRowEnd: !0,
              gridRowStart: !0,
              lineHeight: !0,
              opacity: !0,
              order: !0,
              orphans: !0,
              widows: !0,
              zIndex: !0,
              zoom: !0,
            },
            cssProps: {},
            style: function (t, e, i, n) {
              if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var s,
                  a,
                  o,
                  r = G(e),
                  h = Qt.test(e),
                  l = t.style;
                if (
                  (h || (e = Gt(r)),
                  (o = k.cssHooks[e] || k.cssHooks[r]),
                  void 0 === i)
                )
                  return o && "get" in o && void 0 !== (s = o.get(t, !1, n))
                    ? s
                    : l[e];
                "string" === (a = typeof i) &&
                  (s = st.exec(i)) &&
                  s[1] &&
                  ((i = ut(t, e, s)), (a = "number")),
                  null != i &&
                    i == i &&
                    ("number" !== a ||
                      h ||
                      (i += (s && s[3]) || (k.cssNumber[r] ? "" : "px")),
                    _.clearCloneStyle ||
                      "" !== i ||
                      0 !== e.indexOf("background") ||
                      (l[e] = "inherit"),
                    (o && "set" in o && void 0 === (i = o.set(t, i, n))) ||
                      (h ? l.setProperty(e, i) : (l[e] = i)));
              }
            },
            css: function (t, e, i, n) {
              var s,
                a,
                o,
                r = G(e);
              return (
                Qt.test(e) || (e = Gt(r)),
                (o = k.cssHooks[e] || k.cssHooks[r]) &&
                  "get" in o &&
                  (s = o.get(t, !0, i)),
                void 0 === s && (s = Ft(t, e, n)),
                "normal" === s && e in Zt && (s = Zt[e]),
                "" === i || i
                  ? ((a = parseFloat(s)), !0 === i || isFinite(a) ? a || 0 : s)
                  : s
              );
            },
          }),
            k.each(["height", "width"], function (t, e) {
              k.cssHooks[e] = {
                get: function (t, i, n) {
                  if (i)
                    return !Vt.test(k.css(t, "display")) ||
                      (t.getClientRects().length &&
                        t.getBoundingClientRect().width)
                      ? ie(t, e, n)
                      : Ut(t, Kt, function () {
                          return ie(t, e, n);
                        });
                },
                set: function (t, i, n) {
                  var s,
                    a = Rt(t),
                    o = !_.scrollboxSize() && "absolute" === a.position,
                    r =
                      (o || n) && "border-box" === k.css(t, "boxSizing", !1, a),
                    h = n ? ee(t, e, n, r, a) : 0;
                  return (
                    r &&
                      o &&
                      (h -= Math.ceil(
                        t["offset" + e[0].toUpperCase() + e.slice(1)] -
                          parseFloat(a[e]) -
                          ee(t, e, "border", !1, a) -
                          0.5
                      )),
                    h &&
                      (s = st.exec(i)) &&
                      "px" !== (s[3] || "px") &&
                      ((t.style[e] = i), (i = k.css(t, e))),
                    te(0, i, h)
                  );
                },
              };
            }),
            (k.cssHooks.marginLeft = Bt(_.reliableMarginLeft, function (t, e) {
              if (e)
                return (
                  (parseFloat(Ft(t, "marginLeft")) ||
                    t.getBoundingClientRect().left -
                      Ut(t, { marginLeft: 0 }, function () {
                        return t.getBoundingClientRect().left;
                      })) + "px"
                );
            })),
            k.each(
              { margin: "", padding: "", border: "Width" },
              function (t, e) {
                (k.cssHooks[t + e] = {
                  expand: function (i) {
                    for (
                      var n = 0,
                        s = {},
                        a = "string" == typeof i ? i.split(" ") : [i];
                      n < 4;
                      n++
                    )
                      s[t + at[n] + e] = a[n] || a[n - 2] || a[0];
                    return s;
                  },
                }),
                  "margin" !== t && (k.cssHooks[t + e].set = te);
              }
            ),
            k.fn.extend({
              css: function (t, e) {
                return B(
                  this,
                  function (t, e, i) {
                    var n,
                      s,
                      a = {},
                      o = 0;
                    if (Array.isArray(e)) {
                      for (n = Rt(t), s = e.length; o < s; o++)
                        a[e[o]] = k.css(t, e[o], !1, n);
                      return a;
                    }
                    return void 0 !== i ? k.style(t, e, i) : k.css(t, e);
                  },
                  t,
                  e,
                  arguments.length > 1
                );
              },
            }),
            (k.Tween = ne),
            (ne.prototype = {
              constructor: ne,
              init: function (t, e, i, n, s, a) {
                (this.elem = t),
                  (this.prop = i),
                  (this.easing = s || k.easing._default),
                  (this.options = e),
                  (this.start = this.now = this.cur()),
                  (this.end = n),
                  (this.unit = a || (k.cssNumber[i] ? "" : "px"));
              },
              cur: function () {
                var t = ne.propHooks[this.prop];
                return t && t.get
                  ? t.get(this)
                  : ne.propHooks._default.get(this);
              },
              run: function (t) {
                var e,
                  i = ne.propHooks[this.prop];
                return (
                  this.options.duration
                    ? (this.pos = e =
                        k.easing[this.easing](
                          t,
                          this.options.duration * t,
                          0,
                          1,
                          this.options.duration
                        ))
                    : (this.pos = e = t),
                  (this.now = (this.end - this.start) * e + this.start),
                  this.options.step &&
                    this.options.step.call(this.elem, this.now, this),
                  i && i.set ? i.set(this) : ne.propHooks._default.set(this),
                  this
                );
              },
            }),
            (ne.prototype.init.prototype = ne.prototype),
            (ne.propHooks = {
              _default: {
                get: function (t) {
                  var e;
                  return 1 !== t.elem.nodeType ||
                    (null != t.elem[t.prop] && null == t.elem.style[t.prop])
                    ? t.elem[t.prop]
                    : (e = k.css(t.elem, t.prop, "")) && "auto" !== e
                    ? e
                    : 0;
                },
                set: function (t) {
                  k.fx.step[t.prop]
                    ? k.fx.step[t.prop](t)
                    : 1 !== t.elem.nodeType ||
                      (!k.cssHooks[t.prop] && null == t.elem.style[Gt(t.prop)])
                    ? (t.elem[t.prop] = t.now)
                    : k.style(t.elem, t.prop, t.now + t.unit);
                },
              },
            }),
            (ne.propHooks.scrollTop = ne.propHooks.scrollLeft =
              {
                set: function (t) {
                  t.elem.nodeType &&
                    t.elem.parentNode &&
                    (t.elem[t.prop] = t.now);
                },
              }),
            (k.easing = {
              linear: function (t) {
                return t;
              },
              swing: function (t) {
                return 0.5 - Math.cos(t * Math.PI) / 2;
              },
              _default: "swing",
            }),
            (k.fx = ne.prototype.init),
            (k.fx.step = {});
          var se,
            ae,
            oe = /^(?:toggle|show|hide)$/,
            re = /queueHooks$/;
          function he() {
            ae &&
              (!1 === y.hidden && n.requestAnimationFrame
                ? n.requestAnimationFrame(he)
                : n.setTimeout(he, k.fx.interval),
              k.fx.tick());
          }
          function le() {
            return (
              n.setTimeout(function () {
                se = void 0;
              }),
              (se = Date.now())
            );
          }
          function ue(t, e) {
            var i,
              n = 0,
              s = { height: t };
            for (e = e ? 1 : 0; n < 4; n += 2 - e)
              s["margin" + (i = at[n])] = s["padding" + i] = t;
            return e && (s.opacity = s.width = t), s;
          }
          function pe(t, e, i) {
            for (
              var n,
                s = (ce.tweeners[e] || []).concat(ce.tweeners["*"]),
                a = 0,
                o = s.length;
              a < o;
              a++
            )
              if ((n = s[a].call(i, e, t))) return n;
          }
          function ce(t, e, i) {
            var n,
              s,
              a = 0,
              o = ce.prefilters.length,
              r = k.Deferred().always(function () {
                delete h.elem;
              }),
              h = function () {
                if (s) return !1;
                for (
                  var e = se || le(),
                    i = Math.max(0, l.startTime + l.duration - e),
                    n = 1 - (i / l.duration || 0),
                    a = 0,
                    o = l.tweens.length;
                  a < o;
                  a++
                )
                  l.tweens[a].run(n);
                return (
                  r.notifyWith(t, [l, n, i]),
                  n < 1 && o
                    ? i
                    : (o || r.notifyWith(t, [l, 1, 0]),
                      r.resolveWith(t, [l]),
                      !1)
                );
              },
              l = r.promise({
                elem: t,
                props: k.extend({}, e),
                opts: k.extend(
                  !0,
                  { specialEasing: {}, easing: k.easing._default },
                  i
                ),
                originalProperties: e,
                originalOptions: i,
                startTime: se || le(),
                duration: i.duration,
                tweens: [],
                createTween: function (e, i) {
                  var n = k.Tween(
                    t,
                    l.opts,
                    e,
                    i,
                    l.opts.specialEasing[e] || l.opts.easing
                  );
                  return l.tweens.push(n), n;
                },
                stop: function (e) {
                  var i = 0,
                    n = e ? l.tweens.length : 0;
                  if (s) return this;
                  for (s = !0; i < n; i++) l.tweens[i].run(1);
                  return (
                    e
                      ? (r.notifyWith(t, [l, 1, 0]), r.resolveWith(t, [l, e]))
                      : r.rejectWith(t, [l, e]),
                    this
                  );
                },
              }),
              u = l.props;
            for (
              !(function (t, e) {
                var i, n, s, a, o;
                for (i in t)
                  if (
                    ((s = e[(n = G(i))]),
                    (a = t[i]),
                    Array.isArray(a) && ((s = a[1]), (a = t[i] = a[0])),
                    i !== n && ((t[n] = a), delete t[i]),
                    (o = k.cssHooks[n]) && ("expand" in o))
                  )
                    for (i in ((a = o.expand(a)), delete t[n], a))
                      (i in t) || ((t[i] = a[i]), (e[i] = s));
                  else e[n] = s;
              })(u, l.opts.specialEasing);
              a < o;
              a++
            )
              if ((n = ce.prefilters[a].call(l, t, u, l.opts)))
                return (
                  m(n.stop) &&
                    (k._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
                  n
                );
            return (
              k.map(u, pe, l),
              m(l.opts.start) && l.opts.start.call(t, l),
              l
                .progress(l.opts.progress)
                .done(l.opts.done, l.opts.complete)
                .fail(l.opts.fail)
                .always(l.opts.always),
              k.fx.timer(
                k.extend(h, { elem: t, anim: l, queue: l.opts.queue })
              ),
              l
            );
          }
          (k.Animation = k.extend(ce, {
            tweeners: {
              "*": [
                function (t, e) {
                  var i = this.createTween(t, e);
                  return ut(i.elem, t, st.exec(e), i), i;
                },
              ],
            },
            tweener: function (t, e) {
              m(t) ? ((e = t), (t = ["*"])) : (t = t.match(L));
              for (var i, n = 0, s = t.length; n < s; n++)
                (i = t[n]),
                  (ce.tweeners[i] = ce.tweeners[i] || []),
                  ce.tweeners[i].unshift(e);
            },
            prefilters: [
              function (t, e, i) {
                var n,
                  s,
                  a,
                  o,
                  r,
                  h,
                  l,
                  u,
                  p = "width" in e || "height" in e,
                  c = this,
                  f = {},
                  d = t.style,
                  g = t.nodeType && lt(t),
                  _ = K.get(t, "fxshow");
                for (n in (i.queue ||
                  (null == (o = k._queueHooks(t, "fx")).unqueued &&
                    ((o.unqueued = 0),
                    (r = o.empty.fire),
                    (o.empty.fire = function () {
                      o.unqueued || r();
                    })),
                  o.unqueued++,
                  c.always(function () {
                    c.always(function () {
                      o.unqueued--, k.queue(t, "fx").length || o.empty.fire();
                    });
                  })),
                e))
                  if (((s = e[n]), oe.test(s))) {
                    if (
                      (delete e[n],
                      (a = a || "toggle" === s),
                      s === (g ? "hide" : "show"))
                    ) {
                      if ("show" !== s || !_ || void 0 === _[n]) continue;
                      g = !0;
                    }
                    f[n] = (_ && _[n]) || k.style(t, n);
                  }
                if ((h = !k.isEmptyObject(e)) || !k.isEmptyObject(f))
                  for (n in (p &&
                    1 === t.nodeType &&
                    ((i.overflow = [d.overflow, d.overflowX, d.overflowY]),
                    null == (l = _ && _.display) && (l = K.get(t, "display")),
                    "none" === (u = k.css(t, "display")) &&
                      (l
                        ? (u = l)
                        : (ft([t], !0),
                          (l = t.style.display || l),
                          (u = k.css(t, "display")),
                          ft([t]))),
                    ("inline" === u || ("inline-block" === u && null != l)) &&
                      "none" === k.css(t, "float") &&
                      (h ||
                        (c.done(function () {
                          d.display = l;
                        }),
                        null == l &&
                          ((u = d.display), (l = "none" === u ? "" : u))),
                      (d.display = "inline-block"))),
                  i.overflow &&
                    ((d.overflow = "hidden"),
                    c.always(function () {
                      (d.overflow = i.overflow[0]),
                        (d.overflowX = i.overflow[1]),
                        (d.overflowY = i.overflow[2]);
                    })),
                  (h = !1),
                  f))
                    h ||
                      (_
                        ? "hidden" in _ && (g = _.hidden)
                        : (_ = K.access(t, "fxshow", { display: l })),
                      a && (_.hidden = !g),
                      g && ft([t], !0),
                      c.done(function () {
                        for (n in (g || ft([t]), K.remove(t, "fxshow"), f))
                          k.style(t, n, f[n]);
                      })),
                      (h = pe(g ? _[n] : 0, n, c)),
                      n in _ ||
                        ((_[n] = h.start),
                        g && ((h.end = h.start), (h.start = 0)));
              },
            ],
            prefilter: function (t, e) {
              e ? ce.prefilters.unshift(t) : ce.prefilters.push(t);
            },
          })),
            (k.speed = function (t, e, i) {
              var n =
                t && "object" == typeof t
                  ? k.extend({}, t)
                  : {
                      complete: i || (!i && e) || (m(t) && t),
                      duration: t,
                      easing: (i && e) || (e && !m(e) && e),
                    };
              return (
                k.fx.off
                  ? (n.duration = 0)
                  : "number" != typeof n.duration &&
                    (n.duration in k.fx.speeds
                      ? (n.duration = k.fx.speeds[n.duration])
                      : (n.duration = k.fx.speeds._default)),
                (null != n.queue && !0 !== n.queue) || (n.queue = "fx"),
                (n.old = n.complete),
                (n.complete = function () {
                  m(n.old) && n.old.call(this),
                    n.queue && k.dequeue(this, n.queue);
                }),
                n
              );
            }),
            k.fn.extend({
              fadeTo: function (t, e, i, n) {
                return this.filter(lt)
                  .css("opacity", 0)
                  .show()
                  .end()
                  .animate({ opacity: e }, t, i, n);
              },
              animate: function (t, e, i, n) {
                var s = k.isEmptyObject(t),
                  a = k.speed(e, i, n),
                  o = function () {
                    var e = ce(this, k.extend({}, t), a);
                    (s || K.get(this, "finish")) && e.stop(!0);
                  };
                return (
                  (o.finish = o),
                  s || !1 === a.queue ? this.each(o) : this.queue(a.queue, o)
                );
              },
              stop: function (t, e, i) {
                var n = function (t) {
                  var e = t.stop;
                  delete t.stop, e(i);
                };
                return (
                  "string" != typeof t && ((i = e), (e = t), (t = void 0)),
                  e && this.queue(t || "fx", []),
                  this.each(function () {
                    var e = !0,
                      s = null != t && t + "queueHooks",
                      a = k.timers,
                      o = K.get(this);
                    if (s) o[s] && o[s].stop && n(o[s]);
                    else
                      for (s in o) o[s] && o[s].stop && re.test(s) && n(o[s]);
                    for (s = a.length; s--; )
                      a[s].elem !== this ||
                        (null != t && a[s].queue !== t) ||
                        (a[s].anim.stop(i), (e = !1), a.splice(s, 1));
                    (!e && i) || k.dequeue(this, t);
                  })
                );
              },
              finish: function (t) {
                return (
                  !1 !== t && (t = t || "fx"),
                  this.each(function () {
                    var e,
                      i = K.get(this),
                      n = i[t + "queue"],
                      s = i[t + "queueHooks"],
                      a = k.timers,
                      o = n ? n.length : 0;
                    for (
                      i.finish = !0,
                        k.queue(this, t, []),
                        s && s.stop && s.stop.call(this, !0),
                        e = a.length;
                      e--;

                    )
                      a[e].elem === this &&
                        a[e].queue === t &&
                        (a[e].anim.stop(!0), a.splice(e, 1));
                    for (e = 0; e < o; e++)
                      n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish;
                  })
                );
              },
            }),
            k.each(["toggle", "show", "hide"], function (t, e) {
              var i = k.fn[e];
              k.fn[e] = function (t, n, s) {
                return null == t || "boolean" == typeof t
                  ? i.apply(this, arguments)
                  : this.animate(ue(e, !0), t, n, s);
              };
            }),
            k.each(
              {
                slideDown: ue("show"),
                slideUp: ue("hide"),
                slideToggle: ue("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
              },
              function (t, e) {
                k.fn[t] = function (t, i, n) {
                  return this.animate(e, t, i, n);
                };
              }
            ),
            (k.timers = []),
            (k.fx.tick = function () {
              var t,
                e = 0,
                i = k.timers;
              for (se = Date.now(); e < i.length; e++)
                (t = i[e])() || i[e] !== t || i.splice(e--, 1);
              i.length || k.fx.stop(), (se = void 0);
            }),
            (k.fx.timer = function (t) {
              k.timers.push(t), k.fx.start();
            }),
            (k.fx.interval = 13),
            (k.fx.start = function () {
              ae || ((ae = !0), he());
            }),
            (k.fx.stop = function () {
              ae = null;
            }),
            (k.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
            (k.fn.delay = function (t, e) {
              return (
                (t = (k.fx && k.fx.speeds[t]) || t),
                (e = e || "fx"),
                this.queue(e, function (e, i) {
                  var s = n.setTimeout(e, t);
                  i.stop = function () {
                    n.clearTimeout(s);
                  };
                })
              );
            }),
            (function () {
              var t = y.createElement("input"),
                e = y
                  .createElement("select")
                  .appendChild(y.createElement("option"));
              (t.type = "checkbox"),
                (_.checkOn = "" !== t.value),
                (_.optSelected = e.selected),
                ((t = y.createElement("input")).value = "t"),
                (t.type = "radio"),
                (_.radioValue = "t" === t.value);
            })();
          var fe,
            de = k.expr.attrHandle;
          k.fn.extend({
            attr: function (t, e) {
              return B(this, k.attr, t, e, arguments.length > 1);
            },
            removeAttr: function (t) {
              return this.each(function () {
                k.removeAttr(this, t);
              });
            },
          }),
            k.extend({
              attr: function (t, e, i) {
                var n,
                  s,
                  a = t.nodeType;
                if (3 !== a && 8 !== a && 2 !== a)
                  return void 0 === t.getAttribute
                    ? k.prop(t, e, i)
                    : ((1 === a && k.isXMLDoc(t)) ||
                        (s =
                          k.attrHooks[e.toLowerCase()] ||
                          (k.expr.match.bool.test(e) ? fe : void 0)),
                      void 0 !== i
                        ? null === i
                          ? void k.removeAttr(t, e)
                          : s && "set" in s && void 0 !== (n = s.set(t, i, e))
                          ? n
                          : (t.setAttribute(e, i + ""), i)
                        : s && "get" in s && null !== (n = s.get(t, e))
                        ? n
                        : null == (n = k.find.attr(t, e))
                        ? void 0
                        : n);
              },
              attrHooks: {
                type: {
                  set: function (t, e) {
                    if (!_.radioValue && "radio" === e && E(t, "input")) {
                      var i = t.value;
                      return t.setAttribute("type", e), i && (t.value = i), e;
                    }
                  },
                },
              },
              removeAttr: function (t, e) {
                var i,
                  n = 0,
                  s = e && e.match(L);
                if (s && 1 === t.nodeType)
                  for (; (i = s[n++]); ) t.removeAttribute(i);
              },
            }),
            (fe = {
              set: function (t, e, i) {
                return !1 === e ? k.removeAttr(t, i) : t.setAttribute(i, i), i;
              },
            }),
            k.each(k.expr.match.bool.source.match(/\w+/g), function (t, e) {
              var i = de[e] || k.find.attr;
              de[e] = function (t, e, n) {
                var s,
                  a,
                  o = e.toLowerCase();
                return (
                  n ||
                    ((a = de[o]),
                    (de[o] = s),
                    (s = null != i(t, e, n) ? o : null),
                    (de[o] = a)),
                  s
                );
              };
            });
          var ge = /^(?:input|select|textarea|button)$/i,
            _e = /^(?:a|area)$/i;
          function me(t) {
            return (t.match(L) || []).join(" ");
          }
          function ve(t) {
            return (t.getAttribute && t.getAttribute("class")) || "";
          }
          function ye(t) {
            return Array.isArray(t)
              ? t
              : ("string" == typeof t && t.match(L)) || [];
          }
          k.fn.extend({
            prop: function (t, e) {
              return B(this, k.prop, t, e, arguments.length > 1);
            },
            removeProp: function (t) {
              return this.each(function () {
                delete this[k.propFix[t] || t];
              });
            },
          }),
            k.extend({
              prop: function (t, e, i) {
                var n,
                  s,
                  a = t.nodeType;
                if (3 !== a && 8 !== a && 2 !== a)
                  return (
                    (1 === a && k.isXMLDoc(t)) ||
                      ((e = k.propFix[e] || e), (s = k.propHooks[e])),
                    void 0 !== i
                      ? s && "set" in s && void 0 !== (n = s.set(t, i, e))
                        ? n
                        : (t[e] = i)
                      : s && "get" in s && null !== (n = s.get(t, e))
                      ? n
                      : t[e]
                  );
              },
              propHooks: {
                tabIndex: {
                  get: function (t) {
                    var e = k.find.attr(t, "tabindex");
                    return e
                      ? parseInt(e, 10)
                      : ge.test(t.nodeName) || (_e.test(t.nodeName) && t.href)
                      ? 0
                      : -1;
                  },
                },
              },
              propFix: { for: "htmlFor", class: "className" },
            }),
            _.optSelected ||
              (k.propHooks.selected = {
                get: function (t) {
                  var e = t.parentNode;
                  return e && e.parentNode && e.parentNode.selectedIndex, null;
                },
                set: function (t) {
                  var e = t.parentNode;
                  e &&
                    (e.selectedIndex,
                    e.parentNode && e.parentNode.selectedIndex);
                },
              }),
            k.each(
              [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
              ],
              function () {
                k.propFix[this.toLowerCase()] = this;
              }
            ),
            k.fn.extend({
              addClass: function (t) {
                var e,
                  i,
                  n,
                  s,
                  a,
                  o,
                  r,
                  h = 0;
                if (m(t))
                  return this.each(function (e) {
                    k(this).addClass(t.call(this, e, ve(this)));
                  });
                if ((e = ye(t)).length)
                  for (; (i = this[h++]); )
                    if (
                      ((s = ve(i)), (n = 1 === i.nodeType && " " + me(s) + " "))
                    ) {
                      for (o = 0; (a = e[o++]); )
                        n.indexOf(" " + a + " ") < 0 && (n += a + " ");
                      s !== (r = me(n)) && i.setAttribute("class", r);
                    }
                return this;
              },
              removeClass: function (t) {
                var e,
                  i,
                  n,
                  s,
                  a,
                  o,
                  r,
                  h = 0;
                if (m(t))
                  return this.each(function (e) {
                    k(this).removeClass(t.call(this, e, ve(this)));
                  });
                if (!arguments.length) return this.attr("class", "");
                if ((e = ye(t)).length)
                  for (; (i = this[h++]); )
                    if (
                      ((s = ve(i)), (n = 1 === i.nodeType && " " + me(s) + " "))
                    ) {
                      for (o = 0; (a = e[o++]); )
                        for (; n.indexOf(" " + a + " ") > -1; )
                          n = n.replace(" " + a + " ", " ");
                      s !== (r = me(n)) && i.setAttribute("class", r);
                    }
                return this;
              },
              toggleClass: function (t, e) {
                var i = typeof t,
                  n = "string" === i || Array.isArray(t);
                return "boolean" == typeof e && n
                  ? e
                    ? this.addClass(t)
                    : this.removeClass(t)
                  : m(t)
                  ? this.each(function (i) {
                      k(this).toggleClass(t.call(this, i, ve(this), e), e);
                    })
                  : this.each(function () {
                      var e, s, a, o;
                      if (n)
                        for (s = 0, a = k(this), o = ye(t); (e = o[s++]); )
                          a.hasClass(e) ? a.removeClass(e) : a.addClass(e);
                      else
                        (void 0 !== t && "boolean" !== i) ||
                          ((e = ve(this)) && K.set(this, "__className__", e),
                          this.setAttribute &&
                            this.setAttribute(
                              "class",
                              e || !1 === t
                                ? ""
                                : K.get(this, "__className__") || ""
                            ));
                    });
              },
              hasClass: function (t) {
                var e,
                  i,
                  n = 0;
                for (e = " " + t + " "; (i = this[n++]); )
                  if (
                    1 === i.nodeType &&
                    (" " + me(ve(i)) + " ").indexOf(e) > -1
                  )
                    return !0;
                return !1;
              },
            });
          var be = /\r/g;
          k.fn.extend({
            val: function (t) {
              var e,
                i,
                n,
                s = this[0];
              return arguments.length
                ? ((n = m(t)),
                  this.each(function (i) {
                    var s;
                    1 === this.nodeType &&
                      (null == (s = n ? t.call(this, i, k(this).val()) : t)
                        ? (s = "")
                        : "number" == typeof s
                        ? (s += "")
                        : Array.isArray(s) &&
                          (s = k.map(s, function (t) {
                            return null == t ? "" : t + "";
                          })),
                      ((e =
                        k.valHooks[this.type] ||
                        k.valHooks[this.nodeName.toLowerCase()]) &&
                        "set" in e &&
                        void 0 !== e.set(this, s, "value")) ||
                        (this.value = s));
                  }))
                : s
                ? (e =
                    k.valHooks[s.type] ||
                    k.valHooks[s.nodeName.toLowerCase()]) &&
                  "get" in e &&
                  void 0 !== (i = e.get(s, "value"))
                  ? i
                  : "string" == typeof (i = s.value)
                  ? i.replace(be, "")
                  : null == i
                  ? ""
                  : i
                : void 0;
            },
          }),
            k.extend({
              valHooks: {
                option: {
                  get: function (t) {
                    var e = k.find.attr(t, "value");
                    return null != e ? e : me(k.text(t));
                  },
                },
                select: {
                  get: function (t) {
                    var e,
                      i,
                      n,
                      s = t.options,
                      a = t.selectedIndex,
                      o = "select-one" === t.type,
                      r = o ? null : [],
                      h = o ? a + 1 : s.length;
                    for (n = a < 0 ? h : o ? a : 0; n < h; n++)
                      if (
                        ((i = s[n]).selected || n === a) &&
                        !i.disabled &&
                        (!i.parentNode.disabled || !E(i.parentNode, "optgroup"))
                      ) {
                        if (((e = k(i).val()), o)) return e;
                        r.push(e);
                      }
                    return r;
                  },
                  set: function (t, e) {
                    for (
                      var i, n, s = t.options, a = k.makeArray(e), o = s.length;
                      o--;

                    )
                      ((n = s[o]).selected =
                        k.inArray(k.valHooks.option.get(n), a) > -1) &&
                        (i = !0);
                    return i || (t.selectedIndex = -1), a;
                  },
                },
              },
            }),
            k.each(["radio", "checkbox"], function () {
              (k.valHooks[this] = {
                set: function (t, e) {
                  if (Array.isArray(e))
                    return (t.checked = k.inArray(k(t).val(), e) > -1);
                },
              }),
                _.checkOn ||
                  (k.valHooks[this].get = function (t) {
                    return null === t.getAttribute("value") ? "on" : t.value;
                  });
            }),
            (_.focusin = "onfocusin" in n);
          var we = /^(?:focusinfocus|focusoutblur)$/,
            xe = function (t) {
              t.stopPropagation();
            };
          k.extend(k.event, {
            trigger: function (t, e, i, s) {
              var a,
                o,
                r,
                h,
                l,
                u,
                p,
                c,
                d = [i || y],
                g = f.call(t, "type") ? t.type : t,
                _ = f.call(t, "namespace") ? t.namespace.split(".") : [];
              if (
                ((o = c = r = i = i || y),
                3 !== i.nodeType &&
                  8 !== i.nodeType &&
                  !we.test(g + k.event.triggered) &&
                  (g.indexOf(".") > -1 &&
                    ((_ = g.split(".")), (g = _.shift()), _.sort()),
                  (l = g.indexOf(":") < 0 && "on" + g),
                  ((t = t[k.expando]
                    ? t
                    : new k.Event(g, "object" == typeof t && t)).isTrigger = s
                    ? 2
                    : 3),
                  (t.namespace = _.join(".")),
                  (t.rnamespace = t.namespace
                    ? new RegExp(
                        "(^|\\.)" + _.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      )
                    : null),
                  (t.result = void 0),
                  t.target || (t.target = i),
                  (e = null == e ? [t] : k.makeArray(e, [t])),
                  (p = k.event.special[g] || {}),
                  s || !p.trigger || !1 !== p.trigger.apply(i, e)))
              ) {
                if (!s && !p.noBubble && !v(i)) {
                  for (
                    h = p.delegateType || g,
                      we.test(h + g) || (o = o.parentNode);
                    o;
                    o = o.parentNode
                  )
                    d.push(o), (r = o);
                  r === (i.ownerDocument || y) &&
                    d.push(r.defaultView || r.parentWindow || n);
                }
                for (a = 0; (o = d[a++]) && !t.isPropagationStopped(); )
                  (c = o),
                    (t.type = a > 1 ? h : p.bindType || g),
                    (u =
                      (K.get(o, "events") || Object.create(null))[t.type] &&
                      K.get(o, "handle")) && u.apply(o, e),
                    (u = l && o[l]) &&
                      u.apply &&
                      V(o) &&
                      ((t.result = u.apply(o, e)),
                      !1 === t.result && t.preventDefault());
                return (
                  (t.type = g),
                  s ||
                    t.isDefaultPrevented() ||
                    (p._default && !1 !== p._default.apply(d.pop(), e)) ||
                    !V(i) ||
                    (l &&
                      m(i[g]) &&
                      !v(i) &&
                      ((r = i[l]) && (i[l] = null),
                      (k.event.triggered = g),
                      t.isPropagationStopped() && c.addEventListener(g, xe),
                      i[g](),
                      t.isPropagationStopped() && c.removeEventListener(g, xe),
                      (k.event.triggered = void 0),
                      r && (i[l] = r))),
                  t.result
                );
              }
            },
            simulate: function (t, e, i) {
              var n = k.extend(new k.Event(), i, { type: t, isSimulated: !0 });
              k.event.trigger(n, null, e);
            },
          }),
            k.fn.extend({
              trigger: function (t, e) {
                return this.each(function () {
                  k.event.trigger(t, e, this);
                });
              },
              triggerHandler: function (t, e) {
                var i = this[0];
                if (i) return k.event.trigger(t, e, i, !0);
              },
            }),
            _.focusin ||
              k.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
                var i = function (t) {
                  k.event.simulate(e, t.target, k.event.fix(t));
                };
                k.event.special[e] = {
                  setup: function () {
                    var n = this.ownerDocument || this.document || this,
                      s = K.access(n, e);
                    s || n.addEventListener(t, i, !0),
                      K.access(n, e, (s || 0) + 1);
                  },
                  teardown: function () {
                    var n = this.ownerDocument || this.document || this,
                      s = K.access(n, e) - 1;
                    s
                      ? K.access(n, e, s)
                      : (n.removeEventListener(t, i, !0), K.remove(n, e));
                  },
                };
              });
          var ze = n.location,
            ke = { guid: Date.now() },
            je = /\?/;
          k.parseXML = function (t) {
            var e, i;
            if (!t || "string" != typeof t) return null;
            try {
              e = new n.DOMParser().parseFromString(t, "text/xml");
            } catch (t) {}
            return (
              (i = e && e.getElementsByTagName("parsererror")[0]),
              (e && !i) ||
                k.error(
                  "Invalid XML: " +
                    (i
                      ? k
                          .map(i.childNodes, function (t) {
                            return t.textContent;
                          })
                          .join("\n")
                      : t)
                ),
              e
            );
          };
          var Ce = /\[\]$/,
            Te = /\r?\n/g,
            Se = /^(?:submit|button|image|reset|file)$/i,
            $e = /^(?:input|select|textarea|keygen)/i;
          function Ee(t, e, i, n) {
            var s;
            if (Array.isArray(e))
              k.each(e, function (e, s) {
                i || Ce.test(t)
                  ? n(t, s)
                  : Ee(
                      t +
                        "[" +
                        ("object" == typeof s && null != s ? e : "") +
                        "]",
                      s,
                      i,
                      n
                    );
              });
            else if (i || "object" !== x(e)) n(t, e);
            else for (s in e) Ee(t + "[" + s + "]", e[s], i, n);
          }
          (k.param = function (t, e) {
            var i,
              n = [],
              s = function (t, e) {
                var i = m(e) ? e() : e;
                n[n.length] =
                  encodeURIComponent(t) +
                  "=" +
                  encodeURIComponent(null == i ? "" : i);
              };
            if (null == t) return "";
            if (Array.isArray(t) || (t.jquery && !k.isPlainObject(t)))
              k.each(t, function () {
                s(this.name, this.value);
              });
            else for (i in t) Ee(i, t[i], e, s);
            return n.join("&");
          }),
            k.fn.extend({
              serialize: function () {
                return k.param(this.serializeArray());
              },
              serializeArray: function () {
                return this.map(function () {
                  var t = k.prop(this, "elements");
                  return t ? k.makeArray(t) : this;
                })
                  .filter(function () {
                    var t = this.type;
                    return (
                      this.name &&
                      !k(this).is(":disabled") &&
                      $e.test(this.nodeName) &&
                      !Se.test(t) &&
                      (this.checked || !_t.test(t))
                    );
                  })
                  .map(function (t, e) {
                    var i = k(this).val();
                    return null == i
                      ? null
                      : Array.isArray(i)
                      ? k.map(i, function (t) {
                          return { name: e.name, value: t.replace(Te, "\r\n") };
                        })
                      : { name: e.name, value: i.replace(Te, "\r\n") };
                  })
                  .get();
              },
            });
          var qe = /%20/g,
            Ne = /#.*$/,
            Pe = /([?&])_=[^&]*/,
            De = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            Ae = /^(?:GET|HEAD)$/,
            Ie = /^\/\//,
            Oe = {},
            Le = {},
            He = "*/".concat("*"),
            Me = y.createElement("a");
          function Re(t) {
            return function (e, i) {
              "string" != typeof e && ((i = e), (e = "*"));
              var n,
                s = 0,
                a = e.toLowerCase().match(L) || [];
              if (m(i))
                for (; (n = a[s++]); )
                  "+" === n[0]
                    ? ((n = n.slice(1) || "*"), (t[n] = t[n] || []).unshift(i))
                    : (t[n] = t[n] || []).push(i);
            };
          }
          function Ue(t, e, i, n) {
            var s = {},
              a = t === Le;
            function o(r) {
              var h;
              return (
                (s[r] = !0),
                k.each(t[r] || [], function (t, r) {
                  var l = r(e, i, n);
                  return "string" != typeof l || a || s[l]
                    ? a
                      ? !(h = l)
                      : void 0
                    : (e.dataTypes.unshift(l), o(l), !1);
                }),
                h
              );
            }
            return o(e.dataTypes[0]) || (!s["*"] && o("*"));
          }
          function We(t, e) {
            var i,
              n,
              s = k.ajaxSettings.flatOptions || {};
            for (i in e)
              void 0 !== e[i] && ((s[i] ? t : n || (n = {}))[i] = e[i]);
            return n && k.extend(!0, t, n), t;
          }
          (Me.href = ze.href),
            k.extend({
              active: 0,
              lastModified: {},
              etag: {},
              ajaxSettings: {
                url: ze.href,
                type: "GET",
                isLocal:
                  /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                    ze.protocol
                  ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                  "*": He,
                  text: "text/plain",
                  html: "text/html",
                  xml: "application/xml, text/xml",
                  json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                  xml: "responseXML",
                  text: "responseText",
                  json: "responseJSON",
                },
                converters: {
                  "* text": String,
                  "text html": !0,
                  "text json": JSON.parse,
                  "text xml": k.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
              },
              ajaxSetup: function (t, e) {
                return e ? We(We(t, k.ajaxSettings), e) : We(k.ajaxSettings, t);
              },
              ajaxPrefilter: Re(Oe),
              ajaxTransport: Re(Le),
              ajax: function (t, e) {
                "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
                var i,
                  s,
                  a,
                  o,
                  r,
                  h,
                  l,
                  u,
                  p,
                  c,
                  f = k.ajaxSetup({}, e),
                  d = f.context || f,
                  g = f.context && (d.nodeType || d.jquery) ? k(d) : k.event,
                  _ = k.Deferred(),
                  m = k.Callbacks("once memory"),
                  v = f.statusCode || {},
                  b = {},
                  w = {},
                  x = "canceled",
                  z = {
                    readyState: 0,
                    getResponseHeader: function (t) {
                      var e;
                      if (l) {
                        if (!o)
                          for (o = {}; (e = De.exec(a)); )
                            o[e[1].toLowerCase() + " "] = (
                              o[e[1].toLowerCase() + " "] || []
                            ).concat(e[2]);
                        e = o[t.toLowerCase() + " "];
                      }
                      return null == e ? null : e.join(", ");
                    },
                    getAllResponseHeaders: function () {
                      return l ? a : null;
                    },
                    setRequestHeader: function (t, e) {
                      return (
                        null == l &&
                          ((t = w[t.toLowerCase()] = w[t.toLowerCase()] || t),
                          (b[t] = e)),
                        this
                      );
                    },
                    overrideMimeType: function (t) {
                      return null == l && (f.mimeType = t), this;
                    },
                    statusCode: function (t) {
                      var e;
                      if (t)
                        if (l) z.always(t[z.status]);
                        else for (e in t) v[e] = [v[e], t[e]];
                      return this;
                    },
                    abort: function (t) {
                      var e = t || x;
                      return i && i.abort(e), j(0, e), this;
                    },
                  };
                if (
                  (_.promise(z),
                  (f.url = ((t || f.url || ze.href) + "").replace(
                    Ie,
                    ze.protocol + "//"
                  )),
                  (f.type = e.method || e.type || f.method || f.type),
                  (f.dataTypes = (f.dataType || "*").toLowerCase().match(L) || [
                    "",
                  ]),
                  null == f.crossDomain)
                ) {
                  h = y.createElement("a");
                  try {
                    (h.href = f.url),
                      (h.href = h.href),
                      (f.crossDomain =
                        Me.protocol + "//" + Me.host !=
                        h.protocol + "//" + h.host);
                  } catch (t) {
                    f.crossDomain = !0;
                  }
                }
                if (
                  (f.data &&
                    f.processData &&
                    "string" != typeof f.data &&
                    (f.data = k.param(f.data, f.traditional)),
                  Ue(Oe, f, e, z),
                  l)
                )
                  return z;
                for (p in ((u = k.event && f.global) &&
                  0 == k.active++ &&
                  k.event.trigger("ajaxStart"),
                (f.type = f.type.toUpperCase()),
                (f.hasContent = !Ae.test(f.type)),
                (s = f.url.replace(Ne, "")),
                f.hasContent
                  ? f.data &&
                    f.processData &&
                    0 ===
                      (f.contentType || "").indexOf(
                        "application/x-www-form-urlencoded"
                      ) &&
                    (f.data = f.data.replace(qe, "+"))
                  : ((c = f.url.slice(s.length)),
                    f.data &&
                      (f.processData || "string" == typeof f.data) &&
                      ((s += (je.test(s) ? "&" : "?") + f.data), delete f.data),
                    !1 === f.cache &&
                      ((s = s.replace(Pe, "$1")),
                      (c = (je.test(s) ? "&" : "?") + "_=" + ke.guid++ + c)),
                    (f.url = s + c)),
                f.ifModified &&
                  (k.lastModified[s] &&
                    z.setRequestHeader("If-Modified-Since", k.lastModified[s]),
                  k.etag[s] && z.setRequestHeader("If-None-Match", k.etag[s])),
                ((f.data && f.hasContent && !1 !== f.contentType) ||
                  e.contentType) &&
                  z.setRequestHeader("Content-Type", f.contentType),
                z.setRequestHeader(
                  "Accept",
                  f.dataTypes[0] && f.accepts[f.dataTypes[0]]
                    ? f.accepts[f.dataTypes[0]] +
                        ("*" !== f.dataTypes[0] ? ", " + He + "; q=0.01" : "")
                    : f.accepts["*"]
                ),
                f.headers))
                  z.setRequestHeader(p, f.headers[p]);
                if (f.beforeSend && (!1 === f.beforeSend.call(d, z, f) || l))
                  return z.abort();
                if (
                  ((x = "abort"),
                  m.add(f.complete),
                  z.done(f.success),
                  z.fail(f.error),
                  (i = Ue(Le, f, e, z)))
                ) {
                  if (
                    ((z.readyState = 1), u && g.trigger("ajaxSend", [z, f]), l)
                  )
                    return z;
                  f.async &&
                    f.timeout > 0 &&
                    (r = n.setTimeout(function () {
                      z.abort("timeout");
                    }, f.timeout));
                  try {
                    (l = !1), i.send(b, j);
                  } catch (t) {
                    if (l) throw t;
                    j(-1, t);
                  }
                } else j(-1, "No Transport");
                function j(t, e, o, h) {
                  var p,
                    c,
                    y,
                    b,
                    w,
                    x = e;
                  l ||
                    ((l = !0),
                    r && n.clearTimeout(r),
                    (i = void 0),
                    (a = h || ""),
                    (z.readyState = t > 0 ? 4 : 0),
                    (p = (t >= 200 && t < 300) || 304 === t),
                    o &&
                      (b = (function (t, e, i) {
                        for (
                          var n, s, a, o, r = t.contents, h = t.dataTypes;
                          "*" === h[0];

                        )
                          h.shift(),
                            void 0 === n &&
                              (n =
                                t.mimeType ||
                                e.getResponseHeader("Content-Type"));
                        if (n)
                          for (s in r)
                            if (r[s] && r[s].test(n)) {
                              h.unshift(s);
                              break;
                            }
                        if (h[0] in i) a = h[0];
                        else {
                          for (s in i) {
                            if (!h[0] || t.converters[s + " " + h[0]]) {
                              a = s;
                              break;
                            }
                            o || (o = s);
                          }
                          a = a || o;
                        }
                        if (a) return a !== h[0] && h.unshift(a), i[a];
                      })(f, z, o)),
                    !p &&
                      k.inArray("script", f.dataTypes) > -1 &&
                      k.inArray("json", f.dataTypes) < 0 &&
                      (f.converters["text script"] = function () {}),
                    (b = (function (t, e, i, n) {
                      var s,
                        a,
                        o,
                        r,
                        h,
                        l = {},
                        u = t.dataTypes.slice();
                      if (u[1])
                        for (o in t.converters)
                          l[o.toLowerCase()] = t.converters[o];
                      for (a = u.shift(); a; )
                        if (
                          (t.responseFields[a] && (i[t.responseFields[a]] = e),
                          !h &&
                            n &&
                            t.dataFilter &&
                            (e = t.dataFilter(e, t.dataType)),
                          (h = a),
                          (a = u.shift()))
                        )
                          if ("*" === a) a = h;
                          else if ("*" !== h && h !== a) {
                            if (!(o = l[h + " " + a] || l["* " + a]))
                              for (s in l)
                                if (
                                  (r = s.split(" "))[1] === a &&
                                  (o = l[h + " " + r[0]] || l["* " + r[0]])
                                ) {
                                  !0 === o
                                    ? (o = l[s])
                                    : !0 !== l[s] &&
                                      ((a = r[0]), u.unshift(r[1]));
                                  break;
                                }
                            if (!0 !== o)
                              if (o && t.throws) e = o(e);
                              else
                                try {
                                  e = o(e);
                                } catch (t) {
                                  return {
                                    state: "parsererror",
                                    error: o
                                      ? t
                                      : "No conversion from " + h + " to " + a,
                                  };
                                }
                          }
                      return { state: "success", data: e };
                    })(f, b, z, p)),
                    p
                      ? (f.ifModified &&
                          ((w = z.getResponseHeader("Last-Modified")) &&
                            (k.lastModified[s] = w),
                          (w = z.getResponseHeader("etag")) && (k.etag[s] = w)),
                        204 === t || "HEAD" === f.type
                          ? (x = "nocontent")
                          : 304 === t
                          ? (x = "notmodified")
                          : ((x = b.state), (c = b.data), (p = !(y = b.error))))
                      : ((y = x),
                        (!t && x) || ((x = "error"), t < 0 && (t = 0))),
                    (z.status = t),
                    (z.statusText = (e || x) + ""),
                    p
                      ? _.resolveWith(d, [c, x, z])
                      : _.rejectWith(d, [z, x, y]),
                    z.statusCode(v),
                    (v = void 0),
                    u &&
                      g.trigger(p ? "ajaxSuccess" : "ajaxError", [
                        z,
                        f,
                        p ? c : y,
                      ]),
                    m.fireWith(d, [z, x]),
                    u &&
                      (g.trigger("ajaxComplete", [z, f]),
                      --k.active || k.event.trigger("ajaxStop")));
                }
                return z;
              },
              getJSON: function (t, e, i) {
                return k.get(t, e, i, "json");
              },
              getScript: function (t, e) {
                return k.get(t, void 0, e, "script");
              },
            }),
            k.each(["get", "post"], function (t, e) {
              k[e] = function (t, i, n, s) {
                return (
                  m(i) && ((s = s || n), (n = i), (i = void 0)),
                  k.ajax(
                    k.extend(
                      { url: t, type: e, dataType: s, data: i, success: n },
                      k.isPlainObject(t) && t
                    )
                  )
                );
              };
            }),
            k.ajaxPrefilter(function (t) {
              var e;
              for (e in t.headers)
                "content-type" === e.toLowerCase() &&
                  (t.contentType = t.headers[e] || "");
            }),
            (k._evalUrl = function (t, e, i) {
              return k.ajax({
                url: t,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (t) {
                  k.globalEval(t, e, i);
                },
              });
            }),
            k.fn.extend({
              wrapAll: function (t) {
                var e;
                return (
                  this[0] &&
                    (m(t) && (t = t.call(this[0])),
                    (e = k(t, this[0].ownerDocument).eq(0).clone(!0)),
                    this[0].parentNode && e.insertBefore(this[0]),
                    e
                      .map(function () {
                        for (var t = this; t.firstElementChild; )
                          t = t.firstElementChild;
                        return t;
                      })
                      .append(this)),
                  this
                );
              },
              wrapInner: function (t) {
                return m(t)
                  ? this.each(function (e) {
                      k(this).wrapInner(t.call(this, e));
                    })
                  : this.each(function () {
                      var e = k(this),
                        i = e.contents();
                      i.length ? i.wrapAll(t) : e.append(t);
                    });
              },
              wrap: function (t) {
                var e = m(t);
                return this.each(function (i) {
                  k(this).wrapAll(e ? t.call(this, i) : t);
                });
              },
              unwrap: function (t) {
                return (
                  this.parent(t)
                    .not("body")
                    .each(function () {
                      k(this).replaceWith(this.childNodes);
                    }),
                  this
                );
              },
            }),
            (k.expr.pseudos.hidden = function (t) {
              return !k.expr.pseudos.visible(t);
            }),
            (k.expr.pseudos.visible = function (t) {
              return !!(
                t.offsetWidth ||
                t.offsetHeight ||
                t.getClientRects().length
              );
            }),
            (k.ajaxSettings.xhr = function () {
              try {
                return new n.XMLHttpRequest();
              } catch (t) {}
            });
          var Fe = { 0: 200, 1223: 204 },
            Be = k.ajaxSettings.xhr();
          (_.cors = !!Be && "withCredentials" in Be),
            (_.ajax = Be = !!Be),
            k.ajaxTransport(function (t) {
              var e, i;
              if (_.cors || (Be && !t.crossDomain))
                return {
                  send: function (s, a) {
                    var o,
                      r = t.xhr();
                    if (
                      (r.open(t.type, t.url, t.async, t.username, t.password),
                      t.xhrFields)
                    )
                      for (o in t.xhrFields) r[o] = t.xhrFields[o];
                    for (o in (t.mimeType &&
                      r.overrideMimeType &&
                      r.overrideMimeType(t.mimeType),
                    t.crossDomain ||
                      s["X-Requested-With"] ||
                      (s["X-Requested-With"] = "XMLHttpRequest"),
                    s))
                      r.setRequestHeader(o, s[o]);
                    (e = function (t) {
                      return function () {
                        e &&
                          ((e =
                            i =
                            r.onload =
                            r.onerror =
                            r.onabort =
                            r.ontimeout =
                            r.onreadystatechange =
                              null),
                          "abort" === t
                            ? r.abort()
                            : "error" === t
                            ? "number" != typeof r.status
                              ? a(0, "error")
                              : a(r.status, r.statusText)
                            : a(
                                Fe[r.status] || r.status,
                                r.statusText,
                                "text" !== (r.responseType || "text") ||
                                  "string" != typeof r.responseText
                                  ? { binary: r.response }
                                  : { text: r.responseText },
                                r.getAllResponseHeaders()
                              ));
                      };
                    }),
                      (r.onload = e()),
                      (i = r.onerror = r.ontimeout = e("error")),
                      void 0 !== r.onabort
                        ? (r.onabort = i)
                        : (r.onreadystatechange = function () {
                            4 === r.readyState &&
                              n.setTimeout(function () {
                                e && i();
                              });
                          }),
                      (e = e("abort"));
                    try {
                      r.send((t.hasContent && t.data) || null);
                    } catch (t) {
                      if (e) throw t;
                    }
                  },
                  abort: function () {
                    e && e();
                  },
                };
            }),
            k.ajaxPrefilter(function (t) {
              t.crossDomain && (t.contents.script = !1);
            }),
            k.ajaxSetup({
              accepts: {
                script:
                  "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
              },
              contents: { script: /\b(?:java|ecma)script\b/ },
              converters: {
                "text script": function (t) {
                  return k.globalEval(t), t;
                },
              },
            }),
            k.ajaxPrefilter("script", function (t) {
              void 0 === t.cache && (t.cache = !1),
                t.crossDomain && (t.type = "GET");
            }),
            k.ajaxTransport("script", function (t) {
              var e, i;
              if (t.crossDomain || t.scriptAttrs)
                return {
                  send: function (n, s) {
                    (e = k("<script>")
                      .attr(t.scriptAttrs || {})
                      .prop({ charset: t.scriptCharset, src: t.url })
                      .on(
                        "load error",
                        (i = function (t) {
                          e.remove(),
                            (i = null),
                            t && s("error" === t.type ? 404 : 200, t.type);
                        })
                      )),
                      y.head.appendChild(e[0]);
                  },
                  abort: function () {
                    i && i();
                  },
                };
            });
          var Xe,
            Je = [],
            Ye = /(=)\?(?=&|$)|\?\?/;
          k.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function () {
              var t = Je.pop() || k.expando + "_" + ke.guid++;
              return (this[t] = !0), t;
            },
          }),
            k.ajaxPrefilter("json jsonp", function (t, e, i) {
              var s,
                a,
                o,
                r =
                  !1 !== t.jsonp &&
                  (Ye.test(t.url)
                    ? "url"
                    : "string" == typeof t.data &&
                      0 ===
                        (t.contentType || "").indexOf(
                          "application/x-www-form-urlencoded"
                        ) &&
                      Ye.test(t.data) &&
                      "data");
              if (r || "jsonp" === t.dataTypes[0])
                return (
                  (s = t.jsonpCallback =
                    m(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  r
                    ? (t[r] = t[r].replace(Ye, "$1" + s))
                    : !1 !== t.jsonp &&
                      (t.url +=
                        (je.test(t.url) ? "&" : "?") + t.jsonp + "=" + s),
                  (t.converters["script json"] = function () {
                    return o || k.error(s + " was not called"), o[0];
                  }),
                  (t.dataTypes[0] = "json"),
                  (a = n[s]),
                  (n[s] = function () {
                    o = arguments;
                  }),
                  i.always(function () {
                    void 0 === a ? k(n).removeProp(s) : (n[s] = a),
                      t[s] && ((t.jsonpCallback = e.jsonpCallback), Je.push(s)),
                      o && m(a) && a(o[0]),
                      (o = a = void 0);
                  }),
                  "script"
                );
            }),
            (_.createHTMLDocument =
              (((Xe = y.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
              2 === Xe.childNodes.length)),
            (k.parseHTML = function (t, e, i) {
              return "string" != typeof t
                ? []
                : ("boolean" == typeof e && ((i = e), (e = !1)),
                  e ||
                    (_.createHTMLDocument
                      ? (((n = (e =
                          y.implementation.createHTMLDocument(
                            ""
                          )).createElement("base")).href = y.location.href),
                        e.head.appendChild(n))
                      : (e = y)),
                  (a = !i && []),
                  (s = q.exec(t))
                    ? [e.createElement(s[1])]
                    : ((s = zt([t], e, a)),
                      a && a.length && k(a).remove(),
                      k.merge([], s.childNodes)));
              var n, s, a;
            }),
            (k.fn.load = function (t, e, i) {
              var n,
                s,
                a,
                o = this,
                r = t.indexOf(" ");
              return (
                r > -1 && ((n = me(t.slice(r))), (t = t.slice(0, r))),
                m(e)
                  ? ((i = e), (e = void 0))
                  : e && "object" == typeof e && (s = "POST"),
                o.length > 0 &&
                  k
                    .ajax({
                      url: t,
                      type: s || "GET",
                      dataType: "html",
                      data: e,
                    })
                    .done(function (t) {
                      (a = arguments),
                        o.html(
                          n ? k("<div>").append(k.parseHTML(t)).find(n) : t
                        );
                    })
                    .always(
                      i &&
                        function (t, e) {
                          o.each(function () {
                            i.apply(this, a || [t.responseText, e, t]);
                          });
                        }
                    ),
                this
              );
            }),
            (k.expr.pseudos.animated = function (t) {
              return k.grep(k.timers, function (e) {
                return t === e.elem;
              }).length;
            }),
            (k.offset = {
              setOffset: function (t, e, i) {
                var n,
                  s,
                  a,
                  o,
                  r,
                  h,
                  l = k.css(t, "position"),
                  u = k(t),
                  p = {};
                "static" === l && (t.style.position = "relative"),
                  (r = u.offset()),
                  (a = k.css(t, "top")),
                  (h = k.css(t, "left")),
                  ("absolute" === l || "fixed" === l) &&
                  (a + h).indexOf("auto") > -1
                    ? ((o = (n = u.position()).top), (s = n.left))
                    : ((o = parseFloat(a) || 0), (s = parseFloat(h) || 0)),
                  m(e) && (e = e.call(t, i, k.extend({}, r))),
                  null != e.top && (p.top = e.top - r.top + o),
                  null != e.left && (p.left = e.left - r.left + s),
                  "using" in e ? e.using.call(t, p) : u.css(p);
              },
            }),
            k.fn.extend({
              offset: function (t) {
                if (arguments.length)
                  return void 0 === t
                    ? this
                    : this.each(function (e) {
                        k.offset.setOffset(this, t, e);
                      });
                var e,
                  i,
                  n = this[0];
                return n
                  ? n.getClientRects().length
                    ? ((e = n.getBoundingClientRect()),
                      (i = n.ownerDocument.defaultView),
                      {
                        top: e.top + i.pageYOffset,
                        left: e.left + i.pageXOffset,
                      })
                    : { top: 0, left: 0 }
                  : void 0;
              },
              position: function () {
                if (this[0]) {
                  var t,
                    e,
                    i,
                    n = this[0],
                    s = { top: 0, left: 0 };
                  if ("fixed" === k.css(n, "position"))
                    e = n.getBoundingClientRect();
                  else {
                    for (
                      e = this.offset(),
                        i = n.ownerDocument,
                        t = n.offsetParent || i.documentElement;
                      t &&
                      (t === i.body || t === i.documentElement) &&
                      "static" === k.css(t, "position");

                    )
                      t = t.parentNode;
                    t &&
                      t !== n &&
                      1 === t.nodeType &&
                      (((s = k(t).offset()).top += k.css(
                        t,
                        "borderTopWidth",
                        !0
                      )),
                      (s.left += k.css(t, "borderLeftWidth", !0)));
                  }
                  return {
                    top: e.top - s.top - k.css(n, "marginTop", !0),
                    left: e.left - s.left - k.css(n, "marginLeft", !0),
                  };
                }
              },
              offsetParent: function () {
                return this.map(function () {
                  for (
                    var t = this.offsetParent;
                    t && "static" === k.css(t, "position");

                  )
                    t = t.offsetParent;
                  return t || ot;
                });
              },
            }),
            k.each(
              { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
              function (t, e) {
                var i = "pageYOffset" === e;
                k.fn[t] = function (n) {
                  return B(
                    this,
                    function (t, n, s) {
                      var a;
                      if (
                        (v(t)
                          ? (a = t)
                          : 9 === t.nodeType && (a = t.defaultView),
                        void 0 === s)
                      )
                        return a ? a[e] : t[n];
                      a
                        ? a.scrollTo(
                            i ? a.pageXOffset : s,
                            i ? s : a.pageYOffset
                          )
                        : (t[n] = s);
                    },
                    t,
                    n,
                    arguments.length
                  );
                };
              }
            ),
            k.each(["top", "left"], function (t, e) {
              k.cssHooks[e] = Bt(_.pixelPosition, function (t, i) {
                if (i)
                  return (
                    (i = Ft(t, e)), Mt.test(i) ? k(t).position()[e] + "px" : i
                  );
              });
            }),
            k.each({ Height: "height", Width: "width" }, function (t, e) {
              k.each(
                { padding: "inner" + t, content: e, "": "outer" + t },
                function (i, n) {
                  k.fn[n] = function (s, a) {
                    var o = arguments.length && (i || "boolean" != typeof s),
                      r = i || (!0 === s || !0 === a ? "margin" : "border");
                    return B(
                      this,
                      function (e, i, s) {
                        var a;
                        return v(e)
                          ? 0 === n.indexOf("outer")
                            ? e["inner" + t]
                            : e.document.documentElement["client" + t]
                          : 9 === e.nodeType
                          ? ((a = e.documentElement),
                            Math.max(
                              e.body["scroll" + t],
                              a["scroll" + t],
                              e.body["offset" + t],
                              a["offset" + t],
                              a["client" + t]
                            ))
                          : void 0 === s
                          ? k.css(e, i, r)
                          : k.style(e, i, s, r);
                      },
                      e,
                      o ? s : void 0,
                      o
                    );
                  };
                }
              );
            }),
            k.each(
              [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
              ],
              function (t, e) {
                k.fn[e] = function (t) {
                  return this.on(e, t);
                };
              }
            ),
            k.fn.extend({
              bind: function (t, e, i) {
                return this.on(t, null, e, i);
              },
              unbind: function (t, e) {
                return this.off(t, null, e);
              },
              delegate: function (t, e, i, n) {
                return this.on(e, t, i, n);
              },
              undelegate: function (t, e, i) {
                return 1 === arguments.length
                  ? this.off(t, "**")
                  : this.off(e, t || "**", i);
              },
              hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t);
              },
            }),
            k.each(
              "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " "
              ),
              function (t, e) {
                k.fn[e] = function (t, i) {
                  return arguments.length > 0
                    ? this.on(e, null, t, i)
                    : this.trigger(e);
                };
              }
            );
          var Ge = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
          (k.proxy = function (t, e) {
            var i, n, s;
            if (("string" == typeof e && ((i = t[e]), (e = t), (t = i)), m(t)))
              return (
                (n = r.call(arguments, 2)),
                (s = function () {
                  return t.apply(e || this, n.concat(r.call(arguments)));
                }),
                (s.guid = t.guid = t.guid || k.guid++),
                s
              );
          }),
            (k.holdReady = function (t) {
              t ? k.readyWait++ : k.ready(!0);
            }),
            (k.isArray = Array.isArray),
            (k.parseJSON = JSON.parse),
            (k.nodeName = E),
            (k.isFunction = m),
            (k.isWindow = v),
            (k.camelCase = G),
            (k.type = x),
            (k.now = Date.now),
            (k.isNumeric = function (t) {
              var e = k.type(t);
              return (
                ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
              );
            }),
            (k.trim = function (t) {
              return null == t ? "" : (t + "").replace(Ge, "");
            }),
            void 0 ===
              (i = function () {
                return k;
              }.apply(e, [])) || (t.exports = i);
          var Ve = n.jQuery,
            Qe = n.$;
          return (
            (k.noConflict = function (t) {
              return (
                n.$ === k && (n.$ = Qe),
                t && n.jQuery === k && (n.jQuery = Ve),
                k
              );
            }),
            void 0 === s && (n.jQuery = n.$ = k),
            k
          );
        });
      },
    },
    e = {};
  function i(n) {
    var s = e[n];
    if (void 0 !== s) return s.exports;
    var a = (e[n] = { exports: {} });
    return t[n].call(a.exports, a, a.exports, i), a.exports;
  }
  (i.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      /*!
       *  電脳麻将 v2.1.1
       *
       *  Copyright(C) 2017 Satoshi Kobayashi
       *  Released under the MIT license
       *  https://github.com/kobalab/Majiang/blob/master/LICENSE
       */ (i.g.Majiang = i(384)),
        (i.g.Majiang.AI = i(725)),
        (i.g.Majiang.UI = i(150)),
        (i.g.Majiang.VERSION = "2.1.1"),
        (i.g.jQuery = i(755)),
        (i.g.$ = jQuery);
    })();
})();
