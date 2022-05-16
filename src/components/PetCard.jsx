import React  from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

export default function PetCard({ pet }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }} className="mb-4" style={{ margin: "auto" }}>
      <CardMedia
        component="img"
        height="140"
        image={pet.picture}
        alt="pet image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pet.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pet.type}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button disabled style={{ color: "#563d7c" }} size="medium">
          {pet.adoptionStatus}
        </Button>
        <Button
          size="medium"
          // variant="outlined"
          style={{ backgroundColor: "#491598be", color: "white" }}
          onClick={() => navigate("/pet/" + pet.petId)}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
