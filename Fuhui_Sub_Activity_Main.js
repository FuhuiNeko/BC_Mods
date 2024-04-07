// @note         0.1 第一版 一些蹭 ()
// @note         0.2 给一些动作限定条件,增加一些马娘的动作 (当然还不够完善)
// @note         0.3 顺毛 ()
(function() {
    'use strict';
    // Bondage Club Mod Development Kit (1.2.0)
    // For more info see: https://github.com/Jomshir98/bondage-club-mod-sdk
    /** @type {ModSDKGlobalAPI} */
    var bcModSdk=function(){"use strict";const o="1.2.0";function e(o){alert("Mod ERROR:\n"+o);const e=new Error(o);throw console.error(e),e}const t=new TextEncoder;function n(o){return!!o&&"object"==typeof o&&!Array.isArray(o)}function r(o){const e=new Set;return o.filter((o=>!e.has(o)&&e.add(o)))}const i=new Map,a=new Set;function c(o){a.has(o)||(a.add(o),console.warn(o))}function s(o){const e=[],t=new Map,n=new Set;for(const r of f.values()){const i=r.patching.get(o.name);if(i){e.push(...i.hooks);for(const[e,a]of i.patches.entries())t.has(e)&&t.get(e)!==a&&c(`ModSDK: Mod '${r.name}' is patching function ${o.name} with same pattern that is already applied by different mod, but with different pattern:\nPattern:\n${e}\nPatch1:\n${t.get(e)||""}\nPatch2:\n${a}`),t.set(e,a),n.add(r.name)}}e.sort(((o,e)=>e.priority-o.priority));const r=function(o,e){if(0===e.size)return o;let t=o.toString().replaceAll("\r\n","\n");for(const[n,r]of e.entries())t.includes(n)||c(`ModSDK: Patching ${o.name}: Patch ${n} not applied`),t=t.replaceAll(n,r);return(0,eval)(`(${t})`)}(o.original,t);let i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookChainExit)||void 0===i?void 0:i.call(t,o.name,n),c=r.apply(this,e);return null==a||a(),c};for(let t=e.length-1;t>=0;t--){const n=e[t],r=i;i=function(e){var t,i;const a=null===(i=(t=m.errorReporterHooks).hookEnter)||void 0===i?void 0:i.call(t,o.name,n.mod),c=n.hook.apply(this,[e,o=>{if(1!==arguments.length||!Array.isArray(e))throw new Error(`Mod ${n.mod} failed to call next hook: Expected args to be array, got ${typeof o}`);return r.call(this,o)}]);return null==a||a(),c}}return{hooks:e,patches:t,patchesSources:n,enter:i,final:r}}function l(o,e=!1){let r=i.get(o);if(r)e&&(r.precomputed=s(r));else{let e=window;const a=o.split(".");for(let t=0;t<a.length-1;t++)if(e=e[a[t]],!n(e))throw new Error(`ModSDK: Function ${o} to be patched not found; ${a.slice(0,t+1).join(".")} is not object`);const c=e[a[a.length-1]];if("function"!=typeof c)throw new Error(`ModSDK: Function ${o} to be patched not found`);const l=function(o){let e=-1;for(const n of t.encode(o)){let o=255&(e^n);for(let e=0;e<8;e++)o=1&o?-306674912^o>>>1:o>>>1;e=e>>>8^o}return((-1^e)>>>0).toString(16).padStart(8,"0").toUpperCase()}(c.toString().replaceAll("\r\n","\n")),d={name:o,original:c,originalHash:l};r=Object.assign(Object.assign({},d),{precomputed:s(d),router:()=>{},context:e,contextProperty:a[a.length-1]}),r.router=function(o){return function(...e){return o.precomputed.enter.apply(this,[e])}}(r),i.set(o,r),e[r.contextProperty]=r.router}return r}function d(){for(const o of i.values())o.precomputed=s(o)}function p(){const o=new Map;for(const[e,t]of i)o.set(e,{name:e,original:t.original,originalHash:t.originalHash,sdkEntrypoint:t.router,currentEntrypoint:t.context[t.contextProperty],hookedByMods:r(t.precomputed.hooks.map((o=>o.mod))),patchedByMods:Array.from(t.precomputed.patchesSources)});return o}const f=new Map;function u(o){f.get(o.name)!==o&&e(`Failed to unload mod '${o.name}': Not registered`),f.delete(o.name),o.loaded=!1,d()}function g(o,t){o&&"object"==typeof o||e("Failed to register mod: Expected info object, got "+typeof o),"string"==typeof o.name&&o.name||e("Failed to register mod: Expected name to be non-empty string, got "+typeof o.name);let r=`'${o.name}'`;"string"==typeof o.fullName&&o.fullName||e(`Failed to register mod ${r}: Expected fullName to be non-empty string, got ${typeof o.fullName}`),r=`'${o.fullName} (${o.name})'`,"string"!=typeof o.version&&e(`Failed to register mod ${r}: Expected version to be string, got ${typeof o.version}`),o.repository||(o.repository=void 0),void 0!==o.repository&&"string"!=typeof o.repository&&e(`Failed to register mod ${r}: Expected repository to be undefined or string, got ${typeof o.version}`),null==t&&(t={}),t&&"object"==typeof t||e(`Failed to register mod ${r}: Expected options to be undefined or object, got ${typeof t}`);const i=!0===t.allowReplace,a=f.get(o.name);a&&(a.allowReplace&&i||e(`Refusing to load mod ${r}: it is already loaded and doesn't allow being replaced.\nWas the mod loaded multiple times?`),u(a));const c=o=>{let e=g.patching.get(o.name);return e||(e={hooks:[],patches:new Map},g.patching.set(o.name,e)),e},s=(o,t)=>(...n)=>{var i,a;const c=null===(a=(i=m.errorReporterHooks).apiEndpointEnter)||void 0===a?void 0:a.call(i,o,g.name);g.loaded||e(`Mod ${r} attempted to call SDK function after being unloaded`);const s=t(...n);return null==c||c(),s},p={unload:s("unload",(()=>u(g))),hookFunction:s("hookFunction",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);"number"!=typeof t&&e(`Mod ${r} failed to hook function '${o}': Expected priority number, got ${typeof t}`),"function"!=typeof n&&e(`Mod ${r} failed to hook function '${o}': Expected hook function, got ${typeof n}`);const s={mod:g.name,priority:t,hook:n};return a.hooks.push(s),d(),()=>{const o=a.hooks.indexOf(s);o>=0&&(a.hooks.splice(o,1),d())}})),patchFunction:s("patchFunction",((o,t)=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const i=l(o),a=c(i);n(t)||e(`Mod ${r} failed to patch function '${o}': Expected patches object, got ${typeof t}`);for(const[n,i]of Object.entries(t))"string"==typeof i?a.patches.set(n,i):null===i?a.patches.delete(n):e(`Mod ${r} failed to patch function '${o}': Invalid format of patch '${n}'`);d()})),removePatches:s("removePatches",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to patch a function: Expected function name string, got ${typeof o}`);const t=l(o);c(t).patches.clear(),d()})),callOriginal:s("callOriginal",((o,t,n)=>{"string"==typeof o&&o||e(`Mod ${r} failed to call a function: Expected function name string, got ${typeof o}`);const i=l(o);return Array.isArray(t)||e(`Mod ${r} failed to call a function: Expected args array, got ${typeof t}`),i.original.apply(null!=n?n:globalThis,t)})),getOriginalHash:s("getOriginalHash",(o=>{"string"==typeof o&&o||e(`Mod ${r} failed to get hash: Expected function name string, got ${typeof o}`);return l(o).originalHash}))},g={name:o.name,fullName:o.fullName,version:o.version,repository:o.repository,allowReplace:i,api:p,loaded:!0,patching:new Map};return f.set(o.name,g),Object.freeze(p)}function h(){const o=[];for(const e of f.values())o.push({name:e.name,fullName:e.fullName,version:e.version,repository:e.repository});return o}let m;const y=void 0===window.bcModSdk?window.bcModSdk=function(){const e={version:o,apiVersion:1,registerMod:g,getModsInfo:h,getPatchingInfo:p,errorReporterHooks:Object.seal({apiEndpointEnter:null,hookEnter:null,hookChainExit:null})};return m=e,Object.freeze(e)}():(n(window.bcModSdk)||e("Failed to init Mod SDK: Name already in use"),1!==window.bcModSdk.apiVersion&&e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`),window.bcModSdk.version!==o&&alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')\nOne of mods you are using is using an old version of SDK. It will work for now but please inform author to update`),window.bcModSdk);return"undefined"!=typeof exports&&(Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=y),y}();

	const mod = bcModSdk.registerMod({
		name: '浮绘的mod - Sub Activity',
		fullName: '浮绘的mod - Sub Activity',
		version: '0.2',
		repository: 'https://github.com/FuhuiNeko/BC_Mods/',
	});

    // 代码里一些函数是从这里来的喵 (应该说大部分喵...咱只是填了自己想的动作 感谢作者喵~) https://gitlab.com/Echo_87150/activity

    const CustomImages = new Map();
    const ACT_Path = "Assets/Female3DCG/Activity/"
    const ACT_Path_Ear = "Assets/Female3DCG/HairAccessory1/Preview/"
    const ACT_Path_Shoes = "Assets/Female3DCG/Shoes/Preview/"
    const ACT_Path_ItemMouth = "Assets/Female3DCG/ItemMouth/Preview/"
    const ACT_Path_ItemHands = "Assets/Female3DCG/ItemHands/Preview/"
    const ACT_Ext = ".png"

    //图片替换喵
    mod.hookFunction("DrawImageResize", 1, (args, next) => {
        var path = args[0];
        if (typeof path === 'string' && path.indexOf("FHMods_Sub_") > -1) {
            var activityName = path.substring(path.indexOf("FHMods_Sub_"));
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
            if (actName.indexOf("FHMods_Sub_") == 0) {
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

    //bcar
    mod.hookFunction("ActivityCheckPrerequisite", 5, (args, next) => {
        var prereqName = args[0];
        if (CustomPrerequisiteFuncs.has(prereqName)) {
            var acting = args[1];
            var acted = args[2];
            var targetGrp = args[3];
            var customPrereqFunc = CustomPrerequisiteFuncs.get(prereqName);
            if (!customPrereqFunc)
                return next(args);
            else {
                return customPrereqFunc(acting, acted, targetGrp);
            }
        }
        else
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

    //
    
    var activitiesAll = [
        //头部
        { Name: "FHMods_Sub_顺头发", Target: ["ItemHead"], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_用头蹭脸", Target: ["ItemHead"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"], },
        { Name: "FHMods_Sub_用脸蹭脸", Target: ["ItemHead"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"], },
        { Name: "FHMods_Sub_微微点头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_微微摇头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_身体颤抖着点头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_身体颤抖着摇头", Target: [], TargetSelf: ["ItemHead"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_看向它", Target: ["ItemHead"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //鼻子
        { Name: "FHMods_Sub_呼吸渐渐紊乱", Target: [], TargetSelf: ["ItemNose"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_呼吸渐渐恢复", Target: [], TargetSelf: ["ItemNose"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //嘴
        { Name: "FHMods_Sub_马娘兴奋的嘶鸣", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["HasPonyGag"] },

        { Name: "FHMods_Sub_轻轻的喘气", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_面色潮红的喘气", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_嘟囔着想说什么", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsGagged"] },
        { Name: "FHMods_Sub_慢慢的伸出舌头", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseMouth"] },
        { Name: "FHMods_Sub_兴奋的伸出舌头", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseMouth"] },
        { Name: "FHMods_Sub_失神的伸出舌头", Target: [], TargetSelf: ["ItemMouth"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseMouth"] },

        //耳朵
        { Name: "FHMods_Sub_晃耳朵", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_摇耳朵", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_轻轻的晃动耳朵", Target: [], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_用手摸耳朵", Target: ["ItemEars"], TargetSelf: ["ItemEars"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseHands"], },

        //脖子
        { Name: "FHMods_Sub_蹭脖子", Target: ["ItemNeck"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_缩脖子", Target: [], TargetSelf: ["ItemNeck"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },
        { Name: "FHMods_Sub_歪头并表达疑惑", Target: [], TargetSelf: ["ItemNeck"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //胸部
        { Name: "FHMods_Sub_用头蹭乳房", Target: ["ItemBreast"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"] },
        { Name: "FHMods_Sub_用脸蹭乳房", Target: ["ItemBreast"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"] },

        //身体
        { Name: "FHMods_Sub_扭动身子", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["UseTorso"] },
        { Name: "FHMods_Sub_活动四肢", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_兴奋的扭动身子", Target: [], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },

        { Name: "FHMods_Sub_顺毛", Target: ["ItemTorso"], TargetSelf: ["ItemTorso"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [], },

        //手臂
        { Name: "FHMods_Sub_用头蹭手臂", Target: ["ItemArms"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"], },
        { Name: "FHMods_Sub_用脸蹭手臂", Target: ["ItemArms"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"], },
        { Name: "FHMods_Sub_用鼻子蹭手臂", Target: [], TargetSelf: ["ItemArms"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["NotKneelingT"], },

        //手
        { Name: "FHMods_Sub_用头蹭手", Target: ["ItemHands"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_用脸蹭手", Target: ["ItemHands"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_用鼻子蹭手", Target: [], TargetSelf: ["ItemHands"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },

        //大腿
        { Name: "FHMods_Sub_用头蹭大腿", Target: ["ItemLegs"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_用脸蹭大腿", Target: ["ItemLegs"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },

        //小腿
        { Name: "FHMods_Sub_用头蹭小腿", Target: ["ItemFeet"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_用脸蹭小腿", Target: ["ItemFeet"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        
        //脚
        { Name: "FHMods_Sub_用头蹭脚", Target: ["ItemBoots"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_用脸蹭脚", Target: ["ItemBoots"], TargetSelf: [], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["IsKneelingSource"], },
        { Name: "FHMods_Sub_生气的跺脚", Target: [], TargetSelf: ["ItemBoots"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: [] },
        { Name: "FHMods_Sub_马娘随意的踏蹄", Target: [], TargetSelf: ["ItemBoots"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["HasPonyBoots"] },
        { Name: "FHMods_Sub_马娘兴奋的踏蹄", Target: [], TargetSelf: ["ItemBoots"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["HasPonyBoots"] },
        { Name: "FHMods_Sub_马娘不安的踏蹄", Target: [], TargetSelf: ["ItemBoots"], MaxProgress: 50, MaxProgressSelf: 50, Prerequisite: ["HasPonyBoots"] },
    ];
    
    //图暂时还没替换喵 抱歉x
    mod.hookFunction("LoginResponse",5, (args, next) => {
        //头部
        addAccAction2("顺头发", "ItemHead", "FHMods_Sub_顺头发", "SourceCharacter用梳子理了理PronounPossessive的头发.", "SourceCharacter用梳子理了理TargetCharacter的头发.", ACT_Path_ItemHands, "SpankingToysHairbrush");

        addAccAction1("头蹭脸", "Other", "ItemHead", "FHMods_Sub_用头蹭脸", "SourceCharacter用头蹭了蹭TargetCharacter的脸.", ACT_Path, "RestHead");
        addAccAction1("脸蹭脸", "Other", "ItemHead", "FHMods_Sub_用脸蹭脸", "SourceCharacter用脸蹭了蹭TargetCharacter的脸.", ACT_Path, "RestHead");
        addAccAction1("微微点头", "Self", "ItemHead", "FHMods_Sub_微微点头", "SourceCharacter微微的点了点头.", ACT_Path, "RestHead");
        addAccAction1("微微摇头", "Self", "ItemHead", "FHMods_Sub_微微摇头", "SourceCharacter微微的摇了摇头.", ACT_Path, "RestHead");
        addAccAction1("身体颤抖点头", "Self", "ItemHead", "FHMods_Sub_身体颤抖着点头", "SourceCharacter浑身颤抖的点了点头.", ACT_Path, "RestHead");
        addAccAction1("身体颤抖摇头", "Self", "ItemHead", "FHMods_Sub_身体颤抖着摇头", "SourceCharacter浑身颤抖的摇了摇头.", ACT_Path, "RestHead");
        addAccAction1("看向它", "Other", "ItemHead", "FHMods_Sub_看向它", "SourceCharacter看向了TargetCharacter.", ACT_Path, "RestHead");
        
        //鼻子
        addAccAction1("呼吸渐渐紊乱", "Self", "ItemNose", "FHMods_Sub_呼吸渐渐紊乱", "SourceCharacter的呼吸渐渐的紊乱了起来.", ACT_Path, "Bite");
        addAccAction1("呼吸渐渐恢复", "Self", "ItemNose", "FHMods_Sub_呼吸渐渐恢复", "SourceCharacter的呼吸渐渐的回到了平时的状态.", ACT_Path, "Bite");

        //嘴
        addAccAction1("马娘兴奋的嘶鸣", "Self", "ItemMouth", "FHMods_Sub_马娘兴奋的嘶鸣", "SourceCharacter兴奋的发出了嘶鸣声.", ACT_Path_ItemMouth, "PonyGag");

        addAccAction1("轻轻的喘气", "Self", "ItemMouth", "FHMods_Sub_轻轻的喘气", "SourceCharacter轻轻的喘着气.", ACT_Path, "Whisper");
        addAccAction1("面色潮红的喘气", "Self", "ItemMouth", "FHMods_Sub_面色潮红的喘气", "SourceCharacter因为快感而面色潮红的喘着的粗气.", ACT_Path, "Whisper");
        addAccAction1("嘟囔着想说什么", "Self", "ItemMouth", "FHMods_Sub_嘟囔着想说什么", "SourceCharacter嘟囔着似乎想说什么.", ACT_Path, "MoanGagTalk");
        addAccAction1("慢慢的伸出舌头", "Self", "ItemMouth", "FHMods_Sub_慢慢的伸出舌头", "SourceCharacter慢慢的伸出了PronounPossessive的舌头.", ACT_Path, "MasturbateTongue");
        addAccAction1("兴奋的伸出舌头", "Self", "ItemMouth", "FHMods_Sub_兴奋的伸出舌头", "SourceCharacter兴奋的伸出了PronounPossessive的舌头.", ACT_Path, "MasturbateTongue");
        addAccAction1("失神的伸出舌头", "Self", "ItemMouth", "FHMods_Sub_失神的伸出舌头", "SourceCharacter双目失神的伸出了PronounPossessive的舌头.", ACT_Path, "MasturbateTongue");

        //耳朵
        addAccAction1("抖抖耳朵1", "Self", "ItemEars", "FHMods_Sub_晃耳朵", "SourceCharacter晃了晃PronounPossessive的耳朵.", ACT_Path_Ear, "KittenEars2");
        addAccAction1("抖抖耳朵2", "Self", "ItemEars", "FHMods_Sub_摇耳朵", "SourceCharacter摇了摇PronounPossessive的耳朵.", ACT_Path_Ear, "KittenEars2");
        addAccAction1("轻轻的晃动耳朵", "Self", "ItemEars", "FHMods_Sub_轻轻的晃动耳朵", "SourceCharacter轻轻的晃动着PronounPossessive的耳朵.", ACT_Path_Ear, "KittenEars2");
        addAccAction2("用手摸耳朵", "ItemEars", "FHMods_Sub_用手摸耳朵", "SourceCharacter用手摸了下PronounPossessive的耳朵.", "SourceCharacter用手摸了下TargetCharacter的耳朵.", ACT_Path_Ear, "KittenEars2");
        
        //脖子
        addAccAction1("蹭脖子", "Other", "ItemNeck", "FHMods_Sub_蹭脖子", "SourceCharacter用脸蹭了蹭TargetCharacter的脖子.", ACT_Path, "RestHead");
        addAccAction1("缩脖子", "Self", "ItemNeck", "FHMods_Sub_缩脖子", "SourceCharacter缩了下PronounPossessive的脖子.", ACT_Path, "RestHead");
        addAccAction1("歪头并表达疑惑", "Self", "ItemNeck", "FHMods_Sub_歪头并表达疑惑", "SourceCharacter歪着头看起来有些疑惑.", ACT_Path, "RestHead");

        //胸部
        addAccAction1("用头蹭乳房", "Other", "ItemBreast", "FHMods_Sub_用头蹭乳房", "SourceCharacter用头蹭了蹭TargetCharacter的双乳.", ACT_Path, "Wiggle");
        addAccAction1("用脸蹭乳房", "Other", "ItemBreast", "FHMods_Sub_用脸蹭乳房", "SourceCharacter用脸蹭了蹭TargetCharacter的双乳.", ACT_Path, "Wiggle");

        //身体
        addAccAction1("扭动身子", "Self", "ItemTorso", "FHMods_Sub_扭动身子", "SourceCharacter稍微活动了下PronounPossessive的身体.", ACT_Path, "Wiggle");
        addAccAction1("活动四肢", "Self", "ItemTorso", "FHMods_Sub_活动四肢", "SourceCharacter稍微活动了下PronounPossessive的四肢.", ACT_Path, "Wiggle");
        addAccAction1("兴奋的扭动身子", "Self", "ItemTorso", "FHMods_Sub_兴奋的扭动身子", "SourceCharacter看起来有些兴奋并扭动着PronounPossessive的身体.", ACT_Path, "Wiggle");

        addAccAction2("顺毛", "ItemTorso", "FHMods_Sub_顺毛", "SourceCharacter用梳子顺了顺PronounPossessive身上的毛.", "SourceCharacter用梳子顺了顺TargetCharacter身上的毛.", ACT_Path_ItemHands, "SpankingToysHairbrush");

        //手臂
        addAccAction1("用头蹭手臂", "Other", "ItemArms", "FHMods_Sub_用头蹭手臂", "SourceCharacter用头蹭了蹭TargetCharacter的手臂.", ACT_Path, "RestHead");
        addAccAction1("用脸蹭手臂", "Other", "ItemArms", "FHMods_Sub_用脸蹭手臂", "SourceCharacter用脸蹭了蹭TargetCharacter的手臂.", ACT_Path, "RestHead");
        addAccAction1("用鼻子蹭手臂", "Self", "ItemArms", "FHMods_Sub_用鼻子蹭手臂", "SourceCharacter用鼻子蹭了蹭TargetCharacter的手臂.", ACT_Path, "RestHead");

        //手
        addAccAction1("用头蹭手", "Other", "ItemHands", "FHMods_Sub_用头蹭手", "SourceCharacter用头蹭了蹭TargetCharacter的手.", ACT_Path, "RestHead");
        addAccAction1("用脸蹭手", "Other", "ItemHands", "FHMods_Sub_用脸蹭手", "SourceCharacter用脸蹭了蹭TargetCharacter的手.", ACT_Path, "RestHead");
        addAccAction1("用鼻子蹭手", "Self", "ItemHands", "FHMods_Sub_用鼻子蹭手", "SourceCharacter用鼻子蹭了蹭TargetCharacter的手.", ACT_Path, "RestHead");

        //大腿
        addAccAction1("用头蹭大腿", "Other", "ItemLegs", "FHMods_Sub_用头蹭大腿", "SourceCharacter用头蹭了蹭TargetCharacter的大腿.", ACT_Path, "RestHead");
        addAccAction1("用脸蹭大腿", "Other", "ItemLegs", "FHMods_Sub_用脸蹭大腿", "SourceCharacter用脸蹭了蹭TargetCharacter的大腿.", ACT_Path, "RestHead");

        //小腿
        addAccAction1("用头蹭小腿", "Other", "ItemFeet", "FHMods_Sub_用头蹭小腿", "SourceCharacter用头蹭了蹭TargetCharacter的小腿.", ACT_Path, "RestHead");
        addAccAction1("用脸蹭小腿", "Other", "ItemFeet", "FHMods_Sub_用脸蹭小腿", "SourceCharacter用脸蹭了蹭TargetCharacter的小腿.", ACT_Path, "RestHead");

        //脚
        addAccAction1("用头蹭脚", "Other", "ItemBoots", "FHMods_Sub_用头蹭脚", "SourceCharacter用头蹭了蹭TargetCharacter的脚.", ACT_Path, "RestHead");
        addAccAction1("用脸蹭脚", "Other", "ItemBoots", "FHMods_Sub_用脸蹭脚", "SourceCharacter用脸蹭了蹭TargetCharacter的脚.", ACT_Path, "RestHead");
        addAccAction1("生气的跺脚", "Self", "ItemBoots", "FHMods_Sub_生气的跺脚", "SourceCharacter生气的跺了几下TargetCharacter的脚.", ACT_Path_Shoes, "WoollyBootsTall");

        addAccAction1("马娘随意的踏蹄", "Self", "ItemBoots", "FHMods_Sub_马娘随意的踏蹄", "SourceCharacter随意的踩了几下蹄,发出些许马蹄声.", ACT_Path_Shoes, "PonyBoots");
        addAccAction1("马娘兴奋的踏蹄", "Self", "ItemBoots", "FHMods_Sub_马娘兴奋的踏蹄", "SourceCharacter兴奋的踩了几下蹄.", ACT_Path_Shoes, "PonyBoots");
        addAccAction1("马娘不安的踏蹄", "Self", "ItemBoots", "FHMods_Sub_马娘不安的踏蹄", "SourceCharacter感到了不安,慌乱的向后退.", ACT_Path_Shoes, "PonyBoots");

        next(args);
    });

    const CustomPrerequisiteFuncs = new Map();

    // 判断短马蹄靴/马蹄靴
    CustomPrerequisiteFuncs.set("HasPonyBoots", (source, target, group) =>
        InventoryIsItemInList(source, "ItemBoots", "PonyBoots") 
        || InventoryIsItemInList(source, "ItemBoots", "ShortPonyBoots")
        || InventoryIsItemInList(source, "Shoes", "PonyBoots"));

    // 判断马的缰绳之类的马具
    CustomPrerequisiteFuncs.set("HasPonyGag", (source, target, group) =>
        InventoryIsItemInList(source, "ItemMouth", "PonyGag")
        || InventoryIsItemInList(source, "ItemMouth", "HarnessPanelGag")
        || InventoryIsItemInList(source, "ItemMouth", "HarnessBallGag"));

    //检测梳子
    CustomPrerequisiteFuncs.set("HasHairbrush", (source, target, group) =>
        InventoryIsItemInList(source, "ItemHandheld", "Hairbrush"));

    CustomPrerequisiteFuncs.set("NotKneelingAll", (source, target, group) => !source.IsKneeling() && !target.IsKneeling()); // 都没有跪下
    CustomPrerequisiteFuncs.set("IsKneelingAll", (source, target, group) => source.IsKneeling() && target.IsKneeling()); // 都跪下
    CustomPrerequisiteFuncs.set("IsKneelingSource", (source, target, group) => source.IsKneeling() && !target.IsKneeling()); // 发起者跪下但目标没有
    CustomPrerequisiteFuncs.set("NotKneelingT", (source, target, group) => {
        // 都跪下或者都没有跪下
        return (!source.IsKneeling() && !target.IsKneeling()) || (source.IsKneeling() && target.IsKneeling())
    }); 

    activitiesAll.forEach((activity) => {
        ActivityFemale3DCG.push(activity);
        ActivityFemale3DCGOrdering.push(activity.Name);
    });
})();
