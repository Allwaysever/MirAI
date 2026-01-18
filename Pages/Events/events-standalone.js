        // ===== KONFIGURASI =====
        const EVENTS_JSON_URL = 'https://raw.githubusercontent.com/Allwaysever/MirAI/main/events.json';
        const STORAGE_KEY = 'mirai_events_viewed';
        
        // ===== VARIABEL GLOBAL =====
        let currentEvent = null;
        let eventsData = [];
        let viewedEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        // ===== FUNGSI UTAMA =====
        async function loadEvents() {
            try {
                const response = await fetch(EVENTS_JSON_URL);
                eventsData = await response.json();
                console.log('🎭 Events loaded:', eventsData.events.length);
                return eventsData.events;
            } catch (error) {
                console.error('❌ Failed to load events:', error);
                return [];
            }
        }
        
        function getActiveEvents() {
            const now = new Date();
            return eventsData.events.filter(event => {
                const start = new Date(event.startDate);
                const end = new Date(event.endDate);
                return now >= start && now <= end;
            });
        }
        
        function getUnviewedEvents(activeEvents) {
            return activeEvents.filter(event => !viewedEvents[event.id]);
        }
        
        function displayEvent(event) {
            currentEvent = event;
            
            // Update UI dengan data event
            document.getElementById('eventTitle').textContent = event.title;
            document.getElementById('eventDescription').textContent = event.description;
            document.getElementById('eventLink').href = event.url;
            
            // Format tanggal
            const start = new Date(event.startDate).toLocaleDateString();
            const end = new Date(event.endDate).toLocaleDateString();
            document.getElementById('eventDates').textContent = `${start} - ${end}`;
            
            // Set banner
            const banner = document.getElementById('eventBanner');
            if (event.banner) {
                banner.innerHTML = `<img src="${event.banner}" alt="${event.title}" style="width:100%;height:100%;object-fit:cover;">`;
            } else if (event.icon) {
                banner.innerHTML = `<i class="${event.icon}"></i>`;
            }
            
            // Custom color jika ada
            if (event.backgroundColor) {
                document.querySelector('.event-header').style.background = event.backgroundColor;
            }
            
            // Tampilkan popup
            document.getElementById('eventOverlay').classList.add('active');
            document.getElementById('eventPopup').classList.add('active');
            
            // Scroll ke top
            window.scrollTo(0, 0);
        }
        
        function closeEventPopup() {
            document.getElementById('eventOverlay').classList.remove('active');
            document.getElementById('eventPopup').classList.remove('active');
            
            // Mark as viewed jika checkbox dicentang
            const dontShowAgain = document.getElementById('dontShowAgain').checked;
            if (dontShowAgain && currentEvent) {
                viewedEvents[currentEvent.id] = true;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedEvents));
            }
            
            // Reset checkbox
            document.getElementById('dontShowAgain').checked = false;
        }
        
        function showNextEvent() {
            const activeEvents = getActiveEvents();
            const unviewedEvents = getUnviewedEvents(activeEvents);
            
            if (unviewedEvents.length > 0) {
                // Urutkan berdasarkan priority (high > medium > low)
                unviewedEvents.sort((a, b) => {
                    const priority = { high: 3, medium: 2, low: 1 };
                    return (priority[b.priority] || 1) - (priority[a.priority] || 1);
                });
                
                // Tampilkan event pertama
                displayEvent(unviewedEvents[0]);
                return true;
            }
            return false;
        }
        
        // ===== EVENT LISTENERS =====
        document.getElementById('eventCloseBtn').addEventListener('click', closeEventPopup);
        document.getElementById('eventOverlay').addEventListener('click', closeEventPopup);
        document.getElementById('eventLaterBtn').addEventListener('click', closeEventPopup);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeEventPopup();
        });
        
        // ===== INISIALISASI =====
        async function initEventSystem() {
            console.log('🎭 Initializing event system...');
            
            // Load events data
            await loadEvents();
            
            // Cek URL parameter untuk manual event view
            const urlParams = new URLSearchParams(window.location.search);
            const eventId = urlParams.get('event');
            
            if (eventId) {
                // Mode manual: tampilkan event spesifik
                const event = eventsData.events.find(e => e.id === eventId);
                if (event) {
                    displayEvent(event);
                }
            } else {
                // Mode otomatis: tampilkan event yang belum dilihat
                setTimeout(() => {
                    if (!showNextEvent()) {
                        console.log('🎭 No unviewed events at the moment');
                    }
                }, 3000); // Delay 3 detik biar app loading dulu
            }
        }
        
        // ===== API UNTUK CHAT.HTML =====
        // Ini bisa diinclude di chat.html dengan tag script
        window.MirAIEvents = {
            init: initEventSystem,
            showEvent: (eventId) => {
                const event = eventsData.events.find(e => e.id === eventId);
                if (event) displayEvent(event);
            },
            showActiveEvents: () => {
                const active = getActiveEvents();
                if (active.length > 0) {
                    // Untuk demo, tampilkan yang pertama
                    displayEvent(active[0]);
                }
            },
            resetViewedEvents: () => {
                localStorage.removeItem(STORAGE_KEY);
                viewedEvents = {};
                alert('Event history cleared!');
            },
            getEventList: () => eventsData.events
        };
        
        // Jalankan saat page load
        window.addEventListener('DOMContentLoaded', initEventSystem);