import API from './api';

class CheckoutService {
  request(data) {
    return fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }
};

export default new CheckoutService();
