from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    #Meta class define how the class behave
    class Meta:
        model = CustomUser
        fields = ["id","first_name", "last_name", "email", "function", "phone_number", 
                  "matriculation", "age", "location", "username", "password"]
        #Only allow write the password but it cannot be requested
        extra_kwargs = {"username": {"write_only": True}, "password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = CustomUser.objects.create_user(**validated_data)
        return user


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "added_by"]
        extra_kwargs = {"added_by": {"read_only": True}}

class ServiceOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceOrder
        fields = ["id", "number", "state", "requester", "executor", "service_type", 
                  "closed_at","priority","title", "issue_description", "created_at", "equip_id"]
        #extra_kwargs = {"equip_id": {"read_only": True}}

class CalibrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calibration
        fields = ["id","number","requester", "executor", "expiration", "created_at", "equip_id"]
        #extra_kwargs = {"equip_id": {"read_only": True}}