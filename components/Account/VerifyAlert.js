import { Alert } from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';

export default function VerifyAlert() {
    const { t } = useTranslation();
    return (
        <Alert variant="warning">
            <Alert.Heading>{t('account:verify-email')}</Alert.Heading>
            <p>{t('account:verify-email-sent')}</p>
        </Alert>
    );
};