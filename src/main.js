
/*
 * Пример кода.
 * Открывает файло, читайет байты и отрисовывает
 * в uint (unsigned int), hex, char
 * Ванильный js
 */

import css from './main.css';

/**
 * Read a file, and raise custom event loaded with 
 * Uint8Array bytes 
 */
const fileReader = event => {
	const node = event.target;
	const file = node.files[0] || null;

	if (!file) {
		alert('File, where are you?')
		return;
	}

	const reader = new FileReader();
	reader.readAsArrayBuffer(file);

	reader.onload = event => {
		node.dispatchEvent((new CustomEvent('loaded', { 
			detail: new Uint8Array(event.target.result) 
		})))
	}
}


/**
 * Render bytes buffer into uintView, hexView, chrView
 * example of decorator function
 */
const fileRender = (uintView, hexView, hexEditor, charView) => event => {

	const buffer = event.detail;
	const bufferAsArray = buffer.reduce( (reduction, byte) => { 
		reduction.push(byte); return reduction; 
	}, [] )

	uintView.value = buffer.join(' ')
	hexView.value = bufferAsArray.map( byte => byte.toString(16) ).join(' ') 

	hexEditor.children[0].innerHTML = bufferAsArray
		.map( byte => `<span>${byte.toString(16).padStart(2, 0)}</span>` ).join(' ')

	charView.children[0].innerHTML =  bufferAsArray
		.map( byte => `<span>${String.fromCharCode(byte).padStart(2, ' ')}</span>`).join(' ')
}


/**
 * Init, prepare DOM
 */
const init = selector => {
	try {
		const root = document.querySelector(selector);
		
		if (!root) {
			throw "Oops"
		}

		const hexView = document.createElement('textarea');
		const uintView = document.createElement('textarea');

		const hexEditor = document.createElement('div');
			  hexEditor.className = 'hexEditor';
			  hexEditor.appendChild(document.createElement('div'))

		const charView = document.createElement('div');
			  charView.className = 'hexEditor';
			  charView.appendChild(document.createElement('div'))

		const fileInput = document.createElement('input');
			  fileInput.type = 'file';
			  fileInput.addEventListener('change', fileReader);
			  fileInput.addEventListener('loaded', fileRender(uintView, hexView, hexEditor, charView));

		
		[fileInput, uintView, hexEditor, charView].forEach( node => root.appendChild(node) )

	} catch(e) {
		alert(e);
	}
}


init('.root');
