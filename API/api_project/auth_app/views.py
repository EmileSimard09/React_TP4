from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# Create your views here.

from auth_app.serializers import \
  UserSerializer, \
  UserPasswordSerializer, \
  RegisterSerializer, \
  TokenSerializer

class CurrentUserView(APIView):
  http_method_names = ['get', 'put']
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = User.objects.get(pk=request.user.pk)
    user_serializer = UserSerializer(user, context={'request': request})
    return Response(user_serializer.data, status=status.HTTP_200_OK)

  def put(self, request):
    username = request.data['username']
    existing_user = User.objects.exclude(pk=request.user.pk).filter(username=username).first()
    if existing_user is not None:
      return Response('username_already_exists', status=status.HTTP_400_BAD_REQUEST)

    email = request.data['email']
    existing_user = User.objects.exclude(pk=request.user.pk).filter(email=email).first()
    if existing_user is not None:
      return Response('email_already_exists', status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.get(pk=request.user.pk)
    serializer = UserSerializer(user, data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    updated_user = serializer.save()

    user_serializer = UserSerializer(updated_user, context={'request': request})
    return Response(user_serializer.data, status=status.HTTP_200_OK)


class CurrentUserPasswordView(APIView):
  http_method_names = ['put']
  permission_classes = [IsAuthenticated]

  def put(self, request):
    user = User.objects.get(pk=request.user.pk)
    serializer = UserPasswordSerializer(user, data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    updated_user = serializer.save()

    user_serializer = UserSerializer(updated_user, context={'request': request})
    return Response(user_serializer.data, status=status.HTTP_200_OK)


class RegisterView(APIView):
  http_method_names = ['post']

  def post(self, request):
    username = request.data['username']
    existing_user = User.objects.filter(username=username).first()
    if existing_user is not None:
      return Response('username_already_exists', status=status.HTTP_400_BAD_REQUEST)

    email = request.data['email']
    existing_user = User.objects.filter(email=email).first()
    if existing_user is not None:
      return Response('email_already_exists', status=status.HTTP_400_BAD_REQUEST)

    serializer = RegisterSerializer(data=request.data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    created_user = serializer.save()

    user_serializer = UserSerializer(created_user, context={'request': request})
    return Response(user_serializer.data, status=status.HTTP_201_CREATED)


class TokenViewSet(ViewSet, TokenObtainPairView):
  http_method_names = ['post']
  permission_classes = (AllowAny,)
  serializer_class = TokenSerializer

  def create(self, request):
    serializer = self.get_serializer(data=request.data, context={'request': request})

    try:
      serializer.is_valid(raise_exception=True)
    except AuthenticationFailed:
      return Response('no_active_account', status=status.HTTP_401_UNAUTHORIZED)
    except TokenError as e:
      raise InvalidToken(e.args[0])

    return Response(serializer.validated_data, status=status.HTTP_200_OK)


class TokenRefreshViewSet(ViewSet, TokenRefreshView):
  http_method_names = ['post']
  permission_classes = (AllowAny,)

  def create(self, request):
    serializer = self.get_serializer(data=request.data, context={'request': request})

    try:
      serializer.is_valid(raise_exception=True)
    except TokenError as e:
      raise InvalidToken(e.args[0])

    return Response(serializer.validated_data, status=status.HTTP_200_OK)