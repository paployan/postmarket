import Link from 'next/link';
import { useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Accordion, Card, Nav } from 'react-bootstrap';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const AccordionCategories = ({ categories, onCollapse, }) => {
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const CustomAccordionToggle = ({ item, eventKey, callback, onClick }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey)
    );

    const handleOnClick = () => {
      const subcategories = item.subcategories.map(i => i.id);
      onClick(currentEventKey !== eventKey, item, subcategories);
    }

    return (
      <Card.Header
        onClick={decoratedOnClick}
        className="p-0"
        >
        <h6 className="font-weight-bold py-1 mb-0" onClick={handleOnClick}>
          {item.name}
          <span className="fa-icon float-right">
            {currentEventKey !== eventKey ? <FaChevronDown /> : <FaChevronUp />}
          </span>
        </h6>
      </Card.Header>
    );
  };

  const handleOnClick = (isCollapsed, category, subcategories) => {
    if (isCollapsed) {
      onCollapse(category.slug, subcategories, category.name);
    }
  };

  const onSubCategorySelect = (e, item, subItem) => {
    e.preventDefault();
    onCollapse(item.slug, [subItem.id], subItem.name);
    setActiveSubcategory(subItem.id);
  }

  return (
    <Accordion>
      {categories.map((item, index) => (
        <Card key={index} className="card-accordion mb-5">
          <CustomAccordionToggle
            item={item}
            eventKey={`accordion-${index}`}
            onClick={handleOnClick}
          />
          <Accordion.Collapse eventKey={`accordion-${index}`}>
            <Card.Body>
              <Nav as="ul" className="list-unstyled d-block">
                {item.subcategories && item.subcategories.map((subItem, subIndex) => (
                  <Nav.Item key={subIndex} as="li" className="py-2">
                    <a href="#"
                      className={`nav-link ${activeSubcategory === subItem.id ? 'active' : ''}`}
                      onClick={(e) => onSubCategorySelect(e, item, subItem)}>
                      {subItem.name}
                    </a>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

const mapStateToProps = state => ({
  categories: state.categories.items,
});

export default connect(mapStateToProps, null)(AccordionCategories);
