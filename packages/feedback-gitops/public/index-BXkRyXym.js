import { u as v } from "./FeedbackWidget.ce-Do9nZvQe.js";
function R() {
  const n = v();
  function k() {
    return n.config;
  }
  function m() {
    return n.config.storageKey + ":admin-token";
  }
  function d() {
    try {
      const e = localStorage.getItem(m()) ?? "";
      return n.adminToken = e, e || null;
    } catch {
      return null;
    }
  }
  function p(e) {
    try {
      e ? localStorage.setItem(m(), e) : localStorage.removeItem(m()), n.adminToken = e;
    } catch {
    }
  }
  function w() {
    const e = window.prompt("Enter admin token", d() || "");
    if (e === null) return;
    const t = e.trim();
    p(t);
  }
  function u() {
    const e = d();
    return e || (w(), d());
  }
  function E() {
    return !!u();
  }
  function b() {
    return !!n.adminToken;
  }
  function A() {
    p("");
  }
  function h(e) {
    return String(e ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  }
  function f(e, t) {
    const c = document.querySelector("feedback-gitops-widget");
    c && c.dispatchEvent(new CustomEvent(`feedback:${e}`, { detail: t, bubbles: !0, composed: !0 }));
  }
  async function l(e, t) {
    const c = (e.headers.get("content-type") ?? "").toLowerCase();
    let o = null, i = "";
    if (c.includes("application/json"))
      try {
        o = await e.json();
      } catch {
        throw new Error("Invalid JSON response from API.");
      }
    else
      try {
        i = await e.text();
      } catch {
        i = "";
      }
    if (!e.ok) {
      const s = o, a = s == null ? void 0 : s.error, g = a && typeof a.code == "string" ? a.code : "";
      if (g === "AGENT_WORKING") throw new Error("Copilot is still working on this draft pull request.");
      const y = (s == null ? void 0 : s.statusMessage) || (a == null ? void 0 : a.error) || h(i).slice(0, 180) || t;
      throw new Error(g ? `[${g}] ${y}` : y);
    }
    if (o !== null) return o;
    const r = i ? h(i).slice(0, 120) : "";
    throw new Error(
      "Unexpected non-JSON API response. Check widget endpoint configuration." + (r ? " Response preview: " + r : "")
    );
  }
  async function S(e = !1) {
    if (n.loadingIssues && !e) return;
    const t = d();
    if (!t) return;
    n.loadingIssues = !0, n.listError = "";
    const c = new AbortController(), o = window.setTimeout(() => c.abort(), 15e3);
    try {
      const i = new URLSearchParams();
      i.set("limit", "50"), i.set("view", n.listView), i.set("sort", n.listSort), n.listQuery && i.set("q", n.listQuery), n.listStatusFilter.length && i.set("status", n.listStatusFilter.join(","));
      const r = await fetch(`${n.config.issuesEndpoint}?${i}`, {
        method: "GET",
        headers: { "x-admin-token": t },
        signal: c.signal
      }), s = await l(r, "Failed to load issues");
      n.issues = Array.isArray(s == null ? void 0 : s.issues) ? s.issues : [], n.issuesLoaded = !0;
    } catch (i) {
      n.listError = i instanceof Error ? i.message : "Failed to load issues";
    } finally {
      window.clearTimeout(o), n.loadingIssues = !1;
    }
  }
  async function T(e, t, c) {
    const o = u();
    if (!o) throw new Error("Admin token required");
    const i = n.draftMergePolicy, r = c ? ["agent-execute"] : [], s = await fetch(n.config.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-token": o },
      body: JSON.stringify({
        title: e,
        description: t,
        url: window.location.href,
        userAgent: navigator.userAgent,
        labels: r,
        mergePolicy: i === "auto_unblocked" ? "auto_unblocked" : void 0,
        execute: c
      })
    }), a = await l(s, "Failed to create request");
    return f("item-action", { id: a.submissionId, action: "create" }), a;
  }
  async function O(e, t, c) {
    const o = u();
    if (!o) throw new Error("Admin token required");
    const i = t.includes("mp4") ? "m4a" : "webm", r = new FormData();
    r.append("audio", e, `voice-request.${i}`), r.append("mimeType", t || "audio/webm"), r.append("durationMs", String(c)), r.append("url", window.location.href), r.append("userAgent", navigator.userAgent), r.append("mergePolicy", n.draftMergePolicy);
    const s = await fetch(n.config.endpoint, {
      method: "POST",
      headers: { "x-admin-token": o },
      body: r
    });
    return l(s, "Failed to submit voice request");
  }
  async function I(e, t) {
    const c = u();
    if (!c) throw new Error("Admin token required");
    const o = await fetch(n.config.actionEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-token": c },
      body: JSON.stringify({ issueNumber: e, target: "issue", action: "comment", body: t })
    });
    await l(o, "Failed to submit comment"), f("item-action", { id: e, action: "comment" });
  }
  async function x(e, t, c, o) {
    const i = u();
    if (!i) throw new Error("Admin token required");
    const r = await fetch(n.config.endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-token": i },
      body: JSON.stringify({
        title: t,
        description: c,
        sourceIssueNumber: e,
        url: window.location.href,
        userAgent: navigator.userAgent,
        labels: o ? ["agent-execute"] : [],
        execute: o
      })
    }), s = await l(r, "Failed to create linked item");
    return f("item-action", { id: s.submissionId, action: "create_linked_item" }), s;
  }
  async function P(e, t, c = "issue", o) {
    const i = u();
    if (!i) throw new Error("Admin token required");
    const r = { issueNumber: e, target: c, action: t };
    (o == null ? void 0 : o.title) !== void 0 && (r.title = o.title), (o == null ? void 0 : o.body) !== void 0 && (r.body = o.body);
    const s = await fetch(n.config.actionEndpoint, {
      method: "POST",
      headers: { "content-type": "application/json", "x-admin-token": i },
      body: JSON.stringify(r)
    }), a = await l(s, "Failed to apply action");
    return f("item-action", { id: e, action: t }), a;
  }
  async function q(e) {
    const t = d();
    if (t)
      try {
        await fetch(n.config.cancelEndpoint, {
          method: "POST",
          headers: { "content-type": "application/json", "x-admin-token": t },
          body: JSON.stringify({ submissionId: e })
        });
      } catch {
      }
  }
  function F(e) {
    return e.includes("AGENT_WORKING") ? "Copilot is still working on this draft pull request." : e.includes("AUTO_MERGE_ENABLE_FAILED") ? "GitHub rejected enabling auto-merge. Check PR checks/rules and retry." : e.includes("AUTO_MERGE_CONFIRM_FAILED") || e.includes("AUTO_MERGE_NOT_ENABLED") ? "Merge request was recorded but auto-merge was not confirmed. Retry merge request." : "Failed to apply action.";
  }
  function _(e) {
    const t = e;
    return t != null && t.issue && typeof t.issue.url == "string" ? t.issue.url : typeof (t == null ? void 0 : t.url) == "string" ? t.url : "";
  }
  return {
    getConfig: k,
    authorize: E,
    hasAccess: b,
    readToken: d,
    requireToken: u,
    promptToken: w,
    clearToken: A,
    loadIssues: S,
    submitText: T,
    submitVoice: O,
    submitComment: I,
    createLinkedItem: x,
    executeAction: P,
    cancelSubmission: q,
    mapActionError: F,
    getIssueUrlFromCreateResponse: _
  };
}
export {
  R as c
};
