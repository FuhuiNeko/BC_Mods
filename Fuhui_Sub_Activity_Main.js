(function() {
    'use strict';
    // Bondage Club Mod Development Kit (1.1.0)
	// For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
	/** @type {ModSDKGlobalAPI} */
	var bcModSdk=function(){"use strict";const e="1.1.0";function o(e){alert("Mod ERROR:\n"+e);const o=new Error(e);throw console.error(o),o}const t=new TextEncoder;function n(e){return!!e&&"object"==typeof e&&!Array.isArray(e)}function r(e){const o=new Set;return e.filter((e=>!o.has(e)&&o.add(e)))}const i=new Map,a=new Set;function d(e){a.has(e)||(a.add(e),console.warn(e))}function s(e){const o=[],t=new Map,n=new Set;for(const r of p.values()){const i=r.patching.get(e.name);if(i){o.push(...i.hooks);for(const[o,a]of i.patches.entries())t.has(o)&&t.get(o)!==a&&d(`ModSDK: Mod '${r.name}' is patching function ${e.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${o}\nPatch1:\n${t.get(o)||""}\nPatch2:\n${a}`),t.set(o,a),n.add(r.name)}}o.sort(((e,o)=>o.priority-e.priority));const r=function(e,o){if(0===o.size)return e;let t=e.toString().replaceAll("\r\n","\n");for(const[n,r]of o.entries())t.includes(n)||d(`ModSDK: Patching ${e.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(e.original,t);let i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,e.name,n),d=r.apply(this,o);return null==a||a(),d};for(let t=o.length-1;t>=0;t--){const n=o[t],r=i;i=function(o){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,e.name,n.mod),d=n.hook.apply(this,[o,e=>{if(1!==arguments.length||!Array.isArray(o))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof e}`);return r.call(this,e)}]);return null==a||a(),d}}return{hooks:o,patches:t,patchesSources:n,enter:i,final:r}}function c(e,o=!1){let r=i.get(e);if(r)o&&(r.precomputed=s(r));else{let o=window;const a=e.split(".");for(let t=0;t<a.length-1;t++)if(o=o[a[t]],!n(o))throw new Error(`ModSDK: Function ${e} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const d=o[a[a.length-1]];if("function"!=typeof d)throw new Error(`ModSDK: Function ${e} to be patched not found`);const c=function(e){let o=-1;for(const n of t.encode(e)){let e=255&(o^n);for(let o=0;o<8;o++)e=1&e?-306674912^e>>>1:e>>>1;o=o>>>8^e}return((-1^o)>>>0).toString(16).padStart(8,"0").toUpperCase()}(d.toString().replaceAll("\r\n","\n")),l={name:e,original:d,originalHash:c};r=Object.assign(Object.assign({},l),{precomputed:s(l),router:()=>{},context:o,contextProperty:a[a.length-1]}),r.router=function(e){return function(...o){return e.precomputed.enter.apply(this,[o])}}(r),i.set(e,r),o[r.contextProperty]=r.router}return r}function l(){const e=new Set;for(const o of p.values())for(const t of o.patching.keys())e.add(t);for(const o of i.keys())e.add(o);for(const o of e)c(o,!0)}function f(){const e=new Map;for(const[o,t]of i)e.set(o,{name:o,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((e=>e.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return e}const p=new Map;function u(e){p.get(e.name)!==e&&o(`Failed to unload mod '${e.name}': Not registered`),p.delete(e.name),e.loaded=!1,l()}function g(e,t,r){"string"==typeof e&&"string"==typeof t&&(alert(`Mod SDK warning: Mod '${e}' is registering in a deprecated way.\nIt will work for now, but please inform author to update.`),e={name:e,fullName:e,version:t},t={allowReplace:!0===r}),e&&"object"==typeof e||o("Failed to register mod: Expected info object, got "+typeof e),"string"==typeof e.name&&e.name||o("Failed to register mod: Expected name to be non-empty string, got "+typeof e.name);let i=`'${e.name}'`;"string"==typeof e.fullName&&e.fullName||o(`Failed to register mod ${i}: Expected fullName to be non-empty string, got ${typeof e.fullName}`),i=`'${e.fullName} (${e.name})'`,"string"!=typeof e.version&&o(`Failed to register mod ${i}: Expected version to be string, got ${typeof e.version}`),e.repository||(e.repository=void 0),void 0!==e.repository&&"string"!=typeof e.repository&&o(`Failed to register mod ${i}: Expected repository to be undefined or string, got ${typeof e.version}`),null==t&&(t={}),t&&"object"==typeof t||o(`Failed to register mod ${i}: Expected options to be undefined or object, got ${typeof t}`);const a=!0===t.allowReplace,d=p.get(e.name);d&&(d.allowReplace&&a||o(`Refusing to load mod ${i}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(d));const s=e=>{"string"==typeof e&&e||o(`Mod ${i} failed to patch a function: Expected function name string, got ${typeof e}`);let t=g.patching.get(e);return t||(t={hooks:[],patches:new Map},g.patching.set(e,t)),t},f={unload:()=>u(g),hookFunction:(e,t,n)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);"number"!=typeof t&&o(`Mod ${i} failed to hook function '${e}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&o(`Mod ${i} failed to hook function '${e}': Expected hook function, got ${typeof n}`);const a={mod:g.name,priority:t,hook:n};return r.hooks.push(a),l(),()=>{const e=r.hooks.indexOf(a);e>=0&&(r.hooks.splice(e,1),l())}},patchFunction:(e,t)=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);const r=s(e);n(t)||o(`Mod ${i} failed to patch function '${e}': Expected patches object, got ${typeof t}`);for(const[n,a]of Object.entries(t))"string"==typeof a?r.patches.set(n,a):null===a?r.patches.delete(n):o(`Mod ${i} failed to patch function '${e}': Invalid format of patch '${n}'`);l()},removePatches:e=>{g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`);s(e).patches.clear(),l()},callOriginal:(e,t,n)=>(g.loaded||o(`Mod ${i} attempted to call SDK function after being unloaded`),"string"==typeof e&&e||o(`Mod ${i} failed to call a function: Expected function name string, got ${typeof e}`),Array.isArray(t)||o(`Mod ${i} failed to call a function: Expected args array, got ${typeof t}`),function(e,o,t=window){return c(e).original.apply(t,o)}(e,t,n)),getOriginalHash:e=>("string"==typeof e&&e||o(`Mod ${i} failed to get hash: Expected function name string, got ${typeof e}`),c(e).originalHash)},g={name:e.name,fullName:e.fullName,version:e.version,repository:e.repository,allowReplace:a,api:f,loaded:!0,patching:new Map};return p.set(e.name,g),Object.freeze(f)}function h(){const e=[];for(const o of p.values())e.push({name:o.name,fullName:o.fullName,version:o.version,repository:o.repository});return e}let m;const y=function(){if(void 0===window.bcModSdk)return window.bcModSdk=function(){const o={version:e,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:f,errorReporterHooks:Object.seal({hookEnter:null,hookChainExit:null})};return m=o,Object.freeze(o)}();if(n(window.bcModSdk)||o("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&o(`Failed to init Mod SDK: Different version already loaded ('1.1.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==e&&(alert(`Mod SDK warning: Loading different but compatible versions ('1.1.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk.version.startsWith("1.0.")&&void 0===window.bcModSdk._shim10register)){const e=window.bcModSdk,o=Object.freeze(Object.assign(Object.assign({},e),{registerMod:(o,t,n)=>o&&"object"==typeof o&&"string"==typeof o.name&&"string"==typeof o.version?e.registerMod(o.name,o.version,"object"==typeof t&&!!t&&!0===t.allowReplace):e.registerMod(o,t,n),_shim10register:!0}));window.bcModSdk=o}return window.bcModSdk}();return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

	const mod = bcModSdk.registerMod({
		name: '浮绘的mod - Sub Activity',
		fullName: '浮绘的mod - Sub Activity',
		version: '0.0.1',
		repository: 'https://github.com/FuhuiNeko/BC_Mods/',
	});

    // 代码里一些函数是从这里来的喵 (应该说大部分喵...咱只是填了自己想的动作 感谢作者喵~) https://gitlab.com/Echo_87150/activity

    const CustomImages = new Map();
    const ACT_Path = "Assets/Female3DCG/Activity/"
    const ACT_Ext = ".png"

    //图片替换喵
    mod.hookFunction("DrawImageResize", 1, (args, next) => {
        var path = args[0];
        if (!!path && path.indexOf("FHMods_") > -1) {
            var activityName = path.substring(path.indexOf("FHMods_"));
            activityName = activityName.substring(0, activityName.indexOf(".png"))
            if (CustomImages.has(activityName))
                args[0] = CustomImages.get(activityName);
        }
        return next(args);
    });

    //发送替换喵
    mod.hookFunction("ServerSend", 10, (args, next) => {
        if (args[0] == "ChatRoomChat" && args[1]?.Type == "Activity") {
            let data = args[1];
            let actName = data.Dictionary[3]?.ActivityName ?? "";
            if (actName.indexOf("FHMods_") == 0) {
                // 拦截自定义活动的发送并执行自定义操作
                let { metadata, substitutions } = ChatRoomMessageRunExtractors(data, Player)
                let msg = ActivityDictionaryText(data.Content);
                msg = CommonStringSubstitute(msg, substitutions ?? [])
                data.Dictionary.push({
                    Tag: "MISSING ACTIVITY DESCRIPTION FOR KEYWORD " + data.Content,
                    Text: msg
                });
            }
        }

        return next(args);
    });

    //载入的一些函数喵?
    function addActivityEntry(activityName, label, description) {
        ActivityDictionary.push([`ActivityAct_${activityName}`, activityName]);
        ActivityDictionary.push([`Label-Chat${label}`, activityName]);
        ActivityDictionary.push([`Chat${label}`, description]);
    }

    function addAccAction1(actionName, target, bodyPart, group, actionText, image, imageName) {
        addActivityEntry(actionName, `${target}-${bodyPart}-${group}`, actionText);
        CustomImages.set(`${group}`, `${image}${imageName}${ACT_Ext}`);
    }

    function addAccAction2(actionName, bodyPart, group, selfText, otherText, image, imageName) {
        addActivityEntry(actionName, `Self-${bodyPart}-${group}`, selfText);
        addActivityEntry(actionName, `Other-${bodyPart}-${group}`, otherText);
        CustomImages.set(`${group}`, `${image}${imageName}${ACT_Ext}`);
    }
    
    var activitiesAll = [
        //头部
        { Name: "FHMods_蹭脸", Target: ["ItemHead"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_微微点头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_微微摇头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_身体颤抖着点头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_身体颤抖着摇头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_看向它", Target: ["ItemHead"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //鼻子
        { Name: "FHMods_呼吸渐渐紊乱", Target: [], TargetSelf: ["ItemNose"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_呼吸渐渐恢复", Target: [], TargetSelf: ["ItemNose"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //嘴
        { Name: "FHMods_轻轻的喘气", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_面色潮红的喘气", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_嘟囔着想说什么", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsGagged"] },

        //耳朵
        { Name: "FHMods_抖抖耳朵1", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_抖抖耳朵2", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_轻轻的晃动耳朵", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_用手摸耳朵", Target: ["ItemEars"], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseHands"], },

        //脖子
        { Name: "FHMods_蹭脖子", Target: ["ItemNeck"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_缩脖子", Target: [], TargetSelf: ["ItemNeck"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_歪头并表达疑惑", Target: [], TargetSelf: ["ItemNeck"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //胸部
        { Name: "FHMods_蹭乳房", Target: ["ItemBreast"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },

        //身体
        { Name: "FHMods_扭动身子", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseTorso"] },
        { Name: "FHMods_活动四肢", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_兴奋的扭动身子", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },

        //手臂
        { Name: "FHMods_蹭手臂", Target: ["ItemArms"], TargetSelf: ["ItemArms"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_用鼻子蹭手臂", Target: [], TargetSelf: ["ItemArms"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //手
        { Name: "FHMods_蹭手", Target: ["ItemHands"], TargetSelf: ["ItemHands"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_用鼻子蹭手", Target: [], TargetSelf: ["ItemHands"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //脚
        { Name: "FHMods_蹭脚", Target: ["ItemBoots"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
    ];
    
    //图暂时还没替换喵 抱歉x
    mod.hookFunction("LoginResponse",5, (args, next) => {
        //头部
        addAccAction1("蹭脸", "Other", "ItemHead", "FHMods_蹭脸", "SourceCharacter用脸蹭了蹭TargetCharacter的脸.", ACT_Path, "Kiss");
        addAccAction1("微微点头", "Self", "ItemHead", "FHMods_微微点头", "SourceCharacter微微的点了点头.", ACT_Path, "Kiss");
        addAccAction1("微微摇头", "Self", "ItemHead", "FHMods_微微摇头", "SourceCharacter微微的摇了摇头.", ACT_Path, "Kiss");
        addAccAction1("身体颤抖点头", "Self", "ItemHead", "FHMods_身体颤抖着点头", "SourceCharacter浑身颤抖的点了点头.", ACT_Path, "Kiss");
        addAccAction1("身体颤抖摇头", "Self", "ItemHead", "FHMods_身体颤抖着摇头", "SourceCharacter浑身颤抖的摇了摇头.", ACT_Path, "Kiss");
        addAccAction1("看向它", "Other", "ItemHead", "FHMods_看向它", "SourceCharacter看向了TargetCharacter.", ACT_Path, "Kiss");
        
        //鼻子
        addAccAction1("呼吸渐渐紊乱", "Self", "ItemNose", "FHMods_呼吸渐渐紊乱", "SourceCharacter呼吸渐渐的开始变得紊乱了起来.", ACT_Path, "Kiss");
        addAccAction1("呼吸渐渐恢复", "Self", "ItemNose", "FHMods_呼吸渐渐恢复", "SourceCharacter呼吸渐渐的回到了平时的状态.", ACT_Path, "Kiss");

        //嘴
        addAccAction1("轻轻的喘气", "Self", "ItemMouth", "FHMods_轻轻的喘气", "SourceCharacter轻轻的喘着气.", ACT_Path, "Kiss");
        addAccAction1("面色潮红的喘气", "Self", "ItemMouth", "FHMods_面色潮红的喘气", "SourceCharacter因为快感而面色潮红的喘着的粗气.", ACT_Path, "Kiss");
        addAccAction1("嘟囔着想说什么", "Self", "ItemMouth", "FHMods_嘟囔着想说什么", "SourceCharacter嘟囔着似乎想说什么.", ACT_Path, "Kiss");

        //耳朵
        addAccAction1("抖抖耳朵1", "Self", "ItemEars", "FHMods_抖抖耳朵1", "SourceCharacter晃了晃PronounPossessive那对毛茸茸的耳朵.", ACT_Path, "Kiss");
        addAccAction1("抖抖耳朵2", "Self", "ItemEars", "FHMods_抖抖耳朵2", "SourceCharacter摇了摇PronounPossessive那对软乎乎的耳朵.", ACT_Path, "Kiss");
        addAccAction1("轻轻的晃动耳朵", "Self", "ItemEars", "FHMods_轻轻的晃动耳朵", "SourceCharacter轻轻的摇晃着PronounPossessive那对软乎乎的耳朵.", ACT_Path, "Kiss");
        addAccAction2("用手摸耳朵", "ItemEars", "FHMods_用手摸耳朵", "SourceCharacter用手摸了下PronounPossessive的耳朵.", "SourceCharacter用手摸了下TargetCharacter的耳朵.", ACT_Path, "Wiggle");
        
        //脖子
        addAccAction1("蹭脖子", "Other", "ItemNeck", "FHMods_蹭脖子", "SourceCharacter用脸蹭了蹭TargetCharacter的脖子.", ACT_Path, "Kiss");
        addAccAction1("缩脖子", "Self", "ItemNeck", "FHMods_缩脖子", "SourceCharacter缩了下PronounPossessive的脖子.", ACT_Path, "Kiss");
        addAccAction1("歪头并表达疑惑", "Self", "ItemNeck", "FHMods_歪头并表达疑惑", "SourceCharacter歪着头看起来有些疑惑.", ACT_Path, "Kiss");

        //胸部
        addAccAction1("蹭乳房", "Other", "ItemBreast", "FHMods_蹭乳房", "SourceCharacter蹭了蹭TargetCharacter的双乳.", ACT_Path, "Wiggle");

        //身体
        addAccAction1("扭动身子", "Self", "ItemTorso", "FHMods_扭动身子", "SourceCharacter稍微活动了下PronounPossessive的身体.", ACT_Path, "Wiggle");
        addAccAction1("活动四肢", "Self", "ItemTorso", "FHMods_活动四肢", "SourceCharacter稍微活动了下PronounPossessive的四肢.", ACT_Path, "Wiggle");
        addAccAction1("兴奋的扭动身子", "Self", "ItemTorso", "FHMods_兴奋的扭动身子", "SourceCharacter看起来有些兴奋并扭动着PronounPossessive的身体.", ACT_Path, "Wiggle");

        //手臂
        addAccAction2("蹭手臂", "ItemArms", "FHMods_蹭手臂", "SourceCharacter蹭了蹭PronounPossessive的手臂.", "SourceCharacter蹭了蹭TargetCharacter的手臂.", ACT_Path, "Wiggle");
        addAccAction1("用鼻子蹭手臂", "Self", "ItemArms", "FHMods_用鼻子蹭手臂", "SourceCharacter用鼻子蹭了蹭TargetCharacter的手臂.", ACT_Path, "Wiggle");

        //手
        addAccAction2("蹭手", "ItemHands", "FHMods_蹭手", "SourceCharacter蹭了蹭PronounPossessive的手.", "SourceCharacter蹭了蹭TargetCharacter的手.", ACT_Path, "Wiggle");
        addAccAction1("用鼻子蹭手", "Other", "ItemHands", "FHMods_用鼻子蹭手", "SourceCharacter用鼻子蹭了蹭TargetCharacter的手.", ACT_Path, "Wiggle");

        //脚
        addAccAction1("蹭脚", "Other", "ItemBoots", "FHMods_蹭脚", "SourceCharacter蹭了蹭TargetCharacter的脚.", ACT_Path, "Wiggle");

        next(args);
    });

    activitiesAll.forEach((activity) => {
        ActivityFemale3DCG.push(activity);
        ActivityFemale3DCGOrdering.push(activity.Name);
    });
})();