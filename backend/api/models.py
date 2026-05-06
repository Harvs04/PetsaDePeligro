from django.db import models

# Create your models here.
class User(models.Model): 
  age = models.IntegerField()
  name = models.CharField(max_length=100)
  
  def __str__(self):
    return self.name
  
class Transaction(models.Model):
  name = models.CharField(max_length=50)
  balance = models.IntegerField()
  category = models.CharField(max_length=20)
  source = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.name