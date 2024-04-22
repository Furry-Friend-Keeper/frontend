import { useState, useEffect } from "react";
import {Button} from "rsuite";
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
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Column, HeaderCell, Cell } = Table;

const DisableDate = ({ apiData, fetchData }) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ].map((item) => ({ label: item, value: item }));

    const { register, handleSubmit, control, setValue } = useForm();

    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );

    const { keeperId } = useParams();
    const [selectedDays, setSelectedDays] = useState([]);
    const [storeStatus, setStoreStatus] = useState(false);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setStoreStatus(apiData?.available);
        setTableData(apiData?.disableAppointment);
        const closeDay = apiData?.closedDay?.split(", ");
        setValue("selectedDays", closeDay);
    }, [apiData]);

    const EditDisableDays = async (value) => {
        const dayOfWeek = moment().format("dddd");
        console.log(dayOfWeek);
        console.log(value);
        if (value.selectedDays.includes(dayOfWeek)) {
            StoreClose(false);
        } else {
            StoreClose(true);
        }
        await axiosAuth.patch(
            import.meta.env.VITE_KEEPERS_ID + "closed/" + keeperId,
            value.selectedDays);
    };

    const StoreClose = async (value) => {
        await axiosAuth
            .patch(
                import.meta.env.VITE_KEEPERS_ID + "available/" + keeperId,{})
            .then(() => {
                setStoreStatus(value);
            });
    };

    const DeleteDateRange = async (value) => {
        await axiosAuth
            .delete(import.meta.env.VITE_SCHEDULE_ID + value.id)
            .then(() => {
                const filterData = tableData.filter(
                    (item) => item.id !== value.id
                );
                setTableData(filterData);
            });
    };

    const EditDateRange = async (data) => {
        if (data.dateRange) {
            const result = {
                startDate: moment(data.dateRange[0]).format("yyyy-MM-DD") || 0,
                endDate: moment(data.dateRange[1]).format("yyyy-MM-DD") || 0,
            };

            console.log(result);
            await axiosAuth
                .post(import.meta.env.VITE_SCHEDULE_ID + keeperId, result)
                .then(() => {
                    // setTableData()
                    fetchData();
                    setValue("dateRange", "");
                });
        }
    };

    const onSubmit = (data) => {
        EditDateRange(data);
        EditDisableDays(data);
        console.log(data);
    };

    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <div className="row">
                <div className="title d-flex justify-content-between align-items-center">
                    <h3>
                        Store{" "}
                        <span>
                            <Toggle
                                className="mt-3"
                                size="lg"
                                checkedChildren="Open"
                                unCheckedChildren="Close"
                                checked={storeStatus}
                                onChange={(value) => StoreClose(value)}
                            />
                        </span>
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                        <Label className="pb-3">Select Close Days</Label>
                        <Form.HelpText tooltip>
                            วันที่ร้านปิดเป็นประจำ
                        </Form.HelpText>
                        <div className="row">
                            <div className="col-6">
                                <Stack
                                    spacing={10}
                                    direction="column"
                                    alignItems="flex-start"
                                    data
                                >
                                    <Controller
                                        name="selectedDays"
                                        control={control}
                                        render={({ field }) => (
                                            <CheckPicker
                                                {...field}
                                                data={days}
                                                // value={disableDays}
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
                        <Label className="pb-3 mt-3">
                            Select Closed Period
                        </Label>
                        <Form.HelpText tooltip>
                            วันและเวลาปิดร้านชั่วคราว
                        </Form.HelpText>
                        <div>
                            <Controller
                                name="dateRange"
                                control={control}
                                render={({ field }) => (
                                    <DateRangePicker
                                        {...field}
                                        format="dd MMMM yyyy"
                                        appearance="default"
                                        block
                                        showHeader={false}
                                        style={{ width: 300 }}
                                        onChange={(value) => {
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                            <div className="blue-btn mt-4">
                                <Button type="submit" appearance="primary">
                                Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-6">
                    <div className="mt-2">
                        <Label className="pb-3">Closed Period</Label>
                        <Table
                            height={200}
                            data={tableData}
                            onRowClick={(rowData) => {
                                console.log(rowData);
                            }}
                        >
                            <Column width={140}>
                                <HeaderCell>Start Date</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <span>
                                            {moment
                                                .unix(rowData.startDate)
                                                .format("DD MMMM YYYY")}
                                        </span>
                                    )}
                                </Cell>
                            </Column>

                            <Column width={140}>
                                <HeaderCell>End Date</HeaderCell>
                                <Cell>
                                    {(rowData) => (
                                        <span>
                                            {moment
                                                .unix(rowData.endDate)
                                                .format("DD MMMM YYYY")}
                                        </span>
                                    )}
                                </Cell>
                            </Column>
                            <Column width={100} fixed="right">
                                <HeaderCell>...</HeaderCell>
                                <Cell style={{ padding: "6px" }}>
                                    {(rowData) => (
                                        <Button
                                            appearance="link"
                                            onClick={() =>
                                                DeleteDateRange(rowData)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </Cell>
                            </Column>
                        </Table>
                    </div>
                </div>
            </div>
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
