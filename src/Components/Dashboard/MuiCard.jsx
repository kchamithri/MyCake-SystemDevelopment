import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const MuiCard = () => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">well meaning and kindly.</Typography>
      </CardContent>
    </Card>
  );
};

export default MuiCard;
