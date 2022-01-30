from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


op = webdriver.ChromeOptions()
op.add_argument('headless') #Note this line keeps browser from opening
driver = webdriver.Chrome(ChromeDriverManager().install(), options=op)
# driver = webdriver.Chrome(options=op)

def turn_pump_on(pump, duration):
    pass

def getWaterTemp():
    driver.get("http://192.168.0.214/")
    waterTemp = driver.find_element_by_xpath("//*[@id='temperaturef3']")
    waterTemp = waterTemp.text
    return waterTemp

def getGrowRoomTemp():
    driver.get("http://192.168.0.214/")
    roomTemp = driver.find_element_by_xpath("//*[@id='temperaturef1']")
    roomTemp = roomTemp.text
    return roomTemp


def getSurroundingAreaTemp():
    driver.get("http://192.168.0.214/")
    areaTemp = driver.find_element_by_xpath("//*[@id='temperaturef2']")
    areaTemp = areaTemp.text
    return areaTemp

