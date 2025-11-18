// Konfigurasi dan variabel global MirAI
const miraiConfig = {
    DEFAULT_API_KEY: 'AIzaSyBXwU-_QvSORZ6s1CN03i-gvliqcZzMieg',
    MODEL: 'gemini-2.5-flash',
    MAX_HISTORY_LENGTH: 50,
    LOADING_DURATION: 3000
};

// Generate version based on date
function generateVersion(major, minor, patch) {
    const now = new Date();
    const yymmdd = now.getFullYear().toString().slice(-2) + 
                   String(now.getMonth() + 1).padStart(2, '0') + 
                   String(now.getDate()).padStart(2, '0');
    return `${major}.${minor}.${patch}.${yymmdd}`;
}

const MIRAI_VERSION = generateVersion(2, 11, 0);
