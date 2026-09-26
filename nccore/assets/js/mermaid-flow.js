/*
  Mermaid edges flow in their drawn direction, like the E-stop chain on the product page.

  Material renders each diagram into a closed shadow root with its own themeCSS, so page CSS
  never reaches the edges. Mermaid is loaded lazily and assigned to window.mermaid; this catches
  that assignment and appends the animation to whatever themeCSS Material passes to initialize.
*/
(function () {
  var FLOW =
    ".flowchart-link,.edgePath path,.messageLine0,.messageLine1{stroke-dasharray:8 6;animation:nc-dash 1.6s linear infinite}" +
    "@keyframes nc-dash{to{stroke-dashoffset:-28}}" +
    "@media (prefers-reduced-motion:reduce){.flowchart-link,.edgePath path,.messageLine0,.messageLine1{animation:none;stroke-dasharray:none}}";

  function wrap(m) {
    if (!m || m.__ncFlow) return m;
    var init = m.initialize;
    if (typeof init !== "function") return m;
    m.initialize = function (config) {
      config = config || {};
      config.themeCSS = (config.themeCSS || "") + FLOW;
      return init.call(this, config);
    };
    m.__ncFlow = true;
    return m;
  }

  var current = window.mermaid;
  try {
    Object.defineProperty(window, "mermaid", {
      configurable: true,
      get: function () { return current; },
      set: function (v) { current = wrap(v); }
    });
  } catch (e) { /* leave the diagrams static */ }
  if (current) wrap(current);
})();
