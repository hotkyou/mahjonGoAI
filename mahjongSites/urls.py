from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('agentJS', views.agentJS, name='agentJS'),
    path('mahjongAPI', views.mahjongAPI, name='mahjongAPI'),
]