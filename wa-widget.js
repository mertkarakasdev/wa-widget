/*!
 * WA Widget v1.0.0
 * (c) Mert Karakaş <https://karakas.io>
 * MIT License
 *
 * Usage:
 *   <script>
 *     window.WAWidgetConfig = {
 *       phoneNumber: "+905551234567",
 *       agentName: "Customer Support",
 *       agentSubtitle: null,        // null = language default
 *       greeting: null,             // null = language default
 *       options: null,              // null = language defaults | [] = hide | ["Opt 1", "Opt 2"]
 *       accentColor: "#25D366",
 *       headerColor: "#25D366",
 *       logoInitials: "CS",
 *       logo: null,                 // image URL or null for initials
 *       position: "right",          // "right" | "left"
 *       bubbleSize: 60,
 *       language: "auto",           // auto | en | tr | de | fr | es | pt | ru | ar | zh | ja
 *     };
 *   </script>
 *   <script src="wa-widget.js"></script>
 */

(function () {
  "use strict";

  var LANGS = {
    en: { subtitle: "Typically replies within an hour", greeting: "Hi there! 👋\n\nHow can we help you today?", placeholder: "Type a message…", options: ["📦 Track my order", "💬 General inquiry", "🔧 Technical support"] },
    tr: { subtitle: "Genellikle bir saat içinde yanıt verir", greeting: "Merhaba! 👋\n\nSize nasıl yardımcı olabiliriz?", placeholder: "Bir mesaj yazın…", options: ["📦 Siparişimi takip et", "💬 Genel soru", "🔧 Teknik destek"] },
    de: { subtitle: "Antwortet in der Regel innerhalb einer Stunde", greeting: "Hallo! 👋\n\nWie können wir Ihnen helfen?", placeholder: "Nachricht eingeben…", options: ["📦 Bestellung verfolgen", "💬 Allgemeine Anfrage", "🔧 Technischer Support"] },
    fr: { subtitle: "Répond généralement en moins d'une heure", greeting: "Bonjour! 👋\n\nComment pouvons-nous vous aider?", placeholder: "Écrire un message…", options: ["📦 Suivre ma commande", "💬 Renseignement général", "🔧 Support technique"] },
    es: { subtitle: "Normalmente responde en menos de una hora", greeting: "¡Hola! 👋\n\n¿Cómo podemos ayudarte?", placeholder: "Escribe un mensaje…", options: ["📦 Rastrear mi pedido", "💬 Consulta general", "🔧 Soporte técnico"] },
    pt: { subtitle: "Normalmente responde em menos de uma hora", greeting: "Olá! 👋\n\nComo podemos ajudar você?", placeholder: "Digite uma mensagem…", options: ["📦 Rastrear pedido", "💬 Consulta geral", "🔧 Suporte técnico"] },
    ru: { subtitle: "Обычно отвечает в течение часа", greeting: "Привет! 👋\n\nКак мы можем вам помочь?", placeholder: "Написать сообщение…", options: ["📦 Отследить заказ", "💬 Общий вопрос", "🔧 Техническая поддержка"] },
    ar: { subtitle: "يرد عادةً خلال ساعة", greeting: "مرحباً! 👋\n\nكيف يمكننا مساعدتك؟", placeholder: "اكتب رسالة…", options: ["📦 تتبع طلبي", "💬 استفسار عام", "🔧 الدعم الفني"], rtl: true },
    zh: { subtitle: "通常在一小时内回复", greeting: "您好！👋\n\n我们能为您做什么？", placeholder: "输入消息…", options: ["📦 追踪我的订单", "💬 一般咨询", "🔧 技术支持"] },
    ja: { subtitle: "通常1時間以内に返信します", greeting: "こんにちは！👋\n\nどのようにお手伝いできますか？", placeholder: "メッセージを入力…", options: ["📦 注文を追跡する", "💬 一般的なお問い合わせ", "🔧 技術サポート"] },
  };

  var EMOJI_CATS = [
    { label: "SMILEYS & PEOPLE", emojis: ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🤐","😐","😑","😶","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤧","🥵","🥶","😵","🤯","🤠","🥳","😎","🤓","🧐","😕","😟","🙁","😮","😯","😲","😳","🥺","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿"] },
    { label: "GESTURES", emojis: ["👋","🤚","🖐","✋","🖖","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦶","👂","🦻","👃"] },
    { label: "HEARTS & SYMBOLS", emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☯️","🕉️","🔥","✨","⭐","🌟","💫","⚡","❄️","🌈","💯","✅","❌","💡","🎉","🎊","🏆","🥇"] },
    { label: "OBJECTS", emojis: ["📦","📧","📞","📱","💻","🖥️","🖨️","⌨️","🖱️","🔧","🔨","🛠️","⚙️","🔑","🔒","🔓","💬","📝","📋","📌","📍","🗂️","📁","📂","🗒️","📅","⏰","🕐","💰","💳","🛒","🚀"] },
  ];

  var WA_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cg opacity='0.06'%3E%3Cpath fill='%23a0a0a0' d='M30 10c-11 0-20 9-20 20s9 20 20 20 20-9 20-20S41 10 30 10zm8.5 27.5c-.3.4-.9.6-1.4.3-3.8-2.3-8.6-2.9-14.3-1.6-.5.1-1-.2-1.1-.7-.1-.5.2-1 .7-1.1 6.2-1.4 11.5-.8 15.8 1.8.5.3.6.8.3 1.3zm2.3-5c-.4.5-1.1.7-1.6.3-4.4-2.7-11-3.5-16.2-1.9-.6.2-1.3-.1-1.5-.7-.2-.6.1-1.3.7-1.5 5.9-1.8 13.2-1 18.3 2.2.5.4.7 1.1.3 1.6zm.2-5.2c-5.3-3.1-14-3.4-19.1-1.9-.7.2-1.5-.2-1.7-.9-.2-.7.2-1.5.9-1.7 5.8-1.8 15.4-1.4 21.4 2.1.7.4.9 1.3.5 1.9-.4.7-1.3.9-2 .5z'/%3E%3C/g%3E%3C/svg%3E\")";

  function detectLang() {
    var l = (navigator.language || "en").toLowerCase().split("-")[0];
    return LANGS[l] ? l : "en";
  }

  function svgWA() {
    return '<svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
  }

  function svgClose(size, color) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="' + (color || "white") + '" stroke-width="2.5" stroke-linecap="round" width="' + (size || 22) + '" height="' + (size || 22) + '"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  function svgSend(active) {
    return '<svg viewBox="0 0 24 24" fill="' + (active ? "white" : "#adb5bd") + '" width="22" height="22"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
  }

  function nowTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function s(styles) {
    return Object.keys(styles).map(function (k) {
      var prop = k.replace(/([A-Z])/g, "-$1").toLowerCase();
      return prop + ":" + styles[k];
    }).join(";");
  }

  function init() {
    var existing = document.getElementById("waw-root");
    if (existing) existing.parentNode.removeChild(existing);

    var cfg = Object.assign({
      phoneNumber: "", agentName: "Customer Support",
      agentSubtitle: null, greeting: null, options: null,
      accentColor: "#25D366", headerColor: "#25D366",
      logoInitials: "CS", logo: null,
      position: "right", bubbleSize: 60, language: "auto",
    }, window.WAWidgetConfig || {});

    var lang = cfg.language === "auto" ? detectLang() : (LANGS[cfg.language] ? cfg.language : "en");
    var t = LANGS[lang];
    var subtitle = cfg.agentSubtitle !== null ? cfg.agentSubtitle : t.subtitle;
    var greetingText = cfg.greeting !== null ? cfg.greeting : t.greeting;
    var opts = cfg.options !== null ? cfg.options : t.options;
    var greetLines = greetingText.split("\n").filter(function (l) { return l.trim(); });
    var acc = cfg.accentColor;
    var bs = cfg.bubbleSize;
    var posKey = cfg.position === "left" ? "left" : "right";

    var font = "'Inter','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif";

    // Inject styles
    var style = document.createElement("style");
    style.textContent = [
      "@keyframes waw-fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}",
      "@keyframes waw-bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}",
      "@keyframes waw-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}",
      "#waw-root *{box-sizing:border-box;margin:0;padding:0}",
      "#waw-root ::-webkit-scrollbar{width:4px}",
      "#waw-root ::-webkit-scrollbar-track{background:transparent}",
      "#waw-root ::-webkit-scrollbar-thumb{background:#ccc;border-radius:4px}",
      ".waw-anim{animation:waw-fadeIn 0.35s ease}",
    ].join("\n");
    document.head.appendChild(style);

    // Inject Inter font
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);

    // Root container
    var root = document.createElement("div");
    root.id = "waw-root";
    root.style.cssText = s({
      position: "fixed", bottom: "24px", zIndex: "9999",
      fontFamily: font,
    });
    root.style[posKey] = "24px";
    document.body.appendChild(root);

    // ── Popup ──
    var popup = document.createElement("div");
    popup.style.cssText = s({
      position: "absolute",
      bottom: (bs + 14) + "px",
      width: "min(340px, calc(100vw - 48px))",
      borderRadius: "16px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      transform: "scale(0.85) translateY(20px)",
      opacity: "0",
      pointerEvents: "none",
      transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
      transformOrigin: "bottom " + posKey,
    });
    popup.style[posKey] = "0";
    root.appendChild(popup);

    // Header
    var avatarHtml = cfg.logo
      ? '<img src="' + cfg.logo + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">'
      : cfg.logoInitials;
    var header = document.createElement("div");
    header.style.cssText = s({ background: cfg.headerColor, padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" });
    header.innerHTML =
      '<div style="position:relative;flex-shrink:0">' +
        '<div style="' + s({ width: "46px", height: "46px", borderRadius: "50%", background: "linear-gradient(135deg,#128C7E,#25D366)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", color: "white", fontWeight: "700", border: "2px solid rgba(255,255,255,0.35)", overflow: "hidden" }) + '">' + avatarHtml + '</div>' +
        '<div style="position:absolute;bottom:1px;right:1px;width:11px;height:11px;border-radius:50%;background:#acf583;border:2px solid ' + cfg.headerColor + '"></div>' +
      '</div>' +
      '<div style="flex:1;min-width:0">' +
        '<div style="color:white;font-weight:700;font-size:15px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + cfg.agentName + '</div>' +
        '<div style="color:rgba(255,255,255,0.85);font-size:12.5px;margin-top:2px">' + subtitle + '</div>' +
      '</div>' +
      '<button id="waw-close" style="background:none;border:none;cursor:pointer;padding:4px;display:flex;opacity:0.85;flex-shrink:0">' + svgClose(20) + '</button>';
    popup.appendChild(header);

    // Chat body
    var body = document.createElement("div");
    body.style.cssText = s({
      background: "#ece5dd",
      backgroundImage: WA_BG,
      backgroundSize: "60px 60px",
      minHeight: "320px", maxHeight: "400px",
      overflowY: "auto",
      padding: "20px 14px 12px",
      display: "flex", flexDirection: "column", gap: "10px",
    });
    popup.appendChild(body);

    // Input bar
    var inputBar = document.createElement("div");
    inputBar.style.cssText = s({ background: "#f0f2f5", padding: "10px 12px", display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid #e9edef", position: "relative" });
    inputBar.innerHTML =
      '<button id="waw-emoji-btn" style="background:none;border:none;cursor:pointer;font-size:22px;padding:2px;flex-shrink:0;transition:transform 0.15s;line-height:1">😊</button>' +
      '<input id="waw-input" type="text" placeholder="' + t.placeholder + '" style="' + s({ flex: "1", border: "none", background: "white", borderRadius: "24px", padding: "9px 15px", fontSize: "14px", color: "#111b21", outline: "none", fontFamily: font, boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }) + '">' +
      '<button id="waw-send" style="background:#e9edef;border:none;border-radius:50%;width:38px;height:38px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background 0.2s">' + svgSend(false) + '</button>';
    popup.appendChild(inputBar);

    // FAB
    var fab = document.createElement("button");
    fab.style.cssText = s({ width: bs + "px", height: bs + "px", borderRadius: "50%", background: acc, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)", position: "relative" });
    fab.innerHTML =
      '<span id="waw-icon-wa" style="position:absolute;display:flex;align-items:center;justify-content:center;transition:opacity 0.2s,transform 0.25s">' + svgWA() + '</span>' +
      '<span id="waw-icon-x" style="position:absolute;display:flex;align-items:center;justify-content:center;transition:opacity 0.2s,transform 0.25s;opacity:0;transform:scale(0.5) rotate(90deg)">' + svgClose(24) + '</span>';
    root.appendChild(fab);

    // Notification badge
    var notif = document.createElement("div");
    notif.style.cssText = s({ position: "absolute", top: "-8px", right: "-4px", background: "#ff3b30", color: "white", fontSize: "11px", fontWeight: "700", width: "20px", height: "20px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.25)", animation: "waw-pulse 2s ease-in-out infinite", zIndex: "10" });
    notif.textContent = "1";
    fab.appendChild(notif);

    // ── State ──
    var isOpen = false, greetingShown = false, emojiOpen = false;
    var input = root.querySelector("#waw-input");
    var sendBtn = root.querySelector("#waw-send");
    var emojiBtn = root.querySelector("#waw-emoji-btn");
    var closeBtn = root.querySelector("#waw-close");
    var iconWA = root.querySelector("#waw-icon-wa");
    var iconX = root.querySelector("#waw-icon-x");
    var pickerEl = null;

    function openWidget() {
      isOpen = true;
      popup.style.transform = "scale(1) translateY(0)";
      popup.style.opacity = "1";
      popup.style.pointerEvents = "all";
      fab.style.background = "#128C7E";
      iconWA.style.opacity = "0";
      iconWA.style.transform = "scale(0.5) rotate(-90deg)";
      iconX.style.opacity = "1";
      iconX.style.transform = "scale(1) rotate(0deg)";
      notif.style.display = "none";
      if (!greetingShown) showGreeting();
    }

    function closeWidget() {
      isOpen = false;
      popup.style.transform = "scale(0.85) translateY(20px)";
      popup.style.opacity = "0";
      popup.style.pointerEvents = "none";
      fab.style.background = acc;
      iconWA.style.opacity = "1";
      iconWA.style.transform = "scale(1) rotate(0deg)";
      iconX.style.opacity = "0";
      iconX.style.transform = "scale(0.5) rotate(90deg)";
      if (emojiOpen) closeEmojiPicker();
    }

    fab.addEventListener("click", function () { isOpen ? closeWidget() : openWidget(); });
    closeBtn.addEventListener("click", closeWidget);

    // Greeting
    function addTyping() {
      var wrap = document.createElement("div");
      wrap.id = "waw-typing";
      wrap.style.cssText = s({ display: "flex", justifyContent: "flex-start" });
      wrap.innerHTML =
        '<div style="' + s({ background: "white", borderRadius: "0 12px 12px 12px", padding: "12px 16px", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", display: "flex", gap: "4px", alignItems: "center" }) + '">' +
          [0, 1, 2].map(function (j) {
            return '<div style="width:7px;height:7px;border-radius:50%;background:#8696a0;animation:waw-bounce 1.2s ease-in-out ' + (j * 0.2) + 's infinite"></div>';
          }).join("") +
        '</div>';
      body.appendChild(wrap);
      scrollBottom();
    }

    function removeTyping() {
      var el = document.getElementById("waw-typing");
      if (el) el.parentNode.removeChild(el);
    }

    function addAgentBubble(lines) {
      var wrap = document.createElement("div");
      wrap.className = "waw-anim";
      wrap.style.cssText = s({ display: "flex", justifyContent: "flex-start" });
      var inner = '<div style="' + s({ background: "white", borderRadius: "0 12px 12px 12px", padding: "10px 14px 22px", maxWidth: "82%", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", position: "relative", fontSize: "14.5px", lineHeight: "1.5", color: "#111b21" }) + '">';
      lines.forEach(function (line, i) {
        inner += '<div style="color:' + (i === 1 ? acc : "#111b21") + ';font-weight:' + (i === 1 ? "500" : "400") + '">' + line + '</div>';
      });
      inner += '<div style="position:absolute;bottom:6px;right:10px;font-size:11px;color:#8696a0">' + nowTime() + '</div></div>';
      wrap.innerHTML = inner;
      body.appendChild(wrap);
      scrollBottom();
    }

    function addUserBubble(text) {
      var wrap = document.createElement("div");
      wrap.className = "waw-anim";
      wrap.style.cssText = s({ display: "flex", justifyContent: "flex-end" });
      wrap.innerHTML = '<div style="' + s({ background: "#dcf8c6", borderRadius: "12px 0 12px 12px", padding: "9px 13px", maxWidth: "78%", fontSize: "14px", color: "#111b21", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }) + '">' + text.replace(/</g, "&lt;") + '</div>';
      body.appendChild(wrap);
      scrollBottom();
    }

    function addOptions() {
      if (!opts || opts.length === 0) return;
      var wrap = document.createElement("div");
      wrap.className = "waw-anim";
      wrap.style.cssText = s({ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" });
      opts.forEach(function (opt) {
        var btn = document.createElement("button");
        btn.style.cssText = s({ background: "white", border: "1.5px solid " + acc, borderRadius: "10px", padding: "10px 18px", fontSize: "14px", color: "#111b21", cursor: "pointer", textAlign: "left", boxShadow: "0 1px 2px rgba(0,0,0,0.08)", transition: "background 0.15s", fontFamily: font, width: "100%" });
        btn.textContent = opt;
        btn.addEventListener("mouseenter", function () { btn.style.background = "#f0fdf4"; });
        btn.addEventListener("mouseleave", function () { btn.style.background = "white"; });
        btn.addEventListener("click", function () {
          var clean = opt.replace(/^[\u{1F300}-\u{1FAFF}\s]+/u, "").trim() || opt;
          openWA(clean);
        });
        wrap.appendChild(btn);
      });
      body.appendChild(wrap);
      scrollBottom();
    }

    function showGreeting() {
      greetingShown = true;
      addTyping();
      setTimeout(function () {
        removeTyping();
        addAgentBubble(greetLines);
        setTimeout(addOptions, 600);
      }, 1800);
    }

    function scrollBottom() {
      body.scrollTop = body.scrollHeight;
    }

    // Send message
    function sendMessage() {
      var val = input.value.trim();
      if (!val) return;
      addUserBubble(val);
      input.value = "";
      updateSendBtn(false);
      setTimeout(function () { openWA(val); }, 900);
    }

    function updateSendBtn(active) {
      sendBtn.style.background = active ? acc : "#e9edef";
      sendBtn.innerHTML = svgSend(active);
    }

    input.addEventListener("input", function () { updateSendBtn(input.value.trim().length > 0); });
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") sendMessage(); });
    input.addEventListener("click", function () { if (emojiOpen) closeEmojiPicker(); });
    sendBtn.addEventListener("click", sendMessage);

    // WhatsApp link
    function openWA(text) {
      var num = cfg.phoneNumber.replace(/\D/g, "");
      window.open("https://wa.me/" + num + (text ? "?text=" + encodeURIComponent(text) : ""), "_blank");
    }

    // Emoji picker
    function buildPicker() {
      pickerEl = document.createElement("div");
      pickerEl.style.cssText = s({ position: "absolute", bottom: "58px", left: "0", background: "white", borderRadius: "14px", boxShadow: "0 4px 28px rgba(0,0,0,0.15)", padding: "12px 10px 8px", width: "316px", maxHeight: "280px", overflowY: "auto", animation: "waw-fadeIn 0.2s ease", zIndex: "10" });
      EMOJI_CATS.forEach(function (cat) {
        var label = document.createElement("div");
        label.style.cssText = s({ fontSize: "10.5px", fontWeight: "700", color: "#8696a0", letterSpacing: "0.06em", marginBottom: "6px", paddingLeft: "2px" });
        label.textContent = cat.label;
        pickerEl.appendChild(label);
        var grid = document.createElement("div");
        grid.style.cssText = s({ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: "2px", marginBottom: "8px" });
        cat.emojis.forEach(function (em) {
          var btn = document.createElement("button");
          btn.style.cssText = s({ background: "none", border: "none", fontSize: "22px", cursor: "pointer", padding: "4px 2px", borderRadius: "6px", transition: "background 0.1s", lineHeight: "1.3" });
          btn.textContent = em;
          btn.addEventListener("mouseenter", function () { btn.style.background = "#f0f2f5"; });
          btn.addEventListener("mouseleave", function () { btn.style.background = "none"; });
          btn.addEventListener("click", function () {
            input.value += em;
            input.focus();
            updateSendBtn(input.value.trim().length > 0);
            closeEmojiPicker();
          });
          grid.appendChild(btn);
        });
        pickerEl.appendChild(grid);
      });
      inputBar.appendChild(pickerEl);
    }

    function openEmojiPicker() {
      emojiOpen = true;
      emojiBtn.style.transform = "scale(1.2)";
      if (!pickerEl) buildPicker();
      pickerEl.style.display = "block";
    }

    function closeEmojiPicker() {
      emojiOpen = false;
      emojiBtn.style.transform = "scale(1)";
      if (pickerEl) pickerEl.style.display = "none";
    }

    emojiBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      emojiOpen ? closeEmojiPicker() : openEmojiPicker();
    });

    document.addEventListener("click", function (e) {
      if (emojiOpen && pickerEl && !pickerEl.contains(e.target) && e.target !== emojiBtn) closeEmojiPicker();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
