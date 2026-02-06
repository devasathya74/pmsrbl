// Cache Busting Utility
// Forces page refresh on first load to prevent stale cache issues

(function () {
    'use strict';

    // Check if this page has been refreshed in this session
    const sessionKey = 'page_refreshed_' + window.location.pathname;

    if (!sessionStorage.getItem(sessionKey)) {
        console.log('🔄 First load detected - refreshing to clear cache...');

        // Mark as refreshed before reload to prevent infinite loop
        sessionStorage.setItem(sessionKey, 'true');

        // Force reload from server (bypass cache)
        window.location.reload(true);
    } else {
        console.log('✅ Cache cleared - page ready');
    }
})();
