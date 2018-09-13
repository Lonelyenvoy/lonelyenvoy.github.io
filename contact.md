---
layout: page
title: "Contact"
subtitle: "留言"
description: "联系博主"  
header-img: "img/blue.jpg"  
---

<div class="form-element" id="anonymousDiv">
    <input id="anonymous" type="checkbox" /><label for="anonymous">&nbsp;匿名</label>
</div>
<div class="form-element">
    <input class="field" id="nickname" placeholder="您的昵称" />
</div>
<div class="form-element">
    <input class="field" id="contact" placeholder="联系方式（邮箱/微信/QQ/手机等）" />
</div>
<div class="form-element">
    <textarea class="field field-textarea" id="content" placeholder="您想说的话" rows="4"></textarea>
</div>
<div class="hint">您的留言不会公开显示；如果您选择匿名，我将无法回复您的留言。</div>
<button class="form-element" id="submit">提交</button>

<div id="submitting" class="submit-info" style="display:none;color:blue"><p>正在提交，请稍候...</p></div>
<div id="submit-succ" class="submit-info" style="display:none;color:green"><p>提交成功，感谢您的留言</p></div>
<div id="submit-fail" class="submit-info" style="display:none;color:red"><p>提交失败，请稍后重试</p></div>

<style>
    .form-element, .hint, .submit-info {
        margin: 10px;
    }

    .hint {
        color: lightsteelblue;
        font-size: small;
    }

    .field {
        width: 100%;
    }

    .field-textarea {
        resize: vertical;
    }

</style>

<script>
    (function() {
        'use strict';
        var anonymousDiv = document.getElementById('anonymousDiv');
        var anonymousCheckbox = document.getElementById('anonymous');
        var nicknameInput = document.getElementById('nickname');
        var contactInput = document.getElementById('contact');
        var contentTextarea = document.getElementById('content');
        var submitButton = document.getElementById('submit');
        var submittingMsg = document.getElementById('submitting');
        var submitSuccessfulMsg = document.getElementById('submit-succ');
        var submitFailedMsg = document.getElementById('submit-fail');

        window.onload = function () {
            anonymousDiv.onclick = function () {
                if (anonymousCheckbox.checked) {
                    nicknameInput.style.display = 'none';
                    contactInput.style.display = 'none';
                } else {
                    nicknameInput.style.display = '';
                    contactInput.style.display = '';
                }
            }
            submitButton.onclick = function () {
                submit(nicknameInput.value, contactInput.value, contentTextarea.value);
            }
        }
        function submit(nickname, contact, content) {
            // show submitting msg
            showSubmittingMsg();

            // send ip info to Bmob
            var submitInfo = {
                'nickname': nickname,
                'contact': contact,
                'content': content
            };

            // update DB
            var Feedback = Bmob.Object.extend('Feedback');
            var feedback = new Feedback();
            for (var key in submitInfo) {
                feedback.set(key, submitInfo[key]);
            }
            feedback.save(null, {
                success: function () {
                    hideSubmittingMsg();
                    showSubmitSuccessfulMsg();
                    clearInputs();
                },
                error: function () {
                    hideSubmittingMsg();
                    showSubmitFailedMsg();
                    console.log('Error occured when submitting feedback');
                }
            })
        }
        function showSubmittingMsg() {
            submittingMsg.style.display = '';
        }
        function hideSubmittingMsg() {
            submittingMsg.style.display = 'none';
        }
        function showSubmitSuccessfulMsg() {
            submitSuccessfulMsg.style.display = '';
        }
        function showSubmitFailedMsg() {
            submitFailedMsg.style.display = '';
        }
        function clearInputs() {
            nicknameInput.value = '';
            contactInput.value = '';
            contentTextarea.value = '';
        }
    })();
    
</script>