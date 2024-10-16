import React from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import { GridItem } from "../components/GridItem";
import { Cake } from "../common/types";

type CakeListProps = {
  cakes: Cake[];
  handleDelete: (id: string) => void;
  handleOpenUpdate: (cake: Cake) => void;
};

const CakeList = ({ cakes, handleDelete, handleOpenUpdate }: CakeListProps) => {
  // Handle image fallback when it doesn't load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "/path-to-default-image.jpg"; // Fallback image URL
  };
  return (
    <Grid container spacing={2} direction="row" wrap="nowrap">
      {cakes.map((cake) => (
        <GridItem key={cake._id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={cake.imageUrl}
              alt={cake.name}
              onError={handleImageError} // Fallback image logic
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cake.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {cake.comment}
              </Typography>
              <Rating
                readOnly
                value={cake.yumFactor}
                aria-labelledby="yum-factor-rating"
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => handleOpenUpdate(cake)} // Open modal to update
                style={{ marginRight: "8px" }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => handleDelete(cake._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CakeList;
