let notBreathingStartTime = 0
let rollStartTime = 0
let rolling = false
let isHigh = false
let currentAngle = 0
let temp = 0
let RAD2DEG = 52.29578
let rollAngle = 60
let gravity = 9.80665
let alertTemp = 74
let rollTime = 5000
let NOT_BREATHING_TIME = 5000
let breathing = true
let startZ = input.acceleration(Dimension.Z)
let startY = input.acceleration(Dimension.Y)
let startX = input.acceleration(Dimension.X)
let breathingMovementZ;
let breathingMovementY;
let breathingMovementX;
let checkZ;
let checkY;
let checkX;
let check;
forever(function () {
    temp = input.temperature(TemperatureUnit.Fahrenheit)
    currentAngle = RAD2DEG * (Math.abs(input.acceleration(Dimension.Z)) / gravity)
    isHigh = alertTemp < temp
    if (isHigh) {
        music.jumpUp.play()
        console.log(temp)
        light.showAnimation(light.theaterChaseAnimation, 1000)
    }
    if (currentAngle > rollAngle && input.acceleration(Dimension.Z) < 0) {
        if (!(rolling)) {
            rolling = true
            console.log("Just started rolling")
            console.log("Current Angle: ")
            console.log(currentAngle)
            rollStartTime = control.millis()
        }
    } else if (Math.abs(currentAngle) > 0) {
        rolling = false
        console.log("Current Angle: ")
        console.log("Motion Z: ")
        console.log(input.acceleration(Dimension.Z))
        rollStartTime = control.millis()
    }
    if (rolling) {
        if (control.millis() - rollStartTime > rollTime) {
            music.powerUp.play()
            console.log(temp)
            light.showAnimation(light.colorWipeAnimation, 1000)
            console.log("  rollStartTime: ")
            console.log(rollStartTime)
            console.log("  millis: ")
            console.log(control.millis())
            console.log("  Roll Time: ")
            console.log(rollTime)
        } else {
            console.log("Not 5 seconds yet")
            console.log("  rollStartTime: ")
            console.log(rollStartTime)
            console.log("  millis: ")
            console.log(control.millis())
            console.log("  Roll Time: ")
            console.log(rollTime)
            console.log("Difference")
            console.log(control.millis() - rollStartTime)
        }
    }
    breathingMovementZ = input.acceleration(Dimension.Z)
    breathingMovementY = input.acceleration(Dimension.Y)
    breathingMovementX = input.acceleration(Dimension.X)
    console.log("  Z: ")
    console.log(breathingMovementZ)
    console.log("  Y: ")
    console.log(breathingMovementY)
    console.log("  X: ")
    console.log(breathingMovementX)
    // Check if not breathing
    checkZ = breathingMovementZ >= startZ - 0.3 && breathingMovementZ <= startZ + 0.3
    checkY = breathingMovementY >= startY - 0.3 && breathingMovementY <= startY + 0.3
    checkX = breathingMovementX >= startX - 0.3 && breathingMovementX <= startX + 0.3
    check = checkZ || checkY || checkX
    if (check) {
        if (breathing) {
            console.log("Not breathing")
            breathing = false
            notBreathingStartTime = control.millis()
        }
        if (!(breathing)) {
            if (control.millis() - notBreathingStartTime > NOT_BREATHING_TIME) {
                music.baDing.play()
                light.showAnimation(light.sparkleAnimation, 1000)
                console.log("notBreathingStartTime: ")
                console.log(notBreathingStartTime)
                console.log("  millis: ")
                console.log(control.millis())
                console.log("  Not Breathing Time: ")
                console.log(NOT_BREATHING_TIME)
            } else {
                console.log("Not 5 seconds yet")
                console.log("  notBreathingStartTime: ")
                console.log(notBreathingStartTime)
                console.log("  millis: ")
                console.log(control.millis())
                console.log("  Not Breathing Time: ")
                console.log(NOT_BREATHING_TIME)
                console.log("Difference")
                console.log(control.millis() - notBreathingStartTime)
            }
        }
    } else {
        breathing = true
    }
})
