import xior from 'xior';

const smoastersApi = xior.create({
  baseURL: 'https://smoasters.coffeeannan.com/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default smoastersApi;
