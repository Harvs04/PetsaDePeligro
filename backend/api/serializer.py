from rest_framework import serializers
from .models import User, Account, Action

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = '__all__'
    
class ActionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Action
    fields = '__all__'