from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    #Meta class define how the class behave
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ["id", "type", "state", "owner", "model", "manufacturer", 
                  "identification", "serial_number","created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class ServiceOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceOrder
        fields = ["id", "equipment", "number", "requester", "executor", 
                  "service_type", "closed_at","priority", 
                  "title", "issue_description"]
        extra_kwargs = {"equipment": {"read_only": True}}

class CalibrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calibration
        fields = ["id","number","requester", "executor", "expiration", "created_at", "equip_id"]
        #extra_kwargs = {"equipment": {"read_only": True}}