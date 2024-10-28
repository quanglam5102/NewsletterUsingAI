from django.urls import path
from .views import ChatGPTView

urlpatterns = [
    path('chatbot/', ChatGPTView.as_view())
]