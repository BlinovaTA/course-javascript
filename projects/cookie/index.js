/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookies = () => {
  const cookie = document.cookie;

  if (cookie === '') {
    return [];
  }

  return cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');

    prev.push({ name: name, value: value });

    return prev;
  }, []);
};

const isMatching = (full, chunk) => {
  return full.toLowerCase().includes(chunk.toLowerCase());
};

const getFilteredCookies = () => {
  const filterValue = filterNameInput.value;

  return cookies().filter(
    (item) => isMatching(item.name, filterValue) || isMatching(item.value, filterValue)
  );
};

const addCookieItem = () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;

  addNameInput.value = '';
  addValueInput.value = '';
};

const createRow = (item) => {
  const cookieName = document.createElement('td');
  cookieName.textContent = item.name;
  cookieName.className = 'cookie-name';

  const cookieValue = document.createElement('td');
  cookieValue.textContent = item.value;
  cookieValue.className = 'cookie-value';

  const button = document.createElement('button');
  button.textContent = 'Удалить';
  button.className = 'delete-button';

  const buttonContainer = document.createElement('td');
  buttonContainer.append(button);

  const row = document.createElement('tr');
  row.append(cookieName);
  row.append(cookieValue);
  row.append(buttonContainer);

  return row;
};

const createRows = (cookies) => {
  const fragment = document.createDocumentFragment();

  cookies.forEach((item) => fragment.append(createRow(item)));

  return fragment;
};

const tableUpdate = () => {
  listTable.innerHTML = '';
  listTable.append(createRows(getFilteredCookies()));
};

const handleDelete = (e) => {
  const { target } = e;

  if (!target.classList.contains('delete-button')) {
    return;
  }

  const currentRow = target.parentElement.parentElement;
  const cookieName = currentRow.querySelector('.cookie-name');

  document.cookie = `${cookieName.textContent}=;max-age=0`;

  tableUpdate();
};

const handleInput = () => {
  tableUpdate();
};

const handleAddNewCookie = () => {
  addCookieItem();
  tableUpdate();
};

tableUpdate();

addButton.addEventListener('click', handleAddNewCookie);

listTable.addEventListener('click', handleDelete);

filterNameInput.addEventListener('input', handleInput);
