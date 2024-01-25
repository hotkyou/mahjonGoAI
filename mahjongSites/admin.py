from django.contrib import admin
from .models import UserInfo, MahjongData, History

admin.site.register(UserInfo)
admin.site.register(MahjongData)
admin.site.register(History)