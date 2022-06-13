from __future__ import absolute_import  # Python 2 only
from jinja2 import Environment
from django.contrib.staticfiles.storage import staticfiles_storage
from django.urls import reverse
from . import env_vars


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
        'env_vars': env_vars.env_vars,
        'html_templates': env_vars.html_templates,
    })
    return env
