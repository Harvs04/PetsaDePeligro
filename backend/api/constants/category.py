from django.db import models

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