export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('src/game/assets');

        // this.load.tilemapTiledJSON('level', 'tiny/tilemap.json')
        // this.load.image('Tilemap_color1_img', 'tiny/Terrain/Tileset/Tilemap_color1.png')
        // this.load.image('sky_tile_img', 'tiny/sky_tile.png')

        // Player.preload(this)
        // Gold.preload(this)
        // Enemy.preload(this)

        // this.load.spritesheet('ground', 'Tilemap_color1.png', {
        //     frameHeight: 32,
        //     frameWidth: 32,
        // })
    }

    create ()
    {
        // for (let x = 0; x < 3; x++) {
        //     this.add.image(512 * (x + (x + 1)) , 1024 / 2, 'background')
        // }

        // const groundPlatform = this.createPlatform(14, 1010, 32 * 3, 0, 1, 5)

        // const floatingPlatformUpper = this.createPlatform(564, 450, 8, 108, 109, 113)
        // const floatingPlatformBottom = this.createPlatform(564, 450 + 32, 8, 126, 127, 131)

        // this.golds[0].body?.setSize(55, 35)

        // this.physics.add.collider(this.player, groundPlatform)
        // this.physics.add.collider(this.enemy, groundPlatform)

        // this.physics.add.collider(this.golds[0], groundPlatform)
        // this.physics.add.collider(this.golds[1], groundPlatform)
        
        // this.physics.add.collider(this.player, floatingPlatformUpper)
        // this.physics.add.collider(this.player, floatingPlatformBottom)
        
		// Ensure Player.hitEnemy runs with `this` bound to the Player instance.
		// this.physics.add.overlap(this.player.attackHitbox, this.enemy, this.player.hitEnemy, undefined, this.player)

        // this.createFloatingPlatform(256, 705, 16)
        // this.createFloatingPlatform(564, 450, 8)
        // this.createFloatingPlatform(1024, 636, 20)
        // this.createFloatingPlatform(2048, 700, 10)
        // this.createFloatingPlatform(1712, 400, 10)
        // this.createFloatingPlatform(150, 200, 9)

    }

    update ()
    {
    }
}
