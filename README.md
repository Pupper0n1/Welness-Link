# Welness-Link

## Overview

This repository contains the source code for the Wellness-Link application. Follow the instructions below to set up and run the application on your local machine.

## Prerequisites

- Docker: Ensure you have Docker installed on your machine. You can download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop/).
- Expo: Make sure you have Expo installed. You can find installation instructions [here](https://docs.expo.dev/get-started/installation/).

## Installation

1. Clone the main branch of this repository by clicking the green "Code" button and selecting your preferred method of cloning.
2. Open the cloned repository in your preferred IDE, such as VSCode.

## Running the Application

1. Open three terminals:

   - Terminal 1: Navigate to the "Frontend" directory by running `cd Frontend`.
   - Terminal 2 & 3: Navigate to the "Backend" directory by running `cd Backend` in both terminals.

2. Install dependencies:

   - In Terminal 1, run `npm install` to install frontend dependencies.
   - In one of the backend terminals, run `pip install -r requirements.txt` to install backend dependencies.

3. Start the application:

   - In Terminal 1, run `npx expo start -c` to start the frontend application.
   - In one of the backend terminals, run `litestar run -rd -H YOUR_PUBLIC_IP --port 8000`, replacing YOUR_PUBLIC_IP with your actual public IP address.
   - Launch the Docker application and run `docker compose up` in the second backend terminal to start the Docker services.

4. Access the application:
   - In the Terminal 1 (frontend), a QR code should be displayed. Use your smartphone's camera app to scan the QR code and launch the application using Expo Go.

## Notes

- Please ensure that you go into the file called link.json in the Frontend folder to change the IP address to your public IP address.
- Ensure all dependencies are installed and services are running properly before accessing the application.
- Make sure Docker is running and the Docker services are up and running.
- Replace YOUR_PUBLIC_IP with your actual public IP address before running the backend server.
- For any issues or inquiries, please refer to the project's documentation or contact the project maintainers.
