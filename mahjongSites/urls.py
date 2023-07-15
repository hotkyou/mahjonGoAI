from django.urls import path
from . import views
from .views import agentJS

urlpatterns = [
    path('', views.index, name='index'),
    path('agentJS', agentJS, name='agentJS'),
]