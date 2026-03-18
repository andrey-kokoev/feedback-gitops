/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function gn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const pe = {}, Pt = [], Qe = () => {
}, $o = () => !1, $s = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), vn = (e) => e.startsWith("onUpdate:"), ge = Object.assign, xn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Ui = Object.prototype.hasOwnProperty, ce = (e, t) => Ui.call(e, t), B = Array.isArray, At = (e) => cs(e) === "[object Map]", Es = (e) => cs(e) === "[object Set]", Nn = (e) => cs(e) === "[object Date]", te = (e) => typeof e == "function", ve = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", Eo = (e) => (de(e) || te(e)) && te(e.then) && te(e.catch), Po = Object.prototype.toString, cs = (e) => Po.call(e), Ki = (e) => cs(e).slice(8, -1), Ps = (e) => cs(e) === "[object Object]", As = (e) => ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, qt = /* @__PURE__ */ gn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Bi = /-\w/g, Ne = Is(
  (e) => e.replace(Bi, (t) => t.slice(1).toUpperCase())
), Wi = /\B([A-Z])/g, Ae = Is(
  (e) => e.replace(Wi, "-$1").toLowerCase()
), Ao = Is((e) => e.charAt(0).toUpperCase() + e.slice(1)), qs = Is(
  (e) => e ? `on${Ao(e)}` : ""
), ht = (e, t) => !Object.is(e, t), bs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Io = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Rs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Vn = (e) => {
  const t = ve(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Hn;
const Os = () => Hn || (Hn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ct(e) {
  if (B(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = ve(n) ? Ji(n) : Ct(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (ve(e) || de(e))
    return e;
}
const qi = /;(?![^(]*\))/g, Yi = /:([^]+)/, Gi = /\/\*[^]*?\*\//g;
function Ji(e) {
  const t = {};
  return e.replace(Gi, "").split(qi).forEach((s) => {
    if (s) {
      const n = s.split(Yi);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function H(e) {
  let t = "";
  if (ve(e))
    t = e;
  else if (B(e))
    for (let s = 0; s < e.length; s++) {
      const n = H(e[s]);
      n && (t += n + " ");
    }
  else if (de(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Xi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qi = /* @__PURE__ */ gn(Xi);
function Ro(e) {
  return !!e || e === "";
}
function Zi(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = as(e[n], t[n]);
  return s;
}
function as(e, t) {
  if (e === t) return !0;
  let s = Nn(e), n = Nn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Ze(e), n = Ze(t), s || n)
    return e === t;
  if (s = B(e), n = B(t), s || n)
    return s && n ? Zi(e, t) : !1;
  if (s = de(e), n = de(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, i = Object.keys(t).length;
    if (o !== i)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), c = t.hasOwnProperty(r);
      if (l && !c || !l && c || !as(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function er(e, t) {
  return e.findIndex((s) => as(s, t));
}
const Oo = (e) => !!(e && e.__v_isRef === !0), j = (e) => ve(e) ? e : e == null ? "" : B(e) || de(e) && (e.toString === Po || !te(e.toString)) ? Oo(e) ? j(e.value) : JSON.stringify(e, Do, 2) : String(e), Do = (e, t) => Oo(t) ? Do(e, t.value) : At(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[Ys(n, i) + " =>"] = o, s),
    {}
  )
} : Es(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Ys(s))
} : Ze(t) ? Ys(t) : de(t) && !B(t) && !Ps(t) ? String(t) : t, Ys = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Ze(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let xe;
class Lo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = xe, !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].pause();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, s;
      if (this.scopes)
        for (t = 0, s = this.scopes.length; t < s; t++)
          this.scopes[t].resume();
      for (t = 0, s = this.effects.length; t < s; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const s = xe;
      try {
        return xe = this, t();
      } finally {
        xe = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = xe, xe = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (xe = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let s, n;
      for (s = 0, n = this.effects.length; s < n; s++)
        this.effects[s].stop();
      for (this.effects.length = 0, s = 0, n = this.cleanups.length; s < n; s++)
        this.cleanups[s]();
      if (this.cleanups.length = 0, this.scopes) {
        for (s = 0, n = this.scopes.length; s < n; s++)
          this.scopes[s].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function jo(e) {
  return new Lo(e);
}
function Fo() {
  return xe;
}
function tr(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let he;
const Gs = /* @__PURE__ */ new WeakSet();
class No {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, xe && xe.active && xe.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Gs.has(this) && (Gs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ho(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Un(this), Uo(this);
    const t = he, s = Ve;
    he = this, Ve = !0;
    try {
      return this.fn();
    } finally {
      Ko(this), he = t, Ve = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Sn(t);
      this.deps = this.depsTail = void 0, Un(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Gs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    rn(this) && this.run();
  }
  get dirty() {
    return rn(this);
  }
}
let Vo = 0, Yt, Gt;
function Ho(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Gt, Gt = e;
    return;
  }
  e.next = Yt, Yt = e;
}
function yn() {
  Vo++;
}
function _n() {
  if (--Vo > 0)
    return;
  if (Gt) {
    let t = Gt;
    for (Gt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Yt; ) {
    let t = Yt;
    for (Yt = void 0; t; ) {
      const s = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (n) {
          e || (e = n);
        }
      t = s;
    }
  }
  if (e) throw e;
}
function Uo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ko(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), Sn(n), sr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function rn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Bo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Bo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ss) || (e.globalVersion = ss, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !rn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = he, n = Ve;
  he = e, Ve = !0;
  try {
    Uo(e);
    const o = e.fn(e._value);
    (t.version === 0 || ht(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    he = s, Ve = n, Ko(e), e.flags &= -3;
  }
}
function Sn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      Sn(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function sr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ve = !0;
const Wo = [];
function ct() {
  Wo.push(Ve), Ve = !1;
}
function at() {
  const e = Wo.pop();
  Ve = e === void 0 ? !0 : e;
}
function Un(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = he;
    he = void 0;
    try {
      t();
    } finally {
      he = s;
    }
  }
}
let ss = 0;
class nr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class kn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!he || !Ve || he === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== he)
      s = this.activeLink = new nr(he, this), he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, qo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ss++, this.notify(t);
  }
  notify(t) {
    yn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      _n();
    }
  }
}
function qo(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        qo(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const vs = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ Symbol(
  ""
), ln = /* @__PURE__ */ Symbol(
  ""
), ns = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, s) {
  if (Ve && he) {
    let n = vs.get(e);
    n || vs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new kn()), o.map = n, o.key = s), o.track();
  }
}
function it(e, t, s, n, o, i) {
  const r = vs.get(e);
  if (!r) {
    ss++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (yn(), t === "clear")
    r.forEach(l);
  else {
    const c = B(e), b = c && As(s);
    if (c && s === "length") {
      const a = Number(n);
      r.forEach((m, g) => {
        (g === "length" || g === ns || !Ze(g) && g >= a) && l(m);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), b && l(r.get(ns)), t) {
        case "add":
          c ? b && l(r.get("length")) : (l(r.get(_t)), At(e) && l(r.get(ln)));
          break;
        case "delete":
          c || (l(r.get(_t)), At(e) && l(r.get(ln)));
          break;
        case "set":
          At(e) && l(r.get(_t));
          break;
      }
  }
  _n();
}
function or(e, t) {
  const s = vs.get(e);
  return s && s.get(t);
}
function Mt(e) {
  const t = /* @__PURE__ */ re(e);
  return t === e ? t : (ye(t, "iterate", ns), /* @__PURE__ */ Oe(e) ? t : t.map(He));
}
function Ds(e) {
  return ye(e = /* @__PURE__ */ re(e), "iterate", ns), e;
}
function pt(e, t) {
  return /* @__PURE__ */ ft(e) ? Ot(/* @__PURE__ */ lt(e) ? He(t) : t) : He(t);
}
const ir = {
  __proto__: null,
  [Symbol.iterator]() {
    return Js(this, Symbol.iterator, (e) => pt(this, e));
  },
  concat(...e) {
    return Mt(this).concat(
      ...e.map((t) => B(t) ? Mt(t) : t)
    );
  },
  entries() {
    return Js(this, "entries", (e) => (e[1] = pt(this, e[1]), e));
  },
  every(e, t) {
    return st(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return st(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => pt(this, n)),
      arguments
    );
  },
  find(e, t) {
    return st(
      this,
      "find",
      e,
      t,
      (s) => pt(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return st(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return st(
      this,
      "findLast",
      e,
      t,
      (s) => pt(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return st(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return st(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Xs(this, "includes", e);
  },
  indexOf(...e) {
    return Xs(this, "indexOf", e);
  },
  join(e) {
    return Mt(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Xs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ht(this, "pop");
  },
  push(...e) {
    return Ht(this, "push", e);
  },
  reduce(e, ...t) {
    return Kn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Kn(this, "reduceRight", e, t);
  },
  shift() {
    return Ht(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ht(this, "splice", e);
  },
  toReversed() {
    return Mt(this).toReversed();
  },
  toSorted(e) {
    return Mt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Mt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ht(this, "unshift", e);
  },
  values() {
    return Js(this, "values", (e) => pt(this, e));
  }
};
function Js(e, t, s) {
  const n = Ds(e), o = n[t]();
  return n !== e && !/* @__PURE__ */ Oe(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const rr = Array.prototype;
function st(e, t, s, n, o, i) {
  const r = Ds(e), l = r !== e && !/* @__PURE__ */ Oe(e), c = r[t];
  if (c !== rr[t]) {
    const m = c.apply(e, i);
    return l ? He(m) : m;
  }
  let b = s;
  r !== e && (l ? b = function(m, g) {
    return s.call(this, pt(e, m), g, e);
  } : s.length > 2 && (b = function(m, g) {
    return s.call(this, m, g, e);
  }));
  const a = c.call(r, b, n);
  return l && o ? o(a) : a;
}
function Kn(e, t, s, n) {
  const o = Ds(e);
  let i = s;
  return o !== e && (/* @__PURE__ */ Oe(e) ? s.length > 3 && (i = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : i = function(r, l, c) {
    return s.call(this, r, pt(e, l), c, e);
  }), o[t](i, ...n);
}
function Xs(e, t, s) {
  const n = /* @__PURE__ */ re(e);
  ye(n, "iterate", ns);
  const o = n[t](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ js(s[0]) ? (s[0] = /* @__PURE__ */ re(s[0]), n[t](...s)) : o;
}
function Ht(e, t, s = []) {
  ct(), yn();
  const n = (/* @__PURE__ */ re(e))[t].apply(e, s);
  return _n(), at(), n;
}
const lr = /* @__PURE__ */ gn("__proto__,__v_isRef,__isVue"), Yo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function cr(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ re(this);
  return ye(t, "has", e), t.hasOwnProperty(e);
}
class Go {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const o = this._isReadonly, i = this._isShallow;
    if (s === "__v_isReactive")
      return !o;
    if (s === "__v_isReadonly")
      return o;
    if (s === "__v_isShallow")
      return i;
    if (s === "__v_raw")
      return n === (o ? i ? gr : Zo : i ? Qo : Xo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = B(t);
    if (!o) {
      let c;
      if (r && (c = ir[s]))
        return c;
      if (s === "hasOwnProperty")
        return cr;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ be(t) ? t : n
    );
    if ((Ze(s) ? Yo.has(s) : lr(s)) || (o || ye(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ be(l)) {
      const c = r && As(s) ? l : l.value;
      return o && de(c) ? /* @__PURE__ */ an(c) : c;
    }
    return de(l) ? o ? /* @__PURE__ */ an(l) : /* @__PURE__ */ Ls(l) : l;
  }
}
class Jo extends Go {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    const r = B(t) && As(s);
    if (!this._isShallow) {
      const b = /* @__PURE__ */ ft(i);
      if (!/* @__PURE__ */ Oe(n) && !/* @__PURE__ */ ft(n) && (i = /* @__PURE__ */ re(i), n = /* @__PURE__ */ re(n)), !r && /* @__PURE__ */ be(i) && !/* @__PURE__ */ be(n))
        return b || (i.value = n), !0;
    }
    const l = r ? Number(s) < t.length : ce(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ be(t) ? t : o
    );
    return t === /* @__PURE__ */ re(o) && (l ? ht(n, i) && it(t, "set", s, n) : it(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = ce(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && it(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ze(s) || !Yo.has(s)) && ye(t, "has", s), n;
  }
  ownKeys(t) {
    return ye(
      t,
      "iterate",
      B(t) ? "length" : _t
    ), Reflect.ownKeys(t);
  }
}
class ar extends Go {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, s) {
    return !0;
  }
  deleteProperty(t, s) {
    return !0;
  }
}
const fr = /* @__PURE__ */ new Jo(), ur = /* @__PURE__ */ new ar(), dr = /* @__PURE__ */ new Jo(!0);
const cn = (e) => e, ps = (e) => Reflect.getPrototypeOf(e);
function pr(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, i = /* @__PURE__ */ re(o), r = At(i), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, b = o[e](...n), a = s ? cn : t ? Ot : He;
    return !t && ye(
      i,
      "iterate",
      c ? ln : _t
    ), ge(
      // inheriting all iterator properties
      Object.create(b),
      {
        // iterator protocol
        next() {
          const { value: m, done: g } = b.next();
          return g ? { value: m, done: g } : {
            value: l ? [a(m[0]), a(m[1])] : a(m),
            done: g
          };
        }
      }
    );
  };
}
function ms(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function mr(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ re(i), l = /* @__PURE__ */ re(o);
      e || (ht(o, l) && ye(r, "get", o), ye(r, "get", l));
      const { has: c } = ps(r), b = t ? cn : e ? Ot : He;
      if (c.call(r, o))
        return b(i.get(o));
      if (c.call(r, l))
        return b(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ye(/* @__PURE__ */ re(o), "iterate", _t), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ re(i), l = /* @__PURE__ */ re(o);
      return e || (ht(o, l) && ye(r, "has", o), ye(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ re(l), b = t ? cn : e ? Ot : He;
      return !e && ye(c, "iterate", _t), l.forEach((a, m) => o.call(i, b(a), b(m), r));
    }
  };
  return ge(
    s,
    e ? {
      add: ms("add"),
      set: ms("set"),
      delete: ms("delete"),
      clear: ms("clear")
    } : {
      add(o) {
        !t && !/* @__PURE__ */ Oe(o) && !/* @__PURE__ */ ft(o) && (o = /* @__PURE__ */ re(o));
        const i = /* @__PURE__ */ re(this);
        return ps(i).has.call(i, o) || (i.add(o), it(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !/* @__PURE__ */ Oe(i) && !/* @__PURE__ */ ft(i) && (i = /* @__PURE__ */ re(i));
        const r = /* @__PURE__ */ re(this), { has: l, get: c } = ps(r);
        let b = l.call(r, o);
        b || (o = /* @__PURE__ */ re(o), b = l.call(r, o));
        const a = c.call(r, o);
        return r.set(o, i), b ? ht(i, a) && it(r, "set", o, i) : it(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ re(this), { has: r, get: l } = ps(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ re(o), c = r.call(i, o)), l && l.call(i, o);
        const b = i.delete(o);
        return c && it(i, "delete", o, void 0), b;
      },
      clear() {
        const o = /* @__PURE__ */ re(this), i = o.size !== 0, r = o.clear();
        return i && it(
          o,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((o) => {
    s[o] = pr(o, e, t);
  }), s;
}
function Cn(e, t) {
  const s = mr(e, t);
  return (n, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    ce(s, o) && o in n ? s : n,
    o,
    i
  );
}
const hr = {
  get: /* @__PURE__ */ Cn(!1, !1)
}, br = {
  get: /* @__PURE__ */ Cn(!1, !0)
}, wr = {
  get: /* @__PURE__ */ Cn(!0, !1)
};
const Xo = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap();
function vr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function xr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : vr(Ki(e));
}
// @__NO_SIDE_EFFECTS__
function Ls(e) {
  return /* @__PURE__ */ ft(e) ? e : Tn(
    e,
    !1,
    fr,
    hr,
    Xo
  );
}
// @__NO_SIDE_EFFECTS__
function yr(e) {
  return Tn(
    e,
    !1,
    dr,
    br,
    Qo
  );
}
// @__NO_SIDE_EFFECTS__
function an(e) {
  return Tn(
    e,
    !0,
    ur,
    wr,
    Zo
  );
}
function Tn(e, t, s, n, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = xr(e);
  if (i === 0)
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const l = new Proxy(
    e,
    i === 2 ? n : s
  );
  return o.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function lt(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Oe(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function re(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ re(t) : e;
}
function zn(e) {
  return !ce(e, "__v_skip") && Object.isExtensible(e) && Io(e, "__v_skip", !0), e;
}
const He = (e) => de(e) ? /* @__PURE__ */ Ls(e) : e, Ot = (e) => de(e) ? /* @__PURE__ */ an(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function O(e) {
  return _r(e, !1);
}
function _r(e, t) {
  return /* @__PURE__ */ be(e) ? e : new Sr(e, t);
}
class Sr {
  constructor(t, s) {
    this.dep = new kn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ re(t), this._value = s ? t : He(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Oe(t) || /* @__PURE__ */ ft(t);
    t = n ? t : /* @__PURE__ */ re(t), ht(t, s) && (this._rawValue = t, this._value = n ? t : He(t), this.dep.trigger());
  }
}
function h(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
const kr = {
  get: (e, t, s) => t === "__v_raw" ? e : h(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return /* @__PURE__ */ be(o) && !/* @__PURE__ */ be(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function ei(e) {
  return /* @__PURE__ */ lt(e) ? e : new Proxy(e, kr);
}
// @__NO_SIDE_EFFECTS__
function Cr(e) {
  const t = B(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = zr(e, s);
  return t;
}
class Tr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ re(t);
    let o = !0, i = t;
    if (!B(t) || !As(String(s)))
      do
        o = !/* @__PURE__ */ js(i) || /* @__PURE__ */ Oe(i);
      while (o && (i = i.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = h(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ be(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ be(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return or(this._raw, this._key);
  }
}
function zr(e, t, s) {
  return new Tr(e, t, s);
}
class Mr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new kn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ss - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return Ho(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Bo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $r(e, t, s = !1) {
  let n, o;
  return te(e) ? n = e : (n = e.get, o = e.set), new Mr(n, o, s);
}
const hs = {}, xs = /* @__PURE__ */ new WeakMap();
let xt;
function Er(e, t = !1, s = xt) {
  if (s) {
    let n = xs.get(s);
    n || xs.set(s, n = []), n.push(e);
  }
}
function Pr(e, t, s = pe) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, b = (L) => o ? L : /* @__PURE__ */ Oe(L) || o === !1 || o === 0 ? rt(L, 1) : rt(L);
  let a, m, g, S, d = !1, w = !1;
  if (/* @__PURE__ */ be(e) ? (m = () => e.value, d = /* @__PURE__ */ Oe(e)) : /* @__PURE__ */ lt(e) ? (m = () => b(e), d = !0) : B(e) ? (w = !0, d = e.some((L) => /* @__PURE__ */ lt(L) || /* @__PURE__ */ Oe(L)), m = () => e.map((L) => {
    if (/* @__PURE__ */ be(L))
      return L.value;
    if (/* @__PURE__ */ lt(L))
      return b(L);
    if (te(L))
      return c ? c(L, 2) : L();
  })) : te(e) ? t ? m = c ? () => c(e, 2) : e : m = () => {
    if (g) {
      ct();
      try {
        g();
      } finally {
        at();
      }
    }
    const L = xt;
    xt = a;
    try {
      return c ? c(e, 3, [S]) : e(S);
    } finally {
      xt = L;
    }
  } : m = Qe, t && o) {
    const L = m, R = o === !0 ? 1 / 0 : o;
    m = () => rt(L(), R);
  }
  const U = Fo(), Z = () => {
    a.stop(), U && U.active && xn(U.effects, a);
  };
  if (i && t) {
    const L = t;
    t = (...R) => {
      L(...R), Z();
    };
  }
  let F = w ? new Array(e.length).fill(hs) : hs;
  const W = (L) => {
    if (!(!(a.flags & 1) || !a.dirty && !L))
      if (t) {
        const R = a.run();
        if (o || d || (w ? R.some((E, J) => ht(E, F[J])) : ht(R, F))) {
          g && g();
          const E = xt;
          xt = a;
          try {
            const J = [
              R,
              // pass undefined as the old value when it's changed for the first time
              F === hs ? void 0 : w && F[0] === hs ? [] : F,
              S
            ];
            F = R, c ? c(t, 3, J) : (
              // @ts-expect-error
              t(...J)
            );
          } finally {
            xt = E;
          }
        }
      } else
        a.run();
  };
  return l && l(W), a = new No(m), a.scheduler = r ? () => r(W, !1) : W, S = (L) => Er(L, !1, a), g = a.onStop = () => {
    const L = xs.get(a);
    if (L) {
      if (c)
        c(L, 4);
      else
        for (const R of L) R();
      xs.delete(a);
    }
  }, t ? n ? W(!0) : F = a.run() : r ? r(W.bind(null, !0), !0) : a.run(), Z.pause = a.pause.bind(a), Z.resume = a.resume.bind(a), Z.stop = Z, Z;
}
function rt(e, t = 1 / 0, s) {
  if (t <= 0 || !de(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ be(e))
    rt(e.value, t, s);
  else if (B(e))
    for (let n = 0; n < e.length; n++)
      rt(e[n], t, s);
  else if (Es(e) || At(e))
    e.forEach((n) => {
      rt(n, t, s);
    });
  else if (Ps(e)) {
    for (const n in e)
      rt(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && rt(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function fs(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    Fs(o, t, s);
  }
}
function et(e, t, s, n) {
  if (te(e)) {
    const o = fs(e, t, s, n);
    return o && Eo(o) && o.catch((i) => {
      Fs(i, t, s);
    }), o;
  }
  if (B(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(et(e[i], t, s, n));
    return o;
  }
}
function Fs(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || pe;
  if (t) {
    let l = t.parent;
    const c = t.proxy, b = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let m = 0; m < a.length; m++)
          if (a[m](e, c, b) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      ct(), fs(i, null, 10, [
        e,
        c,
        b
      ]), at();
      return;
    }
  }
  Ar(e, s, o, n, r);
}
function Ar(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Se = [];
let Ge = -1;
const It = [];
let mt = null, Et = 0;
const ti = /* @__PURE__ */ Promise.resolve();
let ys = null;
function Tt(e) {
  const t = ys || ti;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ir(e) {
  let t = Ge + 1, s = Se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = Se[n], i = os(o);
    i < e || i === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Mn(e) {
  if (!(e.flags & 1)) {
    const t = os(e), s = Se[Se.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= os(s) ? Se.push(e) : Se.splice(Ir(t), 0, e), e.flags |= 1, si();
  }
}
function si() {
  ys || (ys = ti.then(oi));
}
function Rr(e) {
  B(e) ? It.push(...e) : mt && e.id === -1 ? mt.splice(Et + 1, 0, e) : e.flags & 1 || (It.push(e), e.flags |= 1), si();
}
function Bn(e, t, s = Ge + 1) {
  for (; s < Se.length; s++) {
    const n = Se[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Se.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function ni(e) {
  if (It.length) {
    const t = [...new Set(It)].sort(
      (s, n) => os(s) - os(n)
    );
    if (It.length = 0, mt) {
      mt.push(...t);
      return;
    }
    for (mt = t, Et = 0; Et < mt.length; Et++) {
      const s = mt[Et];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    mt = null, Et = 0;
  }
}
const os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function oi(e) {
  try {
    for (Ge = 0; Ge < Se.length; Ge++) {
      const t = Se[Ge];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ge < Se.length; Ge++) {
      const t = Se[Ge];
      t && (t.flags &= -2);
    }
    Ge = -1, Se.length = 0, ni(), ys = null, (Se.length || It.length) && oi();
  }
}
let Le = null, ii = null;
function _s(e) {
  const t = Le;
  return Le = e, ii = e && e.type.__scopeId || null, t;
}
function Or(e, t = Le, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && so(-1);
    const i = _s(t);
    let r;
    try {
      r = e(...o);
    } finally {
      _s(i), n._d && so(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Xe(e, t) {
  if (Le === null)
    return e;
  const s = Ks(Le), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, r, l, c = pe] = t[o];
    i && (te(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && rt(r), n.push({
      dir: i,
      instance: s,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function gt(e, t, s, n) {
  const o = e.dirs, i = t && t.dirs;
  for (let r = 0; r < o.length; r++) {
    const l = o[r];
    i && (l.oldValue = i[r].value);
    let c = l.dir[n];
    c && (ct(), et(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), at());
  }
}
function Dr(e, t) {
  if (Ce) {
    let s = Ce.provides;
    const n = Ce.parent && Ce.parent.provides;
    n === s && (s = Ce.provides = Object.create(n)), s[e] = t;
  }
}
function St(e, t, s = !1) {
  const n = Pi();
  if (n || kt) {
    let o = kt ? kt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && te(t) ? t.call(n && n.proxy) : t;
  }
}
function Lr() {
  return !!(Pi() || kt);
}
const jr = /* @__PURE__ */ Symbol.for("v-scx"), Fr = () => St(jr);
function Jt(e, t, s) {
  return ri(e, t, s);
}
function ri(e, t, s = pe) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = ge({}, s), c = t && n || !t && i !== "post";
  let b;
  if (ls) {
    if (i === "sync") {
      const S = Fr();
      b = S.__watcherHandles || (S.__watcherHandles = []);
    } else if (!c) {
      const S = () => {
      };
      return S.stop = Qe, S.resume = Qe, S.pause = Qe, S;
    }
  }
  const a = Ce;
  l.call = (S, d, w) => et(S, a, d, w);
  let m = !1;
  i === "post" ? l.scheduler = (S) => {
    Me(S, a && a.suspense);
  } : i !== "sync" && (m = !0, l.scheduler = (S, d) => {
    d ? S() : Mn(S);
  }), l.augmentJob = (S) => {
    t && (S.flags |= 4), m && (S.flags |= 2, a && (S.id = a.uid, S.i = a));
  };
  const g = Pr(e, t, l);
  return ls && (b ? b.push(g) : c && g()), g;
}
function Nr(e, t, s) {
  const n = this.proxy, o = ve(e) ? e.includes(".") ? li(n, e) : () => n[e] : e.bind(n, n);
  let i;
  te(t) ? i = t : (i = t.handler, s = t);
  const r = us(this), l = ri(o, i.bind(n), s);
  return r(), l;
}
function li(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const Vr = /* @__PURE__ */ Symbol("_vte"), Hr = (e) => e.__isTeleport, Ur = /* @__PURE__ */ Symbol("_leaveCb");
function $n(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, $n(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function tt(e, t) {
  return te(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ge({ name: e.name }, t, { setup: e })
  ) : e;
}
function ci(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Wn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Ss = /* @__PURE__ */ new WeakMap();
function Xt(e, t, s, n, o = !1) {
  if (B(e)) {
    e.forEach(
      (w, U) => Xt(
        w,
        t && (B(t) ? t[U] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Qt(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Xt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Ks(n.component) : n.el, r = o ? null : i, { i: l, r: c } = e, b = t && t.r, a = l.refs === pe ? l.refs = {} : l.refs, m = l.setupState, g = /* @__PURE__ */ re(m), S = m === pe ? $o : (w) => Wn(a, w) ? !1 : ce(g, w), d = (w, U) => !(U && Wn(a, U));
  if (b != null && b !== c) {
    if (qn(t), ve(b))
      a[b] = null, S(b) && (m[b] = null);
    else if (/* @__PURE__ */ be(b)) {
      const w = t;
      d(b, w.k) && (b.value = null), w.k && (a[w.k] = null);
    }
  }
  if (te(c))
    fs(c, l, 12, [r, a]);
  else {
    const w = ve(c), U = /* @__PURE__ */ be(c);
    if (w || U) {
      const Z = () => {
        if (e.f) {
          const F = w ? S(c) ? m[c] : a[c] : d() || !e.k ? c.value : a[e.k];
          if (o)
            B(F) && xn(F, i);
          else if (B(F))
            F.includes(i) || F.push(i);
          else if (w)
            a[c] = [i], S(c) && (m[c] = a[c]);
          else {
            const W = [i];
            d(c, e.k) && (c.value = W), e.k && (a[e.k] = W);
          }
        } else w ? (a[c] = r, S(c) && (m[c] = r)) : U && (d(c, e.k) && (c.value = r), e.k && (a[e.k] = r));
      };
      if (r) {
        const F = () => {
          Z(), Ss.delete(e);
        };
        F.id = -1, Ss.set(e, F), Me(F, s);
      } else
        qn(e), Z();
    }
  }
}
function qn(e) {
  const t = Ss.get(e);
  t && (t.flags |= 8, Ss.delete(e));
}
Os().requestIdleCallback;
Os().cancelIdleCallback;
const Qt = (e) => !!e.type.__asyncLoader, ai = (e) => e.type.__isKeepAlive;
function Kr(e, t) {
  fi(e, "a", t);
}
function Br(e, t) {
  fi(e, "da", t);
}
function fi(e, t, s = Ce) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ns(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      ai(o.parent.vnode) && Wr(n, t, s, o), o = o.parent;
  }
}
function Wr(e, t, s, n) {
  const o = Ns(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  En(() => {
    xn(n[t], o);
  }, s);
}
function Ns(e, t, s = Ce, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...r) => {
      ct();
      const l = us(s), c = et(t, s, e, r);
      return l(), at(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ut = (e) => (t, s = Ce) => {
  (!ls || e === "sp") && Ns(e, (...n) => t(...n), s);
}, qr = ut("bm"), Vs = ut("m"), Yr = ut(
  "bu"
), Gr = ut("u"), Jr = ut(
  "bum"
), En = ut("um"), Xr = ut(
  "sp"
), Qr = ut("rtg"), Zr = ut("rtc");
function el(e, t = Ce) {
  Ns("ec", e, t);
}
const tl = /* @__PURE__ */ Symbol.for("v-ndc");
function $e(e, t, s, n) {
  let o;
  const i = s, r = B(e);
  if (r || ve(e)) {
    const l = r && /* @__PURE__ */ lt(e);
    let c = !1, b = !1;
    l && (c = !/* @__PURE__ */ Oe(e), b = /* @__PURE__ */ ft(e), e = Ds(e)), o = new Array(e.length);
    for (let a = 0, m = e.length; a < m; a++)
      o[a] = t(
        c ? b ? Ot(He(e[a])) : He(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, i);
  } else if (de(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, b = l.length; c < b; c++) {
        const a = l[c];
        o[c] = t(e[a], a, c, i);
      }
    }
  else
    o = [];
  return o;
}
const fn = (e) => e ? Ai(e) ? Ks(e) : fn(e.parent) : null, Zt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ge(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => fn(e.parent),
    $root: (e) => fn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => di(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Mn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tt.bind(e.proxy)),
    $watch: (e) => Nr.bind(e)
  })
), Qs = (e, t) => e !== pe && !e.__isScriptSetup && ce(e, t), sl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const g = r[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return n[t];
          case 2:
            return o[t];
          case 4:
            return s[t];
          case 3:
            return i[t];
        }
      else {
        if (Qs(n, t))
          return r[t] = 1, n[t];
        if (o !== pe && ce(o, t))
          return r[t] = 2, o[t];
        if (ce(i, t))
          return r[t] = 3, i[t];
        if (s !== pe && ce(s, t))
          return r[t] = 4, s[t];
        un && (r[t] = 0);
      }
    }
    const b = Zt[t];
    let a, m;
    if (b)
      return t === "$attrs" && ye(e.attrs, "get", ""), b(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (s !== pe && ce(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      m = c.config.globalProperties, ce(m, t)
    )
      return m[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return Qs(o, t) ? (o[t] = s, !0) : n !== pe && ce(n, t) ? (n[t] = s, !0) : ce(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || e !== pe && l[0] !== "$" && ce(e, l) || Qs(t, l) || ce(i, l) || ce(n, l) || ce(Zt, l) || ce(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : ce(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Yn(e) {
  return B(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let un = !0;
function nl(e) {
  const t = di(e), s = e.proxy, n = e.ctx;
  un = !1, t.beforeCreate && Gn(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: b,
    // lifecycle
    created: a,
    beforeMount: m,
    mounted: g,
    beforeUpdate: S,
    updated: d,
    activated: w,
    deactivated: U,
    beforeDestroy: Z,
    beforeUnmount: F,
    destroyed: W,
    unmounted: L,
    render: R,
    renderTracked: E,
    renderTriggered: J,
    errorCaptured: D,
    serverPrefetch: T,
    // public API
    expose: ne,
    inheritAttrs: N,
    // assets
    components: q,
    directives: ee,
    filters: we
  } = t;
  if (b && ol(b, n, null), r)
    for (const Y in r) {
      const se = r[Y];
      te(se) && (n[Y] = se.bind(s));
    }
  if (o) {
    const Y = o.call(s, s);
    de(Y) && (e.data = /* @__PURE__ */ Ls(Y));
  }
  if (un = !0, i)
    for (const Y in i) {
      const se = i[Y], De = te(se) ? se.bind(s, s) : te(se.get) ? se.get.bind(s, s) : Qe, Ke = !te(se) && te(se.set) ? se.set.bind(s) : Qe, Fe = fe({
        get: De,
        set: Ke
      });
      Object.defineProperty(n, Y, {
        enumerable: !0,
        configurable: !0,
        get: () => Fe.value,
        set: (G) => Fe.value = G
      });
    }
  if (l)
    for (const Y in l)
      ui(l[Y], n, s, Y);
  if (c) {
    const Y = te(c) ? c.call(s) : c;
    Reflect.ownKeys(Y).forEach((se) => {
      Dr(se, Y[se]);
    });
  }
  a && Gn(a, e, "c");
  function le(Y, se) {
    B(se) ? se.forEach((De) => Y(De.bind(s))) : se && Y(se.bind(s));
  }
  if (le(qr, m), le(Vs, g), le(Yr, S), le(Gr, d), le(Kr, w), le(Br, U), le(el, D), le(Zr, E), le(Qr, J), le(Jr, F), le(En, L), le(Xr, T), B(ne))
    if (ne.length) {
      const Y = e.exposed || (e.exposed = {});
      ne.forEach((se) => {
        Object.defineProperty(Y, se, {
          get: () => s[se],
          set: (De) => s[se] = De,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  R && e.render === Qe && (e.render = R), N != null && (e.inheritAttrs = N), q && (e.components = q), ee && (e.directives = ee), T && ci(e);
}
function ol(e, t, s = Qe) {
  B(e) && (e = dn(e));
  for (const n in e) {
    const o = e[n];
    let i;
    de(o) ? "default" in o ? i = St(
      o.from || n,
      o.default,
      !0
    ) : i = St(o.from || n) : i = St(o), /* @__PURE__ */ be(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function Gn(e, t, s) {
  et(
    B(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function ui(e, t, s, n) {
  let o = n.includes(".") ? li(s, n) : () => s[n];
  if (ve(e)) {
    const i = t[e];
    te(i) && Jt(o, i);
  } else if (te(e))
    Jt(o, e.bind(s));
  else if (de(e))
    if (B(e))
      e.forEach((i) => ui(i, t, s, n));
    else {
      const i = te(e.handler) ? e.handler.bind(s) : t[e.handler];
      te(i) && Jt(o, i, e);
    }
}
function di(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !o.length && !s && !n ? c = t : (c = {}, o.length && o.forEach(
    (b) => ks(c, b, r, !0)
  ), ks(c, t, r)), de(t) && i.set(t, c), c;
}
function ks(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && ks(e, i, s, !0), o && o.forEach(
    (r) => ks(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = il[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const il = {
  data: Jn,
  props: Xn,
  emits: Xn,
  // objects
  methods: Bt,
  computed: Bt,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: Bt,
  directives: Bt,
  // watch
  watch: ll,
  // provide / inject
  provide: Jn,
  inject: rl
};
function Jn(e, t) {
  return t ? e ? function() {
    return ge(
      te(e) ? e.call(this, this) : e,
      te(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function rl(e, t) {
  return Bt(dn(e), dn(t));
}
function dn(e) {
  if (B(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Bt(e, t) {
  return e ? ge(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xn(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ge(
    /* @__PURE__ */ Object.create(null),
    Yn(e),
    Yn(t ?? {})
  ) : t;
}
function ll(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = ge(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function pi() {
  return {
    app: null,
    config: {
      isNativeTag: $o,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let cl = 0;
function al(e, t) {
  return function(n, o = null) {
    te(n) || (n = ge({}, n)), o != null && !de(o) && (o = null);
    const i = pi(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const b = i.app = {
      _uid: cl++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Nl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...m) {
        return r.has(a) || (a && te(a.install) ? (r.add(a), a.install(b, ...m)) : te(a) && (r.add(a), a(b, ...m))), b;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), b;
      },
      component(a, m) {
        return m ? (i.components[a] = m, b) : i.components[a];
      },
      directive(a, m) {
        return m ? (i.directives[a] = m, b) : i.directives[a];
      },
      mount(a, m, g) {
        if (!c) {
          const S = b._ceVNode || ke(n, o);
          return S.appContext = i, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(S, a, g), c = !0, b._container = a, a.__vue_app__ = b, Ks(S.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (et(
          l,
          b._instance,
          16
        ), e(null, b._container), delete b._container.__vue_app__);
      },
      provide(a, m) {
        return i.provides[a] = m, b;
      },
      runWithContext(a) {
        const m = kt;
        kt = b;
        try {
          return a();
        } finally {
          kt = m;
        }
      }
    };
    return b;
  };
}
let kt = null;
const fl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Ne(t)}Modifiers`] || e[`${Ae(t)}Modifiers`];
function ul(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || pe;
  let o = s;
  const i = t.startsWith("update:"), r = i && fl(n, t.slice(7));
  r && (r.trim && (o = s.map((a) => ve(a) ? a.trim() : a)), r.number && (o = s.map(Rs)));
  let l, c = n[l = qs(t)] || // also try camelCase event handler (#2249)
  n[l = qs(Ne(t))];
  !c && i && (c = n[l = qs(Ae(t))]), c && et(
    c,
    e,
    6,
    o
  );
  const b = n[l + "Once"];
  if (b) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, et(
      b,
      e,
      6,
      o
    );
  }
}
const dl = /* @__PURE__ */ new WeakMap();
function mi(e, t, s = !1) {
  const n = s ? dl : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let r = {}, l = !1;
  if (!te(e)) {
    const c = (b) => {
      const a = mi(b, t, !0);
      a && (l = !0, ge(r, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (de(e) && n.set(e, null), null) : (B(i) ? i.forEach((c) => r[c] = null) : ge(r, i), de(e) && n.set(e, r), r);
}
function Hs(e, t) {
  return !e || !$s(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Ae(t)) || ce(e, t));
}
function Qn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: c,
    render: b,
    renderCache: a,
    props: m,
    data: g,
    setupState: S,
    ctx: d,
    inheritAttrs: w
  } = e, U = _s(e);
  let Z, F;
  try {
    if (s.shapeFlag & 4) {
      const L = o || n, R = L;
      Z = Je(
        b.call(
          R,
          L,
          a,
          m,
          S,
          g,
          d
        )
      ), F = l;
    } else {
      const L = t;
      Z = Je(
        L.length > 1 ? L(
          m,
          { attrs: l, slots: r, emit: c }
        ) : L(
          m,
          null
        )
      ), F = t.props ? l : pl(l);
    }
  } catch (L) {
    es.length = 0, Fs(L, e, 1), Z = ke(bt);
  }
  let W = Z;
  if (F && w !== !1) {
    const L = Object.keys(F), { shapeFlag: R } = W;
    L.length && R & 7 && (i && L.some(vn) && (F = ml(
      F,
      i
    )), W = Dt(W, F, !1, !0));
  }
  return s.dirs && (W = Dt(W, null, !1, !0), W.dirs = W.dirs ? W.dirs.concat(s.dirs) : s.dirs), s.transition && $n(W, s.transition), Z = W, _s(U), Z;
}
const pl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || $s(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, ml = (e, t) => {
  const s = {};
  for (const n in e)
    (!vn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function hl(e, t, s) {
  const { props: n, children: o, component: i } = e, { props: r, children: l, patchFlag: c } = t, b = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? Zn(n, r, b) : !!r;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let m = 0; m < a.length; m++) {
        const g = a[m];
        if (hi(r, n, g) && !Hs(b, g))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? Zn(n, r, b) : !0 : !!r;
  return !1;
}
function Zn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (hi(t, e, i) && !Hs(s, i))
      return !0;
  }
  return !1;
}
function hi(e, t, s) {
  const n = e[s], o = t[s];
  return s === "style" && de(n) && de(o) ? !as(n, o) : n !== o;
}
function bl({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const bi = {}, wi = () => Object.create(bi), gi = (e) => Object.getPrototypeOf(e) === bi;
function wl(e, t, s, n = !1) {
  const o = {}, i = wi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), vi(e, t, o, i);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? e.props = n ? o : /* @__PURE__ */ yr(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function gl(e, t, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ re(o), [c] = e.propsOptions;
  let b = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const a = e.vnode.dynamicProps;
      for (let m = 0; m < a.length; m++) {
        let g = a[m];
        if (Hs(e.emitsOptions, g))
          continue;
        const S = t[g];
        if (c)
          if (ce(i, g))
            S !== i[g] && (i[g] = S, b = !0);
          else {
            const d = Ne(g);
            o[d] = pn(
              c,
              l,
              d,
              S,
              e,
              !1
            );
          }
        else
          S !== i[g] && (i[g] = S, b = !0);
      }
    }
  } else {
    vi(e, t, o, i) && (b = !0);
    let a;
    for (const m in l)
      (!t || // for camelCase
      !ce(t, m) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ae(m)) === m || !ce(t, a))) && (c ? s && // for camelCase
      (s[m] !== void 0 || // for kebab-case
      s[a] !== void 0) && (o[m] = pn(
        c,
        l,
        m,
        void 0,
        e,
        !0
      )) : delete o[m]);
    if (i !== l)
      for (const m in i)
        (!t || !ce(t, m)) && (delete i[m], b = !0);
  }
  b && it(e.attrs, "set", "");
}
function vi(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if (qt(c))
        continue;
      const b = t[c];
      let a;
      o && ce(o, a = Ne(c)) ? !i || !i.includes(a) ? s[a] = b : (l || (l = {}))[a] = b : Hs(e.emitsOptions, c) || (!(c in n) || b !== n[c]) && (n[c] = b, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ re(s), b = l || pe;
    for (let a = 0; a < i.length; a++) {
      const m = i[a];
      s[m] = pn(
        o,
        c,
        m,
        b[m],
        e,
        !ce(b, m)
      );
    }
  }
  return r;
}
function pn(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const l = ce(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && te(c)) {
        const { propsDefaults: b } = o;
        if (s in b)
          n = b[s];
        else {
          const a = us(o);
          n = b[s] = c.call(
            null,
            t
          ), a();
        }
      } else
        n = c;
      o.ce && o.ce._setProp(s, n);
    }
    r[
      0
      /* shouldCast */
    ] && (i && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Ae(s)) && (n = !0));
  }
  return n;
}
const vl = /* @__PURE__ */ new WeakMap();
function xi(e, t, s = !1) {
  const n = s ? vl : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const i = e.props, r = {}, l = [];
  let c = !1;
  if (!te(e)) {
    const a = (m) => {
      c = !0;
      const [g, S] = xi(m, t, !0);
      ge(r, g), S && l.push(...S);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return de(e) && n.set(e, Pt), Pt;
  if (B(i))
    for (let a = 0; a < i.length; a++) {
      const m = Ne(i[a]);
      eo(m) && (r[m] = pe);
    }
  else if (i)
    for (const a in i) {
      const m = Ne(a);
      if (eo(m)) {
        const g = i[a], S = r[m] = B(g) || te(g) ? { type: g } : ge({}, g), d = S.type;
        let w = !1, U = !0;
        if (B(d))
          for (let Z = 0; Z < d.length; ++Z) {
            const F = d[Z], W = te(F) && F.name;
            if (W === "Boolean") {
              w = !0;
              break;
            } else W === "String" && (U = !1);
          }
        else
          w = te(d) && d.name === "Boolean";
        S[
          0
          /* shouldCast */
        ] = w, S[
          1
          /* shouldCastTrue */
        ] = U, (w || ce(S, "default")) && l.push(m);
      }
    }
  const b = [r, l];
  return de(e) && n.set(e, b), b;
}
function eo(e) {
  return e[0] !== "$" && !qt(e);
}
const Pn = (e) => e === "_" || e === "_ctx" || e === "$stable", An = (e) => B(e) ? e.map(Je) : [Je(e)], xl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Or((...o) => An(t(...o)), s);
  return n._c = !1, n;
}, yi = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (Pn(o)) continue;
    const i = e[o];
    if (te(i))
      t[o] = xl(o, i, n);
    else if (i != null) {
      const r = An(i);
      t[o] = () => r;
    }
  }
}, _i = (e, t) => {
  const s = An(t);
  e.slots.default = () => s;
}, Si = (e, t, s) => {
  for (const n in t)
    (s || !Pn(n)) && (e[n] = t[n]);
}, yl = (e, t, s) => {
  const n = e.slots = wi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Si(n, t, s), s && Io(n, "_", o, !0)) : yi(t, n);
  } else t && _i(e, t);
}, _l = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let i = !0, r = pe;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Si(o, t, s) : (i = !t.$stable, yi(t, o)), r = t;
  } else t && (_i(e, t), r = { default: 1 });
  if (i)
    for (const l in o)
      !Pn(l) && r[l] == null && delete o[l];
}, Me = zl;
function Sl(e) {
  return kl(e);
}
function kl(e, t) {
  const s = Os();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: b,
    setElementText: a,
    parentNode: m,
    nextSibling: g,
    setScopeId: S = Qe,
    insertStaticContent: d
  } = e, w = (f, p, v, k = null, x = null, y = null, P = void 0, M = null, z = !!p.dynamicChildren) => {
    if (f === p)
      return;
    f && !Ut(f, p) && (k = ds(f), G(f, x, y, !0), f = null), p.patchFlag === -2 && (z = !1, p.dynamicChildren = null);
    const { type: _, ref: K, shapeFlag: I } = p;
    switch (_) {
      case Us:
        U(f, p, v, k);
        break;
      case bt:
        Z(f, p, v, k);
        break;
      case en:
        f == null && F(p, v, k, P);
        break;
      case ae:
        q(
          f,
          p,
          v,
          k,
          x,
          y,
          P,
          M,
          z
        );
        break;
      default:
        I & 1 ? R(
          f,
          p,
          v,
          k,
          x,
          y,
          P,
          M,
          z
        ) : I & 6 ? ee(
          f,
          p,
          v,
          k,
          x,
          y,
          P,
          M,
          z
        ) : (I & 64 || I & 128) && _.process(
          f,
          p,
          v,
          k,
          x,
          y,
          P,
          M,
          z,
          Nt
        );
    }
    K != null && x ? Xt(K, f && f.ref, y, p || f, !p) : K == null && f && f.ref != null && Xt(f.ref, null, y, f, !0);
  }, U = (f, p, v, k) => {
    if (f == null)
      n(
        p.el = l(p.children),
        v,
        k
      );
    else {
      const x = p.el = f.el;
      p.children !== f.children && b(x, p.children);
    }
  }, Z = (f, p, v, k) => {
    f == null ? n(
      p.el = c(p.children || ""),
      v,
      k
    ) : p.el = f.el;
  }, F = (f, p, v, k) => {
    [f.el, f.anchor] = d(
      f.children,
      p,
      v,
      k,
      f.el,
      f.anchor
    );
  }, W = ({ el: f, anchor: p }, v, k) => {
    let x;
    for (; f && f !== p; )
      x = g(f), n(f, v, k), f = x;
    n(p, v, k);
  }, L = ({ el: f, anchor: p }) => {
    let v;
    for (; f && f !== p; )
      v = g(f), o(f), f = v;
    o(p);
  }, R = (f, p, v, k, x, y, P, M, z) => {
    if (p.type === "svg" ? P = "svg" : p.type === "math" && (P = "mathml"), f == null)
      E(
        p,
        v,
        k,
        x,
        y,
        P,
        M,
        z
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), T(
          f,
          p,
          x,
          y,
          P,
          M,
          z
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, E = (f, p, v, k, x, y, P, M) => {
    let z, _;
    const { props: K, shapeFlag: I, transition: V, dirs: Q } = f;
    if (z = f.el = r(
      f.type,
      y,
      K && K.is,
      K
    ), I & 8 ? a(z, f.children) : I & 16 && D(
      f.children,
      z,
      null,
      k,
      x,
      Zs(f, y),
      P,
      M
    ), Q && gt(f, null, k, "created"), J(z, f, f.scopeId, P, k), K) {
      for (const me in K)
        me !== "value" && !qt(me) && i(z, me, null, K[me], y, k);
      "value" in K && i(z, "value", null, K.value, y), (_ = K.onVnodeBeforeMount) && Ye(_, k, f);
    }
    Q && gt(f, null, k, "beforeMount");
    const oe = Cl(x, V);
    oe && V.beforeEnter(z), n(z, p, v), ((_ = K && K.onVnodeMounted) || oe || Q) && Me(() => {
      _ && Ye(_, k, f), oe && V.enter(z), Q && gt(f, null, k, "mounted");
    }, x);
  }, J = (f, p, v, k, x) => {
    if (v && S(f, v), k)
      for (let y = 0; y < k.length; y++)
        S(f, k[y]);
    if (x) {
      let y = x.subTree;
      if (p === y || zi(y.type) && (y.ssContent === p || y.ssFallback === p)) {
        const P = x.vnode;
        J(
          f,
          P,
          P.scopeId,
          P.slotScopeIds,
          x.parent
        );
      }
    }
  }, D = (f, p, v, k, x, y, P, M, z = 0) => {
    for (let _ = z; _ < f.length; _++) {
      const K = f[_] = M ? ot(f[_]) : Je(f[_]);
      w(
        null,
        K,
        p,
        v,
        k,
        x,
        y,
        P,
        M
      );
    }
  }, T = (f, p, v, k, x, y, P) => {
    const M = p.el = f.el;
    let { patchFlag: z, dynamicChildren: _, dirs: K } = p;
    z |= f.patchFlag & 16;
    const I = f.props || pe, V = p.props || pe;
    let Q;
    if (v && vt(v, !1), (Q = V.onVnodeBeforeUpdate) && Ye(Q, v, p, f), K && gt(p, f, v, "beforeUpdate"), v && vt(v, !0), (I.innerHTML && V.innerHTML == null || I.textContent && V.textContent == null) && a(M, ""), _ ? ne(
      f.dynamicChildren,
      _,
      M,
      v,
      k,
      Zs(p, x),
      y
    ) : P || se(
      f,
      p,
      M,
      null,
      v,
      k,
      Zs(p, x),
      y,
      !1
    ), z > 0) {
      if (z & 16)
        N(M, I, V, v, x);
      else if (z & 2 && I.class !== V.class && i(M, "class", null, V.class, x), z & 4 && i(M, "style", I.style, V.style, x), z & 8) {
        const oe = p.dynamicProps;
        for (let me = 0; me < oe.length; me++) {
          const ue = oe[me], Te = I[ue], ze = V[ue];
          (ze !== Te || ue === "value") && i(M, ue, Te, ze, x, v);
        }
      }
      z & 1 && f.children !== p.children && a(M, p.children);
    } else !P && _ == null && N(M, I, V, v, x);
    ((Q = V.onVnodeUpdated) || K) && Me(() => {
      Q && Ye(Q, v, p, f), K && gt(p, f, v, "updated");
    }, k);
  }, ne = (f, p, v, k, x, y, P) => {
    for (let M = 0; M < p.length; M++) {
      const z = f[M], _ = p[M], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === ae || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ut(z, _) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 198) ? m(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      w(
        z,
        _,
        K,
        null,
        k,
        x,
        y,
        P,
        !0
      );
    }
  }, N = (f, p, v, k, x) => {
    if (p !== v) {
      if (p !== pe)
        for (const y in p)
          !qt(y) && !(y in v) && i(
            f,
            y,
            p[y],
            null,
            x,
            k
          );
      for (const y in v) {
        if (qt(y)) continue;
        const P = v[y], M = p[y];
        P !== M && y !== "value" && i(f, y, M, P, x, k);
      }
      "value" in v && i(f, "value", p.value, v.value, x);
    }
  }, q = (f, p, v, k, x, y, P, M, z) => {
    const _ = p.el = f ? f.el : l(""), K = p.anchor = f ? f.anchor : l("");
    let { patchFlag: I, dynamicChildren: V, slotScopeIds: Q } = p;
    Q && (M = M ? M.concat(Q) : Q), f == null ? (n(_, v, k), n(K, v, k), D(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      p.children || [],
      v,
      K,
      x,
      y,
      P,
      M,
      z
    )) : I > 0 && I & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === V.length ? (ne(
      f.dynamicChildren,
      V,
      v,
      x,
      y,
      P,
      M
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (p.key != null || x && p === x.subTree) && ki(
      f,
      p,
      !0
      /* shallow */
    )) : se(
      f,
      p,
      v,
      K,
      x,
      y,
      P,
      M,
      z
    );
  }, ee = (f, p, v, k, x, y, P, M, z) => {
    p.slotScopeIds = M, f == null ? p.shapeFlag & 512 ? x.ctx.activate(
      p,
      v,
      k,
      P,
      z
    ) : we(
      p,
      v,
      k,
      x,
      y,
      P,
      z
    ) : je(f, p, z);
  }, we = (f, p, v, k, x, y, P) => {
    const M = f.component = Rl(
      f,
      k,
      x
    );
    if (ai(f) && (M.ctx.renderer = Nt), Ol(M, !1, P), M.asyncDep) {
      if (x && x.registerDep(M, le, P), !f.el) {
        const z = M.subTree = ke(bt);
        Z(null, z, p, v), f.placeholder = z.el;
      }
    } else
      le(
        M,
        f,
        p,
        v,
        x,
        y,
        P
      );
  }, je = (f, p, v) => {
    const k = p.component = f.component;
    if (hl(f, p, v))
      if (k.asyncDep && !k.asyncResolved) {
        Y(k, p, v);
        return;
      } else
        k.next = p, k.update();
    else
      p.el = f.el, k.vnode = p;
  }, le = (f, p, v, k, x, y, P) => {
    const M = () => {
      if (f.isMounted) {
        let { next: I, bu: V, u: Q, parent: oe, vnode: me } = f;
        {
          const We = Ci(f);
          if (We) {
            I && (I.el = me.el, Y(f, I, P)), We.asyncDep.then(() => {
              Me(() => {
                f.isUnmounted || _();
              }, x);
            });
            return;
          }
        }
        let ue = I, Te;
        vt(f, !1), I ? (I.el = me.el, Y(f, I, P)) : I = me, V && bs(V), (Te = I.props && I.props.onVnodeBeforeUpdate) && Ye(Te, oe, I, me), vt(f, !0);
        const ze = Qn(f), Be = f.subTree;
        f.subTree = ze, w(
          Be,
          ze,
          // parent may have changed if it's in a teleport
          m(Be.el),
          // anchor may have changed if it's in a fragment
          ds(Be),
          f,
          x,
          y
        ), I.el = ze.el, ue === null && bl(f, ze.el), Q && Me(Q, x), (Te = I.props && I.props.onVnodeUpdated) && Me(
          () => Ye(Te, oe, I, me),
          x
        );
      } else {
        let I;
        const { el: V, props: Q } = p, { bm: oe, m: me, parent: ue, root: Te, type: ze } = f, Be = Qt(p);
        vt(f, !1), oe && bs(oe), !Be && (I = Q && Q.onVnodeBeforeMount) && Ye(I, ue, p), vt(f, !0);
        {
          Te.ce && Te.ce._hasShadowRoot() && Te.ce._injectChildStyle(ze);
          const We = f.subTree = Qn(f);
          w(
            null,
            We,
            v,
            k,
            f,
            x,
            y
          ), p.el = We.el;
        }
        if (me && Me(me, x), !Be && (I = Q && Q.onVnodeMounted)) {
          const We = p;
          Me(
            () => Ye(I, ue, We),
            x
          );
        }
        (p.shapeFlag & 256 || ue && Qt(ue.vnode) && ue.vnode.shapeFlag & 256) && f.a && Me(f.a, x), f.isMounted = !0, p = v = k = null;
      }
    };
    f.scope.on();
    const z = f.effect = new No(M);
    f.scope.off();
    const _ = f.update = z.run.bind(z), K = f.job = z.runIfDirty.bind(z);
    K.i = f, K.id = f.uid, z.scheduler = () => Mn(K), vt(f, !0), _();
  }, Y = (f, p, v) => {
    p.component = f;
    const k = f.vnode.props;
    f.vnode = p, f.next = null, gl(f, p.props, k, v), _l(f, p.children, v), ct(), Bn(f), at();
  }, se = (f, p, v, k, x, y, P, M, z = !1) => {
    const _ = f && f.children, K = f ? f.shapeFlag : 0, I = p.children, { patchFlag: V, shapeFlag: Q } = p;
    if (V > 0) {
      if (V & 128) {
        Ke(
          _,
          I,
          v,
          k,
          x,
          y,
          P,
          M,
          z
        );
        return;
      } else if (V & 256) {
        De(
          _,
          I,
          v,
          k,
          x,
          y,
          P,
          M,
          z
        );
        return;
      }
    }
    Q & 8 ? (K & 16 && wt(_, x, y), I !== _ && a(v, I)) : K & 16 ? Q & 16 ? Ke(
      _,
      I,
      v,
      k,
      x,
      y,
      P,
      M,
      z
    ) : wt(_, x, y, !0) : (K & 8 && a(v, ""), Q & 16 && D(
      I,
      v,
      k,
      x,
      y,
      P,
      M,
      z
    ));
  }, De = (f, p, v, k, x, y, P, M, z) => {
    f = f || Pt, p = p || Pt;
    const _ = f.length, K = p.length, I = Math.min(_, K);
    let V;
    for (V = 0; V < I; V++) {
      const Q = p[V] = z ? ot(p[V]) : Je(p[V]);
      w(
        f[V],
        Q,
        v,
        null,
        x,
        y,
        P,
        M,
        z
      );
    }
    _ > K ? wt(
      f,
      x,
      y,
      !0,
      !1,
      I
    ) : D(
      p,
      v,
      k,
      x,
      y,
      P,
      M,
      z,
      I
    );
  }, Ke = (f, p, v, k, x, y, P, M, z) => {
    let _ = 0;
    const K = p.length;
    let I = f.length - 1, V = K - 1;
    for (; _ <= I && _ <= V; ) {
      const Q = f[_], oe = p[_] = z ? ot(p[_]) : Je(p[_]);
      if (Ut(Q, oe))
        w(
          Q,
          oe,
          v,
          null,
          x,
          y,
          P,
          M,
          z
        );
      else
        break;
      _++;
    }
    for (; _ <= I && _ <= V; ) {
      const Q = f[I], oe = p[V] = z ? ot(p[V]) : Je(p[V]);
      if (Ut(Q, oe))
        w(
          Q,
          oe,
          v,
          null,
          x,
          y,
          P,
          M,
          z
        );
      else
        break;
      I--, V--;
    }
    if (_ > I) {
      if (_ <= V) {
        const Q = V + 1, oe = Q < K ? p[Q].el : k;
        for (; _ <= V; )
          w(
            null,
            p[_] = z ? ot(p[_]) : Je(p[_]),
            v,
            oe,
            x,
            y,
            P,
            M,
            z
          ), _++;
      }
    } else if (_ > V)
      for (; _ <= I; )
        G(f[_], x, y, !0), _++;
    else {
      const Q = _, oe = _, me = /* @__PURE__ */ new Map();
      for (_ = oe; _ <= V; _++) {
        const Pe = p[_] = z ? ot(p[_]) : Je(p[_]);
        Pe.key != null && me.set(Pe.key, _);
      }
      let ue, Te = 0;
      const ze = V - oe + 1;
      let Be = !1, We = 0;
      const Vt = new Array(ze);
      for (_ = 0; _ < ze; _++) Vt[_] = 0;
      for (_ = Q; _ <= I; _++) {
        const Pe = f[_];
        if (Te >= ze) {
          G(Pe, x, y, !0);
          continue;
        }
        let qe;
        if (Pe.key != null)
          qe = me.get(Pe.key);
        else
          for (ue = oe; ue <= V; ue++)
            if (Vt[ue - oe] === 0 && Ut(Pe, p[ue])) {
              qe = ue;
              break;
            }
        qe === void 0 ? G(Pe, x, y, !0) : (Vt[qe - oe] = _ + 1, qe >= We ? We = qe : Be = !0, w(
          Pe,
          p[qe],
          v,
          null,
          x,
          y,
          P,
          M,
          z
        ), Te++);
      }
      const Ln = Be ? Tl(Vt) : Pt;
      for (ue = Ln.length - 1, _ = ze - 1; _ >= 0; _--) {
        const Pe = oe + _, qe = p[Pe], jn = p[Pe + 1], Fn = Pe + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          jn.el || Ti(jn)
        ) : k;
        Vt[_] === 0 ? w(
          null,
          qe,
          v,
          Fn,
          x,
          y,
          P,
          M,
          z
        ) : Be && (ue < 0 || _ !== Ln[ue] ? Fe(qe, v, Fn, 2) : ue--);
      }
    }
  }, Fe = (f, p, v, k, x = null) => {
    const { el: y, type: P, transition: M, children: z, shapeFlag: _ } = f;
    if (_ & 6) {
      Fe(f.component.subTree, p, v, k);
      return;
    }
    if (_ & 128) {
      f.suspense.move(p, v, k);
      return;
    }
    if (_ & 64) {
      P.move(f, p, v, Nt);
      return;
    }
    if (P === ae) {
      n(y, p, v);
      for (let I = 0; I < z.length; I++)
        Fe(z[I], p, v, k);
      n(f.anchor, p, v);
      return;
    }
    if (P === en) {
      W(f, p, v);
      return;
    }
    if (k !== 2 && _ & 1 && M)
      if (k === 0)
        M.beforeEnter(y), n(y, p, v), Me(() => M.enter(y), x);
      else {
        const { leave: I, delayLeave: V, afterLeave: Q } = M, oe = () => {
          f.ctx.isUnmounted ? o(y) : n(y, p, v);
        }, me = () => {
          y._isLeaving && y[Ur](
            !0
            /* cancelled */
          ), I(y, () => {
            oe(), Q && Q();
          });
        };
        V ? V(y, oe, me) : me();
      }
    else
      n(y, p, v);
  }, G = (f, p, v, k = !1, x = !1) => {
    const {
      type: y,
      props: P,
      ref: M,
      children: z,
      dynamicChildren: _,
      shapeFlag: K,
      patchFlag: I,
      dirs: V,
      cacheIndex: Q
    } = f;
    if (I === -2 && (x = !1), M != null && (ct(), Xt(M, null, v, f, !0), at()), Q != null && (p.renderCache[Q] = void 0), K & 256) {
      p.ctx.deactivate(f);
      return;
    }
    const oe = K & 1 && V, me = !Qt(f);
    let ue;
    if (me && (ue = P && P.onVnodeBeforeUnmount) && Ye(ue, p, f), K & 6)
      zt(f.component, v, k);
    else {
      if (K & 128) {
        f.suspense.unmount(v, k);
        return;
      }
      oe && gt(f, null, p, "beforeUnmount"), K & 64 ? f.type.remove(
        f,
        p,
        v,
        Nt,
        k
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== ae || I > 0 && I & 64) ? wt(
        _,
        p,
        v,
        !1,
        !0
      ) : (y === ae && I & 384 || !x && K & 16) && wt(z, p, v), k && C(f);
    }
    (me && (ue = P && P.onVnodeUnmounted) || oe) && Me(() => {
      ue && Ye(ue, p, f), oe && gt(f, null, p, "unmounted");
    }, v);
  }, C = (f) => {
    const { type: p, el: v, anchor: k, transition: x } = f;
    if (p === ae) {
      X(v, k);
      return;
    }
    if (p === en) {
      L(f);
      return;
    }
    const y = () => {
      o(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (f.shapeFlag & 1 && x && !x.persisted) {
      const { leave: P, delayLeave: M } = x, z = () => P(v, y);
      M ? M(f.el, y, z) : z();
    } else
      y();
  }, X = (f, p) => {
    let v;
    for (; f !== p; )
      v = g(f), o(f), f = v;
    o(p);
  }, zt = (f, p, v) => {
    const { bum: k, scope: x, job: y, subTree: P, um: M, m: z, a: _ } = f;
    to(z), to(_), k && bs(k), x.stop(), y && (y.flags |= 8, G(P, f, p, v)), M && Me(M, p), Me(() => {
      f.isUnmounted = !0;
    }, p);
  }, wt = (f, p, v, k = !1, x = !1, y = 0) => {
    for (let P = y; P < f.length; P++)
      G(f[P], p, v, k, x);
  }, ds = (f) => {
    if (f.shapeFlag & 6)
      return ds(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const p = g(f.anchor || f.el), v = p && p[Vr];
    return v ? g(v) : p;
  };
  let Ws = !1;
  const Dn = (f, p, v) => {
    let k;
    f == null ? p._vnode && (G(p._vnode, null, null, !0), k = p._vnode.component) : w(
      p._vnode || null,
      f,
      p,
      null,
      null,
      null,
      v
    ), p._vnode = f, Ws || (Ws = !0, Bn(k), ni(), Ws = !1);
  }, Nt = {
    p: w,
    um: G,
    m: Fe,
    r: C,
    mt: we,
    mc: D,
    pc: se,
    pbc: ne,
    n: ds,
    o: e
  };
  return {
    render: Dn,
    hydrate: void 0,
    createApp: al(Dn)
  };
}
function Zs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function vt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Cl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (B(n) && B(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = ot(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && ki(r, l)), l.type === Us && (l.patchFlag === -1 && (l = o[i] = ot(l)), l.el = r.el), l.type === bt && !l.el && (l.el = r.el);
    }
}
function Tl(e) {
  const t = e.slice(), s = [0];
  let n, o, i, r, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const b = e[n];
    if (b !== 0) {
      if (o = s[s.length - 1], e[o] < b) {
        t[n] = o, s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        l = i + r >> 1, e[s[l]] < b ? i = l + 1 : r = l;
      b < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; )
    s[i] = r, r = t[r];
  return s;
}
function Ci(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ci(t);
}
function to(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Ti(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Ti(t.subTree) : null;
}
const zi = (e) => e.__isSuspense;
function zl(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : Rr(e);
}
const ae = /* @__PURE__ */ Symbol.for("v-fgt"), Us = /* @__PURE__ */ Symbol.for("v-txt"), bt = /* @__PURE__ */ Symbol.for("v-cmt"), en = /* @__PURE__ */ Symbol.for("v-stc"), es = [];
let Ie = null;
function $(e = !1) {
  es.push(Ie = e ? null : []);
}
function Ml() {
  es.pop(), Ie = es[es.length - 1] || null;
}
let is = 1;
function so(e, t = !1) {
  is += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function Mi(e) {
  return e.dynamicChildren = is > 0 ? Ie || Pt : null, Ml(), is > 0 && Ie && Ie.push(e), e;
}
function A(e, t, s, n, o, i) {
  return Mi(
    u(
      e,
      t,
      s,
      n,
      o,
      i,
      !0
    )
  );
}
function rs(e, t, s, n, o) {
  return Mi(
    ke(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function $i(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ut(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, ws = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ve(e) || /* @__PURE__ */ be(e) || te(e) ? { i: Le, r: e, k: t, f: !!s } : e : null);
function u(e, t = null, s = null, n = 0, o = null, i = e === ae ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ei(t),
    ref: t && ws(t),
    scopeId: ii,
    slotScopeIds: null,
    children: s,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Le
  };
  return l ? (In(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= ve(s) ? 8 : 16), is > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Ie && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && Ie.push(c), c;
}
const ke = $l;
function $l(e, t = null, s = null, n = 0, o = null, i = !1) {
  if ((!e || e === tl) && (e = bt), $i(e)) {
    const l = Dt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && In(l, s), is > 0 && !i && Ie && (l.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = l : Ie.push(l)), l.patchFlag = -2, l;
  }
  if (Fl(e) && (e = e.__vccOpts), t) {
    t = El(t);
    let { class: l, style: c } = t;
    l && !ve(l) && (t.class = H(l)), de(c) && (/* @__PURE__ */ js(c) && !B(c) && (c = ge({}, c)), t.style = Ct(c));
  }
  const r = ve(e) ? 1 : zi(e) ? 128 : Hr(e) ? 64 : de(e) ? 4 : te(e) ? 2 : 0;
  return u(
    e,
    t,
    s,
    n,
    o,
    r,
    i,
    !0
  );
}
function El(e) {
  return e ? /* @__PURE__ */ js(e) || gi(e) ? ge({}, e) : e : null;
}
function Dt(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = e, b = t ? Pl(o || {}, t) : o, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: b,
    key: b && Ei(b),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? B(i) ? i.concat(ws(t)) : [i, ws(t)] : ws(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ae ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Dt(e.ssContent),
    ssFallback: e.ssFallback && Dt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && $n(
    a,
    c.clone(a)
  ), a;
}
function Lt(e = " ", t = 0) {
  return ke(Us, null, e, t);
}
function ie(e = "", t = !1) {
  return t ? ($(), rs(bt, null, e)) : ke(bt, null, e);
}
function Je(e) {
  return e == null || typeof e == "boolean" ? ke(bt) : B(e) ? ke(
    ae,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : $i(e) ? ot(e) : ke(Us, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Dt(e);
}
function In(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (B(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), In(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !gi(t) ? t._ctx = Le : o === 3 && Le && (Le.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else te(t) ? (t = { default: t, _ctx: Le }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Lt(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Pl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = H([t.class, n.class]));
      else if (o === "style")
        t.style = Ct([t.style, n.style]);
      else if ($s(o)) {
        const i = t[o], r = n[o];
        r && i !== r && !(B(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Ye(e, t, s, n = null) {
  et(e, t, 7, [
    s,
    n
  ]);
}
const Al = pi();
let Il = 0;
function Rl(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Al, i = {
    uid: Il++,
    vnode: e,
    type: n,
    parent: t,
    appContext: o,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Lo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: xi(n, o),
    emitsOptions: mi(n, o),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: pe,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: pe,
    data: pe,
    props: pe,
    attrs: pe,
    slots: pe,
    refs: pe,
    setupState: pe,
    setupContext: null,
    // suspense related
    suspense: s,
    suspenseId: s ? s.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = ul.bind(null, i), e.ce && e.ce(i), i;
}
let Ce = null;
const Pi = () => Ce || Le;
let Cs, mn;
{
  const e = Os(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  Cs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ce = s
  ), mn = t(
    "__VUE_SSR_SETTERS__",
    (s) => ls = s
  );
}
const us = (e) => {
  const t = Ce;
  return Cs(e), e.scope.on(), () => {
    e.scope.off(), Cs(t);
  };
}, no = () => {
  Ce && Ce.scope.off(), Cs(null);
};
function Ai(e) {
  return e.vnode.shapeFlag & 4;
}
let ls = !1;
function Ol(e, t = !1, s = !1) {
  t && mn(t);
  const { props: n, children: o } = e.vnode, i = Ai(e);
  wl(e, n, i, t), yl(e, o, s || t);
  const r = i ? Dl(e, t) : void 0;
  return t && mn(!1), r;
}
function Dl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, sl);
  const { setup: n } = s;
  if (n) {
    ct();
    const o = e.setupContext = n.length > 1 ? jl(e) : null, i = us(e), r = fs(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Eo(r);
    if (at(), i(), (l || e.sp) && !Qt(e) && ci(e), l) {
      if (r.then(no, no), t)
        return r.then((c) => {
          oo(e, c);
        }).catch((c) => {
          Fs(c, e, 0);
        });
      e.asyncDep = r;
    } else
      oo(e, r);
  } else
    Ii(e);
}
function oo(e, t, s) {
  te(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = ei(t)), Ii(e);
}
function Ii(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Qe);
  {
    const o = us(e);
    ct();
    try {
      nl(e);
    } finally {
      at(), o();
    }
  }
}
const Ll = {
  get(e, t) {
    return ye(e, "get", ""), e[t];
  }
};
function jl(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ll),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ks(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ei(zn(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Zt)
        return Zt[s](e);
    },
    has(t, s) {
      return s in t || s in Zt;
    }
  })) : e.proxy;
}
function Fl(e) {
  return te(e) && "__vccOpts" in e;
}
const fe = (e, t) => /* @__PURE__ */ $r(e, t, ls), Nl = "3.5.28";
/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let hn;
const io = typeof window < "u" && window.trustedTypes;
if (io)
  try {
    hn = /* @__PURE__ */ io.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ri = hn ? (e) => hn.createHTML(e) : (e) => e, Vl = "http://www.w3.org/2000/svg", Hl = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, ro = nt && /* @__PURE__ */ nt.createElement("template"), Ul = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? nt.createElementNS(Vl, e) : t === "mathml" ? nt.createElementNS(Hl, e) : s ? nt.createElement(e, { is: s }) : nt.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => nt.createTextNode(e),
  createComment: (e) => nt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => nt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, o, i) {
    const r = s ? s.previousSibling : t.lastChild;
    if (o && (o === i || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); )
        ;
    else {
      ro.innerHTML = Ri(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ro.content;
      if (n === "svg" || n === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, s);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      s ? s.previousSibling : t.lastChild
    ];
  }
}, Kl = /* @__PURE__ */ Symbol("_vtc");
function Bl(e, t, s) {
  const n = e[Kl];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Ts = /* @__PURE__ */ Symbol("_vod"), Oi = /* @__PURE__ */ Symbol("_vsh"), tn = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: s }) {
    e[Ts] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : Kt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), Kt(e, !0), n.enter(e)) : n.leave(e, () => {
      Kt(e, !1);
    }) : Kt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Kt(e, t);
  }
};
function Kt(e, t) {
  e.style.display = t ? e[Ts] : "none", e[Oi] = !t;
}
const Wl = /* @__PURE__ */ Symbol(""), ql = /(?:^|;)\s*display\s*:/;
function Yl(e, t, s) {
  const n = e.style, o = ve(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (ve(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && gs(n, l, "");
        }
      else
        for (const r in t)
          s[r] == null && gs(n, r, "");
    for (const r in s)
      r === "display" && (i = !0), gs(n, r, s[r]);
  } else if (o) {
    if (t !== s) {
      const r = n[Wl];
      r && (s += ";" + r), n.cssText = s, i = ql.test(s);
    }
  } else t && e.removeAttribute("style");
  Ts in e && (e[Ts] = i ? n.display : "", e[Oi] && (n.display = "none"));
}
const lo = /\s*!important$/;
function gs(e, t, s) {
  if (B(s))
    s.forEach((n) => gs(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Gl(e, t);
    lo.test(s) ? e.setProperty(
      Ae(n),
      s.replace(lo, ""),
      "important"
    ) : e[n] = s;
  }
}
const co = ["Webkit", "Moz", "ms"], sn = {};
function Gl(e, t) {
  const s = sn[t];
  if (s)
    return s;
  let n = Ne(t);
  if (n !== "filter" && n in e)
    return sn[t] = n;
  n = Ao(n);
  for (let o = 0; o < co.length; o++) {
    const i = co[o] + n;
    if (i in e)
      return sn[t] = i;
  }
  return t;
}
const ao = "http://www.w3.org/1999/xlink";
function fo(e, t, s, n, o, i = Qi(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(ao, t.slice(6, t.length)) : e.setAttributeNS(ao, t, s) : s == null || i && !Ro(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Ze(s) ? String(s) : s
  );
}
function uo(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Ri(s) : s);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(s);
    (l !== c || !("_value" in e)) && (e.value = c), s == null && e.removeAttribute(t), e._value = s;
    return;
  }
  let r = !1;
  if (s === "" || s == null) {
    const l = typeof e[t];
    l === "boolean" ? s = Ro(s) : s == null && l === "string" ? (s = "", r = !0) : l === "number" && (s = 0, r = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  r && e.removeAttribute(o || t);
}
function yt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Jl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const po = /* @__PURE__ */ Symbol("_vei");
function Xl(e, t, s, n, o = null) {
  const i = e[po] || (e[po] = {}), r = i[t];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = Ql(t);
    if (n) {
      const b = i[t] = tc(
        n,
        o
      );
      yt(e, l, b, c);
    } else r && (Jl(e, l, r, c), i[t] = void 0);
  }
}
const mo = /(?:Once|Passive|Capture)$/;
function Ql(e) {
  let t;
  if (mo.test(e)) {
    t = {};
    let n;
    for (; n = e.match(mo); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ae(e.slice(2)), t];
}
let nn = 0;
const Zl = /* @__PURE__ */ Promise.resolve(), ec = () => nn || (Zl.then(() => nn = 0), nn = Date.now());
function tc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    et(
      sc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = ec(), s;
}
function sc(e, t) {
  if (B(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const ho = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, nc = (e, t, s, n, o, i) => {
  const r = o === "svg";
  t === "class" ? Bl(e, n, r) : t === "style" ? Yl(e, s, n) : $s(t) ? vn(t) || Xl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : oc(e, t, n, r)) ? (uo(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fo(e, t, n, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ve(n)) ? uo(e, Ne(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), fo(e, t, n, r));
};
function oc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ho(t) && te(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return ho(t) && ve(s) ? !1 : t in e;
}
const bo = {};
// @__NO_SIDE_EFFECTS__
function Of(e, t, s) {
  let n = /* @__PURE__ */ tt(e, t);
  Ps(n) && (n = ge({}, n, t));
  class o extends Rn {
    constructor(r) {
      super(n, r, s);
    }
  }
  return o.def = n, o;
}
const ic = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Rn extends ic {
  constructor(t, s = {}, n = yo) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== yo ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      ge({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Rn) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, Tt(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const s of t)
      this._setAttr(s.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let n = 0; n < this.attributes.length; n++)
      this._setAttr(this.attributes[n].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (n, o = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: i, styles: r } = n;
      let l;
      if (i && !B(i))
        for (const c in i) {
          const b = i[c];
          (b === Number || b && b.type === Number) && (c in this._props && (this._props[c] = Vn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[Ne(c)] = !0);
        }
      this._numberProps = l, this._resolveProps(n), this.shadowRoot && this._applyStyles(r), this._mount(n);
    }, s = this._def.__asyncLoader;
    s ? this._pendingResolve = s().then((n) => {
      n.configureApp = this._def.configureApp, t(this._def = n, !0);
    }) : t(this._def);
  }
  _mount(t) {
    this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const s = this._instance && this._instance.exposed;
    if (s)
      for (const n in s)
        ce(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => h(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = B(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(Ne))
      Object.defineProperty(this, o, {
        get() {
          return this._getProp(o);
        },
        set(i) {
          this._setProp(o, i, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : bo;
    const o = Ne(t);
    s && this._numberProps && this._numberProps[o] && (n = Vn(n)), this._setProp(o, n, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, s, n = !0, o = !1) {
    if (s !== this._props[t] && (this._dirty = !0, s === bo ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), o && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(Ae(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ae(t), s + "") : s || this.removeAttribute(Ae(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), uc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = ke(this._def, ge(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (i, r) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            Ps(r[0]) ? ge({ detail: r }, r[0]) : { detail: r }
          )
        );
      };
      n.emit = (i, ...r) => {
        o(i, r), Ae(i) !== i && o(Ae(i), r);
      }, this._setParent();
    }), s;
  }
  _applyStyles(t, s) {
    if (!t) return;
    if (s) {
      if (s === this._def || this._styleChildren.has(s))
        return;
      this._styleChildren.add(s);
    }
    const n = this._nonce;
    for (let o = t.length - 1; o >= 0; o--) {
      const i = document.createElement("style");
      n && i.setAttribute("nonce", n), i.textContent = t[o], this.shadowRoot.prepend(i);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let s;
    for (; s = this.firstChild; ) {
      const n = s.nodeType === 1 && s.getAttribute("slot") || "default";
      (t[n] || (t[n] = [])).push(s), this.removeChild(s);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), s = this._instance.type.__scopeId;
    for (let n = 0; n < t.length; n++) {
      const o = t[n], i = o.getAttribute("name") || "default", r = this._slots[i], l = o.parentNode;
      if (r)
        for (const c of r) {
          if (s && c.nodeType === 1) {
            const b = s + "-s", a = document.createTreeWalker(c, 1);
            c.setAttribute(b, "");
            let m;
            for (; m = a.nextNode(); )
              m.setAttribute(b, "");
          }
          l.insertBefore(c, o);
        }
      else
        for (; o.firstChild; ) l.insertBefore(o.firstChild, o);
      l.removeChild(o);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    this._teleportTargets && t.push(...this._teleportTargets);
    const s = /* @__PURE__ */ new Set();
    for (const n of t) {
      const o = n.querySelectorAll("slot");
      for (let i = 0; i < o.length; i++)
        s.add(o[i]);
    }
    return Array.from(s);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  /**
   * @internal
   */
  _hasShadowRoot() {
    return this._def.shadowRoot !== !1;
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
  }
}
const zs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return B(t) ? (s) => bs(t, s) : t;
};
function rc(e) {
  e.target.composing = !0;
}
function wo(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Rt = /* @__PURE__ */ Symbol("_assign");
function go(e, t, s) {
  return t && (e = e.trim()), s && (e = Rs(e)), e;
}
const Di = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[Rt] = zs(o);
    const i = n || o.props && o.props.type === "number";
    yt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Rt](go(e.value, s, i));
    }), (s || i) && yt(e, "change", () => {
      e.value = go(e.value, s, i);
    }), t || (yt(e, "compositionstart", rc), yt(e, "compositionend", wo), yt(e, "change", wo));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, r) {
    if (e[Rt] = zs(r), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Rs(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === c) || (e.value = c));
  }
}, Wt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Es(t);
    yt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? Rs(Ms(r)) : Ms(r)
      );
      e[Rt](
        e.multiple ? o ? new Set(i) : i : i[0]
      ), e._assigning = !0, Tt(() => {
        e._assigning = !1;
      });
    }), e[Rt] = zs(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    vo(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Rt] = zs(s);
  },
  updated(e, { value: t }) {
    e._assigning || vo(e, t);
  }
};
function vo(e, t) {
  const s = e.multiple, n = B(t);
  if (!(s && !n && !Es(t))) {
    for (let o = 0, i = e.options.length; o < i; o++) {
      const r = e.options[o], l = Ms(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = t.some((b) => String(b) === String(l)) : r.selected = er(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (as(Ms(r), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ms(e) {
  return "_value" in e ? e._value : e.value;
}
const lc = ["ctrl", "shift", "alt", "meta"], cc = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => lc.some((s) => e[`${s}Key`] && !t.includes(s))
}, Re = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = cc[t[r]];
      if (l && l(o, t)) return;
    }
    return e(o, ...i);
  }));
}, ac = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, jt = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = ((o) => {
    if (!("key" in o))
      return;
    const i = Ae(o.key);
    if (t.some(
      (r) => r === i || ac[r] === i
    ))
      return e(o);
  }));
}, fc = /* @__PURE__ */ ge({ patchProp: nc }, Ul);
let xo;
function Li() {
  return xo || (xo = Sl(fc));
}
const uc = ((...e) => {
  Li().render(...e);
}), yo = ((...e) => {
  const t = Li().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = pc(n);
    if (!o) return;
    const i = t._component;
    !te(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, dc(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
});
function dc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function pc(e) {
  return ve(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let ji;
const Bs = (e) => ji = e, Fi = (
  /* istanbul ignore next */
  Symbol()
);
function bn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ts;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ts || (ts = {}));
function Df() {
  const e = jo(!0), t = e.run(() => /* @__PURE__ */ O({}));
  let s = [], n = [];
  const o = zn({
    install(i) {
      Bs(o), o._a = i, i.provide(Fi, o), i.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
    },
    use(i) {
      return this._a ? s.push(i) : n.push(i), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return o;
}
const Ni = () => {
};
function _o(e, t, s, n = Ni) {
  e.push(t);
  const o = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), n());
  };
  return !s && Fo() && tr(o), o;
}
function $t(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const mc = (e) => e(), So = Symbol(), on = Symbol();
function wn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], o = e[s];
    bn(o) && bn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ be(n) && !/* @__PURE__ */ lt(n) ? e[s] = wn(o, n) : e[s] = n;
  }
  return e;
}
const hc = (
  /* istanbul ignore next */
  Symbol()
);
function bc(e) {
  return !bn(e) || !e.hasOwnProperty(hc);
}
const { assign: dt } = Object;
function wc(e) {
  return !!(/* @__PURE__ */ be(e) && e.effect);
}
function gc(e, t, s, n) {
  const { state: o, actions: i, getters: r } = t, l = s.state.value[e];
  let c;
  function b() {
    l || (s.state.value[e] = o ? o() : {});
    const a = /* @__PURE__ */ Cr(s.state.value[e]);
    return dt(a, i, Object.keys(r || {}).reduce((m, g) => (m[g] = zn(fe(() => {
      Bs(s);
      const S = s._s.get(e);
      return r[g].call(S, S);
    })), m), {}));
  }
  return c = Vi(e, b, t, s, n, !0), c;
}
function Vi(e, t, s = {}, n, o, i) {
  let r;
  const l = dt({ actions: {} }, s), c = { deep: !0 };
  let b, a, m = [], g = [], S;
  const d = n.state.value[e];
  !i && !d && (n.state.value[e] = {});
  let w;
  function U(D) {
    let T;
    b = a = !1, typeof D == "function" ? (D(n.state.value[e]), T = {
      type: ts.patchFunction,
      storeId: e,
      events: S
    }) : (wn(n.state.value[e], D), T = {
      type: ts.patchObject,
      payload: D,
      storeId: e,
      events: S
    });
    const ne = w = Symbol();
    Tt().then(() => {
      w === ne && (b = !0);
    }), a = !0, $t(m, T, n.state.value[e]);
  }
  const Z = i ? function() {
    const { state: T } = s, ne = T ? T() : {};
    this.$patch((N) => {
      dt(N, ne);
    });
  } : (
    /* istanbul ignore next */
    Ni
  );
  function F() {
    r.stop(), m = [], g = [], n._s.delete(e);
  }
  const W = (D, T = "") => {
    if (So in D)
      return D[on] = T, D;
    const ne = function() {
      Bs(n);
      const N = Array.from(arguments), q = [], ee = [];
      function we(Y) {
        q.push(Y);
      }
      function je(Y) {
        ee.push(Y);
      }
      $t(g, {
        args: N,
        name: ne[on],
        store: R,
        after: we,
        onError: je
      });
      let le;
      try {
        le = D.apply(this && this.$id === e ? this : R, N);
      } catch (Y) {
        throw $t(ee, Y), Y;
      }
      return le instanceof Promise ? le.then((Y) => ($t(q, Y), Y)).catch((Y) => ($t(ee, Y), Promise.reject(Y))) : ($t(q, le), le);
    };
    return ne[So] = !0, ne[on] = T, ne;
  }, L = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: _o.bind(null, g),
    $patch: U,
    $reset: Z,
    $subscribe(D, T = {}) {
      const ne = _o(m, D, T.detached, () => N()), N = r.run(() => Jt(() => n.state.value[e], (q) => {
        (T.flush === "sync" ? a : b) && D({
          storeId: e,
          type: ts.direct,
          events: S
        }, q);
      }, dt({}, c, T)));
      return ne;
    },
    $dispose: F
  }, R = /* @__PURE__ */ Ls(L);
  n._s.set(e, R);
  const J = (n._a && n._a.runWithContext || mc)(() => n._e.run(() => (r = jo()).run(() => t({ action: W }))));
  for (const D in J) {
    const T = J[D];
    if (/* @__PURE__ */ be(T) && !wc(T) || /* @__PURE__ */ lt(T))
      i || (d && bc(T) && (/* @__PURE__ */ be(T) ? T.value = d[D] : wn(T, d[D])), n.state.value[e][D] = T);
    else if (typeof T == "function") {
      const ne = W(T, D);
      J[D] = ne, l.actions[D] = T;
    }
  }
  return dt(R, J), dt(/* @__PURE__ */ re(R), J), Object.defineProperty(R, "$state", {
    get: () => n.state.value[e],
    set: (D) => {
      U((T) => {
        dt(T, D);
      });
    }
  }), n._p.forEach((D) => {
    dt(R, r.run(() => D({
      store: R,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), d && i && s.hydrate && s.hydrate(R.$state, d), b = !0, a = !0, R;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function vc(e, t, s) {
  let n, o;
  const i = typeof t == "function";
  n = e, o = i ? s : t;
  function r(l, c) {
    const b = Lr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (b ? St(Fi, null) : null), l && Bs(l), l = ji, l._s.has(n) || (i ? Vi(n, t, o, l) : gc(n, o, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
const Ee = /* @__PURE__ */ vc("widget", () => {
  const e = /* @__PURE__ */ O({
    endpoint: "",
    issuesEndpoint: "",
    actionEndpoint: "",
    cancelEndpoint: "",
    repo: "",
    labels: "",
    storageKey: "thoughts"
  }), t = /* @__PURE__ */ O("text"), s = /* @__PURE__ */ O("right"), n = /* @__PURE__ */ O("bottom"), o = /* @__PURE__ */ O(""), i = /* @__PURE__ */ O("text"), r = /* @__PURE__ */ O("medium"), l = /* @__PURE__ */ O("default"), c = /* @__PURE__ */ O("ocean"), b = /* @__PURE__ */ O(""), a = /* @__PURE__ */ O(""), m = /* @__PURE__ */ O("manual"), g = /* @__PURE__ */ O("idle"), S = /* @__PURE__ */ O(!1), d = /* @__PURE__ */ O(0), w = /* @__PURE__ */ O("technical_issue"), U = /* @__PURE__ */ O({}), Z = /* @__PURE__ */ O({
    shortLeft: "done_archive",
    shortRight: "pin_unpin",
    longLeft: "create_linked_item",
    longRight: "comment"
  }), F = /* @__PURE__ */ O([]), W = /* @__PURE__ */ O(!1), L = /* @__PURE__ */ O(!1), R = /* @__PURE__ */ O("active"), E = /* @__PURE__ */ O("updated_desc"), J = /* @__PURE__ */ O(""), D = /* @__PURE__ */ O([]), T = /* @__PURE__ */ O(!1), ne = /* @__PURE__ */ O(""), N = /* @__PURE__ */ O(""), q = /* @__PURE__ */ O(!1), ee = /* @__PURE__ */ O(!1), we = /* @__PURE__ */ O(null), je = /* @__PURE__ */ O(""), le = /* @__PURE__ */ O("");
  function Y(se) {
    e.value = se, t.value = "text", i.value = "text";
  }
  return {
    config: e,
    mobileTab: t,
    handedness: s,
    panelSnap: n,
    adminToken: o,
    composeMode: i,
    fontSize: r,
    density: l,
    theme: c,
    draftTitle: b,
    draftDescription: a,
    draftMergePolicy: m,
    voiceDraftState: g,
    voiceDraftReady: S,
    voiceDraftDurationMs: d,
    mode: w,
    itemViews: U,
    swipeMapping: Z,
    issues: F,
    issuesLoaded: W,
    loadingIssues: L,
    listView: R,
    listSort: E,
    listQuery: J,
    listStatusFilter: D,
    creating: T,
    createError: ne,
    listError: N,
    textCreateSuccess: q,
    voiceCreateSuccess: ee,
    lastSubmissionId: we,
    lastTextTitle: je,
    lastTextDescription: le,
    init: Y
  };
});
function Ue() {
  const e = Ee();
  function t() {
    return e.config.storageKey + ":widget-state";
  }
  function s(i) {
    const r = String(i ?? ""), l = r.trim();
    return l ? l.toUpperCase().startsWith("URL: ") && !l.includes(`
`) ? "" : r : "";
  }
  function n() {
    try {
      const i = localStorage.getItem(t());
      if (!i) return;
      const r = JSON.parse(i);
      if (!r || typeof r != "object") return;
      r.composeMode === "text" || r.composeMode === "voice" ? e.composeMode = r.composeMode : r.captureMode === "voice" ? e.composeMode = "voice" : r.captureMode === "text" && (e.composeMode = "text"), ["text", "list", "settings"].includes(r.mobileTab) ? e.mobileTab = r.mobileTab : (r.mobileTab === "requests" || r.activeTab === "requests") && (e.mobileTab = "list"), Array.isArray(r.issues) && (e.issues = r.issues), e.issuesLoaded = !!r.issuesLoaded, ["active", "needs_action", "completed", "all"].includes(r.listView) && (e.listView = r.listView), (r.listSort === "updated_desc" || r.listSort === "updated_asc") && (e.listSort = r.listSort), typeof r.draftTitle == "string" && (e.draftTitle = r.draftTitle), typeof r.draftDescription == "string" && (e.draftDescription = s(r.draftDescription)), (r.draftMergePolicy === "auto_unblocked" || r.draftMergePolicy === "manual") && (e.draftMergePolicy = r.draftMergePolicy), (r.handedness === "left" || r.handedness === "right") && (e.handedness = r.handedness), (r.panelSnap === "top" || r.panelSnap === "middle" || r.panelSnap === "bottom") && (e.panelSnap = r.panelSnap), ["small", "medium", "large"].includes(r.fontSize) && (e.fontSize = r.fontSize), ["compact", "default", "comfortable"].includes(r.density) && (e.density = r.density), ["ocean", "forest", "berry", "sunset"].includes(r.theme) && (e.theme = r.theme), ["technical_issue", "personal_todo", "feature_request"].includes(r.mode) && (e.mode = r.mode), r.swipeMapping && typeof r.swipeMapping == "object" && (e.swipeMapping = { ...e.swipeMapping, ...r.swipeMapping }), r.itemViews && typeof r.itemViews == "object" && (e.itemViews = { ...e.itemViews, ...r.itemViews });
    } catch {
    }
  }
  function o() {
    try {
      localStorage.setItem(t(), JSON.stringify({
        mobileTab: e.mobileTab,
        composeMode: e.composeMode,
        issues: e.issues,
        issuesLoaded: e.issuesLoaded,
        listView: e.listView,
        listSort: e.listSort,
        draftTitle: e.draftTitle,
        draftDescription: e.draftDescription,
        draftMergePolicy: e.draftMergePolicy,
        handedness: e.handedness,
        panelSnap: e.panelSnap,
        fontSize: e.fontSize,
        density: e.density,
        theme: e.theme,
        mode: e.mode,
        swipeMapping: e.swipeMapping,
        itemViews: e.itemViews
      }));
    } catch {
    }
  }
  return { restore: n, persist: o };
}
function Hi() {
  const e = St("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    readToken: e.readToken,
    requireToken: e.requireToken,
    promptToken: e.promptToken,
    clearToken: e.clearToken
  };
}
function On() {
  const e = Ee(), { persist: t } = Ue();
  let s = 0;
  function n(i) {
    s = i.touches[0].clientY;
  }
  function o(i) {
    const r = i.changedTouches[0].clientY - s;
    r > 40 ? e.panelSnap === "top" ? (e.panelSnap = "middle", t()) : e.panelSnap === "middle" && (e.panelSnap = "bottom", t()) : r < -40 && (e.panelSnap === "bottom" ? (e.panelSnap = "middle", t()) : e.panelSnap === "middle" && (e.panelSnap = "top", t()));
  }
  return { onPanelTouchStart: n, onPanelTouchEnd: o };
}
function Ft() {
  const e = St("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    authorize: e.authorize,
    hasAccess: e.hasAccess,
    loadIssues: e.loadIssues,
    submitText: e.submitText,
    submitVoice: e.submitVoice,
    executeAction: e.executeAction,
    cancelSubmission: e.cancelSubmission,
    mapActionError: e.mapActionError,
    getIssueUrlFromCreateResponse: e.getIssueUrlFromCreateResponse,
    submitComment: e.submitComment,
    createLinkedItem: e.createLinkedItem
  };
}
const xc = 10;
function yc() {
  const e = Ee(), { persist: t } = Ue(), { submitText: s, cancelSubmission: n, loadIssues: o } = Ft(), i = /* @__PURE__ */ O(0);
  let r = null;
  function l() {
    r !== null && (clearInterval(r), r = null), i.value = 0;
  }
  function c() {
    l(), e.lastSubmissionId && (i.value = xc, r = setInterval(() => {
      i.value -= 1, i.value <= 0 && l();
    }, 1e3));
  }
  async function b(g) {
    if (e.creating) return;
    const S = e.draftDescription.trim();
    if (!S) {
      e.createError = "Please provide a description.";
      return;
    }
    let d = e.draftTitle.trim();
    if (!d) {
      const w = S.split(`
`)[0];
      d = w.length > 50 ? w.slice(0, 50) + "..." : w;
    }
    e.createError = "", e.creating = !0;
    try {
      const w = await s(d, S, g);
      e.lastSubmissionId = typeof (w == null ? void 0 : w.submissionId) == "string" ? w.submissionId : null, e.lastTextTitle = d, e.lastTextDescription = e.draftDescription, e.draftTitle = "", e.draftDescription = "", e.textCreateSuccess = !0, c(), o(!0), t();
    } catch (w) {
      e.createError = w instanceof Error ? w.message : "Failed to create request";
    } finally {
      e.creating = !1;
    }
  }
  async function a() {
    if (!e.lastSubmissionId) return;
    const g = e.lastSubmissionId;
    await n(g), e.lastSubmissionId = null, e.textCreateSuccess = !1, e.draftTitle = e.lastTextTitle, e.draftDescription = e.lastTextDescription, l(), t();
  }
  function m() {
    e.textCreateSuccess = !1, l();
  }
  return {
    undoSecondsLeft: i,
    submit: b,
    undo: a,
    reset: m,
    stopUndoCountdown: l
  };
}
function _c() {
  let e = null, t = null, s = [], n = "";
  const o = /* @__PURE__ */ O(!1);
  function i() {
    const d = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", ""];
    for (const w of d) {
      if (!w) return "";
      if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(w)) return w;
    }
    return "";
  }
  async function r() {
    var d;
    if (!((d = navigator.mediaDevices) != null && d.getUserMedia))
      throw new Error("Microphone recording is not supported in this browser.");
    return (!t || !t.active) && (t = await navigator.mediaDevices.getUserMedia({ audio: !0 })), t;
  }
  async function l() {
    if (e && e.state !== "inactive") return e;
    const d = await r();
    return n = i(), e = n ? new MediaRecorder(d, { mimeType: n }) : new MediaRecorder(d), e.ondataavailable = (w) => {
      var U;
      ((U = w.data) == null ? void 0 : U.size) > 0 && (s.push(w.data), o.value = !0);
    }, e;
  }
  async function c() {
    !e || e.state === "inactive" || await new Promise((d) => {
      let w = !1;
      const U = () => {
        w || (w = !0, d());
      };
      e.addEventListener("dataavailable", U, { once: !0 });
      try {
        e.requestData(), window.setTimeout(U, 250);
      } catch {
        U();
      }
    });
  }
  async function b() {
    const d = await l();
    if (d.state === "paused") {
      d.resume();
      return;
    }
    d.state === "inactive" && d.start(1e3);
  }
  async function a() {
    !e || e.state !== "recording" || (await c(), e.pause());
  }
  async function m() {
    return await c(), s.length ? new Blob(s, { type: n || "audio/webm" }) : null;
  }
  async function g() {
    e && e.state !== "inactive" && e.stop(), t == null || t.getTracks().forEach((d) => d.stop()), e = null, t = null, s = [], n = "", o.value = !1;
  }
  function S() {
    return n;
  }
  return { start: b, pause: a, exportRecording: m, reset: g, hasContent: o, getMimeType: S };
}
const Sc = 10;
function kc() {
  const e = Ee(), { persist: t } = Ue(), { submitVoice: s, cancelSubmission: n, loadIssues: o } = Ft(), i = _c(), r = /* @__PURE__ */ O(0);
  let l = null, c = null;
  function b() {
    c !== null && (clearInterval(c), c = null);
  }
  function a() {
    b(), c = setInterval(() => {
      e.voiceDraftDurationMs += 1e3, t();
    }, 1e3);
  }
  function m() {
    l !== null && (clearInterval(l), l = null), r.value = 0;
  }
  function g() {
    m(), e.lastSubmissionId && (r.value = Sc, l = setInterval(() => {
      r.value -= 1, r.value <= 0 && m();
    }, 1e3));
  }
  async function S() {
    e.createError = "";
    try {
      e.voiceDraftState === "recording" ? (await i.pause(), e.voiceDraftState = "paused", e.voiceDraftReady = i.hasContent.value, b()) : (await i.start(), e.voiceDraftState = "recording", e.voiceDraftReady = i.hasContent.value, a()), t();
    } catch (F) {
      e.createError = F instanceof Error ? F.message : "Failed to access microphone";
    }
  }
  async function d() {
    b(), await i.reset(), e.voiceDraftState = "idle", e.voiceDraftReady = !1, e.voiceDraftDurationMs = 0, e.createError = "", t();
  }
  async function w() {
    if (!e.voiceDraftReady) return;
    const F = await i.exportRecording();
    if (!F || F.size < 1) {
      e.createError = "No recorded audio available yet.";
      return;
    }
    e.createError = "", e.creating = !0;
    try {
      const W = await s(F, i.getMimeType(), e.voiceDraftDurationMs);
      e.lastSubmissionId = typeof (W == null ? void 0 : W.submissionId) == "string" ? W.submissionId : null, await d(), e.voiceCreateSuccess = !0, g(), o(!0), t();
    } catch (W) {
      e.createError = W instanceof Error ? W.message : "Failed to submit voice request";
    } finally {
      e.creating = !1;
    }
  }
  async function U() {
    if (!e.lastSubmissionId) return;
    const F = e.lastSubmissionId;
    await n(F), e.lastSubmissionId = null, e.voiceCreateSuccess = !1, m(), t();
  }
  function Z() {
    e.voiceCreateSuccess = !1, m();
  }
  return {
    undoSecondsLeft: r,
    toggleRecording: S,
    reset: d,
    submit: w,
    undo: U,
    dismissSuccess: Z,
    stopVoiceTimer: b,
    stopUndoCountdown: m
  };
}
function Cc() {
  const e = /* @__PURE__ */ O(!1), t = /* @__PURE__ */ O(null), s = /* @__PURE__ */ O(!1);
  function n(r) {
    t.value = r, s.value = !1, e.value = !0;
  }
  function o() {
    t.value = null, s.value = !0, e.value = !0;
  }
  function i() {
    e.value = !1, setTimeout(() => {
      t.value = null, s.value = !1;
    }, 260);
  }
  return {
    sheetOpen: e,
    sheetIssue: t,
    filterMode: s,
    openIssue: n,
    openFilter: o,
    close: i
  };
}
const Tc = 40;
function zc() {
  const e = Ee(), { persist: t } = Ue(), s = /* @__PURE__ */ O(!1), n = /* @__PURE__ */ O(!1);
  let o = 0;
  const i = fe(() => e.handedness === "left" ? { left: "10px", right: "" } : { right: "10px", left: "" });
  function r(m) {
    o = m.touches[0].clientX;
  }
  function l(m) {
    const g = m.changedTouches[0].clientX - o;
    Math.abs(g) >= Tc && (e.handedness = g < 0 ? "left" : "right", t(), m.preventDefault());
  }
  function c() {
    s.value = !0;
  }
  function b() {
    s.value = !1;
  }
  function a(m) {
    e.handedness = m, t();
  }
  return Vs(() => {
    try {
      const m = e.config.storageKey + ":swipe-hint-shown";
      localStorage.getItem(m) || (localStorage.setItem(m, "1"), setTimeout(() => {
        n.value = !0, setTimeout(() => {
          n.value = !1;
        }, 2500);
      }, 900));
    } catch {
    }
  }), {
    isOpen: s,
    swipeHintVisible: n,
    swipeHintStyle: i,
    onTouchStart: r,
    onTouchEnd: l,
    open: c,
    close: b,
    applyHandedness: a
  };
}
const Mc = { class: "cfw-text-form-wrap" }, $c = { class: "cfw-textarea-wrap" }, Ec = ["id", "placeholder"], Pc = {
  key: 1,
  class: "cfw-mf-actions"
}, Ac = ["disabled"], Ic = {
  key: 2,
  id: "cfw-new-actions"
}, Rc = ["disabled"], Oc = /* @__PURE__ */ tt({
  __name: "TextForm",
  props: {
    mobile: { type: Boolean },
    titleId: { type: String },
    descId: { type: String }
  },
  emits: ["create"],
  setup(e, { expose: t, emit: s }) {
    const n = e, o = Ee(), { persist: i } = Ue(), r = fe(() => n.descId ?? (n.mobile ? "cfw-m-description" : "cfw-description")), l = fe(() => {
      switch (o.mode) {
        case "personal_todo":
          return "Capture a personal todo...";
        case "feature_request":
          return "Describe the requested feature...";
        case "technical_issue":
        default:
          return "Describe the technical issue...";
      }
    }), c = fe(() => !!o.draftDescription.trim());
    function b() {
      i();
    }
    function a() {
      o.draftTitle = "", o.draftDescription = "", i();
    }
    const m = /* @__PURE__ */ O(null);
    function g() {
      const d = m.value;
      d && (d.style.height = "auto", d.style.height = d.scrollHeight + "px", d.style.overflowY = d.offsetHeight < d.scrollHeight ? "auto" : "hidden");
    }
    function S() {
      g(), b();
    }
    return Vs(() => g()), t({ focusTitle: () => {
      var d;
      return (d = m.value) == null ? void 0 : d.focus();
    } }), (d, w) => ($(), A("div", Mc, [
      u("div", $c, [
        Xe(u("textarea", {
          ref_key: "descRef",
          ref: m,
          id: r.value,
          "onUpdate:modelValue": w[0] || (w[0] = (U) => h(o).draftDescription = U),
          placeholder: l.value,
          maxlength: "5000",
          onInput: S,
          onKeydown: [
            w[1] || (w[1] = jt(Re((U) => c.value && !h(o).creating && d.$emit("create", !0), ["ctrl"]), ["enter"])),
            w[2] || (w[2] = jt(Re((U) => c.value && !h(o).creating && d.$emit("create", !0), ["meta"]), ["enter"]))
          ]
        }, null, 40, Ec), [
          [Di, h(o).draftDescription]
        ])
      ]),
      h(o).createError ? ($(), A("div", {
        key: 0,
        class: H([["cfw-error", e.mobile ? "cfw-mf-error" : ""], "active"])
      }, j(h(o).createError), 3)) : ie("", !0),
      e.mobile ? ($(), A("div", Pc, [
        c.value ? ($(), A("button", {
          key: 0,
          id: "cfw-m-clear",
          class: "cfw-btn cfw-btn-outline",
          type: "button",
          onClick: a
        }, "Clear")) : ie("", !0),
        u("button", {
          id: "cfw-m-submit",
          class: "cfw-btn cfw-btn-primary",
          type: "button",
          disabled: h(o).creating,
          onClick: w[3] || (w[3] = (U) => d.$emit("create", !1))
        }, j(h(o).creating ? "Saving..." : "Submit"), 9, Ac)
      ])) : ($(), A("div", Ic, [
        u("button", {
          id: "cfw-submit",
          type: "button",
          class: "cfw-btn cfw-btn-primary",
          disabled: h(o).creating,
          onClick: w[4] || (w[4] = (U) => d.$emit("create", !1))
        }, j(h(o).creating ? "Saving..." : "Submit"), 9, Rc)
      ]))
    ]));
  }
}), Dc = ["onKeydown"], Lc = { class: "cfw-ml-row-main" }, jc = { class: "cfw-ml-row-header" }, Fc = { class: "cfw-ml-row-status" }, Nc = {
  key: 0,
  class: "cfw-ml-row-comments"
}, Vc = {
  key: 1,
  class: "cfw-ml-unread-dot"
}, Hc = { class: "cfw-ml-row-time" }, Uc = { class: "cfw-ml-row-title" }, ko = 80, Co = 160, To = /* @__PURE__ */ tt({
  __name: "IssueRow",
  props: {
    issue: { type: Object }
  },
  emits: ["open-issue", "swipe-action", "edit-issue", "menu-toggle"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = Ue(), r = fe(() => {
      const E = o.itemViews[s.issue.number] || 0;
      return new Date(s.issue.updatedAt).getTime() > E;
    }), l = fe(() => {
      const E = new Date(s.issue.updatedAt), D = (/* @__PURE__ */ new Date()).getTime() - E.getTime();
      return D < 6e4 ? "Just now" : D < 36e5 ? `${Math.floor(D / 6e4)}m ago` : D < 864e5 ? `${Math.floor(D / 36e5)}h ago` : `${Math.floor(D / 864e5)}d ago`;
    });
    let c = 0, b = 0;
    const a = /* @__PURE__ */ O(0), m = /* @__PURE__ */ O(!1), g = fe(() => {
      if (!m.value) return "";
      const E = a.value > 0 ? "right" : "left", J = Math.abs(a.value), D = J > Co ? o.swipeMapping[E === "right" ? "longRight" : "longLeft"] : J > ko ? o.swipeMapping[E === "right" ? "shortRight" : "shortLeft"] : "none";
      return R(D);
    }), S = fe(() => a.value > 0 ? "preview-left" : "preview-right"), d = fe(() => !g.value || g.value === "None" ? "" : a.value > 0 ? "bg-right" : "bg-left"), w = fe(() => ({
      transform: `translateX(${a.value}px)`,
      transition: m.value ? "none" : "transform 0.25s ease-out"
    }));
    function U(E) {
      c = E.touches[0].clientX, m.value = !0;
    }
    function Z(E) {
      m.value && (b = E.touches[0].clientX, a.value = b - c);
    }
    function F() {
      m.value = !1;
      const E = Math.abs(a.value);
      if (E > ko) {
        const J = a.value > 0 ? "right" : "left", D = E > Co ? o.swipeMapping[J === "right" ? "longRight" : "longLeft"] : o.swipeMapping[J === "right" ? "shortRight" : "shortLeft"];
        D !== "none" && n("swipe-action", D, s.issue);
      }
      a.value = 0;
    }
    function W() {
      o.itemViews[s.issue.number] = Date.now(), i(), n("open-issue", s.issue);
    }
    const L = /* @__PURE__ */ O(null);
    function R(E) {
      return {
        done_archive: "Archive",
        pin_unpin: "Pin",
        comment: "Comment",
        create_linked_item: "Link",
        mark_viewed: "Mark viewed",
        none: "None"
      }[E] || "None";
    }
    return (E, J) => ($(), A("div", {
      class: "cfw-ml-row-wrap",
      onTouchstartPassive: U,
      onTouchmovePassive: Z,
      onTouchend: F
    }, [
      u("div", {
        class: H(["cfw-ml-row-bg", d.value])
      }, [
        g.value ? ($(), A("div", {
          key: 0,
          class: H(["cfw-swipe-preview", S.value])
        }, j(g.value), 3)) : ie("", !0)
      ], 2),
      u("div", {
        class: H(["cfw-ml-row", { unread: r.value }]),
        style: Ct(w.value),
        onClick: W,
        tabindex: "0",
        onKeydown: [
          jt(W, ["enter"]),
          jt(Re(W, ["prevent"]), ["space"])
        ]
      }, [
        u("div", Lc, [
          u("div", jc, [
            u("span", Fc, j(e.issue.status || e.issue.state), 1),
            e.issue.commentCount ? ($(), A("span", Nc, j(e.issue.commentCount) + " comment" + j(e.issue.commentCount === 1 ? "" : "s"), 1)) : ie("", !0),
            r.value ? ($(), A("span", Vc)) : ie("", !0),
            u("span", Hc, j(l.value), 1)
          ]),
          u("div", Uc, j(e.issue.title), 1)
        ]),
        u("button", {
          ref_key: "menuBtnRef",
          ref: L,
          class: "cfw-ml-row-menu",
          onClick: J[0] || (J[0] = Re((D) => E.$emit("menu-toggle", s.issue, L.value), ["stop"]))
        }, "⋮", 512)
      ], 46, Dc)
    ], 32));
  }
}), Kc = { class: "cfw-tab-body" }, Bc = { id: "cfw-ml-head" }, Wc = { id: "cfw-ml-head-actions" }, qc = ["disabled"], Yc = ["disabled"], Gc = {
  key: 0,
  id: "cfw-ml-error",
  class: "cfw-error active"
}, Jc = {
  key: 0,
  class: "cfw-ml-empty"
}, Xc = {
  key: 0,
  class: "cfw-ml-section-label"
}, Qc = ["onClick"], Zc = 32, ea = 16, zo = 4, Mo = 56, ta = /* @__PURE__ */ tt({
  __name: "IssuesList",
  emits: ["refresh", "open-issue", "open-filter", "swipe-action"],
  setup(e, { emit: t }) {
    const s = t, n = /* @__PURE__ */ O(!1), o = /* @__PURE__ */ O(null), i = /* @__PURE__ */ O({ top: 0, left: 0 }), r = fe(() => ({
      top: `${i.value.top}px`,
      left: `${i.value.left}px`
    })), l = fe(() => o.value ? [
      { id: "done_archive", label: "Done / Archive" },
      { id: "pin_unpin", label: o.value.pinned ? "Unpin" : "Pin" },
      { id: "comment", label: "Comment" },
      { id: "create_linked_item", label: "Create linked item" },
      { id: "mark_viewed", label: "Mark viewed" }
    ] : []);
    function c(N, q) {
      var De;
      if (n.value && ((De = o.value) == null ? void 0 : De.number) === N.number) {
        n.value = !1;
        return;
      }
      o.value = N, n.value = !0;
      const ee = q.getBoundingClientRect(), je = (l.value.length || 6) * Zc + ea, le = window.innerHeight - ee.bottom, Y = ee.top;
      let se;
      le < je && Y > le ? se = Math.max(8, ee.top - je - zo) : se = ee.bottom + zo, i.value = {
        top: se,
        left: Math.max(10, ee.right - 150)
      }, setTimeout(() => {
        const Ke = (Fe) => {
          Fe.target.closest(".cfw-desktop-menu") || (n.value = !1, document.removeEventListener("click", Ke));
        };
        document.addEventListener("click", Ke, { once: !0 });
      }, 0);
    }
    function b(N) {
      n.value = !1, o.value && s("swipe-action", N, o.value);
    }
    const a = Ee(), { hasAccess: m } = Ft(), { onPanelTouchStart: g, onPanelTouchEnd: S } = On(), d = /* @__PURE__ */ O(!1), w = /* @__PURE__ */ O("");
    let U = 0, Z = !1;
    const F = (N) => !["completed", "closed_unmerged", "merged"].includes(N.status || "") && N.state !== "closed", W = (N) => {
      const q = a.itemViews[N.number] || 0;
      return new Date(N.updatedAt).getTime() > q;
    }, L = fe(() => a.listView === "unread" ? a.issues.filter((N) => W(N)) : a.issues), R = fe(() => L.value.filter((N) => !!N.pinned && F(N))), E = fe(() => L.value.filter((N) => !N.pinned || !F(N))), J = fe(() => m() ? a.loadingIssues ? "Loading…" : a.listError ? a.listError : "No requests yet." : "Authentication required to view requests.");
    function D(N) {
      N.currentTarget.scrollTop === 0 && (U = N.touches[0].clientY, Z = !0);
    }
    function T(N) {
      if (!Z) return;
      const q = N.touches[0].clientY - U;
      q > 0 ? (d.value = !0, w.value = q > Mo ? "↑ Release to refresh" : "↓ Pull to refresh") : (Z = !1, d.value = !1);
    }
    function ne(N) {
      if (!Z) return;
      const q = N.changedTouches[0].clientY - U;
      Z = !1, q > Mo ? (w.value = "Refreshing…", s("refresh"), setTimeout(() => {
        d.value = !1, w.value = "";
      }, 1e3)) : (d.value = !1, w.value = "");
    }
    return (N, q) => ($(), A("div", {
      id: "cfw-mv-list",
      class: H(["cfw-mv", { active: h(a).mobileTab === "list" }])
    }, [
      u("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: q[0] || (q[0] = //@ts-ignore
        (...ee) => h(g) && h(g)(...ee)),
        onTouchend: q[1] || (q[1] = //@ts-ignore
        (...ee) => h(S) && h(S)(...ee))
      }, [...q[8] || (q[8] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      u("div", Kc, [
        u("div", Bc, [
          q[9] || (q[9] = u("span", { id: "cfw-ml-head-title" }, "Requests", -1)),
          u("div", Wc, [
            u("button", {
              disabled: h(a).loadingIssues,
              onClick: q[2] || (q[2] = (ee) => N.$emit("open-filter"))
            }, "⊞ Filter", 8, qc),
            u("button", {
              disabled: h(a).loadingIssues,
              onClick: q[3] || (q[3] = (ee) => N.$emit("refresh"))
            }, j(h(a).loadingIssues ? "…" : "↻"), 9, Yc)
          ])
        ]),
        h(a).listError ? ($(), A("div", Gc, j(h(a).listError), 1)) : ie("", !0),
        u("div", {
          id: "cfw-ml-ptr",
          class: H({ "cfw-ml-ptr-active": d.value })
        }, j(w.value), 3),
        u("div", {
          id: "cfw-ml-body",
          onTouchstartPassive: D,
          onTouchmovePassive: T,
          onTouchendPassive: ne
        }, [
          h(a).issues.length ? ($(), A(ae, { key: 1 }, [
            R.value.length ? ($(), A(ae, { key: 0 }, [
              q[10] || (q[10] = u("div", { class: "cfw-ml-section-label" }, "Pinned", -1)),
              ($(!0), A(ae, null, $e(R.value, (ee) => ($(), rs(To, {
                key: ee.number,
                issue: ee,
                onOpenIssue: q[4] || (q[4] = (we) => N.$emit("open-issue", we)),
                onSwipeAction: (we) => N.$emit("swipe-action", we, ee),
                onEditIssue: (we) => N.$emit("edit-issue", ee),
                onMenuToggle: c
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : ie("", !0),
            E.value.length ? ($(), A(ae, { key: 1 }, [
              R.value.length ? ($(), A("div", Xc, "Activity")) : ie("", !0),
              ($(!0), A(ae, null, $e(E.value, (ee) => ($(), rs(To, {
                key: ee.number,
                issue: ee,
                onOpenIssue: q[5] || (q[5] = (we) => N.$emit("open-issue", we)),
                onSwipeAction: (we) => N.$emit("swipe-action", we, ee),
                onEditIssue: (we) => N.$emit("edit-issue", ee),
                onMenuToggle: c
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : ie("", !0)
          ], 64)) : ($(), A("div", Jc, j(J.value), 1))
        ], 32)
      ]),
      n.value ? ($(), A("div", {
        key: 0,
        class: "cfw-desktop-menu",
        style: Ct(r.value)
      }, [
        ($(!0), A(ae, null, $e(l.value, (ee) => ($(), A("button", {
          key: ee.id,
          onClick: Re((we) => b(ee.id), ["stop"])
        }, j(ee.label), 9, Qc))), 128))
      ], 4)) : ie("", !0),
      h(a).panelSnap === "middle" ? ($(), A("div", {
        key: 1,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: q[6] || (q[6] = //@ts-ignore
        (...ee) => h(g) && h(g)(...ee)),
        onTouchend: q[7] || (q[7] = //@ts-ignore
        (...ee) => h(S) && h(S)(...ee))
      }, [...q[11] || (q[11] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : ie("", !0)
    ], 2));
  }
}), sa = [
  ["active", "Active"],
  ["needs_action", "Needs action"],
  ["unread", "Unread"],
  ["completed", "Completed"],
  ["all", "All"]
], na = [
  ["updated_desc", "Newest"],
  ["updated_asc", "Oldest"]
], oa = [
  ["new", "New"],
  ["queued", "Queued"],
  ["pr_draft", "PR draft"],
  ["pr_open", "PR open"],
  ["pr_closed_unmerged", "PR closed"],
  ["pr_merge_requested", "Merge requested"],
  ["merged", "Merged"],
  ["closed_unmerged", "Closed"]
], ia = {
  key: 0,
  id: "cfw-mbs-content"
}, ra = { class: "cfw-is-status" }, la = { class: "cfw-is-num" }, ca = ["href"], aa = {
  key: 0,
  class: "cfw-is-body",
  style: { "font-size": "14px", color: "#a9c2df", "margin-top": "12px", "white-space": "pre-wrap", "line-height": "1.5", padding: "12px", background: "rgba(0,0,0,0.2)", "border-radius": "8px" }
}, fa = {
  key: 1,
  class: "cfw-is-badges"
}, ua = { class: "cfw-is-primary-box" }, da = {
  key: 2,
  class: "cfw-is-section cfw-comments-section"
}, pa = {
  key: 0,
  class: "cfw-comment cfw-comment-newest"
}, ma = { class: "cfw-comment-meta" }, ha = { class: "cfw-comment-body" }, ba = { class: "cfw-comment-meta" }, wa = { class: "cfw-comment-body" }, ga = {
  key: 3,
  class: "cfw-is-section"
}, va = ["href"], xa = {
  key: 4,
  class: "cfw-is-section"
}, ya = { class: "cfw-is-actions" }, _a = ["disabled", "onClick"], Sa = {
  key: 0,
  class: "cfw-is-action-reason"
}, ka = {
  key: 5,
  class: "cfw-is-section"
}, Ca = ["href"], Ta = {
  key: 0,
  class: "cfw-is-actions",
  style: { "margin-top": "10px" }
}, za = ["disabled", "onClick"], Ma = {
  key: 0,
  class: "cfw-is-action-reason"
}, $a = {
  key: 6,
  class: "cfw-is-error active"
}, Ea = {
  key: 1,
  id: "cfw-mbs-content"
}, Pa = { class: "cfw-fs-section" }, Aa = { class: "cfw-fs-pills" }, Ia = ["onClick"], Ra = { class: "cfw-fs-section" }, Oa = { class: "cfw-fs-pills" }, Da = ["onClick"], La = { class: "cfw-fs-section" }, ja = { class: "cfw-fs-chips" }, Fa = ["onClick"], Na = /* @__PURE__ */ tt({
  __name: "IssueSheet",
  props: {
    open: { type: Boolean },
    issue: { type: [Object, null] },
    filterMode: { type: Boolean }
  },
  emits: ["close", "action-done", "filter-changed", "compose-sheet"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = Ue(), { executeAction: r, mapActionError: l } = Ft(), c = /* @__PURE__ */ O(!1), b = /* @__PURE__ */ O(""), a = /* @__PURE__ */ O(!1), m = fe(() => {
      var R;
      return (R = s.issue) != null && R.comments ? [...s.issue.comments].sort((E, J) => new Date(J.createdAt).getTime() - new Date(E.createdAt).getTime()) : [];
    }), g = fe(() => m.value.length > 0), S = fe(() => m.value[0] || null), d = fe(() => m.value.slice(1));
    function w(R) {
      return new Date(R).toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }
    const U = fe(() => {
      var R;
      return Array.isArray((R = s.issue) == null ? void 0 : R.issueActions) ? s.issue.issueActions : [];
    }), Z = fe(() => {
      var R;
      return Array.isArray((R = s.issue) == null ? void 0 : R.pullRequestActions) ? s.issue.pullRequestActions : [];
    });
    async function F(R, E, J) {
      b.value = "", c.value = !0;
      try {
        await r(R, J, E), n("action-done"), n("close");
      } catch (D) {
        b.value = l(D instanceof Error ? D.message : "");
      } finally {
        c.value = !1;
      }
    }
    function W(R) {
      const E = o.listStatusFilter.slice(), J = E.indexOf(R);
      J >= 0 ? E.splice(J, 1) : E.push(R), o.listStatusFilter = E, i(), n("filter-changed");
    }
    function L() {
      o.listView = "active", o.listQuery = "", o.listStatusFilter = [], i(), n("filter-changed"), n("close");
    }
    return (R, E) => {
      var J, D;
      return $(), A(ae, null, [
        u("div", {
          id: "cfw-mbs-overlay",
          class: H({ active: e.open }),
          onClick: E[0] || (E[0] = (T) => R.$emit("close"))
        }, null, 2),
        u("div", {
          id: "cfw-mbs",
          class: H({ active: e.open, "panel-left": h(o).handedness === "left" })
        }, [
          E[11] || (E[11] = u("div", { id: "cfw-mbs-handle" }, null, -1)),
          e.issue ? ($(), A("div", ia, [
            u("div", ra, j(e.issue.status || e.issue.state) + j(e.issue.statusDetail ? " · " + e.issue.statusDetail : ""), 1),
            u("div", la, "#" + j(e.issue.number) + " · " + j(w(e.issue.updatedAt)), 1),
            u("a", {
              class: "cfw-is-title",
              href: e.issue.url,
              target: "_blank",
              rel: "noopener noreferrer"
            }, j(e.issue.title), 9, ca),
            e.issue.body ? ($(), A("div", aa, j(e.issue.body), 1)) : ie("", !0),
            (J = e.issue.labels) != null && J.length ? ($(), A("div", fa, [
              ($(!0), A(ae, null, $e(e.issue.labels, (T) => ($(), A("span", {
                key: T,
                class: "cfw-badge"
              }, j(T), 1))), 128))
            ])) : ie("", !0),
            u("div", ua, [
              u("button", {
                class: "cfw-is-pill cfw-is-pill-primary",
                onClick: E[1] || (E[1] = (T) => R.$emit("compose-sheet", "comment", e.issue))
              }, "Comment")
            ]),
            g.value ? ($(), A("div", da, [
              S.value ? ($(), A("div", pa, [
                u("div", ma, [
                  u("strong", null, j(S.value.author || "User"), 1),
                  Lt(" · " + j(w(S.value.createdAt)), 1)
                ]),
                u("div", ha, j(S.value.body), 1)
              ])) : ie("", !0),
              d.value.length > 0 ? ($(), A(ae, { key: 1 }, [
                a.value ? ($(!0), A(ae, { key: 1 }, $e(d.value, (T) => ($(), A("div", {
                  key: T.id,
                  class: "cfw-comment"
                }, [
                  u("div", ba, [
                    u("strong", null, j(T.author || "User"), 1),
                    Lt(" · " + j(w(T.createdAt)), 1)
                  ]),
                  u("div", wa, j(T.body), 1)
                ]))), 128)) : ($(), A("button", {
                  key: 0,
                  class: "cfw-comments-expand",
                  onClick: E[2] || (E[2] = (T) => a.value = !0)
                }, " Show " + j(d.value.length) + " previous comment" + j(d.value.length > 1 ? "s" : ""), 1))
              ], 64)) : ie("", !0)
            ])) : ie("", !0),
            e.issue.sourceIssue ? ($(), A("div", ga, [
              E[5] || (E[5] = u("div", { class: "cfw-is-section-label" }, "Source Item", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.sourceIssue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, " #" + j(e.issue.sourceIssue.number) + " " + j(e.issue.sourceIssue.title), 9, va)
            ])) : ie("", !0),
            U.value.length ? ($(), A("div", xa, [
              E[6] || (E[6] = u("div", { class: "cfw-is-section-label" }, "Issue actions", -1)),
              u("div", ya, [
                ($(!0), A(ae, null, $e(U.value, (T) => ($(), A("div", {
                  key: T.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: T.disabled || c.value,
                    onClick: (ne) => !T.disabled && F(e.issue.number, "issue", T.id)
                  }, j(T.label || T.id), 9, _a),
                  T.disabled && T.reason ? ($(), A("span", Sa, j(T.reason), 1)) : ie("", !0)
                ]))), 128))
              ])
            ])) : ie("", !0),
            (D = e.issue.pullRequest) != null && D.url ? ($(), A("div", ka, [
              E[7] || (E[7] = u("div", { class: "cfw-is-section-label" }, "Pull request", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.pullRequest.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "PR #" + j(e.issue.pullRequest.number) + " · " + j((e.issue.pullRequest.state || "").toLowerCase()) + j(e.issue.pullRequest.isDraft ? " · draft" : ""), 9, Ca),
              Z.value.length ? ($(), A("div", Ta, [
                ($(!0), A(ae, null, $e(Z.value, (T) => ($(), A("div", {
                  key: T.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: T.disabled || c.value,
                    onClick: (ne) => !T.disabled && F(e.issue.number, "pull_request", T.id)
                  }, j(T.label || T.id), 9, za),
                  T.disabled && T.reason ? ($(), A("span", Ma, j(T.reason), 1)) : ie("", !0)
                ]))), 128))
              ])) : ie("", !0)
            ])) : ie("", !0),
            b.value ? ($(), A("div", $a, j(b.value), 1)) : ie("", !0),
            u("button", {
              class: "cfw-mbs-close",
              onClick: E[3] || (E[3] = Re((T) => R.$emit("close"), ["stop"]))
            }, "Close")
          ])) : e.filterMode ? ($(), A("div", Ea, [
            u("div", Pa, [
              E[8] || (E[8] = u("div", { class: "cfw-fs-label" }, "View", -1)),
              u("div", Aa, [
                ($(!0), A(ae, null, $e(h(sa), ([T, ne]) => ($(), A("button", {
                  key: T,
                  class: H(["cfw-fs-pill", { active: h(o).listView === T }]),
                  onClick: (N) => {
                    h(o).listView = T, h(i)(), R.$emit("filter-changed");
                  }
                }, j(ne), 11, Ia))), 128))
              ])
            ]),
            u("div", Ra, [
              E[9] || (E[9] = u("div", { class: "cfw-fs-label" }, "Sort", -1)),
              u("div", Oa, [
                ($(!0), A(ae, null, $e(h(na), ([T, ne]) => ($(), A("button", {
                  key: T,
                  class: H(["cfw-fs-pill", { active: h(o).listSort === T }]),
                  onClick: (N) => {
                    h(o).listSort = T, h(i)(), R.$emit("filter-changed");
                  }
                }, j(ne), 11, Da))), 128))
              ])
            ]),
            u("div", La, [
              E[10] || (E[10] = u("div", { class: "cfw-fs-label" }, "Status", -1)),
              u("div", ja, [
                ($(!0), A(ae, null, $e(h(oa), ([T, ne]) => ($(), A("button", {
                  key: T,
                  class: H(["cfw-fs-chip", { active: h(o).listStatusFilter.includes(T) }]),
                  onClick: (N) => W(T)
                }, j(ne), 11, Fa))), 128))
              ])
            ]),
            u("button", {
              class: "cfw-mbs-close",
              style: { "margin-bottom": "8px" },
              onClick: Re(L, ["stop"])
            }, "Clear filters"),
            u("button", {
              class: "cfw-mbs-close",
              onClick: E[4] || (E[4] = Re((T) => R.$emit("close"), ["stop"]))
            }, "Done")
          ])) : ie("", !0)
        ], 2)
      ], 64);
    };
  }
}), Va = { class: "cfw-tab-body" }, Ha = { class: "cfw-m-settings" }, Ua = {
  id: "cfw-m-token-status",
  class: "cfw-m-settings-token"
}, Ka = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ba = { class: "cfw-m-hand-toggle" }, Wa = { class: "cfw-m-hand-toggle" }, qa = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ya = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ga = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ja = { class: "cfw-m-swipe-settings" }, Xa = { class: "cfw-m-swipe-row" }, Qa = ["value"], Za = { class: "cfw-m-swipe-row" }, ef = ["value"], tf = { class: "cfw-m-swipe-row" }, sf = ["value"], nf = { class: "cfw-m-swipe-row" }, of = ["value"], rf = /* @__PURE__ */ tt({
  __name: "SettingsPane",
  emits: ["handedness", "token-changed"],
  setup(e, { emit: t }) {
    const s = t, n = Ee(), { persist: o } = Ue(), { clearToken: i, promptToken: r } = Hi(), { onPanelTouchStart: l, onPanelTouchEnd: c } = On(), b = fe(() => {
      const S = n.adminToken;
      return S ? "Token is set: " + S.slice(0, 3) + "…" : "No token set.";
    });
    function a() {
      r(), s("token-changed");
    }
    function m() {
      window.confirm("Clear saved admin token?") && (i(), s("token-changed"));
    }
    const g = [
      { value: "done_archive", label: "Done / Archive" },
      { value: "pin_unpin", label: "Pin / Unpin" },
      { value: "comment", label: "Comment" },
      { value: "create_linked_item", label: "Create linked item" },
      { value: "mark_viewed", label: "Mark viewed" },
      { value: "none", label: "None" }
    ];
    return (S, d) => ($(), A("div", {
      id: "cfw-mv-settings",
      class: H(["cfw-mv", { active: h(n).mobileTab === "settings" }])
    }, [
      u("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: d[0] || (d[0] = //@ts-ignore
        (...w) => h(l) && h(l)(...w)),
        onTouchend: d[1] || (d[1] = //@ts-ignore
        (...w) => h(c) && h(c)(...w))
      }, [...d[30] || (d[30] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      u("div", Va, [
        u("div", Ha, [
          d[35] || (d[35] = u("h3", null, "Admin token", -1)),
          u("div", Ua, j(b.value), 1),
          u("div", { class: "cfw-m-hand-toggle" }, [
            u("button", {
              class: "cfw-m-hand-btn",
              onClick: a
            }, "Update"),
            u("button", {
              class: "cfw-m-hand-btn",
              onClick: m
            }, "Clear")
          ]),
          d[36] || (d[36] = u("p", { class: "cfw-m-settings-note" }, "Token authenticates all widget actions.", -1)),
          d[37] || (d[37] = u("h3", null, "Capture Mode", -1)),
          u("div", Ka, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).mode === "technical_issue" }]),
              onClick: d[2] || (d[2] = (w) => {
                h(n).mode = "technical_issue", h(o)();
              })
            }, "Issue", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).mode === "personal_todo" }]),
              onClick: d[3] || (d[3] = (w) => {
                h(n).mode = "personal_todo", h(o)();
              })
            }, "Todo", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).mode === "feature_request" }]),
              onClick: d[4] || (d[4] = (w) => {
                h(n).mode = "feature_request", h(o)();
              })
            }, "Feature", 2)
          ]),
          d[38] || (d[38] = u("h3", null, "Button side", -1)),
          u("div", Ba, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).handedness === "left" }]),
              onClick: d[5] || (d[5] = (w) => S.$emit("handedness", "left"))
            }, "◀ Left", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).handedness === "right" }]),
              onClick: d[6] || (d[6] = (w) => S.$emit("handedness", "right"))
            }, "Right ▶", 2)
          ]),
          d[39] || (d[39] = u("p", { class: "cfw-m-settings-note" }, "Or swipe the open button left or right.", -1)),
          d[40] || (d[40] = u("h3", null, "Panel position", -1)),
          u("div", Wa, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).panelSnap === "top" }]),
              type: "button",
              onClick: d[7] || (d[7] = (w) => {
                h(n).panelSnap = "top", h(o)();
              })
            }, "▲ Top", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).panelSnap === "middle" }]),
              type: "button",
              onClick: d[8] || (d[8] = (w) => {
                h(n).panelSnap = "middle", h(o)();
              })
            }, "Middle", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).panelSnap === "bottom" }]),
              type: "button",
              onClick: d[9] || (d[9] = (w) => {
                h(n).panelSnap = "bottom", h(o)();
              })
            }, "Bottom ▼", 2)
          ]),
          d[41] || (d[41] = u("p", { class: "cfw-m-settings-note" }, "Or swipe the panel handle up or down.", -1)),
          d[42] || (d[42] = u("h3", null, "Text size", -1)),
          u("div", qa, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).fontSize === "small" }]),
              type: "button",
              onClick: d[10] || (d[10] = (w) => {
                h(n).fontSize = "small", h(o)();
              })
            }, "Small", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).fontSize === "medium" }]),
              type: "button",
              onClick: d[11] || (d[11] = (w) => {
                h(n).fontSize = "medium", h(o)();
              })
            }, "Medium", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).fontSize === "large" }]),
              type: "button",
              onClick: d[12] || (d[12] = (w) => {
                h(n).fontSize = "large", h(o)();
              })
            }, "Large", 2)
          ]),
          d[43] || (d[43] = u("p", { class: "cfw-m-settings-note" }, "Adjust text size throughout the widget.", -1)),
          d[44] || (d[44] = u("h3", null, "Density", -1)),
          u("div", Ya, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).density === "compact" }]),
              type: "button",
              onClick: d[13] || (d[13] = (w) => {
                h(n).density = "compact", h(o)();
              })
            }, "Compact", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).density === "default" }]),
              type: "button",
              onClick: d[14] || (d[14] = (w) => {
                h(n).density = "default", h(o)();
              })
            }, "Default", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).density === "comfortable" }]),
              type: "button",
              onClick: d[15] || (d[15] = (w) => {
                h(n).density = "comfortable", h(o)();
              })
            }, "Comfortable", 2)
          ]),
          d[45] || (d[45] = u("p", { class: "cfw-m-settings-note" }, "Control spacing and row density throughout the widget.", -1)),
          d[46] || (d[46] = u("h3", null, "Theme", -1)),
          u("div", Ga, [
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).theme === "ocean" }]),
              type: "button",
              onClick: d[16] || (d[16] = (w) => {
                h(n).theme = "ocean", h(o)();
              })
            }, "🌊 Ocean", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).theme === "forest" }]),
              type: "button",
              onClick: d[17] || (d[17] = (w) => {
                h(n).theme = "forest", h(o)();
              })
            }, "🌲 Forest", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).theme === "berry" }]),
              type: "button",
              onClick: d[18] || (d[18] = (w) => {
                h(n).theme = "berry", h(o)();
              })
            }, "🫐 Berry", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).theme === "sunset" }]),
              type: "button",
              onClick: d[19] || (d[19] = (w) => {
                h(n).theme = "sunset", h(o)();
              })
            }, "🌅 Sunset", 2)
          ]),
          d[47] || (d[47] = u("p", { class: "cfw-m-settings-note" }, "Choose your preferred color accent.", -1)),
          d[48] || (d[48] = u("h3", null, "Swipe Actions", -1)),
          u("div", Ja, [
            u("div", Xa, [
              d[31] || (d[31] = u("label", null, "Short Right (→)", -1)),
              Xe(u("select", {
                "onUpdate:modelValue": d[20] || (d[20] = (w) => h(n).swipeMapping.shortRight = w),
                class: "cfw-select",
                onChange: d[21] || (d[21] = (w) => h(o)())
              }, [
                ($(), A(ae, null, $e(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, j(w.label), 9, Qa)), 64))
              ], 544), [
                [Wt, h(n).swipeMapping.shortRight]
              ])
            ]),
            u("div", Za, [
              d[32] || (d[32] = u("label", null, "Long Right (→→)", -1)),
              Xe(u("select", {
                "onUpdate:modelValue": d[22] || (d[22] = (w) => h(n).swipeMapping.longRight = w),
                class: "cfw-select",
                onChange: d[23] || (d[23] = (w) => h(o)())
              }, [
                ($(), A(ae, null, $e(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, j(w.label), 9, ef)), 64))
              ], 544), [
                [Wt, h(n).swipeMapping.longRight]
              ])
            ]),
            u("div", tf, [
              d[33] || (d[33] = u("label", null, "Short Left (←)", -1)),
              Xe(u("select", {
                "onUpdate:modelValue": d[24] || (d[24] = (w) => h(n).swipeMapping.shortLeft = w),
                class: "cfw-select",
                onChange: d[25] || (d[25] = (w) => h(o)())
              }, [
                ($(), A(ae, null, $e(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, j(w.label), 9, sf)), 64))
              ], 544), [
                [Wt, h(n).swipeMapping.shortLeft]
              ])
            ]),
            u("div", nf, [
              d[34] || (d[34] = u("label", null, "Long Left (←←)", -1)),
              Xe(u("select", {
                "onUpdate:modelValue": d[26] || (d[26] = (w) => h(n).swipeMapping.longLeft = w),
                class: "cfw-select",
                onChange: d[27] || (d[27] = (w) => h(o)())
              }, [
                ($(), A(ae, null, $e(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, j(w.label), 9, of)), 64))
              ], 544), [
                [Wt, h(n).swipeMapping.longLeft]
              ])
            ])
          ]),
          d[49] || (d[49] = u("div", { class: "cfw-m-gesture-ref" }, [
            u("h4", null, "Gesture Reference"),
            u("div", { class: "cfw-m-gesture-row" }, [
              u("span", null, "Short Swipe:"),
              Lt(),
              u("span", null, "Gentle flick (acts immediately)")
            ]),
            u("div", { class: "cfw-m-gesture-row" }, [
              u("span", null, "Long Swipe:"),
              Lt(),
              u("span", null, "Pull across screen to edge")
            ])
          ], -1))
        ])
      ]),
      h(n).panelSnap === "middle" ? ($(), A("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: d[28] || (d[28] = //@ts-ignore
        (...w) => h(l) && h(l)(...w)),
        onTouchend: d[29] || (d[29] = //@ts-ignore
        (...w) => h(c) && h(c)(...w))
      }, [...d[50] || (d[50] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : ie("", !0)
    ], 2));
  }
}), lf = { class: "cfw-compose-header" }, cf = { class: "cfw-compose-title" }, af = {
  key: 0,
  class: "cfw-compose-context"
}, ff = { class: "cfw-compose-context-quote" }, uf = { class: "cfw-compose-body" }, df = {
  class: "cfw-textarea-wrap",
  style: { flex: "1", padding: "14px" }
}, pf = ["placeholder", "onKeydown"], mf = { class: "cfw-compose-actions" }, hf = ["disabled"], bf = /* @__PURE__ */ tt({
  __name: "ComposeSheet",
  props: {
    open: { type: Boolean },
    mode: { type: String },
    issue: { type: [Object, null] }
  },
  emits: ["close", "action-done"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { submitComment: i, createLinkedItem: r } = Ft(), l = /* @__PURE__ */ O(null), c = fe(() => !!o.draftDescription.trim());
    Jt(() => s.open, (a) => {
      a && (o.draftDescription = "", Tt(() => {
        var m;
        return (m = l.value) == null ? void 0 : m.focus();
      }));
    });
    async function b() {
      if (!s.issue || o.creating) return;
      const a = o.draftDescription.trim();
      if (!a) {
        o.createError = "Please provide text.";
        return;
      }
      o.createError = "", o.creating = !0;
      try {
        if (s.mode === "comment")
          await i(s.issue.number, a);
        else {
          const m = a.split(`
`)[0], g = m.length > 50 ? m.slice(0, 50) + "..." : m;
          await r(s.issue.number, g, a, !1);
        }
        o.draftDescription = "", n("action-done"), n("close");
      } catch (m) {
        o.createError = m instanceof Error ? m.message : "Failed to submit";
      } finally {
        o.creating = !1;
      }
    }
    return (a, m) => ($(), A(ae, null, [
      u("div", {
        id: "cfw-compose-overlay",
        class: H({ active: e.open }),
        onClick: m[0] || (m[0] = (g) => a.$emit("close"))
      }, null, 2),
      u("div", {
        id: "cfw-compose-sheet",
        class: H({ active: e.open, "panel-left": h(o).handedness === "left" })
      }, [
        m[4] || (m[4] = u("div", { id: "cfw-compose-handle" }, null, -1)),
        u("div", lf, [
          u("span", cf, j(e.mode === "comment" ? "New Comment" : "Create Linked Item"), 1),
          u("button", {
            class: "cfw-compose-close",
            onClick: m[1] || (m[1] = Re((g) => a.$emit("close"), ["stop"]))
          }, "×")
        ]),
        e.issue ? ($(), A("div", af, [
          u("div", ff, [
            u("strong", null, "#" + j(e.issue.number), 1),
            Lt(" " + j(e.issue.title), 1)
          ])
        ])) : ie("", !0),
        u("div", uf, [
          u("div", df, [
            Xe(u("textarea", {
              ref_key: "descRef",
              ref: l,
              "onUpdate:modelValue": m[2] || (m[2] = (g) => h(o).draftDescription = g),
              placeholder: e.mode === "comment" ? "Write a comment..." : "Describe the linked item...",
              maxlength: "5000",
              style: { height: "100%", border: "none", background: "transparent", color: "#d9e7f7", "font-size": "14px", width: "100%", resize: "none", outline: "none", padding: "0" },
              onKeydown: [
                jt(Re(b, ["ctrl"]), ["enter"]),
                jt(Re(b, ["meta"]), ["enter"])
              ]
            }, null, 40, pf), [
              [Di, h(o).draftDescription]
            ])
          ]),
          u("div", mf, [
            u("button", {
              class: "cfw-is-pill",
              onClick: m[3] || (m[3] = Re((g) => a.$emit("close"), ["stop"]))
            }, "Cancel"),
            u("button", {
              class: "cfw-is-pill cfw-is-pill-primary",
              disabled: !c.value,
              onClick: b
            }, j(h(o).creating ? "Submitting..." : "Submit"), 9, hf)
          ])
        ])
      ], 2)
    ], 64));
  }
}), wf = { class: "cfw-settings-row" }, gf = ["aria-expanded"], vf = ["disabled"], xf = ["disabled"], yf = ["disabled"], _f = {
  key: 1,
  class: "cfw-m-verror active"
}, Sf = /* @__PURE__ */ tt({
  __name: "VoiceComposer",
  props: {
    mobile: { type: Boolean }
  },
  emits: ["toggle-recording", "reset", "send"],
  setup(e) {
    const t = Ee(), { persist: s } = Ue(), n = /* @__PURE__ */ O(!1), o = fe(() => t.voiceDraftState === "recording" ? "Recording in progress" : t.voiceDraftState === "paused" && t.voiceDraftReady ? "Recording paused" : "Ready to record");
    function i(r) {
      const l = Math.max(0, Math.floor((r || 0) / 1e3)), c = Math.floor(l / 60), b = l % 60;
      return String(c).padStart(2, "0") + ":" + String(b).padStart(2, "0");
    }
    return (r, l) => ($(), A("div", {
      class: H(e.mobile ? "cfw-m-voice" : "cfw-voice-shell")
    }, [
      e.mobile ? ie("", !0) : ($(), A(ae, { key: 0 }, [
        u("div", wf, [
          l[6] || (l[6] = u("p", { class: "cfw-muted-note" }, "Current URL is attached automatically to the issue payload.", -1)),
          u("button", {
            id: "cfw-draft-settings-toggle",
            type: "button",
            class: "cfw-btn cfw-btn-outline cfw-settings-toggle",
            "aria-expanded": n.value ? "true" : "false",
            "aria-controls": "cfw-draft-settings",
            onClick: l[0] || (l[0] = (c) => n.value = !n.value)
          }, "⚙", 8, gf)
        ]),
        u("div", {
          id: "cfw-draft-settings",
          class: H(["cfw-settings-panel", { active: n.value }])
        }, [
          l[8] || (l[8] = u("label", {
            class: "cfw-label",
            for: "cfw-merge-policy"
          }, "Merge policy", -1)),
          Xe(u("select", {
            id: "cfw-merge-policy",
            class: "cfw-select",
            "onUpdate:modelValue": l[1] || (l[1] = (c) => h(t).draftMergePolicy = c),
            onChange: l[2] || (l[2] = //@ts-ignore
            (...c) => h(s) && h(s)(...c))
          }, [...l[7] || (l[7] = [
            u("option", { value: "manual" }, "Manual merge", -1),
            u("option", { value: "auto_unblocked" }, "Auto-merge when unblocked", -1)
          ])], 544), [
            [Wt, h(t).draftMergePolicy]
          ])
        ], 2)
      ], 64)),
      u("div", {
        class: H(e.mobile ? "cfw-m-vstatus" : "cfw-voice-status")
      }, [
        u("div", {
          class: H(e.mobile ? "cfw-m-vstatus-line" : "cfw-voice-status-line")
        }, j(o.value), 3),
        u("div", {
          class: H(e.mobile ? "cfw-m-vmeta" : "cfw-voice-meta")
        }, [
          l[9] || (l[9] = u("span", null, "Draft recording", -1)),
          u("strong", null, j(i(h(t).voiceDraftDurationMs)), 1)
        ], 2)
      ], 2),
      u("div", {
        class: H(e.mobile ? "cfw-m-vcontrols" : "cfw-voice-controls")
      }, [
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-record",
          disabled: h(t).creating,
          onClick: l[3] || (l[3] = (c) => r.$emit("toggle-recording"))
        }, j(h(t).voiceDraftState === "recording" ? "Pause" : "Record"), 9, vf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-reset",
          disabled: h(t).creating || !h(t).voiceDraftReady && h(t).voiceDraftState === "idle",
          onClick: l[4] || (l[4] = (c) => r.$emit("reset"))
        }, "Reset", 8, xf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-send",
          disabled: h(t).creating || h(t).voiceDraftState === "recording" || !h(t).voiceDraftReady,
          onClick: l[5] || (l[5] = (c) => r.$emit("send"))
        }, "Send", 8, yf)
      ], 2),
      u("div", {
        class: H(e.mobile ? "cfw-m-vhint" : "cfw-voice-hint")
      }, j(h(t).voiceDraftReady ? "Recording is ready to send." : "Tap Record to start a draft. Settings ⚙ contains merge policy."), 3),
      h(t).createError && e.mobile ? ($(), A("div", _f, j(h(t).createError), 1)) : ie("", !0)
    ], 2));
  }
}), kf = ["data-font-size", "data-density", "data-theme"], Cf = { class: "cfw-tab-body" }, Tf = {
  key: 0,
  class: "cfw-compose-mode-toggle"
}, zf = { class: "cfw-m-success-hint" }, Mf = {
  key: 2,
  id: "cfw-mv-text-form",
  class: "cfw-mf"
}, $f = { id: "cfw-mobile-nav" }, Ef = /* @__PURE__ */ tt({
  __name: "MobileWidget",
  setup(e, { expose: t }) {
    const s = Ee(), { persist: n } = Ue(), { onPanelTouchStart: o, onPanelTouchEnd: i } = On(), { loadIssues: r, authorize: l, executeAction: c } = Ft(), b = yc(), a = kc(), m = Cc(), g = zc(), S = /* @__PURE__ */ O(null), d = fe(() => ({
      display: "flex",
      flexDirection: "column"
    })), w = fe(() => s.textCreateSuccess || s.voiceCreateSuccess), U = fe(() => s.voiceCreateSuccess ? "Voice request submitted" : "Tap to submit another"), Z = fe(() => s.voiceCreateSuccess ? a.undoSecondsLeft.value : b.undoSecondsLeft.value);
    function F(G) {
      s.mobileTab = G, G === "list" && r(!1), G === "text" && Tt(() => {
        var C;
        return (C = S.value) == null ? void 0 : C.focusTitle();
      }), n();
    }
    function W(G) {
      s.composeMode = G, s.createError = "", G === "text" && Tt(() => {
        var C;
        return (C = S.value) == null ? void 0 : C.focusTitle();
      }), n();
    }
    function L() {
      s.voiceCreateSuccess ? a.dismissSuccess() : b.reset();
    }
    function R() {
      s.voiceCreateSuccess ? a.undo() : b.undo();
    }
    const E = /* @__PURE__ */ O(!1), J = /* @__PURE__ */ O("comment"), D = /* @__PURE__ */ O(null);
    function T(G, C) {
      J.value = G, D.value = C, E.value = !0, Y(3);
    }
    async function ne(G, C) {
      if (G !== "none") {
        if (G === "mark_viewed") {
          s.itemViews[C.number] = Date.now(), n();
          return;
        }
        if (G === "comment" || G === "create_linked_item") {
          T(G, C);
          return;
        }
        try {
          await c(C.number, G, "issue"), await r(!0);
        } catch (X) {
          console.warn("Action failed", X);
        }
      }
    }
    function N(G) {
      m.openIssue(G), Y(2);
    }
    function q() {
      m.openFilter(), Y(2);
    }
    async function ee() {
      await r(!0);
    }
    function we() {
      l() && (g.open(), Y(1));
    }
    function je() {
      r(!0);
    }
    function le(G = !1) {
      var C;
      if (E.value = !1, m.close(), g.close(), !G) {
        const X = ((C = window.history.state) == null ? void 0 : C.widgetDepth) || 0;
        X > 0 && history.go(-X);
      }
    }
    function Y(G) {
      var X;
      (((X = window.history.state) == null ? void 0 : X.widgetDepth) || 0) < G && history.pushState({ widgetDepth: G }, "");
    }
    function se(G) {
      var X;
      G === 3 ? E.value = !1 : G === 2 ? m.close() : G === 1 && le(!1);
      const C = ((X = window.history.state) == null ? void 0 : X.widgetDepth) || 0;
      C >= G && history.go(-(C - G + 1));
    }
    function De() {
      window.addEventListener("popstate", Ke);
    }
    function Ke(G) {
      var X;
      const C = ((X = window.history.state) == null ? void 0 : X.widgetDepth) || 0;
      C < 3 && E.value && (E.value = !1), C < 2 && m.sheetOpen.value && m.close(), C < 1 && g.isOpen.value && g.close();
    }
    En(() => {
      b.stopUndoCountdown(), a.stopUndoCountdown(), a.stopVoiceTimer(), window.removeEventListener("popstate", Ke);
    }), De();
    function Fe(G) {
      if (!l()) return;
      const C = typeof G == "string" ? parseInt(G, 10) : G;
      g.isOpen.value || (g.open(), Y(1)), F("list");
      const X = s.issues.find((zt) => zt.number === C);
      X ? N(X) : r(!0).then(() => {
        const zt = s.issues.find((wt) => wt.number === C);
        zt && N(zt);
      });
    }
    return t({ openItem: Fe }), (G, C) => ($(), A(ae, null, [
      Xe(u("button", {
        id: "cfw-mobile-launcher",
        type: "button",
        "aria-label": "Open feedback widget",
        class: H({ "panel-left": h(s).handedness === "left" }),
        onTouchstartPassive: C[0] || (C[0] = //@ts-ignore
        (...X) => h(g).onTouchStart && h(g).onTouchStart(...X)),
        onTouchend: C[1] || (C[1] = //@ts-ignore
        (...X) => h(g).onTouchEnd && h(g).onTouchEnd(...X)),
        onClick: C[2] || (C[2] = (X) => we())
      }, [...C[21] || (C[21] = [
        u("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
          })
        ], -1)
      ])], 34), [
        [tn, !h(g).isOpen.value]
      ]),
      u("div", {
        id: "cfw-swipe-hint",
        class: H({ visible: h(g).swipeHintVisible.value }),
        style: Ct(h(g).swipeHintStyle.value)
      }, "← swipe →", 6),
      Xe(u("div", {
        id: "cfw-desktop-backdrop",
        onClick: C[3] || (C[3] = (X) => le(!1))
      }, null, 512), [
        [tn, h(g).isOpen.value]
      ]),
      Xe(u("div", {
        id: "cfw-mobile",
        class: H({ "panel-left": h(s).handedness === "left" }),
        style: Ct(d.value),
        "data-font-size": h(s).fontSize,
        "data-density": h(s).density,
        "data-theme": h(s).theme
      }, [
        u("div", {
          id: "cfw-mobile-body",
          class: H({ "snap-bottom": h(s).panelSnap === "bottom", "snap-top": h(s).panelSnap === "top", "snap-middle": h(s).panelSnap === "middle" })
        }, [
          u("div", {
            id: "cfw-mv-text",
            class: H(["cfw-mv", { active: h(s).mobileTab === "text" }])
          }, [
            w.value ? ie("", !0) : ($(), A("div", {
              key: 0,
              class: "cfw-panel-handle",
              onTouchstartPassive: C[4] || (C[4] = //@ts-ignore
              (...X) => h(o) && h(o)(...X)),
              onTouchend: C[5] || (C[5] = //@ts-ignore
              (...X) => h(i) && h(i)(...X))
            }, [...C[22] || (C[22] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)),
            u("div", Cf, [
              w.value ? ie("", !0) : ($(), A("div", Tf, [
                u("button", {
                  type: "button",
                  class: H(["cfw-compose-mode-btn", { active: h(s).composeMode === "text" }]),
                  onClick: C[6] || (C[6] = (X) => W("text"))
                }, "Text", 2),
                u("button", {
                  type: "button",
                  class: H(["cfw-compose-mode-btn", { active: h(s).composeMode === "voice" }]),
                  onClick: C[7] || (C[7] = (X) => W("voice"))
                }, "Voice", 2)
              ])),
              w.value ? ($(), A("div", {
                key: 1,
                id: "cfw-mv-compose-success",
                class: "cfw-m-success",
                onClick: C[9] || (C[9] = (X) => L())
              }, [
                C[23] || (C[23] = u("div", { class: "cfw-m-success-ring" }, [
                  u("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  ])
                ], -1)),
                u("div", zf, j(U.value), 1),
                Z.value > 0 && h(s).lastSubmissionId ? ($(), A("button", {
                  key: 0,
                  id: "cfw-mv-compose-undo",
                  class: "cfw-m-undo-btn",
                  onClick: C[8] || (C[8] = Re((X) => R(), ["stop"]))
                }, "Undo (" + j(Z.value) + ")", 1)) : ie("", !0)
              ])) : h(s).composeMode === "text" ? ($(), A("div", Mf, [
                ke(Oc, {
                  ref_key: "textFormRef",
                  ref: S,
                  mobile: !0,
                  "title-id": "cfw-m-title",
                  "desc-id": "cfw-m-description",
                  onCreate: h(b).submit
                }, null, 8, ["onCreate"])
              ])) : ($(), rs(Sf, {
                key: 3,
                mobile: !0,
                onToggleRecording: h(a).toggleRecording,
                onReset: h(a).reset,
                onSend: h(a).submit
              }, null, 8, ["onToggleRecording", "onReset", "onSend"]))
            ]),
            h(s).panelSnap === "middle" && !w.value ? ($(), A("div", {
              key: 1,
              class: "cfw-panel-handle cfw-panel-handle-bottom",
              onTouchstartPassive: C[10] || (C[10] = //@ts-ignore
              (...X) => h(o) && h(o)(...X)),
              onTouchend: C[11] || (C[11] = //@ts-ignore
              (...X) => h(i) && h(i)(...X))
            }, [...C[24] || (C[24] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)) : ie("", !0)
          ], 2),
          ke(ta, {
            onRefresh: C[12] || (C[12] = (X) => h(r)(!0)),
            onOpenIssue: N,
            onOpenFilter: q,
            onSwipeAction: ne
          }),
          ke(rf, {
            onHandedness: h(g).applyHandedness,
            onTokenChanged: je
          }, null, 8, ["onHandedness"])
        ], 2),
        u("nav", $f, [
          h(s).handedness === "left" ? ($(), A("button", {
            key: 0,
            class: "cfw-nav-btn",
            type: "button",
            onClick: C[13] || (C[13] = (X) => le(!1))
          }, [...C[25] || (C[25] = [
            u("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            u("span", null, "Close", -1)
          ])])) : ie("", !0),
          u("button", {
            id: "cfw-nav-text",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "text" }]),
            type: "button",
            onClick: C[14] || (C[14] = (X) => F("text"))
          }, [...C[26] || (C[26] = [
            u("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
              })
            ], -1),
            u("span", null, "Compose", -1)
          ])], 2),
          u("button", {
            id: "cfw-nav-list",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "list" }]),
            type: "button",
            onClick: C[15] || (C[15] = (X) => F("list"))
          }, [...C[27] || (C[27] = [
            u("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M4 6h16M4 12h16M4 18h16"
              })
            ], -1),
            u("span", null, "Activity", -1)
          ])], 2),
          u("button", {
            id: "cfw-nav-settings",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "settings" }]),
            type: "button",
            onClick: C[16] || (C[16] = (X) => F("settings"))
          }, [...C[28] || (C[28] = [
            u("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              }),
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              })
            ], -1),
            u("span", null, "Settings", -1)
          ])], 2),
          h(s).handedness !== "left" ? ($(), A("button", {
            key: 1,
            class: "cfw-nav-btn",
            type: "button",
            onClick: C[17] || (C[17] = (X) => le(!1))
          }, [...C[29] || (C[29] = [
            u("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              u("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            u("span", null, "Close", -1)
          ])])) : ie("", !0)
        ]),
        ke(Na, {
          open: h(m).sheetOpen.value,
          issue: h(m).sheetIssue.value,
          "filter-mode": h(m).filterMode.value,
          onActionDone: ee,
          onClose: C[18] || (C[18] = (X) => se(2)),
          onFilterChanged: C[19] || (C[19] = (X) => h(r)(!0)),
          onComposeSheet: T
        }, null, 8, ["open", "issue", "filter-mode"]),
        ke(bf, {
          open: E.value,
          mode: J.value,
          issue: D.value,
          onClose: C[20] || (C[20] = (X) => se(3)),
          onActionDone: ee
        }, null, 8, ["open", "mode", "issue"])
      ], 14, kf), [
        [tn, h(g).isOpen.value]
      ])
    ], 64));
  }
}), Pf = /* @__PURE__ */ tt({
  __name: "FeedbackWidget.ce",
  props: {
    widgetConfig: { type: Object }
  },
  setup(e, { expose: t }) {
    const s = e, n = Ee(), { restore: o } = Ue(), { readToken: i } = Hi(), r = /* @__PURE__ */ O(null);
    return t({
      openItem(l) {
        r.value && r.value.openItem(l);
      }
    }), Vs(() => {
      s.widgetConfig && (n.init(s.widgetConfig), o(), i());
    }), (l, c) => ($(), rs(Ef, {
      ref_key: "mobileWidgetRef",
      ref: r
    }, null, 512));
  }
}), Af = "*{box-sizing:border-box}:host{all:initial;font-family:IBM Plex Sans,Segoe UI,sans-serif}#cfw-mobile{font-size:15px}#cfw-mobile[data-font-size=small]{font-size:13px}#cfw-mobile[data-font-size=large]{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-nav-btn{font-size:9px}#cfw-mobile[data-font-size=large] .cfw-nav-btn{font-size:12px}#cfw-mobile[data-font-size=small] #cfw-ml-head-title{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-title{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-head-actions button{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-actions button{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-ptr{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-ptr{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-ml-empty{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-empty{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-row-bg{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-row-bg{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-section-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-section-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-status{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-status{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-comments{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-comments{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-time{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-time{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-title{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-ml-row-title{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-ml-row-menu{font-size:16px}#cfw-mobile[data-font-size=large] .cfw-ml-row-menu{font-size:22px}#cfw-mobile[data-font-size=small] .cfw-desktop-menu button{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-desktop-menu button{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-compose-mode-btn{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-compose-mode-btn{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf input{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf input{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf textarea{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf textarea{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf-policy label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-mf-policy label{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-mf-error{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-mf-error{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf-actions button{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-mf-actions button{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-success-hint{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-success-hint{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-undo-btn{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-undo-btn{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-vstatus-line{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vstatus-line{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vmeta{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-vmeta{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-vcontrols button{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vcontrols button{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vhint{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-vhint{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-verror{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-verror{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-settings h3{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings h3{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings-btn{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-settings-note{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-note{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-token{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-token{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings select{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings select{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-hand-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-hand-btn{font-size:17px}#cfw-mobile[data-font-size=small] #cfw-swipe-hint{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-swipe-hint{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-pill{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-pill{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-swipe-row label{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-swipe-row label{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-ref h4{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-ref h4{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-row{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-row{font-size:14px}:root{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 14px;--cfw-density-nav-h: 56px}#cfw-mobile[data-density=compact]{--cfw-density-row-pad: 10px;--cfw-density-body-pad: 10px;--cfw-density-gap: 10px;--cfw-density-nav-h: 48px}#cfw-mobile[data-density=compact] .cfw-ml-row{padding-top:10px;padding-bottom:10px}#cfw-mobile[data-density=compact] .cfw-tab-body{padding:10px}#cfw-mobile[data-density=compact] .cfw-m-settings{gap:10px;padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=compact] .cfw-mf{padding:10px;gap:8px}#cfw-mobile[data-density=compact] #cfw-mobile-nav{height:48px}#cfw-mobile[data-density=compact] .cfw-m-voice{padding:10px;gap:10px}#cfw-mobile[data-density=compact] .cfw-m-swipe-settings{gap:8px}#cfw-mobile[data-density=compact] .cfw-compose-mode-toggle{padding-top:10px}#cfw-mobile[data-density=comfortable]{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 18px;--cfw-density-nav-h: 60px}#cfw-mobile[data-density=comfortable] .cfw-ml-row{padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=comfortable] .cfw-tab-body{padding:14px}#cfw-mobile[data-density=comfortable] .cfw-m-settings{gap:18px;padding-top:20px;padding-bottom:20px}#cfw-mobile[data-density=comfortable] .cfw-mf{padding:14px;gap:14px}#cfw-mobile[data-density=comfortable] #cfw-mobile-nav{height:60px}#cfw-mobile[data-density=comfortable] .cfw-m-voice{padding:14px;gap:16px}#cfw-mobile[data-density=comfortable] .cfw-m-swipe-settings{gap:14px}#cfw-mobile[data-density=comfortable] .cfw-compose-mode-toggle{padding-top:14px}.cfw-tab-body::-webkit-scrollbar{width:6px}.cfw-tab-body::-webkit-scrollbar-track{background:transparent}.cfw-tab-body::-webkit-scrollbar-thumb{background:var(--cfw-accent-dim, #2f4864);border-radius:3px}.cfw-tab-body::-webkit-scrollbar-thumb:hover{background:var(--cfw-accent, #7cc4ff)}.cfw-tab-body{scrollbar-width:thin;scrollbar-color:var(--cfw-accent-dim, #2f4864) transparent}#cfw-mobile[data-theme=ocean]{--cfw-accent: #7cc4ff;--cfw-accent-soft: #9ad2ff;--cfw-accent-dim: #2f4864;--cfw-accent-bg: rgba(124, 187, 255, .1)}#cfw-mobile[data-theme=forest]{--cfw-accent: #6ee7b7;--cfw-accent-soft: #a7f3d0;--cfw-accent-dim: #2d4a3e;--cfw-accent-bg: rgba(110, 231, 183, .1)}#cfw-mobile[data-theme=forest] #cfw-mobile-launcher{color:#6ee7b7;border-color:#6ee7b766}#cfw-mobile[data-theme=forest] #cfw-nav-text.active,#cfw-mobile[data-theme=forest] #cfw-nav-list.active,#cfw-mobile[data-theme=forest] #cfw-nav-settings.active,#cfw-mobile[data-theme=forest] .cfw-nav-btn.active,#cfw-mobile[data-theme=forest] #cfw-ml-head-title,#cfw-mobile[data-theme=forest] .cfw-ml-section-label,#cfw-mobile[data-theme=forest] .cfw-ml-row-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-panel-handle-bar{background:#2d4a3e}#cfw-mobile[data-theme=forest] .cfw-m-settings h3{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=forest] .cfw-compose-mode-btn.active{border-color:#6ee7b78c;color:#d9e7f7}#cfw-mobile[data-theme=forest] .cfw-m-success-ring{border-color:#6ee7b759;background:#6ee7b71f}#cfw-mobile[data-theme=forest] .cfw-fs-label,#cfw-mobile[data-theme=forest] .cfw-is-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-badge{background:#6ee7b726;border-color:#6ee7b74d;color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-is-section-label,#cfw-mobile[data-theme=forest] .cfw-m-gesture-ref h4{color:#6ee7b7}#cfw-mobile[data-theme=berry]{--cfw-accent: #c4b5fd;--cfw-accent-soft: #ddd6fe;--cfw-accent-dim: #4c4568;--cfw-accent-bg: rgba(196, 181, 253, .1)}#cfw-mobile[data-theme=berry] #cfw-mobile-launcher{color:#c4b5fd;border-color:#c4b5fd66}#cfw-mobile[data-theme=berry] #cfw-nav-text.active,#cfw-mobile[data-theme=berry] #cfw-nav-list.active,#cfw-mobile[data-theme=berry] #cfw-nav-settings.active,#cfw-mobile[data-theme=berry] .cfw-nav-btn.active,#cfw-mobile[data-theme=berry] #cfw-ml-head-title,#cfw-mobile[data-theme=berry] .cfw-ml-section-label,#cfw-mobile[data-theme=berry] .cfw-ml-row-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-panel-handle-bar{background:#4c4568}#cfw-mobile[data-theme=berry] .cfw-m-settings h3{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=berry] .cfw-compose-mode-btn.active{border-color:#c4b5fd8c;color:#d9e7f7}#cfw-mobile[data-theme=berry] .cfw-m-success-ring{border-color:#c4b5fd59;background:#c4b5fd1f}#cfw-mobile[data-theme=berry] .cfw-fs-label,#cfw-mobile[data-theme=berry] .cfw-is-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-badge{background:#c4b5fd26;border-color:#c4b5fd4d;color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-is-section-label,#cfw-mobile[data-theme=berry] .cfw-m-gesture-ref h4{color:#c4b5fd}#cfw-mobile[data-theme=sunset]{--cfw-accent: #fdba74;--cfw-accent-soft: #fed7aa;--cfw-accent-dim: #5c4538;--cfw-accent-bg: rgba(253, 186, 116, .1)}#cfw-mobile[data-theme=sunset] #cfw-mobile-launcher{color:#fdba74;border-color:#fdba7466}#cfw-mobile[data-theme=sunset] #cfw-nav-text.active,#cfw-mobile[data-theme=sunset] #cfw-nav-list.active,#cfw-mobile[data-theme=sunset] #cfw-nav-settings.active,#cfw-mobile[data-theme=sunset] .cfw-nav-btn.active,#cfw-mobile[data-theme=sunset] #cfw-ml-head-title,#cfw-mobile[data-theme=sunset] .cfw-ml-section-label,#cfw-mobile[data-theme=sunset] .cfw-ml-row-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-panel-handle-bar{background:#5c4538}#cfw-mobile[data-theme=sunset] .cfw-m-settings h3{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=sunset] .cfw-compose-mode-btn.active{border-color:#fdba748c;color:#d9e7f7}#cfw-mobile[data-theme=sunset] .cfw-m-success-ring{border-color:#fdba7459;background:#fdba741f}#cfw-mobile[data-theme=sunset] .cfw-fs-label,#cfw-mobile[data-theme=sunset] .cfw-is-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-badge{background:#fdba7426;border-color:#fdbafd4d;color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-is-section-label,#cfw-mobile[data-theme=sunset] .cfw-m-gesture-ref h4{color:#fdba74}#cfw-desktop-backdrop{display:none}#cfw-mobile{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;background:#0a111d;color:#d9e7f7;font-family:IBM Plex Sans,Segoe UI,sans-serif}.cfw-panel-handle{height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none}.cfw-panel-handle-bar{width:36px;height:4px;background:#2f4864;border-radius:2px}.cfw-panel-handle-bottom{margin-top:auto}.cfw-panel-handle-bottom .cfw-panel-handle-bar{opacity:.7}#cfw-mobile-launcher{display:flex;position:fixed;bottom:10px;right:10px;width:34px;height:34px;border-radius:6px;background:#0a111df2;border:1px solid rgba(124,187,255,.4);color:#9ad2ff;align-items:center;justify-content:center;cursor:pointer;z-index:9998;box-shadow:0 8px 20px #02070e59;-webkit-tap-highlight-color:transparent}#cfw-mobile-launcher.panel-left{left:20px;right:auto}#cfw-mobile-launcher svg{width:14px;height:14px}#cfw-mobile-body{flex:1;overflow:hidden;position:relative}.cfw-mv{position:absolute;top:0;right:0;bottom:0;left:0;display:none;flex-direction:column;overflow:hidden}.cfw-mv.active{display:flex}.cfw-tab-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain}#cfw-mobile-body.snap-bottom .cfw-mv{justify-content:flex-end}#cfw-mobile-body.snap-bottom .cfw-tab-body{flex:0 0 auto;max-height:100%}#cfw-mobile-body.snap-top .cfw-tab-body{order:0;flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-body.snap-top .cfw-panel-handle{order:1}#cfw-mobile-body.snap-middle .cfw-mv{justify-content:center}#cfw-mobile-body.snap-middle .cfw-tab-body{flex:0 0 auto;max-height:calc(100% - 56px)}#cfw-mobile-body.snap-middle .cfw-panel-handle-bottom{flex-shrink:0}#cfw-mobile-nav{height:56px;display:flex;border-top:1px solid rgba(124,187,255,.18);background:#0a111dfa;flex-shrink:0}.cfw-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:none;border:none;color:#7f9cbc;cursor:pointer;font-size:10px;padding:0;-webkit-tap-highlight-color:transparent;transition:color .15s}.cfw-nav-btn:hover{color:#d9e7f7}.cfw-nav-btn.active,.cfw-nav-btn.active:hover{color:#9ad2ff}.cfw-nav-btn svg{width:20px;height:20px}#cfw-ml-head{padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(124,187,255,.18);flex-shrink:0}#cfw-ml-head-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}#cfw-ml-head-actions{display:flex;gap:8px}#cfw-ml-head-actions button{height:30px;padding:0 10px;border:1px solid #2f4864;border-radius:6px;background:#0d1727;color:#9bb7d3;font-size:12px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}#cfw-ml-head-actions button:hover:not(:disabled){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff14}#cfw-ml-head-actions button:disabled{opacity:.5}#cfw-ml-body{overflow-y:auto;overscroll-behavior-y:contain}#cfw-ml-ptr{height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9ad2ff;transition:height .15s ease;flex-shrink:0}#cfw-ml-ptr.cfw-ml-ptr-active{height:36px}.cfw-ml-empty{padding:32px 14px;font-size:13px;color:#7f9cbc;text-align:center;line-height:1.6}.cfw-ml-row-wrap{position:relative;border-bottom:1px solid #1a2d42}.cfw-ml-row-bg{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font-size:13px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.cfw-ml-row-bg.bg-left{background:#eab308;opacity:1;justify-content:flex-start}.cfw-ml-row-bg.bg-right{background:#3b82f6;opacity:1;justify-content:flex-end}.cfw-swipe-preview{display:flex;align-items:center;gap:8px}.cfw-swipe-preview.preview-left{flex-direction:row-reverse}.cfw-ml-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:12px 20px 4px;font-weight:600}.cfw-ml-row{position:relative;padding:14px 20px;background:#0a111d;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;-webkit-tap-highlight-color:transparent}.cfw-ml-row:active{background:#7cbbff0f}.cfw-ml-row-main{flex:1;min-width:0}.cfw-ml-row-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.cfw-ml-row-status{font-size:11px;color:#7cc4ff;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-ml-row-comments{font-size:11px;color:#7f9cbc}.cfw-ml-unread-dot{width:6px;height:6px;border-radius:50%;background:#ef4444}.cfw-ml-row-time{font-size:11px;color:#7f9cbc;margin-left:auto}.cfw-ml-row-title{font-size:14px;color:#d9e7f7;line-height:1.4;word-break:break-word}.cfw-ml-row-menu{background:none;border:none;color:#7f9cbc;font-size:18px;line-height:1;padding:4px 8px;cursor:pointer;margin-top:-2px;border-radius:4px;transition:color .15s,background .15s}.cfw-ml-row-menu:hover{color:#d9e7f7;background:#7cbbff1a}.cfw-desktop-menu{position:fixed;background:#0d1727;border:1px solid rgba(124,187,255,.28);border-radius:8px;padding:6px;display:flex;flex-direction:column;z-index:10000;box-shadow:0 4px 20px #0009;max-height:300px;overflow-y:auto;min-width:140px}.cfw-desktop-menu button{background:none;border:none;color:#d9e7f7;padding:8px 12px;text-align:left;font-size:13px;cursor:pointer;border-radius:4px;white-space:nowrap;transition:color .15s,background .15s}.cfw-desktop-menu button:hover{background:#7cbbff26;color:#fff}#cfw-ml-error{margin:8px 14px 0}#cfw-mbs-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10001;display:none}#cfw-mbs-overlay.active{display:block}#cfw-mobile #cfw-mbs-overlay{position:absolute}#cfw-mbs{position:fixed;bottom:0;left:0;right:0;z-index:10002;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 36px;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .25s ease}#cfw-mbs.active{transform:translateY(0)}#cfw-mobile #cfw-mbs{position:absolute;top:0;right:0;bottom:0;left:0;max-height:none;border-radius:0;border:none;z-index:10002}#cfw-mobile #cfw-mbs-overlay{z-index:10001}#cfw-mbs-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px}.cfw-mf{display:flex;flex-direction:column;padding:14px}.cfw-compose-mode-toggle{display:flex;gap:8px;padding:14px 14px 0;flex-shrink:0}.cfw-compose-mode-btn{flex:1;height:36px;border-radius:999px;border:1px solid #2f4864;background:#0d1727;color:#9bb7d3;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-compose-mode-btn:hover:not(.active){border-color:#7cbbff66;color:#d9e7f7}.cfw-compose-mode-btn.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f2035}.cfw-mf input,.cfw-mf textarea,.cfw-mf select{width:100%;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;box-sizing:border-box;font-family:inherit}.cfw-mf input{height:44px;padding:0 14px;margin-bottom:10px;font-size:15px;flex-shrink:0}.cfw-textarea-wrap{margin-bottom:10px}.cfw-mf textarea{width:100%;height:130px;min-height:130px;max-height:40vh;padding:12px 14px;font-size:15px;resize:none;overflow-y:hidden;margin-bottom:0}.cfw-mf input::placeholder,.cfw-mf textarea::placeholder{color:#7f9cbc}.cfw-mf input:focus,.cfw-mf textarea:focus{outline:none;border-color:#4f7298}.cfw-mf-policy{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.cfw-mf-policy label{font-size:12px;color:#9bb7d3}.cfw-mf-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:8px;flex-shrink:0}.cfw-mf-error.active{display:block}.cfw-mf-actions{display:flex;gap:8px;flex-shrink:0}.cfw-mf-actions button{flex:1;height:48px;border-radius:8px;border:1px solid;font-size:14px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-mf-actions button:hover{filter:brightness(1.1)}.cfw-mf-actions button:active{transform:scale(.98)}.cfw-m-success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.cfw-m-success-ring{width:80px;height:80px;border-radius:50%;background:#4ade801f;border:2px solid rgba(74,222,128,.35);display:flex;align-items:center;justify-content:center;margin-bottom:18px}.cfw-m-success-ring svg{width:44px;height:44px;color:#4ade80}.cfw-m-success-hint{font-size:13px;color:#7f9cbc}.cfw-m-undo-btn{margin-top:14px;padding:7px 18px;border-radius:8px;border:1px solid rgba(124,187,255,.35);background:transparent;color:#d9e7f7;font-size:12px;cursor:pointer}.cfw-m-undo-btn:hover{background:#7cbbff14}.cfw-m-voice{display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:14px}.cfw-m-vstatus{border:1px solid #2f4864;border-radius:12px;padding:16px;background:#0b1828a6;flex-shrink:0}.cfw-m-vstatus-line{font-size:15px;color:#d9e7f7;margin-bottom:8px}.cfw-m-vmeta{display:flex;justify-content:space-between;font-size:13px;color:#9bb7d3}.cfw-m-vcontrols{display:flex;gap:10px;flex-shrink:0}.cfw-m-vcontrols button{flex:1;height:52px;border-radius:10px;border:1px solid;font-size:15px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-m-vcontrols .cfw-btn-record{background:#dc2626;border-color:#dc2626;color:#fff}.cfw-m-vcontrols .cfw-btn-record:hover:not(:disabled){background:#ef4444;border-color:#ef4444}.cfw-m-vcontrols .cfw-btn-record:active:not(:disabled){background:#b91d1d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send{background:#16a34a;border-color:#16a34a;color:#fff}.cfw-m-vcontrols .cfw-btn-send:hover:not(:disabled){background:#22c55e;border-color:#22c55e}.cfw-m-vcontrols .cfw-btn-send:active:not(:disabled){background:#15803d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send:disabled{background:#14532d;border-color:#14532d;color:#7f9cbc}.cfw-m-vcontrols .cfw-btn-reset{background:#d97706;border-color:#d97706;color:#fff}.cfw-m-vcontrols .cfw-btn-reset:hover:not(:disabled){background:#f59e0b;border-color:#f59e0b}.cfw-m-vcontrols .cfw-btn-reset:active:not(:disabled){background:#b45309;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-reset:disabled{background:#78350f;border-color:#78350f;color:#7f9cbc}.cfw-m-vhint{font-size:12px;color:#7f9cbc;flex-shrink:0}.cfw-m-verror{font-size:13px;color:#ff9a9a;display:none;flex-shrink:0}.cfw-m-verror.active{display:block}.cfw-m-settings{padding:20px 14px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}.cfw-m-settings h3{margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}.cfw-m-settings-btn{height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;width:100%;transition:border-color .15s,background .15s}.cfw-m-settings-btn:hover{border-color:#7cbbff80;background:#7cbbff14}.cfw-m-settings-btn:active{background:#0f1c2f}.cfw-m-settings-note{font-size:12px;color:#7f9cbc;margin:0}.cfw-m-settings-token{font-size:12px;color:#9bb7d3}.cfw-m-settings select{width:100%;height:44px;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;padding:0 12px;font-size:14px;font-family:inherit}.cfw-m-hand-toggle{display:flex;gap:8px}.cfw-m-hand-btn{flex:1;height:44px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#9bb7d3;font-size:14px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-m-hand-btn:hover:not(.active){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff0d}.cfw-m-hand-btn.active{border-color:#9ad2ff;background:#0f2035;color:#9ad2ff;font-weight:600}#cfw-swipe-hint{display:block;position:fixed;bottom:62px;font-size:11px;color:#9ad2ff;background:#0a111deb;border:1px solid rgba(124,187,255,.3);border-radius:6px;padding:4px 8px;pointer-events:none;opacity:0;transition:opacity .4s;white-space:nowrap;z-index:9999}#cfw-swipe-hint.visible{opacity:1}.cfw-fs-section{margin-bottom:18px}.cfw-fs-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:8px}.cfw-fs-pills{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:32px;padding:0 14px;font-size:12px;cursor:pointer}.cfw-fs-pill.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-fs-chips{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-chip{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:28px;padding:0 10px;font-size:11px;cursor:pointer}.cfw-fs-chip.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-num{font-size:11px;color:#7f9cbc;margin-bottom:6px;font-weight:500}.cfw-is-title{font-size:17px;color:#d9e7f7;margin-bottom:8px;word-break:break-word;text-decoration:none;display:block;line-height:1.3;font-weight:600}.cfw-is-title:hover{color:#9ad2ff;text-decoration:underline}.cfw-is-status{font-size:12px;color:#7cc4ff;margin-bottom:2px;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-is-section{margin-bottom:24px}.cfw-is-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:24px 0 12px;font-weight:600}.cfw-is-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.cfw-badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#7cbbff26;border:1px solid rgba(124,187,255,.3);color:#9ad2ff;font-size:12px;font-weight:500}.cfw-btn{height:44px;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;padding:0 16px;transition:all .15s ease;border:1px solid transparent}.cfw-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-btn-primary{background:#2563eb;border-color:#2563eb;color:#fff}.cfw-btn-primary:hover:not(:disabled){background:#3b82f6;border-color:#3b82f6}.cfw-btn-primary:active:not(:disabled){background:#1d4ed8;transform:scale(.98)}.cfw-btn-outline{background:transparent;border-color:#7cbbff66;color:#9bb7d3}.cfw-btn-outline:hover:not(:disabled){border-color:#7cbbffb3;color:#d9e7f7;background:#7cbbff14}.cfw-btn-outline:active:not(:disabled){transform:scale(.98)}textarea::-webkit-scrollbar{width:8px}textarea::-webkit-scrollbar-track{background:#0003;border-radius:4px}textarea::-webkit-scrollbar-thumb{background:#7cbbff4d;border-radius:4px}textarea::-webkit-scrollbar-thumb:hover{background:#7cbbff80}.cfw-is-primary-box{margin-bottom:24px}.cfw-is-pills{display:flex;flex-wrap:wrap;gap:8px}.cfw-is-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:36px;padding:0 18px;font-size:13px;cursor:pointer;transition:all .15s ease}.cfw-is-pill:hover{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-pill-primary{border-color:#2563eb99;background:#2563eb26;color:#60a5fa}.cfw-is-pill-primary:hover{border-color:#2563ebe6;background:#2563eb40;color:#93c5fd}.cfw-comments-section{border-top:1px solid rgba(124,187,255,.15);padding-top:20px}.cfw-comment{margin-bottom:16px;padding:12px;border-radius:8px;background:#7cbbff0a;border:1px solid rgba(124,187,255,.1)}.cfw-comment-newest{background:#7cbbff14;border-color:#7cbbff33}.cfw-comment-meta{font-size:12px;color:#7f9cbc;margin-bottom:6px}.cfw-comment-meta strong{color:#9bb7d3;font-weight:600}.cfw-comment-body{font-size:14px;color:#d9e7f7;line-height:1.5;white-space:pre-wrap;word-break:break-word}.cfw-comments-expand{width:100%;padding:8px;background:none;border:1px dashed rgba(124,187,255,.3);border-radius:6px;color:#9bb7d3;font-size:13px;cursor:pointer;margin-bottom:16px}.cfw-comments-expand:hover{background:#7cbbff0d;border-color:#7cbbff80;color:#d9e7f7}.cfw-is-actions{display:flex;flex-wrap:wrap;gap:8px}.cfw-is-action-btn{flex:1;min-width:100px;height:40px;border-radius:8px;border:1px solid rgba(124,187,255,.4);background:#0d1727;color:#d9e7f7;font-size:13px;cursor:pointer;text-align:center;padding:0 12px}.cfw-is-action-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-is-action-reason{font-size:11px;color:#7f9cbc;font-style:italic;display:block;padding:0 2px}.cfw-is-pr-link{color:#9ad2ff;text-decoration:underline;text-underline-offset:2px;font-size:13px}.cfw-is-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:10px}.cfw-is-error.active{display:block}.cfw-mbs-close{width:100%;height:48px;border-radius:8px;border:1px solid #2f4864;background:transparent;color:#9bb7d3;font-size:14px;cursor:pointer;margin-top:8px}@media(min-width:681px){#cfw-desktop-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9998;background:#02061773;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#cfw-mobile{top:0!important;bottom:0!important;width:420px;height:100%;border-radius:0;border:1px solid rgba(124,187,255,.28);box-shadow:0 0 40px #02070e8c;left:auto;right:0;border-left:1px solid rgba(124,187,255,.28);transition:none!important}#cfw-mobile.panel-left{left:0;right:auto;border-left:none;border-right:1px solid rgba(124,187,255,.28)}.cfw-panel-handle{display:none}#cfw-mobile-launcher{right:30px;bottom:10px}#cfw-mobile-launcher.panel-left{left:30px;right:auto}#cfw-mbs{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-mbs.panel-left{left:0;right:auto}#cfw-mbs-overlay{background:#0206174d}#cfw-swipe-hint{display:none!important}#cfw-compose-sheet{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-compose-sheet.panel-left{left:0;right:auto}#cfw-compose-overlay{background:#0206174d}#cfw-mobile #cfw-mbs{position:absolute;top:0;right:0;bottom:0;left:0;max-height:none;border-radius:0;border:none;z-index:10002}#cfw-mobile #cfw-mbs-overlay{position:absolute;z-index:10001}#cfw-mobile #cfw-compose-sheet{position:absolute;top:0;right:0;bottom:0;left:0;max-height:none;border-radius:0;border:none;z-index:10006}#cfw-mobile #cfw-compose-overlay{position:absolute;z-index:10005}}#cfw-compose-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10005;display:none}#cfw-compose-overlay.active{display:block}#cfw-mobile #cfw-compose-overlay{position:absolute}#cfw-compose-sheet{position:fixed;bottom:0;left:0;right:0;z-index:10006;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 24px;max-height:85vh;transform:translateY(100%);transition:transform .25s ease;display:flex;flex-direction:column}#cfw-compose-sheet.active{transform:translateY(0)}#cfw-mobile #cfw-compose-sheet{position:absolute;top:0;right:0;bottom:0;left:0;max-height:none;border-radius:0;border:none;z-index:10006}#cfw-mobile #cfw-compose-overlay{z-index:10005}#cfw-compose-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px;flex-shrink:0}.cfw-compose-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}.cfw-compose-title{font-size:14px;font-weight:600;color:#d9e7f7}.cfw-compose-close{background:none;border:none;color:#7f9cbc;font-size:24px;cursor:pointer;line-height:1;padding:4px;margin:-4px}.cfw-compose-context{margin-bottom:16px;flex-shrink:0}.cfw-compose-actions{padding:14px;border-top:1px solid rgba(124,187,255,.15);display:flex;justify-content:flex-end;gap:8px;flex-shrink:0}.cfw-compose-context-quote{font-size:13px;color:#7f9cbc;border-left:2px solid #2f4864;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cfw-compose-body{flex:1;overflow-y:auto;display:flex;flex-direction:column}.cfw-m-swipe-settings{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}.cfw-m-swipe-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.cfw-m-swipe-row label{font-size:13px;color:#d9e7f7;font-weight:500;flex-shrink:0}.cfw-m-swipe-row .cfw-select{flex:1;min-width:120px;max-width:200px}.cfw-m-gesture-ref{background:#7cbbff0d;border-radius:8px;padding:12px;margin-top:16px;border:1px dashed rgba(124,187,255,.2)}.cfw-m-gesture-ref h4{font-size:11px;text-transform:uppercase;color:#7cc4ff;margin:0 0 8px;font-weight:600;padding:0}.cfw-m-gesture-row{display:flex;justify-content:space-between;font-size:12px;color:#9bb7d3;margin-bottom:4px}.cfw-m-gesture-row:last-child{margin-bottom:0}", If = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Lf = /* @__PURE__ */ If(Pf, [["styles", [Af]]]);
export {
  Lf as F,
  Df as c,
  Of as d,
  Ee as u
};
