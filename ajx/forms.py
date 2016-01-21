#coding:utf8
from django import forms
from models import *

class MadeOrderForm(forms.ModelForm):

	class Meta:
		model = MadeOrder