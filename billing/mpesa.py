import requests
import base64
import json
from datetime import datetime
from django.conf import settings

def get_access_token():
    try:
        base_url = getattr(settings, 'MPESA_BASE_URL', 'https://sandbox.safaricom.co.ke')
        consumer_key = getattr(settings, 'MPESA_CONSUMER_KEY', 'your_consumer_key')
        consumer_secret = getattr(settings, 'MPESA_CONSUMER_SECRET', 'your_consumer_secret')
    except AttributeError:
        base_url = 'https://sandbox.safaricom.co.ke'
        consumer_key = 'your_consumer_key'
        consumer_secret = 'your_consumer_secret'
    
    url = f"{base_url}/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=(consumer_key, consumer_secret))
    if response.status_code == 200:
        return response.json()['access_token']
    else:
        raise Exception(f"Failed to get access token: {response.text}")

def stk_push(phone, amount, account_reference, transaction_desc):
    try:
        base_url = getattr(settings, 'MPESA_BASE_URL', 'https://sandbox.safaricom.co.ke')
        shortcode = getattr(settings, 'MPESA_SHORTCODE', 'your_shortcode')
        passkey = getattr(settings, 'MPESA_PASSKEY', 'your_passkey')
    except AttributeError:
        base_url = 'https://sandbox.safaricom.co.ke'
        shortcode = 'your_shortcode'
        passkey = 'your_passkey'
    
    try:
        access_token = get_access_token()
    except Exception as e:
        return {'ResponseCode': '1', 'error': str(e)}
    
    url = f"{base_url}/mpesa/stkpush/v1/processrequest"
    
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((shortcode + passkey + timestamp).encode()).decode()
    
    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": "https://yourdomain.com/billing/webhook/mpesa/",  # Update with your domain
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return {'ResponseCode': '1', 'error': f"STK Push failed: {response.text}"}
