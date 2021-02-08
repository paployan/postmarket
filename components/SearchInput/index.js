/* eslint-disable jsx-a11y/label-has-associated-control */
import { useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';

export default function SearchInput({ onSubmit }) {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: 'onChange',
    });
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-0">
                <input
                    id="inputSearchTerm"
                    type="text"
                    name="searchTerm"
                    ref={register({required: true })}
                    required
                />
                <label
                    htmlFor="inputSearchTerm"
                    className="control-label text-dark">
                    {t('menu:search')}
                </label>
                <button type="submit" className="btn-search">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.9309 21.3468L15.4646 13.8804C16.6232 12.3826 17.2499 10.5512 17.2499 8.62496C17.2499 6.31922 16.3501 4.15723 14.7228 2.52711C13.0956 0.896996 10.9278 0 8.62496 0C6.3221 0 4.15436 0.899871 2.52711 2.52711C0.896996 4.15436 0 6.31922 0 8.62496C0 10.9278 0.899871 13.0956 2.52711 14.7228C4.15436 16.3529 6.31922 17.2499 8.62496 17.2499C10.5512 17.2499 12.3797 16.6232 13.8776 15.4674L21.3439 22.9309C21.3658 22.9528 21.3918 22.9702 21.4204 22.982C21.449 22.9939 21.4797 23 21.5107 23C21.5416 23 21.5723 22.9939 21.6009 22.982C21.6295 22.9702 21.6555 22.9528 21.6774 22.9309L22.9309 21.6803C22.9528 21.6584 22.9702 21.6324 22.982 21.6038C22.9939 21.5752 23 21.5445 23 21.5135C23 21.4826 22.9939 21.4519 22.982 21.4233C22.9702 21.3947 22.9528 21.3687 22.9309 21.3468ZM13.1789 13.1789C11.9599 14.3951 10.3442 15.0649 8.62496 15.0649C6.90572 15.0649 5.28998 14.3951 4.07098 13.1789C2.85486 11.9599 2.18499 10.3442 2.18499 8.62496C2.18499 6.90572 2.85486 5.2871 4.07098 4.07098C5.28998 2.85486 6.90572 2.18499 8.62496 2.18499C10.3442 2.18499 11.9628 2.85199 13.1789 4.07098C14.3951 5.28998 15.0649 6.90572 15.0649 8.62496C15.0649 10.3442 14.3951 11.9628 13.1789 13.1789Z" fill="#36424C"/>
                    </svg>
                </button>
                <i className="bar" />
            </div>
        </form>
    );
};
