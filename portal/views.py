from django.shortcuts import render, redirect
from billing.models import Plan, Customer, Device, OrderTxn
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from datetime import datetime

def landing(request):
    mac = request.GET.get('mac', '')
    ap = request.GET.get('ap', '')
    ssid = request.GET.get('ssid', '')
    # Hardcoded plans for Starlex
    plans = [
        {'id': 1, 'name': '1 Hour Unlimited', 'price': 5, 'duration_minutes': 60},
        {'id': 2, 'name': '3 Hours Unlimited', 'price': 10, 'duration_minutes': 180},
        {'id': 3, 'name': '24 Hours Unlimited', 'price': 30, 'duration_minutes': 1440},
        {'id': 4, 'name': '1 Week Unlimited', 'price': 150, 'duration_minutes': 10080},
        {'id': 5, 'name': '1 Month Unlimited', 'price': 500, 'duration_minutes': 43200},
        {'id': 6, 'name': 'Unlimited Access', 'price': 20, 'duration_minutes': 360},
    ]
    return render(request, 'portal/landing.html', {'plans': plans, 'mac': mac, 'ap': ap, 'ssid': ssid})

def choose_plan(request):
    if request.method == 'POST':
        plan_id = request.POST.get('plan_id')
        mac = request.POST.get('mac') or 'unknown'
        if not plan_id:
            return HttpResponse('Invalid request: plan_id missing')
        try:
            plan_id = int(plan_id)
        except ValueError:
            return HttpResponse('Invalid plan_id')
        # ...existing code...
        return redirect('billing:pay', plan_id=plan_id, mac=mac)
    return HttpResponse('Invalid request')

def account(request):
    # Show usage from radacct (FreeRADIUS DB)
    # ...existing code...
    return render(request, 'portal/account.html')

def success(request):
    # Get data from session
    plan = request.session.get('plan')
    expiry_str = request.session.get('expiry')
    if plan and expiry_str:
        return render(request, 'portal/success.html', {'plan': plan, 'expiry_time': expiry_str})
    return render(request, 'portal/success.html')
