const KEYS = [
  [ // RU - no Caps, no Shift
    'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Delete',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // RU - no Caps, yes Shift
    'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Delete',
    'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // RU - yes Caps, no Shift
    'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Delete',
    'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
    'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // RU - yes Caps, yes Shcift
    'ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Delete',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'AltGraph', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],

  [ // EN - no Caps, no Shcift
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Delete',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // EN - no Caps, yes Shcift
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Delete',
    'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\"', 'Enter',
    'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // EN - yes Caps, no Shcift
    '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Delete',
    'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter',
    'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ],
  [ // EN - yes Caps, yes Shcift
    '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|', 'Delete',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '\"', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'ArrowUp', 'Shift',
    'Control', 'Meta', 'Alt', ' ', 'Alt', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Control',
  ]
];

export default KEYS;
