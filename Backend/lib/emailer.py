import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from models.user import User
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

async def send_email(user_email: str, medicine_name: str, medicine_amount: int):
    msg = MIMEMultipart()
    msg['From'] = 'wellnesslink.cpsc571@outlook.com'
    msg['To'] = user_email
    msg['Subject'] = f'Running low on {medicine_name}!'
    body = f"Hey! You are running low on {medicine_name}. You have {medicine_amount} left. Please refill your prescription soon!"
    msg.attach(MIMEText(body, 'plain'))
    

    with smtplib.SMTP('smtp-mail.outlook.com', 587) as server:  # Example: 'smtp.gmail.com'
        server.starttls()  # Secure the connection
        server.login(msg['From'], "J3lly22F15h")
        text = msg.as_string()
        server.sendmail(msg['From'], msg['To'], text)


# msg = MIMEMultipart()
# msg['From'] = 'wellnesslink.cpsc571@outlook.com'
# msg['To'] = 'elbouni.wassem@gmail.com'
# msg['Subject'] = 'Test Email'
# body = "Hey man! What's up?"
# msg.attach(MIMEText(body, 'plain'))






# scheduler = AsyncIOScheduler()


# scheduler.add_job(send_email, 'cron', hour=6)


