import time
import RPi.GPIO as GPIO

from datetime import datetime
from firebase import firebase

firebase = firebase.FirebaseApplication("https://roomluz.firebaseio.com/", None)

LIGHT = 18
FAN_ON = 21
FAN_OFF = 22

GPIO.setmode(GPIO.BCM)
GPIO.setup(LIGHT, GPIO.OUT)
GPIO.setup(FAN_ON, GPIO.OUT)
GPIO.setup(FAN_OFF, GPIO.OUT)


# # publish
# data = {
#     'time': "2020-..."
# }
# result = firebase.put("/Time", "time", "NEW TIME")
# result = firebase.put("/Time", "PARAMETER", "NEW TIME")
#
# # retrieve data
# result = firebase.get("/Time", "")
# print(result)


dates = []
archive = []

def checkAlarm():
    d = datetime.now()
    #print("now")
    #print("{:%Y-%m-%d %H:%M}".format(d))

    for date in dates:
        if "{:%Y-%m-%d %H:%M}".format(d) == date:
            #print("{:%Y-%m-%d %H:%M}".format(d))
            GPIO.output(LIGHT, True)
            time.sleep(.1)
            GPIO.output(LIGHT, False)
            archive.append(date)
            dates.remove(date)


def main():
    error_count = 0
    while True:
        print(dates)
        try:
            date = firebase.get("/Time", "time")
        except:
            print("failed: " + str(error_count))
            error_count += 1
            time.sleep(error_count * 10 + 0.01)
        else:
            error_count = 0



        #print(date)
        if (not date in dates and not date in archive):
            dates.append(date)

        checkAlarm()
        # CHECK FANS

        time.sleep(1)



if __name__ == '__main__':
    main()
