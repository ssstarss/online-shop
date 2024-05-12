import mainPage from '../pages/mainPage/mainPage';

const App = () => {
  document.body.append(mainPage.element);
};

document.addEventListener('DOMContentLoaded', App);

export default App;
