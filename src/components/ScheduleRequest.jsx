import React, { useState } from 'react'
import { Table, Button, IconButton } from 'rsuite';
import CollaspedOutlineIcon from '@rsuite/icons/CollaspedOutline';
import ExpandOutlineIcon from '@rsuite/icons/ExpandOutline';
const { Column, HeaderCell, Cell } = Table;

const data = [
  {
      "id": 1,
      "startDate": "2024-03-20",
      "endDate": "2024-03-25",
      "ownerPhone": "+1234567890",
      "petName": "Buddy",
      "message": "Annual vaccination"
  },
  {
      "id": 2,
      "startDate": "2024-04-01",
      "endDate": "2024-04-02",
      "ownerPhone": "+0987654321",
      "petName": "Mittens",
      "message": "Regular check-up"
  },
  {
      "id": 3,
      "startDate": "2024-04-15",
      "endDate": "2024-04-20",
      "ownerPhone": "+1122334455",
      "petName": "Rex",
      "message": "Dental cleaning"
  },
  {
      "id": 4,
      "startDate": "2024-05-05",
      "endDate": "2024-05-06",
      "ownerPhone": "+1223344556",
      "petName": "Fluffy",
      "message": "Grooming session"
  },
  {
      "id": 5,
      "startDate": "2024-05-18",
      "endDate": "2024-05-19",
      "ownerPhone": "+1334455667",
      "petName": "Shadow",
      "message": "Behavioral training"
  },
  {
      "id": 6,
      "startDate": "2024-06-01",
      "endDate": "2024-06-03",
      "ownerPhone": "+1445566778",
      "petName": "Luna",
      "message": "Spaying surgery"
  },
  {
      "id": 7,
      "startDate": "2024-06-15",
      "endDate": "2024-06-16",
      "ownerPhone": "+1556677889",
      "petName": "Max",
      "message": "Follow-up examination"
  },
  {
      "id": 8,
      "startDate": "2024-07-01",
      "endDate": "2024-07-02",
      "ownerPhone": "+1667788990",
      "petName": "Bella",
      "message": "Vaccine booster"
  },
  {
      "id": 9,
      "startDate": "2024-07-20",
      "endDate": "2024-07-22",
      "ownerPhone": "+1778899001",
      "petName": "Charlie",
      "message": "Orthopedic surgery"
  },
  {
      "id": 10,
      "startDate": "2024-08-05",
      "endDate": "2024-08-10",
      "ownerPhone": "+1889900112",
      "petName": "Daisy",
      "message": "Intensive care and monitoring"
  }
]

const rowKey = 'id';

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some(key => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);

const renderRowExpanded = rowData => {
  return (
    <div>
      <p>Message: {rowData.message}</p>
    </div>
  );
};


function ScheduleRequest() {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach(key => {
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
    <div className='bg-shadow p-3 p-sm-3 p-md-4 p-lg-5 bg-white mt-4'>
      <h3>Incoming Request</h3>
      <Table
      shouldUpdateScroll={false}
      height={400}
      data={data}
      rowKey={rowKey}
      expandedRowKeys={expandedRowKeys}
      onRowClick={data => {
        console.log(data);
      }}
      renderRowExpanded={renderRowExpanded}
    >
      <Column width={60} align="center">
        <HeaderCell>#</HeaderCell>
        <Cell dataKey="id" />
      </Column>
      <Column width={150}>
        <HeaderCell>Start Date</HeaderCell>
        <Cell dataKey="startDate" />
      </Column>

      <Column width={150}>
        <HeaderCell>End Date</HeaderCell>
        <Cell dataKey="endDate" />
      </Column>

      <Column width={150}>
        <HeaderCell>Owner Phone</HeaderCell>
        <Cell dataKey="ownerPhone" />
      </Column>

      <Column width={100}>
        <HeaderCell>Pet Name</HeaderCell>
        <Cell dataKey="petName" />
      </Column>

      <Column width={70} align="center">
        <HeaderCell>#</HeaderCell>
        <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
      </Column>

      <Column width={200}>
        <HeaderCell>Message</HeaderCell>
        <Cell dataKey="message" />
      </Column>
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
              Cancel
            </Button>
          )}
        </Cell>
      </Column>
      <Column width={80} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell style={{ padding: '6px' }}>
          {rowData => (
            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
              Confirm
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
    </div>
  )
}

export default ScheduleRequest