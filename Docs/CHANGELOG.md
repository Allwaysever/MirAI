## What's new?

### 🚀 `2026.04.30` — v3.1.0 — **Auto‑Search URL & Enhanced Typing**

- **`NEW FEATURE`**: **Auto‑search via URL parameter** – you can now open MirAI with `?search=your+query` and the app will automatically execute the `/search` command. Perfect for shortcuts, widgets, or external integrations.
- **`IMPROVEMENT`**: **Markdown typewriter effect** now renders formatted elements (headings, bold, code, tables, etc.) smoothly as they appear, eliminating the previous visual jump after typing finished.
- **`IMPROVEMENT`**: Added real‑time accent color preview and RGB variable sync for better theme consistency across all UI components.

---

## Previous versions:

### 🛠️ `2026.03.12` — v3.0.1 — **Typewriter Effect Markdown Fix**

- **`FIX`**: **Typewriter effect** now directly responds to text as markdown without needing plaintext. Previously, the typing effect would sometimes display raw text before conversion; now all AI responses are immediately rendered with the correct markdown formatting as they are typed.
- **`IMPROVEMENT`**: Enhanced typing animation stability and compatibility with HTML elements resulting from markdown parsing.

### 🚀🎉 `2026.03.08` — v3.0 — **THE OFFICIAL LAUNCH: MirAI IS BORN!** 🎉🚀

> *"From beta chaos to polished perfection — this is not just an update. This is the beginning."*

After months of relentless iteration through 7 betas, sleepless nights, and more bug fixes than we can count, **MirAI v3.0 is finally HERE.** This is the culmination of everything — every feature, every fix, every wild idea we threw at the wall — now polished and packaged into one definitive release. Buckle up. 🎢

### 🌟 What's New in v3.0 (The Full Picture)

#### 🤖 Powered by Gemini 2.5 Flash
- **``ENGINE UPGRADE``:** MirAI now runs on **Google Gemini 2.5 Flash** as the default model — faster, smarter, and more reliable than ever. The AI brain behind MirAI has officially leveled up.
- **``STABLE CORE``:** The underlying API integration has been hardened, refined, and battle-tested across all 7 betas. What you get now is rock solid.

#### 🎨 Custom Accent Color — **Stable & Gorgeous**
- **``STABLE RELEASE``:** After debuting in Beta 6 and being refined through Beta 7, the **Custom Accent Color** feature has officially graduated from beta. It's smooth, reliable, and looking *amazing*.
- **``HOW IT WORKS``:** Head to Settings → Custom Accent Color, type in any hex code (e.g., `#ffce00`, `#FF6B6B`, `#00C9FF`), and watch MirAI transform in real time.
- **``LIVE PREVIEW``:** Color preview updates as you type — no guessing games.
- **``SMART SAFETY``:** Colors that are too dark get rejected automatically to keep text readable. MirAI always looks good. Always.
- **``PERSISTENCE``:** Your chosen color is saved across sessions. MirAI remembers your vibe.

#### 🧠 Flexible Chat Memory System
- **``MEMORY SLIDER``:** You now have full control over how much MirAI remembers. Slide the **Chat Memory** control in Settings anywhere from **25 to 85 bubbles**. Your device, your rules.
- **``REAL-TIME COUNTER``:** A live bubble counter shows exactly how many messages are stored vs. your limit (e.g., "Current bubbles: 42 / Max: 50").
- **``SMART TRIMMING``:** When the limit is hit, old messages are trimmed intelligently — but the **AI Persona is always preserved** at the top. MirAI will never forget who it is.
- **``NO AUTO-TRIM ON LOAD``:** Fixed a previous behavior where the app would trim messages just from loading the page. Now, trimming only happens when you actively save settings or the limit is reached mid-chat.
- **``CONFIRMATION DIALOGS``:** Lower the limit below current count? MirAI will warn you exactly how many messages will be removed before doing anything. No surprises.

