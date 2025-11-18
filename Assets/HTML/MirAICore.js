// Main application logic untuk MirAI
const miraiApp = {
    // Variabel global
    elements: {},
    currentApiKey: miraiConfig.DEFAULT_API_KEY,
    chatHistory: [],
    abortController: null,
    currentLanguage: 'en',
    currentPersona: 'default',
    currentImageData: null,
    slashCommands: [],

    // Inisialisasi aplikasi
    initialize() {
        this.initializeElements();
        this.attachEventListeners();
        this.initializeAppState();
        this.simulateLoading(miraiConfig.LOADING_DURATION);
        this.updateConnectionStatus();
        this.populateToolsMenu();
        this.updateSendButtonState();
        
        // Event listener untuk TTS cleanup
        window.addEventListener('beforeunload', () => {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        });
    },

    // Inisialisasi DOM elements
    initializeElements() {
        this.elements = {
            questionInput: document.getElementById('questionInput'),
            sendBtn: document.getElementById('sendBtn'),
            stopBtn: document.getElementById('stopBtn'),
            clearBtn: document.getElementById('clearBtn'),
            clearBtnContainer: document.getElementById('clearBtnContainer'),
            settingsBtn: document.getElementById('settingsBtn'),
            chatMessages: document.getElementById('chatMessages'),
            suggestionBox: document.getElementById('suggestionBox'),
            body: document.body,
            inputContainer: document.getElementById('inputContainer'),
            logoContainer: document.querySelector('.logo-container'),
            splashScreen: document.getElementById('splash-screen'),
            langDropdown: document.getElementById('langDropdown'),
            languageSwitcher: document.getElementById('languageSwitcher'),
            infoText: document.getElementById('infoText'),
            settingsPage: document.getElementById('settingsPage'),
            backBtn: document.getElementById('backBtn'),
            themeSelect: document.getElementById('themeSelect'),
            personaSelect: document.getElementById('personaSelect'),
            settingsHeaderTitle: document.getElementById('settingsHeaderTitle'),
            settingsAppearanceTitle: document.getElementById('settingsAppearanceTitle'),
            settingsThemeText: document.getElementById('settingsThemeText'),
            themeLightOption: document.getElementById('themeLightOption'),
            themeDarkOption: document.getElementById('themeDarkOption'),
            settingsAITitle: document.getElementById('settingsAITitle'),
            settingsPersonaText: document.getElementById('settingsPersonaText'),
            personaFormalOption: document.getElementById('personaFormalOption'),
            personaDefaultOption: document.getElementById('personaDefaultOption'),
            personaCreativeOption: document.getElementById('personaCreativeOption'),
            settingsAboutTitle: document.getElementById('settingsAboutTitle'),
            settingsVersionText: document.getElementById('settingsVersionText'),
            settingsAuthorText: document.getElementById('settingsAuthorText'),
            githubLink: document.getElementById('githubLink'),
            licenseLink: document.getElementById('licenseLink'),
            statusDot: document.getElementById('statusDot'),
            statusLabel: document.getElementById('statusLabel'),
            apiKeyInput: document.getElementById('apiKeyInput'),
            toggleApiKey: document.getElementById('toggleApiKey'),
            saveApiBtn: document.getElementById('saveApiBtn'),
            settingsApiTitle: document.getElementById('settingsApiTitle'),
            settingsApiText: document.getElementById('settingsApiText'),
            toolsBtn: document.getElementById('toolsBtn'),
            toolsMenu: document.getElementById('toolsMenu'),
            customConfirmOverlay: document.getElementById('customConfirmOverlay'),
            customConfirmMessage: document.getElementById('customConfirmMessage'),
            confirmBtnYes: document.getElementById('confirmBtnYes'),
            confirmBtnNo: document.getElementById('confirmBtnNo'),
            helpLink: document.getElementById('helpLink'),
            termsText: document.getElementById('termsText'),
            uploadImageBtn: document.getElementById('uploadImageBtn'),
            imageInput: document.getElementById('imageInput'),
            imagePreviewContainer: document.getElementById('imagePreviewContainer'),
            imagePreview: document.getElementById('imagePreview'),
            removeImageBtn: document.getElementById('removeImageBtn')
        };
    },

    // Attach event listeners
    attachEventListeners() {
        this.elements.sendBtn.addEventListener('click', () => this.askAI());
        this.elements.stopBtn.addEventListener('click', () => this.stopAI());
        this.elements.clearBtn.addEventListener('click', () => this.showClearConfirmation());
        this.elements.settingsBtn.addEventListener('click', () => this.showSettingsPage());
        this.elements.backBtn.addEventListener('click', () => this.hideSettingsPage());
        this.elements.themeSelect.addEventListener('change', (e) => this.setTheme(e.target.value));
        this.elements.personaSelect.addEventListener('change', (e) => this.setPersona(e.target.value, true));
        this.elements.langDropdown.addEventListener('change', (event) => this.setLanguage(event.target.value, true));
        
        this.elements.questionInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                if (!this.elements.sendBtn.disabled) {
                    this.askAI();
                }
            }
        });
        
        this.elements.questionInput.addEventListener('input', () => {
            this.showSuggestions();
            this.updateSendButtonState();
            this.elements.questionInput.style.height = 'auto';
            this.elements.questionInput.style.height = this.elements.questionInput.scrollHeight + 'px';
        });
        
        this.elements.saveApiBtn.addEventListener('click', () => this.saveApiKey());
        this.elements.uploadImageBtn.addEventListener('click', () => this.elements.imageInput.click());
        this.elements.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.elements.removeImageBtn.addEventListener('click', () => this.removeImage());
        this.elements.toggleApiKey.addEventListener('click', () => this.toggleApiVisibility());
        
        this.elements.confirmBtnYes.addEventListener('click', () => {
            this.clearChat();
            this.hideClearConfirmation();
        });
        
        this.elements.confirmBtnNo.addEventListener('click', () => this.hideClearConfirmation());
        
        this.elements.toolsBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            const isActive = this.elements.toolsBtn.classList.contains('active');
            this.elements.suggestionBox.classList.remove('visible');
            if (!isActive) {
                this.elements.toolsMenu.classList.add('visible');
                this.elements.toolsBtn.classList.add('active');
            } else {
                this.elements.toolsMenu.classList.remove('visible');
                this.elements.toolsBtn.classList.remove('active');
            }
        });
        
        document.addEventListener('click', (event) => {
            if (this.elements.toolsMenu && !this.elements.toolsMenu.contains(event.target) && !this.elements.toolsBtn.contains(event.target)) {
                this.elements.toolsMenu.classList.remove('visible');
                this.elements.toolsBtn.classList.remove('active');
            }
        });
        
        window.addEventListener('scroll', () => this.checkIndicatorPosition(), { passive: true });
        window.addEventListener('online', () => this.updateConnectionStatus());
        window.addEventListener('offline', () => this.updateConnectionStatus());
    },

    // Fungsi-fungsi utama aplikasi
    initializeAppState() {
        // Implementasi fungsi initializeApp dari kode asli
        const savedLang = localStorage.getItem('miraiLanguage');
        if (savedLang && uiStrings.hasOwnProperty(savedLang)) {
            this.currentLanguage = savedLang;
        } else {
            this.currentLanguage = 'id';
        }

        this.currentPersona = localStorage.getItem('miraiPersona') || 'default';
        const savedTheme = localStorage.getItem('miraiTheme') || 'dark';
        const savedApiKey = localStorage.getItem('miraiApiKey');
        
        this.elements.langDropdown.value = this.currentLanguage;
        this.elements.personaSelect.value = this.currentPersona;
        
        if (savedApiKey) {
            this.currentApiKey = savedApiKey;
            this.elements.apiKeyInput.value = savedApiKey;
        }
        
        this.initializeSlashCommands(this.currentLanguage);
        this.setTheme(savedTheme);
        this.updateUI();
        
        const historyLoaded = this.loadChatHistory();
        if (!historyLoaded) {
            this.initializeNewChatSession();
        }
    },

    initializeSlashCommands(lang) {
        const s = uiStrings[lang];
        this.slashCommands = [
            { command: '/search', title: s.slashCmdSearchTitle, description: s.slashCmdSearchDesc },
            { command: '/translate', title: s.slashCmdTranslateTitle, description: s.slashCmdTranslateDesc },
            { command: '/summarize', title: s.slashCmdSummarizeTitle, description: s.slashCmdSummarizeDesc },
            { command: '/rephrase', title: s.slashCmdRephraseTitle, description: s.slashCmdRephraseDesc },
            { command: '/ideate', title: s.slashCmdIdeateTitle, description: s.slashCmdIdeateDesc },
            { command: '/fix', title: s.slashCmdFixTitle, description: s.slashCmdFixDesc },
            { command: '/explain', title: s.slashCmdExplainTitle, description: s.slashCmdExplainDesc },
            { command: '/code', title: s.slashCmdCodeTitle, description: s.slashCmdCodeDesc }
        ];
    },

    // ... (implementasi semua fungsi lainnya dari kode asli)
    // Semua fungsi seperti askAI, handleImageUpload, removeImage, dll.
    // akan dipindahkan ke sini dengan penyesuaian referensi this

    // Contoh implementasi beberapa fungsi:
    askAI() {
        // Implementasi askAI dari kode asli
        const userQuestion = this.elements.questionInput.value;
        if (userQuestion.trim() === '' && !this.currentImageData) return;
        
        // ... sisa implementasi
    },

    handleImageUpload(event) {
        // Implementasi handleImageUpload dari kode asli
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Silakan unggah file gambar (jpeg, png, webp).');
            return;
        }

        this.elements.imageInput.value = '';
        this.convertImageToBase64(file)
            .then(base64Data => {
                this.currentImageData = {
                    mimeType: file.type,
                    data: base64Data
                };
                
                this.elements.imagePreview.src = `data:${file.type};base64,${base64Data}`;
                this.elements.imagePreviewContainer.style.display = 'flex';
                this.toggleChatUI(true);
                this.updateSendButtonState();
            })
            .catch(error => {
                console.error('Error converting image:', error);
                this.removeImage();
            });
    },

    convertImageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = error => reject(error);
        });
    },

    removeImage() {
        this.currentImageData = null;
        this.elements.imagePreview.src = '';
        this.elements.imagePreviewContainer.style.display = 'none';
        this.elements.imageInput.value = '';
        this.updateSendButtonState();
    },

    // ... dan seterusnya untuk semua fungsi lainnya
};

// Fungsi global yang perlu diakses dari HTML
function copyToClipboard(element) {
    miraiApp.copyToClipboard(element);
}

function speakText(element) {
    miraiApp.speakText(element);
}
