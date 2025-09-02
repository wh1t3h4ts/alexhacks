from django.contrib import admin
from .models import Plan, Customer, Device, OrderTxn

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'duration_minutes', 'rad_group')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone')

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ('mac', 'customer', 'created_at')

@admin.register(OrderTxn)
class OrderTxnAdmin(admin.ModelAdmin):
    list_display = ('customer', 'plan', 'amount', 'status', 'created_at', 'paid_at')
    list_filter = ('status', 'created_at', 'paid_at')
