import React, { useState, useEffect } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  Chip,
  styled,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Button, ButtonGroup } from "rsuite";
import axios from "axios";
import { Rate } from "rsuite";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function KeeperCategory(props) {
  const {
    selected,
    handlecategory,
    selectratingrange,
    ratingscore,
    resetfilter,
  } = props;
  const [petCategories, setPetCategories] = useState([]);

  useEffect(() => {
    PetKeeperCategories();
  }, []);

  const PetKeeperCategories = async () => {
    await axios
      .get(import.meta.env.VITE_KEEPER_CATEGORIES)
      .then((res) => {
        const response = res.data;
        setPetCategories(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="filter-panel">
      <div className="pet-category bg-shadow p-4 bg-white rounded-3">
        <h3 className="pb-2">Categories</h3>
        {/* <h3 className='mb-4'>Filter by</h3> */}
        <div className="pet-category-list">
          {/* <h4>Category</h4> */}
          <div className="category-list">
            {petCategories.map((category) => (
              <FormGroup key={category.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      disableRipple
                      color="default"
                      checkedIcon={<BpCheckedIcon />}
                      icon={<BpIcon />}
                      checked={selected.includes(category.name)}
                      onChange={() => handlecategory(category.name)}
                    />
                  }
                  label={category.name}
                />
              </FormGroup>
            ))}
          </div>
        </div>
      </div>
      <div className="pet-rating bg-shadow bg-white rounded-3 p-4 mt-4 p-lg-3 p-md-2 p-sm-2">
        <h3 className="pb-2">Rating</h3>
        {/* <h3 className='mb-4'>Filter by</h3> */}
        <div className="rating-range">
          {Array.from({ length: 5 }, (_, i) => 5 - i).map((value) => (
            <div
              key={value}
              className={`d-flex mb-2 rating-icon pointer ${
                ratingscore === value ? "rating-active" : ""
              }`}
              onClick={() => selectratingrange(value)}
            >
              <Rate defaultValue={value} size="xs" color="yellow" readOnly />
              {value !== 5 && <KeyboardDoubleArrowUpIcon />}
            </div>
          ))}
        </div>
      </div>
      <div className="blue-btn mt-4">
        <Button
          appearance="primary"
          className="w-100 fs-6"
          onClick={resetfilter}
        >
          Reset Filter
        </Button>
      </div>
    </div>
  );
}

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 0 1px rgb(16 22 26 / 40%)"
      : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
      : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)",
  },
}));
const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#137cbd",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

export default KeeperCategory;
