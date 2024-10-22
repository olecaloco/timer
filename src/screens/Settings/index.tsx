import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Settings = () => (
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
            <h2>Settings</h2>
        </div>

        <Row className="gx-5">
            <Col xs={12} md={6}>
                <div>
                    <h3>Your Details</h3>
                    <Form>
                        <div className="mt-3">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <FormControl type="name" id="name" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="address">
                                Address Line 1
                            </FormLabel>
                            <FormControl type="address" id="address" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="city">
                                City/Municipality
                            </FormLabel>
                            <FormControl type="city" id="city" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="state">
                                Province/State
                            </FormLabel>
                            <FormControl type="state" id="state" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="country">Country</FormLabel>
                            <FormControl type="country" id="country" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="zip">ZIP / Area Code</FormLabel>
                            <FormControl type="zip" id="zip" />
                        </div>
                    </Form>
                </div>
            </Col>
            <Col xs={12} md={6}>
                <div className="mt-5 mt-md-0 pt-5 pt-md-0">
                    <h3>Client Details</h3>
                    <Form>
                        <div className="mt-3">
                            <FormLabel htmlFor="client_name">Name</FormLabel>
                            <FormControl type="client_name" id="client_name" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="client_address">
                                Address Line 1
                            </FormLabel>
                            <FormControl
                                type="client_address"
                                id="client_address"
                            />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="client_city">
                                City/Municipality
                            </FormLabel>
                            <FormControl type="client_city" id="client_city" />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="client_state">
                                Province/State
                            </FormLabel>
                            <FormControl
                                type="client_state"
                                id="client_state"
                            />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="client_country">
                                Country
                            </FormLabel>
                            <FormControl
                                type="client_country"
                                id="client_country"
                            />
                        </div>

                        <div className="mt-3">
                            <FormLabel htmlFor="client_zip">
                                ZIP / Area Code
                            </FormLabel>
                            <FormControl type="client_zip" id="client_zip" />
                        </div>
                    </Form>
                </div>
            </Col>
        </Row>
    </Container>
);

export default Settings;
