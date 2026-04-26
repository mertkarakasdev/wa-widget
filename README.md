<div align="center">

# WA Widget — Free WhatsApp Chat Widget for Any Website

<img src="https://wa-widget.karakas.io/og-image.png" alt="WA Widget — WhatsApp chat widget preview" width="600" />

**Add a WhatsApp chat button to any website in 2 lines of code.**  
Free, open source, zero dependencies — works with HTML, React, Vue, Next.js, and more.

<p>
  <a href="https://wa-widget.karakas.io"><img src="https://img.shields.io/badge/demo-live-25D366?style=flat" alt="Live Demo" /></a>
  <a href="https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js"><img src="https://img.shields.io/badge/CDN-jsDelivr-orange" alt="jsDelivr CDN" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/size-~8kb-brightgreen" alt="~8kb gzipped" />
  <img src="https://img.shields.io/badge/dependencies-none-brightgreen" alt="zero dependencies" />
  <img src="https://img.shields.io/badge/languages-10-blue" alt="10 built-in languages" />
</p>

</div>

## What is WA Widget?

WA Widget is a free, open source WhatsApp chat widget you can add to any website. It renders a floating WhatsApp button that opens a chat panel with a greeting message, quick-reply options, and an emoji picker — all configurable via a single JavaScript object.

Works with **plain HTML**, **React**, **Vue**, **Next.js**, **Angular**, **PHP**, **Laravel**, **Django**, and any other stack that renders a web page. No npm install, no build step, no account registration required.

## Why WA Widget?

- **Zero dependencies** — pure vanilla JS, ~8kb. No React, no jQuery, no bundler.
- **Drop-in setup** — one config script + one script tag. Done.
- **10 built-in languages** — EN, TR, DE, FR, ES, PT, RU, AR, ZH, JA. Auto-detects browser language.
- **RTL support** — full right-to-left layout for Arabic, auto-detected.
- **Fully customizable** — colors, agent name, logo, position, quick-reply options.
- **Framework agnostic** — works anywhere a `<script>` tag runs.
- **Free & open source** — MIT license. No watermarks, no paid plans, no limits.

## Quick Start — Add WhatsApp Chat to Any Website

Add before `</body>`:

```html
<!-- 1. Configure -->
<script>
  window.WAWidgetConfig = {
    phoneNumber: "+905551234567",
    language:    "auto",
    agentName:   "Customer Support",
    accentColor: "#25D366",
    position:    "right",
    options: [
      "📦 Track my order",
      "💬 General inquiry",
      "🔧 Technical support",
    ],
  };
</script>

<!-- 2. Load the widget -->
<script src="https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js"></script>
```

Or self-host — copy `wa-widget.js` to your project:

```html
<script src="/wa-widget.js"></script>
```

## Framework Examples

### Add WhatsApp to a React App

```jsx
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.WAWidgetConfig = {
      phoneNumber:  "+905551234567",
      language:     "auto",
      agentName:    "Customer Support",
      accentColor:  "#25D366",
      position:     "right",
    };
    const script = document.createElement("script");
    script.src = "/wa-widget.js";
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return <YourApp />;
}
```

→ [Full React guide](https://wa-widget.karakas.io/react)

### Add WhatsApp to a Vue App

```js
import { onMounted } from "vue";

onMounted(() => {
  window.WAWidgetConfig = {
    phoneNumber:  "+905551234567",
    language:     "auto",
    agentName:    "Customer Support",
    accentColor:  "#25D366",
    position:     "right",
  };
  const script = document.createElement("script");
  script.src = "/wa-widget.js";
  document.body.appendChild(script);
});
```

→ [Full Vue guide](https://wa-widget.karakas.io/vue)

### Add WhatsApp to a Next.js App

```jsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script id="wa-config" strategy="beforeInteractive">{`
          window.WAWidgetConfig = {
            phoneNumber:  "+905551234567",
            language:     "auto",
            agentName:    "Customer Support",
            accentColor:  "#25D366",
            position:     "right",
          }
        `}</Script>
        <Script src="/wa-widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
```

→ [Full Next.js guide](https://wa-widget.karakas.io/nextjs)

## Configuration

All options are optional except `phoneNumber`.

| Option | Type | Default | Description |
|---|---|---|---|
| `phoneNumber` | `string` | `""` | WhatsApp number with country code (`"+905551234567"`) |
| `language` | `string` | `"auto"` | `"auto"` or a code: `en` `tr` `de` `fr` `es` `pt` `ru` `ar` `zh` `ja` |
| `agentName` | `string` | `"Customer Support"` | Display name shown in the chat header |
| `agentSubtitle` | `string\|null` | `null` | Subtitle text — `null` uses the language default |
| `greeting` | `string\|null` | `null` | Greeting message, `\n` for line breaks — `null` uses language default |
| `logo` | `string\|null` | `null` | Avatar image URL — `null` shows initials |
| `logoInitials` | `string` | `"CS"` | Initials shown when no logo is set |
| `accentColor` | `string` | `"#25D366"` | Color for buttons and borders |
| `headerColor` | `string` | `"#25D366"` | Header background color |
| `options` | `string[]\|null` | `null` | Quick-reply buttons — `null` = language defaults, `[]` = hide |
| `position` | `string` | `"right"` | `"right"` or `"left"` |
| `bubbleSize` | `number` | `60` | Floating button size in px |

## Supported Languages

| Code | Language | RTL |
|---|---|---|
| `en` | English | — |
| `tr` | Türkçe | — |
| `de` | Deutsch | — |
| `fr` | Français | — |
| `es` | Español | — |
| `pt` | Português | — |
| `ru` | Русский | — |
| `ar` | العربية | ✓ |
| `zh` | 中文 | — |
| `ja` | 日本語 | — |

## Links

- [Live Demo](https://wa-widget.karakas.io)
- [How to add WhatsApp to any website](https://wa-widget.karakas.io/blog/how-to-add-whatsapp-to-website)
- [CDN (jsDelivr)](https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js)

## Contributing

Pull requests are welcome. For significant changes please open an issue first.

## Author

Built by [Mert Karakaş](https://karakas.io)

## Disclaimer

This project is not affiliated with, authorized by, or in any way officially connected with WhatsApp or Meta. "WhatsApp" and related marks are registered trademarks of their respective owners.

## License

MIT — free for personal and commercial use. See [LICENSE](LICENSE) for details.
