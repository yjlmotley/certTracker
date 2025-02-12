import smtplib
from email.message import EmailMessage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

MAIL_SERVER = "smtp.gmail.com"

MAIL_PORT = 465
MAIL_USE_TLS = True
MAIL_USERNAME = os.getenv("GMAIL")
MAIL_PASSWORD = os.getenv("GMAIL_PASSWORD")


def send_email(recipient, body, subject):
    try:
        with smtplib.SMTP_SSL(MAIL_SERVER, MAIL_PORT) as server:
            server.login(MAIL_USERNAME, MAIL_PASSWORD)

           # Create message container
            msg = MIMEMultipart('alternative')
            msg["Subject"] = subject
            msg["From"] = MAIL_USERNAME
            msg["To"] = recipient
            
            # Add HTML content
            html_part = MIMEText(body, 'html')
            msg.attach(html_part)
            
            # Send email
            server.send_message(msg)
    except Exception as e:  # Catch all exceptions to get better error reporting
        print(f"Error sending email: {str(e)}")  # Add this for debugging
        raise Exception(f"Failed to send email: {str(e)}")
