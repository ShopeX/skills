(() => {
  const config = globalThis.__JIANDAOYUN_TIMESHEET_PROFILE__ || {};
  const fields = config.fields || {};
  const values = config.values || {};
  const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const splitPeople = (value) => clean(value).split(/[,，、;；\s]+/).filter(Boolean);

  const tables = Array.from(document.querySelectorAll('table'));
  const headerTable = tables.find((table) => table.querySelector('thead th'));
  const dataTable = tables.find((table) => table.querySelector('tbody tr[data-row-id]'));
  const headers = headerTable
    ? Array.from(headerTable.querySelectorAll('thead th')).map((th) => clean(th.innerText))
    : [];

  const rows = dataTable
    ? Array.from(dataTable.querySelectorAll('tbody tr[data-row-id]')).map((tr) => {
        const cells = Array.from(tr.querySelectorAll('td')).map((td) => clean(td.innerText));
        const row = { recordId: tr.getAttribute('data-row-id') || '' };
        headers.forEach((header, index) => {
          if (header) row[header] = cells[index] || '';
        });
        return row;
      })
    : [];

  const requiredHeaders = [fields.person, fields.status, fields.node, fields.owner].filter(Boolean);
  const missingHeaders = requiredHeaders.filter((header) => !headers.includes(header));
  const personMatches = (row) =>
    !config.personName || splitPeople(row[fields.person]).includes(clean(config.personName));
  const ownerMatches = (row) =>
    splitPeople(row[fields.owner]).includes(clean(config.personName));

  const pendingRows = rows.filter(
    (row) =>
      personMatches(row) &&
      clean(row[fields.status]) === clean(values.activeStatus) &&
      clean(row[fields.node]) === clean(values.confirmNode),
  );

  const retainedFields = Array.from(
    new Set([
      ...(config.displayFields || []),
      ...(config.matchFields || []),
      fields.person,
      fields.status,
      fields.node,
      fields.owner,
      fields.projectManager,
    ].filter(Boolean)),
  );
  const project = (row) =>
    Object.fromEntries([
      ['recordId', row.recordId],
      ...retainedFields.map((field) => [field, row[field] || '']),
    ]);

  const mine = pendingRows.filter(ownerMatches).map(project);
  const needManagerFollowUp = pendingRows.filter((row) => !ownerMatches(row)).map(project);
  const pending = [...mine, ...needManagerFollowUp];

  const pageInput = document.querySelector('.x-pagination .page-input input');
  const totalPageText = clean(document.querySelector('.x-pagination .total-page')?.innerText);
  const totalPages = Number(totalPageText.replace(/\D/g, '')) || 1;
  const currentPage = Number(pageInput?.value) || 1;
  const countText = clean(document.querySelector('.x-pagination .count')?.innerText);

  return JSON.stringify({
    authenticated: Boolean(dataTable && requiredHeaders.length === 4 && missingHeaders.length === 0),
    missingHeaders,
    currentPage,
    totalPages,
    countText,
    visibleRowCount: rows.length,
    pending,
    mine,
    needManagerFollowUp,
  });
})()
