from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api_app import views 

router = DefaultRouter()
router.register('evaluations', views.EvaluationViewSet, basename='evaluation')
router.register('parties-jouees', views.PartiesJoueesViewSet, basename='parties-jouees')


urlpatterns = [
    path('', include(router.urls)),
]
