// @ts-check

import express from 'express';
import { exec } from 'child_process';
import util from 'util';
import cors from 'cors';
import fs from 'fs';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const execPromise = util.promisify(exec);

const app = express();

// Configure CORS to allow requests from http://localhost:3000
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

// Endpoint to read file and send content
app.get('/file/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    console.log('>>', __dirname, filename);
    // Construct file path (assuming files are in a 'data' directory)
    const filePath = path.join(__dirname, filename);

    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    console.log('> all good', fileContent);

    // Send successful response with file content
    res.status(200).json({
      success: true,
      data: fileContent,
    });
  } catch (error) {
    // Handle specific errors
    if (error.code === 'ENOENT') {
      res.status(404).json({
        success: false,
        error: 'File not found',
      });
      return;
    }

    console.error(error);
    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
});

app.get('/run-workflow', async (req, res) => {
  const command = 'npx @redocly/cli@latest respect museum-tickets.arazzo.yaml --verbose';

  try {
    // Execute the command
    const { stdout, stderr } = await execPromise(command);

    // Send the command output as the response
    res.json({
      success: true,
      stdout: stdout,
      stderr: stderr,
    });
  } catch (error) {
    // Handle errors (e.g., command failed or file not found)
    res.status(500).json({
      success: false,
      error: error.message,
      stderr: error.stderr || '',
    });
  }
});

app.listen(8080, () => {
  console.log(`Server running at http://localhost:${8080}`);
});