#### 🔍 Multi-Engine Search System — **Smarter Than Ever**
- **``FOUR ENGINES``:** MirAI now supports **SearchAPI.io** (primary), **Google Custom Search** (secondary), **DuckDuckGo**, and **Wikipedia** — all configurable from Settings.
- **``AI KNOWLEDGE BASE MODE``:** No API keys? No problem. When all engines are disabled, `/search` taps directly into Gemini's vast training data. Smart, private, and always available.
- **``EXTERNAL SEARCH MODE``:** Enable any engine with an API key for fresh, real-time internet results. Indicator in Settings tells you which mode you're in — no more guessing.
- **``SEARCH CACHING``:** Repeated queries? MirAI caches results to save API calls and speed things up.
- **``TEST SEARCH BUTTON``:** Hit "Test Search" in Settings to verify your engine setup without leaving the app.
- **``CLEAR CACHE BUTTON``:** Wipe the search cache manually anytime you want fresh results.
- **``FIRST-TIME FRIENDLY``:** New users start with all engines **disabled by default**. A friendly tip appears on the first visit explaining how search works. No overwhelming setup for newcomers.
- **``REAL-TIME MODE INDICATOR``:** The Settings panel now shows a live badge — **"External Search Mode"** or **"AI Knowledge Base Mode"** — that updates as you toggle engines on/off.

#### ⚡ Enhanced Loading Experience
- **``REAL-TIME STOPWATCH``:** Every AI response now shows a live stopwatch (updates every 10ms!) so you know exactly how long the AI is thinking.
- **``PROGRESS BAR``:** A visual progress bar fills up as the request processes, giving you a tangible sense of movement.
- **``COLOR-CODED RESULT``:** Stopwatch turns **green** on success, **red** on error. Instant visual feedback.
- **``PROCESSING TIME DISPLAY``:** After each response, the final processing time is shown (e.g., "Processed in 1.847 seconds"). Because transparency is cool. 😎
- **``CLEAN ANIMATIONS``:** All loading elements fade in and out smoothly. No jarring jumps.

#### 🔒 MirAI Encrypted Data Files (.medf) — Full System
- **``SECURE BACKUP``:** Export your entire MirAI state (chat history, API key, persona, language, accent color) to an **AES-GCM encrypted `.medf` file**, protected by a password of your choice.
- **``AUTHENTICITY SIGNATURE``:** Every `.medf` file is stamped with a cryptographic authenticity header. Import will fail if the file has been tampered with or isn't from an official MirAI source.
- **``DUAL FORMAT SUPPORT``:** Export as `.medf` (encrypted, with signature) or `.mdf`/`.json` (plain JSON). Import supports all three.
- **``PERSONA SYNC ON IMPORT``:** Restoring a backup also restores your AI persona. Everything comes back exactly as you left it.

#### 👤 Custom Persona System
- **``FOUR PERSONAS``:** Choose from **Formal & Professional**, **Casual & Humorous** (default), **Creative & Expressive**, or the new **Custom Persona** option.
- **``CUSTOM PERSONA INPUT``:** Write your own persona prompt and MirAI will become whoever you need it to be. Your prompt is automatically combined with the MirAI identity prefix.
- **``PERSISTENT``:** Your persona choice (including custom prompts) is saved to localStorage and restored on every session.

#### 📱 PWA & Installation
- **``INSTALL PROMPT``:** A stylish install button appears at the right time, letting you add MirAI to your home screen like a native app.
- **``SERVICE WORKER``:** Full PWA support with a registered Service Worker for offline capability and fast loading.
- **``ONESIGNAL NOTIFICATIONS``:** Push notification support via OneSignal is baked in and ready to go.
- **``SPLASH SCREEN``:** Beautiful animated splash screen on launch (skipped in PWA mode for faster startup).

