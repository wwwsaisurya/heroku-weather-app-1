const weatherForm = document.querySelector('.weather__form');
const weatherInput = document.querySelector('.weather__search-input');
const weatherButton = document.querySelector('.weather__search-button');
const weatherResult = document.querySelector('.weather__result');

weatherForm.addEventListener('submit', function (ev) {
  ev.preventDefault();
  const locationValue = weatherInput.value;
  weatherResult.textContent = 'Loading...';
  fetch(`http://localhost:2323/api/weather?address=${locationValue}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.error) {
        return weatherResult.textContent = data.error;
      }
      const { location, precipProbability, summary, temperature } = data;
      weatherResult.textContent = `${location}. ${summary}. There is ${temperature} degrees of Celsius out. The chance of rain is ${(precipProbability * 100).toFixed()}%.`;
    });
});
