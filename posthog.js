/**
 * Marketing-site PostHog (separate Cloud project from gruum-app).
 *
 * Paste the public project token below. Sessions use cookie/localStorage
 * distinct ids — adding or removing HTML pages does not break session
 * continuity; removed URLs simply stop producing new $pageview events.
 *
 * Session recording stays off here (product replay lives in the app project).
 * Init is skipped on localhost / *.local so local Vite never sends events.
 */
(function () {
  var KEY = "phc_BkJexqroKRhmm4qyZEycA9qWcV9xhUUzPuwV3Z4Hf8nD";
  var host = location.hostname;
  var isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
    host === "0.0.0.0" ||
    host.endsWith(".local");

  if (isLocal || !KEY || KEY.indexOf("phc_") !== 0) {
    return;
  }

  !(function (t, e) {
    var o, n, p, r;
    e.__SV ||
      (window.posthog && window.posthog.__loaded) ||
      ((window.posthog = e),
      (e._i = []),
      (e.init = function (i, s, a) {
        function g(t, e) {
          var o = e.split(".");
          2 == o.length && ((t = t[o[0]]), (e = o[1]));
          t[e] = function () {
            t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }
        (p = t.createElement("script")),
          (p.type = "text/javascript"),
          (p.crossOrigin = "anonymous"),
          (p.async = !0),
          (p.src =
            s.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
            "/static/array.js"),
          (p.onerror = function () {
            p = null;
          }),
          (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r);
        var u = e;
        void 0 !== a ? (u = e[a] = []) : (a = "posthog");
        u.people = u.people || [];
        Object.defineProperty(u, "toString", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: function (t) {
            var e = "posthog";
            return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e;
          },
        });
        Object.defineProperty(u.people, "toString", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: function () {
            return u.toString(1) + ".people (stub)";
          },
        });
        o =
          "init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagResult isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(
            " ",
          );
        for (n = 0; n < o.length; n++) g(u, o[n]);
        e._i.push([i, s, a]);
      }),
      (e.__SV = 1));
  })(document, window.posthog || []);

  posthog.init(KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    // Full page loads (MPA). history_change also covers hash/soft nav if any.
    capture_pageview: "history_change",
    capture_pageleave: true,
    persistence: "localStorage+cookie",
    disable_session_recording: true,
  });
})();