#### 🛠️ UI & UX Improvements
- **``CLEAR BUTTON FIX``:** The clear chat button now uses the browser's native `confirm()` dialog — no more unclickable moments or broken overlays.
- **``TYPEWRITER EFFECT``:** AI responses type themselves out character by character, then render full Markdown at the end. It's satisfying every single time.
- **``SMOOTH COPY & TTS``:** Each AI bubble has copy and text-to-speech buttons. TTS is language-aware (supports Indonesian, English US, English UK, and Japanese). Markdown characters are stripped before speaking — no more hearing asterisks.
- **``HASH-BASED SETTINGS NAVIGATION``:** Settings panel opens/closes via URL hash (`#settings`), enabling proper back button behavior on mobile. Press back to close settings — just like a native app.
- **``CONNECTION STATUS INDICATOR``:** A live online/offline status indicator keeps you informed. It even hides itself when it overlaps your chat bubbles.
- **``DYNAMIC PLACEHOLDERS``:** The input box shows rotating placeholder messages that adapt to the selected language.
- **``SLASH COMMANDS MENU``:** Tap the `+` button to browse all available slash commands with descriptions. Auto-complete kicks in as you type `/`.
- **``LANGUAGE SWITCHER``:** Four language options — 🇮🇩 Bahasa Indonesia, 🇺🇸 English (US), 🇬🇧 English (UK), 🇯🇵 日本語 — fully localized throughout the entire UI.
- **``DARK THEME ONLY``:** MirAI has committed to the dark side. The light theme has been retired permanently, allowing us to focus on a consistent, polished dark experience.
- **``ACCENT COLOR RESET``:** One-click reset button returns the accent color back to MirAI's signature yellow `#ffce00`.

#### 🔑 API Key Management
- **``CUSTOM API KEY``:** Enter your own Google Gemini API key in Settings to bypass the shared default key and get your own usage limits.
- **``ENCRYPTED CONFIG``:** The default API key is loaded from `config.medf`, a securely encrypted config file. No plaintext secrets in the source.
- **``API LIMIT WARNINGS``:** If you're using the public API key and approaching usage limits, MirAI will warn you with a popup and suggest switching to a personal key.

#### 💬 A Note From the Developer

v3.0 isn't just a version number bump. It's the moment MirAI stops being "a beta project" and becomes **a real product**. Every feature here was built, broken, rebuilt, and polished through 7 beta releases and countless hours of feedback.

Thank you for being here from the beginning — or for joining just now. Either way, **welcome to MirAI v3.0.** It's been worth the wait. 🙌

*Built with ❤️ by Allwaysever*

### `2026.02.19` - v3.0-Beta7 - **Stable Accent & Clear Button Fix**

This update brings major update to stable accent color feature, and fixes a critical bug with the clear chat button.

