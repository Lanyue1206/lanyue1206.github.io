
/*
  UNIVERSAL INTERACTIVE MAP VIEWER
  Lanyue Zhang Portfolio

  Compatible with:
  - projects/open-space.html
  - pages using project-template.js
*/

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- STYLES ---------- */

  const style = document.createElement("style");

  style.textContent = `
    .portfolio-map-dialog {
      position: fixed;
      inset: 0;
      width: 96vw;
      height: 94vh;
      max-width: none;
      max-height: none;
      padding: 0;
      border: none;
      border-radius: 5px;
      background: #171717;
      color: white;
      overflow: hidden;
    }

    .portfolio-map-dialog[open] {
      display: flex;
      flex-direction: column;
    }

    .portfolio-map-dialog::backdrop {
      background: rgba(0, 0, 0, 0.86);
    }

    .portfolio-map-toolbar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      flex-shrink: 0;
    }

    .portfolio-map-toolbar button {
      min-width: 40px;
      height: 40px;
      padding: 0 12px;
      border: 1px solid #555;
      border-radius: 3px;
      background: #303030;
      color: white;
      font-size: 16px;
      font-family: var(--sans, Arial, sans-serif);
      cursor: pointer;
    }

    .portfolio-map-toolbar button:hover {
      background: #505050;
    }

    .portfolio-map-close {
      margin-left: 12px;
      font-size: 25px !important;
    }

    .portfolio-map-viewport {
      position: relative;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      touch-action: none;
      cursor: grab;
    }

    .portfolio-map-viewport.dragging {
      cursor: grabbing;
    }

    .portfolio-map-image {
      display: block;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transform-origin: center center;
      user-select: none;
      -webkit-user-drag: none;
      pointer-events: none;
    }

    .portfolio-map-hint {
      flex-shrink: 0;
      padding: 12px;
      text-align: center;
      color: #aaa;
      font-family: var(--sans, Arial, sans-serif);
      font-size: 11px;
    }

    .map-large,
    #projectMap {
      cursor: zoom-in;
    }

    @media (max-width: 600px) {
      .portfolio-map-dialog {
        width: 100vw;
        height: 100vh;
        border-radius: 0;
      }

      .portfolio-map-toolbar {
        padding: 10px;
      }

      .portfolio-map-hint {
        font-size: 10px;
      }
    }
  `;

  document.head.appendChild(style);

  /* ---------- VIEWER ---------- */

  const dialog = document.createElement("dialog");
  dialog.className = "portfolio-map-dialog";
  dialog.setAttribute("aria-label", "Interactive map viewer");

  dialog.innerHTML = `
    <div class="portfolio-map-toolbar">
      <button type="button" data-action="out"
              aria-label="Zoom out">−</button>

      <button type="button" data-action="in"
              aria-label="Zoom in">+</button>

      <button type="button" data-action="reset"
              aria-label="Reset zoom">Reset</button>

      <button type="button" data-action="close"
              class="portfolio-map-close"
              aria-label="Close viewer">×</button>
    </div>

    <div class="portfolio-map-viewport">
      <img class="portfolio-map-image"
           alt="Enlarged project map"
           draggable="false">
    </div>

    <div class="portfolio-map-hint">
      Scroll to zoom · Drag to move · Double-click to zoom
    </div>
  `;

  document.body.appendChild(dialog);

  const viewport = dialog.querySelector(
    ".portfolio-map-viewport"
  );

  const image = dialog.querySelector(
    ".portfolio-map-image"
  );

  const pointers = new Map();

  let scale = 1;
  let offsetX = 0;
  let offsetY = 0;
  let previousPinch = null;

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 8;

  /* ---------- TRANSFORM ---------- */

  function render() {
    image.style.transform =
      `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
  }

  function constrain() {
    const maxX = Math.max(
      0,
      (image.clientWidth * scale - viewport.clientWidth) / 2
    );

    const maxY = Math.max(
      0,
      (image.clientHeight * scale - viewport.clientHeight) / 2
    );

    offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
    offsetY = Math.max(-maxY, Math.min(maxY, offsetY));
  }

  function reset() {
    scale = 1;
    offsetX = 0;
    offsetY = 0;
    previousPinch = null;
    pointers.clear();
    viewport.classList.remove("dragging");
    render();
  }

  function zoomAt(nextScale, clientX, clientY) {
    const oldScale = scale;

    scale = Math.max(
      MIN_ZOOM,
      Math.min(MAX_ZOOM, nextScale)
    );

    if (scale === 1) {
      offsetX = 0;
      offsetY = 0;
    } else {
      const rect = viewport.getBoundingClientRect();

      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;

      const ratio = scale / oldScale;

      offsetX = x - (x - offsetX) * ratio;
      offsetY = y - (y - offsetY) * ratio;
    }

    constrain();
    render();
  }

  function zoomCenter(factor) {
    const rect = viewport.getBoundingClientRect();

    zoomAt(
      scale * factor,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
  }

  /* ---------- OPEN / CLOSE ---------- */

  function openViewer(src, alt) {
    reset();

    image.onload = () => {
      constrain();
      render();
    };

    image.src = src;
    image.alt = alt || "Enlarged project map";

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function closeViewer() {
    if (dialog.open) dialog.close();
  }

  dialog.querySelector('[data-action="in"]')
    .addEventListener("click", () => zoomCenter(1.35));

  dialog.querySelector('[data-action="out"]')
    .addEventListener("click", () => zoomCenter(1 / 1.35));

  dialog.querySelector('[data-action="reset"]')
    .addEventListener("click", reset);

  dialog.querySelector('[data-action="close"]')
    .addEventListener("click", closeViewer);

  dialog.addEventListener("close", reset);

  /* ---------- SCROLL ZOOM ---------- */

  viewport.addEventListener("wheel", event => {
    event.preventDefault();

    const factor = Math.exp(-event.deltaY * 0.002);

    zoomAt(
      scale * factor,
      event.clientX,
      event.clientY
    );
  }, { passive: false });

  /* ---------- DOUBLE CLICK ---------- */

  viewport.addEventListener("dblclick", event => {
    event.preventDefault();

    zoomAt(
      scale * 1.6,
      event.clientX,
      event.clientY
    );
  });

  /* ---------- DRAG AND PINCH ---------- */

  function pinchInfo() {
    const values = Array.from(pointers.values());

    if (values.length < 2) return null;

    const [a, b] = values;

    return {
      distance: Math.hypot(a.x - b.x, a.y - b.y),
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2
    };
  }

  viewport.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" &&
        event.button !== 0) return;

    viewport.setPointerCapture(event.pointerId);

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    viewport.classList.add("dragging");

    if (pointers.size >= 2) {
      previousPinch = pinchInfo();
    }
  });

  viewport.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId)) return;

    const old = pointers.get(event.pointerId);

    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY
    });

    if (pointers.size >= 2) {
      const pinch = pinchInfo();

      if (previousPinch &&
          previousPinch.distance > 0) {

        offsetX += pinch.x - previousPinch.x;
        offsetY += pinch.y - previousPinch.y;

        zoomAt(
          scale * pinch.distance / previousPinch.distance,
          pinch.x,
          pinch.y
        );
      }

      previousPinch = pinch;

    } else if (scale > 1) {
      offsetX += event.clientX - old.x;
      offsetY += event.clientY - old.y;

      constrain();
      render();
    }
  });

  function releasePointer(event) {
    pointers.delete(event.pointerId);
    previousPinch = pointers.size >= 2
      ? pinchInfo()
      : null;

    if (pointers.size === 0) {
      viewport.classList.remove("dragging");
    }
  }

  viewport.addEventListener("pointerup", releasePointer);
  viewport.addEventListener("pointercancel", releasePointer);

  window.addEventListener("resize", () => {
    if (dialog.open) {
      constrain();
      render();
    }
  });

  /*
    INTERCEPT EXISTING PROJECT MAP CLICKS

    This allows the new viewer to replace the old
    lightbox without rewriting the original page.
  */

  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;

    const map = event.target.closest(
      ".map-large, #projectMap"
    );

    if (!map || !map.matches("img")) return;

    event.preventDefault();
    event.stopPropagation();

    // Prevent legacy inline lightbox handlers.
    event.stopImmediatePropagation();

    openViewer(
      map.currentSrc || map.src,
      map.alt
    );

  }, true);

});
