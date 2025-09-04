from django.contrib import admin
from django.urls import path, include
from billing import views as billing_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('portal/', include('portal.urls')),
    path('billing/', include('billing.urls')),
    path('plans/', billing_views.public_plans, name='plans'),
    path('customers/', billing_views.public_customers, name='customers'),
]
