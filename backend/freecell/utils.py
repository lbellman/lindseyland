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

    # Create piles
    for i in range(num_columns):
        # Create column piles
        Pile.objects.create(type=PileTypeChoices.COLUMN, game=game)

        if i < 4:
            # Create foundation and free cell piles
            Pile.objects.create(type=PileTypeChoices.FOUNDATION, game=game)
            Pile.objects.create(type=PileTypeChoices.FREE_CELL, game=game)

    # Get deck of cards

    # If no cards, create deck

    # Randomly assign each card to a column pile
