/**
 * Allwaysever MirAI - Processing System (V1.0)
 * Authorized by CEO Yoga - 251022
 */

// Password Rahasia: AllwayseverMirAIbyAllwaysever251022 (Geser +5)
const _0x41f2 = [70, 113, 113, 124, 102, 126, 120, 106, 123, 106, 123, 82, 110, 119, 70, 78, 103, 126, 70, 113, 113, 124, 102, 126, 120, 106, 123, 106, 123, 55, 58, 54, 53, 55, 55];

const AllwayseverUtils = {
    // Fungsi mengambil password asli
    getSecret: () => _0x41f2.map(c => String.fromCharCode(c - 5)).join(''),

    // Fungsi utama injeksi API Key
    bootMirAIConfig: async function(medfUrl) {
        console.log("📂 Allwaysever System: Fetching secure config...");
        try {
            const response = await fetch(medfUrl);
            if (!response.ok) throw new Error("File .medf tidak terjangkau");
            
            const blob = await response.blob();
            const pass = this.getSecret();
            
            // processImportMEDF harus ada di chat.html (sebagai engine dekripsi)
            const decryptedData = await processImportMEDF(blob, pass);
            
            if (decryptedData && decryptedData.defaultKey) {
                // Injeksi langsung ke variabel global MirAI
                window.currentApiKey = decryptedData.defaultKey;
                console.log("✅ Allwaysever: API Key Injected Successfully!");
                return true;
            }
        } catch (err) {
            console.error("❌ Allwaysever Error:", err.message);
            return false;
        }
    }
};
