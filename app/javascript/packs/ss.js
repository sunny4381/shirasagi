import "./ss.scss";
import i18n from 'i18next'
import resources from '../locales'

console.log(resources);

i18n.init({
  lng: 'ja',
  fallbackLng: 'en',
  debug: true,
  // resources: {
  //   en: {
  //     translation: {
  //       footer: {
  //         aboutUs: "About us"
  //       }
  //     }
  //   },
  //   ja: {
  //     translation: {
  //       footer: {
  //         aboutUs: "会社概要"
  //       }
  //     }
  //   }
  // }
  resources: resources
});

console.log("Welcome to SHIRASAGI");

// export
window.i18n = i18n;
