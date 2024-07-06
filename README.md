# Glidder 

## Overview

The Gliiderr client application provides a user-friendly interface for deploying web applications using a Git URL. The client leverages OAuth GitHub for authentication, ensuring secure and seamless access for users. Built with Next.js, this application connects with the Gliiderr backend to manage deployments and retrieve real-time logs.

## Features

- OAuth GitHub Authentication
- Deploy applications using Git URL
- View real-time deployment logs
- Manage deployment history

## Getting Started

### Prerequisites

- Next.js
- GitHub OAuth App credentials (Client ID and Client Secret)
- Gliiderr backend server running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gliiderr-client.git
   cd gliiderr-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Create an `.env.local` file in the root directory with the following content:
   ```env
   NEXT_PUBLIC_GITHUB_CLIENT_ID=<your_github_client_id>
   GITHUB_CLIENT_SECRET=<your_github_client_secret>
   NEXT_PUBLIC_BACKEND_URL=<your_backend_server_url>
   ```

2. Ensure your GitHub OAuth App is set up correctly:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

## Usage

1. Open the Gliiderr client application in your browser.
2. Click on the "Login with GitHub" button to authenticate.
3. Once authenticated, you can provide a Git URL to deploy your application.
4. Monitor real-time deployment logs and manage your deployment history.

