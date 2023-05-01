import KEYS from './keys';

const BODY = document.body;

const KEYBOARD = {
  keyCode: [],
  layoutKeys: 0,
  language: false,
  caps: false,
  shiftLeftActive: false,
  shiftRightActive: false,
  textScreen: '',
  keyboard: '',
  noTextKey: [],

  createKeyboardTemplate() {
    if ( localStorage.getItem( 'language' ) ) {
      this.language = localStorage.getItem( 'language' ) === 'true';
    }
    const boardKeys = document.createElement( 'div' );
    boardKeys.classList.add( 'wrapper' );
    boardKeys.innerHTML = `
    <h1 class="title">RSS Виртуальная клавиатура</h1>
    <textarea class="textarea" id="textScreen"></textarea>    
    <div class="grid-container keyboard"></div>    
    <p class="description">Клавиатура создана в операционной системе Windows</p>
    <p class="description">Переключение языка: левые Ctrl + Alt</p>
    `;
    BODY.append( boardKeys );
    this.keyboard = document.querySelector( '.keyboard' );
    this.textScreen = document.querySelector( '#textScreen' );
  },

  fillKeysKeyboard() {
    this.layoutKeys = parseInt( ( `${ Number( this.language ) }${ Number( this.caps ) }${ Number( this.shiftLeftActive || this.shiftRightActive ) }` ), 2 );
    const board = document.querySelector( '.keyboard' );
    board.innerHTML = '';
    const keys = KEYS[this.layoutKeys];
    this.keyCode = [...KEYS[8]];
    this.noTextKey = [...KEYS[10]];
    keys.forEach( ( element, index ) => {
      const key = document.createElement( 'button' );
      key.classList.add( 'keyboard__key' );
      key.classList.add( `${ this.keyCode[index] }` );
      switch ( index ) {
        case 28:
          key.innerHTML = 'Del';
          break;
        case 29:
          if ( this.caps ) key.classList.add( 'active' );
          key.innerHTML = 'CapsLock';
          break;
        case 42:
          if ( this.shiftLeftActive ) key.classList.add( 'active' );
          key.innerHTML = 'Shift';
          break;
        case 53:
          key.innerHTML = '&#9650;';
          break;
        case 54:
          if ( this.shiftRightActive ) key.classList.add( 'active' );
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

  updateKeysKeyboard() {
    this.layoutKeys = parseInt( ( `${ Number( this.language ) }${ Number( this.caps ) }${ Number( this.shiftLeftActive || this.shiftRightActive ) }` ), 2 );
    const keys = KEYS[this.layoutKeys];
    const keysUpdate = document.querySelectorAll( '.keyboard__key' );
    const keysUpdateIndex = [...KEYS[9]];

    keysUpdateIndex.forEach( ( item ) => {
      keysUpdate[item].innerHTML = '';
      keysUpdate[item].innerHTML = `${ keys[item] }`;
    } );

    if ( this.caps ) keysUpdate[29].classList.add( 'active' );
    if ( !this.caps ) keysUpdate[29].classList.remove( 'active' );

    if ( this.shiftLeftActive ) keysUpdate[42].classList.add( 'active' );
    if ( !this.shiftLeftActive ) keysUpdate[42].classList.remove( 'active' );

    if ( this.shiftRightActive ) keysUpdate[54].classList.add( 'active' );
    if ( !this.shiftRightActive ) keysUpdate[54].classList.remove( 'active' );
  },

  delSelection( direct ) {
    const currStr = this.textScreen.value;
    const start = this.textScreen.selectionStart;
    const end = this.textScreen.selectionEnd;

    if ( start !== end ) {
      this.textScreen.value = currStr.slice( 0, start ) + currStr.slice( end );
      this.textScreen.selectionStart = start;
      this.textScreen.selectionEnd = start;
    } else {
      if ( ( direct === 'Backspace' ) && ( start > 0 ) ) {
        this.textScreen.value = currStr.slice( 0, start - 1 ) + currStr.slice( end );
        this.textScreen.selectionStart = start - 1;
        this.textScreen.selectionEnd = start - 1;
      }
      if ( ( direct === 'Delete' ) && ( start < currStr.length ) ) {
        this.textScreen.value = currStr.slice( 0, start ) + currStr.slice( end + 1 );
        this.textScreen.selectionStart = start;
        this.textScreen.selectionEnd = start;
      }
    }
  },

  insertLetter( str ) {
    let currStr = this.textScreen.value;
    let start = this.textScreen.selectionStart;
    let end = this.textScreen.selectionEnd;
    this.textScreen.value = currStr.slice( 0, start ) + str + currStr.slice( end );
    this.textScreen.selectionStart = start + 1;
    this.textScreen.selectionEnd = start + 1;
  },

  mouseKeyboard() {
    this.keyboard.addEventListener( 'mousedown', ( event ) => {
      event.preventDefault();
      this.textScreen.focus();

      if ( event.target.classList.contains( 'ShiftLeft' ) ) {
        this.shiftLeftActive = true;
      }
      if ( event.target.classList.contains( 'ShiftRight' ) ) {
        this.shiftRightActive = true;
      }
      if ( event.target.innerText === 'CapsLock' ) {
        this.caps = !this.caps;
      }
      if ( event.target.innerText === 'CapsLock' || event.target.innerText === 'Shift' ) {
        this.updateKeysKeyboard();
      }

      if ( event.target.closest( '.keyboard__key' ) ) {
        switch ( event.target.classList[1] ) {
          case 'Backspace':
            this.delSelection( 'Backspace' );
            break;
          case 'Tab':
            this.textScreen.value += '    ';
            break;
          case 'Delete':
            this.delSelection( 'Delete' );
            break;
          case 'Enter':
            this.insertLetter( '\r\n' );
            break;
          case 'Space':
            this.insertLetter( ' ' );
            break;
          default:
            if ( !this.noTextKey.includes( event.target.classList[1] ) ) {
              this.insertLetter( event.target.innerText );
            }
        }
      }
    } );

    this.keyboard.addEventListener( 'mouseup', ( event ) => {
      if ( event.target.classList.contains( 'ShiftLeft' ) ) {
        this.shiftLeftActive = false;
        this.updateKeysKeyboard();
      }
      if ( event.target.classList.contains( 'ShiftRight' ) ) {
        this.shiftRightActive = false;
        this.updateKeysKeyboard();
      }
    } );
  },

  physicalKeys() {
    document.addEventListener( 'keydown', ( event ) => {
      event.preventDefault();
      this.textScreen.focus();
      if ( this.keyCode.includes( event.code ) ) {
        if ( event.code === 'CapsLock' ) {
          this.caps = !this.caps;
          this.updateKeysKeyboard();
        } else if ( event.key === 'Shift' ) {
          if ( event.code === 'ShiftLeft' ) {
            this.shiftLeftActive = true;
          }
          if ( event.code === 'ShiftRight' ) {
            this.shiftRightActive = true;
          }
          this.updateKeysKeyboard();
        } else {
          document.querySelector( `.${ event.code }` ).classList.add( 'active' );
        }

        switch ( event.code ) {
          case 'Backspace':
            this.delSelection( 'Backspace' );
            break;
          case 'Tab':
            this.textScreen.value += '    ';
            break;
          case 'Delete':
            this.delSelection( 'Delete' );
            break;

          case 'Enter':
            this.insertLetter( '\r\n' );
            break;
          case 'Space':
            this.insertLetter( ' ' );
            break;
          default:
            if ( !this.noTextKey.includes( event.code ) ) {
              const letter = document.querySelector( `.${ event.code }` );
              this.insertLetter( letter.innerText );
            }
        }
      }
    } );

    document.addEventListener( 'keyup', ( event ) => {
      event.preventDefault();
      if ( this.keyCode.includes( event.code ) ) {
        if ( event.key === 'Shift' ) {
          this.shiftLeftActive = false;
          this.shiftRightActive = false;
          this.updateKeysKeyboard();
        }
        if ( event.code !== 'CapsLock' ) {
          document.querySelector( `.${ event.code }` ).classList.remove( 'active' );
        }
      }
    } );
  },

  runShortcut() {
    const combination = ['AltLeft', 'ControlLeft'];
    const pressed = new Set();

    document.addEventListener( 'keydown', ( event ) => {
      event.preventDefault();
      pressed.add( event.code );
      if ( combination.every( ( key ) => pressed.has( key ) ) ) {
        pressed.clear();
        this.language = !this.language;
        localStorage.setItem( 'language', this.language );
        this.updateKeysKeyboard();
      }
    } );

    document.addEventListener( 'keyup', ( event ) => {
      pressed.delete( event.code );
    } );
  },
};

export default KEYBOARD;
