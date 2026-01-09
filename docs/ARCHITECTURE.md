# System Architecture — D-Card

## Overview
D-Card follows a modular, cloud-native architecture suitable for deployment across multiple universities.

## Core Components

- **User Web App**
  - Registration
  - Digital ID display
  - Wallet previews

- **Admin Portal**
  - User approval
  - Role assignment
  - Access rule management

- **Terminal Interface**
  - Simulated NFC tap
  - Token + location validation

- **Rules Engine**
  - Role-based access control
  - Location-aware decisions

- **Audit Logging**
  - Records access attempts and outcomes

## Design Principles
- Mobile-first
- Role-based access control
- Stateless validation
- Extensible to real NFC and IAM systems

An architecture diagram illustrating component interaction is included below.
