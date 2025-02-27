from api_app.models import Evaluation, PartiesJouees
from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
        
class EvaluationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Evaluation
        fields = '__all__'
        read_only_fields = ('user',)

class PartiesJoueesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = PartiesJouees
        fields = '__all__'
        read_only_fields = ('user',)
