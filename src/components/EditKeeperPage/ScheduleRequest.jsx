import React, { useState, useEffect, useRef } from "react";
import { Table, Button, IconButton, Radio, RadioGroup, Form, Modal } from "rsuite";
import Box from "@mui/joy/Box";
import { useForm, Controller } from "react-hook-form";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import axiosAuth from "../Global/AxiosService";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
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
            <p>
                Start date:{" "}
                {moment.unix(rowData.startDate).format("DD MMMM YYYY HH:mm A")}
            </p>
            <p>
                End date:{" "}
                {moment.unix(rowData.endDate).format("DD MMMM YYYY HH:mm A")}
            </p>
            <p>Owner name: {rowData.petOwner}</p>
            <p>Owner phone: {rowData.ownerPhone}</p>
            <p>Pet name: {rowData.petName}</p>
            <p>Category: {rowData.category}</p>
            <p>Message: {rowData.message}</p>
        </div>
    );
};

function ScheduleRequest(props) {
    const { keeperId } = props;
    const [open, setOpen] = useState(false);
    const [backdrop, setBackdrop] = useState("static");
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const [requests, setRequests] = useState([]);
    const [statusRequests, setStatusRequests] = useState([]);
    const { userInfo, error, success, accessToken } = useSelector(
        (state) => state.auth
    );
    const [radioChange, setRadioChange] = useState("Pending");
    const [loading, setLoading] = useState(false);
    const [AppointmentId, setAppointmentId] = useState(null)
    const { register, handleSubmit, control, setValue } = useForm();

    const handleOpen = (id) => {
        setAppointmentId(id)
        setOpen(true)
    };
    const handleClose = () => setOpen(false);


    const fetchRequests = async () => {
        await axiosAuth
            .get(import.meta.env.VITE_KEEPER_APPOINTMENT_ID + keeperId)
            .then((res) => {
                const response = res.data
                // const responseFilter = response.map((item, index) => {
                //     item.id = index + 1;
                //     return item;
                // })   
                setRequests(response);
            });
    };

    const PendingCompleted = async (value) => {
        await axiosAuth.patch(
            import.meta.env.VITE_APPOINTMENT_CONFIRM_ID + value.id, "").then(() => {
                fetchRequests()
            })
    };

    const CancelCompleted = async (value) => {
        await axiosAuth.patch(
            import.meta.env.VITE_APPOINTMENT_CANCEL_ID + AppointmentId.id, value.message).then(() => {
                fetchRequests()
                handleClose()
                setValue("message", "")
            });
    };

    const InCareCompleted = async (value) => {
        await axiosAuth.patch(
            import.meta.env.VITE_APPOINTMENT_IN_CARE_ID + value.id, "").then(() => {
                fetchRequests()
            });
    };

    const KeeperCompleted = async (value) => {
        await axiosAuth.patch(
            import.meta.env.VITE_APPOINTMENT_KEEPER_COMPLETED_ID + value.id, "").then(() => {
                fetchRequests()
            });
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
                <Radio value="Pending">Incoming request</Radio>
                <Radio value="Scheduled">Scheduled</Radio>
                <Radio value="In Care">In care</Radio>
                <Radio value="Cancelled">Cancelled</Radio>
            </RadioGroup>
            <Table
                className="mt-3"
                shouldUpdateScroll={false}
                height={400}
                data={statusRequests}
                rowKey={rowKey}
                expandedRowKeys={expandedRowKeys}
                loading={loading}
                renderRowExpanded={renderRowExpanded}
                rowExpandedHeight={220}
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
                    <HeaderCell>Start date</HeaderCell>
                    <Cell>
                        {(rowData) => (
                            <span>
                                {moment
                                    .unix(rowData.startDate)
                                    .format("DD MMMM YYYY HH:mm A")}
                            </span>
                        )}
                    </Cell>
                </Column>
                <Column width={150}>
                    <HeaderCell>End date</HeaderCell>
                    <Cell>
                        {(rowData) => (
                            <span>
                                {moment
                                    .unix(rowData.endDate)
                                    .format("DD MMMM YYYY HH:mm A")}
                            </span>
                        )}
                    </Cell>
                </Column>

                <Column width={120}>
                    <HeaderCell>Owner name</HeaderCell>
                    <Cell dataKey="petOwner" />
                </Column>
                <Column width={150}>
                    <HeaderCell>Owner phone</HeaderCell>
                    <Cell dataKey="ownerPhone" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Pet name</HeaderCell>
                    <Cell dataKey="petName" />
                </Column>

                <Column width={200}>
                    <HeaderCell>Message</HeaderCell>
                    <Cell dataKey="message" />
                </Column>
                {radioChange === "Pending" && (
                    <Column width={80} fixed="right">
                        <HeaderCell>...</HeaderCell>
                        <Cell style={{ padding: "6px" }}>
                            {(rowData) => (
                                <Button
                                    appearance="link"
                                    // onClick={() => CancelCompleted(rowData)}
                                    onClick={() => handleOpen(rowData)}
                                >
                                    Cancel
                                </Button>
                            )}
                        </Cell>
                    </Column>
                )}
                {radioChange !== "Cancelled" && 
                <Column width={90} fixed="right">
                    <HeaderCell>...</HeaderCell>
                    <Cell style={{ padding: "6px" }}>
                        {(rowData) => (
                            <div>
                                {radioChange === "Pending" ? (
                                    <Button
                                        appearance="link"
                                        onClick={() => {
                                            PendingCompleted(rowData);
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                ) : radioChange === "Scheduled" ? (
                                    <Button
                                        appearance="link"
                                        onClick={() => {
                                            InCareCompleted(rowData);
                                        }}
                                    >
                                        In care
                                    </Button>
                                ) : (
                                    <Button
                                        appearance="link"
                                        onClick={() => {
                                            KeeperCompleted(rowData);
                                        }}
                                    >
                                        Completed
                                    </Button>
                                )}
                            </div>
                        )}
                    </Cell>
                </Column>
                }
            </Table>
            <Box
                sx={{
                    display: "flex",
                    gap: 1.5,
                    "& > button": { flex: 1 },
                }}
            >
                <Modal
                    className="position-absolute top-50 start-50 translate-middle mt-0"
                    backdrop={backdrop}
                    keyboard={false}
                    open={open}
                    onClose={handleClose}
                >
                    <Form onSubmit={handleSubmit(CancelCompleted)}>
                        <Modal.Header>
                            <Modal.Title className="overflow-visible">Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <Placeholder.Paragraph /> */}
                            {/* <input
                                                type="hidden"
                                                {...register("id")}
                                            /> */}
                            <div className="modal-body">
                                <div className="mt-3">
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
                                    {/* {errors.message && <small className="error-message">{errors.message.message}</small>} */}
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                type="submit"
                                appearance="primary"
                            >
                                Ok
                            </Button>
                            <Button
                                onClick={handleClose}
                                appearance="subtle"
                                className="ms-2"
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Box>
        </div>
    );
}

export default ScheduleRequest;
