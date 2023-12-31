// ==UserScript==
// @name         浮绘的 mod 加载 - Sub Activity
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  浮绘的 mod! 一些自己写的sub类的动作 (大概喵)
// @author       FuhuiNeko
// @match https://bondageprojects.elementfx.com/*
// @match https://www.bondageprojects.elementfx.com/*
// @match https://bondage-europe.com/*
// @match https://www.bondage-europe.com/*
// @match http://localhost:*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bondage-europe.com
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://github.com/FuhuiNeko/BC_Mods/raw/main/Fuhui_Sub_Activity_Main.js?t=' + new Date().getTime(),
        onload: function (response) {
            if (response.status == 200) {
                let script = document.createElement('script')
                script.textContent = response.responseText;
                document.head.appendChild(script);
                console.log('Fuhui - Sub Activity - 加载完成喵!');
            } else { 
                console.error('Fuhui - Sub Activity - 加载失败喵!', response.status, response.statusText); 
            }
        },onerror: function (error) { 
            console.error('Fuhui - Sub Activity - 加载时发生了错误喵...', error); 
        }
    });
})();