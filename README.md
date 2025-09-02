
# WiFi Billing and Captive Portal System

## Overview
A Django-based captive portal and billing system for LAN/WiFi networks using Huawei routers and FreeRADIUS.

## Features
- User-facing captive portal (plan selection, payment, account usage)
- Admin panel for plans, customers, devices, transactions, sessions
- Payment integration (M-Pesa, Stripe stub)
- FreeRADIUS SQL integration (radcheck, radusergroup, CoA)
- TailwindCSS mobile-first templates

## Setup Steps
1. Install Python 3.11+, Django, MySQL/MariaDB, FreeRADIUS, pyrad, MySQLdb
2. Configure `settings.py` for both databases
3. Run migrations for billing DB: `python manage.py makemigrations billing && python manage.py migrate`
4. Create superuser: `python manage.py createsuperuser`
5. Start server: `python manage.py runserver`
6. Configure Huawei router for external portal and RADIUS
7. See `radius/utils.py` and `radius/coa.py` for FreeRADIUS integration

## Example FreeRADIUS SQL Queries
- Insert radcheck:
  `REPLACE INTO radcheck (username, attribute, op, value) VALUES ('AA:BB:CC:DD:EE:FF', 'Cleartext-Password', ':=', 'randompass')`
- Assign group:
  `REPLACE INTO radusergroup (username, groupname) VALUES ('AA:BB:CC:DD:EE:FF', '1hour')`

## Documentation
- See code comments and settings for details
- Update payment stubs for live integration

