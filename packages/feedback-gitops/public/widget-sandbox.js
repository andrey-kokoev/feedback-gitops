import { u as q, c as T, d as P, F as W } from "./FeedbackWidget.ce-CoXpwQTr.js";
function _() {
  const e = q();
  let n = 100;
  const o = new URLSearchParams(window.location.search).get("scenario") || "default";
  let s = [];
  o === "empty" ? s = [] : o === "comments" ? s = [
    { number: 4, title: "Item with 5+ comments", body: "Very active discussion.", state: "open", url: "https://github.com/mock/repo/issues/4", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual", commentCount: 6, comments: [{ id: "1", body: "C1", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "2", body: "C2", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "3", body: "C3", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "4", body: "C4", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "5", body: "C5", createdAt: (/* @__PURE__ */ new Date()).toISOString() }, { id: "6", body: "C6", createdAt: (/* @__PURE__ */ new Date()).toISOString() }] }
  ] : o === "linked" ? s = [
    { number: 5, title: "Linked Feature", body: "Originated elsewhere.", state: "open", url: "https://github.com/mock/repo/issues/5", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual", sourceIssue: { number: 42, title: "Epic parent", url: "https://github.com/mock/repo/issues/42" } }
  ] : o === "edit" ? s = [
    { number: 6, title: "Item ready for edit", body: "This item can be edited using the swipe or contextual menu.", state: "open", url: "https://github.com/mock/repo/issues/6", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual" }
  ] : o === "unread" ? s = [
    { number: 7, title: "Brand new unread item", body: "This item has just appeared.", state: "open", url: "https://github.com/mock/repo/issues/7", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual" }
  ] : s = [
    { number: 1, title: "Unread Feedback Item", body: "This is an item nobody has viewed yet.", state: "open", url: "https://github.com/mock/repo/issues/1", updatedAt: (/* @__PURE__ */ new Date()).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual" },
    { number: 2, title: "Pinned Bug Report", body: "This has been pinned by a maintainer.", state: "open", url: "https://github.com/mock/repo/issues/2", updatedAt: new Date(Date.now() - 36e5).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual", pinned: !0 },
    { number: 3, title: "Item with comments", body: "This has some comments.", state: "open", url: "https://github.com/mock/repo/issues/3", updatedAt: new Date(Date.now() - 864e5).toISOString(), labels: [], status: "new", statusDetail: "", pullRequest: null, issueActions: [], pullRequestActions: [], mergePolicy: "manual", commentCount: 3, comments: [{ id: "1", body: "First comment", createdAt: (/* @__PURE__ */ new Date()).toISOString() }] }
  ];
  const u = (t) => new Promise((i) => setTimeout(i, t));
  function g() {
    return e.config;
  }
  function b() {
    return !0;
  }
  function f() {
    return !0;
  }
  function w() {
    return "mock-token";
  }
  function h() {
    return "mock-token";
  }
  function y() {
  }
  function k() {
  }
  async function S(t = !1) {
    if (!(e.loadingIssues && !t)) {
      if (e.loadingIssues = !0, e.listError = "", o === "loading") {
        await u(1e5);
        return;
      }
      try {
        if (await u(500), o === "error") throw new Error("Simulated load error");
        e.issues = [...s], e.issuesLoaded = !0;
      } catch {
        e.listError = "Failed to load mock issues";
      } finally {
        e.loadingIssues = !1;
      }
    }
  }
  function l(t, i) {
    const c = document.querySelector("feedback-gitops-widget");
    c && c.dispatchEvent(new CustomEvent(`feedback:${t}`, { detail: i, bubbles: !0, composed: !0 }));
  }
  async function I(t, i, c) {
    await u(600);
    const a = `mock-sub-${n++}`;
    return l("item-action", { id: a, action: "create" }), { submissionId: a };
  }
  async function A(t, i, c) {
    return await u(800), { submissionId: `mock-sub-${n++}` };
  }
  async function E(t, i) {
    await u(400), l("item-action", { id: t, action: "comment" });
  }
  async function x(t, i, c, a) {
    await u(600);
    const r = `mock-sub-${n++}`;
    return l("item-action", { id: r, action: "create_linked_item" }), { submissionId: r };
  }
  async function C(t, i, c, a) {
    if (await u(400), i === "edit" && a) {
      const r = s.find((m) => m.number === t);
      r && (a.title && (r.title = a.title), a.body && (r.body = a.body));
    } else if (i === "done_archive") {
      const r = s.findIndex((m) => m.number === t);
      r !== -1 && s.splice(r, 1);
    }
    return l("item-action", { id: t, action: i }), {};
  }
  async function D(t) {
    await u(200);
  }
  function O(t) {
    return "Failed to apply mock action.";
  }
  function R(t) {
    return "https://github.com/mock/repo/issues/new";
  }
  return {
    getConfig: g,
    authorize: b,
    hasAccess: f,
    readToken: w,
    requireToken: h,
    promptToken: y,
    clearToken: k,
    loadIssues: S,
    submitText: I,
    submitVoice: A,
    submitComment: E,
    createLinkedItem: x,
    executeAction: C,
    cancelSubmission: D,
    mapActionError: O,
    getIssueUrlFromCreateResponse: R
  };
}
function F() {
  const e = window.__WIDGET_CONFIG__;
  if (!e) throw new Error("Missing widget dev config: window.__WIDGET_CONFIG__ is undefined");
  const n = (e.endpoint ?? "").replace(/\/+$/, "");
  function d(o) {
    return n.endsWith("/api/issue") ? n.slice(0, n.length - 10) + o : n + o.replace("/api", "");
  }
  return {
    endpoint: n || "/api/issue",
    issuesEndpoint: e.issuesEndpoint ?? d("/api/issues"),
    actionEndpoint: e.actionEndpoint ?? d("/api/action"),
    cancelEndpoint: e.cancelEndpoint ?? d("/api/cancel"),
    repo: e.repo ?? "",
    labels: e.labels ?? "",
    storageKey: e.storageKey ?? "thoughts"
  };
}
const v = T(), L = P(W, {
  configureApp(e) {
    e.use(v), e.provide("widget-adapter", _());
  }
});
customElements.get("feedback-gitops-widget") || customElements.define("feedback-gitops-widget", L);
function p() {
  if (console.log("[Widget Sandbox] Bootstrap started"), document.querySelector("feedback-gitops-widget")) {
    console.log("[Widget Sandbox] Element already exists");
    return;
  }
  try {
    const e = F();
    if (console.log("[Widget Sandbox] Config found:", e), !customElements.get("feedback-gitops-widget"))
      throw new Error("Custom element feedback-gitops-widget not defined");
    console.log("[Widget Sandbox] Custom element defined");
    const n = document.createElement("feedback-gitops-widget");
    n.widgetConfig = e, document.body.appendChild(n), console.log("[Widget Sandbox] Element appended to body");
  } catch (e) {
    console.error("[Widget Sandbox] Boot failure:", e);
    const n = document.createElement("div");
    n.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #fee2e2; border: 2px solid #ef4444; color: #991b1b; padding: 16px; border-radius: 8px; z-index: 99999; font-family: sans-serif;", n.innerHTML = `
      <h3 style="margin-top:0;margin-bottom:8px;">Widget failed to mount</h3>
      <p style="margin:0;font-size:14px;"><strong>Reason:</strong> ${e.message}</p>
      <p style="margin-top:8px;margin-bottom:0;font-size:14px;">Check browser console. Entry script did not bootstrap correctly.</p>
    `, document.body.appendChild(n);
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", p) : p();
