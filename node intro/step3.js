const fs = require('fs');
const axios = require('axios');
const process = require('process');

function output(content, outPath) {
  if (outPath) {
    fs.writeFile(outPath, content, 'utf8', (err) => {
      if (err) {
        console.error(`Couldn't write ${outPath}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

function cat(path, outPath) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    output(data, outPath);
  });
}

async function webCat(url, outPath) {
  try {
    const response = await axios.get(url);
    output(response.data, outPath);
  } catch (err) {
    console.error(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Handle command line arguments
const [,, option, outPath, path] = process.argv;

if (option === '--out') {
  if (path.startsWith('http')) {
    webCat(path, outPath);
  } else {
    cat(path, outPath);
  }
} else {
  const path = option;
  if (path.startsWith('http')) {
    webCat(path);
  } else {
    cat(path);
  }
}
