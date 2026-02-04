// WebGazer Loader - Fallback CDN strategy
(function() {
    const cdns = [
        'https://cdn.jsdelivr.net/npm/webgazer/dist/webgazer.min.js',
        'https://unpkg.com/webgazer/dist/webgazer.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/webgazer/0.0.8/webgazer.min.js'
    ];
    
    let attempt = 0;
    
    function loadWebGazer() {
        if (attempt >= cdns.length) {
            console.error('❌ Failed to load WebGazer from all CDNs');
            window.__webgazerLoaded = false;
            return;
        }
        
        const script = document.createElement('script');
        script.src = cdns[attempt];
        script.async = true;
        
        script.onload = function() {
            if (window.webgazer) {
                console.log('✅ WebGazer loaded from:', cdns[attempt]);
                window.__webgazerLoaded = true;
            } else {
                attempt++;
                loadWebGazer();
            }
        };
        
        script.onerror = function() {
            console.warn('⚠️ Failed to load from:', cdns[attempt]);
            attempt++;
            loadWebGazer();
        };
        
        document.head.appendChild(script);
    }
    
    loadWebGazer();
})();
