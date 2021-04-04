from django.utils.translation import gettext_lazy as _

DRAFT = 1
PUBLISHED = 2
HIDDEN = 3

PUBLICATION_TYPE = [
    (DRAFT, _('draft')),
    (PUBLISHED, _('published')),
    (HIDDEN, _('hidden'))
]