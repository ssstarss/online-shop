import { productParams } from '../components/catalog/catalog';
import generateCatalogPage from '../pages/catalogPage/catalogPage';

export default async function handleSearch(searchValue: string, inputElement: HTMLInputElement) {
  if (searchValue !== '') {
    const main = document.querySelector('main');
    if (main) {
      main.innerHTML = '';
      productParams.searchText = searchValue;
      productParams.category = undefined;
      productParams.filterPrice = undefined;
      productParams.sort = undefined;

      const catalog = await generateCatalogPage({ searchText: searchValue });
      main.append(catalog);
    }
  } else {
    inputElement.focus();
  }
}
