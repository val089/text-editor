let output = document.querySelector('#output');

const editorBtns = [...document.querySelectorAll('[data-command]')];
editorBtns.forEach((btn) =>
	btn.addEventListener('click', () => {
		document.execCommand(btn.dataset['command']);
		btn.classList.toggle('panel__button--active');
	})
);

const saveBtn = document.querySelector('#saveBtn');
saveBtn.addEventListener('click', () => {
	const formattedText = output.textContent;
	// .replace(/(<([^>]+)>)/gi, '')
	// .trim();

	downloadToFile(
		JSON.stringify(formattedText),
		'file',
		'application/json;charset=utf-8'
	);
});

const uploadBtn = document.querySelector('#uploadBtn');
uploadBtn.addEventListener('change', function () {
	let file = this.files[0];
	let reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		output.textContent = JSON.parse(reader.result);
		const loadFromFileBtn = document.querySelector('#uploadBtn');
		loadFromFileBtn.value = '';
	};
	reader.onerror = function () {
		console.log(reader.error);
	};
});

function downloadToFile(content, filename, contentType) {
	const a = document.createElement('a');
	const file = new Blob([content], { type: contentType });

	a.href = URL.createObjectURL(file);
	a.download = filename;
	a.click();

	URL.revokeObjectURL(a.href);
}
