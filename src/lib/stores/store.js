import { writable } from 'svelte/store';

export const resizing = writable(false);

export const html = writable('');
export const css = writable('');
export const js = writable('');
