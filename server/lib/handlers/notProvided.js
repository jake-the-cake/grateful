"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notProvided = void 0;
const notProvided = (item) => {
    let message = `A -${item}- was not provided.`;
    if (item[0].match(/^[aeiou]/) && item !== 'user')
        message = message.replace('A', 'An');
    return { type: "RequiredValue" /* ErrorTypes.Required */, message };
};
exports.notProvided = notProvided;
