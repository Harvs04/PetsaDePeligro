from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Account, Transaction
from .serializer import UserSerializer, AccountSerializer, TransactionSerializer
from django.utils import timezone
from datetime import timedelta

@api_view(['GET'])
def get_users(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
  try:
    user = User.objects.get(pk=pk)
  except User.DoesNotExist:
      return Response(status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = UserSerializer(user)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = UserSerializer(user, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  
@api_view(['GET'])
def get_accounts(request):
  accounts = Account.objects.all()
  serializer = AccountSerializer(accounts, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def create_account(request):
  serializer = AccountSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def account_detail(request, pk):
  try:
    account = Account.objects.get(pk=pk)
  except Account.DoesNotExist:
      return Response(status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = AccountSerializer(account)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = AccountSerializer(account, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    account.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  
# TRANSACTIONS
@api_view(['GET'])
def get_transactions(request):

  time_frame = request.GET.get('timeFrame', '').strip('/')
  print(time_frame)
  transactions = Transaction.objects.all().order_by('-created_at')

  now = timezone.now()
  
  if time_frame == 'all':
    transactions = transactions
  
  elif time_frame == 'recent':
    transactions = transactions[:5]
  
  elif time_frame == 'today':
    transactions = transactions.filter(
      created_at__date=now.date()
    )

  elif time_frame == 'yesterday':
    transactions = transactions.filter(
      created_at__date=now.date() - timedelta(days=1)
    )

  elif time_frame == 'last-week':
    transactions = transactions.filter(
        created_at__date=now.date() - timedelta(days=7)
    )

  elif time_frame == 'last-month':
    transactions = transactions.filter(
        created_at__date=now.date() - timedelta(days=30)
    )

  elif time_frame == 'last-year':
    transactions = transactions.filter(
        created_at__date=now.date() - timedelta(days=365)
    )

  serializer = TransactionSerializer(transactions, many=True)

  return Response(serializer.data)

@api_view(['POST'])
def create_transaction(request):
  serializer = TransactionSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)