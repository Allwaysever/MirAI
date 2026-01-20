// processingapi.js
// Sistem enkripsi/dekripsi untuk config.medf

const MEDF_CONFIG = {
    saltLength: 16,
    ivLength: 12,
    iterations: 100000,
    DEFAULT_CODE: 271828,
    HEADER_TEXT: "{MirAI Encrypted Data Files v2.0 By Allwaysever}"
};

function generateHeaderCode(text) {
    let code = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const transformedCode = (charCode + 2) * 3;
        code += transformedCode.toString().padStart(4, '0');
    }
    return code;
}

function validateSignature(text, code) {
    try {
        if (text !== MEDF_CONFIG.HEADER_TEXT) {
            return false;
        }
        
        const expectedCode = generateHeaderCode(text);
        return code === expectedCode;
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

async function encryptToMEDF(data, code) {
    try {
        const password = generatePasswordFromCode(code);
        
        const signatureData = {
            _signature: {
                headerText: MEDF_CONFIG.HEADER_TEXT,
                headerCode: generateHeaderCode(MEDF_CONFIG.HEADER_TEXT),
                timestamp: new Date().toISOString(),
                version: "2.0",
                generator: "MirAI MEDF Processor"
            },
            ...data
        };
        
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
        
        const finalBuffer = new Uint8Array(
            salt.length + iv.length + encrypted.byteLength
        );
        
        finalBuffer.set(salt, 0);
        finalBuffer.set(iv, salt.length);
        finalBuffer.set(new Uint8Array(encrypted), salt.length + iv.length);
        
        return new Blob([finalBuffer], { type: "application/octet-stream" });
        
    } catch (error) {
        console.error('MEDF Encryption Error:', error);
        throw error;
    }
}

async function decryptMEDF(fileBuffer, code) {
    try {
        const password = generatePasswordFromCode(code);
        
        const uint8View = new Uint8Array(fileBuffer);
        const salt = uint8View.slice(0, MEDF_CONFIG.saltLength);
        const iv = uint8View.slice(MEDF_CONFIG.saltLength, MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        const encryptedData = uint8View.slice(MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        
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
        
        if (!data._signature || !data._signature.headerText || !data._signature.headerCode) {
            throw new Error("File tidak memiliki signature keaslian!");
        }
        
        const isValid = validateSignature(data._signature.headerText, data._signature.headerCode);
        
        if (!isValid) {
            throw new Error("File tidak otentik atau telah dimodifikasi!");
        }
        
        return data;
        
    } catch (error) {
        console.error('MEDF Decryption Error:', error);
        throw new Error("Kode perhitungan salah atau file rusak!");
    }
}

async function extractApiKeyFromConfig(fileBuffer, code) {
    const data = await decryptMEDF(fileBuffer, code);
    
    const apiKey = data.apiKey || data.API_KEY || data.apikey || data.googleApiKey || data.geminiApiKey;
    
    if (!apiKey) {
        throw new Error("API Key tidak ditemukan dalam file config!");
    }
    
    return apiKey;
}

async function getSearchKeys() {
    try {
        const response = await fetch('config.medf');
        if (!response.ok) {
            return {};
        }
        
        const buffer = await response.arrayBuffer();
        const savedCode = localStorage.getItem('miraiConfigCode');
        let code = MEDF_CONFIG.DEFAULT_CODE;
        
        if (savedCode) {
            try {
                code = parseInt(savedCode);
            } catch (e) {
                console.warn('Kode tidak valid, menggunakan default');
            }
        }
        
        const data = await decryptMEDF(buffer, code);
        
        if (data.searchConfig) {
            return data.searchConfig;
        }
        
        return {};
        
    } catch (error) {
        console.error('Gagal mengambil search keys:', error);
        return {};
    }
}

if (typeof window !== 'undefined') {
    window.MEDFProcessor = {
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        getSearchKeys,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        DEFAULT_CODE: MEDF_CONFIG.DEFAULT_CODE,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT,
        VERSION: "2.0"
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        getSearchKeys,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        DEFAULT_CODE: MEDF_CONFIG.DEFAULT_CODE,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT,
        VERSION: "2.0"
    };
}