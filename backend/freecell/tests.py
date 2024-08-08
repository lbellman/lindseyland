from freecell.models import Pile
from django.test import TestCase

class PileModelTerst(TestCase):
  def test_valid(self):
    self.assertIs(True, True)