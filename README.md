# MirAI 3

**MirAI, more than AI.**

A simple, lightweight, and responsive web interface to interact directly with the Google Gemini API — now smarter, more personal, and more powerful than ever.

![Project](https://img.shields.io/badge/Type-Web%20App-blue)
![Languages](https://img.shields.io/badge/made%20with-HTML%2C%20CSS%2C%20JS-orange)
![Version](https://img.shields.io/badge/Version-3.4.0-brightgreen?logo=googlegemini&logoColor=ffce00&labelColor=%23000)

![Follow IG](https://img.shields.io/badge/Follow-Instagram_MirAI-405DE6?style=flat&logo=instagram&logoColor=C13584&labelColor=833AB4)
![Follow WA CH](https://img.shields.io/badge/Follow-WhatsApp_Channel_MirAI-%23FFFFFF?style=flat&logo=Whatsapp&logoColor=075E54&labelColor=25D366)
![Subscribe CH YT](https://img.shields.io/badge/Subscribe-Channel_MirAI-282828?style=flat&logo=youtube&logoColor=FF0000&labelColor=FFFFFF)

<p align="center">
  <img src="Assets/MirAI_v3.png" width="600" alt="MirAI 3 Screenshot">
</p>

---

## ✨ What's New in MirAI 3.4

- ☁️ **Google Drive Backup & Auto‑Sync** – Connect your Drive account and enjoy **automatic backups every 10 minutes**. Restore previous sessions with a single click. Backups are stored in Drive’s private `appDataFolder` and older ones are automatically rotated.
- 🔁 **Cross‑Device Continuity** – Log in to your Google account (Firebase) **or** connect Drive – or both. Your chat history, API keys, personas, accent colours, and search engine configs follow you everywhere.
- 📎 **Multi‑Format Attachments** – The `+` button now supports images, audio (MP3, WAV, OGG), and documents (PDF, DOCX, TXT, MD, JSON) with inline previews.
- 🔇 **TTS Stop Control** – Click the speaker icon again while the AI is speaking to stop immediately.
- 🧠 **Improved Memory Management** – Chat trimming only happens when you save settings or exceed the limit, with a clear warning.
- 🔍 **Smart Search Mode** – Automatically switches between external search engines (SearchAPI.io, Google, DuckDuckGo, Wikipedia) and AI knowledge base when no engines are enabled.
- 🎨 **Custom Accent Color** – Choose any hex colour; dark colours are filtered to maintain readability.
- 🔐 **Encrypted Backup (.medf)** – Export your entire chat history, settings, and API keys with password protection and authenticity signature.
- ⚡ **Gemini 2.5 Flash** – Default model is now `gemini-2.5-flash` for faster, more reliable responses.
- 🌍 **Better TTS Language Support** – Strips markdown characters before speaking; respects Indonesian, English (US/UK), and Japanese.

*(For the complete update history, see the [Changelog](Docs/CHANGELOG.md).)*

---

## ✨ Key Features (MirAI 3)

* **💾 Session Persistence** – Your conversation is automatically saved in your browser. Pick up where you left off, anytime.
* **☁️ Google Drive Backup & Auto‑Sync** – Connect your Drive account for scheduled (every 10 min) and manual backups; restore from any previous backup.
* **✅ Responsive Chat Interface** – Comfortable layout for both mobile and desktop.
* **🎭 Customizable AI Persona** – Choose between Default (Relaxed & Casual), Formal, Creative, or write your own custom persona.
* **🌐 Multi-language Support** – Indonesian, English (US & UK), and Japanese.
* **🔑 API Key Configuration** – Enter your own Gemini API key directly from the settings menu.
* **🚀 Enhanced Slash Commands & Tools Menu** – Use the `+` menu or type commands like `/translate`, `/summarize`, `/code`, and `/fix`. Real‑time suggestions as you type.
* **🖼️ Multimodal Input** – Upload images, audio, and documents (PDF, TXT, MD, JSON, DOCX) alongside your text prompts.
* **🔊 Text-to-Speech (TTS)** – Click the speaker icon to read the AI’s response aloud; click again to stop.
* **🛑 Stop Generation** – Immediately halt the AI’s response when needed.
* **📝 Markdown Parsing** – Responses with formatting (code blocks, lists, tables) are displayed correctly.
* **⏰ Time-aware Context** – The AI knows the current date and time for more relevant answers.
* **📤 Backup & Restore (Local)** – Export/import to encrypted `.medf` or plain `.mdf/.json` files with authenticity verification.
* **📲 Progressive Web App (PWA)** – Install MirAI as a native‑like app on your device with offline capabilities.
* **🔒 Encrypted Config System** – Secure `.medf` file format with authenticity signatures for API key storage.
* **⚠️ Public API Usage Limits** – Intelligent tracking and warnings for fair usage of the public API key.
* **📋 One-Click Copy** – Easily copy AI responses to clipboard with proper attribution.
* **🌐 Connection Status Indicator** – Visual online/offline indicator.
* **🔄 Model Switching** – Support for Gemini 2.5 Flash (stable) and Gemini 3 Flash Preview (beta) via URL parameters.
* **🔍 Advanced Search Integration** – Powerful `/search` command with multiple search engines (SearchAPI.io, Google, DuckDuckGo, Wikipedia) **or** AI Knowledge Base fallback.
* **⚙️ Configurable Search Engines** – Enable/disable individual search engines with API key configuration.
* **🎨 Custom Accent Color** – Personalise the interface with your own hex colour; automatic readability checks.

---

## 🚀 Try MirAI 3.4 now!

* **<a href="https://allwaysevermirai.netlify.app" target="_blank">➡️ Try the Web Version (Netlify)</a>**
* **<a href="https://github.com/Allwaysever/MirAI/raw/main/Pages/chat.html" target="_blank">⬇️ Download HTML File (Offline Version)</a>**
* **<a href="https://allwaysevermirai.netlify.app/pwa" target="_blank">📱 Install as PWA (TWA Android)</a>**
* **<a href="https://allwaysevermirai.netlify.app/chat?betamodel" target="_blank">🧪 Try Beta Model (Gemini 3 Flash Preview)</a>**

---

## 🛠️ Setup (Using Your Own API Key)

For the best performance and security, it is highly recommended to use your own Google Gemini API Key.

<details>
<summary><strong>➡️ Click here for a complete tutorial on obtaining an API Key.</strong></summary>
<br>

[ same existing tutorial content – unchanged ]

</details>

Or watch the video tutorial:  
<a href="https://youtu.be/fgjnE2wL8qk"><img src="https://img.youtube.com/vi/fgjnE2wL8qk/hqdefault.jpg" alt="Tutorial: How to Apply your API Key" width="640" height="360"/></a>

---

## 🔧 Advanced Features

### ☁️ Google Drive Sync (New in 3.4)
- **Connect Drive** – Authenticate using your Google account (OAuth 2.0) and grant access to the `appDataFolder` (hidden, only accessible by MirAI).
- **Manual Backup** – Click “Backup to Drive” to instantly save your entire app state (chat history, settings, API keys, search config, accent colour).
- **Restore** – Choose any previous backup from the list and restore it with a single click.
- **Auto‑Sync** – Every 10 minutes, MirAI automatically uploads a backup if changes are detected (SHA‑256 hash comparison). Older automatic backups are rotated to keep at most 5 files.

### 📎 Multi‑Format Attachments
- **Images:** JPEG, PNG, WebP – previewed inline.
- **Audio:** MP3, WAV, OGG – labelled with file name.
- **Documents:** PDF, TXT, MD, JSON, DOCX – shown with file icon and name.
- All attachments are processed with Gemini’s multimodal API.

### 🔇 TTS with Stop Control
- Click the speaker icon to read the AI’s response aloud.
- Click again while speaking to **stop**.
- Strips markdown characters before speaking for clean voice output.

### 📤 Backup & Restore System
- **Local Export/Import** – Save to `.medf` (encrypted + signature) or `.mdf/.json` (plain).
- **Drive Backup** – Cloud storage with auto‑sync and manual restore.

### 🔍 Advanced Search System
- **Multiple Search Engines** – SearchAPI.io (default), Google Custom Search, DuckDuckGo, Wikipedia.
- **Configurable** – Enable/disable engines and store API keys in Settings.
- **Two modes** – External search (real‑time web) or AI Knowledge Base (training data only).
- **Search parameters** – Use `[engine:name]`, `[results:N]`, `[type:web/news/images]`.
- **Search cache** – Speeds up repeated queries.

### 📲 Progressive Web App (PWA)
- **Installable** – Add to home screen, offline support, push notifications.

### 🔒 Security Features
- **.medf encryption** – AES‑GCM with password, authenticity signatures.
- **API Key visibility toggle** – Show/hide keys in settings.
- **Public API limiter** – Prevents abuse of the default public key.

### ⚡ Performance Optimizations
- **Splash screen** – With progress bar.
- **Chat memory slider** – Adjustable from 25 to 85 bubbles.
- **Abort controller** – Cancel ongoing AI responses.
- **Search cache** – Redundant API call reduction.

### 🎛️ Enhanced Settings Panel
- **Hash‑based navigation** (`#settings`).
- **Persona & language sync** across backups and Drive.
- **Live search mode indicator**.
- **Accent color picker** with validation.

---

## 💻 Tech Stack

* **HTML, CSS, JavaScript (Vanilla)**
* **Google Gemini API** (`gemini-2.5-flash`, `gemini-3-flash-preview`)
* **Marked.js** – Markdown parsing
* **SuperRoundedUI** – Design guidelines
* **.medf** – Original encrypted format by Allwaysever
* **Web Crypto API** – Encryption/decryption
* **Service Workers** – PWA offline capabilities
* **OneSignal** – Push notifications
* **Web Speech API** – Text‑to‑speech
* **Google Drive API** – Backup & auto‑sync (`appDataFolder`)
* **Firebase Authentication & Firestore** – Cloud settings sync
* **Multiple Search APIs** – SearchAPI.io, Google Custom Search, DuckDuckGo, Wikipedia API

---

## 📚 Documentation

* **[❓ FAQ](Docs/FAQ.md)**
* **[🛠️ Troubleshooting Guide](Docs/TROUBLESHOOTING.md)**
* **[🔄 Changelog](Docs/CHANGELOG.md)**
* **[🤝 Contributing Guide](Docs/CONTRIBUTING.md)**
* **[🔒 .medf File Format Specification](Docs/MEDF_SPEC.md)**
* **[🔍 Search Engine Configuration Guide](Docs/SEARCH_CONFIG.md)**

---

## 📄 License

**Apache License 2.0**  

> [!NOTE]  
> The `.medf` format specification is an original innovation by **Allwaysever**. While the implementation is open source, we encourage developers to respect the branding and integrity of this format.

> [!IMPORTANT]  
> The default public API key has usage limits. For uninterrupted access, please use your personal API key.

> [!TIP]  
> Search engines are disabled by default for first‑time users. Enable them in Settings → Search Configuration to use `/search` with external sources.

---

**MirAI 3 – more than AI.**  
*Your intelligent, personalised, and beautifully rounded companion.*