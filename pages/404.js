import NextError from 'next/error';
import useTranslation from 'next-translate/useTranslation';
import DefaultLayout from '../components/Layout/DefaultLayout';

export default function Custom404() {
    const { t } = useTranslation();
    return <DefaultLayout>
        <NextError
            statusCode={404}
            title={t('common:not-found')}
        />
    </DefaultLayout>
}