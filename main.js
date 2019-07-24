'use strict';

const PARAM_REGEX = /(\?|\&)(\w+=([\d]+))/;
const LISTENED_MOUSE_BTN = 4;

function digits(number, count = 1) {
    return number >= 10 ? digits(number / 10, count + 1) : count;
}

function nextPageUrl([full, sign, param, result]) {
    return window.location.href.replace(param, param.substr(0, param.length - digits(result)) + (parseInt(result) + 1));
}

function main() {
    document.body.addEventListener('mousedown', mouseEvent => {
        if (mouseEvent.which === LISTENED_MOUSE_BTN) {
            const match = window.location.href.match(PARAM_REGEX);
            if (match) {
                window.location = nextPageUrl(match);
            } else {
                console.info('[next-page-script] no page param found', window.location.href);
            }
        }
    });
}
