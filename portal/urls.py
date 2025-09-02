from django.urls import path
from . import views

app_name = 'portal'
urlpatterns = [
    path('', views.landing, name='landing'),
    path('choose/', views.choose_plan, name='choose_plan'),
    path('account/', views.account, name='account'),
    path('success/', views.success, name='success'),
]
