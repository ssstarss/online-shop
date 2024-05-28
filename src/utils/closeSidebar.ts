export default function closeSidebarOnMomile() {
  const sidebar = document.querySelector('.catalog__sidebar');
  const filterMenu = document.querySelector('.filter-menu');
  sidebar?.classList.toggle('hidden');
  filterMenu?.classList.toggle('open');
  document.body.classList.remove('no-scroll');
}
