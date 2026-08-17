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

		this.light = pipeline.addConeLight(
			this,
			this.player.x,
			this.player.y,
			1500,
			0xffcc88,
			10,
			Math.PI / 3.5
		);
		this.cone = pipeline;


		this.events.on('emit_confetti', () => {
			const graphics = this.add.graphics();
			graphics.fillStyle(0xffffff, 1);
			graphics.fillRect(0, 0, 10, 3);
			graphics.generateTexture('confetti', 10, 3);
			graphics.destroy();

			const emitter = this.add.particles(150, 150, 'confetti', {
				speed: { min: 150, max: 350 },
				angle: { min: 200, max: 340 },
				gravityY: 500,
				lifespan: 1500,
				quantity: 40,
				scale: { start: 0.8, end: 0.3 },
				alpha: { start: 1, end: 0 },

				rotate: { min: 0, max: 360 },

				tint: [
					0xff595e,
					0xffca3a,
					0x8ac926,
					0x1982c4,
					0x6a4c93
				],

				emitting: false
			})

			emitter.explode(20);
		})
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
                (this.light as any)._coneDirectionX = vx / len;
                (this.light as any)._coneDirectionY = -vy / len;
            }
        }
		*/
    }
}
