import partnerLogoUrl from "./assets/partner-logo-1959c9.png?url";

(function () {
  var quotes = [
    {
      title: "On-spec deliveries kept our water project on track.",
      body:
        "Meera supplied PN10 SDR11 coils with clear mill certificates and marking. Fusion crews reported consistent ovality and stable heating cycles — we hit hydrotest on the first pass.",
      name: "Ananya Deshpande",
      role: "Project Manager, Municipal EPC",
    },
    {
      title: "Quality documentation matched our QA checklist.",
      body:
        "From resin traceability to dimension reports, the dossier aligned with our owner's engineer review. Site support for jointing parameters was practical and responsive.",
      name: "James Okafor",
      role: "Lead QA Engineer",
    },
    {
      title: "Reliable partner for industrial HDPE runs.",
      body:
        "We replaced a corroded carbon steel circuit with HDPE for process water. Meera helped select SDR and fittings for the operating temperature and provided timely coil lengths.",
      name: "Elena Rossi",
      role: "Maintenance Head",
    },
    {
      title: "Smooth coordination for a tight ROW schedule.",
      body:
        "Deliveries were sequenced to our trench opening plan and coils were handled without damage. Fusion teams appreciated the consistent wall thickness across batches.",
      name: "Vikram Singh",
      role: "Site Construction Manager",
    },
    {
      title: "Strong technical support during value engineering.",
      body:
        "Their team walked through hydraulic checks and helped validate PN class versus surge scenarios. The recommendation saved material while staying within code limits.",
      name: "Laura Chen",
      role: "Design Consultant",
    },
  ];

  function renderQuotes() {
    var track = document.getElementById("quotesTrack");
    if (!track) return;
    track.innerHTML = quotes
      .map(function (q) {
        return (
          '<article class="fl-quote-card">' +
          '<div>' +
          '<div class="fl-quote-card__mark" aria-hidden="true">“</div>' +
          '<h3 class="fl-quote-card__title">' +
          escapeHtml(q.title) +
          "</h3>" +
          '<p class="fl-quote-card__body">' +
          escapeHtml(q.body) +
          "</p>" +
          "</div>" +
          '<div class="fl-quote-card__foot">' +
          '<div class="fl-quote-card__client">' +
          '<div class="fl-quote-card__avatar" aria-hidden="true"></div>' +
          '<div class="fl-quote-card__who">' +
          "<strong>" +
          escapeHtml(q.name) +
          "</strong>" +
          "<span>" +
          escapeHtml(q.role) +
          "</span>" +
          "</div>" +
          "</div>" +
          '<img class="fl-quote-card__logo" src="' +
          escapeHtml(partnerLogoUrl) +
          '" width="122" height="32" alt="" />' +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initFaq() {
    var list = document.getElementById("faqList");
    if (!list) return;
    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".fl-faq-item__head");
      if (!btn) return;
      var item = btn.closest(".fl-faq-item");
      if (!item) return;
      var open = item.classList.contains("fl-faq-item--open");
      list.querySelectorAll(".fl-faq-item").forEach(function (el) {
        el.classList.remove("fl-faq-item--open");
        var b = el.querySelector(".fl-faq-item__head");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("fl-faq-item--open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  }

  function initNav() {
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("navDrawer");
    var close = document.getElementById("navClose");
    if (!toggle || !drawer) return;
    function open() {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeFn() {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", closeFn);
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) closeFn();
    });
  }

  function initCatalogForm() {
    var form = document.getElementById("catalogForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  function initCtaForm() {
    var form = document.getElementById("ctaForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }

  function initProcessPills() {
    var root = document.querySelector(".fl-pills");
    if (!root) return;
    root.addEventListener("click", function (e) {
      var pill = e.target.closest(".fl-pill");
      if (!pill) return;
      root.querySelectorAll(".fl-pill").forEach(function (p) {
        p.classList.remove("fl-pill--active");
        p.setAttribute("tabindex", "-1");
      });
      pill.classList.add("fl-pill--active");
      pill.setAttribute("tabindex", "0");
    });
  }

  renderQuotes();
  initFaq();
  initNav();
  initCatalogForm();
  initCtaForm();
  initProcessPills();
})();
