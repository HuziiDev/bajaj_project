const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS package
const app = express();
const port = process.env.PORT || 5000;

// Use CORS middleware to allow all origins by default
app.use(cors());

// Middleware for JSON parsing
app.use(bodyParser.json());

// Helper functions
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const processFile = (base64String) => {
  try {
    const buffer = Buffer.from(base64String, "base64");
    const fileSizeKB = buffer.length / 1024;
    const fileMimeType = "application/octet-stream"; // Default MIME type

    return {
      file_valid: true,
      file_mime_type: fileMimeType,
      file_size_kb: fileSizeKB.toFixed(2),
    };
  } catch (error) {
    return {
      file_valid: false,
      file_mime_type: null,
      file_size_kb: null,
    };
  }
};

// Route: GET /bfhl
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Route: POST /bfhl
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Validate input
  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input: 'data' is required and should be an array.",
    });
  }

  // Extract numbers, alphabets, and find highest lowercase letter
  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;
  let isPrimeFound = false;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(parseInt(item, 10))) isPrimeFound = true;
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (/[a-z]/.test(item)) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  // Handle file processing
  const fileDetails = file_b64 ? processFile(file_b64) : { file_valid: false };

  // Response
  res.status(200).json({
    is_success: true,
    user_id: "john_doe_17091999", // Replace with dynamic logic if required
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    ...fileDetails,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
