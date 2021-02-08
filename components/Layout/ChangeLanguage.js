import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Nav } from 'react-bootstrap';
import i18nConfig from '../../i18n.json';

const { locales } = i18nConfig;

export default function ChangeLanguage() {
    const router = useRouter();
    const { t, lang } = useTranslation();

    const changeLang = (lang) => {
        window.location = `${window.location.origin}/${lang}${router.asPath}`;
    };

    return (
        <Nav defaultActiveKey={lang.toString()} className="ml-auto mr-3 navbar-lang">
            {locales.map((lng) => (
                <Link href={router.asPath} locale={lng} key={lng.toString()} passHref>
                    <Nav.Link eventKey={lng.toString()}>
                        {t(`common:lng-${lng}`)}
                    </Nav.Link>
                </Link>
            ))}
        </Nav>
    );
};
