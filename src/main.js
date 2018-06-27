const getJson = (url) => fetch(url).then((response) => response.json());

const action = (event) => {
  Promise.all([getJson(`https://api.laboratoria.la/cohorts/${event.target.value}`),
              getJson(`https://api.laboratoria.la/cohorts/${event.target.value}/users`),
              getJson(`https://api.laboratoria.la/cohorts/${event.target.value}/progress`)])
              .then((result) => {
                console.log(result[0], result[1], result[2]);
              })
};

const paintCohorts = (cohort) => {
  const cohortsSelect = document.getElementById('cohortsSelect');
  cohort.forEach((item) => {
    cohortsSelect.insertAdjacentHTML('beforeend', `<option id="${item.id}">${item.id}</option>`);
  })
  cohortsSelect.addEventListener('change',action);
}
getJson('https://api.laboratoria.la/cohorts').then(res => paintCohorts(res));
