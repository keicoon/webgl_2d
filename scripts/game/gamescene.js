'use strict'

const util = require('../util/util')
const Vector3D = util.Vector3D
const scene = require('../logic/scene')
const sprite = require('../logic/sprite')
const animation = require('../logic/animation')
const textSprite = require('../logic/textSprite')

class gamescene extends scene {
    constructor(logic) {
        super(logic);
    }
    BeginPlay() {
        this.spriteA = new sprite(this.logic, 'test', 0, 0, util.ProjectionViewport({X:340, Y:340}, this.logic))
        this.animationA = new animation(this.logic, 'test2', 0)
        this.animationA.MoveLocation({X:50,Y:80,Z:0})
        this.textSprite = new (textSprite(this.logic))(this.logic, '하이요! 이게 얼마나 길게 써지는데 테스트 해보고 싶어요', 55, util.RGB(255,255,0), 'RixToyGray', 'left', util.ProjectionViewport({X:-540, Y:-200}, this.logic))
        this.bgm = this.logic.resourceManager.GetAudio('Reminiscence')
        this.bgm.play()
        // this.bgm.pos(-3,0,-0.5, this.bgm.play())
    }
    Destroy() {}
    Render(delta) {
        this.spriteA.Render()
        this.animationA.Render()
        this.textSprite.Render()
    }
    Update(delta) {
        this.animationA.Update()
    }
    InputKey(_this, k, s) {
        const deltaTime = _this.logic.deltaTime()
        if(s) {
            switch(k) {
                case 'A':
                    _this.spriteA.MoveLocation(Vector3D.C({X:-200}).Multifly_Float(deltaTime))
                break
                case 'S':
                    _this.spriteA.MoveLocation(Vector3D.C({Y:-200}).Multifly_Float(deltaTime))
                break
                case 'D':
                    _this.spriteA.MoveLocation(Vector3D.C({X:200}).Multifly_Float(deltaTime))
                break
                case 'W':
                    _this.spriteA.MoveLocation(Vector3D.C({Y:200}).Multifly_Float(deltaTime))
                break
            }
        }
    }
    InputMouse(_this, x, y) {
        console.log(x, y)
    }
}

module.exports = gamescene;