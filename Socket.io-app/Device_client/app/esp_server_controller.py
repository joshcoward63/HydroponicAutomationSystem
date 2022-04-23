from os import stat
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import requests

chrome_options  = webdriver.ChromeOptions()
chrome_options .add_argument("--headless") #Note this line keeps browser from opening
chrome_options .add_argument("--no-sandbox")
chrome_options .add_argument("--disable-dev-shm-usage")
chrome_prefs = {}
chrome_options.experimental_options["prefs"] = chrome_prefs
chrome_prefs["profile.default_content_settings"] = {"images": 2}

driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)

""" Gets the  current ON/OFF states of the nutrient dispensing pumps """
def getPumpStates():
    driver.get("http://192.168.0.198/")
    states = {
        0: "",
        1: "",
        2: "",
        3: ""
    }
    states[0] = driver.find_element(By.ID, "s1").get_attribute("innerHTML")
    states[1] = driver.find_element(By.ID, "s2").get_attribute("innerHTML")
    states[2] = driver.find_element(By.ID, "s3").get_attribute("innerHTML")
    states[3] = driver.find_element(By.ID, "s4").get_attribute("innerHTML")
    
    return states

""" Turns on a nutrient/ph controlling pump for a set duration """
def turnOnPump(pump, duration):
    driver.get("http://192.168.0.198/")
    if pump == "MasterBlend":
        pump = driver.find_element(By.ID, "b1")
        pump.click() # Turns Pump on
        time.sleep(duration)
        pump.click()  # Turns Pump off
    elif pump == "Epsom Salt":
        pump = driver.find_element(By.ID, "b2")
        pump.click() # Turns Pump on
        time.sleep(duration)
        pump.click()  # Turns Pump off
    elif pump == "Calcium Nitrate":
        pump = driver.find_element(By.ID, "b3")
        pump.click() # Turns Pump on
        time.sleep(duration)
        pump.click() # Turns Pump off
    elif pump == "Ph Down":
        pump = driver.find_element(By.ID, "b4")
        pump.click() # Turns Pump on
        time.sleep(duration)
        pump.click()  # Turns Pump off
    else:
        print("Error Pump does not exist!") 
    return 'success'

""" Gets the temperature of the water in the reservoir """
def getWaterTemp():
    try:
        driver.get("http://192.168.0.214/")
        waterTemp = driver.find_element_by_xpath("//*[@id='temperaturef3']")
        waterTemp = waterTemp.text
    except:
        waterTemp = "000"
    return waterTemp

""" Gets the temperature of the grow tent """
def getGrowRoomTemp():
    try:
        driver.get("http://192.168.0.214/")
        roomTemp = driver.find_element_by_xpath("//*[@id='temperaturef1']")
        roomTemp = roomTemp.text
    except:
        roomTemp = "000"
    return roomTemp

""" Gets the temperature of the area surrounding the grow tent """
def getSurroundingAreaTemp():
    try:
        driver.get("http://192.168.0.214/")
        areaTemp = driver.find_element_by_xpath("//*[@id='temperaturef2']")
        areaTemp = areaTemp.text
    except:
        areaTemp = "000"
    return areaTemp