// processingapi.js (UPDATED VERSION)
// Sistem dekripsi untuk config.medf dengan password kode perhitungan + Search Keys support

const MEDF_CONFIG = {
    saltLength: 16,
    ivLength: 12,
    iterations: 100000,
    passwordCode: 271828,
    // Header Authenticity
    HEADER_TEXT: "{MirAI Encrypted Data Files v2.0 By Allwaysever}",
    HEADER_CODE_MULTIPLIER: 3,
    HEADER_CODE_ADDITION: 2
};

// === FUNGSI UTAMA ===
function generateHeaderCode(text) {
    let code = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const transformedCode = (charCode + MEDF_CONFIG.HEADER_CODE_ADDITION) * MEDF_CONFIG.HEADER_CODE_MULTIPLIER;
        code += transformedCode.toString().padStart(4, '0');
    }
    return code;
}

function validateSignature(text, code) {
    try {
        if (text !== MEDF_CONFIG.HEADER_TEXT) {
            console.warn('❌ Header text mismatch');
            return false;
        }
        
        const expectedCode = generateHeaderCode(text);
        
        if (code !== expectedCode) {
            console.warn('❌ Header code mismatch');
            return false;
        }
        
        const expectedLength = MEDF_CONFIG.HEADER_TEXT.length * 4;
        if (code.length !== expectedLength || !/^\d+$/.test(code)) {
            console.warn('❌ Invalid code format');
            return false;
        }
        
        console.log('✅ Signature validation passed');
        return true;
        
    } catch (error) {
        console.error('Signature validation error:', error);
        return false;
    }
}

function generatePasswordFromCode(code) {
    let num = Math.abs(code);
    let result = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    while (num > 0) {
        const remainder = num % 26;
        result = alphabet[remainder] + result;
        num = Math.floor(num / 26);
    }
    
    if (!result) result = 'MIRAI';
    const checksum = code.toString().split('').reduce((a, b) => a + parseInt(b), 0) % 26;
    result += alphabet[checksum];
    
    return result;
}

// === FUNGSI DECRYPT UNTUK CHAT.HTML ===
async function extractApiKeyFromConfig(fileBuffer, code) {
    const data = await decryptMEDF(fileBuffer, code);
    
    // Cari API Key di berbagai kemungkinan field
    const apiKey = data.apiKey || 
                   data.API_KEY || 
                   data.apikey || 
                   data.googleApiKey || 
                   data.geminiApiKey;
    
    if (!apiKey) {
        throw new Error("API Key tidak ditemukan dalam file config!");
    }
    
    return apiKey;
}

async function decryptMEDF(fileBuffer, code) {
    try {
        const password = generatePasswordFromCode(code);
        
        const uint8View = new Uint8Array(fileBuffer);
        const salt = uint8View.slice(0, MEDF_CONFIG.saltLength);
        const iv = uint8View.slice(MEDF_CONFIG.saltLength, MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        const encryptedData = uint8View.slice(MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        
        console.log('🔓 MEDF Decryption for chat.html:', {
            code: code,
            totalSize: fileBuffer.byteLength
        });
        
        const encoder = new TextEncoder();
        
        const passwordKey = await crypto.subtle.importKey(
            "raw", 
            encoder.encode(password), 
            "PBKDF2", 
            false, 
            ["deriveKey"]
        );
        
        const key = await crypto.subtle.deriveKey(
            { 
                name: "PBKDF2", 
                salt: salt, 
                iterations: MEDF_CONFIG.iterations, 
                hash: "SHA-256" 
            },
            passwordKey, 
            { name: "AES-GCM", length: 256 }, 
            false, 
            ["decrypt"]
        );
        
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv }, 
            key, 
            encryptedData
        );
        
        const decryptedText = new TextDecoder().decode(decrypted);
        const data = JSON.parse(decryptedText);
        
        // Validasi authenticity
        console.log('🔍 Validating MEDF authenticity for chat.html...');
        
        if (!data._signature || !data._signature.headerText || !data._signature.headerCode) {
            throw new Error("❌ File .medf tidak memiliki signature keaslian!");
        }
        
        const isValid = validateSignature(data._signature.headerText, data._signature.headerCode);
        
        if (!isValid) {
            throw new Error("❌ File .medf Tidak Otentik atau Corrupt!");
        }
        
        console.log('✅ File .medf verified as authentic!');
        
        // Hapus signature dari data sebelum dikembalikan
        delete data._signature;
        
        return data;
        
    } catch (error) {
        console.error('❌ MEDF Decryption Error:', error);
        throw new Error("Kode perhitungan salah atau file rusak!");
    }
}

