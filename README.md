<div align="center">

# WA Widget
<img src="https://wa-widget.karakas.io/og-image.png" alt="WA Widget preview" width="600" />

**Lightweight WhatsApp chat widget for any website.**  
Drop in two script tags and you're live — zero dependencies, fully customizable.

<p>
  <a href="https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js"><img src="https://img.shields.io/badge/CDN-jsDelivr-orange" alt="jsDelivr" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/size-~8kb-brightgreen" alt="~8kb" />
  <img src="https://img.shields.io/badge/dependencies-none-brightgreen" alt="zero dependencies" />
  <img src="https://img.shields.io/badge/languages-10-blue" alt="10 languages" />
</p>

</div>

## About

WA Widget is a plug‑and‑play WhatsApp chat button for any website. It renders a floating action button that opens a chat panel — greeting message, quick‑reply options, emoji picker included. Works in plain HTML, React, Vue, Next.js, or any server‑side stack (PHP, Laravel, Django…). No build step required.

## Links

- [Demo][demo]
- [CDN (jsDelivr)][cdn]
- [GitHub][github]

## Quick Start

Add before `</body>`:

```html
<script>
  window.WAWidgetConfig = {
    phoneNumber: "+905551234567",
    language:    "auto",
    agentName:   "Customer Support",
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js"></script>
```

Or self‑host — just copy `wa-widget.js` to your project:

```html
<script src="/wa-widget.js"></script>
```

## Framework Examples

### React

```jsx
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.WAWidgetConfig = {
      phoneNumber:    "+905551234567",
      language:       "auto",
      agentName:      "Customer Support",
      agentSubtitle:  null,
      greeting:       null,
      options:        null,
      accentColor:    "#25D366",
      headerColor:    "#25D366",
      logoInitials:   "CS",
      logo:           null,
      position:       "right",
      bubbleSize:     60,
    };
    const script = document.createElement("script");
    script.src = "/wa-widget.js";
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return <YourApp />;
}
```

### Vue

```js
import { onMounted } from "vue";

onMounted(() => {
  window.WAWidgetConfig = {
    phoneNumber:    "+905551234567",
    language:       "auto",
    agentName:      "Customer Support",
    agentSubtitle:  null,
    greeting:       null,
    options:        null,
    accentColor:    "#25D366",
    headerColor:    "#25D366",
    logoInitials:   "CS",
    logo:           null,
    position:       "right",
    bubbleSize:     60,
  };
  const script = document.createElement("script");
  script.src = "/wa-widget.js";
  document.body.appendChild(script);
});
```

### Next.js

```jsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script id="wa-config" strategy="beforeInteractive">{`
          window.WAWidgetConfig = {
            phoneNumber:    "+905551234567",
            language:       "auto",
            agentName:      "Customer Support",
            agentSubtitle:  null,
            greeting:       null,
            options:        null,
            accentColor:    "#25D366",
            headerColor:    "#25D366",
            logoInitials:   "CS",
            logo:           null,
            position:       "right",
            bubbleSize:     60,
          }
        `}</Script>
        <Script src="/wa-widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
```

## Configuration

All options are optional except `phoneNumber`.

| Option | Type | Default | Description |
|---|---|---|---|
| `phoneNumber` | `string` | `""` | WhatsApp number with country code (`"+905551234567"`) |
| `language` | `string` | `"auto"` | `"auto"` or a language code: `en` `tr` `de` `fr` `es` `pt` `ru` `ar` `zh` `ja` |
| `agentName` | `string` | `"Customer Support"` | Display name shown in the header |
| `agentSubtitle` | `string\|null` | `null` | Subtitle text — `null` uses the language default |
| `greeting` | `string\|null` | `null` | Greeting message, use `\n` for line breaks — `null` uses the language default |
| `logo` | `string\|null` | `null` | Avatar image URL — `null` shows initials |
| `logoInitials` | `string` | `"CS"` | Initials shown when no logo is set |
| `accentColor` | `string` | `"#25D366"` | Color for buttons and borders |
| `headerColor` | `string` | `"#25D366"` | Header background color |
| `options` | `string[]\|null` | `null` | Quick‑reply buttons — `null` = language defaults, `[]` = hide |
| `position` | `string` | `"right"` | `"right"` or `"left"` |
| `bubbleSize` | `number` | `60` | Floating button size in px |

## Languages

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

## Contributing

Pull requests are welcome. For significant changes please open an issue first to discuss what you'd like to change.

## Author

Built by [Mert Karakaş][author] — [karakas.io][website]

## Disclaimer

This project is not affiliated with, authorized by, or in any way officially connected with WhatsApp or Meta. "WhatsApp" and related marks are registered trademarks of their respective owners.

## License

MIT — free for personal and commercial use. See [LICENSE][license] for details.

[demo]: https://mertkarakasdev.github.io/wa-widget/
[cdn]: https://cdn.jsdelivr.net/gh/mertkarakasdev/wa-widget@latest/wa-widget.js
[github]: https://github.com/mertkarakasdev/wa-widget
[license]: LICENSE
[author]: https://github.com/mertkarakasdev
[website]: https://karakas.io
