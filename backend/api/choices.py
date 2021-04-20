from django.utils.translation import gettext_lazy as _

PUBLISHED = 1
HIDDEN = 2

PUBLICATION_TYPE = [
    (PUBLISHED, _('published')),
    (HIDDEN, _('hidden'))
]