// processingapi.js
// Sistem dekripsi untuk confiq.medf dengan password kode perhitungan

const MEDF_CONFIG = {
    saltLength: 16,
    ivLength: 12,
    iterations: 100000,
    passwordCode: 271828  // Kode perhitungan default (e = 2.71828 ≈ 271828)
};

/**
 * Menghasilkan password dari kode perhitungan
 * @param {number} code - Kode perhitungan
 * @returns {string} - Password dalam bentuk huruf
 */
function generatePasswordFromCode(code) {
    // Konversi angka ke basis 26 (A-Z)
    let num = Math.abs(code);
    let result = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    while (num > 0) {
        const remainder = num % 26;
        result = alphabet[remainder] + result;
        num = Math.floor(num / 26);
    }
    
    // Jika hasil kosong, gunakan default
    if (!result) result = 'MIRAI';
    
    // Tambahkan checksum sederhana
    const checksum = code.toString().split('').reduce((a, b) => a + parseInt(b), 0) % 26;
    result += alphabet[checksum];
    
    return result;
}

/**
 * Mendekripsi file .medf
 * @param {ArrayBuffer} fileBuffer - Buffer file .medf
 * @param {number} code - Kode perhitungan
 * @returns {Promise<Object>} - Data JSON yang didekripsi
 */
async function decryptMEDF(fileBuffer, code) {
    try {
        // Generate password dari kode
        const password = generatePasswordFromCode(code);
        
        // Parse buffer
        const uint8View = new Uint8Array(fileBuffer);
        
        // Ekstrak bagian-bagian
        const salt = uint8View.slice(0, MEDF_CONFIG.saltLength);
        const iv = uint8View.slice(MEDF_CONFIG.saltLength, MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        const encryptedData = uint8View.slice(MEDF_CONFIG.saltLength + MEDF_CONFIG.ivLength);
        
        console.log('🔓 MEDF Decryption:', {
            code: code,
            password: password,
            totalSize: fileBuffer.byteLength,
            saltSize: salt.length,
            ivSize: iv.length,
            dataSize: encryptedData.length
        });
        
        const encoder = new TextEncoder();
        
        // Import key dari password
        const passwordKey = await crypto.subtle.importKey(
            "raw", 
            encoder.encode(password), 
            "PBKDF2", 
            false, 
            ["deriveKey"]
        );
        
        // Derive key menggunakan salt
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
        
        // Decrypt data
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv }, 
            key, 
            encryptedData
        );
        
        // Parse JSON hasil decrypt
        const decryptedText = new TextDecoder().decode(decrypted);
        return JSON.parse(decryptedText);
        
    } catch (error) {
        console.error('❌ MEDF Decryption Error:', error);
        throw new Error("Kode perhitungan salah atau file rusak!");
    }
}

/**
 * Mengenkripsi data menjadi .medf
 * @param {Object} data - Data JSON untuk dienkripsi
 * @param {number} code - Kode perhitungan
 * @returns {Promise<Blob>} - Blob file .medf
 */
async function encryptToMEDF(data, code) {
    try {
        // Generate password dari kode
        const password = generatePasswordFromCode(code);
        
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
            encoder.encode(JSON.stringify(data))
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

/**
 * Mengekstrak API Key dari confiq.medf
 * @param {ArrayBuffer} fileBuffer - Buffer file confiq.medf
 * @param {number} code - Kode perhitungan
 * @returns {Promise<string>} - API Key yang didekripsi
 */
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

// Export untuk penggunaan di browser
if (typeof window !== 'undefined') {
    window.MEDFProcessor = {
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        generatePasswordFromCode,
        DEFAULT_CODE: MEDF_CONFIG.passwordCode
    };
}

// Export untuk Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        decryptMEDF,
        encryptToMEDF,
        extractApiKeyFromConfig,
        generatePasswordFromCode,
        DEFAULT_CODE: MEDF_CONFIG.passwordCode
    };
}
