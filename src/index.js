import './sass/main.scss';

import refs from './js/refs';
import API from './js/fetchCountries';
import previewCountryTpl from './templates/preview-countryTpl.hbs'
import countryTpl from './templates/countryTpl.hbs'

import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const searchInput = e => {
    const searchQuery = e.target.value;
    refs.countriesMrkp.innerHTML = '';

    if (searchQuery.length < 1)
    return;

    API.fetchCountries(searchQuery)
    .then(dataShow)
    .catch(noticeInfo);
};

const dataShow = countries => {
    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 5000,
        });
    };
    if (countries.length > 1 && countries.length < 10) {
        refs.countriesMrkp.innerHTML = previewCountryTpl(countries);
    };
    if (countries.length === 1) {
        refs.countriesMrkp.innerHTML = countryTpl(...countries);
    };
};
const noticeInfo = () => {
        notice({
            title: 'OOPS!',
            text: 'Invalid entered value. Try again =)',
            delay: 2500,
        });
}

refs.search.addEventListener('input', debounce(searchInput, 500));