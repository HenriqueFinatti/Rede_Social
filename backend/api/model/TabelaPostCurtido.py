from astrapy import DataAPIClient
from astrapy.constants import SortMode
from astrapy.info import (
    CreateTableDefinition,
    ColumnType,
    TableScalarColumnTypeDescriptor,
    TablePrimaryKeyDescriptor,
)
import os
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("API_TOKEN")
API_ENDPOINT = os.getenv("API_ENDPOINT")
TABELA_CURTIDAS = os.getenv("TABELA_CURTIDAS")

# Get an existing database
client = DataAPIClient(API_TOKEN)
database = client.get_database(API_ENDPOINT)

# Drop a table
database.drop_table(TABELA_CURTIDAS)

table_definition = CreateTableDefinition(
    # Define all of the columns in the table
    columns={
        "id_usuario": TableScalarColumnTypeDescriptor(column_type=ColumnType.INT),
        "id_post": TableScalarColumnTypeDescriptor(column_type=ColumnType.TEXT)
    },
    # Define the primary key for the table.
    # In this case, the table uses a compound primary key.
    primary_key=TablePrimaryKeyDescriptor(
        partition_by=["id_usuario"],
        partition_sort={
            #"id_usuario" : SortMode.ASCENDING,
            "id_post" : SortMode.ASCENDING
        }
    ),
)

table = database.create_table(
    TABELA_CURTIDAS,
    definition=table_definition,
)