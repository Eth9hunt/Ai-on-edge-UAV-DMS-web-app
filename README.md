# AI on Edge Real-time Disaster Management System

This project implements a web-based real-time disaster management system leveraging AI on Edge technologies. It features a 10x10 grid that dynamically displays the locations and survivor counts detected by two drones (D1 and D2), fetching data from a Google Sheet via Google Apps Script. The system updates in real-time, providing an intuitive interface for monitoring disaster response operations without requiring Google Cloud Console or OAuth setup.

## Overview

The application is designed to assist in disaster management by visualizing drone positions and survivor counts on a grid. It integrates seamlessly with a Google Sheet, where data for drone locations (`row`, `col`) and survivor counts (`number of survivor`) are stored and updated dynamically. The grid highlights:
- **D1 loc** in red (`#ff4500`) for Drone 1.
- **D2 loc** in purple (`#9370db`) for Drone 2.
- Survivor counts in white text on red or purple backgrounds, depending on the drone.

The system polls the Google Sheet every 3 seconds to ensure real-time updates, making it ideal for tracking disaster scenarios efficiently.

## Features

- **Dynamic 10x10 Grid**: Displays drone positions and survivor counts in real-time.
- **Google Sheets Integration**: Fetches data from a Google Sheet with columns `row1`, `col1`, `survivors1` (for Drone 1) and `row2`, `col2`, `survivors2` (for Drone 2) using Google Apps Script.
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices.
- **User Interface**: Includes buttons for map, coordinate, and manual/auto mode controls (for demonstration purposes).
- **Real-time Updates**: Polls the Google Sheet every 3 seconds to reflect changes instantly.

## Prerequisites

Before setting up the project, ensure you have the following:

- A Google Sheet with the following structure (starting from row 2):
