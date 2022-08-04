import { writable } from 'svelte/store';
const PREFIX = 'budgetpen-';

const storedTheme = localStorage.getItem(PREFIX + 'theme');

export const isDark = writable(themeCheck());

let firstLoad = true;

isDark.subscribe((value) => {
	if (firstLoad) {
		firstLoad = false;
		return;
	} else {
		toggleTheme();
	}
});

function toggleTheme() {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.remove('dark');
		localStorage.setItem(PREFIX + 'theme', 'light');
	} else {
		document.documentElement.classList.add('dark');
		localStorage.setItem(PREFIX + 'theme', 'dark');
	}
}

function themeCheck() {
	if (storedTheme === 'light') {
		localStorage.setItem(PREFIX + 'theme', 'light');
		return false;
	} else {
		document.documentElement.classList.add('dark');
		localStorage.setItem(PREFIX + 'theme', 'dark');
		return true;
	}
}
