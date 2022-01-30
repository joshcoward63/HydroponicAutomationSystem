from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


op = webdriver.ChromeOptions()
op.add_argument('headless') #Note this line keeps browser from opening
driver = webdriver.Chrome(options=op)

def turn_pump_on(pump, duration):
    pass

def getWaterTemp():
    pass

def getGrowRoomTemp():
    pass

def getSurroundingAreaTemp():
    pass