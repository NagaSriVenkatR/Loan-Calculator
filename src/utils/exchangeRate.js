import { useEffect, useState } from "react";
import axios from "axios";

const ExchangeRates = (base = "INR") => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get(
          `https://v6.exchangerate-api.com/v6/6f9184f5c74a80f0694df364/latest/${base}`
        );
        setRates(res.data.conversion_rates);
      } catch (err) {
        console.error("Error fetching exchange rates", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [base]);

  return { rates, loading };
};

export default ExchangeRates;
