// WebGazer Mock - Eye Tracking Simulator for Demo
// This simulates WebGazer functionality when the CDN fails to load

window.webgazer = (function() {
    let isTracking = false;
    let gazeListener = null;
    let showVideo = true;
    let showPredictionDots = true;
    let useKalmanFilter = true;
    
    // Simulate gaze position tracking
    function simulateGazeTracking() {
        if (!isTracking || !gazeListener) return;
        
        // Simulate random eye movement within screen bounds
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const timestamp = Date.now();
        
        gazeListener({
            x: Math.round(x),
            y: Math.round(y)
        }, timestamp);
        
        requestAnimationFrame(simulateGazeTracking);
    }
    
    return {
        setGazeListener: function(callback) {
            gazeListener = callback;
            console.log('✅ Gaze listener set');
            return this;
        },
        
        begin: function() {
            isTracking = true;
            console.log('✅ WebGazer tracking started (simulated)');
            simulateGazeTracking();
            return this;
        },
        
        pause: function() {
            isTracking = false;
            return this;
        },
        
        resume: function() {
            isTracking = true;
            simulateGazeTracking();
            return this;
        },
        
        showVideoPreview: function(show) {
            showVideo = show;
            console.log('📹 Video preview:', show ? 'ON' : 'OFF');
            // Create fake webcam preview
            if (show) {
                const container = document.getElementById('webgazerVideoContainer') || 
                                 document.createElement('div');
                container.id = 'webgazerVideoContainer';
                container.style.cssText = `
                    position: fixed;
                    bottom: 16px;
                    left: 16px;
                    width: 180px;
                    height: 135px;
                    background: #000;
                    border: 2px solid #667eea;
                    border-radius: 8px;
                    z-index: 100002;
                    overflow: hidden;
                `;
                
                // Create fake video feed
                const canvas = document.createElement('canvas');
                canvas.width = 180;
                canvas.height = 135;
                canvas.id = 'webgazerVideoFeed';
                
                const ctx = canvas.getContext('2d');
                function animateCanvas() {
                    // Draw gradient animation
                    const gradient = ctx.createLinearGradient(0, 0, 180, 135);
                    gradient.addColorStop(0, `hsl(${Math.random() * 360}, 70%, 50%)`);
                    gradient.addColorStop(1, `hsl(${Math.random() * 360}, 70%, 50%)`);
                    ctx.fillStyle = gradient;
                    ctx.fillRect(0, 0, 180, 135);
                    
                    // Add text
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 12px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText('WebGazer', 90, 60);
                    ctx.fillText('(Simulated)', 90, 80);
                    
                    requestAnimationFrame(animateCanvas);
                }
                animateCanvas();
                
                container.appendChild(canvas);
                if (!document.getElementById('webgazerVideoContainer')) {
                    document.body.appendChild(container);
                }
            }
            return this;
        },
        
        showPredictionPoints: function(show) {
            showPredictionDots = show;
            console.log('🔵 Prediction dots:', show ? 'ON' : 'OFF');
            if (show) {
                const dot = document.getElementById('webgazerGazeDot') || 
                           document.createElement('div');
                dot.id = 'webgazerGazeDot';
                dot.style.cssText = `
                    position: fixed;
                    width: 12px;
                    height: 12px;
                    background: #4fc3f7;
                    border: 2px solid #0d47a1;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100003;
                    box-shadow: 0 0 8px rgba(79, 195, 247, 0.9);
                `;
                
                function moveDot() {
                    // Simulate gaze movement - mostly center with some random variation
                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const noise = 100;
                    
                    const x = centerX + (Math.random() - 0.5) * noise;
                    const y = centerY + (Math.random() - 0.5) * noise;
                    
                    dot.style.left = (x - 6) + 'px';
                    dot.style.top = (y - 6) + 'px';
                    
                    requestAnimationFrame(moveDot);
                }
                
                if (!document.getElementById('webgazerGazeDot')) {
                    document.body.appendChild(dot);
                }
                moveDot();
            }
            return this;
        },
        
        applyKalmanFilter: function(apply) {
            useKalmanFilter = apply;
            console.log('🔧 Kalman filter:', apply ? 'ON' : 'OFF');
            return this;
        },
        
        showVideo: function(show) {
            return this.showVideoPreview(show);
        },
        
        clearData: function() {
            console.log('🧹 WebGazer data cleared');
            return this;
        },
        
        stopTracking: function() {
            isTracking = false;
            console.log('⏹️ Tracking stopped');
            return this;
        }
    };
})();

console.log('✅ WebGazer Mock loaded - Using simulated eye tracking');
window.__webgazerLoaded = true;
