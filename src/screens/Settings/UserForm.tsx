import { FormEvent, ReactElement, useState } from "react";
import {
    Button,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
} from "react-bootstrap";
import { updateUserDetails } from "../../api";
import { useAuth } from "../../contexts/auth";
import { UserDetails } from "../../api/models";

export default function UserForm(): ReactElement {
    const { userDetails, refetchData } = useAuth();
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

        const data: UserDetails = {
            name: formData.get("name") as string,
            address: formData.get("address") as string,
            city: formData.get("city") as string,
            country: formData.get("country") as string,
            state: formData.get("state") as string,
            zip: formData.get("zip") as string,
        };

        try {
            await updateUserDetails(data);
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
                <FormLabel htmlFor="user_name">Name</FormLabel>
                <FormControl
                    type="text"
                    name="name"
                    id="user_name"
                    defaultValue={userDetails?.name}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="user_address">Address Line 1</FormLabel>
                <FormControl
                    type="text"
                    name="address"
                    id="user_address"
                    defaultValue={userDetails?.address}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="user_city">City/Municipality</FormLabel>
                <FormControl
                    type="text"
                    name="city"
                    id="user_city"
                    defaultValue={userDetails?.city}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="user_state">Province/State</FormLabel>
                <FormControl
                    type="text"
                    name="state"
                    id="user_state"
                    defaultValue={userDetails?.state}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="user_country">Country</FormLabel>
                <FormControl
                    type="text"
                    name="country"
                    id="user_country"
                    defaultValue={userDetails?.country}
                    required
                />
            </FormGroup>

            <FormGroup className="mb-3">
                <FormLabel htmlFor="user_zip">ZIP / Area Code</FormLabel>
                <FormControl
                    type="text"
                    name="zip"
                    id="user_zip"
                    defaultValue={userDetails?.zip}
                    required
                />
            </FormGroup>

            <Button disabled={loading} type="submit">
                Save
            </Button>
        </Form>
    );
}
