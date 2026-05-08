from django.db import models

class AccountCategory(models.TextChoices):
  CASH = "CASH", "Cash"
  SAVINGS = "SAVINGS", "Savings"
  CHECKING = "CHECKING", "Checking"
  CREDIT = "CREDIT", "Credit"
  WALLET = "WALLET", "E-Wallet"
  INVESTMENT = "INVESTMENT", "Investment"
  LOAN = "LOAN", "Loan"
  INSURANCE = "INSURANCE", "Insurance"
  PENSION = "PENSION", "Pension"
  CRYPTOCURRENCY = "CRYPTOCURRENCY", "Cryptocurrency"