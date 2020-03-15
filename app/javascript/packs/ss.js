import "./ss.scss";
import SS from '../ss/ss'

const ss = new SS();

window.ss = {};
window.ss.ready = ss.ready.bind(ss);
window.ss.t = ss.i18n.t.bind(ss.i18n);

console.log("Welcome to SHIRASAGI");

import Clipboard from '../ss/clipboard'
window.ss.Clipboard = Clipboard;
