import KEYS from './keys';

const BODY = document.body;
// const textTextarea = '';

const KEYBOARD = {
  keyCode: [],
  layoutKeys: 0,
  language: false,
  caps: false,
  shiftLeftActive: false,
  shiftRightActive: false,
  textScreen: '',
  keyboard: '',

  createKeyboardTemplate() {
    const boardKeys = document.createElement('div');
    boardKeys.classList.add('wrapper');
    boardKeys.innerHTML = `
    <h1 class="title">RSS Виртуальная клавиатура</h1>
    <textarea class="textarea" id="textarea"></textarea>    
    <div class="grid-container keyboard"></div>    
    <p class="description">Клавиатура создана в операционной системе Windows</p>
    <p class="description">Переключение языка: левые Ctrl + Alt</p>
    `;
    BODY.append(boardKeys);
    this.textScreen = document.querySelector('#textarea');
    this.keyboard = document.querySelector('.keyboard');
  },

  fillKeysKeyboard() {
    this.layoutKeys = parseInt((`${Number(this.language)}${Number(this.caps)}${Number(this.shiftLeftActive || this.shiftRightActive)}`), 2);
    const board = document.querySelector('.keyboard');
    board.innerHTML = '';
    const keys = KEYS[this.layoutKeys];
    this.keyCode = [...KEYS[8]];
    keys.forEach((element, index) => {
      const key = document.createElement('button');
      key.classList.add('keyboard__key');
      key.classList.add(`${this.keyCode[index]}`);
      switch (index) {
        case 28:
          key.innerHTML = 'Del';
          break;
        case 29:
          if (this.caps) key.classList.add('active');
          key.innerHTML = 'CapsLock';
          break;
        case 42:
          if (this.shiftLeftActive) key.classList.add('active');
          key.innerHTML = 'Shift';
          break;
        case 53:
          key.innerHTML = '&#9650;';
          break;
        case 54:
          if (this.shiftRightActive) key.classList.add('active');
          key.innerHTML = 'Shift';
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
          key.innerHTML = `${element}`;
      }
      board.append(key);
    });
  },

  mouseKeyboard() {
    // Отслеживаем Shift на мышке
    this.keyboard.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('ShiftLeft')) {
        this.shiftLeftActive = true;
      }
      if (event.target.classList.contains('ShiftRight')) {
        this.shiftRightActive = true;
      }
      if (event.target.innerText === 'CapsLock') {
        this.caps = !this.caps;
      }
      if (event.target.innerText === 'CapsLock' || event.target.innerText === 'Shift') {
        KEYBOARD.fillKeysKeyboard();
      }
    });

    this.keyboard.addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('ShiftLeft')) {
        this.shiftLeftActive = false;
        KEYBOARD.fillKeysKeyboard();
      }
      if (event.target.classList.contains('ShiftRight')) {
        this.shiftRightActive = false;
        KEYBOARD.fillKeysKeyboard();
      }
    });
  },

  physicalKeys() {
    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      if (this.keyCode.includes(event.code)) {
        if (event.code === 'CapsLock') {
          this.caps = !this.caps;
          KEYBOARD.fillKeysKeyboard();
        } else if (event.key === 'Shift') {
          if (event.code === 'ShiftLeft') {
            this.shiftLeftActive = true;
          }
          if (event.code === 'ShiftRight') {
            this.shiftRightActive = true;
          }
          KEYBOARD.fillKeysKeyboard();
        } else {
          document.querySelector(`.${event.code}`).classList.add('active');
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (this.keyCode.includes(event.code)) {
        if (event.key === 'Shift') {
          this.shiftLeftActive = false;
          this.shiftRightActive = false;
          KEYBOARD.fillKeysKeyboard();
        }
        if (event.code !== 'CapsLock') {
          document.querySelector(`.${event.code}`).classList.remove('active');
        }
      }
    });
  },

  runShortcut() {
    const combination = ['AltLeft', 'ControlLeft'];
    const pressed = new Set();

    document.addEventListener('keydown', (event) => {
      event.preventDefault();
      pressed.add(event.code);
      if (combination.every((key) => pressed.has(key))) {
        pressed.clear();
        this.language = !this.language;
        this.fillKeysKeyboard();
      }
    });

    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  },
};

export default KEYBOARD;
