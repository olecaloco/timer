import Container from "react-bootstrap/Container";
import UserForm from "./UserForm";
import ClientForm from "./ClientForm";
import { Card } from "react-bootstrap";

const Settings = () => (
    <Container fluid>
        <div className="d-flex align-items-center justify-content-between mt-2 mb-3">
            <h2>Settings</h2>
        </div>

        <Card className="w-75">
            <Card.Header>Your Details</Card.Header>
            <Card.Body>
                <UserForm />
            </Card.Body>
        </Card>

        <div className="my-5" />

        <Card className="w-75 mb-3">
            <Card.Header>Client Details</Card.Header>
            <Card.Body>
                <ClientForm />
            </Card.Body>
        </Card>
    </Container>
);

export default Settings;
