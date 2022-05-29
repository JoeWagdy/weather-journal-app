// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=d41056df02784e0e8274f02cd44df772&units=imperial';

/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const zipCode = document.getElementById('zip').value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
  const newZip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(baseURL, newZip, apiKey)
    .then(function (data) {
      // Add data
      postData('/addData', { temp: data.main.temp, date: newDate, feel: feelings });
      retrieveData();
    })
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch('/all');
  try {
    // Transform into JSON
    const allData = await request.json()
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  }
  catch (error) {
    console.log("error", error);
  }
}