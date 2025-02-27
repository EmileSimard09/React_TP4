from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Evaluation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    evaluation = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    note = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.evaluation
    
    class Meta:
        verbose_name = 'Evaluation'
        verbose_name_plural = 'Evaluations'
        ordering = ['date']
        
class PartiesJouees(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    niveau = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    duree= models.DecimalField(max_digits=5, decimal_places=2)
    tentatives = models.IntegerField()
    terminee = models.BooleanField(default=False)
    
    def __str__(self):
        return self.niveau
    
    class Meta:
        verbose_name = 'Partie jouée'
        verbose_name_plural = 'Partie jouées'
        ordering = ['date']

