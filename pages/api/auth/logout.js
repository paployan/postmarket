import Cookies from 'cookies';

export default (req, res) => {
  return new Promise((resolve, reject) => {
    try {
      const cookies = new Cookies(req, res);
      cookies.set('access-token', '', {});
      res.status(res.statusCode).json({
        loggedIn: false,
      });
      resolve();
    } catch (err) {
      reject(err)
    };
  });
};
