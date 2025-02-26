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

