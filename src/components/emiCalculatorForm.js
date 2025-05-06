import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

import { useCurrency } from "../context/currencyContext";
import calculateEMI from "../utils/calculateEMI";
import ExchangeRates from "../utils/exchangeRate";

const EMICalculatorForm = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [year, setYear] = useState("");
  const [emi, setEmi] = useState([]);
  const [totalEMI, setTotalEMI] = useState(null);

  const [errors, setErrors] = useState({
    principal: "",
    rate: "",
    year: "",
  });

  const { currency, setCurrency } = useCurrency();
  const { rates, loading } = ExchangeRates("INR");

  const validateField = (field, value) => {
    if (!value) return "This field is required.";
    if (isNaN(value) || +value <= 0) return "Enter a valid positive number.";
    return "";
  };

  const handleCalculate = () => {
    const principalErr = validateField("principal", principal);
    const rateErr = validateField("rate", rate);
    const yearErr = validateField("year", year);

    if (principalErr || rateErr || yearErr) {
      setErrors({
        principal: principalErr,
        rate: rateErr,
        year: yearErr,
      });
      return;
    }

    const totalMonths = +year * 12;
    const schedule = calculateEMI(+principal, +rate, totalMonths);
    setEmi(schedule);

    // Calculate the total EMI for the loan (EMI * total months)
    const totalEmiValue = schedule.reduce((acc, item) => acc + item.emi, 0);
    setTotalEMI(totalEmiValue);
  };

  const handleReset = () => {

    setEmi([]);
    
  };

  if (loading) {
    return <Typography>Loading exchange rates...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Loan EMI Calculator
      </Typography>

      <TextField
        fullWidth
        label="Loan Amount (P)"
        margin="normal"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        onBlur={() =>
          setErrors((prev) => ({
            ...prev,
            principal: validateField("principal", principal),
          }))
        }
        error={!!errors.principal}
        helperText={errors.principal}
      />

      <TextField
        fullWidth
        label="Annual Interest Rate (%)"
        margin="normal"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        onBlur={() =>
          setErrors((prev) => ({
            ...prev,
            rate: validateField("rate", rate),
          }))
        }
        error={!!errors.rate}
        helperText={errors.rate}
      />

      <FormControl fullWidth margin="normal">
        <TextField
          label="Loan Tenure (Years)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          error={!!errors.year}
          helperText={errors.year}
          type="number"
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              year: validateField("year", year),
            }))
          }
          style={{ "-moz-appearance": "textfield", appearance: "none" }}
        />
      </FormControl>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" fullWidth onClick={handleCalculate}>
          Calculate EMI
        </Button>
      </Box>

      {emi.length > 0 && (
        <>
          {/* Display Monthly EMI (Sum) */}
          <Typography variant="h6" sx={{ mt: 3 }}>
            Total Monthly EMI: {currency}{" "}
            {(totalEMI * rates[currency]).toFixed(2)}
          </Typography>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: 2,
            }}
            fullWidth
          >
            <InputLabel>Currency</InputLabel>
            <Select
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(rates).map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </FormControl>

          {/* Amortization Schedule Table */}

          <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 400 }}>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}
            >
              Amortization Schedule ({currency})
            </Typography>
            <Table stickyHeader>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>Month</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>EMI</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>Principal</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>Interest</strong>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <strong>Remaining Balance</strong>
                  </TableCell>
                </TableRow>
                {emi.map((item) => (
                  <TableRow key={item.month}>
                    <TableCell sx={{ textAlign: "center" }}>
                      {item.month}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {currency} {(item.emi * rates[currency]).toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {currency} {(item.principal * rates[currency]).toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {currency} {(item.interest * rates[currency]).toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {currency} {(item.remaining * rates[currency]).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default EMICalculatorForm;
