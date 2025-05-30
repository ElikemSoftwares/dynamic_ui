from datetime import datetime

def log_event(event_type: str, details: dict):
    with open("track_log.txt", "a") as log_file:
        log_file.write(f"{datetime.now()} | {event_type.upper()} | {details}\n")
