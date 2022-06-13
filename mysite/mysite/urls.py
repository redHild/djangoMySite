"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.shortcuts import render

from django.conf import settings
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from mammoth import convert_to_html

static = staticfiles_storage.url
url = reverse

def docx2html(path):
    dat = ""
    with open(settings.MEDIA_ROOT + '/docx_container/' + path, "rb") as doc:
        dat = convert_to_html(doc).value
    return dat.split("<p>---</p>")

index = lambda request: render(request, 'index.html')

game_urls = [
    path('games/flappy_birb', lambda request: render(request, 'games/flappy_birb.html', {"title": "Flappy Birb"}),
         name="flappy_birb"),
    path('games/robot_game', lambda request: render(request, 'games/robot_game.html', {"title": "Robot Game"}),
         name="robot_game"),
]

thoughts_urls = [
    path('thoughts/canvas', lambda request: render(request, 'thoughts/canvas.html', {"title": "Canvas Things"}),
         name="canvas_testing"),
    path('thoughts/flow_field', lambda request: render(request, 'thoughts/flow_field.html', {"title": "Flow Field"}),
         name="flow_field"),
    path('thoughts/left_hand', lambda request: render(request, 'thoughts/left_hand.html', {"title": "Left Hand Notation"}),
         name="left_hand"),
    path('thoughts/particles', lambda request: render(request, 'thoughts/particles.html', {"title": "Particle Generator"}),
         name="particles"),
    path('thoughts/sortingAlgsViewer', lambda request: render(request, 'thoughts/sortingAlgsViewer.html', {"title": "Sorting Algorithms Viewer"}),
         name="sorting_algs_viewer"),
    path('thoughts/simplistic_ai', lambda request: render(request, 'thoughts/simplistic_ai.html',
                                                          {"title": "Simplistic AI",
                                                           "docx": docx2html("thoughts/simplistic_ai.docx")}),
         name="simplistic_ai"),
]

secret_urls = [
    path('secret/wedding', lambda request: render(request, 'secret/wedding.html', {"title": "Wilde Vintage Wedding"}),
         name="secret/wedding"),
    path('secret/engaged', lambda request: render(request, 'secret/engaged.html', {"title": "Engagement"}),
         name="secret/engaged"),
]

urlpatterns = [
    path('games', lambda request: render(request, 'games/main.html', {"title":"Games"}), name="games"),
    path('thoughts', lambda request: render(request, 'thoughts/main.html', {"title":"Thoughts"}), name="thoughts"),

    path('contact_me', lambda request: render(request, 'contact_me.html', {"title":"Contact Me"}), name="contact_me"),
    path('index/', lambda request: render(request, 'index_game.html'), name="index_game"),
    path('index', index),
    path('', index, name="index"),
]

urlpatterns += game_urls
urlpatterns += thoughts_urls
urlpatterns += secret_urls
urlpatterns += staticfiles_urlpatterns()