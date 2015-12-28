(function(doc){
var $ = function(id) { return doc.getElementById(id); };
var placeholder = '请填写手机号或邮箱';//divcss5提示： 修改默认显示文字需要与Html表单默认文字对应
var inputname = $('user_account');

    inputname.onfocus = function(){
      if ( this.value == placeholder ) {
        this.value = '';
        this.style.color = '#5d5d5d';
      }
    };
    inputname.onblur = function(){
      if (!this.value) {
        this.value = placeholder;
        this.style.color = '#999';
      }
    };

  if (inputname.value == placeholder) {
    inputname.style.color = '#999';
  }


})(document);