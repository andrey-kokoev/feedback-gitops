/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function kn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const pe = {}, Rt = [], Qe = () => {
}, Vo = () => !1, Rs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Cn = (e) => e.startsWith("onUpdate:"), xe = Object.assign, Tn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Zi = Object.prototype.hasOwnProperty, ce = (e, t) => Zi.call(e, t), q = Array.isArray, It = (e) => fs(e) === "[object Map]", Is = (e) => fs(e) === "[object Set]", Yn = (e) => fs(e) === "[object Date]", X = (e) => typeof e == "function", ve = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", de = (e) => e !== null && typeof e == "object", No = (e) => (de(e) || X(e)) && X(e.then) && X(e.catch), Ho = Object.prototype.toString, fs = (e) => Ho.call(e), er = (e) => fs(e).slice(8, -1), Os = (e) => fs(e) === "[object Object]", Ds = (e) => ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ kn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ls = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, tr = /-\w/g, Le = Ls(
  (e) => e.replace(tr, (t) => t.slice(1).toUpperCase())
), sr = /\B([A-Z])/g, Re = Ls(
  (e) => e.replace(sr, "-$1").toLowerCase()
), zn = Ls((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xs = Ls(
  (e) => e ? `on${zn(e)}` : ""
), ht = (e, t) => !Object.is(e, t), ws = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Uo = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, js = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Gn = (e) => {
  const t = ve(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Jn;
const Fs = () => Jn || (Jn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function zt(e) {
  if (q(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = ve(n) ? rr(n) : zt(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (ve(e) || de(e))
    return e;
}
const nr = /;(?![^(]*\))/g, or = /:([^]+)/, ir = /\/\*[^]*?\*\//g;
function rr(e) {
  const t = {};
  return e.replace(ir, "").split(nr).forEach((s) => {
    if (s) {
      const n = s.split(or);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function U(e) {
  let t = "";
  if (ve(e))
    t = e;
  else if (q(e))
    for (let s = 0; s < e.length; s++) {
      const n = U(e[s]);
      n && (t += n + " ");
    }
  else if (de(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const lr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", cr = /* @__PURE__ */ kn(lr);
function Ko(e) {
  return !!e || e === "";
}
function ar(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = us(e[n], t[n]);
  return s;
}
function us(e, t) {
  if (e === t) return !0;
  let s = Yn(e), n = Yn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Ze(e), n = Ze(t), s || n)
    return e === t;
  if (s = q(e), n = q(t), s || n)
    return s && n ? ar(e, t) : !1;
  if (s = de(e), n = de(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, i = Object.keys(t).length;
    if (o !== i)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), c = t.hasOwnProperty(r);
      if (l && !c || !l && c || !us(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function fr(e, t) {
  return e.findIndex((s) => us(s, t));
}
const Bo = (e) => !!(e && e.__v_isRef === !0), V = (e) => ve(e) ? e : e == null ? "" : q(e) || de(e) && (e.toString === Ho || !X(e.toString)) ? Bo(e) ? V(e.value) : JSON.stringify(e, Wo, 2) : String(e), Wo = (e, t) => Bo(t) ? Wo(e, t.value) : It(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[Qs(n, i) + " =>"] = o, s),
    {}
  )
} : Is(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Qs(s))
} : Ze(t) ? Qs(t) : de(t) && !q(t) && !Os(t) ? String(t) : t, Qs = (e, t = "") => {
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
let _e;
class qo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = _e, !t && _e && (this.index = (_e.scopes || (_e.scopes = [])).push(
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
      const s = _e;
      try {
        return _e = this, t();
      } finally {
        _e = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = _e, _e = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (_e = this.prevScope, this.prevScope = void 0);
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
function Yo(e) {
  return new qo(e);
}
function Go() {
  return _e;
}
function ur(e, t = !1) {
  _e && _e.cleanups.push(e);
}
let he;
const Zs = /* @__PURE__ */ new WeakSet();
class Jo {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, _e && _e.active && _e.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Zs.has(this) && (Zs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Qo(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Xn(this), Zo(this);
    const t = he, s = Ve;
    he = this, Ve = !0;
    try {
      return this.fn();
    } finally {
      ei(this), he = t, Ve = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        En(t);
      this.deps = this.depsTail = void 0, Xn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Zs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    fn(this) && this.run();
  }
  get dirty() {
    return fn(this);
  }
}
let Xo = 0, Xt, Qt;
function Qo(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Qt, Qt = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function Mn() {
  Xo++;
}
function $n() {
  if (--Xo > 0)
    return;
  if (Qt) {
    let t = Qt;
    for (Qt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
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
function Zo(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ei(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const o = n.prevDep;
    n.version === -1 ? (n === s && (s = o), En(n), dr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function fn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ti(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ti(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === is) || (e.globalVersion = is, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !fn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = he, n = Ve;
  he = e, Ve = !0;
  try {
    Zo(e);
    const o = e.fn(e._value);
    (t.version === 0 || ht(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    he = s, Ve = n, ei(e), e.flags &= -3;
  }
}
function En(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      En(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function dr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Ve = !0;
const si = [];
function ct() {
  si.push(Ve), Ve = !1;
}
function at() {
  const e = si.pop();
  Ve = e === void 0 ? !0 : e;
}
function Xn(e) {
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
let is = 0;
class pr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class An {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!he || !Ve || he === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== he)
      s = this.activeLink = new pr(he, this), he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, ni(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, is++, this.notify(t);
  }
  notify(t) {
    Mn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      $n();
    }
  }
}
function ni(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        ni(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const _s = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ Symbol(
  ""
), un = /* @__PURE__ */ Symbol(
  ""
), rs = /* @__PURE__ */ Symbol(
  ""
);
function Se(e, t, s) {
  if (Ve && he) {
    let n = _s.get(e);
    n || _s.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new An()), o.map = n, o.key = s), o.track();
  }
}
function it(e, t, s, n, o, i) {
  const r = _s.get(e);
  if (!r) {
    is++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (Mn(), t === "clear")
    r.forEach(l);
  else {
    const c = q(e), m = c && Ds(s);
    if (c && s === "length") {
      const a = Number(n);
      r.forEach((p, w) => {
        (w === "length" || w === rs || !Ze(w) && w >= a) && l(p);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), m && l(r.get(rs)), t) {
        case "add":
          c ? m && l(r.get("length")) : (l(r.get(St)), It(e) && l(r.get(un)));
          break;
        case "delete":
          c || (l(r.get(St)), It(e) && l(r.get(un)));
          break;
        case "set":
          It(e) && l(r.get(St));
          break;
      }
  }
  $n();
}
function mr(e, t) {
  const s = _s.get(e);
  return s && s.get(t);
}
function Et(e) {
  const t = /* @__PURE__ */ ie(e);
  return t === e ? t : (Se(t, "iterate", rs), /* @__PURE__ */ je(e) ? t : t.map(Ne));
}
function Vs(e) {
  return Se(e = /* @__PURE__ */ ie(e), "iterate", rs), e;
}
function pt(e, t) {
  return /* @__PURE__ */ ft(e) ? Lt(/* @__PURE__ */ lt(e) ? Ne(t) : t) : Ne(t);
}
const hr = {
  __proto__: null,
  [Symbol.iterator]() {
    return en(this, Symbol.iterator, (e) => pt(this, e));
  },
  concat(...e) {
    return Et(this).concat(
      ...e.map((t) => q(t) ? Et(t) : t)
    );
  },
  entries() {
    return en(this, "entries", (e) => (e[1] = pt(this, e[1]), e));
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
    return tn(this, "includes", e);
  },
  indexOf(...e) {
    return tn(this, "indexOf", e);
  },
  join(e) {
    return Et(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return tn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Bt(this, "pop");
  },
  push(...e) {
    return Bt(this, "push", e);
  },
  reduce(e, ...t) {
    return Qn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Qn(this, "reduceRight", e, t);
  },
  shift() {
    return Bt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Bt(this, "splice", e);
  },
  toReversed() {
    return Et(this).toReversed();
  },
  toSorted(e) {
    return Et(this).toSorted(e);
  },
  toSpliced(...e) {
    return Et(this).toSpliced(...e);
  },
  unshift(...e) {
    return Bt(this, "unshift", e);
  },
  values() {
    return en(this, "values", (e) => pt(this, e));
  }
};
function en(e, t, s) {
  const n = Vs(e), o = n[t]();
  return n !== e && !/* @__PURE__ */ je(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const br = Array.prototype;
function st(e, t, s, n, o, i) {
  const r = Vs(e), l = r !== e && !/* @__PURE__ */ je(e), c = r[t];
  if (c !== br[t]) {
    const p = c.apply(e, i);
    return l ? Ne(p) : p;
  }
  let m = s;
  r !== e && (l ? m = function(p, w) {
    return s.call(this, pt(e, p), w, e);
  } : s.length > 2 && (m = function(p, w) {
    return s.call(this, p, w, e);
  }));
  const a = c.call(r, m, n);
  return l && o ? o(a) : a;
}
function Qn(e, t, s, n) {
  const o = Vs(e);
  let i = s;
  return o !== e && (/* @__PURE__ */ je(e) ? s.length > 3 && (i = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : i = function(r, l, c) {
    return s.call(this, r, pt(e, l), c, e);
  }), o[t](i, ...n);
}
function tn(e, t, s) {
  const n = /* @__PURE__ */ ie(e);
  Se(n, "iterate", rs);
  const o = n[t](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ Hs(s[0]) ? (s[0] = /* @__PURE__ */ ie(s[0]), n[t](...s)) : o;
}
function Bt(e, t, s = []) {
  ct(), Mn();
  const n = (/* @__PURE__ */ ie(e))[t].apply(e, s);
  return $n(), at(), n;
}
const gr = /* @__PURE__ */ kn("__proto__,__v_isRef,__isVue"), oi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function wr(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ ie(this);
  return Se(t, "has", e), t.hasOwnProperty(e);
}
class ii {
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
      return n === (o ? i ? Mr : ai : i ? ci : li).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = q(t);
    if (!o) {
      let c;
      if (r && (c = hr[s]))
        return c;
      if (s === "hasOwnProperty")
        return wr;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ we(t) ? t : n
    );
    if ((Ze(s) ? oi.has(s) : gr(s)) || (o || Se(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ we(l)) {
      const c = r && Ds(s) ? l : l.value;
      return o && de(c) ? /* @__PURE__ */ pn(c) : c;
    }
    return de(l) ? o ? /* @__PURE__ */ pn(l) : /* @__PURE__ */ Ns(l) : l;
  }
}
class ri extends ii {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    const r = q(t) && Ds(s);
    if (!this._isShallow) {
      const m = /* @__PURE__ */ ft(i);
      if (!/* @__PURE__ */ je(n) && !/* @__PURE__ */ ft(n) && (i = /* @__PURE__ */ ie(i), n = /* @__PURE__ */ ie(n)), !r && /* @__PURE__ */ we(i) && !/* @__PURE__ */ we(n))
        return m || (i.value = n), !0;
    }
    const l = r ? Number(s) < t.length : ce(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ we(t) ? t : o
    );
    return t === /* @__PURE__ */ ie(o) && (l ? ht(n, i) && it(t, "set", s, n) : it(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = ce(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && it(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Ze(s) || !oi.has(s)) && Se(t, "has", s), n;
  }
  ownKeys(t) {
    return Se(
      t,
      "iterate",
      q(t) ? "length" : St
    ), Reflect.ownKeys(t);
  }
}
class vr extends ii {
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
const xr = /* @__PURE__ */ new ri(), yr = /* @__PURE__ */ new vr(), _r = /* @__PURE__ */ new ri(!0);
const dn = (e) => e, ms = (e) => Reflect.getPrototypeOf(e);
function Sr(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, i = /* @__PURE__ */ ie(o), r = It(i), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, m = o[e](...n), a = s ? dn : t ? Lt : Ne;
    return !t && Se(
      i,
      "iterate",
      c ? un : St
    ), xe(
      // inheriting all iterator properties
      Object.create(m),
      {
        // iterator protocol
        next() {
          const { value: p, done: w } = m.next();
          return w ? { value: p, done: w } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: w
          };
        }
      }
    );
  };
}
function hs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function kr(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ ie(i), l = /* @__PURE__ */ ie(o);
      e || (ht(o, l) && Se(r, "get", o), Se(r, "get", l));
      const { has: c } = ms(r), m = t ? dn : e ? Lt : Ne;
      if (c.call(r, o))
        return m(i.get(o));
      if (c.call(r, l))
        return m(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && Se(/* @__PURE__ */ ie(o), "iterate", St), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ ie(i), l = /* @__PURE__ */ ie(o);
      return e || (ht(o, l) && Se(r, "has", o), Se(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ ie(l), m = t ? dn : e ? Lt : Ne;
      return !e && Se(c, "iterate", St), l.forEach((a, p) => o.call(i, m(a), m(p), r));
    }
  };
  return xe(
    s,
    e ? {
      add: hs("add"),
      set: hs("set"),
      delete: hs("delete"),
      clear: hs("clear")
    } : {
      add(o) {
        !t && !/* @__PURE__ */ je(o) && !/* @__PURE__ */ ft(o) && (o = /* @__PURE__ */ ie(o));
        const i = /* @__PURE__ */ ie(this);
        return ms(i).has.call(i, o) || (i.add(o), it(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !/* @__PURE__ */ je(i) && !/* @__PURE__ */ ft(i) && (i = /* @__PURE__ */ ie(i));
        const r = /* @__PURE__ */ ie(this), { has: l, get: c } = ms(r);
        let m = l.call(r, o);
        m || (o = /* @__PURE__ */ ie(o), m = l.call(r, o));
        const a = c.call(r, o);
        return r.set(o, i), m ? ht(i, a) && it(r, "set", o, i) : it(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ ie(this), { has: r, get: l } = ms(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ ie(o), c = r.call(i, o)), l && l.call(i, o);
        const m = i.delete(o);
        return c && it(i, "delete", o, void 0), m;
      },
      clear() {
        const o = /* @__PURE__ */ ie(this), i = o.size !== 0, r = o.clear();
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
    s[o] = Sr(o, e, t);
  }), s;
}
function Pn(e, t) {
  const s = kr(e, t);
  return (n, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    ce(s, o) && o in n ? s : n,
    o,
    i
  );
}
const Cr = {
  get: /* @__PURE__ */ Pn(!1, !1)
}, Tr = {
  get: /* @__PURE__ */ Pn(!1, !0)
}, zr = {
  get: /* @__PURE__ */ Pn(!0, !1)
};
const li = /* @__PURE__ */ new WeakMap(), ci = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap(), Mr = /* @__PURE__ */ new WeakMap();
function $r(e) {
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
function Er(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $r(er(e));
}
// @__NO_SIDE_EFFECTS__
function Ns(e) {
  return /* @__PURE__ */ ft(e) ? e : Rn(
    e,
    !1,
    xr,
    Cr,
    li
  );
}
// @__NO_SIDE_EFFECTS__
function Ar(e) {
  return Rn(
    e,
    !1,
    _r,
    Tr,
    ci
  );
}
// @__NO_SIDE_EFFECTS__
function pn(e) {
  return Rn(
    e,
    !0,
    yr,
    zr,
    ai
  );
}
function Rn(e, t, s, n, o) {
  if (!de(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = Er(e);
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
function je(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Hs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ie(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ie(t) : e;
}
function In(e) {
  return !ce(e, "__v_skip") && Object.isExtensible(e) && Uo(e, "__v_skip", !0), e;
}
const Ne = (e) => de(e) ? /* @__PURE__ */ Ns(e) : e, Lt = (e) => de(e) ? /* @__PURE__ */ pn(e) : e;
// @__NO_SIDE_EFFECTS__
function we(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function j(e) {
  return Pr(e, !1);
}
function Pr(e, t) {
  return /* @__PURE__ */ we(e) ? e : new Rr(e, t);
}
class Rr {
  constructor(t, s) {
    this.dep = new An(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ ie(t), this._value = s ? t : Ne(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ je(t) || /* @__PURE__ */ ft(t);
    t = n ? t : /* @__PURE__ */ ie(t), ht(t, s) && (this._rawValue = t, this._value = n ? t : Ne(t), this.dep.trigger());
  }
}
function b(e) {
  return /* @__PURE__ */ we(e) ? e.value : e;
}
const Ir = {
  get: (e, t, s) => t === "__v_raw" ? e : b(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return /* @__PURE__ */ we(o) && !/* @__PURE__ */ we(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function fi(e) {
  return /* @__PURE__ */ lt(e) ? e : new Proxy(e, Ir);
}
// @__NO_SIDE_EFFECTS__
function Or(e) {
  const t = q(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = Lr(e, s);
  return t;
}
class Dr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ ie(t);
    let o = !0, i = t;
    if (!q(t) || !Ds(String(s)))
      do
        o = !/* @__PURE__ */ Hs(i) || /* @__PURE__ */ je(i);
      while (o && (i = i.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = b(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ we(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ we(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return mr(this._raw, this._key);
  }
}
function Lr(e, t, s) {
  return new Dr(e, t, s);
}
class jr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new An(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = is - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    he !== this)
      return Qo(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ti(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Fr(e, t, s = !1) {
  let n, o;
  return X(e) ? n = e : (n = e.get, o = e.set), new jr(n, o, s);
}
const bs = {}, Ss = /* @__PURE__ */ new WeakMap();
let yt;
function Vr(e, t = !1, s = yt) {
  if (s) {
    let n = Ss.get(s);
    n || Ss.set(s, n = []), n.push(e);
  }
}
function Nr(e, t, s = pe) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, m = (M) => o ? M : /* @__PURE__ */ je(M) || o === !1 || o === 0 ? rt(M, 1) : rt(M);
  let a, p, w, y, u = !1, g = !1;
  if (/* @__PURE__ */ we(e) ? (p = () => e.value, u = /* @__PURE__ */ je(e)) : /* @__PURE__ */ lt(e) ? (p = () => m(e), u = !0) : q(e) ? (g = !0, u = e.some((M) => /* @__PURE__ */ lt(M) || /* @__PURE__ */ je(M)), p = () => e.map((M) => {
    if (/* @__PURE__ */ we(M))
      return M.value;
    if (/* @__PURE__ */ lt(M))
      return m(M);
    if (X(M))
      return c ? c(M, 2) : M();
  })) : X(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (w) {
      ct();
      try {
        w();
      } finally {
        at();
      }
    }
    const M = yt;
    yt = a;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      yt = M;
    }
  } : p = Qe, t && o) {
    const M = p, N = o === !0 ? 1 / 0 : o;
    p = () => rt(M(), N);
  }
  const F = Go(), K = () => {
    a.stop(), F && F.active && Tn(F.effects, a);
  };
  if (i && t) {
    const M = t;
    t = (...N) => {
      M(...N), K();
    };
  }
  let C = g ? new Array(e.length).fill(bs) : bs;
  const A = (M) => {
    if (!(!(a.flags & 1) || !a.dirty && !M))
      if (t) {
        const N = a.run();
        if (o || u || (g ? N.some((ne, re) => ht(ne, C[re])) : ht(N, C))) {
          w && w();
          const ne = yt;
          yt = a;
          try {
            const re = [
              N,
              // pass undefined as the old value when it's changed for the first time
              C === bs ? void 0 : g && C[0] === bs ? [] : C,
              y
            ];
            C = N, c ? c(t, 3, re) : (
              // @ts-expect-error
              t(...re)
            );
          } finally {
            yt = ne;
          }
        }
      } else
        a.run();
  };
  return l && l(A), a = new Jo(p), a.scheduler = r ? () => r(A, !1) : A, y = (M) => Vr(M, !1, a), w = a.onStop = () => {
    const M = Ss.get(a);
    if (M) {
      if (c)
        c(M, 4);
      else
        for (const N of M) N();
      Ss.delete(a);
    }
  }, t ? n ? A(!0) : C = a.run() : r ? r(A.bind(null, !0), !0) : a.run(), K.pause = a.pause.bind(a), K.resume = a.resume.bind(a), K.stop = K, K;
}
function rt(e, t = 1 / 0, s) {
  if (t <= 0 || !de(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ we(e))
    rt(e.value, t, s);
  else if (q(e))
    for (let n = 0; n < e.length; n++)
      rt(e[n], t, s);
  else if (Is(e) || It(e))
    e.forEach((n) => {
      rt(n, t, s);
    });
  else if (Os(e)) {
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
function ds(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    Us(o, t, s);
  }
}
function et(e, t, s, n) {
  if (X(e)) {
    const o = ds(e, t, s, n);
    return o && No(o) && o.catch((i) => {
      Us(i, t, s);
    }), o;
  }
  if (q(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(et(e[i], t, s, n));
    return o;
  }
}
function Us(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || pe;
  if (t) {
    let l = t.parent;
    const c = t.proxy, m = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, m) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      ct(), ds(i, null, 10, [
        e,
        c,
        m
      ]), at();
      return;
    }
  }
  Hr(e, s, o, n, r);
}
function Hr(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Te = [];
let Je = -1;
const Ot = [];
let mt = null, Pt = 0;
const ui = /* @__PURE__ */ Promise.resolve();
let ks = null;
function gt(e) {
  const t = ks || ui;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ur(e) {
  let t = Je + 1, s = Te.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = Te[n], i = ls(o);
    i < e || i === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function On(e) {
  if (!(e.flags & 1)) {
    const t = ls(e), s = Te[Te.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ls(s) ? Te.push(e) : Te.splice(Ur(t), 0, e), e.flags |= 1, di();
  }
}
function di() {
  ks || (ks = ui.then(mi));
}
function Kr(e) {
  q(e) ? Ot.push(...e) : mt && e.id === -1 ? mt.splice(Pt + 1, 0, e) : e.flags & 1 || (Ot.push(e), e.flags |= 1), di();
}
function Zn(e, t, s = Je + 1) {
  for (; s < Te.length; s++) {
    const n = Te[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      Te.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function pi(e) {
  if (Ot.length) {
    const t = [...new Set(Ot)].sort(
      (s, n) => ls(s) - ls(n)
    );
    if (Ot.length = 0, mt) {
      mt.push(...t);
      return;
    }
    for (mt = t, Pt = 0; Pt < mt.length; Pt++) {
      const s = mt[Pt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    mt = null, Pt = 0;
  }
}
const ls = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function mi(e) {
  try {
    for (Je = 0; Je < Te.length; Je++) {
      const t = Te[Je];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ds(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Je < Te.length; Je++) {
      const t = Te[Je];
      t && (t.flags &= -2);
    }
    Je = -1, Te.length = 0, pi(), ks = null, (Te.length || Ot.length) && mi();
  }
}
let Ie = null, hi = null;
function Cs(e) {
  const t = Ie;
  return Ie = e, hi = e && e.type.__scopeId || null, t;
}
function Br(e, t = Ie, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && ho(-1);
    const i = Cs(t);
    let r;
    try {
      r = e(...o);
    } finally {
      Cs(i), n._d && ho(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Oe(e, t) {
  if (Ie === null)
    return e;
  const s = Ys(Ie), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, r, l, c = pe] = t[o];
    i && (X(i) && (i = {
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
function vt(e, t, s, n) {
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
function Wr(e, t) {
  if (ke) {
    let s = ke.provides;
    const n = ke.parent && ke.parent.provides;
    n === s && (s = ke.provides = Object.create(n)), s[e] = t;
  }
}
function kt(e, t, s = !1) {
  const n = Hi();
  if (n || Tt) {
    let o = Tt ? Tt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && X(t) ? t.call(n && n.proxy) : t;
  }
}
function qr() {
  return !!(Hi() || Tt);
}
const Yr = /* @__PURE__ */ Symbol.for("v-scx"), Gr = () => kt(Yr);
function Ct(e, t, s) {
  return bi(e, t, s);
}
function bi(e, t, s = pe) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = xe({}, s), c = t && n || !t && i !== "post";
  let m;
  if (as) {
    if (i === "sync") {
      const y = Gr();
      m = y.__watcherHandles || (y.__watcherHandles = []);
    } else if (!c) {
      const y = () => {
      };
      return y.stop = Qe, y.resume = Qe, y.pause = Qe, y;
    }
  }
  const a = ke;
  l.call = (y, u, g) => et(y, a, u, g);
  let p = !1;
  i === "post" ? l.scheduler = (y) => {
    ye(y, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (y, u) => {
    u ? y() : On(y);
  }), l.augmentJob = (y) => {
    t && (y.flags |= 4), p && (y.flags |= 2, a && (y.id = a.uid, y.i = a));
  };
  const w = Nr(e, t, l);
  return as && (m ? m.push(w) : c && w()), w;
}
function Jr(e, t, s) {
  const n = this.proxy, o = ve(e) ? e.includes(".") ? gi(n, e) : () => n[e] : e.bind(n, n);
  let i;
  X(t) ? i = t : (i = t.handler, s = t);
  const r = ps(this), l = bi(o, i.bind(n), s);
  return r(), l;
}
function gi(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let o = 0; o < s.length && n; o++)
      n = n[s[o]];
    return n;
  };
}
const wi = /* @__PURE__ */ Symbol("_vte"), Xr = (e) => e.__isTeleport, Zt = (e) => e && (e.disabled || e.disabled === ""), eo = (e) => e && (e.defer || e.defer === ""), to = (e) => typeof SVGElement < "u" && e instanceof SVGElement, so = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, mn = (e, t) => {
  const s = e && e.to;
  return ve(s) ? t ? t(s) : null : s;
}, vi = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, s, n, o, i, r, l, c, m) {
    const {
      mc: a,
      pc: p,
      pbc: w,
      o: { insert: y, querySelector: u, createText: g, createComment: F }
    } = m, K = Zt(t.props);
    let { shapeFlag: C, children: A, dynamicChildren: M } = t;
    if (e == null) {
      const N = t.el = g(""), ne = t.anchor = g("");
      y(N, s, n), y(ne, s, n);
      const re = ($, R) => {
        C & 16 && a(
          A,
          $,
          R,
          o,
          i,
          r,
          l,
          c
        );
      }, B = () => {
        const $ = t.target = mn(t.props, u), R = hn($, t, g, y);
        $ && (r !== "svg" && to($) ? r = "svg" : r !== "mathml" && so($) && (r = "mathml"), o && o.isCE && (o.ce._teleportTargets || (o.ce._teleportTargets = /* @__PURE__ */ new Set())).add($), K || (re($, R), vs(t, !1)));
      };
      K && (re(s, ne), vs(t, !0)), eo(t.props) ? (t.el.__isMounted = !1, ye(() => {
        B(), delete t.el.__isMounted;
      }, i)) : B();
    } else {
      if (eo(t.props) && e.el.__isMounted === !1) {
        ye(() => {
          vi.process(
            e,
            t,
            s,
            n,
            o,
            i,
            r,
            l,
            c,
            m
          );
        }, i);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const N = t.anchor = e.anchor, ne = t.target = e.target, re = t.targetAnchor = e.targetAnchor, B = Zt(e.props), $ = B ? s : ne, R = B ? N : re;
      if (r === "svg" || to(ne) ? r = "svg" : (r === "mathml" || so(ne)) && (r = "mathml"), M ? (w(
        e.dynamicChildren,
        M,
        $,
        o,
        i,
        r,
        l
      ), Vn(e, t, !0)) : c || p(
        e,
        t,
        $,
        R,
        o,
        i,
        r,
        l,
        !1
      ), K)
        B ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : gs(
          t,
          s,
          N,
          m,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const le = t.target = mn(
          t.props,
          u
        );
        le && gs(
          t,
          le,
          null,
          m,
          0
        );
      } else B && gs(
        t,
        ne,
        re,
        m,
        1
      );
      vs(t, K);
    }
  },
  remove(e, t, s, { um: n, o: { remove: o } }, i) {
    const {
      shapeFlag: r,
      children: l,
      anchor: c,
      targetStart: m,
      targetAnchor: a,
      target: p,
      props: w
    } = e;
    if (p && (o(m), o(a)), i && o(c), r & 16) {
      const y = i || !Zt(w);
      for (let u = 0; u < l.length; u++) {
        const g = l[u];
        n(
          g,
          t,
          s,
          y,
          !!g.dynamicChildren
        );
      }
    }
  },
  move: gs,
  hydrate: Qr
};
function gs(e, t, s, { o: { insert: n }, m: o }, i = 2) {
  i === 0 && n(e.targetAnchor, t, s);
  const { el: r, anchor: l, shapeFlag: c, children: m, props: a } = e, p = i === 2;
  if (p && n(r, t, s), (!p || Zt(a)) && c & 16)
    for (let w = 0; w < m.length; w++)
      o(
        m[w],
        t,
        s,
        2
      );
  p && n(l, t, s);
}
function Qr(e, t, s, n, o, i, {
  o: { nextSibling: r, parentNode: l, querySelector: c, insert: m, createText: a }
}, p) {
  function w(F, K) {
    let C = K;
    for (; C; ) {
      if (C && C.nodeType === 8) {
        if (C.data === "teleport start anchor")
          t.targetStart = C;
        else if (C.data === "teleport anchor") {
          t.targetAnchor = C, F._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      C = r(C);
    }
  }
  function y(F, K) {
    K.anchor = p(
      r(F),
      K,
      l(F),
      s,
      n,
      o,
      i
    );
  }
  const u = t.target = mn(
    t.props,
    c
  ), g = Zt(t.props);
  if (u) {
    const F = u._lpa || u.firstChild;
    t.shapeFlag & 16 && (g ? (y(e, t), w(u, F), t.targetAnchor || hn(
      u,
      t,
      a,
      m,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === u ? e : null
    )) : (t.anchor = r(e), w(u, F), t.targetAnchor || hn(u, t, a, m), p(
      F && r(F),
      t,
      u,
      s,
      n,
      o,
      i
    ))), vs(t, g);
  } else g && t.shapeFlag & 16 && (y(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const Zr = vi;
function vs(e, t) {
  const s = e.ctx;
  if (s && s.ut) {
    let n, o;
    for (t ? (n = e.el, o = e.anchor) : (n = e.targetStart, o = e.targetAnchor); n && n !== o; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", s.uid), n = n.nextSibling;
    s.ut();
  }
}
function hn(e, t, s, n, o = null) {
  const i = t.targetStart = s(""), r = t.targetAnchor = s("");
  return i[wi] = r, e && (n(i, e, o), n(r, e, o)), r;
}
const el = /* @__PURE__ */ Symbol("_leaveCb");
function Dn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Dn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function tt(e, t) {
  return X(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    xe({ name: e.name }, t, { setup: e })
  ) : e;
}
function xi(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function no(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const Ts = /* @__PURE__ */ new WeakMap();
function es(e, t, s, n, o = !1) {
  if (q(e)) {
    e.forEach(
      (g, F) => es(
        g,
        t && (q(t) ? t[F] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (ts(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && es(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Ys(n.component) : n.el, r = o ? null : i, { i: l, r: c } = e, m = t && t.r, a = l.refs === pe ? l.refs = {} : l.refs, p = l.setupState, w = /* @__PURE__ */ ie(p), y = p === pe ? Vo : (g) => no(a, g) ? !1 : ce(w, g), u = (g, F) => !(F && no(a, F));
  if (m != null && m !== c) {
    if (oo(t), ve(m))
      a[m] = null, y(m) && (p[m] = null);
    else if (/* @__PURE__ */ we(m)) {
      const g = t;
      u(m, g.k) && (m.value = null), g.k && (a[g.k] = null);
    }
  }
  if (X(c))
    ds(c, l, 12, [r, a]);
  else {
    const g = ve(c), F = /* @__PURE__ */ we(c);
    if (g || F) {
      const K = () => {
        if (e.f) {
          const C = g ? y(c) ? p[c] : a[c] : u() || !e.k ? c.value : a[e.k];
          if (o)
            q(C) && Tn(C, i);
          else if (q(C))
            C.includes(i) || C.push(i);
          else if (g)
            a[c] = [i], y(c) && (p[c] = a[c]);
          else {
            const A = [i];
            u(c, e.k) && (c.value = A), e.k && (a[e.k] = A);
          }
        } else g ? (a[c] = r, y(c) && (p[c] = r)) : F && (u(c, e.k) && (c.value = r), e.k && (a[e.k] = r));
      };
      if (r) {
        const C = () => {
          K(), Ts.delete(e);
        };
        C.id = -1, Ts.set(e, C), ye(C, s);
      } else
        oo(e), K();
    }
  }
}
function oo(e) {
  const t = Ts.get(e);
  t && (t.flags |= 8, Ts.delete(e));
}
Fs().requestIdleCallback;
Fs().cancelIdleCallback;
const ts = (e) => !!e.type.__asyncLoader, yi = (e) => e.type.__isKeepAlive;
function tl(e, t) {
  _i(e, "a", t);
}
function sl(e, t) {
  _i(e, "da", t);
}
function _i(e, t, s = ke) {
  const n = e.__wdc || (e.__wdc = () => {
    let o = s;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Ks(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      yi(o.parent.vnode) && nl(n, t, s, o), o = o.parent;
  }
}
function nl(e, t, s, n) {
  const o = Ks(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Ln(() => {
    Tn(n[t], o);
  }, s);
}
function Ks(e, t, s = ke, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...r) => {
      ct();
      const l = ps(s), c = et(t, s, e, r);
      return l(), at(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ut = (e) => (t, s = ke) => {
  (!as || e === "sp") && Ks(e, (...n) => t(...n), s);
}, ol = ut("bm"), Bs = ut("m"), il = ut(
  "bu"
), rl = ut("u"), ll = ut(
  "bum"
), Ln = ut("um"), cl = ut(
  "sp"
), al = ut("rtg"), fl = ut("rtc");
function ul(e, t = ke) {
  Ks("ec", e, t);
}
const dl = "directives", pl = /* @__PURE__ */ Symbol.for("v-ndc");
function ml(e) {
  return hl(dl, e);
}
function hl(e, t, s = !0, n = !1) {
  const o = Ie || ke;
  if (o) {
    const i = o.type, r = (
      // local registration
      // check instance[type] first which is resolved for options API
      io(o[e] || i[e], t) || // global registration
      io(o.appContext[e], t)
    );
    return !r && n ? i : r;
  }
}
function io(e, t) {
  return e && (e[t] || e[Le(t)] || e[zn(Le(t))]);
}
function Ee(e, t, s, n) {
  let o;
  const i = s, r = q(e);
  if (r || ve(e)) {
    const l = r && /* @__PURE__ */ lt(e);
    let c = !1, m = !1;
    l && (c = !/* @__PURE__ */ je(e), m = /* @__PURE__ */ ft(e), e = Vs(e)), o = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      o[a] = t(
        c ? m ? Lt(Ne(e[a])) : Ne(e[a]) : e[a],
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
      for (let c = 0, m = l.length; c < m; c++) {
        const a = l[c];
        o[c] = t(e[a], a, c, i);
      }
    }
  else
    o = [];
  return o;
}
const bn = (e) => e ? Ui(e) ? Ys(e) : bn(e.parent) : null, ss = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ xe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => bn(e.parent),
    $root: (e) => bn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ki(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      On(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = gt.bind(e.proxy)),
    $watch: (e) => Jr.bind(e)
  })
), sn = (e, t) => e !== pe && !e.__isScriptSetup && ce(e, t), bl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const w = r[t];
      if (w !== void 0)
        switch (w) {
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
        if (sn(n, t))
          return r[t] = 1, n[t];
        if (o !== pe && ce(o, t))
          return r[t] = 2, o[t];
        if (ce(i, t))
          return r[t] = 3, i[t];
        if (s !== pe && ce(s, t))
          return r[t] = 4, s[t];
        gn && (r[t] = 0);
      }
    }
    const m = ss[t];
    let a, p;
    if (m)
      return t === "$attrs" && Se(e.attrs, "get", ""), m(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (s !== pe && ce(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      p = c.config.globalProperties, ce(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return sn(o, t) ? (o[t] = s, !0) : n !== pe && ce(n, t) ? (n[t] = s, !0) : ce(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || e !== pe && l[0] !== "$" && ce(e, l) || sn(t, l) || ce(i, l) || ce(n, l) || ce(ss, l) || ce(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : ce(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function ro(e) {
  return q(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let gn = !0;
function gl(e) {
  const t = ki(e), s = e.proxy, n = e.ctx;
  gn = !1, t.beforeCreate && lo(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: m,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: w,
    beforeUpdate: y,
    updated: u,
    activated: g,
    deactivated: F,
    beforeDestroy: K,
    beforeUnmount: C,
    destroyed: A,
    unmounted: M,
    render: N,
    renderTracked: ne,
    renderTriggered: re,
    errorCaptured: B,
    serverPrefetch: $,
    // public API
    expose: R,
    inheritAttrs: le,
    // assets
    components: ge,
    directives: T,
    filters: oe
  } = t;
  if (m && wl(m, n, null), r)
    for (const J in r) {
      const Z = r[J];
      X(Z) && (n[J] = Z.bind(s));
    }
  if (o) {
    const J = o.call(s, s);
    de(J) && (e.data = /* @__PURE__ */ Ns(J));
  }
  if (gn = !0, i)
    for (const J in i) {
      const Z = i[J], Ue = X(Z) ? Z.bind(s, s) : X(Z.get) ? Z.get.bind(s, s) : Qe, Mt = !X(Z) && X(Z.set) ? Z.set.bind(s) : Qe, Ke = ae({
        get: Ue,
        set: Mt
      });
      Object.defineProperty(n, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Fe) => Ke.value = Fe
      });
    }
  if (l)
    for (const J in l)
      Si(l[J], n, s, J);
  if (c) {
    const J = X(c) ? c.call(s) : c;
    Reflect.ownKeys(J).forEach((Z) => {
      Wr(Z, J[Z]);
    });
  }
  a && lo(a, e, "c");
  function fe(J, Z) {
    q(Z) ? Z.forEach((Ue) => J(Ue.bind(s))) : Z && J(Z.bind(s));
  }
  if (fe(ol, p), fe(Bs, w), fe(il, y), fe(rl, u), fe(tl, g), fe(sl, F), fe(ul, B), fe(fl, ne), fe(al, re), fe(ll, C), fe(Ln, M), fe(cl, $), q(R))
    if (R.length) {
      const J = e.exposed || (e.exposed = {});
      R.forEach((Z) => {
        Object.defineProperty(J, Z, {
          get: () => s[Z],
          set: (Ue) => s[Z] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  N && e.render === Qe && (e.render = N), le != null && (e.inheritAttrs = le), ge && (e.components = ge), T && (e.directives = T), $ && xi(e);
}
function wl(e, t, s = Qe) {
  q(e) && (e = wn(e));
  for (const n in e) {
    const o = e[n];
    let i;
    de(o) ? "default" in o ? i = kt(
      o.from || n,
      o.default,
      !0
    ) : i = kt(o.from || n) : i = kt(o), /* @__PURE__ */ we(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function lo(e, t, s) {
  et(
    q(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function Si(e, t, s, n) {
  let o = n.includes(".") ? gi(s, n) : () => s[n];
  if (ve(e)) {
    const i = t[e];
    X(i) && Ct(o, i);
  } else if (X(e))
    Ct(o, e.bind(s));
  else if (de(e))
    if (q(e))
      e.forEach((i) => Si(i, t, s, n));
    else {
      const i = X(e.handler) ? e.handler.bind(s) : t[e.handler];
      X(i) && Ct(o, i, e);
    }
}
function ki(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: o,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = i.get(t);
  let c;
  return l ? c = l : !o.length && !s && !n ? c = t : (c = {}, o.length && o.forEach(
    (m) => zs(c, m, r, !0)
  ), zs(c, t, r)), de(t) && i.set(t, c), c;
}
function zs(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && zs(e, i, s, !0), o && o.forEach(
    (r) => zs(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = vl[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const vl = {
  data: co,
  props: ao,
  emits: ao,
  // objects
  methods: Yt,
  computed: Yt,
  // lifecycle
  beforeCreate: Ce,
  created: Ce,
  beforeMount: Ce,
  mounted: Ce,
  beforeUpdate: Ce,
  updated: Ce,
  beforeDestroy: Ce,
  beforeUnmount: Ce,
  destroyed: Ce,
  unmounted: Ce,
  activated: Ce,
  deactivated: Ce,
  errorCaptured: Ce,
  serverPrefetch: Ce,
  // assets
  components: Yt,
  directives: Yt,
  // watch
  watch: yl,
  // provide / inject
  provide: co,
  inject: xl
};
function co(e, t) {
  return t ? e ? function() {
    return xe(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function xl(e, t) {
  return Yt(wn(e), wn(t));
}
function wn(e) {
  if (q(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function Ce(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yt(e, t) {
  return e ? xe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ao(e, t) {
  return e ? q(e) && q(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : xe(
    /* @__PURE__ */ Object.create(null),
    ro(e),
    ro(t ?? {})
  ) : t;
}
function yl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = xe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = Ce(e[n], t[n]);
  return s;
}
function Ci() {
  return {
    app: null,
    config: {
      isNativeTag: Vo,
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
let _l = 0;
function Sl(e, t) {
  return function(n, o = null) {
    X(n) || (n = xe({}, n)), o != null && !de(o) && (o = null);
    const i = Ci(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const m = i.app = {
      _uid: _l++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: ec,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return r.has(a) || (a && X(a.install) ? (r.add(a), a.install(m, ...p)) : X(a) && (r.add(a), a(m, ...p))), m;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), m;
      },
      component(a, p) {
        return p ? (i.components[a] = p, m) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, m) : i.directives[a];
      },
      mount(a, p, w) {
        if (!c) {
          const y = m._ceVNode || ze(n, o);
          return y.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), e(y, a, w), c = !0, m._container = a, a.__vue_app__ = m, Ys(y.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (et(
          l,
          m._instance,
          16
        ), e(null, m._container), delete m._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, m;
      },
      runWithContext(a) {
        const p = Tt;
        Tt = m;
        try {
          return a();
        } finally {
          Tt = p;
        }
      }
    };
    return m;
  };
}
let Tt = null;
const kl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Le(t)}Modifiers`] || e[`${Re(t)}Modifiers`];
function Cl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || pe;
  let o = s;
  const i = t.startsWith("update:"), r = i && kl(n, t.slice(7));
  r && (r.trim && (o = s.map((a) => ve(a) ? a.trim() : a)), r.number && (o = s.map(js)));
  let l, c = n[l = Xs(t)] || // also try camelCase event handler (#2249)
  n[l = Xs(Le(t))];
  !c && i && (c = n[l = Xs(Re(t))]), c && et(
    c,
    e,
    6,
    o
  );
  const m = n[l + "Once"];
  if (m) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, et(
      m,
      e,
      6,
      o
    );
  }
}
const Tl = /* @__PURE__ */ new WeakMap();
function Ti(e, t, s = !1) {
  const n = s ? Tl : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let r = {}, l = !1;
  if (!X(e)) {
    const c = (m) => {
      const a = Ti(m, t, !0);
      a && (l = !0, xe(r, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (de(e) && n.set(e, null), null) : (q(i) ? i.forEach((c) => r[c] = null) : xe(r, i), de(e) && n.set(e, r), r);
}
function Ws(e, t) {
  return !e || !Rs(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ce(e, t[0].toLowerCase() + t.slice(1)) || ce(e, Re(t)) || ce(e, t));
}
function fo(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: c,
    render: m,
    renderCache: a,
    props: p,
    data: w,
    setupState: y,
    ctx: u,
    inheritAttrs: g
  } = e, F = Cs(e);
  let K, C;
  try {
    if (s.shapeFlag & 4) {
      const M = o || n, N = M;
      K = Xe(
        m.call(
          N,
          M,
          a,
          p,
          y,
          w,
          u
        )
      ), C = l;
    } else {
      const M = t;
      K = Xe(
        M.length > 1 ? M(
          p,
          { attrs: l, slots: r, emit: c }
        ) : M(
          p,
          null
        )
      ), C = t.props ? l : zl(l);
    }
  } catch (M) {
    ns.length = 0, Us(M, e, 1), K = ze(wt);
  }
  let A = K;
  if (C && g !== !1) {
    const M = Object.keys(C), { shapeFlag: N } = A;
    M.length && N & 7 && (i && M.some(Cn) && (C = Ml(
      C,
      i
    )), A = Ft(A, C, !1, !0));
  }
  return s.dirs && (A = Ft(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(s.dirs) : s.dirs), s.transition && Dn(A, s.transition), K = A, Cs(F), K;
}
const zl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Rs(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, Ml = (e, t) => {
  const s = {};
  for (const n in e)
    (!Cn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function $l(e, t, s) {
  const { props: n, children: o, component: i } = e, { props: r, children: l, patchFlag: c } = t, m = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? uo(n, r, m) : !!r;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const w = a[p];
        if (zi(r, n, w) && !Ws(m, w))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? uo(n, r, m) : !0 : !!r;
  return !1;
}
function uo(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (zi(t, e, i) && !Ws(s, i))
      return !0;
  }
  return !1;
}
function zi(e, t, s) {
  const n = e[s], o = t[s];
  return s === "style" && de(n) && de(o) ? !us(n, o) : n !== o;
}
function El({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const Mi = {}, $i = () => Object.create(Mi), Ei = (e) => Object.getPrototypeOf(e) === Mi;
function Al(e, t, s, n = !1) {
  const o = {}, i = $i();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ai(e, t, o, i);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? e.props = n ? o : /* @__PURE__ */ Ar(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function Pl(e, t, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ ie(o), [c] = e.propsOptions;
  let m = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let w = a[p];
        if (Ws(e.emitsOptions, w))
          continue;
        const y = t[w];
        if (c)
          if (ce(i, w))
            y !== i[w] && (i[w] = y, m = !0);
          else {
            const u = Le(w);
            o[u] = vn(
              c,
              l,
              u,
              y,
              e,
              !1
            );
          }
        else
          y !== i[w] && (i[w] = y, m = !0);
      }
    }
  } else {
    Ai(e, t, o, i) && (m = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !ce(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Re(p)) === p || !ce(t, a))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[a] !== void 0) && (o[p] = vn(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (i !== l)
      for (const p in i)
        (!t || !ce(t, p)) && (delete i[p], m = !0);
  }
  m && it(e.attrs, "set", "");
}
function Ai(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if (Jt(c))
        continue;
      const m = t[c];
      let a;
      o && ce(o, a = Le(c)) ? !i || !i.includes(a) ? s[a] = m : (l || (l = {}))[a] = m : Ws(e.emitsOptions, c) || (!(c in n) || m !== n[c]) && (n[c] = m, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ ie(s), m = l || pe;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      s[p] = vn(
        o,
        c,
        p,
        m[p],
        e,
        !ce(m, p)
      );
    }
  }
  return r;
}
function vn(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const l = ce(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && X(c)) {
        const { propsDefaults: m } = o;
        if (s in m)
          n = m[s];
        else {
          const a = ps(o);
          n = m[s] = c.call(
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
    ] && (n === "" || n === Re(s)) && (n = !0));
  }
  return n;
}
const Rl = /* @__PURE__ */ new WeakMap();
function Pi(e, t, s = !1) {
  const n = s ? Rl : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const i = e.props, r = {}, l = [];
  let c = !1;
  if (!X(e)) {
    const a = (p) => {
      c = !0;
      const [w, y] = Pi(p, t, !0);
      xe(r, w), y && l.push(...y);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return de(e) && n.set(e, Rt), Rt;
  if (q(i))
    for (let a = 0; a < i.length; a++) {
      const p = Le(i[a]);
      po(p) && (r[p] = pe);
    }
  else if (i)
    for (const a in i) {
      const p = Le(a);
      if (po(p)) {
        const w = i[a], y = r[p] = q(w) || X(w) ? { type: w } : xe({}, w), u = y.type;
        let g = !1, F = !0;
        if (q(u))
          for (let K = 0; K < u.length; ++K) {
            const C = u[K], A = X(C) && C.name;
            if (A === "Boolean") {
              g = !0;
              break;
            } else A === "String" && (F = !1);
          }
        else
          g = X(u) && u.name === "Boolean";
        y[
          0
          /* shouldCast */
        ] = g, y[
          1
          /* shouldCastTrue */
        ] = F, (g || ce(y, "default")) && l.push(p);
      }
    }
  const m = [r, l];
  return de(e) && n.set(e, m), m;
}
function po(e) {
  return e[0] !== "$" && !Jt(e);
}
const jn = (e) => e === "_" || e === "_ctx" || e === "$stable", Fn = (e) => q(e) ? e.map(Xe) : [Xe(e)], Il = (e, t, s) => {
  if (t._n)
    return t;
  const n = Br((...o) => Fn(t(...o)), s);
  return n._c = !1, n;
}, Ri = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (jn(o)) continue;
    const i = e[o];
    if (X(i))
      t[o] = Il(o, i, n);
    else if (i != null) {
      const r = Fn(i);
      t[o] = () => r;
    }
  }
}, Ii = (e, t) => {
  const s = Fn(t);
  e.slots.default = () => s;
}, Oi = (e, t, s) => {
  for (const n in t)
    (s || !jn(n)) && (e[n] = t[n]);
}, Ol = (e, t, s) => {
  const n = e.slots = $i();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Oi(n, t, s), s && Uo(n, "_", o, !0)) : Ri(t, n);
  } else t && Ii(e, t);
}, Dl = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let i = !0, r = pe;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Oi(o, t, s) : (i = !t.$stable, Ri(t, o)), r = t;
  } else t && (Ii(e, t), r = { default: 1 });
  if (i)
    for (const l in o)
      !jn(l) && r[l] == null && delete o[l];
}, ye = Nl;
function Ll(e) {
  return jl(e);
}
function jl(e, t) {
  const s = Fs();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: m,
    setElementText: a,
    parentNode: p,
    nextSibling: w,
    setScopeId: y = Qe,
    insertStaticContent: u
  } = e, g = (f, h, v, k = null, x = null, _ = null, D = void 0, I = null, P = !!h.dynamicChildren) => {
    if (f === h)
      return;
    f && !Wt(f, h) && (k = $t(f), Fe(f, x, _, !0), f = null), h.patchFlag === -2 && (P = !1, h.dynamicChildren = null);
    const { type: S, ref: W, shapeFlag: L } = h;
    switch (S) {
      case qs:
        F(f, h, v, k);
        break;
      case wt:
        K(f, h, v, k);
        break;
      case on:
        f == null && C(h, v, k, D);
        break;
      case se:
        ge(
          f,
          h,
          v,
          k,
          x,
          _,
          D,
          I,
          P
        );
        break;
      default:
        L & 1 ? N(
          f,
          h,
          v,
          k,
          x,
          _,
          D,
          I,
          P
        ) : L & 6 ? T(
          f,
          h,
          v,
          k,
          x,
          _,
          D,
          I,
          P
        ) : (L & 64 || L & 128) && S.process(
          f,
          h,
          v,
          k,
          x,
          _,
          D,
          I,
          P,
          Ut
        );
    }
    W != null && x ? es(W, f && f.ref, _, h || f, !h) : W == null && f && f.ref != null && es(f.ref, null, _, f, !0);
  }, F = (f, h, v, k) => {
    if (f == null)
      n(
        h.el = l(h.children),
        v,
        k
      );
    else {
      const x = h.el = f.el;
      h.children !== f.children && m(x, h.children);
    }
  }, K = (f, h, v, k) => {
    f == null ? n(
      h.el = c(h.children || ""),
      v,
      k
    ) : h.el = f.el;
  }, C = (f, h, v, k) => {
    [f.el, f.anchor] = u(
      f.children,
      h,
      v,
      k,
      f.el,
      f.anchor
    );
  }, A = ({ el: f, anchor: h }, v, k) => {
    let x;
    for (; f && f !== h; )
      x = w(f), n(f, v, k), f = x;
    n(h, v, k);
  }, M = ({ el: f, anchor: h }) => {
    let v;
    for (; f && f !== h; )
      v = w(f), o(f), f = v;
    o(h);
  }, N = (f, h, v, k, x, _, D, I, P) => {
    if (h.type === "svg" ? D = "svg" : h.type === "math" && (D = "mathml"), f == null)
      ne(
        h,
        v,
        k,
        x,
        _,
        D,
        I,
        P
      );
    else {
      const S = f.el && f.el._isVueCE ? f.el : null;
      try {
        S && S._beginPatch(), $(
          f,
          h,
          x,
          _,
          D,
          I,
          P
        );
      } finally {
        S && S._endPatch();
      }
    }
  }, ne = (f, h, v, k, x, _, D, I) => {
    let P, S;
    const { props: W, shapeFlag: L, transition: H, dirs: G } = f;
    if (P = f.el = r(
      f.type,
      _,
      W && W.is,
      W
    ), L & 8 ? a(P, f.children) : L & 16 && B(
      f.children,
      P,
      null,
      k,
      x,
      nn(f, _),
      D,
      I
    ), G && vt(f, null, k, "created"), re(P, f, f.scopeId, D, k), W) {
      for (const me in W)
        me !== "value" && !Jt(me) && i(P, me, null, W[me], _, k);
      "value" in W && i(P, "value", null, W.value, _), (S = W.onVnodeBeforeMount) && Ge(S, k, f);
    }
    G && vt(f, null, k, "beforeMount");
    const ee = Fl(x, H);
    ee && H.beforeEnter(P), n(P, h, v), ((S = W && W.onVnodeMounted) || ee || G) && ye(() => {
      S && Ge(S, k, f), ee && H.enter(P), G && vt(f, null, k, "mounted");
    }, x);
  }, re = (f, h, v, k, x) => {
    if (v && y(f, v), k)
      for (let _ = 0; _ < k.length; _++)
        y(f, k[_]);
    if (x) {
      let _ = x.subTree;
      if (h === _ || ji(_.type) && (_.ssContent === h || _.ssFallback === h)) {
        const D = x.vnode;
        re(
          f,
          D,
          D.scopeId,
          D.slotScopeIds,
          x.parent
        );
      }
    }
  }, B = (f, h, v, k, x, _, D, I, P = 0) => {
    for (let S = P; S < f.length; S++) {
      const W = f[S] = I ? ot(f[S]) : Xe(f[S]);
      g(
        null,
        W,
        h,
        v,
        k,
        x,
        _,
        D,
        I
      );
    }
  }, $ = (f, h, v, k, x, _, D) => {
    const I = h.el = f.el;
    let { patchFlag: P, dynamicChildren: S, dirs: W } = h;
    P |= f.patchFlag & 16;
    const L = f.props || pe, H = h.props || pe;
    let G;
    if (v && xt(v, !1), (G = H.onVnodeBeforeUpdate) && Ge(G, v, h, f), W && vt(h, f, v, "beforeUpdate"), v && xt(v, !0), (L.innerHTML && H.innerHTML == null || L.textContent && H.textContent == null) && a(I, ""), S ? R(
      f.dynamicChildren,
      S,
      I,
      v,
      k,
      nn(h, x),
      _
    ) : D || Z(
      f,
      h,
      I,
      null,
      v,
      k,
      nn(h, x),
      _,
      !1
    ), P > 0) {
      if (P & 16)
        le(I, L, H, v, x);
      else if (P & 2 && L.class !== H.class && i(I, "class", null, H.class, x), P & 4 && i(I, "style", L.style, H.style, x), P & 8) {
        const ee = h.dynamicProps;
        for (let me = 0; me < ee.length; me++) {
          const ue = ee[me], Me = L[ue], $e = H[ue];
          ($e !== Me || ue === "value") && i(I, ue, Me, $e, x, v);
        }
      }
      P & 1 && f.children !== h.children && a(I, h.children);
    } else !D && S == null && le(I, L, H, v, x);
    ((G = H.onVnodeUpdated) || W) && ye(() => {
      G && Ge(G, v, h, f), W && vt(h, f, v, "updated");
    }, k);
  }, R = (f, h, v, k, x, _, D) => {
    for (let I = 0; I < h.length; I++) {
      const P = f[I], S = h[I], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(P, S) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? p(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      g(
        P,
        S,
        W,
        null,
        k,
        x,
        _,
        D,
        !0
      );
    }
  }, le = (f, h, v, k, x) => {
    if (h !== v) {
      if (h !== pe)
        for (const _ in h)
          !Jt(_) && !(_ in v) && i(
            f,
            _,
            h[_],
            null,
            x,
            k
          );
      for (const _ in v) {
        if (Jt(_)) continue;
        const D = v[_], I = h[_];
        D !== I && _ !== "value" && i(f, _, I, D, x, k);
      }
      "value" in v && i(f, "value", h.value, v.value, x);
    }
  }, ge = (f, h, v, k, x, _, D, I, P) => {
    const S = h.el = f ? f.el : l(""), W = h.anchor = f ? f.anchor : l("");
    let { patchFlag: L, dynamicChildren: H, slotScopeIds: G } = h;
    G && (I = I ? I.concat(G) : G), f == null ? (n(S, v, k), n(W, v, k), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      h.children || [],
      v,
      W,
      x,
      _,
      D,
      I,
      P
    )) : L > 0 && L & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === H.length ? (R(
      f.dynamicChildren,
      H,
      v,
      x,
      _,
      D,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (h.key != null || x && h === x.subTree) && Vn(
      f,
      h,
      !0
      /* shallow */
    )) : Z(
      f,
      h,
      v,
      W,
      x,
      _,
      D,
      I,
      P
    );
  }, T = (f, h, v, k, x, _, D, I, P) => {
    h.slotScopeIds = I, f == null ? h.shapeFlag & 512 ? x.ctx.activate(
      h,
      v,
      k,
      D,
      P
    ) : oe(
      h,
      v,
      k,
      x,
      _,
      D,
      P
    ) : be(f, h, P);
  }, oe = (f, h, v, k, x, _, D) => {
    const I = f.component = Yl(
      f,
      k,
      x
    );
    if (yi(f) && (I.ctx.renderer = Ut), Gl(I, !1, D), I.asyncDep) {
      if (x && x.registerDep(I, fe, D), !f.el) {
        const P = I.subTree = ze(wt);
        K(null, P, h, v), f.placeholder = P.el;
      }
    } else
      fe(
        I,
        f,
        h,
        v,
        x,
        _,
        D
      );
  }, be = (f, h, v) => {
    const k = h.component = f.component;
    if ($l(f, h, v))
      if (k.asyncDep && !k.asyncResolved) {
        J(k, h, v);
        return;
      } else
        k.next = h, k.update();
    else
      h.el = f.el, k.vnode = h;
  }, fe = (f, h, v, k, x, _, D) => {
    const I = () => {
      if (f.isMounted) {
        let { next: L, bu: H, u: G, parent: ee, vnode: me } = f;
        {
          const qe = Di(f);
          if (qe) {
            L && (L.el = me.el, J(f, L, D)), qe.asyncDep.then(() => {
              ye(() => {
                f.isUnmounted || S();
              }, x);
            });
            return;
          }
        }
        let ue = L, Me;
        xt(f, !1), L ? (L.el = me.el, J(f, L, D)) : L = me, H && ws(H), (Me = L.props && L.props.onVnodeBeforeUpdate) && Ge(Me, ee, L, me), xt(f, !0);
        const $e = fo(f), We = f.subTree;
        f.subTree = $e, g(
          We,
          $e,
          // parent may have changed if it's in a teleport
          p(We.el),
          // anchor may have changed if it's in a fragment
          $t(We),
          f,
          x,
          _
        ), L.el = $e.el, ue === null && El(f, $e.el), G && ye(G, x), (Me = L.props && L.props.onVnodeUpdated) && ye(
          () => Ge(Me, ee, L, me),
          x
        );
      } else {
        let L;
        const { el: H, props: G } = h, { bm: ee, m: me, parent: ue, root: Me, type: $e } = f, We = ts(h);
        xt(f, !1), ee && ws(ee), !We && (L = G && G.onVnodeBeforeMount) && Ge(L, ue, h), xt(f, !0);
        {
          Me.ce && Me.ce._hasShadowRoot() && Me.ce._injectChildStyle($e);
          const qe = f.subTree = fo(f);
          g(
            null,
            qe,
            v,
            k,
            f,
            x,
            _
          ), h.el = qe.el;
        }
        if (me && ye(me, x), !We && (L = G && G.onVnodeMounted)) {
          const qe = h;
          ye(
            () => Ge(L, ue, qe),
            x
          );
        }
        (h.shapeFlag & 256 || ue && ts(ue.vnode) && ue.vnode.shapeFlag & 256) && f.a && ye(f.a, x), f.isMounted = !0, h = v = k = null;
      }
    };
    f.scope.on();
    const P = f.effect = new Jo(I);
    f.scope.off();
    const S = f.update = P.run.bind(P), W = f.job = P.runIfDirty.bind(P);
    W.i = f, W.id = f.uid, P.scheduler = () => On(W), xt(f, !0), S();
  }, J = (f, h, v) => {
    h.component = f;
    const k = f.vnode.props;
    f.vnode = h, f.next = null, Pl(f, h.props, k, v), Dl(f, h.children, v), ct(), Zn(f), at();
  }, Z = (f, h, v, k, x, _, D, I, P = !1) => {
    const S = f && f.children, W = f ? f.shapeFlag : 0, L = h.children, { patchFlag: H, shapeFlag: G } = h;
    if (H > 0) {
      if (H & 128) {
        Mt(
          S,
          L,
          v,
          k,
          x,
          _,
          D,
          I,
          P
        );
        return;
      } else if (H & 256) {
        Ue(
          S,
          L,
          v,
          k,
          x,
          _,
          D,
          I,
          P
        );
        return;
      }
    }
    G & 8 ? (W & 16 && Be(S, x, _), L !== S && a(v, L)) : W & 16 ? G & 16 ? Mt(
      S,
      L,
      v,
      k,
      x,
      _,
      D,
      I,
      P
    ) : Be(S, x, _, !0) : (W & 8 && a(v, ""), G & 16 && B(
      L,
      v,
      k,
      x,
      _,
      D,
      I,
      P
    ));
  }, Ue = (f, h, v, k, x, _, D, I, P) => {
    f = f || Rt, h = h || Rt;
    const S = f.length, W = h.length, L = Math.min(S, W);
    let H;
    for (H = 0; H < L; H++) {
      const G = h[H] = P ? ot(h[H]) : Xe(h[H]);
      g(
        f[H],
        G,
        v,
        null,
        x,
        _,
        D,
        I,
        P
      );
    }
    S > W ? Be(
      f,
      x,
      _,
      !0,
      !1,
      L
    ) : B(
      h,
      v,
      k,
      x,
      _,
      D,
      I,
      P,
      L
    );
  }, Mt = (f, h, v, k, x, _, D, I, P) => {
    let S = 0;
    const W = h.length;
    let L = f.length - 1, H = W - 1;
    for (; S <= L && S <= H; ) {
      const G = f[S], ee = h[S] = P ? ot(h[S]) : Xe(h[S]);
      if (Wt(G, ee))
        g(
          G,
          ee,
          v,
          null,
          x,
          _,
          D,
          I,
          P
        );
      else
        break;
      S++;
    }
    for (; S <= L && S <= H; ) {
      const G = f[L], ee = h[H] = P ? ot(h[H]) : Xe(h[H]);
      if (Wt(G, ee))
        g(
          G,
          ee,
          v,
          null,
          x,
          _,
          D,
          I,
          P
        );
      else
        break;
      L--, H--;
    }
    if (S > L) {
      if (S <= H) {
        const G = H + 1, ee = G < W ? h[G].el : k;
        for (; S <= H; )
          g(
            null,
            h[S] = P ? ot(h[S]) : Xe(h[S]),
            v,
            ee,
            x,
            _,
            D,
            I,
            P
          ), S++;
      }
    } else if (S > H)
      for (; S <= L; )
        Fe(f[S], x, _, !0), S++;
    else {
      const G = S, ee = S, me = /* @__PURE__ */ new Map();
      for (S = ee; S <= H; S++) {
        const Pe = h[S] = P ? ot(h[S]) : Xe(h[S]);
        Pe.key != null && me.set(Pe.key, S);
      }
      let ue, Me = 0;
      const $e = H - ee + 1;
      let We = !1, qe = 0;
      const Kt = new Array($e);
      for (S = 0; S < $e; S++) Kt[S] = 0;
      for (S = G; S <= L; S++) {
        const Pe = f[S];
        if (Me >= $e) {
          Fe(Pe, x, _, !0);
          continue;
        }
        let Ye;
        if (Pe.key != null)
          Ye = me.get(Pe.key);
        else
          for (ue = ee; ue <= H; ue++)
            if (Kt[ue - ee] === 0 && Wt(Pe, h[ue])) {
              Ye = ue;
              break;
            }
        Ye === void 0 ? Fe(Pe, x, _, !0) : (Kt[Ye - ee] = S + 1, Ye >= qe ? qe = Ye : We = !0, g(
          Pe,
          h[Ye],
          v,
          null,
          x,
          _,
          D,
          I,
          P
        ), Me++);
      }
      const Bn = We ? Vl(Kt) : Rt;
      for (ue = Bn.length - 1, S = $e - 1; S >= 0; S--) {
        const Pe = ee + S, Ye = h[Pe], Wn = h[Pe + 1], qn = Pe + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Wn.el || Li(Wn)
        ) : k;
        Kt[S] === 0 ? g(
          null,
          Ye,
          v,
          qn,
          x,
          _,
          D,
          I,
          P
        ) : We && (ue < 0 || S !== Bn[ue] ? Ke(Ye, v, qn, 2) : ue--);
      }
    }
  }, Ke = (f, h, v, k, x = null) => {
    const { el: _, type: D, transition: I, children: P, shapeFlag: S } = f;
    if (S & 6) {
      Ke(f.component.subTree, h, v, k);
      return;
    }
    if (S & 128) {
      f.suspense.move(h, v, k);
      return;
    }
    if (S & 64) {
      D.move(f, h, v, Ut);
      return;
    }
    if (D === se) {
      n(_, h, v);
      for (let L = 0; L < P.length; L++)
        Ke(P[L], h, v, k);
      n(f.anchor, h, v);
      return;
    }
    if (D === on) {
      A(f, h, v);
      return;
    }
    if (k !== 2 && S & 1 && I)
      if (k === 0)
        I.beforeEnter(_), n(_, h, v), ye(() => I.enter(_), x);
      else {
        const { leave: L, delayLeave: H, afterLeave: G } = I, ee = () => {
          f.ctx.isUnmounted ? o(_) : n(_, h, v);
        }, me = () => {
          _._isLeaving && _[el](
            !0
            /* cancelled */
          ), L(_, () => {
            ee(), G && G();
          });
        };
        H ? H(_, ee, me) : me();
      }
    else
      n(_, h, v);
  }, Fe = (f, h, v, k = !1, x = !1) => {
    const {
      type: _,
      props: D,
      ref: I,
      children: P,
      dynamicChildren: S,
      shapeFlag: W,
      patchFlag: L,
      dirs: H,
      cacheIndex: G
    } = f;
    if (L === -2 && (x = !1), I != null && (ct(), es(I, null, v, f, !0), at()), G != null && (h.renderCache[G] = void 0), W & 256) {
      h.ctx.deactivate(f);
      return;
    }
    const ee = W & 1 && H, me = !ts(f);
    let ue;
    if (me && (ue = D && D.onVnodeBeforeUnmount) && Ge(ue, h, f), W & 6)
      Y(f.component, v, k);
    else {
      if (W & 128) {
        f.suspense.unmount(v, k);
        return;
      }
      ee && vt(f, null, h, "beforeUnmount"), W & 64 ? f.type.remove(
        f,
        h,
        v,
        Ut,
        k
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== se || L > 0 && L & 64) ? Be(
        S,
        h,
        v,
        !1,
        !0
      ) : (_ === se && L & 384 || !x && W & 16) && Be(P, h, v), k && Q(f);
    }
    (me && (ue = D && D.onVnodeUnmounted) || ee) && ye(() => {
      ue && Ge(ue, h, f), ee && vt(f, null, h, "unmounted");
    }, v);
  }, Q = (f) => {
    const { type: h, el: v, anchor: k, transition: x } = f;
    if (h === se) {
      z(v, k);
      return;
    }
    if (h === on) {
      M(f);
      return;
    }
    const _ = () => {
      o(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (f.shapeFlag & 1 && x && !x.persisted) {
      const { leave: D, delayLeave: I } = x, P = () => D(v, _);
      I ? I(f.el, _, P) : P();
    } else
      _();
  }, z = (f, h) => {
    let v;
    for (; f !== h; )
      v = w(f), o(f), f = v;
    o(h);
  }, Y = (f, h, v) => {
    const { bum: k, scope: x, job: _, subTree: D, um: I, m: P, a: S } = f;
    mo(P), mo(S), k && ws(k), x.stop(), _ && (_.flags |= 8, Fe(D, f, h, v)), I && ye(I, h), ye(() => {
      f.isUnmounted = !0;
    }, h);
  }, Be = (f, h, v, k = !1, x = !1, _ = 0) => {
    for (let D = _; D < f.length; D++)
      Fe(f[D], h, v, k, x);
  }, $t = (f) => {
    if (f.shapeFlag & 6)
      return $t(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const h = w(f.anchor || f.el), v = h && h[wi];
    return v ? w(v) : h;
  };
  let Js = !1;
  const Kn = (f, h, v) => {
    let k;
    f == null ? h._vnode && (Fe(h._vnode, null, null, !0), k = h._vnode.component) : g(
      h._vnode || null,
      f,
      h,
      null,
      null,
      null,
      v
    ), h._vnode = f, Js || (Js = !0, Zn(k), pi(), Js = !1);
  }, Ut = {
    p: g,
    um: Fe,
    m: Ke,
    r: Q,
    mt: oe,
    mc: B,
    pc: Z,
    pbc: R,
    n: $t,
    o: e
  };
  return {
    render: Kn,
    hydrate: void 0,
    createApp: Sl(Kn)
  };
}
function nn({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function xt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Fl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Vn(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (q(n) && q(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = ot(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && Vn(r, l)), l.type === qs && (l.patchFlag === -1 && (l = o[i] = ot(l)), l.el = r.el), l.type === wt && !l.el && (l.el = r.el);
    }
}
function Vl(e) {
  const t = e.slice(), s = [0];
  let n, o, i, r, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const m = e[n];
    if (m !== 0) {
      if (o = s[s.length - 1], e[o] < m) {
        t[n] = o, s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        l = i + r >> 1, e[s[l]] < m ? i = l + 1 : r = l;
      m < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
    }
  }
  for (i = s.length, r = s[i - 1]; i-- > 0; )
    s[i] = r, r = t[r];
  return s;
}
function Di(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Di(t);
}
function mo(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function Li(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? Li(t.subTree) : null;
}
const ji = (e) => e.__isSuspense;
function Nl(e, t) {
  t && t.pendingBranch ? q(e) ? t.effects.push(...e) : t.effects.push(e) : Kr(e);
}
const se = /* @__PURE__ */ Symbol.for("v-fgt"), qs = /* @__PURE__ */ Symbol.for("v-txt"), wt = /* @__PURE__ */ Symbol.for("v-cmt"), on = /* @__PURE__ */ Symbol.for("v-stc"), ns = [];
let De = null;
function E(e = !1) {
  ns.push(De = e ? null : []);
}
function Hl() {
  ns.pop(), De = ns[ns.length - 1] || null;
}
let cs = 1;
function ho(e, t = !1) {
  cs += e, e < 0 && De && t && (De.hasOnce = !0);
}
function Fi(e) {
  return e.dynamicChildren = cs > 0 ? De || Rt : null, Hl(), cs > 0 && De && De.push(e), e;
}
function O(e, t, s, n, o, i) {
  return Fi(
    d(
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
function jt(e, t, s, n, o) {
  return Fi(
    ze(
      e,
      t,
      s,
      n,
      o,
      !0
    )
  );
}
function Vi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ni = ({ key: e }) => e ?? null, xs = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ve(e) || /* @__PURE__ */ we(e) || X(e) ? { i: Ie, r: e, k: t, f: !!s } : e : null);
function d(e, t = null, s = null, n = 0, o = null, i = e === se ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ni(t),
    ref: t && xs(t),
    scopeId: hi,
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
    ctx: Ie
  };
  return l ? (Nn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= ve(s) ? 8 : 16), cs > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  De && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && De.push(c), c;
}
const ze = Ul;
function Ul(e, t = null, s = null, n = 0, o = null, i = !1) {
  if ((!e || e === pl) && (e = wt), Vi(e)) {
    const l = Ft(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Nn(l, s), cs > 0 && !i && De && (l.shapeFlag & 6 ? De[De.indexOf(e)] = l : De.push(l)), l.patchFlag = -2, l;
  }
  if (Zl(e) && (e = e.__vccOpts), t) {
    t = Kl(t);
    let { class: l, style: c } = t;
    l && !ve(l) && (t.class = U(l)), de(c) && (/* @__PURE__ */ Hs(c) && !q(c) && (c = xe({}, c)), t.style = zt(c));
  }
  const r = ve(e) ? 1 : ji(e) ? 128 : Xr(e) ? 64 : de(e) ? 4 : X(e) ? 2 : 0;
  return d(
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
function Kl(e) {
  return e ? /* @__PURE__ */ Hs(e) || Ei(e) ? xe({}, e) : e : null;
}
function Ft(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = e, m = t ? Bl(o || {}, t) : o, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: m,
    key: m && Ni(m),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? q(i) ? i.concat(xs(t)) : [i, xs(t)] : xs(t)
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
    patchFlag: t && e.type !== se ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && Ft(e.ssContent),
    ssFallback: e.ssFallback && Ft(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && Dn(
    a,
    c.clone(a)
  ), a;
}
function Vt(e = " ", t = 0) {
  return ze(qs, null, e, t);
}
function te(e = "", t = !1) {
  return t ? (E(), jt(wt, null, e)) : ze(wt, null, e);
}
function Xe(e) {
  return e == null || typeof e == "boolean" ? ze(wt) : q(e) ? ze(
    se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Vi(e) ? ot(e) : ze(qs, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ft(e);
}
function Nn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (q(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Nn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !Ei(t) ? t._ctx = Ie : o === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else X(t) ? (t = { default: t, _ctx: Ie }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Vt(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function Bl(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = U([t.class, n.class]));
      else if (o === "style")
        t.style = zt([t.style, n.style]);
      else if (Rs(o)) {
        const i = t[o], r = n[o];
        r && i !== r && !(q(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Ge(e, t, s, n = null) {
  et(e, t, 7, [
    s,
    n
  ]);
}
const Wl = Ci();
let ql = 0;
function Yl(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Wl, i = {
    uid: ql++,
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
    scope: new qo(
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
    propsOptions: Pi(n, o),
    emitsOptions: Ti(n, o),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Cl.bind(null, i), e.ce && e.ce(i), i;
}
let ke = null;
const Hi = () => ke || Ie;
let Ms, xn;
{
  const e = Fs(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  Ms = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => ke = s
  ), xn = t(
    "__VUE_SSR_SETTERS__",
    (s) => as = s
  );
}
const ps = (e) => {
  const t = ke;
  return Ms(e), e.scope.on(), () => {
    e.scope.off(), Ms(t);
  };
}, bo = () => {
  ke && ke.scope.off(), Ms(null);
};
function Ui(e) {
  return e.vnode.shapeFlag & 4;
}
let as = !1;
function Gl(e, t = !1, s = !1) {
  t && xn(t);
  const { props: n, children: o } = e.vnode, i = Ui(e);
  Al(e, n, i, t), Ol(e, o, s || t);
  const r = i ? Jl(e, t) : void 0;
  return t && xn(!1), r;
}
function Jl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, bl);
  const { setup: n } = s;
  if (n) {
    ct();
    const o = e.setupContext = n.length > 1 ? Ql(e) : null, i = ps(e), r = ds(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = No(r);
    if (at(), i(), (l || e.sp) && !ts(e) && xi(e), l) {
      if (r.then(bo, bo), t)
        return r.then((c) => {
          go(e, c);
        }).catch((c) => {
          Us(c, e, 0);
        });
      e.asyncDep = r;
    } else
      go(e, r);
  } else
    Ki(e);
}
function go(e, t, s) {
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : de(t) && (e.setupState = fi(t)), Ki(e);
}
function Ki(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Qe);
  {
    const o = ps(e);
    ct();
    try {
      gl(e);
    } finally {
      at(), o();
    }
  }
}
const Xl = {
  get(e, t) {
    return Se(e, "get", ""), e[t];
  }
};
function Ql(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Xl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ys(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(fi(In(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in ss)
        return ss[s](e);
    },
    has(t, s) {
      return s in t || s in ss;
    }
  })) : e.proxy;
}
function Zl(e) {
  return X(e) && "__vccOpts" in e;
}
const ae = (e, t) => /* @__PURE__ */ Fr(e, t, as), ec = "3.5.28";
/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let yn;
const wo = typeof window < "u" && window.trustedTypes;
if (wo)
  try {
    yn = /* @__PURE__ */ wo.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Bi = yn ? (e) => yn.createHTML(e) : (e) => e, tc = "http://www.w3.org/2000/svg", sc = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, vo = nt && /* @__PURE__ */ nt.createElement("template"), nc = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? nt.createElementNS(tc, e) : t === "mathml" ? nt.createElementNS(sc, e) : s ? nt.createElement(e, { is: s }) : nt.createElement(e);
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
      vo.innerHTML = Bi(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = vo.content;
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
}, oc = /* @__PURE__ */ Symbol("_vtc");
function ic(e, t, s) {
  const n = e[oc];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const $s = /* @__PURE__ */ Symbol("_vod"), Wi = /* @__PURE__ */ Symbol("_vsh"), rn = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: s }) {
    e[$s] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : qt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), qt(e, !0), n.enter(e)) : n.leave(e, () => {
      qt(e, !1);
    }) : qt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    qt(e, t);
  }
};
function qt(e, t) {
  e.style.display = t ? e[$s] : "none", e[Wi] = !t;
}
const rc = /* @__PURE__ */ Symbol(""), lc = /(?:^|;)\s*display\s*:/;
function cc(e, t, s) {
  const n = e.style, o = ve(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (ve(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && ys(n, l, "");
        }
      else
        for (const r in t)
          s[r] == null && ys(n, r, "");
    for (const r in s)
      r === "display" && (i = !0), ys(n, r, s[r]);
  } else if (o) {
    if (t !== s) {
      const r = n[rc];
      r && (s += ";" + r), n.cssText = s, i = lc.test(s);
    }
  } else t && e.removeAttribute("style");
  $s in e && (e[$s] = i ? n.display : "", e[Wi] && (n.display = "none"));
}
const xo = /\s*!important$/;
function ys(e, t, s) {
  if (q(s))
    s.forEach((n) => ys(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = ac(e, t);
    xo.test(s) ? e.setProperty(
      Re(n),
      s.replace(xo, ""),
      "important"
    ) : e[n] = s;
  }
}
const yo = ["Webkit", "Moz", "ms"], ln = {};
function ac(e, t) {
  const s = ln[t];
  if (s)
    return s;
  let n = Le(t);
  if (n !== "filter" && n in e)
    return ln[t] = n;
  n = zn(n);
  for (let o = 0; o < yo.length; o++) {
    const i = yo[o] + n;
    if (i in e)
      return ln[t] = i;
  }
  return t;
}
const _o = "http://www.w3.org/1999/xlink";
function So(e, t, s, n, o, i = cr(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(_o, t.slice(6, t.length)) : e.setAttributeNS(_o, t, s) : s == null || i && !Ko(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Ze(s) ? String(s) : s
  );
}
function ko(e, t, s, n, o) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Bi(s) : s);
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
    l === "boolean" ? s = Ko(s) : s == null && l === "string" ? (s = "", r = !0) : l === "number" && (s = 0, r = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  r && e.removeAttribute(o || t);
}
function _t(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function fc(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const Co = /* @__PURE__ */ Symbol("_vei");
function uc(e, t, s, n, o = null) {
  const i = e[Co] || (e[Co] = {}), r = i[t];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = dc(t);
    if (n) {
      const m = i[t] = hc(
        n,
        o
      );
      _t(e, l, m, c);
    } else r && (fc(e, l, r, c), i[t] = void 0);
  }
}
const To = /(?:Once|Passive|Capture)$/;
function dc(e) {
  let t;
  if (To.test(e)) {
    t = {};
    let n;
    for (; n = e.match(To); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Re(e.slice(2)), t];
}
let cn = 0;
const pc = /* @__PURE__ */ Promise.resolve(), mc = () => cn || (pc.then(() => cn = 0), cn = Date.now());
function hc(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    et(
      bc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = mc(), s;
}
function bc(e, t) {
  if (q(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (o) => !o._stopped && n && n(o)
    );
  } else
    return t;
}
const zo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, gc = (e, t, s, n, o, i) => {
  const r = o === "svg";
  t === "class" ? ic(e, n, r) : t === "style" ? cc(e, s, n) : Rs(t) ? Cn(t) || uc(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : wc(e, t, n, r)) ? (ko(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && So(e, t, n, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ve(n)) ? ko(e, Le(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), So(e, t, n, r));
};
function wc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && zo(t) && X(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return zo(t) && ve(s) ? !1 : t in e;
}
const Mo = {};
// @__NO_SIDE_EFFECTS__
function Jf(e, t, s) {
  let n = /* @__PURE__ */ tt(e, t);
  Os(n) && (n = xe({}, n, t));
  class o extends Hn {
    constructor(r) {
      super(n, r, s);
    }
  }
  return o.def = n, o;
}
const vc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Hn extends vc {
  constructor(t, s = {}, n = Ro) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== Ro ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      xe({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Hn) {
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
    this._connected = !1, gt(() => {
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
      if (i && !q(i))
        for (const c in i) {
          const m = i[c];
          (m === Number || m && m.type === Number) && (c in this._props && (this._props[c] = Gn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[Le(c)] = !0);
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
          get: () => b(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = q(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(Le))
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
    let n = s ? this.getAttribute(t) : Mo;
    const o = Le(t);
    s && this._numberProps && this._numberProps[o] && (n = Gn(n)), this._setProp(o, n, !1, !0);
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
    if (s !== this._props[t] && (this._dirty = !0, s === Mo ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), o && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(Re(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Re(t), s + "") : s || this.removeAttribute(Re(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), Cc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = ze(this._def, xe(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (i, r) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            Os(r[0]) ? xe({ detail: r }, r[0]) : { detail: r }
          )
        );
      };
      n.emit = (i, ...r) => {
        o(i, r), Re(i) !== i && o(Re(i), r);
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
            const m = s + "-s", a = document.createTreeWalker(c, 1);
            c.setAttribute(m, "");
            let p;
            for (; p = a.nextNode(); )
              p.setAttribute(m, "");
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
const Es = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return q(t) ? (s) => ws(t, s) : t;
};
function xc(e) {
  e.target.composing = !0;
}
function $o(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Dt = /* @__PURE__ */ Symbol("_assign");
function Eo(e, t, s) {
  return t && (e = e.trim()), s && (e = js(e)), e;
}
const As = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[Dt] = Es(o);
    const i = n || o.props && o.props.type === "number";
    _t(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Dt](Eo(e.value, s, i));
    }), (s || i) && _t(e, "change", () => {
      e.value = Eo(e.value, s, i);
    }), t || (_t(e, "compositionstart", xc), _t(e, "compositionend", $o), _t(e, "change", $o));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, r) {
    if (e[Dt] = Es(r), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? js(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === c) || (e.value = c));
  }
}, Gt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Is(t);
    _t(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? js(Ps(r)) : Ps(r)
      );
      e[Dt](
        e.multiple ? o ? new Set(i) : i : i[0]
      ), e._assigning = !0, gt(() => {
        e._assigning = !1;
      });
    }), e[Dt] = Es(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    Ao(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Dt] = Es(s);
  },
  updated(e, { value: t }) {
    e._assigning || Ao(e, t);
  }
};
function Ao(e, t) {
  const s = e.multiple, n = q(t);
  if (!(s && !n && !Is(t))) {
    for (let o = 0, i = e.options.length; o < i; o++) {
      const r = e.options[o], l = Ps(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = t.some((m) => String(m) === String(l)) : r.selected = fr(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (us(Ps(r), t)) {
        e.selectedIndex !== o && (e.selectedIndex = o);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ps(e) {
  return "_value" in e ? e._value : e.value;
}
const yc = ["ctrl", "shift", "alt", "meta"], _c = {
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
  exact: (e, t) => yc.some((s) => e[`${s}Key`] && !t.includes(s))
}, bt = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = _c[t[r]];
      if (l && l(o, t)) return;
    }
    return e(o, ...i);
  }));
}, Sc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Nt = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = ((o) => {
    if (!("key" in o))
      return;
    const i = Re(o.key);
    if (t.some(
      (r) => r === i || Sc[r] === i
    ))
      return e(o);
  }));
}, kc = /* @__PURE__ */ xe({ patchProp: gc }, nc);
let Po;
function qi() {
  return Po || (Po = Ll(kc));
}
const Cc = ((...e) => {
  qi().render(...e);
}), Ro = ((...e) => {
  const t = qi().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = zc(n);
    if (!o) return;
    const i = t._component;
    !X(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, Tc(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
});
function Tc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function zc(e) {
  return ve(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Yi;
const Gs = (e) => Yi = e, Gi = (
  /* istanbul ignore next */
  Symbol()
);
function _n(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var os;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(os || (os = {}));
function Xf() {
  const e = Yo(!0), t = e.run(() => /* @__PURE__ */ j({}));
  let s = [], n = [];
  const o = In({
    install(i) {
      Gs(o), o._a = i, i.provide(Gi, o), i.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
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
const Ji = () => {
};
function Io(e, t, s, n = Ji) {
  e.push(t);
  const o = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), n());
  };
  return !s && Go() && ur(o), o;
}
function At(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const Mc = (e) => e(), Oo = Symbol(), an = Symbol();
function Sn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], o = e[s];
    _n(o) && _n(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ we(n) && !/* @__PURE__ */ lt(n) ? e[s] = Sn(o, n) : e[s] = n;
  }
  return e;
}
const $c = (
  /* istanbul ignore next */
  Symbol()
);
function Ec(e) {
  return !_n(e) || !e.hasOwnProperty($c);
}
const { assign: dt } = Object;
function Ac(e) {
  return !!(/* @__PURE__ */ we(e) && e.effect);
}
function Pc(e, t, s, n) {
  const { state: o, actions: i, getters: r } = t, l = s.state.value[e];
  let c;
  function m() {
    l || (s.state.value[e] = o ? o() : {});
    const a = /* @__PURE__ */ Or(s.state.value[e]);
    return dt(a, i, Object.keys(r || {}).reduce((p, w) => (p[w] = In(ae(() => {
      Gs(s);
      const y = s._s.get(e);
      return r[w].call(y, y);
    })), p), {}));
  }
  return c = Xi(e, m, t, s, n, !0), c;
}
function Xi(e, t, s = {}, n, o, i) {
  let r;
  const l = dt({ actions: {} }, s), c = { deep: !0 };
  let m, a, p = [], w = [], y;
  const u = n.state.value[e];
  !i && !u && (n.state.value[e] = {});
  let g;
  function F(B) {
    let $;
    m = a = !1, typeof B == "function" ? (B(n.state.value[e]), $ = {
      type: os.patchFunction,
      storeId: e,
      events: y
    }) : (Sn(n.state.value[e], B), $ = {
      type: os.patchObject,
      payload: B,
      storeId: e,
      events: y
    });
    const R = g = Symbol();
    gt().then(() => {
      g === R && (m = !0);
    }), a = !0, At(p, $, n.state.value[e]);
  }
  const K = i ? function() {
    const { state: $ } = s, R = $ ? $() : {};
    this.$patch((le) => {
      dt(le, R);
    });
  } : (
    /* istanbul ignore next */
    Ji
  );
  function C() {
    r.stop(), p = [], w = [], n._s.delete(e);
  }
  const A = (B, $ = "") => {
    if (Oo in B)
      return B[an] = $, B;
    const R = function() {
      Gs(n);
      const le = Array.from(arguments), ge = [], T = [];
      function oe(J) {
        ge.push(J);
      }
      function be(J) {
        T.push(J);
      }
      At(w, {
        args: le,
        name: R[an],
        store: N,
        after: oe,
        onError: be
      });
      let fe;
      try {
        fe = B.apply(this && this.$id === e ? this : N, le);
      } catch (J) {
        throw At(T, J), J;
      }
      return fe instanceof Promise ? fe.then((J) => (At(ge, J), J)).catch((J) => (At(T, J), Promise.reject(J))) : (At(ge, fe), fe);
    };
    return R[Oo] = !0, R[an] = $, R;
  }, M = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: Io.bind(null, w),
    $patch: F,
    $reset: K,
    $subscribe(B, $ = {}) {
      const R = Io(p, B, $.detached, () => le()), le = r.run(() => Ct(() => n.state.value[e], (ge) => {
        ($.flush === "sync" ? a : m) && B({
          storeId: e,
          type: os.direct,
          events: y
        }, ge);
      }, dt({}, c, $)));
      return R;
    },
    $dispose: C
  }, N = /* @__PURE__ */ Ns(M);
  n._s.set(e, N);
  const re = (n._a && n._a.runWithContext || Mc)(() => n._e.run(() => (r = Yo()).run(() => t({ action: A }))));
  for (const B in re) {
    const $ = re[B];
    if (/* @__PURE__ */ we($) && !Ac($) || /* @__PURE__ */ lt($))
      i || (u && Ec($) && (/* @__PURE__ */ we($) ? $.value = u[B] : Sn($, u[B])), n.state.value[e][B] = $);
    else if (typeof $ == "function") {
      const R = A($, B);
      re[B] = R, l.actions[B] = $;
    }
  }
  return dt(N, re), dt(/* @__PURE__ */ ie(N), re), Object.defineProperty(N, "$state", {
    get: () => n.state.value[e],
    set: (B) => {
      F(($) => {
        dt($, B);
      });
    }
  }), n._p.forEach((B) => {
    dt(N, r.run(() => B({
      store: N,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), u && i && s.hydrate && s.hydrate(N.$state, u), m = !0, a = !0, N;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Rc(e, t, s) {
  let n, o;
  const i = typeof t == "function";
  n = e, o = i ? s : t;
  function r(l, c) {
    const m = qr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (m ? kt(Gi, null) : null), l && Gs(l), l = Yi, l._s.has(n) || (i ? Xi(n, t, o, l) : Pc(n, o, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
const Ae = /* @__PURE__ */ Rc("widget", () => {
  const e = /* @__PURE__ */ j({
    endpoint: "",
    issuesEndpoint: "",
    actionEndpoint: "",
    cancelEndpoint: "",
    repo: "",
    labels: "",
    storageKey: "thoughts"
  }), t = /* @__PURE__ */ j("text"), s = /* @__PURE__ */ j("right"), n = /* @__PURE__ */ j("bottom"), o = /* @__PURE__ */ j(""), i = /* @__PURE__ */ j("text"), r = /* @__PURE__ */ j("medium"), l = /* @__PURE__ */ j("default"), c = /* @__PURE__ */ j("ocean"), m = /* @__PURE__ */ j(""), a = /* @__PURE__ */ j(""), p = /* @__PURE__ */ j("manual"), w = /* @__PURE__ */ j("idle"), y = /* @__PURE__ */ j(!1), u = /* @__PURE__ */ j(0), g = /* @__PURE__ */ j("technical_issue"), F = /* @__PURE__ */ j({}), K = /* @__PURE__ */ j({
    shortLeft: "done_archive",
    shortRight: "pin_unpin",
    longLeft: "create_linked_item",
    longRight: "comment"
  }), C = /* @__PURE__ */ j([]), A = /* @__PURE__ */ j(!1), M = /* @__PURE__ */ j(!1), N = /* @__PURE__ */ j("active"), ne = /* @__PURE__ */ j("updated_desc"), re = /* @__PURE__ */ j(""), B = /* @__PURE__ */ j([]), $ = /* @__PURE__ */ j(!1), R = /* @__PURE__ */ j(""), le = /* @__PURE__ */ j(""), ge = /* @__PURE__ */ j(!1), T = /* @__PURE__ */ j(!1), oe = /* @__PURE__ */ j(null), be = /* @__PURE__ */ j(""), fe = /* @__PURE__ */ j("");
  function J(Z) {
    e.value = Z, t.value = "text", i.value = "text";
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
    draftTitle: m,
    draftDescription: a,
    draftMergePolicy: p,
    voiceDraftState: w,
    voiceDraftReady: y,
    voiceDraftDurationMs: u,
    mode: g,
    itemViews: F,
    swipeMapping: K,
    issues: C,
    issuesLoaded: A,
    loadingIssues: M,
    listView: N,
    listSort: ne,
    listQuery: re,
    listStatusFilter: B,
    creating: $,
    createError: R,
    listError: le,
    textCreateSuccess: ge,
    voiceCreateSuccess: T,
    lastSubmissionId: oe,
    lastTextTitle: be,
    lastTextDescription: fe,
    init: J
  };
});
function He() {
  const e = Ae();
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
function Qi() {
  const e = kt("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    readToken: e.readToken,
    requireToken: e.requireToken,
    promptToken: e.promptToken,
    clearToken: e.clearToken
  };
}
function Un() {
  const e = Ae(), { persist: t } = He();
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
function Ht() {
  const e = kt("widget-adapter");
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
const Ic = 10;
function Oc() {
  const e = Ae(), { persist: t } = He(), { submitText: s, cancelSubmission: n, loadIssues: o } = Ht(), i = /* @__PURE__ */ j(0);
  let r = null;
  function l() {
    r !== null && (clearInterval(r), r = null), i.value = 0;
  }
  function c() {
    l(), e.lastSubmissionId && (i.value = Ic, r = setInterval(() => {
      i.value -= 1, i.value <= 0 && l();
    }, 1e3));
  }
  async function m(w) {
    if (e.creating) return;
    const y = e.draftDescription.trim();
    if (!y) {
      e.createError = "Please provide a description.";
      return;
    }
    let u = e.draftTitle.trim();
    if (!u) {
      const g = y.split(`
`)[0];
      u = g.length > 50 ? g.slice(0, 50) + "..." : g;
    }
    e.createError = "", e.creating = !0;
    try {
      const g = await s(u, y, w);
      e.lastSubmissionId = typeof (g == null ? void 0 : g.submissionId) == "string" ? g.submissionId : null, e.lastTextTitle = u, e.lastTextDescription = e.draftDescription, e.draftTitle = "", e.draftDescription = "", e.textCreateSuccess = !0, c(), o(!0), t();
    } catch (g) {
      e.createError = g instanceof Error ? g.message : "Failed to create request";
    } finally {
      e.creating = !1;
    }
  }
  async function a() {
    if (!e.lastSubmissionId) return;
    const w = e.lastSubmissionId;
    await n(w), e.lastSubmissionId = null, e.textCreateSuccess = !1, e.draftTitle = e.lastTextTitle, e.draftDescription = e.lastTextDescription, l(), t();
  }
  function p() {
    e.textCreateSuccess = !1, l();
  }
  return {
    undoSecondsLeft: i,
    submit: m,
    undo: a,
    reset: p,
    stopUndoCountdown: l
  };
}
function Dc() {
  let e = null, t = null, s = [], n = "";
  const o = /* @__PURE__ */ j(!1);
  function i() {
    const u = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", ""];
    for (const g of u) {
      if (!g) return "";
      if (typeof MediaRecorder < "u" && MediaRecorder.isTypeSupported(g)) return g;
    }
    return "";
  }
  async function r() {
    var u;
    if (!((u = navigator.mediaDevices) != null && u.getUserMedia))
      throw new Error("Microphone recording is not supported in this browser.");
    return (!t || !t.active) && (t = await navigator.mediaDevices.getUserMedia({ audio: !0 })), t;
  }
  async function l() {
    if (e && e.state !== "inactive") return e;
    const u = await r();
    return n = i(), e = n ? new MediaRecorder(u, { mimeType: n }) : new MediaRecorder(u), e.ondataavailable = (g) => {
      var F;
      ((F = g.data) == null ? void 0 : F.size) > 0 && (s.push(g.data), o.value = !0);
    }, e;
  }
  async function c() {
    !e || e.state === "inactive" || await new Promise((u) => {
      let g = !1;
      const F = () => {
        g || (g = !0, u());
      };
      e.addEventListener("dataavailable", F, { once: !0 });
      try {
        e.requestData(), window.setTimeout(F, 250);
      } catch {
        F();
      }
    });
  }
  async function m() {
    const u = await l();
    if (u.state === "paused") {
      u.resume();
      return;
    }
    u.state === "inactive" && u.start(1e3);
  }
  async function a() {
    !e || e.state !== "recording" || (await c(), e.pause());
  }
  async function p() {
    return await c(), s.length ? new Blob(s, { type: n || "audio/webm" }) : null;
  }
  async function w() {
    e && e.state !== "inactive" && e.stop(), t == null || t.getTracks().forEach((u) => u.stop()), e = null, t = null, s = [], n = "", o.value = !1;
  }
  function y() {
    return n;
  }
  return { start: m, pause: a, exportRecording: p, reset: w, hasContent: o, getMimeType: y };
}
const Lc = 10;
function jc() {
  const e = Ae(), { persist: t } = He(), { submitVoice: s, cancelSubmission: n, loadIssues: o } = Ht(), i = Dc(), r = /* @__PURE__ */ j(0);
  let l = null, c = null;
  function m() {
    c !== null && (clearInterval(c), c = null);
  }
  function a() {
    m(), c = setInterval(() => {
      e.voiceDraftDurationMs += 1e3, t();
    }, 1e3);
  }
  function p() {
    l !== null && (clearInterval(l), l = null), r.value = 0;
  }
  function w() {
    p(), e.lastSubmissionId && (r.value = Lc, l = setInterval(() => {
      r.value -= 1, r.value <= 0 && p();
    }, 1e3));
  }
  async function y() {
    e.createError = "";
    try {
      e.voiceDraftState === "recording" ? (await i.pause(), e.voiceDraftState = "paused", e.voiceDraftReady = i.hasContent.value, m()) : (await i.start(), e.voiceDraftState = "recording", e.voiceDraftReady = i.hasContent.value, a()), t();
    } catch (C) {
      e.createError = C instanceof Error ? C.message : "Failed to access microphone";
    }
  }
  async function u() {
    m(), await i.reset(), e.voiceDraftState = "idle", e.voiceDraftReady = !1, e.voiceDraftDurationMs = 0, e.createError = "", t();
  }
  async function g() {
    if (!e.voiceDraftReady) return;
    const C = await i.exportRecording();
    if (!C || C.size < 1) {
      e.createError = "No recorded audio available yet.";
      return;
    }
    e.createError = "", e.creating = !0;
    try {
      const A = await s(C, i.getMimeType(), e.voiceDraftDurationMs);
      e.lastSubmissionId = typeof (A == null ? void 0 : A.submissionId) == "string" ? A.submissionId : null, await u(), e.voiceCreateSuccess = !0, w(), o(!0), t();
    } catch (A) {
      e.createError = A instanceof Error ? A.message : "Failed to submit voice request";
    } finally {
      e.creating = !1;
    }
  }
  async function F() {
    if (!e.lastSubmissionId) return;
    const C = e.lastSubmissionId;
    await n(C), e.lastSubmissionId = null, e.voiceCreateSuccess = !1, p(), t();
  }
  function K() {
    e.voiceCreateSuccess = !1, p();
  }
  return {
    undoSecondsLeft: r,
    toggleRecording: y,
    reset: u,
    submit: g,
    undo: F,
    dismissSuccess: K,
    stopVoiceTimer: m,
    stopUndoCountdown: p
  };
}
function Fc() {
  const e = /* @__PURE__ */ j(!1), t = /* @__PURE__ */ j(null), s = /* @__PURE__ */ j(!1), n = /* @__PURE__ */ j(!1);
  function o(l, c = !1) {
    t.value = l, s.value = !1, n.value = c, e.value = !0;
  }
  function i() {
    t.value = null, s.value = !0, e.value = !0;
  }
  function r() {
    e.value = !1, setTimeout(() => {
      t.value = null, s.value = !1, n.value = !1;
    }, 260);
  }
  return {
    sheetOpen: e,
    sheetIssue: t,
    filterMode: s,
    editMode: n,
    openIssue: o,
    openFilter: i,
    close: r
  };
}
const Vc = 40;
function Nc() {
  const e = Ae(), { persist: t } = He(), s = /* @__PURE__ */ j(!1), n = /* @__PURE__ */ j(!1);
  let o = 0;
  const i = ae(() => e.handedness === "left" ? { left: "10px", right: "" } : { right: "10px", left: "" });
  function r(p) {
    o = p.touches[0].clientX;
  }
  function l(p) {
    const w = p.changedTouches[0].clientX - o;
    Math.abs(w) >= Vc && (e.handedness = w < 0 ? "left" : "right", t(), p.preventDefault());
  }
  function c() {
    s.value = !0;
  }
  function m() {
    s.value = !1;
  }
  function a(p) {
    e.handedness = p, t();
  }
  return Bs(() => {
    try {
      const p = e.config.storageKey + ":swipe-hint-shown";
      localStorage.getItem(p) || (localStorage.setItem(p, "1"), setTimeout(() => {
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
    close: m,
    applyHandedness: a
  };
}
const Hc = { class: "cfw-text-form-wrap" }, Uc = { class: "cfw-textarea-wrap" }, Kc = ["id", "placeholder"], Bc = {
  key: 1,
  class: "cfw-mf-actions"
}, Wc = ["disabled"], qc = {
  key: 2,
  id: "cfw-new-actions"
}, Yc = ["disabled"], Gc = /* @__PURE__ */ tt({
  __name: "TextForm",
  props: {
    mobile: { type: Boolean },
    titleId: { type: String },
    descId: { type: String }
  },
  emits: ["create"],
  setup(e, { expose: t, emit: s }) {
    const n = e, o = Ae(), { persist: i } = He(), r = ae(() => n.descId ?? (n.mobile ? "cfw-m-description" : "cfw-description")), l = ae(() => {
      switch (o.mode) {
        case "personal_todo":
          return "Capture a personal todo...";
        case "feature_request":
          return "Describe the requested feature...";
        case "technical_issue":
        default:
          return "Describe the technical issue...";
      }
    }), c = ae(() => !!o.draftDescription.trim());
    function m() {
      i();
    }
    function a() {
      o.draftTitle = "", o.draftDescription = "", i();
    }
    const p = /* @__PURE__ */ j(null);
    function w() {
      const u = p.value;
      u && (u.style.height = "auto", u.style.height = u.scrollHeight + "px", u.style.overflowY = u.offsetHeight < u.scrollHeight ? "auto" : "hidden");
    }
    function y() {
      w(), m();
    }
    return Bs(() => w()), t({ focusTitle: () => {
      var u;
      return (u = p.value) == null ? void 0 : u.focus();
    } }), (u, g) => (E(), O("div", Hc, [
      d("div", Uc, [
        Oe(d("textarea", {
          ref_key: "descRef",
          ref: p,
          id: r.value,
          "onUpdate:modelValue": g[0] || (g[0] = (F) => b(o).draftDescription = F),
          placeholder: l.value,
          maxlength: "5000",
          onInput: y,
          onKeydown: [
            g[1] || (g[1] = Nt(bt((F) => c.value && !b(o).creating && u.$emit("create", !0), ["ctrl"]), ["enter"])),
            g[2] || (g[2] = Nt(bt((F) => c.value && !b(o).creating && u.$emit("create", !0), ["meta"]), ["enter"]))
          ]
        }, null, 40, Kc), [
          [As, b(o).draftDescription]
        ])
      ]),
      b(o).createError ? (E(), O("div", {
        key: 0,
        class: U([["cfw-error", e.mobile ? "cfw-mf-error" : ""], "active"])
      }, V(b(o).createError), 3)) : te("", !0),
      e.mobile ? (E(), O("div", Bc, [
        c.value ? (E(), O("button", {
          key: 0,
          id: "cfw-m-clear",
          class: "cfw-btn cfw-btn-outline",
          type: "button",
          onClick: a
        }, "Clear")) : te("", !0),
        d("button", {
          id: "cfw-m-submit",
          class: "cfw-btn cfw-btn-primary",
          type: "button",
          disabled: b(o).creating,
          onClick: g[3] || (g[3] = (F) => u.$emit("create", !1))
        }, V(b(o).creating ? "Saving..." : "Submit"), 9, Wc)
      ])) : (E(), O("div", qc, [
        d("button", {
          id: "cfw-submit",
          type: "button",
          class: "cfw-btn cfw-btn-primary",
          disabled: b(o).creating,
          onClick: g[4] || (g[4] = (F) => u.$emit("create", !1))
        }, V(b(o).creating ? "Saving..." : "Submit"), 9, Yc)
      ]))
    ]));
  }
}), Jc = ["onKeydown"], Xc = { class: "cfw-ml-row-main" }, Qc = { class: "cfw-ml-row-header" }, Zc = { class: "cfw-ml-row-status" }, ea = {
  key: 0,
  class: "cfw-ml-row-comments"
}, ta = {
  key: 1,
  class: "cfw-ml-unread-dot"
}, sa = { class: "cfw-ml-row-time" }, na = { class: "cfw-ml-row-title" }, oa = ["onClick"], Do = 80, Lo = 160, jo = /* @__PURE__ */ tt({
  __name: "IssueRow",
  props: {
    issue: { type: Object }
  },
  emits: ["open-issue", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ae(), { persist: i } = He(), r = ae(() => {
      const T = o.itemViews[s.issue.number] || 0;
      return new Date(s.issue.updatedAt).getTime() > T;
    }), l = ae(() => {
      const T = new Date(s.issue.updatedAt), be = (/* @__PURE__ */ new Date()).getTime() - T.getTime();
      return be < 6e4 ? "Just now" : be < 36e5 ? `${Math.floor(be / 6e4)}m ago` : be < 864e5 ? `${Math.floor(be / 36e5)}h ago` : `${Math.floor(be / 864e5)}d ago`;
    });
    let c = 0, m = 0;
    const a = /* @__PURE__ */ j(0), p = /* @__PURE__ */ j(!1), w = ae(() => {
      if (!p.value) return "";
      const T = a.value > 0 ? "right" : "left", oe = Math.abs(a.value), be = oe > Lo ? o.swipeMapping[T === "right" ? "longRight" : "longLeft"] : oe > Do ? o.swipeMapping[T === "right" ? "shortRight" : "shortLeft"] : "none";
      return ge(be);
    }), y = ae(() => a.value > 0 ? "preview-left" : "preview-right"), u = ae(() => !w.value || w.value === "None" ? "" : a.value > 0 ? "bg-right" : "bg-left"), g = ae(() => ({
      transform: `translateX(${a.value}px)`,
      transition: p.value ? "none" : "transform 0.25s ease-out"
    }));
    function F(T) {
      c = T.touches[0].clientX, p.value = !0;
    }
    function K(T) {
      p.value && (m = T.touches[0].clientX, a.value = m - c);
    }
    function C() {
      p.value = !1;
      const T = Math.abs(a.value);
      if (T > Do) {
        const oe = a.value > 0 ? "right" : "left", be = T > Lo ? o.swipeMapping[oe === "right" ? "longRight" : "longLeft"] : o.swipeMapping[oe === "right" ? "shortRight" : "shortLeft"];
        be !== "none" && n("swipe-action", be, s.issue);
      }
      a.value = 0;
    }
    function A() {
      o.itemViews[s.issue.number] = Date.now(), i(), n("open-issue", s.issue);
    }
    const M = /* @__PURE__ */ j(!1), N = /* @__PURE__ */ j(null), ne = /* @__PURE__ */ j({ top: 0, left: 0 }), re = ae(() => ({
      top: `${ne.value.top}px`,
      left: `${ne.value.left}px`
    }));
    async function B() {
      if (M.value = !M.value, M.value) {
        await gt();
        const T = N.value;
        if (T) {
          const oe = T.getBoundingClientRect();
          ne.value = {
            top: oe.bottom + 4,
            left: oe.right - 140
            // menu width ~140px
          };
        }
      }
    }
    function $(T) {
      M.value && (M.value = !1);
    }
    Ct(M, (T) => {
      T && setTimeout(() => document.addEventListener("click", $, { once: !0 }), 0);
    });
    const R = ae(() => {
      const T = [
        { id: "done_archive", label: "Done / Archive" },
        { id: "pin_unpin", label: "Pin / Unpin" },
        { id: "comment", label: "Comment" },
        { id: "create_linked_item", label: "Create linked item" },
        { id: "mark_viewed", label: "Mark viewed" }
      ];
      return s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" || T.unshift({ id: "edit", label: "Edit" }), T;
    });
    function le(T) {
      M.value = !1, T === "edit" ? n("edit-issue", s.issue) : n("swipe-action", T, s.issue);
    }
    function ge(T) {
      return {
        done_archive: "Archive",
        pin_unpin: "Pin",
        comment: "Comment",
        create_linked_item: "Link",
        mark_viewed: "Mark viewed",
        none: "None"
      }[T] || "None";
    }
    return (T, oe) => {
      const be = ml("click-outside");
      return E(), O("div", {
        class: U(["cfw-ml-row-wrap", { "menu-open": M.value }]),
        onTouchstartPassive: F,
        onTouchmovePassive: K,
        onTouchend: C
      }, [
        d("div", {
          class: U(["cfw-ml-row-bg", u.value])
        }, [
          w.value ? (E(), O("div", {
            key: 0,
            class: U(["cfw-swipe-preview", y.value])
          }, V(w.value), 3)) : te("", !0)
        ], 2),
        d("div", {
          class: U(["cfw-ml-row", { unread: r.value, "menu-open": M.value }]),
          style: zt(g.value),
          onClick: A,
          tabindex: "0",
          onKeydown: [
            Nt(A, ["enter"]),
            Nt(bt(A, ["prevent"]), ["space"])
          ]
        }, [
          d("div", Xc, [
            d("div", Qc, [
              d("span", Zc, V(e.issue.status || e.issue.state), 1),
              e.issue.commentCount ? (E(), O("span", ea, V(e.issue.commentCount) + " comment" + V(e.issue.commentCount === 1 ? "" : "s"), 1)) : te("", !0),
              r.value ? (E(), O("span", ta)) : te("", !0),
              d("span", sa, V(l.value), 1)
            ]),
            d("div", na, V(e.issue.title), 1)
          ]),
          d("button", {
            ref_key: "menuBtnRef",
            ref: N,
            class: "cfw-ml-row-menu",
            onClick: bt(B, ["stop"])
          }, "⋮", 512),
          (E(), jt(Zr, { to: "body" }, [
            M.value ? Oe((E(), O("div", {
              key: 0,
              class: "cfw-desktop-menu",
              style: zt(re.value)
            }, [
              (E(!0), O(se, null, Ee(R.value, (fe) => (E(), O("button", {
                key: fe.id,
                onClick: bt((J) => le(fe.id), ["stop"])
              }, V(fe.label), 9, oa))), 128))
            ], 4)), [
              [be, () => M.value = !1]
            ]) : te("", !0)
          ]))
        ], 46, Jc)
      ], 34);
    };
  }
}), ia = { class: "cfw-tab-body" }, ra = { id: "cfw-ml-head" }, la = { id: "cfw-ml-head-actions" }, ca = ["disabled"], aa = ["disabled"], fa = {
  key: 0,
  id: "cfw-ml-error",
  class: "cfw-error active"
}, ua = {
  key: 0,
  class: "cfw-ml-empty"
}, da = {
  key: 0,
  class: "cfw-ml-section-label"
}, Fo = 56, pa = /* @__PURE__ */ tt({
  __name: "IssuesList",
  emits: ["refresh", "open-issue", "open-filter", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = t, n = Ae(), { hasAccess: o } = Ht(), { onPanelTouchStart: i, onPanelTouchEnd: r } = Un(), l = /* @__PURE__ */ j(!1), c = /* @__PURE__ */ j("");
    let m = 0, a = !1;
    const p = (C) => !["completed", "closed_unmerged", "merged"].includes(C.status || "") && C.state !== "closed", w = ae(() => n.issues.filter((C) => !!C.pinned && p(C))), y = ae(() => n.issues.filter((C) => !C.pinned || !p(C))), u = ae(() => o() ? n.loadingIssues ? "Loading…" : n.listError ? n.listError : "No requests yet." : "Authentication required to view requests.");
    function g(C) {
      C.currentTarget.scrollTop === 0 && (m = C.touches[0].clientY, a = !0);
    }
    function F(C) {
      if (!a) return;
      const A = C.touches[0].clientY - m;
      A > 0 ? (l.value = !0, c.value = A > Fo ? "↑ Release to refresh" : "↓ Pull to refresh") : (a = !1, l.value = !1);
    }
    function K(C) {
      if (!a) return;
      const A = C.changedTouches[0].clientY - m;
      a = !1, A > Fo ? (c.value = "Refreshing…", s("refresh"), setTimeout(() => {
        l.value = !1, c.value = "";
      }, 1e3)) : (l.value = !1, c.value = "");
    }
    return (C, A) => (E(), O("div", {
      id: "cfw-mv-list",
      class: U(["cfw-mv", { active: b(n).mobileTab === "list" }])
    }, [
      d("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: A[0] || (A[0] = //@ts-ignore
        (...M) => b(i) && b(i)(...M)),
        onTouchend: A[1] || (A[1] = //@ts-ignore
        (...M) => b(r) && b(r)(...M))
      }, [...A[8] || (A[8] = [
        d("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      d("div", ia, [
        d("div", ra, [
          A[9] || (A[9] = d("span", { id: "cfw-ml-head-title" }, "Requests", -1)),
          d("div", la, [
            d("button", {
              disabled: b(n).loadingIssues,
              onClick: A[2] || (A[2] = (M) => C.$emit("open-filter"))
            }, "⊞ Filter", 8, ca),
            d("button", {
              disabled: b(n).loadingIssues,
              onClick: A[3] || (A[3] = (M) => C.$emit("refresh"))
            }, V(b(n).loadingIssues ? "…" : "↻"), 9, aa)
          ])
        ]),
        b(n).listError ? (E(), O("div", fa, V(b(n).listError), 1)) : te("", !0),
        d("div", {
          id: "cfw-ml-ptr",
          class: U({ "cfw-ml-ptr-active": l.value })
        }, V(c.value), 3),
        d("div", {
          id: "cfw-ml-body",
          onTouchstartPassive: g,
          onTouchmovePassive: F,
          onTouchendPassive: K
        }, [
          b(n).issues.length ? (E(), O(se, { key: 1 }, [
            w.value.length ? (E(), O(se, { key: 0 }, [
              A[10] || (A[10] = d("div", { class: "cfw-ml-section-label" }, "Pinned", -1)),
              (E(!0), O(se, null, Ee(w.value, (M) => (E(), jt(jo, {
                key: M.number,
                issue: M,
                onOpenIssue: A[4] || (A[4] = (N) => C.$emit("open-issue", N)),
                onSwipeAction: (N) => C.$emit("swipe-action", N, M),
                onEditIssue: (N) => C.$emit("edit-issue", M)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : te("", !0),
            y.value.length ? (E(), O(se, { key: 1 }, [
              w.value.length ? (E(), O("div", da, "Activity")) : te("", !0),
              (E(!0), O(se, null, Ee(y.value, (M) => (E(), jt(jo, {
                key: M.number,
                issue: M,
                onOpenIssue: A[5] || (A[5] = (N) => C.$emit("open-issue", N)),
                onSwipeAction: (N) => C.$emit("swipe-action", N, M),
                onEditIssue: (N) => C.$emit("edit-issue", M)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : te("", !0)
          ], 64)) : (E(), O("div", ua, V(u.value), 1))
        ], 32)
      ]),
      b(n).panelSnap === "middle" ? (E(), O("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: A[6] || (A[6] = //@ts-ignore
        (...M) => b(i) && b(i)(...M)),
        onTouchend: A[7] || (A[7] = //@ts-ignore
        (...M) => b(r) && b(r)(...M))
      }, [...A[11] || (A[11] = [
        d("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : te("", !0)
    ], 2));
  }
}), ma = [
  ["active", "Active"],
  ["needs_action", "Needs action"],
  ["completed", "Completed"],
  ["all", "All"]
], ha = [
  ["updated_desc", "Newest"],
  ["updated_asc", "Oldest"]
], ba = [
  ["new", "New"],
  ["queued", "Queued"],
  ["pr_draft", "PR draft"],
  ["pr_open", "PR open"],
  ["pr_closed_unmerged", "PR closed"],
  ["pr_merge_requested", "Merge requested"],
  ["merged", "Merged"],
  ["closed_unmerged", "Closed"]
], ga = {
  key: 0,
  id: "cfw-mbs-content"
}, wa = { class: "cfw-is-status" }, va = { class: "cfw-is-num" }, xa = {
  class: "cfw-is-action-row",
  style: { "margin-top": "8px" }
}, ya = ["disabled"], _a = ["href"], Sa = {
  key: 0,
  class: "cfw-is-body",
  style: { "font-size": "14px", color: "#a9c2df", "margin-top": "12px", "white-space": "pre-wrap", "line-height": "1.5", padding: "12px", background: "rgba(0,0,0,0.2)", "border-radius": "8px" }
}, ka = {
  key: 1,
  class: "cfw-is-badges"
}, Ca = { class: "cfw-is-primary-box" }, Ta = {
  key: 1,
  class: "cfw-is-action-row"
}, za = {
  key: 2,
  class: "cfw-is-section cfw-comments-section"
}, Ma = {
  key: 0,
  class: "cfw-comment cfw-comment-newest"
}, $a = { class: "cfw-comment-meta" }, Ea = { class: "cfw-comment-body" }, Aa = { class: "cfw-comment-meta" }, Pa = { class: "cfw-comment-body" }, Ra = {
  key: 3,
  class: "cfw-is-section"
}, Ia = ["href"], Oa = {
  key: 4,
  class: "cfw-is-section"
}, Da = { class: "cfw-is-actions" }, La = ["disabled", "onClick"], ja = {
  key: 0,
  class: "cfw-is-action-reason"
}, Fa = {
  key: 5,
  class: "cfw-is-section"
}, Va = ["href"], Na = {
  key: 0,
  class: "cfw-is-actions",
  style: { "margin-top": "10px" }
}, Ha = ["disabled", "onClick"], Ua = {
  key: 0,
  class: "cfw-is-action-reason"
}, Ka = {
  key: 6,
  class: "cfw-is-error active"
}, Ba = {
  key: 1,
  id: "cfw-mbs-content"
}, Wa = { class: "cfw-fs-section" }, qa = { class: "cfw-fs-pills" }, Ya = ["onClick"], Ga = { class: "cfw-fs-section" }, Ja = { class: "cfw-fs-pills" }, Xa = ["onClick"], Qa = { class: "cfw-fs-section" }, Za = { class: "cfw-fs-chips" }, ef = ["onClick"], tf = /* @__PURE__ */ tt({
  __name: "IssueSheet",
  props: {
    open: { type: Boolean },
    issue: { type: [Object, null] },
    filterMode: { type: Boolean },
    editMode: { type: Boolean }
  },
  emits: ["close", "action-done", "filter-changed", "compose-sheet", "edit-issue", "cancel-edit"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ae(), { persist: i } = He(), { executeAction: r, mapActionError: l } = Ht(), c = /* @__PURE__ */ j(!1), m = /* @__PURE__ */ j(""), a = /* @__PURE__ */ j(!1), p = /* @__PURE__ */ j(""), w = /* @__PURE__ */ j("");
    Ct(() => s.editMode, ($) => {
      $ && s.issue && (p.value = s.issue.title, w.value = s.issue.body || "");
    });
    const y = ae(() => s.issue ? s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" : !1), u = ae(() => {
      var $;
      return ($ = s.issue) != null && $.comments ? [...s.issue.comments].sort((R, le) => new Date(le.createdAt).getTime() - new Date(R.createdAt).getTime()) : [];
    }), g = ae(() => u.value.length > 0), F = ae(() => u.value[0] || null), K = ae(() => u.value.slice(1));
    function C($) {
      return new Date($).toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }
    const A = ae(() => {
      var $;
      return Array.isArray(($ = s.issue) == null ? void 0 : $.issueActions) ? s.issue.issueActions : [];
    }), M = ae(() => {
      var $;
      return Array.isArray(($ = s.issue) == null ? void 0 : $.pullRequestActions) ? s.issue.pullRequestActions : [];
    });
    async function N($, R, le) {
      m.value = "", c.value = !0;
      try {
        await r($, le, R), n("action-done"), n("close");
      } catch (ge) {
        m.value = l(ge instanceof Error ? ge.message : "");
      } finally {
        c.value = !1;
      }
    }
    async function ne() {
      if (!s.issue) return;
      const $ = p.value.trim();
      if ($) {
        m.value = "", c.value = !0;
        try {
          await r(s.issue.number, "edit", "issue", {
            title: $,
            body: w.value.trim()
          }), n("action-done"), n("cancel-edit");
        } catch (R) {
          m.value = l(R instanceof Error ? R.message : "");
        } finally {
          c.value = !1;
        }
      }
    }
    function re($) {
      const R = o.listStatusFilter.slice(), le = R.indexOf($);
      le >= 0 ? R.splice(le, 1) : R.push($), o.listStatusFilter = R, i(), n("filter-changed");
    }
    function B() {
      o.listView = "active", o.listQuery = "", o.listStatusFilter = [], i(), n("filter-changed"), n("close");
    }
    return ($, R) => {
      var le, ge;
      return E(), O(se, null, [
        d("div", {
          id: "cfw-mbs-overlay",
          class: U({ active: e.open }),
          onClick: R[0] || (R[0] = (T) => $.$emit("close"))
        }, null, 2),
        d("div", {
          id: "cfw-mbs",
          class: U({ active: e.open, "panel-left": b(o).handedness === "left" })
        }, [
          R[16] || (R[16] = d("div", { id: "cfw-mbs-handle" }, null, -1)),
          e.issue ? (E(), O("div", ga, [
            d("div", wa, V(e.issue.status || e.issue.state) + V(e.issue.statusDetail ? " · " + e.issue.statusDetail : ""), 1),
            d("div", va, "#" + V(e.issue.number) + " · " + V(C(e.issue.updatedAt)), 1),
            e.editMode ? (E(), O(se, { key: 0 }, [
              Oe(d("input", {
                "onUpdate:modelValue": R[1] || (R[1] = (T) => p.value = T),
                class: "cfw-edit-title",
                placeholder: "Issue title...",
                style: { width: "100%", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#fff", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "16px", "font-weight": "bold", "margin-top": "12px" }
              }, null, 512), [
                [As, p.value]
              ]),
              Oe(d("textarea", {
                "onUpdate:modelValue": R[2] || (R[2] = (T) => w.value = T),
                placeholder: "Issue description...",
                style: { width: "100%", "min-height": "120px", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#d9e7f7", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "14px", "margin-top": "8px", resize: "vertical" }
              }, null, 512), [
                [As, w.value]
              ]),
              d("div", xa, [
                d("button", {
                  class: "cfw-btn cfw-btn-outline",
                  onClick: R[3] || (R[3] = (T) => $.$emit("cancel-edit")),
                  style: { flex: "1" }
                }, "Cancel"),
                d("button", {
                  class: "cfw-btn cfw-btn-primary",
                  disabled: c.value || !p.value.trim(),
                  onClick: ne,
                  style: { flex: "1" }
                }, V(c.value ? "Saving..." : "Save"), 9, ya)
              ])
            ], 64)) : (E(), O(se, { key: 1 }, [
              d("a", {
                class: "cfw-is-title",
                href: e.issue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, V(e.issue.title), 9, _a),
              e.issue.body ? (E(), O("div", Sa, V(e.issue.body), 1)) : te("", !0),
              (le = e.issue.labels) != null && le.length ? (E(), O("div", ka, [
                (E(!0), O(se, null, Ee(e.issue.labels, (T) => (E(), O("span", {
                  key: T,
                  class: "cfw-badge"
                }, V(T), 1))), 128))
              ])) : te("", !0),
              d("div", Ca, [
                y.value ? (E(), O("button", {
                  key: 0,
                  class: "cfw-btn cfw-btn-primary cfw-is-w100",
                  onClick: R[4] || (R[4] = (T) => $.$emit("compose-sheet", "comment", e.issue))
                }, "Comment")) : (E(), O("div", Ta, [
                  d("button", {
                    class: "cfw-btn cfw-btn-outline",
                    onClick: R[5] || (R[5] = (T) => $.$emit("edit-issue", e.issue))
                  }, "Edit"),
                  d("button", {
                    class: "cfw-btn cfw-btn-primary",
                    onClick: R[6] || (R[6] = (T) => $.$emit("compose-sheet", "comment", e.issue))
                  }, "Comment")
                ]))
              ])
            ], 64)),
            g.value ? (E(), O("div", za, [
              F.value ? (E(), O("div", Ma, [
                d("div", $a, [
                  d("strong", null, V(F.value.author || "User"), 1),
                  Vt(" · " + V(C(F.value.createdAt)), 1)
                ]),
                d("div", Ea, V(F.value.body), 1)
              ])) : te("", !0),
              K.value.length > 0 ? (E(), O(se, { key: 1 }, [
                a.value ? (E(!0), O(se, { key: 1 }, Ee(K.value, (T) => (E(), O("div", {
                  key: T.id,
                  class: "cfw-comment"
                }, [
                  d("div", Aa, [
                    d("strong", null, V(T.author || "User"), 1),
                    Vt(" · " + V(C(T.createdAt)), 1)
                  ]),
                  d("div", Pa, V(T.body), 1)
                ]))), 128)) : (E(), O("button", {
                  key: 0,
                  class: "cfw-comments-expand",
                  onClick: R[7] || (R[7] = (T) => a.value = !0)
                }, " Show " + V(K.value.length) + " previous comment" + V(K.value.length > 1 ? "s" : ""), 1))
              ], 64)) : te("", !0)
            ])) : te("", !0),
            e.issue.sourceIssue ? (E(), O("div", Ra, [
              R[10] || (R[10] = d("div", { class: "cfw-is-section-label" }, "Source Item", -1)),
              d("a", {
                class: "cfw-is-pr-link",
                href: e.issue.sourceIssue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, " #" + V(e.issue.sourceIssue.number) + " " + V(e.issue.sourceIssue.title), 9, Ia)
            ])) : te("", !0),
            A.value.length ? (E(), O("div", Oa, [
              R[11] || (R[11] = d("div", { class: "cfw-is-section-label" }, "Issue actions", -1)),
              d("div", Da, [
                (E(!0), O(se, null, Ee(A.value, (T) => (E(), O("div", {
                  key: T.id
                }, [
                  d("button", {
                    class: "cfw-is-action-btn",
                    disabled: T.disabled || c.value,
                    onClick: (oe) => !T.disabled && N(e.issue.number, "issue", T.id)
                  }, V(T.label || T.id), 9, La),
                  T.disabled && T.reason ? (E(), O("span", ja, V(T.reason), 1)) : te("", !0)
                ]))), 128))
              ])
            ])) : te("", !0),
            (ge = e.issue.pullRequest) != null && ge.url ? (E(), O("div", Fa, [
              R[12] || (R[12] = d("div", { class: "cfw-is-section-label" }, "Pull request", -1)),
              d("a", {
                class: "cfw-is-pr-link",
                href: e.issue.pullRequest.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "PR #" + V(e.issue.pullRequest.number) + " · " + V((e.issue.pullRequest.state || "").toLowerCase()) + V(e.issue.pullRequest.isDraft ? " · draft" : ""), 9, Va),
              M.value.length ? (E(), O("div", Na, [
                (E(!0), O(se, null, Ee(M.value, (T) => (E(), O("div", {
                  key: T.id
                }, [
                  d("button", {
                    class: "cfw-is-action-btn",
                    disabled: T.disabled || c.value,
                    onClick: (oe) => !T.disabled && N(e.issue.number, "pull_request", T.id)
                  }, V(T.label || T.id), 9, Ha),
                  T.disabled && T.reason ? (E(), O("span", Ua, V(T.reason), 1)) : te("", !0)
                ]))), 128))
              ])) : te("", !0)
            ])) : te("", !0),
            m.value ? (E(), O("div", Ka, V(m.value), 1)) : te("", !0),
            d("button", {
              class: "cfw-mbs-close",
              onClick: R[8] || (R[8] = (T) => $.$emit("close"))
            }, "Close")
          ])) : e.filterMode ? (E(), O("div", Ba, [
            d("div", Wa, [
              R[13] || (R[13] = d("div", { class: "cfw-fs-label" }, "View", -1)),
              d("div", qa, [
                (E(!0), O(se, null, Ee(b(ma), ([T, oe]) => (E(), O("button", {
                  key: T,
                  class: U(["cfw-fs-pill", { active: b(o).listView === T }]),
                  onClick: (be) => {
                    b(o).listView = T, b(i)(), $.$emit("filter-changed");
                  }
                }, V(oe), 11, Ya))), 128))
              ])
            ]),
            d("div", Ga, [
              R[14] || (R[14] = d("div", { class: "cfw-fs-label" }, "Sort", -1)),
              d("div", Ja, [
                (E(!0), O(se, null, Ee(b(ha), ([T, oe]) => (E(), O("button", {
                  key: T,
                  class: U(["cfw-fs-pill", { active: b(o).listSort === T }]),
                  onClick: (be) => {
                    b(o).listSort = T, b(i)(), $.$emit("filter-changed");
                  }
                }, V(oe), 11, Xa))), 128))
              ])
            ]),
            d("div", Qa, [
              R[15] || (R[15] = d("div", { class: "cfw-fs-label" }, "Status", -1)),
              d("div", Za, [
                (E(!0), O(se, null, Ee(b(ba), ([T, oe]) => (E(), O("button", {
                  key: T,
                  class: U(["cfw-fs-chip", { active: b(o).listStatusFilter.includes(T) }]),
                  onClick: (be) => re(T)
                }, V(oe), 11, ef))), 128))
              ])
            ]),
            d("button", {
              class: "cfw-mbs-close",
              style: { "margin-bottom": "8px" },
              onClick: B
            }, "Clear filters"),
            d("button", {
              class: "cfw-mbs-close",
              onClick: R[9] || (R[9] = (T) => $.$emit("close"))
            }, "Done")
          ])) : te("", !0)
        ], 2)
      ], 64);
    };
  }
}), sf = { class: "cfw-tab-body" }, nf = { class: "cfw-m-settings" }, of = {
  id: "cfw-m-token-status",
  class: "cfw-m-settings-token"
}, rf = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, lf = { class: "cfw-m-hand-toggle" }, cf = { class: "cfw-m-hand-toggle" }, af = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, ff = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, uf = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, df = { class: "cfw-m-swipe-settings" }, pf = { class: "cfw-m-swipe-row" }, mf = ["value"], hf = { class: "cfw-m-swipe-row" }, bf = ["value"], gf = { class: "cfw-m-swipe-row" }, wf = ["value"], vf = { class: "cfw-m-swipe-row" }, xf = ["value"], yf = /* @__PURE__ */ tt({
  __name: "SettingsPane",
  emits: ["handedness", "token-changed"],
  setup(e, { emit: t }) {
    const s = t, n = Ae(), { persist: o } = He(), { clearToken: i, promptToken: r } = Qi(), { onPanelTouchStart: l, onPanelTouchEnd: c } = Un(), m = ae(() => {
      const y = n.adminToken;
      return y ? "Token is set: " + y.slice(0, 3) + "…" : "No token set.";
    });
    function a() {
      r(), s("token-changed");
    }
    function p() {
      window.confirm("Clear saved admin token?") && (i(), s("token-changed"));
    }
    const w = [
      { value: "done_archive", label: "Done / Archive" },
      { value: "pin_unpin", label: "Pin / Unpin" },
      { value: "comment", label: "Comment" },
      { value: "create_linked_item", label: "Create linked item" },
      { value: "mark_viewed", label: "Mark viewed" },
      { value: "none", label: "None" }
    ];
    return (y, u) => (E(), O("div", {
      id: "cfw-mv-settings",
      class: U(["cfw-mv", { active: b(n).mobileTab === "settings" }])
    }, [
      d("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: u[0] || (u[0] = //@ts-ignore
        (...g) => b(l) && b(l)(...g)),
        onTouchend: u[1] || (u[1] = //@ts-ignore
        (...g) => b(c) && b(c)(...g))
      }, [...u[30] || (u[30] = [
        d("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      d("div", sf, [
        d("div", nf, [
          u[35] || (u[35] = d("h3", null, "Admin token", -1)),
          d("div", of, V(m.value), 1),
          d("div", { class: "cfw-m-hand-toggle" }, [
            d("button", {
              class: "cfw-m-hand-btn",
              onClick: a
            }, "Update"),
            d("button", {
              class: "cfw-m-hand-btn",
              onClick: p
            }, "Clear")
          ]),
          u[36] || (u[36] = d("p", { class: "cfw-m-settings-note" }, "Token authenticates all widget actions.", -1)),
          u[37] || (u[37] = d("h3", null, "Capture Mode", -1)),
          d("div", rf, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).mode === "technical_issue" }]),
              onClick: u[2] || (u[2] = (g) => {
                b(n).mode = "technical_issue", b(o)();
              })
            }, "Issue", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).mode === "personal_todo" }]),
              onClick: u[3] || (u[3] = (g) => {
                b(n).mode = "personal_todo", b(o)();
              })
            }, "Todo", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).mode === "feature_request" }]),
              onClick: u[4] || (u[4] = (g) => {
                b(n).mode = "feature_request", b(o)();
              })
            }, "Feature", 2)
          ]),
          u[38] || (u[38] = d("h3", null, "Button side", -1)),
          d("div", lf, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).handedness === "left" }]),
              onClick: u[5] || (u[5] = (g) => y.$emit("handedness", "left"))
            }, "◀ Left", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).handedness === "right" }]),
              onClick: u[6] || (u[6] = (g) => y.$emit("handedness", "right"))
            }, "Right ▶", 2)
          ]),
          u[39] || (u[39] = d("p", { class: "cfw-m-settings-note" }, "Or swipe the open button left or right.", -1)),
          u[40] || (u[40] = d("h3", null, "Panel position", -1)),
          d("div", cf, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).panelSnap === "top" }]),
              type: "button",
              onClick: u[7] || (u[7] = (g) => {
                b(n).panelSnap = "top", b(o)();
              })
            }, "▲ Top", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).panelSnap === "middle" }]),
              type: "button",
              onClick: u[8] || (u[8] = (g) => {
                b(n).panelSnap = "middle", b(o)();
              })
            }, "Middle", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).panelSnap === "bottom" }]),
              type: "button",
              onClick: u[9] || (u[9] = (g) => {
                b(n).panelSnap = "bottom", b(o)();
              })
            }, "Bottom ▼", 2)
          ]),
          u[41] || (u[41] = d("p", { class: "cfw-m-settings-note" }, "Or swipe the panel handle up or down.", -1)),
          u[42] || (u[42] = d("h3", null, "Text size", -1)),
          d("div", af, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).fontSize === "small" }]),
              type: "button",
              onClick: u[10] || (u[10] = (g) => {
                b(n).fontSize = "small", b(o)();
              })
            }, "Small", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).fontSize === "medium" }]),
              type: "button",
              onClick: u[11] || (u[11] = (g) => {
                b(n).fontSize = "medium", b(o)();
              })
            }, "Medium", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).fontSize === "large" }]),
              type: "button",
              onClick: u[12] || (u[12] = (g) => {
                b(n).fontSize = "large", b(o)();
              })
            }, "Large", 2)
          ]),
          u[43] || (u[43] = d("p", { class: "cfw-m-settings-note" }, "Adjust text size throughout the widget.", -1)),
          u[44] || (u[44] = d("h3", null, "Density", -1)),
          d("div", ff, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).density === "compact" }]),
              type: "button",
              onClick: u[13] || (u[13] = (g) => {
                b(n).density = "compact", b(o)();
              })
            }, "Compact", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).density === "default" }]),
              type: "button",
              onClick: u[14] || (u[14] = (g) => {
                b(n).density = "default", b(o)();
              })
            }, "Default", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).density === "comfortable" }]),
              type: "button",
              onClick: u[15] || (u[15] = (g) => {
                b(n).density = "comfortable", b(o)();
              })
            }, "Comfortable", 2)
          ]),
          u[45] || (u[45] = d("p", { class: "cfw-m-settings-note" }, "Control spacing and row density throughout the widget.", -1)),
          u[46] || (u[46] = d("h3", null, "Theme", -1)),
          d("div", uf, [
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).theme === "ocean" }]),
              type: "button",
              onClick: u[16] || (u[16] = (g) => {
                b(n).theme = "ocean", b(o)();
              })
            }, "🌊 Ocean", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).theme === "forest" }]),
              type: "button",
              onClick: u[17] || (u[17] = (g) => {
                b(n).theme = "forest", b(o)();
              })
            }, "🌲 Forest", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).theme === "berry" }]),
              type: "button",
              onClick: u[18] || (u[18] = (g) => {
                b(n).theme = "berry", b(o)();
              })
            }, "🫐 Berry", 2),
            d("button", {
              class: U(["cfw-m-hand-btn", { active: b(n).theme === "sunset" }]),
              type: "button",
              onClick: u[19] || (u[19] = (g) => {
                b(n).theme = "sunset", b(o)();
              })
            }, "🌅 Sunset", 2)
          ]),
          u[47] || (u[47] = d("p", { class: "cfw-m-settings-note" }, "Choose your preferred color accent.", -1)),
          u[48] || (u[48] = d("h3", null, "Swipe Actions", -1)),
          d("div", df, [
            d("div", pf, [
              u[31] || (u[31] = d("label", null, "Short Right (→)", -1)),
              Oe(d("select", {
                "onUpdate:modelValue": u[20] || (u[20] = (g) => b(n).swipeMapping.shortRight = g),
                class: "cfw-select",
                onChange: u[21] || (u[21] = (g) => b(o)())
              }, [
                (E(), O(se, null, Ee(w, (g) => d("option", {
                  key: g.value,
                  value: g.value
                }, V(g.label), 9, mf)), 64))
              ], 544), [
                [Gt, b(n).swipeMapping.shortRight]
              ])
            ]),
            d("div", hf, [
              u[32] || (u[32] = d("label", null, "Long Right (→→)", -1)),
              Oe(d("select", {
                "onUpdate:modelValue": u[22] || (u[22] = (g) => b(n).swipeMapping.longRight = g),
                class: "cfw-select",
                onChange: u[23] || (u[23] = (g) => b(o)())
              }, [
                (E(), O(se, null, Ee(w, (g) => d("option", {
                  key: g.value,
                  value: g.value
                }, V(g.label), 9, bf)), 64))
              ], 544), [
                [Gt, b(n).swipeMapping.longRight]
              ])
            ]),
            d("div", gf, [
              u[33] || (u[33] = d("label", null, "Short Left (←)", -1)),
              Oe(d("select", {
                "onUpdate:modelValue": u[24] || (u[24] = (g) => b(n).swipeMapping.shortLeft = g),
                class: "cfw-select",
                onChange: u[25] || (u[25] = (g) => b(o)())
              }, [
                (E(), O(se, null, Ee(w, (g) => d("option", {
                  key: g.value,
                  value: g.value
                }, V(g.label), 9, wf)), 64))
              ], 544), [
                [Gt, b(n).swipeMapping.shortLeft]
              ])
            ]),
            d("div", vf, [
              u[34] || (u[34] = d("label", null, "Long Left (←←)", -1)),
              Oe(d("select", {
                "onUpdate:modelValue": u[26] || (u[26] = (g) => b(n).swipeMapping.longLeft = g),
                class: "cfw-select",
                onChange: u[27] || (u[27] = (g) => b(o)())
              }, [
                (E(), O(se, null, Ee(w, (g) => d("option", {
                  key: g.value,
                  value: g.value
                }, V(g.label), 9, xf)), 64))
              ], 544), [
                [Gt, b(n).swipeMapping.longLeft]
              ])
            ])
          ]),
          u[49] || (u[49] = d("div", { class: "cfw-m-gesture-ref" }, [
            d("h4", null, "Gesture Reference"),
            d("div", { class: "cfw-m-gesture-row" }, [
              d("span", null, "Short Swipe:"),
              Vt(),
              d("span", null, "Gentle flick (acts immediately)")
            ]),
            d("div", { class: "cfw-m-gesture-row" }, [
              d("span", null, "Long Swipe:"),
              Vt(),
              d("span", null, "Pull across screen to edge")
            ])
          ], -1))
        ])
      ]),
      b(n).panelSnap === "middle" ? (E(), O("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: u[28] || (u[28] = //@ts-ignore
        (...g) => b(l) && b(l)(...g)),
        onTouchend: u[29] || (u[29] = //@ts-ignore
        (...g) => b(c) && b(c)(...g))
      }, [...u[50] || (u[50] = [
        d("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : te("", !0)
    ], 2));
  }
}), _f = { class: "cfw-compose-header" }, Sf = { class: "cfw-compose-title" }, kf = {
  key: 0,
  class: "cfw-compose-context"
}, Cf = { class: "cfw-compose-context-quote" }, Tf = { class: "cfw-compose-body" }, zf = {
  class: "cfw-textarea-wrap",
  style: { flex: "1", padding: "14px" }
}, Mf = ["placeholder", "onKeydown"], $f = {
  class: "cfw-compose-actions",
  style: { padding: "14px", "border-top": "1px solid rgba(124,187,255,0.15)", display: "flex", "justify-content": "flex-end", gap: "8px" }
}, Ef = ["disabled"], Af = /* @__PURE__ */ tt({
  __name: "ComposeSheet",
  props: {
    open: { type: Boolean },
    mode: { type: String },
    issue: { type: [Object, null] }
  },
  emits: ["close", "action-done"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ae(), { submitComment: i, createLinkedItem: r } = Ht(), l = /* @__PURE__ */ j(null), c = ae(() => !!o.draftDescription.trim());
    Ct(() => s.open, (a) => {
      a && (o.draftDescription = "", gt(() => {
        var p;
        return (p = l.value) == null ? void 0 : p.focus();
      }));
    });
    async function m() {
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
          const p = a.split(`
`)[0], w = p.length > 50 ? p.slice(0, 50) + "..." : p;
          await r(s.issue.number, w, a, !1);
        }
        o.draftDescription = "", n("action-done"), n("close");
      } catch (p) {
        o.createError = p instanceof Error ? p.message : "Failed to submit";
      } finally {
        o.creating = !1;
      }
    }
    return (a, p) => (E(), O(se, null, [
      d("div", {
        id: "cfw-compose-overlay",
        class: U({ active: e.open }),
        onClick: p[0] || (p[0] = (w) => a.$emit("close"))
      }, null, 2),
      d("div", {
        id: "cfw-compose-sheet",
        class: U({ active: e.open, "panel-left": b(o).handedness === "left" })
      }, [
        p[4] || (p[4] = d("div", { id: "cfw-compose-handle" }, null, -1)),
        d("div", _f, [
          d("span", Sf, V(e.mode === "comment" ? "New Comment" : "Create Linked Item"), 1),
          d("button", {
            class: "cfw-compose-close",
            onClick: p[1] || (p[1] = (w) => a.$emit("close"))
          }, "×")
        ]),
        e.issue ? (E(), O("div", kf, [
          d("div", Cf, [
            d("strong", null, "#" + V(e.issue.number), 1),
            Vt(" " + V(e.issue.title), 1)
          ])
        ])) : te("", !0),
        d("div", Tf, [
          d("div", zf, [
            Oe(d("textarea", {
              ref_key: "descRef",
              ref: l,
              "onUpdate:modelValue": p[2] || (p[2] = (w) => b(o).draftDescription = w),
              placeholder: e.mode === "comment" ? "Write a comment..." : "Describe the linked item...",
              maxlength: "5000",
              style: { height: "100%", border: "none", background: "transparent", color: "#d9e7f7", "font-size": "14px", width: "100%", resize: "none", outline: "none", padding: "0" },
              onKeydown: [
                Nt(bt(m, ["ctrl"]), ["enter"]),
                Nt(bt(m, ["meta"]), ["enter"])
              ]
            }, null, 40, Mf), [
              [As, b(o).draftDescription]
            ])
          ]),
          d("div", $f, [
            d("button", {
              class: "cfw-btn cfw-btn-outline",
              onClick: p[3] || (p[3] = (w) => a.$emit("close"))
            }, "Cancel"),
            d("button", {
              class: "cfw-btn cfw-btn-primary",
              disabled: !c.value,
              onClick: m
            }, V(b(o).creating ? "Submitting..." : "Submit"), 9, Ef)
          ])
        ])
      ], 2)
    ], 64));
  }
}), Pf = { class: "cfw-settings-row" }, Rf = ["aria-expanded"], If = ["disabled"], Of = ["disabled"], Df = ["disabled"], Lf = {
  key: 1,
  class: "cfw-m-verror active"
}, jf = /* @__PURE__ */ tt({
  __name: "VoiceComposer",
  props: {
    mobile: { type: Boolean }
  },
  emits: ["toggle-recording", "reset", "send"],
  setup(e) {
    const t = Ae(), { persist: s } = He(), n = /* @__PURE__ */ j(!1), o = ae(() => t.voiceDraftState === "recording" ? "Recording in progress" : t.voiceDraftState === "paused" && t.voiceDraftReady ? "Recording paused" : "Ready to record");
    function i(r) {
      const l = Math.max(0, Math.floor((r || 0) / 1e3)), c = Math.floor(l / 60), m = l % 60;
      return String(c).padStart(2, "0") + ":" + String(m).padStart(2, "0");
    }
    return (r, l) => (E(), O("div", {
      class: U(e.mobile ? "cfw-m-voice" : "cfw-voice-shell")
    }, [
      e.mobile ? te("", !0) : (E(), O(se, { key: 0 }, [
        d("div", Pf, [
          l[6] || (l[6] = d("p", { class: "cfw-muted-note" }, "Current URL is attached automatically to the issue payload.", -1)),
          d("button", {
            id: "cfw-draft-settings-toggle",
            type: "button",
            class: "cfw-btn cfw-btn-outline cfw-settings-toggle",
            "aria-expanded": n.value ? "true" : "false",
            "aria-controls": "cfw-draft-settings",
            onClick: l[0] || (l[0] = (c) => n.value = !n.value)
          }, "⚙", 8, Rf)
        ]),
        d("div", {
          id: "cfw-draft-settings",
          class: U(["cfw-settings-panel", { active: n.value }])
        }, [
          l[8] || (l[8] = d("label", {
            class: "cfw-label",
            for: "cfw-merge-policy"
          }, "Merge policy", -1)),
          Oe(d("select", {
            id: "cfw-merge-policy",
            class: "cfw-select",
            "onUpdate:modelValue": l[1] || (l[1] = (c) => b(t).draftMergePolicy = c),
            onChange: l[2] || (l[2] = //@ts-ignore
            (...c) => b(s) && b(s)(...c))
          }, [...l[7] || (l[7] = [
            d("option", { value: "manual" }, "Manual merge", -1),
            d("option", { value: "auto_unblocked" }, "Auto-merge when unblocked", -1)
          ])], 544), [
            [Gt, b(t).draftMergePolicy]
          ])
        ], 2)
      ], 64)),
      d("div", {
        class: U(e.mobile ? "cfw-m-vstatus" : "cfw-voice-status")
      }, [
        d("div", {
          class: U(e.mobile ? "cfw-m-vstatus-line" : "cfw-voice-status-line")
        }, V(o.value), 3),
        d("div", {
          class: U(e.mobile ? "cfw-m-vmeta" : "cfw-voice-meta")
        }, [
          l[9] || (l[9] = d("span", null, "Draft recording", -1)),
          d("strong", null, V(i(b(t).voiceDraftDurationMs)), 1)
        ], 2)
      ], 2),
      d("div", {
        class: U(e.mobile ? "cfw-m-vcontrols" : "cfw-voice-controls")
      }, [
        d("button", {
          type: "button",
          class: "cfw-btn cfw-btn-record",
          disabled: b(t).creating,
          onClick: l[3] || (l[3] = (c) => r.$emit("toggle-recording"))
        }, V(b(t).voiceDraftState === "recording" ? "Pause" : "Record"), 9, If),
        d("button", {
          type: "button",
          class: "cfw-btn cfw-btn-reset",
          disabled: b(t).creating || !b(t).voiceDraftReady && b(t).voiceDraftState === "idle",
          onClick: l[4] || (l[4] = (c) => r.$emit("reset"))
        }, "Reset", 8, Of),
        d("button", {
          type: "button",
          class: "cfw-btn cfw-btn-send",
          disabled: b(t).creating || b(t).voiceDraftState === "recording" || !b(t).voiceDraftReady,
          onClick: l[5] || (l[5] = (c) => r.$emit("send"))
        }, "Send", 8, Df)
      ], 2),
      d("div", {
        class: U(e.mobile ? "cfw-m-vhint" : "cfw-voice-hint")
      }, V(b(t).voiceDraftReady ? "Recording is ready to send." : "Tap Record to start a draft. Settings ⚙ contains merge policy."), 3),
      b(t).createError && e.mobile ? (E(), O("div", Lf, V(b(t).createError), 1)) : te("", !0)
    ], 2));
  }
}), Ff = ["data-font-size", "data-density", "data-theme"], Vf = { class: "cfw-tab-body" }, Nf = {
  key: 0,
  class: "cfw-compose-mode-toggle"
}, Hf = { class: "cfw-m-success-hint" }, Uf = {
  key: 2,
  id: "cfw-mv-text-form",
  class: "cfw-mf"
}, Kf = { id: "cfw-mobile-nav" }, Bf = /* @__PURE__ */ tt({
  __name: "MobileWidget",
  setup(e, { expose: t }) {
    const s = Ae(), { persist: n } = He(), { onPanelTouchStart: o, onPanelTouchEnd: i } = Un(), { loadIssues: r, authorize: l, executeAction: c } = Ht(), m = Oc(), a = jc(), p = Fc(), w = Nc(), y = /* @__PURE__ */ j(null), u = ae(() => ({
      display: "flex",
      flexDirection: "column"
    })), g = ae(() => s.textCreateSuccess || s.voiceCreateSuccess), F = ae(() => s.voiceCreateSuccess ? "Voice request submitted" : "Tap to submit another"), K = ae(() => s.voiceCreateSuccess ? a.undoSecondsLeft.value : m.undoSecondsLeft.value);
    function C(Q) {
      s.mobileTab = Q, Q === "list" && r(!1), Q === "text" && gt(() => {
        var z;
        return (z = y.value) == null ? void 0 : z.focusTitle();
      }), n();
    }
    function A(Q) {
      s.composeMode = Q, s.createError = "", Q === "text" && gt(() => {
        var z;
        return (z = y.value) == null ? void 0 : z.focusTitle();
      }), n();
    }
    function M() {
      s.voiceCreateSuccess ? a.dismissSuccess() : m.reset();
    }
    function N() {
      s.voiceCreateSuccess ? a.undo() : m.undo();
    }
    const ne = /* @__PURE__ */ j(!1), re = /* @__PURE__ */ j("comment"), B = /* @__PURE__ */ j(null);
    function $(Q, z) {
      re.value = Q, B.value = z, ne.value = !0, Z(3);
    }
    async function R(Q, z) {
      if (Q !== "none") {
        if (Q === "mark_viewed") {
          s.itemViews[z.number] = Date.now(), n();
          return;
        }
        if (Q === "comment" || Q === "create_linked_item") {
          $(Q, z);
          return;
        }
        try {
          await c(z.number, Q, "issue"), await r(!0);
        } catch (Y) {
          console.warn("Action failed", Y);
        }
      }
    }
    function le(Q) {
      p.openIssue(Q, !0), Z(2);
    }
    function ge(Q) {
      p.openIssue(Q), Z(2);
    }
    function T() {
      p.openFilter(), Z(2);
    }
    async function oe() {
      await r(!0);
    }
    function be() {
      l() && (w.open(), Z(1));
    }
    function fe() {
      r(!0);
    }
    function J(Q = !1) {
      var z;
      if (ne.value = !1, p.close(), w.close(), !Q) {
        const Y = ((z = window.history.state) == null ? void 0 : z.widgetDepth) || 0;
        Y > 0 && history.go(-Y);
      }
    }
    function Z(Q) {
      var Y;
      (((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0) < Q && history.pushState({ widgetDepth: Q }, "");
    }
    function Ue(Q) {
      var Y;
      Q === 3 ? ne.value = !1 : Q === 2 ? p.close() : Q === 1 && J(!1);
      const z = ((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0;
      z >= Q && history.go(-(z - Q + 1));
    }
    function Mt() {
      window.addEventListener("popstate", Ke);
    }
    function Ke(Q) {
      var Y;
      const z = ((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0;
      z < 3 && ne.value && (ne.value = !1), z < 2 && p.sheetOpen.value && p.close(), z < 1 && w.isOpen.value && w.close();
    }
    Ln(() => {
      m.stopUndoCountdown(), a.stopUndoCountdown(), a.stopVoiceTimer(), window.removeEventListener("popstate", Ke);
    }), Mt();
    function Fe(Q) {
      if (!l()) return;
      const z = typeof Q == "string" ? parseInt(Q, 10) : Q;
      w.isOpen.value || (w.open(), Z(1)), C("list");
      const Y = s.issues.find((Be) => Be.number === z);
      Y ? ge(Y) : r(!0).then(() => {
        const Be = s.issues.find(($t) => $t.number === z);
        Be && ge(Be);
      });
    }
    return t({ openItem: Fe }), (Q, z) => (E(), O(se, null, [
      Oe(d("button", {
        id: "cfw-mobile-launcher",
        type: "button",
        "aria-label": "Open feedback widget",
        class: U({ "panel-left": b(s).handedness === "left" }),
        onTouchstartPassive: z[0] || (z[0] = //@ts-ignore
        (...Y) => b(w).onTouchStart && b(w).onTouchStart(...Y)),
        onTouchend: z[1] || (z[1] = //@ts-ignore
        (...Y) => b(w).onTouchEnd && b(w).onTouchEnd(...Y)),
        onClick: z[2] || (z[2] = (Y) => be())
      }, [...z[22] || (z[22] = [
        d("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          d("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
          })
        ], -1)
      ])], 34), [
        [rn, !b(w).isOpen.value]
      ]),
      d("div", {
        id: "cfw-swipe-hint",
        class: U({ visible: b(w).swipeHintVisible.value }),
        style: zt(b(w).swipeHintStyle.value)
      }, "← swipe →", 6),
      Oe(d("div", {
        id: "cfw-desktop-backdrop",
        onClick: z[3] || (z[3] = (Y) => J(!1))
      }, null, 512), [
        [rn, b(w).isOpen.value]
      ]),
      Oe(d("div", {
        id: "cfw-mobile",
        class: U({ "panel-left": b(s).handedness === "left" }),
        style: zt(u.value),
        "data-font-size": b(s).fontSize,
        "data-density": b(s).density,
        "data-theme": b(s).theme
      }, [
        d("div", {
          id: "cfw-mobile-body",
          class: U({ "snap-bottom": b(s).panelSnap === "bottom", "snap-top": b(s).panelSnap === "top", "snap-middle": b(s).panelSnap === "middle" })
        }, [
          d("div", {
            id: "cfw-mv-text",
            class: U(["cfw-mv", { active: b(s).mobileTab === "text" }])
          }, [
            g.value ? te("", !0) : (E(), O("div", {
              key: 0,
              class: "cfw-panel-handle",
              onTouchstartPassive: z[4] || (z[4] = //@ts-ignore
              (...Y) => b(o) && b(o)(...Y)),
              onTouchend: z[5] || (z[5] = //@ts-ignore
              (...Y) => b(i) && b(i)(...Y))
            }, [...z[23] || (z[23] = [
              d("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)),
            d("div", Vf, [
              g.value ? te("", !0) : (E(), O("div", Nf, [
                d("button", {
                  type: "button",
                  class: U(["cfw-compose-mode-btn", { active: b(s).composeMode === "text" }]),
                  onClick: z[6] || (z[6] = (Y) => A("text"))
                }, "Text", 2),
                d("button", {
                  type: "button",
                  class: U(["cfw-compose-mode-btn", { active: b(s).composeMode === "voice" }]),
                  onClick: z[7] || (z[7] = (Y) => A("voice"))
                }, "Voice", 2)
              ])),
              g.value ? (E(), O("div", {
                key: 1,
                id: "cfw-mv-compose-success",
                class: "cfw-m-success",
                onClick: z[9] || (z[9] = (Y) => M())
              }, [
                z[24] || (z[24] = d("div", { class: "cfw-m-success-ring" }, [
                  d("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    d("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  ])
                ], -1)),
                d("div", Hf, V(F.value), 1),
                K.value > 0 && b(s).lastSubmissionId ? (E(), O("button", {
                  key: 0,
                  id: "cfw-mv-compose-undo",
                  class: "cfw-m-undo-btn",
                  onClick: z[8] || (z[8] = bt((Y) => N(), ["stop"]))
                }, "Undo (" + V(K.value) + ")", 1)) : te("", !0)
              ])) : b(s).composeMode === "text" ? (E(), O("div", Uf, [
                ze(Gc, {
                  ref_key: "textFormRef",
                  ref: y,
                  mobile: !0,
                  "title-id": "cfw-m-title",
                  "desc-id": "cfw-m-description",
                  onCreate: b(m).submit
                }, null, 8, ["onCreate"])
              ])) : (E(), jt(jf, {
                key: 3,
                mobile: !0,
                onToggleRecording: b(a).toggleRecording,
                onReset: b(a).reset,
                onSend: b(a).submit
              }, null, 8, ["onToggleRecording", "onReset", "onSend"]))
            ]),
            b(s).panelSnap === "middle" && !g.value ? (E(), O("div", {
              key: 1,
              class: "cfw-panel-handle cfw-panel-handle-bottom",
              onTouchstartPassive: z[10] || (z[10] = //@ts-ignore
              (...Y) => b(o) && b(o)(...Y)),
              onTouchend: z[11] || (z[11] = //@ts-ignore
              (...Y) => b(i) && b(i)(...Y))
            }, [...z[25] || (z[25] = [
              d("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)) : te("", !0)
          ], 2),
          ze(pa, {
            onRefresh: z[12] || (z[12] = (Y) => b(r)(!0)),
            onOpenIssue: ge,
            onOpenFilter: T,
            onSwipeAction: R
          }),
          ze(yf, {
            onHandedness: b(w).applyHandedness,
            onTokenChanged: fe
          }, null, 8, ["onHandedness"])
        ], 2),
        d("nav", Kf, [
          b(s).handedness === "left" ? (E(), O("button", {
            key: 0,
            class: "cfw-nav-btn",
            type: "button",
            onClick: z[13] || (z[13] = (Y) => J(!1))
          }, [...z[26] || (z[26] = [
            d("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            d("span", null, "Close", -1)
          ])])) : te("", !0),
          d("button", {
            id: "cfw-nav-text",
            class: U(["cfw-nav-btn", { active: b(s).mobileTab === "text" }]),
            type: "button",
            onClick: z[14] || (z[14] = (Y) => C("text"))
          }, [...z[27] || (z[27] = [
            d("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
              })
            ], -1),
            d("span", null, "Compose", -1)
          ])], 2),
          d("button", {
            id: "cfw-nav-list",
            class: U(["cfw-nav-btn", { active: b(s).mobileTab === "list" }]),
            type: "button",
            onClick: z[15] || (z[15] = (Y) => C("list"))
          }, [...z[28] || (z[28] = [
            d("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M4 6h16M4 12h16M4 18h16"
              })
            ], -1),
            d("span", null, "Activity", -1)
          ])], 2),
          d("button", {
            id: "cfw-nav-settings",
            class: U(["cfw-nav-btn", { active: b(s).mobileTab === "settings" }]),
            type: "button",
            onClick: z[16] || (z[16] = (Y) => C("settings"))
          }, [...z[29] || (z[29] = [
            d("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              }),
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              })
            ], -1),
            d("span", null, "Settings", -1)
          ])], 2),
          b(s).handedness !== "left" ? (E(), O("button", {
            key: 1,
            class: "cfw-nav-btn",
            type: "button",
            onClick: z[17] || (z[17] = (Y) => J(!1))
          }, [...z[30] || (z[30] = [
            d("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              d("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            d("span", null, "Close", -1)
          ])])) : te("", !0)
        ])
      ], 14, Ff), [
        [rn, b(w).isOpen.value]
      ]),
      ze(tf, {
        open: b(p).sheetOpen.value,
        issue: b(p).sheetIssue.value,
        "filter-mode": b(p).filterMode.value,
        "edit-mode": b(p).editMode.value,
        onActionDone: oe,
        onClose: z[18] || (z[18] = (Y) => Ue(2)),
        onCancelEdit: z[19] || (z[19] = (Y) => b(p).editMode.value = !1),
        onFilterChanged: z[20] || (z[20] = (Y) => b(r)(!0)),
        onComposeSheet: $,
        onEditIssue: le
      }, null, 8, ["open", "issue", "filter-mode", "edit-mode"]),
      ze(Af, {
        open: ne.value,
        mode: re.value,
        issue: B.value,
        onClose: z[21] || (z[21] = (Y) => Ue(3)),
        onActionDone: oe
      }, null, 8, ["open", "mode", "issue"])
    ], 64));
  }
}), Wf = /* @__PURE__ */ tt({
  __name: "FeedbackWidget.ce",
  props: {
    widgetConfig: { type: Object }
  },
  setup(e, { expose: t }) {
    const s = e, n = Ae(), { restore: o } = He(), { readToken: i } = Qi(), r = /* @__PURE__ */ j(null);
    return t({
      openItem(l) {
        r.value && r.value.openItem(l);
      }
    }), Bs(() => {
      s.widgetConfig && (n.init(s.widgetConfig), o(), i());
    }), (l, c) => (E(), jt(Bf, {
      ref_key: "mobileWidgetRef",
      ref: r
    }, null, 512));
  }
}), qf = "*{box-sizing:border-box}:host{all:initial;font-family:IBM Plex Sans,Segoe UI,sans-serif}#cfw-mobile{font-size:15px}#cfw-mobile[data-font-size=small]{font-size:13px}#cfw-mobile[data-font-size=large]{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-nav-btn{font-size:9px}#cfw-mobile[data-font-size=large] .cfw-nav-btn{font-size:12px}#cfw-mobile[data-font-size=small] #cfw-ml-head-title{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-title{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-head-actions button{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-actions button{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-ptr{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-ptr{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-ml-empty{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-empty{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-row-bg{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-row-bg{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-section-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-section-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-status{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-status{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-comments{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-comments{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-time{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-time{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-title{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-ml-row-title{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-ml-row-menu{font-size:16px}#cfw-mobile[data-font-size=large] .cfw-ml-row-menu{font-size:22px}#cfw-mobile[data-font-size=small] .cfw-desktop-menu button{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-desktop-menu button{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-compose-mode-btn{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-compose-mode-btn{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf input{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf input{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf textarea{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf textarea{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf-policy label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-mf-policy label{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-mf-error{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-mf-error{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf-actions button{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-mf-actions button{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-success-hint{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-success-hint{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-undo-btn{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-undo-btn{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-vstatus-line{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vstatus-line{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vmeta{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-vmeta{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-vcontrols button{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vcontrols button{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vhint{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-vhint{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-verror{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-verror{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-settings h3{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings h3{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings-btn{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-settings-note{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-note{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-token{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-token{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings select{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings select{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-hand-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-hand-btn{font-size:17px}#cfw-mobile[data-font-size=small] #cfw-swipe-hint{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-swipe-hint{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-pill{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-pill{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-swipe-row label{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-swipe-row label{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-ref h4{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-ref h4{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-row{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-row{font-size:14px}:root{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 14px;--cfw-density-nav-h: 56px}#cfw-mobile[data-density=compact]{--cfw-density-row-pad: 10px;--cfw-density-body-pad: 10px;--cfw-density-gap: 10px;--cfw-density-nav-h: 48px}#cfw-mobile[data-density=compact] .cfw-ml-row{padding-top:10px;padding-bottom:10px}#cfw-mobile[data-density=compact] .cfw-tab-body{padding:10px}#cfw-mobile[data-density=compact] .cfw-m-settings{gap:10px;padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=compact] .cfw-mf{padding:10px;gap:8px}#cfw-mobile[data-density=compact] #cfw-mobile-nav{height:48px}#cfw-mobile[data-density=compact] .cfw-m-voice{padding:10px;gap:10px}#cfw-mobile[data-density=compact] .cfw-m-swipe-settings{gap:8px}#cfw-mobile[data-density=compact] .cfw-compose-mode-toggle{padding-top:10px}#cfw-mobile[data-density=comfortable]{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 18px;--cfw-density-nav-h: 60px}#cfw-mobile[data-density=comfortable] .cfw-ml-row{padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=comfortable] .cfw-tab-body{padding:14px}#cfw-mobile[data-density=comfortable] .cfw-m-settings{gap:18px;padding-top:20px;padding-bottom:20px}#cfw-mobile[data-density=comfortable] .cfw-mf{padding:14px;gap:14px}#cfw-mobile[data-density=comfortable] #cfw-mobile-nav{height:60px}#cfw-mobile[data-density=comfortable] .cfw-m-voice{padding:14px;gap:16px}#cfw-mobile[data-density=comfortable] .cfw-m-swipe-settings{gap:14px}#cfw-mobile[data-density=comfortable] .cfw-compose-mode-toggle{padding-top:14px}.cfw-tab-body::-webkit-scrollbar{width:6px}.cfw-tab-body::-webkit-scrollbar-track{background:transparent}.cfw-tab-body::-webkit-scrollbar-thumb{background:var(--cfw-accent-dim, #2f4864);border-radius:3px}.cfw-tab-body::-webkit-scrollbar-thumb:hover{background:var(--cfw-accent, #7cc4ff)}.cfw-tab-body{scrollbar-width:thin;scrollbar-color:var(--cfw-accent-dim, #2f4864) transparent}#cfw-mobile[data-theme=ocean]{--cfw-accent: #7cc4ff;--cfw-accent-soft: #9ad2ff;--cfw-accent-dim: #2f4864;--cfw-accent-bg: rgba(124, 187, 255, .1)}#cfw-mobile[data-theme=forest]{--cfw-accent: #6ee7b7;--cfw-accent-soft: #a7f3d0;--cfw-accent-dim: #2d4a3e;--cfw-accent-bg: rgba(110, 231, 183, .1)}#cfw-mobile[data-theme=forest] #cfw-mobile-launcher{color:#6ee7b7;border-color:#6ee7b766}#cfw-mobile[data-theme=forest] #cfw-nav-text.active,#cfw-mobile[data-theme=forest] #cfw-nav-list.active,#cfw-mobile[data-theme=forest] #cfw-nav-settings.active,#cfw-mobile[data-theme=forest] .cfw-nav-btn.active,#cfw-mobile[data-theme=forest] #cfw-ml-head-title,#cfw-mobile[data-theme=forest] .cfw-ml-section-label,#cfw-mobile[data-theme=forest] .cfw-ml-row-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-panel-handle-bar{background:#2d4a3e}#cfw-mobile[data-theme=forest] .cfw-m-settings h3{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=forest] .cfw-compose-mode-btn.active{border-color:#6ee7b78c;color:#d9e7f7}#cfw-mobile[data-theme=forest] .cfw-m-success-ring{border-color:#6ee7b759;background:#6ee7b71f}#cfw-mobile[data-theme=forest] .cfw-fs-label,#cfw-mobile[data-theme=forest] .cfw-is-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-badge{background:#6ee7b726;border-color:#6ee7b74d;color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-is-section-label,#cfw-mobile[data-theme=forest] .cfw-m-gesture-ref h4{color:#6ee7b7}#cfw-mobile[data-theme=berry]{--cfw-accent: #c4b5fd;--cfw-accent-soft: #ddd6fe;--cfw-accent-dim: #4c4568;--cfw-accent-bg: rgba(196, 181, 253, .1)}#cfw-mobile[data-theme=berry] #cfw-mobile-launcher{color:#c4b5fd;border-color:#c4b5fd66}#cfw-mobile[data-theme=berry] #cfw-nav-text.active,#cfw-mobile[data-theme=berry] #cfw-nav-list.active,#cfw-mobile[data-theme=berry] #cfw-nav-settings.active,#cfw-mobile[data-theme=berry] .cfw-nav-btn.active,#cfw-mobile[data-theme=berry] #cfw-ml-head-title,#cfw-mobile[data-theme=berry] .cfw-ml-section-label,#cfw-mobile[data-theme=berry] .cfw-ml-row-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-panel-handle-bar{background:#4c4568}#cfw-mobile[data-theme=berry] .cfw-m-settings h3{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=berry] .cfw-compose-mode-btn.active{border-color:#c4b5fd8c;color:#d9e7f7}#cfw-mobile[data-theme=berry] .cfw-m-success-ring{border-color:#c4b5fd59;background:#c4b5fd1f}#cfw-mobile[data-theme=berry] .cfw-fs-label,#cfw-mobile[data-theme=berry] .cfw-is-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-badge{background:#c4b5fd26;border-color:#c4b5fd4d;color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-is-section-label,#cfw-mobile[data-theme=berry] .cfw-m-gesture-ref h4{color:#c4b5fd}#cfw-mobile[data-theme=sunset]{--cfw-accent: #fdba74;--cfw-accent-soft: #fed7aa;--cfw-accent-dim: #5c4538;--cfw-accent-bg: rgba(253, 186, 116, .1)}#cfw-mobile[data-theme=sunset] #cfw-mobile-launcher{color:#fdba74;border-color:#fdba7466}#cfw-mobile[data-theme=sunset] #cfw-nav-text.active,#cfw-mobile[data-theme=sunset] #cfw-nav-list.active,#cfw-mobile[data-theme=sunset] #cfw-nav-settings.active,#cfw-mobile[data-theme=sunset] .cfw-nav-btn.active,#cfw-mobile[data-theme=sunset] #cfw-ml-head-title,#cfw-mobile[data-theme=sunset] .cfw-ml-section-label,#cfw-mobile[data-theme=sunset] .cfw-ml-row-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-panel-handle-bar{background:#5c4538}#cfw-mobile[data-theme=sunset] .cfw-m-settings h3{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=sunset] .cfw-compose-mode-btn.active{border-color:#fdba748c;color:#d9e7f7}#cfw-mobile[data-theme=sunset] .cfw-m-success-ring{border-color:#fdba7459;background:#fdba741f}#cfw-mobile[data-theme=sunset] .cfw-fs-label,#cfw-mobile[data-theme=sunset] .cfw-is-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-badge{background:#fdba7426;border-color:#fdbafd4d;color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-is-section-label,#cfw-mobile[data-theme=sunset] .cfw-m-gesture-ref h4{color:#fdba74}#cfw-desktop-backdrop{display:none}#cfw-mobile{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;background:#0a111d;color:#d9e7f7;font-family:IBM Plex Sans,Segoe UI,sans-serif}.cfw-panel-handle{height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none}.cfw-panel-handle-bar{width:36px;height:4px;background:#2f4864;border-radius:2px}.cfw-panel-handle-bottom{margin-top:auto}.cfw-panel-handle-bottom .cfw-panel-handle-bar{opacity:.7}#cfw-mobile-launcher{display:flex;position:fixed;bottom:10px;right:10px;width:34px;height:34px;border-radius:6px;background:#0a111df2;border:1px solid rgba(124,187,255,.4);color:#9ad2ff;align-items:center;justify-content:center;cursor:pointer;z-index:9998;box-shadow:0 8px 20px #02070e59;-webkit-tap-highlight-color:transparent}#cfw-mobile-launcher.panel-left{left:20px;right:auto}#cfw-mobile-launcher svg{width:14px;height:14px}#cfw-mobile-body{flex:1;overflow:hidden;position:relative}.cfw-mv{position:absolute;top:0;right:0;bottom:0;left:0;display:none;flex-direction:column;overflow:hidden}.cfw-mv.active{display:flex}.cfw-tab-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain}#cfw-mobile-body.snap-bottom .cfw-mv{justify-content:flex-end}#cfw-mobile-body.snap-bottom .cfw-tab-body{flex:0 0 auto;max-height:100%}#cfw-mobile-body.snap-top .cfw-tab-body{order:0;flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-body.snap-top .cfw-panel-handle{order:1}#cfw-mobile-body.snap-middle .cfw-mv{justify-content:center}#cfw-mobile-body.snap-middle .cfw-tab-body{flex:0 0 auto;max-height:calc(100% - 56px)}#cfw-mobile-body.snap-middle .cfw-panel-handle-bottom{flex-shrink:0}#cfw-mobile-nav{height:56px;display:flex;border-top:1px solid rgba(124,187,255,.18);background:#0a111dfa;flex-shrink:0}.cfw-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:none;border:none;color:#7f9cbc;cursor:pointer;font-size:10px;padding:0;-webkit-tap-highlight-color:transparent;transition:color .15s}.cfw-nav-btn:hover{color:#d9e7f7}.cfw-nav-btn.active,.cfw-nav-btn.active:hover{color:#9ad2ff}.cfw-nav-btn svg{width:20px;height:20px}#cfw-ml-head{padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(124,187,255,.18);flex-shrink:0}#cfw-ml-head-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}#cfw-ml-head-actions{display:flex;gap:8px}#cfw-ml-head-actions button{height:30px;padding:0 10px;border:1px solid #2f4864;border-radius:6px;background:#0d1727;color:#9bb7d3;font-size:12px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}#cfw-ml-head-actions button:hover:not(:disabled){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff14}#cfw-ml-head-actions button:disabled{opacity:.5}#cfw-ml-body{overflow-y:auto;overscroll-behavior-y:contain}#cfw-ml-ptr{height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9ad2ff;transition:height .15s ease;flex-shrink:0}#cfw-ml-ptr.cfw-ml-ptr-active{height:36px}.cfw-ml-empty{padding:32px 14px;font-size:13px;color:#7f9cbc;text-align:center;line-height:1.6}.cfw-ml-row-wrap{position:relative;border-bottom:1px solid #1a2d42}.cfw-ml-row-wrap.menu-open{z-index:50}.cfw-ml-row-bg{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font-size:13px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.cfw-ml-row-bg.bg-left{background:#eab308;opacity:1;justify-content:flex-start}.cfw-ml-row-bg.bg-right{background:#3b82f6;opacity:1;justify-content:flex-end}.cfw-swipe-preview{display:flex;align-items:center;gap:8px}.cfw-swipe-preview.preview-left{flex-direction:row-reverse}.cfw-ml-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:12px 20px 4px;font-weight:600}.cfw-ml-row{position:relative;padding:14px 20px;background:#0a111d;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;-webkit-tap-highlight-color:transparent}.cfw-ml-row.menu-open{z-index:50}.cfw-ml-row:active{background:#7cbbff0f}.cfw-ml-row-main{flex:1;min-width:0}.cfw-ml-row-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.cfw-ml-row-status{font-size:11px;color:#7cc4ff;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-ml-row-comments{font-size:11px;color:#7f9cbc}.cfw-ml-unread-dot{width:6px;height:6px;border-radius:50%;background:#ef4444}.cfw-ml-row-time{font-size:11px;color:#7f9cbc;margin-left:auto}.cfw-ml-row-title{font-size:14px;color:#d9e7f7;line-height:1.4;word-break:break-word}.cfw-ml-row-menu{background:none;border:none;color:#7f9cbc;font-size:18px;line-height:1;padding:4px 8px;cursor:pointer;margin-top:-2px;border-radius:4px;transition:color .15s,background .15s}.cfw-ml-row-menu:hover{color:#d9e7f7;background:#7cbbff1a}.cfw-desktop-menu{position:fixed;background:#0d1727;border:1px solid rgba(124,187,255,.28);border-radius:8px;padding:6px;display:flex;flex-direction:column;z-index:10000;box-shadow:0 4px 20px #0009;max-height:300px;overflow-y:auto}.cfw-desktop-menu button{background:none;border:none;color:#d9e7f7;padding:8px 12px;text-align:left;font-size:13px;cursor:pointer;border-radius:4px;white-space:nowrap;transition:color .15s,background .15s}.cfw-desktop-menu button:hover{background:#7cbbff26;color:#fff}#cfw-ml-error{margin:8px 14px 0}#cfw-mbs-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10001;display:none}#cfw-mbs-overlay.active{display:block}#cfw-mbs{position:fixed;bottom:0;left:0;right:0;z-index:10002;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 36px;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .25s ease}#cfw-mbs.active{transform:translateY(0)}#cfw-mbs-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px}.cfw-mf{display:flex;flex-direction:column;padding:14px}.cfw-compose-mode-toggle{display:flex;gap:8px;padding:14px 14px 0;flex-shrink:0}.cfw-compose-mode-btn{flex:1;height:36px;border-radius:999px;border:1px solid #2f4864;background:#0d1727;color:#9bb7d3;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-compose-mode-btn:hover:not(.active){border-color:#7cbbff66;color:#d9e7f7}.cfw-compose-mode-btn.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f2035}.cfw-mf input,.cfw-mf textarea,.cfw-mf select{width:100%;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;box-sizing:border-box;font-family:inherit}.cfw-mf input{height:44px;padding:0 14px;margin-bottom:10px;font-size:15px;flex-shrink:0}.cfw-textarea-wrap{margin-bottom:10px}.cfw-mf textarea{width:100%;height:130px;min-height:130px;max-height:40vh;padding:12px 14px;font-size:15px;resize:none;overflow-y:hidden;margin-bottom:0}.cfw-mf input::placeholder,.cfw-mf textarea::placeholder{color:#7f9cbc}.cfw-mf input:focus,.cfw-mf textarea:focus{outline:none;border-color:#4f7298}.cfw-mf-policy{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.cfw-mf-policy label{font-size:12px;color:#9bb7d3}.cfw-mf-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:8px;flex-shrink:0}.cfw-mf-error.active{display:block}.cfw-mf-actions{display:flex;gap:8px;flex-shrink:0}.cfw-mf-actions button{flex:1;height:48px;border-radius:8px;border:1px solid;font-size:14px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-mf-actions button:hover{filter:brightness(1.1)}.cfw-mf-actions button:active{transform:scale(.98)}.cfw-m-success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.cfw-m-success-ring{width:80px;height:80px;border-radius:50%;background:#4ade801f;border:2px solid rgba(74,222,128,.35);display:flex;align-items:center;justify-content:center;margin-bottom:18px}.cfw-m-success-ring svg{width:44px;height:44px;color:#4ade80}.cfw-m-success-hint{font-size:13px;color:#7f9cbc}.cfw-m-undo-btn{margin-top:14px;padding:7px 18px;border-radius:8px;border:1px solid rgba(124,187,255,.35);background:transparent;color:#d9e7f7;font-size:12px;cursor:pointer}.cfw-m-undo-btn:hover{background:#7cbbff14}.cfw-m-voice{display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:14px}.cfw-m-vstatus{border:1px solid #2f4864;border-radius:12px;padding:16px;background:#0b1828a6;flex-shrink:0}.cfw-m-vstatus-line{font-size:15px;color:#d9e7f7;margin-bottom:8px}.cfw-m-vmeta{display:flex;justify-content:space-between;font-size:13px;color:#9bb7d3}.cfw-m-vcontrols{display:flex;gap:10px;flex-shrink:0}.cfw-m-vcontrols button{flex:1;height:52px;border-radius:10px;border:1px solid;font-size:15px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-m-vcontrols .cfw-btn-record{background:#dc2626;border-color:#dc2626;color:#fff}.cfw-m-vcontrols .cfw-btn-record:hover:not(:disabled){background:#ef4444;border-color:#ef4444}.cfw-m-vcontrols .cfw-btn-record:active:not(:disabled){background:#b91d1d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send{background:#16a34a;border-color:#16a34a;color:#fff}.cfw-m-vcontrols .cfw-btn-send:hover:not(:disabled){background:#22c55e;border-color:#22c55e}.cfw-m-vcontrols .cfw-btn-send:active:not(:disabled){background:#15803d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send:disabled{background:#14532d;border-color:#14532d;color:#7f9cbc}.cfw-m-vcontrols .cfw-btn-reset{background:#d97706;border-color:#d97706;color:#fff}.cfw-m-vcontrols .cfw-btn-reset:hover:not(:disabled){background:#f59e0b;border-color:#f59e0b}.cfw-m-vcontrols .cfw-btn-reset:active:not(:disabled){background:#b45309;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-reset:disabled{background:#78350f;border-color:#78350f;color:#7f9cbc}.cfw-m-vhint{font-size:12px;color:#7f9cbc;flex-shrink:0}.cfw-m-verror{font-size:13px;color:#ff9a9a;display:none;flex-shrink:0}.cfw-m-verror.active{display:block}.cfw-m-settings{padding:20px 14px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}.cfw-m-settings h3{margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}.cfw-m-settings-btn{height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;width:100%;transition:border-color .15s,background .15s}.cfw-m-settings-btn:hover{border-color:#7cbbff80;background:#7cbbff14}.cfw-m-settings-btn:active{background:#0f1c2f}.cfw-m-settings-note{font-size:12px;color:#7f9cbc;margin:0}.cfw-m-settings-token{font-size:12px;color:#9bb7d3}.cfw-m-settings select{width:100%;height:44px;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;padding:0 12px;font-size:14px;font-family:inherit}.cfw-m-hand-toggle{display:flex;gap:8px}.cfw-m-hand-btn{flex:1;height:44px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#9bb7d3;font-size:14px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-m-hand-btn:hover:not(.active){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff0d}.cfw-m-hand-btn.active{border-color:#9ad2ff;background:#0f2035;color:#9ad2ff;font-weight:600}#cfw-swipe-hint{display:block;position:fixed;bottom:62px;font-size:11px;color:#9ad2ff;background:#0a111deb;border:1px solid rgba(124,187,255,.3);border-radius:6px;padding:4px 8px;pointer-events:none;opacity:0;transition:opacity .4s;white-space:nowrap;z-index:9999}#cfw-swipe-hint.visible{opacity:1}.cfw-fs-section{margin-bottom:18px}.cfw-fs-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:8px}.cfw-fs-pills{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:32px;padding:0 14px;font-size:12px;cursor:pointer}.cfw-fs-pill.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-fs-chips{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-chip{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:28px;padding:0 10px;font-size:11px;cursor:pointer}.cfw-fs-chip.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-num{font-size:11px;color:#7f9cbc;margin-bottom:6px;font-weight:500}.cfw-is-title{font-size:17px;color:#d9e7f7;margin-bottom:8px;word-break:break-word;text-decoration:none;display:block;line-height:1.3;font-weight:600}.cfw-is-title:hover{color:#9ad2ff;text-decoration:underline}.cfw-is-status{font-size:12px;color:#7cc4ff;margin-bottom:2px;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-is-section{margin-bottom:24px}.cfw-is-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:12px;font-weight:600}.cfw-is-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.cfw-badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#7cbbff26;border:1px solid rgba(124,187,255,.3);color:#9ad2ff;font-size:12px;font-weight:500}.cfw-is-primary-box{margin-bottom:24px}.cfw-is-action-row{display:flex;gap:8px}.cfw-is-w100{width:100%}.cfw-comments-section{border-top:1px solid rgba(124,187,255,.15);padding-top:20px}.cfw-comment{margin-bottom:16px;padding:12px;border-radius:8px;background:#7cbbff0a;border:1px solid rgba(124,187,255,.1)}.cfw-comment-newest{background:#7cbbff14;border-color:#7cbbff33}.cfw-comment-meta{font-size:12px;color:#7f9cbc;margin-bottom:6px}.cfw-comment-meta strong{color:#9bb7d3;font-weight:600}.cfw-comment-body{font-size:14px;color:#d9e7f7;line-height:1.5;white-space:pre-wrap;word-break:break-word}.cfw-comments-expand{width:100%;padding:8px;background:none;border:1px dashed rgba(124,187,255,.3);border-radius:6px;color:#9bb7d3;font-size:13px;cursor:pointer;margin-bottom:16px}.cfw-comments-expand:hover{background:#7cbbff0d;border-color:#7cbbff80;color:#d9e7f7}.cfw-is-actions{display:flex;flex-direction:column;gap:8px}.cfw-is-action-btn{width:100%;height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.4);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;text-align:left;padding:0 14px}.cfw-is-action-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-is-action-reason{font-size:11px;color:#7f9cbc;font-style:italic;display:block;padding:0 2px}.cfw-is-pr-link{color:#9ad2ff;text-decoration:underline;text-underline-offset:2px;font-size:13px}.cfw-is-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:10px}.cfw-is-error.active{display:block}.cfw-mbs-close{width:100%;height:48px;border-radius:8px;border:1px solid #2f4864;background:transparent;color:#9bb7d3;font-size:14px;cursor:pointer;margin-top:8px}@media(min-width:681px){#cfw-desktop-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9998;background:#02061773;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#cfw-mobile{top:0!important;bottom:0!important;width:420px;height:100%;border-radius:0;border:1px solid rgba(124,187,255,.28);box-shadow:0 0 40px #02070e8c;left:auto;right:0;border-left:1px solid rgba(124,187,255,.28);transition:none!important}#cfw-mobile.panel-left{left:0;right:auto;border-left:none;border-right:1px solid rgba(124,187,255,.28)}.cfw-panel-handle{display:none}#cfw-mobile-launcher{right:30px;bottom:10px}#cfw-mobile-launcher.panel-left{left:30px;right:auto}#cfw-mbs{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-mbs.panel-left{left:0;right:auto}#cfw-mbs-overlay{background:#0206174d}#cfw-swipe-hint{display:none!important}#cfw-compose-sheet{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-compose-sheet.panel-left{left:0;right:auto}#cfw-compose-overlay{background:#0206174d}}#cfw-compose-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10005;display:none}#cfw-compose-overlay.active{display:block}#cfw-compose-sheet{position:fixed;bottom:0;left:0;right:0;z-index:10006;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 24px;max-height:85vh;transform:translateY(100%);transition:transform .25s ease;display:flex;flex-direction:column}#cfw-compose-sheet.active{transform:translateY(0)}#cfw-compose-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px;flex-shrink:0}.cfw-compose-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}.cfw-compose-title{font-size:14px;font-weight:600;color:#d9e7f7}.cfw-compose-close{background:none;border:none;color:#7f9cbc;font-size:24px;cursor:pointer;line-height:1;padding:4px;margin:-4px}.cfw-compose-context{margin-bottom:16px;flex-shrink:0}.cfw-compose-context-quote{font-size:13px;color:#7f9cbc;border-left:2px solid #2f4864;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cfw-compose-body{flex:1;overflow-y:auto;display:flex;flex-direction:column}.cfw-m-swipe-settings{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}.cfw-m-swipe-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.cfw-m-swipe-row label{font-size:13px;color:#d9e7f7;font-weight:500;flex-shrink:0}.cfw-m-swipe-row .cfw-select{flex:1;min-width:120px;max-width:200px}.cfw-m-gesture-ref{background:#7cbbff0d;border-radius:8px;padding:12px;margin-top:16px;border:1px dashed rgba(124,187,255,.2)}.cfw-m-gesture-ref h4{font-size:11px;text-transform:uppercase;color:#7cc4ff;margin:0 0 8px;font-weight:600;padding:0}.cfw-m-gesture-row{display:flex;justify-content:space-between;font-size:12px;color:#9bb7d3;margin-bottom:4px}.cfw-m-gesture-row:last-child{margin-bottom:0}", Yf = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, Qf = /* @__PURE__ */ Yf(Wf, [["styles", [qf]]]);
export {
  Qf as F,
  Xf as c,
  Jf as d,
  Ae as u
};
