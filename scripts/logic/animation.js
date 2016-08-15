'use strict'

const transform = require('./transform');
const render = require('./render');

class animation extends transform {
    constructor(logic, name, aN = 0, fps = 1000, location, rotation, scale, bufferType = 'rectData') {
        super(location, rotation, scale);
        this.resourceManager = logic.resourceManager
        this.vertex = logic.util.MakeVertexsData(logic.gl, bufferType);
        
        this.aN = aN;
        
        this.SetAnimation(logic, name, fps)
    }  
    SetAnimation(logic, name, fps) {    
        this.currentFrame = 0;
        this.animationTimer = 0;

        const imgData = this.resourceManager.GetImage(name);
        this.Id = imgData.Id;
        this.Src = imgData.Src;
        this.uv = logic.util.MakeRectUVData(logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
    
        this.frame = this.Id.animation[this.aN].length;
        this.speed = fps;
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.currentFrame];
        const SrcScale = {X:rect[2], Y:rect[3], Z:1};
        return [SrcScale.X*this.Scale.X, SrcScale.Y*this.Scale.Y, SrcScale.Z*this.Scale.Z];
    }
    Render(logic) {
        render(logic.gl, logic.program, this.vertex, this.uv,
            this.LocationByArr, this.RotationByArr, logic.util.ArrayVectorMultifly(this.GetSpriteScale(),logic.viewportScale),
            this.Src);
    }
    Update(logic, delta) {
        this.animationTimer += delta;
        let currentFrame = Math.floor(this.animationTimer*this.frame/this.speed)
        if(currentFrame >= this.frame){
            currentFrame = this.animationTimer = 0;
        }
        if(currentFrame != this.currentFrame){
            this.currentFrame = currentFrame
            this.uv = logic.util.MakeRectUVData(logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
        }
        
    }
}
module.exports = animation;