from django.db import models
from django.contrib.auth.models import *

class CustomUser(User):

    function = models.CharField(max_length=30)
    matriculation = models.CharField(max_length=30, unique=True)
    phone_number = models.CharField(max_length=30)
    age = models.IntegerField()
    location = models.CharField(max_length=30)
    
    
class Equipment(models.Model):

    type = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    manufacturer = models.CharField(max_length=30)
    identification = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=30, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    added_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="equipment")

    def __str__(self):
        return self.type

class ServiceOrder(models.Model):
    
    number = models.CharField(max_length=30, unique=True)
    state = models.CharField(max_length=10)
    requester = models.CharField(max_length=300)
    executor = models.CharField(max_length=300)
    service_type = models.CharField(max_length=30)
    closed_at = models.CharField()
    priority = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    issue_description = models.TextField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    equip = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="order")
    
    def __str__(self):
        return self.number
    
class Calibration(models.Model):
    
    number = models.CharField(max_length=30)
    requester = models.CharField(max_length=30)
    executor = models.CharField(max_length=30)
    expiration = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    equip = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="calibrations")
    
    def __str__(self):
        return self.number
