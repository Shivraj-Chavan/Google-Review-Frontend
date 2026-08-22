import { useRef, useState } from 'react';
import { Upload, X, Star, GripVertical, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

/** Single logo uploader with preview. */
export function LogoUploader({ currentUrl, onUpload, uploading }) {
  const inputRef = useRef(null);
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-ink-100 bg-ink-50">
        {currentUrl ? (
          <img src={currentUrl} alt="Business logo" className="h-full w-full object-cover" />
        ) : (
          <Upload className="h-6 w-6 text-ink-300" />
        )}
      </div>
      <div>
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-ink-700/20 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50 disabled:opacity-50"
        >
          {uploading ? <Loader2 className="inline h-4 w-4 animate-spin" /> : 'Upload logo'}
        </button>
        <p className="mt-1 text-xs text-ink-300">JPG, PNG or WEBP, up to 2MB</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}

/** Gallery uploader: grid of images with delete + reorder (up/down) controls. */
export function GalleryUploader({ images, onUpload, onDelete, onReorder, uploading, max = 10 }) {
  const inputRef = useRef(null);

  function move(index, dir) {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onReorder(next.map((img) => img.id));
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <div key={img.id} className="group relative overflow-hidden rounded-xl border border-ink-100">
            <img src={img.image_url} alt="" className="h-28 w-full object-cover" />
            {i === 0 && (
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-ink-900/80 px-2 py-0.5 text-[10px] font-medium text-white">
                <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> Primary
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-900/70 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} className="rounded bg-white/90 p-1 text-ink-700" title="Move earlier">
                  <GripVertical className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onDelete(img.id)}
                className="rounded-full bg-coral-500 p-1 text-white"
                title="Delete image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {images.length < max && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex h-28 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-ink-100 text-ink-300 hover:border-ink-300 hover:text-ink-500 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            <span className="text-xs">Add image</span>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-ink-300">{images.length}/{max} images · first image is shown as primary</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (file.size > 5 * 1024 * 1024) {
              toast.error('Image must be under 5MB');
            } else {
              onUpload(file);
            }
          }
          e.target.value = '';
        }}
      />
    </div>
  );
}
