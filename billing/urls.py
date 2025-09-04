from django.urls import path
from . import views

app_name = 'billing'
urlpatterns = [
    path('pay/<int:plan_id>/<str:mac>/', views.pay, name='pay'),
    path('webhook/mpesa/', views.mpesa_webhook, name='mpesa_webhook'),
    path('webhook/stripe/', views.stripe_webhook, name='stripe_webhook'),
    path('transactions/', views.transactions, name='transactions'),
    path('plans/', views.plans, name='plans'),
    path('plans/add/', views.plans_add, name='plans_add'),
    path('plans/edit/<int:plan_id>/', views.plans_edit, name='plans_edit'),
    path('plans/delete/<int:plan_id>/', views.plans_delete, name='plans_delete'),
    path('customers/', views.customers, name='customers'),
    path('customers/add/', views.customers_add, name='customers_add'),
    path('customers/edit/<int:customer_id>/', views.customers_edit, name='customers_edit'),
    path('customers/delete/<int:customer_id>/', views.customers_delete, name='customers_delete'),
    path('admin/', views.admin_dashboard, name='admin_dashboard'),
    path('admin/settings/', views.settings, name='settings'),
    path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
]
