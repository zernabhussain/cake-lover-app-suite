import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Rating,
} from "@mui/material";
import { createCake, updateCake } from "../api/cakes";
import { Cake } from "../common/types";

type CakeFormProps = {
  cakeData?: Cake;
  isUpdateMode?: boolean;
  onFormSubmitChange: (cake: Cake) => void;
};

const CakeForm = ({
  onFormSubmitChange,
  cakeData,
  isUpdateMode,
}: CakeFormProps) => {
  const [form, setForm] = useState({
    name: "",
    comment: "",
    imageUrl: "",
    yumFactor: 1,
    ...cakeData,
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name === "" || form.comment.length < 5 || form.imageUrl === "") {
      setError("Please fill in all fields correctly.");
      return;
    }
    try {
      let cakeDoc;
      if (isUpdateMode && cakeData) {
        cakeDoc = await updateCake(cakeData._id, form);
      } else {
        cakeDoc = await createCake(form);
      }

      onFormSubmitChange(cakeDoc.data);
      setError("");
    } catch (err) {
      setError("Error creating cake.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography
        data-testid="title-heading"
        variant="h4"
        align="center"
        gutterBottom
      >
        {isUpdateMode ? "Update Cake" : "Add a New Cake"}
      </Typography>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      <TextField
        label="Cake Name"
        variant="outlined"
        fullWidth
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <TextField
        label="Comment"
        variant="outlined"
        fullWidth
        multiline
        minRows={3}
        value={form.comment}
        onChange={(e) => setForm({ ...form, comment: e.target.value })}
        slotProps={{ htmlInput: { minLength: 5, maxLength: 200 } }}
        required
      />

      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        required
      />

      <Typography gutterBottom>Yum Factor (1 to 5):</Typography>
      <Rating
        value={form.yumFactor}
        onChange={(e, newValue) =>
          setForm({ ...form, yumFactor: newValue as number })
        }
        aria-labelledby="yum-factor-rating"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        {isUpdateMode ? "Update Cake" : "Add Cake"}
      </Button>
    </Container>
  );
};

export default CakeForm;
