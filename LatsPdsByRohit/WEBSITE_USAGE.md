# RationGuard Website Usage Guide

## Overview

RationGuard is a MERN-based ration transparency platform with role-based access for:

- `user`
- `dealer`
- `admin`

The website includes:

- Public information pages
- Secure authentication
- Protected dashboard routes
- Live backend-connected data for allocations, transactions, grievances, shops, and analytics

## Public Pages

These pages are available without signing in:

- `/home`
- `/public-ledger`
- `/fair-price-shops`
- `/allocations`
- `/transparency-reports`

### What users can do on public pages

- View public shop directory data
- Explore transparency summaries
- Preview ledger-related information
- Navigate to sign in or registration

Some public pages show full live data only after authentication, depending on backend access rules.

## Authentication

### Sign In

Route:

- `/signin`

Steps:

1. Enter your 10-digit phone number
2. Enter your password
3. Click `Sign In`

On success:

- Access token is stored for the session
- Refresh token is stored in local storage
- User profile is loaded from the backend
- You are redirected to `/dashboard/overview`

### Register

Route:

- `/register`

Steps:

1. Enter your full name
2. Enter Aadhaar number if required by the form
3. Enter ration card number if required
4. Enter phone number
5. Create password
6. Submit registration

On success:

- Account is created through the backend
- User is automatically logged in
- Profile is loaded
- You are redirected to the dashboard

## Dashboard Access

All dashboard pages are protected under:

- `/dashboard/*`

If you are not authenticated, the app redirects you to:

- `/signin`

## Role-Based Dashboard Usage

### 1. User Role

Typical pages:

- `/dashboard/overview`
- `/dashboard/allocations`
- `/dashboard/history`
- `/dashboard/grievances`
- `/dashboard/profile`
- `/dashboard/settings`

What a user can do:

- View personal allocations
- View personal transaction history
- Submit grievances
- View grievance history
- View profile details
- Manage local dashboard preferences

### 2. Dealer Role

Typical pages:

- `/dashboard/overview`
- `/dashboard/history`
- `/dashboard/profile`
- `/dashboard/settings`

What a dealer can do:

- View dealer-focused overview
- Create ration transactions for beneficiaries
- View shop-linked transaction history
- View profile data
- Manage local dashboard settings

### 3. Admin Role

Typical pages:

- `/dashboard/overview`
- `/dashboard/allocations`
- `/dashboard/grievances`
- `/dashboard/admin/analytics`
- `/dashboard/profile`
- `/dashboard/settings`

What an admin can do:

- Create allocations for users
- Review complaint queue
- View platform analytics
- Review fraud indicators
- Access platform-level operational summaries

## Main Functional Modules

### Allocations

User flow:

- Open `/dashboard/allocations`
- Review active entitlement records
- Check remaining quantity
- Download allocation slip

Admin flow:

- Open `/dashboard/allocations`
- Use the allocation creation form
- Select user
- Select item type
- Enter total quantity
- Submit allocation

### Transactions

User flow:

- Open `/dashboard/history`
- Review transaction records
- Filter by status
- Export transaction history
- Copy receipt IDs

Dealer flow:

- Open `/dashboard/history`
- Use `Create Transaction`
- Select beneficiary
- Select item
- Enter quantity
- Submit

### Grievances

User flow:

- Open `/dashboard/grievances`
- Submit subject and description
- Track complaint status
- Export grievance list

Admin flow:

- Open `/dashboard/grievances`
- Review complaint queue
- Sort records by date
- Export complaint data

### Shops Directory

Route:

- `/fair-price-shops`

Features:

- Search by region
- Filter by pincode text
- Filter by status
- View live shop inventory
- Open map search for a shop

### Admin Analytics

Route:

- `/dashboard/admin/analytics`

Available for:

- `admin` only

Shows:

- Total allocations
- Total transactions
- Total complaints
- Active users
- Fraud indicators

## Settings Page

Route:

- `/dashboard/settings`

Features:

- Save local UI preferences
- Change language preference
- Toggle notification settings
- Toggle accessibility preferences
- Secure logout

Note:

Some settings are currently stored locally in the browser and are not yet persisted to the backend.

## Logout

You can sign out from:

- Dashboard settings page

Logout behavior:

- Calls backend logout API
- Clears access token
- Clears refresh token
- Clears stored user session
- Redirects to sign in page

## Notes for Testers

### If a page shows no data

Possible reasons:

- No records exist yet in backend
- Current role does not have access
- Required mapping is missing
  - example: dealer not assigned to a shop

### If a protected page redirects to sign in

Possible reasons:

- Access token expired
- Refresh token expired
- Session was cleared

### If button actions export files

The site currently supports browser-side export for:

- Allocations
- Transactions
- Grievances
- Public ledger
- Transparency snapshots

## Recommended Usage Flow

### For a normal user

1. Register account
2. Sign in
3. Open dashboard overview
4. Review allocations
5. Check transaction history
6. Submit grievance if needed

### For a dealer

1. Sign in
2. Open dashboard overview
3. Go to transaction history
4. Create transaction for beneficiary
5. Review updated transaction list

### For an admin

1. Sign in
2. Open dashboard overview
3. Create allocations
4. Review grievances
5. Open admin analytics

## Current Production Notes

- Frontend is connected to backend APIs
- Dashboard routes are protected
- Tokens are handled with refresh flow
- Build is passing with Vite

Known improvement still recommended:

- Replace Tailwind CDN usage with a proper Tailwind/PostCSS setup for stricter production deployment
