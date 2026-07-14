# PassM - Secure Automation Access Platform

PassM is a secure access platform that allows users to manage and access external services through automated login workflows.

The idea behind the project is to provide a centralized portal where users can see the services they have permission to access and launch automated authentication flows using Playwright.

## Features

- JWT authentication
- User authentication
- Role-based access control
- Account permissions
- Secure credential handling
- Playwright browser automation
- Session management
- Browser lifecycle control
- Audit logging

## Architecture
Frontend
|
|
REST API
|
|
Authentication Layer (JWT)
|
|
Account & Permission Management
|
|
Automation Service
|
|
Playwright Browser
|
|
External Applications


## Automation Workflow

1. User logs into PassM.
2. User sees available services based on permissions.
3. User selects an account/service.
4. PassM starts a Playwright browser session.
5. Credentials are securely retrieved.
6. Automated login is performed.
7. Session remains available while the browser is active.

## Technologies

### Backend

- Node.js
- TypeScript
- Express
- JWT
- Playwright

### Frontend

- HTML
- CSS
- JavaScript

### Security

- Token-based authentication
- Permission validation
- Session tracking
- Audit events

## Example Use Case

A company has multiple external platforms:

- Insurance portals
- Vendor systems
- Internal tools

Instead of sharing passwords with users, PassM provides controlled access through automated login workflows.

## Current Status

This project is under active development.

Implemented:

✅ Authentication  
✅ Account management  
✅ Permissions  
✅ Playwright automation  
✅ Session management  
✅ Basic dashboard  

Future improvements:

- Encryption improvements
- Cloud deployment
- More connectors
- Advanced audit dashboard

## Author

Orlando Zoé Morales Lomelí

GitHub:
https://github.com/Blinkzoe
