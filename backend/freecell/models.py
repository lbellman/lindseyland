from django.db import models

class Pile(models.Model):
  type = models.CharField(max_length=200)
