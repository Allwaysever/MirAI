<img src="Assets/Screenshot_20250915-213324.jpg" width="max" alt="Intro">

# 🚀 MirAI: Your Personal AI Chat Companion

MirAI is a simple chat application powered by the Google Gemini API. It's a cool project that lets you chat directly with an AI. Let's get you set up!

## 🛠️ How to Get Started

To get MirAI working, you'll need to set up an API Key from Google AI Studio. Don't worry, it's pretty straightforward!

### Step 1: Grab Your API Key

1.  Head over to **Google AI Studio** at [https://aistudio.google.com/](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Once you're in, click **"Get API Key"** in the sidebar.
<img src="Assets/Tutorial/20250919_151650.jpg" width="max" alt="Step1.1">
<img src="Assets/Tutorial/20250919_151833.jpg" width="max" alt="Step1.2">
4.  Then, click **"Create API key"**.
<img src="Assets/Tutorial/20250919_151923.jpg" width="max" alt="Step1.3">
5.  Type "Gemini API" and click "Create API key in existing project".
<img src="Assets/Tutorial/20250919_152023.jpg" width="max" alt="Step1.4">
6.  Copy the generated API Key.
<img src="Assets/Tutorial/20250919_152101.jpg" width="max" alt="Step1.5">

### Step 2: Install the API Key in MirAI

1.  Open the `MirAI.html` file in a text editor (like Visual Studio Code or Notepad).
2.  Find this line of code at the very beginning of the `<script>` tag:
    ```javascript
    const API_KEY = 'YOUR_API_KEY_HERE';
    ```
3.  Replace `'YOUR_API_KEY_HERE'` with the API Key you just copied.
    For example:
    ```javascript
    const API_KEY = 'AIzaSyCA2t9e-DG60prmVrel47qUKGdpJQvbA40';
    ```
4.  Save the `MirAI.html` file.

That's it! Now you can open `MirAI.html` directly in your web browser and start chatting with the AI. Have fun!

## 📚 Technical Details

* **API**: Google Gemini API
* **Application**: Single-page application (HTML, CSS, and JavaScript)
* **Features**:
    * Responsive chat interface
    * Light and dark mode support
    * Support for multiple languages (Indonesian, English, Javanese)
    * Ability to copy text from AI chat bubbles
