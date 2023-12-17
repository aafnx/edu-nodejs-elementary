"use strict";

function generate(length = 6, isSpecial, isNumber, isLetters = true) {
    if (length < 4) throw new Error('Password length cannot be less than 4 characters');

    const chars = {
        letters: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
        special: '!@#$%^&*()_+',
        numbers: '0123456789',
    }

    let activeChars = '';
    if (isLetters) activeChars += chars.letters;
    if (isSpecial) activeChars += chars.special;
    if (isNumber) activeChars += chars.numbers;

    if (!activeChars) throw new Error('Error generating password. The type of symbols to be used is not selected.')

    let result = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * activeChars.length);
        result += activeChars[index]
    }
    return result;
}

module.exports = { generate };
