# models.py

from sqlalchemy import Table, Column, String, MetaData
from database import metadata  # must be shared metadata if you're using it in main.py

forms = Table(
    "forms",
    metadata,
    Column("file_id", String, primary_key=True),
    Column("form_html", String),
)
