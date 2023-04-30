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
    const keys = KEYS[2];
    keys.forEach((element, index) => {
      const key = document.createElement('div');
      key.classList.add('keyboard__key');
      key.innerText = `${element}`;
      switch (index) {
        case 13:
          key.classList.add('key-backspace');
          break;
        case 14:
          key.classList.add('key-tab');
          break;
        case 28:
          key.innerHTML = 'Del';
          break;
        case 29:
          key.classList.add('key-caps');
          break;
        case 41:
          key.classList.add('key-enter');
          break;
        case 42:
          key.classList.add('key-shift_left');
          break;
        case 53:
          key.innerHTML = '&#9650;';
          break;
        case 54:
          key.classList.add('key-shift_right');
          break;
        case 55:
          key.innerHTML = 'Ctrl';
          break;
        case 56:
          key.innerHTML = 'Win';
          break;
        case 58:
          key.classList.add('key-space');
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
