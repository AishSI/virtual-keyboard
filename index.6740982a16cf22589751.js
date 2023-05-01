/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/keyboard.js":
/*!****************************!*\
  !*** ./src/js/keyboard.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys */ "./src/js/keys.js");

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
    if (localStorage.getItem('language')) {
      this.language = localStorage.getItem('language') === 'true';
    }
    const boardKeys = document.createElement('div');
    boardKeys.classList.add('wrapper');
    boardKeys.innerHTML = `
    <h1 class="title">RSS Виртуальная клавиатура</h1>
    <textarea class="textarea" id="textScreen"></textarea>    
    <div class="grid-container keyboard"></div>    
    <p class="description">Клавиатура создана в операционной системе Windows</p>
    <p class="description">Переключение языка: левые Ctrl + Alt</p>
    `;
    BODY.append(boardKeys);
    this.keyboard = document.querySelector('.keyboard');
    this.textScreen = document.querySelector('#textScreen');
  },
  fillKeysKeyboard() {
    this.layoutKeys = parseInt(`${Number(this.language)}${Number(this.caps)}${Number(this.shiftLeftActive || this.shiftRightActive)}`, 2);
    const board = document.querySelector('.keyboard');
    board.innerHTML = '';
    const keys = _keys__WEBPACK_IMPORTED_MODULE_0__["default"][this.layoutKeys];
    this.keyCode = [..._keys__WEBPACK_IMPORTED_MODULE_0__["default"][8]];
    this.noTextKey = [..._keys__WEBPACK_IMPORTED_MODULE_0__["default"][10]];
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
  updateKeysKeyboard() {
    this.layoutKeys = parseInt(`${Number(this.language)}${Number(this.caps)}${Number(this.shiftLeftActive || this.shiftRightActive)}`, 2);
    const keys = _keys__WEBPACK_IMPORTED_MODULE_0__["default"][this.layoutKeys];
    const keysUpdate = document.querySelectorAll('.keyboard__key');
    const keysUpdateIndex = [..._keys__WEBPACK_IMPORTED_MODULE_0__["default"][9]];
    keysUpdateIndex.forEach(item => {
      keysUpdate[item].innerHTML = '';
      keysUpdate[item].innerHTML = `${keys[item]}`;
    });
    if (this.caps) keysUpdate[29].classList.add('active');
    if (!this.caps) keysUpdate[29].classList.remove('active');
    if (this.shiftLeftActive) keysUpdate[42].classList.add('active');
    if (!this.shiftLeftActive) keysUpdate[42].classList.remove('active');
    if (this.shiftRightActive) keysUpdate[54].classList.add('active');
    if (!this.shiftRightActive) keysUpdate[54].classList.remove('active');
  },
  delSelection(direct) {
    const currStr = this.textScreen.value;
    const start = this.textScreen.selectionStart;
    const end = this.textScreen.selectionEnd;
    if (start !== end) {
      this.textScreen.value = currStr.slice(0, start) + currStr.slice(end);
      this.textScreen.selectionStart = start;
      this.textScreen.selectionEnd = start;
    } else {
      if (direct === 'Backspace' && start > 0) {
        this.textScreen.value = currStr.slice(0, start - 1) + currStr.slice(end);
        this.textScreen.selectionStart = start - 1;
        this.textScreen.selectionEnd = start - 1;
      }
      if (direct === 'Delete' && start < currStr.length) {
        this.textScreen.value = currStr.slice(0, start) + currStr.slice(end + 1);
        this.textScreen.selectionStart = start;
        this.textScreen.selectionEnd = start;
      }
    }
  },
  insertLetter(str) {
    const currStr = this.textScreen.value;
    const start = this.textScreen.selectionStart;
    const end = this.textScreen.selectionEnd;
    this.textScreen.value = currStr.slice(0, start) + str + currStr.slice(end);
    this.textScreen.selectionStart = start + str.length;
    this.textScreen.selectionEnd = start + str.length;
  },
  mouseKeyboard() {
    this.keyboard.addEventListener('mousedown', event => {
      event.preventDefault();
      this.textScreen.focus();
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
        this.updateKeysKeyboard();
      }
      if (event.target.closest('.keyboard__key')) {
        switch (event.target.classList[1]) {
          case 'Backspace':
            this.delSelection('Backspace');
            break;
          case 'Tab':
            this.insertLetter('    ');
            break;
          case 'Delete':
            this.delSelection('Delete');
            break;
          case 'Enter':
            this.insertLetter('\n');
            break;
          case 'Space':
            this.insertLetter(' ');
            break;
          default:
            if (!this.noTextKey.includes(event.target.classList[1])) {
              this.insertLetter(event.target.innerText);
            }
        }
      }
    });
    this.keyboard.addEventListener('mouseup', event => {
      if (event.target.classList.contains('ShiftLeft')) {
        this.shiftLeftActive = false;
        this.updateKeysKeyboard();
      }
      if (event.target.classList.contains('ShiftRight')) {
        this.shiftRightActive = false;
        this.updateKeysKeyboard();
      }
    });
  },
  physicalKeys() {
    document.addEventListener('keydown', event => {
      event.preventDefault();
      this.textScreen.focus();
      if (this.keyCode.includes(event.code)) {
        if (event.code === 'CapsLock') {
          this.caps = !this.caps;
          this.updateKeysKeyboard();
        } else if (event.key === 'Shift') {
          if (event.code === 'ShiftLeft') {
            this.shiftLeftActive = true;
          }
          if (event.code === 'ShiftRight') {
            this.shiftRightActive = true;
          }
          this.updateKeysKeyboard();
        } else {
          document.querySelector(`.${event.code}`).classList.add('active');
        }
        switch (event.code) {
          case 'Backspace':
            this.delSelection('Backspace');
            break;
          case 'Tab':
            this.insertLetter('    ');
            break;
          case 'Delete':
            this.delSelection('Delete');
            break;
          case 'Enter':
            this.insertLetter('\n');
            break;
          case 'Space':
            this.insertLetter(' ');
            break;
          default:
            if (!this.noTextKey.includes(event.code)) {
              const letter = document.querySelector(`.${event.code}`);
              this.insertLetter(letter.innerText);
            }
        }
      }
    });
    document.addEventListener('keyup', event => {
      event.preventDefault();
      if (this.keyCode.includes(event.code)) {
        if (event.key === 'Shift') {
          this.shiftLeftActive = false;
          this.shiftRightActive = false;
          this.updateKeysKeyboard();
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
    document.addEventListener('keydown', event => {
      event.preventDefault();
      pressed.add(event.code);
      if (combination.every(key => pressed.has(key))) {
        pressed.clear();
        this.language = !this.language;
        localStorage.setItem('language', this.language);
        this.updateKeysKeyboard();
      }
    });
    document.addEventListener('keyup', event => {
      pressed.delete(event.code);
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KEYBOARD);

/***/ }),

/***/ "./src/js/keys.js":
/*!************************!*\
  !*** ./src/js/keys.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const KEYS = [[
// RU - no Caps, no Shift: 000 => 0
'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// RU - no Caps, yes Shift: 001 => 1
'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// RU - yes Caps, no Shift: 010 => 2
'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Delete', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// RU - yes Caps, yes Shcift: 011 => 3
'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Delete', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// EN - no Caps, no Shcift: 100 => 4
'`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// EN - no Caps, yes Shcift: 101 => 5
'~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// EN - yes Caps, no Shcift: 110 => 6
'`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], [
// EN - yes Caps, yes Shcift: 111 => 7
'~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'Delete', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'ArrowUp', 'Shift', 'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control'], ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52], ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight']];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (KEYS);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/index.scss":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/index.scss ***!
  \***************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2 */ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff */ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2 */ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff */ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/img/noise_transparent.png */ "./src/assets/img/noise_transparent.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n  text-decoration: none;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline;\n  -webkit-text-decoration: underline dotted currentColor;\n          text-decoration: underline dotted currentColor; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n*,\n*:before,\n*:after {\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100%;\n  width: 100%;\n  font-size: 100%;\n  line-height: 1;\n  -ms-text-size-adjust: 100%;\n  -moz-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n/* roboto-mono-regular - cyrillic_latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Roboto Mono\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"woff\");\n}\n@font-face {\n  font-display: swap;\n  font-family: \"Roboto Mono\";\n  font-style: normal;\n  font-weight: 600;\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff2\"), url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"woff\");\n}\nhtml {\n  font-family: \"Georgia\", \"Times New Roman\", Times, serif;\n  font-size: 10px;\n  scroll-behavior: smooth;\n}\n\nbody {\n  font-size: 1.6rem;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + "), radial-gradient(110.67% 538.64% at 5.73% 50%, #513D2F 0%, #1A1A1C 100%), #211F20;\n}\n\nul li {\n  list-style: none;\n}\n\nimg {\n  width: 100%;\n  vertical-align: top;\n}\n\n.wrapper {\n  height: 100%;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  border: 0;\n  padding: 0;\n  white-space: nowrap;\n  -webkit-clip-path: inset(100%);\n          clip-path: inset(100%);\n  clip: rect(0 0 0 0);\n  overflow: hidden;\n}\n\n.noscroll {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n.title {\n  color: #f1cdb3;\n  text-align: center;\n}\n\n.textarea {\n  width: 100%;\n  min-height: 20rem;\n  padding: 1rem;\n  margin: 2rem auto;\n  background-color: #000000;\n  color: #00ff00;\n  border: 1px solid #292929;\n  outline: 2px solid #292929;\n  border-radius: 1rem;\n  box-shadow: 0px 0px 10px #fddcc4;\n  font-family: monospace, \"Roboto Mono\";\n  font-size: 2rem;\n  font-weight: 600;\n}\n.textarea.focus-visible {\n  border: 1px solid #00ff00;\n  outline: 2px solid #292929;\n}\n.textarea:focus-visible {\n  border: 1px solid #00ff00;\n  outline: 2px solid #292929;\n}\n\n.description {\n  padding: 0.5rem;\n  text-align: right;\n  color: #fddcc4;\n}\n\n.keyboard {\n  width: 100%;\n  margin: 0 auto;\n  padding: 1rem;\n  border: 3px solid #292929;\n  border-radius: 1rem;\n  justify-content: space-around;\n}\n\n.keyboard__key {\n  text-align: center;\n  line-height: 4rem;\n  background-color: #fddcc4;\n  box-shadow: 2px 2px 3px #545454;\n  border-radius: 0.5rem;\n  font-family: Arial, \"Roboto Mono\", Helvetica, sans-serif;\n  cursor: pointer;\n  transition: color 0.3s, text-shadow 0.3s, box-shadow 0.3s;\n}\n@media (hover: hover) {\n  .keyboard__key:hover {\n    box-shadow: 2px 2px 3px #ff9800;\n  }\n}\n.keyboard__key:active {\n  color: #ff9800;\n  text-shadow: 0px 0px 1px #000000, 0 0 1px #ff0000;\n  box-shadow: -2px -2px 3px #545454;\n}\n.keyboard__key.focus-visible {\n  outline: none;\n}\n.keyboard__key:focus-visible {\n  outline: none;\n}\n\n.active {\n  color: #ff9800;\n  text-shadow: 0px 0px 1px #000000, 0 0 1px #ff0000;\n  box-shadow: -2px -2px 3px #545454;\n}\n.active:hover {\n  box-shadow: -2px -2px 3px #545454;\n}\n\n.grid-container {\n  margin: 2rem auto;\n  display: grid;\n  grid-gap: 0.5rem;\n  gap: 0.5rem;\n  grid-template-columns: repeat(16, 4rem);\n  grid-template-rows: repeat(5, 4rem);\n  grid-template-areas: \"key0 key1 key2 key3 key4 key5 key6 key7 key8 key9 key10 key11 key12 key13 key13 key13\" \"key15 key15 key16 key17 key18 key19 key20 key21 key22 key23 key24 key25 key26 key27 key28 key29\" \"key30 key30 key31 key32 key33 key34 key35 key36 key37 key38 key39 key40 key41 key42 key42 key42\" \"key43 key43 key43 key44 key45 key46 key47 key48 key49 key50 key51 key52 key53 key54 key55 key55\" \"key56 key57 key58 key59 key59 key59 key59 key59 key59 key59 key59 key60 key61 key62 key63 key64\";\n  background-color: #b2b2b2;\n  box-shadow: 0px 0px 10px #fddcc4;\n}\n\n.keyboard__key:nth-child(14) {\n  grid-area: key13;\n}\n.keyboard__key:nth-child(15) {\n  grid-area: key15;\n}\n.keyboard__key:nth-child(30) {\n  grid-area: key30;\n}\n.keyboard__key:nth-child(42) {\n  grid-area: key42;\n}\n.keyboard__key:nth-child(43) {\n  grid-area: key43;\n}\n.keyboard__key:nth-child(55) {\n  grid-area: key55;\n}\n.keyboard__key:nth-child(59) {\n  grid-area: key59;\n}", "",{"version":3,"sources":["webpack://./src/style/_normalize.scss","webpack://./src/index.scss","webpack://./src/style/_fonts.scss","webpack://./src/style/_base.scss","webpack://./src/style/_constants.scss","webpack://./src/style/_keyboard.scss"],"names":[],"mappings":"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","sourcesContent":["/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n  text-decoration: none;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n*,\n*:before,\n*:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100%;\n  width: 100%;\n  font-size: 100%;\n  line-height: 1;\n  -ms-text-size-adjust: 100%;\n  -moz-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}","/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers.\n */\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Remove the gray background on active links in IE 10.\n */\na {\n  background-color: transparent;\n  text-decoration: none;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove the border on images inside links in IE 10.\n */\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=button]::-moz-focus-inner,\n[type=reset]::-moz-focus-inner,\n[type=submit]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=button]:-moz-focusring,\n[type=reset]:-moz-focusring,\n[type=submit]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n[type=checkbox],\n[type=radio] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=number]::-webkit-inner-spin-button,\n[type=number]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=search] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n[type=search]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n/**\n * Add the correct display in IE 10+.\n */\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n[hidden] {\n  display: none;\n}\n\n* {\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\n*,\n*:before,\n*:after {\n  -moz-box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n\nhtml,\nbody {\n  height: 100%;\n  width: 100%;\n  font-size: 100%;\n  line-height: 1;\n  -ms-text-size-adjust: 100%;\n  -moz-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\n/* roboto-mono-regular - cyrillic_latin */\n@font-face {\n  font-display: swap;\n  font-family: \"Roboto Mono\";\n  font-style: normal;\n  font-weight: 400;\n  src: url(\"./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2\") format(\"woff2\"), url(\"./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff\") format(\"woff\");\n}\n@font-face {\n  font-display: swap;\n  font-family: \"Roboto Mono\";\n  font-style: normal;\n  font-weight: 600;\n  src: url(\"./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2\") format(\"woff2\"), url(\"./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff\") format(\"woff\");\n}\nhtml {\n  font-family: \"Georgia\", \"Times New Roman\", Times, serif;\n  font-size: 10px;\n  scroll-behavior: smooth;\n}\n\nbody {\n  font-size: 1.6rem;\n  background: url(\"./assets/img/noise_transparent.png\"), radial-gradient(110.67% 538.64% at 5.73% 50%, #513D2F 0%, #1A1A1C 100%), #211F20;\n}\n\nul li {\n  list-style: none;\n}\n\nimg {\n  width: 100%;\n  vertical-align: top;\n}\n\n.wrapper {\n  height: 100%;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  border: 0;\n  padding: 0;\n  white-space: nowrap;\n  clip-path: inset(100%);\n  clip: rect(0 0 0 0);\n  overflow: hidden;\n}\n\n.noscroll {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n.title {\n  color: #f1cdb3;\n  text-align: center;\n}\n\n.textarea {\n  width: 100%;\n  min-height: 20rem;\n  padding: 1rem;\n  margin: 2rem auto;\n  background-color: #000000;\n  color: #00ff00;\n  border: 1px solid #292929;\n  outline: 2px solid #292929;\n  border-radius: 1rem;\n  box-shadow: 0px 0px 10px #fddcc4;\n  font-family: monospace, \"Roboto Mono\";\n  font-size: 2rem;\n  font-weight: 600;\n}\n.textarea:focus-visible {\n  border: 1px solid #00ff00;\n  outline: 2px solid #292929;\n}\n\n.description {\n  padding: 0.5rem;\n  text-align: right;\n  color: #fddcc4;\n}\n\n.keyboard {\n  width: 100%;\n  margin: 0 auto;\n  padding: 1rem;\n  border: 3px solid #292929;\n  border-radius: 1rem;\n  justify-content: space-around;\n}\n\n.keyboard__key {\n  text-align: center;\n  line-height: 4rem;\n  background-color: #fddcc4;\n  box-shadow: 2px 2px 3px #545454;\n  border-radius: 0.5rem;\n  font-family: Arial, \"Roboto Mono\", Helvetica, sans-serif;\n  cursor: pointer;\n  transition: color 0.3s, text-shadow 0.3s, box-shadow 0.3s;\n}\n@media (hover: hover) {\n  .keyboard__key:hover {\n    box-shadow: 2px 2px 3px #ff9800;\n  }\n}\n.keyboard__key:active {\n  color: #ff9800;\n  text-shadow: 0px 0px 1px #000000, 0 0 1px #ff0000;\n  box-shadow: -2px -2px 3px #545454;\n}\n.keyboard__key:focus-visible {\n  outline: none;\n}\n\n.active {\n  color: #ff9800;\n  text-shadow: 0px 0px 1px #000000, 0 0 1px #ff0000;\n  box-shadow: -2px -2px 3px #545454;\n}\n.active:hover {\n  box-shadow: -2px -2px 3px #545454;\n}\n\n.grid-container {\n  margin: 2rem auto;\n  display: grid;\n  gap: 0.5rem;\n  grid-template-columns: repeat(16, 4rem);\n  grid-template-rows: repeat(5, 4rem);\n  grid-template-areas: \"key0 key1 key2 key3 key4 key5 key6 key7 key8 key9 key10 key11 key12 key13 key13 key13\" \"key15 key15 key16 key17 key18 key19 key20 key21 key22 key23 key24 key25 key26 key27 key28 key29\" \"key30 key30 key31 key32 key33 key34 key35 key36 key37 key38 key39 key40 key41 key42 key42 key42\" \"key43 key43 key43 key44 key45 key46 key47 key48 key49 key50 key51 key52 key53 key54 key55 key55\" \"key56 key57 key58 key59 key59 key59 key59 key59 key59 key59 key59 key60 key61 key62 key63 key64\";\n  background-color: #b2b2b2;\n  box-shadow: 0px 0px 10px #fddcc4;\n}\n\n.keyboard__key:nth-child(14) {\n  grid-area: key13;\n}\n.keyboard__key:nth-child(15) {\n  grid-area: key15;\n}\n.keyboard__key:nth-child(30) {\n  grid-area: key30;\n}\n.keyboard__key:nth-child(42) {\n  grid-area: key42;\n}\n.keyboard__key:nth-child(43) {\n  grid-area: key43;\n}\n.keyboard__key:nth-child(55) {\n  grid-area: key55;\n}\n.keyboard__key:nth-child(59) {\n  grid-area: key59;\n}","/* roboto-mono-regular - cyrillic_latin */\n@font-face {\n  font-display: swap;\n  font-family: 'Roboto Mono';\n  font-style: normal;\n  font-weight: 400;\n  src: url('./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2') format('woff2'),\n    url('./assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff') format('woff');\n}\n@font-face {\n  font-display: swap;\n  font-family: 'Roboto Mono';\n  font-style: normal;\n  font-weight: 600;\n  src: url('./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2') format('woff2'),\n    url('./assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff') format('woff');\n}\n","html {\n  font-family: \"Georgia\", \"Times New Roman\", Times, serif;\n  font-size: 10px;\n  scroll-behavior: smooth;\n}\n\nbody {\n  font-size: 1.6rem;\n  background: $gradient-background;\n}\n\nul li {\n  list-style: none;\n}\n\nimg {\n  width: 100%;\n  vertical-align: top;\n}\n\n.wrapper {\n  height: 100%;\n  max-width: 800px;\n  margin: 0 auto;\n  padding: 1.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;  \n}\n\n.visually-hidden {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  margin: -1px;\n  border: 0;\n  padding: 0;\n  white-space: nowrap;\n  clip-path: inset(100%);\n  clip: rect(0 0 0 0);\n  overflow: hidden;\n}\n\n.noscroll {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}","// Color system\n$color-primary: #f1cdb3;\n$color-primary-light: #fddcc4;\n$color-light-l: #ff9800;\n$color-dark-m: #b2b2b2;\n$color-dark: #000000;\n$color-textarea: #00ff00;\n$color-warning: #ff0000;\n$color-dark-l: #545454;\n$color-dark-2xl: #444444;\n$color-dark-3xl: #292929;\n\n$gradient-background: url('./assets/img/noise_transparent.png'), radial-gradient(110.67% 538.64% at 5.73% 50%, #513D2F 0%, #1A1A1C 100%), #211F20;;\n\n$key-size: 4rem;\n",".title {\n  color: $color-primary;\n  text-align: center;\n}\n\n.textarea {\n  width: 100%;\n  min-height: 20rem;\n  padding: 1rem;\n  margin: 2rem auto;\n  background-color: $color-dark;\n  color: $color-textarea;\n  border: 1px solid $color-dark-3xl;\n  outline: 2px solid $color-dark-3xl;\n  border-radius: 1rem;\n  box-shadow: 0px 0px 10px $color-primary-light;\n  font-family: monospace, \"Roboto Mono\";\n  font-size: 2rem;\n  font-weight: 600;\n\n  &:focus-visible {\n    border: 1px solid $color-textarea;\n    outline: 2px solid $color-dark-3xl;\n  }\n}\n\n.description {\n  padding: 0.5rem;\n  text-align: right;\n  color: $color-primary-light;\n}\n\n.keyboard {\n  width: 100%;\n  margin: 0 auto;\n  padding: 1rem;\n  border: 3px solid $color-dark-3xl;\n  border-radius: 1rem;\n  justify-content: space-around;\n}\n\n.keyboard__key {\n  text-align: center;\n  line-height: $key-size;\n  background-color: $color-primary-light;\n  box-shadow: 2px 2px 3px $color-dark-l;\n  border-radius: 0.5rem;\n  font-family: Arial, \"Roboto Mono\", Helvetica, sans-serif;\n  cursor: pointer;\n  transition: color 0.3s, text-shadow 0.3s, box-shadow 0.3s;\n\n  @media (hover: hover) {\n    &:hover {\n      box-shadow: 2px 2px 3px $color-light-l;\n    }\n  }\n\n  &:active {\n    color: $color-light-l;\n    text-shadow: 0px 0px 1px $color-dark, 0 0 1px $color-warning;\n    box-shadow: -2px -2px 3px #545454;\n  }\n\n  &:focus-visible {\n    outline: none;\n  }\n}\n\n.active {\n  color: $color-light-l;\n  text-shadow: 0px 0px 1px $color-dark, 0 0 1px $color-warning;\n  box-shadow: -2px -2px 3px #545454;\n  \n  &:hover{    \n    box-shadow: -2px -2px 3px #545454;\n  }\n}\n\n.grid-container {\n  margin: 2rem auto;\n  display: grid;\n  gap: 0.5rem;\n  grid-template-columns: repeat(16, 4rem);\n  grid-template-rows: repeat(5, 4rem);\n  grid-template-areas:\n    \"key0 key1 key2 key3 key4 key5 key6 key7 key8 key9 key10 key11 key12 key13 key13 key13\"\n    \"key15 key15 key16 key17 key18 key19 key20 key21 key22 key23 key24 key25 key26 key27 key28 key29\"\n    \"key30 key30 key31 key32 key33 key34 key35 key36 key37 key38 key39 key40 key41 key42 key42 key42\"\n    \"key43 key43 key43 key44 key45 key46 key47 key48 key49 key50 key51 key52 key53 key54 key55 key55\"\n    \"key56 key57 key58 key59 key59 key59 key59 key59 key59 key59 key59 key60 key61 key62 key63 key64\";\n  background-color: $color-dark-m;\n  box-shadow: 0px 0px 10px $color-primary-light;\n}\n\n.keyboard__key {\n  &:nth-child(14) {\n    grid-area: key13;\n  }\n\n  &:nth-child(15) {\n    grid-area: key15;\n  }\n\n  &:nth-child(30) {\n    grid-area: key30;\n  }\n\n  &:nth-child(42) {\n    grid-area: key42;\n  }\n\n  &:nth-child(43) {\n    grid-area: key43;\n  }\n\n  &:nth-child(55) {\n    grid-area: key55;\n  }\n\n  &:nth-child(59) {\n    grid-area: key59;\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./assets/icons/favicon.png */ "./src/assets/icons/favicon.png"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>virtual-keyboard</title>\n  <link rel=\"shortcut icon\" href=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" type=\"image/x-icon\">\n</head>\n\n<body></body>\n\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!../node_modules/sass-loader/dist/cjs.js!./index.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[2]!./node_modules/sass-loader/dist/cjs.js!./src/index.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_node_modules_sass_loader_dist_cjs_js_index_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/icons/favicon.png":
/*!**************************************!*\
  !*** ./src/assets/icons/favicon.png ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/favicon_eeb725984c9b02c7cebb.png";

/***/ }),

/***/ "./src/assets/img/noise_transparent.png":
/*!**********************************************!*\
  !*** ./src/assets/img/noise_transparent.png ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/noise_transparent_96c117b31f7ee2c675c9.png";

/***/ }),

/***/ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff":
/*!******************************************************************!*\
  !*** ./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff";

/***/ }),

/***/ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2":
/*!*******************************************************************!*\
  !*** ./src/assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2 ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fonts/roboto-mono-v22-cyrillic_latin-600.woff2";

/***/ }),

/***/ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff":
/*!**********************************************************************!*\
  !*** ./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff";

/***/ }),

/***/ "./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2":
/*!***********************************************************************!*\
  !*** ./src/assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2 ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/fonts/roboto-mono-v22-cyrillic_latin-regular.woff2";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _js_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/keys */ "./src/js/keys.js");
/* harmony import */ var _js_keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/keyboard */ "./src/js/keyboard.js");




_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].createKeyboardTemplate();
_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].fillKeysKeyboard();
_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].mouseKeyboard();
_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].physicalKeys();
_js_keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].runShortcut();
})();

/******/ })()
;
//# sourceMappingURL=index.6740982a16cf22589751.js.map