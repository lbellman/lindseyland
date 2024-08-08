def create_game():
    """
    Creates a new FreeCell GameType.

    Parameters
    -----------
      None

    Returns
    -------
      game : GameType
        The instantiated FreeCell GameType.
    """

    from freecell.models import (
        Game,
        Pile,
        Card,
        PileTypeChoices,
        CardRankChoices,
        CardSuitChoices,
    )

    num_columns = 8

    # Create a new game instance
    game = Game.objects.create()

    # # Create piles
    for i in range(num_columns):
        # Create column piles
        Pile.objects.create(type=PileTypeChoices.COLUMN, game=game)

        # Create foundation and free cell piles
        if i < 4:
            Pile.objects.create(type=PileTypeChoices.FOUNDATION, game=game)
            Pile.objects.create(type=PileTypeChoices.FREE_CELL, game=game)

    # Get deck of cards
    cards_qs = Card.objects.all()

    # If deck does not exist, create 52 cards
    if not cards_qs:
        for suit_index, suit in enumerate(CardSuitChoices):
            for rank_index, rank in enumerate(CardRankChoices):
                Card.objects.create(
                    pile=None, suit=suit, rank=rank, sort_order=suit_index * rank_index
                )

    # Shuffle deck
    shuffled_cards_qs = Card.objects.order_by("?")

    column_piles = Pile.objects.filter(type=PileTypeChoices.COLUMN)
    column_idx = 0

    # Deal out cards into column piles
    for card in shuffled_cards_qs.all():
        # Get column pile
        pile = column_piles[column_idx]

        # Assign card to pile
        card.pile = pile
        card.save()

        # If last column, loop back to zero
        if column_idx == 7:
            column_idx = 0

        # Else, go to next column
        else:
            column_idx += 1

    return game
