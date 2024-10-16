import { useEffect, useState } from "react";
import { getCakes, deleteCake } from "../api/cakes"; // Add updateCake API
import CakeForm from "../components/CakeForm";
import { Typography, Modal, Box } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { GridItem } from "../components/GridItem";
import CakeList from "../components/CakeList";
import { Cake } from "../common/types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const CakeContainer = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [error, setError] = useState<string>();
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // Modal for updating cake
  const [selectedCake, setSelectedCake] = useState<any>(null); // Store the selected cake to update

  // Fetch cakes and update the state
  const fetchCakes = async () => {
    try {
      const { data } = await getCakes();
      setCakes(data);
    } catch (err) {
      setError("Failed to fetch cakes. Please try again later.");
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  // Optimistic UI update for deletion
  const handleDelete = async (id: string) => {
    const updatedCakes = cakes.filter((cake) => cake._id !== id); // Remove cake from UI immediately
    setCakes(updatedCakes);
    try {
      await deleteCake(id);
    } catch (err) {
      setError("Failed to delete the cake.");
      // If API fails, revert UI
      setCakes(cakes); // Rollback UI to previous state
    }
  };

  // Handle real-time addition of cakes
  const addNewCake = (newCake: Cake) => {
    setCakes((prevCakes) => [...prevCakes, newCake]); // Add the new cake to the list
  };

  const UpdateCake = (updatedCake: Cake) => {
    const updatedCakes = cakes.map((cake) =>
      cake._id === updatedCake._id ? updatedCake : cake
    );
    setCakes(updatedCakes);
    setOpenUpdateModal(false);
  };

  // Open update modal and select cake to update
  const handleOpenUpdate = (cake: Cake) => {
    setSelectedCake(cake);
    setOpenUpdateModal(true);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Yummy Cakes
      </Typography>

      <Grid container spacing={2} columns={{ sm: 4, md: 12 }}>
        <Grid size={{ sm: 4, md: 8 }}>
          {!error ? (
            <GridItem>
              {" "}
              {cakes.length === 0 ? (
                <Typography>No cake found.</Typography>
              ) : (
                <CakeList
                  cakes={cakes}
                  handleDelete={handleDelete}
                  handleOpenUpdate={handleOpenUpdate}
                />
              )}
            </GridItem>
          ) : (
            <Typography color="error">{error}</Typography>
          )}
        </Grid>
        <Grid size={{ sm: 4, md: 4 }}>
          <GridItem>
            <CakeForm onFormSubmitChange={addNewCake} />{" "}
          </GridItem>
        </Grid>
      </Grid>
      {/* Update Modal */}
      <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <Box sx={modalStyle}>
          <CakeForm
            cakeData={selectedCake}
            isUpdateMode={true}
            onFormSubmitChange={UpdateCake}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CakeContainer;
