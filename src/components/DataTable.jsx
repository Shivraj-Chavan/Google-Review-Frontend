import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

/**
 * Generic admin data table. `columns` = [{ key, label, render? }]
 * Pagination/search state is controlled by the parent (server-side).
 */
export default function DataTable({
  columns, rows, rowKey = 'id',
  search, onSearchChange, searchPlaceholder = 'Search…',
  filters, page, totalPages, onPageChange,
  emptyLabel = 'No records found'
}) {
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-ink-100 bg-surface py-2 pl-9 pr-3 text-sm focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
            />
          </div>
        )}
        {filters && <div className="flex flex-wrap gap-2">{filters}</div>}
      </div>

      <div className="overflow-x-auto rounded-xl2 border border-ink-100 bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink-100 bg-ink-50/50 text-xs font-medium uppercase tracking-wide text-ink-300">
              {columns.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-4 py-3">{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-ink-300">{emptyLabel}</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row[rowKey]} className="border-b border-ink-100 last:border-0 hover:bg-ink-50/40">
                  {columns.map((c) => (
                    <td key={c.key} className="whitespace-nowrap px-4 py-3 text-ink-700">
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="rounded-full border border-ink-100 p-2 text-ink-700 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-ink-300">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="rounded-full border border-ink-100 p-2 text-ink-700 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
