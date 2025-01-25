# Mental-health-
const int buttonPin = 2;  // Pin for the button
const int buzzerPin = 9;  // Pin for the buzzer

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH) {
    digitalWrite(buzzerPin, HIGH);  // Turn on buzzer
    delay(1000);                    // Buzzer stays on for 1 second
    digitalWrite(buzzerPin, LOW);   // Turn off buzzer
    delay(1000);                    // Delay before next trigger
  }
}
