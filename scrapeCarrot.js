const axios = require('axios');
const cheerio = require('cheerio');

const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching HTML:', error);
  }
};

const extractItems = (html) => {
  const $ = cheerio.load(html);
  const items = [];

  // Adjust this selector based on the main wrapper of each collection item
  $('div.group.space-y-2.mb-10.md\\:mb-0').each((index, element) => {
    const link = $(element).find('a').attr('href'); // The link inside each item
    const title = $(element).find('a').text().trim(); // The text of the link (if it's the item title)
    
    items.push({ title, link });
  });

  return items;
};

(async () => {
  const url = 'https://carrot.link/sneezych/wants';
  const html = await fetchHTML(url);
  const items = extractItems(html);

  console.log('Collection Items:', items);
})();
