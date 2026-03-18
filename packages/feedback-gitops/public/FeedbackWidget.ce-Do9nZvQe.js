/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function vn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const s of e.split(",")) t[s] = 1;
  return (s) => s in t;
}
const fe = {}, Pt = [], Ye = () => {
}, Mo = () => !1, Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xn = (e) => e.startsWith("onUpdate:"), he = Object.assign, yn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Hi = Object.prototype.hasOwnProperty, oe = (e, t) => Hi.call(e, t), B = Array.isArray, At = (e) => cs(e) === "[object Map]", Ps = (e) => cs(e) === "[object Set]", Vn = (e) => cs(e) === "[object Date]", Q = (e) => typeof e == "function", be = (e) => typeof e == "string", Je = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", Eo = (e) => (ae(e) || Q(e)) && Q(e.then) && Q(e.catch), Po = Object.prototype.toString, cs = (e) => Po.call(e), Ui = (e) => cs(e).slice(8, -1), As = (e) => cs(e) === "[object Object]", Is = (e) => be(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Yt = /* @__PURE__ */ vn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Rs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ki = /-\w/g, je = Rs(
  (e) => e.replace(Ki, (t) => t.slice(1).toUpperCase())
), Wi = /\B([A-Z])/g, Ae = Rs(
  (e) => e.replace(Wi, "-$1").toLowerCase()
), Ao = Rs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ys = Rs(
  (e) => e ? `on${Ao(e)}` : ""
), pt = (e, t) => !Object.is(e, t), bs = (e, ...t) => {
  for (let s = 0; s < e.length; s++)
    e[s](...t);
}, Io = (e, t, s, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: s
  });
}, Os = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Hn = (e) => {
  const t = be(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Un;
const Ds = () => Un || (Un = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Dt(e) {
  if (B(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = be(n) ? Ji(n) : Dt(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (be(e) || ae(e))
    return e;
}
const Bi = /;(?![^(]*\))/g, qi = /:([^]+)/, Yi = /\/\*[^]*?\*\//g;
function Ji(e) {
  const t = {};
  return e.replace(Yi, "").split(Bi).forEach((s) => {
    if (s) {
      const n = s.split(qi);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function K(e) {
  let t = "";
  if (be(e))
    t = e;
  else if (B(e))
    for (let s = 0; s < e.length; s++) {
      const n = K(e[s]);
      n && (t += n + " ");
    }
  else if (ae(e))
    for (const s in e)
      e[s] && (t += s + " ");
  return t.trim();
}
const Gi = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xi = /* @__PURE__ */ vn(Gi);
function Ro(e) {
  return !!e || e === "";
}
function Qi(e, t) {
  if (e.length !== t.length) return !1;
  let s = !0;
  for (let n = 0; s && n < e.length; n++)
    s = as(e[n], t[n]);
  return s;
}
function as(e, t) {
  if (e === t) return !0;
  let s = Vn(e), n = Vn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Je(e), n = Je(t), s || n)
    return e === t;
  if (s = B(e), n = B(t), s || n)
    return s && n ? Qi(e, t) : !1;
  if (s = ae(e), n = ae(t), s || n) {
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
function Zi(e, t) {
  return e.findIndex((s) => as(s, t));
}
const Oo = (e) => !!(e && e.__v_isRef === !0), N = (e) => be(e) ? e : e == null ? "" : B(e) || ae(e) && (e.toString === Po || !Q(e.toString)) ? Oo(e) ? N(e.value) : JSON.stringify(e, Do, 2) : String(e), Do = (e, t) => Oo(t) ? Do(e, t.value) : At(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[Js(n, i) + " =>"] = o, s),
    {}
  )
} : Ps(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Js(s))
} : Je(t) ? Js(t) : ae(t) && !B(t) && !As(t) ? String(t) : t, Js = (e, t = "") => {
  var s;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Je(e) ? `Symbol(${(s = e.description) != null ? s : t})` : e
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
function er(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let de;
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
    this.flags |= 2, Kn(this), Uo(this);
    const t = de, s = Fe;
    de = this, Fe = !0;
    try {
      return this.fn();
    } finally {
      Ko(this), de = t, Fe = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        kn(t);
      this.deps = this.depsTail = void 0, Kn(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Gs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ln(this) && this.run();
  }
  get dirty() {
    return ln(this);
  }
}
let Vo = 0, Jt, Gt;
function Ho(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Gt, Gt = e;
    return;
  }
  e.next = Jt, Jt = e;
}
function _n() {
  Vo++;
}
function Sn() {
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
  for (; Jt; ) {
    let t = Jt;
    for (Jt = void 0; t; ) {
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
    n.version === -1 ? (n === s && (s = o), kn(n), tr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = o;
  }
  e.deps = t, e.depsTail = s;
}
function ln(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Wo(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Wo(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ss) || (e.globalVersion = ss, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ln(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = de, n = Fe;
  de = e, Fe = !0;
  try {
    Uo(e);
    const o = e.fn(e._value);
    (t.version === 0 || pt(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    de = s, Fe = n, Ko(e), e.flags &= -3;
  }
}
function kn(e, t = !1) {
  const { dep: s, prevSub: n, nextSub: o } = e;
  if (n && (n.nextSub = o, e.prevSub = void 0), o && (o.prevSub = n, e.nextSub = void 0), s.subs === e && (s.subs = n, !n && s.computed)) {
    s.computed.flags &= -5;
    for (let i = s.computed.deps; i; i = i.nextDep)
      kn(i, !0);
  }
  !t && !--s.sc && s.map && s.map.delete(s.key);
}
function tr(e) {
  const { prevDep: t, nextDep: s } = e;
  t && (t.nextDep = s, e.prevDep = void 0), s && (s.prevDep = t, e.nextDep = void 0);
}
let Fe = !0;
const Bo = [];
function rt() {
  Bo.push(Fe), Fe = !1;
}
function lt() {
  const e = Bo.pop();
  Fe = e === void 0 ? !0 : e;
}
function Kn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = de;
    de = void 0;
    try {
      t();
    } finally {
      de = s;
    }
  }
}
let ss = 0;
class sr {
  constructor(t, s) {
    this.sub = t, this.dep = s, this.version = s.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Cn {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!de || !Fe || de === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== de)
      s = this.activeLink = new sr(de, this), de.deps ? (s.prevDep = de.depsTail, de.depsTail.nextDep = s, de.depsTail = s) : de.deps = de.depsTail = s, qo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = de.depsTail, s.nextDep = void 0, de.depsTail.nextDep = s, de.depsTail = s, de.deps === s && (de.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ss++, this.notify(t);
  }
  notify(t) {
    _n();
    try {
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify() && s.sub.dep.notify();
    } finally {
      Sn();
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
const vs = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ Symbol(
  ""
), cn = /* @__PURE__ */ Symbol(
  ""
), ns = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, s) {
  if (Fe && de) {
    let n = vs.get(e);
    n || vs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new Cn()), o.map = n, o.key = s), o.track();
  }
}
function nt(e, t, s, n, o, i) {
  const r = vs.get(e);
  if (!r) {
    ss++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (_n(), t === "clear")
    r.forEach(l);
  else {
    const c = B(e), h = c && Is(s);
    if (c && s === "length") {
      const a = Number(n);
      r.forEach((p, v) => {
        (v === "length" || v === ns || !Je(v) && v >= a) && l(p);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), h && l(r.get(ns)), t) {
        case "add":
          c ? h && l(r.get("length")) : (l(r.get(St)), At(e) && l(r.get(cn)));
          break;
        case "delete":
          c || (l(r.get(St)), At(e) && l(r.get(cn)));
          break;
        case "set":
          At(e) && l(r.get(St));
          break;
      }
  }
  Sn();
}
function nr(e, t) {
  const s = vs.get(e);
  return s && s.get(t);
}
function $t(e) {
  const t = /* @__PURE__ */ se(e);
  return t === e ? t : (ye(t, "iterate", ns), /* @__PURE__ */ Re(e) ? t : t.map(Ne));
}
function Ls(e) {
  return ye(e = /* @__PURE__ */ se(e), "iterate", ns), e;
}
function ut(e, t) {
  return /* @__PURE__ */ ct(e) ? Lt(/* @__PURE__ */ it(e) ? Ne(t) : t) : Ne(t);
}
const or = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => ut(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => B(t) ? $t(t) : t)
    );
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = ut(this, e[1]), e));
  },
  every(e, t) {
    return et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return et(
      this,
      "filter",
      e,
      t,
      (s) => s.map((n) => ut(this, n)),
      arguments
    );
  },
  find(e, t) {
    return et(
      this,
      "find",
      e,
      t,
      (s) => ut(this, s),
      arguments
    );
  },
  findIndex(e, t) {
    return et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return et(
      this,
      "findLast",
      e,
      t,
      (s) => ut(this, s),
      arguments
    );
  },
  findLastIndex(e, t) {
    return et(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Qs(this, "includes", e);
  },
  indexOf(...e) {
    return Qs(this, "indexOf", e);
  },
  join(e) {
    return $t(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Qs(this, "lastIndexOf", e);
  },
  map(e, t) {
    return et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ut(this, "pop");
  },
  push(...e) {
    return Ut(this, "push", e);
  },
  reduce(e, ...t) {
    return Wn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Wn(this, "reduceRight", e, t);
  },
  shift() {
    return Ut(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ut(this, "splice", e);
  },
  toReversed() {
    return $t(this).toReversed();
  },
  toSorted(e) {
    return $t(this).toSorted(e);
  },
  toSpliced(...e) {
    return $t(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ut(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => ut(this, e));
  }
};
function Xs(e, t, s) {
  const n = Ls(e), o = n[t]();
  return n !== e && !/* @__PURE__ */ Re(e) && (o._next = o.next, o.next = () => {
    const i = o._next();
    return i.done || (i.value = s(i.value)), i;
  }), o;
}
const ir = Array.prototype;
function et(e, t, s, n, o, i) {
  const r = Ls(e), l = r !== e && !/* @__PURE__ */ Re(e), c = r[t];
  if (c !== ir[t]) {
    const p = c.apply(e, i);
    return l ? Ne(p) : p;
  }
  let h = s;
  r !== e && (l ? h = function(p, v) {
    return s.call(this, ut(e, p), v, e);
  } : s.length > 2 && (h = function(p, v) {
    return s.call(this, p, v, e);
  }));
  const a = c.call(r, h, n);
  return l && o ? o(a) : a;
}
function Wn(e, t, s, n) {
  const o = Ls(e);
  let i = s;
  return o !== e && (/* @__PURE__ */ Re(e) ? s.length > 3 && (i = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : i = function(r, l, c) {
    return s.call(this, r, ut(e, l), c, e);
  }), o[t](i, ...n);
}
function Qs(e, t, s) {
  const n = /* @__PURE__ */ se(e);
  ye(n, "iterate", ns);
  const o = n[t](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ Fs(s[0]) ? (s[0] = /* @__PURE__ */ se(s[0]), n[t](...s)) : o;
}
function Ut(e, t, s = []) {
  rt(), _n();
  const n = (/* @__PURE__ */ se(e))[t].apply(e, s);
  return Sn(), lt(), n;
}
const rr = /* @__PURE__ */ vn("__proto__,__v_isRef,__isVue"), Yo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Je)
);
function lr(e) {
  Je(e) || (e = String(e));
  const t = /* @__PURE__ */ se(this);
  return ye(t, "has", e), t.hasOwnProperty(e);
}
class Jo {
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
      return n === (o ? i ? wr : Zo : i ? Qo : Xo).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(n) ? t : void 0;
    const r = B(t);
    if (!o) {
      let c;
      if (r && (c = or[s]))
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
      /* @__PURE__ */ me(t) ? t : n
    );
    if ((Je(s) ? Yo.has(s) : rr(s)) || (o || ye(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ me(l)) {
      const c = r && Is(s) ? l : l.value;
      return o && ae(c) ? /* @__PURE__ */ fn(c) : c;
    }
    return ae(l) ? o ? /* @__PURE__ */ fn(l) : /* @__PURE__ */ js(l) : l;
  }
}
class Go extends Jo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    const r = B(t) && Is(s);
    if (!this._isShallow) {
      const h = /* @__PURE__ */ ct(i);
      if (!/* @__PURE__ */ Re(n) && !/* @__PURE__ */ ct(n) && (i = /* @__PURE__ */ se(i), n = /* @__PURE__ */ se(n)), !r && /* @__PURE__ */ me(i) && !/* @__PURE__ */ me(n))
        return h || (i.value = n), !0;
    }
    const l = r ? Number(s) < t.length : oe(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ me(t) ? t : o
    );
    return t === /* @__PURE__ */ se(o) && (l ? pt(n, i) && nt(t, "set", s, n) : nt(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = oe(t, s);
    t[s];
    const o = Reflect.deleteProperty(t, s);
    return o && n && nt(t, "delete", s, void 0), o;
  }
  has(t, s) {
    const n = Reflect.has(t, s);
    return (!Je(s) || !Yo.has(s)) && ye(t, "has", s), n;
  }
  ownKeys(t) {
    return ye(
      t,
      "iterate",
      B(t) ? "length" : St
    ), Reflect.ownKeys(t);
  }
}
class cr extends Jo {
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
const ar = /* @__PURE__ */ new Go(), fr = /* @__PURE__ */ new cr(), ur = /* @__PURE__ */ new Go(!0);
const an = (e) => e, ps = (e) => Reflect.getPrototypeOf(e);
function dr(e, t, s) {
  return function(...n) {
    const o = this.__v_raw, i = /* @__PURE__ */ se(o), r = At(i), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, h = o[e](...n), a = s ? an : t ? Lt : Ne;
    return !t && ye(
      i,
      "iterate",
      c ? cn : St
    ), he(
      // inheriting all iterator properties
      Object.create(h),
      {
        // iterator protocol
        next() {
          const { value: p, done: v } = h.next();
          return v ? { value: p, done: v } : {
            value: l ? [a(p[0]), a(p[1])] : a(p),
            done: v
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
function pr(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ se(i), l = /* @__PURE__ */ se(o);
      e || (pt(o, l) && ye(r, "get", o), ye(r, "get", l));
      const { has: c } = ps(r), h = t ? an : e ? Lt : Ne;
      if (c.call(r, o))
        return h(i.get(o));
      if (c.call(r, l))
        return h(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ye(/* @__PURE__ */ se(o), "iterate", St), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ se(i), l = /* @__PURE__ */ se(o);
      return e || (pt(o, l) && ye(r, "has", o), ye(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ se(l), h = t ? an : e ? Lt : Ne;
      return !e && ye(c, "iterate", St), l.forEach((a, p) => o.call(i, h(a), h(p), r));
    }
  };
  return he(
    s,
    e ? {
      add: ms("add"),
      set: ms("set"),
      delete: ms("delete"),
      clear: ms("clear")
    } : {
      add(o) {
        !t && !/* @__PURE__ */ Re(o) && !/* @__PURE__ */ ct(o) && (o = /* @__PURE__ */ se(o));
        const i = /* @__PURE__ */ se(this);
        return ps(i).has.call(i, o) || (i.add(o), nt(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !/* @__PURE__ */ Re(i) && !/* @__PURE__ */ ct(i) && (i = /* @__PURE__ */ se(i));
        const r = /* @__PURE__ */ se(this), { has: l, get: c } = ps(r);
        let h = l.call(r, o);
        h || (o = /* @__PURE__ */ se(o), h = l.call(r, o));
        const a = c.call(r, o);
        return r.set(o, i), h ? pt(i, a) && nt(r, "set", o, i) : nt(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ se(this), { has: r, get: l } = ps(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ se(o), c = r.call(i, o)), l && l.call(i, o);
        const h = i.delete(o);
        return c && nt(i, "delete", o, void 0), h;
      },
      clear() {
        const o = /* @__PURE__ */ se(this), i = o.size !== 0, r = o.clear();
        return i && nt(
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
    s[o] = dr(o, e, t);
  }), s;
}
function Tn(e, t) {
  const s = pr(e, t);
  return (n, o, i) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(
    oe(s, o) && o in n ? s : n,
    o,
    i
  );
}
const mr = {
  get: /* @__PURE__ */ Tn(!1, !1)
}, hr = {
  get: /* @__PURE__ */ Tn(!1, !0)
}, br = {
  get: /* @__PURE__ */ Tn(!0, !1)
};
const Xo = /* @__PURE__ */ new WeakMap(), Qo = /* @__PURE__ */ new WeakMap(), Zo = /* @__PURE__ */ new WeakMap(), wr = /* @__PURE__ */ new WeakMap();
function gr(e) {
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
  return e.__v_skip || !Object.isExtensible(e) ? 0 : gr(Ui(e));
}
// @__NO_SIDE_EFFECTS__
function js(e) {
  return /* @__PURE__ */ ct(e) ? e : zn(
    e,
    !1,
    ar,
    mr,
    Xo
  );
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
  return zn(
    e,
    !1,
    ur,
    hr,
    Qo
  );
}
// @__NO_SIDE_EFFECTS__
function fn(e) {
  return zn(
    e,
    !0,
    fr,
    br,
    Zo
  );
}
function zn(e, t, s, n, o) {
  if (!ae(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = vr(e);
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
function it(e) {
  return /* @__PURE__ */ ct(e) ? /* @__PURE__ */ it(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Re(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Fs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function se(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ se(t) : e;
}
function $n(e) {
  return !oe(e, "__v_skip") && Object.isExtensible(e) && Io(e, "__v_skip", !0), e;
}
const Ne = (e) => ae(e) ? /* @__PURE__ */ js(e) : e, Lt = (e) => ae(e) ? /* @__PURE__ */ fn(e) : e;
// @__NO_SIDE_EFFECTS__
function me(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  return yr(e, !1);
}
function yr(e, t) {
  return /* @__PURE__ */ me(e) ? e : new _r(e, t);
}
class _r {
  constructor(t, s) {
    this.dep = new Cn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ se(t), this._value = s ? t : Ne(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Re(t) || /* @__PURE__ */ ct(t);
    t = n ? t : /* @__PURE__ */ se(t), pt(t, s) && (this._rawValue = t, this._value = n ? t : Ne(t), this.dep.trigger());
  }
}
function b(e) {
  return /* @__PURE__ */ me(e) ? e.value : e;
}
const Sr = {
  get: (e, t, s) => t === "__v_raw" ? e : b(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return /* @__PURE__ */ me(o) && !/* @__PURE__ */ me(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function ei(e) {
  return /* @__PURE__ */ it(e) ? e : new Proxy(e, Sr);
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
  const t = B(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = Tr(e, s);
  return t;
}
class Cr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ se(t);
    let o = !0, i = t;
    if (!B(t) || !Is(String(s)))
      do
        o = !/* @__PURE__ */ Fs(i) || /* @__PURE__ */ Re(i);
      while (o && (i = i.__v_raw));
    this._shallow = o;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = b(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ me(this._raw[this._key])) {
      const s = this._object[this._key];
      if (/* @__PURE__ */ me(s)) {
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
class zr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Cn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ss - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    de !== this)
      return Ho(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Wo(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $r(e, t, s = !1) {
  let n, o;
  return Q(e) ? n = e : (n = e.get, o = e.set), new zr(n, o, s);
}
const hs = {}, xs = /* @__PURE__ */ new WeakMap();
let yt;
function Mr(e, t = !1, s = yt) {
  if (s) {
    let n = xs.get(s);
    n || xs.set(s, n = []), n.push(e);
  }
}
function Er(e, t, s = fe) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, h = (P) => o ? P : /* @__PURE__ */ Re(P) || o === !1 || o === 0 ? ot(P, 1) : ot(P);
  let a, p, v, T, d = !1, w = !1;
  if (/* @__PURE__ */ me(e) ? (p = () => e.value, d = /* @__PURE__ */ Re(e)) : /* @__PURE__ */ it(e) ? (p = () => h(e), d = !0) : B(e) ? (w = !0, d = e.some((P) => /* @__PURE__ */ it(P) || /* @__PURE__ */ Re(P)), p = () => e.map((P) => {
    if (/* @__PURE__ */ me(P))
      return P.value;
    if (/* @__PURE__ */ it(P))
      return h(P);
    if (Q(P))
      return c ? c(P, 2) : P();
  })) : Q(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (v) {
      rt();
      try {
        v();
      } finally {
        lt();
      }
    }
    const P = yt;
    yt = a;
    try {
      return c ? c(e, 3, [T]) : e(T);
    } finally {
      yt = P;
    }
  } : p = Ye, t && o) {
    const P = p, V = o === !0 ? 1 / 0 : o;
    p = () => ot(P(), V);
  }
  const U = Fo(), X = () => {
    a.stop(), U && U.active && yn(U.effects, a);
  };
  if (i && t) {
    const P = t;
    t = (...V) => {
      P(...V), X();
    };
  }
  let E = w ? new Array(e.length).fill(hs) : hs;
  const A = (P) => {
    if (!(!(a.flags & 1) || !a.dirty && !P))
      if (t) {
        const V = a.run();
        if (o || d || (w ? V.some((ge, pe) => pt(ge, E[pe])) : pt(V, E))) {
          v && v();
          const ge = yt;
          yt = a;
          try {
            const pe = [
              V,
              // pass undefined as the old value when it's changed for the first time
              E === hs ? void 0 : w && E[0] === hs ? [] : E,
              T
            ];
            E = V, c ? c(t, 3, pe) : (
              // @ts-expect-error
              t(...pe)
            );
          } finally {
            yt = ge;
          }
        }
      } else
        a.run();
  };
  return l && l(A), a = new No(p), a.scheduler = r ? () => r(A, !1) : A, T = (P) => Mr(P, !1, a), v = a.onStop = () => {
    const P = xs.get(a);
    if (P) {
      if (c)
        c(P, 4);
      else
        for (const V of P) V();
      xs.delete(a);
    }
  }, t ? n ? A(!0) : E = a.run() : r ? r(A.bind(null, !0), !0) : a.run(), X.pause = a.pause.bind(a), X.resume = a.resume.bind(a), X.stop = X, X;
}
function ot(e, t = 1 / 0, s) {
  if (t <= 0 || !ae(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ me(e))
    ot(e.value, t, s);
  else if (B(e))
    for (let n = 0; n < e.length; n++)
      ot(e[n], t, s);
  else if (Ps(e) || At(e))
    e.forEach((n) => {
      ot(n, t, s);
    });
  else if (As(e)) {
    for (const n in e)
      ot(e[n], t, s);
    for (const n of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, n) && ot(e[n], t, s);
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
    Ns(o, t, s);
  }
}
function Ge(e, t, s, n) {
  if (Q(e)) {
    const o = fs(e, t, s, n);
    return o && Eo(o) && o.catch((i) => {
      Ns(i, t, s);
    }), o;
  }
  if (B(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(Ge(e[i], t, s, n));
    return o;
  }
}
function Ns(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || fe;
  if (t) {
    let l = t.parent;
    const c = t.proxy, h = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let p = 0; p < a.length; p++)
          if (a[p](e, c, h) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      rt(), fs(i, null, 10, [
        e,
        c,
        h
      ]), lt();
      return;
    }
  }
  Pr(e, s, o, n, r);
}
function Pr(e, t, s, n = !0, o = !1) {
  if (o)
    throw e;
  console.error(e);
}
const Se = [];
let Be = -1;
const It = [];
let dt = null, Et = 0;
const ti = /* @__PURE__ */ Promise.resolve();
let ys = null;
function Tt(e) {
  const t = ys || ti;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ar(e) {
  let t = Be + 1, s = Se.length;
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
    !(e.flags & 2) && t >= os(s) ? Se.push(e) : Se.splice(Ar(t), 0, e), e.flags |= 1, si();
  }
}
function si() {
  ys || (ys = ti.then(oi));
}
function Ir(e) {
  B(e) ? It.push(...e) : dt && e.id === -1 ? dt.splice(Et + 1, 0, e) : e.flags & 1 || (It.push(e), e.flags |= 1), si();
}
function Bn(e, t, s = Be + 1) {
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
    if (It.length = 0, dt) {
      dt.push(...t);
      return;
    }
    for (dt = t, Et = 0; Et < dt.length; Et++) {
      const s = dt[Et];
      s.flags & 4 && (s.flags &= -2), s.flags & 8 || s(), s.flags &= -2;
    }
    dt = null, Et = 0;
  }
}
const os = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function oi(e) {
  try {
    for (Be = 0; Be < Se.length; Be++) {
      const t = Se[Be];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < Se.length; Be++) {
      const t = Se[Be];
      t && (t.flags &= -2);
    }
    Be = -1, Se.length = 0, ni(), ys = null, (Se.length || It.length) && oi();
  }
}
let Oe = null, ii = null;
function _s(e) {
  const t = Oe;
  return Oe = e, ii = e && e.type.__scopeId || null, t;
}
function Rr(e, t = Oe, s) {
  if (!t || e._n)
    return e;
  const n = (...o) => {
    n._d && no(-1);
    const i = _s(t);
    let r;
    try {
      r = e(...o);
    } finally {
      _s(i), n._d && no(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function De(e, t) {
  if (Oe === null)
    return e;
  const s = Ws(Oe), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, r, l, c = fe] = t[o];
    i && (Q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && ot(r), n.push({
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
    c && (rt(), Ge(c, s, 8, [
      e.el,
      l,
      e,
      t
    ]), lt());
  }
}
function Or(e, t) {
  if (Ce) {
    let s = Ce.provides;
    const n = Ce.parent && Ce.parent.provides;
    n === s && (s = Ce.provides = Object.create(n)), s[e] = t;
  }
}
function kt(e, t, s = !1) {
  const n = Pi();
  if (n || Ct) {
    let o = Ct ? Ct._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return s && Q(t) ? t.call(n && n.proxy) : t;
  }
}
function Dr() {
  return !!(Pi() || Ct);
}
const Lr = /* @__PURE__ */ Symbol.for("v-scx"), jr = () => kt(Lr);
function Rt(e, t, s) {
  return ri(e, t, s);
}
function ri(e, t, s = fe) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = he({}, s), c = t && n || !t && i !== "post";
  let h;
  if (ls) {
    if (i === "sync") {
      const T = jr();
      h = T.__watcherHandles || (T.__watcherHandles = []);
    } else if (!c) {
      const T = () => {
      };
      return T.stop = Ye, T.resume = Ye, T.pause = Ye, T;
    }
  }
  const a = Ce;
  l.call = (T, d, w) => Ge(T, a, d, w);
  let p = !1;
  i === "post" ? l.scheduler = (T) => {
    $e(T, a && a.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (T, d) => {
    d ? T() : Mn(T);
  }), l.augmentJob = (T) => {
    t && (T.flags |= 4), p && (T.flags |= 2, a && (T.id = a.uid, T.i = a));
  };
  const v = Er(e, t, l);
  return ls && (h ? h.push(v) : c && v()), v;
}
function Fr(e, t, s) {
  const n = this.proxy, o = be(e) ? e.includes(".") ? li(n, e) : () => n[e] : e.bind(n, n);
  let i;
  Q(t) ? i = t : (i = t.handler, s = t);
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
const Nr = /* @__PURE__ */ Symbol("_vte"), Vr = (e) => e.__isTeleport, Hr = /* @__PURE__ */ Symbol("_leaveCb");
function En(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, En(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function Xe(e, t) {
  return Q(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    he({ name: e.name }, t, { setup: e })
  ) : e;
}
function ci(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function qn(e, t) {
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
  const i = n.shapeFlag & 4 ? Ws(n.component) : n.el, r = o ? null : i, { i: l, r: c } = e, h = t && t.r, a = l.refs === fe ? l.refs = {} : l.refs, p = l.setupState, v = /* @__PURE__ */ se(p), T = p === fe ? Mo : (w) => qn(a, w) ? !1 : oe(v, w), d = (w, U) => !(U && qn(a, U));
  if (h != null && h !== c) {
    if (Yn(t), be(h))
      a[h] = null, T(h) && (p[h] = null);
    else if (/* @__PURE__ */ me(h)) {
      const w = t;
      d(h, w.k) && (h.value = null), w.k && (a[w.k] = null);
    }
  }
  if (Q(c))
    fs(c, l, 12, [r, a]);
  else {
    const w = be(c), U = /* @__PURE__ */ me(c);
    if (w || U) {
      const X = () => {
        if (e.f) {
          const E = w ? T(c) ? p[c] : a[c] : d() || !e.k ? c.value : a[e.k];
          if (o)
            B(E) && yn(E, i);
          else if (B(E))
            E.includes(i) || E.push(i);
          else if (w)
            a[c] = [i], T(c) && (p[c] = a[c]);
          else {
            const A = [i];
            d(c, e.k) && (c.value = A), e.k && (a[e.k] = A);
          }
        } else w ? (a[c] = r, T(c) && (p[c] = r)) : U && (d(c, e.k) && (c.value = r), e.k && (a[e.k] = r));
      };
      if (r) {
        const E = () => {
          X(), Ss.delete(e);
        };
        E.id = -1, Ss.set(e, E), $e(E, s);
      } else
        Yn(e), X();
    }
  }
}
function Yn(e) {
  const t = Ss.get(e);
  t && (t.flags |= 8, Ss.delete(e));
}
Ds().requestIdleCallback;
Ds().cancelIdleCallback;
const Qt = (e) => !!e.type.__asyncLoader, ai = (e) => e.type.__isKeepAlive;
function Ur(e, t) {
  fi(e, "a", t);
}
function Kr(e, t) {
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
  if (Vs(t, n, s), s) {
    let o = s.parent;
    for (; o && o.parent; )
      ai(o.parent.vnode) && Wr(n, t, s, o), o = o.parent;
  }
}
function Wr(e, t, s, n) {
  const o = Vs(
    t,
    e,
    n,
    !0
    /* prepend */
  );
  Pn(() => {
    yn(n[t], o);
  }, s);
}
function Vs(e, t, s = Ce, n = !1) {
  if (s) {
    const o = s[e] || (s[e] = []), i = t.__weh || (t.__weh = (...r) => {
      rt();
      const l = us(s), c = Ge(t, s, e, r);
      return l(), lt(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const at = (e) => (t, s = Ce) => {
  (!ls || e === "sp") && Vs(e, (...n) => t(...n), s);
}, Br = at("bm"), Hs = at("m"), qr = at(
  "bu"
), Yr = at("u"), Jr = at(
  "bum"
), Pn = at("um"), Gr = at(
  "sp"
), Xr = at("rtg"), Qr = at("rtc");
function Zr(e, t = Ce) {
  Vs("ec", e, t);
}
const el = /* @__PURE__ */ Symbol.for("v-ndc");
function Me(e, t, s, n) {
  let o;
  const i = s, r = B(e);
  if (r || be(e)) {
    const l = r && /* @__PURE__ */ it(e);
    let c = !1, h = !1;
    l && (c = !/* @__PURE__ */ Re(e), h = /* @__PURE__ */ ct(e), e = Ls(e)), o = new Array(e.length);
    for (let a = 0, p = e.length; a < p; a++)
      o[a] = t(
        c ? h ? Lt(Ne(e[a])) : Ne(e[a]) : e[a],
        a,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, i);
  } else if (ae(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, h = l.length; c < h; c++) {
        const a = l[c];
        o[c] = t(e[a], a, c, i);
      }
    }
  else
    o = [];
  return o;
}
const un = (e) => e ? Ai(e) ? Ws(e) : un(e.parent) : null, Zt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ he(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => un(e.parent),
    $root: (e) => un(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => di(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Mn(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Tt.bind(e.proxy)),
    $watch: (e) => Fr.bind(e)
  })
), Zs = (e, t) => e !== fe && !e.__isScriptSetup && oe(e, t), tl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: l, appContext: c } = e;
    if (t[0] !== "$") {
      const v = r[t];
      if (v !== void 0)
        switch (v) {
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
        if (Zs(n, t))
          return r[t] = 1, n[t];
        if (o !== fe && oe(o, t))
          return r[t] = 2, o[t];
        if (oe(i, t))
          return r[t] = 3, i[t];
        if (s !== fe && oe(s, t))
          return r[t] = 4, s[t];
        dn && (r[t] = 0);
      }
    }
    const h = Zt[t];
    let a, p;
    if (h)
      return t === "$attrs" && ye(e.attrs, "get", ""), h(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (s !== fe && oe(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      p = c.config.globalProperties, oe(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return Zs(o, t) ? (o[t] = s, !0) : n !== fe && oe(n, t) ? (n[t] = s, !0) : oe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || e !== fe && l[0] !== "$" && oe(e, l) || Zs(t, l) || oe(i, l) || oe(n, l) || oe(Zt, l) || oe(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : oe(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Jn(e) {
  return B(e) ? e.reduce(
    (t, s) => (t[s] = null, t),
    {}
  ) : e;
}
let dn = !0;
function sl(e) {
  const t = di(e), s = e.proxy, n = e.ctx;
  dn = !1, t.beforeCreate && Gn(t.beforeCreate, e, "bc");
  const {
    // state
    data: o,
    computed: i,
    methods: r,
    watch: l,
    provide: c,
    inject: h,
    // lifecycle
    created: a,
    beforeMount: p,
    mounted: v,
    beforeUpdate: T,
    updated: d,
    activated: w,
    deactivated: U,
    beforeDestroy: X,
    beforeUnmount: E,
    destroyed: A,
    unmounted: P,
    render: V,
    renderTracked: ge,
    renderTriggered: pe,
    errorCaptured: j,
    serverPrefetch: M,
    // public API
    expose: C,
    inheritAttrs: re,
    // assets
    components: we,
    directives: L,
    filters: ve
  } = t;
  if (h && nl(h, n, null), r)
    for (const J in r) {
      const ne = r[J];
      Q(ne) && (n[J] = ne.bind(s));
    }
  if (o) {
    const J = o.call(s, s);
    ae(J) && (e.data = /* @__PURE__ */ js(J));
  }
  if (dn = !0, i)
    for (const J in i) {
      const ne = i[J], Qe = Q(ne) ? ne.bind(s, s) : Q(ne.get) ? ne.get.bind(s, s) : Ye, wt = !Q(ne) && Q(ne.set) ? ne.set.bind(s) : Ye, Ze = ie({
        get: Qe,
        set: wt
      });
      Object.defineProperty(n, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ze.value,
        set: (q) => Ze.value = q
      });
    }
  if (l)
    for (const J in l)
      ui(l[J], n, s, J);
  if (c) {
    const J = Q(c) ? c.call(s) : c;
    Reflect.ownKeys(J).forEach((ne) => {
      Or(ne, J[ne]);
    });
  }
  a && Gn(a, e, "c");
  function ce(J, ne) {
    B(ne) ? ne.forEach((Qe) => J(Qe.bind(s))) : ne && J(ne.bind(s));
  }
  if (ce(Br, p), ce(Hs, v), ce(qr, T), ce(Yr, d), ce(Ur, w), ce(Kr, U), ce(Zr, j), ce(Qr, ge), ce(Xr, pe), ce(Jr, E), ce(Pn, P), ce(Gr, M), B(C))
    if (C.length) {
      const J = e.exposed || (e.exposed = {});
      C.forEach((ne) => {
        Object.defineProperty(J, ne, {
          get: () => s[ne],
          set: (Qe) => s[ne] = Qe,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  V && e.render === Ye && (e.render = V), re != null && (e.inheritAttrs = re), we && (e.components = we), L && (e.directives = L), M && ci(e);
}
function nl(e, t, s = Ye) {
  B(e) && (e = pn(e));
  for (const n in e) {
    const o = e[n];
    let i;
    ae(o) ? "default" in o ? i = kt(
      o.from || n,
      o.default,
      !0
    ) : i = kt(o.from || n) : i = kt(o), /* @__PURE__ */ me(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function Gn(e, t, s) {
  Ge(
    B(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function ui(e, t, s, n) {
  let o = n.includes(".") ? li(s, n) : () => s[n];
  if (be(e)) {
    const i = t[e];
    Q(i) && Rt(o, i);
  } else if (Q(e))
    Rt(o, e.bind(s));
  else if (ae(e))
    if (B(e))
      e.forEach((i) => ui(i, t, s, n));
    else {
      const i = Q(e.handler) ? e.handler.bind(s) : t[e.handler];
      Q(i) && Rt(o, i, e);
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
    (h) => ks(c, h, r, !0)
  ), ks(c, t, r)), ae(t) && i.set(t, c), c;
}
function ks(e, t, s, n = !1) {
  const { mixins: o, extends: i } = t;
  i && ks(e, i, s, !0), o && o.forEach(
    (r) => ks(e, r, s, !0)
  );
  for (const r in t)
    if (!(n && r === "expose")) {
      const l = ol[r] || s && s[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const ol = {
  data: Xn,
  props: Qn,
  emits: Qn,
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
  watch: rl,
  // provide / inject
  provide: Xn,
  inject: il
};
function Xn(e, t) {
  return t ? e ? function() {
    return he(
      Q(e) ? e.call(this, this) : e,
      Q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function il(e, t) {
  return Bt(pn(e), pn(t));
}
function pn(e) {
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
  return e ? he(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Qn(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : he(
    /* @__PURE__ */ Object.create(null),
    Jn(e),
    Jn(t ?? {})
  ) : t;
}
function rl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = he(/* @__PURE__ */ Object.create(null), e);
  for (const n in t)
    s[n] = _e(e[n], t[n]);
  return s;
}
function pi() {
  return {
    app: null,
    config: {
      isNativeTag: Mo,
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
  return function(n, o = null) {
    Q(n) || (n = he({}, n)), o != null && !ae(o) && (o = null);
    const i = pi(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const h = i.app = {
      _uid: ll++,
      _component: n,
      _props: o,
      _container: null,
      _context: i,
      _instance: null,
      version: Fl,
      get config() {
        return i.config;
      },
      set config(a) {
      },
      use(a, ...p) {
        return r.has(a) || (a && Q(a.install) ? (r.add(a), a.install(h, ...p)) : Q(a) && (r.add(a), a(h, ...p))), h;
      },
      mixin(a) {
        return i.mixins.includes(a) || i.mixins.push(a), h;
      },
      component(a, p) {
        return p ? (i.components[a] = p, h) : i.components[a];
      },
      directive(a, p) {
        return p ? (i.directives[a] = p, h) : i.directives[a];
      },
      mount(a, p, v) {
        if (!c) {
          const T = h._ceVNode || ke(n, o);
          return T.appContext = i, v === !0 ? v = "svg" : v === !1 && (v = void 0), e(T, a, v), c = !0, h._container = a, a.__vue_app__ = h, Ws(T.component);
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c && (Ge(
          l,
          h._instance,
          16
        ), e(null, h._container), delete h._container.__vue_app__);
      },
      provide(a, p) {
        return i.provides[a] = p, h;
      },
      runWithContext(a) {
        const p = Ct;
        Ct = h;
        try {
          return a();
        } finally {
          Ct = p;
        }
      }
    };
    return h;
  };
}
let Ct = null;
const al = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${je(t)}Modifiers`] || e[`${Ae(t)}Modifiers`];
function fl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || fe;
  let o = s;
  const i = t.startsWith("update:"), r = i && al(n, t.slice(7));
  r && (r.trim && (o = s.map((a) => be(a) ? a.trim() : a)), r.number && (o = s.map(Os)));
  let l, c = n[l = Ys(t)] || // also try camelCase event handler (#2249)
  n[l = Ys(je(t))];
  !c && i && (c = n[l = Ys(Ae(t))]), c && Ge(
    c,
    e,
    6,
    o
  );
  const h = n[l + "Once"];
  if (h) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ge(
      h,
      e,
      6,
      o
    );
  }
}
const ul = /* @__PURE__ */ new WeakMap();
function mi(e, t, s = !1) {
  const n = s ? ul : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let r = {}, l = !1;
  if (!Q(e)) {
    const c = (h) => {
      const a = mi(h, t, !0);
      a && (l = !0, he(r, a));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (ae(e) && n.set(e, null), null) : (B(i) ? i.forEach((c) => r[c] = null) : he(r, i), ae(e) && n.set(e, r), r);
}
function Us(e, t) {
  return !e || !Es(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), oe(e, t[0].toLowerCase() + t.slice(1)) || oe(e, Ae(t)) || oe(e, t));
}
function Zn(e) {
  const {
    type: t,
    vnode: s,
    proxy: n,
    withProxy: o,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: c,
    render: h,
    renderCache: a,
    props: p,
    data: v,
    setupState: T,
    ctx: d,
    inheritAttrs: w
  } = e, U = _s(e);
  let X, E;
  try {
    if (s.shapeFlag & 4) {
      const P = o || n, V = P;
      X = qe(
        h.call(
          V,
          P,
          a,
          p,
          T,
          v,
          d
        )
      ), E = l;
    } else {
      const P = t;
      X = qe(
        P.length > 1 ? P(
          p,
          { attrs: l, slots: r, emit: c }
        ) : P(
          p,
          null
        )
      ), E = t.props ? l : dl(l);
    }
  } catch (P) {
    es.length = 0, Ns(P, e, 1), X = ke(bt);
  }
  let A = X;
  if (E && w !== !1) {
    const P = Object.keys(E), { shapeFlag: V } = A;
    P.length && V & 7 && (i && P.some(xn) && (E = pl(
      E,
      i
    )), A = jt(A, E, !1, !0));
  }
  return s.dirs && (A = jt(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(s.dirs) : s.dirs), s.transition && En(A, s.transition), X = A, _s(U), X;
}
const dl = (e) => {
  let t;
  for (const s in e)
    (s === "class" || s === "style" || Es(s)) && ((t || (t = {}))[s] = e[s]);
  return t;
}, pl = (e, t) => {
  const s = {};
  for (const n in e)
    (!xn(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
  return s;
};
function ml(e, t, s) {
  const { props: n, children: o, component: i } = e, { props: r, children: l, patchFlag: c } = t, h = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? eo(n, r, h) : !!r;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        const v = a[p];
        if (hi(r, n, v) && !Us(h, v))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? eo(n, r, h) : !0 : !!r;
  return !1;
}
function eo(e, t, s) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < n.length; o++) {
    const i = n[o];
    if (hi(t, e, i) && !Us(s, i))
      return !0;
  }
  return !1;
}
function hi(e, t, s) {
  const n = e[s], o = t[s];
  return s === "style" && ae(n) && ae(o) ? !as(n, o) : n !== o;
}
function hl({ vnode: e, parent: t }, s) {
  for (; t; ) {
    const n = t.subTree;
    if (n.suspense && n.suspense.activeBranch === e && (n.el = e.el), n === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
}
const bi = {}, wi = () => Object.create(bi), gi = (e) => Object.getPrototypeOf(e) === bi;
function bl(e, t, s, n = !1) {
  const o = {}, i = wi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), vi(e, t, o, i);
  for (const r in e.propsOptions[0])
    r in o || (o[r] = void 0);
  s ? e.props = n ? o : /* @__PURE__ */ xr(o) : e.type.props ? e.props = o : e.props = i, e.attrs = i;
}
function wl(e, t, s, n) {
  const {
    props: o,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ se(o), [c] = e.propsOptions;
  let h = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const a = e.vnode.dynamicProps;
      for (let p = 0; p < a.length; p++) {
        let v = a[p];
        if (Us(e.emitsOptions, v))
          continue;
        const T = t[v];
        if (c)
          if (oe(i, v))
            T !== i[v] && (i[v] = T, h = !0);
          else {
            const d = je(v);
            o[d] = mn(
              c,
              l,
              d,
              T,
              e,
              !1
            );
          }
        else
          T !== i[v] && (i[v] = T, h = !0);
      }
    }
  } else {
    vi(e, t, o, i) && (h = !0);
    let a;
    for (const p in l)
      (!t || // for camelCase
      !oe(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = Ae(p)) === p || !oe(t, a))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[a] !== void 0) && (o[p] = mn(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (i !== l)
      for (const p in i)
        (!t || !oe(t, p)) && (delete i[p], h = !0);
  }
  h && nt(e.attrs, "set", "");
}
function vi(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if (Yt(c))
        continue;
      const h = t[c];
      let a;
      o && oe(o, a = je(c)) ? !i || !i.includes(a) ? s[a] = h : (l || (l = {}))[a] = h : Us(e.emitsOptions, c) || (!(c in n) || h !== n[c]) && (n[c] = h, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ se(s), h = l || fe;
    for (let a = 0; a < i.length; a++) {
      const p = i[a];
      s[p] = mn(
        o,
        c,
        p,
        h[p],
        e,
        !oe(h, p)
      );
    }
  }
  return r;
}
function mn(e, t, s, n, o, i) {
  const r = e[s];
  if (r != null) {
    const l = oe(r, "default");
    if (l && n === void 0) {
      const c = r.default;
      if (r.type !== Function && !r.skipFactory && Q(c)) {
        const { propsDefaults: h } = o;
        if (s in h)
          n = h[s];
        else {
          const a = us(o);
          n = h[s] = c.call(
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
const gl = /* @__PURE__ */ new WeakMap();
function xi(e, t, s = !1) {
  const n = s ? gl : t.propsCache, o = n.get(e);
  if (o)
    return o;
  const i = e.props, r = {}, l = [];
  let c = !1;
  if (!Q(e)) {
    const a = (p) => {
      c = !0;
      const [v, T] = xi(p, t, !0);
      he(r, v), T && l.push(...T);
    };
    !s && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!i && !c)
    return ae(e) && n.set(e, Pt), Pt;
  if (B(i))
    for (let a = 0; a < i.length; a++) {
      const p = je(i[a]);
      to(p) && (r[p] = fe);
    }
  else if (i)
    for (const a in i) {
      const p = je(a);
      if (to(p)) {
        const v = i[a], T = r[p] = B(v) || Q(v) ? { type: v } : he({}, v), d = T.type;
        let w = !1, U = !0;
        if (B(d))
          for (let X = 0; X < d.length; ++X) {
            const E = d[X], A = Q(E) && E.name;
            if (A === "Boolean") {
              w = !0;
              break;
            } else A === "String" && (U = !1);
          }
        else
          w = Q(d) && d.name === "Boolean";
        T[
          0
          /* shouldCast */
        ] = w, T[
          1
          /* shouldCastTrue */
        ] = U, (w || oe(T, "default")) && l.push(p);
      }
    }
  const h = [r, l];
  return ae(e) && n.set(e, h), h;
}
function to(e) {
  return e[0] !== "$" && !Yt(e);
}
const An = (e) => e === "_" || e === "_ctx" || e === "$stable", In = (e) => B(e) ? e.map(qe) : [qe(e)], vl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Rr((...o) => In(t(...o)), s);
  return n._c = !1, n;
}, yi = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (An(o)) continue;
    const i = e[o];
    if (Q(i))
      t[o] = vl(o, i, n);
    else if (i != null) {
      const r = In(i);
      t[o] = () => r;
    }
  }
}, _i = (e, t) => {
  const s = In(t);
  e.slots.default = () => s;
}, Si = (e, t, s) => {
  for (const n in t)
    (s || !An(n)) && (e[n] = t[n]);
}, xl = (e, t, s) => {
  const n = e.slots = wi();
  if (e.vnode.shapeFlag & 32) {
    const o = t._;
    o ? (Si(n, t, s), s && Io(n, "_", o, !0)) : yi(t, n);
  } else t && _i(e, t);
}, yl = (e, t, s) => {
  const { vnode: n, slots: o } = e;
  let i = !0, r = fe;
  if (n.shapeFlag & 32) {
    const l = t._;
    l ? s && l === 1 ? i = !1 : Si(o, t, s) : (i = !t.$stable, yi(t, o)), r = t;
  } else t && (_i(e, t), r = { default: 1 });
  if (i)
    for (const l in o)
      !An(l) && r[l] == null && delete o[l];
}, $e = Tl;
function _l(e) {
  return Sl(e);
}
function Sl(e, t) {
  const s = Ds();
  s.__VUE__ = !0;
  const {
    insert: n,
    remove: o,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: c,
    setText: h,
    setElementText: a,
    parentNode: p,
    nextSibling: v,
    setScopeId: T = Ye,
    insertStaticContent: d
  } = e, w = (f, m, g, S = null, x = null, y = null, O = void 0, I = null, z = !!m.dynamicChildren) => {
    if (f === m)
      return;
    f && !Kt(f, m) && (S = ds(f), q(f, x, y, !0), f = null), m.patchFlag === -2 && (z = !1, m.dynamicChildren = null);
    const { type: _, ref: W, shapeFlag: D } = m;
    switch (_) {
      case Ks:
        U(f, m, g, S);
        break;
      case bt:
        X(f, m, g, S);
        break;
      case tn:
        f == null && E(m, g, S, O);
        break;
      case te:
        we(
          f,
          m,
          g,
          S,
          x,
          y,
          O,
          I,
          z
        );
        break;
      default:
        D & 1 ? V(
          f,
          m,
          g,
          S,
          x,
          y,
          O,
          I,
          z
        ) : D & 6 ? L(
          f,
          m,
          g,
          S,
          x,
          y,
          O,
          I,
          z
        ) : (D & 64 || D & 128) && _.process(
          f,
          m,
          g,
          S,
          x,
          y,
          O,
          I,
          z,
          Vt
        );
    }
    W != null && x ? Xt(W, f && f.ref, y, m || f, !m) : W == null && f && f.ref != null && Xt(f.ref, null, y, f, !0);
  }, U = (f, m, g, S) => {
    if (f == null)
      n(
        m.el = l(m.children),
        g,
        S
      );
    else {
      const x = m.el = f.el;
      m.children !== f.children && h(x, m.children);
    }
  }, X = (f, m, g, S) => {
    f == null ? n(
      m.el = c(m.children || ""),
      g,
      S
    ) : m.el = f.el;
  }, E = (f, m, g, S) => {
    [f.el, f.anchor] = d(
      f.children,
      m,
      g,
      S,
      f.el,
      f.anchor
    );
  }, A = ({ el: f, anchor: m }, g, S) => {
    let x;
    for (; f && f !== m; )
      x = v(f), n(f, g, S), f = x;
    n(m, g, S);
  }, P = ({ el: f, anchor: m }) => {
    let g;
    for (; f && f !== m; )
      g = v(f), o(f), f = g;
    o(m);
  }, V = (f, m, g, S, x, y, O, I, z) => {
    if (m.type === "svg" ? O = "svg" : m.type === "math" && (O = "mathml"), f == null)
      ge(
        m,
        g,
        S,
        x,
        y,
        O,
        I,
        z
      );
    else {
      const _ = f.el && f.el._isVueCE ? f.el : null;
      try {
        _ && _._beginPatch(), M(
          f,
          m,
          x,
          y,
          O,
          I,
          z
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, ge = (f, m, g, S, x, y, O, I) => {
    let z, _;
    const { props: W, shapeFlag: D, transition: H, dirs: G } = f;
    if (z = f.el = r(
      f.type,
      y,
      W && W.is,
      W
    ), D & 8 ? a(z, f.children) : D & 16 && j(
      f.children,
      z,
      null,
      S,
      x,
      en(f, y),
      O,
      I
    ), G && vt(f, null, S, "created"), pe(z, f, f.scopeId, O, S), W) {
      for (const ue in W)
        ue !== "value" && !Yt(ue) && i(z, ue, null, W[ue], y, S);
      "value" in W && i(z, "value", null, W.value, y), (_ = W.onVnodeBeforeMount) && We(_, S, f);
    }
    G && vt(f, null, S, "beforeMount");
    const Z = kl(x, H);
    Z && H.beforeEnter(z), n(z, m, g), ((_ = W && W.onVnodeMounted) || Z || G) && $e(() => {
      _ && We(_, S, f), Z && H.enter(z), G && vt(f, null, S, "mounted");
    }, x);
  }, pe = (f, m, g, S, x) => {
    if (g && T(f, g), S)
      for (let y = 0; y < S.length; y++)
        T(f, S[y]);
    if (x) {
      let y = x.subTree;
      if (m === y || zi(y.type) && (y.ssContent === m || y.ssFallback === m)) {
        const O = x.vnode;
        pe(
          f,
          O,
          O.scopeId,
          O.slotScopeIds,
          x.parent
        );
      }
    }
  }, j = (f, m, g, S, x, y, O, I, z = 0) => {
    for (let _ = z; _ < f.length; _++) {
      const W = f[_] = I ? st(f[_]) : qe(f[_]);
      w(
        null,
        W,
        m,
        g,
        S,
        x,
        y,
        O,
        I
      );
    }
  }, M = (f, m, g, S, x, y, O) => {
    const I = m.el = f.el;
    let { patchFlag: z, dynamicChildren: _, dirs: W } = m;
    z |= f.patchFlag & 16;
    const D = f.props || fe, H = m.props || fe;
    let G;
    if (g && xt(g, !1), (G = H.onVnodeBeforeUpdate) && We(G, g, m, f), W && vt(m, f, g, "beforeUpdate"), g && xt(g, !0), (D.innerHTML && H.innerHTML == null || D.textContent && H.textContent == null) && a(I, ""), _ ? C(
      f.dynamicChildren,
      _,
      I,
      g,
      S,
      en(m, x),
      y
    ) : O || ne(
      f,
      m,
      I,
      null,
      g,
      S,
      en(m, x),
      y,
      !1
    ), z > 0) {
      if (z & 16)
        re(I, D, H, g, x);
      else if (z & 2 && D.class !== H.class && i(I, "class", null, H.class, x), z & 4 && i(I, "style", D.style, H.style, x), z & 8) {
        const Z = m.dynamicProps;
        for (let ue = 0; ue < Z.length; ue++) {
          const le = Z[ue], Te = D[le], ze = H[le];
          (ze !== Te || le === "value") && i(I, le, Te, ze, x, g);
        }
      }
      z & 1 && f.children !== m.children && a(I, m.children);
    } else !O && _ == null && re(I, D, H, g, x);
    ((G = H.onVnodeUpdated) || W) && $e(() => {
      G && We(G, g, m, f), W && vt(m, f, g, "updated");
    }, S);
  }, C = (f, m, g, S, x, y, O) => {
    for (let I = 0; I < m.length; I++) {
      const z = f[I], _ = m[I], W = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (z.type === te || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Kt(z, _) || // - In the case of a component, it could contain anything.
        z.shapeFlag & 198) ? p(z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      w(
        z,
        _,
        W,
        null,
        S,
        x,
        y,
        O,
        !0
      );
    }
  }, re = (f, m, g, S, x) => {
    if (m !== g) {
      if (m !== fe)
        for (const y in m)
          !Yt(y) && !(y in g) && i(
            f,
            y,
            m[y],
            null,
            x,
            S
          );
      for (const y in g) {
        if (Yt(y)) continue;
        const O = g[y], I = m[y];
        O !== I && y !== "value" && i(f, y, I, O, x, S);
      }
      "value" in g && i(f, "value", m.value, g.value, x);
    }
  }, we = (f, m, g, S, x, y, O, I, z) => {
    const _ = m.el = f ? f.el : l(""), W = m.anchor = f ? f.anchor : l("");
    let { patchFlag: D, dynamicChildren: H, slotScopeIds: G } = m;
    G && (I = I ? I.concat(G) : G), f == null ? (n(_, g, S), n(W, g, S), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      g,
      W,
      x,
      y,
      O,
      I,
      z
    )) : D > 0 && D & 64 && H && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren && f.dynamicChildren.length === H.length ? (C(
      f.dynamicChildren,
      H,
      g,
      x,
      y,
      O,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || x && m === x.subTree) && ki(
      f,
      m,
      !0
      /* shallow */
    )) : ne(
      f,
      m,
      g,
      W,
      x,
      y,
      O,
      I,
      z
    );
  }, L = (f, m, g, S, x, y, O, I, z) => {
    m.slotScopeIds = I, f == null ? m.shapeFlag & 512 ? x.ctx.activate(
      m,
      g,
      S,
      O,
      z
    ) : ve(
      m,
      g,
      S,
      x,
      y,
      O,
      z
    ) : Le(f, m, z);
  }, ve = (f, m, g, S, x, y, O) => {
    const I = f.component = Il(
      f,
      S,
      x
    );
    if (ai(f) && (I.ctx.renderer = Vt), Rl(I, !1, O), I.asyncDep) {
      if (x && x.registerDep(I, ce, O), !f.el) {
        const z = I.subTree = ke(bt);
        X(null, z, m, g), f.placeholder = z.el;
      }
    } else
      ce(
        I,
        f,
        m,
        g,
        x,
        y,
        O
      );
  }, Le = (f, m, g) => {
    const S = m.component = f.component;
    if (ml(f, m, g))
      if (S.asyncDep && !S.asyncResolved) {
        J(S, m, g);
        return;
      } else
        S.next = m, S.update();
    else
      m.el = f.el, S.vnode = m;
  }, ce = (f, m, g, S, x, y, O) => {
    const I = () => {
      if (f.isMounted) {
        let { next: D, bu: H, u: G, parent: Z, vnode: ue } = f;
        {
          const Ue = Ci(f);
          if (Ue) {
            D && (D.el = ue.el, J(f, D, O)), Ue.asyncDep.then(() => {
              $e(() => {
                f.isUnmounted || _();
              }, x);
            });
            return;
          }
        }
        let le = D, Te;
        xt(f, !1), D ? (D.el = ue.el, J(f, D, O)) : D = ue, H && bs(H), (Te = D.props && D.props.onVnodeBeforeUpdate) && We(Te, Z, D, ue), xt(f, !0);
        const ze = Zn(f), He = f.subTree;
        f.subTree = ze, w(
          He,
          ze,
          // parent may have changed if it's in a teleport
          p(He.el),
          // anchor may have changed if it's in a fragment
          ds(He),
          f,
          x,
          y
        ), D.el = ze.el, le === null && hl(f, ze.el), G && $e(G, x), (Te = D.props && D.props.onVnodeUpdated) && $e(
          () => We(Te, Z, D, ue),
          x
        );
      } else {
        let D;
        const { el: H, props: G } = m, { bm: Z, m: ue, parent: le, root: Te, type: ze } = f, He = Qt(m);
        xt(f, !1), Z && bs(Z), !He && (D = G && G.onVnodeBeforeMount) && We(D, le, m), xt(f, !0);
        {
          Te.ce && Te.ce._hasShadowRoot() && Te.ce._injectChildStyle(ze);
          const Ue = f.subTree = Zn(f);
          w(
            null,
            Ue,
            g,
            S,
            f,
            x,
            y
          ), m.el = Ue.el;
        }
        if (ue && $e(ue, x), !He && (D = G && G.onVnodeMounted)) {
          const Ue = m;
          $e(
            () => We(D, le, Ue),
            x
          );
        }
        (m.shapeFlag & 256 || le && Qt(le.vnode) && le.vnode.shapeFlag & 256) && f.a && $e(f.a, x), f.isMounted = !0, m = g = S = null;
      }
    };
    f.scope.on();
    const z = f.effect = new No(I);
    f.scope.off();
    const _ = f.update = z.run.bind(z), W = f.job = z.runIfDirty.bind(z);
    W.i = f, W.id = f.uid, z.scheduler = () => Mn(W), xt(f, !0), _();
  }, J = (f, m, g) => {
    m.component = f;
    const S = f.vnode.props;
    f.vnode = m, f.next = null, wl(f, m.props, S, g), yl(f, m.children, g), rt(), Bn(f), lt();
  }, ne = (f, m, g, S, x, y, O, I, z = !1) => {
    const _ = f && f.children, W = f ? f.shapeFlag : 0, D = m.children, { patchFlag: H, shapeFlag: G } = m;
    if (H > 0) {
      if (H & 128) {
        wt(
          _,
          D,
          g,
          S,
          x,
          y,
          O,
          I,
          z
        );
        return;
      } else if (H & 256) {
        Qe(
          _,
          D,
          g,
          S,
          x,
          y,
          O,
          I,
          z
        );
        return;
      }
    }
    G & 8 ? (W & 16 && gt(_, x, y), D !== _ && a(g, D)) : W & 16 ? G & 16 ? wt(
      _,
      D,
      g,
      S,
      x,
      y,
      O,
      I,
      z
    ) : gt(_, x, y, !0) : (W & 8 && a(g, ""), G & 16 && j(
      D,
      g,
      S,
      x,
      y,
      O,
      I,
      z
    ));
  }, Qe = (f, m, g, S, x, y, O, I, z) => {
    f = f || Pt, m = m || Pt;
    const _ = f.length, W = m.length, D = Math.min(_, W);
    let H;
    for (H = 0; H < D; H++) {
      const G = m[H] = z ? st(m[H]) : qe(m[H]);
      w(
        f[H],
        G,
        g,
        null,
        x,
        y,
        O,
        I,
        z
      );
    }
    _ > W ? gt(
      f,
      x,
      y,
      !0,
      !1,
      D
    ) : j(
      m,
      g,
      S,
      x,
      y,
      O,
      I,
      z,
      D
    );
  }, wt = (f, m, g, S, x, y, O, I, z) => {
    let _ = 0;
    const W = m.length;
    let D = f.length - 1, H = W - 1;
    for (; _ <= D && _ <= H; ) {
      const G = f[_], Z = m[_] = z ? st(m[_]) : qe(m[_]);
      if (Kt(G, Z))
        w(
          G,
          Z,
          g,
          null,
          x,
          y,
          O,
          I,
          z
        );
      else
        break;
      _++;
    }
    for (; _ <= D && _ <= H; ) {
      const G = f[D], Z = m[H] = z ? st(m[H]) : qe(m[H]);
      if (Kt(G, Z))
        w(
          G,
          Z,
          g,
          null,
          x,
          y,
          O,
          I,
          z
        );
      else
        break;
      D--, H--;
    }
    if (_ > D) {
      if (_ <= H) {
        const G = H + 1, Z = G < W ? m[G].el : S;
        for (; _ <= H; )
          w(
            null,
            m[_] = z ? st(m[_]) : qe(m[_]),
            g,
            Z,
            x,
            y,
            O,
            I,
            z
          ), _++;
      }
    } else if (_ > H)
      for (; _ <= D; )
        q(f[_], x, y, !0), _++;
    else {
      const G = _, Z = _, ue = /* @__PURE__ */ new Map();
      for (_ = Z; _ <= H; _++) {
        const Pe = m[_] = z ? st(m[_]) : qe(m[_]);
        Pe.key != null && ue.set(Pe.key, _);
      }
      let le, Te = 0;
      const ze = H - Z + 1;
      let He = !1, Ue = 0;
      const Ht = new Array(ze);
      for (_ = 0; _ < ze; _++) Ht[_] = 0;
      for (_ = G; _ <= D; _++) {
        const Pe = f[_];
        if (Te >= ze) {
          q(Pe, x, y, !0);
          continue;
        }
        let Ke;
        if (Pe.key != null)
          Ke = ue.get(Pe.key);
        else
          for (le = Z; le <= H; le++)
            if (Ht[le - Z] === 0 && Kt(Pe, m[le])) {
              Ke = le;
              break;
            }
        Ke === void 0 ? q(Pe, x, y, !0) : (Ht[Ke - Z] = _ + 1, Ke >= Ue ? Ue = Ke : He = !0, w(
          Pe,
          m[Ke],
          g,
          null,
          x,
          y,
          O,
          I,
          z
        ), Te++);
      }
      const jn = He ? Cl(Ht) : Pt;
      for (le = jn.length - 1, _ = ze - 1; _ >= 0; _--) {
        const Pe = Z + _, Ke = m[Pe], Fn = m[Pe + 1], Nn = Pe + 1 < W ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Fn.el || Ti(Fn)
        ) : S;
        Ht[_] === 0 ? w(
          null,
          Ke,
          g,
          Nn,
          x,
          y,
          O,
          I,
          z
        ) : He && (le < 0 || _ !== jn[le] ? Ze(Ke, g, Nn, 2) : le--);
      }
    }
  }, Ze = (f, m, g, S, x = null) => {
    const { el: y, type: O, transition: I, children: z, shapeFlag: _ } = f;
    if (_ & 6) {
      Ze(f.component.subTree, m, g, S);
      return;
    }
    if (_ & 128) {
      f.suspense.move(m, g, S);
      return;
    }
    if (_ & 64) {
      O.move(f, m, g, Vt);
      return;
    }
    if (O === te) {
      n(y, m, g);
      for (let D = 0; D < z.length; D++)
        Ze(z[D], m, g, S);
      n(f.anchor, m, g);
      return;
    }
    if (O === tn) {
      A(f, m, g);
      return;
    }
    if (S !== 2 && _ & 1 && I)
      if (S === 0)
        I.beforeEnter(y), n(y, m, g), $e(() => I.enter(y), x);
      else {
        const { leave: D, delayLeave: H, afterLeave: G } = I, Z = () => {
          f.ctx.isUnmounted ? o(y) : n(y, m, g);
        }, ue = () => {
          y._isLeaving && y[Hr](
            !0
            /* cancelled */
          ), D(y, () => {
            Z(), G && G();
          });
        };
        H ? H(y, Z, ue) : ue();
      }
    else
      n(y, m, g);
  }, q = (f, m, g, S = !1, x = !1) => {
    const {
      type: y,
      props: O,
      ref: I,
      children: z,
      dynamicChildren: _,
      shapeFlag: W,
      patchFlag: D,
      dirs: H,
      cacheIndex: G
    } = f;
    if (D === -2 && (x = !1), I != null && (rt(), Xt(I, null, g, f, !0), lt()), G != null && (m.renderCache[G] = void 0), W & 256) {
      m.ctx.deactivate(f);
      return;
    }
    const Z = W & 1 && H, ue = !Qt(f);
    let le;
    if (ue && (le = O && O.onVnodeBeforeUnmount) && We(le, m, f), W & 6)
      zt(f.component, g, S);
    else {
      if (W & 128) {
        f.suspense.unmount(g, S);
        return;
      }
      Z && vt(f, null, m, "beforeUnmount"), W & 64 ? f.type.remove(
        f,
        m,
        g,
        Vt,
        S
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== te || D > 0 && D & 64) ? gt(
        _,
        m,
        g,
        !1,
        !0
      ) : (y === te && D & 384 || !x && W & 16) && gt(z, m, g), S && k(f);
    }
    (ue && (le = O && O.onVnodeUnmounted) || Z) && $e(() => {
      le && We(le, m, f), Z && vt(f, null, m, "unmounted");
    }, g);
  }, k = (f) => {
    const { type: m, el: g, anchor: S, transition: x } = f;
    if (m === te) {
      Y(g, S);
      return;
    }
    if (m === tn) {
      P(f);
      return;
    }
    const y = () => {
      o(g), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (f.shapeFlag & 1 && x && !x.persisted) {
      const { leave: O, delayLeave: I } = x, z = () => O(g, y);
      I ? I(f.el, y, z) : z();
    } else
      y();
  }, Y = (f, m) => {
    let g;
    for (; f !== m; )
      g = v(f), o(f), f = g;
    o(m);
  }, zt = (f, m, g) => {
    const { bum: S, scope: x, job: y, subTree: O, um: I, m: z, a: _ } = f;
    so(z), so(_), S && bs(S), x.stop(), y && (y.flags |= 8, q(O, f, m, g)), I && $e(I, m), $e(() => {
      f.isUnmounted = !0;
    }, m);
  }, gt = (f, m, g, S = !1, x = !1, y = 0) => {
    for (let O = y; O < f.length; O++)
      q(f[O], m, g, S, x);
  }, ds = (f) => {
    if (f.shapeFlag & 6)
      return ds(f.component.subTree);
    if (f.shapeFlag & 128)
      return f.suspense.next();
    const m = v(f.anchor || f.el), g = m && m[Nr];
    return g ? v(g) : m;
  };
  let qs = !1;
  const Ln = (f, m, g) => {
    let S;
    f == null ? m._vnode && (q(m._vnode, null, null, !0), S = m._vnode.component) : w(
      m._vnode || null,
      f,
      m,
      null,
      null,
      null,
      g
    ), m._vnode = f, qs || (qs = !0, Bn(S), ni(), qs = !1);
  }, Vt = {
    p: w,
    um: q,
    m: Ze,
    r: k,
    mt: ve,
    mc: j,
    pc: ne,
    pbc: C,
    n: ds,
    o: e
  };
  return {
    render: Ln,
    hydrate: void 0,
    createApp: cl(Ln)
  };
}
function en({ type: e, props: t }, s) {
  return s === "svg" && e === "foreignObject" || s === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : s;
}
function xt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (B(n) && B(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = st(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && ki(r, l)), l.type === Ks && (l.patchFlag === -1 && (l = o[i] = st(l)), l.el = r.el), l.type === bt && !l.el && (l.el = r.el);
    }
}
function Cl(e) {
  const t = e.slice(), s = [0];
  let n, o, i, r, l;
  const c = e.length;
  for (n = 0; n < c; n++) {
    const h = e[n];
    if (h !== 0) {
      if (o = s[s.length - 1], e[o] < h) {
        t[n] = o, s.push(n);
        continue;
      }
      for (i = 0, r = s.length - 1; i < r; )
        l = i + r >> 1, e[s[l]] < h ? i = l + 1 : r = l;
      h < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), s[i] = n);
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
function so(e) {
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
function Tl(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : Ir(e);
}
const te = /* @__PURE__ */ Symbol.for("v-fgt"), Ks = /* @__PURE__ */ Symbol.for("v-txt"), bt = /* @__PURE__ */ Symbol.for("v-cmt"), tn = /* @__PURE__ */ Symbol.for("v-stc"), es = [];
let Ie = null;
function $(e = !1) {
  es.push(Ie = e ? null : []);
}
function zl() {
  es.pop(), Ie = es[es.length - 1] || null;
}
let is = 1;
function no(e, t = !1) {
  is += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function $i(e) {
  return e.dynamicChildren = is > 0 ? Ie || Pt : null, zl(), is > 0 && Ie && Ie.push(e), e;
}
function R(e, t, s, n, o, i) {
  return $i(
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
  return $i(
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
function Mi(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Kt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, ws = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? be(e) || /* @__PURE__ */ me(e) || Q(e) ? { i: Oe, r: e, k: t, f: !!s } : e : null);
function u(e, t = null, s = null, n = 0, o = null, i = e === te ? 0 : 1, r = !1, l = !1) {
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
    ctx: Oe
  };
  return l ? (Rn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= be(s) ? 8 : 16), is > 0 && // avoid a block node from tracking itself
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
  if ((!e || e === el) && (e = bt), Mi(e)) {
    const l = jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Rn(l, s), is > 0 && !i && Ie && (l.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = l : Ie.push(l)), l.patchFlag = -2, l;
  }
  if (jl(e) && (e = e.__vccOpts), t) {
    t = Ml(t);
    let { class: l, style: c } = t;
    l && !be(l) && (t.class = K(l)), ae(c) && (/* @__PURE__ */ Fs(c) && !B(c) && (c = he({}, c)), t.style = Dt(c));
  }
  const r = be(e) ? 1 : zi(e) ? 128 : Vr(e) ? 64 : ae(e) ? 4 : Q(e) ? 2 : 0;
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
function Ml(e) {
  return e ? /* @__PURE__ */ Fs(e) || gi(e) ? he({}, e) : e : null;
}
function jt(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = e, h = t ? El(o || {}, t) : o, a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: h,
    key: h && Ei(h),
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
    patchFlag: t && e.type !== te ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && jt(e.ssContent),
    ssFallback: e.ssFallback && jt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && n && En(
    a,
    c.clone(a)
  ), a;
}
function Ft(e = " ", t = 0) {
  return ke(Ks, null, e, t);
}
function ee(e = "", t = !1) {
  return t ? ($(), rs(bt, null, e)) : ke(bt, null, e);
}
function qe(e) {
  return e == null || typeof e == "boolean" ? ke(bt) : B(e) ? ke(
    te,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Mi(e) ? st(e) : ke(Ks, null, String(e));
}
function st(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : jt(e);
}
function Rn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (B(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Rn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !gi(t) ? t._ctx = Oe : o === 3 && Oe && (Oe.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Q(t) ? (t = { default: t, _ctx: Oe }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ft(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function El(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = K([t.class, n.class]));
      else if (o === "style")
        t.style = Dt([t.style, n.style]);
      else if (Es(o)) {
        const i = t[o], r = n[o];
        r && i !== r && !(B(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function We(e, t, s, n = null) {
  Ge(e, t, 7, [
    s,
    n
  ]);
}
const Pl = pi();
let Al = 0;
function Il(e, t, s) {
  const n = e.type, o = (t ? t.appContext : e.appContext) || Pl, i = {
    uid: Al++,
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
    propsDefaults: fe,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: fe,
    data: fe,
    props: fe,
    attrs: fe,
    slots: fe,
    refs: fe,
    setupState: fe,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = fl.bind(null, i), e.ce && e.ce(i), i;
}
let Ce = null;
const Pi = () => Ce || Oe;
let Cs, hn;
{
  const e = Ds(), t = (s, n) => {
    let o;
    return (o = e[s]) || (o = e[s] = []), o.push(n), (i) => {
      o.length > 1 ? o.forEach((r) => r(i)) : o[0](i);
    };
  };
  Cs = t(
    "__VUE_INSTANCE_SETTERS__",
    (s) => Ce = s
  ), hn = t(
    "__VUE_SSR_SETTERS__",
    (s) => ls = s
  );
}
const us = (e) => {
  const t = Ce;
  return Cs(e), e.scope.on(), () => {
    e.scope.off(), Cs(t);
  };
}, oo = () => {
  Ce && Ce.scope.off(), Cs(null);
};
function Ai(e) {
  return e.vnode.shapeFlag & 4;
}
let ls = !1;
function Rl(e, t = !1, s = !1) {
  t && hn(t);
  const { props: n, children: o } = e.vnode, i = Ai(e);
  bl(e, n, i, t), xl(e, o, s || t);
  const r = i ? Ol(e, t) : void 0;
  return t && hn(!1), r;
}
function Ol(e, t) {
  const s = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, tl);
  const { setup: n } = s;
  if (n) {
    rt();
    const o = e.setupContext = n.length > 1 ? Ll(e) : null, i = us(e), r = fs(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Eo(r);
    if (lt(), i(), (l || e.sp) && !Qt(e) && ci(e), l) {
      if (r.then(oo, oo), t)
        return r.then((c) => {
          io(e, c);
        }).catch((c) => {
          Ns(c, e, 0);
        });
      e.asyncDep = r;
    } else
      io(e, r);
  } else
    Ii(e);
}
function io(e, t, s) {
  Q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ae(t) && (e.setupState = ei(t)), Ii(e);
}
function Ii(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Ye);
  {
    const o = us(e);
    rt();
    try {
      sl(e);
    } finally {
      lt(), o();
    }
  }
}
const Dl = {
  get(e, t) {
    return ye(e, "get", ""), e[t];
  }
};
function Ll(e) {
  const t = (s) => {
    e.exposed = s || {};
  };
  return {
    attrs: new Proxy(e.attrs, Dl),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Ws(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ei($n(e.exposed)), {
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
function jl(e) {
  return Q(e) && "__vccOpts" in e;
}
const ie = (e, t) => /* @__PURE__ */ $r(e, t, ls), Fl = "3.5.28";
/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let bn;
const ro = typeof window < "u" && window.trustedTypes;
if (ro)
  try {
    bn = /* @__PURE__ */ ro.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Ri = bn ? (e) => bn.createHTML(e) : (e) => e, Nl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML", tt = typeof document < "u" ? document : null, lo = tt && /* @__PURE__ */ tt.createElement("template"), Hl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? tt.createElementNS(Nl, e) : t === "mathml" ? tt.createElementNS(Vl, e) : s ? tt.createElement(e, { is: s }) : tt.createElement(e);
    return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
  },
  createText: (e) => tt.createTextNode(e),
  createComment: (e) => tt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => tt.querySelector(e),
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
      lo.innerHTML = Ri(
        n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e
      );
      const l = lo.content;
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
const Ts = /* @__PURE__ */ Symbol("_vod"), Oi = /* @__PURE__ */ Symbol("_vsh"), sn = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: s }) {
    e[Ts] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : Wt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), Wt(e, !0), n.enter(e)) : n.leave(e, () => {
      Wt(e, !1);
    }) : Wt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Wt(e, t);
  }
};
function Wt(e, t) {
  e.style.display = t ? e[Ts] : "none", e[Oi] = !t;
}
const Wl = /* @__PURE__ */ Symbol(""), Bl = /(?:^|;)\s*display\s*:/;
function ql(e, t, s) {
  const n = e.style, o = be(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (be(t))
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
      r && (s += ";" + r), n.cssText = s, i = Bl.test(s);
    }
  } else t && e.removeAttribute("style");
  Ts in e && (e[Ts] = i ? n.display : "", e[Oi] && (n.display = "none"));
}
const co = /\s*!important$/;
function gs(e, t, s) {
  if (B(s))
    s.forEach((n) => gs(e, t, n));
  else if (s == null && (s = ""), t.startsWith("--"))
    e.setProperty(t, s);
  else {
    const n = Yl(e, t);
    co.test(s) ? e.setProperty(
      Ae(n),
      s.replace(co, ""),
      "important"
    ) : e[n] = s;
  }
}
const ao = ["Webkit", "Moz", "ms"], nn = {};
function Yl(e, t) {
  const s = nn[t];
  if (s)
    return s;
  let n = je(t);
  if (n !== "filter" && n in e)
    return nn[t] = n;
  n = Ao(n);
  for (let o = 0; o < ao.length; o++) {
    const i = ao[o] + n;
    if (i in e)
      return nn[t] = i;
  }
  return t;
}
const fo = "http://www.w3.org/1999/xlink";
function uo(e, t, s, n, o, i = Xi(t)) {
  n && t.startsWith("xlink:") ? s == null ? e.removeAttributeNS(fo, t.slice(6, t.length)) : e.setAttributeNS(fo, t, s) : s == null || i && !Ro(s) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Je(s) ? String(s) : s
  );
}
function po(e, t, s, n, o) {
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
function _t(e, t, s, n) {
  e.addEventListener(t, s, n);
}
function Jl(e, t, s, n) {
  e.removeEventListener(t, s, n);
}
const mo = /* @__PURE__ */ Symbol("_vei");
function Gl(e, t, s, n, o = null) {
  const i = e[mo] || (e[mo] = {}), r = i[t];
  if (n && r)
    r.value = n;
  else {
    const [l, c] = Xl(t);
    if (n) {
      const h = i[t] = ec(
        n,
        o
      );
      _t(e, l, h, c);
    } else r && (Jl(e, l, r, c), i[t] = void 0);
  }
}
const ho = /(?:Once|Passive|Capture)$/;
function Xl(e) {
  let t;
  if (ho.test(e)) {
    t = {};
    let n;
    for (; n = e.match(ho); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Ae(e.slice(2)), t];
}
let on = 0;
const Ql = /* @__PURE__ */ Promise.resolve(), Zl = () => on || (Ql.then(() => on = 0), on = Date.now());
function ec(e, t) {
  const s = (n) => {
    if (!n._vts)
      n._vts = Date.now();
    else if (n._vts <= s.attached)
      return;
    Ge(
      tc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Zl(), s;
}
function tc(e, t) {
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
const bo = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, sc = (e, t, s, n, o, i) => {
  const r = o === "svg";
  t === "class" ? Kl(e, n, r) : t === "style" ? ql(e, s, n) : Es(t) ? xn(t) || Gl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nc(e, t, n, r)) ? (po(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && uo(e, t, n, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !be(n)) ? po(e, je(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), uo(e, t, n, r));
};
function nc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && bo(t) && Q(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return bo(t) && be(s) ? !1 : t in e;
}
const wo = {};
// @__NO_SIDE_EFFECTS__
function Df(e, t, s) {
  let n = /* @__PURE__ */ Xe(e, t);
  As(n) && (n = he({}, n, t));
  class o extends On {
    constructor(r) {
      super(n, r, s);
    }
  }
  return o.def = n, o;
}
const oc = typeof HTMLElement < "u" ? HTMLElement : class {
};
class On extends oc {
  constructor(t, s = {}, n = _o) {
    super(), this._def = t, this._props = s, this._createApp = n, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && n !== _o ? this._root = this.shadowRoot : t.shadowRoot !== !1 ? (this.attachShadow(
      he({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this;
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof On) {
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
          const h = i[c];
          (h === Number || h && h.type === Number) && (c in this._props && (this._props[c] = Hn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[je(c)] = !0);
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
        oe(this, n) || Object.defineProperty(this, n, {
          // unwrap ref to be consistent with public instance behavior
          get: () => b(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = B(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(je))
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
    let n = s ? this.getAttribute(t) : wo;
    const o = je(t);
    s && this._numberProps && this._numberProps[o] && (n = Hn(n)), this._setProp(o, n, !1, !0);
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
    if (s !== this._props[t] && (this._dirty = !0, s === wo ? delete this._props[t] : (this._props[t] = s, t === "key" && this._app && (this._app._ceVNode.key = s)), o && this._instance && this._update(), n)) {
      const i = this._ob;
      i && (this._processMutations(i.takeRecords()), i.disconnect()), s === !0 ? this.setAttribute(Ae(t), "") : typeof s == "string" || typeof s == "number" ? this.setAttribute(Ae(t), s + "") : s || this.removeAttribute(Ae(t)), i && i.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), fc(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const s = ke(this._def, he(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (i, r) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            As(r[0]) ? he({ detail: r }, r[0]) : { detail: r }
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
            const h = s + "-s", a = document.createTreeWalker(c, 1);
            c.setAttribute(h, "");
            let p;
            for (; p = a.nextNode(); )
              p.setAttribute(h, "");
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
function ic(e) {
  e.target.composing = !0;
}
function go(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Ot = /* @__PURE__ */ Symbol("_assign");
function vo(e, t, s) {
  return t && (e = e.trim()), s && (e = Os(e)), e;
}
const $s = {
  created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
    e[Ot] = zs(o);
    const i = n || o.props && o.props.type === "number";
    _t(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Ot](vo(e.value, s, i));
    }), (s || i) && _t(e, "change", () => {
      e.value = vo(e.value, s, i);
    }), t || (_t(e, "compositionstart", ic), _t(e, "compositionend", go), _t(e, "change", go));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: s, modifiers: { lazy: n, trim: o, number: i } }, r) {
    if (e[Ot] = zs(r), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Os(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (n && t === s || o && e.value.trim() === c) || (e.value = c));
  }
}, qt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Ps(t);
    _t(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? Os(Ms(r)) : Ms(r)
      );
      e[Ot](
        e.multiple ? o ? new Set(i) : i : i[0]
      ), e._assigning = !0, Tt(() => {
        e._assigning = !1;
      });
    }), e[Ot] = zs(n);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    xo(e, t);
  },
  beforeUpdate(e, t, s) {
    e[Ot] = zs(s);
  },
  updated(e, { value: t }) {
    e._assigning || xo(e, t);
  }
};
function xo(e, t) {
  const s = e.multiple, n = B(t);
  if (!(s && !n && !Ps(t))) {
    for (let o = 0, i = e.options.length; o < i; o++) {
      const r = e.options[o], l = Ms(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = t.some((h) => String(h) === String(l)) : r.selected = Zi(t, l) > -1;
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
}, mt = (e, t) => {
  if (!e) return e;
  const s = e._withMods || (e._withMods = {}), n = t.join(".");
  return s[n] || (s[n] = ((o, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = lc[t[r]];
      if (l && l(o, t)) return;
    }
    return e(o, ...i);
  }));
}, cc = {
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
    const i = Ae(o.key);
    if (t.some(
      (r) => r === i || cc[r] === i
    ))
      return e(o);
  }));
}, ac = /* @__PURE__ */ he({ patchProp: sc }, Hl);
let yo;
function Di() {
  return yo || (yo = _l(ac));
}
const fc = ((...e) => {
  Di().render(...e);
}), _o = ((...e) => {
  const t = Di().createApp(...e), { mount: s } = t;
  return t.mount = (n) => {
    const o = dc(n);
    if (!o) return;
    const i = t._component;
    !Q(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
    const r = s(o, !1, uc(o));
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
  }, t;
});
function uc(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function dc(e) {
  return be(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let Li;
const Bs = (e) => Li = e, ji = (
  /* istanbul ignore next */
  Symbol()
);
function wn(e) {
  return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function";
}
var ts;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ts || (ts = {}));
function Lf() {
  const e = jo(!0), t = e.run(() => /* @__PURE__ */ F({}));
  let s = [], n = [];
  const o = $n({
    install(i) {
      Bs(o), o._a = i, i.provide(ji, o), i.config.globalProperties.$pinia = o, n.forEach((r) => s.push(r)), n = [];
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
const Fi = () => {
};
function So(e, t, s, n = Fi) {
  e.push(t);
  const o = () => {
    const i = e.indexOf(t);
    i > -1 && (e.splice(i, 1), n());
  };
  return !s && Fo() && er(o), o;
}
function Mt(e, ...t) {
  e.slice().forEach((s) => {
    s(...t);
  });
}
const pc = (e) => e(), ko = Symbol(), rn = Symbol();
function gn(e, t) {
  e instanceof Map && t instanceof Map ? t.forEach((s, n) => e.set(n, s)) : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const s in t) {
    if (!t.hasOwnProperty(s))
      continue;
    const n = t[s], o = e[s];
    wn(o) && wn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ me(n) && !/* @__PURE__ */ it(n) ? e[s] = gn(o, n) : e[s] = n;
  }
  return e;
}
const mc = (
  /* istanbul ignore next */
  Symbol()
);
function hc(e) {
  return !wn(e) || !e.hasOwnProperty(mc);
}
const { assign: ft } = Object;
function bc(e) {
  return !!(/* @__PURE__ */ me(e) && e.effect);
}
function wc(e, t, s, n) {
  const { state: o, actions: i, getters: r } = t, l = s.state.value[e];
  let c;
  function h() {
    l || (s.state.value[e] = o ? o() : {});
    const a = /* @__PURE__ */ kr(s.state.value[e]);
    return ft(a, i, Object.keys(r || {}).reduce((p, v) => (p[v] = $n(ie(() => {
      Bs(s);
      const T = s._s.get(e);
      return r[v].call(T, T);
    })), p), {}));
  }
  return c = Ni(e, h, t, s, n, !0), c;
}
function Ni(e, t, s = {}, n, o, i) {
  let r;
  const l = ft({ actions: {} }, s), c = { deep: !0 };
  let h, a, p = [], v = [], T;
  const d = n.state.value[e];
  !i && !d && (n.state.value[e] = {});
  let w;
  function U(j) {
    let M;
    h = a = !1, typeof j == "function" ? (j(n.state.value[e]), M = {
      type: ts.patchFunction,
      storeId: e,
      events: T
    }) : (gn(n.state.value[e], j), M = {
      type: ts.patchObject,
      payload: j,
      storeId: e,
      events: T
    });
    const C = w = Symbol();
    Tt().then(() => {
      w === C && (h = !0);
    }), a = !0, Mt(p, M, n.state.value[e]);
  }
  const X = i ? function() {
    const { state: M } = s, C = M ? M() : {};
    this.$patch((re) => {
      ft(re, C);
    });
  } : (
    /* istanbul ignore next */
    Fi
  );
  function E() {
    r.stop(), p = [], v = [], n._s.delete(e);
  }
  const A = (j, M = "") => {
    if (ko in j)
      return j[rn] = M, j;
    const C = function() {
      Bs(n);
      const re = Array.from(arguments), we = [], L = [];
      function ve(J) {
        we.push(J);
      }
      function Le(J) {
        L.push(J);
      }
      Mt(v, {
        args: re,
        name: C[rn],
        store: V,
        after: ve,
        onError: Le
      });
      let ce;
      try {
        ce = j.apply(this && this.$id === e ? this : V, re);
      } catch (J) {
        throw Mt(L, J), J;
      }
      return ce instanceof Promise ? ce.then((J) => (Mt(we, J), J)).catch((J) => (Mt(L, J), Promise.reject(J))) : (Mt(we, ce), ce);
    };
    return C[ko] = !0, C[rn] = M, C;
  }, P = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: So.bind(null, v),
    $patch: U,
    $reset: X,
    $subscribe(j, M = {}) {
      const C = So(p, j, M.detached, () => re()), re = r.run(() => Rt(() => n.state.value[e], (we) => {
        (M.flush === "sync" ? a : h) && j({
          storeId: e,
          type: ts.direct,
          events: T
        }, we);
      }, ft({}, c, M)));
      return C;
    },
    $dispose: E
  }, V = /* @__PURE__ */ js(P);
  n._s.set(e, V);
  const pe = (n._a && n._a.runWithContext || pc)(() => n._e.run(() => (r = jo()).run(() => t({ action: A }))));
  for (const j in pe) {
    const M = pe[j];
    if (/* @__PURE__ */ me(M) && !bc(M) || /* @__PURE__ */ it(M))
      i || (d && hc(M) && (/* @__PURE__ */ me(M) ? M.value = d[j] : gn(M, d[j])), n.state.value[e][j] = M);
    else if (typeof M == "function") {
      const C = A(M, j);
      pe[j] = C, l.actions[j] = M;
    }
  }
  return ft(V, pe), ft(/* @__PURE__ */ se(V), pe), Object.defineProperty(V, "$state", {
    get: () => n.state.value[e],
    set: (j) => {
      U((M) => {
        ft(M, j);
      });
    }
  }), n._p.forEach((j) => {
    ft(V, r.run(() => j({
      store: V,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), d && i && s.hydrate && s.hydrate(V.$state, d), h = !0, a = !0, V;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gc(e, t, s) {
  let n, o;
  const i = typeof t == "function";
  n = e, o = i ? s : t;
  function r(l, c) {
    const h = Dr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (h ? kt(ji, null) : null), l && Bs(l), l = Li, l._s.has(n) || (i ? Ni(n, t, o, l) : wc(n, o, l)), l._s.get(n);
  }
  return r.$id = n, r;
}
const Ee = /* @__PURE__ */ gc("widget", () => {
  const e = /* @__PURE__ */ F({
    endpoint: "",
    issuesEndpoint: "",
    actionEndpoint: "",
    cancelEndpoint: "",
    repo: "",
    labels: "",
    storageKey: "thoughts"
  }), t = /* @__PURE__ */ F("text"), s = /* @__PURE__ */ F("right"), n = /* @__PURE__ */ F("bottom"), o = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F("text"), r = /* @__PURE__ */ F("medium"), l = /* @__PURE__ */ F("default"), c = /* @__PURE__ */ F("ocean"), h = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F("manual"), v = /* @__PURE__ */ F("idle"), T = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(0), w = /* @__PURE__ */ F("technical_issue"), U = /* @__PURE__ */ F({}), X = /* @__PURE__ */ F({
    shortLeft: "done_archive",
    shortRight: "pin_unpin",
    longLeft: "create_linked_item",
    longRight: "comment"
  }), E = /* @__PURE__ */ F([]), A = /* @__PURE__ */ F(!1), P = /* @__PURE__ */ F(!1), V = /* @__PURE__ */ F("active"), ge = /* @__PURE__ */ F("updated_desc"), pe = /* @__PURE__ */ F(""), j = /* @__PURE__ */ F([]), M = /* @__PURE__ */ F(!1), C = /* @__PURE__ */ F(""), re = /* @__PURE__ */ F(""), we = /* @__PURE__ */ F(!1), L = /* @__PURE__ */ F(!1), ve = /* @__PURE__ */ F(null), Le = /* @__PURE__ */ F(""), ce = /* @__PURE__ */ F("");
  function J(ne) {
    e.value = ne, t.value = "text", i.value = "text";
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
    draftTitle: h,
    draftDescription: a,
    draftMergePolicy: p,
    voiceDraftState: v,
    voiceDraftReady: T,
    voiceDraftDurationMs: d,
    mode: w,
    itemViews: U,
    swipeMapping: X,
    issues: E,
    issuesLoaded: A,
    loadingIssues: P,
    listView: V,
    listSort: ge,
    listQuery: pe,
    listStatusFilter: j,
    creating: M,
    createError: C,
    listError: re,
    textCreateSuccess: we,
    voiceCreateSuccess: L,
    lastSubmissionId: ve,
    lastTextTitle: Le,
    lastTextDescription: ce,
    init: J
  };
});
function Ve() {
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
function Vi() {
  const e = kt("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    readToken: e.readToken,
    requireToken: e.requireToken,
    promptToken: e.promptToken,
    clearToken: e.clearToken
  };
}
function Dn() {
  const e = Ee(), { persist: t } = Ve();
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
function ht() {
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
const vc = 10;
function xc() {
  const e = Ee(), { persist: t } = Ve(), { submitText: s, cancelSubmission: n, loadIssues: o } = ht(), i = /* @__PURE__ */ F(0);
  let r = null;
  function l() {
    r !== null && (clearInterval(r), r = null), i.value = 0;
  }
  function c() {
    l(), e.lastSubmissionId && (i.value = vc, r = setInterval(() => {
      i.value -= 1, i.value <= 0 && l();
    }, 1e3));
  }
  async function h(v) {
    if (e.creating) return;
    const T = e.draftDescription.trim();
    if (!T) {
      e.createError = "Please provide a description.";
      return;
    }
    let d = e.draftTitle.trim();
    if (!d) {
      const w = T.split(`
`)[0];
      d = w.length > 50 ? w.slice(0, 50) + "..." : w;
    }
    e.createError = "", e.creating = !0;
    try {
      const w = await s(d, T, v);
      e.lastSubmissionId = typeof (w == null ? void 0 : w.submissionId) == "string" ? w.submissionId : null, e.lastTextTitle = d, e.lastTextDescription = e.draftDescription, e.draftTitle = "", e.draftDescription = "", e.textCreateSuccess = !0, c(), o(!0), t();
    } catch (w) {
      e.createError = w instanceof Error ? w.message : "Failed to create request";
    } finally {
      e.creating = !1;
    }
  }
  async function a() {
    if (!e.lastSubmissionId) return;
    const v = e.lastSubmissionId;
    await n(v), e.lastSubmissionId = null, e.textCreateSuccess = !1, e.draftTitle = e.lastTextTitle, e.draftDescription = e.lastTextDescription, l(), t();
  }
  function p() {
    e.textCreateSuccess = !1, l();
  }
  return {
    undoSecondsLeft: i,
    submit: h,
    undo: a,
    reset: p,
    stopUndoCountdown: l
  };
}
function yc() {
  let e = null, t = null, s = [], n = "";
  const o = /* @__PURE__ */ F(!1);
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
  async function h() {
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
  async function p() {
    return await c(), s.length ? new Blob(s, { type: n || "audio/webm" }) : null;
  }
  async function v() {
    e && e.state !== "inactive" && e.stop(), t == null || t.getTracks().forEach((d) => d.stop()), e = null, t = null, s = [], n = "", o.value = !1;
  }
  function T() {
    return n;
  }
  return { start: h, pause: a, exportRecording: p, reset: v, hasContent: o, getMimeType: T };
}
const _c = 10;
function Sc() {
  const e = Ee(), { persist: t } = Ve(), { submitVoice: s, cancelSubmission: n, loadIssues: o } = ht(), i = yc(), r = /* @__PURE__ */ F(0);
  let l = null, c = null;
  function h() {
    c !== null && (clearInterval(c), c = null);
  }
  function a() {
    h(), c = setInterval(() => {
      e.voiceDraftDurationMs += 1e3, t();
    }, 1e3);
  }
  function p() {
    l !== null && (clearInterval(l), l = null), r.value = 0;
  }
  function v() {
    p(), e.lastSubmissionId && (r.value = _c, l = setInterval(() => {
      r.value -= 1, r.value <= 0 && p();
    }, 1e3));
  }
  async function T() {
    e.createError = "";
    try {
      e.voiceDraftState === "recording" ? (await i.pause(), e.voiceDraftState = "paused", e.voiceDraftReady = i.hasContent.value, h()) : (await i.start(), e.voiceDraftState = "recording", e.voiceDraftReady = i.hasContent.value, a()), t();
    } catch (E) {
      e.createError = E instanceof Error ? E.message : "Failed to access microphone";
    }
  }
  async function d() {
    h(), await i.reset(), e.voiceDraftState = "idle", e.voiceDraftReady = !1, e.voiceDraftDurationMs = 0, e.createError = "", t();
  }
  async function w() {
    if (!e.voiceDraftReady) return;
    const E = await i.exportRecording();
    if (!E || E.size < 1) {
      e.createError = "No recorded audio available yet.";
      return;
    }
    e.createError = "", e.creating = !0;
    try {
      const A = await s(E, i.getMimeType(), e.voiceDraftDurationMs);
      e.lastSubmissionId = typeof (A == null ? void 0 : A.submissionId) == "string" ? A.submissionId : null, await d(), e.voiceCreateSuccess = !0, v(), o(!0), t();
    } catch (A) {
      e.createError = A instanceof Error ? A.message : "Failed to submit voice request";
    } finally {
      e.creating = !1;
    }
  }
  async function U() {
    if (!e.lastSubmissionId) return;
    const E = e.lastSubmissionId;
    await n(E), e.lastSubmissionId = null, e.voiceCreateSuccess = !1, p(), t();
  }
  function X() {
    e.voiceCreateSuccess = !1, p();
  }
  return {
    undoSecondsLeft: r,
    toggleRecording: T,
    reset: d,
    submit: w,
    undo: U,
    dismissSuccess: X,
    stopVoiceTimer: h,
    stopUndoCountdown: p
  };
}
function kc() {
  const e = /* @__PURE__ */ F(!1), t = /* @__PURE__ */ F(null), s = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1);
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
const Cc = 40;
function Tc() {
  const e = Ee(), { persist: t } = Ve(), s = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1);
  let o = 0;
  const i = ie(() => e.handedness === "left" ? { left: "10px", right: "" } : { right: "10px", left: "" });
  function r(p) {
    o = p.touches[0].clientX;
  }
  function l(p) {
    const v = p.changedTouches[0].clientX - o;
    Math.abs(v) >= Cc && (e.handedness = v < 0 ? "left" : "right", t(), p.preventDefault());
  }
  function c() {
    s.value = !0;
  }
  function h() {
    s.value = !1;
  }
  function a(p) {
    e.handedness = p, t();
  }
  return Hs(() => {
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
    close: h,
    applyHandedness: a
  };
}
const zc = { class: "cfw-text-form-wrap" }, $c = { class: "cfw-textarea-wrap" }, Mc = ["id", "placeholder"], Ec = {
  key: 1,
  class: "cfw-mf-actions"
}, Pc = ["disabled"], Ac = {
  key: 2,
  id: "cfw-new-actions"
}, Ic = ["disabled"], Rc = /* @__PURE__ */ Xe({
  __name: "TextForm",
  props: {
    mobile: { type: Boolean },
    titleId: { type: String },
    descId: { type: String }
  },
  emits: ["create"],
  setup(e, { expose: t, emit: s }) {
    const n = e, o = Ee(), { persist: i } = Ve(), r = ie(() => n.descId ?? (n.mobile ? "cfw-m-description" : "cfw-description")), l = ie(() => {
      switch (o.mode) {
        case "personal_todo":
          return "Capture a personal todo...";
        case "feature_request":
          return "Describe the requested feature...";
        case "technical_issue":
        default:
          return "Describe the technical issue...";
      }
    }), c = ie(() => !!o.draftDescription.trim());
    function h() {
      i();
    }
    function a() {
      o.draftTitle = "", o.draftDescription = "", i();
    }
    const p = /* @__PURE__ */ F(null);
    function v() {
      const d = p.value;
      d && (d.style.height = "auto", d.style.height = d.scrollHeight + "px", d.style.overflowY = d.offsetHeight < d.scrollHeight ? "auto" : "hidden");
    }
    function T() {
      v(), h();
    }
    return Hs(() => v()), t({ focusTitle: () => {
      var d;
      return (d = p.value) == null ? void 0 : d.focus();
    } }), (d, w) => ($(), R("div", zc, [
      u("div", $c, [
        De(u("textarea", {
          ref_key: "descRef",
          ref: p,
          id: r.value,
          "onUpdate:modelValue": w[0] || (w[0] = (U) => b(o).draftDescription = U),
          placeholder: l.value,
          maxlength: "5000",
          onInput: T,
          onKeydown: [
            w[1] || (w[1] = Nt(mt((U) => c.value && !b(o).creating && d.$emit("create", !0), ["ctrl"]), ["enter"])),
            w[2] || (w[2] = Nt(mt((U) => c.value && !b(o).creating && d.$emit("create", !0), ["meta"]), ["enter"]))
          ]
        }, null, 40, Mc), [
          [$s, b(o).draftDescription]
        ])
      ]),
      b(o).createError ? ($(), R("div", {
        key: 0,
        class: K([["cfw-error", e.mobile ? "cfw-mf-error" : ""], "active"])
      }, N(b(o).createError), 3)) : ee("", !0),
      e.mobile ? ($(), R("div", Ec, [
        c.value ? ($(), R("button", {
          key: 0,
          id: "cfw-m-clear",
          class: "cfw-btn cfw-btn-outline",
          type: "button",
          onClick: a
        }, "Clear")) : ee("", !0),
        u("button", {
          id: "cfw-m-submit",
          class: "cfw-btn cfw-btn-primary",
          type: "button",
          disabled: b(o).creating,
          onClick: w[3] || (w[3] = (U) => d.$emit("create", !1))
        }, N(b(o).creating ? "Saving..." : "Submit"), 9, Pc)
      ])) : ($(), R("div", Ac, [
        u("button", {
          id: "cfw-submit",
          type: "button",
          class: "cfw-btn cfw-btn-primary",
          disabled: b(o).creating,
          onClick: w[4] || (w[4] = (U) => d.$emit("create", !1))
        }, N(b(o).creating ? "Saving..." : "Submit"), 9, Ic)
      ]))
    ]));
  }
}), Oc = ["onKeydown"], Dc = { class: "cfw-ml-row-main" }, Lc = { class: "cfw-ml-row-header" }, jc = { class: "cfw-ml-row-status" }, Fc = {
  key: 0,
  class: "cfw-ml-row-comments"
}, Nc = {
  key: 1,
  class: "cfw-ml-unread-dot"
}, Vc = { class: "cfw-ml-row-time" }, Hc = { class: "cfw-ml-row-title" }, Uc = {
  key: 0,
  class: "cfw-desktop-menu"
}, Kc = ["onClick"], Co = 80, To = 160, zo = /* @__PURE__ */ Xe({
  __name: "IssueRow",
  props: {
    issue: { type: Object }
  },
  emits: ["open-issue", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = Ve(), r = ie(() => {
      const j = o.itemViews[s.issue.number] || 0;
      return new Date(s.issue.updatedAt).getTime() > j;
    }), l = ie(() => {
      const j = new Date(s.issue.updatedAt), C = (/* @__PURE__ */ new Date()).getTime() - j.getTime();
      return C < 6e4 ? "Just now" : C < 36e5 ? `${Math.floor(C / 6e4)}m ago` : C < 864e5 ? `${Math.floor(C / 36e5)}h ago` : `${Math.floor(C / 864e5)}d ago`;
    });
    let c = 0, h = 0;
    const a = /* @__PURE__ */ F(0), p = /* @__PURE__ */ F(!1), v = ie(() => {
      if (!p.value) return "";
      const j = a.value > 0 ? "right" : "left", M = Math.abs(a.value), C = M > To ? o.swipeMapping[j === "right" ? "longRight" : "longLeft"] : M > Co ? o.swipeMapping[j === "right" ? "shortRight" : "shortLeft"] : "none";
      return pe(C);
    }), T = ie(() => a.value > 0 ? "preview-left" : "preview-right"), d = ie(() => !v.value || v.value === "None" ? "" : a.value > 0 ? "bg-right" : "bg-left"), w = ie(() => ({
      transform: `translateX(${a.value}px)`,
      transition: p.value ? "none" : "transform 0.25s ease-out"
    }));
    function U(j) {
      c = j.touches[0].clientX, p.value = !0;
    }
    function X(j) {
      p.value && (h = j.touches[0].clientX, a.value = h - c);
    }
    function E() {
      p.value = !1;
      const j = Math.abs(a.value);
      if (j > Co) {
        const M = a.value > 0 ? "right" : "left", C = j > To ? o.swipeMapping[M === "right" ? "longRight" : "longLeft"] : o.swipeMapping[M === "right" ? "shortRight" : "shortLeft"];
        C !== "none" && n("swipe-action", C, s.issue);
      }
      a.value = 0;
    }
    function A() {
      o.itemViews[s.issue.number] = Date.now(), i(), n("open-issue", s.issue);
    }
    const P = /* @__PURE__ */ F(!1), V = ie(() => {
      const j = [
        { id: "done_archive", label: "Done / Archive" },
        { id: "pin_unpin", label: "Pin / Unpin" },
        { id: "comment", label: "Comment" },
        { id: "create_linked_item", label: "Create linked item" },
        { id: "mark_viewed", label: "Mark viewed" }
      ];
      return s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" || j.unshift({ id: "edit", label: "Edit" }), j;
    });
    function ge(j) {
      P.value = !1, j === "edit" ? n("edit-issue", s.issue) : n("swipe-action", j, s.issue);
    }
    function pe(j) {
      return {
        done_archive: "Archive",
        pin_unpin: "Pin",
        comment: "Comment",
        create_linked_item: "Link",
        mark_viewed: "Mark viewed",
        none: "None"
      }[j] || "None";
    }
    return (j, M) => ($(), R("div", {
      class: "cfw-ml-row-wrap",
      onTouchstartPassive: U,
      onTouchmovePassive: X,
      onTouchend: E
    }, [
      u("div", {
        class: K(["cfw-ml-row-bg", d.value])
      }, [
        v.value ? ($(), R("div", {
          key: 0,
          class: K(["cfw-swipe-preview", T.value])
        }, N(v.value), 3)) : ee("", !0)
      ], 2),
      u("div", {
        class: K(["cfw-ml-row", { unread: r.value }]),
        style: Dt(w.value),
        onClick: A,
        tabindex: "0",
        onKeydown: [
          Nt(A, ["enter"]),
          Nt(mt(A, ["prevent"]), ["space"])
        ]
      }, [
        u("div", Dc, [
          u("div", Lc, [
            u("span", jc, N(e.issue.status || e.issue.state), 1),
            e.issue.commentCount ? ($(), R("span", Fc, N(e.issue.commentCount) + " comment" + N(e.issue.commentCount === 1 ? "" : "s"), 1)) : ee("", !0),
            r.value ? ($(), R("span", Nc)) : ee("", !0),
            u("span", Vc, N(l.value), 1)
          ]),
          u("div", Hc, N(e.issue.title), 1)
        ]),
        u("button", {
          class: "cfw-ml-row-menu",
          onClick: M[0] || (M[0] = mt((C) => P.value = !P.value, ["stop"]))
        }, "⋮"),
        P.value ? ($(), R("div", Uc, [
          ($(!0), R(te, null, Me(V.value, (C) => ($(), R("button", {
            key: C.id,
            onClick: mt((re) => ge(C.id), ["stop"])
          }, N(C.label), 9, Kc))), 128))
        ])) : ee("", !0)
      ], 46, Oc)
    ], 32));
  }
}), Wc = { class: "cfw-tab-body" }, Bc = { id: "cfw-ml-head" }, qc = { id: "cfw-ml-head-actions" }, Yc = ["disabled"], Jc = ["disabled"], Gc = {
  key: 0,
  id: "cfw-ml-error",
  class: "cfw-error active"
}, Xc = {
  key: 0,
  class: "cfw-ml-empty"
}, Qc = {
  key: 0,
  class: "cfw-ml-section-label"
}, $o = 56, Zc = /* @__PURE__ */ Xe({
  __name: "IssuesList",
  emits: ["refresh", "open-issue", "open-filter", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = t, n = Ee(), { hasAccess: o } = ht(), { onPanelTouchStart: i, onPanelTouchEnd: r } = Dn(), l = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F("");
    let h = 0, a = !1;
    const p = (E) => !["completed", "closed_unmerged", "merged"].includes(E.status || "") && E.state !== "closed", v = ie(() => n.issues.filter((E) => !!E.pinned && p(E))), T = ie(() => n.issues.filter((E) => !E.pinned || !p(E))), d = ie(() => o() ? n.loadingIssues ? "Loading…" : n.listError ? n.listError : "No requests yet." : "Authentication required to view requests.");
    function w(E) {
      E.currentTarget.scrollTop === 0 && (h = E.touches[0].clientY, a = !0);
    }
    function U(E) {
      if (!a) return;
      const A = E.touches[0].clientY - h;
      A > 0 ? (l.value = !0, c.value = A > $o ? "↑ Release to refresh" : "↓ Pull to refresh") : (a = !1, l.value = !1);
    }
    function X(E) {
      if (!a) return;
      const A = E.changedTouches[0].clientY - h;
      a = !1, A > $o ? (c.value = "Refreshing…", s("refresh"), setTimeout(() => {
        l.value = !1, c.value = "";
      }, 1e3)) : (l.value = !1, c.value = "");
    }
    return (E, A) => ($(), R("div", {
      id: "cfw-mv-list",
      class: K(["cfw-mv", { active: b(n).mobileTab === "list" }])
    }, [
      u("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: A[0] || (A[0] = //@ts-ignore
        (...P) => b(i) && b(i)(...P)),
        onTouchend: A[1] || (A[1] = //@ts-ignore
        (...P) => b(r) && b(r)(...P))
      }, [...A[8] || (A[8] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      u("div", Wc, [
        u("div", Bc, [
          A[9] || (A[9] = u("span", { id: "cfw-ml-head-title" }, "Requests", -1)),
          u("div", qc, [
            u("button", {
              disabled: b(n).loadingIssues,
              onClick: A[2] || (A[2] = (P) => E.$emit("open-filter"))
            }, "⊞ Filter", 8, Yc),
            u("button", {
              disabled: b(n).loadingIssues,
              onClick: A[3] || (A[3] = (P) => E.$emit("refresh"))
            }, N(b(n).loadingIssues ? "…" : "↻"), 9, Jc)
          ])
        ]),
        b(n).listError ? ($(), R("div", Gc, N(b(n).listError), 1)) : ee("", !0),
        u("div", {
          id: "cfw-ml-ptr",
          class: K({ "cfw-ml-ptr-active": l.value })
        }, N(c.value), 3),
        u("div", {
          id: "cfw-ml-body",
          onTouchstartPassive: w,
          onTouchmovePassive: U,
          onTouchendPassive: X
        }, [
          b(n).issues.length ? ($(), R(te, { key: 1 }, [
            v.value.length ? ($(), R(te, { key: 0 }, [
              A[10] || (A[10] = u("div", { class: "cfw-ml-section-label" }, "Pinned", -1)),
              ($(!0), R(te, null, Me(v.value, (P) => ($(), rs(zo, {
                key: P.number,
                issue: P,
                onOpenIssue: A[4] || (A[4] = (V) => E.$emit("open-issue", V)),
                onSwipeAction: (V) => E.$emit("swipe-action", V, P),
                onEditIssue: (V) => E.$emit("edit-issue", P)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : ee("", !0),
            T.value.length ? ($(), R(te, { key: 1 }, [
              v.value.length ? ($(), R("div", Qc, "Activity")) : ee("", !0),
              ($(!0), R(te, null, Me(T.value, (P) => ($(), rs(zo, {
                key: P.number,
                issue: P,
                onOpenIssue: A[5] || (A[5] = (V) => E.$emit("open-issue", V)),
                onSwipeAction: (V) => E.$emit("swipe-action", V, P),
                onEditIssue: (V) => E.$emit("edit-issue", P)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : ee("", !0)
          ], 64)) : ($(), R("div", Xc, N(d.value), 1))
        ], 32)
      ]),
      b(n).panelSnap === "middle" ? ($(), R("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: A[6] || (A[6] = //@ts-ignore
        (...P) => b(i) && b(i)(...P)),
        onTouchend: A[7] || (A[7] = //@ts-ignore
        (...P) => b(r) && b(r)(...P))
      }, [...A[11] || (A[11] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : ee("", !0)
    ], 2));
  }
}), ea = [
  ["active", "Active"],
  ["needs_action", "Needs action"],
  ["completed", "Completed"],
  ["all", "All"]
], ta = [
  ["updated_desc", "Newest"],
  ["updated_asc", "Oldest"]
], sa = [
  ["new", "New"],
  ["queued", "Queued"],
  ["pr_draft", "PR draft"],
  ["pr_open", "PR open"],
  ["pr_closed_unmerged", "PR closed"],
  ["pr_merge_requested", "Merge requested"],
  ["merged", "Merged"],
  ["closed_unmerged", "Closed"]
], na = {
  key: 0,
  id: "cfw-mbs-content"
}, oa = { class: "cfw-is-status" }, ia = { class: "cfw-is-num" }, ra = {
  class: "cfw-is-action-row",
  style: { "margin-top": "8px" }
}, la = ["disabled"], ca = ["href"], aa = {
  key: 0,
  class: "cfw-is-body",
  style: { "font-size": "14px", color: "#a9c2df", "margin-top": "12px", "white-space": "pre-wrap", "line-height": "1.5", padding: "12px", background: "rgba(0,0,0,0.2)", "border-radius": "8px" }
}, fa = {
  key: 1,
  class: "cfw-is-badges"
}, ua = { class: "cfw-is-primary-box" }, da = {
  key: 1,
  class: "cfw-is-action-row"
}, pa = {
  key: 2,
  class: "cfw-is-section cfw-comments-section"
}, ma = {
  key: 0,
  class: "cfw-comment cfw-comment-newest"
}, ha = { class: "cfw-comment-meta" }, ba = { class: "cfw-comment-body" }, wa = { class: "cfw-comment-meta" }, ga = { class: "cfw-comment-body" }, va = {
  key: 3,
  class: "cfw-is-section"
}, xa = ["href"], ya = {
  key: 4,
  class: "cfw-is-section"
}, _a = { class: "cfw-is-actions" }, Sa = ["disabled", "onClick"], ka = {
  key: 0,
  class: "cfw-is-action-reason"
}, Ca = {
  key: 5,
  class: "cfw-is-section"
}, Ta = ["href"], za = {
  key: 0,
  class: "cfw-is-actions",
  style: { "margin-top": "10px" }
}, $a = ["disabled", "onClick"], Ma = {
  key: 0,
  class: "cfw-is-action-reason"
}, Ea = {
  key: 6,
  class: "cfw-is-error active"
}, Pa = {
  key: 1,
  id: "cfw-mbs-content"
}, Aa = { class: "cfw-fs-section" }, Ia = { class: "cfw-fs-pills" }, Ra = ["onClick"], Oa = { class: "cfw-fs-section" }, Da = { class: "cfw-fs-pills" }, La = ["onClick"], ja = { class: "cfw-fs-section" }, Fa = { class: "cfw-fs-chips" }, Na = ["onClick"], Va = /* @__PURE__ */ Xe({
  __name: "IssueSheet",
  props: {
    open: { type: Boolean },
    issue: { type: [Object, null] },
    filterMode: { type: Boolean },
    editMode: { type: Boolean }
  },
  emits: ["close", "action-done", "filter-changed", "compose-sheet", "edit-issue", "cancel-edit"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = Ve(), { executeAction: r, mapActionError: l } = ht(), c = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F(""), v = /* @__PURE__ */ F("");
    Rt(() => s.editMode, (M) => {
      M && s.issue && (p.value = s.issue.title, v.value = s.issue.body || "");
    });
    const T = ie(() => s.issue ? s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" : !1), d = ie(() => {
      var M;
      return (M = s.issue) != null && M.comments ? [...s.issue.comments].sort((C, re) => new Date(re.createdAt).getTime() - new Date(C.createdAt).getTime()) : [];
    }), w = ie(() => d.value.length > 0), U = ie(() => d.value[0] || null), X = ie(() => d.value.slice(1));
    function E(M) {
      return new Date(M).toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }
    const A = ie(() => {
      var M;
      return Array.isArray((M = s.issue) == null ? void 0 : M.issueActions) ? s.issue.issueActions : [];
    }), P = ie(() => {
      var M;
      return Array.isArray((M = s.issue) == null ? void 0 : M.pullRequestActions) ? s.issue.pullRequestActions : [];
    });
    async function V(M, C, re) {
      h.value = "", c.value = !0;
      try {
        await r(M, re, C), n("action-done"), n("close");
      } catch (we) {
        h.value = l(we instanceof Error ? we.message : "");
      } finally {
        c.value = !1;
      }
    }
    async function ge() {
      if (!s.issue) return;
      const M = p.value.trim();
      if (M) {
        h.value = "", c.value = !0;
        try {
          await r(s.issue.number, "edit", "issue", {
            title: M,
            body: v.value.trim()
          }), n("action-done"), n("cancel-edit");
        } catch (C) {
          h.value = l(C instanceof Error ? C.message : "");
        } finally {
          c.value = !1;
        }
      }
    }
    function pe(M) {
      const C = o.listStatusFilter.slice(), re = C.indexOf(M);
      re >= 0 ? C.splice(re, 1) : C.push(M), o.listStatusFilter = C, i(), n("filter-changed");
    }
    function j() {
      o.listView = "active", o.listQuery = "", o.listStatusFilter = [], i(), n("filter-changed"), n("close");
    }
    return (M, C) => {
      var re, we;
      return $(), R(te, null, [
        u("div", {
          id: "cfw-mbs-overlay",
          class: K({ active: e.open }),
          onClick: C[0] || (C[0] = (L) => M.$emit("close"))
        }, null, 2),
        u("div", {
          id: "cfw-mbs",
          class: K({ active: e.open, "panel-left": b(o).handedness === "left" })
        }, [
          C[16] || (C[16] = u("div", { id: "cfw-mbs-handle" }, null, -1)),
          e.issue ? ($(), R("div", na, [
            u("div", oa, N(e.issue.status || e.issue.state) + N(e.issue.statusDetail ? " · " + e.issue.statusDetail : ""), 1),
            u("div", ia, "#" + N(e.issue.number) + " · " + N(E(e.issue.updatedAt)), 1),
            e.editMode ? ($(), R(te, { key: 0 }, [
              De(u("input", {
                "onUpdate:modelValue": C[1] || (C[1] = (L) => p.value = L),
                class: "cfw-edit-title",
                placeholder: "Issue title...",
                style: { width: "100%", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#fff", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "16px", "font-weight": "bold", "margin-top": "12px" }
              }, null, 512), [
                [$s, p.value]
              ]),
              De(u("textarea", {
                "onUpdate:modelValue": C[2] || (C[2] = (L) => v.value = L),
                placeholder: "Issue description...",
                style: { width: "100%", "min-height": "120px", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#d9e7f7", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "14px", "margin-top": "8px", resize: "vertical" }
              }, null, 512), [
                [$s, v.value]
              ]),
              u("div", ra, [
                u("button", {
                  class: "cfw-btn cfw-btn-outline",
                  onClick: C[3] || (C[3] = (L) => M.$emit("cancel-edit")),
                  style: { flex: "1" }
                }, "Cancel"),
                u("button", {
                  class: "cfw-btn cfw-btn-primary",
                  disabled: c.value || !p.value.trim(),
                  onClick: ge,
                  style: { flex: "1" }
                }, N(c.value ? "Saving..." : "Save"), 9, la)
              ])
            ], 64)) : ($(), R(te, { key: 1 }, [
              u("a", {
                class: "cfw-is-title",
                href: e.issue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, N(e.issue.title), 9, ca),
              e.issue.body ? ($(), R("div", aa, N(e.issue.body), 1)) : ee("", !0),
              (re = e.issue.labels) != null && re.length ? ($(), R("div", fa, [
                ($(!0), R(te, null, Me(e.issue.labels, (L) => ($(), R("span", {
                  key: L,
                  class: "cfw-badge"
                }, N(L), 1))), 128))
              ])) : ee("", !0),
              u("div", ua, [
                T.value ? ($(), R("button", {
                  key: 0,
                  class: "cfw-btn cfw-btn-primary cfw-is-w100",
                  onClick: C[4] || (C[4] = (L) => M.$emit("compose-sheet", "comment", e.issue))
                }, "Comment")) : ($(), R("div", da, [
                  u("button", {
                    class: "cfw-btn cfw-btn-outline",
                    onClick: C[5] || (C[5] = (L) => M.$emit("edit-issue", e.issue))
                  }, "Edit"),
                  u("button", {
                    class: "cfw-btn cfw-btn-primary",
                    onClick: C[6] || (C[6] = (L) => M.$emit("compose-sheet", "comment", e.issue))
                  }, "Comment")
                ]))
              ])
            ], 64)),
            w.value ? ($(), R("div", pa, [
              U.value ? ($(), R("div", ma, [
                u("div", ha, [
                  u("strong", null, N(U.value.author || "User"), 1),
                  Ft(" · " + N(E(U.value.createdAt)), 1)
                ]),
                u("div", ba, N(U.value.body), 1)
              ])) : ee("", !0),
              X.value.length > 0 ? ($(), R(te, { key: 1 }, [
                a.value ? ($(!0), R(te, { key: 1 }, Me(X.value, (L) => ($(), R("div", {
                  key: L.id,
                  class: "cfw-comment"
                }, [
                  u("div", wa, [
                    u("strong", null, N(L.author || "User"), 1),
                    Ft(" · " + N(E(L.createdAt)), 1)
                  ]),
                  u("div", ga, N(L.body), 1)
                ]))), 128)) : ($(), R("button", {
                  key: 0,
                  class: "cfw-comments-expand",
                  onClick: C[7] || (C[7] = (L) => a.value = !0)
                }, " Show " + N(X.value.length) + " previous comment" + N(X.value.length > 1 ? "s" : ""), 1))
              ], 64)) : ee("", !0)
            ])) : ee("", !0),
            e.issue.sourceIssue ? ($(), R("div", va, [
              C[10] || (C[10] = u("div", { class: "cfw-is-section-label" }, "Source Item", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.sourceIssue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, " #" + N(e.issue.sourceIssue.number) + " " + N(e.issue.sourceIssue.title), 9, xa)
            ])) : ee("", !0),
            A.value.length ? ($(), R("div", ya, [
              C[11] || (C[11] = u("div", { class: "cfw-is-section-label" }, "Issue actions", -1)),
              u("div", _a, [
                ($(!0), R(te, null, Me(A.value, (L) => ($(), R("div", {
                  key: L.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: L.disabled || c.value,
                    onClick: (ve) => !L.disabled && V(e.issue.number, "issue", L.id)
                  }, N(L.label || L.id), 9, Sa),
                  L.disabled && L.reason ? ($(), R("span", ka, N(L.reason), 1)) : ee("", !0)
                ]))), 128))
              ])
            ])) : ee("", !0),
            (we = e.issue.pullRequest) != null && we.url ? ($(), R("div", Ca, [
              C[12] || (C[12] = u("div", { class: "cfw-is-section-label" }, "Pull request", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.pullRequest.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "PR #" + N(e.issue.pullRequest.number) + " · " + N((e.issue.pullRequest.state || "").toLowerCase()) + N(e.issue.pullRequest.isDraft ? " · draft" : ""), 9, Ta),
              P.value.length ? ($(), R("div", za, [
                ($(!0), R(te, null, Me(P.value, (L) => ($(), R("div", {
                  key: L.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: L.disabled || c.value,
                    onClick: (ve) => !L.disabled && V(e.issue.number, "pull_request", L.id)
                  }, N(L.label || L.id), 9, $a),
                  L.disabled && L.reason ? ($(), R("span", Ma, N(L.reason), 1)) : ee("", !0)
                ]))), 128))
              ])) : ee("", !0)
            ])) : ee("", !0),
            h.value ? ($(), R("div", Ea, N(h.value), 1)) : ee("", !0),
            u("button", {
              class: "cfw-mbs-close",
              onClick: C[8] || (C[8] = (L) => M.$emit("close"))
            }, "Close")
          ])) : e.filterMode ? ($(), R("div", Pa, [
            u("div", Aa, [
              C[13] || (C[13] = u("div", { class: "cfw-fs-label" }, "View", -1)),
              u("div", Ia, [
                ($(!0), R(te, null, Me(b(ea), ([L, ve]) => ($(), R("button", {
                  key: L,
                  class: K(["cfw-fs-pill", { active: b(o).listView === L }]),
                  onClick: (Le) => {
                    b(o).listView = L, b(i)(), M.$emit("filter-changed");
                  }
                }, N(ve), 11, Ra))), 128))
              ])
            ]),
            u("div", Oa, [
              C[14] || (C[14] = u("div", { class: "cfw-fs-label" }, "Sort", -1)),
              u("div", Da, [
                ($(!0), R(te, null, Me(b(ta), ([L, ve]) => ($(), R("button", {
                  key: L,
                  class: K(["cfw-fs-pill", { active: b(o).listSort === L }]),
                  onClick: (Le) => {
                    b(o).listSort = L, b(i)(), M.$emit("filter-changed");
                  }
                }, N(ve), 11, La))), 128))
              ])
            ]),
            u("div", ja, [
              C[15] || (C[15] = u("div", { class: "cfw-fs-label" }, "Status", -1)),
              u("div", Fa, [
                ($(!0), R(te, null, Me(b(sa), ([L, ve]) => ($(), R("button", {
                  key: L,
                  class: K(["cfw-fs-chip", { active: b(o).listStatusFilter.includes(L) }]),
                  onClick: (Le) => pe(L)
                }, N(ve), 11, Na))), 128))
              ])
            ]),
            u("button", {
              class: "cfw-mbs-close",
              style: { "margin-bottom": "8px" },
              onClick: j
            }, "Clear filters"),
            u("button", {
              class: "cfw-mbs-close",
              onClick: C[9] || (C[9] = (L) => M.$emit("close"))
            }, "Done")
          ])) : ee("", !0)
        ], 2)
      ], 64);
    };
  }
}), Ha = { class: "cfw-tab-body" }, Ua = { class: "cfw-m-settings" }, Ka = {
  id: "cfw-m-token-status",
  class: "cfw-m-settings-token"
}, Wa = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ba = { class: "cfw-m-hand-toggle" }, qa = { class: "cfw-m-hand-toggle" }, Ya = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ja = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Ga = {
  class: "cfw-m-hand-toggle",
  style: { "margin-bottom": "8px" }
}, Xa = { class: "cfw-m-swipe-settings" }, Qa = { class: "cfw-m-swipe-row" }, Za = ["value"], ef = { class: "cfw-m-swipe-row" }, tf = ["value"], sf = { class: "cfw-m-swipe-row" }, nf = ["value"], of = { class: "cfw-m-swipe-row" }, rf = ["value"], lf = /* @__PURE__ */ Xe({
  __name: "SettingsPane",
  emits: ["handedness", "token-changed"],
  setup(e, { emit: t }) {
    const s = t, n = Ee(), { persist: o } = Ve(), { clearToken: i, promptToken: r } = Vi(), { onPanelTouchStart: l, onPanelTouchEnd: c } = Dn(), h = ie(() => {
      const T = n.adminToken;
      return T ? "Token is set: " + T.slice(0, 3) + "…" : "No token set.";
    });
    function a() {
      r(), s("token-changed");
    }
    function p() {
      window.confirm("Clear saved admin token?") && (i(), s("token-changed"));
    }
    const v = [
      { value: "done_archive", label: "Done / Archive" },
      { value: "pin_unpin", label: "Pin / Unpin" },
      { value: "comment", label: "Comment" },
      { value: "create_linked_item", label: "Create linked item" },
      { value: "mark_viewed", label: "Mark viewed" },
      { value: "none", label: "None" }
    ];
    return (T, d) => ($(), R("div", {
      id: "cfw-mv-settings",
      class: K(["cfw-mv", { active: b(n).mobileTab === "settings" }])
    }, [
      u("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: d[0] || (d[0] = //@ts-ignore
        (...w) => b(l) && b(l)(...w)),
        onTouchend: d[1] || (d[1] = //@ts-ignore
        (...w) => b(c) && b(c)(...w))
      }, [...d[30] || (d[30] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      u("div", Ha, [
        u("div", Ua, [
          d[35] || (d[35] = u("h3", null, "Admin token", -1)),
          u("div", Ka, N(h.value), 1),
          u("div", { class: "cfw-m-hand-toggle" }, [
            u("button", {
              class: "cfw-m-hand-btn",
              onClick: a
            }, "Update"),
            u("button", {
              class: "cfw-m-hand-btn",
              onClick: p
            }, "Clear")
          ]),
          d[36] || (d[36] = u("p", { class: "cfw-m-settings-note" }, "Token authenticates all widget actions.", -1)),
          d[37] || (d[37] = u("h3", null, "Capture Mode", -1)),
          u("div", Wa, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).mode === "technical_issue" }]),
              onClick: d[2] || (d[2] = (w) => {
                b(n).mode = "technical_issue", b(o)();
              })
            }, "Issue", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).mode === "personal_todo" }]),
              onClick: d[3] || (d[3] = (w) => {
                b(n).mode = "personal_todo", b(o)();
              })
            }, "Todo", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).mode === "feature_request" }]),
              onClick: d[4] || (d[4] = (w) => {
                b(n).mode = "feature_request", b(o)();
              })
            }, "Feature", 2)
          ]),
          d[38] || (d[38] = u("h3", null, "Button side", -1)),
          u("div", Ba, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).handedness === "left" }]),
              onClick: d[5] || (d[5] = (w) => T.$emit("handedness", "left"))
            }, "◀ Left", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).handedness === "right" }]),
              onClick: d[6] || (d[6] = (w) => T.$emit("handedness", "right"))
            }, "Right ▶", 2)
          ]),
          d[39] || (d[39] = u("p", { class: "cfw-m-settings-note" }, "Or swipe the open button left or right.", -1)),
          d[40] || (d[40] = u("h3", null, "Panel position", -1)),
          u("div", qa, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).panelSnap === "top" }]),
              type: "button",
              onClick: d[7] || (d[7] = (w) => {
                b(n).panelSnap = "top", b(o)();
              })
            }, "▲ Top", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).panelSnap === "middle" }]),
              type: "button",
              onClick: d[8] || (d[8] = (w) => {
                b(n).panelSnap = "middle", b(o)();
              })
            }, "Middle", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).panelSnap === "bottom" }]),
              type: "button",
              onClick: d[9] || (d[9] = (w) => {
                b(n).panelSnap = "bottom", b(o)();
              })
            }, "Bottom ▼", 2)
          ]),
          d[41] || (d[41] = u("p", { class: "cfw-m-settings-note" }, "Or swipe the panel handle up or down.", -1)),
          d[42] || (d[42] = u("h3", null, "Text size", -1)),
          u("div", Ya, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).fontSize === "small" }]),
              type: "button",
              onClick: d[10] || (d[10] = (w) => {
                b(n).fontSize = "small", b(o)();
              })
            }, "Small", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).fontSize === "medium" }]),
              type: "button",
              onClick: d[11] || (d[11] = (w) => {
                b(n).fontSize = "medium", b(o)();
              })
            }, "Medium", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).fontSize === "large" }]),
              type: "button",
              onClick: d[12] || (d[12] = (w) => {
                b(n).fontSize = "large", b(o)();
              })
            }, "Large", 2)
          ]),
          d[43] || (d[43] = u("p", { class: "cfw-m-settings-note" }, "Adjust text size throughout the widget.", -1)),
          d[44] || (d[44] = u("h3", null, "Density", -1)),
          u("div", Ja, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).density === "compact" }]),
              type: "button",
              onClick: d[13] || (d[13] = (w) => {
                b(n).density = "compact", b(o)();
              })
            }, "Compact", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).density === "default" }]),
              type: "button",
              onClick: d[14] || (d[14] = (w) => {
                b(n).density = "default", b(o)();
              })
            }, "Default", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).density === "comfortable" }]),
              type: "button",
              onClick: d[15] || (d[15] = (w) => {
                b(n).density = "comfortable", b(o)();
              })
            }, "Comfortable", 2)
          ]),
          d[45] || (d[45] = u("p", { class: "cfw-m-settings-note" }, "Control spacing and row density throughout the widget.", -1)),
          d[46] || (d[46] = u("h3", null, "Theme", -1)),
          u("div", Ga, [
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).theme === "ocean" }]),
              type: "button",
              onClick: d[16] || (d[16] = (w) => {
                b(n).theme = "ocean", b(o)();
              })
            }, "🌊 Ocean", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).theme === "forest" }]),
              type: "button",
              onClick: d[17] || (d[17] = (w) => {
                b(n).theme = "forest", b(o)();
              })
            }, "🌲 Forest", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).theme === "berry" }]),
              type: "button",
              onClick: d[18] || (d[18] = (w) => {
                b(n).theme = "berry", b(o)();
              })
            }, "🫐 Berry", 2),
            u("button", {
              class: K(["cfw-m-hand-btn", { active: b(n).theme === "sunset" }]),
              type: "button",
              onClick: d[19] || (d[19] = (w) => {
                b(n).theme = "sunset", b(o)();
              })
            }, "🌅 Sunset", 2)
          ]),
          d[47] || (d[47] = u("p", { class: "cfw-m-settings-note" }, "Choose your preferred color accent.", -1)),
          d[48] || (d[48] = u("h3", null, "Swipe Actions", -1)),
          u("div", Xa, [
            u("div", Qa, [
              d[31] || (d[31] = u("label", null, "Short Right (→)", -1)),
              De(u("select", {
                "onUpdate:modelValue": d[20] || (d[20] = (w) => b(n).swipeMapping.shortRight = w),
                class: "cfw-select",
                onChange: d[21] || (d[21] = (w) => b(o)())
              }, [
                ($(), R(te, null, Me(v, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, Za)), 64))
              ], 544), [
                [qt, b(n).swipeMapping.shortRight]
              ])
            ]),
            u("div", ef, [
              d[32] || (d[32] = u("label", null, "Long Right (→→)", -1)),
              De(u("select", {
                "onUpdate:modelValue": d[22] || (d[22] = (w) => b(n).swipeMapping.longRight = w),
                class: "cfw-select",
                onChange: d[23] || (d[23] = (w) => b(o)())
              }, [
                ($(), R(te, null, Me(v, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, tf)), 64))
              ], 544), [
                [qt, b(n).swipeMapping.longRight]
              ])
            ]),
            u("div", sf, [
              d[33] || (d[33] = u("label", null, "Short Left (←)", -1)),
              De(u("select", {
                "onUpdate:modelValue": d[24] || (d[24] = (w) => b(n).swipeMapping.shortLeft = w),
                class: "cfw-select",
                onChange: d[25] || (d[25] = (w) => b(o)())
              }, [
                ($(), R(te, null, Me(v, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, nf)), 64))
              ], 544), [
                [qt, b(n).swipeMapping.shortLeft]
              ])
            ]),
            u("div", of, [
              d[34] || (d[34] = u("label", null, "Long Left (←←)", -1)),
              De(u("select", {
                "onUpdate:modelValue": d[26] || (d[26] = (w) => b(n).swipeMapping.longLeft = w),
                class: "cfw-select",
                onChange: d[27] || (d[27] = (w) => b(o)())
              }, [
                ($(), R(te, null, Me(v, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, rf)), 64))
              ], 544), [
                [qt, b(n).swipeMapping.longLeft]
              ])
            ])
          ]),
          d[49] || (d[49] = u("div", { class: "cfw-m-gesture-ref" }, [
            u("h4", null, "Gesture Reference"),
            u("div", { class: "cfw-m-gesture-row" }, [
              u("span", null, "Short Swipe:"),
              Ft(),
              u("span", null, "Gentle flick (acts immediately)")
            ]),
            u("div", { class: "cfw-m-gesture-row" }, [
              u("span", null, "Long Swipe:"),
              Ft(),
              u("span", null, "Pull across screen to edge")
            ])
          ], -1))
        ])
      ]),
      b(n).panelSnap === "middle" ? ($(), R("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: d[28] || (d[28] = //@ts-ignore
        (...w) => b(l) && b(l)(...w)),
        onTouchend: d[29] || (d[29] = //@ts-ignore
        (...w) => b(c) && b(c)(...w))
      }, [...d[50] || (d[50] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : ee("", !0)
    ], 2));
  }
}), cf = { class: "cfw-compose-header" }, af = { class: "cfw-compose-title" }, ff = {
  key: 0,
  class: "cfw-compose-context"
}, uf = { class: "cfw-compose-context-quote" }, df = { class: "cfw-compose-body" }, pf = {
  class: "cfw-textarea-wrap",
  style: { flex: "1", padding: "14px" }
}, mf = ["placeholder", "onKeydown"], hf = {
  class: "cfw-compose-actions",
  style: { padding: "14px", "border-top": "1px solid rgba(124,187,255,0.15)", display: "flex", "justify-content": "flex-end", gap: "8px" }
}, bf = ["disabled"], wf = /* @__PURE__ */ Xe({
  __name: "ComposeSheet",
  props: {
    open: { type: Boolean },
    mode: { type: String },
    issue: { type: [Object, null] }
  },
  emits: ["close", "action-done"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { submitComment: i, createLinkedItem: r } = ht(), l = /* @__PURE__ */ F(null), c = ie(() => !!o.draftDescription.trim());
    Rt(() => s.open, (a) => {
      a && (o.draftDescription = "", Tt(() => {
        var p;
        return (p = l.value) == null ? void 0 : p.focus();
      }));
    });
    async function h() {
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
`)[0], v = p.length > 50 ? p.slice(0, 50) + "..." : p;
          await r(s.issue.number, v, a, !1);
        }
        o.draftDescription = "", n("action-done"), n("close");
      } catch (p) {
        o.createError = p instanceof Error ? p.message : "Failed to submit";
      } finally {
        o.creating = !1;
      }
    }
    return (a, p) => ($(), R(te, null, [
      u("div", {
        id: "cfw-compose-overlay",
        class: K({ active: e.open }),
        onClick: p[0] || (p[0] = (v) => a.$emit("close"))
      }, null, 2),
      u("div", {
        id: "cfw-compose-sheet",
        class: K({ active: e.open, "panel-left": b(o).handedness === "left" })
      }, [
        p[4] || (p[4] = u("div", { id: "cfw-compose-handle" }, null, -1)),
        u("div", cf, [
          u("span", af, N(e.mode === "comment" ? "New Comment" : "Create Linked Item"), 1),
          u("button", {
            class: "cfw-compose-close",
            onClick: p[1] || (p[1] = (v) => a.$emit("close"))
          }, "×")
        ]),
        e.issue ? ($(), R("div", ff, [
          u("div", uf, [
            u("strong", null, "#" + N(e.issue.number), 1),
            Ft(" " + N(e.issue.title), 1)
          ])
        ])) : ee("", !0),
        u("div", df, [
          u("div", pf, [
            De(u("textarea", {
              ref_key: "descRef",
              ref: l,
              "onUpdate:modelValue": p[2] || (p[2] = (v) => b(o).draftDescription = v),
              placeholder: e.mode === "comment" ? "Write a comment..." : "Describe the linked item...",
              maxlength: "5000",
              style: { height: "100%", border: "none", background: "transparent", color: "#d9e7f7", "font-size": "14px", width: "100%", resize: "none", outline: "none", padding: "0" },
              onKeydown: [
                Nt(mt(h, ["ctrl"]), ["enter"]),
                Nt(mt(h, ["meta"]), ["enter"])
              ]
            }, null, 40, mf), [
              [$s, b(o).draftDescription]
            ])
          ]),
          u("div", hf, [
            u("button", {
              class: "cfw-btn cfw-btn-outline",
              onClick: p[3] || (p[3] = (v) => a.$emit("close"))
            }, "Cancel"),
            u("button", {
              class: "cfw-btn cfw-btn-primary",
              disabled: !c.value,
              onClick: h
            }, N(b(o).creating ? "Submitting..." : "Submit"), 9, bf)
          ])
        ])
      ], 2)
    ], 64));
  }
}), gf = { class: "cfw-settings-row" }, vf = ["aria-expanded"], xf = ["disabled"], yf = ["disabled"], _f = ["disabled"], Sf = {
  key: 1,
  class: "cfw-m-verror active"
}, kf = /* @__PURE__ */ Xe({
  __name: "VoiceComposer",
  props: {
    mobile: { type: Boolean }
  },
  emits: ["toggle-recording", "reset", "send"],
  setup(e) {
    const t = Ee(), { persist: s } = Ve(), n = /* @__PURE__ */ F(!1), o = ie(() => t.voiceDraftState === "recording" ? "Recording in progress" : t.voiceDraftState === "paused" && t.voiceDraftReady ? "Recording paused" : "Ready to record");
    function i(r) {
      const l = Math.max(0, Math.floor((r || 0) / 1e3)), c = Math.floor(l / 60), h = l % 60;
      return String(c).padStart(2, "0") + ":" + String(h).padStart(2, "0");
    }
    return (r, l) => ($(), R("div", {
      class: K(e.mobile ? "cfw-m-voice" : "cfw-voice-shell")
    }, [
      e.mobile ? ee("", !0) : ($(), R(te, { key: 0 }, [
        u("div", gf, [
          l[6] || (l[6] = u("p", { class: "cfw-muted-note" }, "Current URL is attached automatically to the issue payload.", -1)),
          u("button", {
            id: "cfw-draft-settings-toggle",
            type: "button",
            class: "cfw-btn cfw-btn-outline cfw-settings-toggle",
            "aria-expanded": n.value ? "true" : "false",
            "aria-controls": "cfw-draft-settings",
            onClick: l[0] || (l[0] = (c) => n.value = !n.value)
          }, "⚙", 8, vf)
        ]),
        u("div", {
          id: "cfw-draft-settings",
          class: K(["cfw-settings-panel", { active: n.value }])
        }, [
          l[8] || (l[8] = u("label", {
            class: "cfw-label",
            for: "cfw-merge-policy"
          }, "Merge policy", -1)),
          De(u("select", {
            id: "cfw-merge-policy",
            class: "cfw-select",
            "onUpdate:modelValue": l[1] || (l[1] = (c) => b(t).draftMergePolicy = c),
            onChange: l[2] || (l[2] = //@ts-ignore
            (...c) => b(s) && b(s)(...c))
          }, [...l[7] || (l[7] = [
            u("option", { value: "manual" }, "Manual merge", -1),
            u("option", { value: "auto_unblocked" }, "Auto-merge when unblocked", -1)
          ])], 544), [
            [qt, b(t).draftMergePolicy]
          ])
        ], 2)
      ], 64)),
      u("div", {
        class: K(e.mobile ? "cfw-m-vstatus" : "cfw-voice-status")
      }, [
        u("div", {
          class: K(e.mobile ? "cfw-m-vstatus-line" : "cfw-voice-status-line")
        }, N(o.value), 3),
        u("div", {
          class: K(e.mobile ? "cfw-m-vmeta" : "cfw-voice-meta")
        }, [
          l[9] || (l[9] = u("span", null, "Draft recording", -1)),
          u("strong", null, N(i(b(t).voiceDraftDurationMs)), 1)
        ], 2)
      ], 2),
      u("div", {
        class: K(e.mobile ? "cfw-m-vcontrols" : "cfw-voice-controls")
      }, [
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-record",
          disabled: b(t).creating,
          onClick: l[3] || (l[3] = (c) => r.$emit("toggle-recording"))
        }, N(b(t).voiceDraftState === "recording" ? "Pause" : "Record"), 9, xf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-reset",
          disabled: b(t).creating || !b(t).voiceDraftReady && b(t).voiceDraftState === "idle",
          onClick: l[4] || (l[4] = (c) => r.$emit("reset"))
        }, "Reset", 8, yf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-send",
          disabled: b(t).creating || b(t).voiceDraftState === "recording" || !b(t).voiceDraftReady,
          onClick: l[5] || (l[5] = (c) => r.$emit("send"))
        }, "Send", 8, _f)
      ], 2),
      u("div", {
        class: K(e.mobile ? "cfw-m-vhint" : "cfw-voice-hint")
      }, N(b(t).voiceDraftReady ? "Recording is ready to send." : "Tap Record to start a draft. Settings ⚙ contains merge policy."), 3),
      b(t).createError && e.mobile ? ($(), R("div", Sf, N(b(t).createError), 1)) : ee("", !0)
    ], 2));
  }
}), Cf = ["data-font-size", "data-density", "data-theme"], Tf = { class: "cfw-tab-body" }, zf = {
  key: 0,
  class: "cfw-compose-mode-toggle"
}, $f = { class: "cfw-m-success-hint" }, Mf = {
  key: 2,
  id: "cfw-mv-text-form",
  class: "cfw-mf"
}, Ef = { id: "cfw-mobile-nav" }, Pf = /* @__PURE__ */ Xe({
  __name: "MobileWidget",
  setup(e, { expose: t }) {
    const s = Ee(), { persist: n } = Ve(), { onPanelTouchStart: o, onPanelTouchEnd: i } = Dn(), { loadIssues: r, authorize: l } = ht(), c = xc(), h = Sc(), a = kc(), p = Tc(), v = /* @__PURE__ */ F(null), T = ie(() => ({
      display: "flex",
      flexDirection: "column"
    })), d = ie(() => s.textCreateSuccess || s.voiceCreateSuccess), w = ie(() => s.voiceCreateSuccess ? "Voice request submitted" : "Tap to submit another"), U = ie(() => s.voiceCreateSuccess ? h.undoSecondsLeft.value : c.undoSecondsLeft.value);
    function X(q) {
      s.mobileTab = q, q === "list" && r(!1), q === "text" && Tt(() => {
        var k;
        return (k = v.value) == null ? void 0 : k.focusTitle();
      }), n();
    }
    function E(q) {
      s.composeMode = q, s.createError = "", q === "text" && Tt(() => {
        var k;
        return (k = v.value) == null ? void 0 : k.focusTitle();
      }), n();
    }
    function A() {
      s.voiceCreateSuccess ? h.dismissSuccess() : c.reset();
    }
    function P() {
      s.voiceCreateSuccess ? h.undo() : c.undo();
    }
    const V = /* @__PURE__ */ F(!1), ge = /* @__PURE__ */ F("comment"), pe = /* @__PURE__ */ F(null);
    function j(q, k) {
      ge.value = q, pe.value = k, V.value = !0, J(3);
    }
    async function M(q, k) {
      if (q !== "none") {
        if (q === "mark_viewed") {
          s.itemViews[k.number] = Date.now(), n();
          return;
        }
        if (q === "comment" || q === "create_linked_item") {
          j(q, k);
          return;
        }
        try {
          await ht().executeAction(k.number, q, "issue"), await r(!0);
        } catch (Y) {
          console.warn("Action failed", Y);
        }
      }
    }
    function C(q) {
      a.openIssue(q, !0), J(2);
    }
    function re(q) {
      a.openIssue(q), J(2);
    }
    function we() {
      a.openFilter(), J(2);
    }
    async function L() {
      await r(!0);
    }
    function ve() {
      l() && (p.open(), J(1));
    }
    function Le() {
      r(!0);
    }
    function ce(q = !1) {
      var k;
      if (V.value = !1, a.close(), p.close(), !q) {
        const Y = ((k = window.history.state) == null ? void 0 : k.widgetDepth) || 0;
        Y > 0 && history.go(-Y);
      }
    }
    function J(q) {
      var Y;
      (((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0) < q && history.pushState({ widgetDepth: q }, "");
    }
    function ne(q) {
      var Y;
      q === 3 ? V.value = !1 : q === 2 ? a.close() : q === 1 && ce(!1);
      const k = ((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0;
      k >= q && history.go(-(k - q + 1));
    }
    function Qe() {
      window.addEventListener("popstate", wt);
    }
    function wt(q) {
      var Y;
      const k = ((Y = window.history.state) == null ? void 0 : Y.widgetDepth) || 0;
      k < 3 && V.value && (V.value = !1), k < 2 && a.sheetOpen.value && a.close(), k < 1 && p.isOpen.value && p.close();
    }
    Pn(() => {
      c.stopUndoCountdown(), h.stopUndoCountdown(), h.stopVoiceTimer(), window.removeEventListener("popstate", wt);
    }), Qe();
    function Ze(q) {
      if (!l()) return;
      const k = typeof q == "string" ? parseInt(q, 10) : q;
      p.isOpen.value || (p.open(), J(1)), X("list");
      const Y = s.issues.find((zt) => zt.number === k);
      Y ? re(Y) : ht().loadIssues(!0).then(() => {
        const zt = s.issues.find((gt) => gt.number === k);
        zt && re(zt);
      });
    }
    return t({ openItem: Ze }), (q, k) => ($(), R(te, null, [
      De(u("button", {
        id: "cfw-mobile-launcher",
        type: "button",
        "aria-label": "Open feedback widget",
        class: K({ "panel-left": b(s).handedness === "left" }),
        onTouchstartPassive: k[0] || (k[0] = //@ts-ignore
        (...Y) => b(p).onTouchStart && b(p).onTouchStart(...Y)),
        onTouchend: k[1] || (k[1] = //@ts-ignore
        (...Y) => b(p).onTouchEnd && b(p).onTouchEnd(...Y)),
        onClick: k[2] || (k[2] = (Y) => ve())
      }, [...k[22] || (k[22] = [
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
        [sn, !b(p).isOpen.value]
      ]),
      u("div", {
        id: "cfw-swipe-hint",
        class: K({ visible: b(p).swipeHintVisible.value }),
        style: Dt(b(p).swipeHintStyle.value)
      }, "← swipe →", 6),
      De(u("div", {
        id: "cfw-desktop-backdrop",
        onClick: k[3] || (k[3] = (Y) => ce(!1))
      }, null, 512), [
        [sn, b(p).isOpen.value]
      ]),
      De(u("div", {
        id: "cfw-mobile",
        class: K({ "panel-left": b(s).handedness === "left" }),
        style: Dt(T.value),
        "data-font-size": b(s).fontSize,
        "data-density": b(s).density,
        "data-theme": b(s).theme
      }, [
        u("div", {
          id: "cfw-mobile-body",
          class: K({ "snap-bottom": b(s).panelSnap === "bottom", "snap-top": b(s).panelSnap === "top", "snap-middle": b(s).panelSnap === "middle" })
        }, [
          u("div", {
            id: "cfw-mv-text",
            class: K(["cfw-mv", { active: b(s).mobileTab === "text" }])
          }, [
            d.value ? ee("", !0) : ($(), R("div", {
              key: 0,
              class: "cfw-panel-handle",
              onTouchstartPassive: k[4] || (k[4] = //@ts-ignore
              (...Y) => b(o) && b(o)(...Y)),
              onTouchend: k[5] || (k[5] = //@ts-ignore
              (...Y) => b(i) && b(i)(...Y))
            }, [...k[23] || (k[23] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)),
            u("div", Tf, [
              d.value ? ee("", !0) : ($(), R("div", zf, [
                u("button", {
                  type: "button",
                  class: K(["cfw-compose-mode-btn", { active: b(s).composeMode === "text" }]),
                  onClick: k[6] || (k[6] = (Y) => E("text"))
                }, "Text", 2),
                u("button", {
                  type: "button",
                  class: K(["cfw-compose-mode-btn", { active: b(s).composeMode === "voice" }]),
                  onClick: k[7] || (k[7] = (Y) => E("voice"))
                }, "Voice", 2)
              ])),
              d.value ? ($(), R("div", {
                key: 1,
                id: "cfw-mv-compose-success",
                class: "cfw-m-success",
                onClick: k[9] || (k[9] = (Y) => A())
              }, [
                k[24] || (k[24] = u("div", { class: "cfw-m-success-ring" }, [
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
                u("div", $f, N(w.value), 1),
                U.value > 0 && b(s).lastSubmissionId ? ($(), R("button", {
                  key: 0,
                  id: "cfw-mv-compose-undo",
                  class: "cfw-m-undo-btn",
                  onClick: k[8] || (k[8] = mt((Y) => P(), ["stop"]))
                }, "Undo (" + N(U.value) + ")", 1)) : ee("", !0)
              ])) : b(s).composeMode === "text" ? ($(), R("div", Mf, [
                ke(Rc, {
                  ref_key: "textFormRef",
                  ref: v,
                  mobile: !0,
                  "title-id": "cfw-m-title",
                  "desc-id": "cfw-m-description",
                  onCreate: b(c).submit
                }, null, 8, ["onCreate"])
              ])) : ($(), rs(kf, {
                key: 3,
                mobile: !0,
                onToggleRecording: b(h).toggleRecording,
                onReset: b(h).reset,
                onSend: b(h).submit
              }, null, 8, ["onToggleRecording", "onReset", "onSend"]))
            ]),
            b(s).panelSnap === "middle" && !d.value ? ($(), R("div", {
              key: 1,
              class: "cfw-panel-handle cfw-panel-handle-bottom",
              onTouchstartPassive: k[10] || (k[10] = //@ts-ignore
              (...Y) => b(o) && b(o)(...Y)),
              onTouchend: k[11] || (k[11] = //@ts-ignore
              (...Y) => b(i) && b(i)(...Y))
            }, [...k[25] || (k[25] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)) : ee("", !0)
          ], 2),
          ke(Zc, {
            onRefresh: k[12] || (k[12] = (Y) => b(r)(!0)),
            onOpenIssue: re,
            onOpenFilter: we,
            onSwipeAction: M
          }),
          ke(lf, {
            onHandedness: b(p).applyHandedness,
            onTokenChanged: Le
          }, null, 8, ["onHandedness"])
        ], 2),
        u("nav", Ef, [
          b(s).handedness === "left" ? ($(), R("button", {
            key: 0,
            class: "cfw-nav-btn",
            type: "button",
            onClick: k[13] || (k[13] = (Y) => ce(!1))
          }, [...k[26] || (k[26] = [
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
          ])])) : ee("", !0),
          u("button", {
            id: "cfw-nav-text",
            class: K(["cfw-nav-btn", { active: b(s).mobileTab === "text" }]),
            type: "button",
            onClick: k[14] || (k[14] = (Y) => X("text"))
          }, [...k[27] || (k[27] = [
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
            class: K(["cfw-nav-btn", { active: b(s).mobileTab === "list" }]),
            type: "button",
            onClick: k[15] || (k[15] = (Y) => X("list"))
          }, [...k[28] || (k[28] = [
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
            class: K(["cfw-nav-btn", { active: b(s).mobileTab === "settings" }]),
            type: "button",
            onClick: k[16] || (k[16] = (Y) => X("settings"))
          }, [...k[29] || (k[29] = [
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
          b(s).handedness !== "left" ? ($(), R("button", {
            key: 1,
            class: "cfw-nav-btn",
            type: "button",
            onClick: k[17] || (k[17] = (Y) => ce(!1))
          }, [...k[30] || (k[30] = [
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
          ])])) : ee("", !0)
        ])
      ], 14, Cf), [
        [sn, b(p).isOpen.value]
      ]),
      ke(Va, {
        open: b(a).sheetOpen.value,
        issue: b(a).sheetIssue.value,
        "filter-mode": b(a).filterMode.value,
        "edit-mode": b(a).editMode.value,
        onActionDone: L,
        onClose: k[18] || (k[18] = (Y) => ne(2)),
        onCancelEdit: k[19] || (k[19] = (Y) => b(a).editMode.value = !1),
        onFilterChanged: k[20] || (k[20] = (Y) => b(r)(!0)),
        onComposeSheet: j,
        onEditIssue: C
      }, null, 8, ["open", "issue", "filter-mode", "edit-mode"]),
      ke(wf, {
        open: V.value,
        mode: ge.value,
        issue: pe.value,
        onClose: k[21] || (k[21] = (Y) => ne(3)),
        onActionDone: L
      }, null, 8, ["open", "mode", "issue"])
    ], 64));
  }
}), Af = /* @__PURE__ */ Xe({
  __name: "FeedbackWidget.ce",
  props: {
    widgetConfig: { type: Object }
  },
  setup(e, { expose: t }) {
    const s = e, n = Ee(), { restore: o } = Ve(), { readToken: i } = Vi(), r = /* @__PURE__ */ F(null);
    return t({
      openItem(l) {
        r.value && r.value.openItem(l);
      }
    }), Hs(() => {
      s.widgetConfig && (n.init(s.widgetConfig), o(), i());
    }), (l, c) => ($(), rs(Pf, {
      ref_key: "mobileWidgetRef",
      ref: r
    }, null, 512));
  }
}), If = "*{box-sizing:border-box}:host{all:initial;font-family:IBM Plex Sans,Segoe UI,sans-serif}#cfw-mobile{font-size:15px}#cfw-mobile[data-font-size=small]{font-size:13px}#cfw-mobile[data-font-size=large]{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-nav-btn{font-size:calc(10px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-nav-btn{font-size:12px}#cfw-mobile[data-font-size=small] #cfw-ml-head-title{font-size:10.4px}#cfw-mobile[data-font-size=large] #cfw-ml-head-title{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] #cfw-ml-head-actions button{font-size:10.4px}#cfw-mobile[data-font-size=large] #cfw-ml-head-actions button{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] #cfw-ml-ptr{font-size:10.4px}#cfw-mobile[data-font-size=large] #cfw-ml-ptr{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-ml-empty{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-empty{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-ml-row-bg{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-bg{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-ml-section-label{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-section-label{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-ml-row-status{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-status{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-ml-row-comments{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-comments{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-ml-row-time{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-time{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-ml-row-title{font-size:calc(14px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-title{font-size:16.8px}#cfw-mobile[data-font-size=small] .cfw-ml-row-menu{font-size:calc(18px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-ml-row-menu{font-size:calc(18px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-desktop-menu button{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-desktop-menu button{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-compose-mode-btn{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-compose-mode-btn{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-mf input{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf input{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf textarea{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf textarea{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf-policy label{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-mf-policy label{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-mf-error{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-mf-error{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-mf-actions button{font-size:calc(14px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-mf-actions button{font-size:16.8px}#cfw-mobile[data-font-size=small] .cfw-m-success-hint{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-success-hint{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-m-undo-btn{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-undo-btn{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-vstatus-line{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vstatus-line{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vmeta{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-vmeta{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-m-vcontrols button{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vcontrols button{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vhint{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-vhint{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-verror{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-verror{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-m-settings h3{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-settings h3{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-settings-btn{font-size:calc(14px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-settings-btn{font-size:16.8px}#cfw-mobile[data-font-size=small] .cfw-m-settings-note{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-settings-note{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-settings-token{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-settings-token{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-settings select{font-size:calc(14px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-settings select{font-size:16.8px}#cfw-mobile[data-font-size=small] .cfw-m-hand-btn{font-size:calc(14px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-hand-btn{font-size:16.8px}#cfw-mobile[data-font-size=small] #cfw-swipe-hint{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] #cfw-swipe-hint{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-fs-label{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-fs-label{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-fs-pill{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-fs-pill{font-size:calc(12px * 18/15)}#cfw-mobile[data-font-size=small] .cfw-m-swipe-row label{font-size:calc(13px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-swipe-row label{font-size:15.6px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-ref h4{font-size:calc(11px * 13/15)}#cfw-mobile[data-font-size=large] .cfw-m-gesture-ref h4{font-size:13.2px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-row{font-size:10.4px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-row{font-size:calc(12px * 18/15)}:root{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 14px;--cfw-density-nav-h: 56px}#cfw-mobile[data-density=compact]{--cfw-density-row-pad: 10px;--cfw-density-body-pad: 10px;--cfw-density-gap: 10px;--cfw-density-nav-h: 48px}#cfw-mobile[data-density=compact] .cfw-ml-row{padding-top:10px;padding-bottom:10px}#cfw-mobile[data-density=compact] .cfw-tab-body{padding:10px}#cfw-mobile[data-density=compact] .cfw-m-settings{gap:10px;padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=compact] .cfw-mf{padding:10px;gap:8px}#cfw-mobile[data-density=compact] #cfw-mobile-nav{height:48px}#cfw-mobile[data-density=compact] .cfw-m-voice{padding:10px;gap:10px}#cfw-mobile[data-density=compact] .cfw-m-swipe-settings{gap:8px}#cfw-mobile[data-density=compact] .cfw-compose-mode-toggle{padding-top:10px}#cfw-mobile[data-density=comfortable]{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 18px;--cfw-density-nav-h: 60px}#cfw-mobile[data-density=comfortable] .cfw-ml-row{padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=comfortable] .cfw-tab-body{padding:14px}#cfw-mobile[data-density=comfortable] .cfw-m-settings{gap:18px;padding-top:20px;padding-bottom:20px}#cfw-mobile[data-density=comfortable] .cfw-mf{padding:14px;gap:14px}#cfw-mobile[data-density=comfortable] #cfw-mobile-nav{height:60px}#cfw-mobile[data-density=comfortable] .cfw-m-voice{padding:14px;gap:16px}#cfw-mobile[data-density=comfortable] .cfw-m-swipe-settings{gap:14px}#cfw-mobile[data-density=comfortable] .cfw-compose-mode-toggle{padding-top:14px}.cfw-tab-body::-webkit-scrollbar{width:6px}.cfw-tab-body::-webkit-scrollbar-track{background:transparent}.cfw-tab-body::-webkit-scrollbar-thumb{background:var(--cfw-accent-dim, #2f4864);border-radius:3px}.cfw-tab-body::-webkit-scrollbar-thumb:hover{background:var(--cfw-accent, #7cc4ff)}.cfw-tab-body{scrollbar-width:thin;scrollbar-color:var(--cfw-accent-dim, #2f4864) transparent}#cfw-mobile[data-theme=ocean]{--cfw-accent: #7cc4ff;--cfw-accent-soft: #9ad2ff;--cfw-accent-dim: #2f4864;--cfw-accent-bg: rgba(124, 187, 255, .1)}#cfw-mobile[data-theme=forest]{--cfw-accent: #6ee7b7;--cfw-accent-soft: #a7f3d0;--cfw-accent-dim: #2d4a3e;--cfw-accent-bg: rgba(110, 231, 183, .1)}#cfw-mobile[data-theme=forest] #cfw-mobile-launcher{color:#6ee7b7;border-color:#6ee7b766}#cfw-mobile[data-theme=forest] #cfw-nav-text.active,#cfw-mobile[data-theme=forest] #cfw-nav-list.active,#cfw-mobile[data-theme=forest] #cfw-nav-settings.active,#cfw-mobile[data-theme=forest] .cfw-nav-btn.active,#cfw-mobile[data-theme=forest] #cfw-ml-head-title,#cfw-mobile[data-theme=forest] .cfw-ml-section-label,#cfw-mobile[data-theme=forest] .cfw-ml-row-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-panel-handle-bar{background:#2d4a3e}#cfw-mobile[data-theme=forest] .cfw-m-settings h3{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=forest] .cfw-compose-mode-btn.active{border-color:#6ee7b78c;color:#d9e7f7}#cfw-mobile[data-theme=forest] .cfw-m-success-ring{border-color:#6ee7b759;background:#6ee7b71f}#cfw-mobile[data-theme=forest] .cfw-fs-label,#cfw-mobile[data-theme=forest] .cfw-is-status,#cfw-mobile[data-theme=forest] .cfw-is-section-label,#cfw-mobile[data-theme=forest] .cfw-m-gesture-ref h4{color:#6ee7b7}#cfw-mobile[data-theme=berry]{--cfw-accent: #c4b5fd;--cfw-accent-soft: #ddd6fe;--cfw-accent-dim: #4c4568;--cfw-accent-bg: rgba(196, 181, 253, .1)}#cfw-mobile[data-theme=berry] #cfw-mobile-launcher{color:#c4b5fd;border-color:#c4b5fd66}#cfw-mobile[data-theme=berry] #cfw-nav-text.active,#cfw-mobile[data-theme=berry] #cfw-nav-list.active,#cfw-mobile[data-theme=berry] #cfw-nav-settings.active,#cfw-mobile[data-theme=berry] .cfw-nav-btn.active,#cfw-mobile[data-theme=berry] #cfw-ml-head-title,#cfw-mobile[data-theme=berry] .cfw-ml-section-label,#cfw-mobile[data-theme=berry] .cfw-ml-row-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-panel-handle-bar{background:#4c4568}#cfw-mobile[data-theme=berry] .cfw-m-settings h3{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=berry] .cfw-compose-mode-btn.active{border-color:#c4b5fd8c;color:#d9e7f7}#cfw-mobile[data-theme=berry] .cfw-m-success-ring{border-color:#c4b5fd59;background:#c4b5fd1f}#cfw-mobile[data-theme=berry] .cfw-fs-label,#cfw-mobile[data-theme=berry] .cfw-is-status,#cfw-mobile[data-theme=berry] .cfw-is-section-label,#cfw-mobile[data-theme=berry] .cfw-m-gesture-ref h4{color:#c4b5fd}#cfw-mobile[data-theme=sunset]{--cfw-accent: #fdba74;--cfw-accent-soft: #fed7aa;--cfw-accent-dim: #5c4538;--cfw-accent-bg: rgba(253, 186, 116, .1)}#cfw-mobile[data-theme=sunset] #cfw-mobile-launcher{color:#fdba74;border-color:#fdba7466}#cfw-mobile[data-theme=sunset] #cfw-nav-text.active,#cfw-mobile[data-theme=sunset] #cfw-nav-list.active,#cfw-mobile[data-theme=sunset] #cfw-nav-settings.active,#cfw-mobile[data-theme=sunset] .cfw-nav-btn.active,#cfw-mobile[data-theme=sunset] #cfw-ml-head-title,#cfw-mobile[data-theme=sunset] .cfw-ml-section-label,#cfw-mobile[data-theme=sunset] .cfw-ml-row-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-panel-handle-bar{background:#5c4538}#cfw-mobile[data-theme=sunset] .cfw-m-settings h3{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=sunset] .cfw-compose-mode-btn.active{border-color:#fdba748c;color:#d9e7f7}#cfw-mobile[data-theme=sunset] .cfw-m-success-ring{border-color:#fdba7459;background:#fdba741f}#cfw-mobile[data-theme=sunset] .cfw-fs-label,#cfw-mobile[data-theme=sunset] .cfw-is-status,#cfw-mobile[data-theme=sunset] .cfw-is-section-label,#cfw-mobile[data-theme=sunset] .cfw-m-gesture-ref h4{color:#fdba74}#cfw-desktop-backdrop{display:none}#cfw-mobile{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;background:#0a111d;color:#d9e7f7;font-family:IBM Plex Sans,Segoe UI,sans-serif}.cfw-panel-handle{height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none}.cfw-panel-handle-bar{width:36px;height:4px;background:#2f4864;border-radius:2px}.cfw-panel-handle-bottom{margin-top:auto}.cfw-panel-handle-bottom .cfw-panel-handle-bar{opacity:.7}#cfw-mobile-launcher{display:flex;position:fixed;bottom:20px;right:10px;width:34px;height:34px;border-radius:6px;background:#0a111de6;border:1px solid rgba(124,187,255,.4);color:#9ad2ff;align-items:center;justify-content:center;cursor:pointer;z-index:9998;box-shadow:0 8px 20px #02070e59;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);-webkit-tap-highlight-color:transparent}#cfw-mobile-launcher.panel-left{left:10px;right:auto}#cfw-mobile-launcher svg{width:14px;height:14px}#cfw-mobile-body{flex:1;overflow:hidden;position:relative}.cfw-mv{position:absolute;top:0;right:0;bottom:0;left:0;display:none;flex-direction:column;overflow:hidden}.cfw-mv.active{display:flex}.cfw-tab-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain}#cfw-mobile-body.snap-bottom .cfw-mv{justify-content:flex-end}#cfw-mobile-body.snap-bottom .cfw-tab-body{flex:0 0 auto;max-height:100%}#cfw-mobile-body.snap-top .cfw-tab-body{order:0;flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-body.snap-top .cfw-panel-handle{order:1}#cfw-mobile-body.snap-middle .cfw-mv{justify-content:center}#cfw-mobile-body.snap-middle .cfw-tab-body{flex:0 0 auto;max-height:calc(100% - 56px)}#cfw-mobile-body.snap-middle .cfw-panel-handle-bottom{flex-shrink:0}#cfw-mobile-nav{height:56px;display:flex;border-top:1px solid rgba(124,187,255,.18);background:#0a111dfa;flex-shrink:0}.cfw-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:none;border:none;color:#7f9cbc;cursor:pointer;font-size:10px;padding:0;-webkit-tap-highlight-color:transparent}.cfw-nav-btn.active{color:#9ad2ff}.cfw-nav-btn svg{width:20px;height:20px}#cfw-ml-head{padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(124,187,255,.18);flex-shrink:0}#cfw-ml-head-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}#cfw-ml-head-actions{display:flex;gap:8px}#cfw-ml-head-actions button{height:30px;padding:0 10px;border:1px solid #2f4864;border-radius:6px;background:#0d1727;color:#9bb7d3;font-size:12px;cursor:pointer}#cfw-ml-head-actions button:disabled{opacity:.5}#cfw-ml-body{overflow-y:auto;overscroll-behavior-y:contain}#cfw-ml-ptr{height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9ad2ff;transition:height .15s ease;flex-shrink:0}#cfw-ml-ptr.cfw-ml-ptr-active{height:36px}.cfw-ml-empty{padding:32px 14px;font-size:13px;color:#7f9cbc;text-align:center;line-height:1.6}.cfw-ml-row-wrap{position:relative;border-bottom:1px solid #1a2d42}.cfw-ml-row-bg{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font-size:13px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.cfw-ml-row-bg.bg-left{background:#eab308;opacity:1;justify-content:flex-start}.cfw-ml-row-bg.bg-right{background:#3b82f6;opacity:1;justify-content:flex-end}.cfw-swipe-preview{display:flex;align-items:center;gap:8px}.cfw-swipe-preview.preview-left{flex-direction:row-reverse}.cfw-ml-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:12px 20px 4px;font-weight:600}.cfw-ml-row{position:relative;padding:14px 20px;background:#0a111d;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;-webkit-tap-highlight-color:transparent}.cfw-ml-row:active{background:#7cbbff0f}.cfw-ml-row-main{flex:1;min-width:0}.cfw-ml-row-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.cfw-ml-row-status{font-size:11px;color:#7cc4ff;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-ml-row-comments{font-size:11px;color:#7f9cbc}.cfw-ml-unread-dot{width:6px;height:6px;border-radius:50%;background:#ef4444}.cfw-ml-row-time{font-size:11px;color:#7f9cbc;margin-left:auto}.cfw-ml-row-title{font-size:14px;color:#d9e7f7;line-height:1.4;word-break:break-word}.cfw-ml-row-menu{background:none;border:none;color:#7f9cbc;font-size:18px;line-height:1;padding:4px 8px;cursor:pointer;margin-top:-2px}.cfw-desktop-menu{position:absolute;right:20px;top:36px;background:#0d1727;border:1px solid rgba(124,187,255,.28);border-radius:8px;padding:6px;display:flex;flex-direction:column;z-index:10;box-shadow:0 4px 12px #00000080}.cfw-desktop-menu button{background:none;border:none;color:#d9e7f7;padding:8px 12px;text-align:left;font-size:13px;cursor:pointer;border-radius:4px;white-space:nowrap}.cfw-desktop-menu button:hover{background:#7cbbff1a}#cfw-ml-error{margin:8px 14px 0}#cfw-mbs-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10001;display:none}#cfw-mbs-overlay.active{display:block}#cfw-mbs{position:fixed;bottom:0;left:0;right:0;z-index:10002;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 36px;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .25s ease}#cfw-mbs.active{transform:translateY(0)}#cfw-mbs-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px}.cfw-mf{display:flex;flex-direction:column;padding:14px}.cfw-compose-mode-toggle{display:flex;gap:8px;padding:14px 14px 0;flex-shrink:0}.cfw-compose-mode-btn{flex:1;height:36px;border-radius:999px;border:1px solid #2f4864;background:#0d1727;color:#9bb7d3;font-size:13px;font-weight:600;cursor:pointer}.cfw-compose-mode-btn.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f2035}.cfw-mf input,.cfw-mf textarea,.cfw-mf select{width:100%;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;box-sizing:border-box;font-family:inherit}.cfw-mf input{height:44px;padding:0 14px;margin-bottom:10px;font-size:15px;flex-shrink:0}.cfw-textarea-wrap{margin-bottom:10px}.cfw-mf textarea{width:100%;height:130px;min-height:130px;max-height:40vh;padding:12px 14px;font-size:15px;resize:none;overflow-y:hidden;margin-bottom:0}.cfw-mf input::placeholder,.cfw-mf textarea::placeholder{color:#7f9cbc}.cfw-mf input:focus,.cfw-mf textarea:focus{outline:none;border-color:#4f7298}.cfw-mf-policy{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.cfw-mf-policy label{font-size:12px;color:#9bb7d3}.cfw-mf-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:8px;flex-shrink:0}.cfw-mf-error.active{display:block}.cfw-mf-actions{display:flex;gap:8px;flex-shrink:0}.cfw-mf-actions button{flex:1;height:48px;border-radius:8px;border:1px solid;font-size:14px;cursor:pointer}.cfw-m-success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.cfw-m-success-ring{width:80px;height:80px;border-radius:50%;background:#4ade801f;border:2px solid rgba(74,222,128,.35);display:flex;align-items:center;justify-content:center;margin-bottom:18px}.cfw-m-success-ring svg{width:44px;height:44px;color:#4ade80}.cfw-m-success-hint{font-size:13px;color:#7f9cbc}.cfw-m-undo-btn{margin-top:14px;padding:7px 18px;border-radius:8px;border:1px solid rgba(124,187,255,.35);background:transparent;color:#d9e7f7;font-size:12px;cursor:pointer}.cfw-m-undo-btn:hover{background:#7cbbff14}.cfw-m-voice{display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:14px}.cfw-m-vstatus{border:1px solid #2f4864;border-radius:12px;padding:16px;background:#0b1828a6;flex-shrink:0}.cfw-m-vstatus-line{font-size:15px;color:#d9e7f7;margin-bottom:8px}.cfw-m-vmeta{display:flex;justify-content:space-between;font-size:13px;color:#9bb7d3}.cfw-m-vcontrols{display:flex;gap:10px;flex-shrink:0}.cfw-m-vcontrols button{flex:1;height:52px;border-radius:10px;border:1px solid;font-size:15px;cursor:pointer}.cfw-m-vcontrols .cfw-btn-record{background:#dc2626;border-color:#dc2626;color:#fff}.cfw-m-vcontrols .cfw-btn-record:active{background:#b91d1d}.cfw-m-vcontrols .cfw-btn-send{background:#16a34a;border-color:#16a34a;color:#fff}.cfw-m-vcontrols .cfw-btn-send:active{background:#15803d}.cfw-m-vcontrols .cfw-btn-send:disabled{background:#14532d;border-color:#14532d;color:#7f9cbc}.cfw-m-vcontrols .cfw-btn-reset{background:#d97706;border-color:#d97706;color:#fff}.cfw-m-vcontrols .cfw-btn-reset:active{background:#b45309}.cfw-m-vcontrols .cfw-btn-reset:disabled{background:#78350f;border-color:#78350f;color:#7f9cbc}.cfw-m-vhint{font-size:12px;color:#7f9cbc;flex-shrink:0}.cfw-m-verror{font-size:13px;color:#ff9a9a;display:none;flex-shrink:0}.cfw-m-verror.active{display:block}.cfw-m-settings{padding:20px 14px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}.cfw-m-settings h3{margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}.cfw-m-settings-btn{height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;width:100%}.cfw-m-settings-btn:active{background:#0f1c2f}.cfw-m-settings-note{font-size:12px;color:#7f9cbc;margin:0}.cfw-m-settings-token{font-size:12px;color:#9bb7d3}.cfw-m-settings select{width:100%;height:44px;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;padding:0 12px;font-size:14px;font-family:inherit}.cfw-m-hand-toggle{display:flex;gap:8px}.cfw-m-hand-btn{flex:1;height:44px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#9bb7d3;font-size:14px;cursor:pointer}.cfw-m-hand-btn.active{border-color:#9ad2ff;background:#0f2035;color:#9ad2ff;font-weight:600}#cfw-swipe-hint{display:block;position:fixed;bottom:62px;font-size:11px;color:#9ad2ff;background:#0a111deb;border:1px solid rgba(124,187,255,.3);border-radius:6px;padding:4px 8px;pointer-events:none;opacity:0;transition:opacity .4s;white-space:nowrap;z-index:9999}#cfw-swipe-hint.visible{opacity:1}.cfw-fs-section{margin-bottom:18px}.cfw-fs-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:8px}.cfw-fs-pills{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:32px;padding:0 14px;font-size:12px;cursor:pointer}.cfw-fs-pill.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-fs-chips{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-chip{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:28px;padding:0 10px;font-size:11px;cursor:pointer}.cfw-fs-chip.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-num{font-size:11px;color:#7f9cbc;margin-bottom:6px;font-weight:500}.cfw-is-title{font-size:17px;color:#d9e7f7;margin-bottom:8px;word-break:break-word;text-decoration:none;display:block;line-height:1.3;font-weight:600}.cfw-is-title:hover{color:#9ad2ff;text-decoration:underline}.cfw-is-status{font-size:12px;color:#7cc4ff;margin-bottom:2px;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-is-section{margin-bottom:24px}.cfw-is-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:12px;font-weight:600}.cfw-is-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.cfw-is-primary-box{margin-bottom:24px}.cfw-is-action-row{display:flex;gap:8px}.cfw-is-w100{width:100%}.cfw-comments-section{border-top:1px solid rgba(124,187,255,.15);padding-top:20px}.cfw-comment{margin-bottom:16px;padding:12px;border-radius:8px;background:#7cbbff0a;border:1px solid rgba(124,187,255,.1)}.cfw-comment-newest{background:#7cbbff14;border-color:#7cbbff33}.cfw-comment-meta{font-size:12px;color:#7f9cbc;margin-bottom:6px}.cfw-comment-meta strong{color:#9bb7d3;font-weight:600}.cfw-comment-body{font-size:14px;color:#d9e7f7;line-height:1.5;white-space:pre-wrap;word-break:break-word}.cfw-comments-expand{width:100%;padding:8px;background:none;border:1px dashed rgba(124,187,255,.3);border-radius:6px;color:#9bb7d3;font-size:13px;cursor:pointer;margin-bottom:16px}.cfw-comments-expand:hover{background:#7cbbff0d;border-color:#7cbbff80;color:#d9e7f7}.cfw-is-actions{display:flex;flex-direction:column;gap:8px}.cfw-is-action-btn{width:100%;height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.4);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;text-align:left;padding:0 14px}.cfw-is-action-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-is-action-reason{font-size:11px;color:#7f9cbc;font-style:italic;display:block;padding:0 2px}.cfw-is-pr-link{color:#9ad2ff;text-decoration:underline;text-underline-offset:2px;font-size:13px}.cfw-is-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:10px}.cfw-is-error.active{display:block}.cfw-mbs-close{width:100%;height:48px;border-radius:8px;border:1px solid #2f4864;background:transparent;color:#9bb7d3;font-size:14px;cursor:pointer;margin-top:8px}@media(min-width:681px){#cfw-desktop-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9998;background:#02061773;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#cfw-mobile{top:0!important;bottom:0!important;width:420px;height:100%;border-radius:0;border:1px solid rgba(124,187,255,.28);box-shadow:0 0 40px #02070e8c;left:auto;right:0;border-left:1px solid rgba(124,187,255,.28);transition:none!important}#cfw-mobile.panel-left{left:0;right:auto;border-left:none;border-right:1px solid rgba(124,187,255,.28)}.cfw-panel-handle{display:none}#cfw-mobile-launcher{right:20px}#cfw-mobile-launcher.panel-left{left:20px;right:auto}#cfw-mbs{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-mbs.panel-left{left:0;right:auto}#cfw-mbs-overlay{background:#0206174d}#cfw-swipe-hint{display:none!important}#cfw-compose-sheet{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-compose-sheet.panel-left{left:0;right:auto}#cfw-compose-overlay{background:#0206174d}}#cfw-compose-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10005;display:none}#cfw-compose-overlay.active{display:block}#cfw-compose-sheet{position:fixed;bottom:0;left:0;right:0;z-index:10006;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 24px;max-height:85vh;transform:translateY(100%);transition:transform .25s ease;display:flex;flex-direction:column}#cfw-compose-sheet.active{transform:translateY(0)}#cfw-compose-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px;flex-shrink:0}.cfw-compose-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}.cfw-compose-title{font-size:14px;font-weight:600;color:#d9e7f7}.cfw-compose-close{background:none;border:none;color:#7f9cbc;font-size:24px;cursor:pointer;line-height:1;padding:4px;margin:-4px}.cfw-compose-context{margin-bottom:16px;flex-shrink:0}.cfw-compose-context-quote{font-size:13px;color:#7f9cbc;border-left:2px solid #2f4864;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cfw-compose-body{flex:1;overflow-y:auto;display:flex;flex-direction:column}.cfw-m-swipe-settings{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}.cfw-m-swipe-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.cfw-m-swipe-row label{font-size:13px;color:#d9e7f7;font-weight:500;flex-shrink:0}.cfw-m-swipe-row .cfw-select{flex:1;min-width:120px;max-width:200px}.cfw-m-gesture-ref{background:#7cbbff0d;border-radius:8px;padding:12px;margin-top:16px;border:1px dashed rgba(124,187,255,.2)}.cfw-m-gesture-ref h4{font-size:11px;text-transform:uppercase;color:#7cc4ff;margin:0 0 8px;font-weight:600;padding:0}.cfw-m-gesture-row{display:flex;justify-content:space-between;font-size:12px;color:#9bb7d3;margin-bottom:4px}.cfw-m-gesture-row:last-child{margin-bottom:0}", Rf = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, o] of t)
    s[n] = o;
  return s;
}, jf = /* @__PURE__ */ Rf(Af, [["styles", [If]]]);
export {
  jf as F,
  Lf as c,
  Df as d,
  Ee as u
};
