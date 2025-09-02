from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from .models import OrderTxn, Plan
from django.views.decorators.csrf import csrf_exempt
from .mpesa import stk_push
from datetime import datetime, timedelta
import json
from django.db.models import Sum
from django.contrib.admin.views.decorators import staff_member_required

# Payment page
def pay(request, plan_id, mac):
    # Hardcoded plans matching landing page
    plans = [
        {'id': 1, 'name': '1 Hour Unlimited', 'price': 5, 'duration_minutes': 60},
        {'id': 2, 'name': '3 Hours Unlimited', 'price': 10, 'duration_minutes': 180},
        {'id': 3, 'name': '24 Hours Unlimited', 'price': 30, 'duration_minutes': 1440},
        {'id': 4, 'name': '1 Week Unlimited', 'price': 150, 'duration_minutes': 10080},
        {'id': 5, 'name': '1 Month Unlimited', 'price': 500, 'duration_minutes': 43200},
        {'id': 6, 'name': 'Unlimited Access', 'price': 20, 'duration_minutes': 360},
    ]
    plan = None
    for p in plans:
        if p['id'] == plan_id:
            plan = p
            break
    if not plan:
        return HttpResponse('Plan not found')
    
    if request.method == 'POST':
        phone = request.POST.get('phone')
        if not phone:
            return HttpResponse('Phone number required')
        
        # Initiate M-Pesa STK Push
        response = stk_push(phone, plan['price'], f"Plan-{plan_id}", f"Payment for {plan['name']}")
        
        if response.get('ResponseCode') == '0':
            # Create transaction record
            expiry = datetime.now() + timedelta(minutes=plan['duration_minutes'])
            OrderTxn.objects.create(
                customer=None,  # For now, no customer model integration
                plan=None,  # Since plan is hardcoded, not in DB
                amount=plan['price'],
                status='pending',
                paid_at=None
            )
            # Store checkout request ID for callback verification
            request.session['checkout_request_id'] = response['CheckoutRequestID']
            request.session['plan_id'] = plan_id
            request.session['mac'] = mac
            request.session['phone'] = phone
            request.session['expiry'] = expiry.isoformat()
            request.session['plan'] = plan  # Store plan data in session
            
            return redirect('portal:success')
        else:
            return HttpResponse('Payment initiation failed')
    
    return render(request, 'portal/payment.html', {'plan': plan, 'mac': mac})

# Payment webhook stub (M-Pesa simulation)
@csrf_exempt
def mpesa_webhook(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Process callback
        # Update OrderTxn status to success if payment successful
        # Grant RADIUS access for the MAC
        return JsonResponse({'status': 'received'})
    return JsonResponse({'status': 'method not allowed'})

# Payment webhook stub (Stripe simulation)
@csrf_exempt
def stripe_webhook(request):
    # Simulate payment callback
    # TODO: Validate and update OrderTxn
    return JsonResponse({'status': 'received'})

@staff_member_required
def transactions(request):
    txns = OrderTxn.objects.all().order_by('-created_at')
    return render(request, 'billing/transactions.html', {'txns': txns})

@staff_member_required
def admin_dashboard(request):
    total_users = OrderTxn.objects.filter(status='success').count()
    total_revenue = OrderTxn.objects.filter(status='success').aggregate(Sum('amount'))['amount__sum'] or 0
    active_plans = OrderTxn.objects.filter(status='success', paid_at__gte=datetime.now() - timedelta(days=30)).count()
    recent_transactions = OrderTxn.objects.order_by('-created_at')[:10]
    return render(request, 'billing/admin_dashboard.html', {
        'total_users': total_users,
        'total_revenue': total_revenue,
        'active_plans': active_plans,
        'recent_transactions': recent_transactions,
    })
