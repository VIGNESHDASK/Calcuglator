import React, { useState, useEffect } from 'react';
import { Dropdown, Form, Button, Col, Row } from 'react-bootstrap';

const ConditionalComponent = ({ sections, sectionOptions, renderComponent }) => {
  const [selectedSection, setSelectedSection] = useState('');

  // Fetch initial components data on mount
  useEffect(() => {
    // Assuming 'sections' and 'sectionOptions' are accessible
    if (sections.length > 0 && sectionOptions.length > 0) {
      const defaultSection = sections[0];
      setSelectedSection(defaultSection);
    }
  }, [sections, sectionOptions]);

  const handleSectionChange = (event) => {
    console.log("event.target.value",event);
    setSelectedSection(event.target.value);
  };

  // Dynamically render based on selected section
  const renderedComponent = React.useMemo(() => {
    if (selectedSection && renderComponent) {
      return renderComponent(sectionOptions[selectedSection]);
    }
    return null;
  }, [selectedSection, renderComponent, sectionOptions]);

  return (
    <div>
      <Row>
        <Col xs={6}>
          <Dropdown onSelect={handleSectionChange}>
            <Dropdown.Toggle variant="success">{selectedSection || 'Select Section'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {sections.map((section) => (
                <Dropdown.Item key={section} value={section}>{section}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={6}>
          {renderedComponent && (
            <Form>
              {/* Placeholder form fields based on the selected section's options */}
              <Form.Group className="mb-3">
                <Form.Label>Field 1 (based on {selectedSection}):</Form.Label>
                <Form.Control type="text" placeholder="Enter value" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Field 2 (based on {selectedSection}):</Form.Label>
                <Form.Control type="number" placeholder="Enter value" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ConditionalComponent;
