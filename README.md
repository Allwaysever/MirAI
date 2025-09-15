<img src="Assets/Screenshot_20250915-213324.jpg" width="max" alt="Preview">

## 🛠️ How to Set Up

To make MirAI work, you need to get your own API Key from Google AI Studio. Don't worry, it's pretty straightforward\!

### Step 1: Get Your API Key

1.  Go to **Google AI Studio** at [https://aistudio.google.com/](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Once you're in, click on **"Get API Key"** in the sidebar.
4.  Then, click **"Create API key in new project"**.
5.  Copy the generated API Key. It'll look something like `AIzaSyCA2t9e-DG60prmVrel47qUKGdpJQvbA40`.

### Step 2: Install the API Key in MirAI

1.  Open the `MirAI.html` file in a text editor (like Visual Studio Code, Notepad++, or even Notepad).
2.  Find the following line of code at the very beginning of the `<script>` tag:
    ```javascript
    const API_KEY = 'YOUR_API_KEY_HERE';
    ```
3.  Replace `'YOUR_API_KEY_HERE'` with the API Key you copied from Google AI Studio.
    For example:
    ```javascript
    const API_KEY = 'AIzaSyCA2t9e-DG60prmVrel47qUKGdpJQvbA40';
    ```
4.  Save the `MirAI.html` file.

That's it\! Now you can open the `MirAI.html` file directly in your web browser, and you're good to go.

## 📚 Technical Details

  * **Model**: Google Gemini 2.5 Flash
  * **Backend**: The project communicates with the Gemini API directly from the frontend using `fetch()`.
  * **Frontend**: Built with pure HTML, CSS, and JavaScript. It uses the Marked.js library for rendering Markdown.

## 📝 License

This project is open-source. Feel free to fork, modify, and use it for your personal projects.
Some things related to Google Gemini, will be redirected to Alwaysever Custom License v5.1
