import KEYS from './keys';

const { body } = document;

const createKeyboardTemplate = () => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('wrapper');
  keyboard.innerHTML = `
  <h1 class="title">RSS Виртуальная клавиатура</h1>
  <textarea class="textarea" id="textarea"></textarea>    
  <div class="grid-container keyboard"></div>    
  <p class="description">Клавиатура создана в операционной системе Windows</p>
  <p class="description">Переключение языка: левые shift + alt</p>
  `;
  body.append(keyboard);
};

const KEYBOARD = {
  fillKeysKeyboard() {
    const board = document.querySelector('.keyboard');
    const keys = KEYS[6];
    keys.forEach((element, index) => {
      const key = document.createElement('button');
      key.classList.add('keyboard__key');
      switch (index) {
        case 28:
          key.innerHTML = 'Del';
          break;
        case 53:
          key.innerHTML = '&#9650;';
          break;
        case 55:
          key.innerHTML = 'Ctrl';
          break;
        case 56:
          key.innerHTML = 'Win';
          break;
        case 59:
          key.innerHTML = 'Alt';
          break;
        case 60:
          key.innerHTML = '&#9668;';
          break;
        case 61:
          key.innerHTML = '&#9660;';
          break;
        case 62:
          key.innerHTML = '&#9658;';
          break;
        case 63:
          key.innerHTML = 'Ctrl';
          break;
        default:
          key.innerText = `${element}`;
      }
      board.append(key);
    });
  },
};

export { createKeyboardTemplate, KEYBOARD };
