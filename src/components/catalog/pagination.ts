import createElement from '../../helpers/createElement';
import navigate from '../../utils/navigate';

export default function generatePagination(pagLength: number) {
  const pagination = createElement({ tag: 'div', className: 'pagination' });
  for (let i = 1; i <= pagLength; i += 1) {
    const pagItem = createElement({
      tag: 'button',
      className: 'pagination__item',
      textContent: i.toString(),
      id: `pag-item-${i}`,
    });
    pagItem.addEventListener('click', () => {
      const currLocation = window.location.href;
      const clearPageRegex = /[?&]page=\d+/g;
      const urlPart = currLocation.replace(/.*(\/catalog.*)/, '$1');
      const cleanedUrl = urlPart.replace(clearPageRegex, '');
      let newAddress;
      if (!cleanedUrl.includes('?')) {
        newAddress = `${cleanedUrl}?page=${i} `;
      } else {
        newAddress = `${cleanedUrl}&page=${i} `;
      }

      navigate(newAddress);
    });

    pagination.append(pagItem);
  }
  return pagination;
}
