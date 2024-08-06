import json
import pytest
from graphene_django.utils.testing import graphql_query
from freecell.models import Game


@pytest.fixture
def client_query(client):
    def func(*args, **kwargs):
        return graphql_query(*args, **kwargs, client=client)

    return func


# Test you query using the client_query fixture
def test_piles_query(client_query):
    response = client_query(
        """
        query {
            piles {                
                type  
            }
        }
        """,
    )

    content = json.loads(response.content)
    assert "errors" not in content
    