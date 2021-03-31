from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives

default_message_title = 'Attractor school'


class MailSender:
    def __init__(self, text, to: list, sender=settings.SENDER_EMAIL, title=default_message_title, html_text=''):
        self.title = title
        self.text = text
        self.sender = sender
        self.html_text = html_text
        self.to = to

    def send_mail(self):
        """Method to sending mail to users"""
        EmailMessage(
            subject=self.title,
            body=self.text,
            from_email=self.sender,
            to=self.to
        ).send()

    def send_alternative_email(self):
        # create the email, and attach the HTML version as well.
        msg = EmailMultiAlternatives(
            subject=self.title,
            body=self.text,
            from_email=self.sender,
            to=self.to
        )
        msg.attach_alternative(
            self.html_text,
            'text/html')
        msg.send()