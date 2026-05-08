from django.db import models
from .constants.source import Source
from .constants.category import Category
from .constants.transaction import TransactionType
from .constants.account import AccountCategory

# Create your models here.
class User(models.Model): 
  age = models.IntegerField()
  name = models.CharField(max_length=100)
  
  def __str__(self):
    return self.name
  
class Account(models.Model):
  name = models.CharField(max_length=50)
  balance = models.IntegerField()
  category = models.CharField(max_length=20, choices=AccountCategory.choices)
  source = models.CharField(max_length=50, choices=Source.choices)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.name
  
class Transaction(models.Model):
  name = models.CharField(max_length=50)
  transaction_type = models.CharField(max_length=10, choices=TransactionType.choices)
  transaction_category = models.CharField(max_length=30, choices=Category.choices)
  amount = models.IntegerField()
  account = models.ForeignKey('Account', on_delete=models.CASCADE, related_name='transactions')
  source = models.CharField(max_length=20, choices=Source.choices)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.name} ({self.transaction_type})"