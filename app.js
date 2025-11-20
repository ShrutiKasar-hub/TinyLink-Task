async function fetchLinks() {
  const res = await fetch('/api/links');
  const rows = await res.json();
  const tbody = document.querySelector('#linksTable tbody');
  tbody.innerHTML = '';
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><a href="/${r.code}" target="_blank">${r.code}</a></td>
      <td title="${r.target_url}">${r.target_url.length>60? r.target_url.slice(0,57)+'...':r.target_url}</td>
      <td>${r.clicks}</td>
      <td>${r.last_clicked || '-'}</td>
      <td><button data-code="${r.code}" class="del">Delete</button></td>`;
    tbody.appendChild(tr);
  });
  document.querySelectorAll('.del').forEach(b=>{
    b.addEventListener('click', async (e)=>{
      const code = e.target.dataset.code;
      if (!confirm('Delete '+code+'?')) return;
      await fetch('/api/links/'+code, { method: 'DELETE' });
      fetchLinks();
    });
  });
}

document.getElementById('createForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const target = document.getElementById('target').value;
  const code = document.getElementById('code').value;
  const body = { target_url: target };
  if (code) body.code = code;
  const res = await fetch('/api/links', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) });
  const msg = document.getElementById('msg');
  if (res.status === 201) {
    const j = await res.json();
    msg.textContent = 'Created: ' + j.short_url;
    fetchLinks();
  } else {
    const j = await res.json().catch(()=>({error:'unknown'}));
    msg.textContent = 'Error: ' + (j.error || j.message || res.status);
  }
});

fetchLinks();
