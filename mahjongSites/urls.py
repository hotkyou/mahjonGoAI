from django.urls import path
from . import views
from .views import agentJS

urlpatterns = [
    path('', views.index, name='index'),
    path('agentJS', agentJS, name='agentJS'),
    path('login', views.login, name='login'),
    path('auth', views.auth, name='auth'),
    path('mypage', views.mypage, name='mypage'),
]