import cv2
import numpy as np
import base64
import sys
import json
from PIL import Image

n = sys.argv[1]

if n.isdigit():
    cap = int(n)
    camera = cv2.VideoCapture(cap,cv2.CAP_DSHOW)
else:
    cap = str(n)
    camera = cv2.VideoCapture(cap)

while True:
    success,frame = camera.read()
    if success:
        H,W = frame.shape[:2]
        ret,jpeg = cv2.imencode(".jpg",frame)
        jpeg = jpeg.tobytes()
        blob = base64.b64encode(jpeg)
        blob = blob.decode("utf-8")
        # w = str(W)
        print(json.dumps({"x":blob,"y":W}))
        # print(w)
        # break
    else:
        break