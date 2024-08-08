import graphene
from graphene_django import DjangoObjectType
from freecell.models import Pile, Game, Card
from freecell.utils import create_game


class GameType(DjangoObjectType):
    class Meta:
        model = Game
        fields = ("status", "move_count")

    piles = graphene.List(lambda: PileType)
    status = graphene.String()
    move_count = graphene.Int()

    def resolve_piles(parent, _):
        return parent.piles.all()


class PileType(DjangoObjectType):
    class Meta:
        model = Pile
        fields = ("game", "type")

    game = graphene.Field(GameType)
    type = graphene.String()
    cards = graphene.List(lambda: CardType)

    def resolve_cards(parent, _):
        return parent.cards.all()


class CardType(DjangoObjectType):
    class Meta:
        model = Card
        fields = ("pile", "suit", "rank", "sort_order")


class CreateFreeCellGame(graphene.Mutation):
    class Arguments:
        create = graphene.Boolean(required=False)

    game = graphene.Field(GameType)

    @classmethod
    def mutate(cls, root, info):
        game = create_game()
        return CreateFreeCellGame(game=game)


class Query(graphene.ObjectType):
    piles = graphene.List(PileType)
    cards = graphene.List(CardType)
    games = graphene.List(GameType)

    def resolve_games(self, parent):
        return Game.objects.all()

    def resolve_piles(self, parent):
        return Pile.objects.all()

    def resolve_cards(self, parent):
        return Card.objects.all()


class Mutation(graphene.ObjectType):
    create_game = CreateFreeCellGame.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
