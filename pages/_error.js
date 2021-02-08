import NextError from 'next/error';
import useTranslation from 'next-translate/useTranslation';
import DefaultLayout from '../components/Layout/DefaultLayout';

function Error({ statusCode }) {
    const { t } = useTranslation();
    return (
        <DefaultLayout>
            <NextError statusCode={statusCode}
            title={t('common:error-server')}
        />
        </DefaultLayout>
    );
};
  
Error.getInitialProps = ({ res, err }) => {
    // eslint-disable-next-line no-nested-ternary
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
}

export default Error;