class AuthService {
  login(email, password, locale) {
    return fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, locale }),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw {
          statusCode: response.status,
          ...data
        };
      }
      return data;
    })
  }

  register(data) {
    return fetch('/api/auth/register', {
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

  verifyEmail({ id, token, expires, signature }) {
    return fetch(`${process.env.SERVER_URL}/api/auth/email/verify/${id}/${token}?expires=${expires}&signature=${signature}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  }
};

export default new AuthService();
