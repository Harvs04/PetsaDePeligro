from django.db import models

# Create your models here.
class User(models.Model): 
  age = models.IntegerField()
  name = models.CharField(max_length=100)
  
  def __str__(self):
    return self.name
  
class Account(models.Model):
  name = models.CharField(max_length=50)
  balance = models.IntegerField()
  category = models.CharField(max_length=20)
  source = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  
  def __str__(self):
    return self.name
  
class Transaction(models.Model):
  
  class TransactionType(models.TextChoices):
    EXPENSE = "EXPENSE", "Expense"
    INCOME = "INCOME", "Income"
    TRANSFER = "TRANSFER", "Transfer"

  class Category(models.TextChoices):

    # INCOME
    ALKANSYA = "ALKANSYA", "Alkansya"
    BALANCE_ADJUSTMENT = "BALANCE_ADJUSTMENT", "Balance Adjustment"
    BUSINESS = "BUSINESS", "Business"
    CASHBACK = "CASHBACK", "Cashback"
    COMPANY_BONUS = "COMPANY_BONUS", "Company Bonus"
    CONTENT_CREATION = "CONTENT_CREATION", "Content Creation"
    DIVIDENDS = "DIVIDENDS", "Dividends"
    FREELANCE = "FREELANCE", "Freelance"
    INTEREST = "INTEREST", "Interest"
    INVESTMENT = "INVESTMENT", "Investment"
    REMITTANCE = "REMITTANCE", "Remittance"
    SALARY = "SALARY", "Salary"
    SIDE_HUSTLE = "SIDE_HUSTLE", "Side Hustle"

    # EXPENSE
    CHURCH = "CHURCH", "Church"
    FAMILY_SUPPORT = "FAMILY_SUPPORT", "Family Support"
    FOOD_AND_DRINKS = "FOOD_AND_DRINKS", "Food and Drinks"
    GIFTS = "GIFTS", "Gifts"
    GROCERY = "GROCERY", "Grocery"
    HEALTH = "HEALTH", "Health"
    HOUSE_BILLS = "HOUSE_BILLS", "House Bills"
    ONLINE_SHOPPING = "ONLINE_SHOPPING", "Online Shopping"
    PETS = "PETS", "Pets"
    RENT = "RENT", "Rent"
    SCHOOL = "SCHOOL", "School"
    SUBSCRIPTIONS = "SUBSCRIPTIONS", "Subscriptions"
    TRANSPORTATION = "TRANSPORTATION", "Transportation"
    TRAVEL = "TRAVEL", "Travel"
    UTILITIES = "UTILITIES", "Utilities"

  name = models.CharField(max_length=50)

  transaction_type = models.CharField(
    max_length=10,
    choices=TransactionType.choices
  )
  
  transaction_category = models.CharField(
    max_length=30,
    choices=Category.choices
  )

  amount = models.IntegerField()
  account_category = models.CharField(max_length=20)

  source = models.CharField(max_length=20)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return f"{self.name} ({self.transaction_type})"