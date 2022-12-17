import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';

function ListingCard() {
  return (
    <Card raised sx={{ maxWidth: 345 }}>
      <CardHeader
        title="The react Logo"
      />
      <CardMedia
        component="img"
        height='300'
        src='src\assets\react.svg'
        alt="Listing image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Description here
        </Typography>
      </CardContent>
      <CardActions>
        <Typography>
            In stock: 2
        </Typography>
        <IconButton color="primary" aria-label="Add to shopping cart" sx={{ marginLeft: 'auto' }}>
            <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ListingCard