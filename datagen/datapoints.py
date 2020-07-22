# -*- coding: utf-8 -*-
"""
Created on Thu Jul  2 23:43:15 2020

@author: RANGER
"""

import cv2
import imutils
import numpy as np
import matplotlib.pyplot as plt
file=cv2.imread("logo4.png")
file=imutils.resize(file,600)
file=cv2.cvtColor(file, cv2.COLOR_BGR2GRAY)
file=cv2.Canny(file,50,200)
cv2.imshow("input",file)
_,cani=cv2.threshold(file, 125, 255, cv2.THRESH_BINARY+cv2.THRESH_OTSU)
cv2.imshow("edges",cani)
Y,X=np.where(cani==255)
h,w=file.shape
Y=Y-h/2
X=X-w/2
values=np.array([X,Y]).T
data="let datapoints=["+"\n"

cv2.waitKey(0)
cv2.destroyAllWindows()
for j in range(len(values)-1):
    dist=1000
    ref=values[j]
    index=j
    for i in range(j+1,len(values)):
        newd=np.linalg.norm(ref-values[i])
        if newd<dist:
            dist=newd
            index=i
    temp=np.copy(values[j+1])
    values[j+1]=values[index]
    values[index]=temp
        
        

outfile=open("data.js","w")
data=data+"{x:"+str(values[0,0])+", y:"+str(values[0,1])+"}"
for x,y in values[1:]:
    data=data+",\n{x:"+str(x)+", y:"+str(y)+"}"

data=data+"]"
outfile.write(data)
outfile.close()


