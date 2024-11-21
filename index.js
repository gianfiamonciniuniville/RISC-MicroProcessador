const items = [];

const convertToBinary = (text) => {
	return text
		.split("")
		.map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
		.join(" ");
};

const addToList = () => {
	const input = document.getElementById("textInput");
	const text = input.value.trim();

	if (!text) {
		alert("Por favor, digite algum texto!");
		return;
	}

	const binary = convertToBinary(text);

	items.push({ text, binary });

	input.value = "";
	updateList();
};

const updateList = () => {
	const listContainer = document.getElementById("list");
	listContainer.innerHTML = "";

	items.forEach((item, index) => {
		const itemDiv = document.createElement("div");
		itemDiv.className = "item";

		const content = document.createElement("div");
		content.innerHTML = `
          <strong>Texto:</strong> ${item.text}<br>
          <strong>Binário:</strong> ${item.binary}
        `;

		const buttonsDiv = document.createElement("div");
		buttonsDiv.className = "buttons";

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "Excluir";
		deleteButton.style.backgroundColor = "red";
		deleteButton.textContent = "Excluir";
		deleteButton.onclick = () => deleteItem(index);

		buttonsDiv.appendChild(deleteButton);

		itemDiv.appendChild(content);
		itemDiv.appendChild(buttonsDiv);

		listContainer.appendChild(itemDiv);
	});
};

const deleteItem = (index) => {
	items.splice(index, 1);
	updateList();
};

const clearList = () => {
	if (items.length === 0) {
		alert("A lista já está vazia!");
		return;
	}

	if (confirm("Tem certeza de que deseja limpar toda a lista?")) {
		items.length = 0;
		updateList();
	}
};

const exportToTxt = () => {
	if (items.length === 0) {
		alert("A lista está vazia! Não há nada para exportar.");
		return;
	}

	const content = items
		.map((item) => `Texto: ${item.text}\nBinário: ${item.binary}`)
		.join("\n\n");

	const blob = new Blob([content], { type: "text/plain" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "lista_binario.txt";
	link.click();
};
