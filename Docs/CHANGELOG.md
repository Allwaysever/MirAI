## What's new?

### ``2026.01.25`` - v3.0-Beta3 - **Search Revolution & First-Time User Experience**

Okay buckle up because this is a MASSIVE update that's gonna change how you search forever! We've completely reimagined the whole search system from the ground up and made it smarter than ever 🧠✨

**🔍 Search System: The Big Revamp**
- **``NEW DEFAULT BEHAVIOR``:** First-time users now get **ALL search engines DISABLED by default** (yeah, we're being responsible!). This means `/search` will use AI's own knowledge base unless YOU explicitly enable external engines.
- **``NEW UI FEEDBACK``:** Real-time search mode indicator in Settings showing whether you're in **"External Search Mode"** or **"AI Knowledge Base Mode"** - no more guessing games!
- **``NEW CONFIGURATION FLOW``:** Search engines now properly sync between memory and localStorage - no more "why isn't my API key working?!" moments.
- **``NEW FIRST-TIME MESSAGE``:** Fresh install? You'll get a friendly tip explaining the new search system. We're helpful like that 😉

**⚙️ Technical Wizardry Behind the Scenes**
- **``ENCRYPTED CONFIG SYNC``:** Search API keys from encrypted `.medf` files now properly load into the search system (fancy encryption magic at work!).
- **``MEMORY-LOCALSTORAGE SYNC``:** The `SEARCH_CONFIG` object in memory and localStorage now hold hands and sing Kumbaya together 🎵 No more mismatched settings!
- **``AUTOMATIC ENGINE DETECTION``:** The system now smartly checks which search engines are actually configured and ready to roll before attempting searches.

**🔧 Settings Panel Upgrades**
- **``DYNAMIC STATUS DISPLAY``:** Watch the search mode change in real-time as you toggle engines on/off. It's like magic, but with more code!
- **``BETTER ERROR HANDLING``:** Search tests now give way more helpful feedback when things go wrong (or right!).
- **``CLEANER CODE ARCHITECTURE``:** We untangled the spaghetti code behind search configuration. It's now more organized than my grandma's kitchen!

**🐛 Bug Squashing Party**
- Fixed that annoying bug where search engines would sometimes forget they were enabled
- Patched up some edge cases with first-time user detection
- Made the search cache system play nicer with the new dual-mode setup
- General stability improvements because nobody likes crashes!

**🎯 Why This Matters**
Look, we could've just added more search engines and called it a day. But NO! We wanted to make it SMART. Now MirAI intelligently decides:
1. **No external engines enabled?** → Uses AI's built-in knowledge (fast, private, always available)
2. **Engines enabled and configured?** → Hits the web for fresh, up-to-date info
3. **Mixed setup?** → Uses whatever you've configured like a good little assistant should

It's all about giving YOU control while making sure things Just Work™ out of the box. No more confusing setup processes for new users, but all the power for power users!

---

## Previous version:

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
