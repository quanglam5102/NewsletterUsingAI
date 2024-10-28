from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('newsletter', index),
    path('login', index),
    path('register', index),
    path('profile', index),
    path('about', index)
]