**🎨 Custom Accent Color – Now Stable!**
- **``STABLE RELEASE``:** The custom accent color feature has been upgraded from beta to **stable**. All known bugs from the beta version have been fixed.
- **``NEW FEATURE``:** Choose any hex color (e.g., #ffce00) in Settings to personalize MirAI's look. Live preview and automatic brightness validation ensure readability.
- **``BUG FIX``:** We have developed this feature so that all elements can have the color you want.

**🛠️ Clear Chat Button Fix**
- **``BUG FIX``:** Resolved an issue where the clear chat button was unclickable in certain scenarios. The custom confirmation overlay was removed and replaced with the browser's native `confirm()` dialog for reliability.
- **``IMPROVED UX``:** Clearing chat history now uses a standard browser confirmation, ensuring the action always works as intended.

*Your feedback drives our improvements. Enjoy the new MirAI!*

---

### ``2026.02.16`` - v3.0-Beta6 - **Light Theme Farewell & Custom Accent Colors**

We've made some changes to the visual experience of MirAI. With a heavy heart, we say goodbye to the Light Theme. But don't worry, we're introducing a new way to personalize your app!

**🎨 Light Theme Removal:**
- **``FAREWELL``:** We've decided to remove the Light Theme option. This wasn't an easy decision, but it allows us to focus on a more consistent dark experience and streamline future development. We sincerely apologize to our light mode enthusiasts! 😔

**✨ New Custom Accent Color Feature (Beta):**
- **``NEW FEATURE``:** You can now customize the accent color of MirAI! Head over to Settings and choose your own hex color (e.g., #ffce00).
- **``LIVE PREVIEW``:** See the color preview as you type, and the app instantly updates the accent.
- **``SAFETY CHECK``:** If the color is too dark, MirAI will gently reject it to maintain readability.
- **``KNOWN BUGS``:** This feature is still in beta – you might encounter some glitches. We're working on ironing them out in future updates. Your feedback is welcome!

**💡 Why the change?**
We believe that giving you control over the accent color is a more flexible and fun way to personalize MirAI than a full light/dark switch. This paves the way for even more customization options down the road. Thank you for your understanding and support!

---

### ``2026.02.02`` - v3.0-Beta5 - **Dynamic Memory Control & Smart Storage**
We've handed the keys to your AI's memory back to you! No more hard limits—you decide how much MirAI remembers.
**🧠 Flexible Chat Memory System:**
- **``NEW FEATURE``**: Memory Limit Slider added to Settings! You can now adjust the conversation history limit from 25 up to 85 bubbles. Whether you want to save RAM or keep a long conversation going, the choice is yours.
- **``VISUAL FEEDBACK``**: Real-time Bubble Counter shows exactly how many messages are currently stored versus your selected limit (e.g., "Current bubbles: 42 / Max: 50").
- **``SMART TRIMMING``**: When the memory limit is reached, the system now intelligently trims old messages while always preserving the AI Persona (system instruction) at the very top. Your AI won't forget who it is, even in long chats.
🛡️ Enhanced Data Safety:
- **``SAFER LOADING``**: Fixed a logic issue where chat history could be automatically trimmed just by loading the page. Now, trimming only happens when you actively save settings or hit the limit during a chat.
- **``CONFIRMATION DIALOGS``**: If you lower the memory limit below the current message count, MirAI will warn you exactly how many messages will be deleted before applying the changes.

**💡 Why This Matters:**
Previously, MirAI had a strict limit of 50 messages. If you crossed it, poof! Old messages vanished. Now, you have control. Running on a powerful device? Crank it up to 85! On an older phone? Dial it down to 25 to keep things snappy. Plus, the new smart trimming ensures the AI never suffers from an "identity crisis" by accidentally deleting its own persona instructions.

### ``2026.01.28`` - v3.0-Beta4 - **Enhanced Loading Experience with Processing Time Display**

We've significantly improved the loading experience by adding real-time processing time feedback directly in the chat interface!

**⚡ Enhanced Loading Animation:**
- **``NEW FEATURE``:** **Advanced loading bubbles** now show real-time processing time with a stopwatch-style counter that updates every millisecond!
- **``NEW FEATURE``:** **Progress bar animation** that fills up as the AI processes your request, giving visual feedback of the generation progress.
- **``NEW FEATURE``:** **Final processing time display** shows exactly how long it took to generate the response after completion.
- **``NEW FEATURE``:** **Success/failure status colors** - the stopwatch changes color (green for success, red for errors) based on the outcome.

**🎨 UX Improvements:**
- **``VISUAL FEEDBACK``:** The loading animation now includes a "Generating response..." text that disappears when the response is ready.
- **``SMOOTH TRANSITIONS``:** All elements fade in/out smoothly with proper CSS animations.
- **``ORGANIZED STRUCTURE``:** The loading container has separate sections for timer, progress bar, and status messages.
- **``BETTER CLEANUP``:** Proper interval cleanup to prevent memory leaks when responses are completed or interrupted.

**🔧 Technical Enhancements:**
- **``NEW FUNCTIONS``:** Added `showLoading()` function that creates a sophisticated loading container with multiple visual elements.
- **``NEW FUNCTIONS``:** Added `completeLoading()` function that handles the graceful completion of the loading animation.
- **``PRECISE TIMING``:** Uses `Date.now()` for millisecond-precise timing calculations.
- **``EFFICIENT UPDATES``:** Stopwatch updates every 10ms for smooth visual feedback without performance impact.

**💡 Why This Matters:**
Waiting for AI responses can feel like a black box - you send a question and hope something comes back. Now you get **real-time feedback** on how long the processing is taking! The stopwatch lets you see exactly how many seconds have elapsed, while the progress bar gives you a visual sense of completion. When it's done, you get a nice summary of the total processing time. It's transparent, informative, and just plain cool to watch! 😎

### ``2026.01.25`` - v3.0-Beta3 - **Search Revolution & First-Time User Experience**

Okay buckle up because this is a MASSIVE update that's gonna change how you search forever! We've completely reimagined the whole search system from the ground up and made it smarter than ever 🚀

**🎯 Search System: The Big Revamp**
- **``NEW DEFAULT BEHAVIOR``:** First-time users now get **ALL search engines DISABLED by default** (yeah, we're being responsible!). This means `/search` will use AI's own knowledge base unless YOU explicitly enable external engines.
- **``NEW UI FEEDBACK``:** Real-time search mode indicator in Settings showing whether you're in **"External Search Mode"** or **"AI Knowledge Base Mode"** - no more guessing games!
- **``NEW CONFIGURATION FLOW``:** Search engines now properly sync between memory and localStorage - no more "why isn't my API key working?!" moments.
- **``NEW FIRST-TIME MESSAGE``:** Fresh install? You'll get a friendly tip explaining the new search system. We're helpful like that 😉

**🔧 Technical Wizardry Behind the Scenes**
- **``ENCRYPTED CONFIG SYNC``:** Search API keys from encrypted `.medf` files now properly load into the search system (fancy encryption magic at work!).
- **``MEMORY-LOCALSTORAGE SYNC``:** The `SEARCH_CONFIG` object in memory and localStorage now hold hands and sing Kumbaya together 🎵 No more mismatched settings!
- **``AUTOMATIC ENGINE DETECTION``:** The system now smartly checks which search engines are actually configured and ready to roll before attempting searches.

**🎛️ Settings Panel Upgrades**
- **``DYNAMIC STATUS DISPLAY``:** Watch the search mode change in real-time as you toggle engines on/off. It's like magic, but with more code!
- **``BETTER ERROR HANDLING``:** Search tests now give way more helpful feedback when things go wrong (or right!).
- **``CLEANER CODE ARCHITECTURE``:** We untangled the spaghetti code behind search configuration. It's now more organized than my grandma's kitchen!

**🐞 Bug Squashing Party**
- Fixed that annoying bug where search engines would sometimes forget they were enabled
- Patched up some edge cases with first-time user detection
- Made the search cache system play nicer with the new dual-mode setup
- General stability improvements because nobody likes crashes!

**💡 Why This Matters**
Look, we could've just added more search engines and called it a day. But NO! We wanted to make it SMART. Now MirAI intelligently decides:
1. **No external engines enabled?** → Uses AI's built-in knowledge (fast, private, always available)
2. **Engines enabled and configured?** → Hits the web for fresh, up-to-date info
3. **Mixed setup?** → Uses whatever you've configured like a good little assistant should

It's all about giving YOU control while making sure things Just Work™ out of the box. No more confusing setup processes for new users, but all the power for power users!

### ``2026.01.23`` - v3.0-Beta2

We've made significant upgrades to the search system and improved overall stability.

**Search System Overhaul:**
- **``NEW``:** Integrated **SearchAPI.io** as the primary search engine for the `/search` command, offering reliable and fast search results.
- **``NEW``:** Added support for **Google Custom Search Engine (CSE)** as a secondary search option.
- **``NEW``:** Enabled **DuckDuckGo** and **Wikipedia** search capabilities (no API keys required).
- **``NEW``:** **Search Configuration Panel** in Settings, allowing you to enable/disable engines and input API keys.
- **``NEW``:** **Search Caching** system to speed up repeated queries.
- **``NEW``:** **Test Search** button to verify your search engine setup.
- **``FIX``:** Resolved issues with the previous Google CSE integration and erratic API behavior.

### ``2026.01.16`` - v3.0-Beta

We changed the version to a Major Beta because upon review, all the beta update series deserved to be a Major update.
- **``NEW FEATURE``:** We added an API Search system using Google CSE.
- **``FIX``:** Fixed several recent bugs.

### ``2026.01.12`` - v2.12.0-Beta5Fix

We've added new features for you who love listening to MirAI's answers using TTS!
- **``FIX``:** Fixed TTS bug that read responses along with markdown characters, like Asterisk (*).

### `2026.01.06` - v2.12.0-Beta5

We've added another new feature that makes it even easier for you (the User) to access MirAI. This might be the best beta update yet, don't you think?

`1. Backup & Restore System with Authenticity Signature`

This new feature allows users to:

1. Export conversation data, API settings, persona, language, and theme to an encrypted file with an authenticity signature.
2. Import backup files with authenticity validation to ensure the file originates from an official MirAI source.
3. Support for two file formats:
   - .medf (MirAI Encrypted Data Files) - Password-encrypted file with an authenticity signature
   - .mdf/.json - Plain JSON file

`2. Authenticity Signature Feature`

This new system adds a layer of security with:
- A specific header text: {MirAI Encrypted Data Files v1.0 By Allwaysever}
- An encrypted header code validated during import
- Timestamp and version in the metadata
- File authenticity verification to prevent the use of unofficial backup files

`3. Custom Persona System`

Main Features:

1. Custom Persona selection in settings:
   - Formal & Professional
   - Casual & Humorous (default)
   - Creative & Expressive
   - Custom Persona **(new!)**
3. Dedicated Text Input Area:
   - Text area for writing custom persona prompts
   - Automatically combined with the prefix: "`You are MirAI, an AI Assistant, [custom prompt]`"
   - Saved in localStorage (miraiCustomPersona)

### v2.12.0-Beta4
- **``New features``:** new feature added, called Backup & Restore, you can back up your data in MirAI for safekeeping, or you want to install and continue your conversation at any time and any device. This is what will be backed up:
  1. Conversation data
  2. Your Gemini API key
  3. Your MirAI Persona Selected
  4. Language used
  5. The UI theme you choose

### v2.12.0-Beta3
- **``New system``:** We added another URL parameter system for ``?pwa`` which will skip the splash screen, useful for our [TWA MirAI](https://bit.ly/AwsMirAIDown).
- **``Fixed some bugs``:** we have been doing this for days until we apologize for the bugs we made, in the next update we added new features.

### v2.12.0-Beta2
- **``New System``:** We've just added a snazzy new URL parameter system! So, if your URL looks like ``https://xxx.xxx.xxx/chat``, it will magically use the super speedy **Gemini 2.5 Flash** Model.
  But wait, there's more! If you're feeling adventurous and the URL is ``https://xxx.xxx.xxx/chat?betamodel``, then you'll get to play with the shiny new **Gemini 3 Flash Preview** Model. We'll keep you posted and update everything once Google decides to bless us with the stable Gemini 3 Flash model. Stay tuned!

### v2.12.0-BetaModelUpdate
- **``Model Update``:** We're updating Google's previously released AI model, Gemini 3 Flash. However, the current version is still under development by Google. Therefore, we're using the preview model first.

### v2.11.x
- **``Upgrade UI``:** We've made an update to our design language system, SuperRoundedUI, which we've implemented in this app.
- **``Fix Bug UI``:** Changed the example prompt in the ``Slash Command`` feature which was found to be invalid with the original prompt format.

### v2.11 - **``Best Update``**
- **``UI Bug Fix``:** Fixed image preview UI bug.
- **``UI Enhancement``:** Improved UI, supported by our Design Language System, [SuperRoundedUI](https://allwaysevermirai.netlify.app/otherapps/srui).
- **``Position Change``:** Moved the "Trash" position from below the settings button to the right side.
- **``UI Bug Fix``:** Fixed UI bug for the copy and speaker (TTS) buttons.
- **``Monthly Update``:** Final Update for this month. (November)

### v2.11-BETA - **``Multimodal Upgrade``**
- Added multimodal functionality for image uploads
- added "paperlink" button for uploading images and so on

*note:* This version is still under development, so... **BE PATIENT IF YOU FEEL UNCOMFORTABLE WITH THE UI!!**

### v2.10
- UI Upgrade
- fix bugs

### v2.7 - 2.9
- Upgrade Features

### v2.6.1
- Fix bugs

### v2.6
- Creating a sense of time sensitivity when interacting. Knowing the time during a chat.
- time-based search optimization

### v2.5
- New feature! Now you can have deeper conversations, and MirAI will remember everything you've said (limited to 25 previous chats).
- Color change for the stop response button

### v2.4.1
- fix bugs

### v2.4
- Dark Theme (Monochrome) Removal
- Credit Page Removal
- Hi Text Changes
- Animation Upgrade.
- Fix bugs.

### v2.3.1
- Animation improvements and additions.
- UI improvements.

### v2.3
- New feature: "+" button to display slash commands. Multimodal features such as image uploading may be added later.
- UI improvements: added more fluid animations.

### v2.2.2
- UI Fixes.
- UX default fixes.

### v2.2.1
- The addition of commands in the "slash command" feature is:
   - /rephrase
Usage: /rephrase [text] as [tone]
example: /rephrase I can't come to the meeting tomorrow as professional
   - /ideate
Usage: /ideate [number] ideas for [topic]
example: /ideate 5 ideas for YouTube video about programming
   - /fix
Usage: /fix [text with errors]
example: /fix I went to the market yesterday to buy apples
   - /explain
Usage: /explain [concept] like I'm [audience]
example: /explain black holes like I'm a 10 year old
   - /code
Usage: /code a [language] function to [task]
example: /code a python function to check if a number is prime
- UI Additions: Bug fix for ``code`` markdown output

### v2.2
- Added feature: "Slash command". The main feature currently is for translation and summarization. Example: ``/translate what is this? to Indonesian``
- UI Changes: The dark theme color with yellow accents has been moved to ``Premium Dark`` and the current dark theme with white accents has been changed to monochrome.
- fix bugs

### v2.1.2
- Added detail: If a chat is started, the connection indicator will move to "hide" and only show the circle.
- Added detail: If the connection indicator "overlaps" a user's chat bubble, it will disappear, and if it moves away, it will reappear.

### v2.1.1
- Fixed bug: the selected AI persona was not suitable. has been fixed.
- UI Changes: Google Gemini API content placeholder has been shortened to ``755px``

### v2.1 - Practical update
- Added feature: place to fill in your own API Key without having to change the MirAI source code.
- Bugs fixed

### v2.0.5
- Retyping and restyle For the credits section
- Added background for connection indicator

### v2.0.4
- Added status circle to indicate "Online" or "Offline"
- Added small detail: Dynamic input box placeholder.

### v2.0.3
- Adding blur effect in Input box
- Changing the loading bar movement so that it shows the page loading percentage more
- Fixed credits text position
- Changing the source link of the image asset from usercontentblogger to Githubusercontent
- Bug fixes

### v2.0.2
- Fixed bug: The AI's output from various languages was being displayed again.

### v2.0.1
- Fixed bug: ''Hi! I'm MirAl...'' image overlapped input box. Fixed
- language expansion for settings and credits
- removal of Chinese, Spanish, Portuguese and Arabic for code efficiency and the possibility that these languages will be rarely used by users

### v2.0 - Secondary Update
- UI overhaul to modern
- Added features: Settings/"Pengaturan" in Indonesian
- Features of settings: change theme (Dark/Light), MirAI Persona can be changed into 3 (Formal & Serious, Relaxed and a bit funny, Imaginative)
- New look for light theme

### v1.5.1
- UI Update: The ``input-container`` section has a transparent background.
- Adding info text: "MirAI bisa jawab ngawur. Jadi tolong periksa kembali responnya" (In Indonesian)
- Changing the color palette

### v1.5
- Added languages: English (UK), Chinese, Spanish, Portuguese, Arabic.
- Reducing the language change button.
- Bug Fixes.

### v1.4.6
- Changing the shape and position of the language button
- Bug Fixes.

### v1.4
- New features
- Fix Bugs
- AI optimization to remember things discussed in one session

### v1.3
- New feature: Clear button
- UI Update
- Fix Bugs

### v1.2
- Fix bugs
- UI Update

### v1.1
- Fix Bugs
- Update UI

### v1.0
- Official Release
