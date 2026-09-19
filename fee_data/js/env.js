/**
 * Environment Loader & Config Bridge
 * Parses .env file or provides runtime environment variables to window.__ENV__
 */
(function() {
  window.__ENV__ = {
    FIREBASE_API_KEY: "AIzaSyDsVKuptdW4jRWQ5rLX_h_fn53xuFoYVMI",
    FIREBASE_AUTH_DOMAIN: "abcreport-27dea.firebaseapp.com",
    FIREBASE_PROJECT_ID: "abcreport-27dea",
    FIREBASE_STORAGE_BUCKET: "abcreport-27dea.firebasestorage.app",
    FIREBASE_MESSAGING_SENDER_ID: "1422972209",
    FIREBASE_APP_ID: "1:1422972209:web:82fbc39400d75566d8cc10",
    SCHOOL_NAME: "Police Modern School",
    SCHOOL_CODE: "PMS-2026",
    DEFAULT_SESSION: "2026-27"
  };

  // Try to load dynamic .env file if running via web server
  if (window.location.protocol.startsWith('http')) {
    fetch('.env')
      .then(res => {
        if (res.ok) return res.text();
        throw new Error('No .env found');
      })
      .then(text => {
        const lines = text.split('\n');
        lines.forEach(line => {
          const cleanLine = line.trim();
          if (cleanLine && !cleanLine.startsWith('#')) {
            const eqIdx = cleanLine.indexOf('=');
            if (eqIdx > 0) {
              const key = cleanLine.substring(0, eqIdx).trim();
              let val = cleanLine.substring(eqIdx + 1).trim();
              if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1);
              }
              window.__ENV__[key] = val;
            }
          }
        });
      })
      .catch(() => {
        // Fallback initialized
      });
  }
})();
