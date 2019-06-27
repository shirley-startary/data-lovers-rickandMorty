window.dataLover = {

	processData: options => {
		const arrayfilter = dataLover.filter(options.character.results, options.search);		
		const arraySort = dataLover.sortData(arrayfilter, options.orderBy, options.orderDirection);
		return arraySort;
	},

	getData: async (url) => {
		const response = await fetch(url);
		return await response.json();
	},

  filter: (data, filterBy) => {
		if (!filterBy) {
			return data;
		}

		filterBy = filterBy.toLowerCase();

		return data.filter(element => {

			if (element.name.toLowerCase().indexOf(filterBy) > -1  || 
					element.gender.toLowerCase().indexOf(filterBy) > -1 || 
					element.species.toLowerCase().indexOf(filterBy) > -1) {
				return element;
      }
		});
	},
		
	sortData: (data, sortBy, sortOrder) => {
		return data.sort((a, b)=> {
			if (sortOrder == "ASC"){
				if (a[sortBy] < b[sortBy] ) {
					return -1;
				} 
				if (a[sortBy] > b[sortBy]) {
					return 1;
				}
				return 0;
			}
			if (sortOrder == "DESC" ) {
				if (a[sortBy] > b[sortBy] ) {
					return -1;
				} 
				if (a[sortBy] < b[sortBy]) {
					return 1;
				}
				return 0;
			}
		});
	},

	showCarts: arrayData => {
    // Esta función debe de recibir una arraglo de objetos
		// Y debe de retornar una string de tarjetas.
		const templateTotal = arrayData.reduce((prev,element) => {
			const template = `<div class="card card-width margin-auto justify">
													<img src="${element.image}" class="card-img-top" alt="${element.name}">
													<div class="card-body">
														<h5 class="card-title">${element.name}</h5>
														<p class="card-text">${element.species}</p>
														<button class="btn btn-primary btn-lg btn-block boton-detalle" data-info="${element.id}" data-toggle="modal" data-target=".bd-example-modal-lg">Detalle</button>
													</div>
												</div>`;
			return prev + template;
		}, '');		

		return templateTotal;
	}
};