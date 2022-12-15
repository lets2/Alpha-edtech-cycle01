// Products.
const products = [];

// Errors.
const errors = {
	product: {
		registration: {
			requiredName: function() {
				return new Error("nome do produto obrigatório!");
			},
			requiredDescription: function() {
				return new Error("descrição do produto obrigatória!");
			},
			requiredValue: function() {
				return new Error("valor do produto obrigatório!");
			}
		},
		update: {
			missingID: function() {
				return new Error("id do produto não encontrado!");
			},
		},
		procedures: {
			notFound: function() {
				return new Error("produto não encontrado!");
			},
			indexNotFound: function() {
				return new Error("índice do produto não encontrado!");
			},
		}
	}
};

// Messages.
const messages = {
	product: {
		registeredSuccessfully: function(product) {
			return `Produto "${product.name}" incluído com sucesso!`;
		},
		updatedSuccessfully: function(product) {
			return `Produto "${product.name}" atualizado com sucesso!`;
		}
	}
};

// Labels.
const labels = {
	includeProduct: "Incluir produto",
	updateProduct: "Atualizar produto"
};

// Elements.
const elements = {
	form: document.querySelector("form"),
	result: document.querySelector("#result"),
	modal: document.querySelector("#modal"),
	buttons: {
		productsSubmit: document.querySelector("#button-submit-products"),
		cancelEdition: document.querySelector("#button-cancel-product-edition"),
		productsList: document.querySelector("#button-list-products")
	},
	messages: {
		success: document.querySelector("#msg-success"),
		error: document.querySelector("#msg-error")
	}
};

// Handlers.
const handlers = {
	products: {
		prepareInputs: function(event) {
			elements.messages.success.innerHTML = "";
			elements.messages.error.innerHTML = "";

			// Build product object.
			const product = {};
	
			// Product name.
			product.name = event.target.name.value;
		
			if (product.name === "") {
				throw errors.product.registration.requiredName();
			};
		
			// Product description.
			product.description = event.target.description.value;
		
			if (product.description === "") {
				throw errors.product.registration.requiredDescription();
			};
		
			// Product value.
			product.value = parseFloat(event.target.value.value);
		
			if (isNaN(product.value)) {
				throw errors.product.registration.requiredValue();
			};
		
			return product;
		},
		register: function(event) {
			event.preventDefault();

			try {
				const product = handlers.products.prepareInputs(event);
				actions.products.register(product);

				actions.products.clearForm();

				elements.messages.success.innerHTML = messages.product.registeredSuccessfully(product);
			} catch(err) {
				elements.messages.error.textContent = `Falha no cadastro do produto: ${err.message}`;
			};
		},
		update: function(event) {
			event.preventDefault();

			try {
				const product = handlers.products.prepareInputs(event);

				// Product ID.
				product.id = parseInt(event.target.id.value, 10);
			
				if (isNaN(product.id)) {
					throw errors.product.update.missingID();
				};

				actions.products.update(product);

				actions.products.clearForm();

				elements.messages.success.innerHTML = messages.product.updatedSuccessfully(product);
			} catch(err) {
				elements.messages.error.textContent = `Falha na atualização do produto: ${err.message}`;
			};
		},
		validateFields: function(event) {
			// Value validation.
			if (event.target.name === "value") {
				const input = event.target.value;
				const cursorPosition = event.target.selectionStart;

				function manageInputCursor(event) {

					if (event.inputType === "deleteContentBackward") {
						event.target.setSelectionRange(cursorPosition, cursorPosition);
						return;
					};
			
					if (isNaN(parseInt(event.data, 10))) {
						event.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
						return;
					};
					
					event.target.setSelectionRange(cursorPosition, cursorPosition);
					return;
				};
				
				if (input !== "") {
					const numbers = input.replace(",", ".").replace(/[^0-9]/, "");
					const value = parseInt(numbers, 10) / 100;
					
					if (isNaN(value) || value === 0) {
						event.target.value = "";
					} else {
						event.target.value = utils.formateMoney(value);
					};

					if (input.length !== 1) {
						manageInputCursor(event);
					};
				};
			};
		},
		cancelEdition: function() {
			actions.products.cancelEdition();
		},
		showTable: function() {
			actions.products.showTable();
		}
	}
};

// Events.
const events = {
	add: {
		products: {
			register: function() {
				elements.form.addEventListener("submit", handlers.products.register)
			},
			update: function() {
				elements.form.addEventListener("submit", handlers.products.update)
			},
			validateFields: function() {
				elements.form.addEventListener("input", handlers.products.validateFields)
			},
			showTable: function() {
				elements.buttons.productsList.addEventListener("click", handlers.products.showTable)
			},
			cancelEdition: function() {
				elements.buttons.cancelEdition.addEventListener("click", handlers.products.cancelEdition)
			},
		}
	},
	remove: {
		products: {
			register: function() {
				elements.form.removeEventListener("submit", handlers.products.register);
			},
			update: function() {
				elements.registerForm.removeEventListener("click", handlers.products.update)
			},
			showTable: function() {
				elements.buttons.productsList.removeEventListener("click", handlers.products.showTable);
			}
		}
	}
};

