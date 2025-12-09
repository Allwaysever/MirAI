# MirAI

**A simple, lightweight, and responsive web interface to interact directly with the Google Gemini API.**

![Project](https://img.shields.io/badge/Type-Web%20App-blue)
![Languages](https://img.shields.io/badge/made%20with-HTML%2C%20CSS%2C%20JS-orange)
![Status](https://img.shields.io/badge/Status-Active-%234CAF50?logo=googlegemini&logoColor=ffce00&labelColor=%23000)

![Follow IG](https://img.shields.io/badge/Follow-Instagram_MirAI-405DE6?style=flat&logo=instagram&logoColor=C13584&labelColor=833AB4&link=https%3A%2F%2Finstagram.com%2Fallwaysevermirai)
![Follow WA CH](https://img.shields.io/badge/Follow-WhatsApp_Channel_MirAI-%23FFFFFF?style=flat&logo=Whatsapp&logoColor=075E54&labelColor=25D366&link=https%3A%2F%2Fwhatsapp.com%2Fchannel%2F0029Vb6hyuk6mYPGjI2E5g31)
![Subscribe CH YT](https://img.shields.io/badge/Subscribe-Channel_MirAI-282828?style=flat&logo=youtube&logoColor=FF0000&labelColor=FFFFFF&link=https%3A%2F%2Fyoutube.com%2F%40AllwayseverMirAI)




<br>

<p align="center">
  <img src="Assets/MirAI_v2.11.png" width="600" alt="MirAI Screenshot (v2.11)">
</p>

---

## ✨ Key Features

MirAI is designed to be an accessible and feature-rich AI chat companion, right from your browser.

* **💾 Session Persistence:** Your conversation is automatically saved in your browser. Pick up where you left off, anytime!
* **✅ Responsive Chat Interface:** A comfortable layout for both mobile and desktop use.
* **🌗 Light & Dark Mode:** Switch themes according to your visual preference.
* **🎭 Customizable AI Persona:** Choose between Default (Relaxed & Casual), Formal, or Creative personalities for the AI.
* **🌐 Multi-language Support:** Available in Indonesian, English (US & UK), and Japanese.
* **🔑 API Key Configuration:** Enter your own Gemini API key directly from the settings menu.
* **🚀 Enhanced Slash Commands & Tools Menu:** Use the '+' menu or type commands like `/translate`, `/summarize`, `/code`, and `/fix` for specific tasks.
* **🖼️ Multimodal Input:** Support for image uploads (JPEG, PNG, WebP) along with your text prompts, powered by Gemini's multimodal capabilities. 
* **🔊 Text-to-Speech (TTS):** Click the speaker icon to have the AI's response read aloud in the selected language.
* **🛑 Stop Generation:** Immediately halt the AI's response when needed.
* **📝 Markdown Parsing:** Responses from the AI containing formatting (like code blocks and lists) will be displayed correctly.
* **⏰ Time-aware Context:** The AI knows the current date and time for more relevant answers.

---

## 🎨 UI/UX Design

The visual design and user experience of MirAI are powered by:

<p align="center">
  <img src="Assets/SRUI Logo (Cropped).png" width="600" alt="SRUI Logo">
</p>

**SuperRoundedUI (SRUI)**

An exclusive UI design system from Allwaysever™ that emphasizes rounded corners, smooth transitions, and a clean layout.
**("Flat never felt this round.")**

---

## 🚀 Try MirAI now!

You can try MirAI right away without any installation needed!

* **<a href="https://allwaysevermirai.netlify.app" target="_blank" rel="noopener noreferrer">➡️ Try the Web Version (Netlify)</a>**
* **<a href="https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Allwaysever/MirAI/blob/main/index.html" target="_blank" rel="noopener noreferrer">⬇️ Download HTML File (Offline Version)</a>**

---

## 🛠️ Setup (Using Your Own API Key)

For the best performance and security, it is highly recommended to use your own Google Gemini API Key.

<details>
<summary><strong>➡️ Click here for a complete tutorial on obtaining an API Key.</strong></summary>
<br>

### Step 1: Get Your API Key
1.  Open **Google AI Studio** at [https://aistudio.google.com/](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click **"Get API Key"** in the sidebar.
    <img src="Assets/Tutorial/20250919_151650.jpg" width="max" alt="Step 1.1">
    <img src="Assets/Tutorial/20250919_151833.jpg" width="max" alt="Step 1.2">
4.  Then, click **"Create API key"**.
    <img src="Assets/Tutorial/20250919_151923.jpg" width="max" alt="Step 1.3">
5.  Type "Gemini API" and click "Create API key in existing project".
    <img src="Assets/Tutorial/20250919_152023.jpg" width="max" alt="Step 1.4">
6.  Copy the generated API Key.
    <img src="Assets/Tutorial/20250919_152101.jpg" width="max" alt="Step 1.5">

### Step 2: Enter the API Key in MirAI
Simply enter the key through the settings menu within the application.
1.  Open the `MirAI.html` file or [MirAI Web](https://allwaysevermirai.netlify.app).<br><img src="Assets/Tutorial/APIKEYSTEP1.png" width="max" alt="Step 2.1">
2.  Click the **menu icon** in the top-left corner to open **Settings**.
3.  Find the **API Key** section.<br><img src="Assets/Tutorial/APIKEYSTEP2.png" width="max" alt="Step 2.2">
4.  **Paste** the API Key you copied.<br><img src="Assets/Tutorial/APIKEYSTEP3.1.png" width="max" alt="Step 2.3">
5.  Click the **"Save Key"** button.<br><img src="Assets/Tutorial/APIKEYSTEP3.2.png" width="max" alt="Step 2.4">

Done! MirAI is now ready to use with your personal API Key.

</details>

Or you can **watch this video** 👇

<a href="https://youtu.be/fgjnE2wL8qk">
  <img src="https://img.youtube.com/vi/fgjnE2wL8qk/hqdefault.jpg" alt="Tutorial: How to Apply your API Key | MirAI Tutorial" width="1280" height="720"/>
</a>

---

## 💻 Tech Stack

This project was built purely with basic web technologies, without any frameworks.

* **HTML**
* **CSS**
* **JavaScript (Vanilla JS)**
* **Google Gemini API** (using the `gemini-2.5-flash` model)
* **Marked.js** (For Markdown parsing)
* **SuperRoundedUI by Allwaysever** as UI Guidelines

---

## 📚 Documentation

For more detailed information about the project, please refer to the following documents:

* **[❓ FAQ (Frequently Asked Questions)](Docs/FAQ.md)**: Find answers to common questions about MirAI's features and usage.
* **[🛠️ Troubleshooting Guide](Docs/TROUBLESHOOTING.md)**: Solutions for common errors and issues.
* **[🔄 Changelog](Docs/CHANGELOG.md)**: See the detailed history of changes and new features for each version.
* **[🤝 Contributing Guide](Docs/CONTRIBUTING.md)**: Learn how you can contribute to make MirAI even better. (**Koreksi typo dari CONTRIBUTNG.md menjadi CONTRIBUTING.md**)

---

## 📄 License

This project is licensed under the GNU Affero General Public License v3.0. For full details, please [read the license file here](Docs/LICENSE).
