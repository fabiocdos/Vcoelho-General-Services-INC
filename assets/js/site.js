/* =============================================================
   VCOELHO GENERAL SERVICES INC. — site.js
   Navigation · Quote form · Lead tracking · Gallery · Reveal
   ============================================================= */
(function () {
  'use strict';

  var PHONE_RAW = '+15085775637';
  var PHONE_INT = '15085775637';
  var PHONE_FMT = '508-577-5637';
  var EMAIL = 'vcoelhogeneralservices@hotmail.com';
  // FormSubmit AJAX endpoint: posts the form server-side to EMAIL and answers
  // with JSON (Access-Control-Allow-Origin: *), so we can tell success from
  // failure instead of guessing.
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------
     1. Icon sprite (injected once, decorative icons only)
     --------------------------------------------------------- */
  var ICONS = {
    'arrow': 'M4 12h15M13 6l6 6-6 6',
    'arrow-left': 'M20 12H5M11 18l-6-6 6-6',
    'arrow-down': 'M12 4v15M6 13l6 6 6-6',
    'chevron-down': 'M6 9.5l6 6 6-6',
    'close': 'M6.5 6.5l11 11M17.5 6.5l-11 11',
    'phone': 'M6.6 3h2.9l1.5 4.4-2 1.4a12.4 12.4 0 0 0 6.2 6.2l1.4-2 4.4 1.5v2.9a2 2 0 0 1-2.2 2A17.4 17.4 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z',
    'mail': 'M3.5 5.6h17v12.8h-17zM3.8 6.2l8.2 5.9 8.2-5.9',
    'pin': 'M12 21.2s7-5.7 7-11.2a7 7 0 1 0-14 0c0 5.5 7 11.2 7 11.2z|M12 12.4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    'clock': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M12 7.2v5.2l3.4 2',
    'check': 'M4.5 12.6l5 5L20 6.6',
    'check-circle': 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z|M8 12.4l2.7 2.7L16.5 9.3',
    'award': 'M12 3.4a5.6 5.6 0 1 0 0 11.2 5.6 5.6 0 0 0 0-11.2z|M8.4 13.6L6.8 21l5.2-2.7L17.2 21l-1.6-7.4',
    'calendar': 'M4 5.4h16v15.2H4zM4 10h16M8.4 3v4.4M15.6 3v4.4',
    'user': 'M12 3.6a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z|M4.6 20.6a7.6 7.6 0 0 1 14.8 0',
    'tag': 'M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0l-7-7A2 2 0 0 1 3 12.2V5a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6l7 7a2 2 0 0 1 0 2.8z|M7.6 7.6a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8z',
    'shield': 'M12 3l7.5 3v5.6c0 4.6-3.2 8.4-7.5 9.6-4.3-1.2-7.5-5-7.5-9.6V6z|M8.8 12.2l2.4 2.4 4.2-4.4',
    'home': 'M4 10.6L12 4.2l8 6.4V20a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 20z|M9.6 21.4V14.2h4.8v7.2',
    'building': 'M4 21V4.4h9.4V21M13.4 9.6h6.6v11.4M6.6 7.6h1.6M10.4 7.6h1.6M6.6 11.4h1.6M10.4 11.4h1.6M6.6 15.2h1.6M10.4 15.2h1.6M3 21h18',
    'sprout': 'M12 21v-7.2|M12 13.8c0-3.4-2.8-6.2-6.2-6.2 0 3.4 2.8 6.2 6.2 6.2z|M12 13.8c0-4 3.2-7.2 7.2-7.2 0 4-3.2 7.2-7.2 7.2z',
    'fence': 'M4.2 21V6.2L5.8 3.6 7.4 6.2V21M10.4 21V6.2L12 3.6l1.6 2.6V21M16.6 21V6.2L18.2 3.6l1.6 2.6V21|M2.6 10.4h18.8M2.6 15.4h18.8',
    'stone': 'M3.2 4.6h7.4v4.8H3.2zM13.4 4.6h7.4v4.8h-7.4zM8.3 9.4h7.4v4.8H8.3zM3.2 14.2h7.4v4.8H3.2zM13.4 14.2h7.4v4.8h-7.4z',
    'snow': 'M12 2.8v18.4M4.2 7.4l15.6 9.2M19.8 7.4L4.2 16.6|M12 6.4l2.2-2.2M12 6.4L9.8 4.2M12 17.6l2.2 2.2M12 17.6l-2.2 2.2',
    'sun': 'M12 7.6a4.4 4.4 0 1 0 0 8.8 4.4 4.4 0 0 0 0-8.8z|M12 2.4v2.6M12 19v2.6M2.4 12H5M19 12h2.6M5.2 5.2l1.9 1.9M16.9 16.9l1.9 1.9M18.8 5.2l-1.9 1.9M7.1 16.9l-1.9 1.9',
    'leaf': 'M20.4 3.6C10 3.6 4 8.4 4 15.2c0 2.4 1.5 4.4 3.8 4.4 6.8 0 12.6-6.8 12.6-16z|M4.4 20.2C8 15.6 12.6 11.8 17.2 10',
    'refresh': 'M20.4 11.6A8.4 8.4 0 0 0 6.4 6.2L3.8 8.6|M3.6 4.2v4.6h4.6|M3.6 12.4a8.4 8.4 0 0 0 14 5.4l2.6-2.4|M20.4 19.8v-4.6h-4.6',
    'image': 'M3.4 4.8h17.2v14.4H3.4z|M8.4 10.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z|M3.8 17.4l5.2-4.8 4 3.4 3.2-2.8 4.6 4.2',
    'upload': 'M12 16.2V3.6|M7.4 8.2L12 3.6l4.6 4.6|M4 16.2v3.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.2',
    'file': 'M14 3.2H7.2a2 2 0 0 0-2 2v13.6a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V8z|M14 3.2V8h4.8|M8.6 13h6.8M8.6 16.4h4.6',
    'star': 'M12 3.4l2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6L3.3 9.8l6-.9z',
    'instagram': 'M8.4 3.4h7.2a5 5 0 0 1 5 5v7.2a5 5 0 0 1-5 5H8.4a5 5 0 0 1-5-5V8.4a5 5 0 0 1 5-5z|M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6z|M16.9 7.1h.01',
    'facebook': 'M15.4 3.6h-2.1A3.7 3.7 0 0 0 9.6 7.3v2.6H7.2v3.5h2.4v7.6h3.5v-7.6h2.5l.5-3.5h-3V7.6c0-.6.4-1 1.1-1h1.8V3.6z',
    'menu': 'M3.6 6.6h16.8M3.6 12h16.8M3.6 17.4h16.8'
  };

  function injectSprite() {
    var parts = ['<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">'];
    for (var k in ICONS) {
      if (!Object.prototype.hasOwnProperty.call(ICONS, k)) continue;
      var d = ICONS[k].split('|').map(function (seg) { return '<path d="' + seg + '"/>'; }).join('');
      parts.push('<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + d + '</symbol>');
    }
    parts.push('</svg>');
    document.body.insertAdjacentHTML('afterbegin', parts.join(''));
  }

  function icon(name, cls) {
    return '<svg class="icon ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  /* ---------------------------------------------------------
     2. Lead tracking
     --------------------------------------------------------- */
  function track(name, data) {
    var payload = Object.assign({ event: name }, data || {});
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, data || {});
    }
    if (window.console && console.debug) { console.debug('[track]', name, data || {}); }
  }

  function storeLead(lead) {
    try {
      var key = 'vcoelho_leads';
      var all = JSON.parse(localStorage.getItem(key) || '[]');
      all.push(lead);
      localStorage.setItem(key, JSON.stringify(all));
    } catch (e) { /* storage unavailable */ }
  }

  /* ---------------------------------------------------------
     3. Header, navigation & dropdowns
     --------------------------------------------------------- */
  function initHeader() {
    var header = $('#siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var burger = $('#navBurger');
    var nav = $('#siteNav');
    if (burger && nav) {
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('is-open', !open);
      });
      $$('a', nav).forEach(function (a) {
        a.addEventListener('click', function () {
          burger.setAttribute('aria-expanded', 'false');
          nav.classList.remove('is-open');
        });
      });
    }

    $$('.nav-toggle').forEach(function (btn) {
      var wrap = btn.closest('.has-dropdown');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var open = wrap.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
        $$('.has-dropdown').forEach(function (other) {
          if (other !== wrap) {
            other.classList.remove('is-open');
            var t = $('.nav-toggle', other);
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
      });
    });

    document.addEventListener('click', function (e) {
      if (e.target.closest('.has-dropdown')) return;
      $$('.has-dropdown.is-open').forEach(function (w) {
        w.classList.remove('is-open');
        var t = $('.nav-toggle', w);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      $$('.has-dropdown.is-open').forEach(function (w) {
        w.classList.remove('is-open');
        var t = $('.nav-toggle', w);
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      if (burger && nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.focus();
      }
      closeLightbox();
      closeModal();
    });
  }

  /* ---------------------------------------------------------
     4. Quote form markup
     --------------------------------------------------------- */
  var SERVICES = ['Landscaping', 'Fencing', 'Hardscaping', 'Snow Plowing', 'Other'];
  var PROPERTY_TYPES = ['Residential', 'Commercial', 'Property Management'];

  // Shown inside the form when the automatic e-mail send does not go through:
  // the visitor can still deliver the same details by WhatsApp, SMS or e-mail.
  function sendAlertMarkup() {
    return '' +
      '<div class="form-alert" data-form-alert role="alert" hidden>' +
        '<p><strong data-alert-title>We couldn\'t send this automatically.</strong> <span data-alert-msg>Send your request right now &mdash; your details are already filled in:</span></p>' +
        '<p class="form-alert-links">' +
          '<a data-channel="whatsapp" target="_blank" rel="noopener" href="https://wa.me/' + PHONE_INT + '">Send on WhatsApp</a>' +
          '<span aria-hidden="true"> &middot; </span>' +
          '<a data-channel="sms" target="_blank" rel="noopener" href="sms:' + PHONE_RAW + '">Send by SMS</a>' +
          '<span aria-hidden="true"> &middot; </span>' +
          '<a data-mailto href="mailto:' + EMAIL + '">Send by e-mail</a>' +
        '</p>' +
        '<p class="tiny">You can also press submit again, or call ' + PHONE_FMT + '.</p>' +
      '</div>';
  }

  function quoteFormMarkup(idPrefix, opts) {
    opts = opts || {};
    var title = opts.title || 'Request a Quote';
    var intro = opts.intro || 'Tell us about your property and we\'ll get back to you with next steps.';
    var button = opts.button || 'Request My Quote';
    var preselect = opts.service || '';

    function field(f) {
      return '' +
        '<div class="field' + (f.full ? ' is-full' : '') + '" data-field="' + f.name + '">' +
          '<label for="' + f.id + '">' + f.label + (f.required ? '<span class="req" aria-hidden="true">*</span>' : '') + '</label>' +
          f.control +
          '<p class="field-error" id="' + f.id + '-error" role="alert"></p>' +
        '</div>';
    }

    var serviceSelect = '<select id="' + idPrefix + '-service" name="service" required aria-describedby="' + idPrefix + '-service-error">' +
      '<option value="">Select a service</option>' +
      SERVICES.map(function (s) {
        return '<option value="' + s + '"' + (s === preselect ? ' selected' : '') + '>' + s + '</option>';
      }).join('') + '</select>';

    var typeSelect = '<select id="' + idPrefix + '-type" name="propertyType" required aria-describedby="' + idPrefix + '-type-error">' +
      '<option value="">Select property type</option>' +
      PROPERTY_TYPES.map(function (s) { return '<option value="' + s + '">' + s + '</option>'; }).join('') + '</select>';

    return '' +
      '<div class="form-head">' +
        '<h2>' + title + '</h2>' +
        '<p>' + intro + '</p>' +
      '</div>' +
      '<form class="quote-form" novalidate action="https://formsubmit.co/' + EMAIL + '" method="post" enctype="multipart/form-data" data-quote-form>' +
        '<input type="hidden" name="_subject" value="Quote request - vcoelhogeneralservices.com">' +
        '<input type="hidden" name="_template" value="table">' +
        '<input type="hidden" name="_captcha" value="false">' +
        '<input type="hidden" name="_next" value="' + location.origin + location.pathname + '?sent=1">' +
        '<input type="text" name="_honey" value="" style="display:none" tabindex="-1" autocomplete="off" aria-label="Leave this field empty">' +
        '<div class="form-grid">' +
          field({ id: idPrefix + '-name', name: 'fullName', label: 'Full Name', required: true,
            control: '<input type="text" id="' + idPrefix + '-name" name="fullName" autocomplete="name" placeholder="John Smith" required aria-describedby="' + idPrefix + '-name-error">' }) +
          field({ id: idPrefix + '-phone', name: 'phone', label: 'Phone Number', required: true,
            control: '<input type="tel" id="' + idPrefix + '-phone" name="phone" autocomplete="tel" placeholder="508-000-0000" required aria-describedby="' + idPrefix + '-phone-error">' }) +
          field({ id: idPrefix + '-email', name: 'email', label: 'Email Address',
            control: '<input type="email" id="' + idPrefix + '-email" name="email" autocomplete="email" placeholder="you@email.com" aria-describedby="' + idPrefix + '-email-error">' }) +
          field({ id: idPrefix + '-address', name: 'address', label: 'Property Address',
            control: '<input type="text" id="' + idPrefix + '-address" name="address" autocomplete="street-address" placeholder="Street, Town, MA" aria-describedby="' + idPrefix + '-address-error">' }) +
          field({ id: idPrefix + '-service', name: 'service', label: 'Service Needed', required: true, control: serviceSelect }) +
          field({ id: idPrefix + '-type', name: 'propertyType', label: 'Property Type', required: true, control: typeSelect }) +
          field({ id: idPrefix + '-message', name: 'message', label: 'Tell Us About Your Project', required: true, full: true,
            control: '<textarea id="' + idPrefix + '-message" name="message" rows="5" placeholder="Describe your property, the service you need, and any timing you have in mind…" required aria-describedby="' + idPrefix + '-message-error"></textarea>' }) +
          '<div class="field is-full">' +
            '<label for="' + idPrefix + '-photos">Upload Photos <span class="field-hint">— optional, helps with estimates</span></label>' +
            '<label class="file-drop" for="' + idPrefix + '-photos">' +
              icon('upload') +
              '<span data-file-label>Attach project photos (JPG or PNG)</span>' +
              '<input type="file" id="' + idPrefix + '-photos" name="photos" accept="image/*" multiple>' +
            '</label>' +
          '</div>' +
          sendAlertMarkup() +
          '<div class="form-actions">' +
            '<button type="submit" class="btn btn-primary btn-lg btn-block">' + button + icon('arrow', 'arrow') + '</button>' +
          '</div>' +
          '<p class="form-alt">Rather send it yourself? ' +
            '<a data-channel="whatsapp" target="_blank" rel="noopener" href="https://wa.me/' + PHONE_INT + '">Send it on WhatsApp</a> or ' +
            '<a data-channel="sms" target="_blank" rel="noopener" href="sms:' + PHONE_RAW + '">send a text</a> ' +
            '&mdash; we pre-fill your message.</p>' +
          '<p class="form-legal">By submitting, you agree to be contacted about your request. We never share your details.</p>' +
        '</div>' +
      '</form>' +
      '<div class="form-success" hidden>' +
        '<div class="icon-badge">' + icon('check') + '</div>' +
        '<h3>Thank you for contacting Vcoelho General Services INC.</h3>' +
        '<p>Your request has been sent to our team. We\'ll review your project details and get back to you shortly.</p>' +
        '<div class="btn-row">' +
          '<a class="btn btn-primary" data-channel="whatsapp" target="_blank" rel="noopener" href="https://wa.me/' + PHONE_INT + '">Message us on WhatsApp</a>' +
          '<a class="btn btn-outline" data-channel="sms" target="_blank" rel="noopener" href="sms:' + PHONE_RAW + '">Send by SMS</a>' +
          '<a class="btn btn-outline" href="tel:' + PHONE_RAW + '">Call ' + PHONE_FMT + icon('phone', 'arrow') + '</a>' +
        '</div>' +
        '<p class="tiny">Need us right away? WhatsApp or SMS opens with your details ready to send. Or call ' + PHONE_FMT + ', Mon&ndash;Sat 7:00 AM&ndash;6:00 PM.</p>' +
      '</div>';
  }

  /* ---------------------------------------------------------
     5. Quote modal
     --------------------------------------------------------- */
  var modal, lastFocused;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'quoteModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'quoteModalTitle');
    modal.innerHTML =
      '<div class="modal-panel">' +
        '<button class="modal-close" type="button" aria-label="Close quote form">' + icon('close') + '</button>' +
        '<div data-modal-form>' + quoteFormMarkup('m', {}) + '</div>' +
      '</div>';
    document.body.appendChild(modal);

    var h = $('.form-head h2', modal);
    if (h) h.id = 'quoteModalTitle';

    $('.modal-close', modal).addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

    bindForm($('[data-quote-form]', modal), 'modal');

    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function openModal(service, trigger) {
    if (!modal) buildModal();
    lastFocused = trigger || document.activeElement;

    // Rebuild the form first so a pre-selected service lands in the markup.
    resetForm($('[data-modal-form]', modal), 'm', { service: service || '' });
    modal.classList.add('is-open');
    document.body.classList.add('modal-open');
    setTimeout(function () {
      var first = $('#m-name', modal);
      if (first) first.focus();
    }, 60);

    track('quote_open', { service: service || 'not specified', page: pageName() });
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  function resetForm(wrap, idPrefix, opts) {
    if (!wrap) return;
    wrap.innerHTML = quoteFormMarkup(idPrefix, opts);
    var h = $('.form-head h2', wrap);
    if (h && idPrefix === 'm' && modal) h.id = 'quoteModalTitle';
    bindForm($('[data-quote-form]', wrap), idPrefix === 'm' ? 'modal' : idPrefix);
  }

  /* ---------------------------------------------------------
     6. Form validation & submission
     --------------------------------------------------------- */
  function pageName() {
    var f = location.pathname.split('/').pop();
    return f === '' ? 'index.html' : f;
  }

  function setError(fieldEl, msg) {
    if (!fieldEl) return;
    fieldEl.classList.toggle('is-invalid', !!msg);
    var input = $('input, select, textarea', fieldEl);
    var err = $('.field-error', fieldEl);
    if (err) err.textContent = msg || '';
    if (input) {
      if (msg) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
  }

  var RULES = [
    { name: 'fullName',    msg: 'Please enter your full name.',          test: function (v) { return v.length >= 2; } },
    { name: 'phone',       msg: 'Please enter a valid phone number.',    test: function (v) { return v.replace(/\D/g, '').length >= 10; } },
    { name: 'email',       msg: 'Please enter a valid email address.',   test: function (v) { return v === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); } },
    { name: 'service',     msg: 'Please choose a service.',              test: function (v) { return v !== ''; } },
    { name: 'propertyType',msg: 'Please choose a property type.',        test: function (v) { return v !== ''; } },
    { name: 'message',     msg: 'Please tell us a little about your project.', test: function (v) { return v.length >= 8; } }
  ];

  function validateField(form, name) {
    var rule = null;
    for (var i = 0; i < RULES.length; i++) { if (RULES[i].name === name) { rule = RULES[i]; break; } }
    var el = $('[data-field="' + name + '"]', form);
    if (!el || !rule) return true;
    var input = $('input, select, textarea', el);
    if (!input) return true;
    var ok = rule.test(input.value.trim());
    setError(el, ok ? '' : rule.msg);
    return ok;
  }

  function validate(form) {
    var ok = true;
    var firstBad = null;

    RULES.forEach(function (rule) {
      if (!validateField(form, rule.name)) {
        ok = false;
        if (!firstBad) {
          var el = $('[data-field="' + rule.name + '"]', form);
          firstBad = el ? $('input, select, textarea', el) : null;
        }
      }
    });

    if (!ok && firstBad) firstBad.focus();
    return ok;
  }

  /* ---- delivery helpers: FormSubmit e-mail + WhatsApp/SMS copies ---- */

  function collect(form) {
    var data = {};
    $$('input, select, textarea', form).forEach(function (el) {
      if (el.type === 'file') { data.photos = el.files ? el.files.length : 0; }
      else if (el.name && el.name.charAt(0) !== '_') { data[el.name] = el.value.trim(); }
    });
    return data;
  }

  function quoteText(data) {
    return [
      'Quote request from vcoelhogeneralservices.com',
      '',
      'Name: ' + data.fullName,
      'Phone: ' + data.phone,
      'Email: ' + (data.email || '—'),
      'Address: ' + (data.address || '—'),
      'Service: ' + data.service,
      'Property type: ' + data.propertyType,
      '',
      'Project:',
      data.message
    ].join('\n');
  }

  function channelUrls(data) {
    var text = quoteText(data);
    var subject = 'Quote request — ' + (data.service || 'General') +
      (data.propertyType ? ' (' + data.propertyType + ')' : '');
    var mailBody = text + (data.photos ? '\n\nPhotos selected: ' + data.photos + ' (attach them in this e-mail)' : '');
    return {
      whatsapp: 'https://wa.me/' + PHONE_INT + '?text=' + encodeURIComponent(text),
      sms: 'sms:' + PHONE_RAW + '?&body=' + encodeURIComponent(text),
      email: 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(mailBody)
    };
  }

  // Fill every WhatsApp / SMS / e-mail shortcut in scope with the details
  // currently in the form.
  function applyChannels(scope, data) {
    var urls = channelUrls(data);
    $$('[data-channel]', scope).forEach(function (a) {
      var kind = a.getAttribute('data-channel');
      if (urls[kind]) a.setAttribute('href', urls[kind]);
    });
    $$('[data-mailto]', scope).forEach(function (a) { a.setAttribute('href', urls.email); });
  }

  // POST the form to FormSubmit and resolve with its JSON body.
  function postQuote(fd) {
    var timeout = new Promise(function (resolve, reject) {
      setTimeout(function () { reject(new Error('Timed out after 30 seconds')); }, 30000);
    });
    var request = fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: fd
    }).then(function (r) {
      return r.text().then(function (t) {
        var out = null;
        try { out = JSON.parse(t); } catch (e) { out = null; }
        if (!out) throw new Error('Unexpected response (HTTP ' + r.status + ')');
        return out;
      });
    });
    return Promise.race([request, timeout]);
  }

  // Static pages come back from FormSubmit's no-JavaScript submit with ?sent=1.
  function showSentPanel() {
    var panels = $$('.form-success').filter(function (p) { return !p.closest('#quoteModal'); });
    if (!panels.length) return;
    var s = panels[0];
    var wrap = s.parentNode;
    var f = $('[data-quote-form]', wrap);
    var head = $('.form-head', wrap);
    if (f) f.hidden = true;
    if (head) head.hidden = true;
    s.hidden = false;
    s.classList.add('is-visible');
    var h = $('h3', s);
    if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
  }

  function bindForm(form, source) {
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    var fileInput = $('input[type=file]', form);
    if (fileInput) {
      fileInput.addEventListener('change', function () {
        var label = $('[data-file-label]', form);
        if (!label) return;
        var n = fileInput.files.length;
        label.textContent = n ? (n + (n === 1 ? ' photo attached' : ' photos attached')) : 'Attach project photos (JPG or PNG)';
      });
    }

    $$('.field input, .field select, .field textarea', form).forEach(function (input) {
      var fieldEl = input.closest('.field');
      var name = fieldEl ? fieldEl.dataset.field : null;
      if (!name) return;
      input.addEventListener('blur', function () {
        if (input.value.trim() !== '' || input.required) validateField(form, name);
      });
      input.addEventListener('input', function () {
        if (fieldEl.classList.contains('is-invalid')) validateField(form, name);
      });
    });

    // WhatsApp / SMS / e-mail shortcuts inside the form: they only go through
    // once the visitor's details validate, and they carry the filled-in data.
    $$('[data-channel], [data-mailto]', form).forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (!validate(form)) { e.preventDefault(); return; }
        var kind = a.getAttribute('data-channel') || 'email';
        var urls = channelUrls(collect(form));
        if (urls[kind]) a.setAttribute('href', urls[kind]);
        track('quote_channel_click', { channel: kind, page: pageName() });
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.dataset.sending === '1') return;

      if (!validate(form)) {
        track('quote_form_error', { source: source, page: pageName() });
        return;
      }

      var data = collect(form);

      var lead = Object.assign({
        submittedAt: new Date().toISOString(),
        page: pageName(),
        source: source,
        referrer: document.referrer || ''
      }, data);
      storeLead(lead);

      track('quote_submit', {
        service: data.service,
        property_type: data.propertyType,
        source: source,
        page: pageName(),
        has_photos: data.photos > 0
      });

      var wrap = form.parentNode;
      var success = $('.form-success', wrap);
      var alertBox = $('[data-form-alert]', wrap);
      var head = $('.form-head', wrap);
      var btn = $('button[type="submit"]', form);
      var btnHtml = btn ? btn.innerHTML : '';

      // Every shortcut (in the form, in the alert and in the thank-you panel)
      // gets the visitor's own details before anything is sent.
      applyChannels(wrap, data);
      if (alertBox) alertBox.hidden = true;

      form.dataset.sending = '1';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      postQuote(new FormData(form))
        .then(function (res) {
          if (!(res.success === true || res.success === 'true')) {
            throw new Error(res.message || 'FormSubmit did not confirm delivery');
          }
          form.hidden = true;
          if (head) head.hidden = true;
          if (success) {
            success.hidden = false;
            success.classList.add('is-visible');
            var h = $('h3', success);
            if (h) { h.setAttribute('tabindex', '-1'); h.focus(); }
          }
          track('quote_delivered', { method: 'email', service: data.service, page: pageName() });
        })
        .catch(function (err) {
          // Never lose the request: keep the form on screen and hand the
          // visitor the WhatsApp / SMS / e-mail buttons with the data in them.
          var msg = String((err && err.message) || err);
          var timedOut = msg.indexOf('Timed out') === 0;
          if (alertBox) {
            var title = $('[data-alert-title]', alertBox);
            var text = $('[data-alert-msg]', alertBox);
            if (title) title.textContent = timedOut ? 'This is taking longer than expected.' : 'We couldn\'t send this automatically.';
            if (text) {
              text.textContent = timedOut
                ? 'Your request may still be on its way — if you don\'t hear back from us, send it again or use the buttons below:'
                : 'Send your request right now — your details are already filled in:';
            }
            alertBox.hidden = false;
            if (alertBox.scrollIntoView) alertBox.scrollIntoView({ block: 'center' });
          }
          track('quote_send_failed', {
            page: pageName(),
            reason: msg.slice(0, 160),
            timed_out: timedOut
          });
        })
        .then(function () {
          form.dataset.sending = '0';
          if (btn) { btn.disabled = false; btn.innerHTML = btnHtml; }
        });
    });
  }

  /* ---------------------------------------------------------
     7. Mobile action bar
     --------------------------------------------------------- */
  function buildMobileBar() {
    var bar = document.createElement('div');
    bar.className = 'mobile-bar';
    bar.innerHTML =
      '<a href="tel:' + PHONE_RAW + '" data-track="phone_click">' + icon('phone') + 'Call Us</a>' +
      '<button type="button" class="mb-quote" data-quote>' + icon('file') + 'Get a Quote</button>';
    document.body.appendChild(bar);
  }

  /* ---------------------------------------------------------
     8. Gallery: filters + lightbox
     --------------------------------------------------------- */
  var lightbox, lbItems = [], lbIndex = 0;

  function buildLightbox() {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Project photo');
    lightbox.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Close">' + icon('close') + '</button>' +
      '<button class="lightbox-nav prev" type="button" aria-label="Previous photo">' + icon('arrow-left') + '</button>' +
      '<button class="lightbox-nav next" type="button" aria-label="Next photo">' + icon('arrow') + '</button>' +
      '<div class="lightbox-inner">' +
        '<img class="lightbox-img" src="" alt="">' +
        '<div class="lightbox-meta"><span class="tag"></span><p class="name"></p></div>' +
      '</div>';
    document.body.appendChild(lightbox);

    $('.lightbox-close', lightbox).addEventListener('click', closeLightbox);
    $('.lightbox-nav.prev', lightbox).addEventListener('click', function () { showLightbox(lbIndex - 1); });
    $('.lightbox-nav.next', lightbox).addEventListener('click', function () { showLightbox(lbIndex + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  }

  function showLightbox(i) {
    if (!lbItems.length) return;
    lbIndex = (i + lbItems.length) % lbItems.length;
    var item = lbItems[lbIndex];
    var img = $('.lightbox-img', lightbox);
    img.src = item.dataset.full || $('img', item).src;
    img.alt = $('img', item).alt || '';
    $('.lightbox-meta .tag', lightbox).textContent = item.dataset.tag || '';
    $('.lightbox-meta .name', lightbox).textContent = item.dataset.name || '';
  }

  function openLightbox(item) {
    if (!lightbox) buildLightbox();
    lbItems = $$('.gallery-item:not(.is-hidden)');
    var idx = lbItems.indexOf(item);
    if (idx < 0) { lbItems = [item]; idx = 0; }
    showLightbox(idx);
    lightbox.classList.add('is-open');
    document.body.classList.add('modal-open');
    $('.lightbox-close', lightbox).focus();
    track('gallery_open', {
      item: item.dataset.name || '',
      category: item.dataset.tag || '',
      page: pageName()
    });
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    if (!modal || !modal.classList.contains('is-open')) {
      document.body.classList.remove('modal-open');
    }
  }

  function initGallery() {
    var items = $$('.gallery-item');
    if (!items.length) return;

    items.forEach(function (item) {
      item.addEventListener('click', function () { openLightbox(item); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
      });
    });

    var filters = $$('.filter-btn');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.dataset.filter;
        filters.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        var shown = 0;
        items.forEach(function (item) {
          var cats = (item.dataset.cats || '').split(/\s+/);
          var show = f === 'all' || cats.indexOf(f) !== -1;
          item.classList.toggle('is-hidden', !show);
          if (show) shown++;
        });
        var empty = $('.gallery-empty');
        if (empty) empty.hidden = shown > 0;
        track('gallery_filter', { filter: f, results: shown, page: pageName() });
      });
    });
  }

  /* ---------------------------------------------------------
     9. Reveal on scroll
     --------------------------------------------------------- */
  function initReveal() {
    var els = $$('.reveal, .reveal-img, .season');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     10. Generic click tracking
     --------------------------------------------------------- */
  function initTracking() {
    document.addEventListener('click', function (e) {
      var quoteBtn = e.target.closest('[data-quote]');
      if (quoteBtn) {
        e.preventDefault();
        openModal(quoteBtn.dataset.service || '', quoteBtn);
        return;
      }

      var phoneLink = e.target.closest('a[href^="tel:"]');
      if (phoneLink) { track('phone_click', { page: pageName(), label: phoneLink.textContent.trim() }); return; }

      var mailLink = e.target.closest('a[href^="mailto:"]');
      if (mailLink) { track('email_click', { page: pageName(), label: mailLink.textContent.trim() }); return; }

      var social = e.target.closest('[data-track="social_click"]');
      if (social) {
        track('social_click', { network: social.dataset.network || '', page: pageName() });
        return;
      }

      var cta = e.target.closest('[data-cta]');
      if (cta) {
        track('cta_click', { label: cta.dataset.cta, page: pageName() });
      }
    });

    var path = pageName();
    track('page_view', { page: path });
  }

  /* ---------------------------------------------------------
     11. Boot
     --------------------------------------------------------- */
  function boot() {
    injectSprite();
    buildMobileBar();
    initHeader();
    buildModal();

    $$('[data-quote-form]').forEach(function (f) {
      bindForm(f, f.closest('#quoteModal') ? 'modal' : 'inline');
    });

    initGallery();
    initReveal();
    initTracking();

    // no-JavaScript submit returned by FormSubmit via the _next field
    if (location.search.indexOf('sent=1') !== -1) showSentPanel();

    // Deep link: contact.html#quote scrolls to the inline form when one exists
    // on the page; elsewhere it opens the modal.
    if (location.hash === '#quote') {
      var inlineTarget = $('#quote');
      var hasInlineForm = inlineTarget && $('[data-quote-form]', inlineTarget);
      setTimeout(function () {
        if (hasInlineForm) {
          if (inlineTarget.scrollIntoView) inlineTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          openModal('', null);
        }
      }, 120);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
