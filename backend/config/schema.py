import graphene
from graphene_django import DjangoObjectType
from freecell.models import Pile


class PileType(DjangoObjectType):
    class Meta:
        model = Pile
        fields = ("type", "key", "name")


class Query(graphene.ObjectType):
    piles = graphene.List(PileType)

    def resolve_piles(parent, info):
        return Pile.objects.all()


schema = graphene.Schema(query=Query)
