from django.urls import path
from .views import get_users, create_user, user_detail, get_accounts, create_account, account_detail, get_transactions, create_transaction

urlpatterns = [
  # path('users/', get_users, name='get_users'),
  # path('users/create', create_user, name='create_user'),
  # path('users/<int:pk>', user_detail, name='user_detail'),
  path('accounts/', get_accounts, name='get_accounts'),
  path('accounts/create', create_account, name='create_account'),
  path('accounts/<int:pk>', account_detail, name='account_detail'),
  
  path('transactions/', get_transactions, name='get_transactions'),
  path('transactions/create', create_transaction, name='create_transaction'),
  # path('actions/<int:pk>', action_detail, name='action_detail')
]