from django import forms
from .models import Plan, Customer, Device
from django.contrib.auth.models import User

class PlanForm(forms.ModelForm):
    class Meta:
        model = Plan
        fields = ['name', 'price', 'duration_minutes', 'rad_group']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Plan Name'}),
            'price': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Price'}),
            'duration_minutes': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Duration in minutes'}),
            'rad_group': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'RADIUS Group'}),
        }

class CustomerForm(forms.ModelForm):
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Username'}))
    mac_address = forms.CharField(max_length=17, widget=forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'MAC Address (e.g., AA:BB:CC:DD:EE:FF'}))

    class Meta:
        model = Customer
        fields = ['phone', 'price']
        widgets = {
            'phone': forms.TextInput(attrs={'class': 'form-input', 'placeholder': 'Phone Number'}),
            'price': forms.NumberInput(attrs={'class': 'form-input', 'placeholder': 'Price', 'step': '0.01'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['username'].initial = self.instance.user.username
            # Get MAC address from associated device if it exists
            device = self.instance.device_set.first()
            if device:
                self.fields['mac_address'].initial = device.mac

    def clean_mac_address(self):
        mac = self.cleaned_data.get('mac_address', '').upper()
        # Basic MAC address validation
        import re
        if not re.match(r'^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$', mac):
            raise forms.ValidationError('Please enter a valid MAC address (e.g., AA:BB:CC:DD:EE:FF)')
        return mac

    def save(self, commit=True):
        customer = super().save(commit=False)
        user = customer.user if customer.pk else User()

        user.username = self.cleaned_data['username']
        user.email = f"{self.cleaned_data['username']}@temp.local"  # Temporary email
        user.first_name = ''
        user.last_name = ''

        if not user.pk:
            user.set_password('defaultpassword123')
            user.save()
            customer.user = user

        if commit:
            customer.save()
            # Create or update device with MAC address
            mac_address = self.cleaned_data.get('mac_address')
            if mac_address:
                device, created = Device.objects.get_or_create(
                    customer=customer,
                    defaults={'mac': mac_address}
                )
                if not created:
                    device.mac = mac_address
                    device.save()

        return customer
