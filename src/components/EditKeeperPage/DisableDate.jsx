import { useState, useEffect } from "react";
import { Button } from "rsuite";
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
    IconButton
} from "rsuite";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const { Column, HeaderCell, Cell } = Table;

const rowKey = "id";



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
    const { control: control2, setValue: setValue2,
        handleSubmit: handleSubmit2 } = useForm();

    console.log(apiData)
    const { loading, userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );

    const { keeperId } = useParams();
    const [selectedDays, setSelectedDays] = useState([]);
    const [storeStatus, setStoreStatus] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const ExpandCell = ({
        rowData,
        dataKey,
        expandedRowKeys,
        onChange,
        ...props
    }) => (
        <Cell {...props} style={{ padding: 5 }}>
            <IconButton
                appearance="subtle"
                onClick={() => {
                    onChange(rowData);
                }}
                icon={
                    expandedRowKeys.some((key) => key === rowData[rowKey]) ? (
                        <CollaspedOutlineIcon />
                    ) : (
                        <ExpandOutlineIcon />
                    )
                }
            />
        </Cell>
    );
    
    const renderRowExpanded = (rowData) => {
        return (
            <div className="request-size text-break">
                <p>Message: {rowData.message}</p>
                {/* <p>Message: aspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsaspdkaspdkapsdkalsas</p> */}
            </div>
        );
    };
    
    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];
    
        expandedRowKeys.forEach((key) => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });
    
        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }
    
        setExpandedRowKeys(nextExpandedRowKeys);
    };

    useEffect(() => {
        console.log(apiData)
        setStoreStatus(apiData?.available);
        setTableData(apiData?.disableAppointment);
        const closeDay = apiData?.closedDay?.split(", ");
        setValue2("selectedDays", closeDay);
    }, [apiData, setValue2]);

    const EditDisableDays = async (value) => {
        console.log(value)
        const dayOfWeek = moment().format("dddd");
        console.log(dayOfWeek);
        if (value.selectedDays?.includes(dayOfWeek)) {
            StoreClose(false);
        } else {
            StoreClose(true);
        }
        await axiosAuth.patch(
            import.meta.env.VITE_KEEPERS_ID + "closed/" + keeperId,
            value.selectedDays);
    };

    const StoreClose = async (value) => {
        // if(value === ture) {
            await axiosAuth
                .patch(
                    import.meta.env.VITE_KEEPERS_ID + "available/" + keeperId, {})
                .then(() => {
                    setStoreStatus(value);
                });
        // }
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
                message: data.message
            };
            console.log(result);
            await axiosAuth
                .post(import.meta.env.VITE_SCHEDULE_ID + keeperId, result)
                .then(() => {
                    fetchData();
                    setValue("dateRange", "");
                    setValue("message", "");
                });
        }
    };

    const onSubmit = (data) => {
        console.log(data)
        EditDisableDays(data);
        EditDateRange(data);
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
                <Form className="mt-3" onSubmit={handleSubmit2(EditDisableDays)}>
                    <Label className="pb-3">Select closed days</Label>
                    <Form.HelpText tooltip>
                        วันที่ร้านปิดเป็นประจำ
                    </Form.HelpText>
                    <Stack
                        spacing={10}
                        direction="column"
                        alignItems="flex-start"
                        data
                    >
                        <Controller
                            name="selectedDays"
                            control={control2}
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
                    <div className="blue-btn mt-4">
                        <Button type="submit" appearance="primary">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="border mt-3 mb-3" />
            <div className="row">
                <div className="col-6">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Label>
                            Select closed period
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
                            <div className="mt-3">
                                <Label>
                                    Message
                                </Label>
                                <Form.HelpText tooltip>
                                    รายละเอียดของวันและเวลาปิดร้านชั่วคราว
                                </Form.HelpText>
                                <div>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        name="message"
                                        rows={5}
                                        maxLength={200}
                                        {...register("message", {
                                            required: "Please enter message before OK",
                                            maxLength: {
                                                value: 200,
                                                message:
                                                    "Message must not more than 200 characters",
                                            },
                                        })}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="blue-btn mt-4">
                                <Button type="submit" appearance="primary">
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="col-6">
                    <Label>Closed period</Label>
                    <Form.HelpText tooltip>
                        รายการวันและเวลาปิดร้านชั่วคราว
                    </Form.HelpText>
                    <Table
                        height={200}
                        data={tableData}
                        className="mt-3"
                        shouldUpdateScroll={false}
                        rowKey={rowKey}
                        expandedRowKeys={expandedRowKeys}
                        loading={loading}
                        renderRowExpanded={renderRowExpanded}
                        rowExpandedHeight={120}
                        onRowClick={(rowData) => {
                            console.log(rowData);
                        }}
                    >
                        <Column width={70} align="center">
                            <HeaderCell>#</HeaderCell>
                            <ExpandCell
                                dataKey="id"
                                expandedRowKeys={expandedRowKeys}
                                onChange={handleExpanded}
                            />
                        </Column>
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
