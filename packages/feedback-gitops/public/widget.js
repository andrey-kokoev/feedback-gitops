import { c as p, d as r, F as l } from "./FeedbackWidget.ce-D_hWJo2i.js";
import { c as u } from "./index-CyjCQgu1.js";
function g() {
  const e = window.__FEEDBACK_GITOPS_WIDGET_CONFIG__;
  if (e) {
    let i = function(c) {
      return a.endsWith("/api/issue") ? a.slice(0, a.length - 10) + c : a + c.replace("/api", "");
    };
    const a = String(e.endpoint ?? "").replace(/\/+$/, "");
    return {
      endpoint: a || "/api/issue",
      issuesEndpoint: e.issuesEndpoint ?? i("/api/issues"),
      actionEndpoint: e.actionEndpoint ?? i("/api/action"),
      cancelEndpoint: e.cancelEndpoint ?? i("/api/cancel"),
      repo: e.repo ?? "",
      labels: e.labels ?? "",
      storageKey: e.storageKey ?? "thoughts"
    };
  }
  let n = null;
  document.currentScript instanceof HTMLScriptElement && (n = document.currentScript), n || (n = document.querySelector('script[data-endpoint], script[src*="widget.js"]'));
  const t = (n == null ? void 0 : n.dataset) ?? {}, o = String(t.endpoint ?? "").replace(/\/+$/, "");
  function s(i) {
    return o.endsWith("/api/issue") ? o.slice(0, o.length - 10) + i : o + i.replace("/api", "");
  }
  return {
    endpoint: o || "/api/issue",
    issuesEndpoint: t.issuesEndpoint ?? s("/api/issues"),
    actionEndpoint: t.actionEndpoint ?? s("/api/action"),
    cancelEndpoint: t.cancelEndpoint ?? s("/api/cancel"),
    repo: t.repo ?? "",
    labels: t.labels ?? "",
    storageKey: t.storageKey ?? "thoughts"
  };
}
const E = p(), f = r(l, {
  configureApp(e) {
    e.use(E), e.provide("widget-adapter", u());
  }
});
customElements.get("feedback-gitops-widget") || customElements.define("feedback-gitops-widget", f);
function d() {
  if (document.querySelector("feedback-gitops-widget")) return;
  const e = document.createElement("feedback-gitops-widget");
  e.widgetConfig = g(), document.body.appendChild(e);
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", d) : d();
