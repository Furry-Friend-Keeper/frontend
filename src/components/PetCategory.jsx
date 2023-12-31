import React, { useState, useEffect } from 'react'
import { Button, Popover } from '@mui/material';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import CheckIcon from "@mui/icons-material/Check";
import PetsIcon from '@mui/icons-material/Pets';
import axios from 'axios';

function PetCategory({ selected, setSelected}) {
      const [petCategories, setPetCategories] = useState([]);

      useEffect(() => {
        PetKeeperCategories()
    },[])

    const PetKeeperCategories = async() => {
        await axios.get(import.meta.env.VITE_KEEPER_CATEGORIES).then((res)=> {
            const response = res.data;
            setPetCategories(response)
        }).catch((err) => {
            console.log(err)
        })
    }

      const [anchorEl, setAnchorEl] = useState(null);

      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
    
      // const [selected, setSelected] = useState([]);

  return (
    <>
    <Button aria-describedby={id} variant="contained" onClick={handleClick} startIcon={<PetsIcon />} className="w-100" >
              Pet Category
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '400px', overflow:"hidden" }}>
              <div className="m-3">
                <Typography level="title-lg" id="fav-movie" mb={2}>
                  Pet Category
                </Typography>
                <Box
                  role="group"
                  aria-labelledby="fav-movie"
                  sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                >
                  {petCategories.map((category, index) => {
                    const checked = selected.includes(category.name);
                    return (
                      <Chip
                        key={index}
                        size='lg'
                        variant="plain"
                        color={checked ? 'primary' : 'neutral'}
                        startDecorator={
                          checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                        }
                      >
                        <Checkbox
                          variant="outlined"
                          size='lg'
                          color={checked ? 'primary' : 'neutral'}
                          disableIcon
                          overlay
                          label={category.name}
                          checked={checked}
                          onChange={(event) => {
                            setSelected((names) =>
                              !event.target.checked
                                ? names.filter((n) => n !== category.name)
                                : [...names, category.name],
                            );
                          }}
                        />
                      </Chip>
                    );
                  })}
                </Box>
              </div>
            </Box>
            </Popover>
    </>
  )
}

export default PetCategory