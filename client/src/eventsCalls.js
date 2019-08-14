import API from './api';
import appendAuthorizationHeaders from './appendAuthorizationHeaders';

function setCalendarUrl(amount) {
  let url = 'calendar';
  if (amount) {
    url = `calendar?count=${amount}`;
  }
  return url;
}

const getEvents = (amount) => {
  const url = setCalendarUrl(amount);
  return API.get(url).then(response => response.data);
};

const addEvents = event =>
  API.post('calendar', event, { headers: appendAuthorizationHeaders() }).then(res => res.data);

const getEventById = id => API.get(`calendar/${id}`).then(response => response.data);

export { getEvents, addEvents, getEventById };
