import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { convertToHumanTime, formatToHTMLDateValue } from "../../../helpers";

interface Props {
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    date: Date;
    description: string;
    isLoading: boolean;
    hasStarted: boolean;
    elapsedSeconds: number;
}

const FormTimer: React.FC<Props> = ({
    onSubmit,
    onChange,
    onDateChange,
    onBlur,
    date,
    description,
    isLoading,
    hasStarted,
    elapsedSeconds,
}) => {
    const { seconds, minutes, hours } = convertToHumanTime(elapsedSeconds);
    const max = formatToHTMLDateValue(new Date(), true);
    const value = formatToHTMLDateValue(date, true);

    return (
        <Form className="timer-form" onSubmit={onSubmit}>
            <Row className="align-items-center">
                <Col>
                    <InputGroup>
                        <FloatingLabel
                            controlId="floatingDescription"
                            label="Description"
                        >
                            <Form.Control
                                name="description"
                                placeholder="Description"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={description}
                                required
                            />
                        </FloatingLabel>
                        <Form.Control
                            name="date"
                            type="date"
                            max={max}
                            onChange={onDateChange}
                            value={value}
                            style={{ flexGrow: 0, width: 150 }}
                        />
                        <InputGroup.Text
                            className="justify-content-center"
                            style={{ width: "150px" }}
                        >
                            <span style={{ width: "20px" }}>{hours}</span>:
                            <span style={{ width: "20px" }}>{minutes}</span>:
                            <span style={{ width: "20px" }}>{seconds}</span>
                        </InputGroup.Text>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Button
                        className="d-block"
                        variant={hasStarted ? "danger" : "primary"}
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        style={{ width: "150px" }}
                    >
                        {hasStarted ? "Stop" : "Start"}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormTimer;
