import { FormEvent, ReactElement, useState } from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { updateClientDetails } from "../../api";
import { useAuth } from "../../contexts/auth";
import { ClientDetails } from "../../api/models";

export default function ClientForm(): ReactElement {
    const { clientDetails, refetchData } = useAuth();
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);

    const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        if (loading) return;

        setLoading(true);

        const formData = new FormData(form);
        const data: ClientDetails = {
            name: formData.get("name") as string,
            address: formData.get("address") as string,
            city: formData.get("city") as string,
            country: formData.get("country") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
        };

        try {
            await updateClientDetails(data);
            refetchData();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleOnSubmit}>
            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_name">Name</FormLabel>
                <FormControl
                    type="text"
                    name="name"
                    id="client_name"
                    defaultValue={clientDetails?.name}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_address">Address Line 1</FormLabel>
                <FormControl
                    type="text"
                    name="address"
                    id="client_address"
                    defaultValue={clientDetails?.address}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_city">City/Municipality</FormLabel>
                <FormControl
                    type="text"
                    name="city"
                    id="client_city"
                    defaultValue={clientDetails?.city}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_state">Province/State</FormLabel>
                <FormControl
                    type="text"
                    name="state"
                    id="client_state"
                    defaultValue={clientDetails?.state}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_country">Country</FormLabel>
                <FormControl
                    type="text"
                    name="country"
                    id="client_country"
                    defaultValue={clientDetails?.country}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="client_zip">ZIP / Area Code</FormLabel>
                <FormControl
                    type="text"
                    name="zip"
                    id="client_zip"
                    defaultValue={clientDetails?.zip}
                    required
                />
            </FormGroup>

            <Button disabled={loading} type="submit">
                Save
            </Button>
        </Form>
    );
}
