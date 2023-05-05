import './index.html';
import './index.scss';
import './js/keys';
import KEYBOARD from './js/keyboard';

KEYBOARD.createKeyboardTemplate();
KEYBOARD.fillKeysKeyboard();
KEYBOARD.mouseKeyboard();
KEYBOARD.physicalKeys();
KEYBOARD.runShortcut();
