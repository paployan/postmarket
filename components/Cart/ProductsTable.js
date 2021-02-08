import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Image,
} from 'react-bootstrap';
import useTranslation from 'next-translate/useTranslation';
import { updateItemQuantity, removeFromCart } from '../../store/actions/cart';
import AppTable from '../Table';
import QuantityInput from '../Addon/QuantityInput';

const AttributeList = ({ data }) => Object.entries(data).map(([key, value]) => {
  if (key === 'quantity') {
    return;
  }
  return (
    <li key={key}>{key}: {key === 'color' ?
      <div className="d-inline-block" style={{ width: '1rem', height: '1rem', backgroundColor: value, border: '1px solid #F5F5F5' }} /> : value}
    </li>
  );
});

const ProductsTable = ({ items, updateItemQuantity, removeFromCart }) => {
  const { t } = useTranslation();
  const headerColumns = [
    t('common:code'),
    t('common:product'),
    '',
    t('common:price'),
    t('common:quantity'),
    t('common:product-description'),
    t('common:total'),
    t('common:remove'),
  ];
  const total = items.reduce((prev, current) =>
    prev + (current.unite_price*current.count), 0);

  return (
    <>
      <AppTable headers={headerColumns}>
        {items.map((item, index) => (
          <tr key={index.toString()}>
            <td>
              {item.product_code}
            </td>
            <td>
              <Link href={`/product/${item.slug}`}>
                  <Image
                    className="card-shadow-light"
                    src={item.thumbnail}
                  />
              </Link>
            </td>
            <td>
              <strong>{item.name}</strong>
            </td>
            <td>{item.unite_price}֏</td>
            <td>
              <QuantityInput
                value={item.count}
                onQuantityChange={(i) => updateItemQuantity(index, i)}
              />
            </td>
            <td>
              <ul className="list-unstyled">
                <AttributeList
                  data={item.attributes}
                />
              </ul>
            </td>
            <td>{item.unite_price * item.count}֏</td>
            <td align="right">
              <a href="#" onClick={() => removeFromCart(index)} className="cursor-pointer">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.7987 10.5891L20.6134 2.78038C20.8768 2.47301 21.0144 2.07763 20.9988 1.67326C20.9832 1.26888 20.8154 0.88529 20.529 0.59914C20.2427 0.31299 19.8588 0.145356 19.4541 0.129737C19.0494 0.114117 18.6537 0.251663 18.3461 0.514888L10.5314 8.24328L2.66849 0.38635C2.36088 0.123124 1.9652 -0.014421 1.56051 0.00119828C1.15583 0.0168176 0.771943 0.184451 0.485573 0.470601C0.199204 0.756752 0.0314419 1.14034 0.0158107 1.54472C0.000179428 1.9491 0.13783 2.34447 0.401257 2.65184L8.24812 10.5891L0.562054 18.1729C0.393729 18.3169 0.25702 18.4942 0.160505 18.6935C0.0639894 18.8929 0.00975177 19.11 0.00119822 19.3313C-0.00735533 19.5525 0.029959 19.7732 0.110799 19.9794C0.191638 20.1856 0.314259 20.3728 0.470962 20.5294C0.627666 20.686 0.81507 20.8085 1.02141 20.8893C1.22775 20.9701 1.44858 21.0073 1.67003 20.9988C1.89147 20.9903 2.10876 20.9361 2.30825 20.8396C2.50775 20.7432 2.68513 20.6066 2.82928 20.4384L10.4993 12.7743L18.121 20.3902C18.4286 20.6534 18.8243 20.7909 19.229 20.7753C19.6337 20.7597 20.0176 20.5921 20.3039 20.3059C20.5903 20.0198 20.7581 19.6362 20.7737 19.2318C20.7893 18.8274 20.6517 18.4321 20.3882 18.1247L12.7987 10.5891Z" fill="#CF1B1B"/>
                </svg>
              </a>
            </td>
          </tr>
        ))}
      </AppTable>
      <div className="float-right mb-5">
        <h4 className="text-primary mr-5 font-weight-bold">
          {t('common:subject-to-payment')} <span className="ml-4">{total}֏</span>
        </h4>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateItemQuantity: bindActionCreators(updateItemQuantity, dispatch),
  removeFromCart: bindActionCreators(removeFromCart, dispatch),
});

export default connect(null, mapDispatchToProps)(ProductsTable);
