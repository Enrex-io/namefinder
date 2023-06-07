# Greenwashing - Sustainability Marketing Assistant (Frontend)

## Introduction
Greenwashing is a Sustainability Marketing Assistant project aimed at promoting sustainable practices and products. This README provides an overview of the frontend part of the project, which is built using Next.js.

## Prerequisites
Before running the project, make sure you have the following environment variables set:

- `NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID`: The Stripe pricing table ID.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID`: The Stripe publishable ID.
- `NEXT_PUBLIC_ENREX_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

## Installation
Follow these steps to install and run the project:

1. Clone the repository: `git clone https://github.com/Enrex-io/greenwashing`
2. Navigate to the project directory: `cd greenwashing-frontend`
3. Install dependencies: `npm install` or `yarn install`

## Configuration
Ensure that you have set the required environment variables mentioned in the Prerequisites section before proceeding.

## Running the Project
To start the Next.js development server and run the project, use the following command:

```bash
npm run dev
```

This command will start the development server and make the project accessible at `http://localhost:3000` in your browser.

## Stripe Integration
The frontend part of this project includes Stripe integration. The subheader below provides an overview of the Stripe implementation:

### Stripe Integration Subheader (Example)
[Stripe](https://stripe.com/) is a widely-used payment platform that allows businesses to accept online payments. To use the Stripe functionality in this project, you need to provide the following environment variables:

- `NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID`: The ID of the Stripe pricing table.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_ID`: The publishable key obtained from Stripe.

Make sure to set these environment variables before running the project.