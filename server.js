const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = 3000; // You can use any port you'd like

// Function to scrape the collection data
const fetchCollectionData = async () => {
  const url = 'https://carrot.link/sneezych/wants';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const items = [];

    $('div.group.space-y-2.mb-10.md\\:mb-0').each((index, element) => {
      const link = $(element).find('a').attr('href');
      const title = $(element).find('a').text().trim();
      items.push({ title, link });
    });

    return items;
  } catch (error) {
    console.error('Error fetching collection data:', error);
    return [];
  }
};

// API endpoint to serve scraped data
app.get('/api/collection', async (req, res) => {
  const collectionData = await fetchCollectionData();
  res.json(collectionData);
});

// Serve static files (like your HTML file)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});