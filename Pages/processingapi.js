// processingapi.js
// Sistem enkripsi/dekripsi untuk file .medf (MirAI Encrypted Data Files)
// Bisa digunakan di browser (via window.MEDFProcessor) dan Node.js (via module.exports)

const MEDF_CONFIG = {
    saltLength: 16,
    ivLength: 12,
    iterations: 100000,
    passwordCode: 271828,
    HEADER_TEXT: "{MirAI Encrypted Data Files v1.0 By Allwaysever}",
    HEADER_CODE_MULTIPLIER: 3,
    HEADER_CODE_ADDITION: 2
};

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
    if (text !== MEDF_CONFIG.HEADER_TEXT) return false;
    const expectedCode = generateHeaderCode(text);
    return code === expectedCode;
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

async function encryptToMEDF(data, code = MEDF_CONFIG.passwordCode) {
    const password = generatePasswordFromCode(code);
    const signatureData = {
        _signature: {
            headerText: MEDF_CONFIG.HEADER_TEXT,
            headerCode: generateHeaderCode(MEDF_CONFIG.HEADER_TEXT),
            timestamp: new Date().toISOString(),
            version: "1.0"
        },
        ...data
    };
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(MEDF_CONFIG.saltLength));
    const iv = crypto.getRandomValues(new Uint8Array(MEDF_CONFIG.ivLength));
    
    let keyMaterial;
    if (typeof crypto.subtle !== 'undefined') {
        // Browser Web Crypto API
        const passwordKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
        keyMaterial = await crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: MEDF_CONFIG.iterations, hash: "SHA-256" },
            passwordKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["encrypt"]
        );
    } else {
        // Node.js – akan menggunakan implementasi terpisah, tapi di browser aman
        throw new Error("Web Crypto API not available");
    }
    
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        keyMaterial,
        encoder.encode(JSON.stringify(signatureData))
    );
    
    const finalBuffer = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    finalBuffer.set(salt, 0);
    finalBuffer.set(iv, salt.length);
    finalBuffer.set(new Uint8Array(encrypted), salt.length + iv.length);
    return new Blob([finalBuffer], { type: "application/octet-stream" });
}

async function decryptMEDF(fileBuffer, code = MEDF_CONFIG.passwordCode) {
    const password = generatePasswordFromCode(code);
    const uint8View = new Uint8Array(fileBuffer);
    const salt = uint8View.slice(0, MEDF_CONFIG.saltLength);
    const iv = uint8View.slice(MEDF_CONFIG.saltLength, MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
    const encryptedData = uint8View.slice(MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
    const encoder = new TextEncoder();
    
    let keyMaterial;
    if (typeof crypto.subtle !== 'undefined') {
        const passwordKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
        keyMaterial = await crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: MEDF_CONFIG.iterations, hash: "SHA-256" },
            passwordKey,
            { name: "AES-GCM", length: 256 },
            false,
            ["decrypt"]
        );
    } else {
        throw new Error("Web Crypto API not available");
    }
    
    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, keyMaterial, encryptedData);
    const decryptedText = new TextDecoder().decode(decrypted);
    const data = JSON.parse(decryptedText);
    
    if (!data._signature || !data._signature.headerText || !data._signature.headerCode) {
        throw new Error("File .medf tidak memiliki signature keaslian!");
    }
    const isValid = validateSignature(data._signature.headerText, data._signature.headerCode);
    if (!isValid) throw new Error("File .medf Tidak Otentik atau Corrupt!");
    
    delete data._signature;
    return data;
}

async function extractApiKeyFromConfig(fileBuffer, code) {
    const data = await decryptMEDF(fileBuffer, code);
    const apiKey = data.apiKey || data.API_KEY || data.apikey || data.googleApiKey || data.geminiApiKey;
    if (!apiKey) throw new Error("API Key tidak ditemukan dalam file config!");
    return apiKey;
}

async function loadFullConfigFromFile(code = MEDF_CONFIG.passwordCode) {
    try {
        const response = await fetch('config.medf');
        if (!response.ok) throw new Error('config.medf not found');
        const buffer = await response.arrayBuffer();
        return await decryptMEDF(buffer, code);
    } catch (error) {
        console.error('Failed to load config.medf:', error);
        return null;
    }
}

// Ekspor untuk browser
if (typeof window !== 'undefined') {
    window.MEDFProcessor = {
        encryptToMEDF,
        decryptMEDF,
        extractApiKeyFromConfig,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        loadFullConfig: loadFullConfigFromFile,
        DEFAULT_CODE: MEDF_CONFIG.passwordCode,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT
    };
}

// Ekspor untuk Node.js (ES module)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        encryptToMEDF,
        decryptMEDF,
        extractApiKeyFromConfig,
        generatePasswordFromCode,
        generateHeaderCode,
        validateSignature,
        DEFAULT_CODE: MEDF_CONFIG.passwordCode,
        HEADER_TEXT: MEDF_CONFIG.HEADER_TEXT
    };
}