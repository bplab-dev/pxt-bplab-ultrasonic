/**
 * Ultrasonic Sensor Test Code for Micro:bit
 *
 * This test will:
 * 1. Measure distance using an ultrasonic sensor
 * 2. Display results on LED matrix
 * 3. Output data to the serial monitor
 * 4. Validate measurements using expected ranges
 */

// Define trigger and echo pins
const TRIG_PIN = DigitalPin.P14;
const ECHO_PIN = DigitalPin.P15;

// Function to test ultrasonic sensor readings
function testUltrasonic(): boolean {
    let distanceCm = ultrasonic.ping(TRIG_PIN, ECHO_PIN, ultrasonic.PingUnit.Centimeters);
    let distanceInches = ultrasonic.ping(TRIG_PIN, ECHO_PIN, ultrasonic.PingUnit.Inches);
    let pulseTime = ultrasonic.ping(TRIG_PIN, ECHO_PIN, ultrasonic.PingUnit.MicroSeconds);

    // Check if values are within expected ranges
    let validCm = distanceCm > 0 && distanceCm < 500;  // HC-SR04 has max range of ~400-500cm
    let validInches = distanceInches > 0 && distanceInches < 200;  // ~200 inches
    let validMicroSec = pulseTime > 0 && pulseTime < 29000;  // ~400cm equivalent in μs

    // Display on serial monitor
    serial.writeLine(`Distance: ${distanceCm} cm | ${distanceInches} inches | ${pulseTime} μs`);

    // Display result on micro:bit
    basic.showNumber(distanceCm);
    basic.pause(1000);
    basic.showNumber(distanceInches);
    basic.pause(1000);

    return validCm && validInches && validMicroSec;
}

// Run tests
function runTests(): void {
    let allTestsPassed = true;

    for (let i = 0; i < 5; i++) {  // Test 5 times
        if (!testUltrasonic()) {
            allTestsPassed = false;
            break;
        }
        basic.pause(2000);  // Wait before next test
    }

    // Display final result
    if (allTestsPassed) {
        basic.showIcon(IconNames.Yes);  // Show check mark if all tests pass
    } else {
        basic.showIcon(IconNames.No);   // Show "X" if any test fails
    }
}

// Execute test function on micro:bit start
basic.forever(function () {
    testUltrasonic();
});
