import React, { useState, useEffect } from "react";
import { Table, Button, IconButton, Radio, RadioGroup, Form } from "rsuite";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "react-hook-form";

const { Column, HeaderCell, Cell } = Table;


const rowKey = "id";

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
        <div className="request-size">
            <p>Start Date: {moment.unix(rowData.startDate).format("DD MMMM YYYY HH:mm")}</p>
            <p>End Date: {moment.unix(rowData.endDate).format("DD MMMM YYYY HH:mm" )}</p>
            <p>Owner Phone: {rowData.ownerPhone}</p>
            <p>Pet Name: {rowData.petName}</p>
            <p>Category: {rowData.category}</p>
            <p>Message: {rowData.message}</p>
        </div>
    );
};

function ScheduleRequest(props) {
    const { keeperId } = props;
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [requests, setRequests] = useState([]);
    const [statusRequests, setStatusRequests] = useState([]);
    const { userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const [radioChange, setRadioChange] = useState("Pending");
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
    } = useForm();

    const fetchRequests = async () => {
        await axios
            .get(import.meta.env.VITE_KEEPER_APPOINTMENT_ID + keeperId, {
                headers: { Authorization: "Bearer " + accessToken },
            })
            .then((res) => {
                const response = res.data
                const responseFilter = response.map((item, index) => {
                    item.id = index + 1;
                    return item;
                })
                setRequests(responseFilter);
            });
    };

    const PendingCompleted = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_CONFIRM_ID + 2, 2,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const CancelCompleted = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_CANCEL_ID + id,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    const InCareCompleted = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_IN_CARE_ID + id,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };
    
    const KeeperCompleted = async (value) => {
        await axios.patch(
            import.meta.env.VITE_APPOINTMENT_KEEPER_COMPLETED_ID + id,
            {
                headers: { Authorization: "Bearer " + accessToken },
            }
        );
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        setLoading(true);
        const filter = requests.filter((item) => item.status === radioChange);
        setStatusRequests(filter);
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }, [requests, radioChange]);

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

    return (
        <div className="bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4">
            <h3>Requests</h3>

            <RadioGroup
                className="mt-3"
                name="radio-group-inline-picker"
                inline
                appearance="picker"
                value={radioChange}
                onChange={(value) => setRadioChange(value)}
            >
                <Radio value="Pending">Incoming Request</Radio>
                <Radio value="In Care">In Care</Radio>
                <Radio value="Keeper Completed">Successful Care</Radio>
            </RadioGroup>
            <Table
                className="mt-3"
                shouldUpdateScroll={false}
                height={400}
                data={statusRequests}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                // onRowClick={(data) => {
                //     console.log(data);
                // }}
                loading={loading}
                renderRowExpanded={renderRowExpanded}
                rowExpandedHeight={200}
            >
                <Column width={70} align="center">
                    <HeaderCell>#</HeaderCell>
                    <ExpandCell
                        dataKey="id"
                        expandedRowKeys={expandedRowKeys}
                        onChange={handleExpanded}
                    />
                </Column>
                <Column width={150}>
                    <HeaderCell>Start Date</HeaderCell>
                    <Cell>
                        {(rowData) => (
                            <span>
                                {moment.unix(rowData.startDate).format("DD MMMM YYYY HH:mm")}
                            </span>
                        )}
                    </Cell>
                </Column>
                <Column width={150}>
                    <HeaderCell>End Date</HeaderCell>
                    <Cell>
                        {(rowData) => (
                            <span>
                                {moment.unix(rowData.endDate).format("DD MMMM YYYY HH:mm")}
                            </span>
                        )}
                    </Cell>
                </Column>

                <Column width={150}>
                    <HeaderCell>Owner Phone</HeaderCell>
                    <Cell dataKey="ownerPhone" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Pet Name</HeaderCell>
                    <Cell dataKey="petName" />
                </Column>

                <Column width={200}>
                    <HeaderCell>Message</HeaderCell>
                    <Cell dataKey="message" />
                </Column>
                {}
                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>

                    <Cell style={{ padding: "6px" }}>
                        {(rowData) => (
                            <Button
                                appearance="link"
                                onClick={() => alert(`id:${rowData.id}`)}
                            >
                                Cancel
                            </Button>
                        )}
                    </Cell>
                </Column>
                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: "6px" }}>
                        {(rowData) => (
                            <Button
                                appearance="link"
                                onClick={() => alert(`id:${rowData.id}`)}
                            >
                                Confirm
                            </Button>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>
    );
}

export default ScheduleRequest;
