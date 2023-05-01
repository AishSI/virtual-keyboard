import KEYS from './keys';

const BODY = document.body;
const textTextarea = '';

const KEYBOARD = {
  layoutKeys: 0,
  language: 'Ru',
  caps: false,
  shift: false,
  shiftLeft: false,
  textScreen: '',
  keyboard: '',

  createKeyboardTemplate() {
    const boardKeys = document.createElement( 'div' );
    boardKeys.classList.add( 'wrapper' );
    boardKeys.innerHTML = `
    <h1 class="title">RSS Виртуальная клавиатура</h1>
    <textarea class="textarea" id="textarea"></textarea>    
    <div class="grid-container keyboard"></div>    
    <p class="description">Клавиатура создана в операционной системе Windows</p>
    <p class="description">Переключение языка: левые shift + alt</p>
    `;
    BODY.append( boardKeys );
    this.textScreen = document.querySelector( '#textarea' );
    this.keyboard = document.querySelector( '.keyboard' );
  },

  fillKeysKeyboard() {
    this.layoutKeys = parseInt( ( `${ Number( this.language === 'En' ) }${ Number( this.caps ) }${ Number( this.shift ) }` ), 2 );
    const board = document.querySelector( '.keyboard' );
    board.innerHTML = '';
    const keys = KEYS[this.layoutKeys];
    const code = KEYS[8];
    keys.forEach( ( element, index ) => {
      const key = document.createElement( 'button' );
      key.classList.add( 'keyboard__key' );
      key.value = code[index];
      switch ( index ) {
        case 28:
          key.innerHTML = 'Del';
          break;
        case 29:
          if ( this.caps ) key.classList.add( 'active' );
          key.innerHTML = 'CapsLock';
          break;
        case 42:
          if ( this.shift && this.shiftLeft ) key.classList.add( 'active' );
          key.innerHTML = 'Shift';
          break;
        case 53:
          key.innerHTML = '&#9650;';
          break;
        case 54:
          if ( this.shift && !this.shiftLeft ) key.classList.add( 'active' );
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
          key.innerHTML = `${ element }`;
      }
      board.append( key );
    } );
  },

  mouseKeyboard() {
    // Отслеживаем Shift на мышке
    this.keyboard.addEventListener( 'mousedown', ( event ) => {
      if ( event.target.innerText === 'Shift' ) {
        this.shift = true;
        if ( event.target.value === 'ShiftLeft' ) {
          this.shiftLeft = true;
        };
        KEYBOARD.fillKeysKeyboard();
      };
      if ( event.target.innerText === 'CapsLock' ) {
        this.caps = !this.caps;
        KEYBOARD.fillKeysKeyboard();
      };
    } );

    this.keyboard.addEventListener( 'mouseup', ( event ) => {
      if ( event.target.innerText === 'Shift' ) {
        this.shift = false;
        this.shiftLeft = false;
        KEYBOARD.fillKeysKeyboard();
      }
    } );
  },
};

KEYBOARD.createKeyboardTemplate();
const textArea = document.querySelector( '#textarea' );

export default KEYBOARD;
