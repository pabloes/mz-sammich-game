export default 
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpriteUv = exports.SpriteAnimationSystem = exports.createSpriteEntity = void 0;
const SpriteMaterial_1 = __webpack_require__(1);
const defaultOptions = {
    time: 0.5,
    frames: [],
    init: true,
    position: undefined,
    scale: undefined
};
exports.createSpriteEntity = (parent, { position = new Vector3(0, 0, 0), scale = new Vector3(1, 1, 1), uvs }) => {
    const entity = new Entity();
    const plane = new PlaneShape();
    plane.withCollisions = false;
    plane.isPointerBlocker = false;
    const transform = new Transform({
        position,
        scale
    });
    plane.uvs = uvs;
    entity.addComponent(plane);
    entity.addComponent(SpriteMaterial_1.spriteMaterial);
    entity.addComponent(transform);
    entity.setParent(parent);
    return {
        show: () => {
            plane.visible = true;
        },
        hide: () => {
            plane.visible = false;
        },
        getEntity: () => entity,
        getShape: () => plane,
        getTransform: () => transform,
        updateUvs: (uvs) => plane.uvs = uvs
    };
};
class SpriteAnimationSystem {
    constructor(root, globalOptions = defaultOptions) {
        const { scale, time, position, frames, init } = globalOptions;
        this.globalOptions = Object.assign(Object.assign({}, defaultOptions), globalOptions);
        this.root = root;
        this.setInitialState();
        this.sprite = new Entity();
        this.plane = new PlaneShape();
        this.sprite.addComponent(SpriteMaterial_1.spriteMaterial);
        this.sprite.addComponent(this.plane);
        if (position || scale)
            this.sprite.addComponent(new Transform({ scale, position }));
        this.plane.uvs = frames[0].uvs;
        engine.addSystem(this);
    }
    setPosition(vector) {
        this.sprite.getComponent(Transform).position.set(vector.x, vector.y, vector.z);
    }
    getPosition() {
        return this.sprite.getComponent(Transform).position;
    }
    setRotation(angle) {
        this.sprite.getComponent(Transform).rotation.setEuler(0, 0, angle);
    }
    addComponentOrReplace(Component) {
        this.sprite.addComponentOrReplace(Component);
    }
    addComponent(Component) {
        this.sprite.addComponent(Component);
    }
    removeComponent(Component) {
        this.sprite.removeComponent(Component);
    }
    init() {
        this.state.initialized = true;
        this.sprite.setParent(this.root);
    }
    nextFrame() {
        this.state.currentFrame++;
        if (this.state.currentFrame >= this.state.playtrack.length - 1 && this.state.playing && !this.state.loop)
            this.state.playing = false;
        if (this.state.currentFrame >= this.state.playtrack.length) {
            if (this.state.loop) {
                this.state.currentFrame = 0;
            }
            else {
                this.state.currentFrame = this.state.playtrack.length - 1;
            }
        }
        this.plane.uvs = this.globalOptions.frames[this.state.playtrack[this.state.currentFrame]].uvs;
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        if (this.state.playing) {
            this.state.dtCount += dt;
            if (this.state.dtCount >= this.state.time) {
                this.state.dtCount = 0;
                this.nextFrame();
            }
        }
        else {
            this.state.dtCount = 0;
        }
    }
    play(frames, options) {
        this.state.playtrack = frames;
        this.state.dtCount = 0;
        this.state.currentFrame = -1;
        this.state.initialized = true;
        this.state.playing = true;
        this.state.end = frames.length - 1;
        this.state.time = (options === null || options === void 0 ? void 0 : options.time) || this.globalOptions.time;
        this.state.loop = (options === null || options === void 0 ? void 0 : options.loop) || false;
        this.nextFrame();
    }
    stop(frame = 0) {
        this.plane.uvs = this.globalOptions.frames[0].uvs;
        this.state.playing = false;
    }
    destroy() {
        engine.removeSystem(this);
    }
    setInitialState() {
        this.state = {
            initialized: false,
            playing: false,
            currentFrame: 0,
            dtCount: 0,
            start: 0,
            end: 0,
            loop: false,
            time: this.globalOptions.time || 0.5,
            playtrack: [0]
        };
    }
    resetState() {
        this.state = Object.assign(Object.assign({}, this.state), { playing: false });
    }
}
exports.SpriteAnimationSystem = SpriteAnimationSystem;
exports.getSpriteUv = (index, offsetIndex = 0, width = 64, height = width) => {
    let spriteCols = 1024 / width;
    let spriteRows = 1024 / height;
    let currentSpriteCell = index + offsetIndex;
    let colFactor = 1 / spriteCols;
    let rowFactor = 1 / spriteRows;
    let currRowStart = spriteRows - Math.floor((currentSpriteCell - 1) / spriteCols);
    let currColStart = Math.floor((currentSpriteCell - 1) % spriteCols);
    const A = (currColStart) * (colFactor);
    const B = (currColStart + 1) * (colFactor);
    const C = (currRowStart - 1) * (rowFactor);
    const D = (currRowStart) * (rowFactor);
    return [
        0, 0, 0, 0, 0, 0, 0, 0,
        B,
        C,
        A,
        C,
        A,
        D,
        B,
        D,
    ];
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTexture = exports.spriteMaterial = void 0;
exports.spriteMaterial = new Material();
exports.loadTexture = () => {
    const spriteUrl = `${engine["RESOURCE_BASE"] || globalThis["RESOURCE_BASE"] || ''}images/sprite3.png`;
    const spriteTexture = new Texture(spriteUrl, { samplingMode: 0, hasAlpha: true });
    exports.spriteMaterial.albedoTexture = spriteTexture;
    exports.spriteMaterial.alphaTexture = spriteTexture;
    exports.spriteMaterial.emissiveTexture = spriteTexture;
};
console.log('engine["RESOURCE_BASE"]2', engine["RESOURCE_BASE"]);
const spriteUrl = `${engine["RESOURCE_BASE"] || globalThis["RESOURCE_BASE"] || ''}images/sprite3.png`;
console.log("spriteUrl", spriteUrl);
exports.spriteMaterial.emissiveIntensity = 0.5;
exports.spriteMaterial.emissiveColor = new Color3(1, 1, 1);
exports.spriteMaterial.transparencyMode = 1;
exports.spriteMaterial.specularIntensity = 0;
exports.spriteMaterial.roughness = 1;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSoundsFromEntity = exports.addSoundsToEntity = exports.stopAllSounds = exports.stopSound = exports.isMusic = exports.playOnce = exports.playLoop = exports.isPlaying = exports.toggleMusic = exports.setTotalMute = exports.loadSounds = void 0;
let sources = {};
let music = [];
exports.loadSounds = () => {
    const soundBaseUrl = `${engine["RESOURCE_BASE"] || globalThis["RESOURCE_BASE"] || ''}`;
    const errorClip = new AudioClip(`${soundBaseUrl}sounds/error.mp3`);
    const music2 = new AudioClip(`${soundBaseUrl}sounds/music2b.mp3`);
    const vs = new AudioClip(`${soundBaseUrl}sounds/vs.mp3`);
    const pwned = new AudioClip(`${soundBaseUrl}sounds/pwned.mp3`);
    const race = new AudioClip(`${soundBaseUrl}sounds/race.mp3`);
    const ok = new AudioClip(`${soundBaseUrl}sounds/ok.mp3`);
    const wow = new AudioClip(`${soundBaseUrl}sounds/wow.mp3`);
    const swing = new AudioClip(`${soundBaseUrl}sounds/swing.mp3`);
    const battle = new AudioClip(`${soundBaseUrl}sounds/battle.mp3`);
    const money = new AudioClip(`${soundBaseUrl}sounds/money.mp3`);
    const jump = new AudioClip(`${soundBaseUrl}sounds/jump.mp3`);
    const readygo = new AudioClip(`${soundBaseUrl}sounds/readygo.mp3`);
    const hit = new AudioClip(`${soundBaseUrl}sounds/hit.mp3`);
    const errorSrc = new AudioSource(errorClip);
    const music2Src = new AudioSource(music2);
    const vsSrc = new AudioSource(vs);
    const pwnedSrc = new AudioSource(pwned);
    const raceSrc = new AudioSource(race);
    const okSrc = new AudioSource(ok);
    const wowSrc = new AudioSource(wow);
    const swingSrc = new AudioSource(swing);
    const battleSrc = new AudioSource(battle);
    const moneySrc = new AudioSource(money);
    const jumpSrc = new AudioSource(jump);
    const readygoSrc = new AudioSource(readygo);
    const hitSrc = new AudioSource(hit);
    sources = {
        fail: errorSrc,
        music2: music2Src,
        vs: vsSrc,
        pwned: pwnedSrc,
        race: raceSrc,
        ok: okSrc,
        wow: wowSrc,
        swing: swingSrc,
        battle: battleSrc,
        money: moneySrc,
        jump: jumpSrc,
        readygo: readygoSrc,
        hit: hitSrc
    };
    music = [
        sources.music2, sources.pwned, sources.race, sources.battle, sources.money
    ];
    music.forEach((src) => {
        src.volume = 0.5;
    });
};
const state = {
    music: true,
    fx: true,
    totalMute: false
};
exports.setTotalMute = (value) => {
    state.totalMute = value;
    if (!value) {
        Object.values(sources).forEach(source => {
            if (exports.isMusic(source)) {
                source.volume = (!state.music) ? 0 : 0.5;
            }
            else {
                source.volume = 1;
            }
        });
    }
    else {
        Object.values(sources).forEach(source => {
            source.volume = 0;
        });
    }
};
exports.toggleMusic = () => {
    state.music = !state.music;
    music.forEach((src) => {
        src.volume = (!state.music || state.totalMute) ? 0 : 0.5;
    });
};
exports.isPlaying = (type) => sources[type].playing;
exports.playLoop = (type, { volume } = { volume: undefined }) => {
    sources[type].loop = true;
    sources[type].playing = true;
};
exports.playOnce = (type, { volume } = { volume: undefined }) => {
    sources[type].playOnce();
    if (volume !== undefined && !(~music.indexOf(sources[type]))) {
        sources[type].volume = volume;
    }
};
exports.isMusic = (source) => {
    return ~music.indexOf(source);
};
exports.stopSound = (type) => {
    sources[type].playing = false;
};
exports.stopAllSounds = () => {
    Object.values(sources).forEach(s => s.playing = false);
};
exports.addSoundsToEntity = (entity) => {
    Object.values(sources).forEach((audioSrc) => {
        const soundEntity = new Entity();
        soundEntity.setParent(entity);
        soundEntity.addComponent(audioSrc);
        audioSrc.volume = 1;
    });
};
exports.removeSoundsFromEntity = (entity) => {
    Object.values(sources).forEach((audioSrc) => {
    });
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.seedGen = void 0;
exports.seedGen = {
    create: (seed) => {
        let value = seed;
        return {
            random: () => {
                value = value * 16807 % 2147483647;
                return value / 2147483647;
            }
        };
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.showSpritePanel = exports.hideSpritePanel = exports.updateSpritePanel = exports.createSpritePanel = void 0;
const SpriteAnimation_1 = __webpack_require__(0);
const SpriteMaterial_1 = __webpack_require__(1);
const spriteShape = new PlaneShape();
spriteShape.withCollisions = false;
spriteShape.isPointerBlocker = false;
const spriteTransform = new Transform({ position: new Vector3(0, 2, -0.001), scale: new Vector3(6, 4, 1) });
exports.createSpritePanel = (root) => {
    const spritePanel = new Entity();
    spritePanel.addComponent(spriteShape);
    spritePanel.addComponent(SpriteMaterial_1.spriteMaterial);
    spritePanel.addComponent(spriteTransform);
    spritePanel.setParent(root);
};
exports.updateSpritePanel = ({ uvs = null, width = null, height = null, col = null, row = null, canvasWidth = null, scale = null }) => {
    if (uvs) {
        spriteShape.uvs = uvs;
    }
    else {
        spriteShape.uvs = SpriteAnimation_1.getSpriteUv(1024 / width * row + col, 0, width, height);
    }
    if (canvasWidth) {
        spriteTransform.scale.set(canvasWidth, spriteTransform.scale.y, spriteTransform.scale.z);
    }
    if (scale) {
        spriteTransform.scale.set(scale.x, scale.y, scale.z);
    }
    else {
        spriteTransform.scale.set(6, 4, 1);
    }
};
exports.hideSpritePanel = () => {
    spriteShape.visible = false;
    spriteTransform.scale.set(6, 4, 1);
};
exports.showSpritePanel = () => {
    spriteShape.visible = true;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.createUI = exports.createRoundResult = exports.createTimeResult = exports.createPlayerAnswer = void 0;
const SpriteAnimation_1 = __webpack_require__(0);
const answerSpriteIndex = {
    player1: {
        correct: 1,
        wrong: 3
    },
    player2: {
        correct: 2,
        wrong: 4
    }
};
const offsetSpriteIndex = (512 / 16) * (1024 / 16) + (320 / 16);
exports.createPlayerAnswer = (root, { player, size = 16 }) => {
    const wrapperEntity = new Entity();
    wrapperEntity.addComponent(new Transform({
        scale: new Vector3(0.5, 0.5, 1),
        position: new Vector3(player === 1 ? -0.3 : 0.3, -10, -0.01)
    }));
    const sprite = SpriteAnimation_1.createSpriteEntity(wrapperEntity, {
        uvs: SpriteAnimation_1.getSpriteUv(answerSpriteIndex[`player${player}`].correct, offsetSpriteIndex, 16, 16),
        position: new Vector3(0, 0, -0.001)
    });
    wrapperEntity.setParent(root);
    const setSprite = (isCorrectAnswer) => {
        let index = 5;
        if (isCorrectAnswer) {
            index = answerSpriteIndex[`player${player}`].correct;
        }
        else {
            index = answerSpriteIndex[`player${player}`].wrong;
        }
        sprite.getShape().uvs = SpriteAnimation_1.getSpriteUv(index, offsetSpriteIndex, 16, 16);
    };
    const show = () => {
        sprite.getShape().visible = true;
    };
    const hide = () => {
        sprite.getShape().visible = false;
    };
    return {
        wrapperEntity,
        sprite,
        setSprite,
        show,
        hide
    };
};
exports.createTimeResult = (root, { player, position = new Vector3(player === 1 ? -2.4 : 2.4, 0.1, -0.007), fontSize = 2.5 }) => {
    const entity = new Entity();
    const text = new TextShape();
    const clock = SpriteAnimation_1.createSpriteEntity(entity, {
        uvs: SpriteAnimation_1.getSpriteUv(25, (512 / 16) * (1024 / 16), 16, 16),
        scale: new Vector3(0.25, 0.25, 1),
        position: new Vector3(player === 1 ? -0.25 : 0.25, 0.25 / 2, 0)
    });
    text.isPointerBlocker = false;
    text.hTextAlign = player === 1 ? "left" : "right";
    text.vTextAlign = "bottom";
    text.fontSize = fontSize;
    text.font = new Font(Fonts.SanFrancisco_Heavy);
    text.shadowOffsetX = 2;
    text.shadowOffsetY = 2;
    text.shadowColor = Color3.FromHexString("#000000");
    text.withCollisions = false;
    const transform = new Transform({
        position
    });
    entity.addComponent(transform);
    entity.addComponent(text);
    entity.setParent(root);
    const show = () => {
        text.visible = true;
        clock.getShape().visible = true;
    };
    const hide = () => {
        text.visible = false;
        text.value = "";
        clock.getShape().visible = false;
    };
    const update = (timeMs) => {
        text.value = (Math.floor(timeMs * 10000) / 10000 / 1000).toString();
    };
    return {
        show,
        hide,
        update,
        getTransform: () => transform,
        getEntity: () => entity
    };
};
exports.createRoundResult = (root, { player, position = new Vector3(player === 1 ? -2 : 2, 3, -0.007) }) => {
    const spriteOffset = ((416 / 32) * (1024 / 128));
    const PIXEL = 4 / 128 / 2;
    const sprite = SpriteAnimation_1.createSpriteEntity(root, {
        uvs: SpriteAnimation_1.getSpriteUv(4 + 8, spriteOffset, 128, 32),
        scale: new Vector3(PIXEL * 128, PIXEL * 32, 1),
        position
    });
    const show = () => {
        sprite.getShape().visible = true;
    };
    const hide = () => {
        sprite.getShape().visible = false;
    };
    const update = (isWinner) => {
        if (isWinner) {
            sprite.getShape().uvs = SpriteAnimation_1.getSpriteUv(4 + 8, spriteOffset, 128, 32);
        }
        else {
            sprite.getShape().uvs = SpriteAnimation_1.getSpriteUv(4, spriteOffset, 128, 32);
        }
    };
    return {
        show,
        hide,
        update,
        getTransform: () => sprite.getTransform(),
        getEntity: () => sprite.getEntity()
    };
};
exports.createUI = (root, { position } = { position: undefined }) => {
    const timeResult1 = exports.createTimeResult(root, { player: 1 });
    const timeResult2 = exports.createTimeResult(root, { player: 2 });
    timeResult1.hide();
    timeResult2.hide();
    const scoreText1 = new TextShape("0");
    const scoreText2 = new TextShape("0");
    scoreText1.withCollisions = scoreText2.withCollisions = false;
    scoreText1.isPointerBlocker = scoreText2.isPointerBlocker = false;
    scoreText1.font = scoreText2.font = new Font(Fonts.SanFrancisco_Heavy);
    scoreText1.fontSize = scoreText2.fontSize = 2.5;
    scoreText1.vTextAlign = scoreText2.vTextAlign = "bottom";
    scoreText1.hTextAlign = "right";
    scoreText2.hTextAlign = "left";
    const score1 = new Entity();
    const score2 = new Entity();
    score1.addComponent(scoreText1);
    score1.addComponent(new Transform({ position: new Vector3(-0.5, position ? 0.1 + position.y : 0.1, -0.003) }));
    score2.addComponent(scoreText2);
    score2.addComponent(new Transform({ position: new Vector3(0.5, position ? 0.1 + position.y : 0.1, -0.003) }));
    score1.setParent(root);
    score2.setParent(root);
    const board = SpriteAnimation_1.createSpriteEntity(root, {
        position: new Vector3(0, position ? 0.5 + position.y : 0.5, -0.001),
        scale: new Vector3(6, 1, 1),
        uvs: SpriteAnimation_1.getSpriteUv(2, (384 / 32) * (1024 / 192), 192, 32)
    });
    const updateTime = ({ player, time }) => {
        if (player === 1) {
            timeResult1.update(time);
            timeResult1.show();
        }
        else {
            timeResult2.update(time);
            timeResult2.show();
        }
    };
    const updateScore = ({ player, score }) => {
        if (typeof score === "undefined")
            return;
        if (player === 1) {
            scoreText1.value = score.toString();
        }
        else {
            scoreText2.value = score.toString();
        }
    };
    const hideScore = () => {
        scoreText1.value = scoreText2.value = "";
    };
    const hideTime = () => {
        timeResult1.hide();
        timeResult2.hide();
    };
    const showTime = () => {
    };
    const show = () => {
        board.getShape().visible = true;
    };
    const hide = () => {
        board.getShape().visible = false;
    };
    return {
        updateTime,
        updateScore,
        hideTime,
        showTime,
        hideScore,
        show,
        hide
    };
};
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTextPanelValue = exports.updateTextPanel = exports.createTextPanel = void 0;
let text = null;
const textTransform = new Transform({ position: new Vector3(0, 4, -0.01) });
exports.createTextPanel = (root, textValue) => {
    const panel = new Entity();
    text = new TextShape();
    text.value = textValue;
    text.vTextAlign = "top";
    text.fontSize = 3;
    text.font = new Font(Fonts.SanFrancisco_Heavy);
    text.shadowOffsetX = 2;
    text.shadowOffsetY = 2;
    text.shadowColor = Color3.FromHexString("#000000");
    panel.addComponent(textTransform);
    panel.addComponent(text);
    panel.setParent(root);
};
exports.updateTextPanel = (options) => {
    if (options.bottom) {
        text.vTextAlign = "bottom";
        textTransform.position.set(textTransform.position.x, 0, textTransform.position.z);
    }
    else {
        text.vTextAlign = "top";
        textTransform.position.set(textTransform.position.x, 4, textTransform.position.z);
    }
    if (options.hTextAlign === "left") {
        text.hTextAlign = "left";
        textTransform.position.set(-3, textTransform.position.y, textTransform.position.z);
    }
    else {
        text.hTextAlign = "center";
        textTransform.position.set(0, textTransform.position.y, textTransform.position.z);
    }
    text.color = options.color || Color3.White();
    Object.assign(text, { hTextAlign: "center" }, options, { value: `${options.value}` });
};
exports.getTextPanelValue = () => text.value;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformSystem = void 0;
const move_1 = __webpack_require__(16);
const rotate_1 = __webpack_require__(25);
const scale_1 = __webpack_require__(26);
const followpath_1 = __webpack_require__(27);
const keeprotating_1 = __webpack_require__(28);
class TransformSystem {
    constructor() {
        this._components = [];
        TransformSystem._instance = this;
        this._components.push(move_1.MoveTransformComponent);
        this._components.push(rotate_1.RotateTransformComponent);
        this._components.push(scale_1.ScaleTransformComponent);
        this._components.push(followpath_1.FollowPathComponent);
        this._components.push(keeprotating_1.KeepRotatingComponent);
    }
    static createAndAddToEngine() {
        if (this._instance == null) {
            this._instance = new TransformSystem();
            engine.addSystem(this._instance);
        }
        return this._instance;
    }
    static registerCustomComponent(component) {
        this.createAndAddToEngine()._components.push(component);
    }
    update(dt) {
        this._components.forEach(component => {
            this.updateComponent(dt, component);
        });
    }
    updateComponent(dt, component) {
        const group = engine.getComponentGroup(component, Transform);
        group.entities.forEach(entity => {
            const transform = entity.getComponent(Transform);
            const comp = entity.getComponent(component);
            comp.update(dt);
            comp.assignValueToTransform(transform);
            if (comp.hasFinished()) {
                entity.removeComponent(comp);
                if (comp.onFinishCallback != null)
                    comp.onFinishCallback();
            }
        });
    }
}
exports.TransformSystem = TransformSystem;
TransformSystem._instance = null;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.PART_TYPE_OFFSET_Y = exports.PART_OFFSET_INDEX = exports.PART_SIZE_HEIGHT = exports.PART_SIZE_WIDTH = void 0;
exports.PART_SIZE_WIDTH = {
    shirt: 64,
    pants: 64,
    hair: 64,
    glasses: 64
};
exports.PART_SIZE_HEIGHT = {
    shirt: 64,
    pants: 64,
    hair: 64,
    glasses: 64
};
exports.PART_OFFSET_INDEX = {
    shirt: (256 / 64) * (1024 / 64),
    pants: (320 / 64) * (1024 / 64),
    hair: (896 / 64) * (1024 / 64),
    glasses: (832 / 64) * (1024 / 64)
};
exports.PART_TYPE_OFFSET_Y = {
    shirt: -0.2,
    pants: +0.2,
    hair: 0,
    glasses: 0
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeSinceStart = void 0;
exports.getTimeSinceStart = (startTime) => {
    return Date.now() - startTime;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySchema = void 0;
var ArraySchema = (function (_super) {
    __extends(ArraySchema, _super);
    function ArraySchema() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var _this = _super.apply(this, items) || this;
        Object.setPrototypeOf(_this, Object.create(ArraySchema.prototype));
        Object.defineProperties(_this, {
            $sorting: { value: undefined, enumerable: false, writable: true },
            $changes: { value: undefined, enumerable: false, writable: true },
            onAdd: { value: undefined, enumerable: false, writable: true },
            onRemove: { value: undefined, enumerable: false, writable: true },
            onChange: { value: undefined, enumerable: false, writable: true },
            triggerAll: {
                value: function () {
                    if (!_this.onAdd) {
                        return;
                    }
                    for (var i = 0; i < _this.length; i++) {
                        _this.onAdd(_this[i], i);
                    }
                }
            },
            toJSON: {
                value: function () {
                    var arr = [];
                    for (var i = 0; i < _this.length; i++) {
                        var objAt = _this[i];
                        arr.push((typeof (objAt.toJSON) === "function")
                            ? objAt.toJSON()
                            : objAt);
                    }
                    return arr;
                }
            },
            clone: {
                value: function (isDecoding) {
                    var cloned;
                    if (isDecoding) {
                        cloned = ArraySchema.of.apply(ArraySchema, _this);
                        cloned.onAdd = _this.onAdd;
                        cloned.onRemove = _this.onRemove;
                        cloned.onChange = _this.onChange;
                    }
                    else {
                        cloned = new (ArraySchema.bind.apply(ArraySchema, __spreadArrays([void 0], _this.map(function (item) {
                            if (typeof (item) === "object") {
                                return item.clone();
                            }
                            else {
                                return item;
                            }
                        }))))();
                    }
                    return cloned;
                }
            }
        });
        return _this;
    }
    Object.defineProperty(ArraySchema, Symbol.species, {
        get: function () { return ArraySchema; },
        enumerable: false,
        configurable: true
    });
    ArraySchema.prototype.sort = function (compareFn) {
        this.$sorting = true;
        _super.prototype.sort.call(this, compareFn);
        if (this.$changes) {
            var changes = Array.from(this.$changes.changes);
            for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
                var key = changes_1[_i];
                var previousIndex = this.$changes.getIndex(this[key]);
                if (previousIndex !== undefined) {
                    this.$changes.mapIndexChange(this[key], previousIndex);
                }
                this.$changes.mapIndex(this[key], key);
            }
        }
        this.$sorting = false;
        return this;
    };
    ArraySchema.prototype.filter = function (callbackfn, thisArg) {
        var filtered = _super.prototype.filter.call(this, callbackfn);
        filtered.$changes = this.$changes.clone();
        return filtered;
    };
    ArraySchema.prototype.splice = function (start, deleteCount) {
        var insert = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            insert[_i - 2] = arguments[_i];
        }
        var removedItems = Array.prototype.splice.apply(this, arguments);
        var movedItems = Array.prototype.filter.call(this, function (item, idx) {
            return idx >= start + deleteCount - 1;
        });
        removedItems.map(function (removedItem) {
            var $changes = removedItem && removedItem.$changes;
            if ($changes && $changes.parent) {
                $changes.parent.deleteIndex(removedItem);
                delete $changes.parent;
            }
        });
        movedItems.forEach(function (movedItem) {
            var $changes = movedItem && movedItem.$changes;
            if ($changes) {
                $changes.parentField--;
            }
        });
        return removedItems;
    };
    return ArraySchema;
}(Array));
exports.ArraySchema = ArraySchema;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MapSchema = void 0;
var MapSchema = (function () {
    function MapSchema(obj) {
        var _this = this;
        if (obj === void 0) {
            obj = {};
        }
        for (var key in obj) {
            this[key] = obj[key];
        }
        Object.defineProperties(this, {
            $changes: { value: undefined, enumerable: false, writable: true },
            onAdd: { value: undefined, enumerable: false, writable: true },
            onRemove: { value: undefined, enumerable: false, writable: true },
            onChange: { value: undefined, enumerable: false, writable: true },
            clone: {
                value: function (isDecoding) {
                    var cloned;
                    if (isDecoding) {
                        cloned = Object.assign(new MapSchema(), _this);
                        cloned.onAdd = _this.onAdd;
                        cloned.onRemove = _this.onRemove;
                        cloned.onChange = _this.onChange;
                    }
                    else {
                        var cloned_1 = new MapSchema();
                        for (var key in _this) {
                            if (typeof (_this[key]) === "object") {
                                cloned_1[key] = _this[key].clone();
                            }
                            else {
                                cloned_1[key] = _this[key];
                            }
                        }
                    }
                    return cloned;
                }
            },
            triggerAll: {
                value: function () {
                    if (!_this.onAdd) {
                        return;
                    }
                    for (var key in _this) {
                        _this.onAdd(_this[key], key);
                    }
                }
            },
            toJSON: {
                value: function () {
                    var map = {};
                    for (var key in _this) {
                        map[key] = (typeof (_this[key].toJSON) === "function")
                            ? _this[key].toJSON()
                            : _this[key];
                    }
                    return map;
                }
            },
            _indexes: { value: new Map(), enumerable: false, writable: true },
            _updateIndexes: {
                value: function (allKeys) {
                    var index = 0;
                    var indexes = new Map();
                    for (var _i = 0, allKeys_1 = allKeys; _i < allKeys_1.length; _i++) {
                        var key = allKeys_1[_i];
                        indexes.set(key, index++);
                    }
                    _this._indexes = indexes;
                }
            },
        });
    }
    return MapSchema;
}());
exports.MapSchema = MapSchema;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Interpolate = exports.InterpolationType = void 0;
var InterpolationType;
(function (InterpolationType) {
    InterpolationType[InterpolationType["LINEAR"] = 0] = "LINEAR";
    InterpolationType[InterpolationType["EASEINQUAD"] = 1] = "EASEINQUAD";
    InterpolationType[InterpolationType["EASEOUTQUAD"] = 2] = "EASEOUTQUAD";
    InterpolationType[InterpolationType["EASEQUAD"] = 3] = "EASEQUAD";
})(InterpolationType = exports.InterpolationType || (exports.InterpolationType = {}));
function Interpolate(type, t) {
    switch (type) {
        case InterpolationType.LINEAR:
            return InterpolateLinear(t);
        case InterpolationType.EASEINQUAD:
            return InterpolateEaseInQuad(t);
        case InterpolationType.EASEOUTQUAD:
            return InterpolateEaseOutQuad(t);
        case InterpolationType.EASEQUAD:
            return InterpolateEaseQuad(t);
        default:
            return InterpolateLinear(t);
    }
}
exports.Interpolate = Interpolate;
function InterpolateLinear(t) {
    return t;
}
function InterpolateEaseInQuad(t) {
    return t * t;
}
function InterpolateEaseOutQuad(t) {
    return t * (2 - t);
}
function InterpolateEaseQuad(t) {
    return (t * t) / (2.0 * (t * t - t) + 1.0);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
var spec_1 = __webpack_require__(44);
var encode = __webpack_require__(42);
var decode = __webpack_require__(43);
var ArraySchema_1 = __webpack_require__(10);
var MapSchema_1 = __webpack_require__(11);
var ChangeTree_1 = __webpack_require__(47);
var EventEmitter_1 = __webpack_require__(93);
var EncodeSchemaError = (function (_super) {
    __extends(EncodeSchemaError, _super);
    function EncodeSchemaError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EncodeSchemaError;
}(Error));
function assertType(value, type, klass, field) {
    var typeofTarget;
    var allowNull = false;
    switch (type) {
        case "number":
        case "int8":
        case "uint8":
        case "int16":
        case "uint16":
        case "int32":
        case "uint32":
        case "int64":
        case "uint64":
        case "float32":
        case "float64":
            typeofTarget = "number";
            if (isNaN(value)) {
                console.log("trying to encode \"NaN\" in " + klass.constructor.name + "#" + field);
            }
            break;
        case "string":
            typeofTarget = "string";
            allowNull = true;
            break;
        case "boolean":
            return;
    }
    if (typeof (value) !== typeofTarget && (!allowNull || (allowNull && value !== null))) {
        var foundValue = "'" + JSON.stringify(value) + "'" + (value && value.constructor && " (" + value.constructor.name + ")");
        throw new EncodeSchemaError("a '" + typeofTarget + "' was expected, but " + foundValue + " was provided in " + klass.constructor.name + "#" + field);
    }
}
function assertInstanceType(value, type, klass, field) {
    if (!(value instanceof type)) {
        throw new EncodeSchemaError("a '" + type.name + "' was expected, but '" + value.constructor.name + "' was provided in " + klass.constructor.name + "#" + field);
    }
}
function encodePrimitiveType(type, bytes, value, klass, field) {
    assertType(value, type, klass, field);
    var encodeFunc = encode[type];
    if (encodeFunc) {
        encodeFunc(bytes, value);
    }
    else {
        throw new EncodeSchemaError("a '" + type + "' was expected, but " + value + " was provided in " + klass.constructor.name + "#" + field);
    }
}
function decodePrimitiveType(type, bytes, it) {
    return decode[type](bytes, it);
}
var Schema = (function () {
    function Schema() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Object.defineProperties(this, {
            $changes: {
                value: new ChangeTree_1.ChangeTree(this._indexes),
                enumerable: false,
                writable: true
            },
            $listeners: {
                value: {},
                enumerable: false,
                writable: true
            },
        });
        var descriptors = this._descriptors;
        if (descriptors) {
            Object.defineProperties(this, descriptors);
        }
    }
    Schema.onError = function (e) {
        console.error(e);
    };
    Object.defineProperty(Schema.prototype, "_schema", {
        get: function () { return this.constructor._schema; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_descriptors", {
        get: function () { return this.constructor._descriptors; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_indexes", {
        get: function () { return this.constructor._indexes; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_fieldsByIndex", {
        get: function () { return this.constructor._fieldsByIndex; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_filters", {
        get: function () { return this.constructor._filters; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "_deprecated", {
        get: function () { return this.constructor._deprecated; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Schema.prototype, "$changed", {
        get: function () { return this.$changes.changed; },
        enumerable: false,
        configurable: true
    });
    Schema.prototype.listen = function (attr, callback) {
        var _this = this;
        if (!this.$listeners[attr]) {
            this.$listeners[attr] = new EventEmitter_1.EventEmitter();
        }
        this.$listeners[attr].register(callback);
        return function () {
            return _this.$listeners[attr].remove(callback);
        };
    };
    Schema.prototype.decode = function (bytes, it) {
        if (it === void 0) {
            it = { offset: 0 };
        }
        var changes = [];
        var schema = this._schema;
        var fieldsByIndex = this._fieldsByIndex;
        var totalBytes = bytes.length;
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset += 2;
        }
        var _loop_1 = function () {
            var isNil = decode.nilCheck(bytes, it) && ++it.offset;
            var index = bytes[it.offset++];
            if (index === spec_1.END_OF_STRUCTURE) {
                return "break";
            }
            var field = fieldsByIndex[index];
            var _field = "_" + field;
            var type = schema[field];
            var value = void 0;
            var hasChange = false;
            if (!field) {
                return "continue";
            }
            else if (isNil) {
                value = null;
                hasChange = true;
            }
            else if (type._schema) {
                value = this_1[_field] || this_1.createTypeInstance(bytes, it, type);
                value.decode(bytes, it);
                hasChange = true;
            }
            else if (Array.isArray(type)) {
                type = type[0];
                var valueRef_1 = this_1[_field] || new ArraySchema_1.ArraySchema();
                value = valueRef_1.clone(true);
                var newLength_1 = decode.number(bytes, it);
                var numChanges = Math.min(decode.number(bytes, it), newLength_1);
                var hasRemoval = (value.length > newLength_1);
                hasChange = (numChanges > 0) || hasRemoval;
                var hasIndexChange = false;
                if (hasRemoval) {
                    Array.prototype.splice.call(value, newLength_1).forEach(function (itemRemoved, i) {
                        if (itemRemoved && itemRemoved.onRemove) {
                            try {
                                itemRemoved.onRemove();
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        if (valueRef_1.onRemove) {
                            try {
                                valueRef_1.onRemove(itemRemoved, newLength_1 + i);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    });
                }
                for (var i = 0; i < numChanges; i++) {
                    var newIndex = decode.number(bytes, it);
                    var indexChangedFrom = void 0;
                    if (decode.indexChangeCheck(bytes, it)) {
                        decode.uint8(bytes, it);
                        indexChangedFrom = decode.number(bytes, it);
                        hasIndexChange = true;
                    }
                    var isNew = (!hasIndexChange && value[newIndex] === undefined) || (hasIndexChange && indexChangedFrom === undefined);
                    if (type.prototype instanceof Schema) {
                        var item = void 0;
                        if (isNew) {
                            item = this_1.createTypeInstance(bytes, it, type);
                        }
                        else if (indexChangedFrom !== undefined) {
                            item = valueRef_1[indexChangedFrom];
                        }
                        else {
                            item = valueRef_1[newIndex];
                        }
                        if (!item) {
                            item = this_1.createTypeInstance(bytes, it, type);
                            isNew = true;
                        }
                        item.decode(bytes, it);
                        value[newIndex] = item;
                    }
                    else {
                        value[newIndex] = decodePrimitiveType(type, bytes, it);
                    }
                    if (isNew) {
                        if (valueRef_1.onAdd) {
                            try {
                                valueRef_1.onAdd(value[newIndex], newIndex);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    }
                    else if (valueRef_1.onChange) {
                        try {
                            valueRef_1.onChange(value[newIndex], newIndex);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
            }
            else if (type.map) {
                type = type.map;
                var valueRef = this_1[_field] || new MapSchema_1.MapSchema();
                value = valueRef.clone(true);
                var length = decode.number(bytes, it);
                hasChange = (length > 0);
                var hasIndexChange = false;
                var previousKeys = Object.keys(valueRef);
                for (var i = 0; i < length; i++) {
                    if (bytes[it.offset] === undefined ||
                        bytes[it.offset] === spec_1.END_OF_STRUCTURE) {
                        break;
                    }
                    var isNilItem = decode.nilCheck(bytes, it) && ++it.offset;
                    var previousKey = void 0;
                    if (decode.indexChangeCheck(bytes, it)) {
                        decode.uint8(bytes, it);
                        previousKey = previousKeys[decode.number(bytes, it)];
                        hasIndexChange = true;
                    }
                    var hasMapIndex = decode.numberCheck(bytes, it);
                    var isSchemaType = typeof (type) !== "string";
                    var newKey = (hasMapIndex)
                        ? previousKeys[decode.number(bytes, it)]
                        : decode.string(bytes, it);
                    var item = void 0;
                    var isNew = (!hasIndexChange && valueRef[newKey] === undefined) || (hasIndexChange && previousKey === undefined && hasMapIndex);
                    if (isNew && isSchemaType) {
                        item = this_1.createTypeInstance(bytes, it, type);
                    }
                    else if (previousKey !== undefined) {
                        item = valueRef[previousKey];
                    }
                    else {
                        item = valueRef[newKey];
                    }
                    if (isNilItem) {
                        if (item && item.onRemove) {
                            try {
                                item.onRemove();
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        if (valueRef.onRemove) {
                            try {
                                valueRef.onRemove(item, newKey);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                        delete value[newKey];
                        continue;
                    }
                    else if (!isSchemaType) {
                        value[newKey] = decodePrimitiveType(type, bytes, it);
                    }
                    else {
                        item.decode(bytes, it);
                        value[newKey] = item;
                    }
                    if (isNew) {
                        if (valueRef.onAdd) {
                            try {
                                valueRef.onAdd(value[newKey], newKey);
                            }
                            catch (e) {
                                Schema.onError(e);
                            }
                        }
                    }
                    else if (valueRef.onChange) {
                        try {
                            valueRef.onChange(value[newKey], newKey);
                        }
                        catch (e) {
                            Schema.onError(e);
                        }
                    }
                }
            }
            else {
                value = decodePrimitiveType(type, bytes, it);
                hasChange = (value !== this_1[_field]);
            }
            if (hasChange && (this_1.onChange || this_1.$listeners[field])) {
                changes.push({
                    field: field,
                    value: value,
                    previousValue: this_1[_field]
                });
            }
            this_1[_field] = value;
        };
        var this_1 = this;
        while (it.offset < totalBytes) {
            var state_1 = _loop_1();
            if (state_1 === "break")
                break;
        }
        this._triggerChanges(changes);
        return this;
    };
    Schema.prototype.encode = function (root, encodeAll, client, bytes) {
        var _this = this;
        if (root === void 0) {
            root = this;
        }
        if (encodeAll === void 0) {
            encodeAll = false;
        }
        if (bytes === void 0) {
            bytes = [];
        }
        if (!this.$changes.changed && !encodeAll) {
            this._encodeEndOfStructure(this, root, bytes);
            return bytes;
        }
        var schema = this._schema;
        var indexes = this._indexes;
        var fieldsByIndex = this._fieldsByIndex;
        var filters = this._filters;
        var changes = Array.from((encodeAll)
            ? this.$changes.allChanges
            : this.$changes.changes).sort();
        var _loop_2 = function (i, l) {
            var field = fieldsByIndex[changes[i]] || changes[i];
            var _field = "_" + field;
            var type = schema[field];
            var filter = (filters && filters[field]);
            var value = this_2[_field];
            var fieldIndex = indexes[field];
            if (value === undefined) {
                encode.uint8(bytes, spec_1.NIL);
                encode.number(bytes, fieldIndex);
            }
            else if (type._schema) {
                if (client && filter) {
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                if (!value) {
                    encode.uint8(bytes, spec_1.NIL);
                    encode.number(bytes, fieldIndex);
                }
                else {
                    encode.number(bytes, fieldIndex);
                    assertInstanceType(value, type, this_2, field);
                    this_2.tryEncodeTypeId(bytes, type, value.constructor);
                    value.encode(root, encodeAll, client, bytes);
                }
            }
            else if (Array.isArray(type)) {
                var $changes = value.$changes;
                if (client && filter) {
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                encode.number(bytes, fieldIndex);
                encode.number(bytes, value.length);
                var arrayChanges = Array.from((encodeAll)
                    ? $changes.allChanges
                    : $changes.changes)
                    .filter(function (index) { return _this[_field][index] !== undefined; })
                    .sort(function (a, b) { return a - b; });
                var numChanges = arrayChanges.length;
                encode.number(bytes, numChanges);
                var isChildSchema = typeof (type[0]) !== "string";
                assertInstanceType(this_2[_field], ArraySchema_1.ArraySchema, this_2, field);
                for (var j = 0; j < numChanges; j++) {
                    var index = arrayChanges[j];
                    var item = this_2[_field][index];
                    if (isChildSchema) {
                        encode.number(bytes, index);
                        if (!encodeAll) {
                            var indexChange = $changes.getIndexChange(item);
                            if (indexChange !== undefined) {
                                encode.uint8(bytes, spec_1.INDEX_CHANGE);
                                encode.number(bytes, indexChange);
                            }
                        }
                        assertInstanceType(item, type[0], this_2, field);
                        this_2.tryEncodeTypeId(bytes, type[0], item.constructor);
                        item.encode(root, encodeAll, client, bytes);
                    }
                    else if (item !== undefined) {
                        encode.number(bytes, index);
                        encodePrimitiveType(type[0], bytes, item, this_2, field);
                    }
                }
                if (!encodeAll && !client) {
                    $changes.discard();
                }
            }
            else if (type.map) {
                var $changes = value.$changes;
                if (client && filter) {
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                encode.number(bytes, fieldIndex);
                var keys = Array.from((encodeAll)
                    ? $changes.allChanges
                    : $changes.changes);
                encode.number(bytes, keys.length);
                var previousKeys = Array.from($changes.allChanges);
                var isChildSchema = typeof (type.map) !== "string";
                var numChanges = keys.length;
                assertInstanceType(this_2[_field], MapSchema_1.MapSchema, this_2, field);
                for (var i_1 = 0; i_1 < numChanges; i_1++) {
                    var key = keys[i_1];
                    var item = this_2[_field][key];
                    var mapItemIndex = undefined;
                    if (encodeAll) {
                        if (item === undefined) {
                            continue;
                        }
                    }
                    else {
                        var indexChange = $changes.getIndexChange(item);
                        if (item && indexChange !== undefined) {
                            encode.uint8(bytes, spec_1.INDEX_CHANGE);
                            encode.number(bytes, this_2[_field]._indexes.get(indexChange));
                        }
                        mapItemIndex = (!$changes.isDeleted(key) || !item)
                            ? this_2[_field]._indexes.get(key)
                            : undefined;
                    }
                    var isNil = (item === undefined);
                    if (isNil) {
                        encode.uint8(bytes, spec_1.NIL);
                    }
                    if (mapItemIndex !== undefined) {
                        encode.number(bytes, mapItemIndex);
                    }
                    else {
                        encode.string(bytes, key);
                    }
                    if (item && isChildSchema) {
                        assertInstanceType(item, type.map, this_2, field);
                        this_2.tryEncodeTypeId(bytes, type.map, item.constructor);
                        item.encode(root, encodeAll, client, bytes);
                    }
                    else if (!isNil) {
                        encodePrimitiveType(type.map, bytes, item, this_2, field);
                    }
                }
                if (!encodeAll && !client) {
                    $changes.discard();
                    this_2[_field]._updateIndexes(previousKeys);
                }
            }
            else {
                if (client && filter) {
                    if (!filter.call(this_2, client, value, root)) {
                        return "continue";
                    }
                }
                encode.number(bytes, fieldIndex);
                encodePrimitiveType(type, bytes, value, this_2, field);
            }
        };
        var this_2 = this;
        for (var i = 0, l = changes.length; i < l; i++) {
            _loop_2(i, l);
        }
        this._encodeEndOfStructure(this, root, bytes);
        if (!encodeAll && !client) {
            this.$changes.discard();
        }
        return bytes;
    };
    Schema.prototype.encodeFiltered = function (client, bytes) {
        return this.encode(this, false, client, bytes);
    };
    Schema.prototype.encodeAll = function (bytes) {
        return this.encode(this, true, undefined, bytes);
    };
    Schema.prototype.encodeAllFiltered = function (client, bytes) {
        return this.encode(this, true, client, bytes);
    };
    Schema.prototype.clone = function () {
        var cloned = new (this.constructor);
        var schema = this._schema;
        for (var field in schema) {
            if (typeof (this[field]) === "object" &&
                typeof (this[field].clone) === "function") {
                cloned[field] = this[field].clone();
            }
            else {
                cloned[field] = this[field];
            }
        }
        return cloned;
    };
    Schema.prototype.triggerAll = function () {
        var changes = [];
        var schema = this._schema;
        for (var field in schema) {
            if (this[field] !== undefined) {
                changes.push({
                    field: field,
                    value: this[field],
                    previousValue: undefined
                });
            }
        }
        try {
            this._triggerChanges(changes);
        }
        catch (e) {
            Schema.onError(e);
        }
    };
    Schema.prototype.toJSON = function () {
        var schema = this._schema;
        var deprecated = this._deprecated;
        var obj = {};
        for (var field in schema) {
            if (!deprecated[field] && this[field] !== null && typeof (this[field]) !== "undefined") {
                obj[field] = (typeof (this[field].toJSON) === "function")
                    ? this[field].toJSON()
                    : this["_" + field];
            }
        }
        return obj;
    };
    Schema.prototype.discardAllChanges = function () {
        var schema = this._schema;
        var changes = Array.from(this.$changes.changes);
        var fieldsByIndex = this._fieldsByIndex;
        for (var index in changes) {
            var field = fieldsByIndex[index];
            var type = schema[field];
            var value = this[field];
            if (value === undefined) {
                continue;
            }
            if (type._schema) {
                value.discardAllChanges();
            }
            else if (Array.isArray(type)) {
                for (var i = 0, l = value.length; i < l; i++) {
                    var index_1 = value[i];
                    var item = this["_" + field][index_1];
                    if (typeof (type[0]) !== "string" && item) {
                        item.discardAllChanges();
                    }
                }
                value.$changes.discard();
            }
            else if (type.map) {
                var keys = value;
                var mapKeys = Object.keys(this["_" + field]);
                for (var i = 0; i < keys.length; i++) {
                    var key = mapKeys[keys[i]] || keys[i];
                    var item = this["_" + field][key];
                    if (item instanceof Schema && item) {
                        item.discardAllChanges();
                    }
                }
                value.$changes.discard();
            }
        }
        this.$changes.discard();
    };
    Schema.prototype._encodeEndOfStructure = function (instance, root, bytes) {
        if (instance !== root) {
            bytes.push(spec_1.END_OF_STRUCTURE);
        }
    };
    Schema.prototype.tryEncodeTypeId = function (bytes, type, targetType) {
        if (type._typeid !== targetType._typeid) {
            encode.uint8(bytes, spec_1.TYPE_ID);
            encode.uint8(bytes, targetType._typeid);
        }
    };
    Schema.prototype.createTypeInstance = function (bytes, it, type) {
        if (bytes[it.offset] === spec_1.TYPE_ID) {
            it.offset++;
            var anotherType = this.constructor._context.get(decode.uint8(bytes, it));
            return new anotherType();
        }
        else {
            return new type();
        }
    };
    Schema.prototype._triggerChanges = function (changes) {
        if (changes.length > 0) {
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                var listener = this.$listeners[change.field];
                if (listener) {
                    try {
                        listener.invoke(change.value, change.previousValue);
                    }
                    catch (e) {
                        Schema.onError(e);
                    }
                }
            }
            if (this.onChange) {
                try {
                    this.onChange(changes);
                }
                catch (e) {
                    Schema.onError(e);
                }
            }
        }
    };
    return Schema;
}());
exports.Schema = Schema;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVideoPanel = exports.reproduceVideo = void 0;
const spriteTransform = new Transform({ position: new Vector3(0, 1.975, -0.001), scale: new Vector3(-5.95, 3.95, 1) });
const spritePanel = new Entity();
spritePanel.addComponent(spriteTransform);
exports.reproduceVideo = (root, id) => {
    const resourceBaseUrl = `${engine["RESOURCE_BASE"] || globalThis["RESOURCE_BASE"] || ''}`;
    const myVideoClip = new VideoClip(`${resourceBaseUrl}video/${id}.mp4`);
    const myVideoTexture = new VideoTexture(myVideoClip);
    const myMaterial = new Material();
    myMaterial.transparencyMode = 1;
    myMaterial.specularIntensity = 1;
    myMaterial.roughness = 1;
    myMaterial.albedoTexture = myVideoTexture;
    const shape = new PlaneShape();
    shape.withCollisions = shape.isPointerBlocker = false;
    spritePanel.addComponentOrReplace(shape);
    spritePanel.addComponentOrReplace(myMaterial);
    spritePanel.setParent(root);
    myVideoTexture.playing = true;
    myVideoTexture.loop = true;
};
exports.removeVideoPanel = () => {
    spritePanel.setParent(null);
    engine.removeEntity(spritePanel);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGame = exports.GameScene = void 0;
let GameScene = class GameScene {
};
GameScene = __decorate([
    Component("game_scene")
], GameScene);
exports.GameScene = GameScene;
class BaseGame {
    constructor() {
        this.entity = {};
        this.callbacks = {
            onFinish: null,
            onShareState: null
        };
        const entities = engine.getEntitiesWithComponent("game_scene");
        console.log("entities when constructor", entities, entities.length);
        Object.keys(entities).forEach((key) => {
            engine.removeEntity(entities[key]);
        });
    }
    init() {
    }
    destroy() {
    }
    block() {
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onShareState() {
    }
    shareState(sharedState) {
    }
    update(dt) {
    }
}
exports.BaseGame = BaseGame;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveTransformComponent = void 0;
const transfromSystem_1 = __webpack_require__(7);
const interpolation_1 = __webpack_require__(12);
let MoveTransformComponent = class MoveTransformComponent {
    constructor(start, end, duration, onFinishCallback, interpolationType = interpolation_1.InterpolationType.LINEAR) {
        this.start = start;
        this.end = end;
        this.normalizedTime = 0;
        this.lerpTime = 0;
        this.onFinishCallback = onFinishCallback;
        this.interpolationType = interpolationType;
        if (duration != 0) {
            this.speed = 1 / duration;
        }
        else {
            this.speed = 0;
            this.normalizedTime = 1;
            this.lerpTime = 1;
        }
        transfromSystem_1.TransformSystem.createAndAddToEngine();
    }
    update(dt) {
        this.normalizedTime = Scalar.Clamp(this.normalizedTime + dt * this.speed, 0, 1);
        this.lerpTime = interpolation_1.Interpolate(this.interpolationType, this.normalizedTime);
    }
    hasFinished() {
        return this.normalizedTime >= 1;
    }
    assignValueToTransform(transform) {
        transform.position = Vector3.Lerp(this.start, this.end, this.lerpTime);
    }
};
MoveTransformComponent = __decorate([
    Component('moveTransformComponent')
], MoveTransformComponent);
exports.MoveTransformComponent = MoveTransformComponent;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerSystem = void 0;
const interval_1 = __webpack_require__(30);
const delay_1 = __webpack_require__(29);
const expire_1 = __webpack_require__(31);
class TimerSystem {
    constructor() {
        this._components = [];
        TimerSystem._instance = this;
        this._components.push(interval_1.Interval);
        this._components.push(delay_1.Delay);
        this._components.push(expire_1.ExpireIn);
    }
    static createAndAddToEngine() {
        if (this._instance == null) {
            this._instance = new TimerSystem();
            engine.addSystem(this._instance);
        }
        return this._instance;
    }
    static registerCustomComponent(component) {
        this.createAndAddToEngine()._components.push(component);
    }
    update(dt) {
        this._components.forEach(component => {
            this.updateComponent(dt, component);
        });
    }
    updateComponent(dt, component) {
        let record = engine.getEntitiesWithComponent(component);
        for (const key in record) {
            if (record.hasOwnProperty(key)) {
                let entity = record[key];
                let timerComponent = entity.getComponent(component);
                timerComponent.elapsedTime += dt;
                if (timerComponent.elapsedTime >= timerComponent.targetTime) {
                    timerComponent.onTargetTimeReached(entity);
                }
            }
        }
    }
}
exports.TimerSystem = TimerSystem;
TimerSystem._instance = null;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_HOST = exports.WS_HOST = void 0;
exports.WS_HOST = `ws://localhost:2567`;
exports.HTTP_HOST = `http://localhost:2567`;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getHostData = exports.setHostData = void 0;
let hostData = null;
exports.setHostData = (_hostData) => {
    hostData = _hostData;
};
exports.getHostData = () => {
    return hostData;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrack = void 0;
const CostumeGame_1 = __webpack_require__(21);
const GameRepo_1 = __importDefault(__webpack_require__(23));
const MathGame_1 = __webpack_require__(34);
const ObstacleGame_1 = __webpack_require__(33);
const RotationGame_1 = __webpack_require__(24);
const DifferentGame_1 = __webpack_require__(35);
const seed_1 = __webpack_require__(3);
const FroggerGame_1 = __webpack_require__(36);
const AttackGame_1 = __webpack_require__(32);
function generateTrack(seed, minGames) {
    const randomizer = seed_1.seedGen.create(seed.toString());
    const NUM_GAMES = minGames;
    const repoGames = Object.values(GameRepo_1.default);
    let choosenGames = [];
    while (choosenGames.length < NUM_GAMES) {
        const choosenIndex = getRandomIntExcept(0, repoGames.length - 1, choosenGames.map(c => repoGames.indexOf(c)));
        choosenGames.push(repoGames[choosenIndex]);
        choosenGames = Array.from(new Set(choosenGames));
    }
    console.log("choosenGames", choosenGames.map(c => c.id));
    return choosenGames.map((choosen, index) => ({ Game: choosen }));
    return [
        { Game: CostumeGame_1.CostumeGame },
        { Game: RotationGame_1.RotationGame },
        { Game: MathGame_1.MathGame },
        { Game: AttackGame_1.AttackGame },
        { Game: DifferentGame_1.DifferentGame },
        { Game: ObstacleGame_1.ObstacleGame },
        { Game: FroggerGame_1.FroggerGame },
        { Game: AttackGame_1.AttackGame }
    ];
    function getRandomIntExcept(min, max, except) {
        let ran = Math.floor(randomizer.random() * (max + 1 - min));
        if (!except) {
            return ran;
        }
        while (~except.indexOf(ran)) {
            ran = min + Math.floor(randomizer.random() * (max + 1 - min));
        }
        return ran;
    }
}
exports.generateTrack = generateTrack;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CostumeGame = void 0;
const seed_1 = __webpack_require__(3);
const BaseGame_1 = __webpack_require__(15);
const Model_1 = __webpack_require__(56);
const collectionCreator_1 = __webpack_require__(61);
const collectionControl_1 = __webpack_require__(62);
const utils_1 = __webpack_require__(9);
const SpritePanel_1 = __webpack_require__(4);
const Sound_1 = __webpack_require__(2);
const gameUtils_1 = __webpack_require__(5);
const SpriteAnimation_1 = __webpack_require__(0);
const ROUNDS = 3;
class CostumeGame {
    constructor(root, { seed, currentPlayer, level, gameIndex }) {
        this.state = {
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            round: 0,
            score1: 0,
            score2: 0,
            started: false,
            finished: false,
            blocked: false,
            idle: true
        };
        this.entity = {};
        this.completion = { hair: false, glasses: false, shirt: false, pants: false };
        this.callbacks = {
            onFinish: null,
            onShareState: null,
            onFinishRound: null
        };
        this.root = root;
        this.gameSetup = { currentPlayer, seed, level, gameIndex };
        this.randomizer = seed_1.seedGen.create(seed.toString());
        this.scene = new Entity();
        this.scene.addComponent(new BaseGame_1.GameScene());
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.002)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        const modelDefinition = this.modelDefinition = {
            hair: this.getRandomInt(1, 10),
            shirt: this.getRandomInt(1, 5),
            pants: this.getRandomInt(1, 5),
            glasses: this.getRandomInt(1, 5)
        };
        const X_OFFSET = -0.05;
        this.entity.model = Model_1.createModel(this.scene, {
            modelDefinition: modelDefinition,
            position: new Vector3(0 + X_OFFSET, 2, 0),
            scale: new Vector3(1.5, 1.5, 1),
            showLabel: "model"
        });
        this.dollModel1 = Model_1.createModel(this.scene, {
            modelDefinition: {
                hair: 0,
                shirt: 0,
                pants: 0,
                glasses: 0
            },
            position: new Vector3(-1.5 + X_OFFSET, 2, 0),
            scale: new Vector3(1.5, 1.5, 1)
        });
        this.dollModel2 = Model_1.createModel(this.scene, {
            modelDefinition: {
                hair: 0,
                shirt: 0,
                pants: 0,
                glasses: 0
            },
            position: new Vector3(1.5 + X_OFFSET, 2, 0),
            scale: new Vector3(1.5, 1.5, 1),
        });
        this.collection = collectionCreator_1.createCollection(this.getRandomInt.bind(this), modelDefinition);
        console.log("model", modelDefinition);
        console.log("this.collection", this.collection);
        this.collection.forEach((i) => {
            if (!i) {
                debugger;
            }
        });
        try {
            console.log(Array.from(new Set(this.collection.map((i) => `${i && i.type}${i && i.index}`))));
            if (currentPlayer) {
                this.collectionControl = collectionControl_1.createCollectionControl(this.scene, {
                    collection: this.collection,
                    side: currentPlayer
                });
            }
        }
        catch (err) {
            debugger;
        }
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.primaryButtonCallback = this.primaryButtonCallback.bind(this);
        this.secondaryButtonCallback = this.secondaryButtonCallback.bind(this);
        this.clickCallback = this.clickCallback.bind(this);
        engine.addSystem(this);
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    init() {
        Sound_1.playLoop("money", { volume: 0.5 });
        SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(5, 0, 192, 128) });
        SpritePanel_1.showSpritePanel();
        this.state.initialized = true;
    }
    start() {
        this.scene.setParent(this.root);
        this.state.started = true;
        if (this.gameSetup.currentPlayer) {
            Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, this.primaryButtonCallback);
            Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, this.secondaryButtonCallback);
            Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, this.clickCallback);
        }
    }
    startRound() {
        this.state.round++;
        console.log("startRound");
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.ui.hideTime();
        this.state.blocked = false;
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        this.state.waitingRound = false;
        const modelDefinition = this.modelDefinition = {
            hair: this.getRandomInt(1, 10),
            shirt: this.getRandomInt(1, 5),
            pants: this.getRandomInt(1, 5),
            glasses: this.getRandomInt(1, 5)
        };
        Object.keys(modelDefinition).forEach((type) => {
            this.entity.model.update({ type, index: modelDefinition[type] });
            this.dollModel1.update({ type, index: 0 });
            this.dollModel2.update({ type, index: 0 });
            this.completion[type] = false;
        });
        this.collection = collectionCreator_1.createCollection(this.getRandomInt.bind(this), modelDefinition);
        if (this.gameSetup.currentPlayer) {
            this.collectionControl = collectionControl_1.createCollectionControl(this.scene, {
                collection: this.collection,
                side: this.gameSetup.currentPlayer
            });
        }
    }
    block() {
        this.state.blocked = true;
    }
    finish({ winner }) {
        console.log("finish", winner);
        const nonWinner = winner === 1 ? 2 : 1;
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    finishRound({ winner }) {
        console.log("finishRound", winner);
        this.state.blocked = true;
        this.state[`score${winner}`] += 1;
        this.ui.updateScore({ player: winner, score: this.state[`score${winner}`] });
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this.state.waitingRound = true;
        this.collectionControl && this.collectionControl.dispose();
        Object.keys(this.modelDefinition).forEach((type) => {
            this.entity.model.update({ type, index: 0 });
        });
        const nonWinner = winner === 1 ? 2 : 1;
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
        return () => this.callbacks.onFinishRound = null;
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
    setRoundStartTime(roundStartTime) {
        this.state.roundStartTime = roundStartTime;
    }
    shareState({ player, completion, timeSinceStart }) {
        Object.keys(completion).forEach((type) => {
            if (completion[type]) {
                this[`dollModel${player}`].update({
                    type,
                    index: this.modelDefinition[type]
                });
            }
        });
        if (timeSinceStart) {
            this.ui.updateTime({ player, time: timeSinceStart });
        }
    }
    clickCallback() {
        if (this.state.blocked)
            return;
        console.log("collectionControl.getCurrent()", this.collectionControl.getCurrent());
        const currentPartDefinition = this.collectionControl.getCurrent();
        if (!currentPartDefinition) {
            debugger;
        }
        if (this.modelDefinition[currentPartDefinition.type] === currentPartDefinition.index) {
            console.log("YES", currentPartDefinition);
            Sound_1.playOnce("ok");
            this[`dollModel${this.gameSetup.currentPlayer}`].update(currentPartDefinition);
            this.completion[currentPartDefinition.type] = true;
            if (Object.values(this.completion).every(i => i)) {
                console.log("COMPLETE", this.completion);
                const timeSinceStart = utils_1.getTimeSinceStart((this.state.round === 0) ? this.state.startTime : this.state.lastRoundStartTime);
                this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceStart });
                this.callbacks.onShareState({ player: this.gameSetup.currentPlayer, completion: this.completion, timeSinceStart });
                if (this.state.round < ROUNDS - 1) {
                    this.callbacks.onFinishRound({ time: timeSinceStart, player: this.gameSetup.currentPlayer,
                        gameIndex: this.gameSetup.gameIndex, roundIndex: this.state.round });
                }
                else {
                    this.callbacks.onFinish({ time: timeSinceStart, isWinner: this.gameSetup.currentPlayer,
                        gameIndex: this.gameSetup.gameIndex, roundIndex: this.state.round });
                }
            }
            else {
                this.callbacks.onShareState({ player: this.gameSetup.currentPlayer, completion: this.completion });
            }
        }
        else {
            console.log("NO");
            Sound_1.playOnce("fail");
            this.state.blocked = true;
            this.collectionControl.showError();
            setTimeout(() => {
                this.collectionControl.hideError();
                this.state.blocked = false;
            }, 500);
        }
    }
    primaryButtonCallback() {
        if (this.state.blocked)
            return;
        this.collectionControl.previous();
    }
    secondaryButtonCallback() {
        if (this.state.blocked)
            return;
        this.collectionControl.next();
    }
    destroy() {
        Sound_1.stopSound("money");
        SpritePanel_1.hideSpritePanel();
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        engine.removeSystem(this);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.primaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.secondaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.clickCallback);
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        if (!this.state.waitingRound && !this.state.started && Date.now() >= this.state.startTime) {
            this.start();
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            this.startRound();
        }
    }
    getRandomInt(min, max, except) {
        const result = min + Math.floor(this.randomizer.random() * (max - min + 1));
        return (result === except) ? this.getRandomInt(min, max, except) : result;
    }
}
exports.CostumeGame = CostumeGame;
CostumeGame.id = 'Costume';
CostumeGame.instructions = `You have to complete the costume
    before your opponent
    E,F to roll parts
    CLICK to select`;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createCross = void 0;
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createCross = (root, { position, scale }) => {
    const cross = new Entity();
    const crossShape = new PlaneShape();
    crossShape.withCollisions = false;
    cross.addComponent(SpriteMaterial_1.spriteMaterial);
    crossShape.uvs = SpriteAnimation_1.getSpriteUv(32 * 32 - 31, 0, 32);
    cross.addComponent(crossShape);
    const crossTransform = new Transform({ position, scale });
    cross.addComponent(crossTransform);
    cross.setParent(root);
    return {
        dispose: () => {
            cross.setParent(null);
            engine.removeEntity(cross);
            cross.removeComponent(SpriteMaterial_1.spriteMaterial);
            cross.removeComponent(crossTransform);
            cross.removeComponent(crossShape);
        },
        hide: () => {
            crossShape.visible = false;
        },
        show: () => {
            crossShape.visible = true;
        },
        setPosition: ({ x, y, z }) => {
            crossTransform.position.set(x, y, z);
        }
    };
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const RotationGame_1 = __webpack_require__(24);
const AttackGame_1 = __webpack_require__(32);
const CostumeGame_1 = __webpack_require__(21);
const ObstacleGame_1 = __webpack_require__(33);
const MathGame_1 = __webpack_require__(34);
const SammichGame_1 = __webpack_require__(68);
const DifferentGame_1 = __webpack_require__(35);
const FroggerGame_1 = __webpack_require__(36);
exports.default = {
    DifferentGame: DifferentGame_1.DifferentGame,
    AttackGame: AttackGame_1.AttackGame,
    RotationGame: RotationGame_1.RotationGame,
    CostumeGame: CostumeGame_1.CostumeGame,
    ObstacleGame: ObstacleGame_1.ObstacleGame,
    MathGame: MathGame_1.MathGame,
    SammichGame: SammichGame_1.SammichGame,
    FroggerGame: FroggerGame_1.FroggerGame
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotationGame = void 0;
const index_1 = __importDefault(__webpack_require__(63));
const seed_1 = __webpack_require__(3);
const BaseGame_1 = __webpack_require__(15);
const utils_1 = __webpack_require__(9);
const SpriteMaterial_1 = __webpack_require__(1);
const SpritePanel_1 = __webpack_require__(4);
const Sound_1 = __webpack_require__(2);
const SpriteAnimation_1 = __webpack_require__(0);
const gameUtils_1 = __webpack_require__(5);
const ROUNDS = 5;
class RotationGame {
    constructor(root, { currentPlayer, seed, level = 1, gameIndex }) {
        this.state = {
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            started: false,
            roundStarted: false,
            round: 0,
            finished: false,
            score1: 0,
            score2: 0,
            idle: true,
            currentRotation: 0,
            answered: false
        };
        this.entity = {};
        this.callbacks = {
            onFinish: null,
            onShareState: null,
            onFinishRound: null
        };
        this.root = root;
        this.gameSetup = { currentPlayer, seed, level, gameIndex };
        this.randomizer = seed_1.seedGen.create(seed.toString());
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.002)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.scene.addComponent(new BaseGame_1.GameScene());
        this.player1 = gameUtils_1.createPlayerAnswer(this.scene, { player: 1 });
        this.player2 = gameUtils_1.createPlayerAnswer(this.scene, { player: 2 });
        this.player1.hide();
        this.player2.hide();
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        const image = this.entity.image = new Entity();
        const box = this.entity.box = new Entity();
        buildBox(box, SpriteMaterial_1.spriteMaterial, SpriteAnimation_1.getSpriteUv(10, (576 / 64) * (1024 / 64), 64, 64));
        buildBox(image, SpriteMaterial_1.spriteMaterial, SpriteAnimation_1.getSpriteUv(9, (576 / 64) * (1024 / 64), 64, 64));
        this.state.rotationSerie = this.getRotationSerie(this.gameSetup.level);
        this.state.solution = this.state.rotationSerie.reduce((acc, current) => acc + current, 0);
        const correctSolution = this.state.correctSolution = this.getRandomInt(1, 3);
        this.state.solutions = [1, 2, 3].map((current) => {
            return current === correctSolution ? this.state.solution : (this.getRandomInt(1, 4, this.state.solution / 90)) * 90;
        });
        this.entity.solutions = this.state.solutions.map((solution, index) => {
            const solEntity = new Entity();
            this.buildSolution(solEntity, index, solution);
            solEntity.setParent(this.scene);
            return solEntity;
        });
        engine.addSystem(this);
        this.onClickAnswer = this.onClickAnswer.bind(this);
        this.buildSolution = this.buildSolution.bind(this);
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    setRoundStartTime(roundStartTime) {
        this.state.roundStartTime = roundStartTime;
    }
    reset() {
    }
    getRotationSerie(level) {
        let numMov = 3;
        if (level >= 3 && level < 5) {
            numMov = 4;
        }
        else if (level >= 5) {
            numMov = 5;
        }
        let i = numMov;
        const movs = [];
        while (i--) {
            const ran = this.randomizer.random();
            movs.push(Math.floor(ran * 2) ? 90 : -90);
        }
        return movs;
    }
    finish({ winner }) {
        this.state.blocked = true;
        const nonWinner = winner === 1 ? 2 : 1;
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    finishRound({ winner }) {
        this.state.blocked = true;
        const nonWinner = winner === 1 ? 2 : 1;
        this.state[`score${winner}`] += 1;
        this.ui.updateScore({ player: winner, score: this.state[`score${winner}`] });
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this.entity.box.getComponent(Transform).rotation.setEuler(0, 0, 0);
        this.entity.box.getComponent(PlaneShape).visible = false;
        this.entity.image.getComponent(PlaneShape).visible = true;
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
        this.roundResult1.show();
        this.roundResult2.show();
        this.state.waitingRound = true;
    }
    shareState(sharedState) {
        this.state.shared = sharedState;
        const { round } = sharedState;
        if (round !== this.state.round)
            return;
        if (sharedState.type === "election" && sharedState.player !== this.gameSetup.currentPlayer) {
            const { x, y, z } = this.entity.solutions[sharedState.election - 1].getComponent(Transform).position;
            const isWinner = this.getIsWinner(this.state, sharedState.election);
            this[`player${sharedState.player}`].wrapperEntity.getComponent(Transform).position.set(x + (sharedState.player === 1 ? -0.3 : 0.3), y, z);
            this[`player${sharedState.player}`].show();
            this[`player${sharedState.player}`].setSprite(isWinner);
            this.ui.updateTime({ player: sharedState.player, time: sharedState.timeSinceAnswers });
        }
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
    init() {
        Sound_1.playLoop("money", { volume: 0.5 });
        SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(2, 0, 192, 128) });
        SpritePanel_1.showSpritePanel();
        this.entity.image.setParent(this.scene);
        this.entity.box.setParent(this.scene);
        this.entity.box.getComponent(PlaneShape).visible = false;
        this.state.initialized = true;
        this.scene.setParent(this.root);
    }
    destroy() {
        Sound_1.stopSound("money");
        SpritePanel_1.hideSpritePanel();
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        engine.removeSystem(this);
        this.callbacks.onFinish = null;
        this.callbacks.onShareState = null;
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        const ROTATION_TIME = this.state.round < 2
            ? 0.4
            : this.state.round < 3 ? 0.3 : 0.2;
        const DELAY_TIME = 0.2;
        if (!this.state.started && Date.now() >= (this.state.startTime)) {
            this.start(dt);
        }
        else if (this.state.started && !this.state.waitingRound && !this.state.roundStarted) {
            this.state.nextTime += dt;
            if (this.state.nextTime >= (ROTATION_TIME + DELAY_TIME)) {
                this.state.nextTime = 0;
                if (this.state.currentRotation < this.state.rotationSerie.length) {
                    const startQ = Quaternion.Euler(0, 0, 0);
                    const endQ = Quaternion.Euler(0, 0, this.state.rotationSerie[this.state.currentRotation]);
                    Sound_1.playOnce("swing");
                    this.entity.box.addComponentOrReplace(new index_1.default.RotateTransformComponent(startQ, endQ, ROTATION_TIME));
                    this.state.nextTime = 0;
                    this.state.currentRotation++;
                    this.entity.solutions.forEach(solution => solution.getComponent(PlaneShape).visible = false);
                    this.state.answersShown = false;
                }
                else {
                    if (!this.state.waitingRound && !this.state.answersShown) {
                        this.state.answersShown = true;
                        this.state.shownAnswersTime = Date.now();
                        this.entity.solutions.forEach(solution => solution.getComponent(PlaneShape).visible = true);
                    }
                }
            }
        }
        else if (this.state.started && !this.state.waitingRound && this.state.roundStarted) {
            this.state.nextTime += dt;
            if (this.state.nextTime >= (ROTATION_TIME + DELAY_TIME)) {
                this.state.nextTime = 0;
                if (this.state.currentRotation < this.state.rotationSerie.length) {
                    const startQ = Quaternion.Euler(0, 0, 0);
                    const endQ = Quaternion.Euler(0, 0, this.state.rotationSerie[this.state.currentRotation]);
                    Sound_1.playOnce("swing");
                    this.entity.box.addComponentOrReplace(new index_1.default.RotateTransformComponent(startQ, endQ, ROTATION_TIME));
                    this.state.nextTime = 0;
                    this.state.currentRotation++;
                    this.entity.solutions.forEach(solution => solution.getComponent(PlaneShape).visible = false);
                    this.state.answersShown = false;
                }
                else {
                    if (!this.state.waitingRound && !this.state.answersShown) {
                        this.state.blocked = false;
                        this.state.answersShown = true;
                        this.state.shownAnswersTime = Date.now();
                        this.entity.solutions.forEach(solution => solution.getComponent(PlaneShape).visible = true);
                    }
                }
            }
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            this.startRound();
        }
    }
    block() {
        this.state.blocked = true;
    }
    start(dt) {
        setTimeout(() => {
            this.state.idle = false;
            this.state.started = true;
            this.state.finished = false;
            this.state.nextTime = 0;
            this.entity.box.getComponent(PlaneShape).visible = true;
            this.entity.image.getComponent(PlaneShape).visible = false;
        }, 1000);
    }
    startRound() {
        this.state.round++;
        this.ui.hideTime();
        this.entity.solutions.forEach((solEntity) => {
            solEntity.getComponent(PlaneShape).visible = false;
        });
        this.player1.hide();
        this.player2.hide();
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        setTimeout(() => {
            this.state.blocked = false;
            this.state.waitingRound = false;
            this.state.answered = false;
            this.state.roundStarted = true;
            this.state.nextTime = 0;
            this.entity.box.getComponent(PlaneShape).visible = true;
            this.entity.image.getComponent(PlaneShape).visible = false;
            this.state.rotationSerie = this.getRotationSerie(this.state.round + 1);
            this.state.solution = this.state.rotationSerie.reduce((acc, current) => acc + current, 0);
            const correctSolution = this.state.correctSolution = this.getRandomInt(1, 3);
            this.state.solutions = [1, 2, 3].map((current) => {
                return current === correctSolution ? this.state.solution : (this.getRandomInt(1, 4, this.state.solution / 90)) * 90;
            });
            this.state.currentRotation = 0;
            this.entity.solutions.forEach((solution, index) => {
                solution.getComponent(Transform).rotation.setEuler(0, 0, 0);
                solution.getComponent(Transform).rotate(new Vector3(0, 0, 1), this.state.solutions[index]);
            });
        }, (1000 / (this.state.round * 500)) * 1000);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
        return () => this.callbacks.onFinishRound = null;
    }
    getIsWinner(state, election) {
        const electedEntity = this.entity.solutions[election - 1];
        const solutionEntity = this.entity.solutions[state.correctSolution - 1];
        if (getNormalizedRotation(solutionEntity) === getNormalizedRotation(electedEntity)) {
            return true;
        }
        else {
            console.log(`
                NOT WINNER
                --------------
                election: ${election}
                state.correctSolution: ${state.correctSolution}
                election rotation z: ${this.entity.solutions[election - 1].getComponent(Transform).rotation.eulerAngles.z}
                soltion rotation z: ${this.entity.solutions[state.correctSolution - 1].getComponent(Transform).rotation.eulerAngles.z}
            `);
            return false;
        }
        function getNormalizedRotation(entity) {
            const degrees = Math.round(entity.getComponent(Transform).rotation.eulerAngles.z) % 360;
            return degrees < 0 ? 360 - degrees : degrees;
        }
    }
    buildSolution(entity, num, rotation) {
        const plane = new PlaneShape();
        plane.visible = false;
        plane.withCollisions = false;
        const entityPos = { x: -1.1 + num * 1.1, y: 1.15, z: 0 };
        const transform = new Transform({
            position: new Vector3(entityPos.x, entityPos.y, entityPos.z),
            scale: new Vector3(1, 1, 0.0000001)
        });
        transform.rotate(new Vector3(0, 0, 1), rotation);
        entity.addComponent(SpriteMaterial_1.spriteMaterial);
        plane.withCollisions = false;
        plane.uvs = SpriteAnimation_1.getSpriteUv(12, (480 / 32) * (1024 / 32), 32, 32);
        entity.addComponent(plane);
        entity.addComponent(transform);
        this.gameSetup.currentPlayer
            && entity.addComponent(new OnClick(() => this.onClickAnswer(entity, entityPos, num)));
    }
    onClickAnswer(entity, entityPos, num) {
        if (this.state.answered)
            return;
        if (this.state.blocked)
            return;
        if (!this.state.initialized)
            return;
        if (this.state.finished)
            return;
        Sound_1.playOnce("swing");
        this[`player${this.gameSetup.currentPlayer}`].wrapperEntity.getComponent(Transform)
            .position.set(entityPos.x + (this.gameSetup.currentPlayer === 1 ? -0.2 : 0.2), entityPos.y, entityPos.z);
        this[`player${this.gameSetup.currentPlayer}`].show();
        this.state.blocked = true;
        this.state.answered = true;
        const isWinner = this.getIsWinner(this.state, num + 1);
        this[`player${this.gameSetup.currentPlayer}`].setSprite(isWinner);
        const timeSinceStart = utils_1.getTimeSinceStart((this.state.round === 0) ? this.state.startTime : this.state.lastRoundStartTime);
        const time = isWinner
            ? timeSinceStart
            : 999999999 - timeSinceStart;
        const timeSinceAnswers = Date.now() - this.state.shownAnswersTime;
        this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceAnswers });
        this.callbacks.onShareState({ type: 'election', player: this.gameSetup.currentPlayer, election: num + 1, time: timeSinceStart, timeSinceAnswers, round: this.state.round });
        if (this.state.round < ROUNDS - 1) {
            this.callbacks.onFinishRound({
                time, player: this.gameSetup.currentPlayer,
                gameIndex: this.gameSetup.gameIndex, roundIndex: this.state.round
            });
        }
        else {
            this.callbacks.onFinish({ time, isWinner, round: this.state.round,
                gameIndex: this.gameSetup.gameIndex, roundIndex: this.state.round });
        }
    }
    getRandomInt(min, max, except) {
        const result = Math.floor(this.randomizer.random() * (max - min + 1)) + min;
        return (result === except) ? this.getRandomInt(min, max, except) : result;
    }
}
exports.RotationGame = RotationGame;
RotationGame.id = 'Rotation';
RotationGame.timeToWaitForOtherAnswer = 2;
RotationGame.instructions = `Image is hidden and start rotating
    Click the correct solution`;
function buildBox(entity, material, uvs) {
    const plane = new PlaneShape();
    plane.withCollisions = false;
    plane.uvs = uvs;
    const transform = new Transform({
        scale: new Vector3(2, 2, 0.000001),
        position: new Vector3(0, 2.7, 0),
    });
    entity.addComponent(plane);
    entity.addComponent(material);
    entity.addComponent(transform);
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotateTransformComponent = void 0;
const transfromSystem_1 = __webpack_require__(7);
const interpolation_1 = __webpack_require__(12);
let RotateTransformComponent = class RotateTransformComponent {
    constructor(start, end, duration, onFinishCallback, interpolationType = interpolation_1.InterpolationType.LINEAR) {
        this.start = start;
        this.end = end;
        this.normalizedTime = 0;
        this.lerpTime = 0;
        this.onFinishCallback = onFinishCallback;
        this.interpolationType = interpolationType;
        if (duration != 0) {
            this.speed = 1 / duration;
        }
        else {
            this.speed = 0;
            this.normalizedTime = 1;
            this.lerpTime = 1;
        }
        transfromSystem_1.TransformSystem.createAndAddToEngine();
    }
    update(dt) {
        this.normalizedTime = Scalar.Clamp(this.normalizedTime + dt * this.speed, 0, 1);
        this.lerpTime = interpolation_1.Interpolate(this.interpolationType, this.normalizedTime);
    }
    hasFinished() {
        return this.normalizedTime >= 1;
    }
    assignValueToTransform(transform) {
        transform.rotation = Quaternion.Slerp(this.start, this.end, this.lerpTime);
    }
};
RotateTransformComponent = __decorate([
    Component('rotateTransformComponent')
], RotateTransformComponent);
exports.RotateTransformComponent = RotateTransformComponent;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleTransformComponent = void 0;
const transfromSystem_1 = __webpack_require__(7);
const interpolation_1 = __webpack_require__(12);
let ScaleTransformComponent = class ScaleTransformComponent {
    constructor(start, end, duration, onFinishCallback, interpolationType = interpolation_1.InterpolationType.LINEAR) {
        this.start = start;
        this.end = end;
        this.normalizedTime = 0;
        this.lerpTime = 0;
        this.onFinishCallback = onFinishCallback;
        this.interpolationType = interpolationType;
        if (duration != 0) {
            this.speed = 1 / duration;
        }
        else {
            this.speed = 0;
            this.normalizedTime = 1;
            this.lerpTime = 1;
        }
        transfromSystem_1.TransformSystem.createAndAddToEngine();
    }
    update(dt) {
        this.normalizedTime = Scalar.Clamp(this.normalizedTime + dt * this.speed, 0, 1);
        this.lerpTime = interpolation_1.Interpolate(this.interpolationType, this.normalizedTime);
    }
    hasFinished() {
        return this.normalizedTime >= 1;
    }
    assignValueToTransform(transform) {
        transform.scale = Vector3.Lerp(this.start, this.end, this.lerpTime);
    }
};
ScaleTransformComponent = __decorate([
    Component('scaleTransformComponent')
], ScaleTransformComponent);
exports.ScaleTransformComponent = ScaleTransformComponent;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowPathComponent = void 0;
const transfromSystem_1 = __webpack_require__(7);
let FollowPathComponent = class FollowPathComponent {
    constructor(points, duration, onFinishCallback, onPointReachedCallback) {
        this.speed = [];
        this.normalizedTime = 0;
        this.currentIndex = 0;
        this.points = points;
        this.onFinishCallback = onFinishCallback;
        this.onPointReachedCallback = onPointReachedCallback;
        if (points.length < 2) {
            throw new Error('At least 2 points are needed for FollowPathComponent.');
        }
        if (duration > 0) {
            let sqTotalDist = 0;
            let sqPointsDist = [];
            for (let i = 0; i < points.length - 1; i++) {
                let sqDist = Vector3.DistanceSquared(points[i], points[i + 1]);
                sqTotalDist += sqDist;
                sqPointsDist.push(sqDist);
            }
            for (let i = 0; i < sqPointsDist.length; i++) {
                this.speed.push(1 / ((sqPointsDist[i] / sqTotalDist) * duration));
            }
        }
        else {
            this.normalizedTime = 1;
            this.currentIndex = points.length - 2;
        }
        transfromSystem_1.TransformSystem.createAndAddToEngine();
    }
    update(dt) {
        this.normalizedTime = Scalar.Clamp(this.normalizedTime + dt * this.speed[this.currentIndex], 0, 1);
        if (this.normalizedTime >= 1 &&
            this.currentIndex < this.points.length - 2) {
            this.currentIndex++;
            this.normalizedTime = 0;
            if (this.onPointReachedCallback &&
                this.currentIndex < this.points.length - 1)
                this.onPointReachedCallback(this.points[this.currentIndex], this.points[this.currentIndex + 1]);
        }
    }
    hasFinished() {
        return (this.currentIndex >= this.points.length - 2 && this.normalizedTime >= 1);
    }
    assignValueToTransform(transform) {
        transform.position = Vector3.Lerp(this.points[this.currentIndex], this.points[this.currentIndex + 1], this.normalizedTime);
    }
};
FollowPathComponent = __decorate([
    Component('followPathComponent')
], FollowPathComponent);
exports.FollowPathComponent = FollowPathComponent;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepRotatingComponent = void 0;
const transfromSystem_1 = __webpack_require__(7);
let KeepRotatingComponent = class KeepRotatingComponent {
    constructor(rotationVelocity, onFinishCallback) {
        this.rotationVelocity = rotationVelocity;
        this.onFinishCallback = onFinishCallback;
        this.rotation = Quaternion.Identity;
        this.finished = false;
        transfromSystem_1.TransformSystem.createAndAddToEngine();
    }
    update(dt) {
        this.rotation = Quaternion.Slerp(Quaternion.Identity, this.rotationVelocity, dt);
    }
    hasFinished() {
        return this.finished;
    }
    assignValueToTransform(transform) {
        transform.rotation = transform.rotation.multiply(this.rotation);
    }
    stop() {
        this.finished = true;
    }
};
KeepRotatingComponent = __decorate([
    Component('keepRotatingComponent')
], KeepRotatingComponent);
exports.KeepRotatingComponent = KeepRotatingComponent;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delay = void 0;
const timerSystem_1 = __webpack_require__(17);
let Delay = class Delay {
    constructor(millisecs, onTimeReachedCallback) {
        timerSystem_1.TimerSystem.createAndAddToEngine();
        this.elapsedTime = 0;
        this.targetTime = millisecs / 1000;
        this.onTimeReachedCallback = onTimeReachedCallback;
        this.onTargetTimeReached = entity => {
            if (this.onTimeReachedCallback)
                this.onTimeReachedCallback();
            entity.removeComponent(this);
        };
    }
    setCallback(onTimeReachedCallback) {
        this.onTimeReachedCallback = onTimeReachedCallback;
    }
};
Delay = __decorate([
    Component('timerDelay')
], Delay);
exports.Delay = Delay;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = void 0;
const timerSystem_1 = __webpack_require__(17);
let Interval = class Interval {
    constructor(millisecs, onTimeReachedCallback) {
        timerSystem_1.TimerSystem.createAndAddToEngine();
        this.elapsedTime = 0;
        this.targetTime = millisecs / 1000;
        this.onTimeReachedCallback = onTimeReachedCallback;
        this.onTargetTimeReached = () => {
            this.elapsedTime = 0;
            if (this.onTimeReachedCallback)
                this.onTimeReachedCallback();
        };
    }
    setCallback(onTimeReachedCallback) {
        this.onTimeReachedCallback = onTimeReachedCallback;
    }
};
Interval = __decorate([
    Component('timerInterval')
], Interval);
exports.Interval = Interval;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpireIn = void 0;
const timerSystem_1 = __webpack_require__(17);
let ExpireIn = class ExpireIn {
    constructor(millisecs, onTimeReachedCallback) {
        timerSystem_1.TimerSystem.createAndAddToEngine();
        this.elapsedTime = 0;
        this.targetTime = millisecs / 1000;
        this.onTimeReachedCallback = onTimeReachedCallback;
        this.onTargetTimeReached = entity => {
            if (this.onTimeReachedCallback)
                this.onTimeReachedCallback();
            entity.removeComponent(this);
            engine.removeEntity(entity);
        };
    }
    setCallback(onTimeReachedCallback) {
        this.onTimeReachedCallback = onTimeReachedCallback;
    }
};
ExpireIn = __decorate([
    Component('timerExpireIn')
], ExpireIn);
exports.ExpireIn = ExpireIn;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AttackGame = void 0;
const BaseGame_1 = __webpack_require__(15);
const seed_1 = __webpack_require__(3);
const utils_1 = __webpack_require__(9);
const SpriteMaterial_1 = __webpack_require__(1);
const SpritePanel_1 = __webpack_require__(4);
const Sound_1 = __webpack_require__(2);
const SpriteAnimation_1 = __webpack_require__(0);
const gameUtils_1 = __webpack_require__(5);
const MOVE = {
    DEFEND: 0,
    ATTACK: 1
};
const SPRITE_OFFSET = (640 / 71) * (1024 / 64);
const ROUNDS = 11;
let count = 0;
const KEYS = {
    E: 1,
    F: 2,
    CLICK: 3
};
class AttackGame {
    constructor(root, { currentPlayer, seed, level, gameIndex }) {
        this.state = {
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            initialized: false,
            round: 0,
            idle: true,
            started: false,
            blocked: false,
            finished: false,
            player1Key: -1,
            player2Key: -2,
        };
        this.callbacks = {
            onFinish: null,
            onFinishRound: null,
            onShareState: null
        };
        this.score1 = 0;
        this.score2 = 0;
        console.log("currentPlayer", currentPlayer);
        count++;
        this.id = count;
        const entities = engine.getEntitiesWithComponent("game_scene");
        console.log("entities when constructor", entities, entities.length);
        Object.keys(entities).forEach((key) => {
            engine.removeEntity(entities[key]);
        });
        this.root = root;
        this.gameSetup = { currentPlayer, seed, level, gameIndex };
        this.randomizer = seed_1.seedGen.create(seed.toString());
        this.scene = new Entity();
        this.scene.addComponent(new BaseGame_1.GameScene());
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.002)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.label1 = SpriteAnimation_1.createSpriteEntity(this.scene, {
            position: new Vector3(-1.5, 3.5, -0.001),
            uvs: SpriteAnimation_1.getSpriteUv(4, (384 / 32) * (1024 / 32), 32, 32),
            scale: new Vector3(1, 1, 1)
        });
        this.label2 = SpriteAnimation_1.createSpriteEntity(this.scene, {
            position: new Vector3(1.5, 3.5, -0.001),
            uvs: SpriteAnimation_1.getSpriteUv(4, (384 / 32) * (1024 / 32), 32, 32),
            scale: new Vector3(1, 1, 1)
        });
        this.label1.hide();
        this.label2.hide();
        this.char1 = new Entity();
        this.char2 = new Entity();
        this.char1.addComponent(SpriteMaterial_1.spriteMaterial);
        this.char2.addComponent(SpriteMaterial_1.spriteMaterial);
        this.char1.addComponent(new Transform({ position: new Vector3(-1, 2, 0), scale: new Vector3(2, 2, 1) }));
        this.char2.addComponent(new Transform({ position: new Vector3(1, 2, 0), scale: new Vector3(-2, 2, 1) }));
        this.char1.setParent(this.scene);
        this.char2.setParent(this.scene);
        this.char1Shape = new PlaneShape();
        this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(1, SPRITE_OFFSET, 64, 71);
        this.char2Shape = new PlaneShape();
        this.char2Shape.uvs = SpriteAnimation_1.getSpriteUv(1, SPRITE_OFFSET, 64, 71);
        this.char1.addComponent(this.char1Shape);
        this.char2.addComponent(this.char2Shape);
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.state = Object.assign(Object.assign({}, this.state), { player1Key: 1 + Math.floor(this.randomizer.random() * 3), player2Key: 1 + Math.floor(this.randomizer.random() * 3), started: false });
        engine.addSystem(this);
    }
    setStartTime(startTime) {
        console.log("SET_START_TIME", startTime);
        this.state.startTime = startTime;
    }
    reset() {
    }
    setRoundStartTime(roundStartTime) {
        console.log("setRoundStartTime", roundStartTime);
        this.state.roundStartTime = roundStartTime;
    }
    finishRound({ winner }) {
        this.label1.hide();
        this.label2.hide();
        Sound_1.stopSound("swing");
        Sound_1.playOnce("hit");
        this[`score${winner}`] += 1;
        this.ui.updateScore({ player: winner, score: this[`score${winner}`] });
        if (winner !== this.gameSetup.currentPlayer) {
            setTimeout(() => {
                Sound_1.playOnce("fail");
            }, 500);
        }
        else {
            setTimeout(() => {
                Sound_1.playOnce("ok");
            }, 500);
        }
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.primaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.secondaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.clickButtonCallback);
        console.log("finish round", winner);
        const endUVParams = [3, (640 / 71) * (1024 / 128), 128, 71];
        if (winner === 1) {
            this.char2Shape.visible = false;
            const t = this.char1.getComponent(Transform);
            t.scale.set(4, 2, 1);
            t.position.set(0, 2, 0);
            this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(...endUVParams);
        }
        else {
            this.char2Shape.visible = false;
            const t = this.char1.getComponent(Transform);
            t.scale.set(-4, 2, 1);
            t.position.set(0, 2, 0);
            this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(...endUVParams);
        }
        const nonWinner = winner === 1 ? 2 : 1;
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
        this.roundResult1.show();
        this.roundResult2.show();
        this.state.waitingRound = true;
    }
    handleAction(isWinner) {
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.primaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.secondaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.clickButtonCallback);
        this[`char${this.gameSetup.currentPlayer}Shape`].uvs = SpriteAnimation_1.getSpriteUv(3, SPRITE_OFFSET, 64, 71);
        const timeSinceStart = utils_1.getTimeSinceStart((this.state.round === 0) ? this.state.startTime : this.state.lastRoundStartTime);
        ;
        console.log("timeSinceStart", this.state.startTime, this.state.roundStartTime, timeSinceStart);
        const time = isWinner
            ? timeSinceStart
            : 999999999 - timeSinceStart;
        this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceStart });
        this.callbacks.onShareState({ player: this.gameSetup.currentPlayer, time, timeSinceStart, round: this.state.round });
        if (this.state.round < ROUNDS - 1) {
            this.callbacks.onFinishRound({
                player: this.gameSetup.currentPlayer,
                time,
                isWinner,
                gameIndex: this.gameSetup.gameIndex,
                roundIndex: this.state.round
            });
            this.state.waitingRound = true;
        }
        else {
            this.callbacks.onFinish({
                player: this.gameSetup.currentPlayer,
                time,
                isWinner,
                gameIndex: this.gameSetup.gameIndex
            });
        }
    }
    clickButtonCallback(e) {
        Sound_1.playOnce('swing');
        const isWinner = this.state[`player${this.gameSetup.currentPlayer}Key`] === KEYS.CLICK;
        this.handleAction(isWinner);
    }
    primaryButtonCallback(e) {
        Sound_1.playOnce('swing');
        const isWinner = this.state[`player${this.gameSetup.currentPlayer}Key`] === KEYS.E;
        this.handleAction(isWinner);
    }
    secondaryButtonCallback(e) {
        Sound_1.playOnce('swing');
        const isWinner = this.state[`player${this.gameSetup.currentPlayer}Key`] === KEYS.F;
        this.handleAction(isWinner);
    }
    init() {
        SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(4, 0, 192, 128) });
        SpritePanel_1.showSpritePanel();
        Sound_1.playLoop("battle", { volume: 0.5 });
        console.log(" -- init -- ");
        this.scene.setParent(this.root);
        this.state.initialized = true;
    }
    start() {
        console.log(" -- start -- ");
        this.state.round = 0;
        this.state.idle = false;
        this.state.finished = false;
        this.state.started = true;
        this.primaryButtonCallback = this.primaryButtonCallback.bind(this);
        this.secondaryButtonCallback = this.secondaryButtonCallback.bind(this);
        this.clickButtonCallback = this.clickButtonCallback.bind(this);
        this.gameSetup.currentPlayer && Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, this.primaryButtonCallback);
        this.gameSetup.currentPlayer && Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, this.secondaryButtonCallback);
        this.gameSetup.currentPlayer && Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, this.clickButtonCallback);
        this.label1.show();
        this.label2.show();
        this.label1.updateUvs(SpriteAnimation_1.getSpriteUv(this.state.player1Key, (384 / 32) * (1024 / 32) + 3, 32, 32));
        this.label2.updateUvs(SpriteAnimation_1.getSpriteUv(this.state.player2Key, (384 / 32) * (1024 / 32) + 3, 32, 32));
    }
    startRound() {
        this.state.round++;
        this.ui.hideTime();
        this.char2Shape.visible = true;
        const t = this.char1.getComponent(Transform);
        t.scale.set(2, 2, 1);
        t.position.set(-1, 2, 0);
        this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(1, SPRITE_OFFSET, 64, 71);
        this.char2Shape.uvs = SpriteAnimation_1.getSpriteUv(1, SPRITE_OFFSET, 64, 71);
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        console.log("start round");
        this.state.idle = false;
        this.state.started = true;
        this.state.waitingRound = false;
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, this.primaryButtonCallback);
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, this.secondaryButtonCallback);
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, this.clickButtonCallback);
        this.state = Object.assign(Object.assign({}, this.state), { player1Key: 1 + Math.floor(this.randomizer.random() * 3), player2Key: 1 + Math.floor(this.randomizer.random() * 3) });
        this.label1.show();
        this.label2.show();
        this.label1.updateUvs(SpriteAnimation_1.getSpriteUv(this.state.player1Key, (384 / 32) * (1024 / 32) + 3, 32, 32));
        this.label2.updateUvs(SpriteAnimation_1.getSpriteUv(this.state.player2Key, (384 / 32) * (1024 / 32) + 3, 32, 32));
    }
    destroy() {
        Sound_1.stopAllSounds();
        SpritePanel_1.hideSpritePanel();
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.primaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.secondaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.clickButtonCallback);
        console.log("changing scene parent to null");
        const entities = engine.getEntitiesWithComponent("game_scene");
        console.log(entities, entities.length);
        Object.keys(entities).forEach((key) => {
        });
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        console.log("remove scene");
        engine.removeSystem(this);
    }
    finish(result) {
        this.label1.hide();
        this.label2.hide();
        const { winner } = result;
        console.log("RESULT", winner);
        const nonWinner = winner === 1 ? 2 : 1;
        Sound_1.stopSound("swing");
        Sound_1.playOnce("hit");
        if (winner !== this.gameSetup.currentPlayer) {
            Sound_1.playOnce("fail");
        }
        else {
            Sound_1.playOnce("ok");
        }
        const endUVParams = [3, (640 / 71) * (1024 / 128), 128, 71];
        if (winner === 1) {
            this.char2Shape.visible = false;
            const t = this.char1.getComponent(Transform);
            t.scale.set(4, 2, 1);
            t.position.set(0, 2, 0);
            this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(...endUVParams);
        }
        else {
            this.char2Shape.visible = false;
            const t = this.char1.getComponent(Transform);
            t.scale.set(-4, 2, 1);
            t.position.set(0, 2, 0);
            this.char1Shape.uvs = SpriteAnimation_1.getSpriteUv(...endUVParams);
        }
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    block() {
        this.state.blocked = true;
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.primaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.secondaryButtonCallback);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.clickButtonCallback);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => {
            this.callbacks.onFinish = null;
        };
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
        return () => this.callbacks.onFinishRound = null;
    }
    shareState(sharedState) {
        console.log("shareState", sharedState, this.gameSetup.currentPlayer);
        const { player, timeSinceStart, time, round } = sharedState;
        if (round !== this.state.round)
            return;
        this[`char${player}Shape`].uvs = SpriteAnimation_1.getSpriteUv(3, SPRITE_OFFSET, 64, 71);
        this.ui.updateTime({ player, time: timeSinceStart });
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
    update(dt) {
        if (!this.state.initialized) {
            return;
        }
        if (!this.state.waitingRound && !this.state.started && Date.now() >= this.state.startTime) {
            console.log("start");
            this.start();
            return;
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            console.log("startRound");
            this.startRound();
        }
        else if (Date.now() >= this.state.roundStartTime) {
        }
    }
}
exports.AttackGame = AttackGame;
AttackGame.id = 'Attack';
AttackGame.timeToWaitForOtherAnswer = 1;
AttackGame.instructions = `2 old warriors on each player side, 
    faster than your opponent,
    press the appropriate key: E, F or CLICK`;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObstacleGame = void 0;
const seed_1 = __webpack_require__(3);
const Screen_1 = __webpack_require__(67);
const Sound_1 = __webpack_require__(2);
const TextPanel_1 = __webpack_require__(6);
const gameUtils_1 = __webpack_require__(5);
const generateTrack = ({ getRandomInt, level }) => {
    const length = Math.log(level + 1) * 80;
    let i = length;
    let track = [];
    const minLength = 2;
    const maxLength = 8;
    let firstTime = true;
    while (track.length < length) {
        track.push(...[...(new Array(getRandomInt(minLength, maxLength) + (firstTime ? 4 : 0)).fill(0)), 1]);
        firstTime = false;
    }
    track.push(...(new Array(3).fill(0)));
    return track;
};
class ObstacleGame {
    constructor(root, { seed, currentPlayer, level = 1, gameIndex }) {
        this.state = {
            initialized: false,
            started: false,
            currentLeg: 1,
            blocked: true,
            startTime: Number.MAX_VALUE
        };
        this.callbacks = {
            onFinish: null,
            onShareState: null
        };
        this.root = root;
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.001)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.gameSetup = { seed: seed.toString(), currentPlayer, level, gameIndex };
        ;
        this.randomizer = seed_1.seedGen.create(seed.toString());
        const otherPlayer = currentPlayer === 1 ? 2 : 1;
        const track = generateTrack({ getRandomInt: this.getRandomInt.bind(this), level });
        console.log("TRACK !!", track);
        this.screen1 = Screen_1.createScreen(this.scene, { player: 1, track });
        this.screen2 = Screen_1.createScreen(this.scene, { player: 2, track });
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.moveLeg1 = this.moveLeg1.bind(this);
        this.moveLeg2 = this.moveLeg2.bind(this);
        this.jump = this.jump.bind(this);
        engine.addSystem(this);
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    getPlayerScreen(player) {
        return this[`screen${player}`];
    }
    init() {
        this.state.initialized = true;
        this.scene.setParent(this.root);
    }
    tempBlock() {
        this.state.blocked = true;
        this[`screen${this.gameSetup.currentPlayer}`].showCross();
        Sound_1.playOnce("fail");
        setTimeout(() => {
            this.state.blocked = false;
            this[`screen${this.gameSetup.currentPlayer}`].hideCross();
        }, 1000);
    }
    moveLeg1() {
        if (this.state.blocked || !this.state.started)
            return;
        const currentPlayerScreen = this.getPlayerScreen(this.gameSetup.currentPlayer);
        if (this.state.blocked || this.state.currentLeg !== 1 || currentPlayerScreen.getScreenState().moving)
            return;
        currentPlayerScreen.moveScreen();
        this.state.currentLeg = 2;
        if (currentPlayerScreen.getNextStepValue()) {
            this.tempBlock();
        }
        else {
            Sound_1.playOnce("ok");
        }
        const percentage = this.getPercentage(this.gameSetup.currentPlayer);
        console.log("percentage", percentage);
        this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: percentage });
        this.callbacks.onShareState({ movement: '1', player: this.gameSetup.currentPlayer, percentage });
    }
    moveLeg2() {
        if (this.state.blocked || !this.state.started)
            return;
        const currentPlayerScreen = this.getPlayerScreen(this.gameSetup.currentPlayer);
        if (this.state.blocked || this.state.currentLeg !== 2 || currentPlayerScreen.getScreenState().moving)
            return;
        currentPlayerScreen.moveScreen();
        this.state.currentLeg = 1;
        if (currentPlayerScreen.getNextStepValue()) {
            this.tempBlock();
        }
        else {
            Sound_1.playOnce("ok");
        }
        const percentage = this.getPercentage(this.gameSetup.currentPlayer);
        this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: percentage });
        this.callbacks.onShareState({ movement: '2', player: this.gameSetup.currentPlayer, percentage });
    }
    jump() {
        if (this.state.blocked || !this.state.started)
            return;
        const currentPlayerScreen = this.getPlayerScreen(this.gameSetup.currentPlayer);
        if (currentPlayerScreen.getNextStepValue() !== 1)
            return;
        if (currentPlayerScreen.getScreenState().moving)
            return;
        currentPlayerScreen.moveScreen(true);
        const percentage = this.getPercentage(this.gameSetup.currentPlayer, true);
        this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: percentage });
        this.callbacks.onShareState({ movement: 'jump', player: this.gameSetup.currentPlayer, percentage });
        Sound_1.playOnce("jump");
    }
    getPercentage(player, isJump) {
        const currentStep = this[`screen${player}`].getScreenState().currentStep + (isJump ? 2 : 1);
        const totalSteps = this[`screen${player}`].getTotalSteps() - 4;
        return Math.floor(currentStep * 100 / totalSteps);
    }
    start() {
        this.state.started = true;
        (() => __awaiter(this, void 0, void 0, function* () {
            Sound_1.playLoop("race", { volume: 0.5 });
            yield sleep(3000);
            Sound_1.playOnce("readygo");
            TextPanel_1.updateTextPanel({ value: "READY!" });
            yield sleep(700);
            TextPanel_1.updateTextPanel({ value: "STEADY!" });
            yield sleep(800);
            TextPanel_1.updateTextPanel({ value: "GO!" });
            console.log("START");
            const currentPlayerScreen = this.getPlayerScreen(this.gameSetup.currentPlayer);
            this.state.blocked = false;
            if (this.gameSetup.currentPlayer) {
                this.state.blocked = false;
                Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, this.moveLeg1);
                Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, this.moveLeg2);
                Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, this.jump);
            }
            currentPlayerScreen.onMove((currentStep) => {
                if (currentStep % 2 === 0) {
                }
            });
            currentPlayerScreen.onFinishScreen(() => {
                this.block();
                Sound_1.stopSound("race");
                const timeSinceStart = Date.now() - this.state.startTime;
                this.callbacks.onFinish({ time: timeSinceStart, isWinner: true, gameIndex: this.gameSetup.gameIndex, roundIndex: 0 });
                this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceStart });
                this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: 100 });
                this.callbacks.onShareState({ player: this.gameSetup.currentPlayer, timeSinceStart, percentage: 100 });
            });
            this.screen1.handleVisibility();
            this.screen2.handleVisibility();
            yield sleep(1000);
            TextPanel_1.updateTextPanel({ value: "" });
        }))();
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        if (!this.state.started && ((Date.now() - 4000) >= this.state.startTime)) {
            this.start();
            return;
        }
        if (this.state.started && this.getPlayerScreen(1).getScreenState().moving) {
            this.getPlayerScreen(1).updateScreen(dt);
        }
        if (this.state.started && this.getPlayerScreen(2).getScreenState().moving) {
            this.getPlayerScreen(2).updateScreen(dt);
        }
    }
    destroy() {
        Sound_1.stopSound("race");
        TextPanel_1.updateTextPanel({ value: "" });
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.moveLeg1);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.moveLeg2);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.jump);
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        engine.removeSystem(this);
    }
    block() {
        this.state.blocked = true;
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, this.moveLeg1);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, this.moveLeg2);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, this.jump);
    }
    finish({ winner }) {
        const nonWinner = winner === 1 ? 2 : 1;
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
    shareState(sharedState) {
        console.log("shareState", sharedState);
        const { movement, player, timeSinceStart, percentage } = sharedState;
        if (timeSinceStart) {
            this.ui.updateTime({ player, time: timeSinceStart });
        }
        else {
            const playerScreen = this.getPlayerScreen(player);
            if (movement === '1' || movement === '2') {
                playerScreen.moveScreen();
            }
            else {
                playerScreen.moveScreen(true);
            }
        }
        this.ui.updateScore({ player, score: percentage });
    }
    getRandomInt(min, max, except) {
        const result = Math.floor(this.randomizer.random() * (max - min + 1)) + min;
        return (result === except) ? this.getRandomInt(min, max, except) : result;
    }
}
exports.ObstacleGame = ObstacleGame;
ObstacleGame.id = "Obstacle";
ObstacleGame.instructions = `Alternate E and F  with rythm to run,
    when red obstacle right in front,
    Press click to jump!
    `;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MathGame = void 0;
const Sound_1 = __webpack_require__(2);
const SpriteMaterial_1 = __webpack_require__(1);
const SpritePanel_1 = __webpack_require__(4);
const seed_1 = __webpack_require__(3);
const utils_1 = __webpack_require__(9);
const SpriteAnimation_1 = __webpack_require__(0);
const gameUtils_1 = __webpack_require__(5);
const ROUNDS = 5;
const PIXEL = 4 / 128;
const TEACHER_OFFSET = (576 / 64) * (1024 / 64);
const createTeacher = (root, { player }) => {
    const entity = new Entity();
    const shape = new PlaneShape();
    shape.withCollisions = false;
    shape.uvs = SpriteAnimation_1.getSpriteUv(1, TEACHER_OFFSET, 64, 64);
    entity.addComponent(SpriteMaterial_1.spriteMaterial);
    entity.addComponent(shape);
    entity.addComponent(new Transform({
        position: new Vector3(player === 1 ? -(2.2 + PIXEL * 2) : 2.2 - PIXEL * 3, 1.5 - PIXEL * 2, -0.002),
        scale: new Vector3(player === 1 ? 2 : -2, 2, 1)
    }));
    entity.setParent(root);
    return shape;
};
class MathGame {
    constructor(root, { seed, level, currentPlayer, gameIndex }) {
        this.state = {
            blocked: false,
            started: false,
            initialized: false,
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            round: 0,
            finished: false,
            score1: 0,
            score2: 0
        };
        this.callbacks = {
            onFinish: null,
            onShareState: null,
            onFinishRound: null
        };
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.002)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.teacher1 = createTeacher(this.scene, { player: 1 });
        this.teacher2 = createTeacher(this.scene, { player: 2 });
        this.player1 = gameUtils_1.createPlayerAnswer(this.scene, { player: 1 });
        this.player2 = gameUtils_1.createPlayerAnswer(this.scene, { player: 2 });
        this.player1.hide();
        this.player2.hide();
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.gameSetup = { seed, currentPlayer, level, gameIndex };
        this.root = root;
        this.randomizer = seed_1.seedGen.create(seed.toString());
        const question = new Entity();
        this.question = new TextShape("");
        this.question.withCollisions = false;
        this.question.vTextAlign = "top";
        this.question.fontSize = 5;
        question.addComponent(this.question);
        question.addComponent(new Transform({ position: new Vector3(0, 3.5, -0.001) }));
        question.setParent(this.scene);
        engine.addSystem(this);
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    setRoundStartTime(roundStartTime) {
        console.log("setRoundStartTime", roundStartTime);
        this.state.roundStartTime = roundStartTime;
    }
    onClickAnswer(index) {
        if (this.state.blocked || !this.state.started)
            return;
        this.state.blocked = true;
        Sound_1.playOnce('swing');
        const currentPlayerAnswer = this[`player${this.gameSetup.currentPlayer}`];
        currentPlayerAnswer.show();
        currentPlayerAnswer.wrapperEntity.getComponent(Transform)
            .position.set(this.answersT[index].position.x + (this.gameSetup.currentPlayer === 1 ? -0.2 : 0.2), this.answersT[index].position.y, this.answersT[index].position.z);
        const isWinner = this.answers[index].value === this.answers[this.solutionIndex].value;
        currentPlayerAnswer.setSprite(isWinner);
        const timeSinceStart = utils_1.getTimeSinceStart((this.state.round === 0) ? this.state.startTime : this.state.lastRoundStartTime);
        const time = isWinner
            ? timeSinceStart
            : 999999999 - timeSinceStart;
        this.callbacks.onShareState({ type: 'election', player: this.gameSetup.currentPlayer, index, time, timeSinceStart, round: this.state.round });
        this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceStart });
        if (this.state.round < ROUNDS - 1) {
            this.callbacks.onFinishRound({
                player: this.gameSetup.currentPlayer,
                time,
                round: this.state.round,
                isWinner,
                gameIndex: this.gameSetup.gameIndex,
                roundIndex: this.state.round
            });
            this.state.waitingRound = true;
        }
        else {
            this.callbacks.onFinish({
                player: this.gameSetup.currentPlayer,
                time,
                round: this.state.round,
                isWinner,
                gameIndex: this.gameSetup.gameIndex,
                roundIndex: this.state.round
            });
        }
    }
    init() {
        Sound_1.playLoop("money", { volume: 0.5 });
        this.state.initialized = true;
        SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(3, 0, 192, 128) });
        SpritePanel_1.showSpritePanel();
        this.scene.setParent(this.root);
    }
    block() {
        this.state.blocked = true;
    }
    destroy() {
        Sound_1.stopSound("money");
        SpritePanel_1.hideSpritePanel();
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
    }
    start() {
        this.ui.hideTime();
        const num1 = Math.floor(this.randomizer.random() * 50);
        const num2 = Math.floor(this.randomizer.random() * 50);
        this.question.value = `${num1} + ${num2}`;
        this.state.started = true;
        const solution = num1 + num2;
        const solutionIndex = this.solutionIndex = Math.floor(this.randomizer.random() * 6);
        const solutionMinus = solution - 1;
        const solutionMinusIndex = this.getRandomIntExcept(0, 5, [solutionIndex]);
        const solutionMinus10 = solution - 10;
        const solutionMinus10Index = this.getRandomIntExcept(0, 5, [solutionIndex, solutionMinusIndex]);
        this.answers = Array(6).fill(null);
        this.answersT = Array(6).fill(null);
        const answerValues = [];
        const answerShape = new PlaneShape();
        const answerMaterial = new Material();
        answerMaterial.albedoColor = new Color4(1, 1, 1, 0.05);
        this.answers.forEach((answerT, index) => {
            const answerE = new Entity();
            const answerWrapper = new Entity();
            answerShape.withCollisions = false;
            answerWrapper.addComponent(answerShape);
            answerWrapper.addComponent(answerMaterial);
            this.answers[index] = new TextShape();
            this.answers[index].withCollisions = false;
            this.answers[index].fontSize = 3;
            answerE.addComponent(this.answers[index]);
            if (index === solutionIndex) {
                this.answers[index].value = answerValues[index] = solution;
            }
            else if (index === solutionMinusIndex) {
                this.answers[index].value = answerValues[index] = solutionMinus;
            }
            else if (index === solutionMinus10Index) {
                this.answers[index].value = answerValues[index] = solutionMinus10;
            }
            else {
                this.answers[index].value = answerValues[index] = this.getRandomIntExcept(0, 100, answerValues);
            }
            this.answers[index].visible = false;
            answerE.addComponent(new Transform({ position: new Vector3(0, 0, -0.01) }));
            this.answersT[index] = new Transform({ position: new Vector3(index === 0 || index === 3 ? -1
                    : index === 1 || index === 4 ? 0
                        : 1, index < 3 ? 2.5 : 1.5, 0), scale: new Vector3(0.9, 0.9, 0.9) });
            answerWrapper.addComponent(this.answersT[index]);
            answerWrapper.addComponent(new OnClick(() => {
                this.onClickAnswer(index);
            }));
            answerWrapper.setParent(this.scene);
            answerE.setParent(answerWrapper);
        });
    }
    startRound() {
        this.state.round++;
        this.roundResult1.hide();
        this.roundResult2.hide();
        this.ui.hideTime();
        this.player1.hide();
        this.player2.hide();
        this.question.value = "";
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        this.state.waitingRound = false;
        this.answers.forEach((answerT, index) => {
            this.answers[index].value = "";
        });
        this.question.value = "";
        this.teacher1.uvs = SpriteAnimation_1.getSpriteUv(1, TEACHER_OFFSET, 64, 64);
        this.teacher2.uvs = SpriteAnimation_1.getSpriteUv(1, TEACHER_OFFSET, 64, 64);
        setTimeout(() => {
            if (this.gameSetup.currentPlayer)
                this.state.blocked = false;
            const num1 = Math.floor(this.randomizer.random() * 50);
            const num2 = Math.floor(this.randomizer.random() * 50);
            this.question.value = `${num1} + ${num2}`;
            const solution = num1 + num2;
            const solutionIndex = this.solutionIndex = Math.floor(this.randomizer.random() * 6);
            const solutionMinus = solution - 1;
            const solutionMinusIndex = this.getRandomIntExcept(0, 5, [solutionIndex]);
            const solutionMinus10 = solution - 10;
            const solutionMinus10Index = this.getRandomIntExcept(0, 5, [solutionIndex, solutionMinusIndex]);
            const answerValues = [];
            this.answers.forEach((answerT, index) => {
                if (index === solutionIndex) {
                    this.answers[index].value = answerValues[index] = solution;
                }
                else if (index === solutionMinusIndex) {
                    this.answers[index].value = answerValues[index] = solutionMinus;
                }
                else if (index === solutionMinus10Index) {
                    this.answers[index].value = answerValues[index] = solutionMinus10;
                }
                else {
                    this.answers[index].value = answerValues[index] = this.getRandomIntExcept(0, 100, answerValues);
                }
            });
        }, 500);
    }
    update(dt) {
        if (!this.state.initialized) {
            return;
        }
        ;
        if (!this.state.waitingRound && !this.state.started && Date.now() >= this.state.startTime) {
            console.log("start");
            this.start();
            return;
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            this.startRound();
        }
        else if (Date.now() >= this.state.roundStartTime) {
        }
    }
    finish(result) {
        const { winner } = result;
        const nonWinner = winner === 1 ? 2 : 1;
        this.state.blocked = true;
        this[`teacher${winner}`].uvs = SpriteAnimation_1.getSpriteUv(3, TEACHER_OFFSET, 64, 64);
        this[`teacher${nonWinner}`].uvs = SpriteAnimation_1.getSpriteUv(2, TEACHER_OFFSET, 64, 64);
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    finishRound({ winner }) {
        console.log("finishRound winner", winner);
        this.state.blocked = true;
        this.state[`score${winner}`] += 1;
        this.ui.updateScore({ player: winner, score: this.state[`score${winner}`] });
        const nonWinner = winner === 1 ? 2 : 1;
        console.log("winner", winner);
        this[`teacher${winner}`].uvs = SpriteAnimation_1.getSpriteUv(3, TEACHER_OFFSET, 64, 64);
        this[`teacher${nonWinner}`].uvs = SpriteAnimation_1.getSpriteUv(2, TEACHER_OFFSET, 64, 64);
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
        this.roundResult1.show();
        this.roundResult2.show();
        this.state.waitingRound = true;
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
        return () => this.callbacks.onFinishRound = null;
    }
    shareState(sharedState) {
        const { player, index, timeSinceStart, time, round } = sharedState;
        if (round !== this.state.round)
            return;
        const isWinner = index === this.solutionIndex;
        const playerAnswer = this[`player${player}`];
        playerAnswer.show();
        playerAnswer.wrapperEntity.getComponent(Transform)
            .position.set(this.answersT[index].position.x + (player === 1 ? -0.2 : 0.2), this.answersT[index].position.y, this.answersT[index].position.z);
        playerAnswer.setSprite(isWinner);
        this.ui.updateTime({ player, time: timeSinceStart });
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
    }
    getRandomIntExcept(min, max, except) {
        let ran = min + Math.floor(this.randomizer.random() * (max + 1 - min));
        if (!except) {
            return ran;
        }
        while (~except.indexOf(ran)) {
            ran = min + Math.floor(this.randomizer.random() * (max + 1 - min));
        }
        return ran;
    }
}
exports.MathGame = MathGame;
MathGame.id = 'Math';
MathGame.instructions = `Math\nClick the correct answer`;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentGame = void 0;
const gameUtils_1 = __webpack_require__(5);
const seed_1 = __webpack_require__(3);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
const Sound_1 = __webpack_require__(2);
const SpritePanel_1 = __webpack_require__(4);
const TextPanel_1 = __webpack_require__(6);
const utils_1 = __webpack_require__(9);
const SPRITE_OFFSET = 768 / 64 * 1024 / 64;
const createAnswer = (root, index, clickCallback) => {
    const entity = new Entity();
    const shape = new PlaneShape();
    let spriteIndex = 0;
    entity.addComponent(shape);
    entity.addComponent(SpriteMaterial_1.spriteMaterial);
    entity.addComponent(new Transform({
        scale: new Vector3(1.9, 1.9, 1.9),
        position: new Vector3(index === 0 ? -2 : index === 1 ? 0 : 2, 2, -0.001)
    }));
    shape.uvs = SpriteAnimation_1.getSpriteUv(1, SPRITE_OFFSET, 64, 64);
    shape.uvs = SpriteAnimation_1.getSpriteUv(0, 0, 0, 0);
    entity.setParent(root);
    entity.addComponent(new OnClick(() => {
        clickCallback(index);
    }));
    return {
        setIndex: (_spriteIndex) => {
            spriteIndex = _spriteIndex;
            shape.uvs = SpriteAnimation_1.getSpriteUv(spriteIndex, SPRITE_OFFSET, 64, 64);
        },
        getSpriteIndex: () => spriteIndex,
        hide: () => {
            shape.uvs = SpriteAnimation_1.getSpriteUv(0, 0, 0, 0);
        }
    };
};
const ROUNDS = 5;
class DifferentGame {
    constructor(root, { seed, level, currentPlayer, gameIndex }) {
        this.callbacks = {
            onFinish: null,
            onShareState: null,
            onFinishRound: null
        };
        this.state = {
            blocked: false,
            started: false,
            initialized: false,
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            round: 0,
            finished: false,
            score1: 0,
            score2: 0,
            equalSpriteIndex: 0,
            differentSpriteIndex: 0,
            answerPositions: [1, 0, 0]
        };
        this.gameSetup = { seed, currentPlayer, level, gameIndex };
        this.root = root;
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.002)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.player1 = gameUtils_1.createPlayerAnswer(this.scene, { player: 1 });
        this.player2 = gameUtils_1.createPlayerAnswer(this.scene, { player: 2 });
        this.player1.hide();
        this.player2.hide();
        console.log("diff seed", seed);
        this.randomizer = seed_1.seedGen.create(seed.toString());
        this.onClickAnswer = this.onClickAnswer.bind(this);
        this.answers = [0, 1, 2].map((index) => createAnswer(this.scene, index, this.onClickAnswer));
        engine.addSystem(this);
        if (!currentPlayer)
            this.state.blocked = true;
    }
    onClickAnswer(index) {
        if (this.state.blocked || !this.state.started)
            return;
        this.state.blocked = true;
        Sound_1.playOnce('swing');
        const isWinner = !!this.state.answerPositions[index];
        console.log("isWinner", isWinner);
        const currentPlayerAnswer = this[`player${this.gameSetup.currentPlayer}`];
        currentPlayerAnswer.show();
        currentPlayerAnswer.wrapperEntity.getComponent(Transform)
            .position.set((index === 0 ? -2 : index === 1 ? 0 : 2) + (this.gameSetup.currentPlayer === 1 ? -0.5 : 0.5), 2, -0.002);
        currentPlayerAnswer.setSprite(isWinner);
        const timeSinceStart = utils_1.getTimeSinceStart((this.state.round === 0) ? this.state.startTime : this.state.lastRoundStartTime);
        const time = isWinner
            ? timeSinceStart
            : 999999999 - timeSinceStart;
        this.callbacks.onShareState({ player: this.gameSetup.currentPlayer, isWinner, answerIndex: index, time, timeSinceStart, round: this.state.round });
        this.ui.updateTime({ player: this.gameSetup.currentPlayer, time: timeSinceStart });
        if (this.state.round < ROUNDS - 1) {
            this.callbacks.onFinishRound({
                player: this.gameSetup.currentPlayer,
                time,
                roundIndex: this.state.round,
                gameIndex: this.gameSetup.gameIndex
            });
            this.state.waitingRound = true;
        }
        else {
            this.callbacks.onFinish({
                player: this.gameSetup.currentPlayer,
                time,
                roundIndex: this.state.round,
                gameIndex: this.gameSetup.gameIndex
            });
        }
    }
    init() {
        TextPanel_1.updateTextPanel({ value: "Which is different?", color: Color3.Black() });
        Sound_1.playLoop("money", { volume: 0.5 });
        this.state.initialized = true;
        SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(9, 0, 192, 128) });
        SpritePanel_1.showSpritePanel();
        this.scene.setParent(this.root);
    }
    setStartTime(startTime) {
        console.log("setStartTime", startTime);
        this.state.startTime = startTime;
    }
    setRoundStartTime(startTime) {
        this.state.roundStartTime = startTime;
    }
    finish(result) {
        const { winner } = result;
        const nonWinner = winner === 1 ? 2 : 1;
        this.state.blocked = true;
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
    }
    finishRound({ winner }) {
        this.state.blocked = true;
        this.state[`score${winner}`] += 1;
        this.ui.updateScore({ player: winner, score: this.state[`score${winner}`] });
        const nonWinner = winner === 1 ? 2 : 1;
        if (winner === this.gameSetup.currentPlayer) {
            Sound_1.playOnce("wow");
        }
        else {
            Sound_1.playOnce("fail");
        }
        this.state.waitingRound = true;
    }
    reproduceRound() {
        if (this.gameSetup.currentPlayer)
            this.state.blocked = false;
        this.ui.hideTime();
        TextPanel_1.updateTextPanel({ value: "Which is different?", color: Color3.Black() });
        this.state.equalSpriteIndex = this.getRandomIntExcept(1, 9);
        this.state.differentSpriteIndex = this.getRandomIntExcept(1, 9, [this.state.equalSpriteIndex]);
        console.log("REPRODUCE, STATE", this.state.equalSpriteIndex, this.state.differentSpriteIndex);
        this.state.answerPositions = shuffle([1, 0, 0], this.randomizer.random);
        this.state.answerPositions.forEach((answerPos, index) => {
            if (answerPos) {
                this.answers[index].setIndex(this.state.differentSpriteIndex);
            }
            else {
                this.answers[index].setIndex(this.state.equalSpriteIndex);
            }
        });
    }
    start() {
        console.log("_START_");
        this.state.started = true;
        this.reproduceRound();
    }
    startRound() {
        this.state.round++;
        this.player1.hide();
        this.player2.hide();
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        this.state.waitingRound = false;
        this.answers.forEach(answer => answer.hide());
        setTimeout(() => {
            this.reproduceRound();
        }, 500);
    }
    block() {
        this.state.blocked = true;
    }
    update(dt) {
        if (!this.state.initialized) {
            return;
        }
        ;
        if (!this.state.waitingRound && !this.state.started && Date.now() >= this.state.startTime) {
            this.start();
            return;
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            this.startRound();
        }
    }
    shareState({ player, answerIndex, isWinner, timeSinceStart, round }) {
        this.ui.updateTime({ player, time: timeSinceStart });
        const currentPlayerAnswer = this[`player${player}`];
        const index = answerIndex;
        currentPlayerAnswer.setSprite(isWinner);
        currentPlayerAnswer.show();
        currentPlayerAnswer.wrapperEntity.getComponent(Transform)
            .position.set((index === 0 ? -2 : index === 1 ? 0 : 2) + (player === 1 ? -0.5 : 0.5), 2, -0.002);
    }
    destroy() {
        Sound_1.stopSound("money");
        SpritePanel_1.hideSpritePanel();
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
    }
    getRandomIntExcept(min, max, except) {
        let ran = min + Math.floor(this.randomizer.random() * (max + 1 - min));
        if (!except) {
            return ran;
        }
        while (~except.indexOf(ran)) {
            ran = min + Math.floor(this.randomizer.random() * (max + 1 - min));
        }
        return ran;
    }
}
exports.DifferentGame = DifferentGame;
DifferentGame.id = 'Different';
DifferentGame.instructions = 'Different\nClick the image that is different';
function shuffle(array, randomFn) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(randomFn() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FroggerGame = void 0;
const FroggerScreen_1 = __webpack_require__(70);
const seed_1 = __webpack_require__(3);
const gameUtils_1 = __webpack_require__(5);
const Sound_1 = __webpack_require__(2);
const TextPanel_1 = __webpack_require__(6);
const KEY = {
    UP: ActionButton.POINTER,
    LEFT: ActionButton.PRIMARY,
    RIGHT: ActionButton.SECONDARY
};
class FroggerGame {
    constructor(root, { seed, currentPlayer, level = 1, gameIndex }) {
        this.callbacks = {
            onFinish: null,
            onShareState: null
        };
        this.state = {
            blocked: false,
            started: false,
            initialized: false,
            startTime: Number.MAX_VALUE,
            finished: false,
        };
        this.root = root;
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 0, -0.001)
        }));
        this.ui = gameUtils_1.createUI(this.scene);
        this.gameSetup = { seed: seed, currentPlayer, level, gameIndex };
        ;
        this.randomizer = seed_1.seedGen.create(seed.toString());
        this.screen1 = FroggerScreen_1.createScreen(this.scene, { player: 1, seed });
        this.screen2 = FroggerScreen_1.createScreen(this.scene, { player: 2, seed });
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        this.roundResult1.hide();
        this.roundResult2.hide();
        if (currentPlayer) {
            this[`screen${currentPlayer}`].onStateChange((screenState) => {
                this.ui.updateScore({ score: screenState.score, player: currentPlayer });
                const { x, y, z } = screenState.frogPosition;
                this.callbacks.onShareState(Object.assign(Object.assign({}, screenState), { player: currentPlayer, frogPosition: { x, y, z }, takenSammiches: screenState.takenSammiches }));
                console.log("screenState", screenState);
                if (screenState.score === 5 && !this.state.finished) {
                    const timeSinceStart = Date.now() - this.state.startTime;
                    this.block();
                    if (currentPlayer)
                        this[`screen${currentPlayer}`].block();
                    this.state.finished = true;
                    this.callbacks.onFinish({
                        isWinner: true,
                        time: timeSinceStart,
                        player: currentPlayer,
                        gameIndex: this.gameSetup.gameIndex,
                        roundIndex: 0
                    });
                }
            });
        }
        engine.addSystem(this);
        this.up = this.up.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    getPlayerScreen(player) {
        return this[`screen${player}`];
    }
    init() {
        this.state.initialized = true;
        this.scene.setParent(this.root);
        Sound_1.playLoop("race", { volume: 0.5 });
    }
    start() {
        console.log("START_");
        this.state.started = true;
        if (this.gameSetup.currentPlayer) {
            Input.instance.subscribe("BUTTON_DOWN", KEY.UP, false, this.up);
            Input.instance.subscribe("BUTTON_DOWN", KEY.LEFT, false, this.left);
            Input.instance.subscribe("BUTTON_DOWN", KEY.RIGHT, false, this.right);
        }
    }
    up() {
        var _a;
        if (!this.state.started || this.state.blocked)
            return;
        (_a = this.getPlayerScreen(this.gameSetup.currentPlayer)) === null || _a === void 0 ? void 0 : _a.up();
    }
    left() {
        var _a;
        if (!this.state.started || this.state.blocked)
            return;
        (_a = this.getPlayerScreen(this.gameSetup.currentPlayer)) === null || _a === void 0 ? void 0 : _a.left();
    }
    right() {
        var _a;
        if (!this.state.started || this.state.blocked)
            return;
        (_a = this.getPlayerScreen(this.gameSetup.currentPlayer)) === null || _a === void 0 ? void 0 : _a.right();
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        if (!this.state.started && ((Date.now() - 4000) >= this.state.startTime)) {
            this.start();
            return;
        }
        if (this.state.started) {
            this.getPlayerScreen(1).updateScreen(dt, this.gameSetup.currentPlayer === 1);
        }
        if (this.state.started) {
            this.getPlayerScreen(2).updateScreen(dt, this.gameSetup.currentPlayer === 2);
        }
    }
    block() {
        this.state.blocked = true;
        if (this.gameSetup.currentPlayer)
            this[`screen${this.gameSetup.currentPlayer}`].block();
    }
    destroy() {
        console.log("destroy");
        Sound_1.stopSound("race");
        TextPanel_1.updateTextPanel({ value: "" });
        Input.instance.unsubscribe("BUTTON_DOWN", KEY.UP, this.up);
        Input.instance.unsubscribe("BUTTON_DOWN", KEY.LEFT, this.left);
        Input.instance.unsubscribe("BUTTON_DOWN", KEY.RIGHT, this.right);
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        engine.removeSystem(this);
    }
    shareState({ score, player, frogPosition, takenSammiches }) {
        console.log("shareState", { score, player, frogPosition, takenSammiches });
        const { x, y, z } = frogPosition || {};
        this.ui.updateScore({ score, player });
        this[`screen${player}`].setFrogPosition(x, y, z);
        this[`screen${player}`].setTakenSammiches(takenSammiches);
    }
    finish({ winner }) {
        console.log("FINISH", winner);
        const nonWinner = winner === 1 ? 2 : 1;
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
}
exports.FroggerGame = FroggerGame;
FroggerGame.id = "Frogger";
FroggerGame.instructions = `cross the roads and\ntake all sammiches\npressing E F and CLICK`;


/***/ }),
/* 37 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "send", function() { return send; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "post", function() { return post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return patch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put", function() { return put; });
function apply(src, tar) {
	tar.headers = src.headers || {};
	tar.statusMessage = src.statusText;
	tar.statusCode = src.status;
	tar.data = src.response;
}

function send(method, uri, opts) {
	return new Promise(function (res, rej) {
		opts = opts || {};
		var k, str, tmp, arr;
		var req = new XMLHttpRequest;
		var headers = opts.headers || {};

		// IE compatible
		if (opts.timeout) req.timeout = opts.timeout;
		req.ontimeout = req.onerror = function (err) {
			err.timeout = err.type == 'timeout';
			rej(err);
		}

		req.open(method, uri.href || uri);

		req.onload = function () {
			arr = req.getAllResponseHeaders().trim().split(/[\r\n]+/);
			apply(req, req); //=> req.headers

			while (tmp = arr.shift()) {
				tmp = tmp.split(': ');
				req.headers[tmp.shift().toLowerCase()] = tmp.join(': ');
			}

			tmp = req.headers['content-type'];
			if (tmp && !!~tmp.indexOf('application/json')) {
				try {
					req.data = JSON.parse(req.data, opts.reviver);
				} catch (err) {
					apply(req, err);
					return rej(err);
				}
			}

			(req.status >= 400 ? rej : res)(req);
		};

		if ((str = opts.body) && typeof str == 'object') {
			headers['content-type'] = 'application/json';
			str = JSON.stringify(str);
		}

		req.withCredentials = !!opts.withCredentials;

		for (k in headers) {
			req.setRequestHeader(k, headers[k]);
		}

		req.send(str);
	});
}

var get = send.bind(send, 'GET');
var post = send.bind(send, 'POST');
var patch = send.bind(send, 'PATCH');
var del = send.bind(send, 'DELETE');
var put = send.bind(send, 'PUT');


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var msgpack = __importStar(__webpack_require__(39));
var strong_events_1 = __webpack_require__(79);
var nanoevents_1 = __webpack_require__(80);
var Connection_1 = __webpack_require__(81);
var Serializer_1 = __webpack_require__(40);
var Protocol_1 = __webpack_require__(41);
var encode = __importStar(__webpack_require__(42));
var decode = __importStar(__webpack_require__(43));
var Room = (function () {
    function Room(name, rootSchema) {
        var _this = this;
        this.onJoin = strong_events_1.createSignal();
        this.onStateChange = strong_events_1.createSignal();
        this.onError = strong_events_1.createSignal();
        this.onLeave = strong_events_1.createSignal();
        this.hasJoined = false;
        this.onMessageHandlers = nanoevents_1.createNanoEvents();
        this.id = null;
        this.name = name;
        if (rootSchema) {
            this.serializer = new (Serializer_1.getSerializer("schema"));
            this.rootSchema = rootSchema;
            this.serializer.state = new rootSchema();
        }
        else {
            this.serializer = new (Serializer_1.getSerializer("fossil-delta"));
        }
        this.onError(function (code, message) { return console.error("colyseus.js - onError => (" + code + ") " + message); });
        this.onLeave(function () { return _this.removeAllListeners(); });
    }
    Room.prototype.connect = function (endpoint) {
        var _this = this;
        this.connection = new Connection_1.Connection(endpoint, false);
        this.connection.reconnectEnabled = false;
        this.connection.onmessage = this.onMessageCallback.bind(this);
        this.connection.onclose = function (e) {
            if (!_this.hasJoined) {
                console.error("Room connection was closed unexpectedly (" + e.code + "): " + e.reason);
                _this.onError.invoke(e.code, e.reason);
                return;
            }
            _this.onLeave.invoke(e.code);
        };
        this.connection.onerror = function (e) {
            console.warn("Room, onError (" + e.code + "): " + e.reason);
            _this.onError.invoke(e.code, e.reason);
        };
        this.connection.open();
    };
    Room.prototype.leave = function (consented) {
        if (consented === void 0) {
            consented = true;
        }
        if (this.connection) {
            if (consented) {
                this.connection.send([Protocol_1.Protocol.LEAVE_ROOM]);
            }
            else {
                this.connection.close();
            }
        }
        else {
            this.onLeave.invoke(4000);
        }
    };
    Room.prototype.onMessage = function (type, callback) {
        return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
    };
    Room.prototype.send = function (type, message) {
        var initialBytes = [Protocol_1.Protocol.ROOM_DATA];
        if (typeof (type) === "string") {
            encode.string(initialBytes, type);
        }
        else {
            encode.number(initialBytes, type);
        }
        var arr;
        if (message !== undefined) {
            var encoded = msgpack.encode(message);
            arr = new Uint8Array(initialBytes.length + encoded.byteLength);
            arr.set(new Uint8Array(initialBytes), 0);
            arr.set(new Uint8Array(encoded), initialBytes.length);
        }
        else {
            arr = new Uint8Array(initialBytes);
        }
        this.connection.send(arr.buffer);
    };
    Object.defineProperty(Room.prototype, "state", {
        get: function () {
            return this.serializer.getState();
        },
        enumerable: true,
        configurable: true
    });
    Room.prototype.listen = function (segments, callback, immediate) {
        if (this.serializerId === "schema") {
            console.error("'" + this.serializerId + "' serializer doesn't support .listen() method here.");
            return;
        }
        else if (!this.serializerId) {
            console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)");
        }
        return this.serializer.api.listen(segments, callback, immediate);
    };
    Room.prototype.removeListener = function (listener) {
        return this.serializer.api.removeListener(listener);
    };
    Room.prototype.removeAllListeners = function () {
        if (this.serializer) {
            this.serializer.teardown();
        }
        this.onJoin.clear();
        this.onStateChange.clear();
        this.onError.clear();
        this.onLeave.clear();
    };
    Room.prototype.onMessageCallback = function (event) {
        var bytes = Array.from(new Uint8Array(event.data));
        var code = bytes[0];
        if (code === Protocol_1.Protocol.JOIN_ROOM) {
            var offset = 1;
            this.serializerId = Protocol_1.utf8Read(bytes, offset);
            offset += Protocol_1.utf8Length(this.serializerId);
            var serializer = Serializer_1.getSerializer(this.serializerId);
            if (!serializer) {
                throw new Error("missing serializer: " + this.serializerId);
            }
            if (this.serializerId !== "fossil-delta" && !this.rootSchema) {
                this.serializer = new serializer();
            }
            if (bytes.length > offset && this.serializer.handshake) {
                this.serializer.handshake(bytes, { offset: 1 });
            }
            this.hasJoined = true;
            this.onJoin.invoke();
            this.connection.send([Protocol_1.Protocol.JOIN_ROOM]);
        }
        else if (code === Protocol_1.Protocol.ERROR) {
            var it_1 = { offset: 1 };
            var code_1 = decode.number(bytes, it_1);
            var message = decode.string(bytes, it_1);
            this.onError.invoke(code_1, message);
        }
        else if (code === Protocol_1.Protocol.LEAVE_ROOM) {
            this.leave();
        }
        else if (code === Protocol_1.Protocol.ROOM_DATA_SCHEMA) {
            var context_1 = this.serializer.getState().constructor._context;
            var type = context_1.get(bytes[1]);
            var message = new type();
            message.decode(bytes, { offset: 2 });
            this.dispatchMessage(type, message);
        }
        else if (code === Protocol_1.Protocol.ROOM_STATE) {
            bytes.shift();
            this.setState(bytes);
        }
        else if (code === Protocol_1.Protocol.ROOM_STATE_PATCH) {
            bytes.shift();
            this.patch(bytes);
        }
        else if (code === Protocol_1.Protocol.ROOM_DATA) {
            var it_2 = { offset: 1 };
            var type = (decode.stringCheck(bytes, it_2))
                ? decode.string(bytes, it_2)
                : decode.number(bytes, it_2);
            var message = (bytes.length > it_2.offset)
                ? msgpack.decode(event.data, it_2.offset)
                : undefined;
            this.dispatchMessage(type, message);
        }
    };
    Room.prototype.setState = function (encodedState) {
        this.serializer.setState(encodedState);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.patch = function (binaryPatch) {
        this.serializer.patch(binaryPatch);
        this.onStateChange.invoke(this.serializer.getState());
    };
    Room.prototype.dispatchMessage = function (type, message) {
        var messageType = this.getMessageHandlerKey(type);
        if (this.onMessageHandlers.events[messageType]) {
            this.onMessageHandlers.emit(messageType, message);
        }
        else if (this.onMessageHandlers.events['*']) {
            this.onMessageHandlers.emit('*', type, message);
        }
        else {
            console.warn("onMessage not registered for type '" + type + "'.");
        }
    };
    Room.prototype.getMessageHandlerKey = function (type) {
        switch (typeof (type)) {
            case "function": return "$" + type._typeid;
            case "string": return type;
            case "number": return "i" + type;
            default: throw new Error("invalid message type.");
        }
    };
    return Room;
}());
exports.Room = Room;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decode_1 = __importDefault(__webpack_require__(77));
var encode_1 = __importDefault(__webpack_require__(78));
exports.decode = decode_1.default;
exports.encode = encode_1.default;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var serializers = {};
function registerSerializer(id, serializer) {
    serializers[id] = serializer;
}
exports.registerSerializer = registerSerializer;
function getSerializer(id) {
    return serializers[id];
}
exports.getSerializer = getSerializer;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Protocol;
(function (Protocol) {
    Protocol[Protocol["HANDSHAKE"] = 9] = "HANDSHAKE";
    Protocol[Protocol["JOIN_ROOM"] = 10] = "JOIN_ROOM";
    Protocol[Protocol["ERROR"] = 11] = "ERROR";
    Protocol[Protocol["LEAVE_ROOM"] = 12] = "LEAVE_ROOM";
    Protocol[Protocol["ROOM_DATA"] = 13] = "ROOM_DATA";
    Protocol[Protocol["ROOM_STATE"] = 14] = "ROOM_STATE";
    Protocol[Protocol["ROOM_STATE_PATCH"] = 15] = "ROOM_STATE_PATCH";
    Protocol[Protocol["ROOM_DATA_SCHEMA"] = 16] = "ROOM_DATA_SCHEMA";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["MATCHMAKE_NO_HANDLER"] = 4210] = "MATCHMAKE_NO_HANDLER";
    ErrorCode[ErrorCode["MATCHMAKE_INVALID_CRITERIA"] = 4211] = "MATCHMAKE_INVALID_CRITERIA";
    ErrorCode[ErrorCode["MATCHMAKE_INVALID_ROOM_ID"] = 4212] = "MATCHMAKE_INVALID_ROOM_ID";
    ErrorCode[ErrorCode["MATCHMAKE_UNHANDLED"] = 4213] = "MATCHMAKE_UNHANDLED";
    ErrorCode[ErrorCode["MATCHMAKE_EXPIRED"] = 4214] = "MATCHMAKE_EXPIRED";
    ErrorCode[ErrorCode["AUTH_FAILED"] = 4215] = "AUTH_FAILED";
    ErrorCode[ErrorCode["APPLICATION_ERROR"] = 4216] = "APPLICATION_ERROR";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
function utf8Read(view, offset) {
    var length = view[offset++];
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = view[i];
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (view[++i] & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((view[++i] & 0x3f) << 6) |
                ((view[++i] & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((view[++i] & 0x3f) << 12) |
                ((view[++i] & 0x3f) << 6) |
                ((view[++i] & 0x3f) << 0);
            if (chr >= 0x010000) {
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
exports.utf8Read = utf8Read;
function utf8Length(str) {
    if (str === void 0) {
        str = '';
    }
    var c = 0;
    var length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length + 1;
}
exports.utf8Length = utf8Length;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.number = exports.string = exports.boolean = exports.writeFloat64 = exports.writeFloat32 = exports.float64 = exports.float32 = exports.uint64 = exports.int64 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = exports.utf8Write = void 0;
function utf8Length(str) {
    var c = 0, length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
function utf8Write(view, offset, str) {
    var c = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            view[offset++] = c;
        }
        else if (c < 0x800) {
            view[offset++] = 0xc0 | (c >> 6);
            view[offset++] = 0x80 | (c & 0x3f);
        }
        else if (c < 0xd800 || c >= 0xe000) {
            view[offset++] = 0xe0 | (c >> 12);
            view[offset++] = 0x80 | (c >> 6 & 0x3f);
            view[offset++] = 0x80 | (c & 0x3f);
        }
        else {
            i++;
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
            view[offset++] = 0xf0 | (c >> 18);
            view[offset++] = 0x80 | (c >> 12 & 0x3f);
            view[offset++] = 0x80 | (c >> 6 & 0x3f);
            view[offset++] = 0x80 | (c & 0x3f);
        }
    }
}
exports.utf8Write = utf8Write;
function int8(bytes, value) {
    bytes.push(value & 255);
}
exports.int8 = int8;
;
function uint8(bytes, value) {
    bytes.push(value & 255);
}
exports.uint8 = uint8;
;
function int16(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
}
exports.int16 = int16;
;
function uint16(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
}
exports.uint16 = uint16;
;
function int32(bytes, value) {
    bytes.push(value & 255);
    bytes.push((value >> 8) & 255);
    bytes.push((value >> 16) & 255);
    bytes.push((value >> 24) & 255);
}
exports.int32 = int32;
;
function uint32(bytes, value) {
    var b4 = value >> 24;
    var b3 = value >> 16;
    var b2 = value >> 8;
    var b1 = value;
    bytes.push(b1 & 255);
    bytes.push(b2 & 255);
    bytes.push(b3 & 255);
    bytes.push(b4 & 255);
}
exports.uint32 = uint32;
;
function int64(bytes, value) {
    var high = Math.floor(value / Math.pow(2, 32));
    var low = value >>> 0;
    uint32(bytes, low);
    uint32(bytes, high);
}
exports.int64 = int64;
;
function uint64(bytes, value) {
    var high = (value / Math.pow(2, 32)) >> 0;
    var low = value >>> 0;
    uint32(bytes, low);
    uint32(bytes, high);
}
exports.uint64 = uint64;
;
function float32(bytes, value) {
    writeFloat32(bytes, value);
}
exports.float32 = float32;
function float64(bytes, value) {
    writeFloat64(bytes, value);
}
exports.float64 = float64;
var _isLittleEndian = true;
var _int32 = new Int32Array(2);
var _float32 = new Float32Array(_int32.buffer);
var _float64 = new Float64Array(_int32.buffer);
function writeFloat32(bytes, value) {
    _float32[0] = value;
    int32(bytes, _int32[0]);
}
exports.writeFloat32 = writeFloat32;
;
function writeFloat64(bytes, value) {
    _float64[0] = value;
    int32(bytes, _int32[_isLittleEndian ? 0 : 1]);
    int32(bytes, _int32[_isLittleEndian ? 1 : 0]);
}
exports.writeFloat64 = writeFloat64;
;
function boolean(bytes, value) {
    return uint8(bytes, value ? 1 : 0);
}
exports.boolean = boolean;
;
function string(bytes, value) {
    if (!value) {
        value = "";
    }
    var length = utf8Length(value);
    var size = 0;
    if (length < 0x20) {
        bytes.push(length | 0xa0);
        size = 1;
    }
    else if (length < 0x100) {
        bytes.push(0xd9);
        uint8(bytes, length);
        size = 2;
    }
    else if (length < 0x10000) {
        bytes.push(0xda);
        uint16(bytes, length);
        size = 3;
    }
    else if (length < 0x100000000) {
        bytes.push(0xdb);
        uint32(bytes, length);
        size = 5;
    }
    else {
        throw new Error('String too long');
    }
    utf8Write(bytes, bytes.length, value);
    return size + length;
}
exports.string = string;
function number(bytes, value) {
    if (isNaN(value)) {
        return number(bytes, 0);
    }
    else if (!isFinite(value)) {
        return number(bytes, (value > 0) ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
    }
    else if (value !== (value | 0)) {
        bytes.push(0xcb);
        writeFloat64(bytes, value);
        return 9;
    }
    if (value >= 0) {
        if (value < 0x80) {
            uint8(bytes, value);
            return 1;
        }
        if (value < 0x100) {
            bytes.push(0xcc);
            uint8(bytes, value);
            return 2;
        }
        if (value < 0x10000) {
            bytes.push(0xcd);
            uint16(bytes, value);
            return 3;
        }
        if (value < 0x100000000) {
            bytes.push(0xce);
            uint32(bytes, value);
            return 5;
        }
        bytes.push(0xcf);
        uint64(bytes, value);
        return 9;
    }
    else {
        if (value >= -0x20) {
            bytes.push(value);
            return 1;
        }
        if (value >= -0x80) {
            bytes.push(0xd0);
            int8(bytes, value);
            return 2;
        }
        if (value >= -0x8000) {
            bytes.push(0xd1);
            int16(bytes, value);
            return 3;
        }
        if (value >= -0x80000000) {
            bytes.push(0xd2);
            int32(bytes, value);
            return 5;
        }
        bytes.push(0xd3);
        int64(bytes, value);
        return 9;
    }
}
exports.number = number;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.indexChangeCheck = exports.nilCheck = exports.arrayCheck = exports.numberCheck = exports.number = exports.stringCheck = exports.string = exports.boolean = exports.readFloat64 = exports.readFloat32 = exports.uint64 = exports.int64 = exports.float64 = exports.float32 = exports.uint32 = exports.int32 = exports.uint16 = exports.int16 = exports.uint8 = exports.int8 = void 0;
var spec_1 = __webpack_require__(44);
function utf8Read(bytes, offset, length) {
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = bytes[i];
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (bytes[++i] & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((bytes[++i] & 0x3f) << 6) |
                ((bytes[++i] & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((bytes[++i] & 0x3f) << 12) |
                ((bytes[++i] & 0x3f) << 6) |
                ((bytes[++i] & 0x3f) << 0);
            if (chr >= 0x010000) {
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
function int8(bytes, it) {
    return uint8(bytes, it) << 24 >> 24;
}
exports.int8 = int8;
;
function uint8(bytes, it) {
    return bytes[it.offset++];
}
exports.uint8 = uint8;
;
function int16(bytes, it) {
    return uint16(bytes, it) << 16 >> 16;
}
exports.int16 = int16;
;
function uint16(bytes, it) {
    return bytes[it.offset++] | bytes[it.offset++] << 8;
}
exports.uint16 = uint16;
;
function int32(bytes, it) {
    return bytes[it.offset++] | bytes[it.offset++] << 8 | bytes[it.offset++] << 16 | bytes[it.offset++] << 24;
}
exports.int32 = int32;
;
function uint32(bytes, it) {
    return int32(bytes, it) >>> 0;
}
exports.uint32 = uint32;
;
function float32(bytes, it) {
    return readFloat32(bytes, it);
}
exports.float32 = float32;
function float64(bytes, it) {
    return readFloat64(bytes, it);
}
exports.float64 = float64;
function int64(bytes, it) {
    var low = uint32(bytes, it);
    var high = int32(bytes, it) * Math.pow(2, 32);
    return high + low;
}
exports.int64 = int64;
;
function uint64(bytes, it) {
    var low = uint32(bytes, it);
    var high = uint32(bytes, it) * Math.pow(2, 32);
    return high + low;
}
exports.uint64 = uint64;
;
var _isLittleEndian = true;
var _int32 = new Int32Array(2);
var _float32 = new Float32Array(_int32.buffer);
var _float64 = new Float64Array(_int32.buffer);
function readFloat32(bytes, it) {
    _int32[0] = int32(bytes, it);
    return _float32[0];
}
exports.readFloat32 = readFloat32;
;
function readFloat64(bytes, it) {
    _int32[_isLittleEndian ? 0 : 1] = int32(bytes, it);
    _int32[_isLittleEndian ? 1 : 0] = int32(bytes, it);
    return _float64[0];
}
exports.readFloat64 = readFloat64;
;
function boolean(bytes, it) {
    return uint8(bytes, it) > 0;
}
exports.boolean = boolean;
;
function string(bytes, it) {
    var prefix = bytes[it.offset++];
    var length;
    if (prefix < 0xc0) {
        length = prefix & 0x1f;
    }
    else if (prefix === 0xd9) {
        length = uint8(bytes, it);
    }
    else if (prefix === 0xda) {
        length = uint16(bytes, it);
    }
    else if (prefix === 0xdb) {
        length = uint32(bytes, it);
    }
    var value = utf8Read(bytes, it.offset, length);
    it.offset += length;
    return value;
}
exports.string = string;
function stringCheck(bytes, it) {
    var prefix = bytes[it.offset];
    return ((prefix < 0xc0 && prefix > 0xa0) ||
        prefix === 0xd9 ||
        prefix === 0xda ||
        prefix === 0xdb);
}
exports.stringCheck = stringCheck;
function number(bytes, it) {
    var prefix = bytes[it.offset++];
    if (prefix < 0x80) {
        return prefix;
    }
    else if (prefix === 0xca) {
        return readFloat32(bytes, it);
    }
    else if (prefix === 0xcb) {
        return readFloat64(bytes, it);
    }
    else if (prefix === 0xcc) {
        return uint8(bytes, it);
    }
    else if (prefix === 0xcd) {
        return uint16(bytes, it);
    }
    else if (prefix === 0xce) {
        return uint32(bytes, it);
    }
    else if (prefix === 0xcf) {
        return uint64(bytes, it);
    }
    else if (prefix === 0xd0) {
        return int8(bytes, it);
    }
    else if (prefix === 0xd1) {
        return int16(bytes, it);
    }
    else if (prefix === 0xd2) {
        return int32(bytes, it);
    }
    else if (prefix === 0xd3) {
        return int64(bytes, it);
    }
    else if (prefix > 0xdf) {
        return (0xff - prefix + 1) * -1;
    }
}
exports.number = number;
;
function numberCheck(bytes, it) {
    var prefix = bytes[it.offset];
    return (prefix < 0x80 ||
        (prefix >= 0xca && prefix <= 0xd3));
}
exports.numberCheck = numberCheck;
function arrayCheck(bytes, it) {
    return bytes[it.offset] < 0xa0;
}
exports.arrayCheck = arrayCheck;
function nilCheck(bytes, it) {
    return bytes[it.offset] === spec_1.NIL;
}
exports.nilCheck = nilCheck;
function indexChangeCheck(bytes, it) {
    return bytes[it.offset] === spec_1.INDEX_CHANGE;
}
exports.indexChangeCheck = indexChangeCheck;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_ID = exports.INDEX_CHANGE = exports.NIL = exports.END_OF_STRUCTURE = void 0;
exports.END_OF_STRUCTURE = 0xc1;
exports.NIL = 0xc0;
exports.INDEX_CHANGE = 0xd4;
exports.TYPE_ID = 0xd5;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(__webpack_require__(37));
var Storage_1 = __webpack_require__(85);
var TOKEN_STORAGE = "colyseus-auth-token";
var Platform;
(function (Platform) {
    Platform["ios"] = "ios";
    Platform["android"] = "android";
})(Platform = exports.Platform || (exports.Platform = {}));
var Auth = (function () {
    function Auth(endpoint) {
        var _this = this;
        this._id = undefined;
        this.username = undefined;
        this.displayName = undefined;
        this.avatarUrl = undefined;
        this.isAnonymous = undefined;
        this.email = undefined;
        this.lang = undefined;
        this.location = undefined;
        this.timezone = undefined;
        this.metadata = undefined;
        this.devices = undefined;
        this.facebookId = undefined;
        this.twitterId = undefined;
        this.googleId = undefined;
        this.gameCenterId = undefined;
        this.steamId = undefined;
        this.friendIds = undefined;
        this.blockedUserIds = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.token = undefined;
        this.endpoint = endpoint.replace("ws", "http");
        Storage_1.getItem(TOKEN_STORAGE, function (token) { return _this.token = token; });
    }
    Object.defineProperty(Auth.prototype, "hasToken", {
        get: function () {
            return !!this.token;
        },
        enumerable: true,
        configurable: true
    });
    Auth.prototype.login = function (options) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, data, attr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryParams = Object.assign({}, options);
                        if (this.hasToken) {
                            queryParams.token = this.token;
                        }
                        return [4, this.request('post', '/auth', queryParams)];
                    case 1:
                        data = _a.sent();
                        this.token = data.token;
                        Storage_1.setItem(TOKEN_STORAGE, this.token);
                        for (attr in data) {
                            if (this.hasOwnProperty(attr)) {
                                this[attr] = data[attr];
                            }
                        }
                        this.registerPingService();
                        return [2, this];
                }
            });
        });
    };
    Auth.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('put', '/auth', {}, {
                            username: this.username,
                            displayName: this.displayName,
                            avatarUrl: this.avatarUrl,
                            lang: this.lang,
                            location: this.location,
                            timezone: this.timezone,
                        })];
                    case 1:
                        _a.sent();
                        return [2, this];
                }
            });
        });
    };
    Auth.prototype.getFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('get', '/friends/all')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.getOnlineFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('get', '/friends/online')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.getFriendRequests = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('get', '/friends/requests')];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.sendFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('post', '/friends/requests', { userId: friendId })];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.acceptFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('put', '/friends/requests', { userId: friendId })];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.declineFriendRequest = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('del', '/friends/requests', { userId: friendId })];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.blockUser = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('post', '/friends/block', { userId: friendId })];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.unblockUser = function (friendId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.request('put', '/friends/block', { userId: friendId })];
                    case 1: return [2, (_a.sent())];
                }
            });
        });
    };
    Auth.prototype.request = function (method, segments, query, body, headers) {
        if (query === void 0) {
            query = {};
        }
        if (headers === void 0) {
            headers = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            var queryParams, name_1, queryString, opts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers['Accept'] = 'application/json';
                        if (this.hasToken) {
                            headers['Authorization'] = 'Bearer ' + this.token;
                        }
                        queryParams = [];
                        for (name_1 in query) {
                            queryParams.push(name_1 + "=" + query[name_1]);
                        }
                        queryString = (queryParams.length > 0)
                            ? "?" + queryParams.join("&")
                            : '';
                        opts = { headers: headers };
                        if (body) {
                            opts.body = body;
                        }
                        return [4, http[method]("" + this.endpoint + segments + queryString, opts)];
                    case 1: return [2, (_a.sent()).data];
                }
            });
        });
    };
    Auth.prototype.logout = function () {
        this.token = undefined;
        Storage_1.removeItem(TOKEN_STORAGE);
        this.unregisterPingService();
    };
    Auth.prototype.registerPingService = function (timeout) {
        var _this = this;
        if (timeout === void 0) {
            timeout = 15000;
        }
        this.unregisterPingService();
        this.keepOnlineInterval = setInterval(function () { return _this.request('get', '/auth'); }, timeout);
    };
    Auth.prototype.unregisterPingService = function () {
        clearInterval(this.keepOnlineInterval);
    };
    return Auth;
}());
exports.Auth = Auth;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Schema_1 = __webpack_require__(13);
Object.defineProperty(exports, "Schema", { enumerable: true, get: function () { return Schema_1.Schema; } });
var MapSchema_1 = __webpack_require__(11);
Object.defineProperty(exports, "MapSchema", { enumerable: true, get: function () { return MapSchema_1.MapSchema; } });
var ArraySchema_1 = __webpack_require__(10);
Object.defineProperty(exports, "ArraySchema", { enumerable: true, get: function () { return ArraySchema_1.ArraySchema; } });
var utils_1 = __webpack_require__(94);
Object.defineProperty(exports, "dumpChanges", { enumerable: true, get: function () { return utils_1.dumpChanges; } });
var Reflection_1 = __webpack_require__(95);
Object.defineProperty(exports, "Reflection", { enumerable: true, get: function () { return Reflection_1.Reflection; } });
Object.defineProperty(exports, "ReflectionType", { enumerable: true, get: function () { return Reflection_1.ReflectionType; } });
Object.defineProperty(exports, "ReflectionField", { enumerable: true, get: function () { return Reflection_1.ReflectionField; } });
var annotations_1 = __webpack_require__(48);
Object.defineProperty(exports, "type", { enumerable: true, get: function () { return annotations_1.type; } });
Object.defineProperty(exports, "deprecated", { enumerable: true, get: function () { return annotations_1.deprecated; } });
Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return annotations_1.filter; } });
Object.defineProperty(exports, "defineTypes", { enumerable: true, get: function () { return annotations_1.defineTypes; } });
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return annotations_1.Context; } });


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTree = void 0;
var Schema_1 = __webpack_require__(13);
var ArraySchema_1 = __webpack_require__(10);
var MapSchema_1 = __webpack_require__(11);
var ChangeTree = (function () {
    function ChangeTree(indexes, parentField, parent) {
        if (indexes === void 0) {
            indexes = {};
        }
        if (parentField === void 0) {
            parentField = null;
        }
        this.changed = false;
        this.changes = new Set();
        this.allChanges = new Set();
        this.deletedKeys = {};
        this.fieldIndexes = indexes;
        this.parent = parent;
        this.parentField = parentField;
    }
    ChangeTree.prototype.change = function (fieldName, isDelete) {
        if (isDelete === void 0) {
            isDelete = false;
        }
        var fieldIndex = this.fieldIndexes[fieldName];
        var field = (typeof (fieldIndex) === "number") ? fieldIndex : fieldName;
        if (!isDelete) {
            this.changed = true;
            this.changes.add(field);
            this.allChanges.add(field);
        }
        else if (isDelete) {
            this.changed = true;
            this.changes.add(field);
            this.allChanges.delete(field);
        }
        if (this.parent) {
            this.parent.change(this.parentField);
        }
    };
    ChangeTree.prototype.mapIndex = function (instance, key) {
        if (typeof instance === "object") {
            if (!this.indexMap) {
                this.indexMap = new Map();
                this.indexChange = new Map();
            }
            this.indexMap.set(instance, key);
        }
    };
    ChangeTree.prototype.getIndex = function (instance) {
        return this.indexMap && this.indexMap.get(instance);
    };
    ChangeTree.prototype.deleteIndex = function (instance) {
        if (typeof instance === "object") {
            this.deletedKeys[this.indexMap.get(instance)] = true;
            this.indexMap.delete(instance);
        }
    };
    ChangeTree.prototype.isDeleted = function (key) {
        return this.deletedKeys[key] !== undefined;
    };
    ChangeTree.prototype.mapIndexChange = function (instance, previousKey) {
        if (typeof instance === "object" && !this.indexChange.has(instance)) {
            this.indexChange.set(instance, previousKey);
        }
    };
    ChangeTree.prototype.getIndexChange = function (instance) {
        return this.indexChange && this.indexChange.get(instance);
    };
    ChangeTree.prototype.deleteIndexChange = function (instance) {
        if (typeof instance === "object") {
            this.indexChange.delete(instance);
        }
    };
    ChangeTree.prototype.changeAll = function (obj) {
        if (obj instanceof Schema_1.Schema) {
            var schema = obj['_schema'];
            for (var field in schema) {
                if ((obj[field] instanceof Schema_1.Schema ||
                    obj[field] instanceof ArraySchema_1.ArraySchema ||
                    obj[field] instanceof MapSchema_1.MapSchema) &&
                    !obj[field].$changes.parent.parent) {
                    obj[field].$changes.parent = this;
                }
                if (obj[field] !== undefined) {
                    this.change(field);
                }
            }
        }
        else {
            var keys = Object.keys(obj);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (obj[key] !== undefined) {
                    this.change(key);
                }
            }
        }
    };
    ChangeTree.prototype.discard = function () {
        this.changed = false;
        this.changes.clear();
        this.deletedKeys = {};
        if (this.indexChange) {
            this.indexChange.clear();
        }
    };
    ChangeTree.prototype.clone = function () {
        return new ChangeTree(this.fieldIndexes, this.parentField, undefined);
    };
    return ChangeTree;
}());
exports.ChangeTree = ChangeTree;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.defineTypes = exports.deprecated = exports.filter = exports.type = exports.globalContext = exports.Context = void 0;
var ChangeTree_1 = __webpack_require__(47);
var Schema_1 = __webpack_require__(13);
var Context = (function () {
    function Context() {
        this.types = {};
        this.schemas = new Map();
    }
    Context.prototype.has = function (schema) {
        return this.schemas.has(schema);
    };
    Context.prototype.get = function (typeid) {
        return this.types[typeid];
    };
    Context.prototype.add = function (schema) {
        schema._typeid = this.schemas.size;
        this.types[schema._typeid] = schema;
        this.schemas.set(schema, schema._typeid);
    };
    return Context;
}());
exports.Context = Context;
exports.globalContext = new Context();
function type(type, context) {
    if (context === void 0) {
        context = exports.globalContext;
    }
    return function (target, field) {
        var constructor = target.constructor;
        constructor._context = context;
        if (!context.has(constructor)) {
            context.add(constructor);
            constructor._schema = Object.assign({}, constructor._schema || {});
            constructor._indexes = Object.assign({}, constructor._indexes || {});
            constructor._fieldsByIndex = Object.assign({}, constructor._fieldsByIndex || {});
            constructor._descriptors = Object.assign({}, constructor._descriptors || {});
            constructor._deprecated = Object.assign({}, constructor._deprecated || {});
        }
        var index = Object.keys(constructor._schema).length;
        constructor._fieldsByIndex[index] = field;
        constructor._indexes[field] = index;
        constructor._schema[field] = type;
        if (constructor._descriptors[field]) {
            return;
        }
        var isArray = Array.isArray(type);
        var isMap = !isArray && type.map;
        var isSchema = (typeof (constructor._schema[field]) === "function");
        var fieldCached = "_" + field;
        constructor._descriptors[fieldCached] = {
            enumerable: false,
            configurable: false,
            writable: true,
        };
        constructor._descriptors[field] = {
            get: function () {
                return this[fieldCached];
            },
            set: function (value) {
                if (isArray || isMap) {
                    value = new Proxy(value, {
                        get: function (obj, prop) { return obj[prop]; },
                        set: function (obj, prop, setValue) {
                            if (prop !== "length" && prop.indexOf("$") !== 0) {
                                var key = (isArray) ? Number(prop) : String(prop);
                                if (!obj.$sorting) {
                                    var previousIndex = obj.$changes.getIndex(setValue);
                                    if (previousIndex !== undefined) {
                                        obj.$changes.mapIndexChange(setValue, previousIndex);
                                    }
                                    obj.$changes.mapIndex(setValue, key);
                                }
                                if (setValue instanceof Schema_1.Schema) {
                                    if (!setValue.$changes.parent) {
                                        setValue.$changes = new ChangeTree_1.ChangeTree(setValue._indexes, key, obj.$changes);
                                        setValue.$changes.changeAll(setValue);
                                    }
                                }
                                else {
                                    obj[prop] = setValue;
                                }
                                obj.$changes.change(key);
                            }
                            else if (setValue !== obj[prop]) {
                            }
                            obj[prop] = setValue;
                            return true;
                        },
                        deleteProperty: function (obj, prop) {
                            var deletedValue = obj[prop];
                            if (isMap && deletedValue !== undefined) {
                                obj.$changes.deleteIndex(deletedValue);
                                obj.$changes.deleteIndexChange(deletedValue);
                                if (deletedValue.$changes) {
                                    delete deletedValue.$changes.parent;
                                }
                            }
                            delete obj[prop];
                            var key = (isArray) ? Number(prop) : String(prop);
                            obj.$changes.change(key, true);
                            return true;
                        },
                    });
                }
                if (value === this[fieldCached]) {
                    return;
                }
                this[fieldCached] = value;
                if (isArray) {
                    this.$changes.change(field);
                    value.$changes = new ChangeTree_1.ChangeTree({}, field, this.$changes);
                    for (var i = 0; i < value.length; i++) {
                        if (value[i] instanceof Schema_1.Schema) {
                            value[i].$changes = new ChangeTree_1.ChangeTree(value[i]._indexes, i, value.$changes);
                            value[i].$changes.changeAll(value[i]);
                        }
                        value.$changes.mapIndex(value[i], i);
                        value.$changes.change(i);
                    }
                }
                else if (isMap) {
                    value.$changes = new ChangeTree_1.ChangeTree({}, field, this.$changes);
                    this.$changes.change(field);
                    for (var key in value) {
                        if (value[key] instanceof Schema_1.Schema) {
                            value[key].$changes = new ChangeTree_1.ChangeTree(value[key]._indexes, key, value.$changes);
                            value[key].$changes.changeAll(value[key]);
                        }
                        value.$changes.mapIndex(value[key], key);
                        value.$changes.change(key);
                    }
                }
                else if (isSchema) {
                    this.$changes.change(field);
                    if (value) {
                        value.$changes = new ChangeTree_1.ChangeTree(value._indexes, field, this.$changes);
                        value.$changes.changeAll(value);
                    }
                }
                else {
                    this.$changes.change(field);
                }
            },
            enumerable: true,
            configurable: true
        };
    };
}
exports.type = type;
function filter(cb) {
    return function (target, field) {
        var constructor = target.constructor;
        if (!constructor._filters) {
            constructor._filters = {};
        }
        constructor._filters[field] = cb;
    };
}
exports.filter = filter;
function deprecated(throws, context) {
    if (throws === void 0) {
        throws = true;
    }
    if (context === void 0) {
        context = exports.globalContext;
    }
    return function (target, field) {
        var constructor = target.constructor;
        constructor._deprecated[field] = true;
        if (throws) {
            constructor._descriptors[field] = {
                get: function () { throw new Error(field + " is deprecated."); },
                set: function (value) { },
                enumerable: false,
                configurable: true
            };
        }
    };
}
exports.deprecated = deprecated;
function defineTypes(target, fields, context) {
    if (context === void 0) {
        context = exports.globalContext;
    }
    for (var field in fields) {
        type(fields[field], context)(target.prototype, field);
    }
    return target;
}
exports.defineTypes = defineTypes;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = __webpack_require__(50);
const LobbyControl_1 = __webpack_require__(51);
const GameTrackRunner_1 = __webpack_require__(55);
const SpectatorTrackRunner_1 = __webpack_require__(72);
const Colyseus = __webpack_require__(73);
const TextPanel_1 = __webpack_require__(6);
const SpritePanel_1 = __webpack_require__(4);
const Sound_1 = __webpack_require__(2);
const SpriteAnimation_1 = __webpack_require__(0);
const gameUtils_1 = __webpack_require__(5);
const GameRepo_1 = __importDefault(__webpack_require__(23));
const config_1 = __webpack_require__(18);
const hostData_1 = __webpack_require__(19);
const land_1 = __webpack_require__(96);
const SpriteMaterial_1 = __webpack_require__(1);
engine["PRODI"] = true;
const DevGame = GameRepo_1.default.CostumeGame;
const devSeed = 2222222231;
console.log("META_SAMMICH");
const createSpectatorTrackHandler = (root, { lobbyRoom, trackSeed, minGames, alreadyStarted = false }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("createSpectatorTrackHandler", root, lobbyRoom, { trackSeed, minGames });
    const spectatorTrack = yield SpectatorTrackRunner_1.createSpectatorTrack(root, { lobbyRoom, trackSeed, minGames, alreadyStarted });
});
const createGameTrackHandler = (root, { gameRoom, lobbyRoom, user, trackSeed, player, minGames }) => __awaiter(void 0, void 0, void 0, function* () {
    const gameTrack = yield GameTrackRunner_1.createTrack(root, { gameRoom, lobbyRoom, user, trackSeed, minGames });
    gameTrack.onScore((...args) => {
        console.log("onScore", args);
    });
    gameTrack.onFinish(() => {
        console.log("gameTrack.onFinish");
    });
    gameRoom.state.onChange = (changes) => {
        console.log("gameRoom state change", changes, gameRoom.state);
        if (gameRoom.state.player1 && gameRoom.state.player2
            && gameRoom.state.minGames <= gameRoom.state.currentGameIndex
            && gameRoom.state.score.player1 !== gameRoom.state.score.player2) {
            const winner = (gameRoom.state.score.player1 || 0) > (gameRoom.state.score.player2 || 0) ? 1 : 2;
            const nonWinner = winner === 1 ? 2 : 1;
            const res = `${lobbyRoom.state[`player${winner}`].displayName}\npwned\n${lobbyRoom.state[`player${nonWinner}`].displayName}`;
            if (!gameRoom.state.player1.skipEnd && !gameRoom.state.player2.skipEnd) {
                TextPanel_1.updateTextPanel({ value: `Players must click to skip end screen\n\n${res}` });
            }
            else {
                TextPanel_1.updateTextPanel({ value: `One player still have to click\nto skip end screen.\n\n${res}` });
            }
        }
        if (![gameRoom.state.player1.readyNext, gameRoom.state.player2.readyNext].every(i => i)
            && (gameRoom.state.player1.readyNext || gameRoom.state.player2.readyNext)
            && gameRoom.state[`player${player}`].readyNext) {
            TextPanel_1.updateTextPanel({ value: "Waiting for other player" });
        }
        else if (TextPanel_1.getTextPanelValue() === "Waiting for other player") {
            TextPanel_1.updateTextPanel({ value: "" });
        }
    };
    gameRoom.onMessage("*", (...args) => {
        console.log("gameRoom onMessage *", ...args);
    });
    const dispose = () => {
        gameRoom.dispose();
        gameRoom = null;
    };
    return dispose;
});
let gameLobby;
class SammichGame {
    constructor(api, landData) {
        this.state = {
            countToCheckCamera: 0
        };
        (() => __awaiter(this, void 0, void 0, function* () {
            const { position, rotation, scale, hideFrame, hideBoard, hideAd, soundDistance, showJoinVoice, voiceChannel, showScenario, serverWs, serverHttp } = JSON.parse(landData.host_data).sammichgame;
            const gameID = JSON.parse(landData.host_data).sammichgame.gameID.replace(',', "_");
            const client = new Colyseus.Client(`${serverWs || config_1.WS_HOST}`);
            console.log(`ws connecting to ${serverWs || config_1.WS_HOST}`);
            yield gameUtils_1.sleep(0);
            SpriteMaterial_1.loadTexture();
            Sound_1.loadSounds();
            const user = api.getUserData ? (yield api.getUserData()) : api.user.data;
            const land = yield land_1.getLand();
            hostData_1.setHostData({ land, gameID, position, rotation, scale, hideFrame, hideBoard, hideAd, soundDistance, showJoinVoice, voiceChannel, showScenario, serverWs, serverHttp });
            console.log("META_LAND", land);
            console.log("uuuser", user);
            const root = new Entity();
            TextPanel_1.createTextPanel(root, "");
            SpritePanel_1.createSpritePanel(root);
            SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(1, 0, 192, 128) });
            this.rootTransform = new Transform({
                position: new Vector3(position.x, position.y, position.z),
                scale: new Vector3(scale.x, scale.y, scale.z)
            });
            this.rootTransform.rotation.setEuler(rotation.x, rotation.y, rotation.z);
            root.addComponent(this.rootTransform);
            engine.addEntity(root);
            const SoundE = new Entity();
            SoundE.addComponent(new Transform({ position: new Vector3(0, 2, -2) }));
            SoundE.setParent(root);
            Sound_1.addSoundsToEntity(SoundE);
            if (!hideFrame)
                Frame_1.createFrame(root);
            if (!hideAd)
                SpriteAnimation_1.createSpriteEntity(root, {
                    position: new Vector3(0.25, -0.4, -0.14),
                    scale: new Vector3(6.5, 0.75, 1),
                    uvs: SpriteAnimation_1.getSpriteUv(1, (960 / 64) * (1024 / 384), 384, 64)
                });
            gameLobby = LobbyControl_1.createLobbyControl(root, { gameID, client, user, hideBoard });
        }))();
    }
    update(dt) {
    }
    refreshHost(landData) {
    }
}
exports.default = SammichGame;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createFrame = void 0;
exports.createFrame = (root) => {
    const resourceBaseUrl = `${engine["RESOURCE_BASE"] || globalThis["RESOURCE_BASE"] || ''}`;
    const shape = new GLTFShape(`${resourceBaseUrl}models/frame.glb`);
    const mat = new Material();
    shape.withCollisions = false;
    mat.albedoColor = Color3.FromHexString('#333333');
    mat.specularIntensity = 0.1;
    mat.roughness = 0.9;
    mat.metallic = 0.1;
    const trans = new Transform({ position: new Vector3(0, -0.76, 0) });
    const frame = new Entity();
    frame.addComponent(shape);
    frame.addComponent(mat);
    frame.addComponent(trans);
    frame.setParent(root);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createLobbyControl = void 0;
const StartButtonPanel_1 = __webpack_require__(52);
const GameLobby_1 = __webpack_require__(53);
const Board_1 = __webpack_require__(54);
const TextPanel_1 = __webpack_require__(6);
const SpritePanel_1 = __webpack_require__(4);
const Sound_1 = __webpack_require__(2);
const VideoPanel_1 = __webpack_require__(14);
const SpriteAnimation_1 = __webpack_require__(0);
let lobbyRoom = null;
const callbacks = {
    onCreate: null,
    onJoin: null,
    onPlayersFull: null,
    onChangeState: null,
    onMessage: null,
    onSpectatorMessage: null,
    onGameRunning: null
};
let firstTimeLobbyStateChange = true;
exports.createLobbyControl = (root, { gameID, user, client, hideBoard }) => {
    const startButtonPanel = StartButtonPanel_1.createStartButtonPanel(root);
    if (!hideBoard)
        Board_1.createBoard(root);
    startButtonPanel.showJoinButtonOn(() => {
        console.log("showJoin");
        if (!lobbyRoom || !lobbyRoom.state || !lobbyRoom.state.initialized)
            return false;
        if (lobbyRoom.state.player1 && lobbyRoom.state.player1.userId === user.userId)
            return false;
        if (lobbyRoom.state.player1 && !lobbyRoom.state.player2)
            return true;
        return false;
    });
    startButtonPanel.showCreateButtonOn(() => {
        console.log("showCreate");
        if (!lobbyRoom || !lobbyRoom.state || !lobbyRoom.state.initialized)
            return false;
        if (lobbyRoom.state.player1)
            return false;
        if (!lobbyRoom.state.player1)
            return true;
    });
    startButtonPanel.showCancelButtonOn(() => {
        var _a;
        console.log("showCancel");
        if (((_a = lobbyRoom === null || lobbyRoom === void 0 ? void 0 : lobbyRoom.state) === null || _a === void 0 ? void 0 : _a.player1) && lobbyRoom.state.player2)
            return false;
        if (!lobbyRoom || !lobbyRoom.state || !lobbyRoom.state.initialized)
            return false;
        if (!lobbyRoom.state.player1)
            return false;
        if (lobbyRoom.state.player1 && lobbyRoom.state.player1.userId === user.userId)
            return true;
    });
    startButtonPanel.update();
    GameLobby_1.joinOrCreateGameLobby(client, { gameID, user })
        .then((gameLobby) => {
        TextPanel_1.updateTextPanel({ value: "", color: Color3.FromHexString("#ffffff") });
        console.log("gameLobby", gameLobby, user);
        lobbyRoom = gameLobby.room;
        let _gameRoom = null;
        lobbyRoom.onMessage("GAME_FULL", ({ trackSeed, minGames }) => {
            callbacks.onPlayersFull({ lobbyRoom, trackSeed, minGames });
        });
        lobbyRoom.state.onChange = (fieldChanges) => {
            var _a;
            startButtonPanel.update();
            console.log("LOBBY STATE CHANGE", fieldChanges);
            Board_1.updateBoard(lobbyRoom);
            console.log("lobbyRoom.state", lobbyRoom.state);
            if (lobbyRoom.state.player1 && !lobbyRoom.state.player2) {
                Sound_1.stopAllSounds();
                Sound_1.playLoop("music2");
                TextPanel_1.updateTextPanel({ value: `${lobbyRoom.state.player1.displayName} as player 1\nwaiting for someone to join`, bottom: true, color: Color3.Black(), hTextAlign: "left" });
                SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(1, 0, 192, 128) });
                SpritePanel_1.showSpritePanel();
            }
            if (!lobbyRoom.state.player1 && !lobbyRoom.state.player2) {
                if (engine["PRODI"]) {
                    VideoPanel_1.removeVideoPanel();
                    SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(1, 0, 192, 128) });
                    SpritePanel_1.showSpritePanel();
                    if ((_a = lobbyRoom.state.lastPlayer1) === null || _a === void 0 ? void 0 : _a.displayName) {
                        TextPanel_1.updateTextPanel({ value: `${lobbyRoom.state.lastPlayer1.displayName} ${lobbyRoom.state.lastPlayer1.score} - ${lobbyRoom.state.lastPlayer2.score} ${lobbyRoom.state.lastPlayer2.displayName}` });
                    }
                    else {
                        TextPanel_1.updateTextPanel({ value: "" });
                    }
                    Sound_1.stopAllSounds();
                }
            }
            if (lobbyRoom.state.player1 && lobbyRoom.state.player2 && !isCurrentUserPlayer() && (player2EmptyPreviously() || firstTimeLobbyStateChange)) {
                console.log("stop all and tell players playing");
                Sound_1.stopAllSounds();
                TextPanel_1.updateTextPanel({ value: `${lobbyRoom.state.player1.displayName} and ${lobbyRoom.state.player2.displayName}\nare playing` });
                SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(9, 0, 192, 128) });
                SpritePanel_1.showSpritePanel();
                if (firstTimeLobbyStateChange) {
                    callbacks.onGameRunning({ lobbyRoom, minGames });
                }
            }
            firstTimeLobbyStateChange = false;
            function isCurrentUserPlayer() {
                var _a;
                return lobbyRoom.state.player1 && lobbyRoom.state.player2 && (lobbyRoom.state.player1.userId === user.userId || ((_a = lobbyRoom.state.player2) === null || _a === void 0 ? void 0 : _a.userId) === user.userId);
            }
            function player2EmptyPreviously() {
                const player2FieldChange = fieldChanges.find(f => f.field === 'player2') || {};
                return player2FieldChange.value && !player2FieldChange.previousValue;
            }
            function hasChangeTrackSeed(fieldChanges) {
                const trackSeedFieldChange = getFieldChange(fieldChanges, "trackSeed");
                return trackSeedFieldChange.value !== trackSeedFieldChange.value;
            }
            function getFieldChange(fieldChanges, fieldId) {
                return fieldChanges.find(f => f.field === fieldId);
            }
        };
        lobbyRoom.state.onAdd = (instance, key) => {
            console.log("LOBBY STATE onAdd", instance, key);
        };
        lobbyRoom.state.onRemove = (instance, key) => {
            console.log("LOBBY STATE onRemove", instance, key);
        };
        const minGames = 5;
        startButtonPanel.onRequestCreate(() => {
            if (lobbyRoom.state.player1)
                return;
            gameLobby.requestCreate({
                gameID,
                user,
                minGames,
                lobbySessionId: lobbyRoom.sessionId
            }).then(({ sessionId, gameRoom }) => {
                _gameRoom = gameRoom;
                callbacks.onCreate(gameRoom, { minGames });
            }, () => {
                console.log("requestCreate rejected");
            });
        });
        startButtonPanel.onRequestCancel(() => {
            _gameRoom && _gameRoom.leave();
        });
        startButtonPanel.onRequestJoin(() => {
            console.log("requestJoin", gameID, lobbyRoom.state.gameRoomID, gameLobby.room.sessionId);
            if (lobbyRoom.state.player2)
                return;
            gameLobby.requestJoin({
                roomID: lobbyRoom.state.gameRoomID,
                gameID,
                user,
                lobbySessionId: lobbyRoom.sessionId
            }).then(({ gameRoom }) => {
                _gameRoom = gameRoom;
                callbacks.onJoin(gameRoom, { minGames });
            }, () => {
                console.log("requestJoin rejected");
            });
        });
    }, (err) => {
        TextPanel_1.updateTextPanel({ value: "Unable to connect to server.\nServer could be down.\n\nAlso some adblockers can\nblock websocket connection.\n\nTry to refresh when problem solved.", color: Color3.FromHexString("#ff0000") });
        log("ERR__", err);
    });
    return {
        onCreate: (fn) => {
            callbacks.onCreate = fn;
            return () => callbacks.onCreate = null;
        },
        onJoin: (fn) => {
            callbacks.onJoin = fn;
            return () => callbacks.onJoin = null;
        },
        onPlayersFull: (fn) => {
            callbacks.onPlayersFull = fn;
            return () => callbacks.onPlayersFull = null;
        },
        onGameRunning: (fn) => {
            callbacks.onGameRunning = fn;
            return () => callbacks.onGameRunning = null;
        },
        onChangeState: (fn) => {
            callbacks.onChangeState = fn;
            return () => callbacks.onChangeState = null;
        },
        onMessage: (fn) => {
            callbacks.onMessage = fn;
            return () => callbacks.onMessage;
        },
        update: () => {
        },
        getLobbyRoom: () => lobbyRoom,
        hide: () => {
        }
    };
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStartButtonPanel = exports.onRequestCancel = exports.onRequestJoin = exports.onRequestCreate = exports.showJoinButtonOn = exports.showCreateButtonOn = exports.showCancelButtonOn = exports.createStartButtonPanel = void 0;
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
const triggers = { showCreateButtonOn: null, showJoinButtonOn: null, showCancelButtonOn: null };
let createGameButton = null;
let joinGameButton = null;
let cancelGameButton = null;
const callbacks = {
    onRequestCreate: null,
    onRequestJoin: null,
    onRequestCancel: null
};
const createButton = (parent, buttonText, position) => {
    let callbacks = {
        onClick: null
    };
    const button = new Entity();
    const transform = new Transform({ position });
    button.addComponent(transform);
    const box = new Entity();
    const boxShape = new PlaneShape();
    boxShape.withCollisions = false;
    boxShape.uvs = SpriteAnimation_1.getSpriteUv(buttonText === "create"
        ? 1
        : buttonText === "join"
            ? 2
            : 9, 12 * (1024 / 48), 48, 32);
    box.addComponent(SpriteMaterial_1.spriteMaterial);
    box.addComponent(boxShape);
    boxShape.visible = false;
    box.addComponent(new Transform({ scale: new Vector3(1.5, 1, 1), position: new Vector3(0, 0, 0) }));
    box.addComponent(new OnClick(() => {
        callbacks.onClick();
    }));
    box.setParent(button);
    button.setParent(parent);
    const hide = () => {
        boxShape.visible = false;
    };
    hide();
    return {
        onClick: (fn) => {
            callbacks.onClick = fn;
            return () => callbacks.onClick = null;
        },
        show: () => {
            boxShape.visible = true;
        },
        hide
    };
};
const PIXEL = 0.03125;
exports.createStartButtonPanel = (root) => {
    const panel = new Entity();
    const buttonY = (PIXEL * 25 / 2) + PIXEL * 2;
    createGameButton = createButton(panel, "create", new Vector3(-(3 - 48 * PIXEL / 2 - PIXEL * 2), buttonY, -0.01));
    createGameButton.onClick(() => callbacks.onRequestCreate());
    joinGameButton = createButton(panel, "join", new Vector3((3 - 48 * PIXEL / 2 - PIXEL * 2), buttonY, -0.01));
    joinGameButton.onClick(() => callbacks.onRequestJoin());
    cancelGameButton = createButton(panel, "cancel", new Vector3(-(3 - 48 * PIXEL / 2 - PIXEL * 2), buttonY + PIXEL * 36, -0.01));
    cancelGameButton.onClick(() => callbacks.onRequestCancel());
    if (engine["PRODI"]) {
        panel.setParent(root);
    }
    return {
        onRequestCreate: exports.onRequestCreate,
        onRequestJoin: exports.onRequestJoin,
        onRequestCancel: exports.onRequestCancel,
        showCreateButtonOn: exports.showCreateButtonOn,
        showJoinButtonOn: exports.showJoinButtonOn,
        showCancelButtonOn: exports.showCancelButtonOn,
        update: exports.updateStartButtonPanel
    };
};
exports.showCancelButtonOn = (fn) => {
    triggers.showCancelButtonOn = fn;
    return () => triggers.showCancelButtonOn = null;
};
exports.showCreateButtonOn = (fn) => {
    triggers.showCreateButtonOn = fn;
    return () => triggers.showCreateButtonOn = null;
};
exports.showJoinButtonOn = (fn) => {
    triggers.showJoinButtonOn = fn;
    return () => triggers.showJoinButtonOn = null;
};
exports.onRequestCreate = (fn) => {
    callbacks.onRequestCreate = fn;
    return () => callbacks.onRequestCreate = null;
};
exports.onRequestJoin = (fn) => {
    callbacks.onRequestJoin = fn;
    return () => callbacks.onRequestJoin = null;
};
exports.onRequestCancel = (fn) => {
    callbacks.onRequestCancel = fn;
    return () => callbacks.onRequestCancel = null;
};
exports.updateStartButtonPanel = () => {
    if (triggers.showCreateButtonOn()) {
        createGameButton.show();
    }
    else {
        createGameButton.hide();
    }
    if (triggers.showJoinButtonOn()) {
        joinGameButton.show();
    }
    else {
        joinGameButton.hide();
    }
    if (triggers.showCancelButtonOn()) {
        cancelGameButton.show();
    }
    else {
        cancelGameButton.hide();
    }
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinOrCreateGameLobby = void 0;
const config_1 = __webpack_require__(18);
const hostData_1 = __webpack_require__(19);
const navigator = globalThis && globalThis.navigator || {};
exports.joinOrCreateGameLobby = (client, { gameID, user }) => __awaiter(void 0, void 0, void 0, function* () {
    const { serverHttp } = hostData_1.getHostData();
    yield fetch(`${serverHttp || config_1.HTTP_HOST}/game?id=${gameID}`);
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const { land } = hostData_1.getHostData();
        console.log("HOPST_DATA_LAND", land);
        client.joinOrCreate(`gameLobby_${gameID}`, { gameID, user, land, clientInfo: { language: navigator.language || null } }).then(lobbyRoom => {
            console.log("___lobbyRoom", lobbyRoom);
            resolve({
                requestCreate: ({ gameID, user, minGames, lobbySessionId }) => __awaiter(void 0, void 0, void 0, function* () {
                    log("requestCreate", gameID, user);
                    return client.create(`game_${gameID}`, { gameID, user: Object.assign(Object.assign({}, user), { address: (user.address || 'empty') }), minGames, lobbySessionId, land }).then((room) => {
                        return { sessionId: room.sessionId, gameRoomID: room.id, gameRoom: room };
                    }, () => {
                        console.log("ERROR CREATE");
                    });
                }),
                requestJoin: ({ roomID, user, lobbySessionId }) => __awaiter(void 0, void 0, void 0, function* () {
                    log("requestJoin", roomID);
                    return client.joinById(roomID, { gameID, user: Object.assign(Object.assign({}, user), { address: (user.address || 'empty') }), lobbySessionId, land }).then((room) => {
                        return { sessionId: room.sessionId, gameRoomID: room.id, gameRoom: room };
                    }, () => {
                        console.log("ERROR JOIN");
                    });
                }),
                room: lobbyRoom
            });
        }).catch(e => {
            reject({
                message: "_join error",
                error: e
            });
        });
    }));
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBoard = exports.createBoard = void 0;
const SpriteAnimation_1 = __webpack_require__(0);
const Sound_1 = __webpack_require__(2);
const entity = {
    player1: new Entity(),
    player2: new Entity()
};
exports.createBoard = (root) => {
    const text1 = new TextShape();
    const text2 = new TextShape();
    const board = new Entity();
    board.addComponent(new Transform({
        position: new Vector3(0, 4, -0.15)
    }));
    board.setParent(root);
    text1.color = Color3.FromHexString("#6666ff");
    text2.color = Color3.FromHexString("#ffff00");
    text1.hTextAlign = "left";
    text1.vTextAlign = text2.vTextAlign = "top";
    text2.hTextAlign = "right";
    text1.fontSize = text2.fontSize = 2;
    entity.player1.addComponent(text1);
    entity.player2.addComponent(text2);
    entity.player1.addComponent(new Transform({ position: new Vector3(-2.99, 0.5, -0.001) }));
    entity.player2.addComponent(new Transform({ position: new Vector3(+2.99, 0.5, -0.001) }));
    entity.player1.setParent(board);
    entity.player2.setParent(board);
    const background = new Entity();
    const backMat = new Material();
    background.addComponent(backMat);
    backMat.transparencyMode = 1;
    backMat.specularIntensity = 0;
    backMat.roughness = 1;
    backMat.metallic = 0;
    backMat.alphaTest = 0.5;
    backMat.albedoColor = new Color4(0, 0, 0, 0.7);
    background.addComponent(new PlaneShape());
    background.addComponent(new Transform({
        scale: new Vector3(6, 0.5, 1),
        position: new Vector3(0, 0.25, 0)
    }));
    background.setParent(board);
    let musicEnabled = true;
    const musicToggler = SpriteAnimation_1.createSpriteEntity(board, {
        uvs: SpriteAnimation_1.getSpriteUv(10, (512 / 16) * (1024 / 16), 16, 16),
        position: new Vector3(0, 0.25, -0.001),
        scale: new Vector3(0.5, 0.5, 1)
    });
    musicToggler.getEntity().addComponent(new OnClick(() => {
        Sound_1.toggleMusic();
        musicEnabled = !musicEnabled;
        if (musicEnabled) {
            musicToggler.getShape().uvs = SpriteAnimation_1.getSpriteUv(10, (512 / 16) * (1024 / 16), 16, 16);
        }
        else {
            musicToggler.getShape().uvs = SpriteAnimation_1.getSpriteUv(11, (512 / 16) * (1024 / 16), 16, 16);
        }
    }));
};
exports.updateBoard = (lobbyRoom) => {
    if (lobbyRoom.state.player1)
        entity.player1.getComponent(TextShape).value = `${lobbyRoom.state.player1.score || 0} points\n${lobbyRoom.state.player1.displayName}`;
    if (lobbyRoom.state.player2)
        entity.player2.getComponent(TextShape).value = `${lobbyRoom.state.player2.score || 0} points\n${lobbyRoom.state.player2.displayName}`;
    if (!lobbyRoom.state.player1)
        entity.player1.getComponent(TextShape).value = `<free>`;
    if (!lobbyRoom.state.player2)
        entity.player2.getComponent(TextShape).value = `<free>`;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrack = void 0;
const TextPanel_1 = __webpack_require__(6);
const Sound_1 = __webpack_require__(2);
const SpritePanel_1 = __webpack_require__(4);
const VideoPanel_1 = __webpack_require__(14);
const SpriteAnimation_1 = __webpack_require__(0);
const TrackUtil_1 = __webpack_require__(20);
let timeOffset = 0;
exports.createTrack = (root, { gameRoom, lobbyRoom, user, trackSeed, minGames }) => __awaiter(void 0, void 0, void 0, function* () {
    const callbacks = {
        onScore: null,
        onFinish: null
    };
    const gameTrackDefinition = TrackUtil_1.generateTrack(trackSeed, minGames);
    console.log("gameTrackDefinition", gameTrackDefinition);
    const state = {
        currentIndex: 0,
        currentPlayer: 0,
        currentRoundIndex: 0,
        score1: 0,
        score2: 0
    };
    if (lobbyRoom.state.player1.userId === user.userId)
        state.currentPlayer = 1;
    if (lobbyRoom.state.player2.userId === user.userId)
        state.currentPlayer = 2;
    Sound_1.stopSound("music2");
    yield sleep(100);
    Sound_1.playOnce("vs", { volume: 1 });
    SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(10, 0, 192, 128) });
    TextPanel_1.updateTextPanel({
        value: `${lobbyRoom.state.player1.displayName} (left)\nVS\n${lobbyRoom.state.player2.displayName} (right)`, bottom: false, color: Color3.White()
    });
    yield sleep(3000);
    VideoPanel_1.reproduceVideo(root, gameTrackDefinition[0].Game.id);
    SpritePanel_1.hideSpritePanel();
    TextPanel_1.updateTextPanel({ value: gameTrackDefinition[0].Game.instructions + `\n\nClick when ready to play\nor waiting 20 seconds` });
    let game = new gameTrackDefinition[state.currentIndex].Game(root, {
        seed: trackSeed,
        currentPlayer: state.currentPlayer,
        level: 1,
        gameIndex: 0
    });
    setGameCallbacks(game, gameRoom);
    setGameRoomMessageHandlers(gameRoom);
    const initGameOnUserAction = () => {
        gameRoom.send("READY_NEXT", { senderPlayer: state.currentPlayer, games: (gameTrackDefinition || []).map(g => g.Game.id) });
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, initGameOnUserAction);
        TextPanel_1.updateTextPanel({ value: `waiting for other user` });
    };
    Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, initGameOnUserAction);
    return {
        onScore,
        onFinish,
        dispose: () => {
            console.log("//TODO dispose");
        }
    };
    function onScore(fn) {
        callbacks.onScore = fn;
        return () => callbacks.onScore = null;
    }
    ;
    function onFinish(fn) {
        callbacks.onFinish = fn;
        return () => callbacks.onFinish = null;
    }
    ;
    function dispose() {
        callbacks.onFinish = callbacks.onScore = null;
    }
    ;
    function setGameRoomMessageHandlers(gameRoom) {
        gameRoom.onMessage("SHARE_STATE", (sharedState) => {
            game && game.shareState(sharedState || {});
        });
        gameRoom.onLeave((code) => {
            console.log("leave", code);
            game && game.destroy();
            game = null;
            VideoPanel_1.removeVideoPanel();
            SpritePanel_1.updateSpritePanel({ uvs: SpriteAnimation_1.getSpriteUv(1, 0, 192, 128) });
            SpritePanel_1.showSpritePanel();
        });
        gameRoom.onMessage("FINSIH_AGREE", ({ winner, nextSeed, nextIndex }) => __awaiter(this, void 0, void 0, function* () {
            console.log("received FINSIH_AGREE", { winner, nextSeed, nextIndex });
            game.finish && game.finish({ winner });
            callbacks.onScore({ score1: state.score1, score2: state.score2 });
            const winnerDisplayName = lobbyRoom.state[`player${winner}`].displayName;
            TextPanel_1.updateTextPanel({ value: `(${winner}) ${winnerDisplayName} wins` });
            yield sleep(2000);
            game.destroy();
            game = null;
            if (state.currentIndex + 1 >= gameTrackDefinition.length && state.score1 === state.score2) {
                gameTrackDefinition.push(TrackUtil_1.generateTrack(nextSeed, 1)[0]);
                console.log("tie-breaker", gameTrackDefinition);
            }
            if (state.currentIndex < gameTrackDefinition.length) {
                state.currentIndex = nextIndex;
                createGame({ nextSeed });
                setGameCallbacks(game, gameRoom);
                const instructions = gameTrackDefinition[nextIndex].Game.instructions || `ERROR: MISSING_INSTRUCTIONS`;
                VideoPanel_1.reproduceVideo(root, gameTrackDefinition[nextIndex].Game.id);
                TextPanel_1.updateTextPanel({ value: `${instructions}\n\nClick when ready to play\n or waiting 20 seconds` });
                const initGameOnUserAction = () => {
                    Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, initGameOnUserAction);
                    TextPanel_1.updateTextPanel({ value: `waiting for other user` });
                    gameRoom.send("READY_NEXT", { senderPlayer: state.currentPlayer, games: gameTrackDefinition.map(g => g.Game.id) });
                };
                Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, initGameOnUserAction);
            }
        }));
        gameRoom.onMessage("NEXT_GAME", ({ serverTime, startTime }) => {
            state.currentRoundIndex = 0;
            Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, initGameOnUserAction);
            console.log("NEXT_GAME", serverTime, startTime);
            TextPanel_1.updateTextPanel({ value: `` });
            Sound_1.stopAllSounds();
            game && game.init();
            VideoPanel_1.removeVideoPanel();
            timeOffset = serverTime - Date.now();
            game.setStartTime(getLocalStartTime(startTime));
        });
        gameRoom.onMessage("NEXT_ROUND", ({ winner, serverTime, startTime, roundIndex }) => {
            state.currentRoundIndex++;
            console.log("NEXT_ROUND", winner, serverTime, startTime);
            timeOffset = serverTime - Date.now();
            game.finishRound && game.finishRound({ winner });
            const localRoundStartTime = getLocalStartTime(startTime);
            console.log("localRoundStartTime", localRoundStartTime, new Date(localRoundStartTime).getMinutes(), new Date(localRoundStartTime).getSeconds());
            console.log("now", Date.now(), new Date().getMinutes(), new Date().getSeconds());
            game.setRoundStartTime && game.setRoundStartTime(localRoundStartTime);
        });
        gameRoom.onMessage("FINISH_TRACK", ({ score }) => __awaiter(this, void 0, void 0, function* () {
            console.log("receive FINISH_TRACK", score);
            game.destroy();
            game = null;
            Sound_1.playOnce("pwned");
            const winnerPlayer = (score.player1 || 0) > (score.player2 || 0) ? 1 : 2;
            SpritePanel_1.updateSpritePanel({
                uvs: SpriteAnimation_1.getSpriteUv(8, 0, 192, 128),
                scale: new Vector3(winnerPlayer === 1 ? 6 : -6, 4, 1)
            });
            SpritePanel_1.showSpritePanel();
            callbacks.onFinish({ score });
            const clickSkip = () => {
                gameRoom.send("SKIP_END", { senderPlayer: state.currentPlayer });
            };
            Input.instance.subscribe("BUTTON_DOWN", ActionButton.POINTER, false, clickSkip);
            gameRoom.onLeave(() => Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.POINTER, clickSkip));
        }));
    }
    function setGameCallbacks(game, gameRoom) {
        game.onFinish(({ time, isWinner, score, gameIndex, roundIndex }) => {
            console.log("onFinish");
            game.block();
            const otherPlayer = state.currentPlayer === 1 ? 2 : 1;
            const winner = (isWinner
                ? state.currentPlayer : otherPlayer);
            console.log("sending FINISH_GAME", {
                winner,
                time,
                score,
                senderPlayer: state.currentPlayer,
                userId: user.userId
            });
            gameRoom.send("FINISH_GAME", {
                winner,
                time,
                score,
                senderPlayer: state.currentPlayer,
                userId: user.userId,
                currentGameIndex: gameIndex,
                currentRoundIndex: roundIndex,
                gameName: game.id
            });
        });
        game.onFinishRound && game.onFinishRound(({ player, time, score, isWinner, roundIndex, gameIndex }) => {
            const otherPlayer = state.currentPlayer === 1 ? 2 : 1;
            const winner = (isWinner
                ? state.currentPlayer : otherPlayer);
            gameRoom.send("READY_ROUND", {
                player,
                time,
                score,
                winner,
                currentGameIndex: gameIndex,
                currentRoundIndex: roundIndex,
                gameName: game.id
            });
        });
        game.onShareState((sharedState) => {
            gameRoom.send("SHARE_STATE", {
                sharedState,
                userId: user.userId,
                senderPlayer: state.currentPlayer,
                currentGameIndex: state.currentIndex,
                currentRoundIndex: state.currentRoundIndex
            });
        });
    }
    function createGame({ nextSeed }) {
        console.log(`
            createGame
            state.currentIndex: ${state.currentIndex}
            gameTrackDefinition[state.currentIndex]: ${gameTrackDefinition[state.currentIndex] && gameTrackDefinition[state.currentIndex].Game.id}
  
        `);
        if (game) {
            game.destroy();
            game = null;
        }
        const Game = gameTrackDefinition[state.currentIndex].Game;
        game = new Game(root, { seed: nextSeed, currentPlayer: state.currentPlayer, level: 1, gameIndex: state.currentIndex });
    }
    function isCurrentUserPlayer() {
        var _a;
        return lobbyRoom.state.player1 && lobbyRoom.state.player2 && (lobbyRoom.state.player1.userId === user.userId || ((_a = lobbyRoom.state.player2) === null || _a === void 0 ? void 0 : _a.userId) === user.userId);
    }
});
function getLocalStartTime(startTime) {
    return startTime - timeOffset;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createModel = void 0;
const Hair_1 = __webpack_require__(57);
const Glasses_1 = __webpack_require__(58);
const Shirt_1 = __webpack_require__(59);
const Pants_1 = __webpack_require__(60);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createModel = (root, { modelDefinition, position, scale, showLabel = "" }) => {
    const model = new Entity();
    model.addComponent(new Transform({ position, scale }));
    const doll = new Entity();
    const dollShape = new PlaneShape();
    dollShape.withCollisions = false;
    dollShape.isPointerBlocker = false;
    dollShape.uvs = SpriteAnimation_1.getSpriteUv(16, (896 / 128) * (1024 / 64), 64, 128);
    const dollMat = new Material();
    dollMat.albedoColor = new Color3(1, 0, 0);
    const dollTransform = new Transform({ scale: new Vector3(-1, 2, -1), position: new Vector3(0, 0, 0) });
    dollTransform.rotation.setEuler(0, 180, 0);
    doll.addComponent(dollTransform);
    doll.addComponent(SpriteMaterial_1.spriteMaterial);
    doll.addComponent(dollShape);
    doll.setParent(model);
    model.setParent(root);
    const parts = { glasses: null, hair: null, shirt: null, pants: null };
    parts.glasses = Glasses_1.createGlasses(model, {
        partDefinition: { type: "glasses", index: modelDefinition.glasses }
    });
    parts.hair = Hair_1.createHair(model, {
        partDefinition: { type: "hair", index: modelDefinition.hair }
    });
    parts.pants = Pants_1.createPants(model, {
        partDefinition: { type: "pants", index: modelDefinition.pants }
    });
    parts.shirt = Shirt_1.createShirt(model, {
        partDefinition: { type: "shirt", index: modelDefinition.shirt }
    });
    if (showLabel) {
        const l = new Entity();
        l.setParent(model);
        const t = new TextShape("model");
        t.fontSize = 2;
        t.font = new Font(Fonts.SanFrancisco_Heavy);
        l.addComponent(t);
        l.addComponent(new Transform({ position: new Vector3(0, 1.3, 0) }));
    }
    const addPart = ({ partDefinition }) => {
    };
    return {
        entity: model,
        update: (partDefinition) => {
            if (!partDefinition) {
                debugger;
            }
            parts[partDefinition.type].updateIndex(partDefinition.index);
        },
        dispose: () => { }
    };
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createHair = void 0;
const PartUtils_1 = __webpack_require__(8);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createHair = (parent, { partDefinition }) => {
    const PIXEL = (4 / 128) / 2;
    const hair = new Entity();
    const hairShape = new PlaneShape();
    hairShape.withCollisions = false;
    const hairTransform = new Transform({
        position: new Vector3(0.25 - PIXEL * 15, (0.75 / 2) + PIXEL * 23, -0.0003),
        scale: new Vector3(1, 1, 1)
    });
    hair.addComponent(hairShape);
    hair.addComponent(hairTransform);
    hair.addComponent(SpriteMaterial_1.spriteMaterial);
    hair.setParent(parent);
    hairShape.uvs = SpriteAnimation_1.getSpriteUv(partDefinition.index, PartUtils_1.PART_OFFSET_INDEX["hair"], PartUtils_1.PART_SIZE_WIDTH["hair"]);
    return {
        dispose: () => {
            parent.setParent(null);
            engine.removeEntity(hair);
        },
        updateIndex: (index) => {
            hairShape.uvs = SpriteAnimation_1.getSpriteUv(index, PartUtils_1.PART_OFFSET_INDEX["hair"], PartUtils_1.PART_SIZE_WIDTH["hair"]);
        }
    };
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlasses = void 0;
const PartUtils_1 = __webpack_require__(8);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createGlasses = (parent, { partDefinition }) => {
    const PIXEL = (4 / 128) / 2;
    const glasses = new Entity();
    const glassesShape = new PlaneShape();
    glassesShape.withCollisions = false;
    const hairTransform = new Transform({
        position: new Vector3(0.25 - PIXEL * 15, (0.75 / 2) + PIXEL * 8, -0.0005),
        scale: new Vector3(1, 1, 1)
    });
    glasses.addComponent(glassesShape);
    glasses.addComponent(hairTransform);
    glasses.addComponent(SpriteMaterial_1.spriteMaterial);
    glasses.setParent(parent);
    glassesShape.uvs = SpriteAnimation_1.getSpriteUv(partDefinition.index, PartUtils_1.PART_OFFSET_INDEX["glasses"], PartUtils_1.PART_SIZE_WIDTH["glasses"], PartUtils_1.PART_SIZE_HEIGHT["glasses"]);
    return {
        dispose: () => {
            parent.setParent(null);
            engine.removeEntity(glasses);
        },
        updateIndex: (index) => {
            glassesShape.uvs = SpriteAnimation_1.getSpriteUv(index, PartUtils_1.PART_OFFSET_INDEX["glasses"], PartUtils_1.PART_SIZE_WIDTH["glasses"], PartUtils_1.PART_SIZE_HEIGHT["glasses"]);
        }
    };
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createShirt = void 0;
const PartUtils_1 = __webpack_require__(8);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createShirt = (parent, { partDefinition }) => {
    const PIXEL = (4 / 128) / 2;
    const hair = new Entity();
    const shirtShape = new PlaneShape();
    shirtShape.withCollisions = false;
    const hairTransform = new Transform({
        position: new Vector3(PIXEL * 4, 0.5 - PIXEL * 15, -0.002),
        scale: new Vector3(1, 1, 1)
    });
    hair.addComponent(shirtShape);
    hair.addComponent(hairTransform);
    hair.addComponent(SpriteMaterial_1.spriteMaterial);
    hair.setParent(parent);
    shirtShape.uvs = SpriteAnimation_1.getSpriteUv(partDefinition.index, PartUtils_1.PART_OFFSET_INDEX["shirt"], PartUtils_1.PART_SIZE_WIDTH["shirt"]);
    return {
        dispose: () => {
            parent.setParent(null);
            engine.removeEntity(hair);
        },
        updateIndex: (index) => {
            shirtShape.uvs = SpriteAnimation_1.getSpriteUv(index, PartUtils_1.PART_OFFSET_INDEX["shirt"], PartUtils_1.PART_SIZE_WIDTH["shirt"]);
        }
    };
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createPants = void 0;
const PartUtils_1 = __webpack_require__(8);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
exports.createPants = (parent, { partDefinition }) => {
    const PIXEL = (4 / 128) / 2;
    const pants = new Entity();
    const pantsShape = new PlaneShape();
    pantsShape.withCollisions = false;
    const hairTransform = new Transform({
        position: new Vector3(PIXEL * 5, -0.5 + PIXEL * 2, -0.001),
        scale: new Vector3(1, 1, 1)
    });
    pants.addComponent(pantsShape);
    pants.addComponent(hairTransform);
    pants.addComponent(SpriteMaterial_1.spriteMaterial);
    pants.setParent(parent);
    pantsShape.uvs = SpriteAnimation_1.getSpriteUv(partDefinition.index, PartUtils_1.PART_OFFSET_INDEX["pants"], PartUtils_1.PART_SIZE_WIDTH["pants"]);
    return {
        dispose: () => {
            parent.setParent(null);
            engine.removeEntity(pants);
        },
        updateIndex: (index) => {
            pantsShape.uvs = SpriteAnimation_1.getSpriteUv(index, PartUtils_1.PART_OFFSET_INDEX["pants"], PartUtils_1.PART_SIZE_WIDTH["pants"]);
        }
    };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollection = exports.MAX_INDEX = void 0;
exports.MAX_INDEX = {
    hair: 10,
    glasses: 5,
    shirt: 5,
    pants: 5
};
const PART_TYPES = ["hair", "glasses", "shirt", "pants"];
exports.createCollection = (getRandomInt, modelDefinition) => {
    console.log("createCollection", modelDefinition);
    const included = Object.keys(modelDefinition).map((type) => {
        return { type, index: modelDefinition[type] };
    });
    const collection = [...included];
    PART_TYPES.forEach((partType) => {
        let i = 3;
        while (i--) {
            let index = getRandomInt(1, exports.MAX_INDEX[partType]);
            const includedType = included.find(included => included.type === partType);
            while (index === includedType.index || collection.find(i => i.type === partType && i.index === index)) {
                index = getRandomInt(1, exports.MAX_INDEX[partType]);
            }
            collection.push({
                type: partType,
                index
            });
        }
    });
    return shuffle(collection);
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(getRandomInt(1, 100) / 100 * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollectionControl = void 0;
const PartUtils_1 = __webpack_require__(8);
const Cross_1 = __webpack_require__(22);
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
const Sound_1 = __webpack_require__(2);
const PREVIOUS = 0.7;
const CURRENT = 0;
const NEXT = -0.7;
exports.createCollectionControl = (root, { collection, side, avoidAdd = false }) => {
    const control = new Entity();
    const previous = new Entity();
    const next = new Entity();
    const current = new Entity();
    const e = new Entity();
    const eShape = new TextShape("E");
    eShape.fontSize = 2;
    e.addComponent(eShape);
    e.addComponent(new Transform({ position: new Vector3(side === 1 ? -0.3 : 0.3, 0.8, -0.002) }));
    e.setParent(control);
    const f = new Entity();
    const fShape = new TextShape("F");
    fShape.fontSize = 2;
    f.addComponent(fShape);
    f.addComponent(new Transform({ position: new Vector3(side === 1 ? -0.3 : 0.3, -0.75, -0.002) }));
    f.setParent(control);
    previous.setParent(control);
    next.setParent(control);
    current.setParent(control);
    const previousDefinition = collection[0];
    const currentDefinition = collection[1];
    const nextDefinition = collection[2];
    let currentIndex = 1;
    const previousShape = new PlaneShape();
    const nextShape = new PlaneShape();
    const currentShape = new PlaneShape();
    const scale = new Vector3(0.5, 0.5, 0.5);
    previous.addComponent(new Transform({ position: new Vector3(0, PREVIOUS, 0), scale }));
    current.addComponent(new Transform({ position: new Vector3(0, CURRENT, 0), scale: new Vector3(1, 1, 1) }));
    next.addComponent(new Transform({ position: new Vector3(0, NEXT, 0), scale }));
    previous.addComponent(previousShape);
    current.addComponent(currentShape);
    next.addComponent(nextShape);
    if (!previousDefinition || !currentDefinition || !nextDefinition) {
        debugger;
    }
    previousShape.uvs = SpriteAnimation_1.getSpriteUv(previousDefinition.index, PartUtils_1.PART_OFFSET_INDEX[previousDefinition.type], PartUtils_1.PART_SIZE_WIDTH[previousDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[previousDefinition.type]);
    currentShape.uvs = SpriteAnimation_1.getSpriteUv(currentDefinition.index, PartUtils_1.PART_OFFSET_INDEX[currentDefinition.type], PartUtils_1.PART_SIZE_WIDTH[currentDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[currentDefinition.type]);
    nextShape.uvs = SpriteAnimation_1.getSpriteUv(nextDefinition.index, PartUtils_1.PART_OFFSET_INDEX[nextDefinition.type], PartUtils_1.PART_SIZE_WIDTH[nextDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[nextDefinition.type]);
    previous.addComponent(SpriteMaterial_1.spriteMaterial);
    current.addComponent(SpriteMaterial_1.spriteMaterial);
    next.addComponent(SpriteMaterial_1.spriteMaterial);
    control.addComponent(new Transform({ position: new Vector3(side === 1 ? -2.5 : 2.5, 2, -0.001) }));
    if (!avoidAdd)
        control.setParent(root);
    const crossError = Cross_1.createCross(control, { position: new Vector3(0, 0, -0.003), scale });
    crossError.hide();
    setUvsForCurrentIndex(currentIndex);
    return {
        entity: control,
        hide: () => {
            control.setParent(null);
            engine.removeEntity(control);
        },
        show: () => {
            control.setParent(root);
        },
        dispose: () => {
            control.setParent(null);
            engine.removeEntity(control);
            control.children;
        },
        getCurrent: () => {
            return collection[currentIndex];
        },
        next: () => {
            Sound_1.playOnce("swing");
            currentIndex = getNextIndex(currentIndex);
            setUvsForCurrentIndex(currentIndex);
        },
        previous: () => {
            Sound_1.playOnce("swing");
            currentIndex = getPreviousIndex(currentIndex);
            setUvsForCurrentIndex(currentIndex);
        },
        showError: () => {
            crossError.show();
        },
        hideError: () => {
            crossError.hide();
        }
    };
    function getPreviousIndex(index) {
        if (index - 1 < 0)
            return collection.length - 1;
        return index - 1;
    }
    ;
    function getNextIndex(index) {
        if (index + 1 > collection.length - 1)
            return 0;
        return index + 1;
    }
    function setUvsForCurrentIndex(currentIndex) {
        const previousIndex = getPreviousIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);
        const previousDefinition = collection[previousIndex];
        const currentDefinition = collection[currentIndex];
        const nextDefinition = collection[nextIndex];
        const currentTransform = current.getComponent(Transform);
        const currentPosition = currentTransform.position;
        if (!previousDefinition || !currentDefinition || !nextDefinition) {
            debugger;
        }
        currentPosition.set(currentPosition.x, CURRENT - (PartUtils_1.PART_TYPE_OFFSET_Y[currentDefinition.type] * currentTransform.scale.y), currentPosition.z);
        const previousTransform = previous.getComponent(Transform);
        const previousPosition = previousTransform.position;
        previousPosition.set(previousPosition.x, PREVIOUS - (PartUtils_1.PART_TYPE_OFFSET_Y[previousDefinition.type] * previousTransform.scale.y), previousPosition.z);
        const nextTransform = next.getComponent(Transform);
        const nextPosition = nextTransform.position;
        nextPosition.set(nextPosition.x, NEXT - (PartUtils_1.PART_TYPE_OFFSET_Y[nextDefinition.type] * nextTransform.scale.y), nextPosition.z);
        previousShape.uvs = SpriteAnimation_1.getSpriteUv(previousDefinition.index, PartUtils_1.PART_OFFSET_INDEX[previousDefinition.type], PartUtils_1.PART_SIZE_WIDTH[previousDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[previousDefinition.type]);
        currentShape.uvs = SpriteAnimation_1.getSpriteUv(currentDefinition.index, PartUtils_1.PART_OFFSET_INDEX[currentDefinition.type], PartUtils_1.PART_SIZE_WIDTH[currentDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[currentDefinition.type]);
        nextShape.uvs = SpriteAnimation_1.getSpriteUv(nextDefinition.index, PartUtils_1.PART_OFFSET_INDEX[nextDefinition.type], PartUtils_1.PART_SIZE_WIDTH[nextDefinition.type], PartUtils_1.PART_SIZE_HEIGHT[nextDefinition.type]);
    }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const move_1 = __webpack_require__(16);
const rotate_1 = __webpack_require__(25);
const scale_1 = __webpack_require__(26);
const followpath_1 = __webpack_require__(27);
const keeprotating_1 = __webpack_require__(28);
const transfromSystem_1 = __webpack_require__(7);
const interpolation_1 = __webpack_require__(12);
const toggleComponent_1 = __webpack_require__(64);
const delay_1 = __webpack_require__(29);
const expire_1 = __webpack_require__(31);
const interval_1 = __webpack_require__(30);
const triggerSystem_1 = __webpack_require__(65);
const actionsSequenceSystem_1 = __webpack_require__(66);
exports.default = {
    TransformSystem: transfromSystem_1.TransformSystem,
    MoveTransformComponent: move_1.MoveTransformComponent,
    RotateTransformComponent: rotate_1.RotateTransformComponent,
    ScaleTransformComponent: scale_1.ScaleTransformComponent,
    FollowPathComponent: followpath_1.FollowPathComponent,
    KeepRotatingComponent: keeprotating_1.KeepRotatingComponent,
    Interpolate: interpolation_1.Interpolate,
    InterpolationType: interpolation_1.InterpolationType,
    ToggleComponent: toggleComponent_1.ToggleComponent,
    ToggleState: toggleComponent_1.ToggleState,
    Delay: delay_1.Delay,
    ExpireIn: expire_1.ExpireIn,
    Interval: interval_1.Interval,
    TriggerComponent: triggerSystem_1.TriggerComponent,
    TriggerSystem: triggerSystem_1.TriggerSystem,
    TriggerSphereShape: triggerSystem_1.TriggerSphereShape,
    TriggerBoxShape: triggerSystem_1.TriggerBoxShape,
    ActionsSequenceSystem: actionsSequenceSystem_1.ActionsSequenceSystem
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleComponent = exports.ToggleState = void 0;
var ToggleState;
(function (ToggleState) {
    ToggleState[ToggleState["Off"] = 0] = "Off";
    ToggleState[ToggleState["On"] = 1] = "On";
})(ToggleState = exports.ToggleState || (exports.ToggleState = {}));
let ToggleComponent = class ToggleComponent {
    constructor(startingState = ToggleState.On, onValueChangedCallback) {
        this.enabled = true;
        this.state = ToggleState.Off;
        this.set(startingState);
        if (onValueChangedCallback)
            this.setCallback(onValueChangedCallback);
    }
    set(state) {
        this.state = state;
        if (this.onValueChangedCallback)
            this.onValueChangedCallback(state);
    }
    toggle() {
        if (this.enabled) {
            this.set(1 - this.state);
        }
    }
    isOn() {
        return this.state == ToggleState.On;
    }
    setCallback(onValueChangedCallback) {
        this.onValueChangedCallback = onValueChangedCallback;
    }
};
ToggleComponent = __decorate([
    Component('toggle')
], ToggleComponent);
exports.ToggleComponent = ToggleComponent;
exports.default = {
    ToggleComponent,
    ToggleState
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TriggerSphereShape = exports.TriggerBoxShape = exports.TriggerComponent = exports.TriggerSystem = void 0;
class TriggerSystem {
    constructor() {
        this._triggers = {};
        TriggerSystem._instance = this;
        this._cameraTriggerWrapper = new CameraTrigger(new TriggerBoxShape(new Vector3(0.5, 1.8, 0.5), new Vector3(0, 0.91, 0)));
    }
    static get instance() {
        return this.createAndAddToEngine();
    }
    static createAndAddToEngine() {
        if (this._instance == null) {
            this._instance = new TriggerSystem();
            engine.addSystem(this._instance);
        }
        return this._instance;
    }
    setCameraTriggerShape(shape) {
        this._cameraTriggerWrapper.setShape(shape);
    }
    update() {
        let entitiesWithTriggers = engine.getComponentGroup(TriggerComponent)
            .entities;
        entitiesWithTriggers.forEach(entity => {
            if (this.shouldWrapTriggerEntity(entity)) {
                this.wrapTriggerEntity(entity);
            }
        });
        for (const key in this._triggers) {
            if (this._triggers.hasOwnProperty(key)) {
                let wrapper = this._triggers[key];
                if (wrapper.isDebugging()) {
                    wrapper.updateDebugEntity();
                }
                if (!wrapper.isInEngine()) {
                    if (wrapper.isDebugging()) {
                        wrapper.removeDebugEntity();
                    }
                    TriggerSystem.removeTriggerFromSystem(wrapper);
                    delete this._triggers[key];
                }
                else if (wrapper.trigger != null && wrapper.trigger.enabled) {
                    if (!wrapper.wasEnabled) {
                        if (wrapper.isDebugging()) {
                            wrapper.addDebugEntity();
                        }
                    }
                    wrapper.wasEnabled = true;
                    if (wrapper.trigger.onCameraEnter || wrapper.trigger.onCameraExit) {
                        this.checkCollisionAgainstCamera(wrapper);
                    }
                    if (wrapper.trigger.onTriggerEnter || wrapper.trigger.onTriggerExit) {
                        this.checkCollisionAgainstOtherTriggers(wrapper);
                    }
                }
                else if (wrapper.wasEnabled) {
                    wrapper.wasEnabled = false;
                    if (wrapper.isDebugging()) {
                        wrapper.removeDebugEntity();
                    }
                    TriggerSystem.removeTriggerFromSystem(wrapper);
                }
            }
        }
    }
    shouldWrapTriggerEntity(entity) {
        return (this._triggers[entity.uuid] == undefined ||
            this._triggers[entity.uuid] == null);
    }
    wrapTriggerEntity(entity) {
        this._triggers[entity.uuid] = new TriggerWrapper(entity);
    }
    static removeTriggerFromSystem(wrapper) {
        let activeCollisions = wrapper.getActiveCollisions();
        for (let i = 0; i < activeCollisions.length; i++) {
            if (activeCollisions[i].trigger.onTriggerExit && wrapper.entity)
                activeCollisions[i].trigger.onTriggerExit(wrapper.entity);
            activeCollisions[i].disengageActiveCollision(wrapper);
            wrapper.disengageActiveCollision(activeCollisions[i]);
        }
    }
    static disengageCollision(t1, t2) {
        t1.disengageActiveCollision(t2);
        t2.disengageActiveCollision(t1);
        if (t1.trigger.onTriggerExit && t2.entity)
            t1.trigger.onTriggerExit(t2.entity);
        if (t2.trigger.onTriggerExit && t1.entity)
            t2.trigger.onTriggerExit(t1.entity);
    }
    static engageCollision(t1, t2) {
        t1.engageCollision(t2);
        t2.engageCollision(t1);
        if (t1.trigger.onTriggerEnter && t2.entity)
            t1.trigger.onTriggerEnter(t2.entity);
        if (t2.trigger.onTriggerEnter && t1.entity)
            t2.trigger.onTriggerEnter(t1.entity);
    }
    checkCollisionAgainstCamera(wrapper) {
        let wereColliding = wrapper.hasActiveCollision(this._cameraTriggerWrapper);
        let areColliding = TriggerSystem.areColliding(wrapper, this._cameraTriggerWrapper);
        if (wereColliding && !areColliding) {
            wrapper.disengageActiveCollision(this._cameraTriggerWrapper);
            if (wrapper.trigger.onCameraExit)
                wrapper.trigger.onCameraExit();
        }
        else if (!wereColliding && areColliding) {
            wrapper.engageCollision(this._cameraTriggerWrapper);
            if (wrapper.trigger.onCameraEnter)
                wrapper.trigger.onCameraEnter();
        }
    }
    checkCollisionAgainstOtherTriggers(wrapper) {
        for (const key in this._triggers) {
            if (this._triggers.hasOwnProperty(key)) {
                if (key != wrapper.uuid && this._triggers[key].trigger.enabled) {
                    if (TriggerSystem.canTriggersCollide(wrapper, this._triggers[key])) {
                        let wereColliding = wrapper.hasActiveCollision(this._triggers[key]);
                        let areColliding = TriggerSystem.areColliding(wrapper, this._triggers[key]);
                        if (wereColliding && !areColliding)
                            TriggerSystem.disengageCollision(wrapper, this._triggers[key]);
                        else if (!wereColliding && areColliding)
                            TriggerSystem.engageCollision(wrapper, this._triggers[key]);
                    }
                }
            }
        }
    }
    static canTriggersCollide(t1, t2) {
        if (t1.trigger.triggeredByLayer == 0)
            return true;
        return (t2.trigger.layer & t1.trigger.triggeredByLayer) != 0;
    }
    static areColliding(t1, t2) {
        if (t1.getShape() instanceof TriggerBoxShape &&
            t2.getShape() instanceof TriggerBoxShape) {
            return TriggerSystem.areCollidingAABB(t1.getGlobalPosition(), t1.getShape(), t2.getGlobalPosition(), t2.getShape());
        }
        else if (t1.getShape() instanceof TriggerSphereShape &&
            t2.getShape() instanceof TriggerSphereShape) {
            return TriggerSystem.areCollidingSphere(t1.getGlobalPosition(), t1.getShape(), t2.getGlobalPosition(), t2.getShape());
        }
        else if (t1.getShape() instanceof TriggerBoxShape &&
            t2.getShape() instanceof TriggerSphereShape) {
            return TriggerSystem.areCollidingAABBSphere(t1.getGlobalPosition(), t1.getShape(), t2.getGlobalPosition(), t2.getShape());
        }
        else if (t1.getShape() instanceof TriggerSphereShape &&
            t2.getShape() instanceof TriggerBoxShape) {
            return TriggerSystem.areCollidingAABBSphere(t2.getGlobalPosition(), t2.getShape(), t1.getGlobalPosition(), t1.getShape());
        }
        return false;
    }
    static areCollidingAABB(t1GlobalPosition, t1Shape, t2GlobalPosition, t2Shape) {
        let t1 = TriggerSystem.getBoxShapeValues(t1GlobalPosition, t1Shape);
        let t2 = TriggerSystem.getBoxShapeValues(t2GlobalPosition, t2Shape);
        return (t1.min.x <= t2.max.x &&
            t1.max.x >= t2.min.x &&
            t1.min.y <= t2.max.y && t1.max.y >= t2.min.y &&
            t1.min.z <= t2.max.z && t1.max.z >= t2.min.z);
    }
    static areCollidingSphere(t1GlobalPosition, t1Shape, t2GlobalPosition, t2Shape) {
        let sqDist = Vector3.DistanceSquared(t1GlobalPosition.add(t1Shape.position), t2GlobalPosition.add(t2Shape.position));
        return (sqDist < t1Shape.radius * t1Shape.radius + t2Shape.radius * t2Shape.radius);
    }
    static areCollidingAABBSphere(t1GlobalPosition, t1Shape, t2GlobalPosition, t2Shape) {
        let box = TriggerSystem.getBoxShapeValues(t1GlobalPosition, t1Shape);
        let sphere = {
            center: t2GlobalPosition.add(t2Shape.position),
            radius: t2Shape.radius
        };
        let dmin = 0;
        if (sphere.center.x < box.min.x)
            dmin += (box.min.x - sphere.center.x) * (box.min.x - sphere.center.x);
        if (sphere.center.x > box.max.x)
            dmin += (sphere.center.x - box.max.x) * (sphere.center.x - box.max.x);
        if (sphere.center.y < box.min.y)
            dmin += (box.min.y - sphere.center.y) * (box.min.y - sphere.center.y);
        if (sphere.center.y > box.max.y)
            dmin += (sphere.center.y - box.max.y) * (sphere.center.y - box.max.y);
        if (sphere.center.z < box.min.z)
            dmin += (box.min.z - sphere.center.z) * (box.min.z - sphere.center.z);
        if (sphere.center.z > box.max.z)
            dmin += (sphere.center.z - box.max.z) * (sphere.center.z - box.max.z);
        return dmin < sphere.radius * sphere.radius;
    }
    static getBoxShapeValues(entityGlobalPosition, shape) {
        let center = entityGlobalPosition.add(shape.position);
        return {
            center: center,
            min: center.subtract(shape.size.scale(0.5)),
            max: center.add(shape.size.scale(0.5))
        };
    }
}
exports.TriggerSystem = TriggerSystem;
TriggerSystem._instance = null;
class TriggerWrapper {
    constructor(entity) {
        this.wasEnabled = true;
        this._uuid = '';
        this._collidingWith = {};
        this._isDebug = false;
        this._debugEntity = null;
        this._entity = entity;
        if (entity) {
            this._trigger = entity.getComponent(TriggerComponent);
            this._uuid = entity.uuid;
            this._isDebug = this._trigger.debugEnabled;
            if (this._isDebug) {
                this.addDebugEntity();
            }
        }
    }
    get entity() {
        return this._entity;
    }
    get trigger() {
        return this._trigger;
    }
    get uuid() {
        return this._uuid;
    }
    getGlobalPosition() {
        if (this._entity)
            return TriggerWrapper.getEntityWorldPosition(this._entity);
        return Vector3.Zero();
    }
    getShape() {
        return this._trigger.shape;
    }
    isInEngine() {
        return this._entity != null && this._entity.isAddedToEngine();
    }
    getActiveCollisions() {
        let ret = [];
        for (const key in this._collidingWith) {
            if (this._collidingWith.hasOwnProperty(key)) {
                ret.push(this._collidingWith[key]);
            }
        }
        return ret;
    }
    hasActiveCollision(other) {
        return (this._collidingWith[other.uuid] != undefined &&
            this._collidingWith[other.uuid] != null);
    }
    disengageActiveCollision(other) {
        delete this._collidingWith[other.uuid];
    }
    engageCollision(other) {
        this._collidingWith[other.uuid] = other;
    }
    isDebugging() {
        return this._isDebug;
    }
    addDebugEntity() {
        if (!TriggerWrapper._debugMaterial) {
            TriggerWrapper._debugMaterial = new Material();
            TriggerWrapper._debugMaterial.alphaTest = 0.5;
        }
        if (this._debugEntity == null) {
            this._debugEntity = new Entity();
            const transform = new Transform();
            this._debugEntity.addComponent(transform);
            this._debugEntity.addComponent(TriggerWrapper._debugMaterial);
            if (this.getShape() instanceof TriggerBoxShape) {
                const shape = new BoxShape();
                shape.withCollisions = false;
                this._debugEntity.addComponent(shape);
                transform.scale = this.getShape().size;
            }
            if (this.getShape() instanceof TriggerSphereShape) {
                const shape = new SphereShape();
                shape.withCollisions = false;
                this._debugEntity.addComponent(shape);
                let rad = this.getShape().radius;
                transform.scale = new Vector3(rad, rad, rad);
            }
        }
        engine.addEntity(this._debugEntity);
    }
    removeDebugEntity() {
        if (this._debugEntity != null)
            engine.removeEntity(this._debugEntity);
    }
    updateDebugEntity() {
        if (this._debugEntity) {
            this._debugEntity.getComponent(Transform).position = this.getGlobalPosition().add(this.getShape().position);
        }
    }
    static getEntityWorldPosition(entity) {
        let entityPosition = entity.hasComponent(Transform)
            ? entity.getComponent(Transform).position
            : Vector3.Zero();
        let parentEntity = entity.getParent();
        if (parentEntity != null) {
            let parentRotation = parentEntity.hasComponent(Transform)
                ? parentEntity.getComponent(Transform).rotation
                : Quaternion.Identity;
            return this.getEntityWorldPosition(parentEntity).add(entityPosition.rotate(parentRotation));
        }
        return entityPosition;
    }
}
TriggerWrapper._debugMaterial = null;
class CameraTrigger extends TriggerWrapper {
    constructor(shape) {
        super();
        this._shape = shape;
        this._uuid = 'cameraTrigger';
    }
    getGlobalPosition() {
        return Camera.instance.position;
    }
    getShape() {
        return this._shape;
    }
    setShape(shape) {
        this._shape = shape;
    }
    isInEngine() {
        return false;
    }
    hasActiveCollision(other) {
        return false;
    }
    disengageActiveCollision(other) { }
    engageCollision(other) { }
    isDebugging() {
        return false;
    }
}
let TriggerComponent = class TriggerComponent {
    constructor(shape, layer = 0, triggeredByLayer = 0, onTriggerEnter, onTriggerExit, onCameraEnter, onCameraExit, enableDebug = false) {
        this.enabled = true;
        this.layer = 0;
        this.triggeredByLayer = 0;
        TriggerSystem.createAndAddToEngine();
        this.shape = shape;
        this.layer = layer;
        this.triggeredByLayer = triggeredByLayer;
        this.onTriggerEnter = onTriggerEnter;
        this.onTriggerExit = onTriggerExit;
        this.onCameraEnter = onCameraEnter;
        this.onCameraExit = onCameraExit;
        this._debugEnabled = enableDebug;
    }
    get debugEnabled() {
        return this._debugEnabled;
    }
};
TriggerComponent = __decorate([
    Component('triggerComponent')
], TriggerComponent);
exports.TriggerComponent = TriggerComponent;
class TriggerBoxShape {
    constructor(size, position) {
        this.size = size;
        this.position = position;
    }
}
exports.TriggerBoxShape = TriggerBoxShape;
class TriggerSphereShape {
    constructor(radius, position) {
        this.radius = radius;
        this.position = position;
    }
}
exports.TriggerSphereShape = TriggerSphereShape;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsSequenceSystem = void 0;
class ActionsSequenceSystem {
    constructor(sequenceBuilt) {
        this.beginSequenceNode = null;
        this.currentSequenceNode = null;
        this.running = false;
        this.started = false;
        if (sequenceBuilt) {
            this.startSequence(sequenceBuilt);
        }
    }
    startSequence(sequenceBuilt) {
        this.beginSequenceNode = sequenceBuilt.beginSequenceNode;
        this.currentSequenceNode = this.beginSequenceNode;
        this.running = true;
        this.started = false;
    }
    setOnFinishCallback(onFinishCallback) {
        this.onFinishCallback = onFinishCallback;
    }
    isRunning() {
        return this.running;
    }
    stop() {
        this.running = false;
    }
    resume() {
        if (this.beginSequenceNode != null) {
            this.running = true;
        }
    }
    reset() {
        this.currentSequenceNode = this.beginSequenceNode;
        this.running = true;
        this.started = false;
    }
    getRunningAction() {
        let currentNode = this.currentSequenceNode;
        if (this.currentSequenceNode instanceof SubSequenceNode) {
            do {
                currentNode = currentNode.currentInnerSequence;
            } while (currentNode instanceof SubSequenceNode);
        }
        return currentNode.action;
    }
    update(dt) {
        if (this.running) {
            if (!this.started) {
                ;
                this.currentSequenceNode.onStart();
                this.started = true;
            }
            else {
                if (!this.currentSequenceNode.hasFinish()) {
                    ;
                    this.currentSequenceNode.update(dt);
                }
                else {
                    ;
                    this.currentSequenceNode.onFinish();
                    this.currentSequenceNode = this
                        .currentSequenceNode.next;
                    if (this.currentSequenceNode) {
                        this.currentSequenceNode.onStart();
                    }
                    else {
                        this.running = false;
                        if (this.onFinishCallback)
                            this.onFinishCallback();
                    }
                }
            }
        }
    }
}
exports.ActionsSequenceSystem = ActionsSequenceSystem;
(function (ActionsSequenceSystem) {
    class SequenceBuilder {
        constructor() {
            this.currentSequenceNode = null;
            this.beginSequenceNode = null;
            this.whileNodeStack = [];
        }
        then(action) {
            if (this.currentSequenceNode == null) {
                this.currentSequenceNode = new SequenceNode();
                this.currentSequenceNode.action = action;
                this.beginSequenceNode = this.currentSequenceNode;
            }
            else {
                let next = new SequenceNode();
                next.action = action;
                this.currentSequenceNode = this.currentSequenceNode.then(next);
            }
            return this;
        }
        if(condition) {
            let ifSeq = new IfSequenceNode(condition);
            if (this.currentSequenceNode == null) {
                this.currentSequenceNode = ifSeq;
                this.beginSequenceNode = ifSeq;
            }
            else {
                this.currentSequenceNode = this.currentSequenceNode.then(ifSeq);
            }
            return this;
        }
        else() {
            let seq = this.currentSequenceNode.getSequence();
            if (seq instanceof IfSequenceNode) {
                seq.closed = true;
                let elseSeq = new ElseSequenceNode(seq);
                this.currentSequenceNode = this
                    .currentSequenceNode.then(elseSeq);
            }
            else {
                throw new Error('IF statement is needed to be called before ELSE statement.');
            }
            return this;
        }
        endIf() {
            let seq = this.currentSequenceNode.getSequence();
            if (seq instanceof IfSequenceNode || seq instanceof ElseSequenceNode) {
                seq.closed = true;
            }
            else {
                throw new Error('IF statement is needed to be called before ENDIF statement.');
            }
            return this;
        }
        while(condition) {
            let whileSeq = new WhileSequenceNode(condition);
            if (this.currentSequenceNode == null) {
                this.currentSequenceNode = whileSeq;
                this.beginSequenceNode = whileSeq;
            }
            else {
                this.currentSequenceNode = this.currentSequenceNode.then(whileSeq);
            }
            this.whileNodeStack.push(whileSeq);
            return this;
        }
        endWhile() {
            let seq = this.currentSequenceNode.getSequence();
            if (seq instanceof WhileSequenceNode) {
                seq.closed = true;
                if (this.whileNodeStack.length > 0) {
                    this.whileNodeStack.splice(this.whileNodeStack.length - 1, 1);
                }
            }
            else {
                throw new Error('WHILE statement is needed to be called before ENDWHILE statement.');
            }
            return this;
        }
        breakWhile() {
            if (this.whileNodeStack.length > 0) {
                this.currentSequenceNode = this
                    .currentSequenceNode.then(new BreakWhileSequenceNode(this.whileNodeStack[this.whileNodeStack.length - 1]));
            }
            else {
                throw new Error('WHILE statement is needed to be called before BREAKWHILE statement.');
            }
            return this;
        }
    }
    ActionsSequenceSystem.SequenceBuilder = SequenceBuilder;
})(ActionsSequenceSystem = exports.ActionsSequenceSystem || (exports.ActionsSequenceSystem = {}));
class SequenceNode {
    constructor() {
        this.action = null;
        this.next = null;
    }
    then(next) {
        this.next = next;
        return next;
    }
    onStart() {
        if (this.action)
            this.action.onStart();
    }
    update(dt) {
        if (this.action)
            this.action.update(dt);
    }
    onFinish() {
        if (this.action)
            this.action.onFinish();
    }
    hasFinish() {
        if (this.action)
            return this.action.hasFinished;
        else
            return true;
    }
    getSequence() {
        return this;
    }
}
class SubSequenceNode extends SequenceNode {
    constructor() {
        super(...arguments);
        this.currentInnerSequence = null;
        this.startingInnerSequence = null;
        this.closed = false;
    }
    then(next) {
        if (this.currentInnerSequence == null) {
            this.currentInnerSequence = next;
            this.startingInnerSequence = next;
        }
        else {
            if (this.closed) {
                this.next = next;
                return next;
            }
            else {
                this.currentInnerSequence = this.currentInnerSequence.then(next);
            }
        }
        return this;
    }
    onStart() {
        this.currentInnerSequence = this.startingInnerSequence;
        if (this.currentInnerSequence)
            this.currentInnerSequence.onStart();
    }
    update(dt) {
        if (this.currentInnerSequence) {
            if (!this.currentInnerSequence.hasFinish()) {
                this.currentInnerSequence.update(dt);
            }
            else {
                this.currentInnerSequence.onFinish();
                this.currentInnerSequence = this.currentInnerSequence.next;
                if (this.currentInnerSequence)
                    this.currentInnerSequence.onStart();
            }
        }
    }
    onFinish() {
        if (this.currentInnerSequence)
            this.currentInnerSequence.onFinish();
    }
    hasFinish() {
        return this.currentInnerSequence == null;
    }
    getSequence() {
        if (this.currentInnerSequence) {
            let innerSeq = this.currentInnerSequence.getSequence();
            if (innerSeq instanceof SubSequenceNode) {
                if (!innerSeq.closed) {
                    return innerSeq;
                }
            }
        }
        return this;
    }
}
class IfSequenceNode extends SubSequenceNode {
    constructor(condition) {
        super();
        this.result = false;
        this.condition = condition;
    }
    onStart() {
        this.result = this.condition();
        if (this.result)
            super.onStart();
        else
            this.currentInnerSequence = null;
    }
}
class ElseSequenceNode extends SubSequenceNode {
    constructor(ifSequence) {
        super();
        this.ifSequence = null;
        this.ifSequence = ifSequence;
    }
    onStart() {
        if (this.ifSequence && !this.ifSequence.result)
            super.onStart();
        else
            this.currentInnerSequence = null;
    }
}
class WhileSequenceNode extends SubSequenceNode {
    constructor(condition) {
        super();
        this.breakWhile = false;
        this.condition = condition;
    }
    onStart() {
        this.breakWhile = false;
        if (this.condition())
            super.onStart();
        else
            this.currentInnerSequence = null;
    }
    update(dt) {
        if (this.currentInnerSequence) {
            if (!this.currentInnerSequence.hasFinish()) {
                this.currentInnerSequence.update(dt);
            }
            else {
                this.currentInnerSequence.onFinish();
                this.currentInnerSequence = this.currentInnerSequence.next;
                if (this.currentInnerSequence == null)
                    this.currentInnerSequence = this.startingInnerSequence;
                if (this.currentInnerSequence)
                    this.currentInnerSequence.onStart();
            }
        }
    }
    hasFinish() {
        return this.breakWhile || !this.condition();
    }
}
class BreakWhileSequenceNode extends SequenceNode {
    constructor(whileNode) {
        super();
        this.whileNode = whileNode;
    }
    onStart() {
        this.whileNode.breakWhile = true;
    }
}


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScreen = void 0;
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
const Cross_1 = __webpack_require__(22);
const TIME_MOVE = 0.3;
let Step = class Step {
    constructor(index, isObstacle) {
        this.index = index;
        this.isObstacle = isObstacle;
    }
};
Step = __decorate([
    Component("ObstacleGame-step")
], Step);
let Player = class Player {
};
Player = __decorate([
    Component("ObstacleGame-player")
], Player);
exports.createScreen = (root, { player, track }) => {
    let stepText = new TextShape("E");
    stepText.withCollisions = false;
    stepText.fontSize = 4;
    stepText.font = new Font(Fonts.SanFrancisco_Heavy);
    stepText.shadowOffsetX = 1;
    stepText.shadowOffsetY = 1;
    stepText.shadowColor = Color3.FromHexString("#000000");
    const callbacks = {
        onMove: null,
        onFinish: null
    };
    const state = {
        moving: false,
        jumping: false,
        moveCount: 0,
        currentStep: 0,
        jumps: 0
    };
    let screen;
    screen = new Entity();
    screen.setParent(root);
    const cross = Cross_1.createCross(screen, {
        position: new Vector3(1.5, 3, -0.001),
        scale: new Vector3(1, 1, 1)
    });
    cross.hide();
    screen.addComponent(new Transform({ position: new Vector3(player === 2 ? 0 : -3, 0, 0) }));
    const background = new Entity();
    const backShape = new PlaneShape();
    backShape.withCollisions = false;
    backShape.uvs = SpriteAnimation_1.getSpriteUv(2, 11, 96, 128);
    background.addComponent(SpriteMaterial_1.spriteMaterial);
    background.addComponent(backShape);
    background.addComponent(new Transform({
        position: new Vector3(1.5, 2, 0),
        scale: new Vector3(3, 4, 1)
    }));
    background.setParent(screen);
    const spriteOffset = 32 * 64 + 12;
    const playerS1 = new SpriteAnimation_1.SpriteAnimationSystem(screen, {
        frames: [
            { uvs: SpriteAnimation_1.getSpriteUv(8, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(1, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(2, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(3, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(4, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(4, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(5, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(6, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(7, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(8, spriteOffset, 16, 16) },
            { uvs: SpriteAnimation_1.getSpriteUv(8, spriteOffset + (1024 / 16), 16, 16) }
        ],
        scale: new Vector3(0.5, 0.5, 1),
        position: new Vector3(0.3 * 3 + 0.15, 1.9, -0.002),
        time: 0.1
    });
    playerS1.init();
    const steps = [];
    track.forEach((isObstacle, index) => {
        const step = new Entity();
        step.addComponent(new Step(index, isObstacle));
        const stepShape = new PlaneShape();
        stepShape.withCollisions = false;
        const stepMaterial = new Material();
        stepMaterial.transparencyMode = TransparencyMode.ALPHA_BLEND;
        stepMaterial.albedoColor = isObstacle ? new Color4(1, 0, 0, 0) : (player === 1 ? new Color4(0, 0, 1, 0) : new Color4(1, 1, 0, 0));
        stepMaterial.emissiveColor = isObstacle ? new Color3(1, 0, 0) : (player === 1 ? Color3.FromHexString('#0000ff') : Color3.FromHexString('#ffff00'));
        stepMaterial.emissiveIntensity = 3;
        if (index === track.length - 1) {
            stepMaterial.albedoColor = new Color4(0, 1, 0, 0);
            stepMaterial.emissiveColor = new Color3(0, 1, 0);
        }
        step.addComponent(stepShape);
        step.addComponent(stepMaterial);
        if (isObstacle) {
            step.addComponent(new Transform({ position: new Vector3(index * 0.3 + 0.15 - 0.1, 1.75, -0.001), scale: new Vector3(0.1, 0.1, 1) }));
        }
        else {
            step.addComponent(new Transform({ position: new Vector3(index * 0.3 + 0.15, 1.95, -0.001), scale: new Vector3(0.02, 0.02, 1) }));
        }
        steps.push(step);
        step.setParent(screen);
    });
    const stepLabel = new Entity();
    stepLabel.addComponent(stepText);
    stepLabel.addComponent(new Transform({ position: new Vector3(1, 1.3, -0.002) }));
    stepLabel.setParent(screen);
    const getJumpHeight = (count) => {
        if (count > TIME_MOVE) {
            return Math.max(0, 0.4 - state.moveCount / TIME_MOVE * 0.4 / 2);
        }
        else {
            return Math.min(0.4, state.moveCount / TIME_MOVE * 0.4);
        }
    };
    const hideAll = () => {
        Object.values(steps).forEach((step, index) => {
            step.visible = false;
        });
    };
    const getNextStepValue = () => {
        return track[state.currentStep + 1 + 3];
    };
    const moveScreen = (jumping) => {
        state.moving = true;
        state.jumping = !!jumping;
        if (!playerS1.state.playing) {
            if (jumping) {
                playerS1.play([9, 0, 1], { loop: false, time: 0.2 });
            }
            else {
                if (state.currentStep % 2 === 0) {
                    playerS1.play([1, 2, 3], { loop: false, time: 0.1 });
                }
                else {
                    playerS1.play([5, 6, 7], { loop: false, time: 0.1 });
                }
            }
        }
    };
    const getScreenState = () => state;
    const onMove = (fn) => {
        callbacks.onMove = fn;
        return () => callbacks.onMove = null;
    };
    const onFinishScreen = (fn) => {
        callbacks.onFinish = fn;
        return () => callbacks.onFinish = null;
    };
    const handleVisibility = () => {
        steps.forEach((step, index) => {
            const stepTransform = step.getComponent(Transform);
            const stepShape = step.getComponent(PlaneShape);
            const stepMaterial = step.getComponent(Material);
            const isObstacle = step.getComponent(Step).isObstacle;
            if (stepTransform.position.x < 0.2 || stepTransform.position.x >= 2.999) {
                stepMaterial.albedoColor = isObstacle ? new Color4(1, 0, 0, 0) : (player === 1 ? new Color4(0, 0, 1, 0) : new Color4(1, 1, 0, 0));
            }
            else {
                stepMaterial.albedoColor = isObstacle ? new Color4(1, 0, 0, 1) : (player === 1 ? new Color4(0, 0, 1, 1) : new Color4(1, 1, 0, 1));
                if (index === track.length - 1) {
                    stepMaterial.albedoColor = new Color4(0, 1, 0, 1);
                    stepMaterial.emissiveColor = new Color3(0, 1, 0);
                }
            }
        });
        if (track[state.currentStep + 4]) {
            stepText.value = "CLICK";
        }
        else {
            if ((state.currentStep) % 2 === 0) {
                stepText.value = "E";
            }
            else {
                stepText.value = "F";
            }
        }
    };
    const updateScreen = (dt) => {
        if (state.moving) {
            state.moveCount += dt;
            steps.forEach((step, index) => {
                const stepTransform = step.getComponent(Transform);
                const stepPosition = stepTransform.position;
                const basePos = index * 0.3 + 0.15;
                const byStepPos = state.currentStep * 0.3;
                const byDt = state.moveCount / TIME_MOVE * 0.3;
                stepPosition.set(basePos - byStepPos - byDt, stepPosition.y, stepPosition.z);
            });
            if (state.jumping) {
                const playerPosition = playerS1.globalOptions.position;
                const jumpY = getJumpHeight(state.moveCount);
                playerPosition.set(playerPosition.x, jumpY + 1.9, playerPosition.z);
            }
        }
        if (state.moveCount >= (state.jumping ? TIME_MOVE * 2 : TIME_MOVE)) {
            if (state.jumping)
                state.jumps++;
            state.currentStep += (state.jumping ? 2 : 1);
            state.moving = state.jumping = false;
            state.moveCount = 0;
            callbacks.onMove && callbacks.onMove(state.currentStep);
            if (callbacks.onFinish && state.currentStep + 3 === track.length - 1)
                callbacks.onFinish();
            handleVisibility();
        }
    };
    const destroy = () => {
        screen.setParent(null);
        engine.removeEntity(screen);
        callbacks.onFinish = null;
        callbacks.onMove = null;
    };
    return {
        getNextStepValue,
        moveScreen,
        getScreenState,
        onMove,
        onFinishScreen,
        handleVisibility,
        updateScreen,
        destroy,
        getTotalSteps: () => track.length,
        showCross: () => cross.show(),
        hideCross: () => cross.hide()
    };
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SammichGame = void 0;
const Screen_1 = __webpack_require__(69);
const Sound_1 = __webpack_require__(2);
const gameUtils_1 = __webpack_require__(5);
const ROUNDS = 5;
class SammichGame {
    constructor(root, { currentPlayer, seed, level, gameIndex }) {
        this.gameSetup = {
            level: 1,
            currentPlayer: 0,
            seed: null
        };
        this.callbacks = {
            onFinish: null,
            onShareState: null,
            onFinishRound: null
        };
        this.state = {
            started: false,
            initialized: false,
            blocked: false,
            startTime: Number.MAX_VALUE,
            roundStartTime: Number.MAX_VALUE,
            lastRoundStartTime: Number.MAX_VALUE,
            waitingRound: false,
            round: 0,
            score: 0,
            score1: 0,
            score2: 0
        };
        this.scene = new Entity();
        this.scene.addComponent(new Transform({
            position: new Vector3(0, 2, -0.001)
        }));
        this.ui = gameUtils_1.createUI(this.scene, { position: new Vector3(0, -2, 0) });
        this.root = root;
        this.gameSetup = { currentPlayer, seed, level, gameIndex };
        this.screen1 = Screen_1.createScreen(this.scene, { player: 1, seed, owner: currentPlayer === 1 });
        this.screen2 = Screen_1.createScreen(this.scene, { player: 2, seed, owner: currentPlayer === 2 });
        if (currentPlayer)
            this[`screen${currentPlayer}`].onStateChange((roundState) => {
                console.log('global score', this.state.score);
                console.log("onStateChange", roundState.score, roundState);
                this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: (roundState.score + this.state.score) });
                this.callbacks.onShareState({
                    player: currentPlayer,
                    state: roundState,
                    score: (roundState.score + this.state.score)
                });
            });
        engine.addSystem(this);
        this.roundResult1 = gameUtils_1.createRoundResult(this.scene, { player: 1 });
        this.roundResult2 = gameUtils_1.createRoundResult(this.scene, { player: 2 });
        const position1 = this.roundResult1.getTransform().position;
        const position2 = this.roundResult2.getTransform().position;
        position1.set(position1.x, position1.y - 2, position1.z);
        position2.set(position2.x, position2.y - 2, position2.z);
        this.roundResult1.hide();
        this.roundResult2.hide();
    }
    startRound() {
        this.state.round++;
        this.state.lastRoundStartTime = this.state.roundStartTime;
        this.state.roundStartTime = Number.MAX_VALUE;
        this.state.waitingRound = false;
        if (this.gameSetup.currentPlayer) {
            this[`screen${this.gameSetup.currentPlayer}`].start({ level: this.state.round });
        }
    }
    setRoundStartTime(roundStartTime) {
        this.state.roundStartTime = roundStartTime;
    }
    setStartTime(startTime) {
        this.state.startTime = startTime;
    }
    block() {
        this.state.blocked = true;
    }
    init() {
        this.scene.setParent(this.root);
        this.state.initialized = true;
        Sound_1.playLoop("music2", { volume: 0.5 });
    }
    start() {
        console.log("sammichGame start");
        this.state.started = true;
        this.state.startTime = Number.MAX_VALUE;
        this.state.roundStartTime = Number.MAX_VALUE;
        this.screen1.start({ level: this.state.round + 1 });
        this.screen2.start({ level: this.state.round + 1 });
        this.gameSetup.currentPlayer && this[`screen${this.gameSetup.currentPlayer}`].onComplete((score) => {
            if (score >= 6) {
                Sound_1.playOnce("wow");
            }
            else if (score >= 4) {
            }
            else {
            }
            this.state.score += score;
            this.state[`score${this.gameSetup.currentPlayer}`] = this.state.score;
            const globalCurrentPlayerScore = this.state[`score${this.gameSetup.currentPlayer}`];
            this.ui.updateScore({ player: this.gameSetup.currentPlayer, score: globalCurrentPlayerScore });
            console.log("Compelted costume", JSON.stringify(this.state, null, '  '));
            setTimeout(() => {
                console.log("Compelted costume timeout", JSON.stringify(this.state, null, '  '));
                if ((this.state.round < ROUNDS - 1) || this.state.score1 === this.state.score2) {
                    this.callbacks.onFinishRound({
                        player: this.gameSetup.currentPlayer,
                        score: globalCurrentPlayerScore,
                        gameIndex: this.gameSetup.gameIndex,
                        roundIndex: this.state.round
                    });
                }
                else {
                    console.log("CALLING onFinish", this.state.round, this.state.score1, this.state.score2, this.state.score1 === this.state.score2);
                    Sound_1.stopSound("music2");
                    this.callbacks.onFinish({
                        isWinner: true,
                        time: -1 * globalCurrentPlayerScore,
                        score: globalCurrentPlayerScore,
                        gameIndex: this.gameSetup.gameIndex,
                        roundIndex: this.state.round
                    });
                }
            }, 1000);
        });
    }
    finish({ winner }) {
        const nonWinner = winner === 1 ? 2 : 1;
        this.roundResult1.show();
        this.roundResult2.show();
        this[`roundResult${winner}`].update(true);
        this[`roundResult${nonWinner}`].update(false);
    }
    finishRound({ winner }) {
        this.state.waitingRound = true;
        this.screen1.reset();
        this.screen2.reset();
    }
    destroy() {
        this.screen1.dispose();
        this.screen2.dispose();
        this.scene.setParent(null);
        engine.removeEntity(this.scene);
        engine.removeSystem(this);
    }
    shareState(sharedState) {
        const screenState = sharedState.state;
        const player = sharedState.player;
        console.log("shareState", sharedState.score, sharedState);
        this.ui.updateScore({ player, score: sharedState.score });
        this[`screen${player}`].setState(screenState);
        this.state[`score${player}`] = sharedState.score;
    }
    onShareState(fn) {
        this.callbacks.onShareState = fn;
        return () => this.callbacks.onShareState = null;
    }
    onFinish(fn) {
        this.callbacks.onFinish = fn;
        return () => this.callbacks.onFinish = null;
    }
    onFinishRound(fn) {
        this.callbacks.onFinishRound = fn;
        return () => this.callbacks.onFinishRound = null;
    }
    update(dt) {
        if (!this.state.initialized)
            return;
        if (!this.state.waitingRound && !this.state.started && Date.now() >= this.state.startTime) {
            this.start();
            return;
        }
        if (this.state.started && this.state.waitingRound && Date.now() >= this.state.roundStartTime) {
            this.startRound();
        }
        if (!this.state.waitingRound && this.state.started) {
            if (!this.getPlayerScreen(1).getScreenState().idle)
                this.getPlayerScreen(1).updateScreen(dt);
            if (!this.getPlayerScreen(2).getScreenState().idle)
                this.getPlayerScreen(2).updateScreen(dt);
        }
    }
    getPlayerScreen(player) {
        return this[`screen${player}`];
    }
}
exports.SammichGame = SammichGame;
SammichGame.id = 'Sammich';
SammichGame.instructions = `Move to sides with E and F\nto build the perfect sammich`;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createScreen = void 0;
const SpriteMaterial_1 = __webpack_require__(1);
const SpriteAnimation_1 = __webpack_require__(0);
const Sound_1 = __webpack_require__(2);
const seed_1 = __webpack_require__(3);
const INGREDIENTS = [1, 2, 3, 4, 6, 7, 8];
const createSprite = (root, { spriteIndex, position }) => {
    const sprite = new Entity();
    sprite.setParent(root);
    const baseShape = new PlaneShape();
    baseShape.withCollisions = false;
    sprite.addComponent(SpriteMaterial_1.spriteMaterial);
    sprite.addComponent(baseShape);
    const spriteTransform = new Transform({
        scale: new Vector3(0.5, 0.5, 0.5),
        position
    });
    sprite.addComponent(spriteTransform);
    baseShape.uvs = SpriteAnimation_1.getSpriteUv(spriteIndex, 32 * (1024 / 16), 16, 16);
    const state = {
        onBase: false,
        baseX: 0,
        currentRound: 1
    };
    return {
        setX: (x) => {
            spriteTransform.position.set(x, spriteTransform.position.y, spriteTransform.position.z);
        },
        setY: (y) => {
            spriteTransform.position.set(spriteTransform.position.x, y, spriteTransform.position.z);
        },
        getX: () => spriteTransform.position.x,
        getY: () => spriteTransform.position.y,
        isOnBase: () => state.onBase,
        getBaseX: () => state.baseX,
        setOnBase: (value, x) => {
            state.onBase = value;
            state.baseX = x;
        },
        dispose: () => {
            sprite.setParent(null);
            sprite.removeComponent(Transform);
            sprite.removeComponent(SpriteMaterial_1.spriteMaterial);
            sprite.removeComponent(PlaneShape);
            engine.removeEntity(sprite);
        }
    };
};
exports.createScreen = (root, { seed, player, owner }) => {
    const screen = new Entity();
    const state = {
        dtCount: 0,
        idle: true,
        level: 1,
        basePosition: 0,
        layers: [],
        score: 0
    };
    const randomizer = seed_1.seedGen.create(seed.toString());
    const backShape = new PlaneShape();
    backShape.withCollisions = false;
    backShape.uvs = SpriteAnimation_1.getSpriteUv(1, 11, 96, 128);
    screen.setParent(root);
    screen.addComponent(new Transform({ position: new Vector3(player === 1 ? -1.5 : 1.5, 0, -0.000),
    }));
    const background = new Entity();
    const backTransform = new Transform({
        scale: new Vector3(3, 4, 1)
    });
    background.addComponent(backShape);
    background.addComponent(SpriteMaterial_1.spriteMaterial);
    background.addComponent(backTransform);
    background.setParent(screen);
    const base = createSprite(screen, { spriteIndex: 9, position: new Vector3(0, -1.125, -0.002) });
    const DISPLACEMENT = 0.25;
    const setState = (obj) => {
        Object.assign(state, obj);
        base.setX(state.basePosition);
        state.layers.forEach((x, index) => {
            combination[index].setX(base.getX() + x);
            const spriteMinY = base.getY() + (index * LAYER_HEIGHT) + LAYER_OFFSET;
            combination[index].setY(spriteMinY);
        });
    };
    const updateState = (obj) => {
        Object.assign(state, obj);
        callbacks.onStateChange && callbacks.onStateChange(state);
    };
    const onStateChange = (fn) => {
        callbacks.onStateChange = fn;
        return () => callbacks.onStateChange = null;
    };
    const moveRight = () => {
        if (state.idle && !owner)
            return;
        const newX = base.getX() === +DISPLACEMENT ? +DISPLACEMENT : (base.getX() + DISPLACEMENT);
        base.setX(newX);
        combination.forEach(sprite => {
            if (sprite.isOnBase()) {
                sprite.setX(base.getX() - sprite.getBaseX());
            }
        });
        updateState({ basePosition: base.getX() });
    };
    const moveLeft = () => {
        if (state.idle && !owner)
            return;
        const newX = base.getX() === -DISPLACEMENT ? -DISPLACEMENT : (base.getX() - DISPLACEMENT);
        base.setX(newX);
        combination.forEach((sprite, index) => {
            if (sprite.isOnBase()) {
                sprite.setX(base.getX() - sprite.getBaseX());
            }
        });
        updateState({ basePosition: base.getX() });
    };
    if (owner) {
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, false, moveLeft);
        Input.instance.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, false, moveRight);
    }
    const LAYER_HEIGHT = 0.05;
    const LAYER_OFFSET = 0.1;
    const MAX_LEVEL_VEL = 7;
    const updateScreen = (dt) => {
        if (state.idle)
            return;
        const levelVelocityFactor = (Math.min(state.level, MAX_LEVEL_VEL) * 0.7 + 0.2);
        const initialSpriteY = 1.75;
        state.dtCount += dt;
        combination.forEach((sprite, index) => {
            const spriteInitialTime = index / levelVelocityFactor + 0.03 * index * levelVelocityFactor;
            if (state.dtCount >= spriteInitialTime) {
                const spriteMinY = base.getY() + (index * LAYER_HEIGHT) + LAYER_OFFSET;
                if (sprite.getY() <= spriteMinY) {
                    if (!owner)
                        return;
                    if (!sprite.isOnBase()) {
                        sprite.setOnBase(true, base.getX() - sprite.getX());
                        if (sprite.getBaseX() !== 0) {
                            Sound_1.playOnce("fail");
                        }
                        else {
                            Sound_1.playOnce("ok");
                            state.score++;
                        }
                        updateState({
                            score: state.score,
                            layers: [...state.layers, sprite.getX() - base.getX()]
                        });
                    }
                }
                else {
                    sprite.setY(Math.max(spriteMinY, initialSpriteY - ((state.dtCount - spriteInitialTime) * levelVelocityFactor)));
                }
            }
        });
        if (!owner)
            return;
        if (combination.every((sprite, index) => sprite.isOnBase())) {
            state.idle = true;
            let roundScore = 0;
            combination.forEach((sprite, index) => {
                if (sprite.getBaseX() === 0)
                    roundScore++;
            });
            callbacks.onComplete && callbacks.onComplete(roundScore);
            state.score = 0;
        }
    };
    let combination = [];
    const setCombination = () => {
        combination = Array(5).fill(null).map((c, index) => {
            const ran = randomizer.random();
            let posX = Math.floor((-1 + ran * 3)) * DISPLACEMENT;
            const spriteIndex = INGREDIENTS[Math.floor(ran * INGREDIENTS.length)];
            const position = new Vector3(posX, 1.75, -0.001 * index - 0.004);
            const sprite = createSprite(screen, {
                spriteIndex,
                position
            });
            return sprite;
        });
        const ran = randomizer.random();
        let posX = Math.floor((-1 + ran * 3)) * DISPLACEMENT;
        combination.push(createSprite(screen, {
            spriteIndex: 5,
            position: new Vector3(posX, 1.75, -0.001 * 5 - 0.004)
        }));
    };
    setCombination();
    const reset = () => {
        state.idle = true;
        state.dtCount = 0;
        state.layers = [];
        state.basePosition = 0;
        state.score = 0;
        combination.forEach((sprite, index) => {
            sprite.dispose();
        });
        setCombination();
    };
    const start = ({ level }) => {
        state.idle = false;
        state.level = level;
    };
    const callbacks = {
        onComplete: null,
        onStateChange: null
    };
    const onComplete = (fn) => {
        callbacks.onComplete = fn;
        return () => callbacks.onComplete = null;
    };
    const getScreenState = () => state;
    const dispose = () => {
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.PRIMARY, moveLeft);
        Input.instance.unsubscribe("BUTTON_DOWN", ActionButton.SECONDARY, moveRight);
    };
    return {
        getScreenState,
        start,
        updateScreen,
        onComplete,
        reset,
        setState,
        onStateChange,
        dispose
    };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createScreen = void 0;
const SpriteAnimation_1 = __webpack_require__(0);
const SpriteMaterial_1 = __webpack_require__(1);
const move_1 = __webpack_require__(16);
const seed_1 = __webpack_require__(3);
const Sound_1 = __webpack_require__(2);
const carPool_1 = __webpack_require__(71);
const PIXEL = 4 / 128;
const yOffset = -PIXEL * 36;
const KEY = {
    UP: ActionButton.POINTER,
    LEFT: ActionButton.PRIMARY,
    RIGHT: ActionButton.SECONDARY
};
const sammichPlaceholderPositions = [
    -1.5 + PIXEL * 12 + (PIXEL * 8) / 2,
    -1.5 + PIXEL * 28 + (PIXEL * 8) / 2,
    -1.5 + PIXEL * 44 + (PIXEL * 8) / 2,
    -1.5 + PIXEL * 60 + (PIXEL * 8) / 2,
    -1.5 + PIXEL * 76 + (PIXEL * 8) / 2,
];
const createSammich = (root, { x, index }) => {
    let taken = false;
    const callbacks = { onTake: null };
    const spriteEntity = SpriteAnimation_1.createSpriteEntity(root, {
        position: new Vector3(x, 2 - PIXEL * 15 + (PIXEL * 8) / 2, -0.001),
        scale: new Vector3(PIXEL * 8, PIXEL * 8, 1),
        uvs: SpriteAnimation_1.getSpriteUv(2, (528 / 8) * (1024 / 8), 8, 8)
    });
    const take = () => {
        taken = true;
        spriteEntity.getShape().visible = false;
    };
    const checkFrog = (frogPosition) => {
        if (taken)
            return false;
        if (frogPosition.y < 2 - PIXEL * 15)
            return false;
        if (frogPosition.x === x) {
            take();
            Sound_1.playOnce("ok");
            return true;
        }
    };
    const onTake = (fn) => {
        callbacks.onTake = fn;
        return () => callbacks.onTake = null;
    };
    const isTaken = () => taken;
    return { spriteEntity, take, checkFrog, onTake, isTaken, index };
};
const SAMMICHES = 5;
exports.createScreen = (root, { player, seed }) => {
    const screenState = {
        blocked: false,
        lastKey: KEY.UP,
        movingFrog: false,
        countDt: 0,
        frogPosition: new Vector3(0, 0 + yOffset, -0.009),
        score: 0,
        takenSammiches: [false, false, false, false, false]
    };
    const screen = new Entity();
    const background = new Entity();
    background.setParent(screen);
    screen.setParent(root);
    const randomizer = seed_1.seedGen.create(seed);
    const carPools = Array(9).fill(null).map((v, index) => carPool_1.createCarPool(screen, { track: index, randomizer }));
    const sammichesPositions = [0, 1, 2, 3, 4];
    const sammiches = Array(SAMMICHES).fill(null).map((s, index) => {
        return createSammich(screen, { x: sammichPlaceholderPositions[sammichesPositions[index]], index });
    });
    screen.addComponent(new Transform({
        position: new Vector3(player === 1 ? -1.5 : 1.5, 2, -0),
    }));
    background.addComponent(new Transform({
        scale: new Vector3(3, 4, 1)
    }));
    const backgroundShape = new PlaneShape();
    backgroundShape.uvs = SpriteAnimation_1.getSpriteUv(9, 11, 96, 128);
    ;
    background.addComponent(backgroundShape);
    background.addComponent(SpriteMaterial_1.spriteMaterial);
    const frog = new SpriteAnimation_1.SpriteAnimationSystem(screen, {
        frames: [
            { uvs: SpriteAnimation_1.getSpriteUv(1, (528 / 8) * (1024 / 8), 8, 8) },
            { uvs: SpriteAnimation_1.getSpriteUv(1, ((528 + 8) / 8) * (1024 / 8), 8, 8) }
        ],
        scale: new Vector3(PIXEL * 8, PIXEL * 8, 1),
        position: screenState.frogPosition,
        time: 0.1
    });
    frog.init();
    const updateScreen = (dt, checkCollisions) => {
        screenState.countDt += dt;
        carPools.forEach(carPool => carPool.update(dt));
        if (checkCollisions) {
            const frogPosition = frog.getPosition();
            const takenSammich = sammiches.find((sammich, index) => {
                if (sammich.checkFrog(frogPosition))
                    return { index };
            });
            if (takenSammich) {
                screenState.takenSammiches[takenSammich.index] = true;
                screenState.score++;
                console.log("triggering onStateChange", player, JSON.stringify(screenState));
                callbacks.onStateChange && callbacks.onStateChange(screenState);
                return;
            }
            carPools.forEach(car => {
                if (car.isCollidingFrog(frogPosition)) {
                    Sound_1.playOnce("fail");
                    screenState.blocked = true;
                    setTimeout(() => {
                        screenState.blocked = false;
                        frogPosition.set(0, yOffset, frogPosition.z);
                        callbacks.onStateChange && callbacks.onStateChange(screenState);
                    }, 200);
                }
            });
        }
    };
    const setTakenSammiches = (takenSammiches) => {
        console.log("setTakemSammiches", player, JSON.stringify(takenSammiches));
        takenSammiches.forEach((value, index) => screenState.takenSammiches[index] = value);
        sammiches.forEach((sammich, index) => {
            if (takenSammiches[index]) {
                sammich.spriteEntity.hide();
            }
        });
    };
    const moveFrog = (key) => {
        if (screenState.movingFrog || screenState.blocked)
            return;
        Sound_1.playOnce("swing");
        screenState.movingFrog = true;
        frog.setRotation(key === KEY.UP ? 0 : key === KEY.LEFT ? 90 : 270);
        frog.play([0, 1, 0], { loop: false, time: 0.1 });
        const frogPosition = frog.getPosition();
        frog.addComponentOrReplace(new move_1.MoveTransformComponent(frogPosition, new Vector3(key === KEY.LEFT
            ? frogPosition.x - PIXEL * 8
            : key === KEY.RIGHT
                ? frogPosition.x + PIXEL * 8
                : frogPosition.x, key === KEY.UP ? frogPosition.y + PIXEL * 8 : frogPosition.y, frogPosition.z), 0.1, () => {
            screenState.movingFrog = false;
            const frogPosition = frog.getPosition();
            if (frogPosition.y >= 1.625) {
                if ((frogPosition.x + 1.5) / (PIXEL * 8) % 2) {
                    frogPosition.y = (yOffset + PIXEL * 8 * 10);
                }
                else {
                    screenState.blocked = true;
                    setTimeout(() => {
                        screenState.blocked = false;
                        frogPosition.set(frogPosition.x, yOffset, frogPosition.z);
                        screenState.frogPosition = frogPosition;
                        callbacks.onStateChange && callbacks.onStateChange(screenState);
                    }, 300);
                }
            }
            if (frogPosition.x <= (-1.5 + (PIXEL * 8))) {
                frogPosition.x = (-1.5 + (PIXEL * 8));
            }
            else if (frogPosition.x >= (1.5 - (PIXEL * 8))) {
                frogPosition.x = (1.5 - (PIXEL * 8));
            }
            screenState.frogPosition = frogPosition;
            callbacks.onStateChange && callbacks.onStateChange(screenState);
        }));
    };
    const up = () => moveFrog(KEY.UP);
    const left = () => moveFrog(KEY.LEFT);
    const right = () => moveFrog(KEY.RIGHT);
    const getScreenState = () => screenState;
    const callbacks = { onStateChange: null };
    const onStateChange = (fn) => {
        callbacks.onStateChange = fn;
        return () => callbacks.onStateChange = null;
    };
    const setFrogPosition = (x, y, z) => {
        frog.getPosition().set(x, y, z);
    };
    return {
        updateScreen,
        getScreenState,
        up,
        left,
        right,
        onStateChange,
        setFrogPosition,
        setTakenSammiches,
        block: () => screenState.blocked = true
    };
    function getRandomInt(randomizer, min, max, except) {
        const result = Math.floor(randomizer.random() * (max - min + 1)) + min;
        if (!except)
            return result;
        return (except.find(i => i === result)) ? getRandomInt(randomizer, min, max, except) : result;
    }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createCarPool = void 0;
const PIXEL = 4 / 128;
const yOffset = -PIXEL * 36;
const CAR_SIZE = PIXEL * 8;
const carBlueMaterial = new Material();
carBlueMaterial.albedoColor = Color3.Blue();
const carShape = new PlaneShape();
exports.createCarPool = (parent, { track, randomizer }) => {
    const NUM_CARS = 3;
    const state = {
        countDt: 0,
        nextCarAt: Number.MAX_VALUE,
        currentPoolIndex: 0
    };
    const absX = (x) => x + 1.5;
    let cancel, iterations = 0;
    const spawnInitialPosition = Array(NUM_CARS).fill(null).reduce((acc, current) => {
        let x = randomizer.random() * 3 - 1.5;
        while (!cancel && acc.find((xx) => absX(xx) - absX(x) < ((CAR_SIZE) + PIXEL))) {
            x = randomizer.random() * 3 - 1.5;
            iterations++;
            if (iterations > 10000) {
                console.error("Tell the author he did something wrong in the code", iterations);
                cancel = true;
            }
        }
        acc.push(x);
        return acc;
    }, []);
    const pool = new Array(NUM_CARS).fill(null).map((v, index) => {
        const carEntity = new Entity();
        const carTransform = new Transform({
            position: new Vector3(spawnInitialPosition[index], -PIXEL * 28 + track * PIXEL * 8 + (track >= 4 ? (PIXEL * 8) : 0), -0.001),
            scale: new Vector3(CAR_SIZE, PIXEL * 4, 0.1)
        });
        carEntity.addComponent(carBlueMaterial);
        carEntity.addComponent(carShape);
        carEntity.addComponent(carTransform);
        carEntity.setParent(parent);
        return { entity: carEntity, transform: carTransform, spawned: true };
    });
    const roundSafePosition = (value) => {
        return Math.floor(value * 1000) / 1000;
    };
    const handleScale = () => {
        pool.filter(c => c.spawned).forEach((car) => {
            const x = car.transform.position.x;
            if (x > 1.5 - CAR_SIZE / 2 || x < -1.5 + CAR_SIZE / 2) {
                car.transform.scale.set(0.01, car.transform.scale.y, car.transform.scale.z);
            }
            else {
                car.transform.scale.set(CAR_SIZE, car.transform.scale.y, car.transform.scale.z);
            }
        });
    };
    const handlePosition = (dt) => {
        pool.filter(c => c.spawned).forEach((car, index) => {
            const x = car.transform.position.x;
            if (track % 2 === 0) {
                if (x <= -1.5) {
                    car.transform.position.set(1.5, car.transform.position.y, car.transform.position.z);
                }
                else {
                    car.transform.position.set(roundSafePosition(x - (0.5 * dt)), car.transform.position.y, car.transform.position.z);
                }
            }
            else {
                if (x >= 1.5) {
                    car.transform.position.set(-1.5, car.transform.position.y, car.transform.position.z);
                }
                else {
                    car.transform.position.set(roundSafePosition(x + (0.5 * dt)), car.transform.position.y, car.transform.position.z);
                }
            }
        });
    };
    const update = (dt) => {
        state.countDt += dt;
        handlePosition(dt);
    };
    const isCollidingFrog = (frogPosition) => {
        const FROG_SIZE = PIXEL * 6;
        const CAR_HEIGHT = PIXEL * 4;
        const CAR_WIDTH = PIXEL * 8;
        let i = pool.length;
        while (i--) {
            const carPosition = pool[i].transform.position;
            const carLeft = carPosition.x - CAR_WIDTH / 2;
            const carRight = carPosition.x + CAR_WIDTH / 2;
            const carTop = carPosition.y + CAR_HEIGHT / 2;
            const carBottom = carPosition.y - CAR_HEIGHT / 2;
            const frogLeft = frogPosition.x - FROG_SIZE / 2;
            const frogRight = frogPosition.x + FROG_SIZE / 2;
            const frogTop = frogPosition.y - FROG_SIZE / 2;
            const frogBottom = frogPosition.y + FROG_SIZE / 2;
            if (carLeft <= frogRight && carRight >= frogLeft
                && carTop <= frogBottom && carBottom >= frogTop) {
                console.log("COLLISION");
                return true;
            }
        }
    };
    return {
        update,
        isCollidingFrog
    };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSpectatorTrack = void 0;
const TextPanel_1 = __webpack_require__(6);
const Sound_1 = __webpack_require__(2);
const SpritePanel_1 = __webpack_require__(4);
const VideoPanel_1 = __webpack_require__(14);
const SpriteAnimation_1 = __webpack_require__(0);
const TrackUtil_1 = __webpack_require__(20);
let timeOffset = 0;
exports.createSpectatorTrack = (root, { lobbyRoom, trackSeed, minGames, alreadyStarted }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("alreadyStarted", alreadyStarted);
    console.log("createSpectatorTrack", root, lobbyRoom, trackSeed, minGames, alreadyStarted);
    let gameTrackDefinition = TrackUtil_1.generateTrack(trackSeed, minGames);
    const state = {
        currentIndex: 0,
        currentPlayer: 0,
        score1: 0,
        score2: 0
    };
    let game = null;
    if (!alreadyStarted) {
        console.log("spectator from start");
        Sound_1.stopSound("music2");
        yield sleep(100);
        Sound_1.playOnce("vs", { volume: 1 });
        TextPanel_1.updateTextPanel({ value: `${lobbyRoom.state.player1.displayName}\nVS\n${lobbyRoom.state.player2.displayName}`, bottom: true, color: Color3.Black() });
        yield sleep(1000);
        VideoPanel_1.reproduceVideo(root, gameTrackDefinition[0].Game.id);
        SpritePanel_1.hideSpritePanel();
        TextPanel_1.updateTextPanel({ value: gameTrackDefinition[0].Game.instructions });
        if (game) {
            game.destroy();
            game = null;
        }
        game = new gameTrackDefinition[state.currentIndex].Game(root, {
            seed: trackSeed,
            currentPlayer: 0,
            level: 1
        });
    }
    setSpectatorRoomMessageHandlers(lobbyRoom);
    function setSpectatorRoomMessageHandlers(lobbyRoom) {
        let listeners = [];
        listeners.push(lobbyRoom.onMessage("NEXT_GAME", ({ serverTime, startTime, gameIndex }) => {
            console.log("spectator NEXT_GAME", { serverTime, startTime, gameIndex });
            timeOffset = serverTime - Date.now();
            TextPanel_1.updateTextPanel({ value: `` });
            VideoPanel_1.removeVideoPanel();
            Sound_1.stopAllSounds();
            game && game.init();
            game && game.block();
            game && game.setStartTime(getLocalStartTime(startTime));
        }));
        listeners.push(lobbyRoom.onMessage("SHARE_STATE", (sharedState) => {
            game && game.shareState(sharedState || {});
        }));
        listeners.push(lobbyRoom.onMessage("NEXT_ROUND", ({ winner, startTime, serverTime }) => {
            timeOffset = serverTime - Date.now();
            game && game.finishRound && game.finishRound({ winner });
            const localRoundStartTime = getLocalStartTime(startTime);
            game && game.setRoundStartTime && game.setRoundStartTime(localRoundStartTime);
        }));
        listeners.push(lobbyRoom.onMessage("FINSIH_AGREE", ({ winner, nextSeed, nextIndex }) => __awaiter(this, void 0, void 0, function* () {
            console.log("spectator FINSIH_AGREE ", winner, nextSeed, nextIndex);
            game && game.finish && game.finish({ winner });
            const winnerDisplayName = lobbyRoom.state[`player${winner}`].displayName;
            TextPanel_1.updateTextPanel({ value: `(${winner}) ${winnerDisplayName} wins` });
            yield sleep(2000);
            game && game.destroy();
            game = null;
            if (state.currentIndex + 1 >= gameTrackDefinition.length && state.score1 === state.score2) {
                gameTrackDefinition.push(TrackUtil_1.generateTrack(nextSeed, 1)[0]);
                console.log("tie-breaker", gameTrackDefinition);
            }
            if (state.currentIndex < gameTrackDefinition.length) {
                state.currentIndex = nextIndex;
                const instructions = gameTrackDefinition[nextIndex].Game.instructions || `ERROR: MISSING_INSTRUCTIONS`;
                SpritePanel_1.hideSpritePanel();
                VideoPanel_1.reproduceVideo(root, gameTrackDefinition[nextIndex].Game.id);
                TextPanel_1.updateTextPanel({ value: `${instructions}\n` });
                yield sleep(1500);
                game && game.destroy();
                game = null;
                createGame({ nextSeed });
            }
        })));
        listeners.push(lobbyRoom.onMessage("FINISH_TRACK", ({ score }) => {
            console.log("receive FINISH_TRACK", score);
            game && game.destroy();
            game = null;
            Sound_1.stopAllSounds();
            Sound_1.playOnce("pwned");
            const winnerPlayer = (score.player1 || 0) > (score.player2 || 0) ? 1 : 2;
            SpritePanel_1.updateSpritePanel({
                uvs: SpriteAnimation_1.getSpriteUv(8, 0, 192, 128),
                scale: new Vector3(winnerPlayer === 1 ? 6 : -6, 4, 1)
            });
            SpritePanel_1.showSpritePanel();
        }));
        listeners.push(lobbyRoom.onMessage("PLAYER_LEFT", () => {
            if (game) {
                game.destroy();
                game = null;
            }
        }));
        listeners.push(lobbyRoom.onMessage("GAME_DISPOSE", () => {
            console.log("GAME_DISPOSE");
            listeners.forEach((unregister) => {
                unregister();
            });
            listeners = [];
        }));
    }
    function createGame({ nextSeed }) {
        console.log(`
            createGame
            state.currentIndex: ${state.currentIndex}
            gameTrackDefinition[state.currentIndex]: ${gameTrackDefinition[state.currentIndex] && gameTrackDefinition[state.currentIndex].Game.id}
  
        `);
        const Game = gameTrackDefinition[state.currentIndex].Game;
        if (game) {
            game.destroy();
            game = null;
        }
        game = new Game(root, { seed: nextSeed, currentPlayer: 0, level: 1 });
    }
});
function getLocalStartTime(startTime) {
    return startTime - timeOffset;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(74);
var Client_1 = __webpack_require__(75);
exports.Client = Client_1.Client;
var Protocol_1 = __webpack_require__(41);
exports.Protocol = Protocol_1.Protocol;
exports.ErrorCode = Protocol_1.ErrorCode;
var Room_1 = __webpack_require__(38);
exports.Room = Room_1.Room;
var Auth_1 = __webpack_require__(45);
exports.Auth = Auth_1.Auth;
exports.Platform = Auth_1.Platform;
var FossilDeltaSerializer_1 = __webpack_require__(87);
exports.FossilDeltaSerializer = FossilDeltaSerializer_1.FossilDeltaSerializer;
var SchemaSerializer_1 = __webpack_require__(92);
exports.SchemaSerializer = SchemaSerializer_1.SchemaSerializer;
var Serializer_1 = __webpack_require__(40);
exports.registerSerializer = Serializer_1.registerSerializer;
Serializer_1.registerSerializer('fossil-delta', FossilDeltaSerializer_1.FossilDeltaSerializer);
Serializer_1.registerSerializer('schema', SchemaSerializer_1.SchemaSerializer);


/***/ }),
/* 74 */
/***/ (function(module, exports) {

if (!ArrayBuffer.isView) {
    ArrayBuffer.isView = function (a) {
        return a !== null && typeof (a) === 'object' && a.buffer instanceof ArrayBuffer;
    };
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var httpie_1 = __webpack_require__(37);
var ServerError_1 = __webpack_require__(76);
var Room_1 = __webpack_require__(38);
var Auth_1 = __webpack_require__(45);
var Push_1 = __webpack_require__(86);
var MatchMakeError = (function (_super) {
    __extends(MatchMakeError, _super);
    function MatchMakeError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        Object.setPrototypeOf(_this, MatchMakeError.prototype);
        return _this;
    }
    return MatchMakeError;
}(Error));
exports.MatchMakeError = MatchMakeError;
var Client = (function () {
    function Client(endpoint) {
        if (endpoint === void 0) {
            endpoint = location.protocol.replace("http", "ws") + "//" + location.hostname + (location.port && ":" + location.port);
        }
        this.endpoint = endpoint;
        this.auth = new Auth_1.Auth(this.endpoint);
        this.push = new Push_1.Push(this.endpoint);
    }
    Client.prototype.joinOrCreate = function (roomName, options, rootSchema) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createMatchMakeRequest('joinOrCreate', roomName, options, rootSchema)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.create = function (roomName, options, rootSchema) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createMatchMakeRequest('create', roomName, options, rootSchema)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.join = function (roomName, options, rootSchema) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createMatchMakeRequest('join', roomName, options, rootSchema)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.joinById = function (roomId, options, rootSchema) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createMatchMakeRequest('joinById', roomId, options, rootSchema)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.reconnect = function (roomId, sessionId, rootSchema) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.createMatchMakeRequest('joinById', roomId, { sessionId: sessionId }, rootSchema)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Client.prototype.getAvailableRooms = function (roomName) {
        if (roomName === void 0) {
            roomName = "";
        }
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.endpoint.replace("ws", "http") + "/matchmake/" + roomName;
                        return [4, httpie_1.get(url, { headers: { 'Accept': 'application/json' } })];
                    case 1: return [2, (_a.sent()).data];
                }
            });
        });
    };
    Client.prototype.consumeSeatReservation = function (response, rootSchema) {
        return __awaiter(this, void 0, void 0, function () {
            var room;
            return __generator(this, function (_a) {
                room = this.createRoom(response.room.name, rootSchema);
                room.id = response.room.roomId;
                room.sessionId = response.sessionId;
                room.connect(this.buildEndpoint(response.room, { sessionId: room.sessionId }));
                return [2, new Promise(function (resolve, reject) {
                        var onError = function (code, message) { return reject(new ServerError_1.ServerError(code, message)); };
                        room.onError.once(onError);
                        room.onJoin.once(function () {
                            room.onError.remove(onError);
                            resolve(room);
                        });
                    })];
            });
        });
    };
    Client.prototype.createMatchMakeRequest = function (method, roomName, options, rootSchema) {
        if (options === void 0) {
            options = {};
        }
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.endpoint.replace("ws", "http") + "/matchmake/" + method + "/" + roomName;
                        if (this.auth.hasToken) {
                            options.token = this.auth.token;
                        }
                        return [4, httpie_1.post(url, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(options)
                            })];
                    case 1:
                        response = (_a.sent()).data;
                        if (response.error) {
                            throw new MatchMakeError(response.error, response.code);
                        }
                        return [2, this.consumeSeatReservation(response, rootSchema)];
                }
            });
        });
    };
    Client.prototype.createRoom = function (roomName, rootSchema) {
        return new Room_1.Room(roomName, rootSchema);
    };
    Client.prototype.buildEndpoint = function (room, options) {
        if (options === void 0) {
            options = {};
        }
        var params = [];
        for (var name_1 in options) {
            if (!options.hasOwnProperty(name_1)) {
                continue;
            }
            params.push(name_1 + "=" + options[name_1]);
        }
        return this.endpoint + "/" + room.processId + "/" + room.roomId + "?" + params.join('&');
    };
    return Client;
}());
exports.Client = Client;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ServerError = (function (_super) {
    __extends(ServerError, _super);
    function ServerError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ServerError";
        _this.code = code;
        return _this;
    }
    return ServerError;
}(Error));
exports.ServerError = ServerError;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Decoder(buffer, offset) {
    this._offset = offset;
    if (buffer instanceof ArrayBuffer) {
        this._buffer = buffer;
        this._view = new DataView(this._buffer);
    }
    else if (ArrayBuffer.isView(buffer)) {
        this._buffer = buffer.buffer;
        this._view = new DataView(this._buffer, buffer.byteOffset, buffer.byteLength);
    }
    else {
        throw new Error('Invalid argument');
    }
}
function utf8Read(view, offset, length) {
    var string = '', chr = 0;
    for (var i = offset, end = offset + length; i < end; i++) {
        var byte = view.getUint8(i);
        if ((byte & 0x80) === 0x00) {
            string += String.fromCharCode(byte);
            continue;
        }
        if ((byte & 0xe0) === 0xc0) {
            string += String.fromCharCode(((byte & 0x1f) << 6) |
                (view.getUint8(++i) & 0x3f));
            continue;
        }
        if ((byte & 0xf0) === 0xe0) {
            string += String.fromCharCode(((byte & 0x0f) << 12) |
                ((view.getUint8(++i) & 0x3f) << 6) |
                ((view.getUint8(++i) & 0x3f) << 0));
            continue;
        }
        if ((byte & 0xf8) === 0xf0) {
            chr = ((byte & 0x07) << 18) |
                ((view.getUint8(++i) & 0x3f) << 12) |
                ((view.getUint8(++i) & 0x3f) << 6) |
                ((view.getUint8(++i) & 0x3f) << 0);
            if (chr >= 0x010000) {
                chr -= 0x010000;
                string += String.fromCharCode((chr >>> 10) + 0xD800, (chr & 0x3FF) + 0xDC00);
            }
            else {
                string += String.fromCharCode(chr);
            }
            continue;
        }
        throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
}
Decoder.prototype._array = function (length) {
    var value = new Array(length);
    for (var i = 0; i < length; i++) {
        value[i] = this._parse();
    }
    return value;
};
Decoder.prototype._map = function (length) {
    var key = '', value = {};
    for (var i = 0; i < length; i++) {
        key = this._parse();
        value[key] = this._parse();
    }
    return value;
};
Decoder.prototype._str = function (length) {
    var value = utf8Read(this._view, this._offset, length);
    this._offset += length;
    return value;
};
Decoder.prototype._bin = function (length) {
    var value = this._buffer.slice(this._offset, this._offset + length);
    this._offset += length;
    return value;
};
Decoder.prototype._parse = function () {
    var prefix = this._view.getUint8(this._offset++);
    var value, length = 0, type = 0, hi = 0, lo = 0;
    if (prefix < 0xc0) {
        if (prefix < 0x80) {
            return prefix;
        }
        if (prefix < 0x90) {
            return this._map(prefix & 0x0f);
        }
        if (prefix < 0xa0) {
            return this._array(prefix & 0x0f);
        }
        return this._str(prefix & 0x1f);
    }
    if (prefix > 0xdf) {
        return (0xff - prefix + 1) * -1;
    }
    switch (prefix) {
        case 0xc0:
            return null;
        case 0xc2:
            return false;
        case 0xc3:
            return true;
        case 0xc4:
            length = this._view.getUint8(this._offset);
            this._offset += 1;
            return this._bin(length);
        case 0xc5:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._bin(length);
        case 0xc6:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._bin(length);
        case 0xc7:
            length = this._view.getUint8(this._offset);
            type = this._view.getInt8(this._offset + 1);
            this._offset += 2;
            return [type, this._bin(length)];
        case 0xc8:
            length = this._view.getUint16(this._offset);
            type = this._view.getInt8(this._offset + 2);
            this._offset += 3;
            return [type, this._bin(length)];
        case 0xc9:
            length = this._view.getUint32(this._offset);
            type = this._view.getInt8(this._offset + 4);
            this._offset += 5;
            return [type, this._bin(length)];
        case 0xca:
            value = this._view.getFloat32(this._offset);
            this._offset += 4;
            return value;
        case 0xcb:
            value = this._view.getFloat64(this._offset);
            this._offset += 8;
            return value;
        case 0xcc:
            value = this._view.getUint8(this._offset);
            this._offset += 1;
            return value;
        case 0xcd:
            value = this._view.getUint16(this._offset);
            this._offset += 2;
            return value;
        case 0xce:
            value = this._view.getUint32(this._offset);
            this._offset += 4;
            return value;
        case 0xcf:
            hi = this._view.getUint32(this._offset) * Math.pow(2, 32);
            lo = this._view.getUint32(this._offset + 4);
            this._offset += 8;
            return hi + lo;
        case 0xd0:
            value = this._view.getInt8(this._offset);
            this._offset += 1;
            return value;
        case 0xd1:
            value = this._view.getInt16(this._offset);
            this._offset += 2;
            return value;
        case 0xd2:
            value = this._view.getInt32(this._offset);
            this._offset += 4;
            return value;
        case 0xd3:
            hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
            lo = this._view.getUint32(this._offset + 4);
            this._offset += 8;
            return hi + lo;
        case 0xd4:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            if (type === 0x00) {
                this._offset += 1;
                return void 0;
            }
            return [type, this._bin(1)];
        case 0xd5:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(2)];
        case 0xd6:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(4)];
        case 0xd7:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            if (type === 0x00) {
                hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                return new Date(hi + lo);
            }
            return [type, this._bin(8)];
        case 0xd8:
            type = this._view.getInt8(this._offset);
            this._offset += 1;
            return [type, this._bin(16)];
        case 0xd9:
            length = this._view.getUint8(this._offset);
            this._offset += 1;
            return this._str(length);
        case 0xda:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._str(length);
        case 0xdb:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._str(length);
        case 0xdc:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._array(length);
        case 0xdd:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._array(length);
        case 0xde:
            length = this._view.getUint16(this._offset);
            this._offset += 2;
            return this._map(length);
        case 0xdf:
            length = this._view.getUint32(this._offset);
            this._offset += 4;
            return this._map(length);
    }
    throw new Error('Could not parse');
};
function decode(buffer, offset) {
    if (offset === void 0) {
        offset = 0;
    }
    var decoder = new Decoder(buffer, offset);
    var value = decoder._parse();
    if (decoder._offset !== buffer.byteLength) {
        throw new Error((buffer.byteLength - decoder._offset) + ' trailing bytes');
    }
    return value;
}
exports.default = decode;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function utf8Write(view, offset, str) {
    var c = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            view.setUint8(offset++, c);
        }
        else if (c < 0x800) {
            view.setUint8(offset++, 0xc0 | (c >> 6));
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c >= 0xe000) {
            view.setUint8(offset++, 0xe0 | (c >> 12));
            view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
        else {
            i++;
            c = 0x10000 + (((c & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
            view.setUint8(offset++, 0xf0 | (c >> 18));
            view.setUint8(offset++, 0x80 | (c >> 12) & 0x3f);
            view.setUint8(offset++, 0x80 | (c >> 6) & 0x3f);
            view.setUint8(offset++, 0x80 | (c & 0x3f));
        }
    }
}
function utf8Length(str) {
    var c = 0, length = 0;
    for (var i = 0, l = str.length; i < l; i++) {
        c = str.charCodeAt(i);
        if (c < 0x80) {
            length += 1;
        }
        else if (c < 0x800) {
            length += 2;
        }
        else if (c < 0xd800 || c >= 0xe000) {
            length += 3;
        }
        else {
            i++;
            length += 4;
        }
    }
    return length;
}
function _encode(bytes, defers, value) {
    var type = typeof value, i = 0, l = 0, hi = 0, lo = 0, length = 0, size = 0;
    if (type === 'string') {
        length = utf8Length(value);
        if (length < 0x20) {
            bytes.push(length | 0xa0);
            size = 1;
        }
        else if (length < 0x100) {
            bytes.push(0xd9, length);
            size = 2;
        }
        else if (length < 0x10000) {
            bytes.push(0xda, length >> 8, length);
            size = 3;
        }
        else if (length < 0x100000000) {
            bytes.push(0xdb, length >> 24, length >> 16, length >> 8, length);
            size = 5;
        }
        else {
            throw new Error('String too long');
        }
        defers.push({ _str: value, _length: length, _offset: bytes.length });
        return size + length;
    }
    if (type === 'number') {
        if (Math.floor(value) !== value || !isFinite(value)) {
            bytes.push(0xcb);
            defers.push({ _float: value, _length: 8, _offset: bytes.length });
            return 9;
        }
        if (value >= 0) {
            if (value < 0x80) {
                bytes.push(value);
                return 1;
            }
            if (value < 0x100) {
                bytes.push(0xcc, value);
                return 2;
            }
            if (value < 0x10000) {
                bytes.push(0xcd, value >> 8, value);
                return 3;
            }
            if (value < 0x100000000) {
                bytes.push(0xce, value >> 24, value >> 16, value >> 8, value);
                return 5;
            }
            hi = (value / Math.pow(2, 32)) >> 0;
            lo = value >>> 0;
            bytes.push(0xcf, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 9;
        }
        else {
            if (value >= -0x20) {
                bytes.push(value);
                return 1;
            }
            if (value >= -0x80) {
                bytes.push(0xd0, value);
                return 2;
            }
            if (value >= -0x8000) {
                bytes.push(0xd1, value >> 8, value);
                return 3;
            }
            if (value >= -0x80000000) {
                bytes.push(0xd2, value >> 24, value >> 16, value >> 8, value);
                return 5;
            }
            hi = Math.floor(value / Math.pow(2, 32));
            lo = value >>> 0;
            bytes.push(0xd3, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 9;
        }
    }
    if (type === 'object') {
        if (value === null) {
            bytes.push(0xc0);
            return 1;
        }
        if (Array.isArray(value)) {
            length = value.length;
            if (length < 0x10) {
                bytes.push(length | 0x90);
                size = 1;
            }
            else if (length < 0x10000) {
                bytes.push(0xdc, length >> 8, length);
                size = 3;
            }
            else if (length < 0x100000000) {
                bytes.push(0xdd, length >> 24, length >> 16, length >> 8, length);
                size = 5;
            }
            else {
                throw new Error('Array too large');
            }
            for (i = 0; i < length; i++) {
                size += _encode(bytes, defers, value[i]);
            }
            return size;
        }
        if (value instanceof Date) {
            var time = value.getTime();
            hi = Math.floor(time / Math.pow(2, 32));
            lo = time >>> 0;
            bytes.push(0xd7, 0, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
            return 10;
        }
        if (value instanceof ArrayBuffer) {
            length = value.byteLength;
            if (length < 0x100) {
                bytes.push(0xc4, length);
                size = 2;
            }
            else if (length < 0x10000) {
                bytes.push(0xc5, length >> 8, length);
                size = 3;
            }
            else if (length < 0x100000000) {
                bytes.push(0xc6, length >> 24, length >> 16, length >> 8, length);
                size = 5;
            }
            else {
                throw new Error('Buffer too large');
            }
            defers.push({ _bin: value, _length: length, _offset: bytes.length });
            return size + length;
        }
        if (typeof value.toJSON === 'function') {
            return _encode(bytes, defers, value.toJSON());
        }
        var keys = [], key = '';
        var allKeys = Object.keys(value);
        for (i = 0, l = allKeys.length; i < l; i++) {
            key = allKeys[i];
            if (typeof value[key] !== 'function') {
                keys.push(key);
            }
        }
        length = keys.length;
        if (length < 0x10) {
            bytes.push(length | 0x80);
            size = 1;
        }
        else if (length < 0x10000) {
            bytes.push(0xde, length >> 8, length);
            size = 3;
        }
        else if (length < 0x100000000) {
            bytes.push(0xdf, length >> 24, length >> 16, length >> 8, length);
            size = 5;
        }
        else {
            throw new Error('Object too large');
        }
        for (i = 0; i < length; i++) {
            key = keys[i];
            size += _encode(bytes, defers, key);
            size += _encode(bytes, defers, value[key]);
        }
        return size;
    }
    if (type === 'boolean') {
        bytes.push(value ? 0xc3 : 0xc2);
        return 1;
    }
    if (type === 'undefined') {
        bytes.push(0xd4, 0, 0);
        return 3;
    }
    throw new Error('Could not encode');
}
function encode(value) {
    var bytes = [];
    var defers = [];
    var size = _encode(bytes, defers, value);
    var buf = new ArrayBuffer(size);
    var view = new DataView(buf);
    var deferIndex = 0;
    var deferWritten = 0;
    var nextOffset = -1;
    if (defers.length > 0) {
        nextOffset = defers[0]._offset;
    }
    var defer, deferLength = 0, offset = 0;
    for (var i = 0, l = bytes.length; i < l; i++) {
        view.setUint8(deferWritten + i, bytes[i]);
        if (i + 1 !== nextOffset) {
            continue;
        }
        defer = defers[deferIndex];
        deferLength = defer._length;
        offset = deferWritten + nextOffset;
        if (defer._bin) {
            var bin = new Uint8Array(defer._bin);
            for (var j = 0; j < deferLength; j++) {
                view.setUint8(offset + j, bin[j]);
            }
        }
        else if (defer._str) {
            utf8Write(view, offset, defer._str);
        }
        else if (defer._float !== undefined) {
            view.setFloat64(offset, defer._float);
        }
        deferIndex++;
        deferWritten += deferLength;
        if (defers[deferIndex]) {
            nextOffset = defers[deferIndex]._offset;
        }
    }
    return buf;
}
exports.default = encode;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this.handlers = [];
    }
    EventEmitter.prototype.register = function (cb, once) {
        if (once === void 0) {
            once = false;
        }
        this.handlers.push(cb);
        return this;
    };
    EventEmitter.prototype.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.handlers.forEach(function (handler) { return handler.apply(void 0, args); });
    };
    EventEmitter.prototype.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Promise.all(this.handlers.map(function (handler) { return handler.apply(void 0, args); }));
    };
    EventEmitter.prototype.remove = function (cb) {
        var index = this.handlers.indexOf(cb);
        this.handlers[index] = this.handlers[this.handlers.length - 1];
        this.handlers.pop();
    };
    EventEmitter.prototype.clear = function () {
        this.handlers = [];
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
function createSignal() {
    var emitter = new EventEmitter();
    function register(cb) {
        return emitter.register(cb, this === null);
    }
    ;
    register.once = function (cb) {
        var callback = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            cb.apply(void 0, args);
            emitter.remove(callback);
        };
        emitter.register(callback);
    };
    register.remove = function (cb) { return emitter.remove(cb); };
    register.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return emitter.invoke.apply(emitter, args);
    };
    register.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return emitter.invokeAsync.apply(emitter, args);
    };
    register.clear = function () { return emitter.clear(); };
    return register;
}
exports.createSignal = createSignal;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createNanoEvents = void 0;
let createNanoEvents = () => ({
    events: {},
    emit(event, ...args) {
        for (let i of this.events[event] || []) {
            i(...args);
        }
    },
    on(event, cb) {
        ;
        (this.events[event] = this.events[event] || []).push(cb);
        return () => (this.events[event] = this.events[event].filter(i => i !== cb));
    }
});
exports.createNanoEvents = createNanoEvents;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var websocket_1 = __importDefault(__webpack_require__(82));
var Connection = (function (_super) {
    __extends(Connection, _super);
    function Connection(url, autoConnect) {
        if (autoConnect === void 0) {
            autoConnect = true;
        }
        var _this = _super.call(this, url, undefined, { connect: autoConnect }) || this;
        _this._enqueuedCalls = [];
        return _this;
    }
    Connection.prototype.onOpenCallback = function (event) {
        _super.prototype.onOpenCallback.call(this);
        this.binaryType = 'arraybuffer';
        if (this._enqueuedCalls.length > 0) {
            for (var _i = 0, _a = this._enqueuedCalls; _i < _a.length; _i++) {
                var _b = _a[_i], method = _b[0], args = _b[1];
                this[method].apply(this, args);
            }
            this._enqueuedCalls = [];
        }
    };
    Connection.prototype.send = function (data) {
        if (this.ws.readyState === websocket_1.default.OPEN) {
            if (data instanceof ArrayBuffer) {
                return _super.prototype.send.call(this, data);
            }
            else if (Array.isArray(data)) {
                return _super.prototype.send.call(this, (new Uint8Array(data)).buffer);
            }
        }
        else {
            this._enqueuedCalls.push(['send', [data]]);
        }
    };
    return Connection;
}(websocket_1.default));
exports.Connection = Connection;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
var createBackoff = __webpack_require__(83).createBackoff;
var WebSocketImpl = typeof WebSocket !== "undefined" ? WebSocket : __webpack_require__(84);
var WebSocketClient = function () {
    function WebSocketClient(url, protocols) { var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}; _classCallCheck(this, WebSocketClient); this.url = url; this.protocols = protocols; this.reconnectEnabled = true; this.listeners = {}; this.backoff = createBackoff(options.backoff || 'exponential', options); this.backoff.onReady = this.onBackoffReady.bind(this); if (typeof options.connect === "undefined" || options.connect) {
        this.open();
    } }
    _createClass(WebSocketClient, [{ key: 'open', value: function open() {
                var reconnect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                this.isReconnect = reconnect;
                var binaryType = this.ws && this.ws.binaryType;
                this.ws = new WebSocketImpl(this.url, this.protocols);
                this.ws.onclose = this.onCloseCallback.bind(this);
                this.ws.onerror = this.onErrorCallback.bind(this);
                this.ws.onmessage = this.onMessageCallback.bind(this);
                this.ws.onopen = this.onOpenCallback.bind(this);
                if (binaryType) {
                    this.ws.binaryType = binaryType;
                }
            }
        }, { key: 'onBackoffReady', value: function onBackoffReady(number, delay) {
                this.open(true);
            }
        }, { key: 'onCloseCallback', value: function onCloseCallback(e) { if (!this.isReconnect && this.listeners['onclose']) {
                this.listeners['onclose'].apply(null, arguments);
            } if (this.reconnectEnabled && e.code < 3000) {
                this.backoff.backoff();
            } }
        }, { key: 'onErrorCallback', value: function onErrorCallback() { if (this.listeners['onerror']) {
                this.listeners['onerror'].apply(null, arguments);
            } }
        }, { key: 'onMessageCallback', value: function onMessageCallback() { if (this.listeners['onmessage']) {
                this.listeners['onmessage'].apply(null, arguments);
            } }
        }, { key: 'onOpenCallback', value: function onOpenCallback() { if (this.listeners['onopen']) {
                this.listeners['onopen'].apply(null, arguments);
            } if (this.isReconnect && this.listeners['onreconnect']) {
                this.listeners['onreconnect'].apply(null, arguments);
            } this.isReconnect = false; }
        }, { key: 'close',
            value: function close(code, reason) { if (typeof code == 'undefined') {
                code = 1000;
            } this.reconnectEnabled = false; this.ws.close(code, reason); }
        }, { key: 'send', value: function send(data) { this.ws.send(data); }
        }, { key: 'bufferedAmount', get: function get() { return this.ws.bufferedAmount; }
        }, { key: 'readyState', get: function get() { return this.ws.readyState; }
        }, { key: 'binaryType', get: function get() { return this.ws.binaryType; }, set: function set(binaryType) { this.ws.binaryType = binaryType; }
        }, { key: 'extensions', get: function get() { return this.ws.extensions; }, set: function set(extensions) { this.ws.extensions = extensions; }
        }, { key: 'protocol', get: function get() { return this.ws.protocol; }, set: function set(protocol) { this.ws.protocol = protocol; } }, { key: 'onclose', set: function set(listener) { this.listeners['onclose'] = listener; }, get: function get() { return this.listeners['onclose']; }
        }, { key: 'onerror', set: function set(listener) { this.listeners['onerror'] = listener; }, get: function get() { return this.listeners['onerror']; }
        }, { key: 'onmessage', set: function set(listener) { this.listeners['onmessage'] = listener; }, get: function get() { return this.listeners['onmessage']; }
        }, { key: 'onopen', set: function set(listener) { this.listeners['onopen'] = listener; }, get: function get() { return this.listeners['onopen']; }
        }, { key: 'onreconnect', set: function set(listener) { this.listeners['onreconnect'] = listener; }, get: function get() { return this.listeners['onreconnect']; } }]);
    return WebSocketClient;
}();
WebSocketClient.CONNECTING = WebSocketImpl.CONNECTING;
WebSocketClient.OPEN = WebSocketImpl.OPEN;
WebSocketClient.CLOSING = WebSocketImpl.CLOSING;
WebSocketClient.CLOSED = WebSocketImpl.CLOSED;
exports.default = WebSocketClient;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.createBackoff = createBackoff;
var backoff = { exponential: function exponential(attempt, delay) { return Math.floor(Math.random() * Math.pow(2, attempt) * delay); }, fibonacci: function fibonacci(attempt, delay) { var current = 1; if (attempt > current) {
        var prev = 1, current = 2;
        for (var index = 2; index < attempt; index++) {
            var next = prev + current;
            prev = current;
            current = next;
        }
    } return Math.floor(Math.random() * current * delay); } };
function createBackoff(type, options) { return new Backoff(backoff[type], options); }
function Backoff(func, options) { this.func = func; this.attempts = 0; this.delay = typeof options.initialDelay !== "undefined" ? options.initialDelay : 100; }
Backoff.prototype.backoff = function () { setTimeout(this.onReady, this.func(++this.attempts, this.delay)); };


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var storage;
function getStorage() {
    if (!storage) {
        storage = (typeof (cc) !== 'undefined' && cc.sys && cc.sys.localStorage)
            ? cc.sys.localStorage
            : typeof (window) !== "undefined" && window.localStorage
                ? window.localStorage
                : {
                    cache: {},
                    setItem: function (key, value) { this.cache[key] = value; },
                    getItem: function (key) { this.cache[key]; },
                    removeItem: function (key) { delete this.cache[key]; },
                };
    }
    return storage;
}
function setItem(key, value) {
    getStorage().setItem(key, value);
}
exports.setItem = setItem;
function removeItem(key) {
    getStorage().removeItem(key);
}
exports.removeItem = removeItem;
function getItem(key, callback) {
    var value = getStorage().getItem(key);
    if (typeof (Promise) === 'undefined' ||
        !(value instanceof Promise)) {
        callback(value);
    }
    else {
        value.then(function (id) { return callback(id); });
    }
}
exports.getItem = getItem;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Push = (function () {
    function Push(endpoint) {
        this.endpoint = endpoint.replace("ws", "http");
    }
    Push.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.check();
                        return [4, this.registerServiceWorker()];
                    case 1:
                        _a.sent();
                        return [4, this.requestNotificationPermission()];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ;
    Push.prototype.registerServiceWorker = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, navigator.serviceWorker.register(this.endpoint + "/push")];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    Push.prototype.requestNotificationPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var permission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, window["Notification"].requestPermission()];
                    case 1:
                        permission = _a.sent();
                        if (permission !== "granted") {
                            throw new Error("Permission not granted for Notification");
                        }
                        return [2];
                }
            });
        });
    };
    Push.prototype.check = function () {
        if (!("serviceWorker" in navigator)) {
            throw new Error("No Service Worker support!");
        }
        if (!("PushManager" in window)) {
            throw new Error("No Push API Support!");
        }
    };
    return Push;
}());
exports.Push = Push;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule)
        return mod;
    var result = {};
    if (mod != null)
        for (var k in mod)
            if (Object.hasOwnProperty.call(mod, k))
                result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var state_listener_1 = __webpack_require__(88);
var fossilDelta = __importStar(__webpack_require__(91));
var msgpack = __importStar(__webpack_require__(39));
var FossilDeltaSerializer = (function () {
    function FossilDeltaSerializer() {
        this.api = new state_listener_1.StateContainer({});
    }
    FossilDeltaSerializer.prototype.getState = function () {
        return this.api.state;
    };
    FossilDeltaSerializer.prototype.setState = function (encodedState) {
        this.previousState = new Uint8Array(encodedState);
        this.api.set(msgpack.decode(this.previousState));
    };
    FossilDeltaSerializer.prototype.patch = function (binaryPatch) {
        this.previousState = new Uint8Array(fossilDelta.apply(this.previousState, binaryPatch));
        this.api.set(msgpack.decode(this.previousState));
    };
    FossilDeltaSerializer.prototype.teardown = function () {
        this.api.removeAllListeners();
    };
    return FossilDeltaSerializer;
}());
exports.FossilDeltaSerializer = FossilDeltaSerializer;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StateContainer_1 = __webpack_require__(89);
exports.StateContainer = StateContainer_1.StateContainer;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var compare_1 = __webpack_require__(90);
var StateContainer = (function () {
    function StateContainer(state) {
        this.listeners = [];
        this.matcherPlaceholders = {
            ":id": /^([a-zA-Z0-9\-_]+)$/,
            ":number": /^([0-9]+)$/,
            ":string": /^(\w+)$/,
            ":axis": /^([xyz])$/,
            ":*": /(.*)/,
        };
        this.state = state;
        this.reset();
    }
    StateContainer.prototype.set = function (newState) {
        var patches = compare_1.compare(this.state, newState);
        this.state = newState;
        this.checkPatches(patches, this.listeners, this.defaultListener);
        return patches;
    };
    StateContainer.prototype.registerPlaceholder = function (placeholder, matcher) {
        this.matcherPlaceholders[placeholder] = matcher;
    };
    StateContainer.prototype.listen = function (segments, callback, immediate) {
        var _this = this;
        var rules;
        if (typeof (segments) === "function") {
            rules = [];
            callback = segments;
        }
        else {
            rules = segments.split("/");
        }
        if (callback.length > 1) {
            console.warn(".listen() accepts only one parameter.");
        }
        var listener = {
            callback: callback,
            rawRules: rules,
            rules: rules.map(function (segment) {
                if (typeof (segment) === "string") {
                    return (segment.indexOf(":") === 0)
                        ? _this.matcherPlaceholders[segment] || _this.matcherPlaceholders[":*"]
                        : new RegExp("^" + segment + "$");
                }
                else {
                    return segment;
                }
            })
        };
        if (rules.length === 0) {
            this.defaultListener = listener;
        }
        else {
            this.listeners.push(listener);
        }
        if (immediate) {
            this.checkPatches(compare_1.compare({}, this.state), [listener]);
        }
        return listener;
    };
    StateContainer.prototype.removeListener = function (listener) {
        for (var i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i] === listener) {
                this.listeners.splice(i, 1);
            }
        }
    };
    StateContainer.prototype.removeAllListeners = function () {
        this.reset();
    };
    StateContainer.prototype.checkPatches = function (patches, listeners, defaultListener) {
        for (var j = 0, len = listeners.length; j < len; j++) {
            var listener = listeners[j];
            for (var i = patches.length - 1; i >= 0; i--) {
                var pathVariables = listener && this.getPathVariables(patches[i], listener);
                if (pathVariables) {
                    listener.callback({
                        path: pathVariables,
                        rawPath: patches[i].path,
                        operation: patches[i].operation,
                        value: patches[i].value
                    });
                    patches[i].matched = true;
                }
            }
        }
        if (defaultListener) {
            for (var i = patches.length - 1; i >= 0; i--) {
                if (!patches[i].matched) {
                    defaultListener.callback(patches[i]);
                }
            }
        }
    };
    StateContainer.prototype.getPathVariables = function (patch, listener) {
        if (patch.path.length !== listener.rules.length) {
            return false;
        }
        var path = {};
        for (var i = 0, len = listener.rules.length; i < len; i++) {
            var matches = patch.path[i].match(listener.rules[i]);
            if (!matches || matches.length === 0 || matches.length > 2) {
                return false;
            }
            else if (listener.rawRules[i].substr(0, 1) === ":") {
                path[listener.rawRules[i].substr(1)] = matches[1];
            }
        }
        return path;
    };
    StateContainer.prototype.reset = function () {
        this.listeners = [];
    };
    return StateContainer;
}());
exports.StateContainer = StateContainer;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function compare(tree1, tree2) {
    var patches = [];
    generate(tree1, tree2, patches, []);
    return patches;
}
exports.compare = compare;
function concat(arr, value) {
    var newArr = arr.slice();
    newArr.push(value);
    return newArr;
}
function objectKeys(obj) {
    if (Array.isArray(obj)) {
        var keys_1 = new Array(obj.length);
        for (var k = 0; k < keys_1.length; k++) {
            keys_1[k] = "" + k;
        }
        return keys_1;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            keys.push(i);
        }
    }
    return keys;
}
;
function generate(mirror, obj, patches, path) {
    var newKeys = objectKeys(obj);
    var oldKeys = objectKeys(mirror);
    var deleted = false;
    for (var t = oldKeys.length - 1; t >= 0; t--) {
        var key = oldKeys[t];
        var oldVal = mirror[key];
        if (obj.hasOwnProperty(key) && !(obj[key] === undefined && oldVal !== undefined && Array.isArray(obj) === false)) {
            var newVal = obj[key];
            if (typeof oldVal == "object" && oldVal != null && typeof newVal == "object" && newVal != null) {
                generate(oldVal, newVal, patches, concat(path, key));
            }
            else {
                if (oldVal !== newVal) {
                    patches.push({
                        operation: "replace",
                        path: concat(path, key),
                        value: newVal,
                        previousValue: oldVal
                    });
                }
            }
        }
        else {
            patches.push({ operation: "remove", path: concat(path, key) });
            deleted = true;
        }
    }
    if (!deleted && newKeys.length == oldKeys.length) {
        return;
    }
    for (var t = newKeys.length - 1; t >= 0; t--) {
        var key = newKeys[t];
        if (!mirror.hasOwnProperty(key) && obj[key] !== undefined) {
            var newVal = obj[key];
            var addPath = concat(path, key);
            if (typeof newVal == "object" && newVal != null) {
                generate({}, newVal, patches, addPath);
            }
            patches.push({ operation: "add", path: addPath, value: newVal });
        }
    }
}


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

(function (root, factory) {
    if ( true && module.exports)
        module.exports = factory();
    else
        root.fossilDelta = factory();
})(this, function () {
    'use strict';
    var fossilDelta = {};
    var NHASH = 16;
    function RollingHash() {
        this.a = 0;
        this.b = 0;
        this.i = 0;
        this.z = new Array(NHASH);
    }
    RollingHash.prototype.init = function (z, pos) {
        var a = 0, b = 0, i, x;
        for (i = 0; i < NHASH; i++) {
            x = z[pos + i];
            a = (a + x) & 0xffff;
            b = (b + (NHASH - i) * x) & 0xffff;
            this.z[i] = x;
        }
        this.a = a & 0xffff;
        this.b = b & 0xffff;
        this.i = 0;
    };
    RollingHash.prototype.next = function (c) {
        var old = this.z[this.i];
        this.z[this.i] = c;
        this.i = (this.i + 1) & (NHASH - 1);
        this.a = (this.a - old + c) & 0xffff;
        this.b = (this.b - NHASH * old + this.a) & 0xffff;
    };
    RollingHash.prototype.value = function () {
        return ((this.a & 0xffff) | (this.b & 0xffff) << 16) >>> 0;
    };
    var zDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".
        split('').map(function (x) { return x.charCodeAt(0); });
    var zValue = [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1,
        -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36,
        -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1
    ];
    function Reader(array) {
        this.a = array;
        this.pos = 0;
    }
    Reader.prototype.haveBytes = function () {
        return this.pos < this.a.length;
    };
    Reader.prototype.getByte = function () {
        var b = this.a[this.pos];
        this.pos++;
        if (this.pos > this.a.length)
            throw new RangeError('out of bounds');
        return b;
    };
    Reader.prototype.getChar = function () {
        return String.fromCharCode(this.getByte());
    };
    Reader.prototype.getInt = function () {
        var v = 0, c;
        while (this.haveBytes() && (c = zValue[0x7f & this.getByte()]) >= 0) {
            v = (v << 6) + c;
        }
        this.pos--;
        return v >>> 0;
    };
    function Writer() {
        this.a = [];
    }
    Writer.prototype.toArray = function () {
        return this.a;
    };
    Writer.prototype.putByte = function (b) {
        this.a.push(b & 0xff);
    };
    Writer.prototype.putChar = function (s) {
        this.putByte(s.charCodeAt(0));
    };
    Writer.prototype.putInt = function (v) {
        var i, j, zBuf = [];
        if (v === 0) {
            this.putChar('0');
            return;
        }
        for (i = 0; v > 0; i++, v >>>= 6)
            zBuf.push(zDigits[v & 0x3f]);
        for (j = i - 1; j >= 0; j--)
            this.putByte(zBuf[j]);
    };
    Writer.prototype.putArray = function (a, start, end) {
        for (var i = start; i < end; i++)
            this.a.push(a[i]);
    };
    function digitCount(v) {
        var i, x;
        for (i = 1, x = 64; v >= x; i++, x <<= 6) { }
        return i;
    }
    function checksum(arr) {
        var sum0 = 0, sum1 = 0, sum2 = 0, sum3 = 0, z = 0, N = arr.length;
        while (N >= 16) {
            sum0 = sum0 + arr[z + 0] | 0;
            sum1 = sum1 + arr[z + 1] | 0;
            sum2 = sum2 + arr[z + 2] | 0;
            sum3 = sum3 + arr[z + 3] | 0;
            sum0 = sum0 + arr[z + 4] | 0;
            sum1 = sum1 + arr[z + 5] | 0;
            sum2 = sum2 + arr[z + 6] | 0;
            sum3 = sum3 + arr[z + 7] | 0;
            sum0 = sum0 + arr[z + 8] | 0;
            sum1 = sum1 + arr[z + 9] | 0;
            sum2 = sum2 + arr[z + 10] | 0;
            sum3 = sum3 + arr[z + 11] | 0;
            sum0 = sum0 + arr[z + 12] | 0;
            sum1 = sum1 + arr[z + 13] | 0;
            sum2 = sum2 + arr[z + 14] | 0;
            sum3 = sum3 + arr[z + 15] | 0;
            z += 16;
            N -= 16;
        }
        while (N >= 4) {
            sum0 = sum0 + arr[z + 0] | 0;
            sum1 = sum1 + arr[z + 1] | 0;
            sum2 = sum2 + arr[z + 2] | 0;
            sum3 = sum3 + arr[z + 3] | 0;
            z += 4;
            N -= 4;
        }
        sum3 = (((sum3 + (sum2 << 8) | 0) + (sum1 << 16) | 0) + (sum0 << 24) | 0);
        switch (N) {
            case 3: sum3 = sum3 + (arr[z + 2] << 8) | 0;
            case 2: sum3 = sum3 + (arr[z + 1] << 16) | 0;
            case 1: sum3 = sum3 + (arr[z + 0] << 24) | 0;
        }
        return sum3 >>> 0;
    }
    fossilDelta.create = function (src, out) {
        var zDelta = new Writer();
        var lenOut = out.length;
        var lenSrc = src.length;
        var i, lastRead = -1;
        zDelta.putInt(lenOut);
        zDelta.putChar('\n');
        if (lenSrc <= NHASH) {
            zDelta.putInt(lenOut);
            zDelta.putChar(':');
            zDelta.putArray(out, 0, lenOut);
            zDelta.putInt(checksum(out));
            zDelta.putChar(';');
            return zDelta.toArray();
        }
        var nHash = Math.ceil(lenSrc / NHASH);
        var collide = new Array(nHash);
        var landmark = new Array(nHash);
        for (i = 0; i < collide.length; i++)
            collide[i] = -1;
        for (i = 0; i < landmark.length; i++)
            landmark[i] = -1;
        var hv, h = new RollingHash();
        for (i = 0; i < lenSrc - NHASH; i += NHASH) {
            h.init(src, i);
            hv = h.value() % nHash;
            collide[i / NHASH] = landmark[hv];
            landmark[hv] = i / NHASH;
        }
        var base = 0;
        var iSrc, iBlock, bestCnt, bestOfst, bestLitsz;
        while (base + NHASH < lenOut) {
            bestOfst = 0;
            bestLitsz = 0;
            h.init(out, base);
            i = 0;
            bestCnt = 0;
            while (1) {
                var limit = 250;
                hv = h.value() % nHash;
                iBlock = landmark[hv];
                while (iBlock >= 0 && (limit--) > 0) {
                    var cnt, ofst, litsz;
                    var j, k, x, y;
                    var sz;
                    iSrc = iBlock * NHASH;
                    for (j = 0, x = iSrc, y = base + i; x < lenSrc && y < lenOut; j++, x++, y++) {
                        if (src[x] !== out[y])
                            break;
                    }
                    j--;
                    for (k = 1; k < iSrc && k <= i; k++) {
                        if (src[iSrc - k] !== out[base + i - k])
                            break;
                    }
                    k--;
                    ofst = iSrc - k;
                    cnt = j + k + 1;
                    litsz = i - k;
                    sz = digitCount(i - k) + digitCount(cnt) + digitCount(ofst) + 3;
                    if (cnt >= sz && cnt > bestCnt) {
                        bestCnt = cnt;
                        bestOfst = iSrc - k;
                        bestLitsz = litsz;
                    }
                    iBlock = collide[iBlock];
                }
                if (bestCnt > 0) {
                    if (bestLitsz > 0) {
                        zDelta.putInt(bestLitsz);
                        zDelta.putChar(':');
                        zDelta.putArray(out, base, base + bestLitsz);
                        base += bestLitsz;
                    }
                    base += bestCnt;
                    zDelta.putInt(bestCnt);
                    zDelta.putChar('@');
                    zDelta.putInt(bestOfst);
                    zDelta.putChar(',');
                    if (bestOfst + bestCnt - 1 > lastRead) {
                        lastRead = bestOfst + bestCnt - 1;
                    }
                    bestCnt = 0;
                    break;
                }
                if (base + i + NHASH >= lenOut) {
                    zDelta.putInt(lenOut - base);
                    zDelta.putChar(':');
                    zDelta.putArray(out, base, base + lenOut - base);
                    base = lenOut;
                    break;
                }
                h.next(out[base + i + NHASH]);
                i++;
            }
        }
        if (base < lenOut) {
            zDelta.putInt(lenOut - base);
            zDelta.putChar(':');
            zDelta.putArray(out, base, base + lenOut - base);
        }
        zDelta.putInt(checksum(out));
        zDelta.putChar(';');
        return zDelta.toArray();
    };
    fossilDelta.outputSize = function (delta) {
        var zDelta = new Reader(delta);
        var size = zDelta.getInt();
        if (zDelta.getChar() !== '\n')
            throw new Error('size integer not terminated by \'\\n\'');
        return size;
    };
    fossilDelta.apply = function (src, delta, opts) {
        var limit, total = 0;
        var zDelta = new Reader(delta);
        var lenSrc = src.length;
        var lenDelta = delta.length;
        limit = zDelta.getInt();
        if (zDelta.getChar() !== '\n')
            throw new Error('size integer not terminated by \'\\n\'');
        var zOut = new Writer();
        while (zDelta.haveBytes()) {
            var cnt, ofst;
            cnt = zDelta.getInt();
            switch (zDelta.getChar()) {
                case '@':
                    ofst = zDelta.getInt();
                    if (zDelta.haveBytes() && zDelta.getChar() !== ',')
                        throw new Error('copy command not terminated by \',\'');
                    total += cnt;
                    if (total > limit)
                        throw new Error('copy exceeds output file size');
                    if (ofst + cnt > lenSrc)
                        throw new Error('copy extends past end of input');
                    zOut.putArray(src, ofst, ofst + cnt);
                    break;
                case ':':
                    total += cnt;
                    if (total > limit)
                        throw new Error('insert command gives an output larger than predicted');
                    if (cnt > lenDelta)
                        throw new Error('insert count exceeds size of delta');
                    zOut.putArray(zDelta.a, zDelta.pos, zDelta.pos + cnt);
                    zDelta.pos += cnt;
                    break;
                case ';':
                    var out = zOut.toArray();
                    if ((!opts || opts.verifyChecksum !== false) && cnt !== checksum(out))
                        throw new Error('bad checksum');
                    if (total !== limit)
                        throw new Error('generated size does not match predicted size');
                    return out;
                default:
                    throw new Error('unknown delta operator');
            }
        }
        throw new Error('unterminated delta');
    };
    return fossilDelta;
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = __webpack_require__(46);
var SchemaSerializer = (function () {
    function SchemaSerializer() {
    }
    SchemaSerializer.prototype.setState = function (rawState) {
        this.state.decode(rawState);
    };
    SchemaSerializer.prototype.getState = function () {
        return this.state;
    };
    SchemaSerializer.prototype.patch = function (patches) {
        this.state.decode(patches);
    };
    SchemaSerializer.prototype.teardown = function () {
    };
    SchemaSerializer.prototype.handshake = function (bytes, it) {
        if (this.state) {
            var reflection = new schema_1.Reflection();
            reflection.decode(bytes, it);
        }
        else {
            this.state = schema_1.Reflection.decode(bytes);
        }
    };
    return SchemaSerializer;
}());
exports.SchemaSerializer = SchemaSerializer;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
var EventEmitter = (function () {
    function EventEmitter() {
        this.handlers = [];
    }
    EventEmitter.prototype.register = function (cb, once) {
        if (once === void 0) {
            once = false;
        }
        this.handlers.push(cb);
        return this;
    };
    EventEmitter.prototype.invoke = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.handlers.forEach(function (handler) { return handler.apply(void 0, args); });
    };
    EventEmitter.prototype.invokeAsync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Promise.all(this.handlers.map(function (handler) { return handler.apply(void 0, args); }));
    };
    EventEmitter.prototype.remove = function (cb) {
        var index = this.handlers.indexOf(cb);
        this.handlers[index] = this.handlers[this.handlers.length - 1];
        this.handlers.pop();
    };
    EventEmitter.prototype.clear = function () {
        this.handlers = [];
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpChanges = void 0;
var _1 = __webpack_require__(46);
var MapSchema_1 = __webpack_require__(11);
var ArraySchema_1 = __webpack_require__(10);
function dumpChanges(schema) {
    var dump = {};
    var $changes = schema.$changes;
    var fieldsByIndex = schema['_fieldsByIndex'] || {};
    for (var _i = 0, _a = Array.from($changes.changes); _i < _a.length; _i++) {
        var fieldIndex = _a[_i];
        var field = fieldsByIndex[fieldIndex] || fieldIndex;
        if (schema[field] instanceof MapSchema_1.MapSchema ||
            schema[field] instanceof ArraySchema_1.ArraySchema ||
            schema[field] instanceof _1.Schema) {
            dump[field] = dumpChanges(schema[field]);
        }
        else {
            dump[field] = schema[field];
        }
    }
    return dump;
}
exports.dumpChanges = dumpChanges;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflection = exports.ReflectionType = exports.ReflectionField = void 0;
var annotations_1 = __webpack_require__(48);
var Schema_1 = __webpack_require__(13);
var ArraySchema_1 = __webpack_require__(10);
var MapSchema_1 = __webpack_require__(11);
var reflectionContext = new annotations_1.Context();
var ReflectionField = (function (_super) {
    __extends(ReflectionField, _super);
    function ReflectionField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        annotations_1.type("string", reflectionContext)
    ], ReflectionField.prototype, "name", void 0);
    __decorate([
        annotations_1.type("string", reflectionContext)
    ], ReflectionField.prototype, "type", void 0);
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], ReflectionField.prototype, "referencedType", void 0);
    return ReflectionField;
}(Schema_1.Schema));
exports.ReflectionField = ReflectionField;
var ReflectionType = (function (_super) {
    __extends(ReflectionType, _super);
    function ReflectionType() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = new ArraySchema_1.ArraySchema();
        return _this;
    }
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], ReflectionType.prototype, "id", void 0);
    __decorate([
        annotations_1.type([ReflectionField], reflectionContext)
    ], ReflectionType.prototype, "fields", void 0);
    return ReflectionType;
}(Schema_1.Schema));
exports.ReflectionType = ReflectionType;
var Reflection = (function (_super) {
    __extends(Reflection, _super);
    function Reflection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.types = new ArraySchema_1.ArraySchema();
        return _this;
    }
    Reflection.encode = function (instance) {
        var rootSchemaType = instance.constructor;
        var reflection = new Reflection();
        reflection.rootType = rootSchemaType._typeid;
        var buildType = function (currentType, schema) {
            for (var fieldName in schema) {
                var field = new ReflectionField();
                field.name = fieldName;
                var fieldType = void 0;
                if (typeof (schema[fieldName]) === "string") {
                    fieldType = schema[fieldName];
                }
                else {
                    var isSchema = typeof (schema[fieldName]) === "function";
                    var isArray = Array.isArray(schema[fieldName]);
                    var isMap = !isArray && schema[fieldName].map;
                    var childTypeSchema = void 0;
                    if (isSchema) {
                        fieldType = "ref";
                        childTypeSchema = schema[fieldName];
                    }
                    else if (isArray) {
                        fieldType = "array";
                        if (typeof (schema[fieldName][0]) === "string") {
                            fieldType += ":" + schema[fieldName][0];
                        }
                        else {
                            childTypeSchema = schema[fieldName][0];
                        }
                    }
                    else if (isMap) {
                        fieldType = "map";
                        if (typeof (schema[fieldName].map) === "string") {
                            fieldType += ":" + schema[fieldName].map;
                        }
                        else {
                            childTypeSchema = schema[fieldName].map;
                        }
                    }
                    field.referencedType = (childTypeSchema)
                        ? childTypeSchema._typeid
                        : 255;
                }
                field.type = fieldType;
                currentType.fields.push(field);
            }
            reflection.types.push(currentType);
        };
        var types = rootSchemaType._context.types;
        for (var typeid in types) {
            var type_1 = new ReflectionType();
            type_1.id = Number(typeid);
            buildType(type_1, types[typeid]._schema);
        }
        return reflection.encodeAll();
    };
    Reflection.decode = function (bytes) {
        var context = new annotations_1.Context();
        var reflection = new Reflection();
        reflection.decode(bytes);
        var schemaTypes = reflection.types.reduce(function (types, reflectionType) {
            types[reflectionType.id] = (function (_super) {
                __extends(_, _super);
                function _() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _;
            }(Schema_1.Schema));
            return types;
        }, {});
        reflection.types.forEach(function (reflectionType, i) {
            reflectionType.fields.forEach(function (field) {
                var schemaType = schemaTypes[reflectionType.id];
                if (field.referencedType !== undefined) {
                    var refType = schemaTypes[field.referencedType];
                    if (!refType) {
                        refType = field.type.split(":")[1];
                    }
                    if (field.type.indexOf("array") === 0) {
                        annotations_1.type([refType], context)(schemaType.prototype, field.name);
                    }
                    else if (field.type.indexOf("map") === 0) {
                        annotations_1.type({ map: refType }, context)(schemaType.prototype, field.name);
                    }
                    else if (field.type === "ref") {
                        annotations_1.type(refType, context)(schemaType.prototype, field.name);
                    }
                }
                else {
                    annotations_1.type(field.type, context)(schemaType.prototype, field.name);
                }
            });
        });
        var rootType = schemaTypes[reflection.rootType];
        var rootInstance = new rootType();
        for (var fieldName in rootType._schema) {
            var fieldType = rootType._schema[fieldName];
            if (typeof (fieldType) !== "string") {
                var isSchema = typeof (fieldType) === "function";
                var isArray = Array.isArray(fieldType);
                var isMap = !isArray && fieldType.map;
                rootInstance[fieldName] = (isArray)
                    ? new ArraySchema_1.ArraySchema()
                    : (isMap)
                        ? new MapSchema_1.MapSchema()
                        : (isSchema)
                            ? new fieldType()
                            : undefined;
            }
        }
        return rootInstance;
    };
    __decorate([
        annotations_1.type([ReflectionType], reflectionContext)
    ], Reflection.prototype, "types", void 0);
    __decorate([
        annotations_1.type("uint8", reflectionContext)
    ], Reflection.prototype, "rootType", void 0);
    return Reflection;
}(Schema_1.Schema));
exports.Reflection = Reflection;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLand = void 0;
exports.getLand = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    yield dcl.loadModule('ParcelIdentity');
    const data = yield dcl.callRpc('ParcelIdentity', 'getParcel', []);
    console.log("LAND_DATA", data);
    return (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.land) === null || _a === void 0 ? void 0 : _a.sceneJsonData) === null || _b === void 0 ? void 0 : _b.scene) === null || _c === void 0 ? void 0 : _c.base;
});


/***/ })
/******/ ]);