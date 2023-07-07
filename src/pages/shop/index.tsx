import { Container } from "@mui/material";
import React from "react";
import MainLayout from "src/layouts/main/MainLayout";


Shop.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

function Shop() {
    
  return (
    <Container>
        <h1>Shop</h1>
      </Container>
  );
}

export default Shop;
