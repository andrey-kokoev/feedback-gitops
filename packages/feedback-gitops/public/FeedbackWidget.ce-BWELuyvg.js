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
const re = {}, Ct = [], We = () => {
}, Ti = () => !1, Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), bn = (e) => e.startsWith("onUpdate:"), pe = Object.assign, wn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, zo = Object.prototype.hasOwnProperty, se = (e, t) => zo.call(e, t), K = Array.isArray, Tt = (e) => ss(e) === "[object Map]", As = (e) => ss(e) === "[object Set]", Nn = (e) => ss(e) === "[object Date]", Y = (e) => typeof e == "function", he = (e) => typeof e == "string", Be = (e) => typeof e == "symbol", ie = (e) => e !== null && typeof e == "object", Ei = (e) => (ie(e) || Y(e)) && Y(e.then) && Y(e.catch), Ai = Object.prototype.toString, ss = (e) => Ai.call(e), Uo = (e) => ss(e).slice(8, -1), Ps = (e) => ss(e) === "[object Object]", $s = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ut = /* @__PURE__ */ gn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ko = /-\w/g, De = Is(
  (e) => e.replace(Ko, (t) => t.slice(1).toUpperCase())
), Wo = /\B([A-Z])/g, Pe = Is(
  (e) => e.replace(Wo, "-$1").toLowerCase()
), Pi = Is((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ws = Is(
  (e) => e ? `on${Pi(e)}` : ""
), at = (e, t) => !Object.is(e, t), ds = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, $i = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Ms = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Vn = (e) => {
  const t = he(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Hn;
const Os = () => Hn || (Hn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function $t(e) {
  if (K(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], i = he(n) ? Jo(n) : $t(n);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (he(e) || ie(e))
    return e;
}
const Bo = /;(?![^(]*\))/g, qo = /:([^]+)/, Yo = /\/\*[^]*?\*\//g;
function Jo(e) {
  const t = {};
  return e.replace(Yo, "").split(Bo).forEach((s) => {
    if (s) {
      const n = s.split(qo);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function Q(e) {
  let t = "";
  if (he(e))
    t = e;
  else if (K(e))
    for (let s = 0; s < e.length; s++) {
      const n = Q(e[s]);
      n && (t += n + " ");
    }
  else if (ie(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Go = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xo = /* @__PURE__ */ gn(Go);
function Ii(e) {
  return !!e || e === "";
}
function Qo(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = ns(e[n], t[n]);
  return s;
}
function ns(e, t) {
  if (e === t) return !0;
  let s = Nn(e), n = Nn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Be(e), n = Be(t), s || n)
    return e === t;
  if (s = K(e), n = K(t), s || n)
    return s && n ? Qo(e, t) : !1;
  if (s = ie(e), n = ie(t), s || n) {
    if (!s || !n)
      return !1;
    const i = Object.keys(e).length, o = Object.keys(t).length;
    if (i !== o)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), c = t.hasOwnProperty(r);
      if (l && !c || !l && c || !ns(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Zo(e, t) {
  return e.findIndex((s) => ns(s, t));
}
const Mi = (e) => !!(e && e.__v_isRef === !0), V = (e) => he(e) ? e : e == null ? "" : K(e) || ie(e) && (e.toString === Ai || !Y(e.toString)) ? Mi(e) ? V(e.value) : JSON.stringify(e, Oi, 2) : String(e), Oi = (e, t) => Mi(t) ? Oi(e, t.value) : Tt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, i], o) => (s[Bs(n, o) + " =>"] = i, s),
    {}
  )
} : As(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Bs(s))
} : Be(t) ? Bs(t) : ie(t) && !K(t) && !Ps(t) ? String(t) : t, Bs = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Be(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
  );
};
/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let be;
class Ri {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.__v_skip = !0, this.parent = be, !t && be && (this.index = (be.scopes || (be.scopes = [])).push(
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
      const s = be;
      try {
        return be = this, t();
      } finally {
        be = s;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = be, be = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (be = this.prevScope, this.prevScope = void 0);
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
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Di(e) {
  return new Ri(e);
}
function ji() {
  return be;
}
function er(e, t = !1) {
  be && be.cleanups.push(e);
}
let fe;
const qs = /* @__PURE__ */ new WeakSet();
class Li {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, be && be.active && be.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, qs.has(this) && (qs.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Ni(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, zn(this), Vi(this);
    const t = fe, s = je;
    fe = this, je = !0;
    try {
      return this.fn();
    } finally {
      Hi(this), fe = t, je = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        yn(t);
      this.deps = this.depsTail = void 0, zn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? qs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    nn(this) && this.run();
  }
  get dirty() {
    return nn(this);
  }
}
let Fi = 0, Kt, Wt;
function Ni(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Wt, Wt = e;
    return;
  }
  e.next = Kt, Kt = e;
}
function vn() {
  Fi++;
}
function xn() {
  if (--Fi > 0)
    return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Kt; ) {
    let t = Kt;
    for (Kt = void 0; t; ) {
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
function Vi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Hi(e) {
  let t, s = e.depsTail, n = s;
  for (; n; ) {
    const i = n.prevDep;
    n.version === -1 ? (n === s && (s = i), yn(n), tr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = i;
  }
  e.deps = t, e.depsTail = s;
}
function nn(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (zi(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function zi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Xt) || (e.globalVersion = Xt, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !nn(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = fe, n = je;
  fe = e, je = !0;
  try {
    Vi(e);
    const i = e.fn(e._value);
    (t.version === 0 || at(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    fe = s, je = n, Hi(e), e.flags &= -3;
  }
}
function yn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: i } = e;
  if (n && (n.nextSub = i, e.prevSub = void 0), i && (i.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let o = s.computed.deps; o; o = o.nextDep)
      yn(o, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function tr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let je = !0;
const Ui = [];
function tt() {
  Ui.push(je), je = !1;
}
function st() {
  const e = Ui.pop();
  je = e === void 0 ? !0 : e;
}
function zn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = fe;
    fe = void 0;
    try {
      t();
    } finally {
      fe = s;
    }
  }
}
let Xt = 0;
class sr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class _n {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!fe || !je || fe === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== fe)
      s = this.activeLink = new sr(fe, this), fe.deps ? (s.prevDep = fe.depsTail, fe.depsTail.nextDep = s, fe.depsTail = s) : fe.deps = fe.depsTail = s, Ki(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = fe.depsTail, s.nextDep = void 0, fe.depsTail.nextDep = s, fe.depsTail = s, fe.deps === s && (fe.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, Xt++, this.notify(t);
  }
  notify(t) {
    vn();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      xn();
    }
  }
}
function Ki(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep)
        Ki(n);
    }
    const s = e.dep.subs;
    s !== e && (e.prevSub = s, s && (s.nextSub = e)), e.dep.subs = e;
  }
}
const ms = /* @__PURE__ */ new WeakMap(), wt = /* @__PURE__ */ Symbol(
  ""
), on = /* @__PURE__ */ Symbol(
  ""
), Qt = /* @__PURE__ */ Symbol(
  ""
);
function we(e, t, s) {
  if (je && fe) {
    let n = ms.get(e);
    n || ms.set(e, n = /* @__PURE__ */ new Map());
    let i = n.get(s);
    i || (n.set(s, i = new _n()), i.map = n, i.key = s), i.track();
  }
}
function Qe(e, t, s, n, i, o) {
  const r = ms.get(e);
  if (!r) {
    Xt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (vn(), t === "clear")
    r.forEach(l);
  else {
    const c = K(e), d = c && $s(s);
    if (c && s === "length") {
      const f = Number(n);
      r.forEach((p, v) => {
        (v === "length" || v === Qt || !Be(v) && v >= f) && l(p);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), d && l(r.get(Qt)), t) {
        case "add":
          c ? d && l(r.get("length")) : (l(r.get(wt)), Tt(e) && l(r.get(on)));
          break;
        case "delete":
          c || (l(r.get(wt)), Tt(e) && l(r.get(on)));
          break;
        case "set":
          Tt(e) && l(r.get(wt));
          break;
      }
  }
  xn();
}
function nr(e, t) {
  const s = ms.get(e);
  return s && s.get(t);
}
function _t(e) {
  const t = /* @__PURE__ */ Z(e);
  return t === e ? t : (we(t, "iterate", Qt), /* @__PURE__ */ Ie(e) ? t : t.map(Le));
}
function Rs(e) {
  return we(e = /* @__PURE__ */ Z(e), "iterate", Qt), e;
}
function ct(e, t) {
  return /* @__PURE__ */ nt(e) ? It(/* @__PURE__ */ et(e) ? Le(t) : t) : Le(t);
}
const ir = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ys(this, Symbol.iterator, (e) => ct(this, e));
  },
  concat(...e) {
    return _t(this).concat(
      ...e.map((t) => K(t) ? _t(t) : t)
    );
  },
  entries() {
    return Ys(this, "entries", (e) => (e[1] = ct(this, e[1]), e));
  },
  every(e, t) {
    return Je(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Je(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => ct(this, n)),
      arguments
    );
  },
  find(e, t) {
    return Je(
      this,
      "find",
      e,
      t,
      (s) => ct(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return Je(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Je(
      this,
      "findLast",
      e,
      t,
      (s) => ct(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return Je(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Je(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Js(this, "includes", e);
  },
  indexOf(...e) {
    return Js(this, "indexOf", e);
  },
  join(e) {
    return _t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Js(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Je(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Nt(this, "pop");
  },
  push(...e) {
    return Nt(this, "push", e);
  },
  reduce(e, ...t) {
    return Un(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Un(this, "reduceRight", e, t);
  },
  shift() {
    return Nt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Je(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Nt(this, "splice", e);
  },
  toReversed() {
    return _t(this).toReversed();
  },
  toSorted(e) {
    return _t(this).toSorted(e);
  },
  toSpliced(...e) {
    return _t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Nt(this, "unshift", e);
  },
  values() {
    return Ys(this, "values", (e) => ct(this, e));
  }
};
function Ys(e, t, s) {
  const n = Rs(e), i = n[t]();
  return n !== e && !/* @__PURE__ */ Ie(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = s(o.value)), o;
  }), i;
}
const or = Array.prototype;
function Je(e, t, s, n, i, o) {
  const r = Rs(e), l = r !== e && !/* @__PURE__ */ Ie(e), c = r[t];
  if (c !== or[t]) {
    const p = c.apply(e, o);
    return l ? Le(p) : p;
  }
  let d = s;
  r !== e && (l ? d = function(p, v) {
    return s.call(this, ct(e, p), v, e);
  } : s.length > 2 && (d = function(p, v) {
    return s.call(this, p, v, e);
  }));
  const f = c.call(r, d, n);
  return l && i ? i(f) : f;
}
function Un(e, t, s, n) {
  const i = Rs(e);
  let o = s;
  return i !== e && (/* @__PURE__ */ Ie(e) ? s.length > 3 && (o = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : o = function(r, l, c) {
    return s.call(this, r, ct(e, l), c, e);
  }), i[t](o, ...n);
}
function Js(e, t, s) {
  const n = /* @__PURE__ */ Z(e);
  we(n, "iterate", Qt);
  const i = n[t](...s);
  return (i === -1 || i === !1) && /* @__PURE__ */ js(s[0]) ? (s[0] = /* @__PURE__ */ Z(s[0]), n[t](...s)) : i;
}
function Nt(e, t, s = []) {
  tt(), vn();
  const n = (/* @__PURE__ */ Z(e))[t].apply(e, s);
  return xn(), st(), n;
}
const rr = /* @__PURE__ */ gn("__proto__,__v_isRef,__isVue"), Wi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Be)
);
function lr(e) {
  Be(e) || (e = String(e));
  const t = /* @__PURE__ */ Z(this);
  return we(t, "has", e), t.hasOwnProperty(e);
}
class Bi {
  constructor(t = !1, s = !1) {
    this._isReadonly = t, this._isShallow = s;
  }
  get(t, s, n) {
    if (s === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (s === "__v_isReactive")
      return !i;
    if (s === "__v_isReadonly")
      return i;
    if (s === "__v_isShallow")
      return o;
    if (s === "__v_raw")
      return n === (i ? o ? br : Gi : o ? Ji : Yi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = K(t);
    if (!i) {
      let c;
      if (r && (c = ir[s]))
        return c;
      if (s === "hasOwnProperty")
        return lr;
    }
    const l = Reflect.get(
      t,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ de(t) ? t : n
    );
    if ((Be(s) ? Wi.has(s) : rr(s)) || (i || we(t, "get", s), o))
      return l;
    if (/* @__PURE__ */ de(l)) {
      const c = r && $s(s) ? l : l.value;
      return i && ie(c) ? /* @__PURE__ */ ln(c) : c;
    }
    return ie(l) ? i ? /* @__PURE__ */ ln(l) : /* @__PURE__ */ Ds(l) : l;
  }
}
class qi extends Bi {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, i) {
    let o = t[s];
    const r = K(t) && $s(s);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ nt(o);
      if (!/* @__PURE__ */ Ie(n) && !/* @__PURE__ */ nt(n) && (o = /* @__PURE__ */ Z(o), n = /* @__PURE__ */ Z(n)), !r && /* @__PURE__ */ de(o) && !/* @__PURE__ */ de(n))
        return d || (o.value = n), !0;
    }
    const l = r ? Number(s) < t.length : se(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ de(t) ? t : i
    );
    return t === /* @__PURE__ */ Z(i) && (l ? at(n, o) && Qe(t, "set", s, n) : Qe(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = se(t, s);
    t[s];
    const i = Reflect.deleteProperty(t, s);
    return i && n && Qe(t, "delete", s, void 0), i;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Be(s) || !Wi.has(s)) && we(t, "has", s), n;
  }
  ownKeys(t) {
    return we(
      t,
      "iterate",
      K(t) ? "length" : wt
    ), Reflect.ownKeys(t);
  }
}
class cr extends Bi {
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
const fr = /* @__PURE__ */ new qi(), ar = /* @__PURE__ */ new cr(), ur = /* @__PURE__ */ new qi(!0);
const rn = (e) => e, cs = (e) => Reflect.getPrototypeOf(e);
function dr(e, t, s) {
  return function(...n) {
    const i = this.__v_raw, o = /* @__PURE__ */ Z(i), r = Tt(o), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, d = i[e](...n), f = s ? rn : t ? It : Le;
    return !t && we(
      o,
      "iterate",
      c ? on : wt
    ), pe(
      // inheriting all iterator properties
      Object.create(d),
      {
        // iterator protocol
        next() {
          const { value: p, done: v } = d.next();
          return v ? { value: p, done: v } : {
            value: l ? [f(p[0]), f(p[1])] : f(p),
            done: v
          };
        }
      }
    );
  };
}
function fs(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function pr(e, t) {
  const s = {
    get(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ Z(o), l = /* @__PURE__ */ Z(i);
      e || (at(i, l) && we(r, "get", i), we(r, "get", l));
      const { has: c } = cs(r), d = t ? rn : e ? It : Le;
      if (c.call(r, i))
        return d(o.get(i));
      if (c.call(r, l))
        return d(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && we(/* @__PURE__ */ Z(i), "iterate", wt), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ Z(o), l = /* @__PURE__ */ Z(i);
      return e || (at(i, l) && we(r, "has", i), we(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ Z(l), d = t ? rn : e ? It : Le;
      return !e && we(c, "iterate", wt), l.forEach((f, p) => i.call(o, d(f), d(p), r));
    }
  };
  return pe(
    s,
    e ? {
      add: fs("add"),
      set: fs("set"),
      delete: fs("delete"),
      clear: fs("clear")
    } : {
      add(i) {
        !t && !/* @__PURE__ */ Ie(i) && !/* @__PURE__ */ nt(i) && (i = /* @__PURE__ */ Z(i));
        const o = /* @__PURE__ */ Z(this);
        return cs(o).has.call(o, i) || (o.add(i), Qe(o, "add", i, i)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ Ie(o) && !/* @__PURE__ */ nt(o) && (o = /* @__PURE__ */ Z(o));
        const r = /* @__PURE__ */ Z(this), { has: l, get: c } = cs(r);
        let d = l.call(r, i);
        d || (i = /* @__PURE__ */ Z(i), d = l.call(r, i));
        const f = c.call(r, i);
        return r.set(i, o), d ? at(o, f) && Qe(r, "set", i, o) : Qe(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ Z(this), { has: r, get: l } = cs(o);
        let c = r.call(o, i);
        c || (i = /* @__PURE__ */ Z(i), c = r.call(o, i)), l && l.call(o, i);
        const d = o.delete(i);
        return c && Qe(o, "delete", i, void 0), d;
      },
      clear() {
        const i = /* @__PURE__ */ Z(this), o = i.size !== 0, r = i.clear();
        return o && Qe(
          i,
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
  ].forEach((i) => {
    s[i] = dr(i, e, t);
  }), s;
}
function Sn(e, t) {
  const s = pr(e, t);
  return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(
    se(s, i) && i in n ? s : n,
    i,
    o
  );
}
const hr = {
  get: /* @__PURE__ */ Sn(!1, !1)
}, mr = {
  get: /* @__PURE__ */ Sn(!1, !0)
}, gr = {
  get: /* @__PURE__ */ Sn(!0, !1)
};
const Yi = /* @__PURE__ */ new WeakMap(), Ji = /* @__PURE__ */ new WeakMap(), Gi = /* @__PURE__ */ new WeakMap(), br = /* @__PURE__ */ new WeakMap();
function wr(e) {
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
function vr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : wr(Uo(e));
}
// @__NO_SIDE_EFFECTS__
function Ds(e) {
  return /* @__PURE__ */ nt(e) ? e : kn(
    e,
    !1,
    fr,
    hr,
    Yi
  );
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
  return kn(
    e,
    !1,
    ur,
    mr,
    Ji
  );
}
// @__NO_SIDE_EFFECTS__
function ln(e) {
  return kn(
    e,
    !0,
    ar,
    gr,
    Gi
  );
}
function kn(e, t, s, n, i) {
  if (!ie(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = vr(e);
  if (o === 0)
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const l = new Proxy(
    e,
    o === 2 ? n : s
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return /* @__PURE__ */ nt(e) ? /* @__PURE__ */ et(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function nt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ie(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function Z(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ Z(t) : e;
}
function Cn(e) {
  return !se(e, "__v_skip") && Object.isExtensible(e) && $i(e, "__v_skip", !0), e;
}
const Le = (e) => ie(e) ? /* @__PURE__ */ Ds(e) : e, It = (e) => ie(e) ? /* @__PURE__ */ ln(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function U(e) {
  return yr(e, !1);
}
function yr(e, t) {
  return /* @__PURE__ */ de(e) ? e : new _r(e, t);
}
class _r {
  constructor(t, s) {
    this.dep = new _n(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ Z(t), this._value = s ? t : Le(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ie(t) || /* @__PURE__ */ nt(t);
    t = n ? t : /* @__PURE__ */ Z(t), at(t, s) && (this._rawValue = t, this._value = n ? t : Le(t), this.dep.trigger());
  }
}
function w(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const Sr = {
  get: (e, t, s) => t === "__v_raw" ? e : w(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const i = e[t];
    return /* @__PURE__ */ de(i) && !/* @__PURE__ */ de(s) ? (i.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function Xi(e) {
  return /* @__PURE__ */ et(e) ? e : new Proxy(e, Sr);
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
  const t = K(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = Tr(e, s);
  return t;
}
class Cr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ Z(t);
    let i = !0, o = t;
    if (!K(t) || !$s(String(s)))
      do
        i = !/* @__PURE__ */ js(o) || /* @__PURE__ */ Ie(o);
      while (i && (o = o.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = w(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ de(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ de(s)) {
        s.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return nr(this._raw, this._key);
  }
}
function Tr(e, t, s) {
  return new Cr(e, t, s);
}
class Er {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new _n(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Xt - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    fe !== this)
      return Ni(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return zi(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function Ar(e, t, s = !1) {
  let n, i;
  return Y(e) ? n = e : (n = e.get, i = e.set), new Er(n, i, s);
}
const as = {}, gs = /* @__PURE__ */ new WeakMap();
let gt;
function Pr(e, t = !1, s = gt) {
  if (s) {
    let n = gs.get(s);
    n || gs.set(s, n = []), n.push(e);
  }
}
function $r(e, t, s = re) {
  const { immediate: n, deep: i, once: o, scheduler: r, augmentJob: l, call: c } = s, d = (P) => i ? P : /* @__PURE__ */ Ie(P) || i === !1 || i === 0 ? Ze(P, 1) : Ze(P);
  let f, p, v, T, m = !1, b = !1;
  if (/* @__PURE__ */ de(e) ? (p = () => e.value, m = /* @__PURE__ */ Ie(e)) : /* @__PURE__ */ et(e) ? (p = () => d(e), m = !0) : K(e) ? (b = !0, m = e.some((P) => /* @__PURE__ */ et(P) || /* @__PURE__ */ Ie(P)), p = () => e.map((P) => {
    if (/* @__PURE__ */ de(P))
      return P.value;
    if (/* @__PURE__ */ et(P))
      return d(P);
    if (Y(P))
      return c ? c(P, 2) : P();
  })) : Y(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (v) {
      tt();
      try {
        v();
      } finally {
        st();
      }
    }
    const P = gt;
    gt = f;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      gt = P;
    }
  } : p = We, t && i) {
    const P = p, W = i === !0 ? 1 / 0 : i;
    p = () => Ze(P(), W);
  }
  const q = ji(), G = () => {
    f.stop(), q && q.active && wn(q.effects, f);
  };
  if (o && t) {
    const P = t;
    t = (...W) => {
      P(...W), G();
    };
  }
  let R = b ? new Array(e.length).fill(as) : as;
  const L = (P) => {
    if (!(!(f.flags & 1) || !f.dirty && !P))
      if (t) {
        const W = f.run();
        if (i || m || (b ? W.some((ge, ue) => at(ge, R[ue])) : at(W, R))) {
          v && v();
          const ge = gt;
          gt = f;
          try {
            const ue = [
              W,
              // pass undefined as the old value when it's changed for the first time
              R === as ? void 0 : b && R[0] === as ? [] : R,
              T
            ];
            R = W, c ? c(t, 3, ue) : (
              // @ts-expect-error
              t(...ue)
            );
          } finally {
            gt = ge;
          }
        }
      } else
        f.run();
  };
  return l && l(L), f = new Li(p), f.scheduler = r ? () => r(L, !1) : L, T = (P) => Pr(P, !1, f), v = f.onStop = () => {
    const P = gs.get(f);
    if (P) {
      if (c)
        c(P, 4);
      else
        for (const W of P) W();
      gs.delete(f);
    }
  }, t ? n ? L(!0) : R = f.run() : r ? r(L.bind(null, !0), !0) : f.run(), G.pause = f.pause.bind(f), G.resume = f.resume.bind(f), G.stop = G, G;
}
function Ze(e, t = 1 / 0, s) {
  if (t <= 0 || !ie(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ de(e))
    Ze(e.value, t, s);
  else if (K(e))
    for (let n = 0; n < e.length; n++)
      Ze(e[n], t, s);
  else if (As(e) || Tt(e))
    e.forEach((n) => {
      Ze(n, t, s);
    });
  else if (Ps(e)) {
    for (const n in e)
      Ze(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && Ze(e[n], t, s);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function is(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (i) {
    Ls(i, t, s);
  }
}
function qe(e, t, s, n) {
  if (Y(e)) {
    const i = is(e, t, s, n);
    return i && Ei(i) && i.catch((o) => {
      Ls(o, t, s);
    }), i;
  }
  if (K(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(qe(e[o], t, s, n));
    return i;
  }
}
function Ls(e, t, s, n = !0) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: r } = t && t.appContext.config || re;
  if (t) {
    let l = t.parent;
    const c = t.proxy, d = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, c, d) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      tt(), is(o, null, 10, [
        e,
        c,
        d
      ]), st();
      return;
    }
  }
  Ir(e, s, i, n, r);
}
function Ir(e, t, s, n = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const ye = [];
let Ue = -1;
const Et = [];
let ft = null, kt = 0;
const Qi = /* @__PURE__ */ Promise.resolve();
let bs = null;
function Dt(e) {
  const t = bs || Qi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Mr(e) {
  let t = Ue + 1, s = ye.length;
  for (; t < s; ) {
    const n = t + s >>> 1, i = ye[n], o = Zt(i);
    o < e || o === e && i.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Tn(e) {
  if (!(e.flags & 1)) {
    const t = Zt(e), s = ye[ye.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Zt(s) ? ye.push(e) : ye.splice(Mr(t), 0, e), e.flags |= 1, Zi();
  }
}
function Zi() {
  bs || (bs = Qi.then(to));
}
function Or(e) {
  K(e) ? Et.push(...e) : ft && e.id === -1 ? ft.splice(kt + 1, 0, e) : e.flags & 1 || (Et.push(e), e.flags |= 1), Zi();
}
function Kn(e, t, s = Ue + 1) {
  for (; s < ye.length; s++) {
    const n = ye[s];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid)
        continue;
      ye.splice(s, 1), s--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function eo(e) {
  if (Et.length) {
    const t = [...new Set(Et)].sort(
      (s, n) => Zt(s) - Zt(n)
    );
    if (Et.length = 0, ft) {
      ft.push(...t);
      return;
    }
    for (ft = t, kt = 0; kt < ft.length; kt++) {
      const s = ft[kt];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    ft = null, kt = 0;
  }
}
const Zt = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function to(e) {
  try {
    for (Ue = 0; Ue < ye.length; Ue++) {
      const t = ye[Ue];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), is(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ue < ye.length; Ue++) {
      const t = ye[Ue];
      t && (t.flags &= -2);
    }
    Ue = -1, ye.length = 0, eo(), bs = null, (ye.length || Et.length) && to();
  }
}
let Me = null, so = null;
function ws(e) {
  const t = Me;
  return Me = e, so = e && e.type.__scopeId || null, t;
}
function Rr(e, t = Me, s) {
  if (!t || e._n)
    return e;
  const n = (...i) => {
    n._d && ti(-1);
    const o = ws(t);
    let r;
    try {
      r = e(...i);
    } finally {
      ws(o), n._d && ti(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Re(e, t) {
  if (Me === null)
    return e;
  const s = zs(Me), n = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, r, l, c = re] = t[i];
    o && (Y(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && Ze(r), n.push({
      dir: o,
      instance: s,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function ht(e, t, s, n) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let c = l.dir[n];
    c && (tt(), qe(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), st());
  }
}
function Dr(e, t) {
  if (Se) {
    let s = Se.provides;
    const n = Se.parent && Se.parent.provides;
    n === s && (s = Se.provides = Object.create(n)), s[e] = t;
  }
}
function vt(e, t, s = !1) {
  const n = Po();
  if (n || xt) {
    let i = xt ? xt._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return s && Y(t) ? t.call(n && n.proxy) : t;
  }
}
function jr() {
  return !!(Po() || xt);
}
const Lr = /* @__PURE__ */ Symbol.for("v-scx"), Fr = () => vt(Lr);
function At(e, t, s) {
  return no(e, t, s);
}
function no(e, t, s = re) {
  const { immediate: n, deep: i, flush: o, once: r } = s, l = pe({}, s), c = t && n || !t && o !== "post";
  let d;
  if (ts) {
    if (o === "sync") {
      const T = Fr();
      d = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = We, T.resume = We, T.pause = We, T;
    }
  }
  const f = Se;
  l.call = (T, m, b) => qe(T, f, m, b);
  let p = !1;
  o === "post" ? l.scheduler = (T) => {
    Te(T, f && f.suspense);
  } : o !== "sync" && (p = !0, l.scheduler = (T, m) => {
    m ? T() : Tn(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, f && (T.id = f.uid, T.i = f));
  };
  const v = $r(e, t, l);
  return ts && (d ? d.push(v) : c && v()), v;
}
function Nr(e, t, s) {
  const n = this.proxy, i = he(e) ? e.includes(".") ? io(n, e) : () => n[e] : e.bind(n, n);
  let o;
  Y(t) ? o = t : (o = t.handler, s = t);
  const r = os(this), l = no(i, o.bind(n), s);
  return r(), l;
}
function io(e, t) {
  const s = t.split(".");
  return () => {
    let n = e;
    for (let i = 0; i < s.length && n; i++)
      n = n[s[i]];
    return n;
  };
}
const Vr = /* @__PURE__ */ Symbol("_vte"), Hr = (e) => e.__isTeleport, zr = /* @__PURE__ */ Symbol("_leaveCb");
function En(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, En(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function it(e, t) {
  return Y(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    pe({ name: e.name }, t, { setup: e })
  ) : e;
}
function oo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Wn(e, t) {
  let s;
  return !!((s = Object.getOwnPropertyDescriptor(e, t)) && !s.configurable);
}
const vs = /* @__PURE__ */ new WeakMap();
function Bt(e, t, s, n, i = !1) {
  if (K(e)) {
    e.forEach(
      (b, q) => Bt(
        b,
        t && (K(t) ? t[q] : t),
        s,
        n,
        i
      )
    );
    return;
  }
  if (qt(n) && !i) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Bt(e, t, s, n.component.subTree);
    return;
  }
  const o = n.shapeFlag & 4 ? zs(n.component) : n.el, r = i ? null : o, { i: l, r: c } = e, d = t && t.r, f = l.refs === re ? l.refs = {} : l.refs, p = l.setupState, v = /* @__PURE__ */ Z(p), T = p === re ? Ti : (b) => Wn(f, b) ? !1 : se(v, b), m = (b, q) => !(q && Wn(f, q));
  if (d != null && d !== c) {
    if (Bn(t), he(d))
      f[d] = null, T(d) && (p[d] = null);
    else if (/* @__PURE__ */ de(d)) {
      const b = t;
      m(d, b.k) && (d.value = null), b.k && (f[b.k] = null);
    }
  }
  if (Y(c))
    is(c, l, 12, [r, f]);
  else {
    const b = he(c), q = /* @__PURE__ */ de(c);
    if (b || q) {
      const G = () => {
        if (e.f) {
          const R = b ? T(c) ? p[c] : f[c] : m() || !e.k ? c.value : f[e.k];
          if (i)
            K(R) && wn(R, o);
          else if (K(R))
            R.includes(o) || R.push(o);
          else if (b)
            f[c] = [o], T(c) && (p[c] = f[c]);
          else {
            const L = [o];
            m(c, e.k) && (c.value = L), e.k && (f[e.k] = L);
          }
        } else b ? (f[c] = r, T(c) && (p[c] = r)) : q && (m(c, e.k) && (c.value = r), e.k && (f[e.k] = r));
      };
      if (r) {
        const R = () => {
          G(), vs.delete(e);
        };
        R.id = -1, vs.set(e, R), Te(R, s);
      } else
        Bn(e), G();
    }
  }
}
function Bn(e) {
  const t = vs.get(e);
  t && (t.flags |= 8, vs.delete(e));
}
Os().requestIdleCallback;
Os().cancelIdleCallback;
const qt = (e) => !!e.type.__asyncLoader, ro = (e) => e.type.__isKeepAlive;
function Ur(e, t) {
  lo(e, "a", t);
}
function Kr(e, t) {
  lo(e, "da", t);
}
function lo(e, t, s = Se) {
  const n = e.__wdc || (e.__wdc = () => {
    let i = s;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (Fs(t, n, s), s) {
    let i = s.parent;
    for (; i && i.parent; )
      ro(i.parent.vnode) && Wr(n, t, s, i), i = i.parent;
  }
}
function Wr(e, t, s, n) {
  const i = Fs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  An(() => {
    wn(n[t], i);
  }, s);
}
function Fs(e, t, s = Se, n = !1) {
  if (s) {
    const i = s[e] || (s[e] = []), o = t.__weh || (t.__weh = (...r) => {
      tt();
      const l = os(s), c = qe(t, s, e, r);
      return l(), st(), c;
    });
    return n ? i.unshift(o) : i.push(o), o;
  }
}
const ot = (e) => (t, s = Se) => {
  (!ts || e === "sp") && Fs(e, (...n) => t(...n), s);
}, Br = ot("bm"), Ns = ot("m"), qr = ot(
  "bu"
), Yr = ot("u"), Jr = ot(
  "bum"
), An = ot("um"), Gr = ot(
  "sp"
), Xr = ot("rtg"), Qr = ot("rtc");
function Zr(e, t = Se) {
  Fs("ec", e, t);
}
const el = /* @__PURE__ */ Symbol.for("v-ndc");
function Ee(e, t, s, n) {
  let i;
  const o = s, r = K(e);
  if (r || he(e)) {
    const l = r && /* @__PURE__ */ et(e);
    let c = !1, d = !1;
    l && (c = !/* @__PURE__ */ Ie(e), d = /* @__PURE__ */ nt(e), e = Rs(e)), i = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      i[f] = t(
        c ? d ? It(Le(e[f])) : Le(e[f]) : e[f],
        f,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, o);
  } else if (ie(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, c) => t(l, c, void 0, o)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let c = 0, d = l.length; c < d; c++) {
        const f = l[c];
        i[c] = t(e[f], f, c, o);
      }
    }
  else
    i = [];
  return i;
}
const cn = (e) => e ? $o(e) ? zs(e) : cn(e.parent) : null, Yt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ pe(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => cn(e.parent),
    $root: (e) => cn(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Tn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Dt.bind(e.proxy)),
    $watch: (e) => Nr.bind(e)
  })
), Gs = (e, t) => e !== re && !e.__isScriptSetup && se(e, t), tl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: i, props: o, accessCache: r, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const v = r[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return n[t];
          case 2:
            return i[t];
          case 4:
            return s[t];
          case 3:
            return o[t];
        }
      else {
        if (Gs(n, t))
          return r[t] = 1, n[t];
        if (i !== re && se(i, t))
          return r[t] = 2, i[t];
        if (se(o, t))
          return r[t] = 3, o[t];
        if (s !== re && se(s, t))
          return r[t] = 4, s[t];
        fn && (r[t] = 0);
      }
    }
    const d = Yt[t];
    let f, p;
    if (d)
      return t === "$attrs" && we(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== re && se(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      p = c.config.globalProperties, se(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: i, ctx: o } = e;
    return Gs(i, t) ? (i[t] = s, !0) : n !== re && se(n, t) ? (n[t] = s, !0) : se(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: i, props: o, type: r }
  }, l) {
    let c;
    return !!(s[l] || e !== re && l[0] !== "$" && se(e, l) || Gs(t, l) || se(o, l) || se(n, l) || se(Yt, l) || se(i.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : se(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function qn(e) {
  return K(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let fn = !0;
function sl(e) {
  const t = fo(e), s = e.proxy, n = e.ctx;
  fn = !1, t.beforeCreate && Yn(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: c,
    inject: d,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: v,
    beforeUpdate: T,
    updated: m,
    activated: b,
    deactivated: q,
    beforeDestroy: G,
    beforeUnmount: R,
    destroyed: L,
    unmounted: P,
    render: W,
    renderTracked: ge,
    renderTriggered: ue,
    errorCaptured: F,
    serverPrefetch: E,
    // public API
    expose: C,
    inheritAttrs: le,
    // assets
    components: me,
    directives: N,
    filters: ve
  } = t;
  if (d && nl(d, n, null), r)
    for (const I in r) {
      const te = r[I];
      Y(te) && (n[I] = te.bind(s));
    }
  if (i) {
    const I = i.call(s, s);
    ie(I) && (e.data = /* @__PURE__ */ Ds(I));
  }
  if (fn = !0, o)
    for (const I in o) {
      const te = o[I], Ye = Y(te) ? te.bind(s, s) : Y(te.get) ? te.get.bind(s, s) : We, rs = !Y(te) && Y(te.set) ? te.set.bind(s) : We, pt = ae({
        get: Ye,
        set: rs
      });
      Object.defineProperty(n, I, {
        enumerable: !0,
        configurable: !0,
        get: () => pt.value,
        set: (Fe) => pt.value = Fe
      });
    }
  if (l)
    for (const I in l)
      co(l[I], n, s, I);
  if (c) {
    const I = Y(c) ? c.call(s) : c;
    Reflect.ownKeys(I).forEach((te) => {
      Dr(te, I[te]);
    });
  }
  f && Yn(f, e, "c");
  function y(I, te) {
    K(te) ? te.forEach((Ye) => I(Ye.bind(s))) : te && I(te.bind(s));
  }
  if (y(Br, p), y(Ns, v), y(qr, T), y(Yr, m), y(Ur, b), y(Kr, q), y(Zr, F), y(Qr, ge), y(Xr, ue), y(Jr, R), y(An, P), y(Gr, E), K(C))
    if (C.length) {
      const I = e.exposed || (e.exposed = {});
      C.forEach((te) => {
        Object.defineProperty(I, te, {
          get: () => s[te],
          set: (Ye) => s[te] = Ye,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  W && e.render === We && (e.render = W), le != null && (e.inheritAttrs = le), me && (e.components = me), N && (e.directives = N), E && oo(e);
}
function nl(e, t, s = We) {
  K(e) && (e = an(e));
  for (const n in e) {
    const i = e[n];
    let o;
    ie(i) ? "default" in i ? o = vt(
      i.from || n,
      i.default,
      !0
    ) : o = vt(i.from || n) : o = vt(i), /* @__PURE__ */ de(o) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[n] = o;
  }
}
function Yn(e, t, s) {
  qe(
    K(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function co(e, t, s, n) {
  let i = n.includes(".") ? io(s, n) : () => s[n];
  if (he(e)) {
    const o = t[e];
    Y(o) && At(i, o);
  } else if (Y(e))
    At(i, e.bind(s));
  else if (ie(e))
    if (K(e))
      e.forEach((o) => co(o, t, s, n));
    else {
      const o = Y(e.handler) ? e.handler.bind(s) : t[e.handler];
      Y(o) && At(i, o, e);
    }
}
function fo(e) {
  const t = e.type, { mixins: s, extends: n } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let c;
  return l ? c = l : !i.length && !s && !n ? c = t : (c = {}, i.length && i.forEach(
    (d) => xs(c, d, r, !0)
  ), xs(c, t, r)), ie(t) && o.set(t, c), c;
}
function xs(e, t, s, n = !1) {
  const { mixins: i, extends: o } = t;
  o && xs(e, o, s, !0), i && i.forEach(
    (r) => xs(e, r, s, !0)
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
  props: Gn,
  emits: Gn,
  // objects
  methods: zt,
  computed: zt,
  // lifecycle
  beforeCreate: xe,
  created: xe,
  beforeMount: xe,
  mounted: xe,
  beforeUpdate: xe,
  updated: xe,
  beforeDestroy: xe,
  beforeUnmount: xe,
  destroyed: xe,
  unmounted: xe,
  activated: xe,
  deactivated: xe,
  errorCaptured: xe,
  serverPrefetch: xe,
  // assets
  components: zt,
  directives: zt,
  // watch
  watch: rl,
  // provide / inject
  provide: Jn,
  inject: ol
};
function Jn(e, t) {
  return t ? e ? function() {
    return pe(
      Y(e) ? e.call(this, this) : e,
      Y(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ol(e, t) {
  return zt(an(e), an(t));
}
function an(e) {
  if (K(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++)
      t[e[s]] = e[s];
    return t;
  }
  return e;
}
function xe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function zt(e, t) {
  return e ? pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Gn(e, t) {
  return e ? K(e) && K(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : pe(
    /* @__PURE__ */ Object.create(null),
    qn(e),
    qn(t ?? {})
  ) : t;
}
function rl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = pe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = xe(e[n], t[n]);
  return s;
}
function ao() {
  return {
    app: null,
    config: {
      isNativeTag: Ti,
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
let ll = 0;
function cl(e, t) {
  return function(n, i = null) {
    Y(n) || (n = pe({}, n)), i != null && !ie(i) && (i = null);
    const o = ao(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const d = o.app = {
      _uid: ll++,
      _component: n,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Nl,
      get config() {
        return o.config;
      },
      set config(f) {
      },
      use(f, ...p) {
        return r.has(f) || (f && Y(f.install) ? (r.add(f), f.install(d, ...p)) : Y(f) && (r.add(f), f(d, ...p))), d;
      },
      mixin(f) {
        return o.mixins.includes(f) || o.mixins.push(f), d;
      },
      component(f, p) {
        return p ? (o.components[f] = p, d) : o.components[f];
      },
      directive(f, p) {
        return p ? (o.directives[f] = p, d) : o.directives[f];
      },
      mount(f, p, v) {
        if (!c) {
          const T = d._ceVNode || _e(n, i);
          return T.appContext = o, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(T, f, v), c = !0, d._container = f, f.__vue_app__ = d, zs(T.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        c && (qe(
          l,
          d._instance,
          16
        ), e(null, d._container), delete d._container.__vue_app__);
      },
      provide(f, p) {
        return o.provides[f] = p, d;
      },
      runWithContext(f) {
        const p = xt;
        xt = d;
        try {
          return f();
        } finally {
          xt = p;
        }
      }
    };
    return d;
  };
}
let xt = null;
const fl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${De(t)}Modifiers`] || e[`${Pe(t)}Modifiers`];
function al(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || re;
  let i = s;
  const o = t.startsWith("update:"), r = o && fl(n, t.slice(7));
  r && (r.trim && (i = s.map((f) => he(f) ? f.trim() : f)), r.number && (i = s.map(Ms)));
  let l, c = n[l = Ws(t)] || // also try camelCase event handler (#2249)
  n[l = Ws(De(t))];
  !c && o && (c = n[l = Ws(Pe(t))]), c && qe(
    c,
    e,
    6,
    i
  );
  const d = n[l + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, qe(
      d,
      e,
      6,
      i
    );
  }
}
const ul = /* @__PURE__ */ new WeakMap();
function uo(e, t, s = !1) {
  const n = s ? ul : t.emitsCache, i = n.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!Y(e)) {
    const c = (d) => {
      const f = uo(d, t, !0);
      f && (l = !0, pe(r, f));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !l ? (ie(e) && n.set(e, null), null) : (K(o) ? o.forEach((c) => r[c] = null) : pe(r, o), ie(e) && n.set(e, r), r);
}
function Vs(e, t) {
  return !e || !Es(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, Pe(t)) || se(e, t));
}
function Xn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: i,
    propsOptions: [o],
    slots: r,
    attrs: l,
    emit: c,
    render: d,
    renderCache: f,
    props: p,
    data: v,
    setupState: T,
    ctx: m,
    inheritAttrs: b
  } = e, q = ws(e);
  let G, R;
  try {
    if (s.shapeFlag & 4) {
      const P = i || n, W = P;
      G = Ke(
        d.call(
          W,
          P,
          f,
          p,
          T,
          v,
          m
        )
      ), R = l;
    } else {
      const P = t;
      G = Ke(
        P.length > 1 ? P(
          p,
          { attrs: l, slots: r, emit: c }
        ) : P(
          p,
          null
        )
      ), R = t.props ? l : dl(l);
    }
  } catch (P) {
    Jt.length = 0, Ls(P, e, 1), G = _e(dt);
  }
  let L = G;
  if (R && b !== !1) {
    const P = Object.keys(R), { shapeFlag: W } = L;
    P.length && W & 7 && (o && P.some(bn) && (R = pl(
      R,
      o
    )), L = Mt(L, R, !1, !0));
  }
  return s.dirs && (L = Mt(L, null, !1, !0), L.dirs = L.dirs ? L.dirs.concat(s.dirs) : s.dirs), s.transition && En(L, s.transition), G = L, ws(q), G;
}
const dl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Es(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, pl = (e, t) => {
  const s = {};
  for (const n in e)
    (!bn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function hl(e, t, s) {
  const { props: n, children: i, component: o } = e, { props: r, children: l, patchFlag: c } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? Qn(n, r, d) : !!r;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const v = f[p];
        if (po(r, n, v) && !Vs(d, v))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? Qn(n, r, d) : !0 : !!r;
  return !1;
}
function Qn(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    if (po(t, e, o) && !Vs(s, o))
      return !0;
  }
  return !1;
}
function po(e, t, s) {
  const n = e[s], i = t[s];
  return s === "style" && ie(n) && ie(i) ? !ns(n, i) : n !== i;
}
function ml({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const ho = {}, mo = () => Object.create(ho), go = (e) => Object.getPrototypeOf(e) === ho;
function gl(e, t, s, n = !1) {
  const i = {}, o = mo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), bo(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  s ? e.props = n ? i : /* @__PURE__ */ xr(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function bl(e, t, s, n) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ Z(i), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let v = f[p];
        if (Vs(e.emitsOptions, v))
          continue;
        const T = t[v];
        if (c)
          if (se(o, v))
            T !== o[v] && (o[v] = T, d = !0);
          else {
            const m = De(v);
            i[m] = un(
              c,
              l,
              m,
              T,
              e,
              !1
            );
          }
        else
          T !== o[v] && (o[v] = T, d = !0);
      }
    }
  } else {
    bo(e, t, i, o) && (d = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !se(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Pe(p)) === p || !se(t, f))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[f] !== void 0) && (i[p] = un(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete i[p]);
    if (o !== l)
      for (const p in o)
        (!t || !se(t, p)) && (delete o[p], d = !0);
  }
  d && Qe(e.attrs, "set", "");
}
function bo(e, t, s, n) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if (Ut(c))
        continue;
      const d = t[c];
      let f;
      i && se(i, f = De(c)) ? !o || !o.includes(f) ? s[f] = d : (l || (l = {}))[f] = d : Vs(e.emitsOptions, c) || (!(c in n) || d !== n[c]) && (n[c] = d, r = !0);
    }
  if (o) {
    const c = /* @__PURE__ */ Z(s), d = l || re;
    for (let f = 0; f < o.length; f++) {
      const p = o[f];
      s[p] = un(
        i,
        c,
        p,
        d[p],
        e,
        !se(d, p)
      );
    }
  }
  return r;
}
function un(e, t, s, n, i, o) {
  const r = e[s];
  if (r != null) {
    const l = se(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && Y(c)) {
        const { propsDefaults: d } = i;
        if (s in d)
          n = d[s];
        else {
          const f = os(i);
          n = d[s] = c.call(
            null,
            t
          ), f();
        }
      } else
        n = c;
      i.ce && i.ce._setProp(s, n);
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? n = !1 : r[
      1
      /* shouldCastTrue */
    ] && (n === "" || n === Pe(s)) && (n = !0));
  }
  return n;
}
const wl = /* @__PURE__ */ new WeakMap();
function wo(e, t, s = !1) {
  const n = s ? wl : t.propsCache, i = n.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let c = !1;
  if (!Y(e)) {
    const f = (p) => {
      c = !0;
      const [v, T] = wo(p, t, !0);
      pe(r, v), T && l.push(...T);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!o && !c)
    return ie(e) && n.set(e, Ct), Ct;
  if (K(o))
    for (let f = 0; f < o.length; f++) {
      const p = De(o[f]);
      Zn(p) && (r[p] = re);
    }
  else if (o)
    for (const f in o) {
      const p = De(f);
      if (Zn(p)) {
        const v = o[f], T = r[p] = K(v) || Y(v) ? { type: v } : pe({}, v), m = T.type;
        let b = !1, q = !0;
        if (K(m))
          for (let G = 0; G < m.length; ++G) {
            const R = m[G], L = Y(R) && R.name;
            if (L === "Boolean") {
              b = !0;
              break;
            } else L === "String" && (q = !1);
          }
        else
          b = Y(m) && m.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = b, T[
          1
          /* shouldCastTrue */
        ] = q, (b || se(T, "default")) && l.push(p);
      }
    }
  const d = [r, l];
  return ie(e) && n.set(e, d), d;
}
function Zn(e) {
  return e[0] !== "$" && !Ut(e);
}
const Pn = (e) => e === "_" || e === "_ctx" || e === "$stable", $n = (e) => K(e) ? e.map(Ke) : [Ke(e)], vl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Rr((...i) => $n(t(...i)), s);
  return n._c = !1, n;
}, vo = (e, t, s) => {
  const n = e._ctx;
  for (const i in e) {
    if (Pn(i)) continue;
    const o = e[i];
    if (Y(o))
      t[i] = vl(i, o, n);
    else if (o != null) {
      const r = $n(o);
      t[i] = () => r;
    }
  }
}, xo = (e, t) => {
  const s = $n(t);
  e.slots.default = () => s;
}, yo = (e, t, s) => {
  for (const n in t)
    (s || !Pn(n)) && (e[n] = t[n]);
}, xl = (e, t, s) => {
  const n = e.slots = mo();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (yo(n, t, s), s && $i(n, "_", i, !0)) : vo(t, n);
  } else t && xo(e, t);
}, yl = (e, t, s) => {
  const { vnode: n, slots: i } = e;
  let o = !0, r = re;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? o = !1 : yo(i, t, s) : (o = !t.$stable, vo(t, i)), r = t;
  } else t && (xo(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !Pn(l) && r[l] == null && delete i[l];
}, Te = Tl;
function _l(e) {
  return Sl(e);
}
function Sl(e, t) {
  const s = Os();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: c,
    setText: d,
    setElementText: f,
    parentNode: p,
    nextSibling: v,
    setScopeId: T = We,
    insertStaticContent: m
  } = e, b = (a, u, g, k = null, x = null, _ = null, M = void 0, $ = null, A = !!u.dynamicChildren) => {
    if (a === u)
      return;
    a && !Vt(a, u) && (k = ls(a), Fe(a, x, _, !0), a = null), u.patchFlag === -2 && (A = !1, u.dynamicChildren = null);
    const { type: S, ref: z, shapeFlag: D } = u;
    switch (S) {
      case Hs:
        q(a, u, g, k);
        break;
      case dt:
        G(a, u, g, k);
        break;
      case Qs:
        a == null && R(u, g, k, M);
        break;
      case ee:
        me(
          a,
          u,
          g,
          k,
          x,
          _,
          M,
          $,
          A
        );
        break;
      default:
        D & 1 ? W(
          a,
          u,
          g,
          k,
          x,
          _,
          M,
          $,
          A
        ) : D & 6 ? N(
          a,
          u,
          g,
          k,
          x,
          _,
          M,
          $,
          A
        ) : (D & 64 || D & 128) && S.process(
          a,
          u,
          g,
          k,
          x,
          _,
          M,
          $,
          A,
          Lt
        );
    }
    z != null && x ? Bt(z, a && a.ref, _, u || a, !u) : z == null && a && a.ref != null && Bt(a.ref, null, _, a, !0);
  }, q = (a, u, g, k) => {
    if (a == null)
      n(
        u.el = l(u.children),
        g,
        k
      );
    else {
      const x = u.el = a.el;
      u.children !== a.children && d(x, u.children);
    }
  }, G = (a, u, g, k) => {
    a == null ? n(
      u.el = c(u.children || ""),
      g,
      k
    ) : u.el = a.el;
  }, R = (a, u, g, k) => {
    [a.el, a.anchor] = m(
      a.children,
      u,
      g,
      k,
      a.el,
      a.anchor
    );
  }, L = ({ el: a, anchor: u }, g, k) => {
    let x;
    for (; a && a !== u; )
      x = v(a), n(a, g, k), a = x;
    n(u, g, k);
  }, P = ({ el: a, anchor: u }) => {
    let g;
    for (; a && a !== u; )
      g = v(a), i(a), a = g;
    i(u);
  }, W = (a, u, g, k, x, _, M, $, A) => {
    if (u.type === "svg" ? M = "svg" : u.type === "math" && (M = "mathml"), a == null)
      ge(
        u,
        g,
        k,
        x,
        _,
        M,
        $,
        A
      );
    else {
      const S = a.el && a.el._isVueCE ? a.el : null;
      try {
        S && S._beginPatch(), E(
          a,
          u,
          x,
          _,
          M,
          $,
          A
        );
      } finally {
        S && S._endPatch();
      }
    }
  }, ge = (a, u, g, k, x, _, M, $) => {
    let A, S;
    const { props: z, shapeFlag: D, transition: H, dirs: B } = a;
    if (A = a.el = r(
      a.type,
      _,
      z && z.is,
      z
    ), D & 8 ? f(A, a.children) : D & 16 && F(
      a.children,
      A,
      null,
      k,
      x,
      Xs(a, _),
      M,
      $
    ), B && ht(a, null, k, "created"), ue(A, a, a.scopeId, M, k), z) {
      for (const ce in z)
        ce !== "value" && !Ut(ce) && o(A, ce, null, z[ce], _, k);
      "value" in z && o(A, "value", null, z.value, _), (S = z.onVnodeBeforeMount) && ze(S, k, a);
    }
    B && ht(a, null, k, "beforeMount");
    const X = kl(x, H);
    X && H.beforeEnter(A), n(A, u, g), ((S = z && z.onVnodeMounted) || X || B) && Te(() => {
      S && ze(S, k, a), X && H.enter(A), B && ht(a, null, k, "mounted");
    }, x);
  }, ue = (a, u, g, k, x) => {
    if (g && T(a, g), k)
      for (let _ = 0; _ < k.length; _++)
        T(a, k[_]);
    if (x) {
      let _ = x.subTree;
      if (u === _ || Co(_.type) && (_.ssContent === u || _.ssFallback === u)) {
        const M = x.vnode;
        ue(
          a,
          M,
          M.scopeId,
          M.slotScopeIds,
          x.parent
        );
      }
    }
  }, F = (a, u, g, k, x, _, M, $, A = 0) => {
    for (let S = A; S < a.length; S++) {
      const z = a[S] = $ ? Xe(a[S]) : Ke(a[S]);
      b(
        null,
        z,
        u,
        g,
        k,
        x,
        _,
        M,
        $
      );
    }
  }, E = (a, u, g, k, x, _, M) => {
    const $ = u.el = a.el;
    let { patchFlag: A, dynamicChildren: S, dirs: z } = u;
    A |= a.patchFlag & 16;
    const D = a.props || re, H = u.props || re;
    let B;
    if (g && mt(g, !1), (B = H.onVnodeBeforeUpdate) && ze(B, g, u, a), z && ht(u, a, g, "beforeUpdate"), g && mt(g, !0), (D.innerHTML && H.innerHTML == null || D.textContent && H.textContent == null) && f($, ""), S ? C(
      a.dynamicChildren,
      S,
      $,
      g,
      k,
      Xs(u, x),
      _
    ) : M || te(
      a,
      u,
      $,
      null,
      g,
      k,
      Xs(u, x),
      _,
      !1
    ), A > 0) {
      if (A & 16)
        le($, D, H, g, x);
      else if (A & 2 && D.class !== H.class && o($, "class", null, H.class, x), A & 4 && o($, "style", D.style, H.style, x), A & 8) {
        const X = u.dynamicProps;
        for (let ce = 0; ce < X.length; ce++) {
          const ne = X[ce], ke = D[ne], Ce = H[ne];
          (Ce !== ke || ne === "value") && o($, ne, ke, Ce, x, g);
        }
      }
      A & 1 && a.children !== u.children && f($, u.children);
    } else !M && S == null && le($, D, H, g, x);
    ((B = H.onVnodeUpdated) || z) && Te(() => {
      B && ze(B, g, u, a), z && ht(u, a, g, "updated");
    }, k);
  }, C = (a, u, g, k, x, _, M) => {
    for (let $ = 0; $ < u.length; $++) {
      const A = a[$], S = u[$], z = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        A.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (A.type === ee || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Vt(A, S) || // - In the case of a component, it could contain anything.
        A.shapeFlag & 198) ? p(A.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      b(
        A,
        S,
        z,
        null,
        k,
        x,
        _,
        M,
        !0
      );
    }
  }, le = (a, u, g, k, x) => {
    if (u !== g) {
      if (u !== re)
        for (const _ in u)
          !Ut(_) && !(_ in g) && o(
            a,
            _,
            u[_],
            null,
            x,
            k
          );
      for (const _ in g) {
        if (Ut(_)) continue;
        const M = g[_], $ = u[_];
        M !== $ && _ !== "value" && o(a, _, $, M, x, k);
      }
      "value" in g && o(a, "value", u.value, g.value, x);
    }
  }, me = (a, u, g, k, x, _, M, $, A) => {
    const S = u.el = a ? a.el : l(""), z = u.anchor = a ? a.anchor : l("");
    let { patchFlag: D, dynamicChildren: H, slotScopeIds: B } = u;
    B && ($ = $ ? $.concat(B) : B), a == null ? (n(S, g, k), n(z, g, k), F(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      u.children || [],
      g,
      z,
      x,
      _,
      M,
      $,
      A
    )) : D > 0 && D & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren && a.dynamicChildren.length === H.length ? (C(
      a.dynamicChildren,
      H,
      g,
      x,
      _,
      M,
      $
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (u.key != null || x && u === x.subTree) && _o(
      a,
      u,
      !0
      /* shallow */
    )) : te(
      a,
      u,
      g,
      z,
      x,
      _,
      M,
      $,
      A
    );
  }, N = (a, u, g, k, x, _, M, $, A) => {
    u.slotScopeIds = $, a == null ? u.shapeFlag & 512 ? x.ctx.activate(
      u,
      g,
      k,
      M,
      A
    ) : ve(
      u,
      g,
      k,
      x,
      _,
      M,
      A
    ) : J(a, u, A);
  }, ve = (a, u, g, k, x, _, M) => {
    const $ = a.component = Ol(
      a,
      k,
      x
    );
    if (ro(a) && ($.ctx.renderer = Lt), Rl($, !1, M), $.asyncDep) {
      if (x && x.registerDep($, y, M), !a.el) {
        const A = $.subTree = _e(dt);
        G(null, A, u, g), a.placeholder = A.el;
      }
    } else
      y(
        $,
        a,
        u,
        g,
        x,
        _,
        M
      );
  }, J = (a, u, g) => {
    const k = u.component = a.component;
    if (hl(a, u, g))
      if (k.asyncDep && !k.asyncResolved) {
        I(k, u, g);
        return;
      } else
        k.next = u, k.update();
    else
      u.el = a.el, k.vnode = u;
  }, y = (a, u, g, k, x, _, M) => {
    const $ = () => {
      if (a.isMounted) {
        let { next: D, bu: H, u: B, parent: X, vnode: ce } = a;
        {
          const Ve = So(a);
          if (Ve) {
            D && (D.el = ce.el, I(a, D, M)), Ve.asyncDep.then(() => {
              Te(() => {
                a.isUnmounted || S();
              }, x);
            });
            return;
          }
        }
        let ne = D, ke;
        mt(a, !1), D ? (D.el = ce.el, I(a, D, M)) : D = ce, H && ds(H), (ke = D.props && D.props.onVnodeBeforeUpdate) && ze(ke, X, D, ce), mt(a, !0);
        const Ce = Xn(a), Ne = a.subTree;
        a.subTree = Ce, b(
          Ne,
          Ce,
          // parent may have changed if it's in a teleport
          p(Ne.el),
          // anchor may have changed if it's in a fragment
          ls(Ne),
          a,
          x,
          _
        ), D.el = Ce.el, ne === null && ml(a, Ce.el), B && Te(B, x), (ke = D.props && D.props.onVnodeUpdated) && Te(
          () => ze(ke, X, D, ce),
          x
        );
      } else {
        let D;
        const { el: H, props: B } = u, { bm: X, m: ce, parent: ne, root: ke, type: Ce } = a, Ne = qt(u);
        mt(a, !1), X && ds(X), !Ne && (D = B && B.onVnodeBeforeMount) && ze(D, ne, u), mt(a, !0);
        {
          ke.ce && ke.ce._hasShadowRoot() && ke.ce._injectChildStyle(Ce);
          const Ve = a.subTree = Xn(a);
          b(
            null,
            Ve,
            g,
            k,
            a,
            x,
            _
          ), u.el = Ve.el;
        }
        if (ce && Te(ce, x), !Ne && (D = B && B.onVnodeMounted)) {
          const Ve = u;
          Te(
            () => ze(D, ne, Ve),
            x
          );
        }
        (u.shapeFlag & 256 || ne && qt(ne.vnode) && ne.vnode.shapeFlag & 256) && a.a && Te(a.a, x), a.isMounted = !0, u = g = k = null;
      }
    };
    a.scope.on();
    const A = a.effect = new Li($);
    a.scope.off();
    const S = a.update = A.run.bind(A), z = a.job = A.runIfDirty.bind(A);
    z.i = a, z.id = a.uid, A.scheduler = () => Tn(z), mt(a, !0), S();
  }, I = (a, u, g) => {
    u.component = a;
    const k = a.vnode.props;
    a.vnode = u, a.next = null, bl(a, u.props, k, g), yl(a, u.children, g), tt(), Kn(a), st();
  }, te = (a, u, g, k, x, _, M, $, A = !1) => {
    const S = a && a.children, z = a ? a.shapeFlag : 0, D = u.children, { patchFlag: H, shapeFlag: B } = u;
    if (H > 0) {
      if (H & 128) {
        rs(
          S,
          D,
          g,
          k,
          x,
          _,
          M,
          $,
          A
        );
        return;
      } else if (H & 256) {
        Ye(
          S,
          D,
          g,
          k,
          x,
          _,
          M,
          $,
          A
        );
        return;
      }
    }
    B & 8 ? (z & 16 && jt(S, x, _), D !== S && f(g, D)) : z & 16 ? B & 16 ? rs(
      S,
      D,
      g,
      k,
      x,
      _,
      M,
      $,
      A
    ) : jt(S, x, _, !0) : (z & 8 && f(g, ""), B & 16 && F(
      D,
      g,
      k,
      x,
      _,
      M,
      $,
      A
    ));
  }, Ye = (a, u, g, k, x, _, M, $, A) => {
    a = a || Ct, u = u || Ct;
    const S = a.length, z = u.length, D = Math.min(S, z);
    let H;
    for (H = 0; H < D; H++) {
      const B = u[H] = A ? Xe(u[H]) : Ke(u[H]);
      b(
        a[H],
        B,
        g,
        null,
        x,
        _,
        M,
        $,
        A
      );
    }
    S > z ? jt(
      a,
      x,
      _,
      !0,
      !1,
      D
    ) : F(
      u,
      g,
      k,
      x,
      _,
      M,
      $,
      A,
      D
    );
  }, rs = (a, u, g, k, x, _, M, $, A) => {
    let S = 0;
    const z = u.length;
    let D = a.length - 1, H = z - 1;
    for (; S <= D && S <= H; ) {
      const B = a[S], X = u[S] = A ? Xe(u[S]) : Ke(u[S]);
      if (Vt(B, X))
        b(
          B,
          X,
          g,
          null,
          x,
          _,
          M,
          $,
          A
        );
      else
        break;
      S++;
    }
    for (; S <= D && S <= H; ) {
      const B = a[D], X = u[H] = A ? Xe(u[H]) : Ke(u[H]);
      if (Vt(B, X))
        b(
          B,
          X,
          g,
          null,
          x,
          _,
          M,
          $,
          A
        );
      else
        break;
      D--, H--;
    }
    if (S > D) {
      if (S <= H) {
        const B = H + 1, X = B < z ? u[B].el : k;
        for (; S <= H; )
          b(
            null,
            u[S] = A ? Xe(u[S]) : Ke(u[S]),
            g,
            X,
            x,
            _,
            M,
            $,
            A
          ), S++;
      }
    } else if (S > H)
      for (; S <= D; )
        Fe(a[S], x, _, !0), S++;
    else {
      const B = S, X = S, ce = /* @__PURE__ */ new Map();
      for (S = X; S <= H; S++) {
        const Ae = u[S] = A ? Xe(u[S]) : Ke(u[S]);
        Ae.key != null && ce.set(Ae.key, S);
      }
      let ne, ke = 0;
      const Ce = H - X + 1;
      let Ne = !1, Ve = 0;
      const Ft = new Array(Ce);
      for (S = 0; S < Ce; S++) Ft[S] = 0;
      for (S = B; S <= D; S++) {
        const Ae = a[S];
        if (ke >= Ce) {
          Fe(Ae, x, _, !0);
          continue;
        }
        let He;
        if (Ae.key != null)
          He = ce.get(Ae.key);
        else
          for (ne = X; ne <= H; ne++)
            if (Ft[ne - X] === 0 && Vt(Ae, u[ne])) {
              He = ne;
              break;
            }
        He === void 0 ? Fe(Ae, x, _, !0) : (Ft[He - X] = S + 1, He >= Ve ? Ve = He : Ne = !0, b(
          Ae,
          u[He],
          g,
          null,
          x,
          _,
          M,
          $,
          A
        ), ke++);
      }
      const jn = Ne ? Cl(Ft) : Ct;
      for (ne = jn.length - 1, S = Ce - 1; S >= 0; S--) {
        const Ae = X + S, He = u[Ae], Ln = u[Ae + 1], Fn = Ae + 1 < z ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Ln.el || ko(Ln)
        ) : k;
        Ft[S] === 0 ? b(
          null,
          He,
          g,
          Fn,
          x,
          _,
          M,
          $,
          A
        ) : Ne && (ne < 0 || S !== jn[ne] ? pt(He, g, Fn, 2) : ne--);
      }
    }
  }, pt = (a, u, g, k, x = null) => {
    const { el: _, type: M, transition: $, children: A, shapeFlag: S } = a;
    if (S & 6) {
      pt(a.component.subTree, u, g, k);
      return;
    }
    if (S & 128) {
      a.suspense.move(u, g, k);
      return;
    }
    if (S & 64) {
      M.move(a, u, g, Lt);
      return;
    }
    if (M === ee) {
      n(_, u, g);
      for (let D = 0; D < A.length; D++)
        pt(A[D], u, g, k);
      n(a.anchor, u, g);
      return;
    }
    if (M === Qs) {
      L(a, u, g);
      return;
    }
    if (k !== 2 && S & 1 && $)
      if (k === 0)
        $.beforeEnter(_), n(_, u, g), Te(() => $.enter(_), x);
      else {
        const { leave: D, delayLeave: H, afterLeave: B } = $, X = () => {
          a.ctx.isUnmounted ? i(_) : n(_, u, g);
        }, ce = () => {
          _._isLeaving && _[zr](
            !0
            /* cancelled */
          ), D(_, () => {
            X(), B && B();
          });
        };
        H ? H(_, X, ce) : ce();
      }
    else
      n(_, u, g);
  }, Fe = (a, u, g, k = !1, x = !1) => {
    const {
      type: _,
      props: M,
      ref: $,
      children: A,
      dynamicChildren: S,
      shapeFlag: z,
      patchFlag: D,
      dirs: H,
      cacheIndex: B
    } = a;
    if (D === -2 && (x = !1), $ != null && (tt(), Bt($, null, g, a, !0), st()), B != null && (u.renderCache[B] = void 0), z & 256) {
      u.ctx.deactivate(a);
      return;
    }
    const X = z & 1 && H, ce = !qt(a);
    let ne;
    if (ce && (ne = M && M.onVnodeBeforeUnmount) && ze(ne, u, a), z & 6)
      Ho(a.component, g, k);
    else {
      if (z & 128) {
        a.suspense.unmount(g, k);
        return;
      }
      X && ht(a, null, u, "beforeUnmount"), z & 64 ? a.type.remove(
        a,
        u,
        g,
        Lt,
        k
      ) : S && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !S.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (_ !== ee || D > 0 && D & 64) ? jt(
        S,
        u,
        g,
        !1,
        !0
      ) : (_ === ee && D & 384 || !x && z & 16) && jt(A, u, g), k && Rn(a);
    }
    (ce && (ne = M && M.onVnodeUnmounted) || X) && Te(() => {
      ne && ze(ne, u, a), X && ht(a, null, u, "unmounted");
    }, g);
  }, Rn = (a) => {
    const { type: u, el: g, anchor: k, transition: x } = a;
    if (u === ee) {
      Vo(g, k);
      return;
    }
    if (u === Qs) {
      P(a);
      return;
    }
    const _ = () => {
      i(g), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (a.shapeFlag & 1 && x && !x.persisted) {
      const { leave: M, delayLeave: $ } = x, A = () => M(g, _);
      $ ? $(a.el, _, A) : A();
    } else
      _();
  }, Vo = (a, u) => {
    let g;
    for (; a !== u; )
      g = v(a), i(a), a = g;
    i(u);
  }, Ho = (a, u, g) => {
    const { bum: k, scope: x, job: _, subTree: M, um: $, m: A, a: S } = a;
    ei(A), ei(S), k && ds(k), x.stop(), _ && (_.flags |= 8, Fe(M, a, u, g)), $ && Te($, u), Te(() => {
      a.isUnmounted = !0;
    }, u);
  }, jt = (a, u, g, k = !1, x = !1, _ = 0) => {
    for (let M = _; M < a.length; M++)
      Fe(a[M], u, g, k, x);
  }, ls = (a) => {
    if (a.shapeFlag & 6)
      return ls(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const u = v(a.anchor || a.el), g = u && u[Vr];
    return g ? v(g) : u;
  };
  let Ks = !1;
  const Dn = (a, u, g) => {
    let k;
    a == null ? u._vnode && (Fe(u._vnode, null, null, !0), k = u._vnode.component) : b(
      u._vnode || null,
      a,
      u,
      null,
      null,
      null,
      g
    ), u._vnode = a, Ks || (Ks = !0, Kn(k), eo(), Ks = !1);
  }, Lt = {
    p: b,
    um: Fe,
    m: pt,
    r: Rn,
    mt: ve,
    mc: F,
    pc: te,
    pbc: C,
    n: ls,
    o: e
  };
  return {
    render: Dn,
    hydrate: void 0,
    createApp: cl(Dn)
  };
}
function Xs({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function mt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function _o(e, t, s = !1) {
  const n = e.children, i = t.children;
  if (K(n) && K(i))
    for (let o = 0; o < n.length; o++) {
      const r = n[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = Xe(i[o]), l.el = r.el), !s && l.patchFlag !== -2 && _o(r, l)), l.type === Hs && (l.patchFlag === -1 && (l = i[o] = Xe(l)), l.el = r.el), l.type === dt && !l.el && (l.el = r.el);
    }
}
function Cl(e) {
  const t = e.slice(), s = [0];
  let n, i, o, r, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const d = e[n];
    if (d !== 0) {
      if (i = s[s.length - 1], e[i] < d) {
        t[n] = i, s.push(n);
        continue;
      }
      for (o = 0, r = s.length - 1; o < r; )
        l = o + r >> 1, e[s[l]] < d ? o = l + 1 : r = l;
      d < e[s[o]] && (o > 0 && (t[n] = s[o - 1]), s[o] = n);
    }
  }
  for (o = s.length, r = s[o - 1]; o-- > 0; )
    s[o] = r, r = t[r];
  return s;
}
function So(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : So(t);
}
function ei(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function ko(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? ko(t.subTree) : null;
}
const Co = (e) => e.__isSuspense;
function Tl(e, t) {
  t && t.pendingBranch ? K(e) ? t.effects.push(...e) : t.effects.push(e) : Or(e);
}
const ee = /* @__PURE__ */ Symbol.for("v-fgt"), Hs = /* @__PURE__ */ Symbol.for("v-txt"), dt = /* @__PURE__ */ Symbol.for("v-cmt"), Qs = /* @__PURE__ */ Symbol.for("v-stc"), Jt = [];
let $e = null;
function O(e = !1) {
  Jt.push($e = e ? null : []);
}
function El() {
  Jt.pop(), $e = Jt[Jt.length - 1] || null;
}
let es = 1;
function ti(e, t = !1) {
  es += e, e < 0 && $e && t && ($e.hasOnce = !0);
}
function To(e) {
  return e.dynamicChildren = es > 0 ? $e || Ct : null, El(), es > 0 && $e && $e.push(e), e;
}
function j(e, t, s, n, i, o) {
  return To(
    h(
      e,
      t,
      s,
      n,
      i,
      o,
      !0
    )
  );
}
function ys(e, t, s, n, i) {
  return To(
    _e(
      e,
      t,
      s,
      n,
      i,
      !0
    )
  );
}
function Eo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Vt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ao = ({ key: e }) => e ?? null, ps = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? he(e) || /* @__PURE__ */ de(e) || Y(e) ? { i: Me, r: e, k: t, f: !!s } : e : null);
function h(e, t = null, s = null, n = 0, i = null, o = e === ee ? 0 : 1, r = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ao(t),
    ref: t && ps(t),
    scopeId: so,
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
    shapeFlag: o,
    patchFlag: n,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Me
  };
  return l ? (In(c, s), o & 128 && e.normalize(c)) : s && (c.shapeFlag |= he(s) ? 8 : 16), es > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  $e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && $e.push(c), c;
}
const _e = Al;
function Al(e, t = null, s = null, n = 0, i = null, o = !1) {
  if ((!e || e === el) && (e = dt), Eo(e)) {
    const l = Mt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && In(l, s), es > 0 && !o && $e && (l.shapeFlag & 6 ? $e[$e.indexOf(e)] = l : $e.push(l)), l.patchFlag = -2, l;
  }
  if (Fl(e) && (e = e.__vccOpts), t) {
    t = Pl(t);
    let { class: l, style: c } = t;
    l && !he(l) && (t.class = Q(l)), ie(c) && (/* @__PURE__ */ js(c) && !K(c) && (c = pe({}, c)), t.style = $t(c));
  }
  const r = he(e) ? 1 : Co(e) ? 128 : Hr(e) ? 64 : ie(e) ? 4 : Y(e) ? 2 : 0;
  return h(
    e,
    t,
    s,
    n,
    i,
    r,
    o,
    !0
  );
}
function Pl(e) {
  return e ? /* @__PURE__ */ js(e) || go(e) ? pe({}, e) : e : null;
}
function Mt(e, t, s = !1, n = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: c } = e, d = t ? $l(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: d,
    key: d && Ao(d),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && o ? K(o) ? o.concat(ps(t)) : [o, ps(t)] : ps(t)
    ) : o,
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
    patchFlag: t && e.type !== ee ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && Mt(e.ssContent),
    ssFallback: e.ssFallback && Mt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && En(
    f,
    c.clone(f)
  ), f;
}
function Ot(e = " ", t = 0) {
  return _e(Hs, null, e, t);
}
function oe(e = "", t = !1) {
  return t ? (O(), ys(dt, null, e)) : _e(dt, null, e);
}
function Ke(e) {
  return e == null || typeof e == "boolean" ? _e(dt) : K(e) ? _e(
    ee,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Eo(e) ? Xe(e) : _e(Hs, null, String(e));
}
function Xe(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Mt(e);
}
function In(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (K(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), In(e, i()), i._c && (i._d = !0));
      return;
    } else {
      s = 32;
      const i = t._;
      !i && !go(t) ? t._ctx = Me : i === 3 && Me && (Me.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Y(t) ? (t = { default: t, _ctx: Me }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ot(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function $l(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const i in n)
      if (i === "class")
        t.class !== n.class && (t.class = Q([t.class, n.class]));
      else if (i === "style")
        t.style = $t([t.style, n.style]);
      else if (Es(i)) {
        const o = t[i], r = n[i];
        r && o !== r && !(K(o) && o.includes(r)) && (t[i] = o ? [].concat(o, r) : r);
      } else i !== "" && (t[i] = n[i]);
  }
  return t;
}
function ze(e, t, s, n = null) {
  qe(e, t, 7, [
    s,
    n
  ]);
}
const Il = ao();
let Ml = 0;
function Ol(e, t, s) {
  const n = e.type, i = (t ? t.appContext : e.appContext) || Il, o = {
    uid: Ml++,
    vnode: e,
    type: n,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Ri(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: wo(n, i),
    emitsOptions: uo(n, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: re,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: re,
    data: re,
    props: re,
    attrs: re,
    slots: re,
    refs: re,
    setupState: re,
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
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = al.bind(null, o), e.ce && e.ce(o), o;
}
let Se = null;
const Po = () => Se || Me;
let _s, dn;
{
  const e = Os(), t = (s, n) => {
    let i;
    return (i = e[s]) || (i = e[s] = []), i.push(n), (o) => {
      i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
    };
  };
  _s = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Se = s
  ), dn = t(
    "__VUE_SSR_SETTERS__",
    (s) => ts = s
  );
}
const os = (e) => {
  const t = Se;
  return _s(e), e.scope.on(), () => {
    e.scope.off(), _s(t);
  };
}, si = () => {
  Se && Se.scope.off(), _s(null);
};
function $o(e) {
  return e.vnode.shapeFlag & 4;
}
let ts = !1;
function Rl(e, t = !1, s = !1) {
  t && dn(t);
  const { props: n, children: i } = e.vnode, o = $o(e);
  gl(e, n, o, t), xl(e, i, s || t);
  const r = o ? Dl(e, t) : void 0;
  return t && dn(!1), r;
}
function Dl(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, tl);
  const { setup: n } = s;
  if (n) {
    tt();
    const i = e.setupContext = n.length > 1 ? Ll(e) : null, o = os(e), r = is(
      n,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = Ei(r);
    if (st(), o(), (l || e.sp) && !qt(e) && oo(e), l) {
      if (r.then(si, si), t)
        return r.then((c) => {
          ni(e, c);
        }).catch((c) => {
          Ls(c, e, 0);
        });
      e.asyncDep = r;
    } else
      ni(e, r);
  } else
    Io(e);
}
function ni(e, t, s) {
  Y(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ie(t) && (e.setupState = Xi(t)), Io(e);
}
function Io(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || We);
  {
    const i = os(e);
    tt();
    try {
      sl(e);
    } finally {
      st(), i();
    }
  }
}
const jl = {
  get(e, t) {
    return we(e, "get", ""), e[t];
  }
};
function Ll(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, jl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zs(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Xi(Cn(e.exposed)), {
    get(t, s) {
      if (s in t)
        return t[s];
      if (s in Yt)
        return Yt[s](e);
    },
    has(t, s) {
      return s in t || s in Yt;
    }
  })) : e.proxy;
}
function Fl(e) {
  return Y(e) && "__vccOpts" in e;
}
const ae = (e, t) => /* @__PURE__ */ Ar(e, t, ts), Nl = "3.5.28";
/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let pn;
const ii = typeof window < "u" && window.trustedTypes;
if (ii)
  try {
    pn = /* @__PURE__ */ ii.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Mo = pn ? (e) => pn.createHTML(e) : (e) => e, Vl = "http://www.w3.org/2000/svg", Hl = "http://www.w3.org/1998/Math/MathML", Ge = typeof document < "u" ? document : null, oi = Ge && /* @__PURE__ */ Ge.createElement("template"), zl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const i = t === "svg" ? Ge.createElementNS(Vl, e) : t === "mathml" ? Ge.createElementNS(Hl, e) : s ? Ge.createElement(e, { is: s }) : Ge.createElement(e);
    return e === "select" && n && n.multiple != null && i.setAttribute("multiple", n.multiple), i;
  },
  createText: (e) => Ge.createTextNode(e),
  createComment: (e) => Ge.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Ge.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, s, n, i, o) {
    const r = s ? s.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), s), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      oi.innerHTML = Mo(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = oi.content;
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
}, Ul = /* @__PURE__ */ Symbol("_vtc");
function Kl(e, t, s) {
  const n = e[Ul];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t;
}
const Ss = /* @__PURE__ */ Symbol("_vod"), Oo = /* @__PURE__ */ Symbol("_vsh"), Zs = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: s }) {
    e[Ss] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : Ht(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), Ht(e, !0), n.enter(e)) : n.leave(e, () => {
      Ht(e, !1);
    }) : Ht(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ht(e, t);
  }
};
function Ht(e, t) {
  e.style.display = t ? e[Ss] : "none", e[Oo] = !t;
}
const Wl = /* @__PURE__ */ Symbol(""), Bl = /(?:^|;)\s*display\s*:/;
function ql(e, t, s) {
  const n = e.style, i = he(s);
  let o = !1;
  if (s && !i) {
    if (t)
      if (he(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          s[l] == null && hs(n, l, "");
        }
      else
        for (const r in t)
          s[r] == null && hs(n, r, "");
    for (const r in s)
      r === "display" && (o = !0), hs(n, r, s[r]);
  } else if (i) {
    if (t !== s) {
      const r = n[Wl];
      r && (s += ";" + r), n.cssText = s, o = Bl.test(s);
    }
  } else t && e.removeAttribute("style");
  Ss in e && (e[Ss] = o ? n.display : "", e[Oo] && (n.display = "none"));
}
const ri = /\s*!important$/;
function hs(e, t, s) {
  if (K(s))
    s.forEach((n) => hs(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Yl(e, t);
    ri.test(s) ? e.setProperty(
      Pe(n),
      s.replace(ri, ""),
      "important"
    ) : e[n] = s;
  }
}
const li = ["Webkit", "Moz", "ms"], en = {};
function Yl(e, t) {
  const s = en[t];
  if (s)
    return s;
  let n = De(t);
  if (n !== "filter" && n in e)
    return en[t] = n;
  n = Pi(n);
  for (let i = 0; i < li.length; i++) {
    const o = li[i] + n;
    if (o in e)
      return en[t] = o;
  }
  return t;
}
const ci = "http://www.w3.org/1999/xlink";
function fi(e, t, s, n, i, o = Xo(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(ci, t.slice(6, t.length)) : e.setAttributeNS(ci, t, s) : s == null || o && !Ii(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Be(s) ? String(s) : s
  );
}
function ai(e, t, s, n, i) {
  if (t === "innerHTML" || t === "textContent") {
    s != null && (e[t] = t === "innerHTML" ? Mo(s) : s);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, c = s == null ? (
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
    l === "boolean" ? s = Ii(s) : s == null && l === "string" ? (s = "", r = !0) : l === "number" && (s = 0, r = !0);
  }
  try {
    e[t] = s;
  } catch {
  }
  r && e.removeAttribute(i || t);
}
function bt(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Jl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const ui = /* @__PURE__ */ Symbol("_vei");
function Gl(e, t, s, n, i = null) {
  const o = e[ui] || (e[ui] = {}), r = o[t];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = Xl(t);
    if (n) {
      const d = o[t] = ec(
        n,
        i
      );
      bt(e, l, d, c);
    } else r && (Jl(e, l, r, c), o[t] = void 0);
  }
}
const di = /(?:Once|Passive|Capture)$/;
function Xl(e) {
  let t;
  if (di.test(e)) {
    t = {};
    let n;
    for (; n = e.match(di); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Pe(e.slice(2)), t];
}
let tn = 0;
const Ql = /* @__PURE__ */ Promise.resolve(), Zl = () => tn || (Ql.then(() => tn = 0), tn = Date.now());
function ec(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    qe(
      tc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Zl(), s;
}
function tc(e, t) {
  if (K(t)) {
    const s = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      s.call(e), e._stopped = !0;
    }, t.map(
      (n) => (i) => !i._stopped && n && n(i)
    );
  } else
    return t;
}
const pi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, sc = (e, t, s, n, i, o) => {
  const r = i === "svg";
  t === "class" ? Kl(e, n, r) : t === "style" ? ql(e, s, n) : Es(t) ? bn(t) || Gl(e, t, s, n, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nc(e, t, n, r)) ? (ai(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && fi(e, t, n, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !he(n)) ? ai(e, De(t), n, o, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), fi(e, t, n, r));
};
function nc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && pi(t) && Y(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return pi(t) && he(s) ? !1 : t in e;
}
const hi = {};
// @__NO_SIDE_EFFECTS__
function xa(e, t, s) {
  let n = /* @__PURE__ */ it(e, t);
  Ps(n) && (n = pe({}, n, t));
  class i extends Mn {
    constructor(r) {
      super(n, r, s);
    }
  }
  return i.def = n, i;
}
const ic = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Mn extends ic {
  constructor(t, s = {}, n = vi) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== vi ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      pe({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Mn) {
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
    this._connected = !1, Dt(() => {
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
    const t = (n, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: o, styles: r } = n;
      let l;
      if (o && !K(o))
        for (const c in o) {
          const d = o[c];
          (d === Number || d && d.type === Number) && (c in this._props && (this._props[c] = Vn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[De(c)] = !0);
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
        se(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => w(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = K(s) ? s : Object.keys(s || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && n.includes(i) && this._setProp(i, this[i]);
    for (const i of n.map(De))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(o) {
          this._setProp(i, o, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const s = this.hasAttribute(t);
    let n = s ? this.getAttribute(t) : hi;
    const i = De(t);
    s && this._numberProps && this._numberProps[i] && (n = Vn(n)), this._setProp(i, n, !1, !0);
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
  _setProp(t, s, n = !0, i = !1) {
    if (s !== this._props[t] && (this._dirty = !0, s === hi ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), i && this._instance && this._update(), n)) {
      const o = this._ob;
      o && (this._processMutations(o.takeRecords()), o.disconnect()), s === !0 ? this.setAttribute(Pe(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Pe(t), s + "") : s || this.removeAttribute(Pe(t)), o && o.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), ac(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = _e(this._def, pe(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const i = (o, r) => {
        this.dispatchEvent(
          new CustomEvent(
            o,
            Ps(r[0]) ? pe({ detail: r }, r[0]) : { detail: r }
          )
        );
      };
      n.emit = (o, ...r) => {
        i(o, r), Pe(o) !== o && i(Pe(o), r);
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
    for (let i = t.length - 1; i >= 0; i--) {
      const o = document.createElement("style");
      n && o.setAttribute("nonce", n), o.textContent = t[i], this.shadowRoot.prepend(o);
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
      const i = t[n], o = i.getAttribute("name") || "default", r = this._slots[o], l = i.parentNode;
      if (r)
        for (const c of r) {
          if (s && c.nodeType === 1) {
            const d = s + "-s", f = document.createTreeWalker(c, 1);
            c.setAttribute(d, "");
            let p;
            for (; p = f.nextNode(); )
              p.setAttribute(d, "");
          }
          l.insertBefore(c, i);
        }
      else
        for (; i.firstChild; ) l.insertBefore(i.firstChild, i);
      l.removeChild(i);
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
      const i = n.querySelectorAll("slot");
      for (let o = 0; o < i.length; o++)
        s.add(i[o]);
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
const ks = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return K(t) ? (s) => ds(t, s) : t;
};
function oc(e) {
  e.target.composing = !0;
}
function mi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Pt = /* @__PURE__ */ Symbol("_assign");
function gi(e, t, s) {
  return t && (e = e.trim()), s && (e = Ms(e)), e;
}
const Cs = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, i) {
    e[Pt] = ks(i);
    const o = n || i.props && i.props.type === "number";
    bt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Pt](gi(e.value, s, o));
    }), (s || o) && bt(e, "change", () => {
      e.value = gi(e.value, s, o);
    }), t || (bt(e, "compositionstart", oc), bt(e, "compositionend", mi), bt(e, "change", mi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: i, number: o } }, r) {
    if (e[Pt] = ks(r), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? Ms(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || i && e.value.trim() === c) || (e.value = c));
  }
}, us = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const i = As(t);
    bt(e, "change", () => {
      const o = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? Ms(Ts(r)) : Ts(r)
      );
      e[Pt](
        e.multiple ? i ? new Set(o) : o : o[0]
      ), e._assigning = !0, Dt(() => {
        e._assigning = !1;
      });
    }), e[Pt] = ks(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    bi(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Pt] = ks(s);
  },
  updated(e, { value: t }) {
    e._assigning || bi(e, t);
  }
};
function bi(e, t) {
  const s = e.multiple, n = K(t);
  if (!(s && !n && !As(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = Ts(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = t.some((d) => String(d) === String(l)) : r.selected = Zo(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (ns(Ts(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !s && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ts(e) {
  return "_value" in e ? e._value : e.value;
}
const rc = ["ctrl", "shift", "alt", "meta"], lc = {
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
  exact: (e, t) => rc.some((s) => e[`${s}Key`] && !t.includes(s))
}, ut = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((i, ...o) => {
    for (let r = 0; r < t.length; r++) {
      const l = lc[t[r]];
      if (l && l(i, t)) return;
    }
    return e(i, ...o);
  }));
}, cc = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Rt = (e, t) => {
  const s = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return s[n] || (s[n] = ((i) => {
    if (!("key" in i))
      return;
    const o = Pe(i.key);
    if (t.some(
      (r) => r === o || cc[r] === o
    ))
      return e(i);
  }));
}, fc = /* @__PURE__ */ pe({ patchProp: sc }, zl);
let wi;
function Ro() {
  return wi || (wi = _l(fc));
}
const ac = ((...e) => {
  Ro().render(...e);
}), vi = ((...e) => {
  const t = Ro().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const i = dc(n);
    if (!i) return;
    const o = t._component;
    !Y(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const r = s(i, !1, uc(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
});
function uc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function dc(e) {
  return he(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Do;
const Us = (e) => Do = e, jo = (
  /* istanbul ignore next */
  Symbol()
);
function hn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var Gt;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(Gt || (Gt = {}));
function ya() {
  const e = Di(!0), t = e.run(() => /* @__PURE__ */ U({}));
  let s = [], n = [];
  const i = Cn({
    install(o) {
      Us(i), i._a = o, o.provide(jo, i), o.config.globalProperties.$pinia = i, n.forEach((r) => s.push(r)), n = [];
    },
    use(o) {
      return this._a ? s.push(o) : n.push(o), this;
    },
    _p: s,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: e,
    _s: /* @__PURE__ */ new Map(),
    state: t
  });
  return i;
}
const Lo = () => {
};
function xi(e, t, s, n = Lo) {
  e.push(t);
  const i = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), n());
  };
  return !s && ji() && er(i), i;
}
function St(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const pc = (e) => e(), yi = Symbol(), sn = Symbol();
function mn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], i = e[s];
    hn(i) && hn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ de(n) && !/* @__PURE__ */ et(n) ? e[s] = mn(i, n) : e[s] = n;
  }
  return e;
}
const hc = (
  /* istanbul ignore next */
  Symbol()
);
function mc(e) {
  return !hn(e) || !e.hasOwnProperty(hc);
}
const { assign: lt } = Object;
function gc(e) {
  return !!(/* @__PURE__ */ de(e) && e.effect);
}
function bc(e, t, s, n) {
  const { state: i, actions: o, getters: r } = t, l = s.state.value[e];
  let c;
  function d() {
    l || (s.state.value[e] = i ? i() : {});
    const f = /* @__PURE__ */ kr(s.state.value[e]);
    return lt(f, o, Object.keys(r || {}).reduce((p, v) => (p[v] = Cn(ae(() => {
      Us(s);
      const T = s._s.get(e);
      return r[v].call(T, T);
    })), p), {}));
  }
  return c = Fo(e, d, t, s, n, !0), c;
}
function Fo(e, t, s = {}, n, i, o) {
  let r;
  const l = lt({ actions: {} }, s), c = { deep: !0 };
  let d, f, p = [], v = [], T;
  const m = n.state.value[e];
  !o && !m && (n.state.value[e] = {});
  let b;
  function q(F) {
    let E;
    d = f = !1, typeof F == "function" ? (F(n.state.value[e]), E = {
      type: Gt.patchFunction,
      storeId: e,
      events: T
    }) : (mn(n.state.value[e], F), E = {
      type: Gt.patchObject,
      payload: F,
      storeId: e,
      events: T
    });
    const C = b = Symbol();
    Dt().then(() => {
      b === C && (d = !0);
    }), f = !0, St(p, E, n.state.value[e]);
  }
  const G = o ? function() {
    const { state: E } = s, C = E ? E() : {};
    this.$patch((le) => {
      lt(le, C);
    });
  } : (
    /* istanbul ignore next */
    Lo
  );
  function R() {
    r.stop(), p = [], v = [], n._s.delete(e);
  }
  const L = (F, E = "") => {
    if (yi in F)
      return F[sn] = E, F;
    const C = function() {
      Us(n);
      const le = Array.from(arguments), me = [], N = [];
      function ve(I) {
        me.push(I);
      }
      function J(I) {
        N.push(I);
      }
      St(v, {
        args: le,
        name: C[sn],
        store: W,
        after: ve,
        onError: J
      });
      let y;
      try {
        y = F.apply(this && this.$id === e ? this : W, le);
      } catch (I) {
        throw St(N, I), I;
      }
      return y instanceof Promise ? y.then((I) => (St(me, I), I)).catch((I) => (St(N, I), Promise.reject(I))) : (St(me, y), y);
    };
    return C[yi] = !0, C[sn] = E, C;
  }, P = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: xi.bind(null, v),
    $patch: q,
    $reset: G,
    $subscribe(F, E = {}) {
      const C = xi(p, F, E.detached, () => le()), le = r.run(() => At(() => n.state.value[e], (me) => {
        (E.flush === "sync" ? f : d) && F({
          storeId: e,
          type: Gt.direct,
          events: T
        }, me);
      }, lt({}, c, E)));
      return C;
    },
    $dispose: R
  }, W = /* @__PURE__ */ Ds(P);
  n._s.set(e, W);
  const ue = (n._a && n._a.runWithContext || pc)(() => n._e.run(() => (r = Di()).run(() => t({ action: L }))));
  for (const F in ue) {
    const E = ue[F];
    if (/* @__PURE__ */ de(E) && !gc(E) || /* @__PURE__ */ et(E))
      o || (m && mc(E) && (/* @__PURE__ */ de(E) ? E.value = m[F] : mn(E, m[F])), n.state.value[e][F] = E);
    else if (typeof E == "function") {
      const C = L(E, F);
      ue[F] = C, l.actions[F] = E;
    }
  }
  return lt(W, ue), lt(/* @__PURE__ */ Z(W), ue), Object.defineProperty(W, "$state", {
    get: () => n.state.value[e],
    set: (F) => {
      q((E) => {
        lt(E, F);
      });
    }
  }), n._p.forEach((F) => {
    lt(W, r.run(() => F({
      store: W,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), m && o && s.hydrate && s.hydrate(W.$state, m), d = !0, f = !0, W;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wc(e, t, s) {
  let n, i;
  const o = typeof t == "function";
  n = e, i = o ? s : t;
  function r(l, c) {
    const d = jr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (d ? vt(jo, null) : null), l && Us(l), l = Do, l._s.has(n) || (o ? Fo(n, t, i, l) : bc(n, i, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
const Oe = /* @__PURE__ */ wc("widget", () => {
  const e = /* @__PURE__ */ U({
    endpoint: "",
    issuesEndpoint: "",
    actionEndpoint: "",
    cancelEndpoint: "",
    repo: "",
    labels: "",
    storageKey: "thoughts"
  }), t = /* @__PURE__ */ U("text"), s = /* @__PURE__ */ U("right"), n = /* @__PURE__ */ U("bottom"), i = /* @__PURE__ */ U(""), o = /* @__PURE__ */ U(""), r = /* @__PURE__ */ U(""), l = /* @__PURE__ */ U("manual"), c = /* @__PURE__ */ U("technical_issue"), d = /* @__PURE__ */ U({}), f = /* @__PURE__ */ U({
    shortLeft: "done_archive",
    shortRight: "pin_unpin",
    longLeft: "create_linked_item",
    longRight: "comment"
  }), p = /* @__PURE__ */ U([]), v = /* @__PURE__ */ U(!1), T = /* @__PURE__ */ U(!1), m = /* @__PURE__ */ U("active"), b = /* @__PURE__ */ U("updated_desc"), q = /* @__PURE__ */ U(""), G = /* @__PURE__ */ U([]), R = /* @__PURE__ */ U(!1), L = /* @__PURE__ */ U(""), P = /* @__PURE__ */ U(""), W = /* @__PURE__ */ U(!1), ge = /* @__PURE__ */ U(null), ue = /* @__PURE__ */ U(""), F = /* @__PURE__ */ U("");
  function E(C) {
    e.value = C, t.value = "text";
  }
  return {
    config: e,
    mobileTab: t,
    handedness: s,
    panelSnap: n,
    adminToken: i,
    draftTitle: o,
    draftDescription: r,
    draftMergePolicy: l,
    mode: c,
    itemViews: d,
    swipeMapping: f,
    issues: p,
    issuesLoaded: v,
    loadingIssues: T,
    listView: m,
    listSort: b,
    listQuery: q,
    listStatusFilter: G,
    creating: R,
    createError: L,
    listError: P,
    textCreateSuccess: W,
    lastSubmissionId: ge,
    lastTextTitle: ue,
    lastTextDescription: F,
    init: E
  };
});
function rt() {
  const e = Oe();
  function t() {
    return e.config.storageKey + ":widget-state";
  }
  function s(o) {
    const r = String(o ?? ""), l = r.trim();
    return l ? l.toUpperCase().startsWith("URL: ") && !l.includes(`
`) ? "" : r : "";
  }
  function n() {
    try {
      const o = localStorage.getItem(t());
      if (!o) return;
      const r = JSON.parse(o);
      if (!r || typeof r != "object") return;
      ["text", "list", "settings"].includes(r.mobileTab) ? e.mobileTab = r.mobileTab : r.mobileTab === "requests" || r.activeTab === "requests" ? e.mobileTab = "list" : r.mobileTab === "voice" && (e.mobileTab = "text"), Array.isArray(r.issues) && (e.issues = r.issues), e.issuesLoaded = !!r.issuesLoaded, ["active", "needs_action", "completed", "all"].includes(r.listView) && (e.listView = r.listView), (r.listSort === "updated_desc" || r.listSort === "updated_asc") && (e.listSort = r.listSort), typeof r.draftTitle == "string" && (e.draftTitle = r.draftTitle), typeof r.draftDescription == "string" && (e.draftDescription = s(r.draftDescription)), (r.draftMergePolicy === "auto_unblocked" || r.draftMergePolicy === "manual") && (e.draftMergePolicy = r.draftMergePolicy), (r.handedness === "left" || r.handedness === "right") && (e.handedness = r.handedness), (r.panelSnap === "top" || r.panelSnap === "middle" || r.panelSnap === "bottom") && (e.panelSnap = r.panelSnap), ["technical_issue", "personal_todo", "feature_request"].includes(r.mode) && (e.mode = r.mode), r.swipeMapping && typeof r.swipeMapping == "object" && (e.swipeMapping = { ...e.swipeMapping, ...r.swipeMapping }), r.itemViews && typeof r.itemViews == "object" && (e.itemViews = { ...e.itemViews, ...r.itemViews });
    } catch {
    }
  }
  function i() {
    try {
      localStorage.setItem(t(), JSON.stringify({
        mobileTab: e.mobileTab,
        issues: e.issues,
        issuesLoaded: e.issuesLoaded,
        listView: e.listView,
        listSort: e.listSort,
        draftTitle: e.draftTitle,
        draftDescription: e.draftDescription,
        draftMergePolicy: e.draftMergePolicy,
        handedness: e.handedness,
        panelSnap: e.panelSnap,
        mode: e.mode,
        swipeMapping: e.swipeMapping,
        itemViews: e.itemViews
      }));
    } catch {
    }
  }
  return { restore: n, persist: i };
}
function No() {
  const e = vt("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    readToken: e.readToken,
    requireToken: e.requireToken,
    promptToken: e.promptToken,
    clearToken: e.clearToken
  };
}
function On() {
  const e = Oe(), { persist: t } = rt();
  let s = 0;
  function n(o) {
    s = o.touches[0].clientY;
  }
  function i(o) {
    const r = o.changedTouches[0].clientY - s;
    r > 40 ? e.panelSnap === "top" ? (e.panelSnap = "middle", t()) : e.panelSnap === "middle" && (e.panelSnap = "bottom", t()) : r < -40 && (e.panelSnap === "bottom" ? (e.panelSnap = "middle", t()) : e.panelSnap === "middle" && (e.panelSnap = "top", t()));
  }
  return { onPanelTouchStart: n, onPanelTouchEnd: i };
}
function yt() {
  const e = vt("widget-adapter");
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
const vc = 10;
function xc() {
  const e = Oe(), { persist: t } = rt(), { submitText: s, cancelSubmission: n, loadIssues: i } = yt(), o = /* @__PURE__ */ U(0);
  let r = null;
  function l() {
    r !== null && (clearInterval(r), r = null), o.value = 0;
  }
  function c() {
    l(), e.lastSubmissionId && (o.value = vc, r = setInterval(() => {
      o.value -= 1, o.value <= 0 && l();
    }, 1e3));
  }
  async function d(v) {
    if (e.creating) return;
    const T = e.draftDescription.trim();
    if (!T) {
      e.createError = "Please provide a description.";
      return;
    }
    let m = e.draftTitle.trim();
    if (!m) {
      const b = T.split(`
`)[0];
      m = b.length > 50 ? b.slice(0, 50) + "..." : b;
    }
    e.createError = "", e.creating = !0;
    try {
      const b = await s(m, T, v);
      e.lastSubmissionId = typeof (b == null ? void 0 : b.submissionId) == "string" ? b.submissionId : null, e.lastTextTitle = m, e.lastTextDescription = e.draftDescription, e.draftTitle = "", e.draftDescription = "", e.textCreateSuccess = !0, c(), i(!0), t();
    } catch (b) {
      e.createError = b instanceof Error ? b.message : "Failed to create request";
    } finally {
      e.creating = !1;
    }
  }
  async function f() {
    if (!e.lastSubmissionId) return;
    const v = e.lastSubmissionId;
    await n(v), e.lastSubmissionId = null, e.textCreateSuccess = !1, e.draftTitle = e.lastTextTitle, e.draftDescription = e.lastTextDescription, l(), t();
  }
  function p() {
    e.textCreateSuccess = !1, l();
  }
  return {
    undoSecondsLeft: o,
    submit: d,
    undo: f,
    reset: p,
    stopUndoCountdown: l
  };
}
function yc() {
  const e = /* @__PURE__ */ U(!1), t = /* @__PURE__ */ U(null), s = /* @__PURE__ */ U(!1), n = /* @__PURE__ */ U(!1);
  function i(l, c = !1) {
    t.value = l, s.value = !1, n.value = c, e.value = !0;
  }
  function o() {
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
    openIssue: i,
    openFilter: o,
    close: r
  };
}
const _c = 40;
function Sc() {
  const e = Oe(), { persist: t } = rt(), s = /* @__PURE__ */ U(!1), n = /* @__PURE__ */ U(!1);
  let i = 0;
  const o = ae(() => e.handedness === "left" ? { left: "10px", right: "" } : { right: "10px", left: "" });
  function r(p) {
    i = p.touches[0].clientX;
  }
  function l(p) {
    const v = p.changedTouches[0].clientX - i;
    Math.abs(v) >= _c && (e.handedness = v < 0 ? "left" : "right", t(), p.preventDefault());
  }
  function c() {
    s.value = !0;
  }
  function d() {
    s.value = !1;
  }
  function f(p) {
    e.handedness = p, t();
  }
  return Ns(() => {
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
    swipeHintStyle: o,
    onTouchStart: r,
    onTouchEnd: l,
    open: c,
    close: d,
    applyHandedness: f
  };
}
const kc = { class: "cfw-text-form-wrap" }, Cc = { class: "cfw-textarea-wrap" }, Tc = ["id", "placeholder"], Ec = {
  key: 1,
  class: "cfw-mf-actions"
}, Ac = ["disabled"], Pc = {
  key: 2,
  id: "cfw-new-actions"
}, $c = ["disabled"], Ic = /* @__PURE__ */ it({
  __name: "TextForm",
  props: {
    mobile: { type: Boolean },
    titleId: { type: String },
    descId: { type: String }
  },
  emits: ["create"],
  setup(e, { expose: t, emit: s }) {
    const n = e, i = Oe(), { persist: o } = rt(), r = ae(() => n.descId ?? (n.mobile ? "cfw-m-description" : "cfw-description")), l = ae(() => {
      switch (i.mode) {
        case "personal_todo":
          return "Capture a personal todo...";
        case "feature_request":
          return "Describe the requested feature...";
        case "technical_issue":
        default:
          return "Describe the technical issue...";
      }
    }), c = ae(() => !!i.draftDescription.trim());
    function d() {
      o();
    }
    function f() {
      i.draftTitle = "", i.draftDescription = "", o();
    }
    const p = /* @__PURE__ */ U(null);
    function v() {
      const m = p.value;
      m && (m.style.height = "auto", m.style.height = m.scrollHeight + "px", m.style.overflowY = m.offsetHeight < m.scrollHeight ? "auto" : "hidden");
    }
    function T() {
      v(), d();
    }
    return Ns(() => v()), t({ focusTitle: () => {
      var m;
      return (m = p.value) == null ? void 0 : m.focus();
    } }), (m, b) => (O(), j("div", kc, [
      h("div", Cc, [
        Re(h("textarea", {
          ref_key: "descRef",
          ref: p,
          id: r.value,
          "onUpdate:modelValue": b[0] || (b[0] = (q) => w(i).draftDescription = q),
          placeholder: l.value,
          maxlength: "5000",
          onInput: T,
          onKeydown: [
            b[1] || (b[1] = Rt(ut((q) => c.value && !w(i).creating && m.$emit("create", !0), ["ctrl"]), ["enter"])),
            b[2] || (b[2] = Rt(ut((q) => c.value && !w(i).creating && m.$emit("create", !0), ["meta"]), ["enter"]))
          ]
        }, null, 40, Tc), [
          [Cs, w(i).draftDescription]
        ])
      ]),
      w(i).createError ? (O(), j("div", {
        key: 0,
        class: Q([["cfw-error", e.mobile ? "cfw-mf-error" : ""], "active"])
      }, V(w(i).createError), 3)) : oe("", !0),
      e.mobile ? (O(), j("div", Ec, [
        c.value ? (O(), j("button", {
          key: 0,
          id: "cfw-m-clear",
          class: "cfw-btn cfw-btn-outline",
          type: "button",
          onClick: f
        }, "Clear")) : oe("", !0),
        h("button", {
          id: "cfw-m-submit",
          class: "cfw-btn cfw-btn-primary",
          type: "button",
          disabled: w(i).creating,
          onClick: b[3] || (b[3] = (q) => m.$emit("create", !1))
        }, V(w(i).creating ? "Saving..." : "Submit"), 9, Ac)
      ])) : (O(), j("div", Pc, [
        h("button", {
          id: "cfw-submit",
          type: "button",
          class: "cfw-btn cfw-btn-primary",
          disabled: w(i).creating,
          onClick: b[4] || (b[4] = (q) => m.$emit("create", !1))
        }, V(w(i).creating ? "Saving..." : "Submit"), 9, $c)
      ]))
    ]));
  }
}), Mc = ["onKeydown"], Oc = { class: "cfw-ml-row-main" }, Rc = { class: "cfw-ml-row-header" }, Dc = { class: "cfw-ml-row-status" }, jc = {
  key: 0,
  class: "cfw-ml-row-comments"
}, Lc = {
  key: 1,
  class: "cfw-ml-unread-dot"
}, Fc = { class: "cfw-ml-row-time" }, Nc = { class: "cfw-ml-row-title" }, Vc = {
  key: 0,
  class: "cfw-desktop-menu"
}, Hc = ["onClick"], _i = 80, Si = 160, ki = /* @__PURE__ */ it({
  __name: "IssueRow",
  props: {
    issue: { type: Object }
  },
  emits: ["open-issue", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = Oe(), { persist: o } = rt(), r = ae(() => {
      const F = i.itemViews[s.issue.number] || 0;
      return new Date(s.issue.updatedAt).getTime() > F;
    }), l = ae(() => {
      const F = new Date(s.issue.updatedAt), C = (/* @__PURE__ */ new Date()).getTime() - F.getTime();
      return C < 6e4 ? "Just now" : C < 36e5 ? `${Math.floor(C / 6e4)}m ago` : C < 864e5 ? `${Math.floor(C / 36e5)}h ago` : `${Math.floor(C / 864e5)}d ago`;
    });
    let c = 0, d = 0;
    const f = /* @__PURE__ */ U(0), p = /* @__PURE__ */ U(!1), v = ae(() => {
      if (!p.value) return "";
      const F = f.value > 0 ? "right" : "left", E = Math.abs(f.value), C = E > Si ? i.swipeMapping[F === "right" ? "longRight" : "longLeft"] : E > _i ? i.swipeMapping[F === "right" ? "shortRight" : "shortLeft"] : "none";
      return ue(C);
    }), T = ae(() => f.value > 0 ? "preview-left" : "preview-right"), m = ae(() => !v.value || v.value === "None" ? "" : f.value > 0 ? "bg-right" : "bg-left"), b = ae(() => ({
      transform: `translateX(${f.value}px)`,
      transition: p.value ? "none" : "transform 0.25s ease-out"
    }));
    function q(F) {
      c = F.touches[0].clientX, p.value = !0;
    }
    function G(F) {
      p.value && (d = F.touches[0].clientX, f.value = d - c);
    }
    function R() {
      p.value = !1;
      const F = Math.abs(f.value);
      if (F > _i) {
        const E = f.value > 0 ? "right" : "left", C = F > Si ? i.swipeMapping[E === "right" ? "longRight" : "longLeft"] : i.swipeMapping[E === "right" ? "shortRight" : "shortLeft"];
        C !== "none" && n("swipe-action", C, s.issue);
      }
      f.value = 0;
    }
    function L() {
      i.itemViews[s.issue.number] = Date.now(), o(), n("open-issue", s.issue);
    }
    const P = /* @__PURE__ */ U(!1), W = ae(() => {
      const F = [
        { id: "done_archive", label: "Done / Archive" },
        { id: "pin_unpin", label: "Pin / Unpin" },
        { id: "comment", label: "Comment" },
        { id: "create_linked_item", label: "Create linked item" },
        { id: "mark_viewed", label: "Mark viewed" }
      ];
      return s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" || F.unshift({ id: "edit", label: "Edit" }), F;
    });
    function ge(F) {
      P.value = !1, F === "edit" ? n("edit-issue", s.issue) : n("swipe-action", F, s.issue);
    }
    function ue(F) {
      return {
        done_archive: "Archive",
        pin_unpin: "Pin",
        comment: "Comment",
        create_linked_item: "Link",
        mark_viewed: "Mark viewed",
        none: "None"
      }[F] || "None";
    }
    return (F, E) => (O(), j("div", {
      class: "cfw-ml-row-wrap",
      onTouchstartPassive: q,
      onTouchmovePassive: G,
      onTouchend: R
    }, [
      h("div", {
        class: Q(["cfw-ml-row-bg", m.value])
      }, [
        v.value ? (O(), j("div", {
          key: 0,
          class: Q(["cfw-swipe-preview", T.value])
        }, V(v.value), 3)) : oe("", !0)
      ], 2),
      h("div", {
        class: Q(["cfw-ml-row", { unread: r.value }]),
        style: $t(b.value),
        onClick: L,
        tabindex: "0",
        onKeydown: [
          Rt(L, ["enter"]),
          Rt(ut(L, ["prevent"]), ["space"])
        ]
      }, [
        h("div", Oc, [
          h("div", Rc, [
            h("span", Dc, V(e.issue.status || e.issue.state), 1),
            e.issue.commentCount ? (O(), j("span", jc, V(e.issue.commentCount) + " comment" + V(e.issue.commentCount === 1 ? "" : "s"), 1)) : oe("", !0),
            r.value ? (O(), j("span", Lc)) : oe("", !0),
            h("span", Fc, V(l.value), 1)
          ]),
          h("div", Nc, V(e.issue.title), 1)
        ]),
        h("button", {
          class: "cfw-ml-row-menu",
          onClick: E[0] || (E[0] = ut((C) => P.value = !P.value, ["stop"]))
        }, "⋮"),
        P.value ? (O(), j("div", Vc, [
          (O(!0), j(ee, null, Ee(W.value, (C) => (O(), j("button", {
            key: C.id,
            onClick: ut((le) => ge(C.id), ["stop"])
          }, V(C.label), 9, Hc))), 128))
        ])) : oe("", !0)
      ], 46, Mc)
    ], 32));
  }
}), zc = { class: "cfw-tab-body" }, Uc = { id: "cfw-ml-head" }, Kc = { id: "cfw-ml-head-actions" }, Wc = ["disabled"], Bc = ["disabled"], qc = {
  key: 0,
  id: "cfw-ml-error",
  class: "cfw-error active"
}, Yc = {
  key: 0,
  class: "cfw-ml-empty"
}, Jc = {
  key: 0,
  class: "cfw-ml-section-label"
}, Ci = 56, Gc = /* @__PURE__ */ it({
  __name: "IssuesList",
  emits: ["refresh", "open-issue", "open-filter", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = t, n = Oe(), { hasAccess: i } = yt(), { onPanelTouchStart: o, onPanelTouchEnd: r } = On(), l = /* @__PURE__ */ U(!1), c = /* @__PURE__ */ U("");
    let d = 0, f = !1;
    const p = (R) => !["completed", "closed_unmerged", "merged"].includes(R.status || "") && R.state !== "closed", v = ae(() => n.issues.filter((R) => !!R.pinned && p(R))), T = ae(() => n.issues.filter((R) => !R.pinned || !p(R))), m = ae(() => i() ? n.loadingIssues ? "Loading…" : n.listError ? n.listError : "No requests yet." : "Authentication required to view requests.");
    function b(R) {
      R.currentTarget.scrollTop === 0 && (d = R.touches[0].clientY, f = !0);
    }
    function q(R) {
      if (!f) return;
      const L = R.touches[0].clientY - d;
      L > 0 ? (l.value = !0, c.value = L > Ci ? "↑ Release to refresh" : "↓ Pull to refresh") : (f = !1, l.value = !1);
    }
    function G(R) {
      if (!f) return;
      const L = R.changedTouches[0].clientY - d;
      f = !1, L > Ci ? (c.value = "Refreshing…", s("refresh"), setTimeout(() => {
        l.value = !1, c.value = "";
      }, 1e3)) : (l.value = !1, c.value = "");
    }
    return (R, L) => (O(), j("div", {
      id: "cfw-mv-list",
      class: Q(["cfw-mv", { active: w(n).mobileTab === "list" }])
    }, [
      h("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: L[0] || (L[0] = //@ts-ignore
        (...P) => w(o) && w(o)(...P)),
        onTouchend: L[1] || (L[1] = //@ts-ignore
        (...P) => w(r) && w(r)(...P))
      }, [...L[6] || (L[6] = [
        h("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      h("div", zc, [
        h("div", Uc, [
          L[7] || (L[7] = h("span", { id: "cfw-ml-head-title" }, "Requests", -1)),
          h("div", Kc, [
            h("button", {
              disabled: w(n).loadingIssues,
              onClick: L[2] || (L[2] = (P) => R.$emit("open-filter"))
            }, "⊞ Filter", 8, Wc),
            h("button", {
              disabled: w(n).loadingIssues,
              onClick: L[3] || (L[3] = (P) => R.$emit("refresh"))
            }, V(w(n).loadingIssues ? "…" : "↻"), 9, Bc)
          ])
        ]),
        w(n).listError ? (O(), j("div", qc, V(w(n).listError), 1)) : oe("", !0),
        h("div", {
          id: "cfw-ml-ptr",
          class: Q({ "cfw-ml-ptr-active": l.value })
        }, V(c.value), 3),
        h("div", {
          id: "cfw-ml-body",
          onTouchstartPassive: b,
          onTouchmovePassive: q,
          onTouchendPassive: G
        }, [
          w(n).issues.length ? (O(), j(ee, { key: 1 }, [
            v.value.length ? (O(), j(ee, { key: 0 }, [
              L[8] || (L[8] = h("div", { class: "cfw-ml-section-label" }, "Pinned", -1)),
              (O(!0), j(ee, null, Ee(v.value, (P) => (O(), ys(ki, {
                key: P.number,
                issue: P,
                onOpenIssue: L[4] || (L[4] = (W) => R.$emit("open-issue", W)),
                onSwipeAction: (W) => R.$emit("swipe-action", W, P),
                onEditIssue: (W) => R.$emit("edit-issue", P)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : oe("", !0),
            T.value.length ? (O(), j(ee, { key: 1 }, [
              v.value.length ? (O(), j("div", Jc, "Activity")) : oe("", !0),
              (O(!0), j(ee, null, Ee(T.value, (P) => (O(), ys(ki, {
                key: P.number,
                issue: P,
                onOpenIssue: L[5] || (L[5] = (W) => R.$emit("open-issue", W)),
                onSwipeAction: (W) => R.$emit("swipe-action", W, P),
                onEditIssue: (W) => R.$emit("edit-issue", P)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : oe("", !0)
          ], 64)) : (O(), j("div", Yc, V(m.value), 1))
        ], 32)
      ])
    ], 2));
  }
}), Xc = [
  ["active", "Active"],
  ["needs_action", "Needs action"],
  ["completed", "Completed"],
  ["all", "All"]
], Qc = [
  ["updated_desc", "Newest"],
  ["updated_asc", "Oldest"]
], Zc = [
  ["new", "New"],
  ["queued", "Queued"],
  ["pr_draft", "PR draft"],
  ["pr_open", "PR open"],
  ["pr_closed_unmerged", "PR closed"],
  ["pr_merge_requested", "Merge requested"],
  ["merged", "Merged"],
  ["closed_unmerged", "Closed"]
], ef = {
  key: 0,
  id: "cfw-mbs-content"
}, tf = { class: "cfw-is-status" }, sf = { class: "cfw-is-num" }, nf = {
  class: "cfw-is-action-row",
  style: { "margin-top": "8px" }
}, of = ["disabled"], rf = ["href"], lf = {
  key: 0,
  class: "cfw-is-body",
  style: { "font-size": "14px", color: "#a9c2df", "margin-top": "12px", "white-space": "pre-wrap", "line-height": "1.5", padding: "12px", background: "rgba(0,0,0,0.2)", "border-radius": "8px" }
}, cf = {
  key: 1,
  class: "cfw-is-badges"
}, ff = { class: "cfw-is-primary-box" }, af = {
  key: 1,
  class: "cfw-is-action-row"
}, uf = {
  key: 2,
  class: "cfw-is-section cfw-comments-section"
}, df = {
  key: 0,
  class: "cfw-comment cfw-comment-newest"
}, pf = { class: "cfw-comment-meta" }, hf = { class: "cfw-comment-body" }, mf = { class: "cfw-comment-meta" }, gf = { class: "cfw-comment-body" }, bf = {
  key: 3,
  class: "cfw-is-section"
}, wf = ["href"], vf = {
  key: 4,
  class: "cfw-is-section"
}, xf = { class: "cfw-is-actions" }, yf = ["disabled", "onClick"], _f = {
  key: 0,
  class: "cfw-is-action-reason"
}, Sf = {
  key: 5,
  class: "cfw-is-section"
}, kf = ["href"], Cf = {
  key: 0,
  class: "cfw-is-actions",
  style: { "margin-top": "10px" }
}, Tf = ["disabled", "onClick"], Ef = {
  key: 0,
  class: "cfw-is-action-reason"
}, Af = {
  key: 6,
  class: "cfw-is-error active"
}, Pf = {
  key: 1,
  id: "cfw-mbs-content"
}, $f = { class: "cfw-fs-section" }, If = { class: "cfw-fs-pills" }, Mf = ["onClick"], Of = { class: "cfw-fs-section" }, Rf = { class: "cfw-fs-pills" }, Df = ["onClick"], jf = { class: "cfw-fs-section" }, Lf = { class: "cfw-fs-chips" }, Ff = ["onClick"], Nf = /* @__PURE__ */ it({
  __name: "IssueSheet",
  props: {
    open: { type: Boolean },
    issue: { type: [Object, null] },
    filterMode: { type: Boolean },
    editMode: { type: Boolean }
  },
  emits: ["close", "action-done", "filter-changed", "compose-sheet", "edit-issue", "cancel-edit"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = Oe(), { persist: o } = rt(), { executeAction: r, mapActionError: l } = yt(), c = /* @__PURE__ */ U(!1), d = /* @__PURE__ */ U(""), f = /* @__PURE__ */ U(!1), p = /* @__PURE__ */ U(""), v = /* @__PURE__ */ U("");
    At(() => s.editMode, (E) => {
      E && s.issue && (p.value = s.issue.title, v.value = s.issue.body || "");
    });
    const T = ae(() => s.issue ? s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" : !1), m = ae(() => {
      var E;
      return (E = s.issue) != null && E.comments ? [...s.issue.comments].sort((C, le) => new Date(le.createdAt).getTime() - new Date(C.createdAt).getTime()) : [];
    }), b = ae(() => m.value.length > 0), q = ae(() => m.value[0] || null), G = ae(() => m.value.slice(1));
    function R(E) {
      return new Date(E).toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }
    const L = ae(() => {
      var E;
      return Array.isArray((E = s.issue) == null ? void 0 : E.issueActions) ? s.issue.issueActions : [];
    }), P = ae(() => {
      var E;
      return Array.isArray((E = s.issue) == null ? void 0 : E.pullRequestActions) ? s.issue.pullRequestActions : [];
    });
    async function W(E, C, le) {
      d.value = "", c.value = !0;
      try {
        await r(E, le, C), n("action-done"), n("close");
      } catch (me) {
        d.value = l(me instanceof Error ? me.message : "");
      } finally {
        c.value = !1;
      }
    }
    async function ge() {
      if (!s.issue) return;
      const E = p.value.trim();
      if (E) {
        d.value = "", c.value = !0;
        try {
          await r(s.issue.number, "edit", "issue", {
            title: E,
            body: v.value.trim()
          }), n("action-done"), n("cancel-edit");
        } catch (C) {
          d.value = l(C instanceof Error ? C.message : "");
        } finally {
          c.value = !1;
        }
      }
    }
    function ue(E) {
      const C = i.listStatusFilter.slice(), le = C.indexOf(E);
      le >= 0 ? C.splice(le, 1) : C.push(E), i.listStatusFilter = C, o(), n("filter-changed");
    }
    function F() {
      i.listView = "active", i.listQuery = "", i.listStatusFilter = [], o(), n("filter-changed"), n("close");
    }
    return (E, C) => {
      var le, me;
      return O(), j(ee, null, [
        h("div", {
          id: "cfw-mbs-overlay",
          class: Q({ active: e.open }),
          onClick: C[0] || (C[0] = (N) => E.$emit("close"))
        }, null, 2),
        h("div", {
          id: "cfw-mbs",
          class: Q({ active: e.open, "panel-left": w(i).handedness === "left" })
        }, [
          C[16] || (C[16] = h("div", { id: "cfw-mbs-handle" }, null, -1)),
          e.issue ? (O(), j("div", ef, [
            h("div", tf, V(e.issue.status || e.issue.state) + V(e.issue.statusDetail ? " · " + e.issue.statusDetail : ""), 1),
            h("div", sf, "#" + V(e.issue.number) + " · " + V(R(e.issue.updatedAt)), 1),
            e.editMode ? (O(), j(ee, { key: 0 }, [
              Re(h("input", {
                "onUpdate:modelValue": C[1] || (C[1] = (N) => p.value = N),
                class: "cfw-edit-title",
                placeholder: "Issue title...",
                style: { width: "100%", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#fff", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "16px", "font-weight": "bold", "margin-top": "12px" }
              }, null, 512), [
                [Cs, p.value]
              ]),
              Re(h("textarea", {
                "onUpdate:modelValue": C[2] || (C[2] = (N) => v.value = N),
                placeholder: "Issue description...",
                style: { width: "100%", "min-height": "120px", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#d9e7f7", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "14px", "margin-top": "8px", resize: "vertical" }
              }, null, 512), [
                [Cs, v.value]
              ]),
              h("div", nf, [
                h("button", {
                  class: "cfw-btn cfw-btn-outline",
                  onClick: C[3] || (C[3] = (N) => E.$emit("cancel-edit")),
                  style: { flex: "1" }
                }, "Cancel"),
                h("button", {
                  class: "cfw-btn cfw-btn-primary",
                  disabled: c.value || !p.value.trim(),
                  onClick: ge,
                  style: { flex: "1" }
                }, V(c.value ? "Saving..." : "Save"), 9, of)
              ])
            ], 64)) : (O(), j(ee, { key: 1 }, [
              h("a", {
                class: "cfw-is-title",
                href: e.issue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, V(e.issue.title), 9, rf),
              e.issue.body ? (O(), j("div", lf, V(e.issue.body), 1)) : oe("", !0),
              (le = e.issue.labels) != null && le.length ? (O(), j("div", cf, [
                (O(!0), j(ee, null, Ee(e.issue.labels, (N) => (O(), j("span", {
                  key: N,
                  class: "cfw-badge"
                }, V(N), 1))), 128))
              ])) : oe("", !0),
              h("div", ff, [
                T.value ? (O(), j("button", {
                  key: 0,
                  class: "cfw-btn cfw-btn-primary cfw-is-w100",
                  onClick: C[4] || (C[4] = (N) => E.$emit("compose-sheet", "comment", e.issue))
                }, "Comment")) : (O(), j("div", af, [
                  h("button", {
                    class: "cfw-btn cfw-btn-outline",
                    onClick: C[5] || (C[5] = (N) => E.$emit("edit-issue", e.issue))
                  }, "Edit"),
                  h("button", {
                    class: "cfw-btn cfw-btn-primary",
                    onClick: C[6] || (C[6] = (N) => E.$emit("compose-sheet", "comment", e.issue))
                  }, "Comment")
                ]))
              ])
            ], 64)),
            b.value ? (O(), j("div", uf, [
              q.value ? (O(), j("div", df, [
                h("div", pf, [
                  h("strong", null, V(q.value.author || "User"), 1),
                  Ot(" · " + V(R(q.value.createdAt)), 1)
                ]),
                h("div", hf, V(q.value.body), 1)
              ])) : oe("", !0),
              G.value.length > 0 ? (O(), j(ee, { key: 1 }, [
                f.value ? (O(!0), j(ee, { key: 1 }, Ee(G.value, (N) => (O(), j("div", {
                  key: N.id,
                  class: "cfw-comment"
                }, [
                  h("div", mf, [
                    h("strong", null, V(N.author || "User"), 1),
                    Ot(" · " + V(R(N.createdAt)), 1)
                  ]),
                  h("div", gf, V(N.body), 1)
                ]))), 128)) : (O(), j("button", {
                  key: 0,
                  class: "cfw-comments-expand",
                  onClick: C[7] || (C[7] = (N) => f.value = !0)
                }, " Show " + V(G.value.length) + " previous comment" + V(G.value.length > 1 ? "s" : ""), 1))
              ], 64)) : oe("", !0)
            ])) : oe("", !0),
            e.issue.sourceIssue ? (O(), j("div", bf, [
              C[10] || (C[10] = h("div", { class: "cfw-is-section-label" }, "Source Item", -1)),
              h("a", {
                class: "cfw-is-pr-link",
                href: e.issue.sourceIssue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, " #" + V(e.issue.sourceIssue.number) + " " + V(e.issue.sourceIssue.title), 9, wf)
            ])) : oe("", !0),
            L.value.length ? (O(), j("div", vf, [
              C[11] || (C[11] = h("div", { class: "cfw-is-section-label" }, "Issue actions", -1)),
              h("div", xf, [
                (O(!0), j(ee, null, Ee(L.value, (N) => (O(), j("div", {
                  key: N.id
                }, [
                  h("button", {
                    class: "cfw-is-action-btn",
                    disabled: N.disabled || c.value,
                    onClick: (ve) => !N.disabled && W(e.issue.number, "issue", N.id)
                  }, V(N.label || N.id), 9, yf),
                  N.disabled && N.reason ? (O(), j("span", _f, V(N.reason), 1)) : oe("", !0)
                ]))), 128))
              ])
            ])) : oe("", !0),
            (me = e.issue.pullRequest) != null && me.url ? (O(), j("div", Sf, [
              C[12] || (C[12] = h("div", { class: "cfw-is-section-label" }, "Pull request", -1)),
              h("a", {
                class: "cfw-is-pr-link",
                href: e.issue.pullRequest.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "PR #" + V(e.issue.pullRequest.number) + " · " + V((e.issue.pullRequest.state || "").toLowerCase()) + V(e.issue.pullRequest.isDraft ? " · draft" : ""), 9, kf),
              P.value.length ? (O(), j("div", Cf, [
                (O(!0), j(ee, null, Ee(P.value, (N) => (O(), j("div", {
                  key: N.id
                }, [
                  h("button", {
                    class: "cfw-is-action-btn",
                    disabled: N.disabled || c.value,
                    onClick: (ve) => !N.disabled && W(e.issue.number, "pull_request", N.id)
                  }, V(N.label || N.id), 9, Tf),
                  N.disabled && N.reason ? (O(), j("span", Ef, V(N.reason), 1)) : oe("", !0)
                ]))), 128))
              ])) : oe("", !0)
            ])) : oe("", !0),
            d.value ? (O(), j("div", Af, V(d.value), 1)) : oe("", !0),
            h("button", {
              class: "cfw-mbs-close",
              onClick: C[8] || (C[8] = (N) => E.$emit("close"))
            }, "Close")
          ])) : e.filterMode ? (O(), j("div", Pf, [
            h("div", $f, [
              C[13] || (C[13] = h("div", { class: "cfw-fs-label" }, "View", -1)),
              h("div", If, [
                (O(!0), j(ee, null, Ee(w(Xc), ([N, ve]) => (O(), j("button", {
                  key: N,
                  class: Q(["cfw-fs-pill", { active: w(i).listView === N }]),
                  onClick: (J) => {
                    w(i).listView = N, w(o)(), E.$emit("filter-changed");
                  }
                }, V(ve), 11, Mf))), 128))
              ])
            ]),
            h("div", Of, [
              C[14] || (C[14] = h("div", { class: "cfw-fs-label" }, "Sort", -1)),
              h("div", Rf, [
                (O(!0), j(ee, null, Ee(w(Qc), ([N, ve]) => (O(), j("button", {
                  key: N,
                  class: Q(["cfw-fs-pill", { active: w(i).listSort === N }]),
                  onClick: (J) => {
                    w(i).listSort = N, w(o)(), E.$emit("filter-changed");
                  }
                }, V(ve), 11, Df))), 128))
              ])
            ]),
            h("div", jf, [
              C[15] || (C[15] = h("div", { class: "cfw-fs-label" }, "Status", -1)),
              h("div", Lf, [
                (O(!0), j(ee, null, Ee(w(Zc), ([N, ve]) => (O(), j("button", {
                  key: N,
                  class: Q(["cfw-fs-chip", { active: w(i).listStatusFilter.includes(N) }]),
                  onClick: (J) => ue(N)
                }, V(ve), 11, Ff))), 128))
              ])
            ]),
            h("button", {
              class: "cfw-mbs-close",
              style: { "margin-bottom": "8px" },
              onClick: F
            }, "Clear filters"),
            h("button", {
              class: "cfw-mbs-close",
              onClick: C[9] || (C[9] = (N) => E.$emit("close"))
            }, "Done")
          ])) : oe("", !0)
        ], 2)
      ], 64);
    };
  }
}), Vf = { class: "cfw-tab-body" }, Hf = { class: "cfw-m-settings" }, zf = {
  id: "cfw-m-token-status",
  class: "cfw-m-settings-token"
}, Uf = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Kf = { class: "cfw-m-hand-toggle" }, Wf = { class: "cfw-m-hand-toggle" }, Bf = { class: "cfw-m-swipe-settings" }, qf = { class: "cfw-m-swipe-row" }, Yf = ["value"], Jf = { class: "cfw-m-swipe-row" }, Gf = ["value"], Xf = { class: "cfw-m-swipe-row" }, Qf = ["value"], Zf = { class: "cfw-m-swipe-row" }, ea = ["value"], ta = /* @__PURE__ */ it({
  __name: "SettingsPane",
  emits: ["handedness", "token-changed"],
  setup(e, { emit: t }) {
    const s = t, n = Oe(), { persist: i } = rt(), { clearToken: o, promptToken: r } = No(), { onPanelTouchStart: l, onPanelTouchEnd: c } = On(), d = ae(() => {
      const T = n.adminToken;
      return T ? "Token is set: " + T.slice(0, 3) + "…" : "No token set.";
    });
    function f() {
      r(), s("token-changed");
    }
    function p() {
      window.confirm("Clear saved admin token?") && (o(), s("token-changed"));
    }
    const v = [
      { value: "done_archive", label: "Done / Archive" },
      { value: "pin_unpin", label: "Pin / Unpin" },
      { value: "comment", label: "Comment" },
      { value: "create_linked_item", label: "Create linked item" },
      { value: "mark_viewed", label: "Mark viewed" },
      { value: "none", label: "None" }
    ];
    return (T, m) => (O(), j("div", {
      id: "cfw-mv-settings",
      class: Q(["cfw-mv", { active: w(n).mobileTab === "settings" }])
    }, [
      h("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: m[0] || (m[0] = //@ts-ignore
        (...b) => w(l) && w(l)(...b)),
        onTouchend: m[1] || (m[1] = //@ts-ignore
        (...b) => w(c) && w(c)(...b))
      }, [...m[18] || (m[18] = [
        h("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      h("div", Vf, [
        h("div", Hf, [
          m[23] || (m[23] = h("h3", null, "Admin token", -1)),
          h("div", zf, V(d.value), 1),
          h("div", { class: "cfw-m-hand-toggle" }, [
            h("button", {
              class: "cfw-m-hand-btn",
              onClick: f
            }, "Update"),
            h("button", {
              class: "cfw-m-hand-btn",
              onClick: p
            }, "Clear")
          ]),
          m[24] || (m[24] = h("p", { class: "cfw-m-settings-note" }, "Token authenticates all widget actions.", -1)),
          m[25] || (m[25] = h("h3", null, "Capture Mode", -1)),
          h("div", Uf, [
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).mode === "technical_issue" }]),
              onClick: m[2] || (m[2] = (b) => {
                w(n).mode = "technical_issue", w(i)();
              })
            }, "Issue", 2),
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).mode === "personal_todo" }]),
              onClick: m[3] || (m[3] = (b) => {
                w(n).mode = "personal_todo", w(i)();
              })
            }, "Todo", 2),
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).mode === "feature_request" }]),
              onClick: m[4] || (m[4] = (b) => {
                w(n).mode = "feature_request", w(i)();
              })
            }, "Feature", 2)
          ]),
          m[26] || (m[26] = h("h3", null, "Button side", -1)),
          h("div", Kf, [
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).handedness === "left" }]),
              onClick: m[5] || (m[5] = (b) => T.$emit("handedness", "left"))
            }, "◀ Left", 2),
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).handedness === "right" }]),
              onClick: m[6] || (m[6] = (b) => T.$emit("handedness", "right"))
            }, "Right ▶", 2)
          ]),
          m[27] || (m[27] = h("p", { class: "cfw-m-settings-note" }, "Or swipe the open button left or right.", -1)),
          m[28] || (m[28] = h("h3", null, "Panel position", -1)),
          h("div", Wf, [
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).panelSnap === "top" }]),
              type: "button",
              onClick: m[7] || (m[7] = (b) => {
                w(n).panelSnap = "top", w(i)();
              })
            }, "▲ Top", 2),
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).panelSnap === "middle" }]),
              type: "button",
              onClick: m[8] || (m[8] = (b) => {
                w(n).panelSnap = "middle", w(i)();
              })
            }, "Middle", 2),
            h("button", {
              class: Q(["cfw-m-hand-btn", { active: w(n).panelSnap === "bottom" }]),
              type: "button",
              onClick: m[9] || (m[9] = (b) => {
                w(n).panelSnap = "bottom", w(i)();
              })
            }, "Bottom ▼", 2)
          ]),
          m[29] || (m[29] = h("p", { class: "cfw-m-settings-note" }, "Or swipe the panel handle up or down.", -1)),
          m[30] || (m[30] = h("h3", null, "Swipe Actions", -1)),
          h("div", Bf, [
            h("div", qf, [
              m[19] || (m[19] = h("label", null, "Short Right (→)", -1)),
              Re(h("select", {
                "onUpdate:modelValue": m[10] || (m[10] = (b) => w(n).swipeMapping.shortRight = b),
                class: "cfw-select",
                onChange: m[11] || (m[11] = (b) => w(i)())
              }, [
                (O(), j(ee, null, Ee(v, (b) => h("option", {
                  key: b.value,
                  value: b.value
                }, V(b.label), 9, Yf)), 64))
              ], 544), [
                [us, w(n).swipeMapping.shortRight]
              ])
            ]),
            h("div", Jf, [
              m[20] || (m[20] = h("label", null, "Long Right (→→)", -1)),
              Re(h("select", {
                "onUpdate:modelValue": m[12] || (m[12] = (b) => w(n).swipeMapping.longRight = b),
                class: "cfw-select",
                onChange: m[13] || (m[13] = (b) => w(i)())
              }, [
                (O(), j(ee, null, Ee(v, (b) => h("option", {
                  key: b.value,
                  value: b.value
                }, V(b.label), 9, Gf)), 64))
              ], 544), [
                [us, w(n).swipeMapping.longRight]
              ])
            ]),
            h("div", Xf, [
              m[21] || (m[21] = h("label", null, "Short Left (←)", -1)),
              Re(h("select", {
                "onUpdate:modelValue": m[14] || (m[14] = (b) => w(n).swipeMapping.shortLeft = b),
                class: "cfw-select",
                onChange: m[15] || (m[15] = (b) => w(i)())
              }, [
                (O(), j(ee, null, Ee(v, (b) => h("option", {
                  key: b.value,
                  value: b.value
                }, V(b.label), 9, Qf)), 64))
              ], 544), [
                [us, w(n).swipeMapping.shortLeft]
              ])
            ]),
            h("div", Zf, [
              m[22] || (m[22] = h("label", null, "Long Left (←←)", -1)),
              Re(h("select", {
                "onUpdate:modelValue": m[16] || (m[16] = (b) => w(n).swipeMapping.longLeft = b),
                class: "cfw-select",
                onChange: m[17] || (m[17] = (b) => w(i)())
              }, [
                (O(), j(ee, null, Ee(v, (b) => h("option", {
                  key: b.value,
                  value: b.value
                }, V(b.label), 9, ea)), 64))
              ], 544), [
                [us, w(n).swipeMapping.longLeft]
              ])
            ])
          ]),
          m[31] || (m[31] = h("div", { class: "cfw-m-gesture-ref" }, [
            h("h4", null, "Gesture Reference"),
            h("div", { class: "cfw-m-gesture-row" }, [
              h("span", null, "Short Swipe:"),
              Ot(),
              h("span", null, "Gentle flick (acts immediately)")
            ]),
            h("div", { class: "cfw-m-gesture-row" }, [
              h("span", null, "Long Swipe:"),
              Ot(),
              h("span", null, "Pull across screen to edge")
            ])
          ], -1))
        ])
      ])
    ], 2));
  }
}), sa = { class: "cfw-compose-header" }, na = { class: "cfw-compose-title" }, ia = {
  key: 0,
  class: "cfw-compose-context"
}, oa = { class: "cfw-compose-context-quote" }, ra = { class: "cfw-compose-body" }, la = {
  class: "cfw-textarea-wrap",
  style: { flex: "1", padding: "14px" }
}, ca = ["placeholder", "onKeydown"], fa = {
  class: "cfw-compose-actions",
  style: { padding: "14px", "border-top": "1px solid rgba(124,187,255,0.15)", display: "flex", "justify-content": "flex-end", gap: "8px" }
}, aa = ["disabled"], ua = /* @__PURE__ */ it({
  __name: "ComposeSheet",
  props: {
    open: { type: Boolean },
    mode: { type: String },
    issue: { type: [Object, null] }
  },
  emits: ["close", "action-done"],
  setup(e, { emit: t }) {
    const s = e, n = t, i = Oe(), { submitComment: o, createLinkedItem: r } = yt(), l = /* @__PURE__ */ U(null), c = ae(() => !!i.draftDescription.trim());
    At(() => s.open, (f) => {
      f && (i.draftDescription = "", Dt(() => {
        var p;
        return (p = l.value) == null ? void 0 : p.focus();
      }));
    });
    async function d() {
      if (!s.issue || i.creating) return;
      const f = i.draftDescription.trim();
      if (!f) {
        i.createError = "Please provide text.";
        return;
      }
      i.createError = "", i.creating = !0;
      try {
        if (s.mode === "comment")
          await o(s.issue.number, f);
        else {
          const p = f.split(`
`)[0], v = p.length > 50 ? p.slice(0, 50) + "..." : p;
          await r(s.issue.number, v, f, !1);
        }
        i.draftDescription = "", n("action-done"), n("close");
      } catch (p) {
        i.createError = p instanceof Error ? p.message : "Failed to submit";
      } finally {
        i.creating = !1;
      }
    }
    return (f, p) => (O(), j(ee, null, [
      h("div", {
        id: "cfw-compose-overlay",
        class: Q({ active: e.open }),
        onClick: p[0] || (p[0] = (v) => f.$emit("close"))
      }, null, 2),
      h("div", {
        id: "cfw-compose-sheet",
        class: Q({ active: e.open, "panel-left": w(i).handedness === "left" })
      }, [
        p[4] || (p[4] = h("div", { id: "cfw-compose-handle" }, null, -1)),
        h("div", sa, [
          h("span", na, V(e.mode === "comment" ? "New Comment" : "Create Linked Item"), 1),
          h("button", {
            class: "cfw-compose-close",
            onClick: p[1] || (p[1] = (v) => f.$emit("close"))
          }, "×")
        ]),
        e.issue ? (O(), j("div", ia, [
          h("div", oa, [
            h("strong", null, "#" + V(e.issue.number), 1),
            Ot(" " + V(e.issue.title), 1)
          ])
        ])) : oe("", !0),
        h("div", ra, [
          h("div", la, [
            Re(h("textarea", {
              ref_key: "descRef",
              ref: l,
              "onUpdate:modelValue": p[2] || (p[2] = (v) => w(i).draftDescription = v),
              placeholder: e.mode === "comment" ? "Write a comment..." : "Describe the linked item...",
              maxlength: "5000",
              style: { height: "100%", border: "none", background: "transparent", color: "#d9e7f7", "font-size": "14px", width: "100%", resize: "none", outline: "none", padding: "0" },
              onKeydown: [
                Rt(ut(d, ["ctrl"]), ["enter"]),
                Rt(ut(d, ["meta"]), ["enter"])
              ]
            }, null, 40, ca), [
              [Cs, w(i).draftDescription]
            ])
          ]),
          h("div", fa, [
            h("button", {
              class: "cfw-btn cfw-btn-outline",
              onClick: p[3] || (p[3] = (v) => f.$emit("close"))
            }, "Cancel"),
            h("button", {
              class: "cfw-btn cfw-btn-primary",
              disabled: !c.value,
              onClick: d
            }, V(w(i).creating ? "Submitting..." : "Submit"), 9, aa)
          ])
        ])
      ], 2)
    ], 64));
  }
}), da = { class: "cfw-tab-body" }, pa = {
  key: 0,
  id: "cfw-mv-text-form",
  class: "cfw-mf"
}, ha = { id: "cfw-mobile-nav" }, ma = /* @__PURE__ */ it({
  __name: "MobileWidget",
  setup(e, { expose: t }) {
    const s = Oe(), { persist: n } = rt(), { onPanelTouchStart: i, onPanelTouchEnd: o } = On(), { loadIssues: r, authorize: l } = yt(), c = xc(), d = yc(), f = Sc(), p = /* @__PURE__ */ U(null), v = ae(() => ({
      display: "flex",
      flexDirection: "column"
    }));
    function T(J) {
      s.mobileTab = J, J === "list" && r(!1), J === "text" && Dt(() => {
        var y;
        return (y = p.value) == null ? void 0 : y.focusTitle();
      }), n();
    }
    const m = /* @__PURE__ */ U(!1), b = /* @__PURE__ */ U("comment"), q = /* @__PURE__ */ U(null);
    function G(J, y) {
      b.value = J, q.value = y, m.value = !0, C(3);
    }
    async function R(J, y) {
      if (J !== "none") {
        if (J === "mark_viewed") {
          s.itemViews[y.number] = Date.now(), n();
          return;
        }
        if (J === "comment" || J === "create_linked_item") {
          G(J, y);
          return;
        }
        try {
          await yt().executeAction(y.number, J, "issue"), await r(!0);
        } catch (I) {
          console.warn("Action failed", I);
        }
      }
    }
    function L(J) {
      d.openIssue(J, !0), C(2);
    }
    function P(J) {
      d.openIssue(J), C(2);
    }
    function W() {
      d.openFilter(), C(2);
    }
    async function ge() {
      await r(!0);
    }
    function ue() {
      l() && (f.open(), C(1));
    }
    function F() {
      r(!0);
    }
    function E(J = !1) {
      var y;
      if (m.value = !1, d.close(), f.close(), !J) {
        const I = ((y = window.history.state) == null ? void 0 : y.widgetDepth) || 0;
        I > 0 && history.go(-I);
      }
    }
    function C(J) {
      var I;
      (((I = window.history.state) == null ? void 0 : I.widgetDepth) || 0) < J && history.pushState({ widgetDepth: J }, "");
    }
    function le(J) {
      var I;
      J === 3 ? m.value = !1 : J === 2 ? d.close() : J === 1 && E(!1);
      const y = ((I = window.history.state) == null ? void 0 : I.widgetDepth) || 0;
      y >= J && history.go(-(y - J + 1));
    }
    function me() {
      window.addEventListener("popstate", N);
    }
    function N(J) {
      var I;
      const y = ((I = window.history.state) == null ? void 0 : I.widgetDepth) || 0;
      y < 3 && m.value && (m.value = !1), y < 2 && d.sheetOpen.value && d.close(), y < 1 && f.isOpen.value && f.close();
    }
    An(() => {
      c.stopUndoCountdown(), window.removeEventListener("popstate", N);
    }), me();
    function ve(J) {
      if (!l()) return;
      const y = typeof J == "string" ? parseInt(J, 10) : J;
      f.isOpen.value || (f.open(), C(1)), T("list");
      const I = s.issues.find((te) => te.number === y);
      I ? P(I) : yt().loadIssues(!0).then(() => {
        const te = s.issues.find((Ye) => Ye.number === y);
        te && P(te);
      });
    }
    return t({ openItem: ve }), (J, y) => (O(), j(ee, null, [
      Re(h("button", {
        id: "cfw-mobile-launcher",
        type: "button",
        "aria-label": "Open feedback widget",
        class: Q({ "panel-left": w(s).handedness === "left" }),
        onTouchstartPassive: y[0] || (y[0] = //@ts-ignore
        (...I) => w(f).onTouchStart && w(f).onTouchStart(...I)),
        onTouchend: y[1] || (y[1] = //@ts-ignore
        (...I) => w(f).onTouchEnd && w(f).onTouchEnd(...I)),
        onClick: y[2] || (y[2] = (I) => ue())
      }, [...y[18] || (y[18] = [
        h("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor"
        }, [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
          })
        ], -1)
      ])], 34), [
        [Zs, !w(f).isOpen.value]
      ]),
      h("div", {
        id: "cfw-swipe-hint",
        class: Q({ visible: w(f).swipeHintVisible.value }),
        style: $t(w(f).swipeHintStyle.value)
      }, "← swipe →", 6),
      Re(h("div", {
        id: "cfw-desktop-backdrop",
        onClick: y[3] || (y[3] = (I) => E(!1))
      }, null, 512), [
        [Zs, w(f).isOpen.value]
      ]),
      Re(h("div", {
        id: "cfw-mobile",
        class: Q({ "panel-left": w(s).handedness === "left" }),
        style: $t(v.value)
      }, [
        h("div", {
          id: "cfw-mobile-body",
          class: Q({ "snap-bottom": w(s).panelSnap === "bottom", "snap-top": w(s).panelSnap === "top", "snap-middle": w(s).panelSnap === "middle" })
        }, [
          h("div", {
            id: "cfw-mv-text",
            class: Q(["cfw-mv", { active: w(s).mobileTab === "text" }])
          }, [
            h("div", {
              class: "cfw-panel-handle",
              onTouchstartPassive: y[4] || (y[4] = //@ts-ignore
              (...I) => w(i) && w(i)(...I)),
              onTouchend: y[5] || (y[5] = //@ts-ignore
              (...I) => w(o) && w(o)(...I))
            }, [...y[19] || (y[19] = [
              h("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32),
            h("div", da, [
              w(s).textCreateSuccess ? (O(), j("div", {
                key: 1,
                id: "cfw-mv-text-success",
                class: "cfw-m-success",
                onClick: y[7] || (y[7] = (I) => w(c).reset())
              }, [
                y[20] || (y[20] = h("div", { class: "cfw-m-success-ring" }, [
                  h("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor"
                  }, [
                    h("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2.5",
                      d: "M5 13l4 4L19 7"
                    })
                  ])
                ], -1)),
                y[21] || (y[21] = h("div", { class: "cfw-m-success-hint" }, "Tap to submit another", -1)),
                w(c).undoSecondsLeft.value > 0 && w(s).lastSubmissionId ? (O(), j("button", {
                  key: 0,
                  id: "cfw-mv-text-undo",
                  class: "cfw-m-undo-btn",
                  onClick: y[6] || (y[6] = ut((I) => w(c).undo(), ["stop"]))
                }, "Undo (" + V(w(c).undoSecondsLeft.value) + ")", 1)) : oe("", !0)
              ])) : (O(), j("div", pa, [
                _e(Ic, {
                  ref_key: "textFormRef",
                  ref: p,
                  mobile: !0,
                  "title-id": "cfw-m-title",
                  "desc-id": "cfw-m-description",
                  onCreate: w(c).submit
                }, null, 8, ["onCreate"])
              ]))
            ])
          ], 2),
          _e(Gc, {
            onRefresh: y[8] || (y[8] = (I) => w(r)(!0)),
            onOpenIssue: P,
            onOpenFilter: W,
            onSwipeAction: R
          }),
          _e(ta, {
            onHandedness: w(f).applyHandedness,
            onTokenChanged: F
          }, null, 8, ["onHandedness"])
        ], 2),
        h("nav", ha, [
          w(s).handedness === "left" ? (O(), j("button", {
            key: 0,
            class: "cfw-nav-btn",
            type: "button",
            onClick: y[9] || (y[9] = (I) => E(!1))
          }, [...y[22] || (y[22] = [
            h("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            h("span", null, "Close", -1)
          ])])) : oe("", !0),
          h("button", {
            id: "cfw-nav-text",
            class: Q(["cfw-nav-btn", { active: w(s).mobileTab === "text" }]),
            type: "button",
            onClick: y[10] || (y[10] = (I) => T("text"))
          }, [...y[23] || (y[23] = [
            h("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
              })
            ], -1),
            h("span", null, "Compose", -1)
          ])], 2),
          h("button", {
            id: "cfw-nav-list",
            class: Q(["cfw-nav-btn", { active: w(s).mobileTab === "list" }]),
            type: "button",
            onClick: y[11] || (y[11] = (I) => T("list"))
          }, [...y[24] || (y[24] = [
            h("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M4 6h16M4 12h16M4 18h16"
              })
            ], -1),
            h("span", null, "Activity", -1)
          ])], 2),
          h("button", {
            id: "cfw-nav-settings",
            class: Q(["cfw-nav-btn", { active: w(s).mobileTab === "settings" }]),
            type: "button",
            onClick: y[12] || (y[12] = (I) => T("settings"))
          }, [...y[25] || (y[25] = [
            h("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              }),
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              })
            ], -1),
            h("span", null, "Settings", -1)
          ])], 2),
          w(s).handedness !== "left" ? (O(), j("button", {
            key: 1,
            class: "cfw-nav-btn",
            type: "button",
            onClick: y[13] || (y[13] = (I) => E(!1))
          }, [...y[26] || (y[26] = [
            h("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor"
            }, [
              h("path", {
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                "stroke-width": "2",
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            h("span", null, "Close", -1)
          ])])) : oe("", !0)
        ])
      ], 6), [
        [Zs, w(f).isOpen.value]
      ]),
      _e(Nf, {
        open: w(d).sheetOpen.value,
        issue: w(d).sheetIssue.value,
        "filter-mode": w(d).filterMode.value,
        "edit-mode": w(d).editMode.value,
        onClose: y[14] || (y[14] = (I) => le(2)),
        onCancelEdit: y[15] || (y[15] = (I) => w(d).editMode.value = !1),
        onFilterChanged: y[16] || (y[16] = (I) => w(r)(!0)),
        onComposeSheet: G,
        onEditIssue: L
      }, null, 8, ["open", "issue", "filter-mode", "edit-mode"]),
      _e(ua, {
        open: m.value,
        mode: b.value,
        issue: q.value,
        onClose: y[17] || (y[17] = (I) => le(3)),
        onActionDone: ge
      }, null, 8, ["open", "mode", "issue"])
    ], 64));
  }
}), ga = /* @__PURE__ */ it({
  __name: "FeedbackWidget.ce",
  props: {
    widgetConfig: { type: Object }
  },
  setup(e, { expose: t }) {
    const s = e, n = Oe(), { restore: i } = rt(), { readToken: o } = No(), r = /* @__PURE__ */ U(null);
    return t({
      openItem(l) {
        r.value && r.value.openItem(l);
      }
    }), Ns(() => {
      s.widgetConfig && (n.init(s.widgetConfig), i(), o());
    }), (l, c) => (O(), ys(ma, {
      ref_key: "mobileWidgetRef",
      ref: r
    }, null, 512));
  }
}), ba = "*{box-sizing:border-box}:host{all:initial;font-family:IBM Plex Sans,Segoe UI,sans-serif}#cfw-desktop-backdrop{display:none}#cfw-mobile{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;background:#0a111d;color:#d9e7f7;font-family:IBM Plex Sans,Segoe UI,sans-serif}.cfw-panel-handle{height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none}.cfw-panel-handle-bar{width:36px;height:4px;background:#2f4864;border-radius:2px}#cfw-mobile-launcher{display:flex;position:fixed;bottom:20px;right:10px;width:34px;height:34px;border-radius:6px;background:#0a111de6;border:1px solid rgba(124,187,255,.4);color:#9ad2ff;align-items:center;justify-content:center;cursor:pointer;z-index:9998;box-shadow:0 8px 20px #02070e59;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);-webkit-tap-highlight-color:transparent}#cfw-mobile-launcher.panel-left{left:10px;right:auto}#cfw-mobile-launcher svg{width:14px;height:14px}#cfw-mobile-body{flex:1;overflow:hidden;position:relative}.cfw-mv{position:absolute;top:0;right:0;bottom:0;left:0;display:none;flex-direction:column;overflow:hidden}.cfw-mv.active{display:flex}.cfw-tab-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain}#cfw-mobile-body.snap-bottom .cfw-mv{justify-content:flex-end}#cfw-mobile-body.snap-bottom .cfw-tab-body{flex:0 0 auto;max-height:100%}#cfw-mobile-body.snap-top .cfw-tab-body{order:0;flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-body.snap-top .cfw-panel-handle{order:1}#cfw-mobile-body.snap-middle .cfw-mv{justify-content:center}#cfw-mobile-body.snap-middle .cfw-tab-body{flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-nav{height:56px;display:flex;border-top:1px solid rgba(124,187,255,.18);background:#0a111dfa;flex-shrink:0}.cfw-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:none;border:none;color:#7f9cbc;cursor:pointer;font-size:10px;padding:0;-webkit-tap-highlight-color:transparent}.cfw-nav-btn.active{color:#9ad2ff}.cfw-nav-btn svg{width:20px;height:20px}#cfw-ml-head{padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(124,187,255,.18);flex-shrink:0}#cfw-ml-head-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}#cfw-ml-head-actions{display:flex;gap:8px}#cfw-ml-head-actions button{height:30px;padding:0 10px;border:1px solid #2f4864;border-radius:6px;background:#0d1727;color:#9bb7d3;font-size:12px;cursor:pointer}#cfw-ml-head-actions button:disabled{opacity:.5}#cfw-ml-body{overflow-y:auto;overscroll-behavior-y:contain}#cfw-ml-ptr{height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9ad2ff;transition:height .15s ease;flex-shrink:0}#cfw-ml-ptr.cfw-ml-ptr-active{height:36px}.cfw-ml-empty{padding:32px 14px;font-size:13px;color:#7f9cbc;text-align:center;line-height:1.6}.cfw-ml-row-wrap{position:relative;border-bottom:1px solid #1a2d42}.cfw-ml-row-bg{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font-size:13px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.cfw-ml-row-bg.bg-left{background:#eab308;opacity:1;justify-content:flex-start}.cfw-ml-row-bg.bg-right{background:#3b82f6;opacity:1;justify-content:flex-end}.cfw-swipe-preview{display:flex;align-items:center;gap:8px}.cfw-swipe-preview.preview-left{flex-direction:row-reverse}.cfw-ml-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:12px 20px 4px;font-weight:600}.cfw-ml-row{position:relative;padding:14px 20px;background:#0a111d;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;-webkit-tap-highlight-color:transparent}.cfw-ml-row:active{background:#7cbbff0f}.cfw-ml-row-main{flex:1;min-width:0}.cfw-ml-row-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.cfw-ml-row-status{font-size:11px;color:#7cc4ff;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-ml-row-comments{font-size:11px;color:#7f9cbc}.cfw-ml-unread-dot{width:6px;height:6px;border-radius:50%;background:#ef4444}.cfw-ml-row-time{font-size:11px;color:#7f9cbc;margin-left:auto}.cfw-ml-row-title{font-size:14px;color:#d9e7f7;line-height:1.4;word-break:break-word}.cfw-ml-row-menu{background:none;border:none;color:#7f9cbc;font-size:18px;line-height:1;padding:4px 8px;cursor:pointer;margin-top:-2px}.cfw-desktop-menu{position:absolute;right:20px;top:36px;background:#0d1727;border:1px solid rgba(124,187,255,.28);border-radius:8px;padding:6px;display:flex;flex-direction:column;z-index:10;box-shadow:0 4px 12px #00000080}.cfw-desktop-menu button{background:none;border:none;color:#d9e7f7;padding:8px 12px;text-align:left;font-size:13px;cursor:pointer;border-radius:4px;white-space:nowrap}.cfw-desktop-menu button:hover{background:#7cbbff1a}#cfw-ml-error{margin:8px 14px 0}#cfw-mbs-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10001;display:none}#cfw-mbs-overlay.active{display:block}#cfw-mbs{position:fixed;bottom:0;left:0;right:0;z-index:10002;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 36px;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .25s ease}#cfw-mbs.active{transform:translateY(0)}#cfw-mbs-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px}.cfw-mf{display:flex;flex-direction:column;padding:14px}.cfw-mf input,.cfw-mf textarea,.cfw-mf select{width:100%;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;box-sizing:border-box;font-family:inherit}.cfw-mf input{height:44px;padding:0 14px;margin-bottom:10px;font-size:15px;flex-shrink:0}.cfw-textarea-wrap{margin-bottom:10px}.cfw-mf textarea{width:100%;height:130px;min-height:130px;max-height:40vh;padding:12px 14px;font-size:15px;resize:none;overflow-y:hidden;margin-bottom:0}.cfw-mf input::placeholder,.cfw-mf textarea::placeholder{color:#7f9cbc}.cfw-mf input:focus,.cfw-mf textarea:focus{outline:none;border-color:#4f7298}.cfw-mf-policy{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.cfw-mf-policy label{font-size:12px;color:#9bb7d3}.cfw-mf-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:8px;flex-shrink:0}.cfw-mf-error.active{display:block}.cfw-mf-actions{display:flex;gap:8px;flex-shrink:0}.cfw-mf-actions button{flex:1;height:48px;border-radius:8px;border:1px solid;font-size:14px;cursor:pointer}.cfw-m-success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.cfw-m-success-ring{width:80px;height:80px;border-radius:50%;background:#4ade801f;border:2px solid rgba(74,222,128,.35);display:flex;align-items:center;justify-content:center;margin-bottom:18px}.cfw-m-success-ring svg{width:44px;height:44px;color:#4ade80}.cfw-m-success-hint{font-size:13px;color:#7f9cbc}.cfw-m-undo-btn{margin-top:14px;padding:7px 18px;border-radius:8px;border:1px solid rgba(124,187,255,.35);background:transparent;color:#d9e7f7;font-size:12px;cursor:pointer}.cfw-m-undo-btn:hover{background:#7cbbff14}.cfw-m-voice{display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:14px}.cfw-m-vstatus{border:1px solid #2f4864;border-radius:12px;padding:16px;background:#0b1828a6;flex-shrink:0}.cfw-m-vstatus-line{font-size:15px;color:#d9e7f7;margin-bottom:8px}.cfw-m-vmeta{display:flex;justify-content:space-between;font-size:13px;color:#9bb7d3}.cfw-m-vcontrols{display:flex;gap:10px;flex-shrink:0}.cfw-m-vcontrols button{flex:1;height:52px;border-radius:10px;border:1px solid;font-size:15px;cursor:pointer}.cfw-m-vhint{font-size:12px;color:#7f9cbc;flex-shrink:0}.cfw-m-verror{font-size:13px;color:#ff9a9a;display:none;flex-shrink:0}.cfw-m-verror.active{display:block}.cfw-m-settings{padding:20px 14px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}.cfw-m-settings h3{margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}.cfw-m-settings-btn{height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;width:100%}.cfw-m-settings-btn:active{background:#0f1c2f}.cfw-m-settings-note{font-size:12px;color:#7f9cbc;margin:0}.cfw-m-settings-token{font-size:12px;color:#9bb7d3}.cfw-m-settings select{width:100%;height:44px;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;padding:0 12px;font-size:14px;font-family:inherit}.cfw-m-hand-toggle{display:flex;gap:8px}.cfw-m-hand-btn{flex:1;height:44px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#9bb7d3;font-size:14px;cursor:pointer}.cfw-m-hand-btn.active{border-color:#9ad2ff;background:#0f2035;color:#9ad2ff;font-weight:600}#cfw-swipe-hint{display:block;position:fixed;bottom:62px;font-size:11px;color:#9ad2ff;background:#0a111deb;border:1px solid rgba(124,187,255,.3);border-radius:6px;padding:4px 8px;pointer-events:none;opacity:0;transition:opacity .4s;white-space:nowrap;z-index:9999}#cfw-swipe-hint.visible{opacity:1}.cfw-fs-section{margin-bottom:18px}.cfw-fs-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:8px}.cfw-fs-pills{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:32px;padding:0 14px;font-size:12px;cursor:pointer}.cfw-fs-pill.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-fs-chips{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-chip{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:28px;padding:0 10px;font-size:11px;cursor:pointer}.cfw-fs-chip.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-num{font-size:11px;color:#7f9cbc;margin-bottom:6px;font-weight:500}.cfw-is-title{font-size:17px;color:#d9e7f7;margin-bottom:8px;word-break:break-word;text-decoration:none;display:block;line-height:1.3;font-weight:600}.cfw-is-title:hover{color:#9ad2ff;text-decoration:underline}.cfw-is-status{font-size:12px;color:#7cc4ff;margin-bottom:2px;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-is-section{margin-bottom:24px}.cfw-is-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:12px;font-weight:600}.cfw-is-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.cfw-is-primary-box{margin-bottom:24px}.cfw-is-action-row{display:flex;gap:8px}.cfw-is-w100{width:100%}.cfw-comments-section{border-top:1px solid rgba(124,187,255,.15);padding-top:20px}.cfw-comment{margin-bottom:16px;padding:12px;border-radius:8px;background:#7cbbff0a;border:1px solid rgba(124,187,255,.1)}.cfw-comment-newest{background:#7cbbff14;border-color:#7cbbff33}.cfw-comment-meta{font-size:12px;color:#7f9cbc;margin-bottom:6px}.cfw-comment-meta strong{color:#9bb7d3;font-weight:600}.cfw-comment-body{font-size:14px;color:#d9e7f7;line-height:1.5;white-space:pre-wrap;word-break:break-word}.cfw-comments-expand{width:100%;padding:8px;background:none;border:1px dashed rgba(124,187,255,.3);border-radius:6px;color:#9bb7d3;font-size:13px;cursor:pointer;margin-bottom:16px}.cfw-comments-expand:hover{background:#7cbbff0d;border-color:#7cbbff80;color:#d9e7f7}.cfw-is-actions{display:flex;flex-direction:column;gap:8px}.cfw-is-action-btn{width:100%;height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.4);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;text-align:left;padding:0 14px}.cfw-is-action-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-is-action-reason{font-size:11px;color:#7f9cbc;font-style:italic;display:block;padding:0 2px}.cfw-is-pr-link{color:#9ad2ff;text-decoration:underline;text-underline-offset:2px;font-size:13px}.cfw-is-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:10px}.cfw-is-error.active{display:block}.cfw-mbs-close{width:100%;height:48px;border-radius:8px;border:1px solid #2f4864;background:transparent;color:#9bb7d3;font-size:14px;cursor:pointer;margin-top:8px}@media(min-width:681px){#cfw-desktop-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9998;background:#02061773;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#cfw-mobile{top:0!important;bottom:0!important;width:420px;height:100%;border-radius:0;border:1px solid rgba(124,187,255,.28);box-shadow:0 0 40px #02070e8c;left:auto;right:0;border-left:1px solid rgba(124,187,255,.28);transition:none!important}#cfw-mobile.panel-left{left:0;right:auto;border-left:none;border-right:1px solid rgba(124,187,255,.28)}.cfw-panel-handle{display:none}#cfw-mobile-launcher{right:20px}#cfw-mobile-launcher.panel-left{left:20px;right:auto}#cfw-mbs{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-mbs.panel-left{left:0;right:auto}#cfw-mbs-overlay{background:#0206174d}#cfw-swipe-hint{display:none!important}#cfw-compose-sheet{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-compose-sheet.panel-left{left:0;right:auto}#cfw-compose-overlay{background:#0206174d}}#cfw-compose-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10005;display:none}#cfw-compose-overlay.active{display:block}#cfw-compose-sheet{position:fixed;bottom:0;left:0;right:0;z-index:10006;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 24px;max-height:85vh;transform:translateY(100%);transition:transform .25s ease;display:flex;flex-direction:column}#cfw-compose-sheet.active{transform:translateY(0)}#cfw-compose-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px;flex-shrink:0}.cfw-compose-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}.cfw-compose-title{font-size:14px;font-weight:600;color:#d9e7f7}.cfw-compose-close{background:none;border:none;color:#7f9cbc;font-size:24px;cursor:pointer;line-height:1;padding:4px;margin:-4px}.cfw-compose-context{margin-bottom:16px;flex-shrink:0}.cfw-compose-context-quote{font-size:13px;color:#7f9cbc;border-left:2px solid #2f4864;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cfw-compose-body{flex:1;overflow-y:auto;display:flex;flex-direction:column}.cfw-m-swipe-settings{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}.cfw-m-swipe-row{display:flex;justify-content:space-between;align-items:center}.cfw-m-swipe-row label{font-size:13px;color:#d9e7f7;font-weight:500}.cfw-m-swipe-row .cfw-select{width:140px}.cfw-m-gesture-ref{background:#7cbbff0d;border-radius:8px;padding:12px;margin-top:16px;border:1px dashed rgba(124,187,255,.2)}.cfw-m-gesture-ref h4{font-size:11px;text-transform:uppercase;color:#7cc4ff;margin:0 0 8px;font-weight:600;padding:0}.cfw-m-gesture-row{display:flex;justify-content:space-between;font-size:12px;color:#9bb7d3;margin-bottom:4px}.cfw-m-gesture-row:last-child{margin-bottom:0}", wa = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
}, _a = /* @__PURE__ */ wa(ga, [["styles", [ba]]]);
export {
  _a as F,
  ya as c,
  xa as d,
  Oe as u
};
