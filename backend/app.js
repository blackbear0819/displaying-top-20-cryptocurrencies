const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Route to get the top 20 cryptocurrencies
app.get('/api/cryptos', async (req, res) => {
  try {
    // Fetch the top 20 cryptocurrencies from CoinGecko API
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 20,
        page: 1
      }
    });

    // Send the data to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
