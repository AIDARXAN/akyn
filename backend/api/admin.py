from django.contrib import admin

# Register your models here.
from api.models import User, Follow, Publication, Comment

admin.site.register(User)
admin.site.register(Follow)
admin.site.register(Publication)
admin.site.register(Comment)