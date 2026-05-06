from django.urls import path
from .views import get_users, create_user, user_detail, get_transactions, create_transaction, transaction_detail

urlpatterns = [
  # path('users/', get_users, name='get_users'),
  # path('users/create', create_user, name='create_user'),
  # path('users/<int:pk>', user_detail, name='user_detail'),
  path('transactions/', get_transactions, name='get_transactions'),
  path('transactions/create', create_transaction, name='create_transaction'),
  path('transactions/<int:pk>', transaction_detail, name='transaction_detail')
]