// === FUNGSI BARU UNTUK SEARCH KEYS ===
async function getSearchKeysFromConfig(fileBuffer, code) {
    const data = await decryptMEDF(fileBuffer, code);
    
    console.log('🔍 Looking for search keys in:', Object.keys(data));
    
    // Cari searchConfig dulu
    if (data.searchConfig) {
        console.log('✅ Found searchConfig structure');
        return data.searchConfig;
    }
    
    // Fallback: cari individual keys
    const searchKeys = {};
    
    // Google keys
    if (data.googleApiKey || data.googleCx || data.googleSearchApiKey) {
        searchKeys.google = {
            apiKey: data.googleApiKey || data.googleSearchApiKey || '',
            cx: data.googleCx || data.searchEngineId || '',
            enabled: !!(data.googleApiKey || data.googleSearchApiKey) && !!(data.googleCx || data.searchEngineId)
        };
    }
    
    // NewsAPI keys
    if (data.newsApiKey || data.newsAPIKey) {
        searchKeys.newsapi = {
            apiKey: data.newsApiKey || data.newsAPIKey || '',
            enabled: !!(data.newsApiKey || data.newsAPIKey)
        };
    }
    
    // DuckDuckGo
    if (typeof data.enableDuckDuckGo !== 'undefined') {
        searchKeys.duckduckgo = {
            enabled: Boolean(data.enableDuckDuckGo)
        };
    }
    
    // Wikipedia
    if (typeof data.enableWikipedia !== 'undefined') {
        searchKeys.wikipedia = {
            enabled: Boolean(data.enableWikipedia)
        };
    }
    
    console.log('🔍 Extracted search keys:', searchKeys);
    return searchKeys;
}

async function getSearchKeys() {
    try {
        console.log('🔍 getSearchKeys() called - loading from config.medf');
        
        // Load config.medf
        const response = await fetch('config.medf');
        if (!response.ok) {
            console.warn('config.medf not found, returning empty search config');
            return {};
        }
        
        const buffer = await response.arrayBuffer();
        const savedCode = localStorage.getItem('miraiConfigCode');
        let code = MEDF_CONFIG.passwordCode;
        
        if (savedCode) {
            try {
                code = parseInt(savedCode);
            } catch (e) {
                console.warn('Invalid code in localStorage, using default');
            }
        }
        
        const searchKeys = await getSearchKeysFromConfig(buffer, code);
        console.log('✅ getSearchKeys() success:', Object.keys(searchKeys));
        return searchKeys;
        
    } catch (error) {
        console.error('❌ Failed to get search keys:', error);
        return {};
    }
}

// === FUNGSI ENCRYPT UNTUK GENERATOR ===
async function encryptToMEDF(data, code) {
    try {
        const password = generatePasswordFromCode(code);
        
        // Tambah authenticity signature
        const signatureData = {
            _signature: {
                headerText: MEDF_CONFIG.HEADER_TEXT,
                headerCode: generateHeaderCode(MEDF_CONFIG.HEADER_TEXT),
                timestamp: new Date().toISOString(),
                version: "2.0",
                generator: "MEDF Processor"
            },
            ...data
        };
        
        console.log('🔐 Encrypting with signature');
        
        const encoder = new TextEncoder();
        const salt = crypto.getRandomValues(new Uint8Array(MEDF_CONFIG.saltLength));
        const iv = crypto.getRandomValues(new Uint8Array(MEDF_CONFIG.ivLength));
        
        const passwordKey = await crypto.subtle.importKey(
            "raw", 
            encoder.encode(password), 
            "PBKDF2", 
            false, 
            ["deriveKey"]
        );
        
        const key = await crypto.subtle.deriveKey(
            { 
                name: "PBKDF2", 
                salt: salt, 
                iterations: MEDF_CONFIG.iterations, 
                hash: "SHA-256" 
            },
            passwordKey, 
            { name: "AES-GCM", length: 256 }, 
            false, 
            ["encrypt"]
        );
        
        const encrypted = await crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv }, 
            key, 
            encoder.encode(JSON.stringify(signatureData))
        );
        
        // Gabungkan salt + iv + data terenkripsi
        const finalBuffer = new Uint8Array(
            salt.length + iv.length + encrypted.byteLength
        );
        
        finalBuffer.set(salt, 0);
        finalBuffer.set(iv, salt.length);
        finalBuffer.set(new Uint8Array(encrypted), salt.length + iv.length);
        
        return new Blob([finalBuffer], { type: "application/octet-stream" });
        
    } catch (error) {
        console.error('❌ MEDF Encryption Error:', error);
        throw error;
    }
}

// === EXPORT UNTUK GLOBAL ACCESS ===
if (typeof window !== 'undefined') {
    window.MEDFProcessor = {
        // Existing functions
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        
        // NEW: Search keys support
        getSearchKeys,
        getSearchKeysFromConfig,
        
        // Constants
        DEFAULT_CODE: MEDF_CONFIG.passwordCode,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT,
        VERSION: "2.0"
    };
}

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        getSearchKeys,
        getSearchKeysFromConfig,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        DEFAULT_CODE: MEDF_CONFIG.passwordCode,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT,
        VERSION: "2.0"
    };
}