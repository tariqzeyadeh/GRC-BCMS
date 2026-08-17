/** Client-side CSV / printable export helpers (no backend). */

export function downloadTextFile(filename, content, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportRowsToCsv(filename, columns, rows) {
  const escape = v => {
    const s = v == null ? '' : String(v);
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const header = columns.map(c => escape(c.header)).join(',');
  const body = rows
    .map(row => columns.map(c => escape(typeof c.value === 'function' ? c.value(row) : row[c.key])).join(','))
    .join('\n');
  downloadTextFile(filename, `\uFEFF${header}\n${body}`, 'text/csv;charset=utf-8');
}

/** Opens a simple print window that users can Save as PDF. */
export function exportPrintablePdf(title, htmlBody) {
  const win = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
  if (!win) return;
  win.document.write(`<!doctype html><html><head><title>${title}</title>
    <style>
      body{font-family:system-ui,Segoe UI,Tahoma,sans-serif;padding:24px;color:#111}
      h1{font-size:18px;margin:0 0 12px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border:1px solid #ddd;padding:6px 8px;text-align:start}
      th{background:#f5f5f5}
      .meta{font-size:11px;color:#666;margin-bottom:16px}
    </style></head><body>
    <h1>${title}</h1>
    <div class="meta">${new Date().toLocaleString()}</div>
    ${htmlBody}
    <script>window.onload=()=>{window.print()}</script>
    </body></html>`);
  win.document.close();
}

export function tableHtml(columns, rows) {
  const head = columns.map(c => `<th>${c.header}</th>`).join('');
  const body = rows
    .map(
      row =>
        `<tr>${columns
          .map(c => {
            const v = typeof c.value === 'function' ? c.value(row) : row[c.key];
            return `<td>${v == null ? '' : String(v)}</td>`;
          })
          .join('')}</tr>`
    )
    .join('');
  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}
