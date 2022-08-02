import { writable } from 'svelte/store';
const PREFIX = 'budgetpen-';

export const resizing = writable(false);

const storedHTML = localStorage.getItem(PREFIX + 'html');
const storedJS = localStorage.getItem(PREFIX + 'js');
const storedCSS = localStorage.getItem(PREFIX + 'css');
const storedTailwindOption = localStorage.getItem(PREFIX + 'tailwind');

export const html = writable(storedHTML || '');
export const js = writable(storedJS || '');
export const css = writable(storedCSS || '');
export const tailwind = writable(storedTailwindOption === 'true' ? true : false || false);

html.subscribe((value) => {
	localStorage.setItem(PREFIX + 'html', value);
});

js.subscribe((value) => {
	localStorage.setItem(PREFIX + 'js', value);
});

css.subscribe((value) => {
	localStorage.setItem(PREFIX + 'css', value);
});
tailwind.subscribe((value) => {
	localStorage.setItem(PREFIX + 'tailwind', value.toString());
});
