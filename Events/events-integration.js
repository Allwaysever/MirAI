// events-integration.js
// File ini diinclude di chat.html TANPA mengubah struktur yang ada

(function() {
    console.log('🎭 Loading MirAI Events System...');
    
    // Cek jika events sudah di-load
    if (window.MirAIEventsLoaded) return;
    window.MirAIEventsLoaded = true;
    
    // Method 1: Inject as iframe (paling aman)
    function injectEventSystem() {
        // Cek jika sudah ada
        if (document.getElementById('mirai-events-frame')) return;
        
        // Buat iframe
        const iframe = document.createElement('iframe');
        iframe.id = 'mirai-events-frame';
        iframe.src = 'https://allwaysevermirai.netlify.app/events/events-popup.html';
        iframe.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            z-index: 9998;
            display: none;
        `;
        iframe.onload = function() {
            console.log('🎭 Events iframe loaded');
        };
        
        document.body.appendChild(iframe);
    }
    
    // Method 2: Inject script langsung
    function injectScript() {
        const script = document.createElement('script');
        script.src = 'https://allwaysevermirai.netlify.app/events/events-standalone.js';
        script.onload = function() {
            console.log('🎭 Events script loaded');
            if (window.MirAIEvents) {
                window.MirAIEvents.init();
            }
        };
        document.head.appendChild(script);
    }
    
    // Tunggu sampai chat.html selesai load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(injectEventSystem, 2000); // Delay 2 detik
        });
    } else {
        setTimeout(injectEventSystem, 2000);
    }
    
    // Tambahkan menu Events ke settings panel (jika ada)
    function addEventsToSettings() {
        setTimeout(() => {
            const settingsBody = document.querySelector('.settings-body .settings-content');
            if (settingsBody) {
                const eventsSection = document.createElement('div');
                eventsSection.innerHTML = `
                    <h3>🎉 Active Events</h3>
                    <div class="settings-option">
                        <p>Check out special events and promotions</p>
                        <button id="viewEventsBtn" class="settings-credits-btn" 
                                style="background: linear-gradient(135deg, #667eea, #764ba2); margin-top: 10px;">
                            <i class="fas fa-calendar-star"></i> View Events
                        </button>
                    </div>
                `;
                
                settingsBody.insertBefore(eventsSection, settingsBody.querySelector('.settings-about'));
                
                // Event listener untuk tombol
                document.getElementById('viewEventsBtn')?.addEventListener('click', function() {
                    // Buka events page
                    window.open('https://allwaysevermirai.netlify.app/events', '_blank');
                });
            }
        }, 3000);
    }
    
    // Tambahkan badge notifikasi jika ada event aktif
    function addNotificationBadge() {
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            const badge = document.createElement('span');
            badge.id = 'eventBadge';
            badge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: #ff4757;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                display: none;
            `;
            badge.textContent = '!';
            settingsBtn.style.position = 'relative';
            settingsBtn.appendChild(badge);
            
            // Cek event aktif secara periodik
            setInterval(async () => {
                try {
                    const response = await fetch('https://raw.githubusercontent.com/Allwaysever/MirAI/main/Pages/Events/events.json');
                    const data = await response.json();
                    const now = new Date();
                    const activeEvents = data.events.filter(event => {
                        return now >= new Date(event.startDate) && now <= new Date(event.endDate);
                    });
                    
                    badge.style.display = activeEvents.length > 0 ? 'flex' : 'none';
                } catch (e) {
                    console.log('Could not check events:', e);
                }
            }, 300000); // Cek setiap 5 menit
        }
    }
    
    // Jalankan integrasi
    setTimeout(() => {
        injectEventSystem();
        addEventsToSettings();
        addNotificationBadge();
    }, 1000);
})();