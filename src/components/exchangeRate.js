import React from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import ExchangeRates from "../utils/exchangeRate"; // Assuming this returns { rates, loading }

const ExchangeRatesPage = () => {
  const { rates, loading } = ExchangeRates("INR");

  if (loading) return <Typography>Loading exchange rates...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Live Exchange Rates (Base: INR)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Currency</strong>
              </TableCell>
              <TableCell>
                <strong>Rate</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(rates).map(([code, rate]) => (
              <TableRow key={code}>
                <TableCell>{code}</TableCell>
                <TableCell>{rate.toFixed(4)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExchangeRatesPage;
