import graphene
from graphene_django import DjangoObjectType
from freecell.models import Pile, Game, Card
from freecell.utils import create_game


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = ("status", "move_count")


class PileType(DjangoObjectType):
    class Meta:
        model = Pile
        fields = ("game", "type")


class CardType(DjangoObjectType):
    class Meta:
        model = Card
        fields = ("pile", "suit", "rank", "sort_order")


class CreateFreeCellGame(graphene.ObjectType):
    @classmethod
    def mutate(cls, root, info):
        game = create_game()
        return CreateFreeCellGame(game=game, ok=True)

class Query(graphene.ObjectType):
    piles = graphene.List(PileType)
    cards = graphene.List(CardType)
    games = graphene.List(GameType)


schema = graphene.Schema(query=Query)
