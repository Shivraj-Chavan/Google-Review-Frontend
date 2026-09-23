import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

/**
 * Generic admin data table. `columns` = [{ key, label, render? }]
 * Pagination/search state is controlled by the parent (server-side).
 *
 * Desktop (sm and up): unchanged horizontally-scrolling table.
 * Mobile (below sm): each row becomes a stacked card — first column as the
 * card title, remaining columns as label/value pairs. A column with
 * key === 'actions' is rendered full-width in its own row at the bottom of
 * the card instead of a label/value pair, since it holds buttons, not data.
 */
export default function DataTable({
  columns, rows, rowKey = 'id',
  search, onSearchChange, searchPlaceholder = 'Search…',
  filters, page, totalPages, onPageChange,
  emptyLabel = 'No records found'
}) {
  const [titleColumn, ...restColumns] = columns;
  const bodyColumns = restColumns.filter((c) => c.key !== 'actions');
  const actionsColumn = restColumns.find((c) => c.key === 'actions');

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

      {/* Desktop / tablet: table, unchanged */}
      <div className="hidden overflow-x-auto rounded-xl2 border border-ink-100 bg-surface sm:block">
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

      {/* Mobile: stacked cards */}
      <div className="sm:hidden">
        {rows.length === 0 ? (
          <div className="rounded-xl2 border border-ink-100 bg-surface px-4 py-10 text-center text-sm text-ink-300">
            {emptyLabel}
          </div>
        ) : (
          <ul className="space-y-3">
            {rows.map((row) => (
              <li key={row[rowKey]} className="rounded-xl2 border border-ink-100 bg-surface p-4">
                {titleColumn && (
                  <div className="mb-3 font-medium text-ink-900">
                    {titleColumn.render ? titleColumn.render(row) : row[titleColumn.key]}
                  </div>
                )}

                {bodyColumns.length > 0 && (
                  <dl className="space-y-2 border-t border-ink-100 pt-3 text-sm">
                    {bodyColumns.map((c) => (
                      <div key={c.key} className="flex items-start justify-between gap-4">
                        <dt className="shrink-0 text-xs font-medium uppercase tracking-wide text-ink-300">{c.label}</dt>
                        <dd className="text-right text-ink-700">{c.render ? c.render(row) : row[c.key]}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {actionsColumn && (
                  <div className="mt-3 flex justify-end border-t border-ink-100 pt-3">
                    {actionsColumn.render ? actionsColumn.render(row) : row[actionsColumn.key]}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
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