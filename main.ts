enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Ultrasonic and ping utilities
 */
//% color="#2c3e50" weight=1 icon="\uf0ad"
namespace ultrasonic {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig Trigger pin
     * @param echo Echo pin
     * @param unit Desired conversion unit
     */
    //% blockId=sonar_ping block="Ping||Trig %trig||Echo %echo||Unit %unit"
    //% tooltip="Measures the distance to an object using an ultrasonic sensor."
    export function ping(trig: DigitalPin, echo: DigitalPin, unit: PingUnit): number {
        const maxCmDistance = 500

        // send pulse
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);

        // read pulse
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }
}