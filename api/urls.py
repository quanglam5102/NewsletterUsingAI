from django.urls import path
from .views import ChatGPTView, NewsletterAIView

urlpatterns = [
    path('chatbot/', ChatGPTView.as_view()),
    path('newsletter/', NewsletterAIView.as_view())
]