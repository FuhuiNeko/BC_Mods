// ==UserScript==
// @name         浮绘的 mod 加载 - RoomMusic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  浮绘的 mod! 房间内点歌插件(仅网易云),需要在电脑上使用!手机上是达咩的! 而且需要在目标电脑装上前置: https://neteasecloudmusicapi.js.org/
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
        url: 'https://github.com/FuhuiNeko/BC_Mods/raw/main/Fuhui_RoomMusic_Main.js?t=' + new Date().getTime(),
        onload: function (response) {
            if (response.status == 200) {
                let script = document.createElement('script')
                script.textContent = response.responseText;
                document.head.appendChild(script);
                console.log('Fuhui - RoomMusic - 加载完成喵!');
            } else { 
                console.error('Fuhui - RoomMusic - 加载失败喵!', response.status, response.statusText); 
            }
        },onerror: function (error) { 
            console.error('Fuhui - RoomMusic - 加载时发生了错误喵...', error); 
        }
    });
})();