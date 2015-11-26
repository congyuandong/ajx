#coding:utf-8
from django.db import models
from DjangoUeditor.models import UEditorField
from django.conf import settings

SEX_CHOICES =(
	(0,u'男'),
	(1,u'女'),
	)

class UserInfo(models.Model):
	account = models.CharField(max_length = 50, verbose_name = '账户')
	password = models.CharField(max_length = 20, verbose_name = '密码', null = True, blank = True)
	phone = models.CharField(max_length = 20, verbose_name = '手机号码', null = True, blank = True)
	email = models.CharField(max_length = 50, verbose_name = '邮箱', null = True, blank = True)
	nick = models.CharField(max_length = 50, verbose_name = '昵称', null = True, blank = True)
	sex = models.IntegerField(default=0,verbose_name='性别',choices=SEX_CHOICES)
	birthday = models.DateField(verbose_name='生日', null = True, blank = True)
	avater = models.ImageField(upload_to ='avater/',verbose_name='头像', null = True, blank = True)
	authid = models.CharField(max_length = 200, verbose_name = '第三方登录ID', null = True, blank = True)

	def __unicode__(self):
		return self.account

	class Meta:
		verbose_name = '用户'
		verbose_name_plural = '用户管理'
