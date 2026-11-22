// Tooltip va popover komponentlarini yoqish
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

// Rasm xaritasi (map) koordinatalarini rasm o'lchamiga moslash
document.querySelectorAll('img[usemap]').forEach(img => {
  const map = document.querySelector('map[name="' + img.getAttribute('usemap').slice(1) + '"]');
  if (!map) return;
  const areas = [...map.areas];
  const orig = areas.map(a => a.coords.split(',').map(Number));
  const fit = () => {
    if (!img.naturalWidth) return;
    const k = img.clientWidth / img.naturalWidth;
    areas.forEach((a, i) => a.coords = orig[i].map(v => Math.round(v * k)).join(','));
  };
  img.addEventListener('load', fit);
  window.addEventListener('resize', fit);
  fit();
});
