import { Scene } from 'phaser';
import { Player } from '../objects/Player';

export class Game extends Scene
{
    private player!: Player

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

		groundLayer.setPipeline('Light2D')
		skyLayer.setPipeline('Light2D')
		backgroundLayer.setPipeline('Light2D')

		this.player = new Player(this, 100, 100)
		this.player.setDepth(100)

		groundLayer?.setCollisionByExclusion([-1])
		this.physics.add.collider(this.player, groundLayer)
		
		this.lights.setAmbientColor(0x333333)

		const light = this.lights.addLight(200, 200, 200)
		light.setIntensity(2)
		light.setColor(0xffffff)


    }

    update ()
    {
        this.player.update()
    }
}
