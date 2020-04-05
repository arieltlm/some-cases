
/**
 * 画环形
 *
 * @param size 圆环尺寸
 * @param color 颜色
 * @returns {THREE.Mesh}
 */
function createRings(size, color = 0x2e72ff) {
    const ring = new THREE.Mesh(
        // 圆环
        // THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
        // radius是圆环半径；tube是管道半径；radialSegments与tubularSegments分别是两个分段数，详见上图；arc是圆环面的弧度，缺省值为Math.PI * 2
        // new THREE.TorusBufferGeometry(0.15 * size, 0.0015, 20 * size, 20 * size, 0, Math.PI * 2),
        new THREE.TorusBufferGeometry(0.15 * size, 0.0015, 20 * size, 20 * size, 0, Math.PI * 2),
        // new THREE.TorusBufferGeometry(0.5 * size, 0.01, 20 * size, 20 * size, 0, Math.PI * 2),
        new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide,
            color,
            opacity: 0.1,
        }),
    )
    return ring
}
// new TextureAnimator(RunnerTexture[materialImageName], horiz, 1, horiz, 10)
function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
    // note: texture passed by reference, will be updated by the update function.

    this.tilesHorizontal = tilesHoriz
    this.tilesVertical = tilesVert
    // how many images does this spritesheet contain?
    //  usually equals tilesHoriz * tilesVert, but not necessarily,
    //  if there at blank tiles at the bottom of the spritesheet.
    this.numberOfTiles = numTiles
    this.texture = texture

    // 指定重复方式为两个方向（wrapS和wrapT）都重复
    // eslint-disable-next-line no-multi-assign
    this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
    // 横向上重复1/40次，纵向上重复1/1次
    this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)

    // how long should each image be displayed?
    this.tileDisplayDuration = tileDispDuration

    // how long has the current image been displayed?
    this.currentDisplayTime = 0

    // which image is currently being displayed?
    this.currentTile = 0

    // 1000*0.1
    this.update = function (milliSec) {
        this.currentDisplayTime += milliSec
        while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration
            this.currentTile++
            if (this.currentTile === this.numberOfTiles) { this.currentTile = 0 }
            const currentColumn = this.currentTile % this.tilesHorizontal
            this.texture.offset.x = currentColumn / this.tilesHorizontal
            const currentRow = Math.floor(this.currentTile / this.tilesHorizontal)
            this.texture.offset.y = currentRow / this.tilesVertical
        }
    }

    this.updateTexture = function (newTexture){
        this.texture = newTexture
        // eslint-disable-next-line no-multi-assign
        this.texture.wrapS = this.texture.wrapT = THREE.RepeatWrapping
        this.texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical)
    }
}


class BaseBall{
    constructor(options){
        this.model = null // 当前主模型
        this.annie = null // 精灵图的动画对象
        this.runner = null // 精灵图
        this.ring1 = null // 圆环1
        this.ring2 = null // 圆环2
        this.defaultSize = 3
        this.size = options.size || this.defaultSize
        
        this.trackAnimate = () => {}
    }

    init(){
        this.model = new THREE.Mesh(new THREE.SphereBufferGeometry(this.defaultSize , this.defaultSize  * 10, this.defaultSize  * 10),
        new THREE.MeshBasicMaterial({ 
            // color: 0xff0000,
            depthWrite: false, transparent: true, opacity: 0 
        }))
        this.upDateBallModelMaterial() 


        const trackColor = 0x018076
        this.ring1 = createRings(this.size - 0.4, trackColor)
        this.ring2 = createRings(this.size, trackColor)

        this.ring1.position.z = -0.3
        this.ring2.position.z = -0.3

        // rotation有x,y,z方向
        this.ring1.rotation.set(this.ring1.rotation.x + (Math.random()) * 5, 0, 0)
        this.ring2.rotation.set(this.ring1.rotation.x += 0.1 * 5, 0, 0)

        this.model.add(this.ring1)
        this.model.add(this.ring2)

        // 环的动画，1的x增加0.02，2的y增加0.02
        this.trackAnimate = () => {
            this.ring1.rotation.y += 0.02
            this.ring2.rotation.x += 0.02
        }

        return this.model
    }
    upDateBallModelMaterial(){
        const horiz = 40
        const color = 0xfff000
        const RunnerTexture = new THREE.TextureLoader().load('./images/car-ball.webp')
        // 雪碧图材质
        const runnerMaterial = new THREE.SpriteMaterial({
            map: RunnerTexture,
            blending: THREE.AdditiveBlending,
            transparent: true,
        })
        this.annie = new TextureAnimator(RunnerTexture, horiz, 1, horiz, 10) // texture, #horiz, #vert, #total, duration.
        this.runner = new THREE.Sprite(runnerMaterial)
        this.model.add(this.runner)

        // 点光源
        this.light = new THREE.PointLight(color, 0.8, 100, 0.3)
        this.model.add(this.light)

        this.modelType = 'erji'
    }
    setAnimate(){
        if (this.annie){
            this.annie.update(1000 * 0.01)
        }
        this.trackAnimate ()
    }

}

function init(){
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    renderer.setClearColor(0x000000)
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(20, 14 / 6, 1, 100);
    camera.position.set( 0,0,5);
    camera.lookAt(new THREE.Vector3(0,0,0))
    scene.add(camera);
    

    const model = new BaseBall({
        size: 3
    })
    const ball = model.init()

    scene.add(ball)

    window.setInterval(() => {
        model.setAnimate()
        renderer.render(scene, camera);
    }, 100)
}

