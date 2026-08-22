import { useEffect, useRef } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/**
 * Renders Google's official "Continue with Google" button using
 * Google Identity Services and calls onCredential(idToken) on success.
 * Loads the GIS script lazily so the app doesn't depend on it at build time.
 */
export default function GoogleLoginButton({ onCredential }) {
  const divRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    function render() {
      if (!window.google || !divRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (resp) => onCredential(resp.credential)
      });
      window.google.accounts.id.renderButton(divRef.current, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 320,
        text: 'continue_with'
      });
    }

    if (window.google?.accounts?.id) {
      render();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = render;
      document.body.appendChild(script);
    }
  }, [onCredential]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="rounded-xl border border-dashed border-ink-100 bg-ink-50 px-4 py-3 text-center text-xs text-ink-300">
        Set VITE_GOOGLE_CLIENT_ID in your .env to enable Google Sign-In.
      </div>
    );
  }

  return <div ref={divRef} className="flex justify-center" />;
}
