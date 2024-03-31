import { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { Box } from "@mui/material";
import { Table } from "rsuite";

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

const { Column, HeaderCell, Cell } = Table;

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

    const { register, handleSubmit, control } = useForm();

    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );

    const { keeperId } = useParams();
    const [selectedDays, setSelectedDays] = useState([]);
    const [isEditDate, setIsEditDate] = useState(false);

    const EditDisbleDate = async (value) => {
        await axios.patch(
            import.meta.env.VITE_KEEPERS_ID + "closed/" + keeperId,
            value.selectedDays,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const StoreClose = async () => {
        await axios.patch(
            import.meta.env.VITE_KEEPERS_ID + "available/" + keeperId,
            {},
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const StoreCloseDateRange = async (value) => {
        await axios.patch(
            import.meta.env.VITE_SCHEDULE_ID  + keeperId + "/" + value.id,
            {},
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const onSubmitRange = async (data) => {
        console.log(data);

        const result = {
            startDate: moment(data.dateRange[0]).format(),
            endDate: moment(data.dateRange[1]).format(),
            id: "1",
        };

        console.log(result);
        await axios
            .post(import.meta.env.VITE_SCHEDULE_ID + keeperId, result, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then((res) => {
                handleClose();
                setValue("dateRange", "");
                setValue("message", "");
                setValue("petName", "");
                setValue("phone", "");
                setValue("tags", "");
                setDateRange([null, null]);
            });

        // SignUpForm(data);
    };

    const handleDaySelect = (value) => {
        setSelectedDays(value);
        console.log(value);
    };

    const onSubmit = (data) => {
        EditDisbleDate(data);
        console.log(data);
    };
    // console.log(disableRange);

    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <div className="row">
                <div className="title d-flex justify-content-between align-items-center col-6">
                    <h3>
                        Store{" "}
                        <span>
                            <Toggle
                                className="mt-3"
                                size="lg"
                                checkedChildren="Open"
                                unCheckedChildren="Close"
                                onChange={() => StoreClose()}
                            />
                        </span>
                    </h3>
                </div>
            </div>

            <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-6">
                                <Label className="pb-3">Close Days</Label>
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
                                                    style={{
                                                        width: 300,
                                                    }}
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
                                <Label className="pb-3">
                                    Temporary Close Days
                                </Label>
                                <Form.HelpText tooltip>
                                    วันและเวลาปิดร้านชั่วคราว
                                </Form.HelpText>
                                <div className="mt-2">
                                    <DateRangePicker
                                        format="dd MMMM yyyy HH:mm"
                                        appearance="default"
                                        block
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div className="mt-2">
                                    <Table
                                        height={200}
                                        // data={disableRange}
                                        onRowClick={(rowData) => {
                                            console.log(rowData);
                                        }}
                                    >
                                        <Column width={60} align="center" fixed>
                                            <HeaderCell>Id</HeaderCell>
                                            <Cell dataKey="id" />
                                        </Column>
                                        <Column width={160}>
                                            <HeaderCell>Start Date</HeaderCell>
                                            <Cell dataKey="firstName" />
                                        </Column>

                                        <Column width={160}>
                                            <HeaderCell>End Date</HeaderCell>
                                            <Cell dataKey="lastName" />
                                        </Column>
                                        <Column width={80} fixed="right">
                                            <HeaderCell>...</HeaderCell>
                                            <Cell style={{ padding: "6px" }}>
                                                {(rowData) => (
                                                    <Button
                                                        appearance="link"
                                                        onClick={() => StoreCloseDateRange(rowData)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                            </Cell>
                                        </Column>
                                    </Table>
                                </div>
                            </div>
                            {/* <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                        }}
                                        onClick={() => setIsEditName(false)}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Submit
                                    </Button>
                                </Box> */}
                        </div>
                    </div>
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
