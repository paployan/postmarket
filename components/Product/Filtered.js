import { array } from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import ProductList from './List';
import useTranslation from 'next-translate/useTranslation';

const FilterBar = ({ filters, onChange, setPriceMin, setPriceMax, setSortBy }) => {
  const { t } = useTranslation();
  return (
    <Row className="mx-auto my-5">
      <Col xs={12}>
        <div className="card-shadow-dark p-3">
          {(filters || []).map((item, index) => (
            <div className={`checkbox form-check-inline mx-3 my-4`} key={index}>
              <label>
                <input
                  type="checkbox"
                  name="filters"
                  value={item.id}
                  onChange={(e) => onChange(e.target.value)}
                />
                <i className="helper" />
                {item.name}
              </label>
            </div>
          ))}
          <Row>
            <Col className="px-3">
              <div className="form-group mx-3 mt-0">
                <input
                  id="inputPriceMin"
                  type="number"
                  name="price_min"
                  onChange={(e) => setPriceMin(e.target.value)}
                  required
                />
                <label
                  htmlFor="inputPriceMin"
                  className="control-label">
                  {t('common:min-price')}
                </label>
                <i className="bar" />
              </div>
            </Col>
            <Col className="px-3">
              <div className="form-group mx-3 mt-0">
                <input
                  id="inputPriceMax"
                  type="number"
                  name="price_max"
                  onChange={(e) => setPriceMax(e.target.value)}
                  required
                />
                <label
                  htmlFor="inputPriceMax"
                  className="control-label">
                  {t('common:max-price')}
                </label>
                <i className="bar" />
              </div>
            </Col>
            <Col className="px-3">
              <Form.Label className="ml-3 my-1 mr-2" htmlFor="selectSort">
                {t('common:order-by-text')}
              </Form.Label>
              <Form.Control
                as="select"
                className="my-1 mr-sm-2 w-50"
                id="selectSort"
                custom
                name="sort_by"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>{t('common:choose')}</option>
                <option value="price_asc">{t('common:order-price-asc')}</option>
                <option value="price_desc">{t('common:order-price-desc')}</option>
              </Form.Control>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};

const Filtered = ({ title, items, filters, onFiltersChange, setPriceMin, setPriceMax, setSortBy }) => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="px-3">{title}</h2>
      <FilterBar
        filters={filters}
        onChange={onFiltersChange}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setSortBy={setSortBy}
      />
      {items.length ? <ProductList items={items} /> :
        <Row className="mx-auto my-5">
          <Col xs={12}>
            <p>{t('common:no-data')}</p>
          </Col>
        </Row>}
    </>
  );
};

Filtered.propTypes = {
  items: array.isRequired,
};

export default Filtered;
