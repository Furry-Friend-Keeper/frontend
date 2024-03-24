import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
// import { useSelector, useDispatch } from 'react-redux'

const TakeCareDetail = () => {

    // const getStatus = useSelector();
    return (
    <>
        <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            Keeper Name
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Categories
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Phone
              </Typography>
              <Typography fontWeight="lg">082xxxxxxxx</Typography>
            </div>
            {/* <div>
              <Typography level="body-xs" fontWeight="lg">
                Followers
              </Typography>
              <Typography fontWeight="lg">980</Typography>
            </div> */}
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">3.2</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Start Date
              </Typography>
              <Typography fontWeight="lg">2024-06-15</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                End Date
              </Typography>
              <Typography fontWeight="lg">2024-07-03</Typography>
            </div>
          </Sheet>

          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            {/* {
              getStatus === 'Cancelled' ?  ""
              :
              <Button variant="solid" color="neutral">
                Cancel
              </Button>
            } */}
            <Button variant="outlined" color="danger">
                Cancel
              </Button>
            
            {/* {getStatus === "Pending" && <Button variant="outlined" color="primary"> Pending </Button>}
            {getStatus === "Cancelled" && <Button variant="solid" color="danger"> Cancelled </Button>}
            {getStatus === "Scheduled" && <Button variant="soft" color="primary"> Being cared </Button>}
            {getStatus === "Keeper Completed" && <Button variant="solid" color="primary"> Already get a pet </Button>}
            {getStatus === "Completed" && <Button variant="solid" color="primary"> Completed </Button>} */}
            <Button variant="solid" color="primary"> Already get a pet </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
    </>
  )
}

export default TakeCareDetail