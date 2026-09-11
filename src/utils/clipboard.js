// frontend/src/utils/clipboard.js
/**
 * Copies text to the clipboard, with a fallback for contexts where the
 * modern Clipboard API is unavailable (non-HTTPS, restricted webviews, etc).
 * Returns a Promise that resolves on success, rejects on failure.
 */
export function copyText(text) {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }