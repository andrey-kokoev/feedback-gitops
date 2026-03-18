import { c as d, d as s, F as r } from "./FeedbackWidget.ce-Dc9B2VOe.js";
import { c as a } from "./index-Bi0b3um2.js";
function c() {
  const e = window.__WIDGET_CONFIG__;
  if (!e) throw new Error("Missing widget dev config: window.__WIDGET_CONFIG__ is undefined");
  const t = (e.endpoint ?? "").replace(/\/+$/, "");
  function o(n) {
    return t.endsWith("/api/issue") ? t.slice(0, t.length - 10) + n : t + n.replace("/api", "");
  }
  return {
    endpoint: t || "/api/issue",
    issuesEndpoint: e.issuesEndpoint ?? o("/api/issues"),
    actionEndpoint: e.actionEndpoint ?? o("/api/action"),
    cancelEndpoint: e.cancelEndpoint ?? o("/api/cancel"),
    repo: e.repo ?? "",
    labels: e.labels ?? "",
    storageKey: e.storageKey ?? "thoughts"
  };
}
const g = d(), p = s(r, {
  configureApp(e) {
    e.use(g), e.provide("widget-adapter", a());
  }
});
customElements.get("feedback-gitops-widget") || customElements.define("feedback-gitops-widget", p);
function i() {
  if (console.log("[Widget Integration] Bootstrap started"), document.querySelector("feedback-gitops-widget")) {
    console.log("[Widget Integration] Element already exists");
    return;
  }
  try {
    const e = c();
    if (console.log("[Widget Integration] Config found:", e), !customElements.get("feedback-gitops-widget"))
      throw new Error("Custom element feedback-gitops-widget not defined");
    console.log("[Widget Integration] Custom element defined");
    const t = document.createElement("feedback-gitops-widget");
    t.widgetConfig = e, document.body.appendChild(t), console.log("[Widget Integration] Element appended to body");
  } catch (e) {
    console.error("[Widget Integration] Boot failure:", e);
    const t = document.createElement("div");
    t.style.cssText = "position: fixed; bottom: 20px; right: 20px; background: #fee2e2; border: 2px solid #ef4444; color: #991b1b; padding: 16px; border-radius: 8px; z-index: 99999; font-family: sans-serif;", t.innerHTML = `
      <h3 style="margin-top:0;margin-bottom:8px;">Widget failed to mount</h3>
      <p style="margin:0;font-size:14px;"><strong>Reason:</strong> ${e.message}</p>
      <p style="margin-top:8px;margin-bottom:0;font-size:14px;">Check browser console. Entry script did not bootstrap correctly.</p>
    `, document.body.appendChild(t);
  }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", i) : i();
