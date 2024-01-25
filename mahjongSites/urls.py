from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('agentJS', views.agentJS, name='agentJS'),
    path('login', views.login, name='login'),
    path('auth', views.auth, name='auth'),
    path('mypage', views.mypage, name='mypage'),
    path('adddata', views.adddata, name='adddata'),
]