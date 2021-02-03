/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns.html

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

import './towns.html';
import { loadAndSortTowns } from './functions';

const homeworkContainer = document.querySelector('#app');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */

const loadingPepare = () => {
  loadingBlock.style.display = 'block';
  filterBlock.style.display = 'none';
};

const townsIsLoaded = () => {
  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'block';
  loadingFailedBlock.style.display = 'none';
};

const townsNotLoaded = () => {
  loadingBlock.style.display = 'none';
  loadingFailedBlock.firstElementChild.style.display = 'block';
  retryButton.textContent = 'Повторить';
};

let towns = [];

const loadTowns = async () => {
  loadingPepare();

  try {
    towns = await loadAndSortTowns();
    townsIsLoaded();
  } catch (e) {
    townsNotLoaded();
  }

  return towns;
};

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
const isMatching = (full, chunk) => full.toLowerCase().includes(chunk.toLowerCase());

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
loadingBlock.style.display = 'none';
/* Блок с надписью "Не удалось загрузить города" и кнопкой "Повторить" */
const loadingFailedBlock = homeworkContainer.querySelector('#loading-failed');
loadingFailedBlock.firstElementChild.style.display = 'none';
/* Кнопка "Повторить" */
const retryButton = homeworkContainer.querySelector('#retry-button');
retryButton.textContent = 'Загрузить';
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
filterBlock.style.display = 'none';
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

retryButton.addEventListener('click', loadTowns);

const addTown = (town) => {
  const divElement = document.createElement('div');
  divElement.textContent = town.name;
  filterResult.appendChild(divElement);
};

const handleInput = (e) => {
  filterResult.innerHTML = '';

  const inputValue = e.target.value;

  if (inputValue !== '') {
    towns
      .filter((town) => isMatching(town.name, inputValue))
      .forEach((town) => addTown(town));
  }
};

filterInput.addEventListener('input', handleInput);

export { loadTowns, isMatching };
