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
const ae = {}, Pt = [], Qe = () => {
}, Mo = () => !1, Es = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), xn = (e) => e.startsWith("onUpdate:"), we = Object.assign, yn = (e, t) => {
  const s = e.indexOf(t);
  s > -1 && e.splice(s, 1);
}, Hi = Object.prototype.hasOwnProperty, oe = (e, t) => Hi.call(e, t), W = Array.isArray, At = (e) => as(e) === "[object Map]", Ps = (e) => as(e) === "[object Set]", Vn = (e) => as(e) === "[object Date]", X = (e) => typeof e == "function", ge = (e) => typeof e == "string", Ze = (e) => typeof e == "symbol", le = (e) => e !== null && typeof e == "object", Eo = (e) => (le(e) || X(e)) && X(e.then) && X(e.catch), Po = Object.prototype.toString, as = (e) => Po.call(e), Ui = (e) => as(e).slice(8, -1), As = (e) => as(e) === "[object Object]", Is = (e) => ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ vn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Rs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((s) => t[s] || (t[s] = e(s)));
}, Ki = /-\w/g, Fe = Rs(
  (e) => e.replace(Ki, (t) => t.slice(1).toUpperCase())
), Wi = /\B([A-Z])/g, Ae = Rs(
  (e) => e.replace(Wi, "-$1").toLowerCase()
), Ao = Rs((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ys = Rs(
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
}, Os = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Hn = (e) => {
  const t = ge(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Un;
const Ds = () => Un || (Un = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Dt(e) {
  if (W(e)) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
      const n = e[s], o = ge(n) ? Ji(n) : Dt(n);
      if (o)
        for (const i in o)
          t[i] = o[i];
    }
    return t;
  } else if (ge(e) || le(e))
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
function H(e) {
  let t = "";
  if (ge(e))
    t = e;
  else if (W(e))
    for (let s = 0; s < e.length; s++) {
      const n = H(e[s]);
      n && (t += n + " ");
    }
  else if (le(e))
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
    s = fs(e[n], t[n]);
  return s;
}
function fs(e, t) {
  if (e === t) return !0;
  let s = Vn(e), n = Vn(t);
  if (s || n)
    return s && n ? e.getTime() === t.getTime() : !1;
  if (s = Ze(e), n = Ze(t), s || n)
    return e === t;
  if (s = W(e), n = W(t), s || n)
    return s && n ? Qi(e, t) : !1;
  if (s = le(e), n = le(t), s || n) {
    if (!s || !n)
      return !1;
    const o = Object.keys(e).length, i = Object.keys(t).length;
    if (o !== i)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), c = t.hasOwnProperty(r);
      if (l && !c || !l && c || !fs(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Zi(e, t) {
  return e.findIndex((s) => fs(s, t));
}
const Oo = (e) => !!(e && e.__v_isRef === !0), N = (e) => ge(e) ? e : e == null ? "" : W(e) || le(e) && (e.toString === Po || !X(e.toString)) ? Oo(e) ? N(e.value) : JSON.stringify(e, Do, 2) : String(e), Do = (e, t) => Oo(t) ? Do(e, t.value) : At(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (s, [n, o], i) => (s[Js(n, i) + " =>"] = o, s),
    {}
  )
} : Ps(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((s) => Js(s))
} : Ze(t) ? Js(t) : le(t) && !W(t) && !As(t) ? String(t) : t, Js = (e, t = "") => {
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
function er(e, t = !1) {
  xe && xe.cleanups.push(e);
}
let ue;
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
    const t = ue, s = Ne;
    ue = this, Ne = !0;
    try {
      return this.fn();
    } finally {
      Ko(this), ue = t, Ne = s, this.flags &= -3;
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
let Vo = 0, Gt, Xt;
function Ho(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Xt, Xt = e;
    return;
  }
  e.next = Gt, Gt = e;
}
function _n() {
  Vo++;
}
function Sn() {
  if (--Vo > 0)
    return;
  if (Xt) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const s = t.next;
      t.next = void 0, t.flags &= -9, t = s;
    }
  }
  let e;
  for (; Gt; ) {
    let t = Gt;
    for (Gt = void 0; t; ) {
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
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === ns) || (e.globalVersion = ns, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ln(e))))
    return;
  e.flags |= 2;
  const t = e.dep, s = ue, n = Ne;
  ue = e, Ne = !0;
  try {
    Uo(e);
    const o = e.fn(e._value);
    (t.version === 0 || ht(o, e._value)) && (e.flags |= 128, e._value = o, t.version++);
  } catch (o) {
    throw t.version++, o;
  } finally {
    ue = s, Ne = n, Ko(e), e.flags &= -3;
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
let Ne = !0;
const Bo = [];
function ct() {
  Bo.push(Ne), Ne = !1;
}
function at() {
  const e = Bo.pop();
  Ne = e === void 0 ? !0 : e;
}
function Kn(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const s = ue;
    ue = void 0;
    try {
      t();
    } finally {
      ue = s;
    }
  }
}
let ns = 0;
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
    if (!ue || !Ne || ue === this.computed)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== ue)
      s = this.activeLink = new sr(ue, this), ue.deps ? (s.prevDep = ue.depsTail, ue.depsTail.nextDep = s, ue.depsTail = s) : ue.deps = ue.depsTail = s, qo(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const n = s.nextDep;
      n.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = n), s.prevDep = ue.depsTail, s.nextDep = void 0, ue.depsTail.nextDep = s, ue.depsTail = s, ue.deps === s && (ue.deps = n);
    }
    return s;
  }
  trigger(t) {
    this.version++, ns++, this.notify(t);
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
const vs = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ Symbol(
  ""
), cn = /* @__PURE__ */ Symbol(
  ""
), os = /* @__PURE__ */ Symbol(
  ""
);
function ye(e, t, s) {
  if (Ne && ue) {
    let n = vs.get(e);
    n || vs.set(e, n = /* @__PURE__ */ new Map());
    let o = n.get(s);
    o || (n.set(s, o = new Cn()), o.map = n, o.key = s), o.track();
  }
}
function it(e, t, s, n, o, i) {
  const r = vs.get(e);
  if (!r) {
    ns++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if (_n(), t === "clear")
    r.forEach(l);
  else {
    const c = W(e), b = c && Is(s);
    if (c && s === "length") {
      const f = Number(n);
      r.forEach((p, g) => {
        (g === "length" || g === os || !Ze(g) && g >= f) && l(p);
      });
    } else
      switch ((s !== void 0 || r.has(void 0)) && l(r.get(s)), b && l(r.get(os)), t) {
        case "add":
          c ? b && l(r.get("length")) : (l(r.get(_t)), At(e) && l(r.get(cn)));
          break;
        case "delete":
          c || (l(r.get(_t)), At(e) && l(r.get(cn)));
          break;
        case "set":
          At(e) && l(r.get(_t));
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
  const t = /* @__PURE__ */ ne(e);
  return t === e ? t : (ye(t, "iterate", os), /* @__PURE__ */ Re(e) ? t : t.map(Ve));
}
function Ls(e) {
  return ye(e = /* @__PURE__ */ ne(e), "iterate", os), e;
}
function pt(e, t) {
  return /* @__PURE__ */ ft(e) ? Lt(/* @__PURE__ */ lt(e) ? Ve(t) : t) : Ve(t);
}
const or = {
  __proto__: null,
  [Symbol.iterator]() {
    return Xs(this, Symbol.iterator, (e) => pt(this, e));
  },
  concat(...e) {
    return $t(this).concat(
      ...e.map((t) => W(t) ? $t(t) : t)
    );
  },
  entries() {
    return Xs(this, "entries", (e) => (e[1] = pt(this, e[1]), e));
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
    return st(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Kt(this, "pop");
  },
  push(...e) {
    return Kt(this, "push", e);
  },
  reduce(e, ...t) {
    return Wn(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Wn(this, "reduceRight", e, t);
  },
  shift() {
    return Kt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return st(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Kt(this, "splice", e);
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
    return Kt(this, "unshift", e);
  },
  values() {
    return Xs(this, "values", (e) => pt(this, e));
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
function st(e, t, s, n, o, i) {
  const r = Ls(e), l = r !== e && !/* @__PURE__ */ Re(e), c = r[t];
  if (c !== ir[t]) {
    const p = c.apply(e, i);
    return l ? Ve(p) : p;
  }
  let b = s;
  r !== e && (l ? b = function(p, g) {
    return s.call(this, pt(e, p), g, e);
  } : s.length > 2 && (b = function(p, g) {
    return s.call(this, p, g, e);
  }));
  const f = c.call(r, b, n);
  return l && o ? o(f) : f;
}
function Wn(e, t, s, n) {
  const o = Ls(e);
  let i = s;
  return o !== e && (/* @__PURE__ */ Re(e) ? s.length > 3 && (i = function(r, l, c) {
    return s.call(this, r, l, c, e);
  }) : i = function(r, l, c) {
    return s.call(this, r, pt(e, l), c, e);
  }), o[t](i, ...n);
}
function Qs(e, t, s) {
  const n = /* @__PURE__ */ ne(e);
  ye(n, "iterate", os);
  const o = n[t](...s);
  return (o === -1 || o === !1) && /* @__PURE__ */ Fs(s[0]) ? (s[0] = /* @__PURE__ */ ne(s[0]), n[t](...s)) : o;
}
function Kt(e, t, s = []) {
  ct(), _n();
  const n = (/* @__PURE__ */ ne(e))[t].apply(e, s);
  return Sn(), at(), n;
}
const rr = /* @__PURE__ */ vn("__proto__,__v_isRef,__isVue"), Yo = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ze)
);
function lr(e) {
  Ze(e) || (e = String(e));
  const t = /* @__PURE__ */ ne(this);
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
    const r = W(t);
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
      /* @__PURE__ */ be(t) ? t : n
    );
    if ((Ze(s) ? Yo.has(s) : rr(s)) || (o || ye(t, "get", s), i))
      return l;
    if (/* @__PURE__ */ be(l)) {
      const c = r && Is(s) ? l : l.value;
      return o && le(c) ? /* @__PURE__ */ fn(c) : c;
    }
    return le(l) ? o ? /* @__PURE__ */ fn(l) : /* @__PURE__ */ js(l) : l;
  }
}
class Go extends Jo {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, s, n, o) {
    let i = t[s];
    const r = W(t) && Is(s);
    if (!this._isShallow) {
      const b = /* @__PURE__ */ ft(i);
      if (!/* @__PURE__ */ Re(n) && !/* @__PURE__ */ ft(n) && (i = /* @__PURE__ */ ne(i), n = /* @__PURE__ */ ne(n)), !r && /* @__PURE__ */ be(i) && !/* @__PURE__ */ be(n))
        return b || (i.value = n), !0;
    }
    const l = r ? Number(s) < t.length : oe(t, s), c = Reflect.set(
      t,
      s,
      n,
      /* @__PURE__ */ be(t) ? t : o
    );
    return t === /* @__PURE__ */ ne(o) && (l ? ht(n, i) && it(t, "set", s, n) : it(t, "add", s, n)), c;
  }
  deleteProperty(t, s) {
    const n = oe(t, s);
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
      W(t) ? "length" : _t
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
    const o = this.__v_raw, i = /* @__PURE__ */ ne(o), r = At(i), l = e === "entries" || e === Symbol.iterator && r, c = e === "keys" && r, b = o[e](...n), f = s ? an : t ? Lt : Ve;
    return !t && ye(
      i,
      "iterate",
      c ? cn : _t
    ), we(
      // inheriting all iterator properties
      Object.create(b),
      {
        // iterator protocol
        next() {
          const { value: p, done: g } = b.next();
          return g ? { value: p, done: g } : {
            value: l ? [f(p[0]), f(p[1])] : f(p),
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
function pr(e, t) {
  const s = {
    get(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ ne(i), l = /* @__PURE__ */ ne(o);
      e || (ht(o, l) && ye(r, "get", o), ye(r, "get", l));
      const { has: c } = ps(r), b = t ? an : e ? Lt : Ve;
      if (c.call(r, o))
        return b(i.get(o));
      if (c.call(r, l))
        return b(i.get(l));
      i !== r && i.get(o);
    },
    get size() {
      const o = this.__v_raw;
      return !e && ye(/* @__PURE__ */ ne(o), "iterate", _t), o.size;
    },
    has(o) {
      const i = this.__v_raw, r = /* @__PURE__ */ ne(i), l = /* @__PURE__ */ ne(o);
      return e || (ht(o, l) && ye(r, "has", o), ye(r, "has", l)), o === l ? i.has(o) : i.has(o) || i.has(l);
    },
    forEach(o, i) {
      const r = this, l = r.__v_raw, c = /* @__PURE__ */ ne(l), b = t ? an : e ? Lt : Ve;
      return !e && ye(c, "iterate", _t), l.forEach((f, p) => o.call(i, b(f), b(p), r));
    }
  };
  return we(
    s,
    e ? {
      add: ms("add"),
      set: ms("set"),
      delete: ms("delete"),
      clear: ms("clear")
    } : {
      add(o) {
        !t && !/* @__PURE__ */ Re(o) && !/* @__PURE__ */ ft(o) && (o = /* @__PURE__ */ ne(o));
        const i = /* @__PURE__ */ ne(this);
        return ps(i).has.call(i, o) || (i.add(o), it(i, "add", o, o)), this;
      },
      set(o, i) {
        !t && !/* @__PURE__ */ Re(i) && !/* @__PURE__ */ ft(i) && (i = /* @__PURE__ */ ne(i));
        const r = /* @__PURE__ */ ne(this), { has: l, get: c } = ps(r);
        let b = l.call(r, o);
        b || (o = /* @__PURE__ */ ne(o), b = l.call(r, o));
        const f = c.call(r, o);
        return r.set(o, i), b ? ht(i, f) && it(r, "set", o, i) : it(r, "add", o, i), this;
      },
      delete(o) {
        const i = /* @__PURE__ */ ne(this), { has: r, get: l } = ps(i);
        let c = r.call(i, o);
        c || (o = /* @__PURE__ */ ne(o), c = r.call(i, o)), l && l.call(i, o);
        const b = i.delete(o);
        return c && it(i, "delete", o, void 0), b;
      },
      clear() {
        const o = /* @__PURE__ */ ne(this), i = o.size !== 0, r = o.clear();
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
  return /* @__PURE__ */ ft(e) ? e : zn(
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
  if (!le(e) || e.__v_raw && !(t && e.__v_isReactive))
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
function lt(e) {
  return /* @__PURE__ */ ft(e) ? /* @__PURE__ */ lt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
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
function ne(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ne(t) : e;
}
function $n(e) {
  return !oe(e, "__v_skip") && Object.isExtensible(e) && Io(e, "__v_skip", !0), e;
}
const Ve = (e) => le(e) ? /* @__PURE__ */ js(e) : e, Lt = (e) => le(e) ? /* @__PURE__ */ fn(e) : e;
// @__NO_SIDE_EFFECTS__
function be(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function F(e) {
  return yr(e, !1);
}
function yr(e, t) {
  return /* @__PURE__ */ be(e) ? e : new _r(e, t);
}
class _r {
  constructor(t, s) {
    this.dep = new Cn(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? t : /* @__PURE__ */ ne(t), this._value = s ? t : Ve(t), this.__v_isShallow = s;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const s = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Re(t) || /* @__PURE__ */ ft(t);
    t = n ? t : /* @__PURE__ */ ne(t), ht(t, s) && (this._rawValue = t, this._value = n ? t : Ve(t), this.dep.trigger());
  }
}
function h(e) {
  return /* @__PURE__ */ be(e) ? e.value : e;
}
const Sr = {
  get: (e, t, s) => t === "__v_raw" ? e : h(Reflect.get(e, t, s)),
  set: (e, t, s, n) => {
    const o = e[t];
    return /* @__PURE__ */ be(o) && !/* @__PURE__ */ be(s) ? (o.value = s, !0) : Reflect.set(e, t, s, n);
  }
};
function ei(e) {
  return /* @__PURE__ */ lt(e) ? e : new Proxy(e, Sr);
}
// @__NO_SIDE_EFFECTS__
function kr(e) {
  const t = W(e) ? new Array(e.length) : {};
  for (const s in e)
    t[s] = Tr(e, s);
  return t;
}
class Cr {
  constructor(t, s, n) {
    this._object = t, this._key = s, this._defaultValue = n, this.__v_isRef = !0, this._value = void 0, this._raw = /* @__PURE__ */ ne(t);
    let o = !0, i = t;
    if (!W(t) || !Is(String(s)))
      do
        o = !/* @__PURE__ */ Fs(i) || /* @__PURE__ */ Re(i);
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
    return nr(this._raw, this._key);
  }
}
function Tr(e, t, s) {
  return new Cr(e, t, s);
}
class zr {
  constructor(t, s, n) {
    this.fn = t, this.setter = s, this._value = void 0, this.dep = new Cn(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = ns - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !s, this.isSSR = n;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ue !== this)
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
  return X(e) ? n = e : (n = e.get, o = e.set), new zr(n, o, s);
}
const hs = {}, xs = /* @__PURE__ */ new WeakMap();
let xt;
function Mr(e, t = !1, s = xt) {
  if (s) {
    let n = xs.get(s);
    n || xs.set(s, n = []), n.push(e);
  }
}
function Er(e, t, s = ae) {
  const { immediate: n, deep: o, once: i, scheduler: r, augmentJob: l, call: c } = s, b = ($) => o ? $ : /* @__PURE__ */ Re($) || o === !1 || o === 0 ? rt($, 1) : rt($);
  let f, p, g, k, d = !1, w = !1;
  if (/* @__PURE__ */ be(e) ? (p = () => e.value, d = /* @__PURE__ */ Re(e)) : /* @__PURE__ */ lt(e) ? (p = () => b(e), d = !0) : W(e) ? (w = !0, d = e.some(($) => /* @__PURE__ */ lt($) || /* @__PURE__ */ Re($)), p = () => e.map(($) => {
    if (/* @__PURE__ */ be($))
      return $.value;
    if (/* @__PURE__ */ lt($))
      return b($);
    if (X($))
      return c ? c($, 2) : $();
  })) : X(e) ? t ? p = c ? () => c(e, 2) : e : p = () => {
    if (g) {
      ct();
      try {
        g();
      } finally {
        at();
      }
    }
    const $ = xt;
    xt = f;
    try {
      return c ? c(e, 3, [k]) : e(k);
    } finally {
      xt = $;
    }
  } : p = Qe, t && o) {
    const $ = p, B = o === !0 ? 1 / 0 : o;
    p = () => rt($(), B);
  }
  const U = Fo(), G = () => {
    f.stop(), U && U.active && yn(U.effects, f);
  };
  if (i && t) {
    const $ = t;
    t = (...B) => {
      $(...B), G();
    };
  }
  let z = w ? new Array(e.length).fill(hs) : hs;
  const A = ($) => {
    if (!(!(f.flags & 1) || !f.dirty && !$))
      if (t) {
        const B = f.run();
        if (o || d || (w ? B.some((me, de) => ht(me, z[de])) : ht(B, z))) {
          g && g();
          const me = xt;
          xt = f;
          try {
            const de = [
              B,
              // pass undefined as the old value when it's changed for the first time
              z === hs ? void 0 : w && z[0] === hs ? [] : z,
              k
            ];
            z = B, c ? c(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            );
          } finally {
            xt = me;
          }
        }
      } else
        f.run();
  };
  return l && l(A), f = new No(p), f.scheduler = r ? () => r(A, !1) : A, k = ($) => Mr($, !1, f), g = f.onStop = () => {
    const $ = xs.get(f);
    if ($) {
      if (c)
        c($, 4);
      else
        for (const B of $) B();
      xs.delete(f);
    }
  }, t ? n ? A(!0) : z = f.run() : r ? r(A.bind(null, !0), !0) : f.run(), G.pause = f.pause.bind(f), G.resume = f.resume.bind(f), G.stop = G, G;
}
function rt(e, t = 1 / 0, s) {
  if (t <= 0 || !le(e) || e.__v_skip || (s = s || /* @__PURE__ */ new Map(), (s.get(e) || 0) >= t))
    return e;
  if (s.set(e, t), t--, /* @__PURE__ */ be(e))
    rt(e.value, t, s);
  else if (W(e))
    for (let n = 0; n < e.length; n++)
      rt(e[n], t, s);
  else if (Ps(e) || At(e))
    e.forEach((n) => {
      rt(n, t, s);
    });
  else if (As(e)) {
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
function us(e, t, s, n) {
  try {
    return n ? e(...n) : e();
  } catch (o) {
    Ns(o, t, s);
  }
}
function et(e, t, s, n) {
  if (X(e)) {
    const o = us(e, t, s, n);
    return o && Eo(o) && o.catch((i) => {
      Ns(i, t, s);
    }), o;
  }
  if (W(e)) {
    const o = [];
    for (let i = 0; i < e.length; i++)
      o.push(et(e[i], t, s, n));
    return o;
  }
}
function Ns(e, t, s, n = !0) {
  const o = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ae;
  if (t) {
    let l = t.parent;
    const c = t.proxy, b = `https://vuejs.org/error-reference/#runtime-${s}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let p = 0; p < f.length; p++)
          if (f[p](e, c, b) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      ct(), us(i, null, 10, [
        e,
        c,
        b
      ]), at();
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
let Ge = -1;
const It = [];
let mt = null, Et = 0;
const ti = /* @__PURE__ */ Promise.resolve();
let ys = null;
function Ct(e) {
  const t = ys || ti;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ar(e) {
  let t = Ge + 1, s = Se.length;
  for (; t < s; ) {
    const n = t + s >>> 1, o = Se[n], i = is(o);
    i < e || i === e && o.flags & 2 ? t = n + 1 : s = n;
  }
  return t;
}
function Mn(e) {
  if (!(e.flags & 1)) {
    const t = is(e), s = Se[Se.length - 1];
    !s || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= is(s) ? Se.push(e) : Se.splice(Ar(t), 0, e), e.flags |= 1, si();
  }
}
function si() {
  ys || (ys = ti.then(oi));
}
function Ir(e) {
  W(e) ? It.push(...e) : mt && e.id === -1 ? mt.splice(Et + 1, 0, e) : e.flags & 1 || (It.push(e), e.flags |= 1), si();
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
      (s, n) => is(s) - is(n)
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
const is = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function oi(e) {
  try {
    for (Ge = 0; Ge < Se.length; Ge++) {
      const t = Se[Ge];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), us(
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
let De = null, ii = null;
function _s(e) {
  const t = De;
  return De = e, ii = e && e.type.__scopeId || null, t;
}
function Rr(e, t = De, s) {
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
function Le(e, t) {
  if (De === null)
    return e;
  const s = Ws(De), n = e.dirs || (e.dirs = []);
  for (let o = 0; o < t.length; o++) {
    let [i, r, l, c = ae] = t[o];
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
function Or(e, t) {
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
      return s && X(t) ? t.call(n && n.proxy) : t;
  }
}
function Dr() {
  return !!(Pi() || kt);
}
const Lr = /* @__PURE__ */ Symbol.for("v-scx"), jr = () => St(Lr);
function Rt(e, t, s) {
  return ri(e, t, s);
}
function ri(e, t, s = ae) {
  const { immediate: n, deep: o, flush: i, once: r } = s, l = we({}, s), c = t && n || !t && i !== "post";
  let b;
  if (cs) {
    if (i === "sync") {
      const k = jr();
      b = k.__watcherHandles || (k.__watcherHandles = []);
    } else if (!c) {
      const k = () => {
      };
      return k.stop = Qe, k.resume = Qe, k.pause = Qe, k;
    }
  }
  const f = Ce;
  l.call = (k, d, w) => et(k, f, d, w);
  let p = !1;
  i === "post" ? l.scheduler = (k) => {
    $e(k, f && f.suspense);
  } : i !== "sync" && (p = !0, l.scheduler = (k, d) => {
    d ? k() : Mn(k);
  }), l.augmentJob = (k) => {
    t && (k.flags |= 4), p && (k.flags |= 2, f && (k.id = f.uid, k.i = f));
  };
  const g = Er(e, t, l);
  return cs && (b ? b.push(g) : c && g()), g;
}
function Fr(e, t, s) {
  const n = this.proxy, o = ge(e) ? e.includes(".") ? li(n, e) : () => n[e] : e.bind(n, n);
  let i;
  X(t) ? i = t : (i = t.handler, s = t);
  const r = ds(this), l = ri(o, i.bind(n), s);
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
function tt(e, t) {
  return X(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    we({ name: e.name }, t, { setup: e })
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
function Qt(e, t, s, n, o = !1) {
  if (W(e)) {
    e.forEach(
      (w, U) => Qt(
        w,
        t && (W(t) ? t[U] : t),
        s,
        n,
        o
      )
    );
    return;
  }
  if (Zt(n) && !o) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Qt(e, t, s, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Ws(n.component) : n.el, r = o ? null : i, { i: l, r: c } = e, b = t && t.r, f = l.refs === ae ? l.refs = {} : l.refs, p = l.setupState, g = /* @__PURE__ */ ne(p), k = p === ae ? Mo : (w) => qn(f, w) ? !1 : oe(g, w), d = (w, U) => !(U && qn(f, U));
  if (b != null && b !== c) {
    if (Yn(t), ge(b))
      f[b] = null, k(b) && (p[b] = null);
    else if (/* @__PURE__ */ be(b)) {
      const w = t;
      d(b, w.k) && (b.value = null), w.k && (f[w.k] = null);
    }
  }
  if (X(c))
    us(c, l, 12, [r, f]);
  else {
    const w = ge(c), U = /* @__PURE__ */ be(c);
    if (w || U) {
      const G = () => {
        if (e.f) {
          const z = w ? k(c) ? p[c] : f[c] : d() || !e.k ? c.value : f[e.k];
          if (o)
            W(z) && yn(z, i);
          else if (W(z))
            z.includes(i) || z.push(i);
          else if (w)
            f[c] = [i], k(c) && (p[c] = f[c]);
          else {
            const A = [i];
            d(c, e.k) && (c.value = A), e.k && (f[e.k] = A);
          }
        } else w ? (f[c] = r, k(c) && (p[c] = r)) : U && (d(c, e.k) && (c.value = r), e.k && (f[e.k] = r));
      };
      if (r) {
        const z = () => {
          G(), Ss.delete(e);
        };
        z.id = -1, Ss.set(e, z), $e(z, s);
      } else
        Yn(e), G();
    }
  }
}
function Yn(e) {
  const t = Ss.get(e);
  t && (t.flags |= 8, Ss.delete(e));
}
Ds().requestIdleCallback;
Ds().cancelIdleCallback;
const Zt = (e) => !!e.type.__asyncLoader, ai = (e) => e.type.__isKeepAlive;
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
      ct();
      const l = ds(s), c = et(t, s, e, r);
      return l(), at(), c;
    });
    return n ? o.unshift(i) : o.push(i), i;
  }
}
const ut = (e) => (t, s = Ce) => {
  (!cs || e === "sp") && Vs(e, (...n) => t(...n), s);
}, Br = ut("bm"), Hs = ut("m"), qr = ut(
  "bu"
), Yr = ut("u"), Jr = ut(
  "bum"
), Pn = ut("um"), Gr = ut(
  "sp"
), Xr = ut("rtg"), Qr = ut("rtc");
function Zr(e, t = Ce) {
  Vs("ec", e, t);
}
const el = /* @__PURE__ */ Symbol.for("v-ndc");
function Me(e, t, s, n) {
  let o;
  const i = s, r = W(e);
  if (r || ge(e)) {
    const l = r && /* @__PURE__ */ lt(e);
    let c = !1, b = !1;
    l && (c = !/* @__PURE__ */ Re(e), b = /* @__PURE__ */ ft(e), e = Ls(e)), o = new Array(e.length);
    for (let f = 0, p = e.length; f < p; f++)
      o[f] = t(
        c ? b ? Lt(Ve(e[f])) : Ve(e[f]) : e[f],
        f,
        void 0,
        i
      );
  } else if (typeof e == "number") {
    o = new Array(e);
    for (let l = 0; l < e; l++)
      o[l] = t(l + 1, l, void 0, i);
  } else if (le(e))
    if (e[Symbol.iterator])
      o = Array.from(
        e,
        (l, c) => t(l, c, void 0, i)
      );
    else {
      const l = Object.keys(e);
      o = new Array(l.length);
      for (let c = 0, b = l.length; c < b; c++) {
        const f = l[c];
        o[c] = t(e[f], f, c, i);
      }
    }
  else
    o = [];
  return o;
}
const un = (e) => e ? Ai(e) ? Ws(e) : un(e.parent) : null, es = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
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
    $nextTick: (e) => e.n || (e.n = Ct.bind(e.proxy)),
    $watch: (e) => Fr.bind(e)
  })
), Zs = (e, t) => e !== ae && !e.__isScriptSetup && oe(e, t), tl = {
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
        if (Zs(n, t))
          return r[t] = 1, n[t];
        if (o !== ae && oe(o, t))
          return r[t] = 2, o[t];
        if (oe(i, t))
          return r[t] = 3, i[t];
        if (s !== ae && oe(s, t))
          return r[t] = 4, s[t];
        dn && (r[t] = 0);
      }
    }
    const b = es[t];
    let f, p;
    if (b)
      return t === "$attrs" && ye(e.attrs, "get", ""), b(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (s !== ae && oe(s, t))
      return r[t] = 4, s[t];
    if (
      // global properties
      p = c.config.globalProperties, oe(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, s) {
    const { data: n, setupState: o, ctx: i } = e;
    return Zs(o, t) ? (o[t] = s, !0) : n !== ae && oe(n, t) ? (n[t] = s, !0) : oe(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = s, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, props: i, type: r }
  }, l) {
    let c;
    return !!(s[l] || e !== ae && l[0] !== "$" && oe(e, l) || Zs(t, l) || oe(i, l) || oe(n, l) || oe(es, l) || oe(o.config.globalProperties, l) || (c = r.__cssModules) && c[l]);
  },
  defineProperty(e, t, s) {
    return s.get != null ? e._.accessCache[t] = 0 : oe(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
  }
};
function Jn(e) {
  return W(e) ? e.reduce(
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
    inject: b,
    // lifecycle
    created: f,
    beforeMount: p,
    mounted: g,
    beforeUpdate: k,
    updated: d,
    activated: w,
    deactivated: U,
    beforeDestroy: G,
    beforeUnmount: z,
    destroyed: A,
    unmounted: $,
    render: B,
    renderTracked: me,
    renderTriggered: de,
    errorCaptured: L,
    serverPrefetch: M,
    // public API
    expose: T,
    inheritAttrs: ce,
    // assets
    components: he,
    directives: j,
    filters: ve
  } = t;
  if (b && nl(b, n, null), r)
    for (const J in r) {
      const Z = r[J];
      X(Z) && (n[J] = Z.bind(s));
    }
  if (o) {
    const J = o.call(s, s);
    le(J) && (e.data = /* @__PURE__ */ js(J));
  }
  if (dn = !0, i)
    for (const J in i) {
      const Z = i[J], Ue = X(Z) ? Z.bind(s, s) : X(Z.get) ? Z.get.bind(s, s) : Qe, Tt = !X(Z) && X(Z.set) ? Z.set.bind(s) : Qe, Ke = ie({
        get: Ue,
        set: Tt
      });
      Object.defineProperty(n, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Ke.value,
        set: (Oe) => Ke.value = Oe
      });
    }
  if (l)
    for (const J in l)
      ui(l[J], n, s, J);
  if (c) {
    const J = X(c) ? c.call(s) : c;
    Reflect.ownKeys(J).forEach((Z) => {
      Or(Z, J[Z]);
    });
  }
  f && Gn(f, e, "c");
  function pe(J, Z) {
    W(Z) ? Z.forEach((Ue) => J(Ue.bind(s))) : Z && J(Z.bind(s));
  }
  if (pe(Br, p), pe(Hs, g), pe(qr, k), pe(Yr, d), pe(Ur, w), pe(Kr, U), pe(Zr, L), pe(Qr, me), pe(Xr, de), pe(Jr, z), pe(Pn, $), pe(Gr, M), W(T))
    if (T.length) {
      const J = e.exposed || (e.exposed = {});
      T.forEach((Z) => {
        Object.defineProperty(J, Z, {
          get: () => s[Z],
          set: (Ue) => s[Z] = Ue,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  B && e.render === Qe && (e.render = B), ce != null && (e.inheritAttrs = ce), he && (e.components = he), j && (e.directives = j), M && ci(e);
}
function nl(e, t, s = Qe) {
  W(e) && (e = pn(e));
  for (const n in e) {
    const o = e[n];
    let i;
    le(o) ? "default" in o ? i = St(
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
    W(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy),
    t,
    s
  );
}
function ui(e, t, s, n) {
  let o = n.includes(".") ? li(s, n) : () => s[n];
  if (ge(e)) {
    const i = t[e];
    X(i) && Rt(o, i);
  } else if (X(e))
    Rt(o, e.bind(s));
  else if (le(e))
    if (W(e))
      e.forEach((i) => ui(i, t, s, n));
    else {
      const i = X(e.handler) ? e.handler.bind(s) : t[e.handler];
      X(i) && Rt(o, i, e);
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
  ), ks(c, t, r)), le(t) && i.set(t, c), c;
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
  methods: qt,
  computed: qt,
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
  components: qt,
  directives: qt,
  // watch
  watch: rl,
  // provide / inject
  provide: Xn,
  inject: il
};
function Xn(e, t) {
  return t ? e ? function() {
    return we(
      X(e) ? e.call(this, this) : e,
      X(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function il(e, t) {
  return qt(pn(e), pn(t));
}
function pn(e) {
  if (W(e)) {
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
function qt(e, t) {
  return e ? we(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Qn(e, t) {
  return e ? W(e) && W(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : we(
    /* @__PURE__ */ Object.create(null),
    Jn(e),
    Jn(t ?? {})
  ) : t;
}
function rl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const s = we(/* @__PURE__ */ Object.create(null), e);
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
    X(n) || (n = we({}, n)), o != null && !le(o) && (o = null);
    const i = pi(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const b = i.app = {
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
      set config(f) {
      },
      use(f, ...p) {
        return r.has(f) || (f && X(f.install) ? (r.add(f), f.install(b, ...p)) : X(f) && (r.add(f), f(b, ...p))), b;
      },
      mixin(f) {
        return i.mixins.includes(f) || i.mixins.push(f), b;
      },
      component(f, p) {
        return p ? (i.components[f] = p, b) : i.components[f];
      },
      directive(f, p) {
        return p ? (i.directives[f] = p, b) : i.directives[f];
      },
      mount(f, p, g) {
        if (!c) {
          const k = b._ceVNode || ke(n, o);
          return k.appContext = i, g === !0 ? g = "svg" : g === !1 && (g = void 0), e(k, f, g), c = !0, b._container = f, f.__vue_app__ = b, Ws(k.component);
        }
      },
      onUnmount(f) {
        l.push(f);
      },
      unmount() {
        c && (et(
          l,
          b._instance,
          16
        ), e(null, b._container), delete b._container.__vue_app__);
      },
      provide(f, p) {
        return i.provides[f] = p, b;
      },
      runWithContext(f) {
        const p = kt;
        kt = b;
        try {
          return f();
        } finally {
          kt = p;
        }
      }
    };
    return b;
  };
}
let kt = null;
const al = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Fe(t)}Modifiers`] || e[`${Ae(t)}Modifiers`];
function fl(e, t, ...s) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || ae;
  let o = s;
  const i = t.startsWith("update:"), r = i && al(n, t.slice(7));
  r && (r.trim && (o = s.map((f) => ge(f) ? f.trim() : f)), r.number && (o = s.map(Os)));
  let l, c = n[l = Ys(t)] || // also try camelCase event handler (#2249)
  n[l = Ys(Fe(t))];
  !c && i && (c = n[l = Ys(Ae(t))]), c && et(
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
const ul = /* @__PURE__ */ new WeakMap();
function mi(e, t, s = !1) {
  const n = s ? ul : t.emitsCache, o = n.get(e);
  if (o !== void 0)
    return o;
  const i = e.emits;
  let r = {}, l = !1;
  if (!X(e)) {
    const c = (b) => {
      const f = mi(b, t, !0);
      f && (l = !0, we(r, f));
    };
    !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !i && !l ? (le(e) && n.set(e, null), null) : (W(i) ? i.forEach((c) => r[c] = null) : we(r, i), le(e) && n.set(e, r), r);
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
    render: b,
    renderCache: f,
    props: p,
    data: g,
    setupState: k,
    ctx: d,
    inheritAttrs: w
  } = e, U = _s(e);
  let G, z;
  try {
    if (s.shapeFlag & 4) {
      const $ = o || n, B = $;
      G = Xe(
        b.call(
          B,
          $,
          f,
          p,
          k,
          g,
          d
        )
      ), z = l;
    } else {
      const $ = t;
      G = Xe(
        $.length > 1 ? $(
          p,
          { attrs: l, slots: r, emit: c }
        ) : $(
          p,
          null
        )
      ), z = t.props ? l : dl(l);
    }
  } catch ($) {
    ts.length = 0, Ns($, e, 1), G = ke(wt);
  }
  let A = G;
  if (z && w !== !1) {
    const $ = Object.keys(z), { shapeFlag: B } = A;
    $.length && B & 7 && (i && $.some(xn) && (z = pl(
      z,
      i
    )), A = jt(A, z, !1, !0));
  }
  return s.dirs && (A = jt(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(s.dirs) : s.dirs), s.transition && En(A, s.transition), G = A, _s(U), G;
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
  const { props: n, children: o, component: i } = e, { props: r, children: l, patchFlag: c } = t, b = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (s && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return n ? eo(n, r, b) : !!r;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        const g = f[p];
        if (hi(r, n, g) && !Us(b, g))
          return !0;
      }
    }
  } else
    return (o || l) && (!l || !l.$stable) ? !0 : n === r ? !1 : n ? r ? eo(n, r, b) : !0 : !!r;
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
  return s === "style" && le(n) && le(o) ? !fs(n, o) : n !== o;
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
  } = e, l = /* @__PURE__ */ ne(o), [c] = e.propsOptions;
  let b = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (n || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const f = e.vnode.dynamicProps;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        if (Us(e.emitsOptions, g))
          continue;
        const k = t[g];
        if (c)
          if (oe(i, g))
            k !== i[g] && (i[g] = k, b = !0);
          else {
            const d = Fe(g);
            o[d] = mn(
              c,
              l,
              d,
              k,
              e,
              !1
            );
          }
        else
          k !== i[g] && (i[g] = k, b = !0);
      }
    }
  } else {
    vi(e, t, o, i) && (b = !0);
    let f;
    for (const p in l)
      (!t || // for camelCase
      !oe(t, p) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Ae(p)) === p || !oe(t, f))) && (c ? s && // for camelCase
      (s[p] !== void 0 || // for kebab-case
      s[f] !== void 0) && (o[p] = mn(
        c,
        l,
        p,
        void 0,
        e,
        !0
      )) : delete o[p]);
    if (i !== l)
      for (const p in i)
        (!t || !oe(t, p)) && (delete i[p], b = !0);
  }
  b && it(e.attrs, "set", "");
}
function vi(e, t, s, n) {
  const [o, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let c in t) {
      if (Jt(c))
        continue;
      const b = t[c];
      let f;
      o && oe(o, f = Fe(c)) ? !i || !i.includes(f) ? s[f] = b : (l || (l = {}))[f] = b : Us(e.emitsOptions, c) || (!(c in n) || b !== n[c]) && (n[c] = b, r = !0);
    }
  if (i) {
    const c = /* @__PURE__ */ ne(s), b = l || ae;
    for (let f = 0; f < i.length; f++) {
      const p = i[f];
      s[p] = mn(
        o,
        c,
        p,
        b[p],
        e,
        !oe(b, p)
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
      if (r.type !== Function && !r.skipFactory && X(c)) {
        const { propsDefaults: b } = o;
        if (s in b)
          n = b[s];
        else {
          const f = ds(o);
          n = b[s] = c.call(
            null,
            t
          ), f();
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
  if (!X(e)) {
    const f = (p) => {
      c = !0;
      const [g, k] = xi(p, t, !0);
      we(r, g), k && l.push(...k);
    };
    !s && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!i && !c)
    return le(e) && n.set(e, Pt), Pt;
  if (W(i))
    for (let f = 0; f < i.length; f++) {
      const p = Fe(i[f]);
      to(p) && (r[p] = ae);
    }
  else if (i)
    for (const f in i) {
      const p = Fe(f);
      if (to(p)) {
        const g = i[f], k = r[p] = W(g) || X(g) ? { type: g } : we({}, g), d = k.type;
        let w = !1, U = !0;
        if (W(d))
          for (let G = 0; G < d.length; ++G) {
            const z = d[G], A = X(z) && z.name;
            if (A === "Boolean") {
              w = !0;
              break;
            } else A === "String" && (U = !1);
          }
        else
          w = X(d) && d.name === "Boolean";
        k[
          0
          /* shouldCast */
        ] = w, k[
          1
          /* shouldCastTrue */
        ] = U, (w || oe(k, "default")) && l.push(p);
      }
    }
  const b = [r, l];
  return le(e) && n.set(e, b), b;
}
function to(e) {
  return e[0] !== "$" && !Jt(e);
}
const An = (e) => e === "_" || e === "_ctx" || e === "$stable", In = (e) => W(e) ? e.map(Xe) : [Xe(e)], vl = (e, t, s) => {
  if (t._n)
    return t;
  const n = Rr((...o) => In(t(...o)), s);
  return n._c = !1, n;
}, yi = (e, t, s) => {
  const n = e._ctx;
  for (const o in e) {
    if (An(o)) continue;
    const i = e[o];
    if (X(i))
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
  let i = !0, r = ae;
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
    setText: b,
    setElementText: f,
    parentNode: p,
    nextSibling: g,
    setScopeId: k = Qe,
    insertStaticContent: d
  } = e, w = (a, m, v, S = null, x = null, y = null, O = void 0, I = null, E = !!m.dynamicChildren) => {
    if (a === m)
      return;
    a && !Wt(a, m) && (S = zt(a), Oe(a, x, y, !0), a = null), m.patchFlag === -2 && (E = !1, m.dynamicChildren = null);
    const { type: _, ref: K, shapeFlag: D } = m;
    switch (_) {
      case Ks:
        U(a, m, v, S);
        break;
      case wt:
        G(a, m, v, S);
        break;
      case tn:
        a == null && z(m, v, S, O);
        break;
      case se:
        he(
          a,
          m,
          v,
          S,
          x,
          y,
          O,
          I,
          E
        );
        break;
      default:
        D & 1 ? B(
          a,
          m,
          v,
          S,
          x,
          y,
          O,
          I,
          E
        ) : D & 6 ? j(
          a,
          m,
          v,
          S,
          x,
          y,
          O,
          I,
          E
        ) : (D & 64 || D & 128) && _.process(
          a,
          m,
          v,
          S,
          x,
          y,
          O,
          I,
          E,
          Ht
        );
    }
    K != null && x ? Qt(K, a && a.ref, y, m || a, !m) : K == null && a && a.ref != null && Qt(a.ref, null, y, a, !0);
  }, U = (a, m, v, S) => {
    if (a == null)
      n(
        m.el = l(m.children),
        v,
        S
      );
    else {
      const x = m.el = a.el;
      m.children !== a.children && b(x, m.children);
    }
  }, G = (a, m, v, S) => {
    a == null ? n(
      m.el = c(m.children || ""),
      v,
      S
    ) : m.el = a.el;
  }, z = (a, m, v, S) => {
    [a.el, a.anchor] = d(
      a.children,
      m,
      v,
      S,
      a.el,
      a.anchor
    );
  }, A = ({ el: a, anchor: m }, v, S) => {
    let x;
    for (; a && a !== m; )
      x = g(a), n(a, v, S), a = x;
    n(m, v, S);
  }, $ = ({ el: a, anchor: m }) => {
    let v;
    for (; a && a !== m; )
      v = g(a), o(a), a = v;
    o(m);
  }, B = (a, m, v, S, x, y, O, I, E) => {
    if (m.type === "svg" ? O = "svg" : m.type === "math" && (O = "mathml"), a == null)
      me(
        m,
        v,
        S,
        x,
        y,
        O,
        I,
        E
      );
    else {
      const _ = a.el && a.el._isVueCE ? a.el : null;
      try {
        _ && _._beginPatch(), M(
          a,
          m,
          x,
          y,
          O,
          I,
          E
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, me = (a, m, v, S, x, y, O, I) => {
    let E, _;
    const { props: K, shapeFlag: D, transition: V, dirs: Y } = a;
    if (E = a.el = r(
      a.type,
      y,
      K && K.is,
      K
    ), D & 8 ? f(E, a.children) : D & 16 && L(
      a.children,
      E,
      null,
      S,
      x,
      en(a, y),
      O,
      I
    ), Y && gt(a, null, S, "created"), de(E, a, a.scopeId, O, S), K) {
      for (const fe in K)
        fe !== "value" && !Jt(fe) && i(E, fe, null, K[fe], y, S);
      "value" in K && i(E, "value", null, K.value, y), (_ = K.onVnodeBeforeMount) && Je(_, S, a);
    }
    Y && gt(a, null, S, "beforeMount");
    const ee = kl(x, V);
    ee && V.beforeEnter(E), n(E, m, v), ((_ = K && K.onVnodeMounted) || ee || Y) && $e(() => {
      _ && Je(_, S, a), ee && V.enter(E), Y && gt(a, null, S, "mounted");
    }, x);
  }, de = (a, m, v, S, x) => {
    if (v && k(a, v), S)
      for (let y = 0; y < S.length; y++)
        k(a, S[y]);
    if (x) {
      let y = x.subTree;
      if (m === y || zi(y.type) && (y.ssContent === m || y.ssFallback === m)) {
        const O = x.vnode;
        de(
          a,
          O,
          O.scopeId,
          O.slotScopeIds,
          x.parent
        );
      }
    }
  }, L = (a, m, v, S, x, y, O, I, E = 0) => {
    for (let _ = E; _ < a.length; _++) {
      const K = a[_] = I ? ot(a[_]) : Xe(a[_]);
      w(
        null,
        K,
        m,
        v,
        S,
        x,
        y,
        O,
        I
      );
    }
  }, M = (a, m, v, S, x, y, O) => {
    const I = m.el = a.el;
    let { patchFlag: E, dynamicChildren: _, dirs: K } = m;
    E |= a.patchFlag & 16;
    const D = a.props || ae, V = m.props || ae;
    let Y;
    if (v && vt(v, !1), (Y = V.onVnodeBeforeUpdate) && Je(Y, v, m, a), K && gt(m, a, v, "beforeUpdate"), v && vt(v, !0), (D.innerHTML && V.innerHTML == null || D.textContent && V.textContent == null) && f(I, ""), _ ? T(
      a.dynamicChildren,
      _,
      I,
      v,
      S,
      en(m, x),
      y
    ) : O || Z(
      a,
      m,
      I,
      null,
      v,
      S,
      en(m, x),
      y,
      !1
    ), E > 0) {
      if (E & 16)
        ce(I, D, V, v, x);
      else if (E & 2 && D.class !== V.class && i(I, "class", null, V.class, x), E & 4 && i(I, "style", D.style, V.style, x), E & 8) {
        const ee = m.dynamicProps;
        for (let fe = 0; fe < ee.length; fe++) {
          const re = ee[fe], Te = D[re], ze = V[re];
          (ze !== Te || re === "value") && i(I, re, Te, ze, x, v);
        }
      }
      E & 1 && a.children !== m.children && f(I, m.children);
    } else !O && _ == null && ce(I, D, V, v, x);
    ((Y = V.onVnodeUpdated) || K) && $e(() => {
      Y && Je(Y, v, m, a), K && gt(m, a, v, "updated");
    }, S);
  }, T = (a, m, v, S, x, y, O) => {
    for (let I = 0; I < m.length; I++) {
      const E = a[I], _ = m[I], K = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        E.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (E.type === se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Wt(E, _) || // - In the case of a component, it could contain anything.
        E.shapeFlag & 198) ? p(E.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          v
        )
      );
      w(
        E,
        _,
        K,
        null,
        S,
        x,
        y,
        O,
        !0
      );
    }
  }, ce = (a, m, v, S, x) => {
    if (m !== v) {
      if (m !== ae)
        for (const y in m)
          !Jt(y) && !(y in v) && i(
            a,
            y,
            m[y],
            null,
            x,
            S
          );
      for (const y in v) {
        if (Jt(y)) continue;
        const O = v[y], I = m[y];
        O !== I && y !== "value" && i(a, y, I, O, x, S);
      }
      "value" in v && i(a, "value", m.value, v.value, x);
    }
  }, he = (a, m, v, S, x, y, O, I, E) => {
    const _ = m.el = a ? a.el : l(""), K = m.anchor = a ? a.anchor : l("");
    let { patchFlag: D, dynamicChildren: V, slotScopeIds: Y } = m;
    Y && (I = I ? I.concat(Y) : Y), a == null ? (n(_, v, S), n(K, v, S), L(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      m.children || [],
      v,
      K,
      x,
      y,
      O,
      I,
      E
    )) : D > 0 && D & 64 && V && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    a.dynamicChildren && a.dynamicChildren.length === V.length ? (T(
      a.dynamicChildren,
      V,
      v,
      x,
      y,
      O,
      I
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (m.key != null || x && m === x.subTree) && ki(
      a,
      m,
      !0
      /* shallow */
    )) : Z(
      a,
      m,
      v,
      K,
      x,
      y,
      O,
      I,
      E
    );
  }, j = (a, m, v, S, x, y, O, I, E) => {
    m.slotScopeIds = I, a == null ? m.shapeFlag & 512 ? x.ctx.activate(
      m,
      v,
      S,
      O,
      E
    ) : ve(
      m,
      v,
      S,
      x,
      y,
      O,
      E
    ) : je(a, m, E);
  }, ve = (a, m, v, S, x, y, O) => {
    const I = a.component = Il(
      a,
      S,
      x
    );
    if (ai(a) && (I.ctx.renderer = Ht), Rl(I, !1, O), I.asyncDep) {
      if (x && x.registerDep(I, pe, O), !a.el) {
        const E = I.subTree = ke(wt);
        G(null, E, m, v), a.placeholder = E.el;
      }
    } else
      pe(
        I,
        a,
        m,
        v,
        x,
        y,
        O
      );
  }, je = (a, m, v) => {
    const S = m.component = a.component;
    if (ml(a, m, v))
      if (S.asyncDep && !S.asyncResolved) {
        J(S, m, v);
        return;
      } else
        S.next = m, S.update();
    else
      m.el = a.el, S.vnode = m;
  }, pe = (a, m, v, S, x, y, O) => {
    const I = () => {
      if (a.isMounted) {
        let { next: D, bu: V, u: Y, parent: ee, vnode: fe } = a;
        {
          const qe = Ci(a);
          if (qe) {
            D && (D.el = fe.el, J(a, D, O)), qe.asyncDep.then(() => {
              $e(() => {
                a.isUnmounted || _();
              }, x);
            });
            return;
          }
        }
        let re = D, Te;
        vt(a, !1), D ? (D.el = fe.el, J(a, D, O)) : D = fe, V && bs(V), (Te = D.props && D.props.onVnodeBeforeUpdate) && Je(Te, ee, D, fe), vt(a, !0);
        const ze = Zn(a), Be = a.subTree;
        a.subTree = ze, w(
          Be,
          ze,
          // parent may have changed if it's in a teleport
          p(Be.el),
          // anchor may have changed if it's in a fragment
          zt(Be),
          a,
          x,
          y
        ), D.el = ze.el, re === null && hl(a, ze.el), Y && $e(Y, x), (Te = D.props && D.props.onVnodeUpdated) && $e(
          () => Je(Te, ee, D, fe),
          x
        );
      } else {
        let D;
        const { el: V, props: Y } = m, { bm: ee, m: fe, parent: re, root: Te, type: ze } = a, Be = Zt(m);
        vt(a, !1), ee && bs(ee), !Be && (D = Y && Y.onVnodeBeforeMount) && Je(D, re, m), vt(a, !0);
        {
          Te.ce && Te.ce._hasShadowRoot() && Te.ce._injectChildStyle(ze);
          const qe = a.subTree = Zn(a);
          w(
            null,
            qe,
            v,
            S,
            a,
            x,
            y
          ), m.el = qe.el;
        }
        if (fe && $e(fe, x), !Be && (D = Y && Y.onVnodeMounted)) {
          const qe = m;
          $e(
            () => Je(D, re, qe),
            x
          );
        }
        (m.shapeFlag & 256 || re && Zt(re.vnode) && re.vnode.shapeFlag & 256) && a.a && $e(a.a, x), a.isMounted = !0, m = v = S = null;
      }
    };
    a.scope.on();
    const E = a.effect = new No(I);
    a.scope.off();
    const _ = a.update = E.run.bind(E), K = a.job = E.runIfDirty.bind(E);
    K.i = a, K.id = a.uid, E.scheduler = () => Mn(K), vt(a, !0), _();
  }, J = (a, m, v) => {
    m.component = a;
    const S = a.vnode.props;
    a.vnode = m, a.next = null, wl(a, m.props, S, v), yl(a, m.children, v), ct(), Bn(a), at();
  }, Z = (a, m, v, S, x, y, O, I, E = !1) => {
    const _ = a && a.children, K = a ? a.shapeFlag : 0, D = m.children, { patchFlag: V, shapeFlag: Y } = m;
    if (V > 0) {
      if (V & 128) {
        Tt(
          _,
          D,
          v,
          S,
          x,
          y,
          O,
          I,
          E
        );
        return;
      } else if (V & 256) {
        Ue(
          _,
          D,
          v,
          S,
          x,
          y,
          O,
          I,
          E
        );
        return;
      }
    }
    Y & 8 ? (K & 16 && We(_, x, y), D !== _ && f(v, D)) : K & 16 ? Y & 16 ? Tt(
      _,
      D,
      v,
      S,
      x,
      y,
      O,
      I,
      E
    ) : We(_, x, y, !0) : (K & 8 && f(v, ""), Y & 16 && L(
      D,
      v,
      S,
      x,
      y,
      O,
      I,
      E
    ));
  }, Ue = (a, m, v, S, x, y, O, I, E) => {
    a = a || Pt, m = m || Pt;
    const _ = a.length, K = m.length, D = Math.min(_, K);
    let V;
    for (V = 0; V < D; V++) {
      const Y = m[V] = E ? ot(m[V]) : Xe(m[V]);
      w(
        a[V],
        Y,
        v,
        null,
        x,
        y,
        O,
        I,
        E
      );
    }
    _ > K ? We(
      a,
      x,
      y,
      !0,
      !1,
      D
    ) : L(
      m,
      v,
      S,
      x,
      y,
      O,
      I,
      E,
      D
    );
  }, Tt = (a, m, v, S, x, y, O, I, E) => {
    let _ = 0;
    const K = m.length;
    let D = a.length - 1, V = K - 1;
    for (; _ <= D && _ <= V; ) {
      const Y = a[_], ee = m[_] = E ? ot(m[_]) : Xe(m[_]);
      if (Wt(Y, ee))
        w(
          Y,
          ee,
          v,
          null,
          x,
          y,
          O,
          I,
          E
        );
      else
        break;
      _++;
    }
    for (; _ <= D && _ <= V; ) {
      const Y = a[D], ee = m[V] = E ? ot(m[V]) : Xe(m[V]);
      if (Wt(Y, ee))
        w(
          Y,
          ee,
          v,
          null,
          x,
          y,
          O,
          I,
          E
        );
      else
        break;
      D--, V--;
    }
    if (_ > D) {
      if (_ <= V) {
        const Y = V + 1, ee = Y < K ? m[Y].el : S;
        for (; _ <= V; )
          w(
            null,
            m[_] = E ? ot(m[_]) : Xe(m[_]),
            v,
            ee,
            x,
            y,
            O,
            I,
            E
          ), _++;
      }
    } else if (_ > V)
      for (; _ <= D; )
        Oe(a[_], x, y, !0), _++;
    else {
      const Y = _, ee = _, fe = /* @__PURE__ */ new Map();
      for (_ = ee; _ <= V; _++) {
        const Pe = m[_] = E ? ot(m[_]) : Xe(m[_]);
        Pe.key != null && fe.set(Pe.key, _);
      }
      let re, Te = 0;
      const ze = V - ee + 1;
      let Be = !1, qe = 0;
      const Ut = new Array(ze);
      for (_ = 0; _ < ze; _++) Ut[_] = 0;
      for (_ = Y; _ <= D; _++) {
        const Pe = a[_];
        if (Te >= ze) {
          Oe(Pe, x, y, !0);
          continue;
        }
        let Ye;
        if (Pe.key != null)
          Ye = fe.get(Pe.key);
        else
          for (re = ee; re <= V; re++)
            if (Ut[re - ee] === 0 && Wt(Pe, m[re])) {
              Ye = re;
              break;
            }
        Ye === void 0 ? Oe(Pe, x, y, !0) : (Ut[Ye - ee] = _ + 1, Ye >= qe ? qe = Ye : Be = !0, w(
          Pe,
          m[Ye],
          v,
          null,
          x,
          y,
          O,
          I,
          E
        ), Te++);
      }
      const jn = Be ? Cl(Ut) : Pt;
      for (re = jn.length - 1, _ = ze - 1; _ >= 0; _--) {
        const Pe = ee + _, Ye = m[Pe], Fn = m[Pe + 1], Nn = Pe + 1 < K ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Fn.el || Ti(Fn)
        ) : S;
        Ut[_] === 0 ? w(
          null,
          Ye,
          v,
          Nn,
          x,
          y,
          O,
          I,
          E
        ) : Be && (re < 0 || _ !== jn[re] ? Ke(Ye, v, Nn, 2) : re--);
      }
    }
  }, Ke = (a, m, v, S, x = null) => {
    const { el: y, type: O, transition: I, children: E, shapeFlag: _ } = a;
    if (_ & 6) {
      Ke(a.component.subTree, m, v, S);
      return;
    }
    if (_ & 128) {
      a.suspense.move(m, v, S);
      return;
    }
    if (_ & 64) {
      O.move(a, m, v, Ht);
      return;
    }
    if (O === se) {
      n(y, m, v);
      for (let D = 0; D < E.length; D++)
        Ke(E[D], m, v, S);
      n(a.anchor, m, v);
      return;
    }
    if (O === tn) {
      A(a, m, v);
      return;
    }
    if (S !== 2 && _ & 1 && I)
      if (S === 0)
        I.beforeEnter(y), n(y, m, v), $e(() => I.enter(y), x);
      else {
        const { leave: D, delayLeave: V, afterLeave: Y } = I, ee = () => {
          a.ctx.isUnmounted ? o(y) : n(y, m, v);
        }, fe = () => {
          y._isLeaving && y[Hr](
            !0
            /* cancelled */
          ), D(y, () => {
            ee(), Y && Y();
          });
        };
        V ? V(y, ee, fe) : fe();
      }
    else
      n(y, m, v);
  }, Oe = (a, m, v, S = !1, x = !1) => {
    const {
      type: y,
      props: O,
      ref: I,
      children: E,
      dynamicChildren: _,
      shapeFlag: K,
      patchFlag: D,
      dirs: V,
      cacheIndex: Y
    } = a;
    if (D === -2 && (x = !1), I != null && (ct(), Qt(I, null, v, a, !0), at()), Y != null && (m.renderCache[Y] = void 0), K & 256) {
      m.ctx.deactivate(a);
      return;
    }
    const ee = K & 1 && V, fe = !Zt(a);
    let re;
    if (fe && (re = O && O.onVnodeBeforeUnmount) && Je(re, m, a), K & 6)
      q(a.component, v, S);
    else {
      if (K & 128) {
        a.suspense.unmount(v, S);
        return;
      }
      ee && gt(a, null, m, "beforeUnmount"), K & 64 ? a.type.remove(
        a,
        m,
        v,
        Ht,
        S
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== se || D > 0 && D & 64) ? We(
        _,
        m,
        v,
        !1,
        !0
      ) : (y === se && D & 384 || !x && K & 16) && We(E, m, v), S && Q(a);
    }
    (fe && (re = O && O.onVnodeUnmounted) || ee) && $e(() => {
      re && Je(re, m, a), ee && gt(a, null, m, "unmounted");
    }, v);
  }, Q = (a) => {
    const { type: m, el: v, anchor: S, transition: x } = a;
    if (m === se) {
      C(v, S);
      return;
    }
    if (m === tn) {
      $(a);
      return;
    }
    const y = () => {
      o(v), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (a.shapeFlag & 1 && x && !x.persisted) {
      const { leave: O, delayLeave: I } = x, E = () => O(v, y);
      I ? I(a.el, y, E) : E();
    } else
      y();
  }, C = (a, m) => {
    let v;
    for (; a !== m; )
      v = g(a), o(a), a = v;
    o(m);
  }, q = (a, m, v) => {
    const { bum: S, scope: x, job: y, subTree: O, um: I, m: E, a: _ } = a;
    so(E), so(_), S && bs(S), x.stop(), y && (y.flags |= 8, Oe(O, a, m, v)), I && $e(I, m), $e(() => {
      a.isUnmounted = !0;
    }, m);
  }, We = (a, m, v, S = !1, x = !1, y = 0) => {
    for (let O = y; O < a.length; O++)
      Oe(a[O], m, v, S, x);
  }, zt = (a) => {
    if (a.shapeFlag & 6)
      return zt(a.component.subTree);
    if (a.shapeFlag & 128)
      return a.suspense.next();
    const m = g(a.anchor || a.el), v = m && m[Nr];
    return v ? g(v) : m;
  };
  let qs = !1;
  const Ln = (a, m, v) => {
    let S;
    a == null ? m._vnode && (Oe(m._vnode, null, null, !0), S = m._vnode.component) : w(
      m._vnode || null,
      a,
      m,
      null,
      null,
      null,
      v
    ), m._vnode = a, qs || (qs = !0, Bn(S), ni(), qs = !1);
  }, Ht = {
    p: w,
    um: Oe,
    m: Ke,
    r: Q,
    mt: ve,
    mc: L,
    pc: Z,
    pbc: T,
    n: zt,
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
function vt({ effect: e, job: t }, s) {
  s ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function ki(e, t, s = !1) {
  const n = e.children, o = t.children;
  if (W(n) && W(o))
    for (let i = 0; i < n.length; i++) {
      const r = n[i];
      let l = o[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[i] = ot(o[i]), l.el = r.el), !s && l.patchFlag !== -2 && ki(r, l)), l.type === Ks && (l.patchFlag === -1 && (l = o[i] = ot(l)), l.el = r.el), l.type === wt && !l.el && (l.el = r.el);
    }
}
function Cl(e) {
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
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Ir(e);
}
const se = /* @__PURE__ */ Symbol.for("v-fgt"), Ks = /* @__PURE__ */ Symbol.for("v-txt"), wt = /* @__PURE__ */ Symbol.for("v-cmt"), tn = /* @__PURE__ */ Symbol.for("v-stc"), ts = [];
let Ie = null;
function P(e = !1) {
  ts.push(Ie = e ? null : []);
}
function zl() {
  ts.pop(), Ie = ts[ts.length - 1] || null;
}
let rs = 1;
function no(e, t = !1) {
  rs += e, e < 0 && Ie && t && (Ie.hasOnce = !0);
}
function $i(e) {
  return e.dynamicChildren = rs > 0 ? Ie || Pt : null, zl(), rs > 0 && Ie && Ie.push(e), e;
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
function ls(e, t, s, n, o) {
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
function Wt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ei = ({ key: e }) => e ?? null, ws = ({
  ref: e,
  ref_key: t,
  ref_for: s
}) => (typeof e == "number" && (e = "" + e), e != null ? ge(e) || /* @__PURE__ */ be(e) || X(e) ? { i: De, r: e, k: t, f: !!s } : e : null);
function u(e, t = null, s = null, n = 0, o = null, i = e === se ? 0 : 1, r = !1, l = !1) {
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
    ctx: De
  };
  return l ? (Rn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= ge(s) ? 8 : 16), rs > 0 && // avoid a block node from tracking itself
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
  if ((!e || e === el) && (e = wt), Mi(e)) {
    const l = jt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return s && Rn(l, s), rs > 0 && !i && Ie && (l.shapeFlag & 6 ? Ie[Ie.indexOf(e)] = l : Ie.push(l)), l.patchFlag = -2, l;
  }
  if (jl(e) && (e = e.__vccOpts), t) {
    t = Ml(t);
    let { class: l, style: c } = t;
    l && !ge(l) && (t.class = H(l)), le(c) && (/* @__PURE__ */ Fs(c) && !W(c) && (c = we({}, c)), t.style = Dt(c));
  }
  const r = ge(e) ? 1 : zi(e) ? 128 : Vr(e) ? 64 : le(e) ? 4 : X(e) ? 2 : 0;
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
  return e ? /* @__PURE__ */ Fs(e) || gi(e) ? we({}, e) : e : null;
}
function jt(e, t, s = !1, n = !1) {
  const { props: o, ref: i, patchFlag: r, children: l, transition: c } = e, b = t ? El(o || {}, t) : o, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: b,
    key: b && Ei(b),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      s && i ? W(i) ? i.concat(ws(t)) : [i, ws(t)] : ws(t)
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
    ssContent: e.ssContent && jt(e.ssContent),
    ssFallback: e.ssFallback && jt(e.ssFallback),
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
function Ft(e = " ", t = 0) {
  return ke(Ks, null, e, t);
}
function te(e = "", t = !1) {
  return t ? (P(), ls(wt, null, e)) : ke(wt, null, e);
}
function Xe(e) {
  return e == null || typeof e == "boolean" ? ke(wt) : W(e) ? ke(
    se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Mi(e) ? ot(e) : ke(Ks, null, String(e));
}
function ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : jt(e);
}
function Rn(e, t) {
  let s = 0;
  const { shapeFlag: n } = e;
  if (t == null)
    t = null;
  else if (W(t))
    s = 16;
  else if (typeof t == "object")
    if (n & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Rn(e, o()), o._c && (o._d = !0));
      return;
    } else {
      s = 32;
      const o = t._;
      !o && !gi(t) ? t._ctx = De : o === 3 && De && (De.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else X(t) ? (t = { default: t, _ctx: De }, s = 32) : (t = String(t), n & 64 ? (s = 16, t = [Ft(t)]) : s = 8);
  e.children = t, e.shapeFlag |= s;
}
function El(...e) {
  const t = {};
  for (let s = 0; s < e.length; s++) {
    const n = e[s];
    for (const o in n)
      if (o === "class")
        t.class !== n.class && (t.class = H([t.class, n.class]));
      else if (o === "style")
        t.style = Dt([t.style, n.style]);
      else if (Es(o)) {
        const i = t[o], r = n[o];
        r && i !== r && !(W(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
      } else o !== "" && (t[o] = n[o]);
  }
  return t;
}
function Je(e, t, s, n = null) {
  et(e, t, 7, [
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
    propsDefaults: ae,
    // inheritAttrs
    inheritAttrs: n.inheritAttrs,
    // state
    ctx: ae,
    data: ae,
    props: ae,
    attrs: ae,
    slots: ae,
    refs: ae,
    setupState: ae,
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
const Pi = () => Ce || De;
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
    (s) => cs = s
  );
}
const ds = (e) => {
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
let cs = !1;
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
    ct();
    const o = e.setupContext = n.length > 1 ? Ll(e) : null, i = ds(e), r = us(
      n,
      e,
      0,
      [
        e.props,
        o
      ]
    ), l = Eo(r);
    if (at(), i(), (l || e.sp) && !Zt(e) && ci(e), l) {
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
  X(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : le(t) && (e.setupState = ei(t)), Ii(e);
}
function Ii(e, t, s) {
  const n = e.type;
  e.render || (e.render = n.render || Qe);
  {
    const o = ds(e);
    ct();
    try {
      sl(e);
    } finally {
      at(), o();
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
      if (s in es)
        return es[s](e);
    },
    has(t, s) {
      return s in t || s in es;
    }
  })) : e.proxy;
}
function jl(e) {
  return X(e) && "__vccOpts" in e;
}
const ie = (e, t) => /* @__PURE__ */ $r(e, t, cs), Fl = "3.5.28";
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
const Ri = bn ? (e) => bn.createHTML(e) : (e) => e, Nl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML", nt = typeof document < "u" ? document : null, lo = nt && /* @__PURE__ */ nt.createElement("template"), Hl = {
  insert: (e, t, s) => {
    t.insertBefore(e, s || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, s, n) => {
    const o = t === "svg" ? nt.createElementNS(Nl, e) : t === "mathml" ? nt.createElementNS(Vl, e) : s ? nt.createElement(e, { is: s }) : nt.createElement(e);
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
    e[Ts] = e.style.display === "none" ? "" : e.style.display, s && t ? s.beforeEnter(e) : Bt(e, t);
  },
  mounted(e, { value: t }, { transition: s }) {
    s && t && s.enter(e);
  },
  updated(e, { value: t, oldValue: s }, { transition: n }) {
    !t != !s && (n ? t ? (n.beforeEnter(e), Bt(e, !0), n.enter(e)) : n.leave(e, () => {
      Bt(e, !1);
    }) : Bt(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Bt(e, t);
  }
};
function Bt(e, t) {
  e.style.display = t ? e[Ts] : "none", e[Oi] = !t;
}
const Wl = /* @__PURE__ */ Symbol(""), Bl = /(?:^|;)\s*display\s*:/;
function ql(e, t, s) {
  const n = e.style, o = ge(s);
  let i = !1;
  if (s && !o) {
    if (t)
      if (ge(t))
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
  if (W(s))
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
  let n = Fe(t);
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
    i ? "" : Ze(s) ? String(s) : s
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
function yt(e, t, s, n) {
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
      const b = i[t] = ec(
        n,
        o
      );
      yt(e, l, b, c);
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
    et(
      tc(n, s.value),
      t,
      5,
      [n]
    );
  };
  return s.value = e, s.attached = Zl(), s;
}
function tc(e, t) {
  if (W(t)) {
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
  t === "class" ? Kl(e, n, r) : t === "style" ? ql(e, s, n) : Es(t) ? xn(t) || Gl(e, t, s, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nc(e, t, n, r)) ? (po(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && uo(e, t, n, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !ge(n)) ? po(e, Fe(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), uo(e, t, n, r));
};
function nc(e, t, s, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && bo(t) && X(s));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const o = e.tagName;
    if (o === "IMG" || o === "VIDEO" || o === "CANVAS" || o === "SOURCE")
      return !1;
  }
  return bo(t) && ge(s) ? !1 : t in e;
}
const wo = {};
// @__NO_SIDE_EFFECTS__
function Df(e, t, s) {
  let n = /* @__PURE__ */ tt(e, t);
  As(n) && (n = we({}, n, t));
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
      we({}, t.shadowRootOptions, {
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
    this._connected = !1, Ct(() => {
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
      if (i && !W(i))
        for (const c in i) {
          const b = i[c];
          (b === Number || b && b.type === Number) && (c in this._props && (this._props[c] = Hn(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[Fe(c)] = !0);
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
          get: () => h(s[n])
        });
  }
  _resolveProps(t) {
    const { props: s } = t, n = W(s) ? s : Object.keys(s || {});
    for (const o of Object.keys(this))
      o[0] !== "_" && n.includes(o) && this._setProp(o, this[o]);
    for (const o of n.map(Fe))
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
    const o = Fe(t);
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
    const s = ke(this._def, we(t, this._props));
    return this._instance || (s.ce = (n) => {
      this._instance = n, n.ce = this, n.isCE = !0;
      const o = (i, r) => {
        this.dispatchEvent(
          new CustomEvent(
            i,
            As(r[0]) ? we({ detail: r }, r[0]) : { detail: r }
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
            const b = s + "-s", f = document.createTreeWalker(c, 1);
            c.setAttribute(b, "");
            let p;
            for (; p = f.nextNode(); )
              p.setAttribute(b, "");
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
  return W(t) ? (s) => bs(t, s) : t;
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
    yt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Ot](vo(e.value, s, i));
    }), (s || i) && yt(e, "change", () => {
      e.value = vo(e.value, s, i);
    }), t || (yt(e, "compositionstart", ic), yt(e, "compositionend", go), yt(e, "change", go));
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
}, Yt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: s } }, n) {
    const o = Ps(t);
    yt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => s ? Os(Ms(r)) : Ms(r)
      );
      e[Ot](
        e.multiple ? o ? new Set(i) : i : i[0]
      ), e._assigning = !0, Ct(() => {
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
  const s = e.multiple, n = W(t);
  if (!(s && !n && !Ps(t))) {
    for (let o = 0, i = e.options.length; o < i; o++) {
      const r = e.options[o], l = Ms(r);
      if (s)
        if (n) {
          const c = typeof l;
          c === "string" || c === "number" ? r.selected = t.some((b) => String(b) === String(l)) : r.selected = Zi(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (fs(Ms(r), t)) {
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
}, bt = (e, t) => {
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
}, ac = /* @__PURE__ */ we({ patchProp: sc }, Hl);
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
    !X(i) && !i.render && !i.template && (i.template = o.innerHTML), o.nodeType === 1 && (o.textContent = "");
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
  return ge(e) ? document.querySelector(e) : e;
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
var ss;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(ss || (ss = {}));
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
    wn(o) && wn(n) && e.hasOwnProperty(s) && !/* @__PURE__ */ be(n) && !/* @__PURE__ */ lt(n) ? e[s] = gn(o, n) : e[s] = n;
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
const { assign: dt } = Object;
function bc(e) {
  return !!(/* @__PURE__ */ be(e) && e.effect);
}
function wc(e, t, s, n) {
  const { state: o, actions: i, getters: r } = t, l = s.state.value[e];
  let c;
  function b() {
    l || (s.state.value[e] = o ? o() : {});
    const f = /* @__PURE__ */ kr(s.state.value[e]);
    return dt(f, i, Object.keys(r || {}).reduce((p, g) => (p[g] = $n(ie(() => {
      Bs(s);
      const k = s._s.get(e);
      return r[g].call(k, k);
    })), p), {}));
  }
  return c = Ni(e, b, t, s, n, !0), c;
}
function Ni(e, t, s = {}, n, o, i) {
  let r;
  const l = dt({ actions: {} }, s), c = { deep: !0 };
  let b, f, p = [], g = [], k;
  const d = n.state.value[e];
  !i && !d && (n.state.value[e] = {});
  let w;
  function U(L) {
    let M;
    b = f = !1, typeof L == "function" ? (L(n.state.value[e]), M = {
      type: ss.patchFunction,
      storeId: e,
      events: k
    }) : (gn(n.state.value[e], L), M = {
      type: ss.patchObject,
      payload: L,
      storeId: e,
      events: k
    });
    const T = w = Symbol();
    Ct().then(() => {
      w === T && (b = !0);
    }), f = !0, Mt(p, M, n.state.value[e]);
  }
  const G = i ? function() {
    const { state: M } = s, T = M ? M() : {};
    this.$patch((ce) => {
      dt(ce, T);
    });
  } : (
    /* istanbul ignore next */
    Fi
  );
  function z() {
    r.stop(), p = [], g = [], n._s.delete(e);
  }
  const A = (L, M = "") => {
    if (ko in L)
      return L[rn] = M, L;
    const T = function() {
      Bs(n);
      const ce = Array.from(arguments), he = [], j = [];
      function ve(J) {
        he.push(J);
      }
      function je(J) {
        j.push(J);
      }
      Mt(g, {
        args: ce,
        name: T[rn],
        store: B,
        after: ve,
        onError: je
      });
      let pe;
      try {
        pe = L.apply(this && this.$id === e ? this : B, ce);
      } catch (J) {
        throw Mt(j, J), J;
      }
      return pe instanceof Promise ? pe.then((J) => (Mt(he, J), J)).catch((J) => (Mt(j, J), Promise.reject(J))) : (Mt(he, pe), pe);
    };
    return T[ko] = !0, T[rn] = M, T;
  }, $ = {
    _p: n,
    // _s: scope,
    $id: e,
    $onAction: So.bind(null, g),
    $patch: U,
    $reset: G,
    $subscribe(L, M = {}) {
      const T = So(p, L, M.detached, () => ce()), ce = r.run(() => Rt(() => n.state.value[e], (he) => {
        (M.flush === "sync" ? f : b) && L({
          storeId: e,
          type: ss.direct,
          events: k
        }, he);
      }, dt({}, c, M)));
      return T;
    },
    $dispose: z
  }, B = /* @__PURE__ */ js($);
  n._s.set(e, B);
  const de = (n._a && n._a.runWithContext || pc)(() => n._e.run(() => (r = jo()).run(() => t({ action: A }))));
  for (const L in de) {
    const M = de[L];
    if (/* @__PURE__ */ be(M) && !bc(M) || /* @__PURE__ */ lt(M))
      i || (d && hc(M) && (/* @__PURE__ */ be(M) ? M.value = d[L] : gn(M, d[L])), n.state.value[e][L] = M);
    else if (typeof M == "function") {
      const T = A(M, L);
      de[L] = T, l.actions[L] = M;
    }
  }
  return dt(B, de), dt(/* @__PURE__ */ ne(B), de), Object.defineProperty(B, "$state", {
    get: () => n.state.value[e],
    set: (L) => {
      U((M) => {
        dt(M, L);
      });
    }
  }), n._p.forEach((L) => {
    dt(B, r.run(() => L({
      store: B,
      app: n._a,
      pinia: n,
      options: l
    })));
  }), d && i && s.hydrate && s.hydrate(B.$state, d), b = !0, f = !0, B;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gc(e, t, s) {
  let n, o;
  const i = typeof t == "function";
  n = e, o = i ? s : t;
  function r(l, c) {
    const b = Dr();
    return l = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    l || (b ? St(ji, null) : null), l && Bs(l), l = Li, l._s.has(n) || (i ? Ni(n, t, o, l) : wc(n, o, l)), l._s.get(n);
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
  }), t = /* @__PURE__ */ F("text"), s = /* @__PURE__ */ F("right"), n = /* @__PURE__ */ F("bottom"), o = /* @__PURE__ */ F(""), i = /* @__PURE__ */ F("text"), r = /* @__PURE__ */ F("medium"), l = /* @__PURE__ */ F("default"), c = /* @__PURE__ */ F("ocean"), b = /* @__PURE__ */ F(""), f = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F("manual"), g = /* @__PURE__ */ F("idle"), k = /* @__PURE__ */ F(!1), d = /* @__PURE__ */ F(0), w = /* @__PURE__ */ F("technical_issue"), U = /* @__PURE__ */ F({}), G = /* @__PURE__ */ F({
    shortLeft: "done_archive",
    shortRight: "pin_unpin",
    longLeft: "create_linked_item",
    longRight: "comment"
  }), z = /* @__PURE__ */ F([]), A = /* @__PURE__ */ F(!1), $ = /* @__PURE__ */ F(!1), B = /* @__PURE__ */ F("active"), me = /* @__PURE__ */ F("updated_desc"), de = /* @__PURE__ */ F(""), L = /* @__PURE__ */ F([]), M = /* @__PURE__ */ F(!1), T = /* @__PURE__ */ F(""), ce = /* @__PURE__ */ F(""), he = /* @__PURE__ */ F(!1), j = /* @__PURE__ */ F(!1), ve = /* @__PURE__ */ F(null), je = /* @__PURE__ */ F(""), pe = /* @__PURE__ */ F("");
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
    draftTitle: b,
    draftDescription: f,
    draftMergePolicy: p,
    voiceDraftState: g,
    voiceDraftReady: k,
    voiceDraftDurationMs: d,
    mode: w,
    itemViews: U,
    swipeMapping: G,
    issues: z,
    issuesLoaded: A,
    loadingIssues: $,
    listView: B,
    listSort: me,
    listQuery: de,
    listStatusFilter: L,
    creating: M,
    createError: T,
    listError: ce,
    textCreateSuccess: he,
    voiceCreateSuccess: j,
    lastSubmissionId: ve,
    lastTextTitle: je,
    lastTextDescription: pe,
    init: J
  };
});
function He() {
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
  const e = St("widget-adapter");
  if (!e) throw new Error("WidgetAdapter not provided");
  return {
    readToken: e.readToken,
    requireToken: e.requireToken,
    promptToken: e.promptToken,
    clearToken: e.clearToken
  };
}
function Dn() {
  const e = Ee(), { persist: t } = He();
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
function Vt() {
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
const vc = 10;
function xc() {
  const e = Ee(), { persist: t } = He(), { submitText: s, cancelSubmission: n, loadIssues: o } = Vt(), i = /* @__PURE__ */ F(0);
  let r = null;
  function l() {
    r !== null && (clearInterval(r), r = null), i.value = 0;
  }
  function c() {
    l(), e.lastSubmissionId && (i.value = vc, r = setInterval(() => {
      i.value -= 1, i.value <= 0 && l();
    }, 1e3));
  }
  async function b(g) {
    if (e.creating) return;
    const k = e.draftDescription.trim();
    if (!k) {
      e.createError = "Please provide a description.";
      return;
    }
    let d = e.draftTitle.trim();
    if (!d) {
      const w = k.split(`
`)[0];
      d = w.length > 50 ? w.slice(0, 50) + "..." : w;
    }
    e.createError = "", e.creating = !0;
    try {
      const w = await s(d, k, g);
      e.lastSubmissionId = typeof (w == null ? void 0 : w.submissionId) == "string" ? w.submissionId : null, e.lastTextTitle = d, e.lastTextDescription = e.draftDescription, e.draftTitle = "", e.draftDescription = "", e.textCreateSuccess = !0, c(), o(!0), t();
    } catch (w) {
      e.createError = w instanceof Error ? w.message : "Failed to create request";
    } finally {
      e.creating = !1;
    }
  }
  async function f() {
    if (!e.lastSubmissionId) return;
    const g = e.lastSubmissionId;
    await n(g), e.lastSubmissionId = null, e.textCreateSuccess = !1, e.draftTitle = e.lastTextTitle, e.draftDescription = e.lastTextDescription, l(), t();
  }
  function p() {
    e.textCreateSuccess = !1, l();
  }
  return {
    undoSecondsLeft: i,
    submit: b,
    undo: f,
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
  async function b() {
    const d = await l();
    if (d.state === "paused") {
      d.resume();
      return;
    }
    d.state === "inactive" && d.start(1e3);
  }
  async function f() {
    !e || e.state !== "recording" || (await c(), e.pause());
  }
  async function p() {
    return await c(), s.length ? new Blob(s, { type: n || "audio/webm" }) : null;
  }
  async function g() {
    e && e.state !== "inactive" && e.stop(), t == null || t.getTracks().forEach((d) => d.stop()), e = null, t = null, s = [], n = "", o.value = !1;
  }
  function k() {
    return n;
  }
  return { start: b, pause: f, exportRecording: p, reset: g, hasContent: o, getMimeType: k };
}
const _c = 10;
function Sc() {
  const e = Ee(), { persist: t } = He(), { submitVoice: s, cancelSubmission: n, loadIssues: o } = Vt(), i = yc(), r = /* @__PURE__ */ F(0);
  let l = null, c = null;
  function b() {
    c !== null && (clearInterval(c), c = null);
  }
  function f() {
    b(), c = setInterval(() => {
      e.voiceDraftDurationMs += 1e3, t();
    }, 1e3);
  }
  function p() {
    l !== null && (clearInterval(l), l = null), r.value = 0;
  }
  function g() {
    p(), e.lastSubmissionId && (r.value = _c, l = setInterval(() => {
      r.value -= 1, r.value <= 0 && p();
    }, 1e3));
  }
  async function k() {
    e.createError = "";
    try {
      e.voiceDraftState === "recording" ? (await i.pause(), e.voiceDraftState = "paused", e.voiceDraftReady = i.hasContent.value, b()) : (await i.start(), e.voiceDraftState = "recording", e.voiceDraftReady = i.hasContent.value, f()), t();
    } catch (z) {
      e.createError = z instanceof Error ? z.message : "Failed to access microphone";
    }
  }
  async function d() {
    b(), await i.reset(), e.voiceDraftState = "idle", e.voiceDraftReady = !1, e.voiceDraftDurationMs = 0, e.createError = "", t();
  }
  async function w() {
    if (!e.voiceDraftReady) return;
    const z = await i.exportRecording();
    if (!z || z.size < 1) {
      e.createError = "No recorded audio available yet.";
      return;
    }
    e.createError = "", e.creating = !0;
    try {
      const A = await s(z, i.getMimeType(), e.voiceDraftDurationMs);
      e.lastSubmissionId = typeof (A == null ? void 0 : A.submissionId) == "string" ? A.submissionId : null, await d(), e.voiceCreateSuccess = !0, g(), o(!0), t();
    } catch (A) {
      e.createError = A instanceof Error ? A.message : "Failed to submit voice request";
    } finally {
      e.creating = !1;
    }
  }
  async function U() {
    if (!e.lastSubmissionId) return;
    const z = e.lastSubmissionId;
    await n(z), e.lastSubmissionId = null, e.voiceCreateSuccess = !1, p(), t();
  }
  function G() {
    e.voiceCreateSuccess = !1, p();
  }
  return {
    undoSecondsLeft: r,
    toggleRecording: k,
    reset: d,
    submit: w,
    undo: U,
    dismissSuccess: G,
    stopVoiceTimer: b,
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
  const e = Ee(), { persist: t } = He(), s = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1);
  let o = 0;
  const i = ie(() => e.handedness === "left" ? { left: "10px", right: "" } : { right: "10px", left: "" });
  function r(p) {
    o = p.touches[0].clientX;
  }
  function l(p) {
    const g = p.changedTouches[0].clientX - o;
    Math.abs(g) >= Cc && (e.handedness = g < 0 ? "left" : "right", t(), p.preventDefault());
  }
  function c() {
    s.value = !0;
  }
  function b() {
    s.value = !1;
  }
  function f(p) {
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
    close: b,
    applyHandedness: f
  };
}
const zc = { class: "cfw-text-form-wrap" }, $c = { class: "cfw-textarea-wrap" }, Mc = ["id", "placeholder"], Ec = {
  key: 1,
  class: "cfw-mf-actions"
}, Pc = ["disabled"], Ac = {
  key: 2,
  id: "cfw-new-actions"
}, Ic = ["disabled"], Rc = /* @__PURE__ */ tt({
  __name: "TextForm",
  props: {
    mobile: { type: Boolean },
    titleId: { type: String },
    descId: { type: String }
  },
  emits: ["create"],
  setup(e, { expose: t, emit: s }) {
    const n = e, o = Ee(), { persist: i } = He(), r = ie(() => n.descId ?? (n.mobile ? "cfw-m-description" : "cfw-description")), l = ie(() => {
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
    function b() {
      i();
    }
    function f() {
      o.draftTitle = "", o.draftDescription = "", i();
    }
    const p = /* @__PURE__ */ F(null);
    function g() {
      const d = p.value;
      d && (d.style.height = "auto", d.style.height = d.scrollHeight + "px", d.style.overflowY = d.offsetHeight < d.scrollHeight ? "auto" : "hidden");
    }
    function k() {
      g(), b();
    }
    return Hs(() => g()), t({ focusTitle: () => {
      var d;
      return (d = p.value) == null ? void 0 : d.focus();
    } }), (d, w) => (P(), R("div", zc, [
      u("div", $c, [
        Le(u("textarea", {
          ref_key: "descRef",
          ref: p,
          id: r.value,
          "onUpdate:modelValue": w[0] || (w[0] = (U) => h(o).draftDescription = U),
          placeholder: l.value,
          maxlength: "5000",
          onInput: k,
          onKeydown: [
            w[1] || (w[1] = Nt(bt((U) => c.value && !h(o).creating && d.$emit("create", !0), ["ctrl"]), ["enter"])),
            w[2] || (w[2] = Nt(bt((U) => c.value && !h(o).creating && d.$emit("create", !0), ["meta"]), ["enter"]))
          ]
        }, null, 40, Mc), [
          [$s, h(o).draftDescription]
        ])
      ]),
      h(o).createError ? (P(), R("div", {
        key: 0,
        class: H([["cfw-error", e.mobile ? "cfw-mf-error" : ""], "active"])
      }, N(h(o).createError), 3)) : te("", !0),
      e.mobile ? (P(), R("div", Ec, [
        c.value ? (P(), R("button", {
          key: 0,
          id: "cfw-m-clear",
          class: "cfw-btn cfw-btn-outline",
          type: "button",
          onClick: f
        }, "Clear")) : te("", !0),
        u("button", {
          id: "cfw-m-submit",
          class: "cfw-btn cfw-btn-primary",
          type: "button",
          disabled: h(o).creating,
          onClick: w[3] || (w[3] = (U) => d.$emit("create", !1))
        }, N(h(o).creating ? "Saving..." : "Submit"), 9, Pc)
      ])) : (P(), R("div", Ac, [
        u("button", {
          id: "cfw-submit",
          type: "button",
          class: "cfw-btn cfw-btn-primary",
          disabled: h(o).creating,
          onClick: w[4] || (w[4] = (U) => d.$emit("create", !1))
        }, N(h(o).creating ? "Saving..." : "Submit"), 9, Ic)
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
}, Kc = ["onClick"], Co = 80, To = 160, zo = /* @__PURE__ */ tt({
  __name: "IssueRow",
  props: {
    issue: { type: Object }
  },
  emits: ["open-issue", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = He(), r = ie(() => {
      const L = o.itemViews[s.issue.number] || 0;
      return new Date(s.issue.updatedAt).getTime() > L;
    }), l = ie(() => {
      const L = new Date(s.issue.updatedAt), T = (/* @__PURE__ */ new Date()).getTime() - L.getTime();
      return T < 6e4 ? "Just now" : T < 36e5 ? `${Math.floor(T / 6e4)}m ago` : T < 864e5 ? `${Math.floor(T / 36e5)}h ago` : `${Math.floor(T / 864e5)}d ago`;
    });
    let c = 0, b = 0;
    const f = /* @__PURE__ */ F(0), p = /* @__PURE__ */ F(!1), g = ie(() => {
      if (!p.value) return "";
      const L = f.value > 0 ? "right" : "left", M = Math.abs(f.value), T = M > To ? o.swipeMapping[L === "right" ? "longRight" : "longLeft"] : M > Co ? o.swipeMapping[L === "right" ? "shortRight" : "shortLeft"] : "none";
      return de(T);
    }), k = ie(() => f.value > 0 ? "preview-left" : "preview-right"), d = ie(() => !g.value || g.value === "None" ? "" : f.value > 0 ? "bg-right" : "bg-left"), w = ie(() => ({
      transform: `translateX(${f.value}px)`,
      transition: p.value ? "none" : "transform 0.25s ease-out"
    }));
    function U(L) {
      c = L.touches[0].clientX, p.value = !0;
    }
    function G(L) {
      p.value && (b = L.touches[0].clientX, f.value = b - c);
    }
    function z() {
      p.value = !1;
      const L = Math.abs(f.value);
      if (L > Co) {
        const M = f.value > 0 ? "right" : "left", T = L > To ? o.swipeMapping[M === "right" ? "longRight" : "longLeft"] : o.swipeMapping[M === "right" ? "shortRight" : "shortLeft"];
        T !== "none" && n("swipe-action", T, s.issue);
      }
      f.value = 0;
    }
    function A() {
      o.itemViews[s.issue.number] = Date.now(), i(), n("open-issue", s.issue);
    }
    const $ = /* @__PURE__ */ F(!1), B = ie(() => {
      const L = [
        { id: "done_archive", label: "Done / Archive" },
        { id: "pin_unpin", label: "Pin / Unpin" },
        { id: "comment", label: "Comment" },
        { id: "create_linked_item", label: "Create linked item" },
        { id: "mark_viewed", label: "Mark viewed" }
      ];
      return s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" || L.unshift({ id: "edit", label: "Edit" }), L;
    });
    function me(L) {
      $.value = !1, L === "edit" ? n("edit-issue", s.issue) : n("swipe-action", L, s.issue);
    }
    function de(L) {
      return {
        done_archive: "Archive",
        pin_unpin: "Pin",
        comment: "Comment",
        create_linked_item: "Link",
        mark_viewed: "Mark viewed",
        none: "None"
      }[L] || "None";
    }
    return (L, M) => (P(), R("div", {
      class: H(["cfw-ml-row-wrap", { "menu-open": $.value }]),
      onTouchstartPassive: U,
      onTouchmovePassive: G,
      onTouchend: z
    }, [
      u("div", {
        class: H(["cfw-ml-row-bg", d.value])
      }, [
        g.value ? (P(), R("div", {
          key: 0,
          class: H(["cfw-swipe-preview", k.value])
        }, N(g.value), 3)) : te("", !0)
      ], 2),
      u("div", {
        class: H(["cfw-ml-row", { unread: r.value, "menu-open": $.value }]),
        style: Dt(w.value),
        onClick: A,
        tabindex: "0",
        onKeydown: [
          Nt(A, ["enter"]),
          Nt(bt(A, ["prevent"]), ["space"])
        ]
      }, [
        u("div", Dc, [
          u("div", Lc, [
            u("span", jc, N(e.issue.status || e.issue.state), 1),
            e.issue.commentCount ? (P(), R("span", Fc, N(e.issue.commentCount) + " comment" + N(e.issue.commentCount === 1 ? "" : "s"), 1)) : te("", !0),
            r.value ? (P(), R("span", Nc)) : te("", !0),
            u("span", Vc, N(l.value), 1)
          ]),
          u("div", Hc, N(e.issue.title), 1)
        ]),
        u("button", {
          class: "cfw-ml-row-menu",
          onClick: M[0] || (M[0] = bt((T) => $.value = !$.value, ["stop"]))
        }, "⋮"),
        $.value ? (P(), R("div", Uc, [
          (P(!0), R(se, null, Me(B.value, (T) => (P(), R("button", {
            key: T.id,
            onClick: bt((ce) => me(T.id), ["stop"])
          }, N(T.label), 9, Kc))), 128))
        ])) : te("", !0)
      ], 46, Oc)
    ], 34));
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
}, $o = 56, Zc = /* @__PURE__ */ tt({
  __name: "IssuesList",
  emits: ["refresh", "open-issue", "open-filter", "swipe-action", "edit-issue"],
  setup(e, { emit: t }) {
    const s = t, n = Ee(), { hasAccess: o } = Vt(), { onPanelTouchStart: i, onPanelTouchEnd: r } = Dn(), l = /* @__PURE__ */ F(!1), c = /* @__PURE__ */ F("");
    let b = 0, f = !1;
    const p = (z) => !["completed", "closed_unmerged", "merged"].includes(z.status || "") && z.state !== "closed", g = ie(() => n.issues.filter((z) => !!z.pinned && p(z))), k = ie(() => n.issues.filter((z) => !z.pinned || !p(z))), d = ie(() => o() ? n.loadingIssues ? "Loading…" : n.listError ? n.listError : "No requests yet." : "Authentication required to view requests.");
    function w(z) {
      z.currentTarget.scrollTop === 0 && (b = z.touches[0].clientY, f = !0);
    }
    function U(z) {
      if (!f) return;
      const A = z.touches[0].clientY - b;
      A > 0 ? (l.value = !0, c.value = A > $o ? "↑ Release to refresh" : "↓ Pull to refresh") : (f = !1, l.value = !1);
    }
    function G(z) {
      if (!f) return;
      const A = z.changedTouches[0].clientY - b;
      f = !1, A > $o ? (c.value = "Refreshing…", s("refresh"), setTimeout(() => {
        l.value = !1, c.value = "";
      }, 1e3)) : (l.value = !1, c.value = "");
    }
    return (z, A) => (P(), R("div", {
      id: "cfw-mv-list",
      class: H(["cfw-mv", { active: h(n).mobileTab === "list" }])
    }, [
      u("div", {
        class: "cfw-panel-handle",
        onTouchstartPassive: A[0] || (A[0] = //@ts-ignore
        (...$) => h(i) && h(i)(...$)),
        onTouchend: A[1] || (A[1] = //@ts-ignore
        (...$) => h(r) && h(r)(...$))
      }, [...A[8] || (A[8] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32),
      u("div", Wc, [
        u("div", Bc, [
          A[9] || (A[9] = u("span", { id: "cfw-ml-head-title" }, "Requests", -1)),
          u("div", qc, [
            u("button", {
              disabled: h(n).loadingIssues,
              onClick: A[2] || (A[2] = ($) => z.$emit("open-filter"))
            }, "⊞ Filter", 8, Yc),
            u("button", {
              disabled: h(n).loadingIssues,
              onClick: A[3] || (A[3] = ($) => z.$emit("refresh"))
            }, N(h(n).loadingIssues ? "…" : "↻"), 9, Jc)
          ])
        ]),
        h(n).listError ? (P(), R("div", Gc, N(h(n).listError), 1)) : te("", !0),
        u("div", {
          id: "cfw-ml-ptr",
          class: H({ "cfw-ml-ptr-active": l.value })
        }, N(c.value), 3),
        u("div", {
          id: "cfw-ml-body",
          onTouchstartPassive: w,
          onTouchmovePassive: U,
          onTouchendPassive: G
        }, [
          h(n).issues.length ? (P(), R(se, { key: 1 }, [
            g.value.length ? (P(), R(se, { key: 0 }, [
              A[10] || (A[10] = u("div", { class: "cfw-ml-section-label" }, "Pinned", -1)),
              (P(!0), R(se, null, Me(g.value, ($) => (P(), ls(zo, {
                key: $.number,
                issue: $,
                onOpenIssue: A[4] || (A[4] = (B) => z.$emit("open-issue", B)),
                onSwipeAction: (B) => z.$emit("swipe-action", B, $),
                onEditIssue: (B) => z.$emit("edit-issue", $)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : te("", !0),
            k.value.length ? (P(), R(se, { key: 1 }, [
              g.value.length ? (P(), R("div", Qc, "Activity")) : te("", !0),
              (P(!0), R(se, null, Me(k.value, ($) => (P(), ls(zo, {
                key: $.number,
                issue: $,
                onOpenIssue: A[5] || (A[5] = (B) => z.$emit("open-issue", B)),
                onSwipeAction: (B) => z.$emit("swipe-action", B, $),
                onEditIssue: (B) => z.$emit("edit-issue", $)
              }, null, 8, ["issue", "onSwipeAction", "onEditIssue"]))), 128))
            ], 64)) : te("", !0)
          ], 64)) : (P(), R("div", Xc, N(d.value), 1))
        ], 32)
      ]),
      h(n).panelSnap === "middle" ? (P(), R("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: A[6] || (A[6] = //@ts-ignore
        (...$) => h(i) && h(i)(...$)),
        onTouchend: A[7] || (A[7] = //@ts-ignore
        (...$) => h(r) && h(r)(...$))
      }, [...A[11] || (A[11] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : te("", !0)
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
}, Aa = { class: "cfw-fs-section" }, Ia = { class: "cfw-fs-pills" }, Ra = ["onClick"], Oa = { class: "cfw-fs-section" }, Da = { class: "cfw-fs-pills" }, La = ["onClick"], ja = { class: "cfw-fs-section" }, Fa = { class: "cfw-fs-chips" }, Na = ["onClick"], Va = /* @__PURE__ */ tt({
  __name: "IssueSheet",
  props: {
    open: { type: Boolean },
    issue: { type: [Object, null] },
    filterMode: { type: Boolean },
    editMode: { type: Boolean }
  },
  emits: ["close", "action-done", "filter-changed", "compose-sheet", "edit-issue", "cancel-edit"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { persist: i } = He(), { executeAction: r, mapActionError: l } = Vt(), c = /* @__PURE__ */ F(!1), b = /* @__PURE__ */ F(""), f = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F(""), g = /* @__PURE__ */ F("");
    Rt(() => s.editMode, (M) => {
      M && s.issue && (p.value = s.issue.title, g.value = s.issue.body || "");
    });
    const k = ie(() => s.issue ? s.issue.comments && s.issue.comments.length > 0 || s.issue.status !== "new" : !1), d = ie(() => {
      var M;
      return (M = s.issue) != null && M.comments ? [...s.issue.comments].sort((T, ce) => new Date(ce.createdAt).getTime() - new Date(T.createdAt).getTime()) : [];
    }), w = ie(() => d.value.length > 0), U = ie(() => d.value[0] || null), G = ie(() => d.value.slice(1));
    function z(M) {
      return new Date(M).toLocaleDateString(void 0, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
    }
    const A = ie(() => {
      var M;
      return Array.isArray((M = s.issue) == null ? void 0 : M.issueActions) ? s.issue.issueActions : [];
    }), $ = ie(() => {
      var M;
      return Array.isArray((M = s.issue) == null ? void 0 : M.pullRequestActions) ? s.issue.pullRequestActions : [];
    });
    async function B(M, T, ce) {
      b.value = "", c.value = !0;
      try {
        await r(M, ce, T), n("action-done"), n("close");
      } catch (he) {
        b.value = l(he instanceof Error ? he.message : "");
      } finally {
        c.value = !1;
      }
    }
    async function me() {
      if (!s.issue) return;
      const M = p.value.trim();
      if (M) {
        b.value = "", c.value = !0;
        try {
          await r(s.issue.number, "edit", "issue", {
            title: M,
            body: g.value.trim()
          }), n("action-done"), n("cancel-edit");
        } catch (T) {
          b.value = l(T instanceof Error ? T.message : "");
        } finally {
          c.value = !1;
        }
      }
    }
    function de(M) {
      const T = o.listStatusFilter.slice(), ce = T.indexOf(M);
      ce >= 0 ? T.splice(ce, 1) : T.push(M), o.listStatusFilter = T, i(), n("filter-changed");
    }
    function L() {
      o.listView = "active", o.listQuery = "", o.listStatusFilter = [], i(), n("filter-changed"), n("close");
    }
    return (M, T) => {
      var ce, he;
      return P(), R(se, null, [
        u("div", {
          id: "cfw-mbs-overlay",
          class: H({ active: e.open }),
          onClick: T[0] || (T[0] = (j) => M.$emit("close"))
        }, null, 2),
        u("div", {
          id: "cfw-mbs",
          class: H({ active: e.open, "panel-left": h(o).handedness === "left" })
        }, [
          T[16] || (T[16] = u("div", { id: "cfw-mbs-handle" }, null, -1)),
          e.issue ? (P(), R("div", na, [
            u("div", oa, N(e.issue.status || e.issue.state) + N(e.issue.statusDetail ? " · " + e.issue.statusDetail : ""), 1),
            u("div", ia, "#" + N(e.issue.number) + " · " + N(z(e.issue.updatedAt)), 1),
            e.editMode ? (P(), R(se, { key: 0 }, [
              Le(u("input", {
                "onUpdate:modelValue": T[1] || (T[1] = (j) => p.value = j),
                class: "cfw-edit-title",
                placeholder: "Issue title...",
                style: { width: "100%", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#fff", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "16px", "font-weight": "bold", "margin-top": "12px" }
              }, null, 512), [
                [$s, p.value]
              ]),
              Le(u("textarea", {
                "onUpdate:modelValue": T[2] || (T[2] = (j) => g.value = j),
                placeholder: "Issue description...",
                style: { width: "100%", "min-height": "120px", background: "transparent", border: "1px solid rgba(124,187,255,0.2)", color: "#d9e7f7", padding: "12px", "border-radius": "8px", "font-family": "inherit", "font-size": "14px", "margin-top": "8px", resize: "vertical" }
              }, null, 512), [
                [$s, g.value]
              ]),
              u("div", ra, [
                u("button", {
                  class: "cfw-btn cfw-btn-outline",
                  onClick: T[3] || (T[3] = (j) => M.$emit("cancel-edit")),
                  style: { flex: "1" }
                }, "Cancel"),
                u("button", {
                  class: "cfw-btn cfw-btn-primary",
                  disabled: c.value || !p.value.trim(),
                  onClick: me,
                  style: { flex: "1" }
                }, N(c.value ? "Saving..." : "Save"), 9, la)
              ])
            ], 64)) : (P(), R(se, { key: 1 }, [
              u("a", {
                class: "cfw-is-title",
                href: e.issue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, N(e.issue.title), 9, ca),
              e.issue.body ? (P(), R("div", aa, N(e.issue.body), 1)) : te("", !0),
              (ce = e.issue.labels) != null && ce.length ? (P(), R("div", fa, [
                (P(!0), R(se, null, Me(e.issue.labels, (j) => (P(), R("span", {
                  key: j,
                  class: "cfw-badge"
                }, N(j), 1))), 128))
              ])) : te("", !0),
              u("div", ua, [
                k.value ? (P(), R("button", {
                  key: 0,
                  class: "cfw-btn cfw-btn-primary cfw-is-w100",
                  onClick: T[4] || (T[4] = (j) => M.$emit("compose-sheet", "comment", e.issue))
                }, "Comment")) : (P(), R("div", da, [
                  u("button", {
                    class: "cfw-btn cfw-btn-outline",
                    onClick: T[5] || (T[5] = (j) => M.$emit("edit-issue", e.issue))
                  }, "Edit"),
                  u("button", {
                    class: "cfw-btn cfw-btn-primary",
                    onClick: T[6] || (T[6] = (j) => M.$emit("compose-sheet", "comment", e.issue))
                  }, "Comment")
                ]))
              ])
            ], 64)),
            w.value ? (P(), R("div", pa, [
              U.value ? (P(), R("div", ma, [
                u("div", ha, [
                  u("strong", null, N(U.value.author || "User"), 1),
                  Ft(" · " + N(z(U.value.createdAt)), 1)
                ]),
                u("div", ba, N(U.value.body), 1)
              ])) : te("", !0),
              G.value.length > 0 ? (P(), R(se, { key: 1 }, [
                f.value ? (P(!0), R(se, { key: 1 }, Me(G.value, (j) => (P(), R("div", {
                  key: j.id,
                  class: "cfw-comment"
                }, [
                  u("div", wa, [
                    u("strong", null, N(j.author || "User"), 1),
                    Ft(" · " + N(z(j.createdAt)), 1)
                  ]),
                  u("div", ga, N(j.body), 1)
                ]))), 128)) : (P(), R("button", {
                  key: 0,
                  class: "cfw-comments-expand",
                  onClick: T[7] || (T[7] = (j) => f.value = !0)
                }, " Show " + N(G.value.length) + " previous comment" + N(G.value.length > 1 ? "s" : ""), 1))
              ], 64)) : te("", !0)
            ])) : te("", !0),
            e.issue.sourceIssue ? (P(), R("div", va, [
              T[10] || (T[10] = u("div", { class: "cfw-is-section-label" }, "Source Item", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.sourceIssue.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, " #" + N(e.issue.sourceIssue.number) + " " + N(e.issue.sourceIssue.title), 9, xa)
            ])) : te("", !0),
            A.value.length ? (P(), R("div", ya, [
              T[11] || (T[11] = u("div", { class: "cfw-is-section-label" }, "Issue actions", -1)),
              u("div", _a, [
                (P(!0), R(se, null, Me(A.value, (j) => (P(), R("div", {
                  key: j.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: j.disabled || c.value,
                    onClick: (ve) => !j.disabled && B(e.issue.number, "issue", j.id)
                  }, N(j.label || j.id), 9, Sa),
                  j.disabled && j.reason ? (P(), R("span", ka, N(j.reason), 1)) : te("", !0)
                ]))), 128))
              ])
            ])) : te("", !0),
            (he = e.issue.pullRequest) != null && he.url ? (P(), R("div", Ca, [
              T[12] || (T[12] = u("div", { class: "cfw-is-section-label" }, "Pull request", -1)),
              u("a", {
                class: "cfw-is-pr-link",
                href: e.issue.pullRequest.url,
                target: "_blank",
                rel: "noopener noreferrer"
              }, "PR #" + N(e.issue.pullRequest.number) + " · " + N((e.issue.pullRequest.state || "").toLowerCase()) + N(e.issue.pullRequest.isDraft ? " · draft" : ""), 9, Ta),
              $.value.length ? (P(), R("div", za, [
                (P(!0), R(se, null, Me($.value, (j) => (P(), R("div", {
                  key: j.id
                }, [
                  u("button", {
                    class: "cfw-is-action-btn",
                    disabled: j.disabled || c.value,
                    onClick: (ve) => !j.disabled && B(e.issue.number, "pull_request", j.id)
                  }, N(j.label || j.id), 9, $a),
                  j.disabled && j.reason ? (P(), R("span", Ma, N(j.reason), 1)) : te("", !0)
                ]))), 128))
              ])) : te("", !0)
            ])) : te("", !0),
            b.value ? (P(), R("div", Ea, N(b.value), 1)) : te("", !0),
            u("button", {
              class: "cfw-mbs-close",
              onClick: T[8] || (T[8] = (j) => M.$emit("close"))
            }, "Close")
          ])) : e.filterMode ? (P(), R("div", Pa, [
            u("div", Aa, [
              T[13] || (T[13] = u("div", { class: "cfw-fs-label" }, "View", -1)),
              u("div", Ia, [
                (P(!0), R(se, null, Me(h(ea), ([j, ve]) => (P(), R("button", {
                  key: j,
                  class: H(["cfw-fs-pill", { active: h(o).listView === j }]),
                  onClick: (je) => {
                    h(o).listView = j, h(i)(), M.$emit("filter-changed");
                  }
                }, N(ve), 11, Ra))), 128))
              ])
            ]),
            u("div", Oa, [
              T[14] || (T[14] = u("div", { class: "cfw-fs-label" }, "Sort", -1)),
              u("div", Da, [
                (P(!0), R(se, null, Me(h(ta), ([j, ve]) => (P(), R("button", {
                  key: j,
                  class: H(["cfw-fs-pill", { active: h(o).listSort === j }]),
                  onClick: (je) => {
                    h(o).listSort = j, h(i)(), M.$emit("filter-changed");
                  }
                }, N(ve), 11, La))), 128))
              ])
            ]),
            u("div", ja, [
              T[15] || (T[15] = u("div", { class: "cfw-fs-label" }, "Status", -1)),
              u("div", Fa, [
                (P(!0), R(se, null, Me(h(sa), ([j, ve]) => (P(), R("button", {
                  key: j,
                  class: H(["cfw-fs-chip", { active: h(o).listStatusFilter.includes(j) }]),
                  onClick: (je) => de(j)
                }, N(ve), 11, Na))), 128))
              ])
            ]),
            u("button", {
              class: "cfw-mbs-close",
              style: { "margin-bottom": "8px" },
              onClick: L
            }, "Clear filters"),
            u("button", {
              class: "cfw-mbs-close",
              onClick: T[9] || (T[9] = (j) => M.$emit("close"))
            }, "Done")
          ])) : te("", !0)
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
}, Xa = { class: "cfw-m-swipe-settings" }, Qa = { class: "cfw-m-swipe-row" }, Za = ["value"], ef = { class: "cfw-m-swipe-row" }, tf = ["value"], sf = { class: "cfw-m-swipe-row" }, nf = ["value"], of = { class: "cfw-m-swipe-row" }, rf = ["value"], lf = /* @__PURE__ */ tt({
  __name: "SettingsPane",
  emits: ["handedness", "token-changed"],
  setup(e, { emit: t }) {
    const s = t, n = Ee(), { persist: o } = He(), { clearToken: i, promptToken: r } = Vi(), { onPanelTouchStart: l, onPanelTouchEnd: c } = Dn(), b = ie(() => {
      const k = n.adminToken;
      return k ? "Token is set: " + k.slice(0, 3) + "…" : "No token set.";
    });
    function f() {
      r(), s("token-changed");
    }
    function p() {
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
    return (k, d) => (P(), R("div", {
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
      u("div", Ha, [
        u("div", Ua, [
          d[35] || (d[35] = u("h3", null, "Admin token", -1)),
          u("div", Ka, N(b.value), 1),
          u("div", { class: "cfw-m-hand-toggle" }, [
            u("button", {
              class: "cfw-m-hand-btn",
              onClick: f
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
              onClick: d[5] || (d[5] = (w) => k.$emit("handedness", "left"))
            }, "◀ Left", 2),
            u("button", {
              class: H(["cfw-m-hand-btn", { active: h(n).handedness === "right" }]),
              onClick: d[6] || (d[6] = (w) => k.$emit("handedness", "right"))
            }, "Right ▶", 2)
          ]),
          d[39] || (d[39] = u("p", { class: "cfw-m-settings-note" }, "Or swipe the open button left or right.", -1)),
          d[40] || (d[40] = u("h3", null, "Panel position", -1)),
          u("div", qa, [
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
          u("div", Ya, [
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
          u("div", Ja, [
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
          u("div", Xa, [
            u("div", Qa, [
              d[31] || (d[31] = u("label", null, "Short Right (→)", -1)),
              Le(u("select", {
                "onUpdate:modelValue": d[20] || (d[20] = (w) => h(n).swipeMapping.shortRight = w),
                class: "cfw-select",
                onChange: d[21] || (d[21] = (w) => h(o)())
              }, [
                (P(), R(se, null, Me(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, Za)), 64))
              ], 544), [
                [Yt, h(n).swipeMapping.shortRight]
              ])
            ]),
            u("div", ef, [
              d[32] || (d[32] = u("label", null, "Long Right (→→)", -1)),
              Le(u("select", {
                "onUpdate:modelValue": d[22] || (d[22] = (w) => h(n).swipeMapping.longRight = w),
                class: "cfw-select",
                onChange: d[23] || (d[23] = (w) => h(o)())
              }, [
                (P(), R(se, null, Me(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, tf)), 64))
              ], 544), [
                [Yt, h(n).swipeMapping.longRight]
              ])
            ]),
            u("div", sf, [
              d[33] || (d[33] = u("label", null, "Short Left (←)", -1)),
              Le(u("select", {
                "onUpdate:modelValue": d[24] || (d[24] = (w) => h(n).swipeMapping.shortLeft = w),
                class: "cfw-select",
                onChange: d[25] || (d[25] = (w) => h(o)())
              }, [
                (P(), R(se, null, Me(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, nf)), 64))
              ], 544), [
                [Yt, h(n).swipeMapping.shortLeft]
              ])
            ]),
            u("div", of, [
              d[34] || (d[34] = u("label", null, "Long Left (←←)", -1)),
              Le(u("select", {
                "onUpdate:modelValue": d[26] || (d[26] = (w) => h(n).swipeMapping.longLeft = w),
                class: "cfw-select",
                onChange: d[27] || (d[27] = (w) => h(o)())
              }, [
                (P(), R(se, null, Me(g, (w) => u("option", {
                  key: w.value,
                  value: w.value
                }, N(w.label), 9, rf)), 64))
              ], 544), [
                [Yt, h(n).swipeMapping.longLeft]
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
      h(n).panelSnap === "middle" ? (P(), R("div", {
        key: 0,
        class: "cfw-panel-handle cfw-panel-handle-bottom",
        onTouchstartPassive: d[28] || (d[28] = //@ts-ignore
        (...w) => h(l) && h(l)(...w)),
        onTouchend: d[29] || (d[29] = //@ts-ignore
        (...w) => h(c) && h(c)(...w))
      }, [...d[50] || (d[50] = [
        u("div", { class: "cfw-panel-handle-bar" }, null, -1)
      ])], 32)) : te("", !0)
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
}, bf = ["disabled"], wf = /* @__PURE__ */ tt({
  __name: "ComposeSheet",
  props: {
    open: { type: Boolean },
    mode: { type: String },
    issue: { type: [Object, null] }
  },
  emits: ["close", "action-done"],
  setup(e, { emit: t }) {
    const s = e, n = t, o = Ee(), { submitComment: i, createLinkedItem: r } = Vt(), l = /* @__PURE__ */ F(null), c = ie(() => !!o.draftDescription.trim());
    Rt(() => s.open, (f) => {
      f && (o.draftDescription = "", Ct(() => {
        var p;
        return (p = l.value) == null ? void 0 : p.focus();
      }));
    });
    async function b() {
      if (!s.issue || o.creating) return;
      const f = o.draftDescription.trim();
      if (!f) {
        o.createError = "Please provide text.";
        return;
      }
      o.createError = "", o.creating = !0;
      try {
        if (s.mode === "comment")
          await i(s.issue.number, f);
        else {
          const p = f.split(`
`)[0], g = p.length > 50 ? p.slice(0, 50) + "..." : p;
          await r(s.issue.number, g, f, !1);
        }
        o.draftDescription = "", n("action-done"), n("close");
      } catch (p) {
        o.createError = p instanceof Error ? p.message : "Failed to submit";
      } finally {
        o.creating = !1;
      }
    }
    return (f, p) => (P(), R(se, null, [
      u("div", {
        id: "cfw-compose-overlay",
        class: H({ active: e.open }),
        onClick: p[0] || (p[0] = (g) => f.$emit("close"))
      }, null, 2),
      u("div", {
        id: "cfw-compose-sheet",
        class: H({ active: e.open, "panel-left": h(o).handedness === "left" })
      }, [
        p[4] || (p[4] = u("div", { id: "cfw-compose-handle" }, null, -1)),
        u("div", cf, [
          u("span", af, N(e.mode === "comment" ? "New Comment" : "Create Linked Item"), 1),
          u("button", {
            class: "cfw-compose-close",
            onClick: p[1] || (p[1] = (g) => f.$emit("close"))
          }, "×")
        ]),
        e.issue ? (P(), R("div", ff, [
          u("div", uf, [
            u("strong", null, "#" + N(e.issue.number), 1),
            Ft(" " + N(e.issue.title), 1)
          ])
        ])) : te("", !0),
        u("div", df, [
          u("div", pf, [
            Le(u("textarea", {
              ref_key: "descRef",
              ref: l,
              "onUpdate:modelValue": p[2] || (p[2] = (g) => h(o).draftDescription = g),
              placeholder: e.mode === "comment" ? "Write a comment..." : "Describe the linked item...",
              maxlength: "5000",
              style: { height: "100%", border: "none", background: "transparent", color: "#d9e7f7", "font-size": "14px", width: "100%", resize: "none", outline: "none", padding: "0" },
              onKeydown: [
                Nt(bt(b, ["ctrl"]), ["enter"]),
                Nt(bt(b, ["meta"]), ["enter"])
              ]
            }, null, 40, mf), [
              [$s, h(o).draftDescription]
            ])
          ]),
          u("div", hf, [
            u("button", {
              class: "cfw-btn cfw-btn-outline",
              onClick: p[3] || (p[3] = (g) => f.$emit("close"))
            }, "Cancel"),
            u("button", {
              class: "cfw-btn cfw-btn-primary",
              disabled: !c.value,
              onClick: b
            }, N(h(o).creating ? "Submitting..." : "Submit"), 9, bf)
          ])
        ])
      ], 2)
    ], 64));
  }
}), gf = { class: "cfw-settings-row" }, vf = ["aria-expanded"], xf = ["disabled"], yf = ["disabled"], _f = ["disabled"], Sf = {
  key: 1,
  class: "cfw-m-verror active"
}, kf = /* @__PURE__ */ tt({
  __name: "VoiceComposer",
  props: {
    mobile: { type: Boolean }
  },
  emits: ["toggle-recording", "reset", "send"],
  setup(e) {
    const t = Ee(), { persist: s } = He(), n = /* @__PURE__ */ F(!1), o = ie(() => t.voiceDraftState === "recording" ? "Recording in progress" : t.voiceDraftState === "paused" && t.voiceDraftReady ? "Recording paused" : "Ready to record");
    function i(r) {
      const l = Math.max(0, Math.floor((r || 0) / 1e3)), c = Math.floor(l / 60), b = l % 60;
      return String(c).padStart(2, "0") + ":" + String(b).padStart(2, "0");
    }
    return (r, l) => (P(), R("div", {
      class: H(e.mobile ? "cfw-m-voice" : "cfw-voice-shell")
    }, [
      e.mobile ? te("", !0) : (P(), R(se, { key: 0 }, [
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
          class: H(["cfw-settings-panel", { active: n.value }])
        }, [
          l[8] || (l[8] = u("label", {
            class: "cfw-label",
            for: "cfw-merge-policy"
          }, "Merge policy", -1)),
          Le(u("select", {
            id: "cfw-merge-policy",
            class: "cfw-select",
            "onUpdate:modelValue": l[1] || (l[1] = (c) => h(t).draftMergePolicy = c),
            onChange: l[2] || (l[2] = //@ts-ignore
            (...c) => h(s) && h(s)(...c))
          }, [...l[7] || (l[7] = [
            u("option", { value: "manual" }, "Manual merge", -1),
            u("option", { value: "auto_unblocked" }, "Auto-merge when unblocked", -1)
          ])], 544), [
            [Yt, h(t).draftMergePolicy]
          ])
        ], 2)
      ], 64)),
      u("div", {
        class: H(e.mobile ? "cfw-m-vstatus" : "cfw-voice-status")
      }, [
        u("div", {
          class: H(e.mobile ? "cfw-m-vstatus-line" : "cfw-voice-status-line")
        }, N(o.value), 3),
        u("div", {
          class: H(e.mobile ? "cfw-m-vmeta" : "cfw-voice-meta")
        }, [
          l[9] || (l[9] = u("span", null, "Draft recording", -1)),
          u("strong", null, N(i(h(t).voiceDraftDurationMs)), 1)
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
        }, N(h(t).voiceDraftState === "recording" ? "Pause" : "Record"), 9, xf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-reset",
          disabled: h(t).creating || !h(t).voiceDraftReady && h(t).voiceDraftState === "idle",
          onClick: l[4] || (l[4] = (c) => r.$emit("reset"))
        }, "Reset", 8, yf),
        u("button", {
          type: "button",
          class: "cfw-btn cfw-btn-send",
          disabled: h(t).creating || h(t).voiceDraftState === "recording" || !h(t).voiceDraftReady,
          onClick: l[5] || (l[5] = (c) => r.$emit("send"))
        }, "Send", 8, _f)
      ], 2),
      u("div", {
        class: H(e.mobile ? "cfw-m-vhint" : "cfw-voice-hint")
      }, N(h(t).voiceDraftReady ? "Recording is ready to send." : "Tap Record to start a draft. Settings ⚙ contains merge policy."), 3),
      h(t).createError && e.mobile ? (P(), R("div", Sf, N(h(t).createError), 1)) : te("", !0)
    ], 2));
  }
}), Cf = ["data-font-size", "data-density", "data-theme"], Tf = { class: "cfw-tab-body" }, zf = {
  key: 0,
  class: "cfw-compose-mode-toggle"
}, $f = { class: "cfw-m-success-hint" }, Mf = {
  key: 2,
  id: "cfw-mv-text-form",
  class: "cfw-mf"
}, Ef = { id: "cfw-mobile-nav" }, Pf = /* @__PURE__ */ tt({
  __name: "MobileWidget",
  setup(e, { expose: t }) {
    const s = Ee(), { persist: n } = He(), { onPanelTouchStart: o, onPanelTouchEnd: i } = Dn(), { loadIssues: r, authorize: l, executeAction: c } = Vt(), b = xc(), f = Sc(), p = kc(), g = Tc(), k = /* @__PURE__ */ F(null), d = ie(() => ({
      display: "flex",
      flexDirection: "column"
    })), w = ie(() => s.textCreateSuccess || s.voiceCreateSuccess), U = ie(() => s.voiceCreateSuccess ? "Voice request submitted" : "Tap to submit another"), G = ie(() => s.voiceCreateSuccess ? f.undoSecondsLeft.value : b.undoSecondsLeft.value);
    function z(Q) {
      s.mobileTab = Q, Q === "list" && r(!1), Q === "text" && Ct(() => {
        var C;
        return (C = k.value) == null ? void 0 : C.focusTitle();
      }), n();
    }
    function A(Q) {
      s.composeMode = Q, s.createError = "", Q === "text" && Ct(() => {
        var C;
        return (C = k.value) == null ? void 0 : C.focusTitle();
      }), n();
    }
    function $() {
      s.voiceCreateSuccess ? f.dismissSuccess() : b.reset();
    }
    function B() {
      s.voiceCreateSuccess ? f.undo() : b.undo();
    }
    const me = /* @__PURE__ */ F(!1), de = /* @__PURE__ */ F("comment"), L = /* @__PURE__ */ F(null);
    function M(Q, C) {
      de.value = Q, L.value = C, me.value = !0, Z(3);
    }
    async function T(Q, C) {
      if (Q !== "none") {
        if (Q === "mark_viewed") {
          s.itemViews[C.number] = Date.now(), n();
          return;
        }
        if (Q === "comment" || Q === "create_linked_item") {
          M(Q, C);
          return;
        }
        try {
          await c(C.number, Q, "issue"), await r(!0);
        } catch (q) {
          console.warn("Action failed", q);
        }
      }
    }
    function ce(Q) {
      p.openIssue(Q, !0), Z(2);
    }
    function he(Q) {
      p.openIssue(Q), Z(2);
    }
    function j() {
      p.openFilter(), Z(2);
    }
    async function ve() {
      await r(!0);
    }
    function je() {
      l() && (g.open(), Z(1));
    }
    function pe() {
      r(!0);
    }
    function J(Q = !1) {
      var C;
      if (me.value = !1, p.close(), g.close(), !Q) {
        const q = ((C = window.history.state) == null ? void 0 : C.widgetDepth) || 0;
        q > 0 && history.go(-q);
      }
    }
    function Z(Q) {
      var q;
      (((q = window.history.state) == null ? void 0 : q.widgetDepth) || 0) < Q && history.pushState({ widgetDepth: Q }, "");
    }
    function Ue(Q) {
      var q;
      Q === 3 ? me.value = !1 : Q === 2 ? p.close() : Q === 1 && J(!1);
      const C = ((q = window.history.state) == null ? void 0 : q.widgetDepth) || 0;
      C >= Q && history.go(-(C - Q + 1));
    }
    function Tt() {
      window.addEventListener("popstate", Ke);
    }
    function Ke(Q) {
      var q;
      const C = ((q = window.history.state) == null ? void 0 : q.widgetDepth) || 0;
      C < 3 && me.value && (me.value = !1), C < 2 && p.sheetOpen.value && p.close(), C < 1 && g.isOpen.value && g.close();
    }
    Pn(() => {
      b.stopUndoCountdown(), f.stopUndoCountdown(), f.stopVoiceTimer(), window.removeEventListener("popstate", Ke);
    }), Tt();
    function Oe(Q) {
      if (!l()) return;
      const C = typeof Q == "string" ? parseInt(Q, 10) : Q;
      g.isOpen.value || (g.open(), Z(1)), z("list");
      const q = s.issues.find((We) => We.number === C);
      q ? he(q) : r(!0).then(() => {
        const We = s.issues.find((zt) => zt.number === C);
        We && he(We);
      });
    }
    return t({ openItem: Oe }), (Q, C) => (P(), R(se, null, [
      Le(u("button", {
        id: "cfw-mobile-launcher",
        type: "button",
        "aria-label": "Open feedback widget",
        class: H({ "panel-left": h(s).handedness === "left" }),
        onTouchstartPassive: C[0] || (C[0] = //@ts-ignore
        (...q) => h(g).onTouchStart && h(g).onTouchStart(...q)),
        onTouchend: C[1] || (C[1] = //@ts-ignore
        (...q) => h(g).onTouchEnd && h(g).onTouchEnd(...q)),
        onClick: C[2] || (C[2] = (q) => je())
      }, [...C[22] || (C[22] = [
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
        [sn, !h(g).isOpen.value]
      ]),
      u("div", {
        id: "cfw-swipe-hint",
        class: H({ visible: h(g).swipeHintVisible.value }),
        style: Dt(h(g).swipeHintStyle.value)
      }, "← swipe →", 6),
      Le(u("div", {
        id: "cfw-desktop-backdrop",
        onClick: C[3] || (C[3] = (q) => J(!1))
      }, null, 512), [
        [sn, h(g).isOpen.value]
      ]),
      Le(u("div", {
        id: "cfw-mobile",
        class: H({ "panel-left": h(s).handedness === "left" }),
        style: Dt(d.value),
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
            w.value ? te("", !0) : (P(), R("div", {
              key: 0,
              class: "cfw-panel-handle",
              onTouchstartPassive: C[4] || (C[4] = //@ts-ignore
              (...q) => h(o) && h(o)(...q)),
              onTouchend: C[5] || (C[5] = //@ts-ignore
              (...q) => h(i) && h(i)(...q))
            }, [...C[23] || (C[23] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)),
            u("div", Tf, [
              w.value ? te("", !0) : (P(), R("div", zf, [
                u("button", {
                  type: "button",
                  class: H(["cfw-compose-mode-btn", { active: h(s).composeMode === "text" }]),
                  onClick: C[6] || (C[6] = (q) => A("text"))
                }, "Text", 2),
                u("button", {
                  type: "button",
                  class: H(["cfw-compose-mode-btn", { active: h(s).composeMode === "voice" }]),
                  onClick: C[7] || (C[7] = (q) => A("voice"))
                }, "Voice", 2)
              ])),
              w.value ? (P(), R("div", {
                key: 1,
                id: "cfw-mv-compose-success",
                class: "cfw-m-success",
                onClick: C[9] || (C[9] = (q) => $())
              }, [
                C[24] || (C[24] = u("div", { class: "cfw-m-success-ring" }, [
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
                u("div", $f, N(U.value), 1),
                G.value > 0 && h(s).lastSubmissionId ? (P(), R("button", {
                  key: 0,
                  id: "cfw-mv-compose-undo",
                  class: "cfw-m-undo-btn",
                  onClick: C[8] || (C[8] = bt((q) => B(), ["stop"]))
                }, "Undo (" + N(G.value) + ")", 1)) : te("", !0)
              ])) : h(s).composeMode === "text" ? (P(), R("div", Mf, [
                ke(Rc, {
                  ref_key: "textFormRef",
                  ref: k,
                  mobile: !0,
                  "title-id": "cfw-m-title",
                  "desc-id": "cfw-m-description",
                  onCreate: h(b).submit
                }, null, 8, ["onCreate"])
              ])) : (P(), ls(kf, {
                key: 3,
                mobile: !0,
                onToggleRecording: h(f).toggleRecording,
                onReset: h(f).reset,
                onSend: h(f).submit
              }, null, 8, ["onToggleRecording", "onReset", "onSend"]))
            ]),
            h(s).panelSnap === "middle" && !w.value ? (P(), R("div", {
              key: 1,
              class: "cfw-panel-handle cfw-panel-handle-bottom",
              onTouchstartPassive: C[10] || (C[10] = //@ts-ignore
              (...q) => h(o) && h(o)(...q)),
              onTouchend: C[11] || (C[11] = //@ts-ignore
              (...q) => h(i) && h(i)(...q))
            }, [...C[25] || (C[25] = [
              u("div", { class: "cfw-panel-handle-bar" }, null, -1)
            ])], 32)) : te("", !0)
          ], 2),
          ke(Zc, {
            onRefresh: C[12] || (C[12] = (q) => h(r)(!0)),
            onOpenIssue: he,
            onOpenFilter: j,
            onSwipeAction: T
          }),
          ke(lf, {
            onHandedness: h(g).applyHandedness,
            onTokenChanged: pe
          }, null, 8, ["onHandedness"])
        ], 2),
        u("nav", Ef, [
          h(s).handedness === "left" ? (P(), R("button", {
            key: 0,
            class: "cfw-nav-btn",
            type: "button",
            onClick: C[13] || (C[13] = (q) => J(!1))
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
                d: "M19 12H5M12 5l-7 7 7 7"
              })
            ], -1),
            u("span", null, "Close", -1)
          ])])) : te("", !0),
          u("button", {
            id: "cfw-nav-text",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "text" }]),
            type: "button",
            onClick: C[14] || (C[14] = (q) => z("text"))
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
                d: "M16.862 3.487a2.1 2.1 0 112.97 2.971L8.35 17.94 4 19l1.06-4.35L16.862 3.487z"
              })
            ], -1),
            u("span", null, "Compose", -1)
          ])], 2),
          u("button", {
            id: "cfw-nav-list",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "list" }]),
            type: "button",
            onClick: C[15] || (C[15] = (q) => z("list"))
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
                d: "M4 6h16M4 12h16M4 18h16"
              })
            ], -1),
            u("span", null, "Activity", -1)
          ])], 2),
          u("button", {
            id: "cfw-nav-settings",
            class: H(["cfw-nav-btn", { active: h(s).mobileTab === "settings" }]),
            type: "button",
            onClick: C[16] || (C[16] = (q) => z("settings"))
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
          h(s).handedness !== "left" ? (P(), R("button", {
            key: 1,
            class: "cfw-nav-btn",
            type: "button",
            onClick: C[17] || (C[17] = (q) => J(!1))
          }, [...C[30] || (C[30] = [
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
          ])])) : te("", !0)
        ])
      ], 14, Cf), [
        [sn, h(g).isOpen.value]
      ]),
      ke(Va, {
        open: h(p).sheetOpen.value,
        issue: h(p).sheetIssue.value,
        "filter-mode": h(p).filterMode.value,
        "edit-mode": h(p).editMode.value,
        onActionDone: ve,
        onClose: C[18] || (C[18] = (q) => Ue(2)),
        onCancelEdit: C[19] || (C[19] = (q) => h(p).editMode.value = !1),
        onFilterChanged: C[20] || (C[20] = (q) => h(r)(!0)),
        onComposeSheet: M,
        onEditIssue: ce
      }, null, 8, ["open", "issue", "filter-mode", "edit-mode"]),
      ke(wf, {
        open: me.value,
        mode: de.value,
        issue: L.value,
        onClose: C[21] || (C[21] = (q) => Ue(3)),
        onActionDone: ve
      }, null, 8, ["open", "mode", "issue"])
    ], 64));
  }
}), Af = /* @__PURE__ */ tt({
  __name: "FeedbackWidget.ce",
  props: {
    widgetConfig: { type: Object }
  },
  setup(e, { expose: t }) {
    const s = e, n = Ee(), { restore: o } = He(), { readToken: i } = Vi(), r = /* @__PURE__ */ F(null);
    return t({
      openItem(l) {
        r.value && r.value.openItem(l);
      }
    }), Hs(() => {
      s.widgetConfig && (n.init(s.widgetConfig), o(), i());
    }), (l, c) => (P(), ls(Pf, {
      ref_key: "mobileWidgetRef",
      ref: r
    }, null, 512));
  }
}), If = "*{box-sizing:border-box}:host{all:initial;font-family:IBM Plex Sans,Segoe UI,sans-serif}#cfw-mobile{font-size:15px}#cfw-mobile[data-font-size=small]{font-size:13px}#cfw-mobile[data-font-size=large]{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-nav-btn{font-size:9px}#cfw-mobile[data-font-size=large] .cfw-nav-btn{font-size:12px}#cfw-mobile[data-font-size=small] #cfw-ml-head-title{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-title{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-head-actions button{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-head-actions button{font-size:14px}#cfw-mobile[data-font-size=small] #cfw-ml-ptr{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-ml-ptr{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-ml-empty{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-empty{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-row-bg{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-ml-row-bg{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-ml-section-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-section-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-status{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-status{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-comments{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-comments{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-time{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-ml-row-time{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-ml-row-title{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-ml-row-title{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-ml-row-menu{font-size:16px}#cfw-mobile[data-font-size=large] .cfw-ml-row-menu{font-size:22px}#cfw-mobile[data-font-size=small] .cfw-desktop-menu button{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-desktop-menu button{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-compose-mode-btn{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-compose-mode-btn{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf input{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf input{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf textarea{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-mf textarea{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-mf-policy label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-mf-policy label{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-mf-error{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-mf-error{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-mf-actions button{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-mf-actions button{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-success-hint{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-success-hint{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-undo-btn{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-undo-btn{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-vstatus-line{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vstatus-line{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vmeta{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-vmeta{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-vcontrols button{font-size:13px}#cfw-mobile[data-font-size=large] .cfw-m-vcontrols button{font-size:18px}#cfw-mobile[data-font-size=small] .cfw-m-vhint{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-vhint{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-verror{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-verror{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-settings h3{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings h3{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings-btn{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-settings-note{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-note{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings-token{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-settings-token{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-settings select{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-settings select{font-size:17px}#cfw-mobile[data-font-size=small] .cfw-m-hand-btn{font-size:12px}#cfw-mobile[data-font-size=large] .cfw-m-hand-btn{font-size:17px}#cfw-mobile[data-font-size=small] #cfw-swipe-hint{font-size:10px}#cfw-mobile[data-font-size=large] #cfw-swipe-hint{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-label{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-label{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-fs-pill{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-fs-pill{font-size:14px}#cfw-mobile[data-font-size=small] .cfw-m-swipe-row label{font-size:11px}#cfw-mobile[data-font-size=large] .cfw-m-swipe-row label{font-size:16px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-ref h4{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-ref h4{font-size:13px}#cfw-mobile[data-font-size=small] .cfw-m-gesture-row{font-size:10px}#cfw-mobile[data-font-size=large] .cfw-m-gesture-row{font-size:14px}:root{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 14px;--cfw-density-nav-h: 56px}#cfw-mobile[data-density=compact]{--cfw-density-row-pad: 10px;--cfw-density-body-pad: 10px;--cfw-density-gap: 10px;--cfw-density-nav-h: 48px}#cfw-mobile[data-density=compact] .cfw-ml-row{padding-top:10px;padding-bottom:10px}#cfw-mobile[data-density=compact] .cfw-tab-body{padding:10px}#cfw-mobile[data-density=compact] .cfw-m-settings{gap:10px;padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=compact] .cfw-mf{padding:10px;gap:8px}#cfw-mobile[data-density=compact] #cfw-mobile-nav{height:48px}#cfw-mobile[data-density=compact] .cfw-m-voice{padding:10px;gap:10px}#cfw-mobile[data-density=compact] .cfw-m-swipe-settings{gap:8px}#cfw-mobile[data-density=compact] .cfw-compose-mode-toggle{padding-top:10px}#cfw-mobile[data-density=comfortable]{--cfw-density-row-pad: 14px;--cfw-density-body-pad: 14px;--cfw-density-gap: 18px;--cfw-density-nav-h: 60px}#cfw-mobile[data-density=comfortable] .cfw-ml-row{padding-top:14px;padding-bottom:14px}#cfw-mobile[data-density=comfortable] .cfw-tab-body{padding:14px}#cfw-mobile[data-density=comfortable] .cfw-m-settings{gap:18px;padding-top:20px;padding-bottom:20px}#cfw-mobile[data-density=comfortable] .cfw-mf{padding:14px;gap:14px}#cfw-mobile[data-density=comfortable] #cfw-mobile-nav{height:60px}#cfw-mobile[data-density=comfortable] .cfw-m-voice{padding:14px;gap:16px}#cfw-mobile[data-density=comfortable] .cfw-m-swipe-settings{gap:14px}#cfw-mobile[data-density=comfortable] .cfw-compose-mode-toggle{padding-top:14px}.cfw-tab-body::-webkit-scrollbar{width:6px}.cfw-tab-body::-webkit-scrollbar-track{background:transparent}.cfw-tab-body::-webkit-scrollbar-thumb{background:var(--cfw-accent-dim, #2f4864);border-radius:3px}.cfw-tab-body::-webkit-scrollbar-thumb:hover{background:var(--cfw-accent, #7cc4ff)}.cfw-tab-body{scrollbar-width:thin;scrollbar-color:var(--cfw-accent-dim, #2f4864) transparent}#cfw-mobile[data-theme=ocean]{--cfw-accent: #7cc4ff;--cfw-accent-soft: #9ad2ff;--cfw-accent-dim: #2f4864;--cfw-accent-bg: rgba(124, 187, 255, .1)}#cfw-mobile[data-theme=forest]{--cfw-accent: #6ee7b7;--cfw-accent-soft: #a7f3d0;--cfw-accent-dim: #2d4a3e;--cfw-accent-bg: rgba(110, 231, 183, .1)}#cfw-mobile[data-theme=forest] #cfw-mobile-launcher{color:#6ee7b7;border-color:#6ee7b766}#cfw-mobile[data-theme=forest] #cfw-nav-text.active,#cfw-mobile[data-theme=forest] #cfw-nav-list.active,#cfw-mobile[data-theme=forest] #cfw-nav-settings.active,#cfw-mobile[data-theme=forest] .cfw-nav-btn.active,#cfw-mobile[data-theme=forest] #cfw-ml-head-title,#cfw-mobile[data-theme=forest] .cfw-ml-section-label,#cfw-mobile[data-theme=forest] .cfw-ml-row-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-panel-handle-bar{background:#2d4a3e}#cfw-mobile[data-theme=forest] .cfw-m-settings h3{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=forest] .cfw-compose-mode-btn.active{border-color:#6ee7b78c;color:#d9e7f7}#cfw-mobile[data-theme=forest] .cfw-m-success-ring{border-color:#6ee7b759;background:#6ee7b71f}#cfw-mobile[data-theme=forest] .cfw-fs-label,#cfw-mobile[data-theme=forest] .cfw-is-status{color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-badge{background:#6ee7b726;border-color:#6ee7b74d;color:#6ee7b7}#cfw-mobile[data-theme=forest] .cfw-is-section-label,#cfw-mobile[data-theme=forest] .cfw-m-gesture-ref h4{color:#6ee7b7}#cfw-mobile[data-theme=berry]{--cfw-accent: #c4b5fd;--cfw-accent-soft: #ddd6fe;--cfw-accent-dim: #4c4568;--cfw-accent-bg: rgba(196, 181, 253, .1)}#cfw-mobile[data-theme=berry] #cfw-mobile-launcher{color:#c4b5fd;border-color:#c4b5fd66}#cfw-mobile[data-theme=berry] #cfw-nav-text.active,#cfw-mobile[data-theme=berry] #cfw-nav-list.active,#cfw-mobile[data-theme=berry] #cfw-nav-settings.active,#cfw-mobile[data-theme=berry] .cfw-nav-btn.active,#cfw-mobile[data-theme=berry] #cfw-ml-head-title,#cfw-mobile[data-theme=berry] .cfw-ml-section-label,#cfw-mobile[data-theme=berry] .cfw-ml-row-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-panel-handle-bar{background:#4c4568}#cfw-mobile[data-theme=berry] .cfw-m-settings h3{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=berry] .cfw-compose-mode-btn.active{border-color:#c4b5fd8c;color:#d9e7f7}#cfw-mobile[data-theme=berry] .cfw-m-success-ring{border-color:#c4b5fd59;background:#c4b5fd1f}#cfw-mobile[data-theme=berry] .cfw-fs-label,#cfw-mobile[data-theme=berry] .cfw-is-status{color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-badge{background:#c4b5fd26;border-color:#c4b5fd4d;color:#c4b5fd}#cfw-mobile[data-theme=berry] .cfw-is-section-label,#cfw-mobile[data-theme=berry] .cfw-m-gesture-ref h4{color:#c4b5fd}#cfw-mobile[data-theme=sunset]{--cfw-accent: #fdba74;--cfw-accent-soft: #fed7aa;--cfw-accent-dim: #5c4538;--cfw-accent-bg: rgba(253, 186, 116, .1)}#cfw-mobile[data-theme=sunset] #cfw-mobile-launcher{color:#fdba74;border-color:#fdba7466}#cfw-mobile[data-theme=sunset] #cfw-nav-text.active,#cfw-mobile[data-theme=sunset] #cfw-nav-list.active,#cfw-mobile[data-theme=sunset] #cfw-nav-settings.active,#cfw-mobile[data-theme=sunset] .cfw-nav-btn.active,#cfw-mobile[data-theme=sunset] #cfw-ml-head-title,#cfw-mobile[data-theme=sunset] .cfw-ml-section-label,#cfw-mobile[data-theme=sunset] .cfw-ml-row-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-panel-handle-bar{background:#5c4538}#cfw-mobile[data-theme=sunset] .cfw-m-settings h3{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-m-hand-btn.active,#cfw-mobile[data-theme=sunset] .cfw-compose-mode-btn.active{border-color:#fdba748c;color:#d9e7f7}#cfw-mobile[data-theme=sunset] .cfw-m-success-ring{border-color:#fdba7459;background:#fdba741f}#cfw-mobile[data-theme=sunset] .cfw-fs-label,#cfw-mobile[data-theme=sunset] .cfw-is-status{color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-badge{background:#fdba7426;border-color:#fdbafd4d;color:#fdba74}#cfw-mobile[data-theme=sunset] .cfw-is-section-label,#cfw-mobile[data-theme=sunset] .cfw-m-gesture-ref h4{color:#fdba74}#cfw-desktop-backdrop{display:none}#cfw-mobile{position:fixed;top:0;right:0;bottom:0;left:0;z-index:9999;display:flex;flex-direction:column;overflow:hidden;background:#0a111d;color:#d9e7f7;font-family:IBM Plex Sans,Segoe UI,sans-serif}.cfw-panel-handle{height:28px;flex-shrink:0;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none}.cfw-panel-handle-bar{width:36px;height:4px;background:#2f4864;border-radius:2px}.cfw-panel-handle-bottom{margin-top:auto}.cfw-panel-handle-bottom .cfw-panel-handle-bar{opacity:.7}#cfw-mobile-launcher{display:flex;position:fixed;bottom:20px;right:10px;width:34px;height:34px;border-radius:6px;background:#0a111df2;border:1px solid rgba(124,187,255,.4);color:#9ad2ff;align-items:center;justify-content:center;cursor:pointer;z-index:9998;box-shadow:0 8px 20px #02070e59;-webkit-tap-highlight-color:transparent}#cfw-mobile-launcher.panel-left{left:10px;right:auto}#cfw-mobile-launcher svg{width:14px;height:14px}#cfw-mobile-body{flex:1;overflow:hidden;position:relative}.cfw-mv{position:absolute;top:0;right:0;bottom:0;left:0;display:none;flex-direction:column;overflow:hidden}.cfw-mv.active{display:flex}.cfw-tab-body{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain}#cfw-mobile-body.snap-bottom .cfw-mv{justify-content:flex-end}#cfw-mobile-body.snap-bottom .cfw-tab-body{flex:0 0 auto;max-height:100%}#cfw-mobile-body.snap-top .cfw-tab-body{order:0;flex:0 0 auto;max-height:calc(100% - 28px)}#cfw-mobile-body.snap-top .cfw-panel-handle{order:1}#cfw-mobile-body.snap-middle .cfw-mv{justify-content:center}#cfw-mobile-body.snap-middle .cfw-tab-body{flex:0 0 auto;max-height:calc(100% - 56px)}#cfw-mobile-body.snap-middle .cfw-panel-handle-bottom{flex-shrink:0}#cfw-mobile-nav{height:56px;display:flex;border-top:1px solid rgba(124,187,255,.18);background:#0a111dfa;flex-shrink:0}.cfw-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;background:none;border:none;color:#7f9cbc;cursor:pointer;font-size:10px;padding:0;-webkit-tap-highlight-color:transparent;transition:color .15s,background .15s}.cfw-nav-btn:hover{color:#d9e7f7;background:#7cbbff14}.cfw-nav-btn.active{color:#9ad2ff}.cfw-nav-btn.active:hover{color:#9ad2ff;background:#7cbbff1f}.cfw-nav-btn svg{width:20px;height:20px}#cfw-ml-head{padding:10px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(124,187,255,.18);flex-shrink:0}#cfw-ml-head-title{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}#cfw-ml-head-actions{display:flex;gap:8px}#cfw-ml-head-actions button{height:30px;padding:0 10px;border:1px solid #2f4864;border-radius:6px;background:#0d1727;color:#9bb7d3;font-size:12px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}#cfw-ml-head-actions button:hover:not(:disabled){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff14}#cfw-ml-head-actions button:disabled{opacity:.5}#cfw-ml-body{overflow-y:auto;overscroll-behavior-y:contain}#cfw-ml-ptr{height:0;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;color:#9ad2ff;transition:height .15s ease;flex-shrink:0}#cfw-ml-ptr.cfw-ml-ptr-active{height:36px}.cfw-ml-empty{padding:32px 14px;font-size:13px;color:#7f9cbc;text-align:center;line-height:1.6}.cfw-ml-row-wrap{position:relative;border-bottom:1px solid #1a2d42}.cfw-ml-row-wrap.menu-open{z-index:50}.cfw-ml-row-bg{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:space-between;padding:0 20px;font-size:13px;font-weight:600;color:#fff;opacity:0;transition:opacity .2s}.cfw-ml-row-bg.bg-left{background:#eab308;opacity:1;justify-content:flex-start}.cfw-ml-row-bg.bg-right{background:#3b82f6;opacity:1;justify-content:flex-end}.cfw-swipe-preview{display:flex;align-items:center;gap:8px}.cfw-swipe-preview.preview-left{flex-direction:row-reverse}.cfw-ml-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin:12px 20px 4px;font-weight:600}.cfw-ml-row{position:relative;padding:14px 20px;background:#0a111d;cursor:pointer;display:flex;justify-content:space-between;align-items:flex-start;gap:12px;-webkit-tap-highlight-color:transparent}.cfw-ml-row.menu-open{z-index:50}.cfw-ml-row:active{background:#7cbbff0f}.cfw-ml-row-main{flex:1;min-width:0}.cfw-ml-row-header{display:flex;align-items:center;gap:8px;margin-bottom:6px}.cfw-ml-row-status{font-size:11px;color:#7cc4ff;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-ml-row-comments{font-size:11px;color:#7f9cbc}.cfw-ml-unread-dot{width:6px;height:6px;border-radius:50%;background:#ef4444}.cfw-ml-row-time{font-size:11px;color:#7f9cbc;margin-left:auto}.cfw-ml-row-title{font-size:14px;color:#d9e7f7;line-height:1.4;word-break:break-word}.cfw-ml-row-menu{background:none;border:none;color:#7f9cbc;font-size:18px;line-height:1;padding:4px 8px;cursor:pointer;margin-top:-2px;border-radius:4px;transition:color .15s,background .15s}.cfw-ml-row-menu:hover{color:#d9e7f7;background:#7cbbff1a}.cfw-desktop-menu{position:absolute;right:20px;top:36px;background:#0d1727;border:1px solid rgba(124,187,255,.28);border-radius:8px;padding:6px;display:flex;flex-direction:column;z-index:100;box-shadow:0 4px 12px #00000080}.cfw-desktop-menu button{background:none;border:none;color:#d9e7f7;padding:8px 12px;text-align:left;font-size:13px;cursor:pointer;border-radius:4px;white-space:nowrap;transition:color .15s,background .15s}.cfw-desktop-menu button:hover{background:#7cbbff26;color:#fff}#cfw-ml-error{margin:8px 14px 0}#cfw-mbs-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10001;display:none}#cfw-mbs-overlay.active{display:block}#cfw-mbs{position:fixed;bottom:0;left:0;right:0;z-index:10002;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 36px;max-height:82vh;overflow-y:auto;transform:translateY(100%);transition:transform .25s ease}#cfw-mbs.active{transform:translateY(0)}#cfw-mbs-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px}.cfw-mf{display:flex;flex-direction:column;padding:14px}.cfw-compose-mode-toggle{display:flex;gap:8px;padding:14px 14px 0;flex-shrink:0}.cfw-compose-mode-btn{flex:1;height:36px;border-radius:999px;border:1px solid #2f4864;background:#0d1727;color:#9bb7d3;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-compose-mode-btn:hover:not(.active){border-color:#7cbbff66;color:#d9e7f7}.cfw-compose-mode-btn.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f2035}.cfw-mf input,.cfw-mf textarea,.cfw-mf select{width:100%;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;box-sizing:border-box;font-family:inherit}.cfw-mf input{height:44px;padding:0 14px;margin-bottom:10px;font-size:15px;flex-shrink:0}.cfw-textarea-wrap{margin-bottom:10px}.cfw-mf textarea{width:100%;height:130px;min-height:130px;max-height:40vh;padding:12px 14px;font-size:15px;resize:none;overflow-y:hidden;margin-bottom:0}.cfw-mf input::placeholder,.cfw-mf textarea::placeholder{color:#7f9cbc}.cfw-mf input:focus,.cfw-mf textarea:focus{outline:none;border-color:#4f7298}.cfw-mf-policy{display:flex;flex-direction:column;gap:6px;margin-bottom:10px;flex-shrink:0}.cfw-mf-policy label{font-size:12px;color:#9bb7d3}.cfw-mf-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:8px;flex-shrink:0}.cfw-mf-error.active{display:block}.cfw-mf-actions{display:flex;gap:8px;flex-shrink:0}.cfw-mf-actions button{flex:1;height:48px;border-radius:8px;border:1px solid;font-size:14px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-mf-actions button:hover{filter:brightness(1.1)}.cfw-mf-actions button:active{transform:scale(.98)}.cfw-m-success{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.cfw-m-success-ring{width:80px;height:80px;border-radius:50%;background:#4ade801f;border:2px solid rgba(74,222,128,.35);display:flex;align-items:center;justify-content:center;margin-bottom:18px}.cfw-m-success-ring svg{width:44px;height:44px;color:#4ade80}.cfw-m-success-hint{font-size:13px;color:#7f9cbc}.cfw-m-undo-btn{margin-top:14px;padding:7px 18px;border-radius:8px;border:1px solid rgba(124,187,255,.35);background:transparent;color:#d9e7f7;font-size:12px;cursor:pointer}.cfw-m-undo-btn:hover{background:#7cbbff14}.cfw-m-voice{display:flex;flex-direction:column;justify-content:flex-end;padding:14px;gap:14px}.cfw-m-vstatus{border:1px solid #2f4864;border-radius:12px;padding:16px;background:#0b1828a6;flex-shrink:0}.cfw-m-vstatus-line{font-size:15px;color:#d9e7f7;margin-bottom:8px}.cfw-m-vmeta{display:flex;justify-content:space-between;font-size:13px;color:#9bb7d3}.cfw-m-vcontrols{display:flex;gap:10px;flex-shrink:0}.cfw-m-vcontrols button{flex:1;height:52px;border-radius:10px;border:1px solid;font-size:15px;cursor:pointer;transition:background .15s,border-color .15s,transform .1s}.cfw-m-vcontrols .cfw-btn-record{background:#dc2626;border-color:#dc2626;color:#fff}.cfw-m-vcontrols .cfw-btn-record:hover:not(:disabled){background:#ef4444;border-color:#ef4444}.cfw-m-vcontrols .cfw-btn-record:active:not(:disabled){background:#b91d1d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send{background:#16a34a;border-color:#16a34a;color:#fff}.cfw-m-vcontrols .cfw-btn-send:hover:not(:disabled){background:#22c55e;border-color:#22c55e}.cfw-m-vcontrols .cfw-btn-send:active:not(:disabled){background:#15803d;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-send:disabled{background:#14532d;border-color:#14532d;color:#7f9cbc}.cfw-m-vcontrols .cfw-btn-reset{background:#d97706;border-color:#d97706;color:#fff}.cfw-m-vcontrols .cfw-btn-reset:hover:not(:disabled){background:#f59e0b;border-color:#f59e0b}.cfw-m-vcontrols .cfw-btn-reset:active:not(:disabled){background:#b45309;transform:scale(.98)}.cfw-m-vcontrols .cfw-btn-reset:disabled{background:#78350f;border-color:#78350f;color:#7f9cbc}.cfw-m-vhint{font-size:12px;color:#7f9cbc;flex-shrink:0}.cfw-m-verror{font-size:13px;color:#ff9a9a;display:none;flex-shrink:0}.cfw-m-verror.active{display:block}.cfw-m-settings{padding:20px 14px;display:flex;flex-direction:column;gap:14px;overflow-y:auto}.cfw-m-settings h3{margin:0;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;font-weight:600}.cfw-m-settings-btn{height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;width:100%;transition:border-color .15s,background .15s}.cfw-m-settings-btn:hover{border-color:#7cbbff80;background:#7cbbff14}.cfw-m-settings-btn:active{background:#0f1c2f}.cfw-m-settings-note{font-size:12px;color:#7f9cbc;margin:0}.cfw-m-settings-token{font-size:12px;color:#9bb7d3}.cfw-m-settings select{width:100%;height:44px;border:1px solid #2f4864;border-radius:8px;background:#0d1727;color:#e2f0ff;padding:0 12px;font-size:14px;font-family:inherit}.cfw-m-hand-toggle{display:flex;gap:8px}.cfw-m-hand-btn{flex:1;height:44px;border-radius:8px;border:1px solid rgba(124,187,255,.3);background:#0d1727;color:#9bb7d3;font-size:14px;cursor:pointer;transition:border-color .15s,color .15s,background .15s}.cfw-m-hand-btn:hover:not(.active){border-color:#7cbbff80;color:#d9e7f7;background:#7cbbff0d}.cfw-m-hand-btn.active{border-color:#9ad2ff;background:#0f2035;color:#9ad2ff;font-weight:600}#cfw-swipe-hint{display:block;position:fixed;bottom:62px;font-size:11px;color:#9ad2ff;background:#0a111deb;border:1px solid rgba(124,187,255,.3);border-radius:6px;padding:4px 8px;pointer-events:none;opacity:0;transition:opacity .4s;white-space:nowrap;z-index:9999}#cfw-swipe-hint.visible{opacity:1}.cfw-fs-section{margin-bottom:18px}.cfw-fs-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:8px}.cfw-fs-pills{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-pill{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:32px;padding:0 14px;font-size:12px;cursor:pointer}.cfw-fs-pill.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-fs-chips{display:flex;flex-wrap:wrap;gap:6px}.cfw-fs-chip{border:1px solid #2f4864;border-radius:999px;background:#0d1727;color:#9bb7d3;height:28px;padding:0 10px;font-size:11px;cursor:pointer}.cfw-fs-chip.active{border-color:#7cbbff8c;color:#d9e7f7;background:#0f1c2f}.cfw-is-num{font-size:11px;color:#7f9cbc;margin-bottom:6px;font-weight:500}.cfw-is-title{font-size:17px;color:#d9e7f7;margin-bottom:8px;word-break:break-word;text-decoration:none;display:block;line-height:1.3;font-weight:600}.cfw-is-title:hover{color:#9ad2ff;text-decoration:underline}.cfw-is-status{font-size:12px;color:#7cc4ff;margin-bottom:2px;text-transform:uppercase;font-weight:600;letter-spacing:.05em}.cfw-is-section{margin-bottom:24px}.cfw-is-section-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#7cc4ff;margin-bottom:12px;font-weight:600}.cfw-is-badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px}.cfw-badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#7cbbff26;border:1px solid rgba(124,187,255,.3);color:#9ad2ff;font-size:12px;font-weight:500}.cfw-is-primary-box{margin-bottom:24px}.cfw-is-action-row{display:flex;gap:8px}.cfw-is-w100{width:100%}.cfw-comments-section{border-top:1px solid rgba(124,187,255,.15);padding-top:20px}.cfw-comment{margin-bottom:16px;padding:12px;border-radius:8px;background:#7cbbff0a;border:1px solid rgba(124,187,255,.1)}.cfw-comment-newest{background:#7cbbff14;border-color:#7cbbff33}.cfw-comment-meta{font-size:12px;color:#7f9cbc;margin-bottom:6px}.cfw-comment-meta strong{color:#9bb7d3;font-weight:600}.cfw-comment-body{font-size:14px;color:#d9e7f7;line-height:1.5;white-space:pre-wrap;word-break:break-word}.cfw-comments-expand{width:100%;padding:8px;background:none;border:1px dashed rgba(124,187,255,.3);border-radius:6px;color:#9bb7d3;font-size:13px;cursor:pointer;margin-bottom:16px}.cfw-comments-expand:hover{background:#7cbbff0d;border-color:#7cbbff80;color:#d9e7f7}.cfw-is-actions{display:flex;flex-direction:column;gap:8px}.cfw-is-action-btn{width:100%;height:48px;border-radius:8px;border:1px solid rgba(124,187,255,.4);background:#0d1727;color:#d9e7f7;font-size:14px;cursor:pointer;text-align:left;padding:0 14px}.cfw-is-action-btn:disabled{opacity:.5;cursor:not-allowed}.cfw-is-action-reason{font-size:11px;color:#7f9cbc;font-style:italic;display:block;padding:0 2px}.cfw-is-pr-link{color:#9ad2ff;text-decoration:underline;text-underline-offset:2px;font-size:13px}.cfw-is-error{font-size:13px;color:#ff9a9a;display:none;margin-bottom:10px}.cfw-is-error.active{display:block}.cfw-mbs-close{width:100%;height:48px;border-radius:8px;border:1px solid #2f4864;background:transparent;color:#9bb7d3;font-size:14px;cursor:pointer;margin-top:8px}@media(min-width:681px){#cfw-desktop-backdrop{display:block;position:fixed;top:0;right:0;bottom:0;left:0;z-index:9998;background:#02061773;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}#cfw-mobile{top:0!important;bottom:0!important;width:420px;height:100%;border-radius:0;border:1px solid rgba(124,187,255,.28);box-shadow:0 0 40px #02070e8c;left:auto;right:0;border-left:1px solid rgba(124,187,255,.28);transition:none!important}#cfw-mobile.panel-left{left:0;right:auto;border-left:none;border-right:1px solid rgba(124,187,255,.28)}.cfw-panel-handle{display:none}#cfw-mobile-launcher{right:20px}#cfw-mobile-launcher.panel-left{left:20px;right:auto}#cfw-mbs{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-mbs.panel-left{left:0;right:auto}#cfw-mbs-overlay{background:#0206174d}#cfw-swipe-hint{display:none!important}#cfw-compose-sheet{width:420px;border-radius:12px 12px 0 0;left:auto;right:0}#cfw-compose-sheet.panel-left{left:0;right:auto}#cfw-compose-overlay{background:#0206174d}}#cfw-compose-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background:#02061799;z-index:10005;display:none}#cfw-compose-overlay.active{display:block}#cfw-compose-sheet{position:fixed;bottom:0;left:0;right:0;z-index:10006;background:#0d1727;border-top:1px solid rgba(124,187,255,.28);border-radius:16px 16px 0 0;padding:0 14px 24px;max-height:85vh;transform:translateY(100%);transition:transform .25s ease;display:flex;flex-direction:column}#cfw-compose-sheet.active{transform:translateY(0)}#cfw-compose-handle{width:36px;height:4px;background:#2f4864;border-radius:2px;margin:12px auto 16px;flex-shrink:0}.cfw-compose-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-shrink:0}.cfw-compose-title{font-size:14px;font-weight:600;color:#d9e7f7}.cfw-compose-close{background:none;border:none;color:#7f9cbc;font-size:24px;cursor:pointer;line-height:1;padding:4px;margin:-4px}.cfw-compose-context{margin-bottom:16px;flex-shrink:0}.cfw-compose-context-quote{font-size:13px;color:#7f9cbc;border-left:2px solid #2f4864;padding-left:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.cfw-compose-body{flex:1;overflow-y:auto;display:flex;flex-direction:column}.cfw-m-swipe-settings{display:flex;flex-direction:column;gap:12px;margin-bottom:24px}.cfw-m-swipe-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.cfw-m-swipe-row label{font-size:13px;color:#d9e7f7;font-weight:500;flex-shrink:0}.cfw-m-swipe-row .cfw-select{flex:1;min-width:120px;max-width:200px}.cfw-m-gesture-ref{background:#7cbbff0d;border-radius:8px;padding:12px;margin-top:16px;border:1px dashed rgba(124,187,255,.2)}.cfw-m-gesture-ref h4{font-size:11px;text-transform:uppercase;color:#7cc4ff;margin:0 0 8px;font-weight:600;padding:0}.cfw-m-gesture-row{display:flex;justify-content:space-between;font-size:12px;color:#9bb7d3;margin-bottom:4px}.cfw-m-gesture-row:last-child{margin-bottom:0}", Rf = (e, t) => {
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
