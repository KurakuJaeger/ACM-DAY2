from django.urls import path
from .views import index, rankings, about, api_scores

urlpatterns = [
    path("", index, name="main.index"),
    path("rankings/", rankings, name="main.rankings"),
    path("rankings/<str:genre>/", rankings, name="main.rankings_genre"),
    path("about/", about, name="main.about"),
    path("api/scores/", api_scores, name="api.scores"),
]