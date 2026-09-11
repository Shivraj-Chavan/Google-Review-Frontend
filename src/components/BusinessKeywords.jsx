'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Tag, Plus, X, Pencil, Check, Loader2, AlertCircle } from 'lucide-react';

// Adjust if your API isn't served from the same origin as the frontend.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export default function BusinessKeywords({ businessId }) {
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newKeyword, setNewKeyword] = useState('');
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadKeywords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/keywords`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`Failed to load keywords (${res.status})`);
      const data = await res.json();
      setKeywords(data.keywords || []);
    } catch (err) {
      console.error('[BusinessKeywords] load failed:', err);
      setError('Unable to load keywords right now.');
    } finally {
      setLoading(false);
    }
  }, [businessId]);

  useEffect(() => {
    if (businessId) loadKeywords();
  }, [businessId, loadKeywords]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const trimmed = newKeyword.trim();
    if (!trimmed) return;

    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/businesses/${businessId}/keywords`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to add keyword (${res.status})`);

      setKeywords((prev) => [data.keyword, ...prev]);
      setNewKeyword('');
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const startEdit = (kw) => {
    setEditingId(kw.id);
    setEditValue(kw.keyword);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleSaveEdit = async (keywordId) => {
    const trimmed = editValue.trim();
    if (!trimmed) return;

    setSavingId(keywordId);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/businesses/${businessId}/keywords/${keywordId}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keyword: trimmed }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to update keyword (${res.status})`);

      setKeywords((prev) =>
        prev.map((k) => (k.id === keywordId ? { ...k, keyword: trimmed } : k))
      );
      cancelEdit();
    } catch (err) {
      console.error('[BusinessKeywords] update failed:', err);
      alert(err.message); // swap for a toast if you have one
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (keywordId) => {
    if (!confirm('Remove this keyword?')) return;

    setDeletingId(keywordId);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/businesses/${businessId}/keywords/${keywordId}`,
        { method: 'DELETE', credentials: 'include' }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to delete keyword (${res.status})`);

      setKeywords((prev) => prev.filter((k) => k.id !== keywordId));
    } catch (err) {
      console.error('[BusinessKeywords] delete failed:', err);
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
      <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
        <Tag className="w-5 h-5 text-orange-500" />
        Services / Highlights
      </h3>
      <p className="text-sm text-slate-500 mb-4">
        Add keywords describing your services so customers can find you more easily.
      </p>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-2">
        <input
          type="text"
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="e.g. Wedding catering"
          maxLength={100}
          className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
        />
        <button
          type="submit"
          disabled={adding || !newKeyword.trim()}
          className="px-4 py-2.5 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
        >
          {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add
        </button>
      </form>
      {addError && (
        <p className="text-sm text-red-600 flex items-center gap-1 mb-3">
          <AlertCircle className="w-4 h-4" /> {addError}
        </p>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-8 text-slate-500 text-sm flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading keywords...
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <button
            onClick={loadKeywords}
            className="text-sm text-orange-600 font-semibold hover:underline"
          >
            Retry
          </button>
        </div>
      ) : keywords.length === 0 ? (
        <p className="text-sm text-slate-500 py-6 text-center">
          No keywords added yet. Add your first one above.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2 mt-3">
          {keywords.map((kw) => (
            <div
              key={kw.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-lg text-sm font-medium"
            >
              {editingId === kw.id ? (
                <>
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(kw.id);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    className="bg-white border border-orange-300 rounded px-2 py-0.5 text-slate-800 text-sm w-32"
                  />
                  <button
                    onClick={() => handleSaveEdit(kw.id)}
                    disabled={savingId === kw.id}
                    className="hover:text-green-700"
                  >
                    {savingId === kw.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button onClick={cancelEdit} className="hover:text-red-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <span>{kw.keyword}</span>
                  <button onClick={() => startEdit(kw)} className="hover:text-orange-900">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(kw.id)}
                    disabled={deletingId === kw.id}
                    className="hover:text-red-700"
                  >
                    {deletingId === kw.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}