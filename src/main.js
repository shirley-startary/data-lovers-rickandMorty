const main = async () =>  {
	const dataApi = await dataLover.getData('https://rickandmortyapi.com/api/character');

	const state = {
		character: dataApi,
		orderBy:null,
		orderDirection:null,
		search:null
	};

			const container = document.getElementById('root');		

	const modal = async info => {
		const title = document.getElementById('title-modal');
		const content = document.getElementById('modal-body');


		const anAsyncFunction = async item => {
			return await dataLover.getData(item);
		};
		
		const dataEpisodes = async () => {
			return await Promise.all(info.episode.map(async item => await anAsyncFunction(item)));
		};

		const data = await dataEpisodes();

		title.innerHTML = info.name;
		content.innerHTML = `
		<div class="container-fluid">
    <div class="row">
			<div class="col-md-6  ml-auto">
				<img src="${info.image}"/>
			</div>
			<div class="col-md-4 ml-auto">
				<p>Specie: ${info.species}</p>
				<p>Gender: ${info.gender}</p>
				<p>Status: ${info.status}</p>
				<p>Origin: ${info.origin.name}</p>
				<p>Location: ${info.location.name}</p>
			</div>
    </div>
    <div class="row">
			<div class="col-md-12 ml-auto">
				Episodes in which he has left:
				<table>
					<tr>
						<th>Nro Episode</th>
						<th>Name Episode</th>
						<th>Created</th>
					</tr>
					${data.map(item => `<tr>
																<td>${item.id}</td>
																<td>${item.name}</td>
																<td>${item.created}</td>
															</tr>`)}
				</table>
			</div>
    </div>
  </div>`;
	};
	

	const render = () => {
		const data = dataLover.processData(state);
		container.innerHTML = dataLover.showCarts(data);

	};

	const menuSort = document.querySelector('.dropdown-menu');
	menuSort.addEventListener('click', (e) => {
		if (e.target.tagName !== "A") {
			return;
		}
		const newState = {
			orderBy:event.target.dataset.orderby,
			orderDirection: event.target.dataset.orderdirection
		};

		Object.assign(state, newState);

		render();

	});


	const filterInput = document.getElementById('search-form');
	filterInput.addEventListener('keyup', (e) => {

		Object.assign(state, {search: e.target.value});

		render();
	});

	render();

	const handleClick = async (e) => {

		if (e.target.tagName !== "BUTTON" || !e.target.classList.contains('boton-detalle')) {
			return;
		}

		const id = e.target.dataset.info;
		const url = `https://rickandmortyapi.com/api/character/${id}`;
		const info = await dataLover.getData(url);

		modal(info);	
	};
	
	container.addEventListener('click',handleClick);

};

window.addEventListener('load', main);
