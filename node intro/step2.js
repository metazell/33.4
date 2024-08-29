const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Get the path or URL from the command line arguments
const arg = process.argv[2];

if (arg.startsWith('http')) {
  webCat(arg);
} else {
  cat(arg);
}
