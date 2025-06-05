import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const companies = [
  {
    name: "amazon",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "atlassian",
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Atlassian_logo.svg",
  },
  {
    name: "google",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "ibm",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  },
  {
    name: "meta",
    url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
  },
  {
    name: "microsoft",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
  },
  {
    name: "netflix",
    url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "uber",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg",
  },
];

const downloadLogo = (url, filename) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const file = fs.createWriteStream(filename);
          response.pipe(file);
          file.on("finish", () => {
            file.close();
            resolve();
          });
        } else {
          reject(new Error(`Failed to download ${url}`));
        }
      })
      .on("error", reject);
  });
};

const downloadAllLogos = async () => {
  const companiesDir = __dirname;

  for (const company of companies) {
    const filename = path.join(companiesDir, `${company.name}.svg`);
    try {
      await downloadLogo(company.url, filename);
      console.log(`Downloaded ${company.name} logo`);
    } catch (error) {
      console.error(`Error downloading ${company.name} logo:`, error);
    }
  }
};

downloadAllLogos();
