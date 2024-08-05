from django.db import models

class Pile(models.Model):
  type = models.CharField(max_length=200)
  key = models.CharField(max_length=30, null=True)
  name = models.CharField(max_length=30, null=True)

  def __str__(self):
    return self.type

