from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from io import BytesIO
from uuid import uuid4
import os

from database import database, engine, metadata
from models import forms

# Create tables
metadata.create_all(bind=engine)

app = FastAPI()

# Connect/disconnect DB on startup/shutdown

@app.get("/list-forms/")
async def list_forms():
    query = forms.select()
    results = await database.fetch_all(query)
    return [{"file_id": r["file_id"], "form_html_preview": r["form_html"][:100]} for r in results]


@app.on_event("startup")
async def connect_db():
    await database.connect()

@app.on_event("shutdown")
async def disconnect_db():
    await database.disconnect()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class HTMLForm(BaseModel):
    form_html: str

class HTMLContent(BaseModel):
    html_content: str

# Save to DB
@app.post("/save-form/")
async def save_form(data: HTMLForm):
    file_id = str(uuid4())[:8]

    query = forms.insert().values(file_id=file_id, form_html=data.form_html)
    await database.execute(query)

    return {"message": "Form saved to DB", "file_id": file_id}

# Download from DB
@app.get("/download-form/{file_id}")
async def download_form(file_id: str):
    query = forms.select().where(forms.c.file_id == file_id)
    result = await database.fetch_one(query)

    if result is None:
        raise HTTPException(status_code=404, detail="Form not found")

    content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Saved Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-gray-50">
{result['form_html']}
</body>
</html>"""

    buffer = BytesIO(content.encode("utf-8"))
    return StreamingResponse(buffer, media_type="text/html", headers={
        "Content-Disposition": f"attachment; filename=form_{file_id}.html"
    })

# Optional: direct download endpoint
@app.post("/api/download")
async def download_form_direct(data: HTMLContent):
    content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="p-6 bg-gray-50">
{data.html_content}
</body>
</html>"""

    buffer = BytesIO(content.encode("utf-8"))
    return StreamingResponse(buffer, media_type="text/html", headers={
        "Content-Disposition": "attachment; filename=form.html"
    })
