import { Scene } from 'phaser';
import { Player } from '../objects/Player';
import { ConeLightPipeline } from '../pipelines/ConeLightPipeline';

export class Game extends Scene
{
    private player!: Player
    private light!: Phaser.GameObjects.Light
    private cone!: ConeLightPipeline

    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('src/assets');

        this.load.tilemapTiledJSON('level', 'map.json')
        this.load.image('tilemap_packed', 'tilemap/tilemap_packed.png')
        this.load.image('blue_tile', 'blue_tile.png')

		Player.preload(this)
    }

    create ()
    {
		this.lights.enable()

		const pipeline = new ConeLightPipeline({ game: this.game });
		(this.renderer as Phaser.Renderer.WebGL.WebGLRenderer).pipelines.add('ConeLight', pipeline);

		const map = this.add.tilemap('level')
		if (!map)
			throw Error("tilemap not loaded")

		const ground = map.addTilesetImage('tilemap_packed','tilemap_packed')
		const sky = map.addTilesetImage('blue_tile','blue_tile')

		if (!ground || !sky)
			throw Error("layer not loaded")

		const groundLayer = map.createLayer(0, ground, 0, 0)
		const skyLayer = map.createLayer(1, sky, 0, 0)
		const backgroundLayer = map.createLayer(2, ground, 0, 0)

		if (!groundLayer || !skyLayer || !backgroundLayer)
			throw Error("layer problem")

		groundLayer.setPipeline('ConeLight')
		skyLayer.setPipeline('ConeLight')
		backgroundLayer.setPipeline('ConeLight')

		this.player = new Player(this, 100, 100)
		this.player.setDepth(100)

		groundLayer?.setCollisionByExclusion([-1])
		this.physics.add.collider(this.player, groundLayer)
		
		this.lights.setAmbientColor(0x333333)

		this.light = this.lights.addLight(this.player.x, this.player.y, 320, 0xffcc88, 10)
		this.cone = pipeline;
    }

    update ()
    {
        this.player.update()
        this.light.setPosition(this.player.x, this.player.y)

		/*
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        if (body) {
            const vx = body.velocity.x;
            const vy = body.velocity.y;
            if (vx !== 0 || vy !== 0) {
                const len = Math.sqrt(vx * vx + vy * vy);
                this.cone.coneDirectionX = vx / len;
                this.cone.coneDirectionY = -vy / len;
            }
        }
		*/
    }
}
