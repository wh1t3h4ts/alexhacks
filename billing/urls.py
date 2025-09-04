from django.urls import path
from . import views

app_name = 'billing'
urlpatterns = [
    path('pay/<int:plan_id>/<str:mac>/', views.pay, name='pay'),
    path('webhook/mpesa/', views.mpesa_webhook, name='mpesa_webhook'),
    path('webhook/stripe/', views.stripe_webhook, name='stripe_webhook'),
    path('transactions/', views.transactions, name='transactions'),
    path('plans/', views.plans, name='plans'),
    path('users/', views.users, name='users'),
    path('admin/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/settings/', views.settings, name='settings'),
    path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
]
