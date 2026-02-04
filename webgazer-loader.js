// WebGazer Loader with CDN fallback and mock fallback
(function() {
    const cdns = [
        'https://cdn.jsdelivr.net/npm/webgazer/dist/webgazer.min.js',
        'https://unpkg.com/webgazer/dist/webgazer.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/webgazer/0.0.8/webgazer.min.js'
    ];
    
    let attempt = 0;
    
    function loadScript(url) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = url;
            script.async = true;
            
            script.onload = function() {
                if (window.webgazer) {
                    console.log('✅ WebGazer loaded from:', url);
                    window.__webgazerLoaded = true;
                    resolve(true);
                } else {
                    resolve(false);
                }
            };
            
            script.onerror = function() {
                console.warn('⚠️ Failed to load from:', url);
                resolve(false);
            };
            
            setTimeout(() => resolve(false), 5000); // 5 second timeout per CDN
            document.head.appendChild(script);
        });
    }
    
    async function loadWebGazer() {
        for (const url of cdns) {
            const loaded = await loadScript(url);
            if (loaded) return;
        }
        
        // All CDNs failed, load mock version
        console.warn('⚠️ All CDNs failed, loading WebGazer mock (simulated tracking)');
        const mockScript = document.createElement('script');
        mockScript.src = 'webgazer-mock.js';
        mockScript.async = true;
        document.head.appendChild(mockScript);
    }
    
    loadWebGazer();
})();
