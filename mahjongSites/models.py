from django.db import models

class UserInfo(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=100)

class MahjongData(models.Model):
    username = models.CharField(max_length=50)
    matchnumber = models.IntegerField()
    score = models.IntegerField()
    rolenumber = models.IntegerField()
    rolescore = models.IntegerField()
    sumrank = models.IntegerField()
    maxcount = models.IntegerField()
    sumenemyrole = models.IntegerField()
    summiss =  models.IntegerField()

class History(models.Model):
    username = models.CharField(max_length=50)
    rank = models.IntegerField()
    date = models.DateTimeField()