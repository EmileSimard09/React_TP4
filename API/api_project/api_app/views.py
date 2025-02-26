from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from api_app.models import Evaluation
from api_app.serializers import EvaluationSerializer

# Create your views here.
class EvaluationViewSet(ModelViewSet):
    http_method_names = ['get']
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Evaluation.objects.all().order_by('date')
    serializer_class = EvaluationSerializer
