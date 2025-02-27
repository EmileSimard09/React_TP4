from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from django.utils.timezone import now
from api_app.models import Evaluation
from api_app.serializers import EvaluationSerializer

class EvaluationViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'put', 'delete']
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Evaluation.objects.all().order_by('-date')
    serializer_class = EvaluationSerializer
    
    def create(self, request, *args, **kwargs):
        user = request.user
        existing_evaluation = Evaluation.objects.filter(user=user).first()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if existing_evaluation:
            serializer.update(existing_evaluation, serializer.validated_data)
            existing_evaluation.date = now() 
            existing_evaluation.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        evaluation = self.get_object()

        if evaluation.user != request.user:
            return Response(
                {"detail": "Vous ne pouvez supprimer que votre propre évaluation."}, 
                status=status.HTTP_403_FORBIDDEN
            )

        self.perform_destroy(evaluation)
        return Response(status=status.HTTP_204_NO_CONTENT)
