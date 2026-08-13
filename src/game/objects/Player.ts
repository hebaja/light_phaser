import { Input, Physics, type Scene } from "phaser";

type PlayerControls = {
	left: Phaser.Input.Keyboard.Key;
	right: Phaser.Input.Keyboard.Key;
	up: Phaser.Input.Keyboard.Key;
	down: Phaser.Input.Keyboard.Key
	A: Phaser.Input.Keyboard.Key;
	D: Phaser.Input.Keyboard.Key;
	W: Phaser.Input.Keyboard.Key;
	S: Phaser.Input.Keyboard.Key;
}

export class Player extends Physics.Arcade.Sprite {
	private controls: PlayerControls
	private keyboard: any

	static preload(scene: Scene) {
		scene.load.image('block', 'block.png')
	}

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x, y, 'block')

		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.keyboard = scene.input.keyboard
		this.controls = this.keyboard?.addKeys({
			left: Input.Keyboard.KeyCodes.LEFT,
			right: Input.Keyboard.KeyCodes.RIGHT,
            up: Input.Keyboard.KeyCodes.UP,
			down: Input.Keyboard.KeyCodes.DOWN,
            A: Input.Keyboard.KeyCodes.A,
            D: Input.Keyboard.KeyCodes.D,
            W: Input.Keyboard.KeyCodes.W,
            S: Input.Keyboard.KeyCodes.S
        })
	}

	update(): void {
		if (this.controls.left.isDown || this.controls.A.isDown) {
			this.setVelocityX(-150)
		} else if (this.controls.right.isDown || this.controls.D.isDown) {
			this.setVelocityX(150)
		} else if (this.controls.up.isDown || this.controls.W.isDown) {
			this.setVelocityY(-150)
		} else if (this.controls.down.isDown || this.controls.S.isDown) {
			this.setVelocityY(150)
		} else {
			this.setVelocity(0, 0)
		}
	}
}
