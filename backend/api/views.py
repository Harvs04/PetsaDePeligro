from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Account, Action
from .serializer import UserSerializer, AccountSerializer, ActionSerializer

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
  
  
# ACTIONS
@api_view(['GET'])
def get_actions(request):
  actions = Action.objects.all()
  serializer = ActionSerializer(actions, many=True)
  return Response(serializer.data)

@api_view(['POST'])
def create_action(request):
  serializer = ActionSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)