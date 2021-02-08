/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

const setZIndex = (target) => {
  const items = document.querySelectorAll('.draggable-div');
  items.forEach((item) => (item.style.zIndex = 0));
  target.style.zIndex = 100;
};

document.addEventListener('mousedown', (e) => {
  const { target } = e;

  if (target.classList.contains('draggable-div')) {
    setZIndex(target);

    const rect = target.getBoundingClientRect();
    const shiftX = e.pageX - rect.left + window.pageXOffset;
    const shiftY = e.pageY - rect.top + window.pageYOffset;

    const moveAt = (e) => {
      target.style.left = `${e.pageX - shiftX}px`;
      target.style.top = `${e.pageY - shiftY}px`;
    };

    moveAt(e);

    document.onmousemove = (e) => moveAt(e);

    target.onmouseup = () => {
      document.onmousemove = null;
      target.onmouseup = null;
    };
  }
});

const generateItem = () => {
  return Math.floor(Math.random() * 255).toString(16);
};

const generateRandomColor = () => {
  return `#${generateItem()}${generateItem()}${generateItem()}`;
};

export function createDiv() {
  const { innerHeight, innerWidth } = window;

  const div = document.createElement('div');
  div.style.width = `${Math.random() * innerWidth}px`;
  div.style.height = `${Math.random() * innerHeight}px`;
  div.style.left = `${Math.random() * innerWidth}px`;
  div.style.top = `${Math.random() * innerHeight}px`;
  div.style.backgroundColor = generateRandomColor();
  div.style.position = 'absolute';
  div.style.cursor = 'move';
  div.draggable = true;
  div.className = 'draggable-div';
  div.ondragstart = () => false;

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
