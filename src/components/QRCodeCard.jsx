import { Download, Copy, ExternalLink, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from './Button';
import { Card } from './Basics';
// import { copyText } from '../utils/clipboard';

export default function QRCodeCard({ url, qrDataUrl, slug, loading }) {
  function copyLink() {
    if (!url) {
      toast.error('Link is still loading — try again in a moment.');
      return;
    }
    copyText(url)
      .then(() => toast.success('Review link copied!'))
      .catch(() => toast.error('Could not copy — please copy the link manually.'));
  }

  function downloadQr() {
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `${slug || 'review'}-qr.png`;
    a.click();
  }

  return (
    <Card>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-xl2 border border-ink-100 bg-white p-3">
          {loading ? (
            <div className="h-6 w-6 animate-pulse rounded-full bg-ink-100" />
          ) : qrDataUrl ? (
            <img src={qrDataUrl} alt="QR code" className="h-full w-full object-contain" />
          ) : (
            <QrCode className="h-10 w-10 text-ink-100" />
          )}
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-medium text-ink-900">Your review link</p>
          <p className="mt-1 break-all rounded-lg bg-ink-50 px-3 py-2 font-mono text-xs text-ink-700">{url}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Button size="sm" variant="outline" icon={Copy} onClick={copyLink}>Copy link</Button>
            <Button size="sm" variant="outline" icon={ExternalLink} onClick={() => window.open(url, '_blank')}>Open</Button>
            <Button size="sm" variant="amber" icon={Download} onClick={downloadQr} disabled={!qrDataUrl}>Download QR</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
