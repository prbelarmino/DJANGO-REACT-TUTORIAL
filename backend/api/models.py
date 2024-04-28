from django.db import models
from django.contrib.auth.models import *

class CustomUser(User):

    function = models.CharField(max_length=100)
    matriculation = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    age = models.IntegerField()
    location = models.CharField(max_length=100)
    


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    
class Equipment(models.Model):

    type = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    owner = models.CharField(max_length=30)
    model = models.CharField(max_length=30)
    manufacturer = models.CharField(max_length=30)
    identification = models.CharField(max_length=30)
    serial_number = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="equipment")

    def __str__(self):
        return self.type

class ServiceOrder(models.Model):
    
    number = models.CharField(max_length=30)
    requester = models.CharField(max_length=30)
    executor = models.CharField(max_length=30)
    service_type = models.CharField(max_length=30)
    closed_at = models.CharField(max_length=30)
    priority = models.CharField(max_length=30)
    title = models.CharField(max_length=30)
    issue_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    equip_id = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="order")
    
    def __str__(self):
        return self.number
    
class Calibration(models.Model):
    
    number = models.CharField(max_length=30)
    requester = models.CharField(max_length=30)
    executor = models.CharField(max_length=30)
    expiration = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    equip_id = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name="calibration")
    
    def __str__(self):
        return self.number
