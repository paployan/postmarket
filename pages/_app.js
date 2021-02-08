import App from 'next/app';
import Router from 'next/router';
import cookie from 'cookie';
import NProgress from 'nprogress';
import I18nProvider from 'next-translate/I18nProvider';
import { wrapper } from '../store';
import { AuthProvider } from '../services/useAuth';
import '../styles/index.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  render() {
    const { Component, pageProps, authenticated, locale } = this.props;
    return (
      <I18nProvider lang={locale}>
        <AuthProvider authenticated={authenticated}>
          <Component {...pageProps} />
        </AuthProvider>
      </I18nProvider>
    );
  }
};

MyApp.getInitialProps = async (appContext) => {
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || '');
    authenticated = !!request.cookies['access-token'];
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    authenticated,
    locale: appContext.router.locale,
  };
};

export default wrapper.withRedux(MyApp);
