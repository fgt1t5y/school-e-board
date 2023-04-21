import { app, getClearHash } from "./imauther.base.js";
'use strict'

const menu = document.getElementById('menu');
var activeItem;

const IMAUTHER = new app();
const title_prefix = ' -- Gagago 作家工作台';
window.App = IMAUTHER;

function init() {
  if (location.hash === '') {
    IMAUTHER.route.hash = '/index';
  }
  const nickname = document.getElementById('nickname');
  nickname.textContent = localStorage.getItem('nickname');

  activeItem = document.getElementById(getClearHash());
  toggleNavTab(activeItem);
  window.dispatchEvent(new Event('hashchange'));
}

/**
 * 
 * @param {string} route route's name
 */
function loadHTML(route) {
  $('#mainView').load(`/imauther/ssr?page=${route}`);
}

/**
 * 
 * @param {HTMLElement} el_to_active A element to turn to svtive stat
 */
function toggleNavTab(el_to_active) {
  activeItem.classList.remove('active');
  el_to_active.classList.add('active');
  IMAUTHER.route.hash = '/' + el_to_active.id;
  document.title = el_to_active.textContent + title_prefix;
  activeItem = el_to_active;
}

window.addEventListener('load', () => {
  init();
});

window.addEventListener('hashchange', (ev) => {
  console.log(IMAUTHER.route.hash);
  toggleNavTab(document.getElementById(getClearHash()));
  loadHTML(getClearHash());
});
