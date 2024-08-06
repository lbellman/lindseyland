import uuid

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    # identifier = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now, editable=False)

    class Meta:
        abstract = True
        ordering = ["-created_at"]


class GameStatusChoices(models.TextChoices):
    WON = "WON", _("Won")
    LOST = "LOST", _("Lost")
    IN_PROGRESS = "IN_PROGRESS", _("In Progress")


class PileTypeChoices(models.TextChoices):
    COLUMN = "COLUMN", _("Column")
    FOUNDATION = "FOUNDATION", _("Foundation")
    FREE_CELL = "FREE_CELL", _("Free Cell")


class CardSuitChoices(models.TextChoices):
    HEARTS = "HEARTS", _("Hearts")
    DIAMONDS = "DIAMONDS", _("Diamonds")
    SPADES = "SPADES", _("Spades")
    CLUBS = "CLUBS", _("Clubs")


class CardRankChoices(models.TextChoices):
    ACE = "ACE", _("Ace")
    TWO = "TWO", _("Two")
    THREE = "THREE", _("Three")
    FOUR = "FOUR", _("Four")
    FIVE = "FIVE", _("Five")
    SIX = "SIX", _("Six")
    SEVEN = "SEVEN", _("Seven")
    EIGHT = "EIGHT", _("Eight")
    NINE = "NINE", _("Nine")
    TEN = "TEN", _("Ten")
    JACK = "JACK", _("Jack")
    QUEEN = "QUEEN", _("Queen")
    KING = "KING", _("King")


class Game(BaseModel):
    status = models.CharField(
        max_length=30, choices=GameStatusChoices, default=GameStatusChoices.IN_PROGRESS
    )
    move_count = models.IntegerField()

    def __str__(self):
        return self.status


class Pile(BaseModel):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, choices=PileTypeChoices)

    def __str__(self):
        return self.type


class Card(BaseModel):
    pile = models.ForeignKey(Pile, on_delete=models.CASCADE)
    suit = models.CharField(max_length=10, choices=CardSuitChoices)
    rank = models.CharField(max_length=10, choices=CardRankChoices)
    sort_order = models.IntegerField()

    def __str__(self):
        return f"{self.rank} of {self.suit}"
