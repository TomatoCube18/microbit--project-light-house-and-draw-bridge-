makerbit.onIrButton(BuoyID.A, IrButtonAction.Pressed, function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Yes)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(200)
    basic.showIcon(IconNames.Yes)
    basic.pause(300)
    basic.clearScreen()
    Buoy_G_Status = 1
    Buoy_I_Status = 1
})
makerbit.onIrButton(BuoyID.B, IrButtonAction.Pressed, function () {
    music.playTone(523, music.beat(BeatFraction.Whole))
    basic.showIcon(IconNames.Chessboard)
    basic.pause(300)
    basic.clearScreen()
    basic.pause(200)
    basic.showIcon(IconNames.Chessboard)
    basic.pause(300)
    basic.clearScreen()
    Final_Buoy_Status = 1
})
let Final_Buoy_Status = 0
let Buoy_I_Status = 0
let Buoy_G_Status = 0
makerbit.connectIrReceiver(DigitalPin.P1)
let RelayStatus = 1
pins.digitalWritePin(DigitalPin.P2, RelayStatus)
pins.setPull(DigitalPin.P5, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
let Bridge_Moving = 0
Buoy_G_Status = 0
Buoy_I_Status = 0
Final_Buoy_Status = 0
basic.forever(function () {
    if (Buoy_G_Status == 1 && Buoy_I_Status == 1) {
        Bridge_Moving = 1
        Buoy_G_Status = 0
        Buoy_I_Status = 0
    } else if (Final_Buoy_Status == 1) {
        Bridge_Moving = 2
        Final_Buoy_Status = 0
    } else {
    	
    }
    if (Bridge_Moving == 1 && pins.digitalReadPin(DigitalPin.P5) == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        RelayStatus = 0
        pins.digitalWritePin(DigitalPin.P2, RelayStatus)
        music.playTone(262, music.beat(BeatFraction.Whole))
        basic.pause(200)
        motorbit.setMotorRotation(MakerBitMotorRotation.Forward)
        motorbit.runMotor(50)
    } else if (Bridge_Moving == 2 && pins.digitalReadPin(DigitalPin.P11) == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        RelayStatus = 1
        pins.digitalWritePin(DigitalPin.P2, RelayStatus)
        music.playTone(349, music.beat(BeatFraction.Whole))
        basic.pause(200)
        motorbit.setMotorRotation(MakerBitMotorRotation.Backward)
        motorbit.runMotor(50)
    } else {
        motorbit.stopMotor()
        Bridge_Moving = 0
        basic.showIcon(IconNames.SmallHeart)
    }
})
