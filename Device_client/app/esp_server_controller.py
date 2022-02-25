from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time


chrome_options  = webdriver.ChromeOptions()
chrome_options .add_argument("--headless") #Note this line keeps browser from opening
chrome_options .add_argument("--no-sandbox")
chrome_options .add_argument("--disable-dev-shm-usage")
chrome_prefs = {}
chrome_options.experimental_options["prefs"] = chrome_prefs
chrome_prefs["profile.default_content_settings"] = {"images": 2}

driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
# driver = webdriver.Chrome(options=op)

def turn_pump_on(pump, duration):
    pass

def getWaterTemp():
    try:
        driver.get("http://192.168.0.214/")
        waterTemp = driver.find_element_by_xpath("//*[@id='temperaturef3']")
        waterTemp = waterTemp.text
    except:
        waterTemp = "000"
    return waterTemp

def getGrowRoomTemp():
    try:
        driver.get("http://192.168.0.214/")
        roomTemp = driver.find_element_by_xpath("//*[@id='temperaturef1']")
        roomTemp = roomTemp.text
    except:
        roomTemp = "000"
    return roomTemp


def getSurroundingAreaTemp():
    try:
        driver.get("http://192.168.0.214/")
        areaTemp = driver.find_element_by_xpath("//*[@id='temperaturef2']")
        areaTemp = areaTemp.text
    except:
        areaTemp = "000"
    return areaTemp
    # return 1