// Structures.
const structures = {
	product: {
		table: function(products) {
			let body = "";
			
			let index = 0;
			while (index < products.length) {
				body += `
					<tr>
						<td class="table-body-id">${products[index].id}</td>
						<td class="table-body-name">
							<button
								type="button"
								class="button-text"
								onclick="actions.products.showInfo(${products[index].id})"
							>
								${products[index].name}
							</button>
						</td>
						<td class="table-body-value">R$ ${utils.formateMoney(products[index].value)}</td>
						<td class="table-body-edit">
							<button
								type="button"
								class="button-icon"
								onclick="actions.products.prepareForEdition(${products[index].id})"
							>
								<img
									class="icon"
									src="./assets/edit-icon.svg"
									alt="Editar produto."
								/>
							</button>
						</td>
						<td class="table-body-exclude">
						<button
								type="button"
								class="button-icon"
								onclick="actions.products.exclude(${products[index].id})"
							>
								<img
									class="icon"
									src="./assets/trash-icon.svg"
									alt="Excluir produto."
								/>
							</button>
						</td>
					</tr>
				`;
				index++;
			};

			return `
				<h2>Produtos</h2>

				<table class="product-table">
					<thead>
						<tr>
							<td class="table-header table-header-id">ID</td>
							<td class="table-header table-header-name">Produto</td>
							<td class="table-header table-header-value">Valor</td>
							<td class="table-header table-header-edit">Editar</td>
							<td class="table-header table-header-exclude">Apagar</td>
						</tr>
					</thead>

					<tbody>
						${body}
					</tbody>
				</table>
			`;
		},
		info: function(productID) {
			const product = procedures.products.getProductByID(productID);

			return `
				<div class="product-info">
					<button type="button" class="button-close-modal button-icon">
						<img
							src="./assets/close-icon.svg"
							class="icon"
							alt="Fechar modal."
							onclick="actions.products.hideInfo()"
						/>
					</button>

					<h2>${product.name.toUpperCase()}</h2>
					
					<div>
						<label>ID</label>
						<p>${product.id}</p>
					</div>
					<div>
						<label>Descrição</label>
						<p>${product.description}</p>
					</div>
					<div>
						<label>Valor</label>
						<p>R$ ${utils.formateMoney(product.value)}</p>
					</div>
					<div>
						<label>Data de criação</label>
						<p>${utils.formatDate(product.includedAt)}</p>
					</div>
				<div>
			`;
		}
	}
};

// Actions.
const actions = {
	products: {
		register: function(product) {
			procedures.products.register(product);
		},
		update: function(product) {
			procedures.products.update(product);
		},
		exclude: function(productID) {
			try {
				procedures.products.exclude(productID);
				this.showTable();
			} catch(e) {
				elements.messages.error.textContent = `Falha ao excluir o produto: ${err.message}`;
			};
		},
		showTable: function() {
			elements.result.innerHTML = structures.product.table(products);
		},
		showInfo: function(productID) {
			try {
				elements.modal.innerHTML = structures.product.info(productID);
				elements.modal.style.display = "flex";
			} catch(e) {
				elements.messages.error.textContent = `Falha ao exibir as informações do produto: ${err.message}`;
			};
		},
		hideInfo: function() {
			elements.modal.innerHTML = "";
			elements.modal.style.display = "none";
		},
		prepareForEdition: function(productID) {
			const product = procedures.products.getProductByID(productID);

			elements.form.elements.id.value = product.id;
			elements.form.elements.name.value = product.name;
			elements.form.elements.description.value = product.description;
			elements.form.elements.value.value = utils.formateMoney(product.value);

			events.remove.products.register();
			events.add.products.update();

			elements.buttons.productsSubmit.textContent = labels.updateProduct;
			elements.buttons.cancelEdition.style.display = "block";
		},
		cancelEdition: function() {
			elements.registerForm.elements.id.value = "";
			elements.registerForm.elements.name.value = "";
			elements.registerForm.elements.description.value = "";
			elements.registerForm.elements.value.value = "";

			events.remove.products.update();
			events.add.products.register();

			elements.buttons.productsSubmit.textContent = labels.includeProduct;
			elements.buttons.cancelEdition.style.display = "none";
		},
		clearForm: function() {
			elements.form.elements.name.value = "";
			elements.form.elements.description.value = "";
			elements.form.elements.value.value = "";
		}
	}
};

// Procedures.
const procedures = {
	products: {
		register: function(product) {
			product.id = products[products.length - 1].id + 1;
			product.includedAt = new Date().toISOString();
			products.push(product);
		},
		update: function(product) {
			const index = this.getIndexByID(product.id);

			products[index].name = product.name;
			products[index].description = product.description;
			products[index].value = product.value;
		},
		exclude: function(productID) {
			const index = this.getIndexByID(productID);
			products.splice(index, 1);
		},
		getProductByID: function(productID) {
			let index = 0;
			
			while (index < products.length) {
				if (products[index].id === parseInt(productID, 10)) {
					return products[index];
				};
				index++;
			};

			throw errors.product.procedures.notFound();
		},
		getIndexByID: function(productID) {
			let index = 0;

			while (index < products.length) {
				if (products[index].id === parseInt(productID, 10)) {
					return index;
				};
				index++;
			};

			throw errors.product.procedures.indexNotFound();
		}
	}
};

// Utils.
const utils = {
	formatDate: function(ISOString) {
		function formatValue(value) {
			if (value < 10) {
				return `0${value}`;
			};
			return value;
		};

		const date = new Date(ISOString);

		const year = date.getFullYear();
		const month = formatValue(date.getMonth() + 1);
		const day = formatValue(date.getDate());
		const hours = formatValue(date.getHours());
		const minutes = formatValue(date.getMinutes());
		const seconds = formatValue(date.getSeconds());

		return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
	},
	formateMoney: function(value) {
		return `${value.toFixed(2).replace(".", ",")}`
	}
};

// Init.
(function init() {
	// Events.
	events.add.products.register();
	events.add.products.showTable();
	events.add.products.cancelEdition();
	events.add.products.validateFields();
})();
