import { useState } from "react";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import { Tooltip } from "@mui/material";
import { styled } from "@mui/system";
// import Stack from "@mui/material/Stack";
import { useForm, Controller } from "react-hook-form";
// import moment from "moment";
import {
    DateRangePicker,
    CheckPicker,
    Stack,
    Whisper,
    Toggle,
    Form,
} from "rsuite";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const DisableDate = (apiData) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ].map((item) => ({ label: item, value: item }));

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const { keeperId } = useParams();
    const [selectedDays, setSelectedDays] = useState([]);

    const EditDisbleDate = async (value) => {
        await axios.patch(
            import.meta.env.VITE_KEEPERS_ID + "closed/" + keeperId,
            value.selectedDays,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const CloseStore = async (value) => {
        await axios.patch(
            import.meta.env.VITE_KEEPERS_ID + keeperId,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
            );
    };

    const handleDaySelect = (value) => {
        setSelectedDays(value);
        console.log(value);
    };

    const onSubmit = (data) => {
        EditDisbleDate(data);
        console.log(data);
    };

    console.log(apiData.closedDay);

    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <div className="row">
                <div className="col-6">
                    <h3>Store Close</h3>
                </div>
                <div className="col-6">
                    <Toggle
                        className="mt-3"
                        size="md"
                        checkedChildren="Open"
                        unCheckedChildren="Close"
                        onChange={handleSubmit(CloseStore)}
                    />
                </div>
            </div>
            <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <Label className="pb-3">Permanently close</Label>
                        <Form.HelpText tooltip>
                            วันที่ร้านปิดเป็นประจำ
                        </Form.HelpText>
                        <div className="mt-2">
                            <Stack
                                spacing={10}
                                direction="column"
                                alignItems="flex-start"
                            >
                                <Controller
                                    name="selectedDays"
                                    control={control}
                                    render={({ field }) => (
                                        <CheckPicker
                                            {...field}
                                            data={days}
                                            searchable={false}
                                            style={{ width: 300 }}
                                            placeholder="Select days"
                                            onChange={(value) => {
                                                field.onChange(value);
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </div>
                    </div>
                    <div className="col-6">
                        <Label className="pb-3">Temporary Close</Label>
                        <Form.HelpText tooltip>
                            วันและเวลาปิดร้านชั่วคราว
                        </Form.HelpText>
                        <div className="mt-2">
                            <DateRangePicker format="dd MMMM yyyy HH:mm" />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end ">
                    <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};
const Label = styled(({ children, className }) => {
    return <label className="mb-2">{children}</label>;
})`
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 0.875rem;
    margin-bottom: 4px;

    &.invalid {
        color: red;
    }
`;

export default DisableDate;
