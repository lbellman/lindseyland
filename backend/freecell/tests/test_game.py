from django.test import TestCase
from freecell.models import Game, Pile, Card, GameStatusChoices, PileTypeChoices
from freecell.utils import create_game
import json

from graphene_django.utils.testing import GraphQLTestCase


class TestCreateGame(TestCase):
    def setUp(self):
        self.game = create_game()

    def test_existing_card_deck(self):
        assert Card.objects.count() == 52

        # Win game
        self.game.complete_game(GameStatusChoices.WON)

        # Assert that piles have been deleted but cards haven't
        assert self.game.piles.count() == 0
        assert Card.objects.count() == 52

        # Assert that all cards have null piles
        piles = set([card.pile for card in Card.objects.all()])
        assert len(piles) == 1
        assert list(piles)[0] == None

        # Create a new game
        new_game = create_game()
        _assert_correct_piles(new_game)

        assert Card.objects.count() == 52

    def test_no_existing_card_deck(self):
        assert self.game.move_count == 0
        assert self.game.status == GameStatusChoices.IN_PROGRESS
        _assert_correct_piles(self.game)


class TestCreateGameMutation(GraphQLTestCase):
    def test_valid(self):
        response = self.query(
            """
            mutation CreateGame($create: Boolean) {
                createGame(create: $create) {
                    game {
                        piles {
                          type
                          cards {
                            suit
                            rank
                          }
                        }
                        status
                        moveCount
                    }
                }
            }
            """
        )

        # This validates the status code and if you get errors
        content = json.loads(response.content)
        assert "errors" not in content
        assert "data" in content
        game = content["data"]["createGame"]["game"]

        assert len(game["piles"]) == 16


def _assert_correct_piles(game):
    expected_foundation_pile_count = 4
    expected_freecell_pile_count = 4
    expected_column_pile_count = 8

    piles = game.piles

    # Assert total number of piles
    assert (
        piles.count()
        == expected_column_pile_count
        + expected_foundation_pile_count
        + expected_freecell_pile_count
    )
    # Assert that four foundation piles are created
    foundation_piles = piles.filter(type=PileTypeChoices.FOUNDATION)
    assert foundation_piles.count() == expected_foundation_pile_count

    # Assert that four freecell piles are created
    freecell_piles = piles.filter(type=PileTypeChoices.FREE_CELL)
    assert freecell_piles.count() == expected_freecell_pile_count

    # Assert that eight column piles are created
    column_piles = piles.filter(type=PileTypeChoices.COLUMN)
    assert column_piles.count() == expected_column_pile_count

    # Assert that first four columns have seven cards each
    for pile in column_piles[:4]:
        assert pile.cards.count() == 7

    # Assert that last four columns have six cards each
    for pile in column_piles[4:]:
        assert pile.cards.count() == 6
